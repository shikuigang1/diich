package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.Date;

public class Works extends BaseModel {
    private Long id;

    private Long lastEditorId;

    private Long ichItemId;

    private Long ichMasterId;

    private Date lastEditDate;

    private Integer editRank;

    private Integer status;

    private String uri;//作品静态页面的路径

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLastEditorId() {
        return lastEditorId;
    }

    public void setLastEditorId(Long lastEditorId) {
        this.lastEditorId = lastEditorId;
    }

    public Long getIchItemId() {
        return ichItemId;
    }

    public void setIchItemId(Long ichItemId) {
        this.ichItemId = ichItemId;
    }

    public Long getIchMasterId() {
        return ichMasterId;
    }

    public void setIchMasterId(Long ichMasterId) {
        this.ichMasterId = ichMasterId;
    }

    public Date getLastEditDate() {
        return lastEditDate;
    }

    public void setLastEditDate(Date lastEditDate) {
        this.lastEditDate = lastEditDate;
    }

    public Integer getEditRank() {
        return editRank;
    }

    public void setEditRank(Integer editRank) {
        this.editRank = editRank;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }
}