package com.diich.mapper;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseMapper;
import com.diich.core.model.IchProject;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface IchProjectMapper extends BaseMapper<IchProject>{
    int deleteByPrimaryKey(Long id);

    Integer insert(IchProject record);

    int insertSelective(IchProject record);

    IchProject selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(IchProject record);

    int updateByPrimaryKey(IchProject record);

    List<IchProject> selectICHItemList(Page<IchProject> page, @Param("params") Map<String, Object> params);
}