package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchCategory;
import com.diich.core.service.IchCategoryService;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/4.
 */
@Controller
public class TestController extends BaseController{

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private IchProjectService ichProjectService;

    @Autowired
    private IchCategoryService ichCategoryService;

    @RequestMapping("test1")
    @ResponseBody
    public ResponseEntity<ModelMap> getPage(HttpServletRequest request) {
        return null;
    }

    @RequestMapping("test2")
    @ResponseBody
    public Map<String, Object> test2(HttpServletRequest request) {
        String params = "/ljhuitgyiu";

        IchCategory ichCategory = null;

        try {
            ichCategory = (IchCategory) parseObject(params, IchCategory.class);

            ichCategoryService.getIchCategoryList();
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException)e;
            return ae.toMap();
        }

        return setResultMap(ichCategory);
    }

}
