package com.diich.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.baomidou.mybatisplus.toolkit.StringUtils;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.*;
import com.diich.core.util.BuildHTMLEngine;
import com.diich.core.util.FileType;
import com.diich.core.util.PropertiesUtil;
import com.diich.mapper.*;
import org.apache.commons.collections.map.HashedMap;
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
    private ResourceService resourceService;
    @Autowired
    private ContentFragmentService contentFragmentService;

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

                ichMaster = getIchMaster(ichMaster);//返回前端需要的特定数据

            }
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return  ichMaster;
    }

    @Override
    public IchMaster getIchMasterById(Long id) throws Exception {
        IchMaster ichMaster =null;
        try{
            ichMaster = ichMasterMapper.selectByMasterById(id);
            if(ichMaster != null){
                //内容片断列表
                List<ContentFragment> contentFragmentList = getContentFragmenByMasterId(ichMaster);
                ichMaster.setContentFragmentList(contentFragmentList);
            }
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return ichMaster;
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

                ichMaster = getIchMaster(ichMaster);//返回前端需要的特定数据
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
        checkIchMaster(ichMaster);//校验传承人信息
        try {
            saveMaster(ichMaster);
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return ichMaster;
    }

    private IchMaster saveMaster(IchMaster ichMaster)throws Exception{
        if(StringUtils.isEmpty(ichMaster.getLang())){
            ichMaster.setLang("chi");
        }
        if(ichMaster.getIsMaster() == 1){//1 为自己申报传承人 将当前登陆用户id存入userId  0 不为自己申报传承人 不作处理
            ichMaster.setUserId(ichMaster.getLastEditorId());
        }
        if(ichMaster.getId() == null) {
            long id = IdWorker.getId();
            ichMaster.setId(id);
            ichMaster.setUri(id + ".html");
            ichMasterMapper.insertSelective(ichMaster);
        } else {
            ichMaster.setUri(ichMaster.getId() +".html");
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
        List<Works> worksList = ichMaster.getWorksList();
        if(worksList !=null && worksList.size()>0){
            for (Works works : worksList) {
                works.setIchMasterId(ichMaster.getId());
                worksService.saveWorks(works);
            }
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
        IchMaster ichMaster = getIchMasterById(id);
        getIchMaster(ichMaster);//返回前端需要的特定数据
        String fileName = PropertiesUtil.getString("freemarker.masterfilepath")+"/"+ichMaster.getId().toString();
        String uri = buildHTML("master.ftl", ichMaster, fileName);
        return uri;
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
            List<ContentFragment> contentFragmentList = getContentFragmenByMasterId(ichMaster);
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
        contentFragmentList = getContentFragmentList(contentFragmentList);
        return contentFragmentList;
    }

    private List<ContentFragment> getContentFragmenByMasterId(IchMaster ichMaster) throws Exception {
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
    private IchMaster getIchMaster(IchMaster ichMaster) throws Exception{
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
        ichMaster.setJson(JSONObject.toJSON(list).toString());
        ichMaster.setJsonAll(JSONObject.toJSON(allMap).toString());
        ichMaster.setJsonHead(JSONObject.toJSON(headMap).toString());
        return ichMaster;
    }

    /**
     * 校验字段
     * @param ichMaster
     * @throws Exception
     */
    private void checkIchMaster(IchMaster ichMaster) throws Exception {
        List<ContentFragment> contentFragmentList = ichMaster.getContentFragmentList();
        List<String> list = new ArrayList<>();
        for (ContentFragment contentFragment:contentFragmentList) {
            if(contentFragment.getAttributeId() != 0){
                continue;
            }
            //检查当前传承人自定义属性是否已存在
            checkDefineField(contentFragment,list);
            list.add(contentFragment.getAttribute().getCnName());
        }
        if(ichMaster.getStatus() == 2){//保存 校验字段是否符合条件
            for (ContentFragment contentFragment:contentFragmentList){
                if(contentFragment.getAttributeId()==0){
                    continue;
                }
                checkSaveField(contentFragment);
            }
        }
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
     * 根据属性名称检查当前传承人自定义属性是否存在
     * @param contentFragment
     */
    private void checkDefineField(ContentFragment contentFragment,List<String> list) throws Exception{
        Map map = new HashMap();
        Attribute attribute = contentFragment.getAttribute();
        String cnName = attribute.getCnName();
        //判断是否重名
        if(list.contains(cnName)){//自定义字段之间是否相互重名
            throw new ApplicationException(ApplicationException.PARAM_ERROR);
        }
        //根据属性名称和targetType查询attribute表中是否存在该属性
        map.put("cnName",cnName);
        map.put("targetType",1);
        List<Attribute> attributeList = null;
        try{
            attributeList = attributeMapper.selectAttrByNameAndTargetType(map);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        if(attributeList.size()>0){
            throw new ApplicationException(ApplicationException.PARAM_ERROR);
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
            if(attribute.getMaxLength() != null){
                if(contentFragment.getContent() !=null && contentFragment.getContent().length() > attribute.getMaxLength()){
                    throw  new ApplicationException(ApplicationException.PARAM_ERROR,attribute.getCnName().toString()+" 字段不符合要求");
                }
            }
            if(attribute.getMinLength() > 0){//检查必填项是否已填
                if(contentFragment.getAttributeId() != attribute.getId()){
                    continue;
                }
                String content = contentFragment.getContent();
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

    /**
     * 保存时对字段的校验 传承人
     * @param contentFragment
     * @throws Exception
     */
    private void checkSaveField(ContentFragment contentFragment) throws Exception {
        Long attributeId = contentFragment.getAttributeId();
        if(attributeId != null){
            Attribute attribute = null;
            try{
                attribute = attributeMapper.selectByPrimaryKey(attributeId);
            }catch (Exception e){
                e.printStackTrace();
                throw new ApplicationException(ApplicationException.INNER_ERROR);
            }

            if(attribute.getMinLength() != null){
                String content = contentFragment.getContent();
                if(content == null || (content.length() < attribute.getMinLength())){
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString()+" 字段不符合要求");
                }
            }
            if(attribute.getMaxLength() != null){
                String content = contentFragment.getContent();
                if(content != null && content.length() > attribute.getMaxLength()){
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString()+" 字段不符合要求");
                }
            }
        }
    }
}
