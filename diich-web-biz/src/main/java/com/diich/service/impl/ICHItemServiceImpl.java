package com.diich.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.model.ICHCategory;
import com.diich.core.model.ICHItem;
import com.diich.core.service.ICHCategoryService;
import com.diich.core.service.ICHItemService;
import com.diich.mapper.ICHItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/9.
 */
@Service("ichItemService")
public class ICHItemServiceImpl extends BaseService<ICHItem> implements ICHItemService{

    @Autowired
    private ICHItemMapper ichItemMapper;

    @Autowired
    private ICHCategoryService ichCategoryService;

    public Map<String, Object> getICHItem(String id) {

        if(id == null || "".equals(id)) {
            return setResultMap(Constants.PARAM_ERROR, null);
        }

        ICHItem ichItem = null;

        try {
            ichItem = ichItemMapper.selectByPrimaryKey(Long.parseLong(id));

            if(ichItem != null) {
                ICHCategory ichCategory = ichCategoryService.getICHCategory(ichItem.getIchCategoryId());
                if(ichCategory != null) {
                    ichItem.setIchCategory(ichCategory);
                }
            }
        } catch (Exception e) {
            return setResultMap(Constants.INNER_ERROR, null);
        }

        return setResultMap(Constants.SUCCESS, ichItem);
    }

    @Override
    public Map<String, Object> getICHItemList(String text) {
        Map<String, Object> params = null;
        Integer current = 1;
        Integer pageSize = 10;

        try {
            params = JSON.parseObject(text);
        } catch (Exception e) {
            return setResultMap(2, null);
        }

        if(params.containsKey("current") && params.containsKey("pageSize")) {
            current = (Integer) params.get("current");
            pageSize = (Integer) params.get("pageSize");
        }

        Page<ICHItem> page = new Page<ICHItem>(current, pageSize);

        List<ICHItem> ichItemList = null;
        try {
            ichItemList = ichItemMapper.selectICHItemList(page, params);
        } catch (Exception e) {
            return setResultMap(1, null);
        }
        page.setRecords(ichItemList);

        return setResultMap(0, page);
    }

    @Override
    public Map<String, Object> saveICHItem(String text) {
        ICHItem ichItem = null;

        try {
            ichItem = parseObject(text, ICHItem.class);
        } catch (Exception e) {
            return setResultMap(2, null);
        }

        try {
            if(ichItem.getId() == null) {
                ichItemMapper.insertSelective(ichItem);
            } else {
                ichItemMapper.updateByPrimaryKeySelective(ichItem);
            }
        } catch (Exception e) {
            return setResultMap(1, null);
        }

        return setResultMap(0, ichItem);
    }


}
