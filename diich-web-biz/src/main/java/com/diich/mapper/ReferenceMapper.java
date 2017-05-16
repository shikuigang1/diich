package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Reference;

public interface ReferenceMapper extends BaseMapper<Reference> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Reference record);

    int insertSelective(Reference record);

    Reference selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Reference record);

    int updateByPrimaryKey(Reference record);
}