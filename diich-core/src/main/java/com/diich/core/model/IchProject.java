package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.Date;
import java.util.List;

public class IchProject extends BaseModel {
    private Long id;

    private Long ichCategoryId;

    private Long lastEditorId;

    private Date lastEditDate;

    private Integer editRank;

    private Integer status;

    private String lang;//语言

    private String uri;//项目静态页面的存储路径

    private  IchCategory ichCategory;//项目分类

    private User user;//最后编辑者

    public List<ContentFragment> getContentFragmentList() {
        return contentFragmentList;
    }

    public void setContentFragmentList(List<ContentFragment> contentFragmentList) {
        this.contentFragmentList = contentFragmentList;
    }

    private List<ContentFragment> contentFragmentList;

    private List<IchMaster> ichMasterList;//传承人列表

    private List<Works> worksList;//作品列表

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIchCategoryId() {
        return ichCategoryId;
    }

    public void setIchCategoryId(Long ichCategoryId) {
        this.ichCategoryId = ichCategoryId;
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

    public IchCategory getIchCategory() {
        return ichCategory;
    }

    public void setIchCategory(IchCategory ichCategory) {
        this.ichCategory = ichCategory;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public List<IchMaster> getIchMasterList() {
        return ichMasterList;
    }

    public void setIchMasterList(List<IchMaster> ichMasterList) {
        this.ichMasterList = ichMasterList;
    }

    public List<Works> getWorksList() {
        return worksList;
    }

    public void setWorksList(List<Works> worksList) {
        this.worksList = worksList;
    }
}