package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.IchObject;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

public interface IchObjectMapper extends BaseMapper<IchObject> {
    List<?> searchList(Map<String, Object> params, RowBounds rowBounds);
}