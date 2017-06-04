package com.diich.web.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchMaster;
import com.diich.core.model.User;
import com.diich.core.service.IchMasterService;
import com.diich.core.util.WebUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/9.
 */
@Controller
@RequestMapping("ichMaster")
public class IchMasterController extends BaseController<IchMaster>{

    @Autowired
    private IchMasterService ichMasterService;

    @RequestMapping("getIchMaster")
    @ResponseBody
    public Map<String, Object> getIchMaster(HttpServletRequest request,HttpServletResponse response) {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        IchMaster ichMaster = null;
        try{
            ichMaster = ichMasterService.getIchMaster(id);
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichMaster);
    }

    @RequestMapping("getIchMasterList")
    @ResponseBody
    public Map<String, Object> getIchMasterList(HttpServletRequest request,HttpServletResponse response) {

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
        Page<IchMaster> page = null;
        try {
            page = ichMasterService.getIchMasterPage(params);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(page);
    }

    @RequestMapping("saveIchMaster")
    @ResponseBody
    public Map<String, Object> saveIchMaster(HttpServletRequest request,HttpServletResponse response) {
        String params = request.getParameter("params");
        IchMaster ichMaster = null;

        try {
            ichMaster = parseObject(params, IchMaster.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }

        User user = (User) WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return ae.toMap();
        }

        ichMaster.setLastEditorId(user.getId());

        try {
            ichMasterService.saveIchMaster(ichMaster);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichMaster);
    }
}
