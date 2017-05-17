package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.ContentFragment;
import org.springframework.data.repository.query.Param;

import java.util.List;

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
}