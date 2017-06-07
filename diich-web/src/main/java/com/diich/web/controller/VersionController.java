package com.diich.web.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Version;
import com.diich.core.service.VersionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/6.
 */
@Controller
@RequestMapping("version")
public class VersionController extends BaseController<Version>{

    @Autowired
    private VersionService versionService;

    @RequestMapping("getVersion")
    @ResponseBody
    public Map<String, Object> getVersionByLangIdAndTargetType(HttpServletRequest request, HttpServletResponse response){
        Long chiId = null;
        Long engId = null;
        Integer targetType = null;
        try{
            if(null != request.getParameter("chiId")){
                chiId = Long.parseLong(request.getParameter("chiId"));
            }
            if(null != request.getParameter("engId")){
                engId = Long.parseLong(request.getParameter("engId"));
            }
            if(null != request.getParameter("targetType")){
                targetType = Integer.parseInt(request.getParameter("targetType"));
            }
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }

        if(chiId == null && engId == null){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        Version version = null;
        try {
           version = versionService.getVersionByLangIdAndTargetType(chiId, engId, targetType);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(version);
    }
}
