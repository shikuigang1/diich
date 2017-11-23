package com.diich.service.impl;

import com.diich.core.model.ContentFragment;
import com.diich.core.model.IchMaster;
import com.diich.core.model.IchObject;
import com.diich.core.model.IchProject;
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
    private RedisTemplate<Serializable, Serializable> redisTemplate;

    private final static Long EXPIRE = 15L;
    private final static TimeUnit TIME_UNIT = TimeUnit.MINUTES;

    public int search(Map<String, Object> condition, List<IchObject> ichObjectList) throws Exception {
        RowBounds rowBounds = new RowBounds((Integer) condition.get("offset"),
                (Integer) condition.get("limit"));

        List<?> list = ichObjectMapper.searchList(condition, rowBounds);
        if(list.size() == 0){
            return -1;
        }
        FillIchObjectList((List<IchObject>)list.get(0));

        ichObjectList.addAll((List<IchObject>)list.get(0));

        if(list.get(1) != null && ((List)list.get(1)).size() != 0) {
            return (int)((List)list.get(1)).get(0);
        }

        return -1;
    }

    private void FillIchObjectList(List<IchObject> ichObjects) throws Exception {
        String idList = "";
        for(int i = 0; i < ichObjects.size(); i++) {
            if(idList.equals("")) {
                idList += ichObjects.get(i).getTargetId();
            } else {
                idList += "," + ichObjects.get(i).getTargetId();
            }
        }
        List<HashMap> result = ichObjectMapper.loadIchObjectList(idList);

        for(int i = 0; i < ichObjects.size(); i++) {
            IchObject ichObject = ichObjects.get(i);
            Long id = ichObject.getTargetId();
            int type = ichObject.getTargetType();
            if(ichObject.getTargetType() == 0) {
                ichObject = new IchProject();
            } else if(ichObject.getTargetType() == 1) {
                ichObject = new IchMaster();
            }
            ichObject.setTargetId(id);
            ichObject.setTargetType(type);
            ichObjects.set(i, ichObject);

            for (HashMap hashmap:result) {
                if (hashmap.get("targetId").equals(ichObject.getTargetId())) {
                    ContentFragment contentFragment = new ContentFragment();
                    contentFragment.setAttributeId((Long) hashmap.get("attributeId"));
                    contentFragment.setContent((String) hashmap.get("content"));
                    ichObject.addContentFragment(contentFragment);
                    if(ichObject instanceof IchProject && hashmap.get("ichCategoryId") != null) {
                        ((IchProject) ichObject).setIchCategoryId((Long) hashmap.get("ichCategoryId"));
                        ((IchProject) ichObject).setUri((String)hashmap.get("link_uri"));
                    }
                    if(ichObject instanceof  IchMaster && hashmap.get("projectName") != null) {
                        ContentFragment content = new ContentFragment();
                        content.setAttributeId(4L);
                        content.setContent(hashmap.get("projectName").toString());
                        ((IchMaster) ichObject).setIchProjectId((Long) hashmap.get("projectId"));
                        ichObject.addContentFragment(content);
                        ((IchMaster) ichObject).setUri((String)hashmap.get("link_uri"));
                    }
                }
            }
        }

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