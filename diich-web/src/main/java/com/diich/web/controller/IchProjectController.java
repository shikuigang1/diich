package com.diich.web.controller;

import com.diich.core.base.BaseController;
import com.diich.core.model.IchProject;
import com.diich.core.service.IchProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
        String ichItem = request.getParameter("params");

        Map<String, Object> result = ichProjectService.saveIchProject(ichItem);

        return result;
    }
}
