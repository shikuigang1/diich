package com.diich.init;

import com.alibaba.fastjson.JSON;
import com.diich.core.Constants;
import com.diich.core.model.Dictionary;
import com.diich.core.service.DictionaryService;
import com.diich.core.support.cache.JedisHelper;
import com.diich.core.support.cache.RedisHelper;
import javafx.stage.DirectoryChooser;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 初始化 dictionary 表数据
 */
//@Component
public class InitDictionaryData  implements InitializingBean {

    @Autowired
    private JedisHelper jedisHelper;


    @Autowired
    private DictionaryService dictionaryService;

    @Override
    public void afterPropertiesSet() throws Exception {

        //获取整个全部国家数据
        /*List<Dictionary> countryData =  dictionaryService.getDictionaryListByParentID(null,101);

        if(countryData != null && countryData.size() >0){
            jedisHelper.setCrud(Constants.DICTIONARY_KEY,JSON.toJSONString(countryData));
        }*/

        List<Dictionary> ls = dictionaryService.getAllDictionary();
        //System.out.println(ls.size());
        //redis key 分类规则：跟进type 类型
        for(int i=0;i<ls.size();i++){
            Dictionary d = ls.get(i);
            List<Dictionary> childen = dictionaryService.getDictionaryListByParentID(d.getId(),101);
            if(childen != null && childen.size() > 0){
                //jedisHelper.set(Constants.DICTIONARY_KEY+d.getId(),  (Serializable)childen);
                jedisHelper.setCrud(Constants.DICTIONARY_KEY+d.getId(),JSON.toJSONString(childen));
                //redisHelper.set(Constants.DICTIONARY_KEY+d.getId(),(Serializable)childen);
            }
            //redisHelper.hset("t_"+d.getType(),d);.getDictionaryListByParentId()
        }
    }
}
