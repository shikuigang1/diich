package com.diich.service.impl;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.ContentFragmentResource;
import com.diich.core.model.Resource;
import com.diich.core.service.ResourceService;
import com.diich.core.util.FileType;
import com.diich.mapper.ContentFragmentResourceMapper;
import com.diich.mapper.ResourceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;

import java.util.List;

/**
 * Created by Administrator on 2017/7/27.
 */
@Service("resourceServiceImpl")
public class ResourceServiceImpl extends BaseService<Resource> implements ResourceService {

    @Autowired
    private ResourceMapper resourceMapper;
    @Autowired
    private ContentFragmentResourceMapper contentFragmentResourceMapper;
    /**
     * 保存资源文件 项目  传承人  作品
     */
    public void save(Resource resource) throws Exception{
            Long resourceId = resource.getId();
            if(resourceId == null){
                resourceId = IdWorker.getId();
                resource.setId(resourceId);
                resource.setStatus(0);
                //判断上传的文件类型 0图片 1 视频 2 音频
                String sType = FileType.fileType(resource.getUri());
                if("image".equals(sType)){
                    resource.setType(0);
                }
                if("vedio".equals(sType)){
                    resource.setType(1);
                }
                if("music".equals(sType)){
                    resource.setType(2);
                }
                if("doc".equals(sType)){
                    resource.setType(3);
                }
                //保存resource
                resourceMapper.insertSelective(resource);
            }else{
                //更新资源文件
                resourceMapper.updateByPrimaryKeySelective(resource);

            }
        }

    @Override
    public void deleteResource(Long id) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try{
            contentFragmentResourceMapper.deleteByResourceId(id);
//            resourceMapper.deleteByPrimaryKey(id);
            commit(transactionStatus);
        }catch (Exception e){
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }
}
