package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.Constants;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Organization;
import com.diich.core.model.User;
import com.diich.core.service.OrganizationService;
import com.diich.core.util.QRCodeGenerator;
import com.diich.core.util.WebUtil;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/8/21.
 *
 */
@Controller
@RequestMapping("organization")
public class OrganizationController extends BaseController<Organization>{

    @Autowired
    private OrganizationService organizationService;

    @RequestMapping("getOrganization")
    @ResponseBody
    public Map<String, Object> getOrganization(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        Organization organization = null;
        try{
            organization = organizationService.getOrganization(Long.parseLong(id));
        }catch (Exception e){
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(organization);
    }

    /**
     * 获取的只有项目的信息  对status不做限制
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("getOrganizationById")
    @ResponseBody
    public Map<String, Object> getOrganizationById(HttpServletRequest request,HttpServletResponse response) {
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        Organization organization = null;
        try{
            organization = organizationService.getOrganizationByIdAndIUser(Long.parseLong(id),user);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(organization);
    }

    @RequestMapping("saveOrganization")
    @ResponseBody
    public Map<String, Object> saveOrganization (HttpServletRequest request, HttpServletResponse response){
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String params = request.getParameter("params");
        Organization organization = null;

        try {
            organization = parseObject(params, Organization.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try {
            organization = organizationService.saveOrganization(organization, user);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(organization);
    }

    @RequestMapping("submitOrganization")
    @ResponseBody
    public Map<String, Object> submitOrganization (HttpServletRequest request, HttpServletResponse response){
        try{
            setHeader(request,response);
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String params = request.getParameter("params");
        Organization organization = null;

        try {
            organization = parseObject(params, Organization.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try {
            organization.setStatus(3);
            organization = organizationService.saveOrganization(organization, user);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(organization);
    }
    /**
     * 预览
     * @param request
     * @param response
     * @return
     *
     */
    @RequestMapping("preview")
    @ResponseBody
    public Map<String, Object> preview(HttpServletRequest request, HttpServletResponse response) {

        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        String uri = null;
        try{
            uri = organizationService.preview(Long.parseLong(id));
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
    @RequestMapping("getOrganizationByUserId")
    @ResponseBody
    public Map<String, Object> getOrganizationByUserId(HttpServletRequest request, HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        User user = (User)WebUtil.getCurrentUser(request);
        if(user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
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
        params.put("userId",user.getId());
        Page<Organization> page = null;
        try{
            page = organizationService.getOrganizationByUserId(params);
        }catch (Exception e){
            return putDataToMap(e);
        }

        return putDataToMap(page);
    }
    @RequestMapping("/getImage")
    public void exportQRCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String uri=request.getParameter("id");
        String url = "http://organization.diich.com/o/"+ uri;
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
