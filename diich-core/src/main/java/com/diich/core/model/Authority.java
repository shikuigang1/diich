package com.diich.core.model;

import com.diich.core.base.BaseModel;

public class Authority extends BaseModel {
    private Long id;

    private Integer readonly;

    private Integer readwrite;

    private Integer audit;

    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getReadonly() {
        return readonly;
    }

    public void setReadonly(Integer readonly) {
        this.readonly = readonly;
    }

    public Integer getReadwrite() {
        return readwrite;
    }

    public void setReadwrite(Integer readwrite) {
        this.readwrite = readwrite;
    }

    public Integer getAudit() {
        return audit;
    }

    public void setAudit(Integer audit) {
        this.audit = audit;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}