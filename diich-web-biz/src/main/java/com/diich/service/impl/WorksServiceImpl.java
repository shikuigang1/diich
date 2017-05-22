package com.diich.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.IchMasterService;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.WorksService;
import com.diich.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/19.
 */
@Service("worksService")
public class WorksServiceImpl extends BaseService<Works> implements WorksService{

    @Autowired
    private WorksMapper worksMapper;

    @Autowired
    private IchProjectMapper ichProjectMapper;
    @Autowired
    private IchMasterMapper ichMasterMapper;
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

    public Works getWorks(String id) throws Exception{

        Works works = null;
        try{
           works = worksMapper.selectByPrimaryKey(Long.parseLong(id));
            if(works !=null){
                //获取所属项目信息
                IchProject ichProject = ichProjectService.getIchProjectById(works.getIchProjectId());
                works.setIchProject(ichProject);
                //获取传承人信息
                IchMaster ichMaster = ichMasterService.getIchMasterByWorks(works);
                works.setIchMsster(ichMaster);
            }
            //获取内容片断
            ContentFragment con = new ContentFragment();
            con.setTargetId(works.getId());
            con.setTargetType(2);
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
            works.setContentFragmentList(contentFragmentList);
        }catch(Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return works;
    }

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

        return null;
    }


    /**
     * 根据项目id获取代表作品列表
     * @param ichProjectId
     * @return
     */
    public List<Works> getWorksByIchProjectId(Long ichProjectId){
        Works works = new Works();
        works.setIchProjectId(ichProjectId);
        works.setIsRepresent(0);
        List<Works> getWorkList = worksMapper.selectWorks(works);
        List<Works> worksList = getWorkList(getWorkList);
        return worksList;
    }


    /**
     * 根据传承人id查询代表作品列表
     * @param ichMasterId
     * @return
     */
    public List<Works> getWorksByIchMasterId(Long ichMasterId){
        Works works = new Works();
        works.setIchMasterId(ichMasterId);
        works.setIsRepresent(0);
        List<Works> getWorkList = worksMapper.selectWorks(works);
        List<Works> worksList = getWorkList(getWorkList);
        return worksList;
    }

    private List<Works> getWorkList(List<Works> worksList){
        for (Works works:worksList) {
            ContentFragment con = new ContentFragment();
            con.setTargetId(works.getId());
            con.setTargetType(2);
            List<ContentFragment> contentFragments = contentFragmentMapper.selectByTargetIdAndType(con);
            for (ContentFragment contentFragment :contentFragments) {
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
            works.setContentFragmentList(contentFragments);
        }
        return worksList;
    }
}
