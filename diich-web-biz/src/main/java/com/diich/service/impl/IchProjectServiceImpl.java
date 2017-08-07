package com.diich.service.impl;

import com.alibaba.fastjson.JSONObject;
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
import org.apache.commons.collections.map.HashedMap;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    private ContentFragmentService contentFragmentService;
    @Autowired
    private ContentFragmentResourceMapper contentFragmentResourceMapper;
    @Autowired
    private IchCategoryService ichCategoryService;
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
    private VersionMapper versionMapper;
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
            //根据id和targetType和versionType查询中间表看是否有对应的版本
            List<Version> versionList = null;
            if("chi".equals(ichProject.getLang())){
                versionList = versionService.getVersionByLangIdAndTargetType(ichProject.getId(), null, 0, 0);
            }
            if("eng".equals(ichProject.getLang())){
                versionList = versionService.getVersionByLangIdAndTargetType(null, ichProject.getId(), 0, 0);
            }
            if(versionList.size()>0){
                ichProject.setVersion( versionList.get(0));
            }
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
                //根据id和targetType和versionType查询中间表看是否有对应的版本
                List<Version> versionList = null;
                if("chi".equals(ichProject.getLang())){
                    versionList = versionService.getVersionByLangIdAndTargetType(ichProject.getId(), null, 0, 0);
                }
                if("eng".equals(ichProject.getLang())){
                    versionList = versionService.getVersionByLangIdAndTargetType(null, ichProject.getId(), 0, 0);
                }
                if(versionList.size()>0){
                    ichProject.setVersion( versionList.get(0));
                }
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
     * 录入时保存或更新项目信息
     * @param ichProject  status = 3 提交
     * @throws Exception
     */
    @Transactional
    public IchProject saveIchProject(IchProject ichProject) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        //根据项目名称查询项目是否存在
        checkProjectByName(ichProject);
        if(ichProject.getStatus() != null && ichProject.getStatus() == 3){
            //查询自定义字段是否在本项目存在
            checkAttribute(ichProject,3);
        }
        try {
            User user = userMapper.selectByPrimaryKey(ichProject.getLastEditorId());
            ichProject.setLastEditDate(new Date());
            if(ichProject.getStatus() != null && ichProject.getStatus() == 3){
                if(user != null && user.getType() == 0){//如果当前修改者不是admin type 代表权限 0 代表admin  1代表普通用户
                    ichProject.setStatus(0);
                }
                ichProjectMapper.updateByPrimaryKeySelective(ichProject);
            }else {
                saveProject(ichProject,user);//保存项目
            }
            commit(transactionStatus);
        } catch (Exception e) {
            e.printStackTrace();
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return ichProject;
    }


    private IchProject saveProject(IchProject ichProject ,User user) throws Exception{
        if(StringUtils.isEmpty(ichProject.getLang())){
            ichProject.setLang("chi");
        }
        if(ichProject.getId() == null) {//保存
            long proID = IdWorker.getId();
            ichProject.setId(proID);
            ichProject.setStatus(2);
            ichProject.setUri(proID +".html");
            ichProjectMapper.insertSelective(ichProject);
        } else {//修改
            IchProject selectProject = ichProjectMapper.selectIchProjectById(ichProject.getId());
            if( (user != null && user.getType() !=0) && (!ichProject.getLastEditorId().equals(selectProject.getLastEditorId()) || ichProject.getStatus()==0)){//当前编辑者(非管理员)是发生了改变
                return updateProject(ichProject);
            }
            checkIchCat(ichProject);//判断分类是否发生改变
            ichProjectMapper.updateByPrimaryKeySelective(ichProject);
        }
        List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
        if (contentFragmentList !=null && contentFragmentList.size()>0){
            for (ContentFragment contentFragment: contentFragmentList) {
                contentFragment.setTargetId(ichProject.getId());
                //新增内容片断
                contentFragmentService.saveContentFragment(contentFragment);
            }
        }
        return ichProject;
    }

    private void checkIchCat(IchProject ichProject)throws Exception{
        Long id = ichProject.getId();
        IchProject project = ichProjectMapper.selectIchProjectById(id);
        Long ichCategoryId = project.getIchCategoryId();
        if(!ichProject.getIchCategoryId().equals(ichCategoryId)){//修改了分类,删除原来分类的项目时间内容
            List<Attribute> attributeList = ichCategoryService.getAttrListByCatIdAndTarType(ichCategoryId, 0);
            for (Attribute attribute:attributeList) {
                contentFragmentService.deleteContentFragmentByAttrIdAndTargetId(id, 0, attribute.getId());
            }
        }
    }
    /**
     * 如果修改人不同就另存版本
     * @param ichProject
     * @return
     * @throws Exception
     */
    private IchProject updateProject(IchProject ichProject) throws Exception{
        Long mainId = ichProject.getId();
        long branchId = IdWorker.getId();
        ichProject.setId(branchId);
        ichProject.setStatus(2);
        ichProject.setUri(branchId+".html");
        ichProjectMapper.insertSelective(ichProject);
        List<ContentFragment> ichProjectContentFragmentList = ichProject.getContentFragmentList();
        if(ichProjectContentFragmentList != null && ichProjectContentFragmentList.size()>0){
            for (ContentFragment contentFragment : ichProjectContentFragmentList) {
                contentFragment.setId(null);
                contentFragment.setTargetId(branchId);
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
        version.setTargetType(0);
        version.setMainVersionId(mainId);
        version.setBranchVersionId(branchId);
        version.setVersionType(1000);//版本  修改中, 已过期
        versionService.save(version);

        return ichProject;
    }
    @Override
    public IchProject getIchProjectByIdAndIUser(Long id, User user) throws Exception {
        if(user.getType() != null && user.getType() == 0){//是管理员
            return getIchProject(String.valueOf(id));
        }
        List<Version> versionList = versionService.getVersionByLangIdAndTargetType(id, null, 0, 1000);
        if(versionList.size()>0){
            List tempList = new ArrayList();
            for(Version version : versionList){
                tempList.add(version.getBranchVersionId());
            }
            List<IchProject> ichProjectList = ichProjectMapper.selectIchProjectByUserId(user.getId());
            for (IchProject ichProject : ichProjectList) {
                Long ichProjectId = ichProject.getId();
                if(tempList.contains(ichProjectId)){
                    List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
                    ichProject.setContentFragmentList(contentFragmentList);
                    return ichProject;
                }
            }
        }
        return getIchProjectById(id);
    }
    /**
     *  根据项目id查询项目信息 status 不做限制
     * @param id
     * @return
     */
    @Override
    public IchProject getIchProjectById(Long id) throws Exception {
        //所属项目
        IchProject ichProject = ichProjectMapper.selectIchProjectById(id);
        if (ichProject != null) {
            //内容片断列表
            List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
            ichProject.setContentFragmentList(contentFragmentList);
        }
        return ichProject;
    }

    /**
     * 预览
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public String preview(Long id) throws Exception {
        IchProject ichProject = getIchProjectById(id);
        String fileName = PropertiesUtil.getString("freemarker.projectfilepath")+"/"+ichProject.getId().toString();
        String uri = buildHTML("pro.ftl", ichProject, fileName);
        return uri;
    }

    /**
     * 个人中心
     * @param params
     * @return
     * @throws Exception
     */
    @Override
    public Page<IchProject> getIchProjectByUserId(Map<String, Object> params) throws Exception {
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
        Page<IchProject> page = new Page();
        try{
            List<IchProject> ichProjectList = ichProjectMapper.selectIchProjectByUserAndStatus(params,rowBounds);
            for (IchProject ichProject : ichProjectList) {
                List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
                ichProject.setContentFragmentList(contentFragmentList);
            }
            //查询数量
            int total = ichProjectMapper.selectIchProjectCountByUserAndStatus(params);
            page.setRecords(ichProjectList);
            page.setTotal(total);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return page;
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
        Map map = getJson(ichProject);//返回前端需要的特定数据
        String uri = BuildHTMLEngine.buildHTML(templateName, ichProject,map, fileName);
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
                if(c.getAttributeId()==4){
                    resultMap.put("name",c.getContent());
                }
                //获取项目题图
                if(c.getAttributeId()==1){

                        Resource r = resourceMapper.selectByContentFramentID(c.getId());
                        if(r != null){
                            resultMap.put("img",r.getUri());
                        }


                }
                //获取区域地址
               if(a!=null && a.getDataType()==101){
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

    @Override
    public void audit(Long id, User user) throws Exception {

    }

    /**
     * 假删
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public int deleteIchProject(Long id) throws Exception {
        int i = -1;
        try{
            IchProject ichProject = ichProjectMapper.selectIchProjectById(id);
            ichProject.setStatus(1);
            ichProject.setLastEditDate(new Date());
            i = ichProjectMapper.updateByPrimaryKeySelective(ichProject);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return i;
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
                    if (resource != null) {
                        resource.setResOrder(contentFragmentResource.getResOrder());
                        resourceList.add(resource);
                    }
                }
                ls.get(i).setResourceList(resourceList);
            }
        return ls;
    }

    /**
     * 获取前端所需要的资源数据
     * @param ichProject
     * @return
     */
    private Map getJson(IchProject ichProject) throws Exception{

        //list用于向前端传输按模块划分的图片资源   用于显示在详情页特定模块的资源
        List<Map<String,Object>> list = new ArrayList<>();
        //allMap 所有去除重复图片和视频后的资源容器  用于显示在详情页得查看所有图片
        Map<String,Object> allMap = new HashedMap();
        Map<String,Object> headMap = new HashedMap();//放公共数据
        Set<Resource> imgdist = new HashSet<>();//去重后的所有图片集合
        Set<Resource> videosdist = new HashSet<>();//去重后的所有视频集合
        List<ContentFragment> ContentFragmentList = ichProject.getContentFragmentList();
        for (ContentFragment contentFragment:ContentFragmentList) {
            Map<String, Object> map = new HashMap<>();//存放每个模块的图片和视频
            List<Resource> img = new ArrayList<>();//图片资源文件的集合
            List<Resource> video = new ArrayList<>();//视频资源文件的集合
            Long contentFragmentId = contentFragment.getId();
            List<Resource> resourceList = contentFragment.getResourceList();
            if(resourceList !=null && resourceList.size()>0){
                for (Resource resource:resourceList) {
                    if (resource.getType() == 0) {
                        img.add(resource);
                        if(contentFragment.getAttributeId()!=112){//头图不放到所有图片中
                            imgdist.addAll(img);
                        }else{
                            headMap.put("headImage",img);
                        }
                    }
                    if (resource.getType() == 1) {
                        video.add(resource);
                        videosdist.addAll(video);
                    }
                }
            }
            map.put("contentFragmentId", contentFragmentId);
            map.put("imgs", img);
            map.put("videos", video);
            if("chi".equals(ichProject.getLang())){
                if(contentFragment.getAttributeId()==4){
                    headMap.put("projectName",contentFragment.getContent());
                }
            }
            if("eng".equals(ichProject.getLang())){
                if(contentFragment.getAttributeId()==5){
                    headMap.put("projectName",contentFragment.getContent());
                }
            }

            list.add(map);
        }
        allMap.put("imgs",imgdist);
        allMap.put("videos",videosdist);
        headMap.put("lang",ichProject.getLang());
        Map map = new HashMap();
        map.put("json",JSONObject.toJSON(list).toString());
        map.put("jsonAll",JSONObject.toJSON(allMap).toString());
        map.put("jsonHead",JSONObject.toJSON(headMap).toString());
        return map;
    }

    /**
     * 根据项目名称查询项目是否存在
     * @param ichProject
     * @throws Exception
     */
    private void checkProjectByName(IchProject ichProject) throws Exception{
        List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
        List<ContentFragment> contentFragments = null;
        for (ContentFragment contentFragment:contentFragmentList) {
            if(contentFragment.getAttributeId() !=4){
                continue;
            }else{
                contentFragments = contentFragmentMapper.selectByAttIdAndContent(contentFragment);
                break;
            }
        }
        if(ichProject.getId() == null){
            if(contentFragments.size()>0){
                throw new ApplicationException(ApplicationException.PARAM_ERROR,contentFragments.get(0).getContent()+" 已经存在");
            }
        }
    }

    /**
     *  检查属性是否符合条件
     * @param ichProject
     */
    private void checkAttribute(IchProject ichProject,Integer status) throws Exception{
        List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
        if(status == 3){//提交
            List<Attribute> attributeList = null;
            try{
                //根据targetType获取属性列表
                Attribute attribute = new Attribute();
                attribute.setTargetType(0);
                attributeList = attributeMapper.selectAttrListByCatIdAndTarType(attribute);
            }catch (Exception e){
                e.printStackTrace();
                throw new ApplicationException(ApplicationException.INNER_ERROR);
            }

            for (Attribute attr :attributeList) {
                checkSubmitField(attr,contentFragmentList);
            }
        }
    }

    /**
     * 提交时对字段校验 项目
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
            if(attribute.getMaxLength() != null && (attribute.getId() == contentFragment.getAttributeId()) ){
                if(contentFragment.getContent() !=null && contentFragment.getContent().trim().length() > attribute.getMaxLength()){
                    throw  new ApplicationException(ApplicationException.PARAM_ERROR,attribute.getCnName().toString()+" 字段不符合要求");
                }
            }
            if((attribute.getMinLength() != null) && (attribute.getMinLength() > 0)){//检查必填项是否已填
                if(contentFragment.getAttributeId() != attribute.getId()){
                    continue;
                }
                String content = contentFragment.getContent();
                count ++;
                if(content == null || (content.trim().length() < attribute.getMinLength())){
                    throw new ApplicationException(ApplicationException.PARAM_ERROR,attribute.getCnName().toString()+" 字段不符合要求");
                }
            }
            if((attribute.getMinLength() != null) && (count == 0)){
                throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString()+" 字段不符合要求");
            }

        }
    }

}
