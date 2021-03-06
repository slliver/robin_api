package com.slliver.common.exception;

/**
 * @Description: 用一句话具体描述类的功能
 * @author: slliver
 * @date: 2018/3/5 15:31
 * @version: 1.0
 */
public class RQWebException extends RQException{
    private static final long serialVersionUID = -4095444626440778143L;

    /**
     * @param message
     *            异常信息
     */
    public RQWebException(String message) {
        super(message);
    }

    /**
     * @param category
     *            异常类型
     * @param message
     *            异常信息
     */
    public RQWebException(int category, String message) {
        super(category, message);
    }

    /**
     * @param message
     *            异常信息
     * @param throwable
     *            异常对象
     */
    public RQWebException(String message, Throwable throwable) {
        super(message, throwable);
    }

    /**
     * @param category
     *            异常类型
     * @param message
     *            异常信息
     * @param throwable
     *            异常对象
     */
    public RQWebException(int category, String message, Throwable throwable) {
        super(category, message, throwable);
    }

    /**
     * 取得异常类型
     *
     * @return 异常类型
     */
    @Override
    public int getCategory() {
        return category;
    }

    /**
     * 取得异常信息
     *
     * @return 异常信息
     */
    @Override
    public String getMessage() {
        return message;
    }

    /**
     * 取得异常对象
     *
     * @return 异常对象
     */
    @Override
    public Throwable getThrowable() {
        return throwable;
    }
}
