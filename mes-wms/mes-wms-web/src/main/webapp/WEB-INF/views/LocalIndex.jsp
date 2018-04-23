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
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>吉特仓储管理系统</title>
    <meta name="keywords" content="吉特仓储管理系统" />
    <meta name="description" content="吉特仓储管理系统" />

    <link href="${staticUrl}/localTheme/plugins/bootstrap/css/bootstrap.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/plugins/font-awesome/css/font-awesome.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/css/style.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/css/style-responsive.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/css/themes/default.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/localTheme/plugins/jbox-v2.3/jBox/Skins/Gray/jbox.css" type="text/css" rel="stylesheet" />

</head>

<body class="fixed-top">

<!-- header start -->
<jsp:include page="../commons/LocalHeader.jsp" />
<!-- header end -->

<div id="container" class="row-fluid">

    <!-- header start -->
    <jsp:include page="../commons/LocalLeftMenu.jsp" />
    <!-- header end -->

    <div id="body">
        <div id="widget-config" class="modal hide">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"></button>
                <h3>widget Settings</h3>
            </div>
            <div class="modal-body">
                <p>Here will be a configuration form</p>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    ${ViewBagNavMenu}
                </div>
            </div>
            <div class="row-fluid" style="text-align:center;">
                <br /><br /><br /><br /><br />
                <h1>欢迎使用吉特仓库管理系统</h1>

            </div>
        </div>
    </div>
</div>

<!-- header start -->
<jsp:include page="../commons/LocalFooter.jsp" />
<!-- header end -->

<script type="text/javascript" src="${staticUrl}/localTheme/plugins/jquery-1.8.3.min.js?t=9543ff5e-1bef-460a-ad46-b3f4c3702aae"></script>
<script type="text/javascript" src="${staticUrl}/localTheme/plugins/bootstrap/js/bootstrap.min.js?t=c0bb45b2-775a-4624-931c-33f89268dfd0"></script>
<script type="text/javascript" src="${staticUrl}/localTheme/plugins/jbox-v2.3/jBox/jquery.jBox-2.3.min.js?t=1e38ee21-076e-4590-8e18-2465db0320a7"></script>
<script type="text/javascript" src="${staticUrl}/localTheme/customer/jquery.jUploader-1.01.min.js?t=c259293d-7b7d-487e-80db-d757b3ee8d13"></script>
<script type="text/javascript" src="${staticUrl}/localTheme/customer/Git.Framework.Common.js?t=f4dc7ff8-a763-46e5-a022-00f96b5bd0ed"></script>
<script type="text/javascript" src="${staticUrl}/localTheme/customer/Git.Framework.UICommon.js?t=17c90e6d-c7b7-432f-aac7-14bfc15309bb"></script>
<script type="text/javascript" src="${staticUrl}/localTheme/customer/User/Git.Storage.User.js?t=8003bc11-3076-48e9-b54c-c5dbeb09b315"></script>

</body>

</html>
