package com.diich.core.model;

import com.diich.core.base.BaseModel;

public class Version extends BaseModel {
    private Long id;

    private Integer targetType;

    private Long branchVersionId;

    private Long mainVersionId;

    private Integer versionType;

    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTargetType() {
        return targetType;
    }

    public void setTargetType(Integer targetType) {
        this.targetType = targetType;
    }

    public Long getBranchVersionId() {
        return branchVersionId;
    }

    public void setBranchVersionId(Long branchVersionId) {
        this.branchVersionId = branchVersionId;
    }

    public Long getMainVersionId() {
        return mainVersionId;
    }

    public void setMainVersionId(Long mainVersionId) {
        this.mainVersionId = mainVersionId;
    }

    public Integer getVersionType() {
        return versionType;
    }

    public void setVersionType(Integer versionType) {
        this.versionType = versionType;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}