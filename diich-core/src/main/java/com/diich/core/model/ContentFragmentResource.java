package com.diich.core.model;

import com.diich.core.base.BaseModel;

public class ContentFragmentResource extends BaseModel {
    private Long id;

    private Long contentFragmentId;

    private Long resourceId;

    private Integer resOrder;

    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getContentFragmentId() {
        return contentFragmentId;
    }

    public void setContentFragmentId(Long contentFragmentId) {
        this.contentFragmentId = contentFragmentId;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public Integer getResOrder() {
        return resOrder;
    }

    public void setResOrder(Integer resOrder) {
        this.resOrder = resOrder;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}