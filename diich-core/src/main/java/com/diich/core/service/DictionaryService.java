package com.diich.core.service;

import com.diich.core.model.Dictionary;

import java.util.List;

/**
 * Created by Administrator on 2017/5/22.
 */
public interface DictionaryService {
    List<Dictionary> getDictionaryListByType(Integer type) throws Exception;

    String getTextByTypeAndCode(Integer type, String code) throws Exception;

    List<Dictionary> getAllDictionary() throws Exception;

}
