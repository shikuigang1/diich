package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.Certificate;

public interface CertificateMapper extends BaseMapper<Certificate> {
    int deleteByPrimaryKey(Long id);

    Integer insert(Certificate record);

    int insertSelective(Certificate record);

    Certificate selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Certificate record);

    int updateByPrimaryKey(Certificate record);
}