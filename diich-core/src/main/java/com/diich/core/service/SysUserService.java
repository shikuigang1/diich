package com.diich.core.service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.model.SecUser;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/24 0024.
 */
public interface SysUserService {

    //新增注册用户
    public SecUser addUser(SecUser user) throws Exception;
    //修改用户信息
    public boolean updateUser(SecUser user);
    //查询用户信息
    public SecUser queryById(long ID);;

    void selectUserPage(Page page, String id, String password);

}
