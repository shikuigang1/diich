package com.diich.web.controller;

import com.alibaba.fastjson.JSON;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchProject;
import com.diich.core.model.User;
import com.diich.core.service.IchProjectService;
import com.diich.core.util.WebUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
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
    public Map<String, Object> getIchProject(HttpServletRequest request) {
        String ichItemId = request.getParameter("params");

        Map<String, Object> result = ichProjectService.getIchProject(ichItemId);

        return result;
    }

    @RequestMapping("getIchProjectList")
    @ResponseBody
    public Map<String, Object> getIchProjectList(HttpServletRequest request) {
        String params = request.getParameter("params");

        Map<String, Object> result = ichProjectService.getIchProjectList(params);

        return result;
    }

    @RequestMapping("saveIchProject")
    @ResponseBody
    public Map<String, Object> saveIchProject(HttpServletRequest request) {
        String jsonStr = request.getParameter("jsonStr");
        IchProject ichProject = null;

        try {
            ichProject = parseObject(jsonStr, IchProject.class);
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
            ichProjectService.saveIchProject(ichProject);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return setResultMap(ichProject);
    }
}
