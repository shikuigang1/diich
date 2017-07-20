package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.ContentFragment;
import com.diich.core.service.ContentFragmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created by Administrator on 2017/7/18.
 */
@Controller
@RequestMapping("contentFragment")
public class ContentFragmentController extends BaseController<ContentFragment>{

    @Autowired
    private ContentFragmentService contentFragmentService;


    @RequestMapping("getContentFragment")
    @ResponseBody
    public Map<String, Object> getContentFragment(HttpServletRequest request, HttpServletResponse response){
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        ContentFragment contentFragment = null;
        try {
            contentFragment = contentFragmentService.getContentFragment(id);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(contentFragment);
    }

    @RequestMapping("saveContentFragment")
    @ResponseBody
    public Map<String,Object> saveContyentFragment(HttpServletRequest request, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        String params = request.getParameter("params");
        ContentFragment contentFragment = null;
        try{
            contentFragment  = parseObject(params, ContentFragment.class);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try {
            contentFragment = contentFragmentService.saveContentFragment(contentFragment);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        return putDataToMap(contentFragment);
    }

    @RequestMapping("deleteContentFragment")
    @ResponseBody
    public  Map<String,Object> deleteContentFragment(HttpServletRequest request, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            contentFragmentService.deleteContentFragment(Long.parseLong(id));
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }
}
