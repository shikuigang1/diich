package com.diich.web.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchCategory;
import com.diich.core.service.IchCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
    public Map<String, Object> getAllIchCategory() {
        List<IchCategory> categoryList = null;

        try {
            categoryList = ichCategoryService.getAllCategory();
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return setResultMap(categoryList);
    }
}
