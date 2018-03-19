package com.diich.core.model;

import com.diich.core.base.BaseModel;

/**
 * Created by Administrator on 2017/7/5.
 */
public class SearchCondition extends BaseModel {
    private String keyword;
    private String category;
    private String area;
    private Integer type;
    private Integer offset = 0;//分页中的位移量
    private Integer pageSize = 6;

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public String toString() {
        String condtion = "";
        if(keyword != null) {
            condtion += keyword;
        }
        if(category != null) {
            condtion += category;
        }
        if(area != null) {
            condtion += area;
        }
        if(type != null) {
            condtion += type;
        }
        if(offset != null) {
            condtion += offset;
        }
        if(pageSize != null) {
            condtion += pageSize;
        }
        return condtion;
    }
}
