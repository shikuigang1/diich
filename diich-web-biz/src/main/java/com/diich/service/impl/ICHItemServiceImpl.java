package com.diich.service.impl;

import com.diich.core.base.BaseService;
import com.diich.core.model.ICHItem;
import com.diich.core.service.ICHItemService;
import com.diich.mapper.ICHItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/5/9.
 */
@Service("ichItemService")
public class ICHItemServiceImpl extends BaseService<ICHItem> implements ICHItemService{

    @Autowired
    private ICHItemMapper ichItemMapper;

    public ICHItem selectICHItem(Long id) {
        ICHItem ichItem = ichItemMapper.selectByPrimaryKey(id);
        return ichItem;
    }

    @Override
    public void saveICHItem(ICHItem ichItem) {
        if(ichItem.getId() == null) {
            ichItemMapper.insertSelective(ichItem);
        } else {
            ichItemMapper.updateByPrimaryKeySelective(ichItem);
        }
    }


}
