package com.diich.core.service;

import java.util.Map;

/**
 * Created by Administrator on 2017/5/11.
 */
public interface UserService {

    //获取验证码
    Map<String, Object> getVerifyCode(String phone);

    //登陆
    Map<String, Object> login(String loginName, String password);

    //检查用户名是否存在
    Map<String, Object> checkUser(String loginName);

    //保存用户信息
    Map<String, Object> saveUser(String params);

}
