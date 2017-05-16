package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Dictionary;

public interface DictionaryMapper extends BaseMapper<Dictionary> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Dictionary record);

    int insertSelective(Dictionary record);

    Dictionary selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Dictionary record);

    int updateByPrimaryKey(Dictionary record);
}