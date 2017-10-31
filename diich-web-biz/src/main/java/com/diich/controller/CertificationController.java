package com.diich.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.service.CertificationService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by wangwenjian on 2017/10/31.
 */
@Controller
@RequestMapping("certification")
public class CertificationController extends BaseController{

    @Autowired
    private CertificationService certificationService;

    @RequestMapping("getCertifications")
    @ResponseBody
    public Map<String, Object> getCertifications(HttpServletRequest request, HttpServletResponse response){

        String num = request.getParameter("pageNum");
        String size = request.getParameter("pageSize");
        List<Map> certificationlist = null;
        Integer pageNum = 1;
        if(StringUtils.isEmpty(size)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        if(StringUtils.isNotEmpty(num)){
            pageNum = Integer.parseInt(num);
        }
        Integer pageSize = Integer.parseInt(size);
        try{
            certificationlist = certificationService.getCertifications(pageNum,pageSize);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(certificationlist);
    }
}
