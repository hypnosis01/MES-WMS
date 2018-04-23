<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String staticUrl = "http://static.sojo.com";
    request.setAttribute("staticUrl", staticUrl);
%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->

<head>
    <meta name="renderer" content="webkit">
    <meta charset="utf-8" />
    <title>吉特三方租赁仓储管理系统</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="吉特三方租赁仓储管理系统" name="description" />
    <meta content="吉特三方租赁仓储管理系统" name="author" />
    <link href="${staticUrl }/leaseTheme/plugins/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl }/leaseTheme/plugins/bootstrap/css/bootstrap-responsive.min.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl }/leaseTheme/plugins/font-awesome/css/font-awesome.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl }/leaseTheme/assets/css/style.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl }/leaseTheme/assets/css/style-responsive.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl }/leaseTheme/assets/css/themes/default.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl }/leaseTheme/plugins/uniform/css/uniform.default.css" type="text/css" rel="stylesheet" />
    <link href="#" rel="stylesheet" id="style_metro" />
    <link href="${staticUrl }/leaseTheme/assets/css/pages/login.css" type="text/css" rel="stylesheet" />
    <link href="${staticUrl }/leaseTheme/plugins/jbox-v2.3/jBox/Skins/Gray/jbox.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="logo" class="center" style="color:white;margin-top:70px;">
    吉特三方租赁仓储管理系统
</div>
<div id="login">
    <form id="loginform" class="form-vertical no-padding no-margin" action="index.html">
        <p class="center">输入用户名和密码.</p>
        <div class="control-group hide">
            <div class="controls">
                <div class="input-prepend">
                    <span class="add-on">
                        <i class="icon-sitemap"></i>
                    </span>
                    <input name="CompanyNum" type="text" placeholder="公司编码" value="C00001" />
                </div>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <div class="input-prepend">
                    <span class="add-on">
                        <i class="icon-user"></i>
                    </span>
                    <input name="UserName" type="text" placeholder="用户名" value="admin" />
                </div>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <div class="input-prepend">
                    <span class="add-on">
                        <i class="icon-lock"></i>
                    </span>
                    <input name="PassWord" type="password" placeholder="密码" value="000000"/>
                </div>
            </div>
        </div>
        <div class="control-group remember-me hide">
            <div class="controls">
                <label class="checkbox">
                    <input type="checkbox" name="remember" value="1" /> 记住密码
                </label>
                <a href="javascript:;" class="pull-right" id="forget-password">忘记密码?</a>
            </div>
        </div>
        <input type="button" id="login-btn" class="btn btn-block btn-inverse" value="登录" />
    </form>
    <form id="forgotform" class="form-vertical no-padding no-margin hide" action="index.html">
        <p class="center">输入您的邮箱重置密码.</p>
        <div class="control-group">
            <div class="controls">
                <div class="input-prepend">
                    <span class="add-on"><i class="icon-envelope"></i></span><input id="input-email" type="text" placeholder="邮箱" />
                </div>
            </div>
            <div class="space10"></div>
        </div>
        <input type="button" id="forget-btn" class="btn btn-block btn-inverse" value="确定" />
        <input type="hidden" id="hdReturnUrl"/>
    </form>
</div>
<div id="login-copyright">
    2017 &copy; 吉特三方租赁仓储管理系统-V5.0
</div>
<script type="text/javascript" src="${staticUrl }/leaseTheme/plugins/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${staticUrl }/leaseTheme/plugins/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${staticUrl }/leaseTheme/plugins/jbox-v2.3/jBox/jquery.jBox-2.3.min.js"></script>
<!--[if lt IE 9]>
<script type="text/javascript" src="${staticUrl }/leaseTheme/plugins/excanvas.js"></script>
<script type="text/javascript" src="${staticUrl }/leaseTheme/plugins/respond.js"></script>
<![endif]-->
<script type="text/javascript" src="${staticUrl }/leaseTheme/plugins/breakpoints/breakpoints.js"></script>
<script type="text/javascript" src="${staticUrl }/leaseTheme/customer/Git.Framework.Common.js"></script>
<script type="text/javascript" src="${staticUrl }/leaseTheme/customer/Git.Framework.UICommon.js"></script>
<script type="text/javascript" src="${staticUrl }/leaseTheme/plugins/uniform/jquery.uniform.min.js"></script>
<script type="text/javascript" src="${staticUrl }/leaseTheme/assets/scripts/app.js"></script>
<script type="text/javascript" src="${staticUrl }/leaseTheme/assets/scripts/login.js"></script>
<script>
    jQuery(document).ready(function () {
        App.init();
        Login.init();
    });
</script>
</body>
</html>