package com.diich.service.impl;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.baomidou.mybatisplus.toolkit.StringUtils;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.ContentFragmentService;
import com.diich.core.service.OrganizationService;
import com.diich.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2017/8/21.
 */
@Service("organizationService")
public class OrganizationServiceImpl extends BaseService<Organization> implements OrganizationService{


    @Autowired
    private OrganizationMapper organizationMapper;
    @Autowired
    private AttributeMapper attributeMapper;
    @Autowired
    private ContentFragmentService contentFragmentService;
    @Autowired
    private ContentFragmentMapper contentFragmentMapper;
    @Autowired
    private ContentFragmentResourceMapper contentFragmentResourceMapper;
    @Autowired
    private ResourceMapper resourceMapper;
    /**
     * 根据id获取机构信息
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public Organization getOrganization(Long id) throws Exception {
        Organization organization = null;
        try{
            organization = organizationMapper.selectByPrimaryKey(id);
            if(organization != null){
                List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                organization.setContentFragmentList(contentFragmentList);
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return organization;
    }

    @Override
    public Organization saveOrganization(Organization organization, User user) throws Exception{

        TransactionStatus transactionStatus = getTransactionStatus();
        if(organization.getStatus() != null && organization.getStatus() == 3){
            checkOrganization(organization);//校验机构信息
        }
        try {
            organization.setLastEditDate(new Date());
            if(organization.getStatus() != null && organization.getStatus() == 3){
                if(user != null && user.getType() == 0){//如果当前修改者是admin type代表权限  0 代表admin  1代表普通用户
                    organization.setStatus(0);
                }
                organizationMapper.updateByPrimaryKeySelective(organization);
            }else{
                saveOrgan(organization , user);
            }
            commit(transactionStatus);
        } catch (Exception e) {
            if( e instanceof ApplicationException) {
                ApplicationException ae = (ApplicationException) e;
                if (ae.getCode() == 2) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, ae.getDetailMsg());
                }
            }
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return organization;
    }

    private void saveOrgan(Organization organization, User user) throws Exception{
        if(StringUtils.isEmpty(organization.getLang())){
            organization.setLang("chi");
        }
        if(user.getType() != null && user.getType() == 3){//0管理员账户 1普通用户 2传承人用户  3 机构用户
            organization.setUserId(organization.getLastEditorId());
        }
        if(organization.getId() == null){
            long id = IdWorker.getId();
            organization.setId(id);
            organization.setLastEditorId(user.getId());
            organization.setUri(id +".html");
            organization.setStatus(2);//草稿状态
            organizationMapper.insertSelective(organization);
        }else{
            organizationMapper.updateByPrimaryKeySelective(organization);
        }
        List<ContentFragment> contentFragmentList = organization.getContentFragmentList();
        if (contentFragmentList !=null && contentFragmentList.size()>0){
            for (ContentFragment contentFragment: contentFragmentList) {
                contentFragment.setTargetId(organization.getId());
                //新增内容片断
                contentFragmentService.saveContentFragment(contentFragment);
            }
        }
    }

    /**
     * 校验字段
     * @param organization
     * @throws Exception
     */
    private void checkOrganization(Organization organization) throws Exception {
        List<ContentFragment> contentFragmentList = organization.getContentFragmentList();

        List<Attribute> attributeList = null;
        try{
            //根据targetType获取属性列表
            Attribute attribute = new Attribute();
            attribute.setTargetType(3);
            attributeList = attributeMapper.selectAttrListByCatIdAndTarType(attribute);
        }catch (Exception e){
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        for (Attribute attr :attributeList) {
            checkSubmitField(attr,contentFragmentList);
        }
    }

    /**
     * 提交时对字段校验 机构信息
     * @param attribute
     * @param contentFragmentList
     * @throws Exception
     */
    private void checkSubmitField(Attribute attribute, List<ContentFragment> contentFragmentList) throws Exception{

        int count = 0;
        for (ContentFragment contentFragment:contentFragmentList) {
            if(contentFragment.getAttributeId() == 0 || contentFragment.getAttributeId() == null){
                continue;
            }
            if(attribute.getMaxLength() != null&& (attribute.getId() == contentFragment.getAttributeId())){
                if(contentFragment.getContent() !=null && contentFragment.getContent().trim().length() > attribute.getMaxLength()){
                    throw  new ApplicationException(ApplicationException.PARAM_ERROR,attribute.getCnName().toString()+" 字段不符合要求");
                }
            }
            if(attribute.getMinLength() != null && attribute.getMinLength() > 0){//检查必填项是否已填
                if(contentFragment.getAttributeId() != attribute.getId()){
                    continue;
                }
                String content = contentFragment.getContent().trim();
                count ++;
                if(content == null || (content.length() < attribute.getMinLength())){
                    throw new ApplicationException(ApplicationException.PARAM_ERROR,attribute.getCnName().toString()+" 字段不符合要求");
                }
            }
            if((attribute.getMinLength() != null) && (count == 0)){
                throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString()+" 字段不符合要求");
            }

        }
    }
    private List<ContentFragment> getContentFragmentListByOrganization(Organization organization) throws Exception {
        //内容片断列表
        ContentFragment con = new ContentFragment();
        con.setTargetId(organization.getId());
        con.setTargetType(3);
        List<ContentFragment>  contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
        contentFragmentList = getContentFragmentList(contentFragmentList);
        return contentFragmentList;
    }
    private List<ContentFragment> getContentFragmentList(List<ContentFragment>  contentFragmentList) throws Exception{
        for (ContentFragment contentFragment :contentFragmentList) {
            Long attrId = contentFragment.getAttributeId();
            Attribute attribute = attributeMapper.selectByPrimaryKey(attrId);
            contentFragment.setAttribute(attribute);//添加属性
            if(attribute != null && (attribute.getDataType() == 5)){
                List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragment.getId());
                List<Resource> resourceList = new ArrayList<>();
                for (ContentFragmentResource contentFragmentResource: contentFragmentResourceList) {
                    Long resourceId = contentFragmentResource.getResourceId();
                    if(resourceId == null){
                        continue;
                    }
                    Resource resource = resourceMapper.selectByPrimaryKey(resourceId);
                    if(resource!=null){
                        resource.setResOrder(contentFragmentResource.getResOrder());
                        resourceList.add(resource);
                    }
                }
                contentFragment.setResourceList(resourceList);
            }
        }
        return contentFragmentList;
    }

}
