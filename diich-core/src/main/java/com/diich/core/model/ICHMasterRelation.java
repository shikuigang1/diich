package com.diich.core.model;

import com.diich.core.base.BaseModel;

public class IchMasterRelation extends BaseModel {
    private Long id;

    private Long masterId;

    private Long apprenticeId;

    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMasterId() {
        return masterId;
    }

    public void setMasterId(Long masterId) {
        this.masterId = masterId;
    }

    public Long getApprenticeId() {
        return apprenticeId;
    }

    public void setApprenticeId(Long apprenticeId) {
        this.apprenticeId = apprenticeId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}