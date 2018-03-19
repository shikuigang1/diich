package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Organization;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

public interface OrganizationMapper extends BaseMapper<Organization> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Organization record);

    int insertSelective(Organization record);

    Organization selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Organization record);

    int updateByPrimaryKey(Organization record);

    Organization selectOrganizationById(Long id);

    List<Organization> selectOrganizationByUserId(Long userId);

    List<Organization> selectOrganizationByUserAndStatus(@Param("params") Map<String, Object> params, RowBounds rowBounds);

    int selectOrganizationCountByUserAndStatus(@Param("params") Map<String, Object> params);

    Organization selectByUserId(@Param("userId") long userId);

}