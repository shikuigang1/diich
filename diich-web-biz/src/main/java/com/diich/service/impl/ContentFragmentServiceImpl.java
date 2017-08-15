package com.diich.service.impl;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.ContentFragmentService;
import com.diich.core.service.ResourceService;
import com.diich.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/7/18.
 */
@Service("contentFragmentService")
@Transactional
public class ContentFragmentServiceImpl extends BaseService<ContentFragment> implements ContentFragmentService  {

    @Autowired
    private ContentFragmentMapper contentFragmentMapper;
    @Autowired
    private AttributeMapper attributeMapper;
    @Autowired
    private ContentFragmentResourceMapper contentFragmentResourceMapper;
    @Autowired
    private ResourceMapper resourceMapper;
    @Autowired
    private ResourceService resourceService;
    @Autowired
    private IchProjectMapper ichProjectMapper;

    @Override
    public ContentFragment getContentFragment(String id) throws Exception {
        ContentFragment contentFragment = null;
        try{
            contentFragment = contentFragmentMapper.selectByPrimaryKey(Long.parseLong(id));
            if(contentFragment ==null){
                return contentFragment;
            }
            //根据contentFragment获取资源文件  获取attribute
            Attribute attribute = attributeMapper.selectByPrimaryKey(contentFragment.getAttributeId());
            contentFragment.setAttribute(attribute);
            List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragment.getId());
            List<Resource> resourceList = new ArrayList<>();
            for (ContentFragmentResource contentFragmentResource:contentFragmentResourceList) {
                Resource resource = resourceMapper.selectByPrimaryKey(contentFragmentResource.getContentFragmentId());
                if(resource == null){
                    continue;
                }
                resourceList.add(resource);
            }
            contentFragment.setResourceList(resourceList);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }


