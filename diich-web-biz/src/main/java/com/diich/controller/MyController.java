package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.exception.BusinessException;
import com.diich.core.model.*;
import com.diich.core.service.DictionaryService;
import com.diich.core.service.IchCategoryService;
import com.diich.core.service.IchMasterService;
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
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/26.
 */
@Controller
@RequestMapping("myController")
public class MyController extends BaseController{
    @Autowired
    private IchProjectService ichProjectService;

    @Autowired
    private IchCategoryService ichCategoryService;

    @Autowired
    private IchMasterService ichMasterService;

    @Autowired
    private DictionaryService dictionaryService;

    @RequestMapping("getIchMaster")
    @ResponseBody
    public Map<String, Object> getIchMaster(HttpServletRequest request) throws Exception {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        IchMaster ichMaster = null;
        try{
            ichMaster = ichMasterService.getIchMaster(id);
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        IchProject ichProject = ichMaster.getIchProject();
        List<ContentFragment> pcfList = ichProject.getContentFragmentList();
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
        }
        List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
        for (ContentFragment contentFragment:contentFragmentList) {
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
        }

        String s = ichMasterService.buildHTML("master.ftl", ichMaster, "1");
        return putDataToMap(ichMaster);
    }

    @RequestMapping("getIchProject")
    @ResponseBody
    public Map<String, Object> getIchProject(HttpServletRequest request) throws Exception {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        IchProject ichProject = null;
        try{
            ichProject = ichProjectService.getIchProject(id);
            List<ContentFragment> pcfList = ichProject.getContentFragmentList();
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
            }
            String s = ichProjectService.buildHTML("pro.ftl", ichProject, ichProject.getId().toString());
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return putDataToMap(ichProject);
    }

    @RequestMapping("test4")
    @ResponseBody
    public Map<String, Object> test4(HttpServletRequest request) {
        IchCategory category = null;
        String id = request.getParameter("params");
        try {
            category = ichCategoryService.getCategoryById(Long.parseLong(id));
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException)e;
            return ae.toMap();
        }

        return putDataToMap(category);
    }
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
        params.put("pageSize",100);
        Page<IchProject> page = null;
        try {
            page = ichProjectService.getIchProjectPage(params);
            List<IchProject> ichProjectList = page.getRecords();
            for (IchProject ichProject :ichProjectList) {
                List<ContentFragment> pcfList = ichProject.getContentFragmentList();
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
                }
                String s = ichProjectService.buildHTML("pro.ftl", ichProject, ichProject.getId().toString());
            }
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return putDataToMap(page);
    }
}
