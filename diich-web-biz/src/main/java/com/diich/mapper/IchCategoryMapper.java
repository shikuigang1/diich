package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.IchCategory;

import java.util.List;

public interface IchCategoryMapper extends BaseMapper<IchCategory> {
    int deleteByPrimaryKey(Long id);

    Integer insert(IchCategory record);

    int insertSelective(IchCategory record);

    IchCategory selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(IchCategory record);

    int updateByPrimaryKey(IchCategory record);

    List<IchCategory> selectByParentId(Long parentId) throws Exception;
}