package com.diich.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.model.SecUser;
import com.diich.core.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/4.
 */
@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private SysUserService sysUserService;

    @RequestMapping("userPage")
    @ResponseBody
    public List<SecUser> selectPage(HttpServletRequest request){
        String id = request.getParameter("id");
        String password = "1";

        Map<String, Object> conditons = new HashMap<String, Object>();

        Page page=new Page<SecUser>(1,2);

        EntityWrapper entityWrapper = new EntityWrapper<SecUser>();

        List<SecUser> secUserList = sysUserService.selectUserPage(page, id, password);

        return secUserList;
    }
}
