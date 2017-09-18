package com.diich.core.service;

import com.diich.core.model.Enjoy;

/**
 * Created by Administrator on 2017/9/7.
 */
public interface EnjoyService {
    Integer getCount(Long targetId, Integer targetType) throws Exception;

    Enjoy saveEnjoy(Enjoy enjoy) throws Exception;

    void deleteEnjoy(Enjoy enjoy) throws Exception;

    int getCountByUser(Enjoy enjoy) throws Exception;
}
