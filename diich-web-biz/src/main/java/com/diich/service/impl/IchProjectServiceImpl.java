package com.diich.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.base.BaseModel;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.IchCategoryService;
import com.diich.core.service.IchMasterService;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.WorksService;
import com.diich.core.util.BuildHTMLEngine;
import com.diich.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/9.
 */
@Service("ichProjectService")
public class IchProjectServiceImpl extends BaseService<IchProject> implements IchProjectService {

    @Autowired
    private IchProjectMapper ichProjectMapper;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AttributeMapper attributeMapper;
    @Autowired
    private ContentFragmentMapper contentFragmentMapper;
    @Autowired
    private ContentFragmentResourceMapper contentFragmentResourceMapper;
    @Autowired
    private ResourceMapper resourceMapper;

    @Autowired
    private IchCategoryService ichCategoryService;
    @Autowired
    private IchMasterMapper ichMasterMapper;
    @Autowired
    private WorksMapper worksMapper;
    @Autowired
    private IchMasterService ichMasterService;
    @Autowired
    private WorksService worksService;

    /**
     * 根据id获取项目信息
     * @param id
     * @return
     * @throws Exception
     */
    public IchProject getIchProject(String id) throws Exception {


        IchProject ichProject = null;

        try {
            ichProject = ichProjectMapper.selectByPrimaryKey(Long.parseLong(id));


            if(ichProject != null) {
                /*Long ichCategoryId = ichProject.getIchCategoryId() == null ? ichProject.getIchCategoryId() : 0;
                IchCategory ichCategory = ichCategoryService.getIchCategory(ichProject.getIchCategoryId());
                if(ichCategory != null) {
                    ichProject.setIchCategory(ichCategory);
                }*/
                 // User user = userMapper.selectByPrimaryKey(ichProject.getLastEditorId());
                //获取传承人列表
                List<IchMaster> ichMasterList = ichMasterService.getIchMasterByIchProjectId(Long.parseLong(id));

                ichProject.setIchMasterList(ichMasterList);
                //作品列表
                List<Works> worksList =worksService.getWorksByIchProjectId(Long.parseLong(id));
                ichProject.setWorksList(worksList);
            }

            //获取项目的field
            List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
            ichProject.setContentFragmentList(contentFragmentList);

        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return  ichProject;
    }

    /**
     * 根据条件查询项目列表信息
     * @param params
     * @return
     * @throws Exception
     */
    public Page<IchProject> getIchProjectPage(Map<String, Object>  params) throws Exception {
        Integer current = 1;
        Integer pageSize = 10;

        if(params != null && params.containsKey("current") && params.containsKey("pageSize")) {
            current = (Integer) params.get("current");
            pageSize = (Integer) params.get("pageSize");
        }

        Page<IchProject> page = new Page<IchProject>(current, pageSize);
        page.setCondition(params);

        List<IchProject> ichProjectList = getIchProjectList(page);

        page.setRecords(ichProjectList);

        return page;
    }

    /**
     * 获取项目列表信息
     * @param page
     * @return
     * @throws Exception
     */
    public List<IchProject> getIchProjectList(Page<IchProject> page) throws Exception{

        List<IchProject> ichItemList = null;
        try {
            Map<String, Object> condition = page.getCondition();
            if(condition == null){
                condition = new HashMap<>();
            }
            ichItemList = ichProjectMapper.selectIchProjectList(page,condition);
//            System.out.println("size:"+ichItemList.size());
            for (IchProject ichProject:ichItemList) {

                if(ichProject != null) {
                    /*Long ichCategoryId = ichProject.getIchCategoryId() == null ? ichProject.getIchCategoryId() : 0;

                    IchCategory ichCategory = ichCategoryService.getIchCategory(ichProject.getIchCategoryId());

                    if(ichCategory != null) {
                        ichProject.setIchCategory(ichCategory);
                    }*/
                    // User user = userMapper.selectByPrimaryKey(ichProject.getLastEditorId());
                    //获取传承人列表
                    List<IchMaster> ichMasterList = ichMasterService.getIchMasterByIchProjectId(ichProject.getId());

                    ichProject.setIchMasterList(ichMasterList);
                    //代表作品列表
                    List<Works> worksList =worksService.getWorksByIchProjectId(ichProject.getId());

                    ichProject.setWorksList(worksList);
                }

                //获取项目的field
                List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
                ichProject.setContentFragmentList(contentFragmentList);

            }

        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return ichItemList;
    }


    /**
     * 保存或更新项目信息
     * @param ichProject
     * @throws Exception
     */
    @Transactional
    public void saveIchProject(IchProject ichProject) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();

        try {
            if(ichProject.getId() == null) {

                long proID = IdWorker.getId();

                ichProject.setId(proID);
                ichProjectMapper.insertSelective(ichProject);
//                System.out.println(proID);
                List<ContentFragment> ls = ichProject.getContentFragmentList();
                for(int i=0;i<ls.size();i++){
                     ContentFragment c = ls.get(i);
                     c.setId(IdWorker.getId());
                     c.setTargetId(proID);
                     c.setTargetType(0);
                     c.setStatus(1);
                     contentFragmentMapper.insertSelective(c);
                 List<Resource> resourceList = c.getResourceList();
                 for (Resource resource: resourceList ) {
                     Long resourceId = IdWorker.getId();
                      resource.setId(resourceId);
                     //保存resource
                     resourceMapper.insertSelective(resource);
                     ContentFragmentResource cfr = new ContentFragmentResource();
                     cfr.setId(IdWorker.getId());
                     cfr.setContentFragmentId(c.getId());
                     cfr.setResourceId(resourceId);
                     cfr.setStatus(1);
                     //保存中间表
                     contentFragmentResourceMapper.insertSelective(cfr);
                 }
                }
                List<Works> worksList = ichProject.getWorksList();
                for (Works works: worksList) {
                    worksService.saveWorks(works);
                }
                String templateName ="";
                String fileName = ichProject.getId().toString();
                //生成静态页面
                String uri = buildHTML(templateName, ichProject, fileName);
                ichProject.setUri(uri);
                ichProjectMapper.updateByPrimaryKeySelective(ichProject);
            } else {
                ichProjectMapper.updateByPrimaryKeySelective(ichProject);
            }
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    /**
     *  根据传承人或者作品信息查询项目
     * @param id
     * @return
     */
    public IchProject getIchProjectById(Long id) {
        //所属项目
        IchProject ichProject = ichProjectMapper.selectByPrimaryKey(id);
        if (ichProject != null) {
            IchCategory ichCategory = ichCategoryService.selectIchCategoryByID(ichProject.getIchCategoryId());
            ichProject.setIchCategory(ichCategory);
            //内容片断列表
            List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
            ichProject.setContentFragmentList(contentFragmentList);
        }
        return ichProject;
    }

    /**
     * 生成静态页面
     * @param templateName
     * @param ichProject
     * @param fileName
     * @return
     * @throws Exception
     */
    @Override
    public String buildHTML(String templateName, IchProject ichProject, String fileName) throws Exception {
        String uri = BuildHTMLEngine.buildHTML(templateName, ichProject, fileName);
        return uri;
    }

    private List<ContentFragment> getContentFragmentListByProjectId(IchProject ichProject){
        ContentFragment c = new ContentFragment();
        c.setTargetId(ichProject.getId());
        c.setTargetType(0);//标示项目
        List<ContentFragment> ls =  contentFragmentMapper.selectByTargetIdAndType(c);
        //List<ContentFragment> ls_ = new ArrayList<ContentFragment>();
        for(int i=0;i<ls.size();i++) {
            ls.get(i).setAttribute(attributeMapper.selectByPrimaryKey(ls.get(i).getAttributeId()));
            Long contentFragmentId = ls.get(i).getId();
            List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragmentId);
            List<Resource> resourceList = new ArrayList<>();
            for (ContentFragmentResource contentFragmentResource : contentFragmentResourceList) {
                Resource resource = resourceMapper.selectByPrimaryKey(contentFragmentResource.getResourceId());
                resourceList.add(resource);
            }
            ls.get(i).setResourceList(resourceList);
        }
        return ls;
    }
}
