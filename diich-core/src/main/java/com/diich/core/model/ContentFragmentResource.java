package com.diich.core.model;

/**
 * Created by Administrator on 2016/11/25.
 */
public class ContentFragmentResource {
    private Long id;
    private Long contentFragmentId;
    private Long resourceId;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
