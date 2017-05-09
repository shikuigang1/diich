package com.diich.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/5/9.
 */
@Controller
@RequestMapping("ichMaster")
public class ICHMasterController {

    @RequestMapping("selectICHMaster")
    @ResponseBody
    @ExceptionHandler
    public void selectICHMaster(HttpServletRequest request) {
        String ichMasterId = request.getParameter("ichMasterId");


    }

    @RequestMapping("selectICHMasterList")
    public void selectICHMasterList(HttpServletRequest request) {
        String ichItemId = request.getParameter("ichItemId");

    }
}
