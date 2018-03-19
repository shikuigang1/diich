package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.ContentFragmentResource;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContentFragmentResourceMapper extends BaseMapper<ContentFragmentResource> {
    int deleteByPrimaryKey(Long id);

    Integer insert(ContentFragmentResource record);

    int insertSelective(ContentFragmentResource record);

    ContentFragmentResource selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ContentFragmentResource record);

    int updateByPrimaryKey(ContentFragmentResource record);

    List<ContentFragmentResource> selectByContentFragmentId(Long contentFragmentId);

    List<ContentFragmentResource> selectByContentFragmentIds(@Param("list") List list);

    int deleteByContentFragmentId(Long contentFragmentId);

    int deleteByResourceId(Long resourceId);

    void deleteByContentFragmentIdResourceId(@Param("contentFragmentId") Long contentFragmentId, @Param("resourceId") Long resourceId);
}