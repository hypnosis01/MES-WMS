<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String staticUrl = "http://static.sojo.com";
    request.setAttribute("staticUrl", staticUrl);
%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="zh" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="zh" class="ie9"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>

    <link href="${staticUrl}/localTheme/plugins/bootstrap/css/bootstrap.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/plugins/font-awesome/css/font-awesome.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/css/style.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/css/style-responsive.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/css/themes/default.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/plugins/jbox-v2.3/jBox/Skins/Gray/jbox.css" type="text/css" rel="stylesheet" />
</head>
<body class="dialog">
<div class="tab-pane active" id="widget_tab1">
    <table class="formtab_user">
        <tr>
            <td>用户编号</td>
            <td>
                <input id="txtUserCode" name="txtUserCode" type="text" placeholder="自动生成,可不填"
                       class="input-medium" disabled="disabled" value="${userCur.userCode}">
            </td>

            <td>用户名</td>
            <td>
                <input id="txtUserName" name="txtUserName" type="text" placeholder="请输入用户名"
                       class="input-medium" disabled="disabled" value="${userCur.userName}">
            </td>
        </tr>
        <tr>
            <td>真名</td>
            <td>
                <input id="txtRealName" name="txtRealName" type="text" placeholder=""
                       class="input-medium" value="${userCur.realName}">
            </td>

            <td>Email</td>
            <td>
                <input id="txtEmail" name="txtEmail" type="text" placeholder=""
                       class="input-medium" value="${userCur.email}">
            </td>
        </tr>

        <tr>
            <td>电话</td>
            <td>
                <input id="txtPhone" name="txtPhone" type="text" placeholder=""
                       class="input-medium" value="${userCur.phone}">
            </td>

            <td>手机</td>
            <td>
                <input id="txtMobile" name="txtMobile" type="text" placeholder=""
                       class="input-medium" value="${userCur.mobile}">
            </td>
        </tr>

        <tr>
            <td>部门</td>
            <td>
                <select id="ddlDepart" name="ddlDepart" disabled="disabled" style="width:164px;" class="input-medium">
                    @Html.Raw(ViewBag.DepartList)
                </select>
            </td>


            <td>角色</td>
            <td>
                <select id="ddlRole" name="ddlRole" disabled="disabled" style="width:164px;" class="input-medium">
                    @Html.Raw(ViewBag.RoleList)
                </select>
            </td>
        </tr>
    </table>
</div>
</body>

</html>


