package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Dictionary;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface DictionaryMapper extends BaseMapper<Dictionary> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Dictionary record);

    int insertSelective(Dictionary record);

    Dictionary selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Dictionary record);

    int updateByPrimaryKey(Dictionary record);

    List<Dictionary> selectListByType(Integer type) throws Exception;

    Dictionary selectByCode(String code) throws Exception;

    List<Dictionary> selectByParentId(@Param("params") Map<String, Object> params) throws Exception;

    List<Dictionary> selectAllDictionary() throws Exception;
}