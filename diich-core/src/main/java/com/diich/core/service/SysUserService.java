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
        public SecUser queryById(long ID);

        public String queryList() throws  Exception;
        List<SecUser> querySecUserList();

        List<SecUser> selectUserPage(Page<SecUser> page, EntityWrapper ew);

}
