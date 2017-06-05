package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchProject;
import com.diich.core.model.User;
import com.diich.core.service.IchProjectService;
import com.diich.core.util.WebUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/9.
 */
@Controller
@RequestMapping("ichProject")
public class IchProjectController extends BaseController<IchProject> {

    @Autowired
    private IchProjectService ichProjectService;

    @RequestMapping("getIchProject")
    @ResponseBody
    public Map<String, Object> getIchProject(HttpServletRequest request,HttpServletResponse response) {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        IchProject ichProject = null;
        try{
            ichProject = ichProjectService.getIchProject(id);
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichProject);
    }

    @RequestMapping("getIchProjectList")
    @ResponseBody
    public Map<String, Object> getIchProjectList(HttpServletRequest request,HttpServletResponse response) {
        Map<String, Object> params = new HashMap<>();;
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        Page<IchProject> page = null;
        try {
            page = ichProjectService.getIchProjectPage(params);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(page);
    }

    @RequestMapping("saveIchProject")
    @ResponseBody
    public Map<String, Object> saveIchProject(HttpServletRequest request,HttpServletResponse response) {
        String params = request.getParameter("params");
        IchProject ichProject = null;

        try {
            ichProject = parseObject(params, IchProject.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }

        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return ae.toMap();
        }

        ichProject.setLastEditorId(user.getId());

        try {
            ichProject = ichProjectService.saveIchProject(ichProject);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichProject);
    }

    @RequestMapping("getProByName")
    @ResponseBody
    public Map<String, Object> getProByName(HttpServletRequest request,HttpServletResponse response) {


        Map<String,Object> map = new HashMap<String,Object>();

        map.put("keyword",request.getParameter("keyword"));
        map.put("type",request.getParameter("type"));
        map.put("pageBegin",0);
        map.put("pageSize",5);

        List<Map> ls=null;

        try {
            ls =ichProjectService.getIchProjectByName(map);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ls);
    }

}
