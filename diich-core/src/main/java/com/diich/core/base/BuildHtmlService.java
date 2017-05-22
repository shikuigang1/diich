package com.diich.core.base;

import com.diich.core.base.BaseModel;
import com.diich.core.exception.BusinessException;
import com.diich.core.util.PropertiesUtil;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/22.
 */
public abstract class BuildHtmlService {

    /**
     *生成静态页面的方法
     */
    public String buildHTML(String templateName, BaseModel entity,String outputFileName) throws Exception{

        if(StringUtils.isBlank(templateName)){
            throw new BusinessException("模板名不能为空 ");
        }
        if("".equals(entity) || entity ==null){
            throw new BusinessException("生成模板的对象不能为空 ");
        }
        Configuration configuration = new Configuration(Configuration.getVersion());
        String path= PropertiesUtil.getString("freemarker.templateLoaderPath");
        configuration.setDirectoryForTemplateLoading(new File(path));
        configuration.setDefaultEncoding("UTF-8");
        Template template = configuration.getTemplate(templateName);
        Map dataMap = new HashMap<>();
        dataMap.put("obj",entity);
        String outPutPath=PropertiesUtil.getString("freemarker.filepath")+"/"+outputFileName+".html";
        Writer out =  new OutputStreamWriter(new FileOutputStream(outPutPath),"utf-8");
        template.process(dataMap, out);
        out.flush();
        out.close();
        return outPutPath;
    }
}
