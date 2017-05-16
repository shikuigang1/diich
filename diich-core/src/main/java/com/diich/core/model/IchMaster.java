package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.Date;

public class IchMaster extends BaseModel {
    private Long id;

    private Long ichItemId;

    private Long lastEditorId;

    private Date lastEditDate;

    private Integer editRank;

    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIchItemId() {
        return ichItemId;
    }

    public void setIchItemId(Long ichItemId) {
        this.ichItemId = ichItemId;
    }

    public Long getLastEditorId() {
        return lastEditorId;
    }

    public void setLastEditorId(Long lastEditorId) {
        this.lastEditorId = lastEditorId;
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
}