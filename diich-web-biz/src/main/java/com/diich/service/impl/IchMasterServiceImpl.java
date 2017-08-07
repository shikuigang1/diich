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
@Service("ichMasterService")
@Transactional
public class IchMasterServiceImpl extends BaseService<IchMaster> implements IchMasterService {

    @Autowired
    private IchMasterMapper ichMasterMapper;
    @Autowired
    private AttributeMapper attributeMapper;
    @Autowired
    private ContentFragmentMapper contentFragmentMapper;
    @Autowired
    private ContentFragmentResourceMapper contentFragmentResourceMapper;
    @Autowired
    private ResourceMapper resourceMapper;
    @Autowired
    private IchProjectService ichProjectService;
    @Autowired
    private WorksService worksService;
    @Autowired
    private ContentFragmentService contentFragmentService;
    @Autowired
    private VersionMapper versionMapper;
    @Autowired
    private UserMapper userMapper;

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
    public IchMaster saveIchMaster(IchMaster ichMaster) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        if(ichMaster.getStatus() != null && ichMaster.getStatus() == 3){
            checkIchMaster(ichMaster);//校验传承人信息
        }
        try {
            User user = userMapper.selectByPrimaryKey(ichMaster.getId());
            ichMaster.setLastEditDate(new Date());
            if(ichMaster.getStatus() != null && ichMaster.getStatus() == 3){
                if(user != null && user.getType() == 0){//如果当前修改者不是admin type代表权限  0 代表admin  1代表普通用户
                    ichMaster.setStatus(0);
                }
                ichMasterMapper.updateByPrimaryKeySelective(ichMaster);
            }else{
                saveMaster(ichMaster , user);
            }
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return ichMaster;
    }

    private IchMaster saveMaster(IchMaster ichMaster ,User user)throws Exception{
        if(StringUtils.isEmpty(ichMaster.getLang())){
            ichMaster.setLang("chi");
        }
        if(ichMaster.getIsMaster() == 1){//1 为自己申报传承人 将当前登陆用户id存入userId  0 不为自己申报传承人 不作处理
            ichMaster.setUserId(ichMaster.getLastEditorId());
        }
        if(ichMaster.getId() == null) {
            long id = IdWorker.getId();
            ichMaster.setId(id);
            ichMaster.setStatus(2);
            ichMaster.setUri(id + ".html");
            ichMasterMapper.insertSelective(ichMaster);
        } else {
            IchMaster master = ichMasterMapper.selectMasterById(ichMaster.getId());
            if( (user != null && user.getType() !=0) && (!ichMaster.getLastEditorId().equals(master.getLastEditorId()) || ichMaster.getStatus()==0)){//当前编辑者(非管理员)是发生了改变
                return updateMaster(ichMaster);
            }
            ichMasterMapper.updateByPrimaryKeySelective(ichMaster);
        }
        List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
        if(contentFragmentList != null && contentFragmentList.size()>0){
            for (ContentFragment contentFragment: contentFragmentList) {
                //添加内容片断
                contentFragment.setTargetId(ichMaster.getId());
                contentFragmentService.saveContentFragment(contentFragment);
            }
        }
        return ichMaster;
    }

    /**
     * 如果修改人不同就另存版本
     * @param ichMaster
     * @return
     * @throws Exception
     */
    private IchMaster updateMaster(IchMaster ichMaster) throws Exception{
        Long mainId = ichMaster.getId();
        long branchId = IdWorker.getId();
        ichMaster.setId(branchId);
        ichMaster.setStatus(2);
        ichMaster.setUri(branchId+".html");
        ichMasterMapper.insertSelective(ichMaster);
        List<ContentFragment> ichProjectContentFragmentList = ichMaster.getContentFragmentList();
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
        version.setId(IdWorker.getId());
        version.setStatus(0);
        version.setTargetType(1);
        version.setMainVersionId(mainId);
        version.setBranchVersionId(branchId);
        version.setVersionType(1000);//版本  修改中, 已过期
        versionMapper.insertSelective(version);
        return ichMaster;
    }

