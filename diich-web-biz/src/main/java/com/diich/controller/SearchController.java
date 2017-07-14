package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.SearchCondition;
import com.diich.core.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
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
        Map<String, Object> result = new HashMap<>();
        String conditionStr = request.getParameter("condition");

        SearchCondition condition = null;

        try {
            condition = (SearchCondition) parseObject(conditionStr,
                    SearchCondition.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }

        List<Map<String, Object>> list = new ArrayList<>();
        Integer total = 0;

        try {
            total = searchService.search(list, condition);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        result.put("code", 0);
        result.put("data", list);
        result.put("total", total);
        return result;
    }

}
