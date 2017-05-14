package com.diich.mapper;

import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseMapper;
import com.diich.core.model.ICHItem;
import java.util.List;
import java.util.Map;

public interface ICHItemMapper extends BaseMapper<ICHItem>{
    int deleteByPrimaryKey(Long id);

    Integer insert(ICHItem record);

    int insertSelective(ICHItem record);

    ICHItem selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ICHItem record);

    int updateByPrimaryKey(ICHItem record);

    List<ICHItem> selectICHItemList(Page<ICHItem> page, Map<String, Object> params);
}