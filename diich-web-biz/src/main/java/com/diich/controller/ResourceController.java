package com.diich.controller;

import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Resource;
import com.diich.core.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Map;

/**
 * Created by Administrator on 2017/7/28.
 */
@Controller
@RequestMapping("resource")
public class ResourceController extends BaseController<Resource>{

    @Autowired
    private ResourceService resourceService;

    @RequestMapping("deleteResource")
    @ResponseBody
    public Map<String,Object> deleteResource(HttpServletRequest request, HttpServletResponse response){
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }

        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            String[] ids = id.split(",");
            for (String cid : ids) {
                resourceService.deleteResource(Long.parseLong(cid));
            }
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }
    @RequestMapping("saveResource")
    @ResponseBody
    public Map<String,Object> saveResource(HttpServletRequest request, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "*");
        String params = request.getParameter("params");
        Resource resource = null;
        try{
            resource  = parseObject(params, Resource.class);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try {
           resourceService.save(resource);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        return putDataToMap(resource);
    }

    @RequestMapping("getResourceUri")
    public void getResourceUri(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String fileName = request.getParameter("fileName");

        fileName = URLEncoder.encode(fileName, "UTF-8");

        String uri = "http://diich-resource.oss-cn-beijing.aliyuncs.com/video/" + fileName;

        URL url = new URL(uri);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        BufferedInputStream input = new BufferedInputStream(conn.getInputStream());
        ServletOutputStream responOutPut=response.getOutputStream();
        byte[] buffer = new byte[1024*100];
        int i = 0;
        while ((i = input.read(buffer)) > 0) {
            responOutPut.write(buffer, 0, i);
            responOutPut.flush();
        }
        input.close();
        responOutPut.close();
    }
}
