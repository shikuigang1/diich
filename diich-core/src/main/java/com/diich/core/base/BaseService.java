package com.diich.core.base;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.diich.core.exception.BusinessException;
import com.diich.core.model.IchMaster;
import com.diich.core.model.IchProject;
import com.diich.core.model.SecUser;
import com.diich.core.model.Works;
import com.diich.core.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import com.diich.core.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import com.diich.core.exception.BusinessException;
import com.diich.core.util.PropertiesUtil;
import freemarker.template.Configuration;
import freemarker.template.Template;
import com.baomidou.mybatisplus.plugins.Page;
import org.springframework.transaction.support.DefaultTransactionDefinition;

/**
 * 业务逻辑层基类
 */
public abstract class BaseService<T extends BaseModel> implements ApplicationContextAware {

    protected Logger logger = LogManager.getLogger(getClass());

    @Autowired
    private DataSourceTransactionManager transactionManager;

    @Autowired
    protected BaseMapper<T> mapper;
    protected ApplicationContext applicationContext;

    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    /** 分页查询 */
    public static Page<Long> getPage(Map<String, Object> params) {
        Integer current = 1;
        Integer size = 10;
        String orderBy = "id";
        if (DataUtil.isNotEmpty(params.get("pageNum"))) {
            current = Integer.valueOf(params.get("pageNum").toString());
        }
        if (DataUtil.isNotEmpty(params.get("pageSize"))) {
            size = Integer.valueOf(params.get("pageSize").toString());
        }
        if (DataUtil.isNotEmpty(params.get("orderBy"))) {
            orderBy = (String)params.get("orderBy");
            params.remove("orderBy");
        }
        if (size == -1) {
            return new Page<Long>();
        }
        Page<Long> page = new Page<Long>(current, size, orderBy);
        page.setAsc(false);
        return page;
    }

    /** 根据Id查询(默认类型T) */
    public Page<T> getPage(Page<Long> ids) {
        if (ids != null) {
            Page<T> page = new Page<T>(ids.getCurrent(), ids.getSize());
            page.setTotal(ids.getTotal());
            List<T> records = InstanceUtil.newArrayList();
            for (Long id : ids.getRecords()) {
                records.add(this.queryById(id));
            }
            page.setRecords(records);
            return page;
        }
        return new Page<T>();
    }

    /** 根据Id查询(默认类型T) */
    public Page<Map<String, Object>> getPageMap(Page<Long> ids) {
        if (ids != null) {
            Page<Map<String, Object>> page = new Page<Map<String, Object>>(ids.getCurrent(), ids.getSize());
            page.setTotal(ids.getTotal());
            List<Map<String, Object>> records = InstanceUtil.newArrayList();
            for (Long id : ids.getRecords()) {
                records.add(InstanceUtil.transBean2Map(this.queryById(id)));
            }
            page.setRecords(records);
            return page;
        }
        return new Page<Map<String, Object>>();
    }

    /** 根据Id查询(cls返回类型Class) */
    public <K> Page<K> getPage(Page<Long> ids, Class<K> cls) {
        if (ids != null) {
            Page<K> page = new Page<K>(ids.getCurrent(), ids.getSize());
            page.setTotal(ids.getTotal());
            List<K> records = InstanceUtil.newArrayList();
            for (Long id : ids.getRecords()) {
                T t = this.queryById(id);
                K k = InstanceUtil.to(t, cls);
                records.add(k);
            }
            page.setRecords(records);
            return page;
        }
        return new Page<K>();
    }

    /** 根据Id查询(默认类型T) */
    public List<T> getList(List<Long> ids) {
        List<T> list = InstanceUtil.newArrayList();
        if (ids != null) {
            for (Long id : ids) {
                list.add(this.queryById(id));
            }
        }
        return list;
    }

