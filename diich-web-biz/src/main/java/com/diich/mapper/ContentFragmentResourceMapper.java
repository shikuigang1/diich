package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.ContentFragmentResource;

import java.util.List;

public interface ContentFragmentResourceMapper extends BaseMapper<ContentFragmentResource> {
    int deleteByPrimaryKey(Long id);

    Integer insert(ContentFragmentResource record);

    int insertSelective(ContentFragmentResource record);

    ContentFragmentResource selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ContentFragmentResource record);

    int updateByPrimaryKey(ContentFragmentResource record);

    List<ContentFragmentResource> selectByContentFragmentId(Long contentFragmentId);
    int deleteByContentFragmentId(Long contentFragmentId);
}