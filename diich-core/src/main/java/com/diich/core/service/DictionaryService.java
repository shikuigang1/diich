package com.diich.core.service;

import com.diich.core.model.Dictionary;

import java.util.List;

/**
 * Created by Administrator on 2017/5/22.
 */
public interface DictionaryService {
    List<Dictionary> getDictionaryListByType(Integer type) throws Exception;

    Dictionary getDictionaryByCode(String code) throws Exception;
    String getText(int Type, String code) throws Exception;

    //获取所有地区编码集合

}
