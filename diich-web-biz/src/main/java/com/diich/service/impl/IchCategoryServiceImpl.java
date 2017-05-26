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

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/5/10.
 */
@Service("ichCategoryService")
public class IchCategoryServiceImpl extends BaseService<IchCategory> implements IchCategoryService {

    @Autowired
    private IchCategoryMapper ichCategoryMapper;

    public List<IchCategory> getAllCategory() throws Exception {
        List<IchCategory> categoryList = null;

        try {
            categoryList = getCategoryListByParentId(0L);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return categoryList;
    }

    @Override
    public IchCategory selectIchCategoryByID(long id) {
        return ichCategoryMapper.selectByPrimaryKey(id);
    }

    //通过父id找到它的子集合
    private List<IchCategory> getCategoryListByParentId(Long parentId) throws Exception {
        List<IchCategory> childList = ichCategoryMapper.selectByParentId(parentId);

        for(IchCategory category : childList) {
            List<IchCategory> categoryList = getCategoryListByParentId(category.getId());

            if(categoryList.size() == 0) {
                continue;
            }

            category.setChildren(categoryList);
        }

        return childList;
    }

    public IchCategory getCategoryById(Long id) throws Exception {
        IchCategory ichCategory = null;

        try {
            ichCategory = ichCategoryMapper.selectByPrimaryKey(id);

            if(ichCategory.getParentId() != null) {
                return getCategoryByChild(ichCategory);
            }
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return ichCategory;
    }

    //通过父id找到父对象
    private IchCategory getCategoryByChild(IchCategory childCategory) throws Exception {
        List<IchCategory> categoryList = new ArrayList<>();
        categoryList.add(childCategory);

        IchCategory parentCategory = ichCategoryMapper.selectByPrimaryKey(childCategory.getParentId());

        if(parentCategory != null) {
            parentCategory.setChildren(categoryList);
        }

        while (parentCategory.getParentId() != null) {
            IchCategory obj = getCategoryByChild(parentCategory);
            if(obj == null) {
                return obj;
            }
        }
        return parentCategory;
    }

}
