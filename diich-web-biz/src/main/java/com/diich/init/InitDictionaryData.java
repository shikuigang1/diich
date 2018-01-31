package com.diich.init;

import com.diich.core.model.Dictionary;
import com.diich.core.service.DictionaryService;
import com.diich.core.support.cache.RedisHelper;
import javafx.stage.DirectoryChooser;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 初始化 dictionary 表数据
 */
@Component
public class InitDictionaryData  implements InitializingBean {

    @Autowired
    private RedisHelper redisHelper;

    @Autowired
    private DictionaryService dictionaryService;

    @Override
    public void afterPropertiesSet() throws Exception {

        List<Dictionary> ls = dictionaryService.getAllDictionary();
        //redis key 分类规则：跟进type 类型
        for(int i=0;i<ls.size();i++){

            Dictionary d = ls.get(i);

            //redisHelper.hset("t_"+d.getType(),d);
        }




    }
}
