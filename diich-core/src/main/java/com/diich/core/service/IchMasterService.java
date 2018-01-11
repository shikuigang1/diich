package com.diich.core.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.model.IchMaster;
import com.diich.core.model.User;
import com.diich.core.model.Works;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchMasterService {

    //根据id查询传承人
    IchMaster getIchMaster(String id) throws Exception;

    //根据传承人id获取传承人自己的信息
    IchMaster getIchMasterById(Long id) throws Exception;

    //根据条件查询查询传承人列表信息
    List<IchMaster> getIchMasterList(Page<IchMaster> page) throws Exception;

    Page<IchMaster> getIchMasterPage(Map<String, Object>  params) throws Exception;

    //保存传承人
    IchMaster  saveIchMaster(IchMaster ichMaster,User user) throws Exception;

    String  preview(Long id) throws Exception;//预览

    //根据项目id查询传承人
    List<IchMaster> getIchMasterByIchProjectId(Long ichProjectId) throws Exception;

    IchMaster getIchMasterByWorks(Works works) throws Exception;
    //生成静态页面
    String buildHTML(String templateName, IchMaster ichMaster, String fileName) throws Exception;

    IchMaster getIchMasterByIdAndUser(Long id , User user) throws Exception;

    Page<IchMaster> getIchMasterByUserId(Map<String, Object>  params) throws Exception;

    int deleteIchMaster(long id) throws Exception;

    List<IchMaster> getIchMaster(String masterName,String worksName) throws Exception;
    //拒绝审核
    void refuseAudit(Long id, User user, String reason) throws Exception;

    /**
     * 审核
     * @param id
     * @param user
     * @param doi
     */
    void audit(Long id, User user, String doi) throws Exception;

    void claimEntry(Long masterId, IchMaster authInfo, User user) throws Exception;
}
