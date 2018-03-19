package com.diich.core.service;

import com.diich.core.model.ContentFragmentResource;

/**
 * Created by Administrator on 2018/3/14.
 */
public interface ContentFragmentResourceService {

    ContentFragmentResource getContentFragmentResource(Long id)throws Exception;
    ContentFragmentResource save(ContentFragmentResource contentFragmentResource) throws Exception;
    void delete(ContentFragmentResource contentFragmentResource) throws Exception;
    void delete(Long contentFragmentId, Long resourceId) throws Exception;
}
