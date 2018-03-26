package com.slliver.web;

import com.slliver.base.controller.ApiBaseController;
import com.slliver.base.domain.BaseSearchCondition;
import com.slliver.common.Constant;
import com.slliver.common.domain.ApiRichResult;
import com.slliver.common.paging.PageWapper;
import com.slliver.entity.ApiCreditCard;
import com.slliver.entity.ApiLoanData;
import com.slliver.service.ApiCreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Description: 信用卡接口
 * @author: slliver
 * @date: 2018/3/16 13:00
 * @version: 1.0
 */
@RestController
@RequestMapping("api/creditcard")
public class ApiCreditCardController extends ApiBaseController<ApiCreditCard> {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private ApiCreditCardService creditCardService;

    @PostMapping(value = "/list")
    public ApiRichResult list(@RequestHeader("request_token") String token, BaseSearchCondition condition) {
        ApiRichResult result = new ApiRichResult();
        // 获取用户信息,从缓存中获取用户信息
//        String userPkid = redisTemplate.opsForValue().get(token);
        PageWapper<ApiCreditCard> page = creditCardService.selectListByPage(condition);
        if(page != null){
            List<ApiCreditCard> list = page.getList();
            for (ApiCreditCard card : list) {
                card.setHttpUrl(Constant.SERVER_IMAGE_ADDRESS + "/" + card.getHttpUrl());
            }
            page.setList(list);
        }
        result.setSucceed(page, "获取数据成功, 当前第" + page.getPageNum() + "页");
        return result;
    }
}
