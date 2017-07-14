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
    private Integer _offset = 0;//分页中的开始行数
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

    public Integer get_offset() {
        return _offset;
    }

    public void set_offset(Integer _offset) {
        this._offset = _offset;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public String toString() {
        return "keyword=" + keyword + ",category=" + category + ",area=" +
                area + ",type=" + type + ",_offset=" + _offset + ",pageSize=" + pageSize;
    }
}
