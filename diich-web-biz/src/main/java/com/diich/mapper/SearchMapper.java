package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Search;

import java.util.List;

public interface SearchMapper extends BaseMapper<Search> {
    List<Search> queryForSearch(Search.Condition condition);//调用存储过程

    Integer queryForCount(Search.Condition condition) throws Exception;
}