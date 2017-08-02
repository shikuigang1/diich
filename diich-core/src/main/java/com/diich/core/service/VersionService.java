package com.diich.core.service;

import com.diich.core.model.Version;

import java.util.List;

/**
 * Created by Administrator on 2017/6/6.
 */
public interface VersionService {
    List<Version> getVersionByLangIdAndTargetType(Long mainId , Long branchId , Integer targetType, Integer versionType) throws Exception;
    Version  save(Version version) throws Exception;
}
