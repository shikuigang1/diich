package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class IchProject extends IchObject {
    private Long id;

    private Long ichCategoryId;

    private Long lastEditorId;

    private Date lastEditDate;

    private Integer editRank;

    private Integer status;

    private String lang;//语言

    private String uri;//项目静态页面的存储路径

    private  IchCategory ichCategory;//项目分类

    private Version version;//版本 中文版和英文版的中间表

    private String json;//按模块分所有的资源

    private String jsonAll;//详情页查看所有图片和视频

    private String jsonHead;//浮层页公用数据

    public List<ContentFragment> getContentFragmentList() {
        return contentFragmentList;
    }

    public void setContentFragmentList(List<ContentFragment> contentFragmentList) {
        this.contentFragmentList = contentFragmentList;
    }

    private List<ContentFragment> contentFragmentList;

    private List<IchMaster> ichMasterList;//传承人列表

    private List<Works> worksList;//代表作品列表

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

    public Version getVersion() {
        return version;
    }

    public void setVersion(Version version) {
        this.version = version;
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