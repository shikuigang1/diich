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
    public void saveWorks(Works works) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try{
            if(works.getId() == null){//新增
                Long worksId = IdWorker.getId();
                works .setId(worksId);
                works.setStatus(0);
                works.setIsRepresent(1);
                works.setUri(worksId + ".html");
                worksMapper.insertSelective(works);
            }else{
                //更新
                works.setUri(works.getId() + ".html");
                worksMapper.updateByPrimaryKeySelective(works);
            }
            List<ContentFragment> contentFragmentList = works.getContentFragmentList();
            if(contentFragmentList != null && contentFragmentList.size()>0){
                for (ContentFragment contentFragment:contentFragmentList) {
                    contentFragment.setTargetId(works.getId());
                    contentFragmentService.saveContentFragment(contentFragment);
                }
            }
            commit(transactionStatus);
        }catch (Exception e){
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
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
            works = getWorks(String.valueOf(works.getId()));
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
                        if((attribute.getDataType() == 5 || attribute.getId() == 25 || attribute.getId() == 114)){
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
}
