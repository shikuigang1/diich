package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Role;

/**
 * Created by Administrator on 2018/3/12.
 */
public interface RoleMapper extends BaseMapper<Role> {
    Role selectByPrimaryKey(Long id);

}
