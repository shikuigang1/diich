package com.diich.core.service;

import com.diich.core.model.News;

import java.util.List;

/**
 * Created by wangwenjian on 2017/12/28.
 */
public interface NewsService {
    /**
     * 查询新闻资讯
     * @return
     */
    List<News> getNewsList() throws Exception;

    /**
     * 通过id获取资讯信息
     * @param id
     * @return
     * @throws Exception
     */
    News getNewsById(String id) throws Exception;
}
