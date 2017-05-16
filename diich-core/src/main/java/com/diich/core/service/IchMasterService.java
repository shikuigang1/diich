package com.diich.core.service;

import com.diich.core.model.IchMaster;

import java.util.List;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface IchMasterService {
    IchMaster getIchMaster(Long id);

    List<IchMaster> getIchMasterList(IchMaster ichMaster);
}
