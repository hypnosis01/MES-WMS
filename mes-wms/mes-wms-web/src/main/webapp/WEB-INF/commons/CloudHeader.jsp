<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<div id="header" class="navbar navbar-inverse navbar-fixed-top">
    <!-- BEGIN TOP NAVIGATION BAR -->
    <div class="navbar-inner">
        <div class="container-fluid">
            <!-- BEGIN LOGO -->
			<span class="brand" style="width:auto;color:white;">
			吉特仓储管理系统
			</span>
            <!-- END LOGO -->
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <a class="btn btn-navbar collapsed" id="main_menu_trigger" data-toggle="collapse"
               data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="arrow"></span>
            </a>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <div class="top-nav">
                <!-- BEGIN QUICK SEARCH FORM -->

                <!-- END QUICK SEARCH FORM -->
                <!-- BEGIN TOP NAVIGATION MENU -->
                <ul class="nav pull-right" id="top_menu">
                    <!-- 仓库选择 开始 -->
                    <li class="dropdown" id="header_notification_bar">
                        <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-list"></i><span>&nbsp;AA-1-1-2</span>
                        </a>
                        <ul class="dropdown-menu extended notification">
                            <li class="storage_item" data-StorageNum="9EAA9C7C98524D65BE6451210D15CA2C">
                                <a href="javascript:void(0)">
                                    <span class="label label-success"><i class="icon-star-empty"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;AA-1-1-2
                                </a>
                            </li>
                            <li class="storage_item" data-StorageNum="E06E13DF182643BC93A66B73B0ECEF9D">
                                <a href="javascript:void(0)">
                                    <span class="label label-success"><i class="icon-star-empty"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;AA-1-1-1
                                </a>
                            </li>
                            <li class="storage_item" data-StorageNum="B42FDD86EB5B41118ED4ABABE1EF013B">
                                <a href="javascript:void(0)">
                                    <span class="label label-success"><i class="icon-star-empty"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;总部物资库房
                                </a>
                            </li>
                            <li class="storage_item" data-StorageNum="53F9B2C9F9BB46CAA90E2D5F930A38D1">
                                <a href="javascript:void(0)">
                                    <span class="label label-success"><i class="icon-star-empty"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;上海静安机构
                                </a>
                            </li>
                            <li class="storage_item" data-StorageNum="1834A85035E74EC68A7C2A7CFD7CF93B">
                                <a href="javascript:void(0)">
                                    <span class="label label-success"><i class="icon-star-empty"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;商城专用库存
                                </a>
                            </li>
                            <li class="storage_item" data-StorageNum="1AC5939897C747CF95D2CDC92399FB3B">
                                <a href="javascript:void(0)">
                                    <span class="label label-success"><i class="icon-star-empty"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;道坤化工
                                </a>
                            </li>
                            <li class="storage_item" data-StorageNum="28F3670443834001A422A8A58B2C6C58">
                                <a href="javascript:void(0)">
                                    <span class="label label-success"><i class="icon-star-empty"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;KAWAI
                                </a>
                            </li>
                        </ul>
                    </li>
                    <!-- 仓库选择 结束 -->

                    <!-- BEGIN INBOX DROPDOWN -->

                    <!-- END INBOX DROPDOWN -->

                    <!-- BEGIN USER LOGIN DROPDOWN -->

                    <!-- END USER LOGIN DROPDOWN -->
                    <li class="divider-vertical hidden-phone hidden-tablet"></li>
                    <!-- BEGIN USER LOGIN DROPDOWN -->
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-user"></i>
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="javascript:void(0)"><i class="icon-user"></i>个人资料</a></li>
                            <li><a href="javascript:void(0)" onclick="AccountSetting.Edit()"><i
                                    class="icon-envelope-alt"></i>修改密码</a></li>

                            <li class="divider"></li>
                            <li><a href="/Home/LoginOut"><i class="icon-key"></i>退出系统</a></li>
                        </ul>
                    </li>
                    <!-- END USER LOGIN DROPDOWN -->
                </ul>
                <!-- END TOP NAVIGATION MENU -->
            </div>
        </div>
    </div>
    <!-- END TOP NAVIGATION BAR -->
</div>