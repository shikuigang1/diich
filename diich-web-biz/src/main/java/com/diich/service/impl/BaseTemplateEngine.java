package com.diich.service.impl;

import com.diich.core.base.BaseModel;
import com.diich.core.util.PropertiesUtil;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/27.
 */
public  abstract class BaseTemplateEngine {

    /**
     *生成列表静态页面的方法
     */
    public String buildHTML(String templateName, List<BaseModel> entityList, String outputFileName, String title) throws Exception{

        Configuration configuration = new Configuration(Configuration.getVersion());
        String path=PropertiesUtil.getString("freemarker.templateLoaderPath");
        configuration.setDirectoryForTemplateLoading(new File(path));
        configuration.setDefaultEncoding("UTF-8");
        Template template = configuration.getTemplate(templateName);
        Map dataMap = new HashMap<>();
        dataMap.put("title", title);
        dataMap.put("obj",entityList);
        String outPutPath=PropertiesUtil.getString("freemarker.filepath")+"/"+outputFileName+".html";
        Writer out =  new OutputStreamWriter(new FileOutputStream(outPutPath),"utf-8");
        template.process(dataMap, out);
        out.flush();
        out.close();
        return outPutPath;
    }
    /**
     *生成静态页面的方法
     */
    public String buildHTML(String templateName, BaseModel entity, String outputFileName, String title) throws Exception{

        Configuration configuration = new Configuration(Configuration.getVersion());
        String path=PropertiesUtil.getString("freemarker.templateLoaderPath");
        configuration.setDirectoryForTemplateLoading(new File(path));
        configuration.setDefaultEncoding("UTF-8");
        Template template = configuration.getTemplate(templateName);
        Map dataMap = new HashMap<>();
        dataMap.put("title", title);
        dataMap.put("obj",entity);
        String outPutPath=PropertiesUtil.getString("freemarker.filepath")+"/"+outputFileName+".html";
        Writer out =  new OutputStreamWriter(new FileOutputStream(outPutPath),"utf-8");
        template.process(dataMap, out);
        out.flush();
        out.close();
        return outPutPath;
    }
}

