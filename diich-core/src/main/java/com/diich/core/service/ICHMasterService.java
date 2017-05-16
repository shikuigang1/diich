package com.diich.core.service;

import com.diich.core.model.IchMaster;

import java.util.List;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface ICHMasterService {
    IchMaster getICHMaster(Long id);

    List<IchMaster> getICHMasterList(IchMaster ichMaster);
}
