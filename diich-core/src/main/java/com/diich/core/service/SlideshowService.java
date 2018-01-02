package com.diich.core.service;

import com.diich.core.model.SysSlideshowConfig;

import java.util.List;

/**
 * Created by wangwenjian on 2017/12/28.
 */
public interface SlideshowService {
    /**
     * 查询所有轮播图
     * @return
     */
    List<SysSlideshowConfig> getSlideshowList() throws Exception;
}
