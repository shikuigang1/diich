package com.diich.core.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by wangwenjian on 2017/11/1.
 */
@Document(collection = "inheritor_info")
public class InheritorInfo implements Serializable {

    @Id
    private String id;
    @Field("t_grade")
    private String tGrade;//非遗等级
    @Field("t_grade_name")
    private String tGradeName;//非遗等级名称
    @Field("t_code")
    private String tCode;//非遗编码
    @Field("area_code")
    private String areaCode;//区域编码
    private String cover;//封面
    @Field("zh_name")
    private String zhName;//中文名
    @Field("eng_name")
    private String engName;//英文名
    @Field("pinyin")
    private String pinyin;//拼音
    private String sex;//性别
    @Field("country")
    private String country;//国家
    @Field("country_code")
    private String countryCode;//国籍
    @Field("id_code")
    private String idCode;//id编码
    @Field("birth_address")
    private String birthAddress;//出生地
    @Field("live_city")
    private String liveCity;//居住城市
    private String address;//地址
    @Field("nation_code")
    private String nationCode;//名族code
    @Field("nation_str")
    private String nationStr;//名族汉子
    @Field("id_type")
    private String idType;//证件类型
    @Field("id_num")
    private String idNum;//证件号
    private String birthday;//出生日期
    @Field("project_id")
    private String projectId;//项目id
    @Field("project_name")
    private String projectName;
    @Field("create_user_id")
    private Integer createUserId;//创建人id
    @Field("belong_user_id")
    private Integer belongUserId;//所属用户
    @Field("basic_custom")
    private List<Object> basicCustom;// 基本信息自定义
    @Field("other_custom")
    private List<Object> otherCustom; // 其他填写项集合 传承人信息
    @Field("create_date")
    private Date createDate;//创建时间
    @Field("glories")
    private String glories; // 荣誉称号
    private String position;//职务职称
    private String persduities;//行政职位
    private String persactitle;//职称
    private String profession;// 职业
    private String organization;//组织
    private String department;//部门
    private String intro;//简介
    @Field("selected_year")
    private String selectedYear;//入选年份

    @Field("inheritor_belong_info")
    private Object inheritorBelongInfo;

    public String getDataSources() {
        return dataSources;
    }

    public void setDataSources(String dataSources) {
        this.dataSources = dataSources;
    }

    @Field("data_sources")
    private String dataSources;

    private String accessUrl;

    public Object getInheritorBelongInfo() {
        return inheritorBelongInfo;
    }

    public void setInheritorBelongInfo(Object inheritorBelongInfo) {
        this.inheritorBelongInfo = inheritorBelongInfo;
    }

    public String getGlories() {
        return glories;
    }
    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    @Field("area_name")
    private String areaName;


    public void setGlories(String glories) {
        this.glories = glories;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String gettGrade() {
        return tGrade;
    }

    public void settGrade(String tGrade) {
        this.tGrade = tGrade;
    }

    public String gettCode() {
        return tCode;
    }

    public void settCode(String tCode) {
        this.tCode = tCode;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getZhName() {
        return zhName;
    }

    public void setZhName(String zhName) {
        this.zhName = zhName;
    }

    public String getEngName() {
        return engName;
    }

    public void setEngName(String engName) {
        this.engName = engName;
    }

    public String getPinyin() {
        return pinyin;
    }

    public void setPinyin(String pinyin) {
        this.pinyin = pinyin;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getIdCode() {
        return idCode;
    }

    public void setIdCode(String idCode) {
        this.idCode = idCode;
    }

    public String getBirthAddress() {
        return birthAddress;
    }

    public void setBirthAddress(String birthAddress) {
        this.birthAddress = birthAddress;
    }

    public String getNationCode() {
        return nationCode;
    }

    public void setNationCode(String nationCode) {
        this.nationCode = nationCode;
    }

    public String getIdType() {
        return idType;
    }

    public void setIdType(String idType) {
        this.idType = idType;
    }

    public String getIdNum() {
        return idNum;
    }

    public void setIdNum(String idNum) {
        this.idNum = idNum;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public Integer getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    public Integer getBelongUserId() {
        return belongUserId;
    }

    public void setBelongUserId(Integer belongUserId) {
        this.belongUserId = belongUserId;
    }

    public List<Object> getBasicCustom() {
        return basicCustom;
    }

    public void setBasicCustom(List<Object> basicCustom) {
        this.basicCustom = basicCustom;
    }

    public List<Object> getOtherCustom() {
        return otherCustom;
    }

    public void setOtherCustom(List<Object> otherCustom) {
        this.otherCustom = otherCustom;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLiveCity() {
        return liveCity;
    }

    public void setLiveCity(String liveCity) {
        this.liveCity = liveCity;
    }

    public String getSelectedYear() {
        return selectedYear;
    }

    public void setSelectedYear(String selectedYear) {
        this.selectedYear = selectedYear;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String gettGradeName() {
        return tGradeName;
    }

    public void settGradeName(String tGradeName) {
        this.tGradeName = tGradeName;
    }

    public String getPersduities() {
        return persduities;
    }

    public void setPersduities(String persduities) {
        this.persduities = persduities;
    }

    public String getPersactitle() {
        return persactitle;
    }

    public void setPersactitle(String persactitle) {
        this.persactitle = persactitle;
    }

    public String getNationStr() {
        return nationStr;
    }

    public void setNationStr(String nationStr) {
        this.nationStr = nationStr;
    }
}
