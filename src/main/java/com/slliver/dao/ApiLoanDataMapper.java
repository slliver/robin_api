package com.slliver.dao;

import com.slliver.base.domain.BaseSearchCondition;
import com.slliver.common.mapper.RobinMapper;
import com.slliver.entity.ApiLoanData;

import java.util.List;

public interface ApiLoanDataMapper extends RobinMapper<ApiLoanData> {

    List<ApiLoanData> selectListByPage(BaseSearchCondition condition);

}
