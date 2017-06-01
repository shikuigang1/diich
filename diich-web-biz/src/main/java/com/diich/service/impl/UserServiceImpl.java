package com.diich.service.impl;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.User;
import com.diich.core.service.UserService;
import com.diich.core.util.IdGenerator;
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
            code = IdGenerator.gensalt(4);
            String text="【e飞蚁 efeiyi】尊敬的用户，您的《非遗项目》项目注册验证码为"+code+"，请及时处理！";
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
            User user = new User();
            user.setLoginName(loginName);
            user.setPassword(password);
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
    public void checkUser(String loginName) throws Exception {
        List<User> userList = null;
        try{
            User user = new User();
            user.setLoginName(loginName);
            userList = userMapper.selectByLogNameAndPwd(user);
        }catch(Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        if(userList.size()>0){
            throw new ApplicationException(ApplicationException.PARAM_ERROR);
        }

    }


    public void saveUser(User user) throws Exception {
        //获取当前事务状态
        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            user.setId(IdWorker.getId());
            userMapper.insertSelective(user);
            commit(transactionStatus);//提交事务
        } catch (Exception e) {
            rollback(transactionStatus);//回滚事务
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

    }
}
