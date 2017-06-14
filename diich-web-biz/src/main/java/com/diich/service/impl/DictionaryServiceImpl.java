package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Dictionary;
import com.diich.core.service.DictionaryService;
import com.diich.mapper.DictionaryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.DeflaterInputStream;

/**
 * Created by Administrator on 2017/5/22.
 */
@Service("dictionaryService")
@Transactional
public class DictionaryServiceImpl extends BaseService<Dictionary> implements DictionaryService{

    @Autowired
    private DictionaryMapper dictionaryMapper;


    public List<Dictionary> getDictionaryListByType(Integer type, String language) throws Exception {
        List<Dictionary> dictionaryList = null;

        try {
            dictionaryList = getDictionaryListByParentId(type, language, null);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return dictionaryList;
    }

    private List<Dictionary> getDictionaryListByParentId(Integer type, String language, Long parentId) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("type", type);
        params.put("parentId", parentId);
        params.put("language", language);

        List<Dictionary> dictionaryList = dictionaryMapper.selectByParentId(params);

        for(Dictionary dictionary : dictionaryList) {

            List<Dictionary> list = getDictionaryListByParentId(dictionary.getType(), dictionary.getLang(), dictionary.getId());

            if(list.size() == 0) {
                continue;
            }

            dictionary.setChildren(list);
        }

        return dictionaryList;
    }

    public String getTextByTypeAndCode(Integer type, String code, String language) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("type", type);
        params.put("code", code);
        params.put("language", language);

        List<Dictionary> dictionaryList = null;
        String name = null;

        try {
            dictionaryList = dictionaryMapper.selectByTypeAndCode(params);
            if("eng".equals(language) && dictionaryList.size()==0){
                params.put("language","chi");
                dictionaryList = dictionaryMapper.selectByTypeAndCode(params);
            }
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        if(dictionaryList.size() != 0) {
            Dictionary dictionary = dictionaryList.get(0);
            name = dictionary.getName();
        }

        return name != null ? name : "";
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


    public String getText(int type, String code) throws Exception{
        try {

            Dictionary dic  = new Dictionary();
            dic.setType(type);
            dic.setCode(code);
           // return dictionaryMapper.selectByTypeCode(dic);
            return null;
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }
}
