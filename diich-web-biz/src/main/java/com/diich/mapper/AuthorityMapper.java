package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Authority;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by Administrator on 2018/3/12.
 */
public interface AuthorityMapper extends BaseMapper<Authority> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Authority record);

    int insertSelective(Authority record);

    Authority selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Authority record);

    int updateByPrimaryKey(Authority record);

    Authority selectAuthority(@Param("targetId") Long targetId, @Param("targetTable") String targetTable) throws Exception;
}
