package com.diich.core.service;

import com.diich.core.model.Organization;
import com.diich.core.model.User;

/**
 * Created by Administrator on 2017/8/21.
 */
public interface OrganizationService {

    Organization getOrganization(Long id) throws Exception;

    Organization saveOrganization(Organization organization, User user)throws Exception;
}
