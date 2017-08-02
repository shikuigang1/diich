package com.diich.service.impl;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Version;
import com.diich.core.service.VersionService;
import com.diich.mapper.VersionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/6/6.
 */
@Service("versionService")
public class VersionServiceImpl extends BaseService<Version> implements VersionService{

    @Autowired
    private VersionMapper versionMapper;
    @Override
    public List<Version> getVersionByLangIdAndTargetType(Long mainId, Long branchId, Integer targetType,Integer versionType) throws Exception {
        List<Version> versionList = null;
        try{
            Version version = new Version();
            version.setMainVersionId(mainId);
            version.setBranchVersionId(branchId);
            version.setTargetType(targetType);
            version.setVersionType(0);
            versionList = versionMapper.selectVersionByLangIdAndTargetType(version);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return versionList;
    }

    @Override
    public Version save(Version version) throws Exception {
        try{
            version.setId(IdWorker.getId());
            version.setStatus(0);
            versionMapper.insertSelective(version);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return version;
    }
}
