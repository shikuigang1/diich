package com.diich.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.model.SecUser;
import com.diich.core.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
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
public class UserController extends BaseController{

    @Autowired
    private SysUserService sysUserService;

    @RequestMapping("userPage")
    @ResponseBody
    public ResponseEntity<ModelMap> selectPage(HttpServletRequest request){
        String id = request.getParameter("id");
        String password = "1";

        ModelMap modelMap = new ModelMap();
        Page page=new Page<SecUser>(1,2);

        sysUserService.selectUserPage(page, id, password);

        return setSuccessModelMap(modelMap, page);
    }
}
