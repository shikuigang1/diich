package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Version;

import java.util.List;

public interface VersionMapper extends BaseMapper<Version> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Version record);

    int insertSelective(Version record);

    Version selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Version record);

    int updateByPrimaryKey(Version record);

    List<Version> selectVersionByLangIdAndTargetType(Version version);
}