package com.diich.mapper;

import com.diich.core.base.BaseMapper;
import com.diich.core.model.EditRecord;

public interface EditRecordMapper extends BaseMapper<EditRecord> {
    int deleteByPrimaryKey(Long id);

    Integer insert(EditRecord record);

    int insertSelective(EditRecord record);

    EditRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(EditRecord record);

    int updateByPrimaryKey(EditRecord record);
}