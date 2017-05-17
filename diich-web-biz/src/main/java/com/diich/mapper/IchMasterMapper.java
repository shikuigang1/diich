package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.IchMaster;

public interface IchMasterMapper extends BaseMapper<IchMaster> {
    int deleteByPrimaryKey(Long id);

    Integer insert(IchMaster record);

    int insertSelective(IchMaster record);

    IchMaster selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(IchMaster record);

    int updateByPrimaryKey(IchMaster record);

}