package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.exception.IllegalParameterException;
import com.diich.core.model.Attribute;
import com.diich.core.model.IchCategory;
import com.diich.core.service.AttributeService;
import com.diich.mapper.AttributeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018/2/11.
 */
@Service("attributeService")
public class AttributeServiceImpl extends BaseService<Attribute> implements AttributeService{
    @Autowired
    private AttributeMapper attributeMapper;

    @Override
    public List<Attribute> getAttributeList(int targetType, long categoryId, long targetId) throws  Exception{
        if(targetType < 0 || categoryId < 0 || targetId < 0) {
            throw new IllegalParameterException();
        }

        return attributeMapper.selectAttributeList(targetType, categoryId, targetId);
    }

}
