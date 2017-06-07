package com.diich.core.service;

import com.diich.core.model.Version;

/**
 * Created by Administrator on 2017/6/6.
 */
public interface VersionService {
    Version getVersionByLangIdAndTargetType(Long chiId ,Long engId ,Integer targetType) throws Exception;
}
