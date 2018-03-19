package com.diich.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.baomidou.mybatisplus.toolkit.StringUtils;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.ContentFragmentService;
import com.diich.core.service.OrganizationService;
import com.diich.core.service.VersionService;
import com.diich.core.util.SimpleUpload;
import com.diich.core.util.BuildHTMLEngine;
import com.diich.core.util.PropertiesUtil;
import com.diich.mapper.*;
import org.apache.commons.collections.map.HashedMap;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;

import java.io.File;
import java.io.FileInputStream;
import java.util.*;

/**
 * Created by Administrator on 2017/8/21.
 */
@Service("organizationService")
@SuppressWarnings("all")
public class OrganizationServiceImpl extends BaseService<Organization> implements OrganizationService {


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
    @Autowired
    private VersionService versionService;
    @Autowired
    private VersionMapper versionMapper;
    @Autowired
    private AuditMapper auditMapper;

    /**
     * 根据id获取机构信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public Organization getOrganization(Long id) throws Exception {
        Organization organization = null;
        try {
            organization = organizationMapper.selectByPrimaryKey(id);
            if (organization != null) {
                List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                organization.setContentFragmentList(contentFragmentList);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return organization;
    }

    @Override
    public Organization saveOrganization(Organization organization, User user) throws Exception {

        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            if (organization.getStatus() != null && organization.getStatus() == 3) {
                checkOrganization(organization);//校验机构信息
                if (user != null && user.getType() == 0) {//如果当前修改者是admin type代表权限  0 代表admin  1代表普通用户
                    organization.setStatus(0);
                }
            }
            organization.setLastEditDate(new Date());
            saveOrgan(organization, user);
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            if (e instanceof ApplicationException) {
                ApplicationException ae = (ApplicationException) e;
                if (ae.getCode() == 2) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, ae.getDetailMsg());
                }
            }
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return organization;
    }

    private void saveOrgan(Organization organization, User user) throws Exception {
        if (StringUtils.isEmpty(organization.getLang())) {
            organization.setLang("chi");
        }
        //如果不是提交待审核的状态改为草稿状态
        if (organization.getStatus() == null || organization.getStatus() != 3) {
            organization.setStatus(2);
        }
        //如果是管理员操作直接是已审核的状态
        if (user != null && user.getType() != null && user.getType() == 0) {
            organization.setStatus(0);
        }
        if (organization.getId() == null) {
            if (user.getType() != null && (user.getType() != 3 || user.getType() != 0 )) {//0管理员账户 1普通用户 2传承人用户  3 机构用户  只允许管理员用户和机构用户申报机构信息
                throw new ApplicationException(ApplicationException.PARAM_ERROR, "当前用户不是机构用户,不能申报机构信息");
            }
            organization.setUserId(user.getId());
            //校验该用户是否申报过机构信息
            List<Organization> organizationList = organizationMapper.selectOrganizationByUserId(user.getId());
            if (organizationList.size() > 0) {
                throw new ApplicationException(ApplicationException.PARAM_ERROR, "当前账号已申报过机构信息");
            }
            long id = IdWorker.getId();
            organization.setId(id);
            organization.setLastEditorId(user.getId());
            organization.setUri(id + ".html");
            organizationMapper.insertSelective(organization);
        } else {
            organizationMapper.updateByPrimaryKeySelective(organization);
        }
        List<ContentFragment> contentFragmentList = organization.getContentFragmentList();
        if (contentFragmentList != null && contentFragmentList.size() > 0) {
            for (ContentFragment contentFragment : contentFragmentList) {
                //判断短文本的content是否为空
                boolean flag = contentIsNull(contentFragment);
                if (flag) {
                    continue;
                }
                contentFragment.setTargetId(organization.getId());
                contentFragment.setTargetType(3);
                //新增内容片断
                contentFragmentService.saveContentFragment(contentFragment);
            }
        }
        if (user != null && user.getType() == 0) {//管理员权限
            organization = getAttribute(organization);//获取attribute
            buildAndUpload(organization);
        }
    }

    private boolean contentIsNull(ContentFragment contentFragment) {
        boolean flag = false;
        if (contentFragment != null) {
            String content = contentFragment.getContent();
            List<Resource> resourceList = contentFragment.getResourceList();
            if (content == null && (resourceList == null || resourceList.size() == 0)) {
                flag = true;
            }
        }
        return flag;
    }

    private void buildAndUpload(Organization organization) throws Exception {
        String str = PropertiesUtil.getString("freemarker.organizationfilepath");
        String fileName = str + "/" + organization.getId().toString() + ".html";
        String s = buildHTML("organization.ftl", organization, fileName);//生成静态页面
        String bucketName = PropertiesUtil.getString("img_bucketName");
        String type = PropertiesUtil.getString("pc_ohtml_server");
        File file = new File(fileName);
        SimpleUpload.uploadFile(new FileInputStream(file), bucketName, type + "/" + organization.getId() + ".html", file.length());//上传到阿里云
//        String h5outPutPath = PropertiesUtil.getString("freemarker.h5_organizationfilepat")+"/"+organization.getId().toString()+".html";
//        buildHTML("h5_organization.ftl",organization,h5outPutPath);
//        String h5type = PropertiesUtil.getString("m_ohtml_server");
//        File h5file = new File(h5outPutPath);
//        SimpleUpload.uploadFile(new FileInputStream(h5file),bucketName,h5type+"/"+organization.getId()+".html",h5file.length());//上传到阿里云
    }

    private Organization getAttribute(Organization organization) throws Exception {
        List<ContentFragment> contentFragmentList = organization.getContentFragmentList();
        if (contentFragmentList != null && contentFragmentList.size() > 0) {
            for (ContentFragment contentFragment : contentFragmentList) {
                if (contentFragment.getAttribute() == null && contentFragment.getAttributeId() != null) {
                    Attribute attribute = attributeMapper.selectByPrimaryKey(contentFragment.getAttributeId());
                    contentFragment.setAttribute(attribute);
                }
            }
        }
        return organization;
    }

    /**
     * 生成静态页面
     *
     * @param templateName
     * @param organization
     * @param fileName
     * @return
     * @throws Exception
     */
    @Override
    public String buildHTML(String templateName, Organization organization, String fileName) throws Exception {
        try {
            Map map = getJson(organization);
            String uri = BuildHTMLEngine.buildHTML(templateName, organization, map, fileName);
            return uri;
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    /**
     * 预览
     *
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public String preview(long id) throws Exception {
        try {
            Organization organization = getOrganizationById(id);
            String str = PropertiesUtil.getString("freemarker.organizationfilepath");
            String fileName = str + "/" + organization.getId().toString() + ".html";
            String url = str.substring(str.lastIndexOf("/"));
            String s = buildHTML("preview_organization.ftl", organization, fileName);
            String uri = "." + url + "/" + id + ".html";
            return uri;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    @Override
    public Organization getOrganizationByIdAndIUser(long id, User user) throws Exception {
        if (user.getType() != null && user.getType() == 0) {//是管理员
            return getOrganization(id);
        }
        Version version = new Version();
        version.setTargetType(3);
        version.setVersionType(1000);
        version.setMainVersionId(id);
        List<Version> versionList = versionMapper.selectVersionByVersionIdAndTargetType(version);
        if (versionList.size() > 0) {
            List tempList = new ArrayList();
            for (Version ver : versionList) {
                tempList.add(ver.getBranchVersionId());
            }
            List<Organization> organizationList = organizationMapper.selectOrganizationByUserId(user.getId());
            for (Organization organization : organizationList) {
                Long organizationId = organization.getId();
                if (tempList.contains(organizationId)) {
                    List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                    organization.setContentFragmentList(contentFragmentList);
                    return organization;
                }
            }
        }
        Organization organization = getOrganizationById(id);
        if (organization != null && (!organization.getLastEditorId().equals(user.getId())) || (organization.getStatus() != null && organization.getStatus() == 0)) {
            organization.setLastEditorId(user.getId());
            organization.setLastEditDate(new Date());
            organization = updateOrganization(organization);
        }
        return organization;
    }

    /**
     * 根据用户id获取机构信息
     *
     * @param params
     * @return
     * @throws Exception
     */
    @Override
    public Page<Organization> getOrganizationByUserId(Map<String, Object> params) throws Exception {
        Integer current = 1;
        Integer pageSize = 50;
        if (params != null && params.containsKey("current")) {
            current = (Integer) params.get("current");
        }
        if (params != null && params.containsKey("pageSize")) {
            pageSize = (Integer) params.get("pageSize");
        }
        int offset = (current - 1) * pageSize;
        RowBounds rowBounds = new RowBounds(offset, pageSize);
        Page<Organization> page = new Page();
        try {
            List<Organization> organizationList = organizationMapper.selectOrganizationByUserAndStatus(params, rowBounds);
            for (Organization organization : organizationList) {
                List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                organization.setContentFragmentList(contentFragmentList);
            }
            //查询数量
            int total = organizationMapper.selectOrganizationCountByUserAndStatus(params);
            page.setRecords(organizationList);
            page.setTotal(total);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return page;
    }

    /**
     * 拒绝审核
     *
     * @param id
     * @param user
     * @param reason
     */
    @Override
    public void refuseAudit(Long id, User user, String reason) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            Organization organization = new Organization();
            organization.setId(id);
            organization.setStatus(4);
            organizationMapper.updateByPrimaryKeySelective(organization);//更新项目状态为已拒绝
            //添加拒绝信息到审核表
            Audit audit = new Audit();
            audit.setTargetType(3);
            audit.setTargetId(id);
            audit.setStatus(1);
            Audit selaudit = auditMapper.selectAuditBytargetIdAndTargetType(audit);
            if (selaudit != null) {
                selaudit.setReason(reason);
                selaudit.setAuditUserId(user.getId());
                selaudit.setAuditDate(new Date());
                auditMapper.updateByPrimaryKeySelective(selaudit);
            } else {
                audit.setId(IdWorker.getId());
                audit.setAuditDate(new Date());
                audit.setAuditUserId(user.getId());
                audit.setReason(reason);
                auditMapper.insertSelective(audit);
            }
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    @Override
    public void audit(Long id, User user, String doi) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            Organization organization = organizationMapper.selectOrganizationById(id);
            if (organization == null) {
                throw new ApplicationException(ApplicationException.PARAM_ERROR, "该id对应的机构不存在");
            }
            if (organization != null && organization.getStatus() != null && organization.getStatus() != 3) {
                throw new ApplicationException(ApplicationException.PARAM_ERROR, "该机构信息不是待审核状态");
            }
            //根据id查询版本
            Version version = new Version();
            version.setBranchVersionId(id);
            version.setTargetType(3);
            version.setVersionType(1000);
            List<Version> versionList = versionMapper.selectVersionByVersionIdAndTargetType(version);
            //判断是否有其他版本
            if (versionList.size() > 0) {//非管理员修改的项目
                Version ver = versionList.get(0);
                Long mainVersionId = ver.getMainVersionId();
                organization.setStatus(0);
                List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                organization.setContentFragmentList(contentFragmentList);
                organization.setLastEditDate(new Date());
                Organization organ = organizationMapper.selectByPrimaryKey(mainVersionId);
                List<ContentFragment> contentFragments = getContentFragmentListByOrganization(organ);
                for (ContentFragment contentFragment : contentFragmentList) {//交换主版本和分支版本内容
                    if (contentFragment.getAttributeId() == 137 && StringUtils.isNotEmpty(doi)) {
                        contentFragment.setContent(doi);
                    }
                    contentFragment.setTargetId(mainVersionId);
                    contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                }
                organ.setStatus(5);//作废状态
                organ.setLastEditDate(new Date());
                for (ContentFragment contentFragment : contentFragments) {
                    contentFragment.setTargetId(id);
                    contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                }
                organization.setId(mainVersionId);
                organization.setLastEditorId(organ.getLastEditorId());
                organization.setUri(organ.getUri());
                organ.setId(id);
                organ.setLastEditorId(organization.getLastEditorId());
                organ.setUri(organization.getUri());
                ver.setVersionType(1001);//已过期
                versionMapper.updateByPrimaryKeySelective(versionList.get(0));
                organizationMapper.updateByPrimaryKeySelective(organization);
                organizationMapper.updateByPrimaryKeySelective(organ);
                //修改审核表信息
                updateAudit(id, organization.getId(), user);
            } else {//新增待审核的机构
                //校验doi都编码是否重复
                if (isDoiValable(doi)) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, "doi编码重复");
                }
                organization.setStatus(0);
                organization.setLastEditDate(new Date());
                organizationMapper.updateByPrimaryKeySelective(organization);
                ContentFragment contentFragment = new ContentFragment();
                contentFragment.setContent(doi);
                contentFragment.setId(IdWorker.getId());
                contentFragment.setTargetType(3);
                contentFragment.setTargetId(id);
                contentFragment.setStatus(0);
                contentFragment.setAttributeId(137L);
                contentFragmentMapper.insertSelective(contentFragment);
                saveAudit(id, user);//保存到审核表
                //获取项目其他信息用以生成静态页面
                List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                organization.setContentFragmentList(contentFragmentList);
            }
            //生成静态页并上传
            buildAndUpload(organization);
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            if (e instanceof ApplicationException) {
                ApplicationException ae = (ApplicationException) e;
                if (ae.getCode() == 2) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, ae.getDetailMsg());
                }
            }
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    private boolean isDoiValable(String doi) throws Exception {
        ContentFragment contentFragment = new ContentFragment();
        contentFragment.setAttributeId(137L);
        contentFragment.setContent(doi);
        List<ContentFragment> contentFragments = contentFragmentMapper.selectByAttIdAndContent(contentFragment);
        if (contentFragments.size() > 0) {
            return true;
        }
        return false;
    }

    private void updateAudit(Long id, Long targetId, User user) throws Exception {
        try {
            //添加信息到审核表
            Audit audit = new Audit();
            audit.setTargetType(3);
            audit.setTargetId(id);
            audit.setStatus(1);
            Audit selaudit = auditMapper.selectAuditBytargetIdAndTargetType(audit);
            if (selaudit != null) {
                audit.setStatus(0);
                selaudit.setReason(null);
                selaudit.setAuditUserId(user.getId());
                selaudit.setAuditDate(new Date());
                selaudit.setTargetId(targetId);
                auditMapper.updateByPrimaryKeySelective(selaudit);
            } else {
                audit.setId(IdWorker.getId());
                audit.setStatus(0);
                audit.setAuditDate(new Date());
                audit.setAuditUserId(user.getId());
                audit.setTargetId(targetId);
                auditMapper.insertSelective(audit);
            }
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    private void saveAudit(Long id, User user) throws Exception {
        try {
            //添加拒绝信息到审核表
            Audit audit = new Audit();
            audit.setTargetType(3);
            audit.setTargetId(id);
            audit.setId(IdWorker.getId());
            audit.setAuditDate(new Date());
            audit.setAuditUserId(user.getId());
            audit.setStatus(0);//已通过
            auditMapper.insertSelective(audit);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    private Organization updateOrganization(Organization organization) throws Exception {
        Long mainId = organization.getId();
        long branchId = IdWorker.getId();
        organization.setId(branchId);
        organization.setStatus(2);
        organization.setUri(branchId + ".html");
        organizationMapper.insertSelective(organization);
        List<ContentFragment> ichProjectContentFragmentList = organization.getContentFragmentList();
        if (ichProjectContentFragmentList != null && ichProjectContentFragmentList.size() > 0) {
            for (ContentFragment contentFragment : ichProjectContentFragmentList) {
                contentFragment.setId(null);
                contentFragment.setTargetId(branchId);
                if (contentFragment.getAttributeId() != null) {
                    Attribute attribute = attributeMapper.selectByPrimaryKey(contentFragment.getAttributeId());
                    if (attribute != null && attribute.getTargetType() != null && attribute.getTargetType() == 13) {
                        long id = IdWorker.getId();
                        attribute.setId(id);
                        attribute.setTargetId(branchId);
                        attributeMapper.insertSelective(attribute);
                        contentFragment.setAttribute(attribute);
                        contentFragment.setAttributeId(id);
                    }
                }
                List<Resource> resourceList = contentFragment.getResourceList();
                if (resourceList != null && resourceList.size() > 0) {
                    for (int i = 0; i < resourceList.size(); i++) {
                        Resource resource = resourceList.get(i);
                        resource.setId(null);
                    }
                }
                contentFragmentService.saveContentFragment(contentFragment);
            }
        }
        //保存version表
        Version version = new Version();
        version.setTargetType(3);
        version.setMainVersionId(mainId);
        version.setBranchVersionId(branchId);
        version.setVersionType(1000);//版本  修改中, 已过期
        versionService.save(version);

        return organization;
    }

    private Organization getOrganizationById(long id) throws Exception {
        Organization organization = null;
        try {
            organization = organizationMapper.selectOrganizationById(id);
            if (organization != null) {
                //内容片断列表
                List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                organization.setContentFragmentList(contentFragmentList);
            }
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return organization;
    }


    /**
     * 校验字段
     *
     * @param organization
     * @throws Exception
     */
    private void checkOrganization(Organization organization) throws Exception {
        List<ContentFragment> contentFragmentList = organization.getContentFragmentList();

        List<Attribute> attributeList = null;
        try {
            //根据targetType获取属性列表
            Attribute attribute = new Attribute();
            attribute.setTargetType(3);
            attributeList = attributeMapper.selectAttrListByCatIdAndTarType(attribute);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        for (Attribute attr : attributeList) {
            checkSubmitField(attr, contentFragmentList);
        }
    }

    /**
     * 提交时对字段校验 机构信息
     *
     * @param attribute
     * @param contentFragmentList
     * @throws Exception
     */
    @SuppressWarnings("all")
    private void checkSubmitField(Attribute attribute, List<ContentFragment> contentFragmentList) throws Exception {

        int count = 0;
        for (ContentFragment contentFragment : contentFragmentList) {
            if (contentFragment.getAttributeId() == 0 || contentFragment.getAttributeId() == null) {
                continue;
            }
            if (attribute.getMaxLength() != null && (attribute.getId() == contentFragment.getAttributeId())) {
                if (attribute.getDataType() >= 100 && contentFragment.getContent() != null) {
                    String[] arr = contentFragment.getContent().split(",");
                    if (arr.length > attribute.getMaxLength()) {
                        throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString() + " 字段不符合要求");
                    }
                }
                if (attribute.getDataType() < 100 && contentFragment.getContent() != null && contentFragment.getContent().trim().length() > attribute.getMaxLength()) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString() + " 字段不符合要求");
                }
            }
            if ((attribute.getMinLength() != null) && (attribute.getMinLength() > 0)) {//检查必填项是否已填
                if (contentFragment.getAttributeId() != attribute.getId()) {
                    continue;
                }
                String content = contentFragment.getContent();
                if (attribute.getDataType() != 7 && attribute.getDataType() != 8 && attribute.getDataType() != 9 && (content == null || (content.trim().length() < attribute.getMinLength()))) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString() + " 字段不符合要求");
                }
                if(attribute.getDataType() == 7 || attribute.getDataType() == 8 || attribute.getDataType() == 9){
                    List<Resource> resourceList = contentFragment.getResourceList();
                    if(resourceList != null && resourceList.size() < attribute.getMinLength()){
                        throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString()+" 字段不符合要求");
                    }
                }
                count++;
            }
            if ((attribute.getMinLength() != null) && (count == 0)) {
                throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString() + " 字段不符合要求");
            }

        }
    }

    private List<ContentFragment> getContentFragmentListByOrganization(Organization organization) throws Exception {
        //内容片断列表
        ContentFragment con = new ContentFragment();
        con.setTargetId(organization.getId());
        con.setTargetType(3);
        List<ContentFragment> contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
        contentFragmentList = getContentFragmentList(contentFragmentList);
        return contentFragmentList;
    }

    private List<ContentFragment> getContentFragmentList(List<ContentFragment> contentFragmentList) throws Exception {
        List attrlist = new ArrayList();
        for (int i = 0; i < contentFragmentList.size(); i++) {
            attrlist.add(contentFragmentList.get(i).getAttributeId());
        }
        if (attrlist.size() > 0) {
            List<Attribute> attributeList = attributeMapper.selectAttrListByIds(attrlist);//查询属性列表
            List cfrList = new ArrayList<>();
            for (ContentFragment contentFragment : contentFragmentList) {
                for (Attribute attribute : attributeList) {
                    if (contentFragment.getAttributeId() != null && contentFragment.getAttributeId().equals(attribute.getId())) {
                        contentFragment.setAttribute(attribute);
                        if ((attribute.getDataType() >= 5 && attribute.getDataType() < 100)) {//包含资源文件
                            cfrList.add(contentFragment.getId());
                        }
                        break;
                    }
                }
            }
            if (cfrList.size() > 0) {
                List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentIds(cfrList);//查询图片资源
                List reslist = new ArrayList();
                for (ContentFragmentResource contentFragmentResource : contentFragmentResourceList) {
                    if (contentFragmentResource.getResourceId() != null) {
                        reslist.add(contentFragmentResource.getResourceId());
                    }
                }
                if (reslist.size() > 0) {
                    List<Resource> resourceList = resourceMapper.selectByids(reslist);
                    for (ContentFragment contentFragment : contentFragmentList) {
                        List<Resource> conResList = new ArrayList<>();
                        for (ContentFragmentResource contentFragmentResource : contentFragmentResourceList) {
                            for (Resource resource : resourceList) {
                                if (contentFragmentResource.getContentFragmentId() != null && contentFragmentResource.getResourceId() != null && contentFragment.getId().equals(contentFragmentResource.getContentFragmentId()) && resource.getId().equals(contentFragmentResource.getResourceId())) {
                                    conResList.add(resource);
                                }
                            }
                        }
                        contentFragment.setResourceList(conResList);
                    }
                }
            }
        }
        return contentFragmentList;
    }

    /**
     * 获取前端所需要的资源数据
     *
     * @param organization
     * @return
     */
    private Map getJson(Organization organization) throws Exception {
        //list用于向前端传输按模块划分的图片资源   用于显示在详情页特定模块的资源
        List<Map<String, Object>> list = new ArrayList<>();
        //allMap 所有去除重复图片和视频后的资源容器  用于显示在详情页得查看所有图片
        Map<String, Object> allMap = new HashedMap();
        Map<String, Object> headMap = new HashedMap();           //放公共数据
        Set<Resource> imgdist = new HashSet<>();                //去重后的所有图片集合
        Set<Resource> videosdist = new HashSet<>();              //去重后的所有视频集合
        List<ContentFragment> ContentFragmentList = organization.getContentFragmentList();
        for (ContentFragment contentFragment : ContentFragmentList) {
            Map<String, Object> map = new HashMap<>();          //存放每个模块的图片和视频
            List<Resource> img = new ArrayList<>();             //图片资源文件的集合
            List<Resource> video = new ArrayList<>();           //视频资源文件的集合
            Long contentFragmentId = contentFragment.getId();
            List<Resource> resourceList = contentFragment.getResourceList();
            if (resourceList != null && resourceList.size() > 0) {
                for (Resource resource : resourceList) {
                    if (resource.getType() == 0) {
                        img.add(resource);
                        imgdist.addAll(img);
                    }
                    if (resource.getType() == 1) {
                        video.add(resource);
                        videosdist.addAll(video);
                    }
                }
            }
            map.put("contentFragmentId", String.valueOf(contentFragmentId));
            map.put("imgs", img);
            map.put("videos", video);
            if ("chi".equals(organization.getLang())) {
                if (contentFragment.getAttributeId() == 132) {
                    headMap.put("organizationName", contentFragment.getContent());
                }
            }

            list.add(map);
        }
        allMap.put("imgs", imgdist);
        allMap.put("videos", videosdist);
        headMap.put("lang", organization.getLang());
        Map map = new HashMap();
        map.put("json", JSONObject.toJSON(list).toString());
        map.put("jsonAll", JSONObject.toJSON(allMap).toString());
        map.put("jsonHead", JSONObject.toJSON(headMap).toString());
        return map;
    }
}
