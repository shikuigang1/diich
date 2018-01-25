package com.diich.mapper;

import com.diich.core.model.CountryProject;

import java.util.List;

public interface CountryProjectMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CountryProject record);

    int insertSelective(CountryProject record);

    CountryProject selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CountryProject record);

    int updateByPrimaryKey(CountryProject record);

    List<CountryProject> selectCountryProjectNumList();
}