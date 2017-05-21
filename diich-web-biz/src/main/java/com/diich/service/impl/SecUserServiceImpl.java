package com.diich.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.model.SecUser;
import com.diich.core.service.SysUserService;
import com.diich.mapper.SecUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.TransactionStatus;

/**
 * Created by Administrator on 2017/4/24 0024.
 */

@Service("sysUserService")
public class SecUserServiceImpl extends BaseService<SecUser>  implements  SysUserService  {

    @Autowired
    private SecUserMapper secUserMapper;

    public Map<String, Object> addUser(SecUser user) throws Exception {
       TransactionStatus transactionStatus = getTransactionStatus();

       try {
           Integer a = secUserMapper.insert(user);
           //调用生成静态页面的方法
           String title = "freemarker测试";
           String templatename = "user.ftl";
           String path = buildHTML(templatename, user,"");
           commit(transactionStatus);
           return setResultMap(Constants.SUCCESS, path);
       }catch(Exception e){
           rollback(transactionStatus);
           return setResultMap(Constants.INNER_ERROR, null);
       }

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

    public Page<SecUser> selectUserPage(SecUser secUser) {
        Page<SecUser> page=new Page<SecUser>(1,2);
        /*SecUser secUser = new SecUser();
        if(id != null) {
            secUser.setId(Long.parseLong(id));
        }*/

        List<SecUser> secUserList = null;

        try {
            secUserList = secUserMapper.selectUserList(page, secUser);
        } catch (Exception e) {
            System.out.println("数据错误");
        }

        page.setRecords(secUserList);

        return page;
    }


    public String queryList() throws Exception {

        List userList = secUserMapper.queryList();
        String filename=userList.get(0).toString();
        String title="freemarker测试";
        String templatename="user.ftl";
        String outPutPath =buildHTML(templatename, userList,"");
        return outPutPath;
    }
}
