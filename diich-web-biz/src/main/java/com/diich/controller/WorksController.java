package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.StringUtils;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchProject;
import com.diich.core.model.User;
import com.diich.core.model.Works;
import com.diich.core.service.WorksService;
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
 * Created by Administrator on 2017/5/19.
 */
@Controller
@RequestMapping("works")
public class WorksController extends BaseController<Works> {

    @Autowired
    private WorksService worksService;

    @RequestMapping("getWorks")
    @ResponseBody
    public Map<String, Object> getWorks(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        Works works = null;
        try{
            works = worksService.getWorks(id);
        }catch (Exception e){
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(works);

    }

    @RequestMapping("getWorksList")
    @ResponseBody
    public Map<String, Object> getWorksList(HttpServletRequest request,HttpServletResponse response){
        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        Page<Works> page = null;
        try {
            page = worksService.getWorksPage(params);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(page);
    }

    @RequestMapping("saveWorks")
    @ResponseBody
    public Map<String, Object> saveWorks(HttpServletRequest request,HttpServletResponse response)  {
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String params = request.getParameter("params");
        Works works = null;
        try {
            works = parseObject(params, Works.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        works.setLastEditorId(user.getId());

        try {
            works = worksService.saveWorks(works,user);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(works);
    }

    @RequestMapping("submitWorks")
    @ResponseBody
    public Map<String, Object> submitWorks(HttpServletRequest request,HttpServletResponse response)  {
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String params = request.getParameter("params");
        Works works = null;
        try {
            works = parseObject(params, Works.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        works.setLastEditorId(user.getId());

        try {
            works.setStatus(3);
            works = worksService.saveWorks(works,user);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(works);
    }

    /**
     *个人中心
     * @param request
     * @param response
     * @return
     *
     */
    @RequestMapping("getWorksByUserId")
    @ResponseBody
    public Map<String, Object> getWorksByUserId(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        if(user.getType() != null && user.getType()!=0){
            params.put("userId",user.getId());
        }
        Page<Works> page = null;
        try{
            page = worksService.getWorksByUserId(params);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(page);
    }

    @RequestMapping("audit")
    @ResponseBody
    public Map<String, Object> audit(HttpServletRequest request, HttpServletResponse response){
        try {
            setHeader(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String id = request.getParameter("id");
        String doi = request.getParameter("doi");
        if(id == null){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            worksService.audit(Long.parseLong(id),user,doi);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }

    @RequestMapping("refuseAudit")
    @ResponseBody
    public Map<String, Object> refuseAudit(HttpServletRequest request, HttpServletResponse response){
        try {
            setHeader(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String id = request.getParameter("id");
        String reason = request.getParameter("reason");
        if(StringUtils.isEmpty(id)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            worksService.refuseAudit(Long.parseLong(id),user,reason);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }

    /**
     * 假删
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("delete")
    @ResponseBody
    public Map<String, Object> delete(HttpServletRequest request, HttpServletResponse response) {
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String id = request.getParameter("params");
        if (id == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try {
            int delete = worksService.deleteWorks(Long.parseLong(id));
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }
}
