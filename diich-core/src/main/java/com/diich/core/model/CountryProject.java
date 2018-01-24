package com.diich.core.model;

import com.diich.core.base.BaseModel;

public class CountryProject extends BaseModel {
    private Integer id;

    private Long projectNum;

    private Integer isGood;

    private Integer isWorld;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getProjectNum() {
        return projectNum;
    }

    public void setProjectNum(Long projectNum) {
        this.projectNum = projectNum;
    }

    public Integer getIsGood() {
        return isGood;
    }

    public void setIsGood(Integer isGood) {
        this.isGood = isGood;
    }

    public Integer getIsWorld() {
        return isWorld;
    }

    public void setIsWorld(Integer isWorld) {
        this.isWorld = isWorld;
    }
}