package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.Date;
import java.util.List;

public class IchMaster extends IchObject {
    private Long id;

    private Long ichProjectId;

    private Long lastEditorId;

    private Long userId;

    private Date lastEditDate;

    private Integer editRank;

    private Integer status;

    private String uri;

    private String lang;//语言

    private Integer isMaster;//是否为自己申报传承人标示 1是 0否

    private IchProject ichProject;//项目

    private List<ContentFragment> contentFragmentList;//内容片断列表

    private List<Works> worksList;//作品列表

    private String json;//按模块分所有的资源

    private String jsonAll;//详情页查看所有图片和视频

    private String jsonHead;//浮层页公用数据

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public List<ContentFragment> getContentFragmentList() {
        return contentFragmentList;
    }

    public void setContentFragmentList(List<ContentFragment> contentFragmentList) {
        this.contentFragmentList = contentFragmentList;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public Integer getIsMaster() {
        return isMaster;
    }

    public void setIsMaster(Integer isMaster) {
        this.isMaster = isMaster;
    }

    public List<Works> getWorksList() {
        return worksList;
    }

    public void setWorksList(List<Works> worksList) {
        this.worksList = worksList;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getJsonAll() {
        return jsonAll;
    }

    public void setJsonAll(String jsonAll) {
        this.jsonAll = jsonAll;
    }

    public String getJsonHead() {
        return jsonHead;
    }

    public void setJsonHead(String jsonHead) {
        this.jsonHead = jsonHead;
    }
}