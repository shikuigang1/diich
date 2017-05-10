package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.List;

/**
 * Created by Administrator on 2016/11/25.
 */
public class ICHCategory extends BaseModel{
    private Long id;
    private Long parentId;
    private String name;
    private String gbCategory;
    private Integer status;
    private List<AttributeOfCategory> attributeList;
    private List<ICHCategory> ichCategoryList;//二级分类或基本分类

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

    public String getGbCategory() {
        return gbCategory;
    }

    public void setGbCategory(String gbCategory) {
        this.gbCategory = gbCategory;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<AttributeOfCategory> getAttributeList() {
        return attributeList;
    }

    public void setAttributeList(List<AttributeOfCategory> attributeList) {
        this.attributeList = attributeList;
    }

    public List<ICHCategory> getIchCategoryList() {
        return ichCategoryList;
    }

    public void setIchCategoryList(List<ICHCategory> ichCategoryList) {
        this.ichCategoryList = ichCategoryList;
    }
}
