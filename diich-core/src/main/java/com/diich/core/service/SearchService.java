package com.diich.core.service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/21 0021.
 */
public interface SearchService {

    //搜索存储过程调用
    Integer search(List<Map<String, Object>> list, Map<String, Object> condition) throws Exception;

    boolean clearAllKey() throws Exception;
}
