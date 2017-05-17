package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.model.Attribute;
import com.diich.core.model.IchCategory;
import com.diich.core.service.IchCategoryService;
import com.diich.mapper.AttributeMapper;
import com.diich.mapper.IchCategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/5/10.
 */
@Service("ichCategoryService")
public class IchCategoryServiceImpl extends BaseService<IchCategory> implements IchCategoryService {

    @Autowired
    private IchCategoryMapper ichCategoryMapper;

    @Autowired
    private AttributeMapper attributeMapper;

    public IchCategory getIchCategory(Long id) {
        IchCategory ichCategory = ichCategoryMapper.selectByPrimaryKey(id);

        if(ichCategory != null) {
            List<Attribute> attributeList = attributeMapper.selectAttrListByCategory(ichCategory.getId());
            if(attributeList.size() != 0) {
                ichCategory.setAttributeList(attributeList);
            }
        }

        return ichCategory;
    }
}