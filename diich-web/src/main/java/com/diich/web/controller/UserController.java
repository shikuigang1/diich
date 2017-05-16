package com.diich.web.controller;

import com.diich.core.Constants;
import com.diich.core.base.BaseController;
import com.diich.core.model.User;
import com.diich.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/11.
 */
@Controller
@RequestMapping("user")
public class UserController extends BaseController<User> {

    @Autowired
    private UserService userService;

    @RequestMapping("register")
    @ResponseBody
    public Map<String, Object> register(HttpServletRequest request) {
        String phone = request.getParameter("phone");
        String code = request.getParameter("code");//验证码

        Map<String, Object> result = null;//register(phone, code);

        return result;
    }

    @RequestMapping("login")
    @ResponseBody
    public  Map<String, Object> login(HttpServletRequest request) {
        String loginName = request.getParameter("loginName");
        String password = request.getParameter("password");
        String code = request.getParameter("code");
        Map<String, Object> result = userService.login(loginName,password);
        return result;
    }

    @RequestMapping("logoff")
    @ResponseBody
    public Map<String, Object> logoff(HttpServletRequest request) {
        String loginName = request.getParameter("loginName");
        HttpSession session = request.getSession();
        session.removeAttribute("loginName");
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("code", Constants.SUCCESS);
        result.put("msg", Constants.MSGS[Constants.SUCCESS]);
        return result;
    }

    @RequestMapping("saveUser")
    @ResponseBody
    public Map<String, Object> saveUser(HttpServletRequest request) {
        String params = request.getParameter("params");

        Map<String, Object> result = userService.saveUser(params);

        return result;
    }
    @RequestMapping("checkUser")
    @ResponseBody
    public Map<String, Object> checkUser(HttpServletRequest request) {
        String loginName = request.getParameter("loginName");

        Map<String, Object> result = userService.checkUser(loginName);

        return result;
    }
}
