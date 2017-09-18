package com.diich.service.impl;

import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.diich.core.base.BaseService;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.Enjoy;
import com.diich.core.service.EnjoyService;
import com.diich.mapper.EnjoyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;

import java.util.Date;

/**
 * Created by Administrator on 2017/9/7.
 */
@Service("enjoyService")
public class EnjoyServiceImpl extends BaseService<Enjoy> implements EnjoyService {

    @Autowired
    private EnjoyMapper enjoyMapper;
    @Override
    public Integer getCount(Long targetId, Integer targetType) throws Exception {
        int count = 0;
        try{
            Enjoy enjoy = new Enjoy();
            enjoy.setTargetType(targetType);
            enjoy.setTargetId(targetId);
            count = enjoyMapper.selectCountByTypeAndId(enjoy);
        }catch (Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return count;
    }

    @Override
    public Enjoy saveEnjoy(Enjoy enjoy) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try{
            enjoy.setId(IdWorker.getId());
            enjoy.setEnjoyDate(new Date());
            enjoyMapper.insertSelective(enjoy);
            commit(transactionStatus);
        }catch(Exception e){
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return enjoy;
    }

    @Override
    public void deleteEnjoy(Enjoy enjoy) throws Exception {
        TransactionStatus transactionStatus = getTransactionStatus();
        try{
            enjoyMapper.deleteEnjoy(enjoy);
            commit(transactionStatus);
        }catch(Exception e){
            rollback(transactionStatus);
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
    }

    @Override
    public int getCountByUser(Enjoy enjoy) throws Exception {
        int count = 0;
        try{
            count = enjoyMapper.selectCountByTypeAndId(enjoy);
        }catch(Exception e){
            throw new ApplicationException(ApplicationException.INNER_ERROR);
        }
        return count;
    }
}
