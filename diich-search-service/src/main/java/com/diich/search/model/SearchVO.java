package com.diich.search.model;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/25 0025.
 */
public class SearchVO  {

    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProjjectName() {
        return projjectName;
    }

    public void setProjjectName(String projjectName) {
        this.projjectName = projjectName;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Map<String, String> getMasters() {
        return masters;
    }

    public void setMasters(Map<String, String> masters) {
        this.masters = masters;
    }

    private String content;//简介
    private String  category;//分类字符串
    private String  projjectName;//所属项目
    private int type;//结果对象类型 0 项目 1传承人 2 作品
    private String uri;//对应链接地址
    private String img;//项目题图 图片

    private Map<String,String> masters;//作品  作者

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    private long id;//对应targetID




}
