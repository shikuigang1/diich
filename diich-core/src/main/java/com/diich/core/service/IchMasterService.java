package com.diich.core.service;

import com.diich.core.model.IchMaster;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchMasterService {

    //根据id查询传承人
    Map<String, Object> getIchMaster(String id);

    //根据条件查询查询传承人列表信息
    Map<String, Object> getIchMasterList(String  text);

    //保存传承人
    Map<String, Object> saveIchMaster(String text);
}
