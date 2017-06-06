package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.ContentFragment;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ContentFragmentMapper extends BaseMapper<ContentFragment> {
    int deleteByPrimaryKey(Long id);

    Integer insert(ContentFragment record);

    int insertSelective(ContentFragment record);

    ContentFragment selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ContentFragment record);

    int updateByPrimaryKeyWithBLOBs(ContentFragment record);

    int updateByPrimaryKey(ContentFragment record);
    //根据targetId和类型查询内容片段列表
    List<ContentFragment> selectByTargetIdAndType(ContentFragment record);

    //根据项目名称获取相关信息
    List<ContentFragment> selectByProjectId(long  projectID);

    List<ContentFragment> queryForSearch(Map map);//调用存储过程

    List<ContentFragment> queryForSearchPage(Map map);//搜索分页
    int queryForSearchCount(Map map);//搜索 查询总数量
    List<ContentFragment> queryByTargetIDAndType(ContentFragment contentFragment);
    List<ContentFragment> queryListByTargetId(long target_id);

}