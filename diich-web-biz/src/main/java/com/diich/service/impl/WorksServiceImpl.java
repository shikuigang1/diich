package com.diich.service.impl;

import com.diich.core.Constants;
import com.diich.core.base.BaseService;
import com.diich.core.model.IchMaster;
import com.diich.core.model.IchProject;
import com.diich.core.model.Works;
import com.diich.core.service.WorksService;
import com.diich.mapper.IchMasterMapper;
import com.diich.mapper.IchProjectMapper;
import com.diich.mapper.WorksMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by Administrator on 2017/5/19.
 */
@Service("worksService")
public class WorksServiceImpl extends BaseService<Works> implements WorksService{

    @Autowired
    private WorksMapper worksMapper;

    @Autowired
    private IchProjectMapper ichProjectMapper;
    @Autowired
    private IchMasterMapper ichMasterMapper;

    public Map<String, Object> getWorks(String id) {
        if(id == null || "".equals(id)) {
            return setResultMap(Constants.PARAM_ERROR, null);
        }
        Works works = null;
        try{
           works = worksMapper.selectByPrimaryKey(Long.parseLong(id));
            //获取所属项目信息
            if(works !=null){
                IchProject ichProject = ichProjectMapper.selectByPrimaryKey(works.getIchProjectId());

            }
        }catch(Exception e){
            return setResultMap(Constants.INNER_ERROR,null);
        }

        return setResultMap(Constants.SUCCESS,works);
    }
}
