package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Audit;

public interface AuditMapper extends BaseMapper<Audit> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Audit record);

    int insertSelective(Audit record);

    Audit selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Audit record);

    int updateByPrimaryKey(Audit record);
}