    /**
     * status 不做限制
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public IchMaster getIchMasterById(Long id) throws Exception {
        IchMaster ichMaster =null;
        try{
            ichMaster = ichMasterMapper.selectMasterById(id);
            if(ichMaster != null){
                //内容片断列表
                List<ContentFragment> contentFragmentList = getContentFragmentByMasterId(ichMaster);
                ichMaster.setContentFragmentList(contentFragmentList);
            }
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return ichMaster;
    }

    /**
     * 预览
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public String preview(Long id) throws Exception {
        try{
            IchMaster ichMaster = getIchMasterById(id);
            String fileName = PropertiesUtil.getString("freemarker.masterfilepath")+"/"+ichMaster.getId().toString();
            String uri = buildHTML("master.ftl", ichMaster, fileName);
            return uri;
        }catch (Exception e){
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
        try{
            Map map = getJson(ichMaster);
            String uri = BuildHTMLEngine.buildHTML(templateName, ichMaster,map, fileName);
            return uri;
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    @Override
    public IchMaster getIchMasterByIdAndUser(Long id, User user) throws Exception {
        if(user.getType() != null && user.getType() == 0){//是管理员
            return getIchMasterById(id);
        }
        Version version = new Version();
        version.setTargetType(1);
        version.setVersionType(1000);
        version.setMainVersionId(id);
        List<Version> versionList = versionMapper.selectVersionByLangIdAndTargetType(version);
        if(versionList.size()>0){
            List tempList = new ArrayList();
            for(Version ver : versionList){
                tempList.add(ver.getBranchVersionId());
            }
            List<IchMaster> ichMasterList = ichMasterMapper.selectIchMasterByUserId(user.getId());
            for (IchMaster ichMaster: ichMasterList) {
                if(tempList.contains(ichMaster.getId())){
                    List<ContentFragment> contentFragmentList = getContentFragmentByMasterId(ichMaster);
                    ichMaster.setContentFragmentList(contentFragmentList);
                    return ichMaster;
                }
            }
        }
        return getIchMasterById(id);
    }

    @Override
    public Page<IchMaster> getIchMasterByUserId(Map<String, Object> params) throws Exception {
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
        Page<IchMaster> page = new Page();
        try{
            List<IchMaster> ichMasterList = ichMasterMapper.selectIchMasterByUserAndStatus(params,rowBounds);
            for (IchMaster ichMaster : ichMasterList) {
                List<ContentFragment> contentFragmentList = getContentFragmentByMasterId(ichMaster);
                ichMaster.setContentFragmentList(contentFragmentList);
            }
            page.setRecords(ichMasterList);
            int total = ichMasterMapper.selectIchMasterCountByUserAndStatus(params);
            page.setTotal(total);//查询数量
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return page;
    }

    @Override
    public int deleteIchMaster(long id) throws Exception{
        int i = -1;
        try{
            IchMaster ichMaster = ichMasterMapper.selectMasterById(id);
            ichMaster.setStatus(1);
            ichMaster.setLastEditDate(new Date());
            i = ichMasterMapper.updateByPrimaryKeySelective(ichMaster);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return i;
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

    /**
     * 查出来的信息是用户公开的信息
     * @param ichMaster
     * @return
     * @throws Exception
     */
    private List<ContentFragment> getContentFragmentListByMasterId(IchMaster ichMaster) throws Exception {
        //内容片断列表
        ContentFragment con = new ContentFragment();
        con.setTargetId(ichMaster.getId());
        con.setTargetType(1);
        List<ContentFragment>  contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
        contentFragmentList = getContentFragmentList(contentFragmentList);
        return contentFragmentList;
    }
    /**
     * 查出来的信息是用户所有的信息
     * @param ichMaster
     * @return
     * @throws Exception
     */
    private List<ContentFragment> getContentFragmentByMasterId(IchMaster ichMaster) throws Exception {
        //内容片断列表
        ContentFragment con = new ContentFragment();
        con.setTargetId(ichMaster.getId());
        con.setTargetType(1);
        List<ContentFragment>  contentFragmentList = contentFragmentMapper.selectAllAttrByTargetIdAndType(con);
        contentFragmentList = getContentFragmentList(contentFragmentList);
        return contentFragmentList;
    }

    private List<ContentFragment> getContentFragmentList(List<ContentFragment>  contentFragmentList) throws Exception{
        for (ContentFragment contentFragment :contentFragmentList) {
            Long attrId = contentFragment.getAttributeId();
            Attribute attribute = attributeMapper.selectByPrimaryKey(attrId);
            contentFragment.setAttribute(attribute);//添加属性
            List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragment.getId());
            List<Resource> resourceList = new ArrayList<>();
            for (ContentFragmentResource contentFragmentResource: contentFragmentResourceList) {
                Resource resource = resourceMapper.selectByPrimaryKey(contentFragmentResource.getResourceId());
                if(resource!=null){
                    resource.setResOrder(contentFragmentResource.getResOrder());
                    resourceList.add(resource);
                }
            }
            contentFragment.setResourceList(resourceList);
        }
        return contentFragmentList;
    }
    /**
     * 获取前端所需要的资源数据
     * @param ichMaster
     * @return
     */
    private Map getJson(IchMaster ichMaster) throws Exception{
        //list用于向前端传输按模块划分的图片资源   用于显示在详情页特定模块的资源
        List<Map<String,Object>> list = new ArrayList<>();
        //allMap 所有去除重复图片和视频后的资源容器  用于显示在详情页得查看所有图片
        Map<String,Object> allMap = new HashedMap();
        Map<String,Object> headMap = new HashedMap();           //放公共数据
        Set<Resource> imgdist = new HashSet<>();                //去重后的所有图片集合
        Set<Resource> videosdist = new HashSet<>();              //去重后的所有视频集合
        List<ContentFragment> ContentFragmentList = ichMaster.getContentFragmentList();
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
                        if(contentFragment.getAttributeId()!=113){//头图不放到所有图片中
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
            if("chi".equals(ichMaster.getLang())){
                if(contentFragment.getAttributeId()==13){
                    headMap.put("masterName",contentFragment.getContent());
                }
            }
            if("eng".equals(ichMaster.getLang())){
                if(contentFragment.getAttributeId()==14){
                    headMap.put("masterName",contentFragment.getContent());
                }
            }

            list.add(map);
        }
        allMap.put("imgs",imgdist);
        allMap.put("videos",videosdist);
        headMap.put("lang",ichMaster.getLang());
        Map map = new HashMap();
        map.put("json",JSONObject.toJSON(list).toString());
        map.put("jsonAll",JSONObject.toJSON(allMap).toString());
        map.put("jsonHead",JSONObject.toJSON(headMap).toString());
        return map;
    }

    /**
     * 校验字段
     * @param ichMaster
     * @throws Exception
     */
    private void checkIchMaster(IchMaster ichMaster) throws Exception {
        List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
        if(ichMaster.getStatus() == 3){//提交
            List<Attribute> attributeList = null;
            try{
                //根据targetType获取属性列表
                Attribute attribute = new Attribute();
                attribute.setTargetType(1);
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
     * 提交时对字段校验 传承人
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
}
