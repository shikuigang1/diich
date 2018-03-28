package com.diich.mapper;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseMapper;
import com.diich.core.model.Works;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

public interface WorksMapper extends BaseMapper<Works> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Works record);

    int insertSelective(Works record);

    Works selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Works record);

    int updateByPrimaryKey(Works record);

    List<Works> selectWorks(Works record);

    List<Works> selectWorksList(Page<Works> page, @Param("params") Map<String, Object> params);

    List<Works> selectWorksByName(String worksName) throws Exception;

    Works selectWorksByDoi(String doi) throws Exception;

    List<Works> selectWorksByUserAndStatus(@Param("params") Map<String, Object> params, RowBounds rowBounds) throws Exception;

    int selectWorksCountByUserAndStatus(@Param("params") Map<String, Object> params) throws Exception;

    Works selectWorksById(Long id) throws Exception;
}