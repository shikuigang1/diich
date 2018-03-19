package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.diich.core.Constants;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Dictionary;
import com.diich.core.service.DictionaryService;
import com.diich.core.support.cache.JedisHelper;
import com.diich.core.support.cache.RedisHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/22.
 */
@Controller
@RequestMapping("dictionary")
public class DictionaryController extends BaseController<Dictionary> {

    @Autowired
    private DictionaryService dictionaryService;

    @RequestMapping("getDictionariesByType")
    @ResponseBody
    public Map<String, Object> getDictionariesByType(HttpServletRequest request,HttpServletResponse response) {
        String language = request.getParameter("language");
        Integer type = null;
        List<Dictionary> dictionaryList = null;

        if(language == null) {
            language = "chi";
        }

        try {
            type = Integer.parseInt(request.getParameter("type"));
        } catch (Exception e) {
            return putDataToMap(e);
        }

        try {
            dictionaryList = dictionaryService.getDictionaryListByType(type, language);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(dictionaryList);
    }

    @RequestMapping("getTextByTypeAndCode")
    @ResponseBody
    public Map<String, Object> getDictionaryByCode(HttpServletRequest request,HttpServletResponse response) {
        String code = request.getParameter("code");
        String language = request.getParameter("language");
        Integer type = null;
        String name = null;

        if(language == null) {
            language = "chi";
        }

        try {
            type = Integer.parseInt(request.getParameter("type"));
        } catch (Exception e) {
            return putDataToMap(e);
        }

        if(code == null || "".equals(code)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        try {
            name = dictionaryService.getTextByTypeAndCode(type, code, language);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(name);
    }


    @RequestMapping("getTextByTypeAndCodeFromRedis")
    @ResponseBody
    public Map<String, Object> getTextByTypeAndCodeFromRedis(HttpServletRequest request,HttpServletResponse response) {
        String code = request.getParameter("code");
        String language = request.getParameter("language");
        Integer type = null;
        String name = null;

        if(language == null) {
            language = "chi";
        }

        try {
            type = Integer.parseInt(request.getParameter("type"));
        } catch (Exception e) {
            return putDataToMap(e);
        }

        if(code == null || "".equals(code)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        try {
            name = dictionaryService.getTextByTypeAndCodeFromRedis(type, code, language);

        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(name);
    }



    @RequestMapping("getAllDictionary")
    @ResponseBody
    public Map<String, Object> getAllDictionary(HttpServletResponse response) {
        List<Dictionary> dictionaryList = null;

        try {
            dictionaryList = dictionaryService.getAllDictionary();
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(dictionaryList);
    }
    //获取人认证级别列表的接口
    @RequestMapping("getCrtLevelList")
    @ResponseBody
    public Map<String,Object> getCrtLevel(HttpServletRequest request,HttpServletResponse response){
        Integer type = 103;
        List<Dictionary> list = null;
        try {
            list = dictionaryService.getDictionaryListByType(type, "chi");

        } catch (Exception e) {
            return putDataToMap(e);
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(list);
    }


    //获取当前地区子地区接口
    @RequestMapping("getChildenByParentId")
    @ResponseBody
    public Map<String,Object> getChildenByParentId(String parentId,int type,HttpServletResponse response){

        String  childen = null;
        try {
            childen = dictionaryService.getJSONStrByParentID(parentId,type);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(childen);
    }

    //获取当前地区子地区接口
    @RequestMapping("getParentNameById")
    @ResponseBody
    public Map<String,Object> getParentNameById(String id,int type,HttpServletResponse response){

        String parentName = null;

        //dictionaryService.getJSONStrByParentID
        if(type == 101){
            parentName =dictionaryService.getDicParentNameById(id);
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(parentName);
    }

    //获取所有地区接口
    @RequestMapping("getAllDis")
    @ResponseBody
    public Map<String,Object> getAllDistricts(int type,HttpServletResponse response){

        List<Dictionary> allDic = null;
        if(type == 101){
            allDic  = dictionaryService.getAllDictionaryFromRedis();
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(allDic);
    }



    //主动 区域数据初始化
    @RequestMapping("initData")
    @ResponseBody
    public void initData(String parentID,HttpServletResponse response){

    }

    @RequestMapping("getDictionaryByTypeAndParentId")
    @ResponseBody
    public Map<String, Object> getDictionaryByTypeAndParentId(HttpServletRequest request,HttpServletResponse response) {
        String type = request.getParameter("type");
        String parentId = request.getParameter("parentId");
        String language = request.getParameter("language");
        int typeNumber;
        try {
            typeNumber = Integer.parseInt(type);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        long parentIdNumber;
        try {
            parentIdNumber = Long.parseLong(parentId);
        } catch (Exception e) {
            parentIdNumber = 0;
        }

        if(language == null) {
            language = "chi";
        }

        List<Dictionary> dictionaryList = null;
        try {
            dictionaryList = dictionaryService.getDictionaryListByParentId(typeNumber, language, parentIdNumber);
        } catch (Exception e) {
            Exception ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        return putDataToMap(dictionaryList);
    }

/*    public String getDicParentName(String id){

        String parentName="";

        String json = dictionaryService.getJSONStrByID(id);
        //json 转换成对象
        if(null != json  && !json.equals("") ){
            Dictionary dictionary = JSON.parseObject(json, new TypeReference<Dictionary>() {});
            //parentName =dictionary.getName()+parentName;
            if(dictionary.getParentId() != null){
                parentName = dictionary.getName() + parentName;
                return getDicParentName(String.valueOf(dictionary.getParentId()))+parentName;
            }else{
                return parentName;
            }
        }
        return parentName;

    }*/

    @Autowired
    private JedisHelper jedisHelper;

    @RequestMapping("setRedis")
    public void setRedis() throws Exception {
        /*List<Dictionary> ls = dictionaryService.getAllDictionary();
        for(int i=0;i<ls.size();i++){
            Dictionary d = ls.get(i);
            jedisHelper.setCrud(Constants.DICTIONARY_CODE+d.getType()+"_"+d.getCode(),JSON.toJSONString(d));
            jedisHelper.setCrud(Constants.DICTIONARY_KEY_SINGLE+d.getId(),JSON.toJSONString(d));
            //redisHelper.hset("t_"+d.getType(),d);.getDictionaryListByParentId()
        }*/

        jedisHelper.getCrud("");

    }

}
