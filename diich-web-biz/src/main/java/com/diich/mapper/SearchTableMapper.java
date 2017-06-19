package com.diich.mapper;

import com.diich.core.model.SearchTable;
import com.diich.core.model.SearchTableKey;

import java.util.List;
import java.util.Map;

public interface SearchTableMapper {
    int deleteByPrimaryKey(SearchTableKey key);

    int insert(SearchTable record);

    int insertSelective(SearchTable record);

    SearchTable selectByPrimaryKey(SearchTableKey key);

    int updateByPrimaryKeySelective(SearchTable record);

    int updateByPrimaryKeyWithBLOBs(SearchTable record);

    int updateByPrimaryKey(SearchTable record);

    //搜索使用
    List<SearchTable> queryByMap(Map map);
   int queryByMapCount(Map map);
}