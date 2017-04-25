package com.diich.service.impl;

import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.service.SysUserService;
import com.diich.core.model.SecUser;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;

/**
 * Created by Administrator on 2017/4/24 0024.
 */
@CacheConfig(cacheNames = "sysUser")
public class SecUserServiceImpl extends BaseService<SecUser>  implements  SysUserService {

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
}
