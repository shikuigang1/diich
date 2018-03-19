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
    //包括is_open为0的
    List<ContentFragment> selectAllAttrByTargetIdAndType(ContentFragment record);

    //根据项目名称获取相关信息
    List<ContentFragment> selectByProjectId(long projectID);

    List<ContentFragment> selectByAttIdAndContent(ContentFragment record);

    List<ContentFragment> selectByTargetIdsAndType(@Param("map") Map map);

    ContentFragment selectByAttrIdAndTargetId(ContentFragment record);

    List<ContentFragment> selectContentByTargetIdAndType(ContentFragment c);

    List<ContentFragment> selectMasterContentByTargetIdAndType(ContentFragment c);

    List<ContentFragment> selectProjectNameByTargetIds(List<Long> targetIds);
}