package com.diich.web.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import  com.diich.core.model.SecUser;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/24 0024.
 */
@Controller
@RequestMapping(value="/sys")
public class SysUserController extends BaseController{

    @Autowired
    private SysUserService sysUserService;

    @RequestMapping(value="/user")
    @ResponseBody
    public void user(String userid ){
        SecUser u = sysUserService.queryById(Long.parseLong(userid));
        System.out.println(u.getUser_name());
    }

    @RequestMapping(value="/enable")
    @ResponseBody
    public void enable(String enable){
        SecUser u = new SecUser();
        sysUserService.updateUser(u);
    }

    @RequestMapping(value="/test")
    @ResponseBody
    public String buildHTML() throws Exception {
        SecUser user = new SecUser();
        user.setUser_id(4);
        user.setUser_name("zhang");
        user.setPassword("1234");
        Map<String, Object> userMap = sysUserService.addUser(user);
//        String outPutPath = sysUserService.queryList();
        return "secUser";
    }

    @RequestMapping("getSecUser")
    @ResponseBody
    public Map<String, Object> getSecUser() {
        Map<String, Object> result = new HashMap<String, Object>();

        List<SecUser> secUserList = null;//sysUserService.querySecUserList();
        result.put("code", "0");
        result.put("msg", "获取用户列表成功");
        result.put("data", secUserList);
        return result;
    }


    @RequestMapping("/page")
    @ResponseBody
    public ResponseEntity<ModelMap> selectPage(HttpServletRequest request){
        ModelMap modelMap = new ModelMap();
        String id = request.getParameter("id");
        SecUser secUser = new SecUser();
        if(id != null) {
            secUser.setId(Long.parseLong(id));
        }

        Page<SecUser> page = sysUserService.selectUserPage(secUser);
        return setSuccessModelMap(modelMap, page);
    }

}
