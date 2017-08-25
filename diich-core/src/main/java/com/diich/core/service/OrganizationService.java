package com.diich.core.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.model.Organization;
import com.diich.core.model.User;

import java.util.Map;

/**
 * Created by Administrator on 2017/8/21.
 */
public interface OrganizationService {

    Organization getOrganization(Long id) throws Exception;

    Organization saveOrganization(Organization organization, User user)throws Exception;

    String buildHTML(String templateName, Organization organization,String fileName) throws Exception;

    String preview(long id) throws Exception;

    Organization getOrganizationByIdAndIUser(long id, User user) throws Exception;

    Page<Organization> getOrganizationByUserId(Map<String, Object> params) throws Exception;
}
