package com.diich.core.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.model.IchProject;
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
    void saveWorks(Works works) throws Exception;
    //根据项目id或者传承人id获取作品列表
    List<Works> getWorksByIchProjectId(Long id);

    List<Works> getWorksByIchMasterId(Long id);

    String buildHTML(String templateName, Works works, String fileName) throws Exception;
}
