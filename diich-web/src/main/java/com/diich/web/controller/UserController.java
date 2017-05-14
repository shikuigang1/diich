package com.diich.web.controller;

import com.diich.core.base.BaseController;
import com.diich.core.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/5/11.
 */
@Controller
@RequestMapping("user")
public class UserController extends BaseController<User> {

    @RequestMapping("register")
    @ResponseBody
    public ResponseEntity<ModelMap> register(HttpServletRequest request) {
        String phone = request.getParameter("phone");
        String code = request.getParameter("code");
        ModelMap map = new ModelMap();

        User user = null;//register(phone, code);

        return setSuccessModelMap(map, user);
    }

    @RequestMapping("login")
    @ResponseBody
    public ResponseEntity<ModelMap> login(HttpServletRequest request) {
        String loginName = request.getParameter("loginName");
        String password = request.getParameter("password");
        String code = request.getParameter("cdoe");
        ModelMap map = new ModelMap();

        User user = null;//login(loginName, password, code);

        return setSuccessModelMap(map, user);
    }

    @RequestMapping("logoff")
    @ResponseBody
    public ResponseEntity<ModelMap> logoff(HttpServletRequest request) {
        String loginName = request.getParameter("loginName");
        ModelMap map = new ModelMap();

        User user = null;//logoff(loginName);

        return setSuccessModelMap(map, user);
    }

    @RequestMapping("saveUser")
    @ResponseBody
    public ResponseEntity<ModelMap> getUser(HttpServletRequest request) {
        String params = request.getParameter("params");
        ModelMap map = new ModelMap();

        User user = null;//saveUser(params);

        return setSuccessModelMap(map, user);
    }
}
