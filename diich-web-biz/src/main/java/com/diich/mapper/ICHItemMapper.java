package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.ICHItem;

public interface ICHItemMapper extends BaseMapper<ICHItem>{
    int deleteByPrimaryKey(Long id);

    Integer insert(ICHItem record);

    int insertSelective(ICHItem record);

    ICHItem selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ICHItem record);

    int updateByPrimaryKeyWithBLOBs(ICHItem record);

    int updateByPrimaryKey(ICHItem record);
}