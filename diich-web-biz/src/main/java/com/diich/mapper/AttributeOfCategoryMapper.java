package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.AttributeOfCategory;

import java.util.List;

public interface AttributeOfCategoryMapper extends BaseMapper<AttributeOfCategory>{
    int deleteByPrimaryKey(Long id);

    Integer insert(AttributeOfCategory record);

    int insertSelective(AttributeOfCategory record);

    AttributeOfCategory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AttributeOfCategory record);

    int updateByPrimaryKey(AttributeOfCategory record);

    List<AttributeOfCategory> selectAttrListByCategory(Long id);
}