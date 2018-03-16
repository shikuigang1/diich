package com.diich.controller;

import com.alibaba.fastjson.JSONArray;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/3/14.
 */
@Controller
@RequestMapping("authority")
public class AuthorityController extends BaseController{
    @Autowired
    private AuthorityService authorityService;

    @RequestMapping("addAuthority")
    @ResponseBody
    public Map<String, Object> addAuthority(HttpServletRequest request) {
        String tableName;
        Long targetId;
        List<Long> authorityIds;

        try {
            tableName = request.getParameter("tableName");
            targetId = Long.parseLong(request.getParameter("targetId"));
            authorityIds = JSONArray.parseArray(request.getParameter("authorityIds"), Long.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        try {
            authorityService.addAuthority(tableName, targetId, authorityIds);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("code",0);
        resultMap.put("Msg", "success");
        return putDataToMap(resultMap);
    }
}
