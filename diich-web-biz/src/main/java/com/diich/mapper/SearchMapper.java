package com.diich.mapper;

import com.diich.core.model.IchObject;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/7/25.
 */
public interface SearchMapper {
    List<IchObject> search(Map<String, Object> params);
    List<IchObject> searchByName(@Param("name") String name);
    List<IchObject> searchMasterByName(@Param("name") String name);
}
