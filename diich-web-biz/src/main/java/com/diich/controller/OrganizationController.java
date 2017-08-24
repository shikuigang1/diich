package com.diich.controller;

import com.diich.core.Constants;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Organization;
import com.diich.core.model.User;
import com.diich.core.service.OrganizationService;
import com.diich.core.util.WebUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/21.
 *
 */
@Controller
@RequestMapping("organization")
public class OrganizationController extends BaseController<Organization>{

    @Autowired
    private OrganizationService organizationService;

    @RequestMapping("getOrganization")
    @ResponseBody
    public Map<String, Object> getOrganization(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        Organization organization = null;
        try{
            organization = organizationService.getOrganization(Long.parseLong(id));
        }catch (Exception e){
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(organization);
    }

    /**
     * 获取的只有项目的信息  对status不做限制
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("getOrganizationById")
    @ResponseBody
    public Map<String, Object> getOrganizationById(HttpServletRequest request,HttpServletResponse response) {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        Organization organization = null;
        try{
            organization = organizationService.getOrganizationByIdAndIUser(Long.parseLong(id),user);
        }catch (Exception e){
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(organization);
    }

    @RequestMapping("saveOrganization")
    @ResponseBody
    public Map<String, Object> saveOrganization (HttpServletRequest request, HttpServletResponse response) throws Exception{
        String params = request.getParameter("params");
        Organization organization = null;

        try {
            organization = parseObject(params, Organization.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        User user = (User) WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        try {
            organization = organizationService.saveOrganization(organization, user);
            HttpSession session = request.getSession();
            session.setAttribute(Constants.CURRENT_ORG,organization);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(organization);
    }

    @RequestMapping("organizationInfo")
    @ResponseBody
    public  Map<String, Object> organizationInfo(HttpServletRequest request,HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(request.getSession().getAttribute("Constants.CURRENT_ORG"));
    }
    /**
     * 预览
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("preview")
    @ResponseBody
    public Map<String, Object> preview(HttpServletRequest request, HttpServletResponse response) throws Exception{

        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        String uri = null;
        try{
            uri = organizationService.preview(Long.parseLong(id));
        }catch (Exception e){
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(uri);
    }
}
