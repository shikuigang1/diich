package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.model.OperationConfig;
import com.diich.core.model.SysSlideshowConfig;
import com.diich.core.service.OperationConfigService;
import com.diich.core.service.SlideshowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/2 0002.
 */
@Controller
@RequestMapping("/")
public class HomeController extends BaseController {
    @Autowired
    private SlideshowService slideshowService;
    @Autowired
    private OperationConfigService operationConfigService;

    @RequestMapping("/")
    public String home() {
        return "index";
    }

    /**
     * 查询全部轮播图
     *
     * @param request
     * @param response
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> list(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List<SysSlideshowConfig> slideShowList = null;
        try {
            slideShowList = slideshowService.getSlideshowList();
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(slideShowList);
    }

    /**
     * 首页运营位配置列表信息
     * @param title
     * @param moduleName
     * @param columnName
     * @param request
     * @param response
     */
    @RequestMapping(value = "/getOperList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> list(String title, String moduleName, String columnName, HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List<OperationConfig> list = null;
        try {
            list = operationConfigService.getList(title, moduleName, columnName);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(list);
    }
}

