package com.diich.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.model.ICHCategory;
import com.diich.core.model.ICHItem;
import com.diich.core.model.User;
import com.diich.core.service.ICHCategoryService;
import com.diich.core.service.ICHItemService;
import com.diich.mapper.ICHItemMapper;
import com.diich.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.transaction.support.DefaultTransactionDefinition;

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
    private UserMapper userMapper;

    @Autowired
    private ICHCategoryService ichCategoryService;

    /*@Autowired
    private DataSourceTransactionManager transactionManager;*/

    public Map<String, Object> getICHItem(String id) {

        if(id == null || "".equals(id)) {
            return setResultMap(Constants.PARAM_ERROR, null);
        }

        ICHItem ichItem = null;

        try {
            ichItem = ichItemMapper.selectByPrimaryKey(Long.parseLong(id));

            if(ichItem != null) {
                Long ichCategoryId = ichItem.getIchCategoryId() == null ? ichItem.getIchCategoryId() : 0;
                ICHCategory ichCategory = ichCategoryService.getICHCategory(ichItem.getIchCategoryId());
                if(ichCategory != null) {
                    ichItem.setIchCategory(ichCategory);
                }

                User user = userMapper.selectByPrimaryKey(ichItem.getLastEditorId());
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
            return setResultMap(Constants.PARAM_ERROR, null);
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
            return setResultMap(Constants.INNER_ERROR, null);
        }
        page.setRecords(ichItemList);

        return setResultMap(Constants.SUCCESS, page);
    }

    @Override
    @Transactional
    public Map<String, Object> saveICHItem(String text) {
        TransactionStatus transactionStatus = getTransactionStatus();

        User user = new User();
        user.setLoginName("user");
        ICHItem ichItem = null;

        try {
            ichItem = parseObject(text, ICHItem.class);
        } catch (Exception e) {
            return setResultMap(Constants.PARAM_ERROR, null);
        }

        try {
            if(ichItem.getId() == null) {
                ichItem.setId(IdWorker.getId());
                ichItemMapper.insertSelective(ichItem);

                userMapper.insertSelective(user);
            } else {
                ichItemMapper.updateByPrimaryKeySelective(ichItem);
            }

        } catch (Exception e) {
            rollback(transactionStatus);
            return setResultMap(Constants.INNER_ERROR, null);
        }

        return setResultMap(Constants.SUCCESS, ichItem);
    }


}
