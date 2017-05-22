package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.List;

public class IchCategory extends BaseModel {
    private Long id;

    private Long parentId;

    private String name;

    private String gbCategory;

    private Integer status;

    private List<IchCategory> childCategoryList;

    private List<Attribute> attributeList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getGbCategory() {
        return gbCategory;
    }

    public void setGbCategory(String gbCategory) {
        this.gbCategory = gbCategory == null ? null : gbCategory.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<IchCategory> getChildCategoryList() {
        return childCategoryList;
    }

    public void setChildCategoryList(List<IchCategory> childCategoryList) {
        this.childCategoryList = childCategoryList;
    }

    public List<Attribute> getAttributeList() {
        return attributeList;
    }

    public void setAttributeList(List<Attribute> attributeList) {
        this.attributeList = attributeList;
    }
}