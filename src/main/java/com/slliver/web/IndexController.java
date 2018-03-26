package com.slliver.web;

import com.slliver.base.controller.WebBaseController;
import com.slliver.base.domain.BaseDomain;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Description: 用一句话具体描述类的功能
 * @author: slliver
 * @date: 2018/3/13 17:54
 * @version: 1.0
 */
@Controller
@RequestMapping("index")
public class IndexController extends WebBaseController<BaseDomain> {

    @RequestMapping("index")
    public String index() {
        return getViewPath("index");
    }

    @Override
    protected String getPath() {
        return "/index";
    }
}
