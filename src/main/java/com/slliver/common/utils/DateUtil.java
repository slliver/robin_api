package com.slliver.common.utils;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

import java.util.Date;

/**
 * @Description: 用一句话具体描述类的功能
 * @author: slliver
 * @date: 2018/3/9 10:46
 * @version: 1.0
 */
public class DateUtil {

    public static void main(String[] args) {
        Date date = new Date();
        Date expireDate = DateUtils.addMinutes(date, 10);
        System.out.println(DateFormatUtils.format(expireDate, "yyyy-MM-dd HH:mm:ss"));
    }

    public static Date getCurrentDate(){
        return new Date();
    }
}
