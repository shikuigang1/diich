package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.TargetAuthority;

/**
 * Created by Administrator on 2018/3/13.
 */
public interface TargetAuthorityMapper extends BaseMapper<TargetAuthority> {
    int deleteByPrimaryKey(Long id);

    Integer insert(TargetAuthority record);

    int insertSelective(TargetAuthority record);

    TargetAuthority selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TargetAuthority record);

    int updateByPrimaryKey(TargetAuthority record);
}
