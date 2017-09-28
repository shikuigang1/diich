package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Resource;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResourceMapper extends BaseMapper<Resource> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Resource record);

    int insertSelective(Resource record);

    Resource selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Resource record);

    int updateByPrimaryKey(Resource record);

    Resource selectByContentFramentID(Long id);

    List<Resource> selectByids(@Param("list") List list);
}