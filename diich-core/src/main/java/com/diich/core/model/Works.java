package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.Date;
import java.util.List;

public class Works extends IchObject {
    private Long id;

    private Long lastEditorId;

    private Long ichProjectId;

    private Long ichMasterId;

    private Date lastEditDate;

    private Integer editRank;

    private Integer payType;

    private Integer status;

    private String uri;

    private Integer isRepresent;

    private String lang;//语言

    private IchProject ichProject;//项目

    private IchMaster ichMaster;//传承人

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

    public Long getIchProjectId() {
        return ichProjectId;
    }

    public void setIchProjectId(Long ichProjectId) {
        this.ichProjectId = ichProjectId;
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

    public Integer getPayType() {
        return payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
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
        this.lang = lang;
    }

    public Integer getIsRepresent() {
        return isRepresent;
    }

    public void setIsRepresent(Integer isRepresent) {
        this.isRepresent = isRepresent;
    }

    public IchProject getIchProject() {
        return ichProject;
    }

    public void setIchProject(IchProject ichProject) {
        this.ichProject = ichProject;
    }

    public IchMaster getIchMaster() {
        return ichMaster;
    }

    public void setIchMaster(IchMaster ichMaster) {
        this.ichMaster = ichMaster;
    }
}