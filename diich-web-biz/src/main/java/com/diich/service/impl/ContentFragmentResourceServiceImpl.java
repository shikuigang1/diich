package com.diich.service.impl;

import com.diich.core.model.ContentFragmentResource;
import com.diich.core.service.ContentFragmentResourceService;
import com.diich.mapper.ContentFragmentResourceMapper;
import com.diich.mapper.ResourceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Administrator on 2018/3/14.
 */
@Service
public class ContentFragmentResourceServiceImpl implements ContentFragmentResourceService{
    @Autowired
    private ContentFragmentResourceMapper contentFragmentResourceMapper;

    @Autowired
    private ResourceMapper resourceMapper;

    @Override
    public ContentFragmentResource getContentFragmentResource(Long id) throws Exception {
        return contentFragmentResourceMapper.selectByPrimaryKey(id);
    }

    @Override
    @Transactional
    public ContentFragmentResource save(ContentFragmentResource contentFragmentResource) throws Exception {
        if(contentFragmentResource == null) {
            return null;
        }
        if(contentFragmentResource.getDataStatus() == 'a'){
            contentFragmentResourceMapper.insertSelective(contentFragmentResource);
        } else if(contentFragmentResource.getDataStatus() == 'd') {
            contentFragmentResourceMapper.deleteByPrimaryKey(contentFragmentResource.getId());
            resourceMapper.deleteByPrimaryKey(contentFragmentResource.getResourceId());
        } else {
            contentFragmentResourceMapper.updateByPrimaryKeySelective(contentFragmentResource);
        }
        contentFragmentResource.setDefaultDataStatus();
        return contentFragmentResource;
    }


    @Override
    public void delete(ContentFragmentResource contentFragmentResource) throws Exception {
        if(contentFragmentResource != null) {
            contentFragmentResourceMapper.deleteByPrimaryKey(contentFragmentResource.getId());
        }
    }

    @Override
    public void delete(Long contentFragmentId, Long resourceId) throws Exception {
        contentFragmentResourceMapper.deleteByContentFragmentIdResourceId(contentFragmentId, resourceId);
    }
}
