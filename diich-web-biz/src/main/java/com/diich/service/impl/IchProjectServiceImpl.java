package com.diich.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.base.BaseModel;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.*;
import com.diich.core.util.BuildHTMLEngine;
import com.diich.core.util.FileType;
import com.diich.core.util.PropertiesUtil;
import com.diich.mapper.*;
import org.apache.commons.collections.map.HashedMap;
import org.apache.ibatis.session.SqlSessionFactory;
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
@Transactional
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
    private IchCategoryService ichCategoryService;
    @Autowired
    private IchMasterMapper ichMasterMapper;
    @Autowired
    private WorksMapper worksMapper;
    @Autowired
    private IchMasterService ichMasterService;
    @Autowired
    private WorksService worksService;
    @Autowired
    private DictionaryService dictionaryService;
    @Autowired
    private  ResourceMapper resourceMapper;
    @Autowired
    private VersionService versionService;
    @Autowired
    private SqlSessionFactory sqlSessionFactory;

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
            //根据id和targetType查询中间表看是否有对应的版本
            Version version = null;
            if("chi".equals(ichProject.getLang())){
                version = versionService.getVersionByLangIdAndTargetType(Long.valueOf(id), null, 0);
            }
            if("eng".equals(ichProject.getLang())){
                version = versionService.getVersionByLangIdAndTargetType(null, Long.valueOf(id),0);
            }
            ichProject.setVersion(version);
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

        List<IchProject> ichProjectList = null;
        try {
            Map<String, Object> condition = page.getCondition();
            if(condition == null){
                condition = new HashMap<>();
            }
            ichProjectList = ichProjectMapper.selectIchProjectList(page,condition);

            for (IchProject ichProject:ichProjectList) {

                //获取传承人列表
                List<IchMaster> ichMasterList = ichMasterService.getIchMasterByIchProjectId(ichProject.getId());

                ichProject.setIchMasterList(ichMasterList);
                //代表作品列表
                List<Works> worksList =worksService.getWorksByIchProjectId(ichProject.getId());

                ichProject.setWorksList(worksList);
                //根据id和targetType查询中间表看是否有对应的版本
                Version version = null;
                if("chi".equals(ichProject.getLang())){
                    version = versionService.getVersionByLangIdAndTargetType(ichProject.getId(), null, 0);
                }
                if("eng".equals(ichProject.getLang())){
                    version = versionService.getVersionByLangIdAndTargetType(null, ichProject.getId(),0);
                }
                ichProject.setVersion(version);

                //获取项目的field
                List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
                ichProject.setContentFragmentList(contentFragmentList);

            }
            return ichProjectList;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);

        }
    }


    /**
     * 保存或更新项目信息
     * @param ichProject
     * @throws Exception
     */
    @Transactional
    public IchProject saveIchProject(IchProject ichProject) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();

        try {
            String templateName ="pro.ftl";//模板名
            String fileName = PropertiesUtil.getString("freemarker.projectfilepath")+"/"+ichProject.getId();//静态页面生成路径和名称
            if(ichProject.getId() == null) {
                long proID = IdWorker.getId();
                ichProject.setId(proID);
                fileName = PropertiesUtil.getString("freemarker.projectfilepath")+"/"+proID;
                ichProject.setStatus(0);
                ichProject.setUri(proID +".html");
                ichProjectMapper.insertSelective(ichProject);
                List<ContentFragment> ls = ichProject.getContentFragmentList();
                if(ls !=null && ls.size()>0){
                    for(int i=0;i<ls.size();i++){
                        ContentFragment c = ls.get(i);
                        saveContentFragment(c,proID);
                    }
                }

            } else {
                ichProject.setUri(ichProject.getId() +".html");
                ichProjectMapper.updateByPrimaryKeySelective(ichProject);
                List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
                if (contentFragmentList !=null && contentFragmentList.size()>0){
                    for (ContentFragment contentFragment: contentFragmentList) {
                        if(contentFragment.getId()==null){
                            //新增内容片断
                            saveContentFragment(contentFragment,ichProject.getId());
                        }else{//更新内容片断

                            contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                            List<Resource> resourceList = contentFragment.getResourceList();
                            if(resourceList != null && resourceList.size()>0){
                                saveResource(resourceList,contentFragment.getId());
                            }
                        }
                    }
                }

            }
            List<Works> worksList = ichProject.getWorksList();
            if(worksList !=null && worksList.size()>0){
                for (Works works: worksList) {
                    works.setIchProjectId(ichProject.getId());
                    worksService.saveWorks(works);
                }
            }
            //生成静态页面
            String uri = buildHTML(templateName, ichProject, fileName);
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return ichProject;
    }

    /**
     *  根据传承人或者作品信息查询项目
     * @param id
     * @return
     */
    public IchProject getIchProjectById(Long id) throws Exception {
        //所属项目
        IchProject ichProject = ichProjectMapper.selectByPrimaryKey(id);
        if (ichProject != null) {
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

    @Override
    public List<Map> getIchProjectByName(Map<String,Object> map) throws Exception {

       List<Map> ls = ichProjectMapper.selectIchProjectByName(map);

       List<Map> result = new ArrayList<Map>();

       for(int i=0;i<ls.size();i++){
           Map<String,Object> resultMap = new HashMap<String,Object>();

           Long id= (Long)ls.get(i).get("id");
           resultMap.put("id",id);
           resultMap.put("name",ls.get(i).get("name"));
           String lang = ls.get(i).get("lang").toString();


            //获取项目分类
           Long categoryID = (Long)ls.get(i).get("ichCategoryId");
           if(categoryID != null){
               IchCategory category = ichCategoryService.getCategoryById(categoryID);
               if(category != null){
                   resultMap.put("category",category.getName());
               }
           }

           List<ContentFragment> cs = contentFragmentMapper.selectByProjectId(id);

           for(int j=0;j<cs.size();j++){
               //获取项目名
               ContentFragment c= cs.get(j);
               Attribute a = attributeMapper.selectByPrimaryKey(c.getAttributeId());
              /*  if(c.getAttributeId()==4){
                    resultMap.put("name",c.getContent());
                }*/
                //获取项目题图
                if(c.getAttributeId()==1){
                    String content = c.getContent();
                    if(content!= null){
                        Resource r = resourceMapper.selectByContentFramentID(Long.parseLong(content));
                        resultMap.put("img",r.getUri());
                    }
                }
                //获取区域地址
               if(a.getDataType()==101){
                   String content = c.getContent();
                   if(content!= null){
                       String dis =  dictionaryService.getTextByTypeAndCode(a.getDataType(),c.getContent(),lang);
                       resultMap.put("dis",dis);
                   }
               }

           }
           result.add(resultMap);
       }

        return result;
    }

    private List<ContentFragment> getContentFragmentListByProjectId(IchProject ichProject) throws Exception {
        ContentFragment c = new ContentFragment();
        c.setTargetId(ichProject.getId());
        c.setTargetType(0);//标示项目
        List<ContentFragment> ls =  contentFragmentMapper.selectByTargetIdAndType(c);
        for(int i=0;i<ls.size();i++) {
            Attribute attribute = attributeMapper.selectByPrimaryKey(ls.get(i).getAttributeId());
            ls.get(i).setAttribute(attribute);
            Long contentFragmentId = ls.get(i).getId();
            List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragmentId);
            List<Resource> resourceList = new ArrayList<>();
            for (ContentFragmentResource contentFragmentResource : contentFragmentResourceList) {
                Resource resource = resourceMapper.selectByPrimaryKey(contentFragmentResource.getResourceId());
                if(resource !=null){
                    resourceList.add(resource);
                }

            }
            ls.get(i).setResourceList(resourceList);
        }
        return ls;
    }

    /**
     * 增加contentFragment
     * @param c
     */
    private void saveContentFragment(ContentFragment c,Long proID) throws Exception{
        Long attributeId = c.getAttributeId();
        if(attributeId == 0 || attributeId == null){
            Attribute attribute = c.getAttribute();
            attributeId = IdWorker.getId();
            attribute.setId(attributeId);
            attribute.setDataType(5);
            attribute.setTargetType(0);
            attribute.setStatus(0);
            attribute.setIsOpen(1);
            attribute.setPriority(99);
            attributeMapper.insertSelective(attribute);
        }
        c.setAttributeId(attributeId);
        c.setId(IdWorker.getId());
        c.setTargetId(proID);
        c.setTargetType(0);
        c.setStatus(0);
        contentFragmentMapper.insertSelective(c);
        List<Resource> resourceList = c.getResourceList();
        if(resourceList != null && resourceList.size()>0){
            saveResource(resourceList,c.getId());
        }
    }

    /**
     * 保存资源文件
     * @param resList
     * @param cId
     */
    private void saveResource(List<Resource> resList,Long cId) throws Exception{
        for(int i = 0; i<resList.size();i++){
            Resource resource = resList.get(i);
            Long resourceId = resource.getId();
            if(resourceId == null){
                resourceId = IdWorker.getId();
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
                if(resource.getResOrder() !=null && !"".equals(resource.getResOrder())){
                    cfr.setResOrder(resource.getResOrder());
                }else{
                    cfr.setResOrder(i+1);
                }
                cfr.setStatus(0);
                //保存中间表
                contentFragmentResourceMapper.insertSelective(cfr);
            }else{
                //更新资源文件
               resourceMapper.updateByPrimaryKeySelective(resource);

            }
        }

    }
}
