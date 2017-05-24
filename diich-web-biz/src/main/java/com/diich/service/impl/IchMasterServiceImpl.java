package com.diich.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.IchMasterService;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.WorksService;
import com.diich.core.util.BuildHTMLEngine;
import com.diich.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;

import java.util.*;

/**
 * Created by Administrator on 2017/5/9.
 */
@Service("ichMasterService")
public class IchMasterServiceImpl extends BaseService<IchMaster> implements IchMasterService {

    @Autowired
    private IchMasterMapper ichMasterMapper;

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
    private WorksMapper worksMapper;
    @Autowired
    private IchProjectService ichProjectService;
    @Autowired
    private WorksService worksService;


    public IchMaster getIchMaster(String id) throws Exception{

        IchMaster ichMaster =null;
        try{
            ichMaster = ichMasterMapper.selectByPrimaryKey(Long.parseLong(id));
            if(ichMaster !=null){
                //所属项目
                IchProject ichProject = ichProjectService.getIchProjectById(ichMaster.getIchProjectId());
                ichMaster.setIchProject(ichProject);
                //最后编辑者
                User user = userMapper.selectByPrimaryKey(ichMaster.getLastEditorId());
                if(user !=null){
                    ichMaster.setUser(user);
                }
                //作品列表
                List<Works> worksList =worksService.getWorksByIchMasterId(ichMaster.getId());
                ichMaster.setWorksList(worksList);
                //内容片断列表
                ContentFragment con = new ContentFragment();
                con.setTargetId(Long.parseLong(id));
                con.setTargetType(1);
                List<ContentFragment>  contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
                for (ContentFragment contentFragment :contentFragmentList) {
                    Long attrId = contentFragment.getAttributeId();
                    Attribute attribute = attributeMapper.selectByPrimaryKey(attrId);
                    contentFragment.setAttribute(attribute);//添加属性
                    List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragment.getId());
                    List<Resource> resourceList = new ArrayList<>();
                    for (ContentFragmentResource contentFragmentResource: contentFragmentResourceList) {
                        Resource resource = resourceMapper.selectByPrimaryKey(contentFragmentResource.getResourceId());
                        resourceList.add(resource);
                    }
                    contentFragment.setResourceList(resourceList);
                }
                ichMaster.setContentFragmentList(contentFragmentList);
            }
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return  ichMaster;
    }

    /**
     * 根据条件查询分页列表
     * @param params
     * @return
     * @throws Exception
     */
    public Page<IchMaster> getIchMasterPage(Map<String, Object>  params) throws Exception {
        Integer current = 1;
        Integer pageSize = 10;

        if(params != null && params.containsKey("current") && params.containsKey("pageSize")) {
            current = (Integer) params.get("current");
            pageSize = (Integer) params.get("pageSize");
        }

        Page<IchMaster> page = new Page<IchMaster>(current, pageSize);
        page.setCondition(params);

        List<IchMaster> ichMasterList = getIchMasterList(page);

        page.setRecords(ichMasterList);

        return page;
    }
    /**
     * 获取传承人列表
     * @param page
     * @return
     */
    @Override
    public List<IchMaster> getIchMasterList(Page<IchMaster> page) throws ApplicationException {

        List<IchMaster> ichMasterList = null;
        try {
            Map<String, Object> condition = page.getCondition();
            if(condition == null){
                condition = new HashMap<>();
            }
            ichMasterList = ichMasterMapper.selectIchMasterList(page, condition);
            for (IchMaster ichMaster:ichMasterList) {
                //所属项目
                IchProject ichProject =ichProjectService.getIchProjectById(ichMaster.getIchProjectId());
                ichMaster.setIchProject(ichProject);
                //最后编辑者
                User user = userMapper.selectByPrimaryKey(ichMaster.getLastEditorId());
                if(user !=null){
                    ichMaster.setUser(user);
                }
                //作品列表
                List<Works> worksList =worksService.getWorksByIchMasterId(ichMaster.getId());
                ichMaster.setWorksList(worksList);
                //内容片断列表
                ContentFragment con = new ContentFragment();
                con.setTargetId(ichMaster.getId());
                con.setTargetType(1);
                List<ContentFragment>  contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
                for (ContentFragment contentFragment :contentFragmentList) {
                    Long attrId = contentFragment.getAttributeId();
                    Attribute attribute = attributeMapper.selectByPrimaryKey(attrId);
                    contentFragment.setAttribute(attribute);//添加属性
                    List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragment.getId());
                    List<Resource> resourceList = new ArrayList<>();
                    for (ContentFragmentResource contentFragmentResource: contentFragmentResourceList) {
                        Resource resource = resourceMapper.selectByPrimaryKey(contentFragmentResource.getResourceId());
                        resourceList.add(resource);
                    }
                    contentFragment.setResourceList(resourceList);
                }
                ichMaster.setContentFragmentList(contentFragmentList);
            }
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return ichMasterList;
    }

