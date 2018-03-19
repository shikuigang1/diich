package com.diich.service.impl;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.model.Authority;
import com.diich.core.model.TargetAuthority;
import com.diich.core.model.User;
import com.diich.core.service.AuthorityService;
import com.diich.mapper.AttributeMapper;
import com.diich.mapper.AuthorityMapper;
import com.diich.mapper.TargetAuthorityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018/3/12.
 */
@Service
public class AuthorityServiceImpl implements AuthorityService {

    @Autowired
    private AuthorityMapper authorityMapper;

    @Autowired
    private AttributeMapper attributeMapper;

    @Autowired
    private TargetAuthorityMapper targetAuthorityMapper;

    @Override
    public void addAuthorityToTargetData(Long targetId, String tableName, User user) throws Exception {

    }

    @Override
    public Authority getAuthority(Long authorityId) throws Exception {
        return null;
    }

    @Override
    public void addAuthority(String tableName, Long targetId, List<Long> authorityIds) throws Exception {

        for (Long authorityId : authorityIds) {
            TargetAuthority targetAuthority = new TargetAuthority();

            targetAuthority.setId(IdWorker.getId());
            targetAuthority.setStatus(0);
            targetAuthority.setAuthorityId(authorityId);
            targetAuthority.setTargetId(targetId);
            targetAuthority.setTargetTable(tableName);

            targetAuthorityMapper.insert(targetAuthority);
        }
    }

    @Override
    public boolean deleteAuthority(Long authorityId) throws Exception {
        return false;
    }


}
