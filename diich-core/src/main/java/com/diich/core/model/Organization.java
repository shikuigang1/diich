package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.Date;
import java.util.List;

public class Organization extends BaseModel {
    private Long id;

    private Date lastEditDate;

    private Long lastEditorId;

    private Long userId;

    private Integer editRank;

    private Integer status;

    private String uri;

    private String lang;

    private List<ContentFragment> contentFragmentList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getLastEditDate() {
        return lastEditDate;
    }

    public void setLastEditDate(Date lastEditDate) {
        this.lastEditDate = lastEditDate;
    }

    public Long getLastEditorId() {
        return lastEditorId;
    }

    public void setLastEditorId(Long lastEditorId) {
        this.lastEditorId = lastEditorId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
        this.uri = uri == null ? null : uri.trim();
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang == null ? null : lang.trim();
    }

    public List<ContentFragment> getContentFragmentList() {
        return contentFragmentList;
    }

    public void setContentFragmentList(List<ContentFragment> contentFragmentList) {
        this.contentFragmentList = contentFragmentList;
    }
}