    /** 根据Id查询(cls返回类型Class) */
    public <K> List<K> getList(List<Long> ids, Class<K> cls) {
        List<K> list = InstanceUtil.newArrayList();
        if (ids != null) {
            for (Long id : ids) {
                T t = this.queryById(id);
                K k = InstanceUtil.to(t, cls);
                list.add(k);
            }
        }
        return list;
    }

    @Transactional
    public void del(Long id, Long userId) {

    }

    @Transactional
    public void delete(Long id) {
        try {
            mapper.deleteById(id);
            CacheUtil.getCache().del(getCacheKey(id));
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Transactional
    public int update(T record) {

       /* if(mapper.update(record,null)>0){

        }*/

        return  mapper.updateById(record);
    }

    @Transactional
    @SuppressWarnings("unchecked")
    public T queryById(Long id) {
        try {
            String key = getCacheKey(id);
            if (StringUtils.isBlank(key)) {
                return mapper.selectById(id);
            } else {
                T record = (T)CacheUtil.getCache().get(key);
                if (record == null) {
                    String lockKey = getLockKey(id);
                    if (CacheUtil.getLock(lockKey)) {
                        record = mapper.selectById(id);
                        CacheUtil.getCache().set(key, record);
                        CacheUtil.getCache().del(lockKey);
                    } else {
                        sleep(20);
                        return queryById(id);
                    }
                }
                return record;
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public Page<T> query(Map<String, Object> params) {
        Page<Long> page = getPage(params);
        page.setRecords(mapper.selectIdPage(page, params));
        return getPage(page);
    }

    public Page<Map<String, Object>> queryMap(Map<String, Object> params) {
        Page<Long> page = getPage(params);
        page.setRecords(mapper.selectIdPage(page, params));
        return getPageMap(page);
    }

    public List<T> queryList(Map<String, Object> params) {
        List<Long> ids = mapper.selectIdPage(params);
        List<T> list = getList(ids);
        return list;
    }

    protected <P> Page<P> query(Map<String, Object> params, Class<P> cls) {
        Page<Long> page = getPage(params);
        page.setRecords(mapper.selectIdPage(page, params));
        return getPage(page, cls);
    }

    protected void sleep(int millis) {
        try {
            Thread.sleep(RandomUtils.nextLong(10, millis));
        } catch (InterruptedException e) {
            logger.error("", e);
        }
    }

    /** 获取缓存键值 */
    protected String getCacheKey(Object id) {
        String cacheName = getCacheKey();
        if (StringUtils.isBlank(cacheName)) {
            return null;
        }
        return new StringBuilder(Constants.CACHE_NAMESPACE).append(cacheName).append(":").append(id).toString();
    }

    /** 获取缓存键值 */
    protected String getLockKey(Object id) {
        String cacheName = getCacheKey();
        if (StringUtils.isBlank(cacheName)) {
            return null;
        }
        return new StringBuilder(Constants.CACHE_NAMESPACE).append(cacheName).append(":LOCK:").append(id).toString();
    }

    /**
     * @return
     */
    private String getCacheKey() {
        Class<?> cls = getClass();
        String cacheName = Constants.cacheKeyMap.get(cls);
        if (StringUtils.isBlank(cacheName)) {
            CacheConfig cacheConfig = cls.getAnnotation(CacheConfig.class);
            if (cacheConfig == null) {
                return null;
            } else if (cacheConfig.cacheNames() == null || cacheConfig.cacheNames().length < 1) {
                cacheName = getClass().getName();
            } else {
                cacheName = cacheConfig.cacheNames()[0];
            }
            Constants.cacheKeyMap.put(cls, cacheName);
        }
        return cacheName;
    }


    public List<T> selectPage(Page<T> page, EntityWrapper ew){
        return mapper.selectPage(page,ew);
    }

    /**
     *生成列表静态页面的方法
     */
    public String buildHTML(String templateName, List<BaseModel> entityList) throws Exception{

        if(StringUtils.isBlank(templateName)){
            throw new BusinessException("模板名不能为空 ");
        }
        if(entityList.size()==0){
            throw new BusinessException("生成模板的对象不能为空 ");
        }
        String outputFileName=entityList.get(0).toString();

        Configuration configuration = new Configuration(Configuration.getVersion());
        String path= PropertiesUtil.getString("freemarker.templateLoaderPath");
        configuration.setDirectoryForTemplateLoading(new File(path));
        configuration.setDefaultEncoding("UTF-8");
        Template template = configuration.getTemplate(templateName);
        Map dataMap = new HashMap<>();
        dataMap.put("obj",entityList);
        String outPutPath=PropertiesUtil.getString("freemarker.filepath")+"/"+outputFileName+".html";
        Writer out =  new OutputStreamWriter(new FileOutputStream(outPutPath),"utf-8");
        template.process(dataMap, out);
        out.flush();
        out.close();
        return outPutPath;
    }
    /**
     *生成静态页面的方法
     */
    public String buildHTML(String templateName, BaseModel entity) throws Exception{

        if(StringUtils.isBlank(templateName)){
            throw new BusinessException("模板名不能为空 ");
        }
        if("".equals(entity) || entity ==null){
            throw new BusinessException("生成模板的对象不能为空 ");
        }
        String outputFileName="";
        if( entity instanceof IchProject){
            try {
                outputFileName= ((IchProject) entity).getId().toString();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if( entity instanceof IchMaster){
            try {
                outputFileName= ((IchMaster) entity).getId().toString();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if( entity instanceof Works){
            try {
                outputFileName= ((Works) entity).getId().toString();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        Configuration configuration = new Configuration(Configuration.getVersion());
        String path=PropertiesUtil.getString("freemarker.templateLoaderPath");
        configuration.setDirectoryForTemplateLoading(new File(path));
        configuration.setDefaultEncoding("UTF-8");
        Template template = configuration.getTemplate(templateName);
        Map dataMap = new HashMap<>();
        dataMap.put("obj",entity);
        String outPutPath=PropertiesUtil.getString("freemarker.filepath")+"/"+outputFileName+".html";
        Writer out =  new OutputStreamWriter(new FileOutputStream(outPutPath),"utf-8");
        template.process(dataMap, out);
        out.flush();
        out.close();
        return outPutPath;
    }

    public T parseObject(String jsonObjStr, Class<T> clazz) {
        T object = null;
        try {
            JSONObject jobObj = JSON.parseObject(jsonObjStr);
            ObjectMapper mapper = new ObjectMapper();
            SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            mapper.setDateFormat(fmt);
            object = mapper.readValue(jobObj.toString(), clazz);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return object;
    }

    public Map<String, Object> setResultMap(Integer code, Object data) {
        Map<String, Object> map = new HashMap<String, Object>();

        if (data != null) {
            if (data instanceof Page) {
                Page<?> page = (Page<?>) data;
                map.put("data", page.getRecords());
                map.put("current", page.getCurrent());
                map.put("size", page.getSize());
                map.put("pages", page.getPages());
                map.put("total", page.getTotal());
                map.put("iTotalRecords", page.getTotal());
                map.put("iTotalDisplayRecords", page.getTotal());
            } else if (data instanceof List<?>) {
                map.put("data", data);
                map.put("iTotalRecords", ((List<?>) data).size());
                map.put("iTotalDisplayRecords", ((List<?>) data).size());
            } else {
                map.put("data", data);
            }
        }

        map.put("code", code);
        map.put("msg", Constants.MSGS[code]);
        return map;
    }

    public TransactionStatus getTransactionStatus() {
        //获取事务定义
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        //设置事务隔离级别，开启新事务
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
        //获得事务状态
        TransactionStatus transactionStatus = transactionManager.getTransaction(def);
        return transactionStatus;
    }

    public void rollback(TransactionStatus transactionStatus) {
        transactionManager.rollback(transactionStatus);
    }

    public void commit(TransactionStatus transactionStatus) {
        transactionManager.commit(transactionStatus);
    }
}
