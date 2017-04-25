package com.diich.web.controller;

import com.diich.core.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import  com.diich.core.model.SecUser;

/**
 * Created by Administrator on 2017/4/24 0024.
 */
@Controller
@RequestMapping(value="/sys")
public class SysUserController {

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
    public void enable(String enable ){

        SecUser u = new SecUser();
        u.setId(1l);
        u.setEnable(2);
        sysUserService.updateUser(u);

    }

}
