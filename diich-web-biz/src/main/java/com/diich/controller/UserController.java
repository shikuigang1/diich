package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.User;
import com.diich.core.service.UserService;
import com.diich.core.support.cache.JedisHelper;
import com.diich.core.util.SimpleUpload;
import com.diich.core.util.OperateFileUtil;
import com.diich.core.util.PropertiesUtil;
import com.diich.core.util.WebUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2017/5/11.
 */
@Controller
@RequestMapping("user")
public class UserController extends BaseController<User> {

    @Autowired
    private UserService userService;

    @Autowired
    private JedisHelper jedisHelper;

    /**
     * 获取验证码
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("getVerifycode")
    @ResponseBody
    public Map<String, Object> getVerifyCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
        response.setContentType("text/html;charset=UTF-8");
        Map<String, Object> result=new HashMap<>();
        String phone = request.getParameter("phone");
        String type = request.getParameter("type");
        if(StringUtils.isEmpty(phone)){
            ApplicationException ae = new ApplicationException(ApplicationException.NO_PHONE);
            return putDataToMap(ae);
        }
        if("0".equals(type)){//0 注册时获取验证码  1忘记密码获取验证码
            //检查手机号是否被占用
            List<User> userList = userService.checkUserByPhone(phone);
            if(userList.size()>0){
                ApplicationException ae = new ApplicationException(ApplicationException.PHONE_USED);
                return putDataToMap(ae);
            }
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
            ApplicationException ae = new ApplicationException(ApplicationException.CODE_AGAIN);
            return putDataToMap(ae);
        }
        String verifyCode = null;
        try{
            //验证码不存在或者已经超时 重新获取
            verifyCode = userService.getVerifyCode(phone);
            //返回成功 将验证码和当前时间存入session
            session.setAttribute(phone,verifyCode);
            session.setAttribute("begindate"+phone,df.format(new Date()));
        }catch (Exception e){
           return  putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(phone);
    }

    /**
     * 点击注册按钮校验验证码
     * 验证完成后保存用户信息
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("register")
    @ResponseBody
    public Map<String, Object> register(HttpServletRequest request,HttpServletResponse response,User user) throws Exception {
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        Map<String, Object> result = new HashMap<>();
        String code = request.getParameter("code");
        String phone = user.getPhone();

        if(StringUtils.isEmpty(phone)){
            ApplicationException ae = new ApplicationException(ApplicationException.NO_PHONE);
            return putDataToMap(ae);
        }
        if(StringUtils.isEmpty(user.getLoginName())){
            ApplicationException ae = new ApplicationException(ApplicationException.USER_UNCOMPLETE);
            return putDataToMap(ae);
        }
        if(StringUtils.isEmpty(user.getPassword())){
            ApplicationException ae = new ApplicationException(ApplicationException.USER_UNCOMPLETE);
            return putDataToMap(ae);
        }
        HttpSession session = request.getSession();
        //判断验证码是否超时和正确
        Map<String, Object> checkResult = checkVerifyCode(session, phone, code);
        if((int)checkResult.get("code")!= 0){
            return checkResult;
        }
        try {
            userService.saveUser(user);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return putDataToMap(ae);
        }
        return putDataToMap(user);
    }

    /**
     * 登陆
     * @param request
     * @return
     */
    @RequestMapping("login")
    @ResponseBody
    public  Map<String, Object> login(HttpServletRequest request,HttpServletResponse response) {
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        String loginName = request.getParameter("loginName");
        String password = request.getParameter("password");
        if(StringUtils.isEmpty(loginName) || StringUtils.isEmpty(password)){
            ApplicationException ae = new ApplicationException(ApplicationException.USER_UNCOMPLETE);
            return putDataToMap(ae);
        }
        User user =null;
        try{
            user = userService.login(loginName,password);
            //jedisHelper.set(String.valueOf(user.getId()),JSON.toJSONString(user),60);
            HttpSession session = request.getSession();
            user.setPassword(null);
            session.setAttribute("CURRENT_USER",user);
//            jedisHelper.set(String.valueOf(user.getId()),user,600);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(user);
    }

    @RequestMapping("userinfo")
    @ResponseBody
    public  Map<String, Object> userinfo(HttpServletRequest request,HttpServletResponse response) {

        response.setHeader("Access-Control-Allow-Origin", "*");
//        String id = request.getParameter("params");
//        String o = (String)jedisHelper.get(id);
//        Object obj = JSON.parse(o);
        User obj = (User) WebUtil.getCurrentUser(request);
        if(obj == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }else{
            return putDataToMap(obj);
        }
    }



    /**
     * 登出
     * @param request
     * @return
     */
    @RequestMapping("logoff")
    @ResponseBody
    public Map<String, Object> logoff(HttpServletRequest request,HttpServletResponse response) {
        HttpSession session = request.getSession();
        session.removeAttribute("CURRENT_USER");
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(null);
    }


    /**
     * 检测用户是否存在
     * @param request
     * @return
     */
    @RequestMapping("checkUserByName")
    @ResponseBody
    public Map<String, Object> checkUser(HttpServletRequest request,HttpServletResponse response) {
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        String loginName = request.getParameter("loginName");
       User user = null;
        try {
           List<User> userList = userService.checkUser(loginName);
            if(userList.size()>0){
                user = userList.get(0);
                user.setPassword(null);
            }
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(user);
    }

    /**
     *
     * @param request
     * @param response
     * @return
     */

    @RequestMapping("checkUserByPhone")
    @ResponseBody
    public Map<String, Object> checkPhone(HttpServletRequest request,HttpServletResponse response){
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        String phone = request.getParameter("phone");
        User user = null;
        try {
            List<User> userList = userService.checkUserByPhone(phone);
            if(userList.size()>0){
                user = userList.get(0);
                user.setPassword(null);
            }
        } catch (Exception e) {
            return putDataToMap(e);
        }
       return putDataToMap(user);
    }
    /**
     *  忘记密码
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("resetPassword")
    @ResponseBody
    public Map<String, Object> resetPassword(HttpServletRequest request,HttpServletResponse response){
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        Map<String, Object> result = new HashMap<>();

        String code = request.getParameter("code");//获取验证码
        String phone = request.getParameter("phone");
        String newPassword = request.getParameter("password");
        try{
            if(StringUtils.isEmpty(code) || StringUtils.isEmpty(phone) || StringUtils.isEmpty(newPassword)){
                ApplicationException ae = new ApplicationException(ApplicationException.RESET_PASSWORD);
                return putDataToMap(ae);
            }
            HttpSession session = request.getSession();
            //判断验证码是否超时和正确
            Map<String, Object> checkResult = checkVerifyCode(session, phone, code);
            if((int)checkResult.get("code") != 0){
                return checkResult;
            }
            //根据手机号查询用户信息
            List<User> userList = userService.checkUserByPhone(phone);
            if(userList.size() == 0){
                ApplicationException ae = new ApplicationException(ApplicationException.NO_REGISTER);
                return putDataToMap(ae);
            }
            User user = userList.get(0);
            user.setPassword(newPassword);
            userService.saveUser(user);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(phone);
    }

    @RequestMapping("updateUser")
    @ResponseBody
    public  Map<String, Object> updateUser (HttpServletRequest request,HttpServletResponse response ,User user) throws Exception{
        response.setHeader("Access-Control-Allow-Origin", "*");

        //判断用户是否登陆
        User user1 = (User) WebUtil.getCurrentUser(request);
        if(user1 == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }

        if(!StringUtils.isEmpty(user.getPhone())){//修改手机号
            String code = request.getParameter("code");
            Map<String, Object> map = updatePhone(user.getPhone(), code, request);
            if(map != null){
               return map;
            }
        }
        if(!StringUtils.isEmpty(user.getLoginName())){//校验用户名
            List<User> userList = userService.checkUser(user.getLoginName());
            if(userList.size() > 0){
                ApplicationException ae = new ApplicationException(ApplicationException.LOGNAME_USED);
                return putDataToMap(ae);
            }
        }
        try{
            user.setId(user1.getId());
            user = userService.updateUser(user);
            user = copyUser(user1, user);
            HttpSession session = request.getSession();
            session.setAttribute("CURRENT_USER",user);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(user);
    }

    @RequestMapping("updateMail")
    @ResponseBody
    public Map<String, Object> updateMail (HttpServletRequest request,HttpServletResponse response ,User user) throws Exception{
        response.setHeader("Access-Control-Allow-Origin", "*");
        //判断用户是否登陆
        User user1 = (User) WebUtil.getCurrentUser(request);
        if(user1 == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String code = request.getParameter("code");
        String mail = user.getMail();
        //判断验证码是否超时和正确
        Map<String, Object> checkResult = checkVerifyCode(request.getSession(), mail, code);
        if((int)checkResult.get("code") != 0){
            return checkResult;
        }
        try{
            user.setId(user1.getId());
            user = userService.updateUser(user);
            user = copyUser(user1, user);
            HttpSession session = request.getSession();
            session.setAttribute("CURRENT_USER",user);
        }catch (Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(user);
    }
    @RequestMapping("getMailCode")
    @ResponseBody
    public Map<String, Object> getMailCode (HttpServletRequest request,HttpServletResponse response ,User user) throws Exception{
        response.setHeader("Access-Control-Allow-Origin", "*");
        //判断用户是否登陆
        User user1 = (User) WebUtil.getCurrentUser(request);
        if(user1 == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String mail = user.getMail();
        if(StringUtils.isEmpty(mail)){
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        HttpSession session = request.getSession();
        //验证码是否存在和是否超时
        String begindate = (String) session.getAttribute("begindate"+mail);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(begindate !=null){
            Date bdate = df.parse(begindate);
            long time = (new Date().getTime() - bdate.getTime())/1000;
            if(time>60){//验证码有效期1分钟
                session.removeAttribute(mail);
                session.removeAttribute("begindate"+mail);
            }
        }
        String  code = (String) session.getAttribute(mail);
        if(code !=null){
            ApplicationException ae = new ApplicationException(ApplicationException.CODE_AGAIN);
            return putDataToMap(ae);
        }
        try{
            code = userService.getMailCode(mail);
            //返回成功 将验证码和当前时间存入session
            session.setAttribute(mail,code);
            session.setAttribute("begindate"+mail,df.format(new Date()));
        }catch(Exception e){
            return putDataToMap(e);
        }
        return putDataToMap(code);
    }
    /**
     * 更换手机号时验证手机号
     * @param phone
     * @param code
     * @param request
     * @return
     * @throws Exception
     */
    private Map<String, Object> updatePhone(String phone, String code, HttpServletRequest request) throws Exception{
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("CURRENT_USER");
        if(phone.equals(user.getPhone())){
            ApplicationException ae = new ApplicationException(ApplicationException.PHONE_SAME);
            return putDataToMap(ae);
        }
        Map<String, Object> checkResult = checkVerifyCode(session, phone, code);
        if((int)checkResult.get("code")!= 0){
            return checkResult;
        }
        return null;
    }

    private User copyUser(User user1 , User user) throws Exception{
        if(StringUtils.isEmpty(user.getName())){
            user.setName(user1.getName());
        }
        if(StringUtils.isEmpty(user.getCredit())){
            user.setCredit(user1.getCredit());
        }
        if(StringUtils.isEmpty(user.getGender())){
            user.setGender(user1.getGender());
        }
        if(StringUtils.isEmpty(user.getLastLoginDate())){
            user.setLastLoginDate(user1.getLastLoginDate());
        }
        if(StringUtils.isEmpty(user.getLastLoginIp())){
            user.setLastLoginIp(user1.getLastLoginIp());
        }
        if(StringUtils.isEmpty(user.getMail())){
            user.setMail(user1.getMail());
        }
        if(StringUtils.isEmpty(user.getRank())){
            user.setRank(user1.getRank());
        }
        if(StringUtils.isEmpty(user.getType())){
            user.setType(user1.getType());
        }
        if(StringUtils.isEmpty(user.getStatus())){
            user.setStatus(user1.getStatus());
        }
        if(StringUtils.isEmpty(user.getLoginName())){
            user.setLoginName(user1.getLoginName());
        }
        if(StringUtils.isEmpty(user.getPhone())){
            user.setPhone(user1.getPhone());
        }
        user.setPassword(null);
        return user;
    }
    /**
     * 验证码是否正确
     * @param session
     * @param phone
     * @param code
     * @return
     * @throws Exception
     */

    private  Map<String, Object> checkVerifyCode(HttpSession session,String phone,String code) throws Exception{
        Map<String, Object> result = new HashMap();
        //判断验证码是否超时
        String begindate = (String) session.getAttribute("begindate"+phone);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(begindate !=null){
            Date bdate = df.parse(begindate);
            long time = (new Date().getTime() - bdate.getTime())/1000;
            if(time>60){
                session.removeAttribute(phone);
                session.removeAttribute("begindate"+phone);
                ApplicationException ae = new ApplicationException(ApplicationException.CODE_TIMEOUT);
                return putDataToMap(ae);
            }
        }
        String verifyCode = (String) session.getAttribute(phone);
        //防止没有获取验证码直接点击注册
        if(verifyCode == null){
            ApplicationException ae = new ApplicationException(ApplicationException.NO_CODE);
            return putDataToMap(ae);
        }
        if(!verifyCode.equals(code)){
            ApplicationException ae = new ApplicationException(ApplicationException.CODE_ERROR);
            return putDataToMap(ae);
        }
        result.put("code",0);
        return result;
    }

    @RequestMapping("uploadFile")
    @ResponseBody
    public Map<String, Object> uploadFile(HttpServletRequest request,HttpServletResponse response) {
        response.setContentType("text/html;charset=UTF-8");
        List<String> list = null;
        try {
            list = OperateFileUtil.uplaodFile(request);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(list);
    }

    @RequestMapping("uploadProcessFile")
    @ResponseBody
    public void uploadProcessFile(HttpServletRequest request,HttpServletResponse response,String path) {
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        List<String> list = new ArrayList<>();;


        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());

        //判断 request 是否有文件上传,即多部分请求
        if (multipartResolver.isMultipart(request)) {

            List<MultipartFile> files = new ArrayList<MultipartFile>();
            List<String> filenames= new ArrayList<String>();

            //转换成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;

            MultiValueMap<String, MultipartFile> multiFileMap = multiRequest.getMultiFileMap();

            String fileType = null;

            for(String key : multiFileMap.keySet()) {
                List<MultipartFile> fileList = multiFileMap.get(key);

                for(final MultipartFile file : fileList) {
                    String fileName = file.getOriginalFilename();

                    StringBuilder url = new StringBuilder();

                    String contentType = file.getContentType();

                    if(contentType.indexOf("image") > -1) {
                        fileType = "image";
                    } else if(contentType.indexOf("audio") > -1) {
                        fileType = "audio";
                    } else if(contentType.indexOf("video") > -1) {
                        fileType = "video";
                    } else {
                        fileType = "other";
                    }

                    String filename = new Date().getTime() + fileName.trim();
                    url.append(fileType + "/"+path +"/"+filename);
                    String fileUrl = PropertiesUtil.getString("img_Server_Path")+"/" + url.toString();
                    //将图片上传至阿里云

                    list.add(filename);
                    files.add(file);
                }
            }

            try {
                response.getWriter().write(JSON.toJSONString(putDataToMap(list)));
                response.getWriter().flush();
                response.getWriter().close();

                SimpleUpload.uploadProcessFile(jedisHelper,files, PropertiesUtil.getString("img_bucketName"), list);
            } catch (IOException e) {
                e.printStackTrace();
            }

        }


    }

    @RequestMapping("uploadFileProcess")
    @ResponseBody
    public Map<String, Object> uploadFileProcess(HttpServletRequest request,HttpServletResponse response,String  filename) {
        response.setContentType("text/html;charset=UTF-8");
        //Object process = request.getSession().getAttribute(filename);
        Object process = jedisHelper.get(filename);
        if(process != null){
            process = Float.parseFloat(process.toString())*100+"%";
        }

        return putDataToMap(process);
    }
}
