package com.diich.service.impl;

import com.diich.core.base.BaseModel;
import com.diich.core.model.SecUser;
import com.diich.mapper.SecUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Administrator on 2017/5/3.
 */
@Service
public class MasterTemplateServiceImpl implements BaseTemplateService {

    @Autowired
    private SecUserMapper secUserMapper;

    @Autowired
    private MasterTemplateEngine masterTemplateEngine;

    @Transactional(propagation = Propagation.REQUIRED,rollbackFor=Exception.class)
    public  void  save(BaseModel model) throws Exception {

//        //将数据保存到数据库
//        secUserMapper.insert((SecUser) model);
//        //调用生成静态页面的方法
//        String title="freemarker测试";
//        String templatename="user.ftl";
//        String path = masterTemplateEngine.buildHTML(templatename, model, "1", title);

    }

}