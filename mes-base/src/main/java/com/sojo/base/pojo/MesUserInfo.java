package com.sojo.base.pojo;

import java.util.Date;

public class MesUserInfo {
    private Long id;

    private String userName;

    private String passWord;

    private String userCode;

    private String realName;

    private String email;

    private String mobile;

    private String phone;

    private Date createTime;

    private String createIp;

    private String createUser;

    private Integer loginCount;

    private String picture;

    private Date updateTime;

    private Short isDelete;

    private Short status;

    private String departNum;

    private String parentCode;

    private String roleNum;

    private String remark;

    public MesUserInfo(Long id, String userName, String passWord, String userCode, String realName, String email, String mobile, String phone, Date createTime, String createIp, String createUser, Integer loginCount, String picture, Date updateTime, Short isDelete, Short status, String departNum, String parentCode, String roleNum, String remark) {
        this.id = id;
        this.userName = userName;
        this.passWord = passWord;
        this.userCode = userCode;
        this.realName = realName;
        this.email = email;
        this.mobile = mobile;
        this.phone = phone;
        this.createTime = createTime;
        this.createIp = createIp;
        this.createUser = createUser;
        this.loginCount = loginCount;
        this.picture = picture;
        this.updateTime = updateTime;
        this.isDelete = isDelete;
        this.status = status;
        this.departNum = departNum;
        this.parentCode = parentCode;
        this.roleNum = roleNum;
        this.remark = remark;
    }

    public MesUserInfo() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord == null ? null : passWord.trim();
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode == null ? null : userCode.trim();
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName == null ? null : realName.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreateIp() {
        return createIp;
    }

    public void setCreateIp(String createIp) {
        this.createIp = createIp == null ? null : createIp.trim();
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser == null ? null : createUser.trim();
    }

    public Integer getLoginCount() {
        return loginCount;
    }

    public void setLoginCount(Integer loginCount) {
        this.loginCount = loginCount;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture == null ? null : picture.trim();
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Short getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Short isDelete) {
        this.isDelete = isDelete;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public String getDepartNum() {
        return departNum;
    }

    public void setDepartNum(String departNum) {
        this.departNum = departNum == null ? null : departNum.trim();
    }

    public String getParentCode() {
        return parentCode;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode == null ? null : parentCode.trim();
    }

    public String getRoleNum() {
        return roleNum;
    }

    public void setRoleNum(String roleNum) {
        this.roleNum = roleNum == null ? null : roleNum.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}