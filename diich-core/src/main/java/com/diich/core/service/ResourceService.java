package com.diich.core.service;

import com.diich.core.model.Resource;

/**
 * Created by Administrator on 2017/7/27.
 */
public interface ResourceService {
    void save(Resource resource) throws Exception;
    void deleteResource(Long id)throws Exception;
}
