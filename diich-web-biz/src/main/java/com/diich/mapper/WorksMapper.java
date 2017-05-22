package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Works;

import java.util.List;

public interface WorksMapper extends BaseMapper<Works> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Works record);

    int insertSelective(Works record);

    Works selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Works record);

    int updateByPrimaryKey(Works record);

    List<Works> selectWorks(Works record);

}