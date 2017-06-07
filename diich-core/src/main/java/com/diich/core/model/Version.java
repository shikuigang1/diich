package com.diich.core.model;

import com.diich.core.base.BaseModel;

public class Version extends BaseModel {
    private Long id;

    private Integer targetType;

    private Long engId;

    private Long chiId;

    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTargetType() {
        return targetType;
    }

    public void setTargetType(Integer targetType) {
        this.targetType = targetType;
    }

    public Long getEngId() {
        return engId;
    }

    public void setEngId(Long engId) {
        this.engId = engId;
    }

    public Long getChiId() {
        return chiId;
    }

    public void setChiId(Long chiId) {
        this.chiId = chiId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}