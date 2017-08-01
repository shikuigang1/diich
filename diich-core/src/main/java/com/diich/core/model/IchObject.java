package com.diich.core.model;

import com.diich.core.base.BaseModel;

/**
 * Created by Administrator on 2017/7/26.
 */
public class IchObject extends BaseModel{
    private long targetId;
    private int targetType;

    public long getTargetId() {
        return targetId;
    }

    public void setTargetId(long targetId) {
        this.targetId = targetId;
    }

    public int getTargetType() {
        return targetType;
    }

    public void setTargetType(int targetType) {
        this.targetType = targetType;
    }

}
