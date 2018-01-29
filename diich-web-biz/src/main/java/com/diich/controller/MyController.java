package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.exception.BusinessException;
import com.diich.core.model.*;
import com.diich.core.model.Dictionary;
import com.diich.core.service.*;
import com.diich.core.util.PropertiesUtil;
import com.diich.core.util.QRCodeGenerator;
import com.diich.core.util.SimpleUpload;
import com.diich.core.util.WxUtil;
import com.diich.mapper.ContentFragmentMapper;
import com.diich.mapper.IchProjectMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import freemarker.template.Configuration;
import freemarker.template.Template;
import net.sf.json.JSONArray;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.diich.core.util.WxUtil.WxParams.token;

/**
 * Created by Administrator on 2017/5/26.
 */
@Controller
@RequestMapping("myController")
public class MyController extends BaseController{
    @Autowired
    private IchProjectService ichProjectService;
    @Autowired
    private IchProjectMapper ichProjectMapper;
    @Autowired
    private IchCategoryService ichCategoryService;

    @Autowired
    private IchMasterService ichMasterService;

    @Autowired
    private DictionaryService dictionaryService;

    @RequestMapping("getIchMaster")
    @ResponseBody
    public Map<String, Object> getIchMaster(HttpServletRequest request) throws Exception {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        IchMaster ichMaster = null;
        try{
            ichMaster = ichMasterService.getIchMaster(id);
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        String outPutPath = PropertiesUtil.getString("freemarker.masterfilepath")+"/"+ichMaster.getId().toString()+".html";
        String s = ichMasterService.buildHTML("2.0master.ftl", ichMaster, outPutPath);
//        String bucketName = PropertiesUtil.getString("img_bucketName");
//        String type = PropertiesUtil.getString("pc_mhtml_server");
//        File file = new File(outPutPath);
//        SimpleUpload.uploadFile(new FileInputStream(file),bucketName,type+"/"+ichMaster.getId()+".html",file.length());
        return putDataToMap(ichMaster);
    }


    @RequestMapping("getIchProject")
    @ResponseBody
    public Map<String, Object> getIchProject(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        IchProject ichProject = null;
        try{
            ichProject = ichProjectService.getIchProject(id);
            String outPutPath = PropertiesUtil.getString("freemarker.projectfilepath")+"/"+ichProject.getId().toString()+".html";
            ichProjectService.buildHTML("2.0pro.ftl", ichProject, outPutPath);
//            String bucketName = PropertiesUtil.getString("img_bucketName");
//            File file = new File(outPutPath);
//            SimpleUpload.uploadFile(new FileInputStream(file),bucketName,"p/"+ichProject.getId()+".html",file.length());
//            String h5outPutPath = PropertiesUtil.getString("freemarker.h5_projectfilepath")+"/"+ichProject.getId().toString()+".html";
//            String h5 = ichProjectService.buildHTML("h5_pro.ftl", ichProject, h5outPutPath);
//            String h5type = PropertiesUtil.getString("m_phtml_server");
//            File h5file = new File(h5outPutPath);
//            SimpleUpload.uploadFile(new FileInputStream(h5file),bucketName,h5type+"/"+ichProject.getId()+".html",h5file.length());//上传到阿里云

        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichProject);
    }

    @RequestMapping("test4")
    @ResponseBody
    public Map<String, Object> test4(HttpServletRequest request) {
        IchCategory category = null;
        String id = request.getParameter("params");
        try {
            category = ichCategoryService.getCategoryById(Long.parseLong(id));
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException)e;
            return ae.toMap();
        }

        return putDataToMap(category);
    }
    @RequestMapping("getIchProjectList")
    @ResponseBody
    public Map<String, Object> getIchProjectList(HttpServletRequest request) {
        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }

        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        params.put("current",1);
        params.put("pageSize",50000);
        Page<IchProject> page = null;
        try {
            page = ichProjectService.getIchProjectPage(params);
            List<IchProject> ichProjectList = page.getRecords();
            for (IchProject ichProject :ichProjectList) {
                String bucketName = PropertiesUtil.getString("img_bucketName");
                String outPutPath = PropertiesUtil.getString("freemarker.projectfilepath")+"/"+ichProject.getId()+".html";
                String s = ichProjectService.buildHTML("2.0pro.ftl", ichProject, outPutPath);
                String type = PropertiesUtil.getString("pc_phtml_server");
                File file = new File(outPutPath);
                SimpleUpload.uploadFile(new FileInputStream(file),bucketName,type+"/"+ichProject.getId()+".html",file.length());//上传到阿里云
                //h5
                String h5outPutPath = PropertiesUtil.getString("freemarker.h5_projectfilepath")+"/"+ichProject.getId()+".html";
                String h5 = ichProjectService.buildHTML("h5_pro.ftl", ichProject, h5outPutPath);
                String h5type = PropertiesUtil.getString("m_phtml_server");
                File h5file = new File(h5outPutPath);
                SimpleUpload.uploadFile(new FileInputStream(h5file),bucketName,h5type+"/"+ichProject.getId()+".html",h5file.length());//上传到阿里云

            }
        } catch (Exception e) {
            e.printStackTrace();
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return putDataToMap(null);
    }
    @RequestMapping("getIchMasterList")
    @ResponseBody
    public Map<String, Object> getIchMasterList(HttpServletRequest request) {

        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        params.put("current",1);
        params.put("pageSize",4000);
        Page<IchMaster> page = null;
        try {
            page = ichMasterService.getIchMasterPage(params);
            List<IchMaster> ichMasterList = page.getRecords();
            for (IchMaster ichMaster:ichMasterList) {
                String bucketName = PropertiesUtil.getString("img_bucketName");
                String outPutPath = PropertiesUtil.getString("freemarker.masterfilepath")+"/"+ichMaster.getId().toString()+".html";
                ichMasterService.buildHTML("2.0master.ftl",ichMaster,outPutPath);
                String type = PropertiesUtil.getString("pc_mhtml_server");
                File file = new File(outPutPath);
                SimpleUpload.uploadFile(new FileInputStream(file),bucketName,type+"/"+ichMaster.getId()+".html",file.length());//上传到阿里云
                String h5outPutPath = PropertiesUtil.getString("freemarker.h5_masterfilepath")+"/"+ichMaster.getId().toString()+".html";
                ichMasterService.buildHTML("h5_master.ftl",ichMaster,h5outPutPath);
                String h5type = PropertiesUtil.getString("m_mhtml_server");
                File h5file = new File(h5outPutPath);
                SimpleUpload.uploadFile(new FileInputStream(h5file),bucketName,h5type+"/"+ichMaster.getId()+".html",h5file.length());//上传到阿里云
            }
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return putDataToMap(null);
    }

    @Autowired
    private UserService userService;

    @RequestMapping("getVerifycode")
    @ResponseBody
    public Map<String, Object> getVerifyCode(HttpServletRequest request) throws Exception {
        Map<String, Object> result=new HashMap<>();
        String phone = request.getParameter("phone");
        if(phone==null){
            result.put("msg","请输入手机号");
            return result;
        }
        HttpSession session = request.getSession();
        //验证码是否存在和是否超时
        String begindate = (String) session.getAttribute("begindate"+phone);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(begindate !=null){
            Date bdate = df.parse(begindate);
            long time = (new Date().getTime() - bdate.getTime())/1000;
            if(time>60){//验证码有效期1分钟
                session.removeAttribute(phone);
                session.removeAttribute("begindate"+phone);
            }
        }
        String  code = (String) session.getAttribute(phone);
        if(code !=null){
            result.put("msg","验证码已发送,不能重复发送,请稍后再试");
            return result;
        }
        String verifyCode = null;
        try{
            //验证码不存在或者已经超时 重新获取
            verifyCode = userService.getVerifyCode(phone);
            //返回成功 将验证码和当前时间存入session
            session.setAttribute(phone,verifyCode);
            session.setAttribute("begindate"+phone,df.format(new Date()));
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        return putDataToMap(phone);
    }
    @RequestMapping("register")
    @ResponseBody
    public Map<String, Object>  register(HttpServletRequest request,HttpServletResponse response) throws Exception {
        Map<String, Object> result = new HashMap<>();
        String params = request.getParameter("params");
        Map map = JSON.parseObject(params, Map.class);
        String code = (String) map.get("code");
        String phone = (String) map.get("phone");
        User user = (User) parseObject(params, User.class);
        if(phone==null){
            result.put("msg","请输入手机号");
            return result;
        }
        HttpSession session = request.getSession();
        //判断验证码是否超时
        String begindate = (String) session.getAttribute("begindate"+phone);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(begindate !=null){
            Date bdate = df.parse(begindate);
            long time = (new Date().getTime() - bdate.getTime())/1000;
            if(time>60){
                session.removeAttribute(phone);
                session.removeAttribute("begindate"+phone);
                result.put("msg","验证码已经超时,请重新获取");
                return result;
            }
        }
        String verifyCode = (String) session.getAttribute(phone);
        //防止没有获取验证码直接点击注册
        if(verifyCode == null){
            result.put("code",ApplicationException.PARAM_ERROR);
            result.put("msg","你还没有获取验证码或者验证码超时,请获取验证码");
            return result;
        }
        if(!verifyCode.equals(code)){
            result.put("code",ApplicationException.PARAM_ERROR);
            result.put("msg","验证码不正确");
            return result;
        }
        userService.saveUser(user);
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(result);
    }
    @RequestMapping("checkUser")
    @ResponseBody
    public Map<String, Object> checkUser(HttpServletRequest request) {
        String loginName = request.getParameter("loginName");
        try {
            userService.checkUser(loginName);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return putDataToMap(loginName);
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
    @Autowired
    private WorksService worksService;
    @RequestMapping("getWorks")
    @ResponseBody
    public Map<String, Object> getWorks(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        Works works = null;
        try{
            works = worksService.getWorks(id);
            String outPutPath = PropertiesUtil.getString("freemarker.worksfilepath")+"/"+works.getId().toString();
            String uri = worksService.buildHTML("works.ftl", works, outPutPath);
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(works);

    }

    @RequestMapping("testWx")
    @ResponseBody
    public Map<String, Object> testWx(HttpServletRequest request,HttpServletResponse response)throws Exception {
        String url =request.getParameter("url");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("text/html;charset=UTF-8");
        Map<String, String> sign = WxUtil.getSign(url);
        ///System.out.println(sign);
        return putDataToMap(sign);
    }
    @RequestMapping("testWxToken")
    public Map<String, Object> testWxToken(HttpServletRequest request,HttpServletResponse response) throws Exception{
        String signature = request.getParameter("signature");
        String timestamp = request.getParameter("timestamp");
        String nonce = request.getParameter("nonce");
        String echostr = request.getParameter("echostr");
        System.out.println("signature:" + signature);
        System.out.println("timestamp:" + timestamp);
        System.out.println("nonce:" + nonce);
        System.out.println("echostr:" + echostr);
        PrintWriter pw = response.getWriter();
        pw.write(echostr);
        pw.flush();

        return null;
    }

    @Autowired
    private ContentFragmentService contentFragmentService;
    @RequestMapping("delete")
    @ResponseBody
    public Map<String, Object> delete(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        try {
            IchProject ichProject = ichProjectService.getIchProjectById(Long.parseLong(id));
            List<ContentFragment> ichProjectContentFragmentList = ichProject.getContentFragmentList();
            for (ContentFragment contentFragment: ichProjectContentFragmentList) {
                contentFragmentService.deleteContentFragment(contentFragment);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(id);

    }
    @RequestMapping("deletemaster")
    @ResponseBody
    public Map<String, Object> deleteMaster(HttpServletRequest request,HttpServletResponse response){
        String id = request.getParameter("params");
        if(id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        try {
            IchMaster ichMaster = ichMasterService.getIchMasterById(Long.parseLong(id));
            List<ContentFragment> ichProjectContentFragmentList = ichMaster.getContentFragmentList();

            for (ContentFragment contentFragment: ichProjectContentFragmentList) {
                contentFragmentService.deleteContentFragment(contentFragment);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(id);

    }


    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter jackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();

        ObjectMapper objectMapper = new ObjectMapper();
        /**
         * 序列换成json时,将所有的long变成string
         * 因为js中得数字类型不能包含所有的java long值
         */
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        objectMapper.registerModule(simpleModule);

        jackson2HttpMessageConverter.setObjectMapper(objectMapper);
        converters.add(jackson2HttpMessageConverter);
    }

    @RequestMapping("getIchProjects")
    @ResponseBody
    public Map<String, Object> getIchProjects(HttpServletRequest request) {
        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }

        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        params.put("current",1);
        params.put("pageSize",5000);
        Page<IchProject> page = null;
        try {
            page = ichProjectService.getIchProjectPage(params);
            List<IchProject> ichProjectList = page.getRecords();
            for (IchProject ichProject : ichProjectList) {
                if(ichProject.getIchCategoryId() != null){
                    IchCategory category = ichCategoryService.getCategoryById(ichProject.getIchCategoryId());
                    String catName = category.getName();
                    if(category.getChildren() != null && category.getChildren().size()>0){
                        catName += "-"+category.getChildren().get(0).getName();
                        if(category.getChildren().get(0).getChildren() != null && category.getChildren().get(0).getChildren().size()>0){
                            catName += "-"+category.getChildren().get(0).getChildren().get(0).getName();
                        }
                    }
                    category.setName(catName);
                    ichProject.setIchCategory(category);
                }
                for (ContentFragment contentFragment: ichProject.getContentFragmentList()) {
                    if(contentFragment.getAttributeId() != 33){
                        continue;
                    }
                    if(contentFragment.getContent() != null){
                        String content = contentFragment.getContent();
                        String[] strs = content.split(",");
                        String strName = "";
                        List list = new ArrayList();
                        for (String strcode : strs) {
                            Map map = new HashMap();
                            String name = dictionaryService.getTextByTypeAndCode(101, strcode, ichProject.getLang());
                            if(StringUtils.isNotBlank(name)){
                                map.put("name",name);
                                list.add(map);
                            }else{
                                map.put("name",strcode);
                                list.add(map);
                            }
                        }
                        String jsonArray = JSONArray.fromObject(list).toString();
                        contentFragment.setContent(jsonArray);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return putDataToMap(page.getRecords());
    }
    @Autowired
    private ContentFragmentMapper contentFragmentMapper;
    @RequestMapping("getIchMasters")
    @ResponseBody
    public Map<String, Object> getIchMasters(HttpServletRequest request) {

        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try{
            if(param !=null){
                params = JSON.parseObject(param, Map.class);
            }
        }catch (Exception e){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        params.put("current",1);
        params.put("pageSize",3000);
        Page<IchMaster> page = null;
        try {
            page = ichMasterService.getIchMasterPage(params);
            List<IchMaster> ichMasterList = page.getRecords();
            List arrayList = new ArrayList();
            arrayList.add(17L);
            arrayList.add(23L);
            arrayList.add(49L);
            arrayList.add(55L);
            arrayList.add(57L);
            arrayList.add(127L);
            for (IchMaster ichMaster:ichMasterList) {
                ichMaster.setUri("");
                for (ContentFragment contentFragment: ichMaster.getContentFragmentList()) {
                    if(!arrayList.contains(contentFragment.getAttributeId())){
                        continue;
                    }
                    if(StringUtils.isNotEmpty(contentFragment.getContent())){
                        String content = contentFragment.getContent();
                        List list = new ArrayList();
                        Map map = new HashMap();
                        String name = dictionaryService.getTextByTypeAndCode(contentFragment.getAttribute().getDataType(), content, ichMaster.getLang());
                        if(StringUtils.isEmpty(name)){
                            name = content;
                        }
                        if(StringUtils.isNotEmpty(name)){
                            contentFragment.setContent(name);
                        }
                    }
                }
                Long ichProjectId = ichMaster.getIchProjectId();
                if(ichProjectId == null){
                    continue;
                }
                //根据id查询项目名称
                ContentFragment contentFragment = new ContentFragment();
                contentFragment.setAttributeId(4L);
                contentFragment.setTargetId(ichProjectId);
                contentFragment.setTargetType(0);
                ContentFragment contentFragment1 = contentFragmentMapper.selectByAttrIdAndTargetId(contentFragment);
                if(contentFragment1 != null){
                    ichMaster.setUri(contentFragment1.getContent());//将项目名称放在uri中
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return putDataToMap(page.getRecords());
    }
}
