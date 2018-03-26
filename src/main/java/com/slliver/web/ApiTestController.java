package com.slliver.web;

import com.slliver.base.controller.ApiBaseController;
import com.slliver.base.domain.BaseSearchCondition;
import com.slliver.common.Constant;
import com.slliver.common.domain.ApiRichResult;
import com.slliver.common.domain.UserToken;
import com.slliver.common.paging.PageWapper;
import com.slliver.common.utils.CipherUtil;
import com.slliver.common.utils.IpAddressUtil;
import com.slliver.common.utils.TokenUtil;
import com.slliver.entity.ApiIndexMessage;
import com.slliver.entity.ApiLoanData;
import com.slliver.entity.ApiUser;
import com.slliver.service.ApiLoanDataService;
import com.slliver.service.ApiSmsCodeService;
import com.slliver.service.ApiUserService;
import com.slliver.service.IndexMessageService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Objects;

/**
 * @Description: 用一句话具体描述类的功能
 * @author: slliver
 * @date: 2018/3/8 13:42
 * @version: 1.0
 */
@RestController
@RequestMapping("api/test")
public class ApiTestController extends ApiBaseController {

    @Autowired
    private ApiUserService userService;
    @Autowired
    private ApiSmsCodeService smsCodeService;

    @GetMapping(value = "/verificationCode")
    public ApiRichResult getVerificationCode(@RequestParam("phone") String phone) {
        ApiRichResult result = new ApiRichResult();
        if (StringUtils.isBlank(phone)) {
            result.setFailMsg("手机号码不能为空~");
            return result;
        }

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String ipAddress = IpAddressUtil.getIpAddress(request);
        UserToken sendResult = this.smsCodeService.updateSendCode(phone, ipAddress);
        result.setSucceed(sendResult, "接口调用成功");
        return result;
    }


    @RequestMapping(value = "/register", method = {RequestMethod.POST})
    public ApiRichResult register(@RequestParam("phone") String phone, @RequestParam("code") String code) {
        ApiRichResult result = new ApiRichResult();
        UserToken userToken = null;
        if (StringUtils.isBlank(phone)) {
            userToken = new UserToken();
            userToken.setMessage("手机号码不能为空");
            result.setSucceed(userToken, "接口调用成功");
            return result;
        }

        ApiUser user = this.userService.selectByPhone(phone);
        if (user != null) {
            userToken = new UserToken();
            userToken.setToken(user.getAccessToken());
            userToken.setMessage("手机号码已经注册，请直接登录");
            result.setSucceed(userToken, "接口调用成功");
            return result;
        }

        if (StringUtils.isBlank(code)) {
            userToken = new UserToken();
            userToken.setMessage("验证码不能为空");
            result.setSucceed(userToken, "接口调用成功");
            return result;
        }

        String message = this.smsCodeService.selectByPhoneAndCode(phone.trim(), code.trim());
        if (!Objects.equals(Constant.SUCCESS, message)) {
            result.setFailMsg(message);
            return result;
        }

        userToken = this.userService.save(phone);
        if (StringUtils.isBlank(userToken.getToken())) {
            userToken = new UserToken();
            userToken.setMessage("注册失败");
            result.setSucceed(userToken, "接口调用成功");
            return result;
        }

        userToken.setMessage(Constant.SUCCESS);
        result.setSucceed(userToken, "接口调用成功");
        return result;
    }

    @RequestMapping(value = "/login")
    public ApiRichResult login(@RequestParam("userName") String name, @RequestParam("password") String password) {
        ApiRichResult result = new ApiRichResult();
        result.setSucceed("1000", "用户名密码登录接口调用成功, 用户名密码正确");
        return result;
    }


    @PostMapping(value = "/phoneLogin")
    public ApiRichResult phoneLogin(@RequestParam("phone") String phone, @RequestParam("code") String code) {
        ApiRichResult result = new ApiRichResult();
        UserToken userToken = null;
        if (StringUtils.isBlank(phone)) {
            userToken = new UserToken();
            userToken.setMessage("手机号码不能为空");
            result.setSucceed(userToken, "接口调用成功");
            return result;
        }
        if (StringUtils.isBlank(code)) {
            userToken = new UserToken();
            userToken.setMessage("验证码不能为空");
            result.setSucceed(userToken, "接口调用成功");
            return result;
        }

        userToken = userService.phoneLogin(phone, code);
        if (Objects.equals(userToken.getMessage(), Constant.SUCCESS)) {
            result.setSucceed(userToken, "接口调用成功");
            return result;
        } else {
            result.setFail(userToken, "接口调用失败");
            return result;
        }
    }

    @Autowired
    private ApiLoanDataService loanDataService;

    @GetMapping(value = "/index")
    public ApiRichResult index(@RequestHeader("request_token") String token, BaseSearchCondition condition) {
        ApiRichResult result = new ApiRichResult();
        // 获取用户信息
        String userPkid = TokenUtil.getUserPkid(token);
        System.out.println(" === >>> " + userPkid);
        PageWapper<ApiLoanData> page = loanDataService.selectListByPage(condition);
        result.setSucceed(page, "接口调用成功, 当前第" + page.getPageNum() + "页");
        return result;
    }


    @PostMapping(value = "/addUser")
    public ApiRichResult addUser(ApiUser user) {
        ApiRichResult result = new ApiRichResult();
        // 第一次加密md5
        String pwrsMD5 = CipherUtil.generatePassword(Constant.DEFAULT_PASSWORD);
        String salt = CipherUtil.createSalt();
        user.setPassword(CipherUtil.createPwdEncrypt(user.getUserName(), pwrsMD5, salt));
        user.setSalt(salt);
        user.setPhone("18040127055");
        this.userService.insert(user);
        result.setSucceed("ok");
        return result;
    }

    @Autowired
    private IndexMessageService indexMessageService;

    @PostMapping(value = "/addIndexMessage")
    public ApiRichResult addIndexMessage(ApiIndexMessage indexMessage) {
        ApiRichResult result = new ApiRichResult();
        indexMessage.setTotalNum(1234);
        indexMessage.setTodayNum(4567);
        indexMessage.setLoanNum(1230);
        indexMessageService.insert(indexMessage);
        result.setSucceed("ok");
        return result;
    }
}
