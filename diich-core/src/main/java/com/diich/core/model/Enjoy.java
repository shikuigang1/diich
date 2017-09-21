package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.Date;

public class Enjoy extends BaseModel {
    private Long id;

    private Long targetId;

    private Integer targetType;

    private Date enjoyDate;

    private Long userId;

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

    public Date getEnjoyDate() {
        return enjoyDate;
    }

    public void setEnjoyDate(Date enjoyDate) {
        this.enjoyDate = enjoyDate;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}