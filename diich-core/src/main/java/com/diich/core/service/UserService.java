package com.diich.core.service;

import com.diich.core.model.User;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/11.
 */
public interface UserService {

    //获取验证码
    String getVerifyCode(String phone) throws Exception;

    //登陆
    User login(String loginName, String password) throws Exception;

    //检查用户名是否存在
    List<User> checkUser(String loginName) throws Exception;

    //检查手机是否被占用
    List<User> checkUserByPhone(String phone) throws Exception;

    //保存用户信息
    void saveUser(User user) throws Exception;
    //更新用户信息
    User updateUser(User user) throws Exception;

    String getMailCode(String mail) throws Exception;
}
