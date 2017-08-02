package com.diich.core.service;

import com.diich.core.model.IchObject;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/21 0021.
 */
public interface SearchService {

    int search(Map<String, Object> condition, List<IchObject> ichObjectList);

    boolean clearAllKey() throws Exception;
}
