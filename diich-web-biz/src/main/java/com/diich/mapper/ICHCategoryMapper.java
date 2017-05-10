package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.ICHCategory;

public interface ICHCategoryMapper extends BaseMapper<ICHCategory>{
    int deleteByPrimaryKey(Long id);

    Integer insert(ICHCategory record);

    int insertSelective(ICHCategory record);

    ICHCategory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ICHCategory record);

    int updateByPrimaryKey(ICHCategory record);
}