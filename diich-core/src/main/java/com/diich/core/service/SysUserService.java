package com.diich.core.service;

import com.diich.core.model.SecUser;
/**
 * Created by Administrator on 2017/4/24 0024.
 */
public interface SysUserService {

        //新增注册用户
        public SecUser addUser(SecUser user);
        //修改用户信息
        public boolean updateUser(SecUser user);
        //查询用户信息
        public SecUser queryById(long ID);

}