        return contentFragment;
    }

    @Override
    public ContentFragment saveContentFragment(ContentFragment contentFragment) throws Exception {
//        TransactionStatus transactionStatus = getTransactionStatus();
        checkSaveField(contentFragment);//校验字段
        try{
            if(contentFragment.getId() == null){
                Long attributeId = contentFragment.getAttributeId();
                if(attributeId == 0 || attributeId == null){
                    attributeId = saveAttribute(contentFragment);
                }
                contentFragment.setId(IdWorker.getId());
                contentFragment.setAttributeId(attributeId);
                contentFragment.setStatus(0);
                contentFragmentMapper.insertSelective(contentFragment);
            }else{
                contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                Attribute attribute = contentFragment.getAttribute();
                if(attribute != null && (attribute.getTargetType() ==10 || attribute.getTargetType() ==11 || attribute.getTargetType() ==12)){//更新自定义属性的名称
                    attributeMapper.updateByPrimaryKeySelective(contentFragment.getAttribute());
                }
            }
            //保存资源文件
            if(contentFragment.getResourceList() != null && contentFragment.getResourceList().size() > 0){
                for (int i=0; i<  contentFragment.getResourceList().size();i++) {
                    Resource resource = contentFragment.getResourceList().get(i);
                    Long resourceId = resource.getId();
                    resourceService.save(resource);
                    if(resourceId == null){
                        ContentFragmentResource cfr = new ContentFragmentResource();
                        cfr.setId(IdWorker.getId());
                        cfr.setContentFragmentId(contentFragment.getId());
                        cfr.setResourceId(resource.getId());
                        if(resource.getResOrder() !=null && !"".equals(resource.getResOrder())){
                            cfr.setResOrder(resource.getResOrder());
                        }else{
                            cfr.setResOrder(i+1);
                        }
                        cfr.setStatus(0);
                        //保存中间表
                        contentFragmentResourceMapper.insertSelective(cfr);
                    }
                }

            }
//            commit(transactionStatus);
        }catch (Exception e){
            e.printStackTrace();
//            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return contentFragment;
    }

    @Override
    public ContentFragment deleteContentFragment(ContentFragment contentFragment) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try{
            if(contentFragment != null){
                List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragment.getId());
                if(contentFragmentResourceList.size()>0){
                    contentFragmentResourceMapper.deleteByContentFragmentId(contentFragment.getId());
                }
                if(contentFragment.getAttributeId() != null){
                    Attribute attribute = attributeMapper.selectByPrimaryKey(contentFragment.getAttributeId());
                    if(attribute != null && (attribute.getTargetType() ==10 || attribute.getTargetType() ==11 || attribute.getTargetType() ==12)){
                        contentFragmentMapper.deleteByPrimaryKey(contentFragment.getId());
                        attributeMapper.deleteByPrimaryKey(contentFragment.getAttributeId());
                    }else{
                        if(contentFragment.getTargetType() != null && contentFragment.getTargetType() == 0 ){
                            IchProject project = ichProjectMapper.selectIchProjectById(contentFragment.getTargetId());
                            if(project != null && ( !attribute.getIchCategoryId().equals(project.getIchCategoryId()))){
                                contentFragmentMapper.deleteByPrimaryKey(contentFragment.getId());
                            }else{
                                contentFragment.setContent("");
                                contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                            }
                        }
                        if(contentFragment.getTargetType() != null && contentFragment.getTargetType() == 1 ){//传承人
                            contentFragmentMapper.deleteByPrimaryKey(contentFragment.getId());
                        }
                    }
                }

            }
            commit(transactionStatus);
        }catch (Exception e){
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return contentFragment;
    }
    //用于删除项目实践部分
    @Override
    public void deleteContentFragmentByAttrIdAndTargetId(Long targetId, Integer targetType, Long attributeId) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try{
            ContentFragment contentFragment = new ContentFragment();
            contentFragment.setAttributeId(attributeId);
            contentFragment.setTargetId(targetId);
            contentFragment.setTargetType(targetType);
            ContentFragment content = contentFragmentMapper.selectByAttrIdAndTargetId(contentFragment);
            if(content != null){
                Long id = content.getId();
                List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(id);
                if(contentFragmentResourceList.size()>0){
                    contentFragmentResourceMapper.deleteByContentFragmentId(id);
                    for (ContentFragmentResource contentFragmentResource : contentFragmentResourceList) {
                        resourceMapper.deleteByPrimaryKey(contentFragmentResource.getResourceId());
                    }
                }
                contentFragmentMapper.deleteByPrimaryKey(id);
            }
            commit(transactionStatus);
        }catch(Exception e){
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    private void checkSaveField(ContentFragment contentFragment) throws Exception {
        Long attributeId = contentFragment.getAttributeId();
        if (attributeId != null && attributeId != 0) {
            Attribute attribute = null;
            try {
                attribute = attributeMapper.selectByPrimaryKey(attributeId);
            } catch (Exception e) {
                e.printStackTrace();
                throw new ApplicationException(ApplicationException.INNER_ERROR);
            }

            if (attribute.getMinLength() != null) {
                String content = contentFragment.getContent().trim();
                if (content == null || (content.trim().length() < attribute.getMinLength())) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString()+" 字段不符合要求");
                }
            }
            if (attribute.getMaxLength() != null) {
                String content = contentFragment.getContent().trim();
                if (content != null && content.trim().length() > attribute.getMaxLength()) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString()+" 字段不符合要求");
                }
            }

        }
    }
    /**
     * 保存自定义字段
     * @param contentFragment
     * @return
     * @throws Exception
     */
    private Long saveAttribute(ContentFragment contentFragment) throws Exception{
        String targetType = 1+""+contentFragment.getTargetType();
        Attribute attribute = contentFragment.getAttribute();
        Long attributeId = IdWorker.getId();
        attribute.setId(attributeId);
        attribute.setStatus(0);
        attribute.setTargetType(Integer.parseInt(targetType));
        attribute.setTargetId(contentFragment.getTargetId());
        attribute.setIsOpen(1);
        attribute.setPriority(99);
        attribute.setSeq(999);
        attributeMapper.insertSelective(attribute);
        return attributeId;
    }

}
