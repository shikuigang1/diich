package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Authority;

import java.util.List;

/**
 * Created by Administrator on 2018/3/12.
 */
public interface AuthorityMapper extends BaseMapper<Authority> {
    List<Authority> selectByRoleId(Long roleId) throws Exception;
}
