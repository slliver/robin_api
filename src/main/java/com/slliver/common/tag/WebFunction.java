package com.slliver.common.tag;

import com.slliver.common.utils.BannerUtil;

/**
 * @Description: 用一句话具体描述类的功能
 * @author: slliver
 * @date: 2018/3/16 16:12
 * @version: 1.0
 */
public class WebFunction {

    public static String getBussinessValue(String input) {
        return BannerUtil.getBussinessValue(input);
    }

    public static String getForwardValue(String input) {
        return BannerUtil.getForwardValue(input);
    }
}
