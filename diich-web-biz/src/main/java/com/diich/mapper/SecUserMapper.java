package com.diich.mapper;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseMapper;
import com.diich.core.model.SecUser;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SecUserMapper extends BaseMapper<SecUser>{


    int deleteByPrimaryKey(Integer user_id);

    Integer insert(SecUser record);

    int insertSelective(SecUser record);

    SecUser selectByPrimaryKey(Integer user_id);

    int updateByPrimaryKeySelective(SecUser record);

    int updateByPrimaryKey(SecUser record);

    List queryList();

/*
    @Select("selectUserList")
    List<SecUser> selectUserList(Pagination page);*/

    /*List<SecUser> selectUserList(Pagination page, @Param(value="id")String id, @Param(value = "password") String password);*/

    List<SecUser> selectUserList(Page page, @Param(value="secUser") SecUser secUser);
}