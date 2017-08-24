package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Organization;

import java.util.List;

public interface OrganizationMapper extends BaseMapper<Organization> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Organization record);

    int insertSelective(Organization record);

    Organization selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Organization record);

    int updateByPrimaryKey(Organization record);

    Organization selectOrganizationById(Long id);

    List<Organization> selectOrganizationByUserId(Long userId);
}