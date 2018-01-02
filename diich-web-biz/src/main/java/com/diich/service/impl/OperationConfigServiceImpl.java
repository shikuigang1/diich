package com.diich.service.impl;

import com.diich.core.exception.ApplicationException;
import com.diich.core.model.OperationConfig;
import com.diich.core.service.OperationConfigService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wangwenjian on 2017/12/28.
 */
@Service
public class OperationConfigServiceImpl implements OperationConfigService {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Override
    public List<OperationConfig> getList(String title, String moduleName, String columnName) throws Exception {
        List<OperationConfig> operationConfigList = null;
        try{
            Query query = new Query();
            if (StringUtils.isNotBlank(title)) {
                query.addCriteria(Criteria.where("title").regex(title));
            }
            if (StringUtils.isNotBlank(moduleName)) {
                query.addCriteria(Criteria.where("module_name").is(moduleName));
            }
            if (StringUtils.isNotBlank(columnName)) {
                query.addCriteria(Criteria.where("column_name").is(columnName));
            }
           operationConfigList = mongoTemplate.find(query, OperationConfig.class);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return operationConfigList;
    }
}
