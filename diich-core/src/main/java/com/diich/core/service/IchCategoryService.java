package com.diich.core.service;

import com.diich.core.model.IchCategory;

import java.util.List;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchCategoryService {
    IchCategory getIchCategory(Long id);

    List<IchCategory> getIchCategoryList() throws Exception;
}
