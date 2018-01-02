package com.diich.service.impl;

import com.diich.core.exception.ApplicationException;
import com.diich.core.model.News;
import com.diich.core.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wangwenjian on 2017/12/28.
 */
@Service
public class NewsServiceImpl implements NewsService{

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<News> getNewsList() throws Exception{
        List<News> newsList = null;
        try{
            Query query = new Query();
            newsList = mongoTemplate.find(query,News.class);
        }catch(Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return newsList;
    }

    @Override
    public News getNewsById(String id) throws Exception {
        News news = null;
        try{
            Query query = new Query();
            query.addCriteria(Criteria.where("id").is(id));
            news = mongoTemplate.findOne(query, News.class);
        }catch(Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return news;
    }
}
