package com.diich.mapper;

import com.alibaba.fastjson.JSONObject;
import com.diich.core.base.BaseMapper;
import com.diich.core.model.Search;

import java.util.List;

public interface SearchMapper extends BaseMapper<Search> {
    List<Search> queryForSearch(JSONObject condition);//调用存储过程

    Integer queryForCount(JSONObject condition) throws Exception;
}