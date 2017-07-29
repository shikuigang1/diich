package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Attribute;

import java.util.List;
import java.util.Map;

public interface AttributeMapper extends BaseMapper<Attribute>{
    int deleteByPrimaryKey(Long id);

    Integer insert(Attribute record);

    int insertSelective(Attribute record);

    Attribute selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Attribute record);

    int updateByPrimaryKey(Attribute record);

    List<Attribute> selectAttrListByCatIdAndTarType(Attribute record);

    List<Attribute> selectDefAttrByTarIdAndTarType(Attribute record);

    List<Attribute> selectAttrByNameAndTargetType(Map map);
}