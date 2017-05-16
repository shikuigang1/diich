package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Attribute;

import java.util.List;

public interface AttributeMapper extends BaseMapper<Attribute>{
    int deleteByPrimaryKey(Long id);

    Integer insert(Attribute record);

    int insertSelective(Attribute record);

    Attribute selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Attribute record);

    int updateByPrimaryKey(Attribute record);

    List<Attribute> selectAttrListByCategory(Long categoryId);
}