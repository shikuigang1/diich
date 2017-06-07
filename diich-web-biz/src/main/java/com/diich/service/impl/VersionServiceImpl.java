package com.diich.service.impl;

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
    public Version getVersionByLangIdAndTargetType(Long chiId, Long engId, Integer targetType) throws Exception {
        List<Version> versionList = null;
        try{
            Version version = new Version();
            version.setChiId(chiId);
            version.setEngId(engId);
            version.setTargetType(targetType);
            versionList = versionMapper.selectVersionByLangIdAndTargetType(version);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        if(versionList.size()>0){
            return versionList.get(0);
        }
        return null;
    }
}
