package com.diich.core.model;

import com.diich.core.base.BaseModel;

/**
 * Created by Administrator on 2018/3/12.
 */
public class Authority extends BaseModel {
    private Long id;
    private String name;
    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
