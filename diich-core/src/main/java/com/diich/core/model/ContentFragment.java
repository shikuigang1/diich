package com.diich.core.model;

import com.diich.core.base.BaseModel;

/**
 * Created by Administrator on 2016/11/25.
 */
public class ContentFragment extends BaseModel{
    private Long id;
    private Long targetId;
    private Integer targetType;
    private Long attributeOfCategoryid;
    private String title;
    private Integer type;
    private String content;
    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    public Integer getTargetType() {
        return targetType;
    }

    public void setTargetType(Integer targetType) {
        this.targetType = targetType;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getAttributeOfCategoryid() {
        return attributeOfCategoryid;
    }

    public void setAttributeOfCategoryid(Long attributeOfCategoryid) {
        this.attributeOfCategoryid = attributeOfCategoryid;
    }
}
