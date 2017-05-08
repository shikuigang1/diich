package com.diich.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.model.SecUser;
import com.diich.core.service.SysUserService;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/24 0024.
 */
@Controller
@RequestMapping(value="/sys")
public class SysUserController {

  @Autowired
    private SysUserService sysUserService;

    @ResponseBody
    @RequestMapping("/page")
    public Object selectPage(Model model){

        Page page=new Page(1,10);

        EntityWrapper ew=new EntityWrapper();
        ew.setEntity(new SecUser());

        Integer id=1;
        ew.where("id> {0}",1).orderBy("id");

        List<SecUser>  ls= null;//sysUserService.selectUserPage(page, ew);

        System.out.println(ls.size());
        return ls;
    }

    /**
     * session 测试
     */
    @RequestMapping(value="/set")
    @ResponseBody
    public void setSession(HttpServletRequest request,String str){
        request.getSession().setAttribute("str",str);
    }

    @RequestMapping(value="/test")
    public String testSession(HttpServletRequest request,String str,Model model){
        Object str1 =  request.getSession().getAttribute("str");

        System.out.println(request.getSession().getId());
        System.out.println(request.getRemoteHost()+":"+str1);

        model.addAttribute("str",str1);
        return "index";
    }
}
