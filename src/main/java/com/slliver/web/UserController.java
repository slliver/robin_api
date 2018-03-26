package com.slliver.web;

import com.slliver.base.controller.WebBaseController;
import com.slliver.base.domain.BaseSearchCondition;
import com.slliver.common.paging.PageWapper;
import com.slliver.entity.ApiUser;
import com.slliver.service.ApiUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @Description: 用一句话具体描述类的功能
 * @author: slliver
 * @date: 2018/3/22 14:16
 * @version: 1.0
 */
@Controller
@RequestMapping("/user")
public class UserController extends WebBaseController<ApiUser> {

    @Autowired
    private ApiUserService userService;

    @RequestMapping(value = "/list", method = {RequestMethod.POST, RequestMethod.GET})
    public String list(Model model, BaseSearchCondition condition) {
        PageWapper<ApiUser> pageWapper = this.userService.selectListByPage(condition);
        model.addAttribute("dataList", pageWapper.getList());
        model.addAttribute("pagnation", pageWapper.getPagingHtml());
        model.addAttribute("condition", condition);
        return getViewPath("list");
    }

    @Override
    protected String getPath() {
        return "/user";
    }
}
