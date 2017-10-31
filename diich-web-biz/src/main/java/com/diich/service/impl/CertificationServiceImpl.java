package com.diich.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.exception.ApplicationException;
import com.diich.core.service.CertificationService;
import com.diich.mapper.IchProjectMapper;
import org.apache.ibatis.session.RowBounds;
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

    @Override
    public List<Map> getCertifications(Integer pageNum, Integer pageSize) throws Exception {
        int offset = (pageNum - 1) * pageSize;
        Map map = new HashMap();
        map.put("offset",offset);
        map.put("pageSize",pageSize);
        List<Map> certificationList= null;
        try{
            certificationList= ichProjectMapper.selectCertifications(map);
        }catch (Exception e){
            e.printStackTrace();
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return certificationList;
    }
}
