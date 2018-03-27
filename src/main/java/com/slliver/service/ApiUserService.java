package com.slliver.service;

import com.github.pagehelper.PageHelper;
import com.slliver.base.domain.BaseSearchCondition;
import com.slliver.base.service.BaseService;
import com.slliver.common.Constant;
import com.slliver.common.domain.UserToken;
import com.slliver.common.domain.UserValidate;
import com.slliver.common.paging.PageWapper;
import com.slliver.common.utils.*;
import com.slliver.dao.ApiUserMapper;
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
    private ApiUserService userService;
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

    /**
     * 用户注册
     * @param phone
     * @return
     */
    public UserValidate save(String phone) {
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

        UserValidate validate = new UserValidate(pkid, token);
        return validate;
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
     * 验证用户注册
     */
    public UserValidate validateRegister(final String phone, final String code) {
        UserValidate validate = new UserValidate();

        UserValidate validateNotNull = this.validateNotNull(phone, code);
        if (!Objects.equals(Constant.SUCCESS, validateNotNull.getMessage())) {
            validate.setMessage(validateNotNull.getMessage());
            return validate;
        }

        ApiUser user = this.userService.selectByPhone(phone);
        if (user != null) {
            validate.setMessage("手机号码已经注册，请直接登录");
            validate.setToken(user.getAccessToken());
            return validate;
        }

        String message = this.smsCodeService.selectByPhoneAndCode(phone.trim(), code.trim());
        if (!Objects.equals(Constant.SUCCESS, message)) {
            validate.setMessage(message);
            return validate;
        }

        validate = this.userService.save(phone);
        if (StringUtils.isBlank(validate.getToken())) {
            validate.setMessage("注册失败");
            return validate;
        }

        validate.setMessage(Constant.SUCCESS);
        return validate;
    }

    /**
     * 验证用户手机号码登录
     */
    public UserValidate validatePhoneLogin(final String phone, final String code){
        UserValidate validate = new UserValidate();
        UserValidate validateNotNull = this.validateNotNull(phone, code);
        if (!Objects.equals(Constant.SUCCESS, validateNotNull.getMessage())) {
            validate.setMessage(validateNotNull.getMessage());
            return validate;
        }

        return userService.phoneLogin(phone, code);
    }

    /**
     * 手机号验证码登录并返回token
     */
    public UserValidate phoneLogin(String phone, String code) {
        UserValidate validate = new UserValidate();
        ApiUser user = this.selectByPhone(phone);
        if (user == null) {
            // 没有注册
            validate.setMessage("输入的手机号码没有注册");
            return validate;
        }

        // 用户已经注册，验证验证码是否正确
        String result = smsCodeService.selectByPhoneAndCode(phone, code);
        if (!Objects.equals(Constant.SUCCESS, result)) {
            validate.setMessage(result);
            return validate;
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
            validate.setMessage(Constant.SUCCESS);
            validate.setToken(token);
            return validate;
        } else {
//            return Constant.SUCCESS + "_" + token;
            validate.setMessage(Constant.SUCCESS);
            validate.setToken(token);
            return validate;
        }
    }


    /**
     * 验证手机号码 验证码是否为控
     */
    public UserValidate validateNotNull(final String phone, final String code) {
        UserValidate validate = new UserValidate();
        if (StringUtils.isBlank(phone)) {
            validate.setMessage("手机号码不能为空");
            return validate;
        }

        if (StringUtils.isBlank(code)) {
            validate.setMessage("验证码不能为空");
            return validate;
        }

        validate.setMessage(Constant.SUCCESS);
        return validate;
    }

    public ApiUser selectByUserName(String userName) {
        Example example = new Example(ApiUser.class);
        example.createCriteria().andEqualTo("userName", userName);
        List<ApiUser> list = this.selectByExample(example);
        return CollectionUtils.isNotEmpty(list) ? list.get(0) : null;
    }
}
