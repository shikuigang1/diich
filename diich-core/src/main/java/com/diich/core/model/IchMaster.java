package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.Date;
import java.util.List;

public class IchMaster extends BaseModel {
    private Long id;

    private Long ichProjectId;

    private Long lastEditorId;

    private Date lastEditDate;

    private Integer editRank;

    private Integer status;

    private String uri;

    private String lang;//语言

    private IchProject ichProject;//项目

    private User user;//最后编辑者

    private List<ContentFragment> contentFragmentArray;//内容片断列表

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIchProjectId() {
        return ichProjectId;
    }

    public void setIchProjectId(Long ichProjectId) {
        this.ichProjectId = ichProjectId;
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

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri == null ? null : uri.trim();
    }

    public IchProject getIchProject() {
        return ichProject;
    }

    public void setIchProject(IchProject ichProject) {
        this.ichProject = ichProject;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ContentFragment> getContentFragmentArray() {
        return contentFragmentArray;
    }

    public void setContentFragmentArray(List<ContentFragment> contentFragmentArray) {
        this.contentFragmentArray = contentFragmentArray;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }
}