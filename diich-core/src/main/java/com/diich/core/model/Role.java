package com.diich.core.model;

import com.diich.core.base.BaseModel;

import java.util.List;

/**
 * Created by Administrator on 2018/3/12.
 */
public class Role extends BaseModel {
    private Long id;
    private String name;
    private Integer status;

    private List<Authority> authorities;//权限组

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

    public List<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<Authority> authorities) {
        this.authorities = authorities;
    }
}
