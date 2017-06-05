package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchCategory;
import com.diich.core.service.IchCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
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
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }

        try {
            ichCategory = ichCategoryService.getCategoryById(id);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichCategory);
    }
}
