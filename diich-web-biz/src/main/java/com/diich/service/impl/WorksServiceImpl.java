package com.diich.service.impl;

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


    /**
     * 根据项目id获取作品列表
     * @param ichProjectId
     * @return
     */
    public List<Works> getWorksByIchProjectId(Long ichProjectId){
        List<Works> getWorkList = worksMapper.selectByIchProjectId(ichProjectId);
        List<Works> worksList = getWorkList(getWorkList);
        return worksList;
    }


    /**
     * 根据传承人id查询作品列表
     * @param ichMasterId
     * @return
     */
    public List<Works> getWorksByIchMasterId(Long ichMasterId){
        List<Works> getWorkList = worksMapper.selectByIchMasterId(ichMasterId);
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
