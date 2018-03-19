package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.IllegalParameterException;
import com.diich.core.model.Attribute;
import com.diich.core.service.AttributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/2/11.
 */
@Controller
@RequestMapping("attribute")
public class AttributeController extends BaseController<Attribute> {
    @Autowired
    private AttributeService attributeService;

    @RequestMapping("getList")
    @ResponseBody
    public Map<String, Object> getDictionariesByType(HttpServletRequest request, HttpServletResponse response) {
        int targetType = 0, categoryId = 0, targetId = 0;

        try {
            targetType = Integer.parseInt(request.getParameter("targetType"));
        } catch (Exception e) {

            return putDataToMap(new IllegalParameterException("参数targetType错误"));
        }

        try {
            categoryId = Integer.parseInt((request.getParameter("categoryId")));
            targetId = Integer.parseInt(request.getParameter("targetId"));
        } catch (Exception e){}

        List<Attribute> attributeList = null;
        try {
            attributeList = attributeService.getAttributeList(targetType, categoryId, targetId);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(attributeList);
    }
}


