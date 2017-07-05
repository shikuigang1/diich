package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchProject;
import com.diich.core.model.User;
import com.diich.core.service.IchProjectService;
import com.diich.core.util.QRCodeGenerator;
import com.diich.core.util.WebUtil;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.HashMap;
import java.util.List;
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
    public Map<String, Object> getIchProject(HttpServletRequest request,HttpServletResponse response) {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        IchProject ichProject = null;
        try{
            ichProject = ichProjectService.getIchProject(id);
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichProject);
    }

    @RequestMapping("getIchProjectList")
    @ResponseBody
    public Map<String, Object> getIchProjectList(HttpServletRequest request,HttpServletResponse response) {
        Map<String, Object> params = new HashMap<>();;
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        Page<IchProject> page = null;
        try {
            page = ichProjectService.getIchProjectPage(params);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(page);
    }

    @RequestMapping("saveIchProject")
    @ResponseBody
    public Map<String, Object> saveIchProject(HttpServletRequest request,HttpServletResponse response) {
        response.setContentType("text/html;charset=UTF-8");
        String params = request.getParameter("params");
        IchProject ichProject = null;
        try {
            ichProject = parseObject(params, IchProject.class);
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
            ichProject = ichProjectService.saveIchProject(ichProject);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichProject);
    }

    @RequestMapping("getProByName")
    @ResponseBody
    public Map<String, Object> getProByName(HttpServletRequest request,HttpServletResponse response) {


        Map<String,Object> map = new HashMap<String,Object>();


        map.put("keyword",request.getParameter("keyword"));
        map.put("type",request.getParameter("type"));
        map.put("pageBegin",0);
        map.put("pageSize",5);

        List<Map> ls=null;

        try {
            ls =ichProjectService.getIchProjectByName(map);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ls);
    }
    @RequestMapping("/getImage")
    public void exportQRCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String id=request.getParameter("id");
        String url = "http://resource.efeiyi.com/html/project/"+ id +".html";
        QRCodeGenerator qrCode = new QRCodeGenerator(url);
        qrCode.createQRCode(108, 108);
        BufferedImage bufferedImage = qrCode.getImageResult();
        ServletOutputStream stream = response.getOutputStream();
        byte[] buffer = getBuffer(bufferedImage);
        stream.write(buffer);
    }

    public byte[] getBuffer(BufferedImage image){
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(bos);
        try {
            encoder.encode(image);
        } catch(Exception e) {
            return new byte[]{};
        }
        byte[] imageBts = bos.toByteArray();
        return imageBts;
    }

}
