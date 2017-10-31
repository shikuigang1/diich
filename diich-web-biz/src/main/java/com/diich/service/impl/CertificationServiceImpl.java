package com.diich.service.impl;

import com.diich.core.exception.ApplicationException;
import com.diich.core.model.ContentFragmentResource;
import com.diich.core.model.Resource;
import com.diich.core.service.CertificationService;
import com.diich.mapper.ContentFragmentResourceMapper;
import com.diich.mapper.IchProjectMapper;
import com.diich.mapper.ResourceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wangwenjian on 2017/10/31.
 * 获取已经认证的项目 作品 传承人 机构
 */
@Service
public class CertificationServiceImpl implements CertificationService {

    @Autowired
    private IchProjectMapper ichProjectMapper;
    @Autowired
    private ContentFragmentResourceMapper contentFragmentResourceMapper;
    @Autowired
    private ResourceMapper resourceMapper;

    @Override
    public List<Map> getCertifications(Integer pageNum, Integer pageSize) throws Exception {
        int offset = (pageNum - 1) * pageSize;
        Map map = new HashMap();
        map.put("offset",offset);
        map.put("pageSize",pageSize);
        List<Map> certificationList= null;
        try{
            certificationList= ichProjectMapper.selectCertifications(map);
            for (Map objMap :certificationList) {
                if(objMap.get("content_fragment_id") != null){
                    Long contentFragmentId = (Long) objMap.get("content_fragment_id");
                    Resource resource = resourceMapper.selectByContentFramentID(contentFragmentId);
                    if(resource != null){
                        objMap.put("img",resource.getUri());
                    }

                }else{
                    objMap.put("img",null);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return certificationList;
    }

    @Override
    public Long getCount() throws Exception {
        Long count = null;
        try {
            count = ichProjectMapper.getCount();
        } catch (Exception e) {
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return count;
    }
}
