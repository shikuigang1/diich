package com.diich.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseService;
import com.diich.core.service.SysUserService;
import com.diich.mapper.SecUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.diich.core.model.SecUser;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/24 0024.
 */

@Service("sysUserService")
public class SecUserServiceImpl extends BaseService<SecUser>  implements  SysUserService  {

    @Autowired
    private SecUserMapper secUserMapper;

    public SecUser addUser(SecUser user) {
        return null;
    }

    public boolean updateUser(SecUser user) {
        //return  super.update(user)==null;
        return false;
    }

    public SecUser queryById(long ID) {
        return super.queryById(ID);
    }

    public List<SecUser> getPageByMap(Map<String, Object> params){

        //Page<Long> ids = super.getPage(params);
        //super.queryById(2L);

        return super.queryList(params);

        //List<SecUser> ls =  new ArrayList<SecUser>();

       // ls.add(super.queryById(2L));
        //return ls;
    }

    public List<SecUser> selectUserPage(Page<SecUser> page,  EntityWrapper ew) {
        List<SecUser> secUserList = secUserMapper.selectPage(page, ew);
        return secUserList;
    }

    public List<SecUser> querySecUserList() {
        List<SecUser> secUserList = secUserMapper.querySecUserList();
        return secUserList;
    }

}
