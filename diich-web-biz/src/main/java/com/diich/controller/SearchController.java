package com.diich.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/12 0012.
 */

@Controller
public class SearchController extends BaseController {

    @Autowired
    private SearchService searchService;

    @RequestMapping("search")
    @ResponseBody
    public Map<String, Object> search(HttpServletRequest request, HttpServletResponse response) {
        String conditionStr = request.getParameter("condition");

        JSONObject condition = null;

        try {
            condition = JSONObject.parseObject(conditionStr);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        List<Map<String, Object>> list = new ArrayList<>();
        Integer total = 0;

        try {
            total = searchService.search(list, condition);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        response.setHeader("Access-Control-Allow-Origin", "*");

        Page page = new Page();
        page.setRecords(list);
        page.setTotal(total);

        return putDataToMap(page);
    }

    @RequestMapping("clearAllKey")
    @ResponseBody
    public Map<String, Object> clearAllKey() {
        boolean flag;

        try {
            flag = searchService.clearAllKey();
        } catch (Exception e) {
            return putDataToMap(e);
        }

        return putDataToMap(flag);
    }

}
