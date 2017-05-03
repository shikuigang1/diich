package com.diich.core.model;

/**
 * Created by Administrator on 2016/11/25.
 */
public class ICHCategory {
    private Long id;
    private Long parentId;
    private String name;
    private String gbCategory;
    private Integer status;

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
}
