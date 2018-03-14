package com.diich.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.baomidou.mybatisplus.toolkit.StringUtils;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.*;
import com.diich.core.util.BuildHTMLEngine;
import com.diich.core.util.FileType;
import com.diich.core.util.PropertiesUtil;
import com.diich.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;

import java.util.*;

/**
 * Created by Administrator on 2017/5/19.
 */
@Service("worksService")
@SuppressWarnings("all")
public class WorksServiceImpl extends BaseService<Works> implements WorksService{

    @Autowired
    private WorksMapper worksMapper;
    @Autowired
    private ContentFragmentMapper contentFragmentMapper;
    @Autowired
    private AttributeMapper attributeMapper;
    @Autowired
    private ContentFragmentResourceMapper contentFragmentResourceMapper;
    @Autowired
    private ResourceMapper resourceMapper;
    @Autowired
    private IchProjectService ichProjectService;
    @Autowired
    private IchMasterService ichMasterService;
    @Autowired
    private ResourceService resourceService;
    @Autowired
    private ContentFragmentService contentFragmentService;
    /**
     * 根据id查询作品信息
     * @param id
     * @return
     * @throws Exception
     */
    public Works getWorks(String id) throws Exception{

        Works works = null;
        try{
           works = worksMapper.selectByPrimaryKey(Long.parseLong(id));
            if(works !=null){
                //获取所属项目信息
                if(works.getIchProjectId() != null){
                    IchProject ichProject = ichProjectService.getIchProjectById(works.getIchProjectId());
                    if(ichProject != null){
                        ichProject.setUri(PropertiesUtil.getString("_project") + works.getIchProjectId() + ".html");
                        works.setIchProject(ichProject);
                    }
                }
                //获取传承人信息
                if(works.getIchMasterId() != null){
                    IchMaster ichMaster = ichMasterService.getIchMasterByWorks(works);
                    if(ichMaster != null){
                        ichMaster.setUri(PropertiesUtil.getString("_master") + works.getIchMasterId() + ".html");
                        works.setIchMaster(ichMaster);
                        if(ichMaster.getIchProjectId() != null){
                            IchProject ichProject = ichProjectService.getIchProjectById(ichMaster.getIchProjectId());
                            ichProject.setUri(PropertiesUtil.getString("_project") + ichMaster.getIchProjectId() + ".html");
                            works.setIchProject(ichProject);
                        }
                    }
                }
            }
            //获取内容片断
            List<ContentFragment> contentFragmentList = getContentFragmentListByWorksId(works);
            works.setContentFragmentList(contentFragmentList);
            works.setUri(PropertiesUtil.getString("_works") + id + ".html");
        }catch(Exception e){
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return works;
    }

    /**
     * 根据条件查询作品的列表信息
     * @param params
     * @return
     * @throws Exception
     */
    @Override
    public Page<Works> getWorksPage(Map<String, Object> params) throws Exception {

        Integer current = 1;
        Integer pageSize = 10;

        if(params != null && params.containsKey("current") && params.containsKey("pageSize")) {
            current = (Integer) params.get("current");
            pageSize = (Integer) params.get("pageSize");
        }

        Page<Works> page = new Page<Works>(current, pageSize);
        page.setCondition(params);
        List<Works> worksList = getWorksList(page);

        page.setRecords(worksList);
        return page;
    }

    @Override
    public List<Works> getWorksList(Page<Works> page) throws Exception {
        List<Works> worksList = null;
        try{
            Map<String, Object> condition = page.getCondition();
            if(condition == null){
                condition = new HashMap<>();
            }
           worksList = worksMapper.selectWorksList(page, page.getCondition());
           for (Works works:worksList) {
               //获取所属项目信息
               IchProject ichProject = ichProjectService.getIchProjectById(works.getIchProjectId());
               works.setIchProject(ichProject);
               //获取传承人信息
               IchMaster ichMaster = ichMasterService.getIchMasterByWorks(works);
               works.setIchMaster(ichMaster);
               //获取内容片断
               List<ContentFragment> contentFragmentList = getContentFragmentListByWorksId(works);
               works.setContentFragmentList(contentFragmentList);
           }
       }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
       }

        return worksList;
    }

