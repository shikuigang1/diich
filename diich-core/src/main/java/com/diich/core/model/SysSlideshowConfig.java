package com.diich.core.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

/**
 * Created by Administrator on 2017/10/23.
 */
@Document(collection = "sys_slideshow_config")
public class SysSlideshowConfig implements Serializable {
    @Id
    private String id;//主键id
    @Field("content")
    private String content;//描述
    @Field("url")
    private String url;//链接路径
    @Field("img_ads")
    private String imgAds;//图片路径
    @Field("title")
    private String title;//标题名称
    @Field("user_id")
    private Integer userId;//用户id

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImgAds() {
        return imgAds;
    }

    public void setImgAds(String imgAds) {
        this.imgAds = imgAds;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
