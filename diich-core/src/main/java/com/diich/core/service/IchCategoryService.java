package com.diich.core.service;

import com.diich.core.model.Attribute;
import com.diich.core.model.IchCategory;

import java.util.List;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchCategoryService {
    List<IchCategory> getAllCategory() throws Exception;
    IchCategory getCategoryById(Long id) throws Exception;
}
