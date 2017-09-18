package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Enjoy;

public interface EnjoyMapper extends BaseMapper<Enjoy> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Enjoy record);

    int insertSelective(Enjoy record);

    Enjoy selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Enjoy record);

    int updateByPrimaryKey(Enjoy record);

    int selectCountByTypeAndId(Enjoy enjoy);

    void deleteEnjoy(Enjoy enjoy);
}