package com.diich.core.util;

import com.diich.core.base.BaseModel;
import com.diich.core.exception.BusinessException;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/22.
 */
public class BuildHTMLEngine {
    /**
     *生成静态页面的方法
     */
    public static String buildHTML(String templateName, BaseModel entity, Map map, String outputFileName) throws Exception{

        if(StringUtils.isBlank(templateName)){
            throw new BusinessException("模板名不能为空 ");
        }
        if("".equals(entity) || entity ==null){
            throw new BusinessException("生成模板的对象不能为空 ");
        }
        if(StringUtils.isBlank(outputFileName)){
            throw new BusinessException("生成文件名不能为空 ");
        }
        Configuration configuration = new Configuration(Configuration.getVersion());
        String path= PropertiesUtil.getString("freemarker.templateLoaderPath");
        configuration.setDirectoryForTemplateLoading(new File(path));
        configuration.setDefaultEncoding("UTF-8");
        Template template = configuration.getTemplate(templateName);
        Map dataMap = new HashMap<>();
        dataMap.put("obj",entity);
        dataMap.put("json",map);
        String outPutPath = outputFileName + ".html";
        Writer out =  new OutputStreamWriter(new FileOutputStream(outPutPath),"utf-8");
        template.process(dataMap, out);
        out.flush();
        out.close();
        return outPutPath;
    }

    /**
     *生成列表静态页面的方法
     */
    public static String buildHTML(String templateName, List<BaseModel> entityList, String outputFileName ) throws Exception{

        if(StringUtils.isBlank(templateName)){
            throw new BusinessException("模板名不能为空 ");
        }
        if(entityList.size()==0){
            throw new BusinessException("生成模板的对象不能为空 ");
        }

        Configuration configuration = new Configuration(Configuration.getVersion());
        String path= PropertiesUtil.getString("freemarker.templateLoaderPath");
        configuration.setDirectoryForTemplateLoading(new File(path));
        configuration.setDefaultEncoding("UTF-8");
        Template template = configuration.getTemplate(templateName);
        Map dataMap = new HashMap<>();
        dataMap.put("obj",entityList);
        String outPutPath= outputFileName + ".html";
        Writer out =  new OutputStreamWriter(new FileOutputStream(outPutPath),"utf-8");
        template.process(dataMap, out);
        out.flush();
        out.close();
        return outPutPath;
    }
}
