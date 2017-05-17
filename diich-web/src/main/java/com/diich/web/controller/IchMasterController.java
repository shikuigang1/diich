package com.diich.web.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.model.IchMaster;
import com.diich.core.support.HttpCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/9.
 */
@Controller
@RequestMapping("ichMaster")
public class IchMasterController extends BaseController<IchMaster>{

    @RequestMapping("getIchMaster")
    @ResponseBody
    public Map<String, Object> getIchMaster(HttpServletRequest request) {
        String ichMasterId = request.getParameter("id");

        Map<String, Object> result = null;

        return result;
    }

    @RequestMapping("getIchMasterList")
    @ResponseBody
    public Map<String, Object> getIchMasterList(HttpServletRequest request) {
        String params = request.getParameter("params");

        Map<String, Object> result = null;

        return result;
    }

    @RequestMapping("saveIchMaster")
    @ResponseBody
    public Map<String, Object> saveIchMaster(HttpServletRequest request) {
        String ichMaster = request.getParameter("params");

        Map<String, Object> result = null;

        return result;
    }
}
