package com.diich.web.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.model.ICHMaster;
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
public class ICHMasterController extends BaseController<ICHMaster>{

    @RequestMapping("getICHMaster")
    @ResponseBody
    public Map<String, Object> getICHMaster(HttpServletRequest request) {
        String ichMasterId = request.getParameter("params");

        Map<String, Object> result = null;

        return result;
    }

    @RequestMapping("getICHMasterList")
    @ResponseBody
    public Map<String, Object> getICHMasterList(HttpServletRequest request) {
        String params = request.getParameter("params");

        Map<String, Object> result = null;

        return result;
    }

    @RequestMapping("saveICHMaster")
    @ResponseBody
    public Map<String, Object> saveICHMaster(HttpServletRequest request) {
        String ichMaster = request.getParameter("params");

        Map<String, Object> result = null;

        return result;
    }
}
