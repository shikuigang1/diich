package com.diich.core.service;

import com.diich.core.model.Attribute;

import java.util.List;

/**
 * Created by Administrator on 2018/2/11.
 */
public interface AttributeService {
    List<Attribute> getAttributeList(int targetType, long categoryId, long targetId) throws Exception;
}
