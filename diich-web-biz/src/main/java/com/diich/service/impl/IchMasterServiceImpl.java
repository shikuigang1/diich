package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.model.IchMaster;
import com.diich.core.service.IchMasterService;
import com.diich.mapper.IchMasterMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/5/9.
 */
@Service("ichMasterService")
public class IchMasterServiceImpl extends BaseService<IchMaster> implements IchMasterService {

    @Autowired
    private IchMasterMapper ichMasterMapper;

    public IchMaster getIchMaster(Long id) {
        ichMasterMapper.selectByPrimaryKey(id);
        return null;
    }

    public List<IchMaster> getIchMasterList(IchMaster ichMaster) {

        return null;
    }
}