    /**
     * 添加或更新作品
     * @param works
     * @throws Exception
     */
    @Override
    public Works saveWorks(Works works,User user) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            if (works.getStatus() != null && works.getStatus() == 3) {
                //检查属性是否符合条件
                checkAttribute(works, 3);
                if (user != null && user.getType() == 0) {//如果当前修改者不是admin type 代表权限 0 代表admin  1代表普通用户
                    works.setStatus(0);
                }
            }
            works.setLastEditDate(new Date());
            saveWork(works, user);//保存项目
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            if (e instanceof ApplicationException) {
                ApplicationException ae = (ApplicationException) e;
                if (ae.getCode() == 2) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, ae.getDetailMsg());
                }
            }
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return works;
    }

    private Works saveWork(Works works, User user)throws Exception {
        if (StringUtils.isEmpty(works.getLang())) {
            works.setLang("chi");
        }
        //如果不是提交待审核的状态改为草稿状态
        if (works.getStatus() == null || works.getStatus() != 3) {
            works.setStatus(2);
        }
        //如果是管理员操作直接是已审核的状态
        if (user != null && user.getType() != null && user.getType() == 0) {
            works.setStatus(0);
        }

        if (works.getId() == null) {//保存
            long workId = IdWorker.getId();
            works.setId(workId);
            works.setUri(workId + ".html");
            worksMapper.insertSelective(works);
        } else {//修改
            worksMapper.updateByPrimaryKeySelective(works);
        }
        List<ContentFragment> contentFragmentList = works.getContentFragmentList();
        if (contentFragmentList != null && contentFragmentList.size() > 0) {
            for (ContentFragment contentFragment : contentFragmentList) {
                //判断短文本的content是否为空
                boolean flag = contentIsNull(contentFragment);
                if(flag){
                    continue;
                }
                contentFragment.setTargetId(works.getId());
                contentFragment.setTargetType(2);
                //新增内容片断
                contentFragmentService.saveContentFragment(contentFragment);
            }
        }
        return works;
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
    /**
     * 生成静态页面
     * @param templateName
     * @param works
     * @param fileName
     * @return
     * @throws Exception
     */
    @Override
    public String buildHTML(String templateName, Works works, String fileName) throws Exception {
        String uri = BuildHTMLEngine.buildHTML(templateName, works,null, fileName);
        return uri;
    }

    @Override
    public List<Works> getWorksByName(String worksName) throws Exception {
        List<Works> worksList = new ArrayList<>();
        try{
            List<Works> workss = worksMapper.selectWorksByName(worksName);
            for (Works works:workss) {
                works = getWorks(String.valueOf(works.getId()));
                worksList.add(works);
            }
        }catch(Exception e){
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return worksList;
    }

    @Override
    public Works getWorksByDoi(String doi) throws Exception {
        Works works = null;
        try{
            works = worksMapper.selectWorksByDoi(doi);
            if(works != null){
                works = getWorks(String.valueOf(works.getId()));
            }
        }catch(Exception e){
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return works;
    }

    /**
     * 根据项目id获取代表作品列表
     * @param ichProjectId
     * @return
     */
    public List<Works> getWorksByIchProjectId(Long ichProjectId) throws Exception {
        Works works = new Works();
        works.setIchProjectId(ichProjectId);
        works.setIsRepresent(1);
        List<Works> worksList = worksMapper.selectWorks(works);
        if(worksList.size()>0){
            worksList = getWorkList(worksList);
        }
        return worksList;
    }


    /**
     * 根据传承人id查询代表作品列表
     * @param ichMasterId
     * @return
     */
    public List<Works> getWorksByIchMasterId(Long ichMasterId) throws Exception {
        Works works = new Works();
        works.setIchMasterId(ichMasterId);
        works.setIsRepresent(1);
        List<Works> getWorkList = worksMapper.selectWorks(works);
        List<Works> worksList = getWorkList(getWorkList);
        return worksList;
    }

    private List<Works> getWorkList(List<Works> worksList) throws Exception {
        for (Works works:worksList) {
            //获取内容片断
            List<ContentFragment> contentFragments = getContentFragmentListByWorksId(works);
            works.setContentFragmentList(contentFragments);
        }
        return worksList;
    }

    private List<ContentFragment> getContentFragmentListByWorksId(Works works) throws Exception {
        //获取内容片断
        ContentFragment con = new ContentFragment();
        con.setTargetId(works.getId());
        con.setTargetType(2);
        List<ContentFragment> contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
        List attrlist = new ArrayList();
        for(int i=0;i<contentFragmentList.size();i++) {
            attrlist.add(contentFragmentList.get(i).getAttributeId());
        }
        if(attrlist.size()>0){
            List<Attribute> attributeList = attributeMapper.selectAttrListByIds(attrlist);//查询属性列表
            List cfrList = new ArrayList<>();
            for (ContentFragment contentFragment: contentFragmentList) {
                for (Attribute attribute : attributeList) {
                    if(contentFragment.getAttributeId() != null && contentFragment.getAttributeId().equals(attribute.getId())){
                        contentFragment.setAttribute(attribute);
                        if((attribute.getDataType() >= 5 && attribute.getDataType() < 100)){//包含资源文件
                            cfrList.add(contentFragment.getId());
                        }
                        break;
                    }
                }
            }
            if(cfrList.size()>0){
                List<ContentFragmentResource> contentFragmentResourceList =contentFragmentResourceMapper.selectByContentFragmentIds(cfrList);//查询图片资源
                List reslist = new ArrayList();
                for (ContentFragmentResource  contentFragmentResource:contentFragmentResourceList) {
                    if(contentFragmentResource.getResourceId() != null){
                        reslist.add(contentFragmentResource.getResourceId());
                    }
                }
                if(reslist.size()>0){
                    List<Resource> resourceList = resourceMapper.selectByids(reslist);
                    for (ContentFragment contentFragment: contentFragmentList) {
                        List<Resource> conResList = new ArrayList<>();
                        for (ContentFragmentResource contentFragmentResource : contentFragmentResourceList) {
                            for (Resource resource: resourceList) {
                                if(contentFragmentResource.getContentFragmentId() != null && contentFragmentResource.getResourceId() != null && contentFragment.getId().equals(contentFragmentResource.getContentFragmentId()) && resource.getId().equals(contentFragmentResource.getResourceId())){
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
     * 检查属性是否符合条件
     *
     * @param ichProject
     */
    private void checkAttribute(Works works, Integer status) throws Exception {
        List<ContentFragment> contentFragmentList = works.getContentFragmentList();
        if (status == 3) {//提交
            List<Attribute> attributeList = null;
            try {
                //根据targetType获取属性列表
                Attribute attribute = new Attribute();
                attribute.setTargetType(2);
                attributeList = attributeMapper.selectAttrListByCatIdAndTarType(attribute);
            } catch (Exception e) {
                e.printStackTrace();
                throw new ApplicationException(ApplicationException.INNER_ERROR);
            }

            for (Attribute attr : attributeList) {
                checkSubmitField(attr, contentFragmentList);
            }
        }
    }
    /**
     * 提交时对字段校验 项目
     *
     * @param attribute
     * @param contentFragmentList
     * @throws Exception
     */
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
}
