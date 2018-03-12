package com.diich.core.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.model.IchProject;
import com.diich.core.model.User;
import com.diich.core.model.Works;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/19.
 */
public interface WorksService {

    //根据id获取作品详情
    Works getWorks(String worksId) throws Exception;
    //查询作品列表信息
    Page<Works> getWorksPage(Map<String, Object> params)throws Exception;

    List<Works> getWorksList(Page<Works> page) throws Exception;
    //保存
    Works saveWorks(Works works,User user) throws Exception;
    //根据项目id或者传承人id获取作品列表
    List<Works> getWorksByIchProjectId(Long id) throws Exception;

    List<Works> getWorksByIchMasterId(Long id) throws Exception;

    String buildHTML(String templateName, Works works, String fileName) throws Exception;

    List<Works> getWorksByName(String worksName)throws Exception;

    Works getWorksByDoi(String doi)throws Exception;
}
