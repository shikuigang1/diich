package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.Constants;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchProject;
import com.diich.core.model.User;
import com.diich.core.service.IchProjectService;
import com.diich.core.support.cache.JedisHelper;
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
import javax.servlet.http.HttpSession;
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

    @Autowired
    private JedisHelper jedisHelper;
    /**
     * 获取项目详情的接口  查询的信息有传承人和作品的信息
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("getIchProject")
    @ResponseBody
    public Map<String, Object> getIchProject(HttpServletRequest request,HttpServletResponse response) {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        IchProject ichProject = null;
        try{
            ichProject = ichProjectService.getIchProject(id);
        }catch (Exception e){
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichProject);
    }

    /**
     * 获取的只有项目的信息  对status不做限制
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("getIchProjectById")
    @ResponseBody
    public Map<String, Object> getIchProjectById(HttpServletRequest request,HttpServletResponse response) {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        IchProject ichProject = null;
        try{
            ichProject = ichProjectService.getIchProjectByIdAndIUser(Long.parseLong(id),user);
        }catch (Exception e){
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichProject);
    }

    @RequestMapping("getIchProjectList")
    @ResponseBody
    public Map<String, Object> getIchProjectList(HttpServletRequest request,HttpServletResponse response) {
        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        Page<IchProject> page = null;
        try {
            page = ichProjectService.getIchProjectPage(params);
        } catch (Exception e) {
            return putDataToMap(e);
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
            return putDataToMap(ae);
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }

        ichProject.setLastEditorId(user.getId());

        try {
            ichProject = ichProjectService.saveIchProject(ichProject,user);
            HttpSession session = request.getSession();
            session.setAttribute(Constants.CURRENT_PROJECT,ichProject);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichProject);
    }

    @RequestMapping("ichProjectInfo")
    @ResponseBody
    public  Map<String, Object> organizationInfo(HttpServletRequest request,HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(request.getSession().getAttribute(Constants.CURRENT_PROJECT));
    }

    @RequestMapping("getProByName")
    @ResponseBody
    public Map<String, Object> getProByName(HttpServletRequest request,HttpServletResponse response) {

/*
        Map<String,Object> map = new HashMap<String,Object>();

        map.put("keyword",request.getParameter("keyword"));
        map.put("type",request.getParameter("type"));
        map.put("pageBegin",0);
        String  size = request.getParameter("pageSize");
        if(size == null){
            map.put("pageSize",5);
        }else{
            map.put("pageSize",size);
        }

        List<Map> ls=null;

        try {
            ls =ichProjectService.getIchProjectByName(map);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        response.setHeader("Access-Control-Allow-Origin", "*");

        return putDataToMap(ls);*/

        Map<String,Object> map = new HashMap<String,Object>();
        map.put("keyword",request.getParameter("keyword"));
        map.put("type",0);
        map.put("pageBegin",0);
        String  size = request.getParameter("pageSize");
        if(size == null){
            map.put("pageSize",5);
        }else{
            map.put("pageSize",size);
        }
        List ls = null;
        try {
            ls=ichProjectService.getIchProjectByName(map);
           if(ls==null || ls.size()==0){
               map.put("type",1);
               ls =ichProjectService.getIchProjectByName(map);

           }else{
               map.put("type",0);
           }
            map.put("data",ls);

        } catch (Exception e) {
            return putDataToMap(e);
        }

        response.setHeader("Access-Control-Allow-Origin", "*");

        return putDataToMap(map);
    }

    /**
     * 预览
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("preview")
    @ResponseBody
    public Map<String, Object> preview(HttpServletRequest request, HttpServletResponse response) throws Exception{

       // System.out.println("----------------------------:"+request.getServletContext().getRealPath("/"));
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        String uri = null;
        try{
            uri = ichProjectService.preview(Long.parseLong(id));
        }catch (Exception e){
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(uri);
    }

    /**
     *个人中心
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("getIchProjectByUserId")
    @ResponseBody
    public Map<String, Object> getIchProjectByUserId(HttpServletRequest request, HttpServletResponse response) throws Exception {
        response.setHeader("Access-Control-Allow-Origin", "*");
        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        params.put("userId",user.getId());
        Page<IchProject> page = null;
        try{
            page = ichProjectService.getIchProjectByUserId(params);
        }catch (Exception e){
            return putDataToMap(e);
        }

        return putDataToMap(page);
    }

    @RequestMapping("audit")
    @ResponseBody
    public Map<String, Object> audit(HttpServletRequest request, HttpServletResponse response) throws Exception{
        String id = request.getParameter("params");
        if(id == null){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        try{
            ichProjectService.audit(Long.parseLong(id),user);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }

    /**
     * 假删
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("delete")
    @ResponseBody
    public Map<String, Object> delete(HttpServletRequest request, HttpServletResponse response) throws Exception{
        String id = request.getParameter("params");
        if(id == null){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try{
            int delete = ichProjectService.deleteIchProject(Long.parseLong(id));
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }

    @RequestMapping("/getImage")
    public void exportQRCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String id=request.getParameter("id");
        String url = "http://project.efeiyi.com/p/"+ id +".html";
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
