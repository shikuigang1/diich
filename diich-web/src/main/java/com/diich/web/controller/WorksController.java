package com.diich.web.controller;

import com.diich.core.service.WorksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/19.
 */
@Controller
@RequestMapping("works")
public class WorksController {

    @Autowired
    private WorksService worksService;

    @RequestMapping("getWorks")
    @ResponseBody
    public Map<String, Object> getWorks(HttpServletRequest request){
        String worksId = request.getParameter("params");

        Map<String, Object> result = worksService.getWorks(worksId);

        return result;

    }



}
