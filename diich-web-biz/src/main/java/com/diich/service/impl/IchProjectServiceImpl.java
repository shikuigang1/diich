package com.diich.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import org.apache.commons.lang3.StringUtils;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.*;
import com.diich.core.service.*;
import com.diich.core.util.SimpleUpload;
import com.diich.core.util.BuildHTMLEngine;
import com.diich.core.util.PropertiesUtil;
import com.diich.mapper.*;
import org.apache.commons.collections.map.HashedMap;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
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
    private IchMasterMapper ichMasterMapper;
    @Autowired
    private WorksService worksService;
    @Autowired
    private WorksMapper worksMapper;
    @Autowired
    private DictionaryService dictionaryService;
    @Autowired
    private ResourceMapper resourceMapper;
    @Autowired
    private VersionService versionService;
    @Autowired
    private VersionMapper versionMapper;
    @Autowired
    private AuditMapper auditMapper;
    @Autowired
    private CountryProjectMapper countryProjectMapper;

    /**
     * 根据id获取项目信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    public IchProject getIchProject(String id) throws Exception {

        IchProject ichProject = null;

        try {
            ichProject = ichProjectMapper.selectByPrimaryKey(Long.parseLong(id));

            if (ichProject != null) {
                ichProject = getIchProject(ichProject);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return ichProject;
    }

    /**
     * 根据条件查询项目列表信息
     *
     * @param params
     * @return
     * @throws Exception
     */
    public Page<IchProject> getIchProjectPage(Map<String, Object> params) throws Exception {
        Integer current = 1;
        Integer pageSize = 10;

        if (params != null && params.containsKey("current") && params.containsKey("pageSize")) {
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
     *
     * @param page
     * @return
     * @throws Exception
     */
    public List<IchProject> getIchProjectList(Page<IchProject> page) throws Exception {

        List<IchProject> ichProjectList = null;
        try {
            Map<String, Object> condition = page.getCondition();
            if (condition == null) {
                condition = new HashMap<>();
            }
            ichProjectList = ichProjectMapper.selectIchProjectList(page, condition);
            for (IchProject ichProject : ichProjectList) {

                //获取传承人列表
                List<IchMaster> ichMasterList = ichMasterService.getIchMasterByIchProjectId(ichProject.getId());

                ichProject.setIchMasterList(ichMasterList);
                //代表作品列表
//                List<Works> worksList =worksService.getWorksByIchProjectId(ichProject.getId());
//                ichProject.setWorksList(worksList);
                //根据id和targetType和versionType查询中间表看是否有对应的版本
                List<Version> versionList = null;
                if ("chi".equals(ichProject.getLang())) {
                    versionList = versionService.getVersionByLangIdAndTargetType(ichProject.getId(), null, 0, 0);
                }
                if ("eng".equals(ichProject.getLang())) {
                    versionList = versionService.getVersionByLangIdAndTargetType(null, ichProject.getId(), 0, 0);
                }
                if (versionList.size() > 0) {
                    ichProject.setVersion(versionList.get(0));
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
     *
     * @param ichProject status = 3 提交
     * @throws Exception
     */
    @Transactional
    public IchProject saveIchProject(IchProject ichProject, User user) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            //根据项目名称查询项目是否存在
            checkProjectByName(ichProject);
            if (ichProject.getStatus() != null && ichProject.getStatus() == 3) {
                //检查属性是否符合条件
                checkAttribute(ichProject, 3);
                if (user != null && user.getType() == 0) {//如果当前修改者不是admin type 代表权限 0 代表admin  1代表普通用户
                    ichProject.setStatus(0);
                }
            }
            ichProject.setLastEditDate(new Date());
            saveProject(ichProject, user);//保存项目
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            if (e instanceof ApplicationException) {
                ApplicationException ae = (ApplicationException) e;
                if (ae.getCode() == 2) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, ae.getDetailMsg());
                }
            }
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return ichProject;
    }


    private IchProject saveProject(IchProject ichProject, User user) throws Exception {
        if (StringUtils.isEmpty(ichProject.getLang())) {
            ichProject.setLang("chi");
        }
        //如果不是提交待审核的状态改为草稿状态
        if (ichProject.getStatus() == null || ichProject.getStatus() != 3) {
            ichProject.setStatus(2);
        }
        //如果是管理员操作直接是已审核的状态
        if (user != null && user.getType() != null && user.getType() == 0) {
            ichProject.setStatus(0);
        }

        if (ichProject.getId() == null) {//保存
            long proID = IdWorker.getId();
            ichProject.setId(proID);
            ichProject.setCreatorId(user.getId());
            ichProject.setUri(proID + ".html");
            ichProjectMapper.insertSelective(ichProject);
        } else {//修改
            ichProjectMapper.updateByPrimaryKeySelective(ichProject);
        }
        List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
        if (contentFragmentList != null && contentFragmentList.size() > 0) {
            for (ContentFragment contentFragment : contentFragmentList) {
                contentFragment.setTargetId(ichProject.getId());
                contentFragment.setTargetType(0);
                //新增内容片断
                contentFragmentService.saveContentFragment(contentFragment);
            }
        }
        if (user != null && user.getType() == 0) {//管理员权限
            ichProject = getAttribute(ichProject);//获取attribute
            buildAndUpload(ichProject);
        }
        return ichProject;
    }

    private void buildAndUpload(IchProject ichProject) throws Exception {
        String str = PropertiesUtil.getString("freemarker.projectfilepath");
        String fileName = str + "/" + ichProject.getId().toString() + ".html";
        String s = buildHTML("2.0pro.ftl", ichProject, fileName);//生成静态页面
        String h5outPutPath = PropertiesUtil.getString("freemarker.h5_projectfilepath") + "/" + ichProject.getId() + ".html";
        String h5 = buildHTML("h5_pro.ftl", ichProject, h5outPutPath);
        String bucketName = PropertiesUtil.getString("img_bucketName");
        String type = PropertiesUtil.getString("pc_phtml_server");
        File file = new File(fileName);
        SimpleUpload.uploadFile(new FileInputStream(file), bucketName, type + "/" + ichProject.getId() + ".html", file.length());//上传到阿里云
        String h5type = PropertiesUtil.getString("m_phtml_server");
        File h5file = new File(h5outPutPath);
        SimpleUpload.uploadFile(new FileInputStream(h5file), bucketName, h5type + "/" + ichProject.getId() + ".html", h5file.length());//上传到阿里云
    }

    private IchProject getAttribute(IchProject ichProject) throws Exception {
        List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
        if (contentFragmentList != null && contentFragmentList.size() > 0) {
            for (ContentFragment contentFragment : contentFragmentList) {
                if (contentFragment.getAttribute() == null && contentFragment.getAttributeId() != null) {
                    Attribute attribute = attributeMapper.selectByPrimaryKey(contentFragment.getAttributeId());
                    contentFragment.setAttribute(attribute);
                }
            }
        }
        return ichProject;
    }

    /**
     * 如果修改人不同就另存版本
     *
     * @param ichProject
     * @return
     * @throws Exception
     */
    private IchProject updateProject(IchProject ichProject) throws Exception {
        Long mainId = ichProject.getId();
        long branchId = IdWorker.getId();
        ichProject.setId(branchId);
        ichProject.setStatus(2);
        ichProject.setUri(branchId + ".html");
        ichProjectMapper.insertSelective(ichProject);
        List<ContentFragment> ichProjectContentFragmentList = ichProject.getContentFragmentList();
        if (ichProjectContentFragmentList != null && ichProjectContentFragmentList.size() > 0) {
            for (ContentFragment contentFragment : ichProjectContentFragmentList) {
                contentFragment.setId(null);
                contentFragment.setTargetId(branchId);
                if (contentFragment.getAttributeId() != null) {
                    Attribute attribute = attributeMapper.selectByPrimaryKey(contentFragment.getAttributeId());
                    if (attribute != null && attribute.getTargetType() != null && attribute.getTargetType() == 10) {
                        long id = IdWorker.getId();
                        attribute.setId(id);
                        attribute.setTargetId(branchId);
                        attributeMapper.insertSelective(attribute);
                        contentFragment.setAttribute(attribute);
                        contentFragment.setAttributeId(id);
                    }
                }
                List<Resource> resourceList = contentFragment.getResourceList();
                if (resourceList != null && resourceList.size() > 0) {
                    for (int i = 0; i < resourceList.size(); i++) {
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
        if (user.getType() != null && user.getType() == 0) {//是管理员
            return getIchProject(String.valueOf(id));
        }
        Version version = new Version();
        version.setTargetType(0);
        version.setVersionType(1000);
        version.setMainVersionId(id);
        List<Version> versionList = versionMapper.selectVersionByVersionIdAndTargetType(version);
        if (versionList.size() > 0) {
            List tempList = new ArrayList();
            for (Version ver : versionList) {
                tempList.add(ver.getBranchVersionId());
            }
            List<IchProject> ichProjectList = ichProjectMapper.selectIchProjectByUserId(user.getId());
            for (IchProject ichProject : ichProjectList) {
                Long ichProjectId = ichProject.getId();
                if (tempList.contains(ichProjectId)) {
                    //获取传承人列表
                    ichProject = getIchProject(ichProject);
                    return ichProject;
                }
            }
        }
        IchProject ichProject = ichProjectMapper.selectIchProjectById(id);
        ichProject = getIchProject(ichProject);//获取项目相关的其他信息
        if (ichProject != null && (!ichProject.getLastEditorId().equals(user.getId())) || (ichProject.getStatus() != null && ichProject.getStatus() == 0)) {
            ichProject.setLastEditorId(user.getId());
            ichProject.setLastEditDate(new Date());
            ichProject = updateProject(ichProject);
        }
        return ichProject;
    }

    /**
     * 获取项目相关的其他信息
     *
     * @param ichProject
     * @return
     * @throws Exception
     */
    private IchProject getIchProject(IchProject ichProject) throws Exception {
        Long ichProjectId = ichProject.getId();
        List<IchMaster> ichMasterList = ichMasterService.getIchMasterByIchProjectId(ichProjectId);
        ichProject.setIchMasterList(ichMasterList);
        //作品列表
        List<Works> worksList = worksService.getWorksByIchProjectId(ichProjectId);
        ichProject.setWorksList(worksList);
        List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
        ichProject.setContentFragmentList(contentFragmentList);
        //根据id和targetType和versionType查询中间表看是否有对应的版本
        List<Version> verList = null;
        if ("chi".equals(ichProject.getLang())) {
            verList = versionService.getVersionByLangIdAndTargetType(ichProject.getId(), null, 0, 0);
        }
        if ("eng".equals(ichProject.getLang())) {
            verList = versionService.getVersionByLangIdAndTargetType(null, ichProject.getId(), 0, 0);
        }
        if (verList != null && verList.size() > 0) {
            ichProject.setVersion(verList.get(0));
        }
        return ichProject;
    }

    /**
     * 根据项目id查询项目信息 status 不做限制
     *
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
     *
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public String preview(Long id) throws Exception {
        IchProject ichProject = getIchProjectById(id);
        String str = PropertiesUtil.getString("freemarker.projectfilepath");
        String fileName = str + "/" + ichProject.getId().toString() + ".html";
        String url = str.substring(str.lastIndexOf("/"));
        String s = buildHTML("preview_pro.ftl", ichProject, fileName);
        String uri = "." + url + "/" + id + ".html";
        return uri;
    }

    /**
     * 个人中心
     *
     * @param params
     * @return
     * @throws Exception
     */
    @Override
    public Page<IchProject> getIchProjectByUserId(Map<String, Object> params) throws Exception {
        Integer current = 1;
        Integer pageSize = 50;
        if (params != null && params.containsKey("current")) {
            current = (Integer) params.get("current");
        }
        if (params != null && params.containsKey("pageSize")) {
            pageSize = (Integer) params.get("pageSize");
        }
        int offset = (current - 1) * pageSize;
        RowBounds rowBounds = new RowBounds(offset, pageSize);
        Page<IchProject> page = new Page();
        try {
            List<IchProject> ichProjectList = ichProjectMapper.selectIchProjectByUserAndStatus(params, rowBounds);
            for (IchProject ichProject : ichProjectList) {
                List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
                ichProject.setContentFragmentList(contentFragmentList);
            }
            //查询数量
            int total = ichProjectMapper.selectIchProjectCountByUserAndStatus(params);
            page.setRecords(ichProjectList);
            page.setTotal(total);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return page;
    }

    /**
     * 生成静态页面
     *
     * @param templateName
     * @param ichProject
     * @param fileName
     * @return
     * @throws Exception
     */
    @Override
    public String buildHTML(String templateName, IchProject ichProject, String fileName) throws Exception {
        Map map = getJson(ichProject);//返回前端需要的特定数据
        String uri = BuildHTMLEngine.buildHTML(templateName, ichProject, map, fileName);
        return uri;
    }

    @Override
    public List<Map> getIchProjectByName(Map<String, Object> map) throws Exception {

        List<Map> ls = ichProjectMapper.selectIchProjectByName(map);

        List<Map> result = new ArrayList<Map>();

        for (int i = 0; i < ls.size(); i++) {
            Map<String, Object> resultMap = new HashMap<String, Object>();

            Long id = (Long) ls.get(i).get("id");
            resultMap.put("id", String.valueOf(id));
            resultMap.put("name", ls.get(i).get("name"));
            String lang = ls.get(i).get("lang").toString();

            //获取项目分类
            Long categoryID = (Long) ls.get(i).get("ichCategoryId");
            if (categoryID != null) {
                IchCategory category = ichCategoryService.getCategoryById(categoryID);
                if (category != null) {
                    resultMap.put("category", category.getName());
                }
            }

            List<ContentFragment> cs = contentFragmentMapper.selectByProjectId(id);

            for (int j = 0; j < cs.size(); j++) {
                //获取项目名
                ContentFragment c = cs.get(j);
                Attribute a = attributeMapper.selectByPrimaryKey(c.getAttributeId());
                if (c.getAttributeId() == 4) {
                    resultMap.put("name", c.getContent());
                }
                //获取项目题图
                if (c.getAttributeId() == 1) {

                    Resource r = resourceMapper.selectByContentFramentID(c.getId());
                    if (r != null) {
                        resultMap.put("img", r.getUri());
                    }


                }
                //获取区域地址
                if (a != null && a.getDataType() == 101) {
                    String content = c.getContent();
                    if (content != null) {
                        String dis = dictionaryService.getTextByTypeAndCode(a.getDataType(), c.getContent(), lang);
                        resultMap.put("dis", dis);
                    }
                }
            }
            result.add(resultMap);
        }

        return result;
    }

    /**
     * 项目审核
     *
     * @param id
     * @param user
     * @param doi
     * @throws Exception
     */
    @Override
    public void audit(Long id, User user, String doi) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            IchProject ichProject = ichProjectMapper.selectIchProjectById(id);
            if (ichProject == null) {
                throw new ApplicationException(ApplicationException.PARAM_ERROR, "该id对应的项目不存在");
            }
            if (ichProject != null && ichProject.getStatus() != 3) {
                throw new ApplicationException(ApplicationException.PARAM_ERROR, "该项目不是待审核状态");
            }
            //根据id查询版本
            Version version = new Version();
            version.setBranchVersionId(id);
            version.setTargetType(0);
            version.setVersionType(1000);
            List<Version> versionList = versionMapper.selectVersionByVersionIdAndTargetType(version);
            if (versionList.size() > 0) {//非管理员修改的项目
                Version ver = versionList.get(0);
                Long mainVersionId = ver.getMainVersionId();
                ichProject.setStatus(0);
                List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
                ichProject.setContentFragmentList(contentFragmentList);
                ichProject.setLastEditDate(new Date());
                IchProject project = ichProjectMapper.selectByPrimaryKey(mainVersionId);
                List<ContentFragment> contentFragments = getContentFragmentListByProjectId(project);
                for (ContentFragment contentFragment : contentFragmentList) {//交换主版本和分支版本内容
                    if (contentFragment.getAttributeId() == 2 && StringUtils.isNotEmpty(doi)) {
                        contentFragment.setContent(doi);
                    }
                    contentFragment.setTargetId(mainVersionId);
                    contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                }
                project.setStatus(5);//作废状态
                project.setLastEditDate(new Date());
                for (ContentFragment contentFragment : contentFragments) {
                    contentFragment.setTargetId(id);
                    contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                }
                ichProject.setId(mainVersionId);
                ichProject.setLastEditorId(project.getLastEditorId());
                ichProject.setUri(project.getUri());
                project.setId(id);
                project.setLastEditorId(ichProject.getLastEditorId());
                project.setUri(ichProject.getUri());
                ver.setVersionType(1001);//已过期
                versionMapper.updateByPrimaryKeySelective(versionList.get(0));
                ichProjectMapper.updateByPrimaryKeySelective(ichProject);
                ichProjectMapper.updateByPrimaryKeySelective(project);
                //修改审核表信息
                updateAudit(id, ichProject.getId(), user);
                //获取项目信息
                ichProject = getIchProject(ichProject);
            } else {//新增待审核的项目
                //校验doi都编码是否重复
                if (isDoiValable(doi)) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, "doi编码重复");
                }
                ichProject.setStatus(0);
                ichProject.setLastEditDate(new Date());
                ichProjectMapper.updateByPrimaryKeySelective(ichProject);
                ContentFragment contentFragment = new ContentFragment();
                contentFragment.setContent(doi);
                contentFragment.setId(IdWorker.getId());
                contentFragment.setTargetType(0);
                contentFragment.setTargetId(id);
                contentFragment.setStatus(0);
                contentFragment.setAttributeId(2L);
                contentFragmentMapper.insertSelective(contentFragment);
                saveAudit(id, user);//保存到审核表
                //获取项目其他信息用以生成静态页面
                List<ContentFragment> contentFragmentList = getContentFragmentListByProjectId(ichProject);
                ichProject.setContentFragmentList(contentFragmentList);

            }
            //生成静态页并上传
            buildAndUpload(ichProject);
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            if (e instanceof ApplicationException) {
                ApplicationException ae = (ApplicationException) e;
                if (ae.getCode() == 2) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, ae.getDetailMsg());
                }
            }
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }


    }

    private boolean isDoiValable(String doi) throws Exception {
        ContentFragment contentFragment = new ContentFragment();
        contentFragment.setAttributeId(2L);
        contentFragment.setContent(doi);
        List<ContentFragment> contentFragments = contentFragmentMapper.selectByAttIdAndContent(contentFragment);
        if (contentFragments.size() > 0) {
            return true;
        }
        return false;
    }

    private void updateAudit(Long id, Long targetId, User user) throws Exception {
        try {
            //添加信息到审核表
            Audit audit = new Audit();
            audit.setTargetType(0);
            audit.setTargetId(id);
            audit.setStatus(1);
            Audit selaudit = auditMapper.selectAuditBytargetIdAndTargetType(audit);
            if (selaudit != null) {
                audit.setStatus(0);
                selaudit.setReason(null);
                selaudit.setAuditUserId(user.getId());
                selaudit.setAuditDate(new Date());
                selaudit.setTargetId(targetId);
                auditMapper.updateByPrimaryKeySelective(selaudit);
            } else {
                audit.setId(IdWorker.getId());
                audit.setStatus(0);
                audit.setAuditDate(new Date());
                audit.setAuditUserId(user.getId());
                audit.setTargetId(targetId);
                auditMapper.insertSelective(audit);
            }
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    private void saveAudit(Long id, User user) throws Exception {
        try {
            //添加拒绝信息到审核表
            Audit audit = new Audit();
            audit.setTargetType(0);
            audit.setTargetId(id);
            audit.setId(IdWorker.getId());
            audit.setAuditDate(new Date());
            audit.setAuditUserId(user.getId());
            audit.setStatus(0);//已通过
            auditMapper.insertSelective(audit);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    @Override
    public void refuseAudit(Long id, User user, String reason) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            IchProject ichProject = new IchProject();
            ichProject.setId(id);
            ichProject.setStatus(4);
            ichProjectMapper.updateByPrimaryKeySelective(ichProject);//更新项目状态为已拒绝
            //添加拒绝信息到审核表
            saveRefuseAudit(id, reason, user);
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    private void saveRefuseAudit(Long id, String reason, User user) throws Exception {
        try {
            //添加拒绝信息到审核表
            Audit audit = new Audit();
            audit.setTargetType(0);
            audit.setTargetId(id);
            audit.setStatus(1);
            Audit selaudit = auditMapper.selectAuditBytargetIdAndTargetType(audit);
            if (selaudit != null) {
                selaudit.setReason(reason);
                selaudit.setAuditUserId(user.getId());
                selaudit.setAuditDate(new Date());
                auditMapper.updateByPrimaryKeySelective(selaudit);
            } else {
                audit.setId(IdWorker.getId());
                audit.setAuditDate(new Date());
                audit.setAuditUserId(user.getId());
                audit.setReason(reason);
                auditMapper.insertSelective(audit);
            }
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    /**
     * 假删
     *
     * @param id
     * @return
     * @throws Exception
     */
    @Override
    public int deleteIchProject(Long id) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        int i = -1;
        try {
            IchProject ichProject = ichProjectMapper.selectIchProjectById(id);
            ichProject.setStatus(1);
            ichProject.setLastEditDate(new Date());
            i = ichProjectMapper.updateByPrimaryKeySelective(ichProject);
            Version version = new Version();
            version.setBranchVersionId(id);
            version.setTargetType(0);
            version.setVersionType(1000);
            List<Version> versionList = versionMapper.selectVersionByVersionIdAndTargetType(version);
            if (versionList.size() > 0) {
                versionList.get(0).setVersionType(1001);//过期
                versionMapper.updateByPrimaryKeySelective(versionList.get(0));
            }
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return i;
    }

    @Override
    public List<IchProject> getIchProject(String projectName, String masterName, String worksName) throws Exception {
        List<IchProject> ichProjectList = new ArrayList<>();
        List<IchMaster> mList = null;
        List<Works> wList = null;
        try {
            if (StringUtils.isNotEmpty(projectName)) {
                List<IchProject> ichProjects = ichProjectMapper.selectIchProjectByProjectName(projectName);
                for (IchProject ichProject : ichProjects) {
                    ichProject = getIchProject(String.valueOf(ichProject.getId()));
                    ichProjectList.add(ichProject);
                }
            }
            if (StringUtils.isEmpty(projectName) && StringUtils.isNotEmpty(worksName)) {
                wList = worksMapper.selectWorksByName(worksName);
                for (Works works : wList) {
                    if (works.getIchProjectId() == null) {
                        continue;
                    }
                    IchProject ichProject = getIchProject(String.valueOf(works.getIchProjectId()));
                    ichProjectList.add(ichProject);
                }
            }
            if (StringUtils.isEmpty(projectName) && StringUtils.isEmpty(worksName) && StringUtils.isNotEmpty(masterName)) {
                mList = ichMasterMapper.selectMasterByName(masterName);
                for (IchMaster ichMaster : mList) {
                    if (ichMaster.getIchProjectId() == null) {
                        continue;
                    }
                    IchProject ichProject = getIchProject(String.valueOf(ichMaster.getIchProjectId()));
                    ichProjectList.add(ichProject);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return ichProjectList;
    }

    /**
     * 获取国家级项目
     *
     * @return
     */
    @Override
    public List<Map> getCountryIchProjectList() throws Exception {
        List<Map> projectList = new ArrayList<>();
        try {
            List<CountryProject> countryProjectList = countryProjectMapper.selectCountryProjectNumList();
            for (CountryProject countryProject : countryProjectList) {
                Map project = new HashMap();
                IchProject ichProject = new IchProject();
                ichProject.setId(countryProject.getProjectNum());
                project = build360Map(project, ichProject, countryProject);
                if(project.get("widgetsData") != null){
                    projectList.add(project);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return projectList;
    }

    @Override
    public Map getCountryIchProjectById(String id) throws Exception {
        Map project = new HashMap();
        IchProject ichProject = new IchProject();
        ichProject.setId(Long.parseLong(id));
        project = build360Map(project, ichProject, null);
        return project;
    }

    @Override
    public List<Map> getCountryIchProjectIdList() throws Exception {
        List<Map> idList = new ArrayList<>();
        try {
            List<IchProject> ichProjectList = ichProjectMapper.selectCountryIchProjectList();
            List<Long> targetIds = new ArrayList<>();
            for (IchProject ichProject : ichProjectList) {
                Long id = ichProject.getId();
                targetIds.add(id);
            }
            List<ContentFragment> ContentFragmentList = contentFragmentMapper.selectProjectNameByTargetIds(targetIds);
            for (ContentFragment contentFragment : ContentFragmentList) {
                Map<String, Object> idsMap = new HashMap<>();
                idsMap.put("uniq_key", contentFragment.getTargetId());
                idsMap.put("name", contentFragment.getContent());
                idList.add(idsMap);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return idList;
    }

    /**
     * 构建360需要的数据
     *
     * @param project
     * @param ichProject
     * @return
     * @throws Exception
     */
    private Map build360Map(Map project, IchProject ichProject, CountryProject countryProject) throws Exception {
        project.put("uniq_key", countryProject.getId());
        project.put("url", PropertiesUtil.getString("_project") + ichProject.getId() + ".html");
        ContentFragment c = new ContentFragment();
        c.setTargetId(ichProject.getId());
        c.setTargetType(0);//标示项目
        List<ContentFragment> contentFragmentList = contentFragmentMapper.selectContentByTargetIdAndType(c);
        Map widgetsData = new HashMap();
        widgetsData = buildProjectMap(contentFragmentList, countryProject, widgetsData);//将数据封装到Map集合中
        //查询传承人
        List<IchMaster> ichMasterList = ichMasterMapper.selectByIchProjectId(ichProject.getId());
        List<Map> masterList = new ArrayList<>();
       Loop: for (IchMaster ichMaster : ichMasterList) {
            Map master = new HashMap();
            c.setTargetId(ichMaster.getId());
            c.setTargetType(1);//标示传承人
            List<ContentFragment> masterContentFragmentList = contentFragmentMapper.selectMasterContentByTargetIdAndType(c);
            //定义一个标记
            int count = 0;
            for (ContentFragment contentFragment : masterContentFragmentList) {
                if(contentFragment.getAttributeId() != 113){//判断传承人有没有图片没有图片跳出外层循环进行下次循环
                    continue ;
                }
                if (contentFragment.getAttributeId() == 113) {//传承人头图
                    List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(contentFragment.getId());
                    if (contentFragmentResourceList.size() > 0) {
                        Resource resource = resourceMapper.selectByPrimaryKey(contentFragmentResourceList.get(0).getResourceId());
                        if(resource.getUri() == null){//判断传承人有没有图片没有图片跳出外层循环进行下次循环
                            continue Loop;
                        }
                        List<Resource> resourceList = new ArrayList<>();
                        resourceList.add(resource);
                        contentFragment.setResourceList(resourceList);
                        count ++;
                    }else{
                        continue Loop;
                    }
                }
            }
           if(count == 0){//说明传承人没有图片
               continue ;
           }
            ichMaster.setContentFragmentList(masterContentFragmentList);
            master = buildMasterMap(masterContentFragmentList, master);//将数据封装到Map集合中
            //将所有传承人放到list中
            masterList.add(master);
            //将传承认数据放到项目集合中
            widgetsData.put("masters", masterList);
        }
        if (widgetsData.get("title") != null) {
            project.put("title", widgetsData.get("title"));
            widgetsData.remove("title");
        }
        if(widgetsData.size() > 0){
            project.put("widgetsData", widgetsData);
        }
        return project;
    }


    private Map buildProjectMap(List<ContentFragment> contentFragmentList, CountryProject countryProject, Map widgetsData) throws Exception {
        List<Map> basics = new ArrayList<>();

        for (ContentFragment content : contentFragmentList) {
            if (content.getAttributeId() == 4) {
                Map nameMap = new HashMap();
                nameMap.put("key", "项目名称");
                nameMap.put("value", content.getContent());
                basics.add(nameMap);
                widgetsData.put("title", content.getContent());
                continue;
            }
            if (content.getAttributeId() == 33) {
                if (content.getContent() != null) {
                    String con = content.getContent();
                    String[] strs = con.split(",");
                    String strName = "";
                    for (String strcode : strs) {
                        String name = dictionaryService.getTextByTypeAndCode(101, strcode, "chi");
                        if (StringUtils.isNotBlank(name)) {
                            strName = name + ",";
                        } else {
                            strName = strcode + ",";
                        }
                    }
                    strName = strName.substring(0, strName.lastIndexOf(","));
                    Map disMap = new HashMap();
                    disMap.put("key", "地域");
                    disMap.put("value", strName);
                    basics.add(disMap);
                    continue;
                }
            }
            if (content.getAttributeId() == 41) {
                if(countryProject.getIsWorld() != null && countryProject.getIsWorld() == 1){
                    Map pcMap = new HashMap();
                    pcMap.put("key", "遗产认定批次");
                    pcMap.put("value", "世界级非遗");
                    basics.add(pcMap);
                    continue;
                }
                String name = dictionaryService.getTextByTypeAndCode(103, content.getContent(), "chi");
                Map pcMap = new HashMap();
                pcMap.put("key", "遗产认定批次");
                pcMap.put("value", name);
                basics.add(pcMap);
                continue;
            }
            if (content.getAttributeId() == 107) {
                Map dmMap = new HashMap();
                dmMap.put("key", "项目代码");
                dmMap.put("value", content.getContent());
                basics.add(dmMap);
                continue;
            }
            if (content.getAttributeId() == 36 && content.getContent() != null && countryProject.getIsGood() != null && countryProject.getIsGood() == 1) {
                String[] contents = content.getContent().replace("<br/>", "\n").split("\\n");
                widgetsData.put("heritage", contents);
                continue;
            }
            if (content.getAttributeId() == 39 && content.getContent() != null) {
                String[] contents = content.getContent().replace("<br/>", "\n").split("\\n");
                widgetsData.put("endangered", contents);
                continue;
            }
        }
        if(basics.size() > 0){
            widgetsData.put("basics", basics);
        }
        return widgetsData;
    }

    private Map<String,Object> buildMasterMap(List<ContentFragment> contentFragmentList, Map widgetsData) throws Exception {
        for (ContentFragment content : contentFragmentList) {
            if (content.getAttributeId() == 13) {
                widgetsData.put("name", content.getContent());
                continue;
            }
            if (content.getAttributeId() == 113 && content.getResourceList() != null && content.getResourceList().size() > 0) {
                String url = PropertiesUtil.getString("masterPic") + content.getResourceList().get(0).getUri();
                widgetsData.put("image", url);
                continue;
            }
//            if (content.getAttributeId() == 24) {
//                String[] contents = content.getContent().replace("<br/>", "\n").split("\\n");
//                widgetsData.put("summary", contents);
//                continue;
//            }
        }
        return widgetsData;
    }

    private List<ContentFragment> getContentFragmentListByProjectId(IchProject ichProject) throws Exception {
        ContentFragment c = new ContentFragment();
        c.setTargetId(ichProject.getId());
        c.setTargetType(0);//标示项目
        List<ContentFragment> ls = contentFragmentMapper.selectByTargetIdAndType(c);
        List attrlist = new ArrayList();
        for (int i = 0; i < ls.size(); i++) {
            attrlist.add(ls.get(i).getAttributeId());
        }
        if (attrlist.size() > 0) {
            List<Attribute> attributeList = attributeMapper.selectAttrListByIds(attrlist);//查询属性列表
            List cfrList = new ArrayList<>();
            for (ContentFragment contentFragment : ls) {
                for (Attribute attribute : attributeList) {
                    if (contentFragment.getAttributeId() != null && contentFragment.getAttributeId().equals(attribute.getId())) {
                        contentFragment.setAttribute(attribute);
                        if ((attribute.getDataType() >= 5 && attribute.getDataType() < 100)) {//包含资源文件
                            cfrList.add(contentFragment.getId());
                        }
                        break;
                    }
                }
            }
            if (cfrList.size() > 0) {
                List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentIds(cfrList);//查询图片资源
                List reslist = new ArrayList();
                for (ContentFragmentResource contentFragmentResource : contentFragmentResourceList) {
                    if (contentFragmentResource.getResourceId() != null) {
                        reslist.add(contentFragmentResource.getResourceId());
                    }
                }
                if (reslist.size() > 0) {
                    List<Resource> resourceList = resourceMapper.selectByids(reslist);
                    for (ContentFragment contentFragment : ls) {
                        List<Resource> conResList = new ArrayList<>();
                        for (ContentFragmentResource contentFragmentResource : contentFragmentResourceList) {
                            for (Resource resource : resourceList) {
                                if (contentFragmentResource.getContentFragmentId() != null && contentFragmentResource.getResourceId() != null && contentFragment.getId().equals(contentFragmentResource.getContentFragmentId()) && resource.getId().equals(contentFragmentResource.getResourceId())) {
                                    conResList.add(resource);
                                }
                            }
                        }
                        contentFragment.setResourceList(conResList);
                    }
                }
            }
        }


        return ls;
    }

    /**
     * 获取前端所需要的资源数据
     *
     * @param ichProject
     * @return
     */
    private Map getJson(IchProject ichProject) throws Exception {

        //list用于向前端传输按模块划分的图片资源   用于显示在详情页特定模块的资源
        List<Map<String, Object>> list = new ArrayList<>();
        //allMap 所有去除重复图片和视频后的资源容器  用于显示在详情页得查看所有图片
        Map<String, Object> allMap = new HashedMap();
        Map<String, Object> headMap = new HashedMap();//放公共数据
        Set<Resource> imgdist = new HashSet<>();//去重后的所有图片集合
        Set<Resource> videosdist = new HashSet<>();//去重后的所有视频集合
        List<ContentFragment> ContentFragmentList = ichProject.getContentFragmentList();
        for (ContentFragment contentFragment : ContentFragmentList) {
            Map<String, Object> map = new HashMap<>();//存放每个模块的图片和视频
            List<Resource> img = new ArrayList<>();//图片资源文件的集合
            List<Resource> video = new ArrayList<>();//视频资源文件的集合
            Long contentFragmentId = contentFragment.getId();
            List<Resource> resourceList = contentFragment.getResourceList();
            if (resourceList != null && resourceList.size() > 0) {
                for (Resource resource : resourceList) {
                    if (resource.getType() != null && resource.getType() == 0) {
                        img.add(resource);
                        if (contentFragment.getAttributeId() != 112) {//头图不放到所有图片中
                            imgdist.addAll(img);
                        }
                        if (contentFragment.getAttributeId() == 1) {//题图
                            headMap.put("headImage", img);
                        }
                    }
                    if (resource.getType() != null && resource.getType() == 1) {
                        video.add(resource);
                        videosdist.addAll(video);
                    }
                }
            }
            map.put("contentFragmentId", String.valueOf(contentFragmentId));
            map.put("imgs", img);
            map.put("videos", video);
            if ("chi".equals(ichProject.getLang())) {
                if (contentFragment.getAttributeId() == 4) {
                    headMap.put("projectName", contentFragment.getContent());
                }
            }
            if ("eng".equals(ichProject.getLang())) {
                if (contentFragment.getAttributeId() == 5) {
                    headMap.put("projectName", contentFragment.getContent());
                }
            }

            list.add(map);
        }
        allMap.put("imgs", imgdist);
        allMap.put("videos", videosdist);
        headMap.put("lang", ichProject.getLang());
        Map map = new HashMap();
        map.put("json", JSONObject.toJSON(list).toString());
        map.put("jsonAll", JSONObject.toJSON(allMap).toString());
        map.put("jsonHead", JSONObject.toJSON(headMap).toString());
        return map;
    }

    /**
     * 根据项目名称查询项目是否存在
     *
     * @param ichProject
     * @throws Exception
     */
    private void checkProjectByName(IchProject ichProject) throws Exception {
        List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
        List<ContentFragment> contentFragments = null;
        for (ContentFragment contentFragment : contentFragmentList) {
            if (contentFragment.getAttributeId() != 4) {
                continue;
            } else {
                contentFragments = contentFragmentMapper.selectByAttIdAndContent(contentFragment);
                break;
            }
        }
        if (ichProject.getId() == null) {
            if (contentFragments.size() > 0) {
                for (ContentFragment contentFragment : contentFragments) {
                    IchProject project = ichProjectMapper.selectByPrimaryKey(contentFragment.getTargetId());
                    if (project != null && project.getStatus() != null && project.getStatus() == 0) {
                        throw new ApplicationException(ApplicationException.PARAM_ERROR, contentFragments.get(0).getContent() + " 已经存在");
                    }
                }
            }
        }
    }

    /**
     * 检查属性是否符合条件
     *
     * @param ichProject
     */
    private void checkAttribute(IchProject ichProject, Integer status) throws Exception {
        List<ContentFragment> contentFragmentList = ichProject.getContentFragmentList();
        if (status == 3) {//提交
            List<Attribute> attributeList = null;
            try {
                //根据targetType获取属性列表
                Attribute attribute = new Attribute();
                attribute.setTargetType(0);
                attributeList = attributeMapper.selectAttrListByCatIdAndTarType(attribute);
            } catch (Exception e) {
                e.printStackTrace();
                throw new ApplicationException(ApplicationException.INNER_ERROR);
            }

            for (Attribute attr : attributeList) {
                checkSubmitField(attr, contentFragmentList);
            }
        }
    }

    /**
     * 提交时对字段校验 项目
     *
     * @param attribute
     * @param contentFragmentList
     * @throws Exception
     */
    @SuppressWarnings("all")

    private void checkSubmitField(Attribute attribute, List<ContentFragment> contentFragmentList) throws Exception {

        int count = 0;
        for (ContentFragment contentFragment : contentFragmentList) {
            if (contentFragment.getAttributeId() == 0 || contentFragment.getAttributeId() == null) {
                continue;
            }
            if (attribute.getMaxLength() != null && (attribute.getId() == contentFragment.getAttributeId())) {
                if (attribute.getDataType() >= 100 && contentFragment.getContent() != null) {
                    String[] arr = contentFragment.getContent().split(",");
                    if (arr.length > attribute.getMaxLength()) {
                        throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString() + " 字段不符合要求");
                    }
                }
                if (attribute.getDataType() < 100 && contentFragment.getContent() != null && contentFragment.getContent().trim().length() > attribute.getMaxLength()) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString() + " 字段不符合要求");
                }
            }
            if ((attribute.getMinLength() != null) && (attribute.getMinLength() > 0)) {//检查必填项是否已填
                if (contentFragment.getAttributeId() != attribute.getId()) {
                    continue;
                }
                String content = contentFragment.getContent();
                if (attribute.getDataType() != 7 && attribute.getDataType() != 8 && attribute.getDataType() != 9 && (content == null || (content.trim().length() < attribute.getMinLength()))) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString() + " 字段不符合要求");
                }
                if (attribute.getDataType() == 7 || attribute.getDataType() == 8 || attribute.getDataType() == 9) {
                    List<Resource> resourceList = contentFragment.getResourceList();
                    if (resourceList != null && resourceList.size() < attribute.getMinLength()) {
                        throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString() + " 字段不符合要求");
                    }
                }
                count++;
            }
            if ((attribute.getMinLength() != null) && (count == 0)) {
                throw new ApplicationException(ApplicationException.PARAM_ERROR, attribute.getCnName().toString() + " 字段不符合要求");
            }

        }
    }


}
