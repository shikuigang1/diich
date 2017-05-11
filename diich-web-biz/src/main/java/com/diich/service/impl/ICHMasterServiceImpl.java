package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.model.ICHMaster;
import com.diich.core.service.ICHMasterService;
import com.diich.mapper.ICHMasterMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/5/9.
 */
@Service("ichMasterService")
public class ICHMasterServiceImpl extends BaseService<ICHMaster> implements ICHMasterService{

    @Autowired
    private ICHMasterMapper ichMasterMapper;

    public ICHMaster getICHMaster(Long id) {
        ichMasterMapper.selectByPrimaryKey(id);
        return null;
    }

    public List<ICHMaster> getICHMasterList(ICHMaster ichMaster) {

        return null;
    }
}
