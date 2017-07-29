package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Attribute;
import com.diich.core.model.IchCategory;
import com.diich.core.service.IchCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/21.
 */
@Controller
@RequestMapping("ichCategory")
public class IchCategoryController extends BaseController<IchCategory> {

    @Autowired
    private IchCategoryService ichCategoryService;

    @RequestMapping("getAllIchCategory")
    @ResponseBody
    public Map<String, Object> getAllIchCategory(HttpServletResponse response) {
        List<IchCategory> categoryList = null;

        try {
            categoryList = ichCategoryService.getAllCategory();
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(categoryList);
    }

    /**
     * 通过分类id获得分类信息
     * @return
     */
    @RequestMapping("getIchCategoryById")
    @ResponseBody
    public Map<String, Object> getIchCategoryById(HttpServletRequest request,HttpServletResponse response) {
        Long id = null;
        IchCategory ichCategory = null;

        try {
            id = Long.parseLong(request.getParameter("id"));
        } catch (Exception e) {
            return putDataToMap(e);
        }

        try {
            ichCategory = ichCategoryService.getCategoryById(id);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("text/html;charset=UTF-8");
        return putDataToMap(ichCategory);
    }
    /**
     * 通过分类id和targetType获取属性列表
     * @return
     */
    @RequestMapping("getAttributeList")
    @ResponseBody
    public Map<String, Object> getAttrListByCatIdAndTarType(HttpServletRequest request, HttpServletResponse response) {

        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("text/html;charset=UTF-8");
        String categoryId = request.getParameter("categoryId");
        String targetType = request.getParameter("targetType");
        if(StringUtils.isEmpty(categoryId)){
            categoryId = null;
        }
        Long id = null;
        Integer tarType = null;
        List<Attribute> attributeList=null;
        try {
            if(categoryId != null){
                id = Long.parseLong(categoryId);
            }
            tarType = Integer.parseInt(targetType);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        try {
            attributeList = ichCategoryService.getAttrListByCatIdAndTarType(id,tarType);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(attributeList);
    }
    /**
     * 通过分类id和targetType获取属性列表
     * @return
     */
    @RequestMapping("getDefAttributeList")
    @ResponseBody
    public Map<String, Object> getDefAttrListByTarIdAndTarType(HttpServletRequest request, HttpServletResponse response) {

        response.setHeader("Access-Control-Allow-Origin", "*");
        String targetId = request.getParameter("targetId");
        String targetType = request.getParameter("targetType");
        Long id = null;
        Integer tarType = null;
        List<Attribute> attributeList=null;
        try {
            if(targetId != null){
                id = Long.parseLong(targetId);
            }
            tarType = Integer.parseInt(targetType);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        try {
            attributeList = ichCategoryService.getDefAttrByTarIdAndTarType(id,tarType);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(attributeList);
    }

}
