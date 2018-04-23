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
    <meta name="renderer" content="webkit">
    <meta charset="utf-8" />
    <title>吉特仓储管理系统</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <link href="${staticUrl}/cloudTheme/plugins/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/cloudTheme/plugins/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
    <link href="${staticUrl}/cloudTheme/plugins/font-awesome/css/font-awesome.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/cloudTheme/assets/css/style.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/cloudTheme/assets/css/style-responsive.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/cloudTheme/assets/css/themes/default.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/cloudTheme/plugins/jbox-v2.3/jBox/Skins/Gray/jbox.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl}/cloudTheme/plugins/jquery-autocomplete3.2.2/jquery.autocomplete.css" rel="stylesheet" />
    <link href="${staticUrl}/cloudTheme/plugins/data-tables/DT_bootstrap.css" rel="stylesheet" />
    <link href="${staticUrl}/cloudTheme/plugins/mmGrid/src/mmGrid.css" rel="stylesheet" />

</head>

<body class="fixed-top">

<!-- header start -->
<jsp:include page="../commons/CloudHeader.jsp" />
<!-- header end -->

<div id="container" class="row-fluid ">

    <!-- header start -->
    <jsp:include page="../commons/CloudLeftMenu.jsp" />
    <!-- header end -->

    <div id="body">
        <div id="widget-config" class="modal hide">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Widget Settings</h3>
            </div>
            <div class="modal-body">
                <p>Here will be a configuration form</p>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <ul class="breadcrumb">
                        <li>
                            <i class="icon-home"></i>
                            <a href="/Home/Desktop">首页</a>
                            <i class="icon-angle-right"></i>
                        </li>
                        <li><a href="javascript:void(0)">桌面</a></li>
                    </ul>
                </div>
            </div>
            <div class="row-fluid" style="text-align:center;">
                <br /><br /><br /><br /><br />
                <h1>欢迎使用吉特仓储管理系统</h1>
            </div>
        </div>
    </div>
</div>

<!-- header start -->
<jsp:include page="../commons/CloudFooter.jsp" />
<!-- header end -->

<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/jquery-1.8.3.min.js?t=9543ff5e-1bef-460a-ad46-b3f4c3702aae"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/bootstrap/js/bootstrap.min.js?t=c0bb45b2-775a-4624-931c-33f89268dfd0"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/jbox-v2.3/jBox/jquery.jBox-2.3.min.js?t=1e38ee21-076e-4590-8e18-2465db0320a7"></script>
<!--[if lt IE 9]>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/excanvas.js"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/respond.js"></script>
<![endif]-->
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/breakpoints/breakpoints.js"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/moment/moment.min.js"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/common/common.js"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/customer/Git.Framework.Common.js?t=f4dc7ff8-a763-46e5-a022-00f96b5bd0ed"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/customer/Git.Framework.UICommon.js?t=17c90e6d-c7b7-432f-aac7-14bfc15309bb"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/data-tables/jquery.dataTables.js"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/data-tables/DT_bootstrap.js"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/jquery-autocomplete3.2.2/jquery.autocomplete.js"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/plugins/mmGrid/src/mmGrid.js"></script>
<script type="text/javascript" src="${staticUrl}/cloudTheme/assets/scripts/app.js"></script>

<script>
    jQuery(document).ready(function() {
        App.init();
    });
</script>
</body>
<!-- END BODY -->
</html>
