package com.slliver.service;

import com.github.pagehelper.PageHelper;
import com.slliver.base.domain.BaseSearchCondition;
import com.slliver.base.service.BaseService;
import com.slliver.common.Constant;
import com.slliver.common.domain.UserToken;
import com.slliver.common.paging.PageWapper;
import com.slliver.common.utils.*;
import com.slliver.dao.ApiUserMapper;
import com.slliver.entity.ApiLoanData;
import com.slliver.entity.ApiUser;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * @Description: 用一句话具体描述类的功能
 * @author: slliver
 * @date: 2018/3/9 15:14
 * @version: 1.0
 */
@Service("apiUserService")
public class ApiUserService extends BaseService<ApiUser> {

    @Autowired
    private ApiUserMapper mapper;
    @Autowired
    private ApiSmsCodeService smsCodeService;

    public PageWapper<ApiUser> selectListByPage(BaseSearchCondition condition) {
        Integer pageNum = 0;
        Integer pageSize = Constant.WEB_PAGE_SIZE;
        if (condition != null) {
            pageNum = condition.getPageNum() != null ? condition.getPageNum() : 0;
            pageSize = condition.getPageSize() != null ? condition.getPageSize() : Constant.WEB_PAGE_SIZE;
        }

        PageHelper.startPage(pageNum, pageSize);
        List<ApiUser> list = this.mapper.selectListByPage(condition);
        return new PageWapper<>(list);
    }

    public UserToken save(String phone) {
        String token = "";
        ApiUser user = new ApiUser();
        String pkid = UuidUtil.get32UUID();
        user.setPkid(pkid);
        user.setUserName(phone);
        // 初始密码
        String pwrsMD5 = CipherUtil.generatePassword(Constant.DEFAULT_PASSWORD);
        String salt = CipherUtil.createSalt();
        user.setPassword(CipherUtil.createPwdEncrypt(user.getUserName(), pwrsMD5, salt));
        user.setSalt(salt);
        user.setPhone(phone);
        user.setName("用户_" + RandomUtil.random(4));
        user.setSex(true);
        // 过期时间默认1年
        Date expireDate = DateUtils.addDays(DateUtil.getCurrentDate(), Constant.TOKEN_EXPIRES_DAY);
        long expireTime = expireDate.getTime();
        // 用户token
        token = TokenUtil.generateToken(pkid, expireTime);
        user.setAccessToken(token);
        user.setExpireDate(expireDate);
        user.setExpireTime(expireTime);
        this.insert(user);

        UserToken userToken = new UserToken(pkid, token);
        return userToken;
    }

    /**
     * 用户名密码登录
     */
    public ApiUser login(String userName, String password) {
        ApiUser user = null;
        return user;
    }

    public ApiUser selectByPhone(String phone) {
        Example example = new Example(ApiUser.class);
        example.createCriteria().andEqualTo("phone", phone);
        List<ApiUser> list = this.selectByExample(example);
        return CollectionUtils.isNotEmpty(list) ? list.get(0) : null;
    }

    /**
     * 手机号验证码登录并返回token
     */
    public UserToken phoneLogin(String phone, String code) {
        UserToken userToken = new UserToken();
        ApiUser user = this.selectByPhone(phone);
        if (user == null) {
            // 没有注册
            userToken.setMessage("输入的手机号码没有注册");
            return userToken;
        }

        // 用户已经注册，验证验证码是否正确
        String result = smsCodeService.selectByPhoneAndCode(phone, code);
        if (!Objects.equals(Constant.SUCCESS, result)) {
            userToken.setMessage(result);
            return userToken;
        }

        // 构建用户token,并返回
        // token规则，用户pkid.过期时间.秘钥 = Base64加密
        // 如果token过期重新生成token,如果没有直接返回用户以前的token
        String token = user.getAccessToken();
        long now = DateUtil.getCurrentDate().getTime();
        if (user.getExpireTime() == null || (now - user.getExpireTime() > 0)) {
            // 过期时间默认1年
            Date expireDate = DateUtils.addDays(DateUtil.getCurrentDate(), Constant.TOKEN_EXPIRES_DAY);
            long expireTime = expireDate.getTime();
            // 用户token
            token = TokenUtil.generateToken(user.getPkid(), expireTime);
            user.setAccessToken(token);
            user.setExpireDate(expireDate);
            user.setExpireTime(expireTime);
            update(user);
//            return Constant.SUCCESS + "_" + token;
            userToken.setMessage(Constant.SUCCESS);
            userToken.setToken(token);
            return userToken;
        }
        else{
//            return Constant.SUCCESS + "_" + token;
            userToken.setMessage(Constant.SUCCESS);
            userToken.setToken(token);
            return userToken;
        }
    }

    public ApiUser selectByUserName(String userName) {
        Example example = new Example(ApiUser.class);
        example.createCriteria().andEqualTo("userName", userName);
        List<ApiUser> list = this.selectByExample(example);
        return CollectionUtils.isNotEmpty(list) ? list.get(0) : null;
    }
}
