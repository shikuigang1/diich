package com.diich.core.model;

/**
 * Created by Administrator on 2016/11/25.
 */
public class ICHMasterRelation {
    private String id;
    private String masterId;
    private String apprenticeId;
    private Integer status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMasterId() {
        return masterId;
    }

    public void setMasterId(String masterId) {
        this.masterId = masterId;
    }

    public String getApprenticeId() {
        return apprenticeId;
    }

    public void setApprenticeId(String apprenticeId) {
        this.apprenticeId = apprenticeId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
