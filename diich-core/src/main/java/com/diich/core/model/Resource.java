package com.diich.core.model;

import com.diich.core.base.BaseModel;

public class Resource extends BaseModel {
    private Long id;

    private Integer type;

    private String uri;

    private Integer status;

    private Integer resOrder;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri == null ? null : uri.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getResOrder() {
        return resOrder;
    }

    public void setResOrder(Integer resOrder) {
        this.resOrder = resOrder;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}