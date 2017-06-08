package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.exception.BusinessException;
import com.diich.core.model.Attribute;
import com.diich.core.model.ContentFragment;
import com.diich.core.model.IchCategory;
import com.diich.core.model.IchProject;
import com.diich.core.service.DictionaryService;
import com.diich.core.service.IchCategoryService;
import com.diich.core.service.IchProjectService;
import com.diich.core.util.PropertiesUtil;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/4.
 */
@Controller
public class TestController extends BaseController{

    @Autowired
    private IchProjectService ichProjectService;

    @Autowired
    private IchCategoryService ichCategoryService;

    @Autowired
    private DictionaryService dictionaryService;





    @RequestMapping("test1")
    @ResponseBody
    public ResponseEntity<ModelMap> getPage(HttpServletRequest request) {

        try {
          // String name =  dictionaryService.getText(104,"629000");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        }
        return null;
    }

    @RequestMapping("test2")
    @ResponseBody
    public Map<String, Object> test2(HttpServletRequest request) {
        List<IchCategory> categoryList = null;

        try {
            categoryList = ichCategoryService.getAllCategory();
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException)e;
            return ae.toMap();
        }

        //return setResultMap(categoryList);
        return null;
    }

    @RequestMapping("test3")
    @ResponseBody
    public IchProject test3(HttpServletRequest request) throws Exception {


        IchProject entity = ichProjectService.getIchProject("1");
        String templateName ="pro.ftl";

       // ichProjectService

        if(StringUtils.isBlank("pro.ftl")){
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

        List <ContentFragment> ls = entity.getContentFragmentList();

        for(int i=0;i<ls.size();i++){
            Attribute a = ls.get(i).getAttribute();
            if(a.getDataType()>100){
                ContentFragment c = ls.get(i);
                String content = c.getContent();
                String str="";
                if(content.indexOf(",")> -1){
                    String[] idx = content.split(",");
                    for(int j=0;j<idx.length;j++){

                        ///System.out.println(a.getDataType()+"----"+c.getContent());

                        String result = dictionaryService.getTextByTypeAndCode(a.getDataType(),idx[j]);
                        if(null == result){
                            break;
                        }else{
                            str+=result+" | ";
                        }
                    }
                    //循环去到 code 值
                    if(!org.springframework.util.StringUtils.isEmpty(str)){
                        ls.get(i).setContent(str.substring(0,str.length()-2));
                    }

                }else{
                    String result = dictionaryService.getTextByTypeAndCode(a.getDataType(),c.getContent());
                    if(null != result){
                        ls.get(i).setContent(result);
                    }
                }
            }

        }

        dataMap.put("obj",entity);

        List<IchCategory> categoryList = null;

        try {

            dataMap.put("type",ichCategoryService.getCategoryById(entity.getIchCategoryId()));

          //  dataMap.put("clz",categoryList);
        } catch (Exception e) {

        }


        //dataMap.put("dic",dictionaryService.getDictionaryListByType());
        String outPutPath=PropertiesUtil.getString("freemarker.filepath")+"/"+1+".html";
        Writer out =  new OutputStreamWriter(new FileOutputStream(outPutPath),"utf-8");
        template.process(dataMap, out);

        out.flush();
        out.close();


        return entity;
    }

    @RequestMapping("test4")
    @ResponseBody
    public  List<Map> test4(String proName) {
        Map<String,Object> map = new HashMap<String,Object>();

        map.put("pageBegin",0);
        map.put("pageSize",5);
        map.put("keyword","北京");
        map.put("type","1");

        List<Map> ls =  null;
        try {
          ls= ichProjectService.getIchProjectByName(map);


        } catch (Exception e) {
            e.printStackTrace();
        }

      /*  try {
            categoryList = ichCategoryService.getAllCategory();
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException)e;
            return ae.toMap();
        }*/

        //return setResultMap(categoryList);
        return ls;
    }

}
