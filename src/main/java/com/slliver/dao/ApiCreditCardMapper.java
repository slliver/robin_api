package com.slliver.dao;

import com.slliver.base.domain.BaseSearchCondition;
import com.slliver.common.mapper.RobinMapper;
import com.slliver.entity.ApiCreditCard;
import com.slliver.entity.ApiLoanData;

import java.util.List;

public interface ApiCreditCardMapper extends RobinMapper<ApiCreditCard>{
    List<ApiCreditCard> selectListByPage(BaseSearchCondition condition);
}
