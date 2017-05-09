package com.diich.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.model.SecUser;
import com.diich.core.model.User;
import com.diich.core.service.SysUserService;
import com.diich.core.support.HttpCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

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
    public ResponseEntity<ModelMap> selectPage(HttpServletRequest request) {

        String params = request.getParameter("params");
        User user = (User)parseObject(params, User.class);

        ModelMap modelMap = new ModelMap();
        String id = request.getParameter("id");
        Page<SecUser> page = null;//sysUserService.selectUserPage(id);

        if("1".equals(id)) {
            return setModelMap(modelMap, HttpCode.BAD_REQUEST);
        }

        return setSuccessModelMap(modelMap, page);
    }
}
