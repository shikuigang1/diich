package com.diich.core.service;

import com.diich.core.model.ContentFragment;

/**
 * Created by Administrator on 2017/7/18.
 */
public interface ContentFragmentService {

    ContentFragment getContentFragment(String id) throws Exception;

    ContentFragment saveContentFragment(ContentFragment contentFragment) throws Exception;

    ContentFragment deleteContentFragment(ContentFragment contentFragment)throws Exception;

    void deleteContentFragmentByAttrIdAndTargetId(Long targetId, Integer targetType, Long attributeId) throws Exception;
}
