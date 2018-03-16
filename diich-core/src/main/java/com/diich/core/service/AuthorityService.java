package com.diich.core.service;

import com.diich.core.model.Authority;
import com.diich.core.model.User;

import java.util.List;

/**
 * Created by Administrator on 2018/3/12.
 */
public interface AuthorityService {
    void addAuthorityToTargetData(Long targetId, String tableName, User user) throws Exception;

    Authority getAuthority(Long authorityId) throws Exception;

    void addAuthority(String tableName, Long targetId, List<Long> authorityIds) throws Exception;

    boolean deleteAuthority(Long authorityId) throws Exception;
}
