package com.diich.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.diich.core.model.IchMaster;
import com.diich.core.model.IchProject;
import com.diich.core.model.Search;
import com.diich.core.service.IchMasterService;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.SearchService;
import com.diich.mapper.SearchMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2017/5/8 0008.
 */

@Service("searchService")
@Transactional
public class SearchServiceImpl implements SearchService {

    @Autowired
    private SearchMapper searchMapper;

    @Autowired
    private IchProjectService ichProjectService;

    @Autowired
    private IchMasterService ichMasterService;

    @Autowired
    private RedisTemplate<Serializable, Serializable> redisTemplate;

    private final static Long EXPIRE = 15L;
    private final static TimeUnit TIME_UNIT = TimeUnit.MINUTES;

    @Override
    public Integer search(List<Map<String, Object>> resultList, JSONObject condition) throws Exception {
        Integer total = (Integer) get(condition.toString() + "_total");
        if(total == null) {
            total = searchMapper.queryForCount(condition);
            put(condition.toString() + "_total", total);
        }

        List<Map<String, Object>> rList = (ArrayList) get(condition.toString());
        if(rList != null) {
            for(Map<String, Object> map : rList) {
                resultList.add(map);
            }
            return total;
        }

        List<Search> contentList = searchMapper.queryForSearch(condition);
        for(Search search : contentList) {
            Integer targetType = search.getTargetType();
            Long targetId = search.getTargetId();

            Map<String, Object> searchMap = new HashMap<>();

            if(targetType == 0) {
                IchProject project = ichProjectService.getIchProject(targetId + "");
                searchMap.put("project", project);
            } else if(targetType == 1) {
                IchMaster master = ichMasterService.getIchMaster(targetId + "");
                searchMap.put("master", master);
            }

            resultList.add(searchMap);
        }

        put(condition.toString(), resultList);

        return total;
    }

    private void put(String key, List<Map<String, Object>> value) throws Exception {
        ValueOperations<Serializable, Serializable> opsFroValue = redisTemplate.opsForValue();
        opsFroValue.set(key, (ArrayList)value, EXPIRE, TIME_UNIT);
    }

    private void put(String key, Integer value) throws Exception {
        ValueOperations<Serializable, Serializable> opsFroValue = redisTemplate.opsForValue();
        opsFroValue.set(key, value, EXPIRE, TIME_UNIT);
    }

    private Object get(String key) throws Exception {
        ValueOperations<Serializable, Serializable> opsFroValue = redisTemplate.opsForValue();
        return opsFroValue.get(key);
    }

    public boolean clearAllKey() throws Exception {
        Set set = redisTemplate.keys("*");
        Iterator it = set.iterator();
        while (it.hasNext()) {
            redisTemplate.delete(it.next().toString());
        }
        return true;
    }

}