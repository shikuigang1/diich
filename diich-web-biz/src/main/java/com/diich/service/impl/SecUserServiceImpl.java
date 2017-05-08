package com.diich.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;
import com.diich.core.base.BaseService;
import com.diich.core.service.SysUserService;
import com.diich.mapper.SecUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.diich.core.model.SecUser;

import java.util.List;
import java.util.Map;
import com.diich.mapper.SecUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/4/24 0024.
 */

@Service("sysUserService")
public class SecUserServiceImpl extends BaseService<SecUser>  implements  SysUserService  {

    @Autowired
    private SecUserMapper secUserMapper;
    @Autowired
    @Qualifier("masterTemplateServiceImpl")
    private BaseTemplateService baseTemplateService;

    @Autowired
    private MasterTemplateEngine masterTemplateEngine;

    public SecUser addUser(SecUser user) throws Exception {
        baseTemplateService.save(user);
        return null;
    }

    public boolean updateUser(SecUser user) {
        return false;
    }

    //@Cacheable(value = Constants.CACHE_NAMESPACE + "sysParams")
    public SecUser queryById(long ID) {
        return super.queryById(ID);
    }

    public List<SecUser> getPageByMap(Map<String, Object> params){
        return super.queryList(params);
    }

    public List<SecUser> selectUserPage(Page page, String id, String password) {
        //List<SecUser> secUserList = secUserMapper.selectPage(page, ew);
        //List<SecUser> secUserList = secUserMapper.selectUserList(page, id, password);
        SecUser secUser = new SecUser();
        secUser.setId(Long.parseLong(id));

        List<SecUser> secUserList = secUserMapper.selectUserList(page, secUser);
        return secUserList;
    }


    public String queryList() throws Exception {

        List userList = secUserMapper.queryList();
        String filename=userList.get(0).toString();
        String title="freemarker测试";
        String templatename="user.ftl";
        String outPutPath =masterTemplateEngine.buildHTML(templatename, userList, filename, title);
        return outPutPath;
    }
}
