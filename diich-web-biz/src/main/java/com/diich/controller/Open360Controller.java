package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchProject;
import com.diich.core.model.User;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by wangwenjian on 2018/1/3.
 */
@Controller
@RequestMapping("open360")
public class Open360Controller extends BaseController {

    @Autowired
    private UserService userService;
    @Autowired
    private IchProjectService ichProjectService;
    /**
     * 登陆
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/authentication", method = RequestMethod.GET)
    public Map<String, Object> login(HttpServletRequest request, HttpServletResponse response){
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        String loginName = request.getParameter("loginName");
        String password = request.getParameter("password");
        if(StringUtils.isEmpty(loginName) || StringUtils.isEmpty(password)){
            ApplicationException ae = new ApplicationException(ApplicationException.USER_UNCOMPLETE);
            return putDataToMap(ae);
        }
        User user =null;
        try{
            user = userService.login(loginName,password);
            HttpSession session = request.getSession();
            user.setPassword(null);
            session.setAttribute(user.getLoginName(),user);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(user);
    }

    @RequestMapping("getIchProjectList")
    @ResponseBody
    public Map<String, Object> getIchProjectList(HttpServletRequest request, HttpServletResponse response) {
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        String loginName = request.getParameter("loginName");
        String pageNo = request.getParameter("pageNo");
        String pageSize = request.getParameter("pageSize");
       if(StringUtils.isEmpty(loginName)){
           ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR,"用户名不能为空");
           return putDataToMap(ae);
       }
       if(request.getSession().getAttribute("loginName") == null){
           ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
           return putDataToMap(ae);
       }
        Integer current = 1;
        Integer size = 10;
       if(!StringUtils.isEmpty(pageNo)){
           current=Integer.parseInt(pageNo);
       }
        if(!StringUtils.isEmpty(pageSize)){
            size=Integer.parseInt(pageSize);
        }
        Page<Map> page = null;
        try {
            page = ichProjectService.getCountryIchProjectList(current,size);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(page);
    }
    @RequestMapping("getIchProjectById")
    @ResponseBody
    public Map<String, Object> getIchProject(HttpServletRequest request, HttpServletResponse response){
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        String loginName = request.getParameter("loginName");
        String id = request.getParameter("id");
        if(StringUtils.isEmpty(loginName)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR,"用户名不能为空");
            return putDataToMap(ae);
        }
        if(StringUtils.isEmpty(id)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR,"id不能为空");
            return putDataToMap(ae);
        }
        if(request.getSession().getAttribute("loginName") == null){
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        Map ichProject = null;
        try {
            ichProject = ichProjectService.getCountryIchProjectById(id);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return ichProject;
    }
}
