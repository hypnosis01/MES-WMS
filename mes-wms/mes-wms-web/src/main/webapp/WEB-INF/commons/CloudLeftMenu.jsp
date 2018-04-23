<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<div id="sidebar" class="nav-collapse collapse">
    <div class="sidebar-toggler hidden-phone"></div>
    <div class="navbar-inverse">
        <form class="navbar-search visible-phone">
            <input type="text" class="search-query" placeholder="Search"/>
        </form>
    </div>
    <ul>
        <li class="start active ">
            <a href="/Home/Desktop">
                <i class="icon-home"></i>
                <span class="title">工作台</span>
            </a>
        </li>
        <li class="has-sub "><a href="javascript:void(0)"><i class="icon-bookmark-empty"></i><span
                class="title">系统设置</span><span class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/Home/UserList">员工管理</a></li>
                <li><a href="/Home/RoleList">角色管理</a></li>
                <li><a href="/Home/DepartList">部门管理</a></li>
                <li><a href="/Home/SysRes">资源管理</a></li>
                <li><a href="/Home/Power">权限分配</a></li>
                <li><a href="/Home/SN">标识符管理</a></li>
            </ul>
        </li>
        <li class="has-sub "><a href="javascript:void(0)"><i class="icon-table"></i><span class="title">基本资料</span><span
                class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/Storage/Storage/List">仓库管理</a></li>
                <li><a href="/Storage/Location/List">库位管理</a></li>
                <li><a href="/Storage/Equipment/List">设备管理</a></li>
                <li><a href="/Client/Supplier/List">供应商管理</a></li>
                <li><a href="/Client/Customer/List">客户管理</a></li>
                <li><a href="/Storage/Measure/List">计量单位</a></li>
                <li><a href="/Storage/ProductCategory/List">产品类别</a></li>
                <li><a href="/Storage/Product/List">产品管理</a></li>
                <li><a href="/Storage/Carrier/List">承运商管理</a></li>
            </ul>
        </li>
        <li class="has-sub "><a href="javascript:void(0)"><i class="icon-briefcase"></i><span
                class="title">仓库作业</span><span class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/Order/InStorage/List">入库管理</a></li>
                <li><a href="/Order/OutStorage/List">出库管理</a></li>
                <li><a href="/Order/Bad/List">报损管理</a></li>
                <li><a href="/Order/Move/List">移库管理</a></li>
                <li><a href="/Order/Check/List">盘点管理</a></li>
                <li><a href="/Order/Allocate/List">调拨管理</a></li>
            </ul>
        </li>
        <li class="has-sub "><a href="javascript:void(0)"><i class="icon-th-list"></i><span
                class="title">业务操作</span><span class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/Biz/Purchase/List">采购管理</a></li>
                <li><a href="/Biz/PurchaseReturn/List">采购退货</a></li>
                <li><a href="/Biz/Sale/List">销售管理</a></li>
                <li><a href="/Biz/SaleReturn/List">销售退货</a></li>
            </ul>
        </li>
        <li class="has-sub "><a href="javascript:void(0)"><i class="icon-money"></i><span class="title">财务管理</span><span
                class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/Finance/Cate/List">财务类别</a></li>
                <li><a href="/Finance/Bill/List">应收管理</a></li>
                <li><a href="/Finance/Pay/List">应付管理</a></li>
                <li><a href="/Finance/Pay/Record">财务记账</a></li>
            </ul>
        </li>
        <li class="has-sub "><a href="javascript:void(0)"><i class="icon-bar-chart"></i><span
                class="title">报表管理</span><span class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/Report/Manager/List">模板管理</a></li>
                <li><a href="/Report/Store/Location">库存清单</a></li>
                <li><a href="/Report/Store/SaleLocation">可出库存</a></li>
                <li><a href="/Report/Store/BalanceBook">期初期末</a></li>
                <li><a href="/Report/Store/InventoryBook">库存台账</a></li>
                <li><a href="/Report/Warn/List">库存预警</a></li>
                <li><a href="/Report/Capacity/List">库存容量</a></li>
            </ul>
        </li>


        <li class="">
            <a href="/Home/LoginOut">
                <i class="icon-user"></i>
                <span class="title">退出系统</span>
            </a>
        </li>
    </ul>
</div>