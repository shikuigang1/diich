package com.diich.service.impl;

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
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;

import java.util.*;

/**
 * Created by Administrator on 2017/5/19.
 */
@Service("worksService")
@SuppressWarnings("all")
public class WorksServiceImpl extends BaseService<Works> implements WorksService {

    @Autowired
    private WorksMapper worksMapper;
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
    @Autowired
    private ResourceService resourceService;
    @Autowired
    private ContentFragmentService contentFragmentService;
    @Autowired
    private AuditMapper auditMapper;
    @Autowired
    private VersionMapper versionMapper;

    /**
     * 根据id查询作品信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    public Works getWorks(String id) throws Exception {

        Works works = null;
        try {
            works = worksMapper.selectByPrimaryKey(Long.parseLong(id));
            if (works != null) {
                //获取所属项目信息
                if (works.getIchProjectId() != null) {
                    IchProject ichProject = ichProjectService.getIchProjectById(works.getIchProjectId());
                    if (ichProject != null) {
                        ichProject.setUri(PropertiesUtil.getString("_project") + works.getIchProjectId() + ".html");
                        works.setIchProject(ichProject);
                    }
                }
                //获取传承人信息
                if (works.getIchMasterId() != null) {
                    IchMaster ichMaster = ichMasterService.getIchMasterByWorks(works);
                    if (ichMaster != null) {
                        ichMaster.setUri(PropertiesUtil.getString("_master") + works.getIchMasterId() + ".html");
                        works.setIchMaster(ichMaster);
                        if (ichMaster.getIchProjectId() != null) {
                            IchProject ichProject = ichProjectService.getIchProjectById(ichMaster.getIchProjectId());
                            ichProject.setUri(PropertiesUtil.getString("_project") + ichMaster.getIchProjectId() + ".html");
                            works.setIchProject(ichProject);
                        }
                    }
                }
            }
            //获取内容片断
            List<ContentFragment> contentFragmentList = getContentFragmentListByWorksId(works);
            works.setContentFragmentList(contentFragmentList);
            works.setUri(PropertiesUtil.getString("_works") + id + ".html");
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return works;
    }

    /**
     * 根据条件查询作品的列表信息
     *
     * @param params
     * @return
     * @throws Exception
     */
    @Override
    public Page<Works> getWorksPage(Map<String, Object> params) throws Exception {

        Integer current = 1;
        Integer pageSize = 10;

        if (params != null && params.containsKey("current") && params.containsKey("pageSize")) {
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
        List<Works> worksList = null;
        try {
            Map<String, Object> condition = page.getCondition();
            if (condition == null) {
                condition = new HashMap<>();
            }
            worksList = worksMapper.selectWorksList(page, page.getCondition());
            for (Works works : worksList) {
                //获取所属项目信息
                IchProject ichProject = ichProjectService.getIchProjectById(works.getIchProjectId());
                works.setIchProject(ichProject);
                //获取传承人信息
                IchMaster ichMaster = ichMasterService.getIchMasterByWorks(works);
                works.setIchMaster(ichMaster);
                //获取内容片断
                List<ContentFragment> contentFragmentList = getContentFragmentListByWorksId(works);
                works.setContentFragmentList(contentFragmentList);
            }
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }

        return worksList;
    }

    /**
     * 添加或更新作品
     *
     * @param works
     * @throws Exception
     */
    @Override
    public Works saveWorks(Works works, User user) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            if (works.getStatus() != null && works.getStatus() == 3) {
                //检查属性是否符合条件
                checkAttribute(works, 3);
                if (user != null && user.getType() == 0) {//如果当前修改者不是admin type 代表权限 0 代表admin  1代表普通用户
                    works.setStatus(0);
                }
            }
            works.setLastEditDate(new Date());
            saveWork(works, user);//保存项目
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
        return works;
    }

    private Works saveWork(Works works, User user) throws Exception {
        if (StringUtils.isEmpty(works.getLang())) {
            works.setLang("chi");
        }
        //如果不是提交待审核的状态改为草稿状态
        if (works.getStatus() == null || works.getStatus() != 3) {
            works.setStatus(2);
        }
        //如果是管理员操作直接是已审核的状态
        if (user != null && user.getType() != null && user.getType() == 0) {
            works.setStatus(0);
        }

        if (works.getId() == null) {//保存
            long workId = IdWorker.getId();
            works.setId(workId);
            works.setUri(workId + ".html");
            worksMapper.insertSelective(works);
        } else {//修改
            worksMapper.updateByPrimaryKeySelective(works);
        }
        List<ContentFragment> contentFragmentList = works.getContentFragmentList();
        if (contentFragmentList != null && contentFragmentList.size() > 0) {
            for (ContentFragment contentFragment : contentFragmentList) {
                contentFragment.setTargetId(works.getId());
                contentFragment.setTargetType(2);
                //新增内容片断
                contentFragmentService.saveContentFragment(contentFragment);
            }
        }
        return works;
    }

