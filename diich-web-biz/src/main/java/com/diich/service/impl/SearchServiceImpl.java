package com.diich.service.impl;

import com.diich.core.base.BaseModel;
import com.diich.core.model.*;
import com.diich.core.model.vo.SearchVO;
import com.diich.core.service.IchMasterService;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.SearchService;
import com.diich.mapper.*;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2017/5/8 0008.
 */

@Service("searchService")
@Transactional
public class SearchServiceImpl implements SearchService {

    @Autowired
    private ContentFragmentMapper contentFragmentMapper;

    @Autowired
    private IchProjectService ichProjectService;

    @Autowired
    private IchMasterService ichMasterService;

    @Autowired
    private RedisTemplate<Serializable, Serializable> redisTemplate;

    @Override
    public Integer search(List<Map<String, Object>> resultList, SearchCondition condition) throws Exception {
        Integer total = getCountByRedis(condition.toString());
        if(total == null) {
            total = contentFragmentMapper.queryForCount(condition);
        }

        List<Map<String, Object>> rList = getListByRedis(condition.toString());
        if(rList != null) {
            for(Map<String, Object> map : rList) {
                resultList.add(map);
            }
            return total;
        }

        List<ContentFragment> contentList = contentFragmentMapper.queryForSearch(condition);
        for(ContentFragment content : contentList) {
            Integer targetType = content.getTargetType();
            Long targetId = content.getTargetId();

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

        saveToRedis(condition.toString(), resultList, total);

        return total;
    }

    private void saveToRedis(String key, List<Map<String, Object>> value, Integer total) throws Exception {
        ValueOperations<Serializable, Serializable> opsForValue = redisTemplate.opsForValue();
        opsForValue.set(key, (ArrayList)value);
        opsForValue.set(key + "_total", total);
    }

    private List<Map<String, Object>> getListByRedis(String key) throws Exception {
        ValueOperations<Serializable, Serializable> opsFroValue = redisTemplate.opsForValue();
        return (ArrayList) opsFroValue.get(key);
    }

    private Integer getCountByRedis(String key) throws Exception {
        ValueOperations<Serializable, Serializable> opsFroValue = redisTemplate.opsForValue();
        return (Integer) opsFroValue.get(key + "_total");
    }

}