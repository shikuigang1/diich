package com.diich.core.service;

import com.diich.core.model.Attribute;
import com.diich.core.model.IchCategory;

import java.util.List;
import java.util.Set;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchCategoryService {
    List<IchCategory> getAllCategory() throws Exception;

    IchCategory getCategoryById(Long id) throws Exception;

    List<Attribute> getAttrListByCatIdAndTarType(Long id,Integer targetType) throws Exception;

    List<Attribute> getDefAttrByTarIdAndTarType(Long id,Integer targetType) throws Exception;

    Set<Attribute> getAttrListByCatIdAndProId(Long id, Long pid) throws Exception;
}
