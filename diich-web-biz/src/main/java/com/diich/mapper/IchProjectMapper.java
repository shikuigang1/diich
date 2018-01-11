package com.diich.mapper;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseMapper;
import com.diich.core.model.IchProject;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

public interface IchProjectMapper extends BaseMapper<IchProject>{
    int deleteByPrimaryKey(Long id);

    Integer insert(IchProject record);

    long insertSelective(IchProject record);

    IchProject selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(IchProject record);

    int updateByPrimaryKey(IchProject record);

    List<IchProject> selectIchProjectList(Page<IchProject> page, @Param("params") Map<String, Object> params);

    List<Map> selectIchProjectByName( Map<String, Object> params);

    IchProject selectIchProjectById(Long id);

    List<IchProject> selectIchProjectByUserId(Long userId);

    List<IchProject> selectIchProjectByUserAndStatus( @Param("params") Map<String, Object> params, RowBounds rowBounds) throws Exception;

    int selectIchProjectCountByUserAndStatus( @Param("params") Map<String, Object> params) throws Exception;

    List<IchProject> selectIchProjectByProjectName( String projectName) throws Exception;

    List<Map> selectCertifications(Map<String, Object> params) throws Exception;

    Long getCount() throws Exception;

    List<IchProject> selectCountryIchProjectList(RowBounds rowBounds)throws Exception;
    List<IchProject> selectCountryIchProjectList()throws Exception;
    //获取国家级项目总数
    int selectCountryProjectCount();
}