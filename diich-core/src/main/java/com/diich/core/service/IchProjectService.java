package com.diich.core.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseModel;
import com.diich.core.model.IchMaster;
import com.diich.core.model.IchProject;
import com.diich.core.model.User;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchProjectService {

    IchProject getIchProject(String id)throws Exception;

    IchProject getIchProjectById(Long id)throws Exception;

    IchProject saveIchProject(IchProject ichProject , User user) throws Exception;

    List<IchProject> getIchProjectList(Page<IchProject> page) throws Exception;

    Page<IchProject> getIchProjectPage(Map<String, Object>  params)throws Exception;

    IchProject getIchProjectByIdAndIUser(Long id, User user) throws Exception;

    String preview(Long id) throws Exception;//预览

    Page<IchProject> getIchProjectByUserId(Map<String, Object> params) throws Exception;//根据用户id获取用户信息

    String buildHTML(String templateName, IchProject ichProject,String fileName) throws Exception;

    //项目创建 搜索使用  最多显示 5 条数据
    List<Map> getIchProjectByName(Map<String,Object> map) throws Exception;

    void audit(Long id, User user)throws Exception;

    int deleteIchProject(Long id) throws Exception;

    List<IchProject> getIchProject(String projectNamen, String masterName, String WorksName)throws Exception;

    /**
     * 分页获取国家级别的项目
     * @param current
     * @param size
     * @return
     */
    Page<Map> getCountryIchProjectList(Integer current, Integer size) throws Exception;

    Map getCountryIchProjectById(String id) throws Exception;
}
