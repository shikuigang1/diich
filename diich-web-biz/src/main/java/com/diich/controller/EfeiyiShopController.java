package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchMaster;
import com.diich.core.model.IchProject;
import com.diich.core.model.Works;
import com.diich.core.service.IchMasterService;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.WorksService;
import com.diich.core.util.PropertiesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/10/9.
 */
@Controller
@RequestMapping("efeiyiShop")
public class EfeiyiShopController extends BaseController{
    @Autowired
    private IchProjectService ichProjectService;
    @Autowired
    private IchMasterService ichMasterService;
    @Autowired
    private WorksService worksService;

    @RequestMapping("getIchProject")
    @ResponseBody
    public Map<String, Object> getIchProject(HttpServletRequest request, HttpServletResponse response) {
        String projectName = request.getParameter("projectName");
        String masterName = request.getParameter("masterName");
        String worksName = request.getParameter("worksName");
        if(StringUtils.isEmpty(projectName) && StringUtils.isEmpty(masterName) && StringUtils.isEmpty(worksName)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        List<IchProject> ichProjectList = null;
        try{
            ichProjectList = ichProjectService.getIchProject(projectName,masterName,worksName);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(ichProjectList);
    }
    @RequestMapping("getIchMaster")
    @ResponseBody
    public Map<String, Object> getIchMaster(HttpServletRequest request, HttpServletResponse response) {
        String masterName = request.getParameter("masterName");
        String worksName = request.getParameter("worksName");
        if(StringUtils.isEmpty(masterName) && StringUtils.isEmpty(worksName)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        List<IchMaster> ichMasterList = null;
        try{
            ichMasterList = ichMasterService.getIchMaster(masterName,worksName);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(ichMasterList);
    }
    @RequestMapping("getWorks")
    @ResponseBody
    public Map<String, Object> getWorks(HttpServletRequest request, HttpServletResponse response) {
        String worksName = request.getParameter("worksName");
        if(StringUtils.isEmpty(worksName)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        List<Works> worksList = null;
        try{
            worksList = worksService.getWorksByName(worksName);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(worksList);
    }
    @RequestMapping("getWorksById")
    @ResponseBody
    public Map<String, Object> getWorksByDoi(HttpServletRequest request, HttpServletResponse response) {
        String doi = request.getParameter("worksId");
        if(StringUtils.isEmpty(doi)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        Works works = null;
        try{
            works = worksService.getWorksByDoi(doi);
            if(works != null){
                works.setUri(PropertiesUtil.getString("_works") + works.getId() + ".html");
            }
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(works);
    }
    @RequestMapping("getIchMasterById")
    @ResponseBody
    public Map<String, Object> getIchMasterById(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("masterId");
        if(StringUtils.isEmpty(id)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        IchMaster ichMaster = null;
        try{
            ichMaster = ichMasterService.getIchMaster(id);
            if(ichMaster != null){
                ichMaster.setUri(PropertiesUtil.getString("_master") + id + ".html");
            }
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(ichMaster);
    }

    @RequestMapping("getIchProjectById")
    @ResponseBody
    public Map<String, Object> getIchProjectById(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("projectId");
        if(StringUtils.isEmpty(id)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        IchProject ichProject = null;
        try{
            ichProject = ichProjectService.getIchProject(id);
            if(ichProject != null){
                ichProject.setUri(PropertiesUtil.getString("_project") + id + ".html");
            }
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(ichProject);
    }

}