    /**
     * 生成静态页面
     *
     * @param templateName
     * @param works
     * @param fileName
     * @return
     * @throws Exception
     */
    @Override
    public String buildHTML(String templateName, Works works, String fileName) throws Exception {
        String uri = BuildHTMLEngine.buildHTML(templateName, works, null, fileName);
        return uri;
    }

    @Override
    public List<Works> getWorksByName(String worksName) throws Exception {
        List<Works> worksList = new ArrayList<>();
        try {
            List<Works> workss = worksMapper.selectWorksByName(worksName);
            for (Works works : workss) {
                works = getWorks(String.valueOf(works.getId()));
                worksList.add(works);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return worksList;
    }

    @Override
    public Works getWorksByDoi(String doi) throws Exception {
        Works works = null;
        try {
            works = worksMapper.selectWorksByDoi(doi);
            if (works != null) {
                works = getWorks(String.valueOf(works.getId()));
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return works;
    }

    @Override
    public Page<Works> getWorksByUserId(Map<String, Object> params) throws Exception {
        Integer current = 1;
        Integer pageSize = 10;
        if (params != null && params.containsKey("current")) {
            current = (Integer) params.get("current");
        }
        if (params != null && params.containsKey("pageSize")) {
            pageSize = (Integer) params.get("pageSize");
        }
        int offset = (current - 1) * pageSize;
        RowBounds rowBounds = new RowBounds(offset, pageSize);
        Page<Works> page = new Page();
        try {
            List<Works> worksList = worksMapper.selectWorksByUserAndStatus(params, rowBounds);
            for (Works works : worksList) {
                List<ContentFragment> contentFragmentList = getContentFragmentListByWorksId(works);
                works.setContentFragmentList(contentFragmentList);
            }
            //查询数量
            int total = worksMapper.selectWorksCountByUserAndStatus(params);
            page.setRecords(worksList);
            page.setTotal(total);
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return page;
    }

    @Override
    public void audit(Long id, User user, String doi) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try {
            Works works = worksMapper.selectWorksById(id);
            if (works == null) {
                throw new ApplicationException(ApplicationException.PARAM_ERROR, "该id对应的作品不存在");
            }
            if (works != null && works.getStatus() != 3) {
                throw new ApplicationException(ApplicationException.PARAM_ERROR, "该作品不是待审核状态");
            }
            //根据id查询版本
            Version version = new Version();
            version.setBranchVersionId(id);
            version.setTargetType(2);
            version.setVersionType(1000);
            List<Version> versionList = versionMapper.selectVersionByVersionIdAndTargetType(version);
            if (versionList.size() > 0) {//非管理员修改的项目
                Version ver = versionList.get(0);
                Long mainVersionId = ver.getMainVersionId();
                works.setStatus(0);
                List<ContentFragment> contentFragmentList = getContentFragmentListByWorksId(works);
                works.setContentFragmentList(contentFragmentList);
                works.setLastEditDate(new Date());
                Works mainWork = worksMapper.selectByPrimaryKey(mainVersionId);
                List<ContentFragment> contentFragments = getContentFragmentListByWorksId(mainWork);
                for (ContentFragment contentFragment : contentFragmentList) {//交换主版本和分支版本内容
                    if (contentFragment.getAttributeId() == 26 && StringUtils.isNotEmpty(doi)) {
                        contentFragment.setContent(doi);
                    }
                    contentFragment.setTargetId(mainVersionId);
                    contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                }
                mainWork.setStatus(5);//作废状态
                mainWork.setLastEditDate(new Date());
                for (ContentFragment contentFragment : contentFragments) {
                    contentFragment.setTargetId(id);
                    contentFragmentMapper.updateByPrimaryKeySelective(contentFragment);
                }
                works.setId(mainVersionId);
                works.setLastEditorId(mainWork.getLastEditorId());
                works.setUri(mainWork.getUri());
                mainWork.setId(id);
                mainWork.setLastEditorId(works.getLastEditorId());
                mainWork.setUri(works.getUri());
                ver.setVersionType(1001);//已过期
                versionMapper.updateByPrimaryKeySelective(versionList.get(0));
                worksMapper.updateByPrimaryKeySelective(works);
                worksMapper.updateByPrimaryKeySelective(mainWork);
                //修改审核表信息
                updateAudit(id, works.getId(), user);
//                //获取作品信息
//                works = getWorks(String.valueOf(works.getId()));
            } else {//新增待审核的项目
                //校验doi都编码是否重复
                if (isDoiValable(doi)) {
                    throw new ApplicationException(ApplicationException.PARAM_ERROR, "doi编码重复");
                }
                works.setStatus(0);
                works.setLastEditDate(new Date());
                worksMapper.updateByPrimaryKeySelective(works);
                ContentFragment contentFragment = new ContentFragment();
                contentFragment.setContent(doi);
                contentFragment.setId(IdWorker.getId());
                contentFragment.setTargetType(2);
                contentFragment.setTargetId(id);
                contentFragment.setStatus(0);
                contentFragment.setAttributeId(2L);
                contentFragmentMapper.insertSelective(contentFragment);
                saveAudit(id, user);//保存到审核表
                //获取项目其他信息用以生成静态页面
//                List<ContentFragment> contentFragmentList = getContentFragmentListByWorksId(works);
//                works.setContentFragmentList(contentFragmentList);

            }
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
            audit.setTargetType(2);
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
            audit.setTargetType(2);
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
            Works works = new Works();
            works.setId(id);
            works.setStatus(4);
            worksMapper.updateByPrimaryKeySelective(works);//更新作品状态为已拒绝
            //添加拒绝信息到审核表
            Audit audit = new Audit();
            audit.setTargetType(2);
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
            commit(transactionStatus);
        } catch (Exception e) {
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    @Override
    public int deleteWorks(Long id) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        int i = -1;
        try {
            Works works = worksMapper.selectWorksById(id);
            works.setStatus(1);
            works.setLastEditDate(new Date());
            i = worksMapper.updateByPrimaryKeySelective(works);
            Version version = new Version();
            version.setBranchVersionId(id);
            version.setTargetType(2);
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

    /**
     * 根据项目id获取代表作品列表
     *
     * @param ichProjectId
     * @return
     */
    public List<Works> getWorksByIchProjectId(Long ichProjectId) throws Exception {
        Works works = new Works();
        works.setIchProjectId(ichProjectId);
        works.setIsRepresent(1);
        List<Works> worksList = worksMapper.selectWorks(works);
        if (worksList.size() > 0) {
            worksList = getWorkList(worksList);
        }
        return worksList;
    }


    /**
     * 根据传承人id查询代表作品列表
     *
     * @param ichMasterId
     * @return
     */
    public List<Works> getWorksByIchMasterId(Long ichMasterId) throws Exception {
        Works works = new Works();
        works.setIchMasterId(ichMasterId);
        works.setIsRepresent(1);
        List<Works> getWorkList = worksMapper.selectWorks(works);
        List<Works> worksList = getWorkList(getWorkList);
        return worksList;
    }

    private List<Works> getWorkList(List<Works> worksList) throws Exception {
        for (Works works : worksList) {
            //获取内容片断
            List<ContentFragment> contentFragments = getContentFragmentListByWorksId(works);
            works.setContentFragmentList(contentFragments);
        }
        return worksList;
    }

    private List<ContentFragment> getContentFragmentListByWorksId(Works works) throws Exception {
        //获取内容片断
        ContentFragment con = new ContentFragment();
        con.setTargetId(works.getId());
        con.setTargetType(2);
        List<ContentFragment> contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
        List attrlist = new ArrayList();
        for (int i = 0; i < contentFragmentList.size(); i++) {
            attrlist.add(contentFragmentList.get(i).getAttributeId());
        }
        if (attrlist.size() > 0) {
            List<Attribute> attributeList = attributeMapper.selectAttrListByIds(attrlist);//查询属性列表
            List cfrList = new ArrayList<>();
            for (ContentFragment contentFragment : contentFragmentList) {
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
                    for (ContentFragment contentFragment : contentFragmentList) {
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
        return contentFragmentList;
    }

    /**
     * 检查属性是否符合条件
     *
     * @param ichProject
     */
    private void checkAttribute(Works works, Integer status) throws Exception {
        List<ContentFragment> contentFragmentList = works.getContentFragmentList();
        if (status == 3) {//提交
            List<Attribute> attributeList = null;
            try {
                //根据targetType获取属性列表
                Attribute attribute = new Attribute();
                attribute.setTargetType(2);
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
