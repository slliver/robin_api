package com.slliver.base.entity;

import com.slliver.base.domain.BaseDomain;
import javax.persistence.*;

@Table(name = "index_message")
public class IndexMessage extends BaseDomain {
    /**
     * 累积申请人数
     */
    @Column(name = "total_num")
    private Integer totalNum;

    /**
     * 今日多少人申请
     */
    @Column(name = "today_num")
    private Integer todayNum;

    /**
     * 谁在极速贷借款多少
     */
    @Column(name = "loan_num")
    private Integer loanNum;

    /**
     * 绑定的对应业务的pkid
     */
    private String reserved1;

    /**
     * 预留字段
     */
    private String reserved2;

    /**
     * 获取累积申请人数
     *
     * @return total_num - 累积申请人数
     */
    public Integer getTotalNum() {
        return totalNum;
    }

    /**
     * 设置累积申请人数
     *
     * @param totalNum 累积申请人数
     */
    public void setTotalNum(Integer totalNum) {
        this.totalNum = totalNum;
    }

    /**
     * 获取今日多少人申请
     *
     * @return today_num - 今日多少人申请
     */
    public Integer getTodayNum() {
        return todayNum;
    }

    /**
     * 设置今日多少人申请
     *
     * @param todayNum 今日多少人申请
     */
    public void setTodayNum(Integer todayNum) {
        this.todayNum = todayNum;
    }

    /**
     * 获取谁在极速贷借款多少
     *
     * @return loan_num - 谁在极速贷借款多少
     */
    public Integer getLoanNum() {
        return loanNum;
    }

    /**
     * 设置谁在极速贷借款多少
     *
     * @param loanNum 谁在极速贷借款多少
     */
    public void setLoanNum(Integer loanNum) {
        this.loanNum = loanNum;
    }

    /**
     * 获取绑定的对应业务的pkid
     *
     * @return reserved1 - 绑定的对应业务的pkid
     */
    public String getReserved1() {
        return reserved1;
    }

    /**
     * 设置绑定的对应业务的pkid
     *
     * @param reserved1 绑定的对应业务的pkid
     */
    public void setReserved1(String reserved1) {
        this.reserved1 = reserved1;
    }

    /**
     * 获取预留字段
     *
     * @return reserved2 - 预留字段
     */
    public String getReserved2() {
        return reserved2;
    }

    /**
     * 设置预留字段
     *
     * @param reserved2 预留字段
     */
    public void setReserved2(String reserved2) {
        this.reserved2 = reserved2;
    }
}