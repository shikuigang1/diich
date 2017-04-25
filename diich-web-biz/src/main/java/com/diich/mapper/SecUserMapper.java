package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.SecUser;

public interface SecUserMapper extends BaseMapper<SecUser>{
    int deleteByPrimaryKey(Integer user_id);

    Integer insert(SecUser record);

    int insertSelective(SecUser record);

    SecUser selectByPrimaryKey(Integer user_id);

    int updateByPrimaryKeySelective(SecUser record);

    int updateByPrimaryKey(SecUser record);
}