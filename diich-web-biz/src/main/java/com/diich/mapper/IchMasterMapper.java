package com.diich.mapper;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseMapper;
import com.diich.core.model.IchMaster;
import com.diich.core.model.IchProject;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

public interface IchMasterMapper extends BaseMapper<IchMaster> {
    int deleteByPrimaryKey(Long id);

    Integer insert(IchMaster record);

    int insertSelective(IchMaster record);

    IchMaster selectByPrimaryKey(Long id);

    IchMaster selectMasterById(Long id);

    int updateByPrimaryKeySelective(IchMaster record);

    int updateByPrimaryKey(IchMaster record);

    //根据条件查询列表信息
    List<IchMaster> selectIchMasterList(Page<IchMaster> page, @Param("params") Map<String, Object> params);

    //根据项目id查询传承人列表
    List<IchMaster> selectByIchProjectId(Long ichProjectId);

    List<IchMaster> selectIchMasterByUserId(Long userId);

    List<IchMaster> selectIchMasterByUserAndStatus(@Param("params") Map<String, Object> params, RowBounds rowBounds) throws Exception;

    int selectIchMasterCountByUserAndStatus(@Param("params") Map<String, Object> params) throws Exception;

    List<IchMaster> selectMasterByName(String masterName) throws Exception;

    List<IchMaster> selectEntryByUserAndStatus(@Param("params") Map<String, Object> params, RowBounds rowBounds) throws Exception;

    int selectEntryCountByUserAndStatus(@Param("params") Map<String, Object> params);
}