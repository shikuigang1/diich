package com.diich.service.impl;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.model.User;
import com.diich.core.service.UserService;
import com.diich.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/11.
 */
@Service("userService")
public class UserServiceImpl extends BaseService<User> implements UserService {

    @Autowired
    private UserMapper userMapper;


    public Map<String, Object> register(String phone, String code) {
        return null;
    }


    public Map<String, Object> login(String loginName, String password) {


        List<User> userList=null;
        try{
            User user = new User();
            user.setLoginName(loginName);
            user.setPassword(password);
            userList = userMapper.selectByLogNameAndPwd(user);
            if(userList.size()==0){
                return setResultMap(Constants.PARAM_ERROR, null);
            }
        }catch(Exception e){
            return setResultMap(Constants.INNER_ERROR, null);
        }
        return setResultMap(Constants.SUCCESS, userList.get(0));
    }


    public Map<String, Object> checkUser(String loginName) {
        try{
            User user = new User();
            user.setLoginName(loginName);
            List<User> userList = userMapper.selectByLogNameAndPwd(user);
            if(userList.size()>0){
                return setResultMap(Constants.PARAM_ERROR, null);
            }
        }catch(Exception e){
            return setResultMap(Constants.INNER_ERROR, null);
        }
        return setResultMap(Constants.SUCCESS, null);
    }


    public Map<String, Object> saveUser(String text) {
        //获取当前事务状态
        TransactionStatus transactionStatus = getTransactionStatus();
        User user=null;
        try {
            user = parseObject(text, User.class);
        } catch (Exception e) {
            return setResultMap(Constants.PARAM_ERROR, null);
        }
        try {
            user.setId(IdWorker.getId());
            userMapper.insertSelective(user);
            commit(transactionStatus);//提交事务
        } catch (Exception e) {
            rollback(transactionStatus);//回滚事务
            return setResultMap(Constants.INNER_ERROR, null);
        }

        return setResultMap(Constants.SUCCESS, user);
    }
}
