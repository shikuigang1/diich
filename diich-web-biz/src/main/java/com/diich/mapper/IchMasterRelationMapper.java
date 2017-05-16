package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.IchMasterRelation;

public interface IchMasterRelationMapper extends BaseMapper<IchMasterRelation> {
    int deleteByPrimaryKey(Long id);

    Integer insert(IchMasterRelation record);

    int insertSelective(IchMasterRelation record);

    IchMasterRelation selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(IchMasterRelation record);

    int updateByPrimaryKey(IchMasterRelation record);
}