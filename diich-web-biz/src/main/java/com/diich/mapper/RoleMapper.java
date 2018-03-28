package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Role;

/**
 * Created by Administrator on 2018/3/12.
 */
public interface RoleMapper extends BaseMapper<Role> {

    int deleteByPrimaryKey(Long id);

    Integer insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);
}
