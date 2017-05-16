package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.EditDetail;

public interface EditDetailMapper extends BaseMapper<EditDetail> {
    int deleteByPrimaryKey(Long id);

    Integer insert(EditDetail record);

    int insertSelective(EditDetail record);

    EditDetail selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(EditDetail record);

    int updateByPrimaryKeyWithBLOBs(EditDetail record);

    int updateByPrimaryKey(EditDetail record);
}