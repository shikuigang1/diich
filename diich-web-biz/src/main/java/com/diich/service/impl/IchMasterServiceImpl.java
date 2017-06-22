package com.diich.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.DictionaryService;
import com.diich.core.service.IchMasterService;
import com.diich.core.service.IchProjectService;
import com.diich.core.service.WorksService;
import com.diich.core.util.BuildHTMLEngine;
import com.diich.core.util.FileType;
import com.diich.core.util.PropertiesUtil;
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
    @Autowired
    private DictionaryService dictionaryService;

    /**
     * 根据id查询传承人
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public IchMaster getIchMaster(String id) throws Exception{

        IchMaster ichMaster =null;
        try{
            ichMaster = ichMasterMapper.selectByPrimaryKey(Long.parseLong(id));
            if(ichMaster !=null){
                //所属项目
                IchProject ichProject = ichProjectService.getIchProjectById(ichMaster.getIchProjectId());
                ichMaster.setIchProject(ichProject);
                //最后编辑者
//                User user = userMapper.selectByPrimaryKey(ichMaster.getLastEditorId());
//                if(user !=null){
//                    ichMaster.setUser(user);
//                }
                //作品列表
                List<Works> worksList =worksService.getWorksByIchMasterId(ichMaster.getId());
                ichMaster.setWorksList(worksList);
                //内容片断列表
                List<ContentFragment> contentFragmentList = getContentFragmentListByMasterId(ichMaster);
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
    @Override
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
                //作品列表
                List<Works> worksList =worksService.getWorksByIchMasterId(ichMaster.getId());
                ichMaster.setWorksList(worksList);
                //内容片断列表
                List<ContentFragment> contentFragmentList = getContentFragmentListByMasterId(ichMaster);
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
    @Override
    public void saveIchMaster(IchMaster ichMaster) throws ApplicationException {
        TransactionStatus transactionStatus = getTransactionStatus();

        try {
            String templateName = "master.ftl";//模板名
            String filename = PropertiesUtil.getString("freemarker.masterfilepath") +"/"+ ichMaster.getId();//生成静态页面的路径名称
            if(ichMaster.getId() == null) {
                long id = IdWorker.getId();
                ichMaster.setId(id);
                filename = PropertiesUtil.getString("freemarker.masterfilepath") +"/"+ id;
                ichMaster.setStatus(0);
                ichMaster.setUri(id + ".html");
                ichMasterMapper.insertSelective(ichMaster);
                List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
                if(contentFragmentList != null && contentFragmentList.size()>0){
                    for (ContentFragment contentFragment: contentFragmentList) {
                        //添加内容片断
                        saveContentFragment(contentFragment,id);
                    }
                }

            } else {
                ichMaster.setUri(ichMaster.getId() +".html");
                ichMasterMapper.updateByPrimaryKeySelective(ichMaster);
                List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
                if(contentFragmentList != null && contentFragmentList.size()>0){
                    for (ContentFragment contentFragment: contentFragmentList) {
                        if(contentFragment.getId() == null){
                            //添加
                            saveContentFragment(contentFragment,ichMaster.getId());
                        }else{
                            //更新
                            contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                            List<Resource> resourceList = contentFragment.getResourceList();
                            if(resourceList != null && resourceList.size()>0){
                                for (Resource resource:resourceList) {
                                    if(resource.getId() == null){
                                        //添加
                                        saveResource(resource,contentFragment.getId());
                                    }else{
                                        //更新
                                        resourceMapper.updateByPrimaryKeySelective(resource);
                                    }
                                }
                            }
                        }
                    }
                }

            }
            List<Works> worksList = ichMaster.getWorksList();
            if(worksList !=null && worksList.size()>0){
                for (Works works : worksList) {
                    works.setIchMasterId(ichMaster.getId());
                    worksService.saveWorks(works);
                }
            }
            //根据项目id查询项目信息
            if(ichMaster.getIchProjectId() != null){
                IchProject ichProject = ichProjectService.getIchProjectById(ichMaster.getIchProjectId());
                ichMaster.setIchProject(ichProject);
            }
            //生成静态页面
            String uri = buildHTML(templateName, ichMaster, filename);
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
    public List<IchMaster> getIchMasterByIchProjectId(Long ichProjectId) throws Exception {
        List<IchMaster> ichMasterList = ichMasterMapper.selectByIchProjectId(ichProjectId);
        for (IchMaster ichMaster:ichMasterList) {
            List<ContentFragment> contentFragmentList = getContentFragmentListByMasterId(ichMaster);
            ichMaster.setContentFragmentList(contentFragmentList);
        }
        return ichMasterList;
    }

    /**
     * 根据作品获取传承人信息
     * @param works
     * @return
     */
    public IchMaster getIchMasterByWorks(Works works) throws Exception {
        //所属传承人
        IchMaster ichMaster = ichMasterMapper.selectByPrimaryKey(works.getIchMasterId());
        if (ichMaster != null) {
            //内容片断列表
            List<ContentFragment> contentFragmentList = getContentFragmentListByMasterId(ichMaster);
            ichMaster.setContentFragmentList(contentFragmentList);
        }
        return ichMaster;
    }

    private List<ContentFragment> getContentFragmentListByMasterId(IchMaster ichMaster) throws Exception {
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
                if(resource!=null){
                    resourceList.add(resource);
                }

            }
            contentFragment.setResourceList(resourceList);
        }
        return contentFragmentList;
    }

    /**
     * 填加contentFragment
     * @param c
     */
    private void saveContentFragment(ContentFragment c,Long id) throws Exception{
        Long attributeId = c.getAttributeId();
        if(attributeId == 0 || attributeId == null){
            Attribute attribute = c.getAttribute();
            attributeId = IdWorker.getId();
            attribute.setId(attributeId);
            attribute.setDataType(5);
            attribute.setTargetType(1);
            attribute.setStatus(0);
            attribute.setIsOpen(1);
            attribute.setPriority(99);
            attributeMapper.insertSelective(attribute);
        }
        c.setAttributeId(attributeId);
        c.setId(IdWorker.getId());
        c.setTargetId(id);
        c.setTargetType(1);
        c.setStatus(0);
        contentFragmentMapper.insertSelective(c);
        List<Resource> resourceList = c.getResourceList();
        if(resourceList != null && resourceList.size()>0){
            for (Resource resource: resourceList ) {
                saveResource(resource,c.getId());
            }
        }
    }
    /**
     * 保存资源文件
     * @param resource
     * @param cId
     */
    private void saveResource(Resource resource,Long cId) throws Exception{

        Long resourceId = IdWorker.getId();
        resource.setId(resourceId);
        resource.setStatus(0);
        //判断上传的文件类型 0图片 1 视频 2 音频
        String sType = FileType.fileType(resource.getUri());
        if("图片".equals(sType)){
            resource.setType(0);
        }
        if("视频".equals(sType)){
            resource.setType(1);
        }
        //保存resource
        resourceMapper.insertSelective(resource);
        ContentFragmentResource cfr = new ContentFragmentResource();
        cfr.setId(IdWorker.getId());
        cfr.setContentFragmentId(cId);
        cfr.setResourceId(resourceId);
        cfr.setStatus(0);
        //保存中间表
        contentFragmentResourceMapper.insertSelective(cfr);
    }

    /**
     * 将content的code转换为name
     * @param cfList
     * @return
     */
    private List<ContentFragment> getContentFragment(List<ContentFragment> cfList,String lang) throws Exception {
        for (ContentFragment contentFragment : cfList) {
            Attribute attribute = contentFragment.getAttribute();
            if(attribute.getDataType()>100){
                if(contentFragment.getContent() == null ){
                    continue;
                }
                String[] arrs= contentFragment.getContent().split(",");
                String name ="";
                for (String arr: arrs) {
                    name = dictionaryService.getTextByTypeAndCode(attribute.getDataType(), arr,lang);
                    name +=";";
                }
                name = name.substring(0,name.length()-1);
                contentFragment.setContent(name);
            }
        }
        return cfList;
    }
}
