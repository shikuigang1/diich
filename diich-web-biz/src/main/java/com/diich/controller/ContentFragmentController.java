package com.diich.controller;

import com.diich.core.Constants;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.ContentFragmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/7/18.
 */
@Controller
@RequestMapping("contentFragment")
public class ContentFragmentController extends BaseController<ContentFragment>{

    @Autowired
    private ContentFragmentService contentFragmentService;


    @RequestMapping("getContentFragment")
    @ResponseBody
    public Map<String, Object> getContentFragment(HttpServletRequest request, HttpServletResponse response){
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        ContentFragment contentFragment = null;
        try {
            contentFragment = contentFragmentService.getContentFragment(id);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(contentFragment);
    }

    @RequestMapping("saveContentFragment")
    @ResponseBody
    public Map<String,Object> saveContyentFragment(HttpServletRequest request, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        String params = request.getParameter("params");
        ContentFragment contentFragment = null;
        try{
            contentFragment  = parseObject(params, ContentFragment.class);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try {
            contentFragment = contentFragmentService.saveContentFragment(contentFragment);
            setSessionAttribute(request,contentFragment);
        } catch (Exception e) {
            e.printStackTrace();
            return putDataToMap(e);
        }

        return putDataToMap(contentFragment);
    }

    @RequestMapping("deleteContentFragment")
    @ResponseBody
    public  Map<String,Object> deleteContentFragment(HttpServletRequest request, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        String params = request.getParameter("params");
        ContentFragment contentFragment = null;
        try{
            contentFragment  = parseObject(params, ContentFragment.class);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            contentFragment = contentFragmentService.deleteContentFragment(contentFragment);
            removeSessionAttribute(request,contentFragment);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(contentFragment);
    }

    private void setSessionAttribute(HttpServletRequest request,ContentFragment contentFragment)throws Exception{
        if(contentFragment !=null && contentFragment.getTargetType() == 0){
            IchProject ichProject = (IchProject) request.getSession().getAttribute(Constants.CURRENT_PROJECT);
            if(ichProject != null){
                List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
                contentFragmentList.add(contentFragment);
                request.getSession().setAttribute(Constants.CURRENT_PROJECT,ichProject);
            }
        }
        if(contentFragment !=null && contentFragment.getTargetType() == 1){
            IchMaster ichMaster = (IchMaster) request.getSession().getAttribute(Constants.CURRENT_MASTER);
            if(ichMaster != null){
                List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
                contentFragmentList.add(contentFragment);
                request.getSession().setAttribute(Constants.CURRENT_MASTER,ichMaster);
            }
        }
        if(contentFragment !=null && contentFragment.getTargetType() == 3){
            Organization organization = (Organization) request.getSession().getAttribute(Constants.CURRENT_ORG);
            if(organization != null){
                List<ContentFragment> contentFragmentList = organization.getContentFragmentList();
                contentFragmentList.add(contentFragment);
                request.getSession().setAttribute(Constants.CURRENT_ORG,organization);
            }
        }
    }
    private void removeSessionAttribute(HttpServletRequest request,ContentFragment contentFragment)throws Exception{
        if(contentFragment !=null && contentFragment.getTargetType() == 0){
            IchProject ichProject = (IchProject) request.getSession().getAttribute(Constants.CURRENT_PROJECT);
            List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
            for (ContentFragment content : contentFragmentList) {
                if(content.getId().equals(contentFragment.getId())){
                    contentFragmentList.remove(content);
                    break;
                }
            }
            request.getSession().setAttribute(Constants.CURRENT_PROJECT,ichProject);
        }
        if(contentFragment !=null && contentFragment.getTargetType() == 1){
            IchMaster ichMaster = (IchMaster) request.getSession().getAttribute(Constants.CURRENT_MASTER);
            List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
            for (ContentFragment content : contentFragmentList) {
                if(content.getId().equals(contentFragment.getId())){
                    contentFragmentList.remove(content);
                    break;
                }
            }
            request.getSession().setAttribute(Constants.CURRENT_MASTER,ichMaster);
        }
        if(contentFragment !=null && contentFragment.getTargetType() == 3){
            Organization organization = (Organization) request.getSession().getAttribute(Constants.CURRENT_ORG);
            List<ContentFragment> contentFragmentList = organization.getContentFragmentList();
            for (ContentFragment content : contentFragmentList) {
                if(content.getId().equals(contentFragment.getId())){
                    contentFragmentList.remove(content);
                    break;
                }
            }
            request.getSession().setAttribute(Constants.CURRENT_ORG,organization);
        }
    }
}
