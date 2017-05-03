package com.diich.core.model;

import java.util.Date;

/**
 * Created by Administrator on 2016/11/25.
 */
public class ICHMaster {
    private Long id;
    private Long resourceId;
    private Long ichItemId;
    private Long lastEditorId;
    private String doi;
    private String series;
    private String cnName;
    private String enName;
    private String pinyin;
    private Integer gender;
    private Integer nation;
    private Date birthDate;
    private Integer birthPlace;
    private Date deathDate;
    private Integer presentPlace;
    private Integer selectedYear;
    private Integer declareCity;
    private Date lastEditDate;
    private Integer editRank;
    private String introduction;
    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public Long getIchItemId() {
        return ichItemId;
    }

    public void setIchItemId(Long ichItemId) {
        this.ichItemId = ichItemId;
    }

    public Long getLastEditorId() {
        return lastEditorId;
    }

    public void setLastEditorId(Long lastEditorId) {
        this.lastEditorId = lastEditorId;
    }

    public String getDoi() {
        return doi;
    }

    public void setDoi(String doi) {
        this.doi = doi;
    }

    public String getSeries() {
        return series;
    }

    public void setSeries(String series) {
        this.series = series;
    }

    public String getCnName() {
        return cnName;
    }

    public void setCnName(String cnName) {
        this.cnName = cnName;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getPinyin() {
        return pinyin;
    }

    public void setPinyin(String pinyin) {
        this.pinyin = pinyin;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public Integer getNation() {
        return nation;
    }

    public void setNation(Integer nation) {
        this.nation = nation;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public Integer getBirthPlace() {
        return birthPlace;
    }

    public void setBirthPlace(Integer birthPlace) {
        this.birthPlace = birthPlace;
    }

    public Date getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(Date deathDate) {
        this.deathDate = deathDate;
    }

    public Integer getPresentPlace() {
        return presentPlace;
    }

    public void setPresentPlace(Integer presentPlace) {
        this.presentPlace = presentPlace;
    }

    public Integer getSelectedYear() {
        return selectedYear;
    }

    public void setSelectedYear(Integer selectedYear) {
        this.selectedYear = selectedYear;
    }

    public Integer getDeclareCity() {
        return declareCity;
    }

    public void setDeclareCity(Integer declareCity) {
        this.declareCity = declareCity;
    }

    public Date getLastEditDate() {
        return lastEditDate;
    }

    public void setLastEditDate(Date lastEditDate) {
        this.lastEditDate = lastEditDate;
    }

    public Integer getEditRank() {
        return editRank;
    }

    public void setEditRank(Integer editRank) {
        this.editRank = editRank;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
