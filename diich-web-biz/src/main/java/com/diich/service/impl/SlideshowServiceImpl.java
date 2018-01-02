package com.diich.service.impl;

import com.diich.core.exception.ApplicationException;
import com.diich.core.model.SysSlideshowConfig;
import com.diich.core.service.SlideshowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wangwenjian on 2017/12/28.
 */
@Service
public class SlideshowServiceImpl implements SlideshowService {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Override
    public List<SysSlideshowConfig> getSlideshowList() throws Exception{
        List<SysSlideshowConfig> sysSlideshowConfigList = null;
        try{
            sysSlideshowConfigList = mongoTemplate.find(new Query(), SysSlideshowConfig.class);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return sysSlideshowConfigList;
    }
}
