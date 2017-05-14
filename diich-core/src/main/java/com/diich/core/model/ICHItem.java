package com.diich.core.model;

import com.baomidou.mybatisplus.annotations.TableId;
import com.diich.core.base.BaseModel;

import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2016/11/25.
 */
public class ICHItem extends BaseModel{
    private Long id;
    private Long ichCategoryId;
    private Long resourceId;
    private Long lastEditorId;
    private String doi;//doi编码
    private String series;
    private String cnName;
    private String enName;
    private String pinyin;
    private String declareBatch;
    private Integer ichRank;
    private Date lastEditDate;
    private Integer editRank;
    private String introduction;
    private Integer status;
    private ICHCategory ichCategory;//所属分类
    private User user;//最后编辑者
    private Resource resource;//题图资源
    private List<ICHMaster> ichMasterList;//所属传承人列表
    private List<ContentFragment> contentFragmentList;//图文列表

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

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public Long getLastEditorId() {
        return lastEditorId;
    }

    public void setLastEditorId(Long lastEditorId) {
        this.lastEditorId = lastEditorId;
    }

    public String getDoi() {
        return doi;
    }

    public void setDoi(String doi) {
        this.doi = doi;
    }

    public String getCnName() {
        return cnName;
    }

    public void setCnName(String cnName) {
        this.cnName = cnName;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getPinyin() {
        return pinyin;
    }

    public void setPinyin(String pinyin) {
        this.pinyin = pinyin;
    }

    public String getDeclareBatch() {
        return declareBatch;
    }

    public void setDeclareBatch(String declareBatch) {
        this.declareBatch = declareBatch;
    }

    public Integer getIchRank() {
        return ichRank;
    }

    public void setIchRank(Integer ichRank) {
        this.ichRank = ichRank;
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

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public ICHCategory getIchCategory() {
        return ichCategory;
    }

    public void setIchCategory(ICHCategory ichCategory) {
        this.ichCategory = ichCategory;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public List<ICHMaster> getIchMasterList() {
        return ichMasterList;
    }

    public void setIchMasterList(List<ICHMaster> ichMasterList) {
        this.ichMasterList = ichMasterList;
    }

    public List<ContentFragment> getContentFragmentList() {
        return contentFragmentList;
    }

    public void setContentFragmentList(List<ContentFragment> contentFragmentList) {
        this.contentFragmentList = contentFragmentList;
    }
}
