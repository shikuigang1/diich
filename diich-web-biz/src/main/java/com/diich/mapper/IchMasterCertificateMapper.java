package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.IchMasterCertificate;

public interface IchMasterCertificateMapper extends BaseMapper<IchMasterCertificate> {
    int deleteByPrimaryKey(Long id);

    Integer insert(IchMasterCertificate record);

    int insertSelective(IchMasterCertificate record);

    IchMasterCertificate selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(IchMasterCertificate record);

    int updateByPrimaryKey(IchMasterCertificate record);
}