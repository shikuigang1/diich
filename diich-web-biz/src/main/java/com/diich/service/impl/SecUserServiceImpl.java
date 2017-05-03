package com.diich.service.impl;

import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.service.SysUserService;
import com.diich.core.model.SecUser;
import com.diich.mapper.SecUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/24 0024.
 */
@CacheConfig(cacheNames = "sysUser")
public class SecUserServiceImpl extends BaseService<SecUser>  implements  SysUserService {

    @Autowired
    private SecUserMapper secUserMapper;

    public SecUser addUser(SecUser user) {
        return null;
    }

    public boolean updateUser(SecUser user) {
        //user = super.update(user);
        return  super.update(user)==null;
    }

    @Cacheable(value = Constants.CACHE_NAMESPACE + "sysParams")
    public SecUser queryById(long ID) {
        return super.queryById(ID);
    }

    public List<SecUser> getList(Map<String, Object> params, Integer from, Integer to) {
        return null;
    }

    public List<SecUser> querySecUserList() {
        List<SecUser> secUserList = secUserMapper.querySecUserList();
        return secUserList;
    }

}
