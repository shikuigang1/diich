package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Attribute;
import com.diich.core.model.ContentFragment;
import com.diich.core.model.IchCategory;
import com.diich.core.model.IchProject;
import com.diich.core.service.IchCategoryService;
import com.diich.mapper.AttributeMapper;
import com.diich.mapper.ContentFragmentMapper;
import com.diich.mapper.IchCategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by Administrator on 2017/5/10.
 */
@Service("ichCategoryService")
public class IchCategoryServiceImpl extends BaseService<IchCategory> implements IchCategoryService {

    @Autowired
    private IchCategoryMapper ichCategoryMapper;

    @Autowired
    private AttributeMapper attributeMapper;

    @Autowired
    private ContentFragmentMapper contentFragmentMapper;

    public List<IchCategory> getAllCategory() throws Exception {
        List<IchCategory> categoryList = null;

        try {
            categoryList = ichCategoryMapper.selectAll();
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        List<IchCategory> result = new ArrayList<>();

        Iterator<IchCategory> it = categoryList.iterator();
        while (it.hasNext()) {
            IchCategory ichCategory = it.next();
            if(ichCategory.getParentId() == null) {
                result.add(ichCategory);
                it.remove();
                assembleCategories(categoryList, result);
                break;
            }
        }

        return result;
    }

    public void assembleCategories(List<IchCategory> source, List<IchCategory> destination) {

        for(IchCategory ichCategory : destination) {
            ichCategory.setChildren(getCategoryListByParentId(ichCategory.getId(), source));

            if(source.size() > 0) {
                assembleCategories(source, ichCategory.getChildren());
            }
        }
    }

    //通过父id找到它的子集合
    private List<IchCategory> getCategoryListByParentId(Long parentId, List<IchCategory> source) {
        List<IchCategory> result = new ArrayList<>();

        Iterator<IchCategory> it = source.iterator();
        while(it.hasNext()) {
            IchCategory ichCategory = it.next();
            if(parentId.equals(ichCategory.getParentId())) {
                result.add(ichCategory);
                it.remove();
            }
        }

        return result;
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

    @Override
    public List<Attribute> getAttrListByCatIdAndTarType(Long id , Integer targetType) throws Exception {
        List<Attribute> attributeList = new ArrayList<>();
        return getAttributeList(id, targetType, attributeList);
    }

    private List<Attribute> getAttributeList( Long id , Integer targetType ,List<Attribute> attributeList) throws Exception{
        if(targetType != null){
            try {
                Attribute attribute = new Attribute();
                attribute.setTargetType(targetType);
                attribute.setIchCategoryId(id);
                List<Attribute> list = attributeMapper.selectAttrListByCatIdAndTarType(attribute);
                attributeList.addAll(list);
                IchCategory ichCategory = ichCategoryMapper.selectByPrimaryKey(id);
                while(ichCategory != null && ichCategory.getParentId() !=null){
                    id = ichCategory.getParentId();
                    return getAttributeList(id,targetType,attributeList);
                }
            } catch (Exception e) {
                throw new ApplicationException(ApplicationException.INNER_ERROR);
            }
        }
        return attributeList;
    }
    @Override
    public List<Attribute> getDefAttrByTarIdAndTarType(Long id, Integer targetType) throws Exception {
        List<Attribute> attributeList = null;
        if(targetType != null){
            try {
                Attribute attribute = new Attribute();
                attribute.setTargetType(targetType);
                attribute.setTargetId(id);
                attributeList = attributeMapper.selectDefAttrByTarIdAndTarType(attribute);
            } catch (Exception e) {
                throw new ApplicationException(ApplicationException.INNER_ERROR);
            }
        }
        return attributeList;
    }

    @Override
    public List<Attribute> getAttrListByCatIdAndProId(Long id, Long pid) throws Exception {
        List<Attribute> attrSet = new ArrayList<>();
        List<Attribute> attributeList = null;
        try{
            List<Long> listId = new ArrayList<>();
            if(id !=null){
                attributeList = getAttrListByCatIdAndTarType(id, 0);
                for (Attribute attribute : attributeList) {
                    listId.add(attribute.getId());
                }
            }
            ContentFragment content = new ContentFragment();
            content.setTargetId(pid);
            content.setTargetType(0);
            List<ContentFragment> contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(content);
            for (ContentFragment contentFragment: contentFragmentList) {
                if(contentFragment.getAttributeId() != null){
                    if(listId.contains(contentFragment.getAttributeId())){
                        continue;
                    }
                    Attribute attribute = attributeMapper.selectByPrimaryKey(contentFragment.getAttributeId());
                    if(attribute != null){
                        attrSet.add(attribute);
                    }
                }
            }
            if(attributeList != null && attributeList.size() > 0){
                attrSet.addAll(attributeList);
            }
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return attrSet;
    }

    //通过父id找到父对象
    private IchCategory getCategoryByChild(IchCategory childCategory) throws Exception {
        if(childCategory.getParentId() == 0) {
            return childCategory;
        }

        List<IchCategory> categoryList = new ArrayList<>();
        categoryList.add(childCategory);

        IchCategory parentCategory = ichCategoryMapper.selectByPrimaryKey(childCategory.getParentId());

        if(parentCategory != null) {
            parentCategory.setChildren(categoryList);
        }

        while (parentCategory.getParentId() != null) {
            IchCategory obj = getCategoryByChild(parentCategory);
            if(obj.getParentId() == 0) {
                return obj;
            }
        }
        return parentCategory;
    }

}
