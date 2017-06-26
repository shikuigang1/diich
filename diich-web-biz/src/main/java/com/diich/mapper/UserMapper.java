package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.User;

import java.util.List;

public interface UserMapper extends BaseMapper<User>{
    int deleteByPrimaryKey(Long id);

    Integer insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    List<User> selectByLogNameAndPwd(User record);

    List<User> selectByLogName(String loginName);

    List<User> selectByPhone( String phone);

}