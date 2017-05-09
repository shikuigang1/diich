package com.diich.core.model;

import com.diich.core.base.BaseModel;

/**
 * Created by Administrator on 2016/11/25.
 */
public class ICHMasterCertificate extends BaseModel{
    private Long id;
    private Long ichMasterId;
    private Long certificateId;
    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIchMasterId() {
        return ichMasterId;
    }

    public void setIchMasterId(Long ichMasterId) {
        this.ichMasterId = ichMasterId;
    }

    public Long getCertificateId() {
        return certificateId;
    }

    public void setCertificateId(Long certificateId) {
        this.certificateId = certificateId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
