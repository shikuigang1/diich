package com.diich.web.controller;

import com.alibaba.fastjson.JSON;
import com.diich.core.Constants;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.User;
import com.diich.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/11.
 */
@Controller
@RequestMapping("user")
public class UserController extends BaseController<User> {

    @Autowired
    private UserService userService;

    /**
     * 获取验证码
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("getVerifycode")
    @ResponseBody
    public Map<String, Object> getVerifyCode(HttpServletRequest request) throws Exception {
        Map<String, Object> result=new HashMap<>();
        String phone = request.getParameter("phone");
        if(phone==null){
            result.put("code",Constants.PARAM_ERROR);
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
            result.put("code",Constants.PARAM_ERROR);
            result.put("msg","验证码已发送,不能重复发送,请稍后再试");
            return result;
        }
        String verifyCode = null;
        try{
            //验证码不存在或者已经超时 重新获取
            verifyCode = userService.getVerifyCode(phone);
            //返回成功 将验证码和当前时间存入session
            session.setAttribute(phone,result.get("data"));
            session.setAttribute("begindate"+phone,df.format(new Date()));
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        return setResultMap(verifyCode);
    }

    /**
     * 点击注册按钮校验验证码
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("register")
    @ResponseBody
    public Map<String, Object> register(HttpServletRequest request) throws Exception {
        Map<String, Object> result = new HashMap<>();
        String phone = request.getParameter("phone");
        String code = request.getParameter("code");//验证码
        if(phone==null){
            result.put("code",Constants.PARAM_ERROR);
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
                result.put("code",Constants.PARAM_ERROR);
                result.put("msg","验证码已经超时,请重新获取");
                return result;
            }
        }
        String verifyCode = (String) session.getAttribute(phone);
        //防止没有获取验证码直接点击注册
        if(verifyCode == null){
            result.put("code",Constants.PARAM_ERROR);
            result.put("msg","你还没有获取验证码或者验证码超时,请获取验证码");
            return result;
        }
        if(!verifyCode.equals(code)){
            result.put("code",Constants.PARAM_ERROR);
            result.put("msg","验证码不正确");
            return result;
        }
        result.put("code",Constants.SUCCESS);
        result.put("msg", Constants.MSGS[Constants.SUCCESS]);
        return result;
    }

    /**
     * 登陆
     * @param request
     * @return
     */
    @RequestMapping("login")
    @ResponseBody
    public  Map<String, Object> login(HttpServletRequest request) {
        String loginName = request.getParameter("loginName");
        String password = request.getParameter("password");
//        String code = request.getParameter("code");
        User user =null;
        try{
            user = userService.login(loginName,password);
            HttpSession session = request.getSession();
            session.setAttribute("CURRENT_USER",user);
        }catch (Exception e){
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }
        return setResultMap(user);
    }

    /**
     * 登出
     * @param request
     * @return
     */
    @RequestMapping("logoff")
    @ResponseBody
    public Map<String, Object> logoff(HttpServletRequest request) {
        String loginName = request.getParameter("loginName");
        HttpSession session = request.getSession();
        session.removeAttribute("CURRENT_USER");
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("code", Constants.SUCCESS);
        result.put("msg", Constants.MSGS[Constants.SUCCESS]);
        return result;
    }

    /**
     * 保存用户信息
     * @param request
     * @return
     */
    @RequestMapping("saveUser")
    @ResponseBody
    public Map<String, Object> saveUser(HttpServletRequest request) {
        String params = request.getParameter("params");
        User user = null;

        try {
            user = parseObject(params, User.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return ae.toMap();
        }
        try {
            userService.saveUser(user);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toMap();
        }

        return setResultMap(user);
    }

    /**
     * 检测用户是否存在
     * @param request
     * @return
     */
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

        return setResultMap(loginName);
    }
}
