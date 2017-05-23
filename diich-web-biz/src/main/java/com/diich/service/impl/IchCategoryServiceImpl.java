package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
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

    public List<IchCategory> getAllCategory() throws Exception {
        List<IchCategory> categoryList = null;

        try {
            categoryList = getCategoryListByParentId(null);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return categoryList;
    }

    @Override
    public IchCategory selectIchCategoryByID(long id) {
        return ichCategoryMapper.selectByPrimaryKey(id);
    }

    private List<IchCategory> getCategoryListByParentId(Long parentId) throws Exception {
        List<IchCategory> childList = ichCategoryMapper.selectByParentId(parentId);

        for(IchCategory category : childList) {
            List<IchCategory> categoryList = getCategoryListByParentId(category.getId());

            List<Attribute> attributeList = attributeMapper.selectAttrListByCategory(category.getId());
            if(attributeList.size() != 0) {
                category.setAttributeList(attributeList);
            }

            if(categoryList.size() == 0) {
                continue;
            }

            category.setChildCategoryList(categoryList);
        }

        return childList;
    }

}
