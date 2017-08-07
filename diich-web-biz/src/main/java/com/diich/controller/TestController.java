package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
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
import com.diich.core.support.cache.JedisHelper;
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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;
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

    @Autowired
    private JedisHelper jedisHelper;



    @RequestMapping("getIchProjectList")
    @ResponseBody
    public Map<String, Object> getIchProjectList(HttpServletRequest request) {
        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }

        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        params.put("current",1);
        params.put("pageSize",3000);
        Page<IchProject> page = null;
        try {
            page = ichProjectService.getIchProjectPage(params);
            List<IchProject> ichProjectList = page.getRecords();
            for (IchProject ichProject :ichProjectList) {
             /*   List<ContentFragment> pcfList = ichProject.getContentFragmentList();
               for (ContentFragment contentFragment: pcfList) {
                    Attribute attribute = contentFragment.getAttribute();
                    if(attribute.getDataType()>100){
                        String[] arrs= contentFragment.getContent().split(",");
                        String name ="";
                        for (String arr: arrs) {
                            name = dictionaryService.getTextByTypeAndCode(attribute.getDataType(), arr);
                            name +=";";
                        }
                        name = name.substring(0,name.length()-1);
                        contentFragment.setContent(name);
                    }
                }*/
                String outPutPath = PropertiesUtil.getString("freemarker.projectfilepath")+"/"+ichProject.getId().toString();
                String s = ichProjectService.buildHTML("pro.ftl", ichProject, outPutPath);
            }
        } catch (Exception e) {
            e.printStackTrace();
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return putDataToMap(page);
    }




    @RequestMapping("test1")
    @ResponseBody
    public ResponseEntity<ModelMap> getPage(HttpServletRequest request) {

        try {
          // String name =  dictionaryService.getText(104,"629000");
            jedisHelper.delAll("*");

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
    public IchProject test3(HttpServletRequest request,String id) throws Exception {


        IchProject entity = ichProjectService.getIchProject(id);
        String templateName ="pro.ftl";

       // ichProjectService

        if(StringUtils.isBlank("pro.ftl")){
            throw new BusinessException("模板名不能为空 ");
        }
        if("".equals(entity) || entity ==null){
            throw new BusinessException("生成模板的对象不能为空 ");
        }
        Configuration configuration = null;
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

                        String result = dictionaryService.getTextByTypeAndCode(a.getDataType(),idx[j],null);
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
                    String result = dictionaryService.getTextByTypeAndCode(a.getDataType(),c.getContent(),null);
                    if(null != result){
                        ls.get(i).setContent(result);
                    }
                }
            }

        }

        dataMap.put("obj",entity);

        //System.out.println( JSON.toJSONString(entity,true));
     //   System.out.println( JSON.toJSON(entity));
/*
        List<ContentFragment> lsc =entity.getContentFragmentList();

        for(int i=0;i<lsc.size();i++){
            System.out.println(lsc.get(i).getContent());
        }
*/

     /*   List<IchCategory> categoryList = null;

        try {

            dataMap.put("type",ichCategoryService.getCategoryById(entity.getIchCategoryId()));

          //  dataMap.put("clz",categoryList);
        } catch (Exception e) {

        }
*/

        //dataMap.put("dic",dictionaryService.getDictionaryListByType());
        String outPutPath=PropertiesUtil.getString("freemarker.projectfilepath")+"/"+10374+".html";
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
    @RequestMapping("test5")
    @ResponseBody
    public  List<Map> test5(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {




       /* String signature = request.getParameter("signature");
               String timestamp = request.getParameter("timestamp");
                String nonce = request.getParameter("nonce");
                String echostr = request.getParameter("echostr");
                System.out.println("signature:" + signature);
                 System.out.println("timestamp:" + timestamp);
                System.out.println("nonce:" + nonce);
                System.out.println("echostr:" + echostr);
                 PrintWriter pw = response.getWriter();
                pw.write(signature);
                pw.flush();*/

      /*  try {
            categoryList = ichCategoryService.getAllCategory();
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException)e;
            return ae.toMap();
        }*/

        //return setResultMap(categoryList);

        return null;
    }


}
