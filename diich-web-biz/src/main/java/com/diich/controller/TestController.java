package com.diich.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.model.SecUser;
import com.diich.core.model.User;
import com.diich.core.service.IchItemService;
import com.diich.core.service.SysUserService;
import com.diich.core.support.HttpCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

import java.util.Map;

import static com.alibaba.fastjson.JSON.parseObject;

/**
 * Created by Administrator on 2017/5/4.
 */
@Controller
public class TestController extends BaseController{

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private IchItemService ichItemService;

    @RequestMapping("test1")
    @ResponseBody
    public ResponseEntity<ModelMap> getPage(HttpServletRequest request) {

        String params = request.getParameter("params");
        User user = (User)parseObject(params, User.class);

        ModelMap modelMap = new ModelMap();
        String id = request.getParameter("id");
        Page<SecUser> page = null;//sysUserService.getUserPage(id);

        if("1".equals(id)) {
            return setModelMap(modelMap, HttpCode.BAD_REQUEST);
        }

        return setSuccessModelMap(modelMap, page);
    }

    @RequestMapping("test2")
    @ResponseBody
    public Map<String, Object> test2(HttpServletRequest request) {
        String params = "{doi:'jolsuejk',series:'fwfdsdge',cnName:'粉墙',status:1}";

        Map<String, Object> result = ichItemService.saveICHItem(params);

        return result;
    }
}
