package com.diich.core.model;

import com.diich.core.base.BaseModel;

/**
 * Created by Administrator on 2016/11/25.
 */
public class Comment extends BaseModel{
    private Long id;
    private Long commentatorId;
    private Long parentId;
    private Integer type;
    private String content;
    private Long targetId;
    private Integer targetType;
    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCommentatorId() {
        return commentatorId;
    }

    public void setCommentatorId(Long commentatorId) {
        this.commentatorId = commentatorId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
