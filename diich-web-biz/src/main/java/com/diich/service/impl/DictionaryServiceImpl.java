package com.diich.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Dictionary;
import com.diich.core.service.DictionaryService;
import com.diich.core.support.cache.JedisHelper;
import com.diich.core.support.cache.RedisHelper;
import com.diich.mapper.DictionaryMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.zip.DeflaterInputStream;

/**
 * Created by Administrator on 2017/5/22.
 */
@Service("dictionaryService")
@Transactional
public class DictionaryServiceImpl extends BaseService<Dictionary> implements DictionaryService {

    @Autowired
    private DictionaryMapper dictionaryMapper;

    @Autowired
    private JedisHelper jedisHelper;


    public List<Dictionary> getDictionaryListByType(Integer type, String language) throws Exception {
        List<Dictionary> dictionaryList = null;

        try {
            dictionaryList = getDictionaryListByParentId(type, language, null);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return dictionaryList;
    }

    /*private List<Dictionary> getDictionaryListByParentId(Integer type, String language, Long parentId) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("type", type);
        params.put("parentId", parentId);
        params.put("language", language);

        List<Dictionary> dictionaryList = dictionaryMapper.selectByParentId(params);

        for (Dictionary dictionary : dictionaryList) {

            List<Dictionary> list = getDictionaryListByParentId(dictionary.getType(), dictionary.getLang(), dictionary.getId());

            if (list.size() == 0) {
                continue;
            }

            dictionary.setChildren(list);
        }

        return dictionaryList;
    }*/

    public String getTextByTypeAndCode(Integer type, String code, String language) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("type", type);
        params.put("code", code);
        params.put("language", language);

        List<Dictionary> dictionaryList = null;
        String name = null;

        try {
            dictionaryList = dictionaryMapper.selectByTypeAndCode(params);
            if ("eng".equals(language) && dictionaryList.size() == 0) {
                params.put("language", "chi");
                dictionaryList = dictionaryMapper.selectByTypeAndCode(params);
            }
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        if (dictionaryList.size() != 0) {
            Dictionary dictionary = dictionaryList.get(0);
            name = dictionary.getName();
            if (dictionary.getParentId() != null) {
                name = getDictionaryNameByParentId(dictionary.getParentId()) + name;
            }
        }

        return name != null ? name :"";
    }

    private String getDictionaryNameByParentId(Long parentId) throws Exception{
        String name = "";
        try{
            Dictionary dictionary = dictionaryMapper.selectByPrimaryKey(parentId);
            if(dictionary != null){
                name = dictionary.getName() + name;
                if(dictionary.getParentId() != null){
                    name = getDictionaryNameByParentId(dictionary.getParentId()) + name;
                }
            }
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return  name;
    }

    public List<Dictionary> getAllDictionary() throws Exception {
        List<Dictionary> dictionaryList = null;

        try {
            dictionaryList = dictionaryMapper.selectAllDictionary();
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return dictionaryList;
    }

    @Override
    public List<Dictionary> getDictionaryListByParentID(Long parent_id,int type)throws Exception {

        Map<String,Object> params = new HashMap<String,Object>();

        params.put("parentId",parent_id);
        params.put("type",type);
        params.put("language",Constants.LANGUAGE_CHINA);//默认只获取中文

        List<Dictionary> chidrenList = null;
        try {
             chidrenList =  dictionaryMapper.selectByParentId(params);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return chidrenList;
    }

    @Override
    public String getJSONStrByParentID(String parentId,int type) {

        String  res = "";
        if(parentId == null){
            res = jedisHelper.getCrud(Constants.DICTIONARY_KEY);
        }else{
            res = jedisHelper.getCrud(Constants.DICTIONARY_KEY+parentId);
        }

        return res;
    }

    @Override
    public String getJSONStrByID(String Id) {
        String  res = "";
        if(Id == null){
            //res = jedisHelper.getCrud(Constants.DICTIONARY_KEY);
        }else{
            res = jedisHelper.getCrud(Constants.DICTIONARY_KEY_SINGLE+Id);
        }
        return res;
    }

    @Override
    public String getTextByTypeAndCodeFromRedis(Integer type, String code, String language) throws Exception {

        String jsonStr = jedisHelper.getCrud(Constants.DICTIONARY_CODE+type+"_"+code);

        String name = "";

        if(jsonStr != null && !jsonStr.equals("")){
            Dictionary dictionary = JSON.parseObject(jsonStr, new TypeReference<Dictionary>() {});
            name = getDicParentNameById(String.valueOf(dictionary.getId()));
        }

        return name;
    }

    @Override
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public List<Dictionary> getAllDictionaryFromRedis()  {

        String dataAll = jedisHelper.getCrud(Constants.DICTIONARY_ALL);
        List<Dictionary> lsAll = new ArrayList<Dictionary>();
        if(dataAll== null || dataAll.equals("")){
            Set<String> keys = jedisHelper.getAllString(Constants.DICTIONARY_CODE+"*");
            if(keys != null){
                for (String key : keys) {
                    lsAll.add(JSON.parseObject(jedisHelper.getCrud(key), new TypeReference<Dictionary>() {}));
                }
            }
            jedisHelper.setCrud(Constants.DICTIONARY_ALL,JSON.toJSONString(lsAll));
        }else{
            lsAll = JSON.parseObject(dataAll, new TypeReference<List<Dictionary>>() {});
        }


        return lsAll;
    }

    @Override
    public String getDicParentNameById(String id){

        String parentName="";

        String json = getJSONStrByID(id);
        //json 转换成对象
        if(null != json  && !json.equals("") ){
            Dictionary dictionary = JSON.parseObject(json, new TypeReference<Dictionary>() {});
            //parentName =dictionary.getName()+parentName;
            if(dictionary.getParentId() != null){
                parentName = dictionary.getName() + parentName;
                return getDicParentNameById(String.valueOf(dictionary.getParentId()))+parentName;
            }else{
                return dictionary.getName();
            }
        }
        return parentName;

    }



    public String getText(int type, String code) throws Exception {
        try {

            Dictionary dic = new Dictionary();
            dic.setType(type);
            dic.setCode(code);
            // return dictionaryMapper.selectByTypeCode(dic);
            return null;
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    //------------------------------



    public List<Dictionary> getDictionaryListByParentId(Integer type, String language, Long parentId) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("type", type);
        params.put("parentId", parentId);
        params.put("language", language);

        List<Dictionary> dictionaryList = dictionaryMapper.selectList(type, parentId, language);

        return dictionaryList;
    }




}
