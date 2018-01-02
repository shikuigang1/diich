package com.diich.core.service;

import com.diich.core.model.OperationConfig;

import java.util.List;

/**
 * Created by wangwenjian on 2017/12/28.
 */
public interface OperationConfigService {
    /**
     * 获取运营位列表信息
     * @param title
     * @param moduleName
     * @param columnName
     * @return
     * @throws Exception
     */
    public List<OperationConfig> getList(String title, String moduleName, String columnName) throws Exception;
}
