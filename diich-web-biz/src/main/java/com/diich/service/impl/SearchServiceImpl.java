package com.diich.service.impl;

import com.diich.core.model.IchMaster;
import com.diich.core.model.IchProject;
import com.diich.core.model.IchObject;
import com.diich.core.service.IchMasterService;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.SearchService;
import com.diich.mapper.IchObjectMapper;
import org.apache.ibatis.session.RowBounds;
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
    private IchObjectMapper ichObjectMapper;

    @Autowired
    private IchProjectService ichProjectService;

    @Autowired
    private IchMasterService ichMasterService;

    @Autowired
    private RedisTemplate<Serializable, Serializable> redisTemplate;

    private final static Long EXPIRE = 15L;
    private final static TimeUnit TIME_UNIT = TimeUnit.MINUTES;

    @Override
    public Integer search(List<Map<String, Object>> resultList, Map<String, Object> condition) throws Exception {
        Integer total = getDataFromRedis(resultList, condition);
        if(total != null) {
            return total;
        }

        RowBounds rowBounds = new RowBounds((Integer) condition.get("offset"),
                (Integer) condition.get("limit"));
        List<?> list = ichObjectMapper.searchList(condition, rowBounds);

        if(list.size() != 0 && list.get(0) != null) {
            for(IchObject obj : (ArrayList<IchObject>)list.get(0)) {
                Integer targetType = obj.getTargetType();
                Long targetId = obj.getTargetId();

                Map<String, Object> searchMap = new HashMap<>();

                if(targetType == 0) {
                    obj = ichProjectService.getIchProject(targetId + "");
                    searchMap.put("project", obj);
                } else if(targetType == 1) {
                    obj = ichMasterService.getIchMaster(targetId + "");
                    searchMap.put("master", obj);
                }

                resultList.add(searchMap);
            }
        }

        if(list.size() != 0 && list.get(1) != null) {
            if(list.get(1) instanceof ArrayList) {
                List tmpList = (ArrayList)list.get(1);
                total = (Integer) ((tmpList != null && tmpList.size() != 0) ? tmpList.get(0) : 0);
            }
        }

        put(condition.toString() + "_total", total);
        put(condition.toString(), resultList);

        return total != null ? total : 0;
    }

    private Integer getDataFromRedis(List<Map<String, Object>> resultList, Map<String, Object> condition)
            throws Exception {
        Integer redisTotal = (Integer) get(condition.toString() + "_total");
        List<Map<String, Object>> redisList = (ArrayList) get(condition.toString());
        if(redisTotal != null && redisList != null) {
            for(Map<String, Object> map : redisList) {
                resultList.add(map);
            }
            return redisTotal;
        }

        return null;
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