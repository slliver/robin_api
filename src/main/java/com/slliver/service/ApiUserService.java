package com.slliver.service;

import com.github.pagehelper.PageHelper;
import com.slliver.base.domain.BaseSearchCondition;
import com.slliver.base.service.BaseService;
import com.slliver.common.Constant;
import com.slliver.common.ValidationConstant;
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

        // 验证空值
        String statusCodeNull = this.validateNotNull(phone, code);
        if (!Objects.equals(ValidationConstant.SUCCESS, statusCodeNull)) {
            validate.setStatusCode(statusCodeNull);
            validate.setMessage(ValidationConstant.getStatusCodeMessage(statusCodeNull));
            return validate;
        }

        // 验证验证码是否有效
        String statusCode = this.smsCodeService.selectByPhoneAndCode(phone.trim(), code.trim());
        if (!Objects.equals(ValidationConstant.SUCCESS, statusCode)) {
            validate.setStatusCode(statusCode);
            validate.setMessage(ValidationConstant.getStatusCodeMessage(statusCode));
            return validate;
        }

        // 验证手机号码是否已经注册
        ApiUser user = this.userService.selectByPhone(phone);
        if (user != null) {
            validate.setStatusCode(ValidationConstant.PHOME_HAS_REGISTER);
            validate.setMessage(ValidationConstant.getStatusCodeMessage(ValidationConstant.PHOME_HAS_REGISTER));
            validate.setToken(user.getAccessToken());
            return validate;
        }

        validate = this.userService.save(phone);
        // 注册失败
        if (StringUtils.isBlank(validate.getToken())) {
            validate.setStatusCode(ValidationConstant.REGISTER_FAIL);
            validate.setMessage(ValidationConstant.getStatusCodeMessage(ValidationConstant.REGISTER_FAIL));
            return validate;
        }

        validate.setStatusCode(ValidationConstant.SUCCESS);
        validate.setMessage(ValidationConstant.SUCCESS);
        return validate;
    }

    /**
     * 验证用户手机号码登录
     */
    public UserValidate validatePhoneLogin(final String phone, final String code){
        UserValidate validate = new UserValidate();
        String statusCode = this.validateNotNull(phone, code);
        if (!Objects.equals(ValidationConstant.SUCCESS, statusCode)) {
            validate.setStatusCode(statusCode);
            validate.setMessage(ValidationConstant.getStatusCodeMessage(statusCode));
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
            validate.setStatusCode(ValidationConstant.PHOME_NOT_REGISTER);
            validate.setMessage(ValidationConstant.getStatusCodeMessage(ValidationConstant.PHOME_NOT_REGISTER));
            return validate;
        }

        // 用户已经注册，验证验证码是否正确
        String statusCode = smsCodeService.selectByPhoneAndCode(phone, code);
        if (!Objects.equals(ValidationConstant.SUCCESS, statusCode)) {
            validate.setStatusCode(statusCode);
            validate.setMessage(ValidationConstant.getStatusCodeMessage(statusCode));
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
            validate.setStatusCode(ValidationConstant.SUCCESS);
            validate.setMessage(ValidationConstant.SUCCESS);
            validate.setToken(token);
            return validate;
        } else {
            validate.setStatusCode(ValidationConstant.SUCCESS);
            validate.setMessage(ValidationConstant.SUCCESS);
            validate.setToken(token);
            return validate;
        }
    }


    /**
     * 验证手机号码 验证码是否为控
     */
    public String validateNotNull(final String phone, final String code) {
        if (StringUtils.isBlank(phone)) {
            return ValidationConstant.PHONE_NULL;
        }

        if (StringUtils.isBlank(code)) {
            return ValidationConstant.CODE_NULL;
        }

        return ValidationConstant.SUCCESS;
    }

    public ApiUser selectByUserName(String userName) {
        Example example = new Example(ApiUser.class);
        example.createCriteria().andEqualTo("userName", userName);
        List<ApiUser> list = this.selectByExample(example);
        return CollectionUtils.isNotEmpty(list) ? list.get(0) : null;
    }
}