    /**
     * 添加或更新传承人
     * @param ichMaster
     * @return
     */
    public void saveIchMaster(IchMaster ichMaster) throws ApplicationException {
        TransactionStatus transactionStatus = getTransactionStatus();

        try {
            if(ichMaster.getId() == null) {
                long id = IdWorker.getId();
                ichMaster.setId(id);
                ichMaster.setLastEditDate(new Date());
                ichMasterMapper.insertSelective(ichMaster);
                List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
                for (ContentFragment contentFragment: contentFragmentList) {
                    contentFragment.setTargetId(id);
                    contentFragment.setId(IdWorker.getId());
                    contentFragmentMapper.insertSelective(contentFragment);
                    List<Resource> resourceList = contentFragment.getResourceList();
                    for (Resource resource:resourceList) {
                        long recId = IdWorker.getId();
                        resource.setId(recId);
                        //保存resource
                        resourceMapper.insertSelective(resource);
                        ContentFragmentResource cfr = new ContentFragmentResource();
                        cfr.setId(IdWorker.getId());
                        cfr.setContentFragmentId(contentFragment.getId());
                        cfr.setResourceId(recId);
                        cfr.setStatus(1);
                        //保存中间表
                        contentFragmentResourceMapper.insertSelective(cfr);
                    }
                }
                List<Works> worksList = ichMaster.getWorksList();
                for (Works works : worksList) {
                    worksService.saveWorks(works);
                }
            } else {
                ichMasterMapper.updateByPrimaryKeySelective(ichMaster);
                List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
                for (ContentFragment contentFragment: contentFragmentList) {
                    contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);

                }
            }
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    /**
     * 生成静态页面
     * @param templateName
     * @param ichMaster
     * @param fileName
     * @return
     * @throws Exception
     */
    @Override
    public String buildHTML(String templateName, IchMaster ichMaster, String fileName) throws Exception {
        String uri = BuildHTMLEngine.buildHTML(templateName, ichMaster, fileName);
        return uri;
    }
    /**
     * 根据项目id获取传承人列表
     * @param ichProjectId
     * @return
     */
    public List<IchMaster> getIchMasterByIchProjectId(Long ichProjectId){
        List<IchMaster> ichMasterList = ichMasterMapper.selectByIchProjectId(ichProjectId);
        for (IchMaster ichMaster:ichMasterList) {
            ContentFragment con = new ContentFragment();
            con.setTargetId(ichMaster.getId());
            con.setTargetType(1);
            List<ContentFragment> contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
            for (ContentFragment contentFragment :contentFragmentList) {
                Long attrId = contentFragment.getAttributeId();
                Attribute attribute = attributeMapper.selectByPrimaryKey(attrId);
                contentFragment.setAttribute(attribute);//添加属性
                List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragment.getId());
                List<Resource> resourceList = new ArrayList<>();
                for (ContentFragmentResource contentFragmentResource: contentFragmentResourceList) {
                    Resource resource = resourceMapper.selectByPrimaryKey(contentFragmentResource.getResourceId());
                    resourceList.add(resource);
                }
                contentFragment.setResourceList(resourceList);
            }
            ichMaster.setContentFragmentList(contentFragmentList);
        }
        return ichMasterList;
    }

    /**
     * 根据作品获取传承人信息
     * @param works
     * @return
     */
    public IchMaster getIchMasterByWorks(Works works) {
        //所属传承人
        IchMaster ichMaster = ichMasterMapper.selectByPrimaryKey(works.getIchMasterId());
        if (ichMaster != null) {
            //内容片断列表
            ContentFragment con = new ContentFragment();
            con.setTargetId(ichMaster.getId());
            con.setTargetType(1);
            List<ContentFragment> contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
            for (ContentFragment contentFragment : contentFragmentList) {
                Long attrId = contentFragment.getAttributeId();
                Attribute attribute = attributeMapper.selectByPrimaryKey(attrId);
                contentFragment.setAttribute(attribute);//添加属性
                List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragment.getId());
                List<Resource> resourceList = new ArrayList<>();
                for (ContentFragmentResource contentFragmentResource: contentFragmentResourceList) {
                    Resource resource = resourceMapper.selectByPrimaryKey(contentFragmentResource.getResourceId());
                    resourceList.add(resource);
                }
                contentFragment.setResourceList(resourceList);
            }
            ichMaster.setContentFragmentList(contentFragmentList);
        }
        return ichMaster;
    }

}
