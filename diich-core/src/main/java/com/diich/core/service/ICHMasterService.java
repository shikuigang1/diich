package com.diich.core.service;

import com.diich.core.model.ICHMaster;

import java.util.List;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface ICHMasterService {
    ICHMaster getICHMaster(Long id);

    List<ICHMaster> getICHMasterList(ICHMaster ichMaster);
}
