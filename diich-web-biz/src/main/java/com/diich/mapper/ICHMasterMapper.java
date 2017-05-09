package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.ICHMaster;

public interface ICHMasterMapper extends BaseMapper<ICHMaster>{
    int deleteByPrimaryKey(Long id);

    Integer insert(ICHMaster record);

    int insertSelective(ICHMaster record);

    ICHMaster selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ICHMaster record);

    int updateByPrimaryKeyWithBLOBs(ICHMaster record);

    int updateByPrimaryKey(ICHMaster record);
}