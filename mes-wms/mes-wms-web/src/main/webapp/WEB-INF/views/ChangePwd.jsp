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
    <meta name="keywords">
    <meta name="description">
</head>
<body class="dialog">
<div class="tab-pane active" id="widget_tab1">
    <table class="formtab_user">
        <tr>
            <td>当前密码</td>
            <td>
                <input id="currentPassword" name="currentPassword" type="password"
                       placeholder="请输入当前密码" class="input-medium">
            </td>
        </tr>
        <tr>
            <td>密码</td>
            <td>
                <input id="txtPassword" name="txtPassword" type="password"
                       placeholder="请输入密码" class="input-medium">
            </td>
        </tr>
        <tr>
            <td>确认密码</td>
            <td>
                <input id="txtConfirm" name="txtConfirm" type="password"
                       placeholder="请输入确认密码" class="input-medium">
            </td>
        </tr>
    </table>
</div>
</body>
</html>
