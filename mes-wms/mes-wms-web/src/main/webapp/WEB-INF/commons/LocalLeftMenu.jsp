<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<div id="sidebar" class="nav-collapse collapse">
    <div class="sidebar-toggler hidden-phone"></div>
    <ul>
        <li class="has-sub "><a href="javascript:void(0);"><i class="icon-bookmark-empty"></i><span
                class="title">系统设置</span><span class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/Home/UserList">员工管理</a></li>
                <li><a href="/Home/RoleList">角色管理</a></li>
                <li><a href="/Home/DepartList">部门管理</a></li>
                <li><a href="/Res/Index">菜单管理</a></li>
                <li><a href="/Res/Power">权限分配</a></li>
                <li><a href="/Home/SN">标识符管理</a></li>
                <li><a href="http:///www.baidu.com">测试</a></li>
            </ul>
        </li>
        <li class="has-sub "><a href="javascript:void(0);"><i class="icon-bookmark-empty"></i><span
                class="title">基本资料</span><span class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/Storage/Location/List">库位管理</a></li>
                <li><a href="/Client/Supplier/Index">供应商管理</a></li>
                <li><a href="/Client/Customer/Index">客户管理</a></li>
                <li><a href="/Storage/Measure/Index">计量单位</a></li>
                <li><a href="/Product/Goods/List">产品类别</a></li>
                <li><a href="/Product/Goods/Index">产品管理</a></li>
            </ul>
        </li>
        <li class="has-sub "><a href="javascript:void(0);"><i class="icon-bookmark-empty"></i><span
                class="title">仓库作业</span><span class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/InStorage/Product/List">入库管理</a></li>
                <li><a href="/OutStorage/Product/List">出库管理</a></li>
                <li><a href="/Bad/Product/List">报损管理</a></li>
                <li><a href="/Move/Product/List">移库管理</a></li>
                <li><a href="/Check/Product/List">盘点管理</a></li>
                <li><a href="/Returns/Product/List">退货管理</a></li>
            </ul>
        </li>
        <li class="has-sub "><a href="javascript:void(0);"><i class="icon-bookmark-empty"></i><span
                class="title">报表管理</span><span class="arrow "></span></a>
            <ul class="sub">
                <li><a href="/Report/Report/StockBillReport">库存清单</a></li>
                <li><a href="/Report/Report/ProductReport">货品统计</a></li>
                <li><a href="/Report/Report/ProductInOutReport">出入库报表</a></li>
                <li><a href="/Report/Report/InStorageReport">入库报表</a></li>
                <li><a href="/Report/Report/OutStorageReport">出库报表</a></li>
                <li><a href="/Report/Report/BadReport">报损报表</a></li>
                <li><a href="/Report/Report/ReturnReport">退货报表</a></li>
                <li><a href="/Report/Report/CustomerReport">客户报表</a></li>
                <li><a href="/Report/Report/SupplierReport">供应商报表</a></li>
                <li><a href="/Report/Report/InventoryReport">台账记录</a></li>
                <li><a href="/Report/Manager/List">自定义报表</a></li>
                <li><a href="/Report/Manager/List">TEST报表</a></li>
            </ul>
        </li>
        <li class="">
            <a href="/rest/user/logout">
                <i class="icon-user"></i>
                <span class="title">退出系统</span>
            </a>
        </li>
    </ul>
</div>
