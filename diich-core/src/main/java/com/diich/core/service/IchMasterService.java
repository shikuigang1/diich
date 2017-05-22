package com.diich.core.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseModel;
import com.diich.core.model.IchMaster;
import com.diich.core.model.Works;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchMasterService {

    //根据id查询传承人
    IchMaster getIchMaster(String id) throws Exception;

    //根据条件查询查询传承人列表信息
    List<IchMaster> getIchMasterList(Page<IchMaster> page) throws Exception;

    Page<IchMaster> getIchMasterPage(Map<String, Object>  params) throws Exception;

    //保存传承人
    void  saveIchMaster(IchMaster ichMaster) throws Exception;
    //根据项目id查询传承人
    List<IchMaster> getIchMasterByIchProjectId(Long ichProjectId);

    IchMaster getIchMasterByWorks(Works works);
    //生成静态页面
    String buildHTML(String templateName, IchMaster ichMaster, String fileName) throws Exception;
}
