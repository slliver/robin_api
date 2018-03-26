package com.slliver.web;

import com.slliver.base.controller.ApiBaseController;
import com.slliver.base.domain.BaseSearchCondition;
import com.slliver.common.Constant;
import com.slliver.common.domain.ApiMessage;
import com.slliver.common.domain.ApiRichResult;
import com.slliver.common.paging.PageWapper;
import com.slliver.common.utils.TokenUtil;
import com.slliver.entity.ApiBanner;
import com.slliver.entity.ApiIndexMessage;
import com.slliver.entity.ApiLoanData;
import com.slliver.service.ApiLoanDataService;
import com.slliver.service.BannerService;
import com.slliver.service.IndexMessageService;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @Description: 用一句话具体描述类的功能
 * @author: slliver
 * @date: 2018/3/8 16:35
 * @version: 1.0
 */
@RestController
@RequestMapping("api/index")
public class ApiIndexController extends ApiBaseController {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private ApiLoanDataService loanDataService;
    @Autowired
    private BannerService bannerService;
    @Autowired
    private IndexMessageService indexMessageService;

    /**
     * 首页
     *
     * @param token
     * @param condition
     * @return
     */
    @PostMapping(value = "/index")
    public ApiRichResult index(@RequestHeader("request_token") String token, BaseSearchCondition condition) {
        ApiRichResult result = new ApiRichResult();
        // 获取用户信息,从缓存中获取用户信息
//        String userPkid = redisTemplate.opsForValue().get(token);
//        System.out.println("从缓存中获取用户 pkid === >> " + userPkid);
        System.out.println("token  === >> " + token);
        PageWapper<ApiLoanData> page = loanDataService.selectListByPage(condition);
        if(page != null){
            List<ApiLoanData> list = page.getList();
            for (ApiLoanData loan : list) {
                loan.setHttpUrl(Constant.SERVER_IMAGE_ADDRESS + "/" + loan.getHttpUrl());
            }
            page.setList(list);
        }
        result.setSucceed(page, "接口调用成功, 当前第" + page.getPageNum() + "页");
        return result;
    }


    /**
     * 获取banner
     *
     * @param token
     * @param bussinessType
     * @return
     */
    @PostMapping(value = "/banner")
    public ApiRichResult banner(@RequestHeader("request_token") String token, @RequestParam("bussinessType") String bussinessType, HttpServletRequest request) {
        ApiRichResult result = new ApiRichResult();
        List<ApiBanner> list = this.bannerService.selectByBussinessTypeApi(bussinessType);
//        String url = "http://" + request.getLocalAddr() + ":" + request.getServerPort();
        for (ApiBanner banner : list) {
//            banner.setHttpUrl(url + "/resource/" + banner.getHttpUrl());
            banner.setHttpUrl(Constant.SERVER_IMAGE_ADDRESS + "/" + banner.getHttpUrl());
            System.out.println("httpUrl == >>> " + banner.getHttpUrl());
        }

        result.setSucceed(list, "获取banner数据成功");
        return result;
    }

    /**
     * 提示消息
     * @param token
     * @return
     */
    @PostMapping(value = "/message")
    public ApiRichResult message(@RequestHeader("request_token") String token) {
        ApiRichResult result = new ApiRichResult();
        ApiIndexMessage message = indexMessageService.selectIndex();
        result.setSucceed(message, "接口调用成功");
        return result;
    }
}
