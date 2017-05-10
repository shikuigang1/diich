package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.model.AttributeOfCategory;
import com.diich.core.model.ICHCategory;
import com.diich.core.service.ICHCategoryService;
import com.diich.mapper.AttributeOfCategoryMapper;
import com.diich.mapper.ICHCategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/5/10.
 */
@Service("ichCategoryService")
public class ICHCategoryServiceImpl extends BaseService<ICHCategory> implements ICHCategoryService{

    @Autowired
    private ICHCategoryMapper ichCategoryMapper;

    @Autowired
    private AttributeOfCategoryMapper attributeMapper;

    public ICHCategory selectICHCategory(Long id) {
        ICHCategory ichCategory = ichCategoryMapper.selectByPrimaryKey(id);

        if(ichCategory != null) {
            List<AttributeOfCategory> attributeList = attributeMapper.selectAttrListByCategory(ichCategory.getId());
            if(attributeList.size() != 0) {
                ichCategory.setAttributeList(attributeList);
            }
        }

        return ichCategory;
    }
}
