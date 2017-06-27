package com.diich.service.impl;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.User;
import com.diich.core.service.UserService;
import com.diich.core.util.IdGenerator;
import com.diich.core.util.SecurityUtil;
import com.diich.core.util.SendMsgUtil;
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

    @Override
    public String getVerifyCode(String phone) throws Exception{
        String code =null;
        try{
            code = IdGenerator.gensalt_num(4);
            String text="您的手机验证码为："+code+"，60秒之内有效。请不要把验证码泄漏给其他人，如非本人操作请忽略。【e飞蚁一非遗国际】";
            //发送信息
            SendMsgUtil.sendSms(text,phone);
           }catch(Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return code;
    }

    @Override
    public User login(String loginName, String password) throws Exception {


        List<User> userList=null;
        try{
            String mPassword = SecurityUtil.encryptMd5(password);
            User user = new User();
            user.setLoginName(loginName);
            user.setPassword(mPassword);
            userList = userMapper.selectByLogNameAndPwd(user);
        }catch(Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        if(userList.size()==0){
            throw new ApplicationException(ApplicationException.PARAM_ERROR);
        }
        return  userList.get(0);
    }

    /**
     * 根据用户名查询用户是否存在
     * @param loginName
     * @throws Exception
     */
    public List<User> checkUser(String loginName) throws Exception {
        List<User> userList = null;
        try{
            userList = userMapper.selectByLogName(loginName);
        }catch(Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return userList;
    }

    /**
     * 根据手机号查询用户信息
     * @param phone
     * @return
     * @throws Exception
     */
    @Override
    public List<User> checkUserByPhone(String phone) throws Exception {
        List<User> userList = null;
        try{
            userList = userMapper.selectByPhone(phone);
        }catch(Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return userList;
    }


    public void saveUser(User user) throws Exception {
        //获取当前事务状态
        TransactionStatus transactionStatus = getTransactionStatus();
       if(user != null && user.getId() == null){
           //通过用户名校验用户是否存在
           List<User> userList = null;
           List<User> users = null;
           try{
              userList = userMapper.selectByLogName(user.getLoginName());
           }catch (Exception e){
               throw new ApplicationException(ApplicationException.INNER_ERROR);
           }

           if(userList.size() >0){
               throw new ApplicationException(ApplicationException.PARAM_ERROR);
           }

           try{
               //手机号是否被占用
               users = userMapper.selectByPhone(user.getPhone());
           }catch (Exception e){
               throw new ApplicationException(ApplicationException.INNER_ERROR);
           }

           if(users.size() > 0){
               throw new ApplicationException(ApplicationException.PARAM_ERROR);
           }

           try {
               user.setId(IdWorker.getId());
               user.setStatus(0);
               String password = SecurityUtil.encryptMd5(user.getPassword());
               user.setPassword(password);
               userMapper.insertSelective(user);
               commit(transactionStatus);//提交事务
           } catch (Exception e) {
               rollback(transactionStatus);//回滚事务
               throw new ApplicationException(ApplicationException.INNER_ERROR);
           }
       }else{
           try{
               String password = SecurityUtil.encryptMd5(user.getPassword());
               user.setPassword(password);
               userMapper.updateByPrimaryKeySelective(user);
               commit(transactionStatus);//提交事务
           }catch (Exception e){
               rollback(transactionStatus);//回滚事务
               throw new ApplicationException(ApplicationException.INNER_ERROR);
           }
       }


    }
}
