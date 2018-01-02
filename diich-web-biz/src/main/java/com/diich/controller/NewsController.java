package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.News;
import com.diich.core.service.NewsService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by wangwenjian on 2017/12/28.
 */
@Controller
@RequestMapping("/news")
public class NewsController extends BaseController{

    @Autowired
    private NewsService newsService;

    @RequestMapping(value = "/getNewsList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> list(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List<News> newsList = null;
        try {
            newsList = newsService.getNewsList();
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(newsList);
    }


    @RequestMapping(value = "/getNewsById", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getNewsById(HttpServletRequest request, HttpServletResponse response){
        try {
            setHeader(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String id = request.getParameter("id");
        if(StringUtils.isEmpty(id)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        News news = null;
        try {
            news = newsService.getNewsById(id);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        return  putDataToMap(news);
    }
}
