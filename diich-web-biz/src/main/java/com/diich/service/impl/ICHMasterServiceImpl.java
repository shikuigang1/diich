package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.model.IchMaster;
import com.diich.core.service.ICHMasterService;
import com.diich.mapper.IchMasterMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/5/9.
 */
@Service("ichMasterService")
public class ICHMasterServiceImpl extends BaseService<IchMaster> implements ICHMasterService{

    @Autowired
    private IchMasterMapper ichMasterMapper;

    public IchMaster getICHMaster(Long id) {
        ichMasterMapper.selectByPrimaryKey(id);
        return null;
    }

    public List<IchMaster> getICHMasterList(IchMaster ichMaster) {

        return null;
    }
}
