<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page import="java.util.UUID"%>
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

<head>
    <meta charset="utf-8"/>
    <title>条码仓库管理系统</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta content="条码仓库管理系统 " name="description"/>
    <meta content="条码仓库管理系统 " name="author"/>
    <link href="${staticUrl}/localTheme/plugins/jbox-v2.3/jBox/Skins/Gray/jbox.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/css/console.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/css/home.css" type="text/css" rel="stylesheet" />
    <style type="text/css">
        .logo {
            width: 100%;
            text-align: center;
            height: 35px;
            font-size: 30px;
            margin-top: 30px;
            color: #2A8FCD;
            font-weight: bold;
        }

        #home {
            margin: auto;
            position: initial;
        }

        .wrapper .item {
            margin-top: 10px;
            padding-left: 25px;
        }

        .item .btn-primary {
            width: 228px;
        }
    </style>
</head>

<body class="modal-ready">
<div class="logo">吉特仓储系统</div>
<div class="container">
    <div id="home">
        <div class="wrapper">
            <form action="">
                <fieldset>
                    <legend></legend>
                    <div class="item user">
                        <input type="text" id="input-username" name="input-username" value="admin"
                               placeholder="用户名"/>
                    </div>
                    <div class="item password">
                        <input type="password" id="input-password" name="input-password" value="000000"
                               placeholder="密码"/>
                    </div>
                    <div class="item">
                        <input id="login-btn" class="btn btn-primary" type="button" value="登录" onclick="User.Login()"/>
                    </div>
                </fieldset>
            </form>

        </div>
        <div class="footer"><a><c:out value="${LoginSign}" escapeXml="false" /></a></div>
    </div>
</div>
<input type="hidden" id="hdUrl" value=""/>
<script type="text/javascript" src="${staticUrl}/localTheme/plugins/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${staticUrl}/localTheme/plugins/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<script type="text/javascript" src="${staticUrl}/localTheme/customer/Git.Framework.Common.js?t=<%=UUID.randomUUID().toString()%>"></script>
<script type="text/javascript" src="${staticUrl}/localTheme/customer/Git.Framework.Login.js?t=<%=UUID.randomUUID().toString()%>"></script>
</body>
</html>
