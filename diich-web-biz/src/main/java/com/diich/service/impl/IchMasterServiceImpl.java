package com.diich.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.model.*;
import com.diich.core.service.IchMasterService;
import com.diich.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

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

    public Map<String, Object> getIchMaster(String id) {

        if(id == null || "".equals(id)) {
            return setResultMap(Constants.PARAM_ERROR, null);
        }
        IchMaster ichMaster =null;
        try{
            ichMaster = ichMasterMapper.selectByPrimaryKey(Long.parseLong(id));
            if(ichMaster !=null){
                //所属项目
                IchProject ichProject = ichProjectMapper.selectByPrimaryKey(ichMaster.getIchProjectId());
                if(ichProject !=null){
                    ichMaster.setIchProject(ichProject);
                }
                //最后编辑者
                User user = userMapper.selectByPrimaryKey(ichMaster.getLastEditorId());
                if(user !=null){
                    ichMaster.setUser(user);
                }
                //内容片断列表
                ContentFragment con = new ContentFragment();
                con.setTargetId(Long.parseLong(id));
                con.setTargetType(1);
                List<ContentFragment>  contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
                for (ContentFragment contentFragment :contentFragmentList) {
                    Long attrId = contentFragment.getId();
                    Attribute attribute = attributeMapper.selectByPrimaryKey(attrId);
                    contentFragment.setAttribute(attribute);//添加属性
                    List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(attrId);
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
            return setResultMap(Constants.INNER_ERROR, null);
        }

        return setResultMap(Constants.SUCCESS, ichMaster);
    }

    /**
     * 获取传承人列表
     * @param text
     * @return
     */
    @Override
    public Map<String, Object> getIchMasterList(String text) {

        Map<String, Object> params = null;
        Integer current = 1;
        Integer pageSize = 10;

        try {
            params = JSON.parseObject(text);
        } catch (Exception e) {
            return setResultMap(Constants.PARAM_ERROR, null);
        }
        if(params !=null){
            if(params.containsKey("current") && params.containsKey("pageSize")) {
                current = (Integer) params.get("current");
                pageSize = (Integer) params.get("pageSize");
            }
        }

        Page<IchMaster> page = new Page<IchMaster>(current, pageSize);

        List<IchMaster> ichMasterList = null;
        try {
            ichMasterList = ichMasterMapper.selectIchMasterList(page, params);
            for (IchMaster ichMaster:ichMasterList) {
                //所属项目
                IchProject ichProject = ichProjectMapper.selectByPrimaryKey(ichMaster.getIchProjectId());
                if(ichProject !=null){
                    ichMaster.setIchProject(ichProject);
                }
                //最后编辑者
                User user = userMapper.selectByPrimaryKey(ichMaster.getLastEditorId());
                if(user !=null){
                    ichMaster.setUser(user);
                }
                //内容片断列表
                ContentFragment con = new ContentFragment();
                con.setTargetId(ichMaster.getId());
                con.setTargetType(1);
                List<ContentFragment>  contentFragmentList = contentFragmentMapper.selectByTargetIdAndType(con);
                for (ContentFragment contentFragment :contentFragmentList) {
                    Long attrId = contentFragment.getId();
                    Attribute attribute = attributeMapper.selectByPrimaryKey(attrId);
                    contentFragment.setAttribute(attribute);//添加属性
                    List<ContentFragmentResource> contentFragmentResourceList = contentFragmentResourceMapper.selectByContentFragmentId(attrId);
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
            return setResultMap(Constants.INNER_ERROR, null);
        }
        page.setRecords(ichMasterList);

        return setResultMap(Constants.SUCCESS, page);
    }

    /**
     * 添加或更新传承人
     * @param text
     * @return
     */
    public Map<String, Object> saveIchMaster(String text) {
        TransactionStatus transactionStatus = getTransactionStatus();

        IchMaster ichMaster = null;

        try {
            ichMaster = parseObject(text, IchMaster.class);
        } catch (Exception e) {
            return setResultMap(Constants.PARAM_ERROR, null);
        }

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
            return setResultMap(Constants.INNER_ERROR, null);
        }

        return setResultMap(Constants.SUCCESS, ichMaster);
    }

}
