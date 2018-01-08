package com.diich.core.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by Administrator on 2017/10/24.
 * 新闻资讯
 */
@Document(collection = "news")
public class News implements Serializable {
    @Id
    private String id;//主键id
    @Field("title")
    private String title;//标题
    @Field("content")
    private String content;//内容
    @Field("label_name")
    private String labelName;//是否置顶
    private String intro;//简介
    @Field("create_date")
    private Date createDate;//创建时间
    @Field("img_cover")
    private String imgCover;//封面图
    @Field("user_id")
    private Integer userId;//创建人id

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public String getLabelName() {
        return labelName;
    }

    public void setLabelName(String labelName) {
        this.labelName = labelName;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getImgCover() {
        return imgCover;
    }

    public void setImgCover(String imgCover) {
        this.imgCover = imgCover;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
