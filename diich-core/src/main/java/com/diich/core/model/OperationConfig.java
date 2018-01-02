package com.diich.core.model;

import com.google.common.collect.Lists;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.List;

/**
 * Created by sun on 2017/11/3.
 */
@Document(collection = "sys_operation_config")
public class OperationConfig {

    @Id
    private String id;
    @Field(value = "module_name")
    private String moduleName;
    @Field(value = "column_name")
    private String columnName;
    @Field(value = "user_id")
    private Integer userId;
    private Date date;
    private String title;
    private String cover;
    private String content;
    private String objId;
    private String objProjectName;
    private String intro;
    private String classifyName;//所属分类名称


    public List<InheritorInfo> getInheritorInfoList() {
        return inheritorInfoList;
    }

    public void setInheritorInfoList(List<InheritorInfo> inheritorInfoList) {
        this.inheritorInfoList = inheritorInfoList;
    }

    private List<InheritorInfo> inheritorInfoList = Lists.newArrayList();

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getObjProjectName() {
        return objProjectName;
    }

    public void setObjProjectName(String objProjectName) {
        this.objProjectName = objProjectName;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getObjId() {
        return objId;
    }

    public void setObjId(String objId) {
        this.objId = objId;
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


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getClassifyName() {
        return classifyName;
    }

    public void setClassifyName(String classifyName) {
        this.classifyName = classifyName;
    }
}
