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
    @Autowired
    private VersionService versionService;
    @Autowired
    private VersionMapper versionMapper;
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
        try {
            if(organization.getStatus() != null && organization.getStatus() == 3){
                checkOrganization(organization);//校验机构信息
                if(user != null && user.getType() == 0){//如果当前修改者是admin type代表权限  0 代表admin  1代表普通用户
                    organization.setStatus(0);
                }
            }
            organization.setLastEditDate(new Date());
            saveOrgan(organization , user);
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            if( e instanceof ApplicationException) {
                ApplicationException ae = (ApplicationException) e;
                if (ae.getCode() == 2) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, ae.getDetailMsg());
                }
            }
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return organization;
    }

    private void saveOrgan(Organization organization, User user) throws Exception{
        if(StringUtils.isEmpty(organization.getLang())){
            organization.setLang("chi");
        }
        if(user.getType() != null && user.getType() == 3){//0管理员账户 1普通用户 2传承人用户  3 机构用户
            organization.setUserId(user.getId());
        }
        if(organization.getId() == null){
            //校验该用户是否申报过机构信息
            List<Organization> organizationList = organizationMapper.selectOrganizationByUserId(user.getId());
            if(organizationList.size() > 0){
                throw new ApplicationException(ApplicationException.PARAM_ERROR,"当前账号已申报过机构信息");
            }
            long id = IdWorker.getId();
            organization.setId(id);
            organization.setLastEditorId(user.getId());
            organization.setUri(id +".html");
            organization.setStatus(2);//草稿状态
            if(user != null && user.getType() == 0){
                organization.setStatus(0);
            }
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
        if (user != null && user.getType() == 0){//管理员权限
            organization = getAttribute(organization);//获取attribute
            String str = PropertiesUtil.getString("freemarker.organizationfilepath");
            String fileName = str+"/"+organization.getId().toString() + ".html";
            String s = buildHTML("organization.ftl", organization, fileName);//生成静态页面
//            String h5outPutPath = PropertiesUtil.getString("freemarker.h5_organizationfilepat")+"/"+organization.getId().toString()+".html";
//            buildHTML("h5_organization.ftl",organization,h5outPutPath);
            String bucketName = PropertiesUtil.getString("img_bucketName");
            String type = PropertiesUtil.getString("pc_ohtml_server");
            File file = new File(fileName);
            SimpleUpload.uploadFile(new FileInputStream(file),bucketName,type+"/"+organization.getId()+".html",file.length());//上传到阿里云
//            String h5type = PropertiesUtil.getString("m_ohtml_server");
//            File h5file = new File(h5outPutPath);
//            SimpleUpload.uploadFile(new FileInputStream(h5file),bucketName,h5type+"/"+organization.getId()+".html",h5file.length());//上传到阿里云
        }
    }

    private Organization getAttribute(Organization organization) throws Exception{
        List<ContentFragment> contentFragmentList = organization.getContentFragmentList();
        if(contentFragmentList != null && contentFragmentList.size() > 0){
            for (ContentFragment contentFragment : contentFragmentList) {
                if(contentFragment.getAttribute() == null && contentFragment.getAttributeId() != null){
                    Attribute attribute = attributeMapper.selectByPrimaryKey(contentFragment.getAttributeId());
                    contentFragment.setAttribute(attribute);
                }
            }
        }
        return  organization;
    }
    /**
     * 生成静态页面
     * @param templateName
     * @param organization
     * @param fileName
     * @return
     * @throws Exception
     */
    @Override
    public String buildHTML(String templateName, Organization organization, String fileName) throws Exception {
        try{
            Map map = getJson(organization);
            String uri = BuildHTMLEngine.buildHTML(templateName, organization,map, fileName);
            return uri;
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    /**
     * 预览
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public String preview(long id) throws Exception {
        try{
            Organization organization = getOrganizationById(id);
            String str = PropertiesUtil.getString("freemarker.organizationfilepath");
            String fileName = str + "/" +organization.getId().toString() + ".html";
            String url = str.substring(str.lastIndexOf("/"));
            String s = buildHTML("preview_organization.ftl", organization, fileName);
            String uri = "." + url + "/" + id + ".html";
            return uri;
        }catch (Exception e){
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    @Override
    public Organization getOrganizationByIdAndIUser(long id, User user) throws Exception {
        if(user.getType() != null && user.getType() == 0){//是管理员
            return getOrganization(id);
        }
        Version version = new Version();
        version.setTargetType(3);
        version.setVersionType(1000);
        version.setMainVersionId(id);
        List<Version> versionList = versionMapper.selectVersionByVersionIdAndTargetType(version);
        if(versionList.size()>0) {
            List tempList = new ArrayList();
            for (Version ver : versionList) {
                tempList.add(ver.getBranchVersionId());
            }
            List<Organization> organizationList = organizationMapper.selectOrganizationByUserId(user.getId());
            for (Organization organization : organizationList) {
                Long organizationId = organization.getId();
                if(tempList.contains(organizationId)){
                    List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                    organization.setContentFragmentList(contentFragmentList);
                    return organization;
                }
            }
        }
        Organization organization = getOrganizationById(id);
        if(organization !=null && (!organization.getLastEditorId().equals(user.getId())) || ( organization.getStatus() != null && organization.getStatus()==0)){
            organization.setLastEditorId(user.getId());
            organization.setLastEditDate(new Date());
            organization  = updateOrganization(organization);
        }
        return organization;
    }

    /**
     * 根据用户id获取机构信息
     * @param params
     * @return
     * @throws Exception
     */
    @Override
    public Page<Organization> getOrganizationByUserId(Map<String, Object> params) throws Exception {
        Integer current = 1;
        Integer pageSize = 10;
        if(params != null && params.containsKey("current")){
            current = (Integer) params.get("current");
        }
        if(params != null && params.containsKey("pageSize")){
            pageSize = (Integer) params.get("pageSize");
        }
        int offset = (current - 1) * pageSize;
        RowBounds rowBounds = new RowBounds(offset,pageSize);
        Page<Organization> page = new Page();
        try{
            List<Organization> organizationList = organizationMapper.selectOrganizationByUserAndStatus(params,rowBounds);
            for (Organization organization : organizationList) {
                List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                organization.setContentFragmentList(contentFragmentList);
            }
            //查询数量
            int total = organizationMapper.selectOrganizationCountByUserAndStatus(params);
            page.setRecords(organizationList);
            page.setTotal(total);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return page;
    }

    private Organization updateOrganization(Organization organization) throws Exception {
        Long mainId = organization.getId();
        long branchId = IdWorker.getId();
        organization.setId(branchId);
        organization.setStatus(2);
        organization.setUri(branchId+".html");
        organizationMapper.insertSelective(organization);
        List<ContentFragment> ichProjectContentFragmentList = organization.getContentFragmentList();
        if(ichProjectContentFragmentList != null && ichProjectContentFragmentList.size()>0){
            for (ContentFragment contentFragment : ichProjectContentFragmentList) {
                contentFragment.setId(null);
                contentFragment.setTargetId(branchId);
                if(contentFragment.getAttributeId() != null){
                    Attribute attribute = attributeMapper.selectByPrimaryKey(contentFragment.getAttributeId());
                    if(attribute != null && attribute.getTargetType() != null && attribute.getTargetType() == 13){
                        long id = IdWorker.getId();
                        attribute.setId(id);
                        attribute.setTargetId(branchId);
                        attributeMapper.insertSelective(attribute);
                        contentFragment.setAttribute(attribute);
                        contentFragment.setAttributeId(id);
                    }
                }
                List<Resource> resourceList = contentFragment.getResourceList();
                if(resourceList != null && resourceList.size()>0){
                    for(int i = 0 ; i <  resourceList.size() ; i++ ){
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

    private Organization getOrganizationById(long id) throws Exception{
        Organization organization =null;
        try{
            organization = organizationMapper.selectOrganizationById(id);
            if(organization != null){
                //内容片断列表
                List<ContentFragment> contentFragmentList = getContentFragmentListByOrganization(organization);
                organization.setContentFragmentList(contentFragmentList);
            }
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return organization;
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
            if(attribute != null && (attribute.getDataType() == 5 || attribute.getId() == 136)){
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

    /**
     * 获取前端所需要的资源数据
     * @param organization
     * @return
     */
    private Map getJson(Organization organization) throws Exception{
        //list用于向前端传输按模块划分的图片资源   用于显示在详情页特定模块的资源
        List<Map<String,Object>> list = new ArrayList<>();
        //allMap 所有去除重复图片和视频后的资源容器  用于显示在详情页得查看所有图片
        Map<String,Object> allMap = new HashedMap();
        Map<String,Object> headMap = new HashedMap();           //放公共数据
        Set<Resource> imgdist = new HashSet<>();                //去重后的所有图片集合
        Set<Resource> videosdist = new HashSet<>();              //去重后的所有视频集合
        List<ContentFragment> ContentFragmentList = organization.getContentFragmentList();
        for (ContentFragment contentFragment:ContentFragmentList) {
            Map<String, Object> map = new HashMap<>();          //存放每个模块的图片和视频
            List<Resource> img = new ArrayList<>();             //图片资源文件的集合
            List<Resource> video = new ArrayList<>();           //视频资源文件的集合
            Long contentFragmentId = contentFragment.getId();
            List<Resource> resourceList = contentFragment.getResourceList();
            if(resourceList !=null && resourceList.size()>0){
                for (Resource resource:resourceList) {
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
            if("chi".equals(organization.getLang())){
                if(contentFragment.getAttributeId()==132){
                    headMap.put("organizationName",contentFragment.getContent());
                }
            }

            list.add(map);
        }
        allMap.put("imgs",imgdist);
        allMap.put("videos",videosdist);
        headMap.put("lang",organization.getLang());
        Map map = new HashMap();
        map.put("json", JSONObject.toJSON(list).toString());
        map.put("jsonAll",JSONObject.toJSON(allMap).toString());
        map.put("jsonHead",JSONObject.toJSON(headMap).toString());
        return map;
    }
}
