package com.diich.core.service;

import java.util.Map;

/**
 * Created by Administrator on 2017/5/19.
 */
public interface WorksService {

    //根据id获取作品详情
    Map<String, Object> getWorks(String worksId);
}
