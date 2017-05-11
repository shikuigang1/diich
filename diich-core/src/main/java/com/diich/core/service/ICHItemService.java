package com.diich.core.service;

import com.diich.core.model.ICHItem;

/**
 * Created by Administrator on 2017/5/10.
 */
public interface ICHItemService {

    ICHItem getICHItem(Long id);

    void saveICHItem(ICHItem ichItem);
}
