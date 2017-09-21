package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Enjoy;
import com.diich.core.model.User;
import com.diich.core.service.EnjoyService;
import com.diich.core.util.WebUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created by Administrator on 2017/9/4.
 */
@Controller
@RequestMapping("enjoy")
public class EnjoyController extends BaseController<Enjoy>{

    @Autowired
    private EnjoyService enjoyService;

    @RequestMapping("getCount")
    @ResponseBody
    public Map<String, Object> getCount(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request,response);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        String targetId = request.getParameter("targetId");
        String targetType = request.getParameter("targetType");
        if(targetId == null || targetType == null){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        int count = 0;
        try{
            count = enjoyService.getCount(Long.parseLong(targetId),Integer.parseInt(targetType));
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(count);
    }
    @RequestMapping("deleteEnjoy")
    @ResponseBody
    public Map<String, Object> deleteEnjoy(HttpServletRequest request, HttpServletResponse response){
        try {
            setHeader(request,response);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String params = request.getParameter("params");
        Enjoy enjoy = null;
        try {
            enjoy = parseObject(params, Enjoy.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        if(enjoy==null){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            enjoy.setUserId(user.getId());
            enjoyService.deleteEnjoy(enjoy);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(enjoy);
    }
    @RequestMapping("saveEnjoy")
    @ResponseBody
    public Map<String, Object> saveEnjoy(HttpServletRequest request, HttpServletResponse response){
        try {
            setHeader(request,response);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String params = request.getParameter("params");
        Enjoy enjoy = null;
        try {
            enjoy = parseObject(params, Enjoy.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        if(enjoy==null){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            enjoy.setUserId(user.getId());
            enjoy = enjoyService.saveEnjoy(enjoy);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(enjoy);
    }
    @RequestMapping("getCountByUser")
    @ResponseBody
    public Map<String, Object> getCountByUser(HttpServletRequest request, HttpServletResponse response){
        try {
            setHeader(request,response);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String params = request.getParameter("params");
        Enjoy enjoy = null;
        try {
            enjoy = parseObject(params, Enjoy.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        if(enjoy==null){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        int count = 0;
        try{
            count = enjoyService.getCountByUser(enjoy);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(count);
    }
}
