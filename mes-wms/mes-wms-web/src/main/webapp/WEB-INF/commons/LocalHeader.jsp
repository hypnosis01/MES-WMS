<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<div id="header" class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container-fluid">
            <a class="brand" href="javascript:void(0)" style="width: 180px; color: white;">吉特仓储管理系统</a>
            <a class="btn btn-navbar collapsed" id="main_menu_trigger" data-toggle="collapse"
               data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="arrow"></span>
            </a>
            <div class="top-nav">
                <ul class="nav pull-right" id="top_menu">
                    <li class="divider-vertical hidden-phone hidden-tablet"></li>
                    <li class="divider-vertical hidden-phone hidden-tablet"></li>
                    <li class="dropdown">
                        <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-user"></i>&nbsp;当前登录
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="javascript:void(0)" onclick="AccountSetting.Add();">
                                    <i class="icon-user"></i>&nbsp;&nbsp;${userCur.userName}
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" onclick="AccountSetting.Edit();">
                                    <i class="icon-wrench"></i>&nbsp;&nbsp;修改密码
                                </a>
                            </li>
                            <li>
                                <a href="/rest/user/logout">
                                    <i class="icon-key"></i>退出系统
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

