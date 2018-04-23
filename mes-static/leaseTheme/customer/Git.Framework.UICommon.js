$(document).ready(function () {

    var height = $(document).height();
    height = parseInt(height) - 80;
    $("#body").css("min-height", height);

    masterUI.Ad();

    masterUI.ChangeStorage();
    masterUI.ChangeLang();
});


/********************************************左侧菜单***********************************************/
var masterUI = {
    ToggleMenu: function () {
        //用于左侧菜单展开以及显示
        $(".sidebar-toggler").click(function () {
            var MenuStatus = "open";
            if (!$("#container").hasClass("sidebar-closed")) {
                $("#container").addClass("sidebar-closed");
                MenuStatus = "close";
            } else {
                $("#container").removeClass("sidebar-closed");
                MenuStatus = "open";
            }
            var param = {};
            param["MenuStatus"] = MenuStatus;
            $.gitAjax({
                url: "/Common/SetMenuStatus", type: "post", data: param, success: function (result) {
                }
            });
        });

        //右侧菜单点击操作
        $("#sidebar ul .has-sub").click(function () {
            var index = $("#sidebar ul .has-sub").index($(this));
            $("#sidebar ul .has-sub").each(function (i, item) {
                if (index == i) {
                    $(this).children(".sub").slideDown(500, function () {
                        if (!$(item).hasClass("active")) {
                            $(item).children("a").children(".arrow").addClass("open");
                            $(item).addClass("active");
                        }
                    });
                } else {
                    $(item).children(".sub").slideUp(500, function () {
                        if ($(item).hasClass("active")) {
                            $(item).removeClass("active");
                            $(item).children("a").children(".arrow").removeClass("open");
                        }
                    });
                }
            });
        });
    },
    Ad: function () {
        //$.jBox.messager("<img alt='' src='/Theme/img/PDA.jpg'/>", "&nbsp;&nbsp;系统动态:新增Android版本手持机支持 ", 10000, {
        //    width: 350, showType: 'fade', buttons: { '关闭': true }, submit: function (v, h, f) {
        //        //window.open("http://www.jooshow.com/");
        //        return true;
        //    }
        //});
    },
    ChangeStorage: function () {
        //切换仓库
        $("li.storage_item").click(function () {
            var StorageNum = $(this).attr("data-StorageNum");
            var param = {};
            param["StorageNum"] = StorageNum;
            $.gitAjax({
                url: "/Common/ChangeStorage", type: "post", data: param, success: function (result) {
                    window.location.reload();
                }
            });
        });
    },
    /**
     * 切换语言
     * [ChangeLang description]
     */
    ChangeLang: function () {
        $("li.lang_item").click(function () {
            var Lang = $(this).attr("data-lang");
            var param = {};
            param["Lang"] = Lang;
            $.gitAjax({
                url: "/Common/ChangeLang", type: "post", data: param, success: function (result) {
                    window.location.reload();
                }
            });
        });
    }
};


/********************************************选择仓库***********************************************/
;(function ($) {
    $.fn.StorageDialog = function (options) {
        var defaultOption = {
            data: {},
            Mult: true,
            EventName: "dblclick",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);
        var current = undefined;
        var DataServer = {
            TabGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Storage/StorageAjax/GetList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();
                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }

                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");

                var StorageName = current.find("input[name='StorageName']").val();

                var search = defaultOption.data || {};
                console.log(search);
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["StorageName"] = StorageName;

                var Server = DataServer.Server();
                Server.GetList(search, function (result) {
                    DataServer.SetTable(result);
                    $.jBox.closeTip();
                });
            },
            SetTable: function (result) {
                var cols = [
                    {
                        title: '仓库编号',
                        name: 'StorageNum',
                        width: 75,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '仓库名称',
                        name: 'StorageName',
                        width: 200,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '商户名',
                        name: 'AgencyName',
                        width: 200,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '联系人',
                        name: 'Contact',
                        width: 80,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '电话',
                        name: 'Phone',
                        width: 80,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                ];

                if (this.TabGrid == undefined) {
                    this.TabGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        height: 335,
                        nowrap: true,
                        multiSelect: defaultOption.Mult
                    });
                    //绑定事件
                    DataServer.BindEvent();
                } else {
                    this.TabGrid.load(result.Result);
                }

                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {
                //搜索
                current.find(".search").find('button[data-command="Search"]').unbind("click").bind("click", function (event) {
                    DataServer.PageClick(1, 10);
                });
            },
            GetSelect: function () {
                var list = [];
                if (this.TabGrid != undefined) {
                    var rows = this.TabGrid.selectedRows();
                    if (rows != undefined && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            list.push(rows[i]);
                        }
                    }
                }
                return list;
            }
        }

        return $(this).each(function (index, el) {
            var submit = function (v, h, f) {
                if (v == 1) {
                    var list = DataServer.GetSelect();
                    if (list == undefined || list.length == 0) {
                        $.jBox.tip("请选择仓库", "warn");
                        return false;
                    }
                    if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                        if (defaultOption.Mult) {
                            defaultOption.callBack.call(el, list);
                        } else {
                            defaultOption.callBack.call(el, list[0]);
                        }
                    }
                }
            };
            $(el).bind(defaultOption.EventName, function () {
                $.jBox.open("get:/Storage/Storage/Dialog", "选择仓库", 850, 530, {
                    buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                        current = h;
                        DataServer.TabGrid = undefined;
                        DataServer.PageClick(1, 10);
                    }
                });
            });
        });
    };
})(jQuery);


/********************************************选择库位***********************************************/
;(function ($) {
    $.fn.LocalDialog = function (options) {
        var defaultOption = {
            data: {},
            Mult: true,
            StorageSearch: false,
            EventName: "dblclick",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);
        var current = undefined;
        var DataServer = {
            TabGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Storage/LocationAjax/GetList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();
                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }

                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");
                var LocalName = current.find("input[name='LocalName']").val();
                var LocalBarCode = current.find("input[name='LocalBarCode']").val();
                var StorageNum = undefined;
                if (defaultOption.Target != undefined) {
                    StorageNum = defaultOption.Target.val();
                    if (git.IsEmpty(StorageNum)) {
                        $.jBox.tip('请选择仓库', 'warn');
                        return false;
                    }
                }
                StorageNum = current.find("select[name='StorageNum']").val();
                var search = defaultOption.data || {};
                if (search.ListLocalType == undefined) {
                    search.ListLocalType = JSON.stringify([]);
                }
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["LocalName"] = LocalName;
                search["LocalBarCode"] = LocalBarCode;
                search["StorageNum"] = StorageNum;

                var Server = DataServer.Server();
                Server.GetList(search, function (result) {
                    DataServer.SetTable(result);
                    $.jBox.closeTip();
                });
            },
            SetTable: function (result) {
                var cols = [
                    {
                        title: '库位编号',
                        name: 'LocalBarCode',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '库位名称',
                        name: 'LocalName',
                        width: 150,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '库位类型',
                        name: 'LocalType',
                        width: 100,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return git.GetEnumDesc(ELocalType, data);
                        }
                    },
                    {
                        title: '仓库',
                        name: 'StorageName',
                        width: 80,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '是否禁用',
                        name: 'IsForbid',
                        width: 85,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            if (data == EBoolJson.Yes) {
                                return "<input type='checkbox' checked='checked' name='IsForbid_item' disabled='disabled'/>";
                            } else {
                                return "<input type='checkbox' name='IsForbid_item' disabled='disabled'/>";
                            }
                        }
                    },
                    {
                        title: '是否默认',
                        name: 'IsDefault',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            if (data == EBoolJson.Yes) {
                                return "<input type='checkbox' checked='checked' name='IsForbid_item' disabled='disabled'/>";
                            } else {
                                return "<input type='checkbox' name='IsForbid_item' disabled='disabled'/>";
                            }
                        }
                    },
                ];

                if (this.TabGrid == undefined) {
                    this.TabGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        height: 335,
                        nowrap: true,
                        multiSelect: defaultOption.Mult
                    });
                    //绑定事件
                    DataServer.BindEvent();
                } else {
                    this.TabGrid.load(result.Result);
                }

                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {
                //搜索
                current.find(".search").find('button[data-command="Search"]').unbind("click").bind("click", function (event) {
                    DataServer.PageClick(1, 10);
                });

                DataServer.TabGrid.off("rowDblclick").on("rowDblclick", function (e, item, rowIndex) {
                    defaultOption.callBack(item);
                    $.jBox.close();
                });
            },
            GetSelect: function () {
                var list = [];
                if (this.TabGrid != undefined) {
                    var rows = this.TabGrid.selectedRows();
                    if (rows != undefined && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            list.push(rows[i]);
                        }
                    }
                }
                return list;
            }
        }

        return $(this).each(function (index, el) {
            var submit = function (v, h, f) {
                if (v == 1) {
                    var list = DataServer.GetSelect();
                    if (list == undefined || list.length == 0) {
                        $.jBox.tip("请选择库位", "warn");
                        return false;
                    }
                    if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {

                        if (defaultOption.Mult) {
                            defaultOption.callBack.call(el, list);
                        } else {
                            defaultOption.callBack.call(el, list[0]);
                        }
                    }
                }
            };
            $(el).bind(defaultOption.EventName, function () {
                $.jBox.open("get:/Storage/Location/Dialog", "选择库位", 850, 530, {
                    buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                        current = h;
                        if (defaultOption.Target != undefined) {
                            var StorageNum = defaultOption.Target.val();
                            if (git.IsEmpty(StorageNum)) {
                                $.jBox.tip('请选择仓库', 'warn');
                                return false;
                            } else {
                                current.find("select[name='StorageNum']").val(StorageNum);
                                current.find("select[name='StorageNum']").attr("disabled", "disabled");
                            }
                        }
                        DataServer.TabGrid = undefined;
                        DataServer.PageClick(1, 10);
                    }
                });
            });
        });
    };
})(jQuery);


/********************************************选择产品信息***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 **/
;(function ($) {
    $.fn.ProductDialog = function (options) {
        var defaultOption = {
            data: {},
            Mult: true,
            EventName: "dblclick",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);
        var current = undefined;

        var DataServer = {
            TabGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Storage/ProductAjax/GetList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();
                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }

                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");
                var Server = DataServer.Server();
                var search = defaultOption.data || {};
                var ProductName = current.find('input[name="ProductName"]').val();
                var BarCode = current.find('input[name="BarCode"]').val();
                var SupNum = undefined;
                if (defaultOption.Target != undefined) {
                    SupNum = $(defaultOption.Target).val();
                }
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["ProductName"] = ProductName;
                search["BarCode"] = BarCode;
                search["SupNum"] = SupNum;
                Server.GetList(search, function (result) {
                    DataServer.SetTable(result);
                    $.jBox.closeTip();
                });
            },
            SetTable: function (result) {

                var cols = [
                    {
                        title: '产品编号',
                        name: 'BarCode',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '产品名称',
                        name: 'ProductName',
                        width: 150,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '规格',
                        name: 'Size',
                        width: 85,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '类别',
                        name: 'CateName',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '单位',
                        name: 'UnitName',
                        width: 60,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '货主',
                        name: 'SupName',
                        width: 100,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '体积(cm)',
                        name: 'ProductVolume',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '单重(kg)',
                        name: 'NetWeight',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '价格',
                        name: 'AvgPrice',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                ];

                if (this.TabGrid == undefined) {
                    this.TabGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        height: 335,
                        nowrap: true,
                        multiSelect: defaultOption.Mult
                    });
                    //绑定事件
                    DataServer.BindEvent();
                } else {
                    this.TabGrid.load(result.Result);
                }
                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {
                //搜索
                current.find(".search").find('button[data-command="Search"]').unbind("click").bind("click", function (event) {
                    DataServer.PageClick(1, 10);
                });

                DataServer.TabGrid.off("rowDblclick").on("rowDblclick", function (e, item, rowIndex) {
                    defaultOption.callBack(item);
                    $.jBox.close();
                });
            },
            GetSelect: function () {
                var list = [];
                if (this.TabGrid != undefined) {
                    var rows = this.TabGrid.selectedRows();
                    if (rows != undefined && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            list.push(rows[i]);
                        }
                    }
                }
                return list;
            }
        }

        var submit = function (v, h, f) {
            if (v == 1) {
                var list = DataServer.GetSelect();
                if (list == undefined || list.length == 0) {
                    $.jBox.tip("请选择产品", "warn");
                    return false;
                }
                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    if (defaultOption.Mult) {
                        defaultOption.callBack(list);
                    } else {
                        defaultOption.callBack(list[0]);
                    }
                }
            }
        };

        $(this).bind(defaultOption.EventName, function () {
            $.jBox.open("get:/Storage/Product/Dialog", "选择产品", 850, 530, {
                buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                    current = h;
                    DataServer.TabGrid = undefined;
                    if (defaultOption.Target != undefined) {
                        var SupNum = $(defaultOption.Target).val();
                        if (git.IsEmpty(SupNum)) {
                            $.jBox.tip("请选择货主", "info");
                            return false;
                        }
                    }
                    DataServer.PageClick(1, 10);
                }
            });
        });
    };
})(jQuery);


/********************************************采购订单--选择产品***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 * 产品的基本信息,包含数量数据库
 **/
;(function ($) {
    $.fn.PurchaseDialog = function (options) {
        var defaultOption = {
            data: {},
            Mult: true,
            EventName: "dblclick",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);

        var DataServer = {
            TabGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Storage/ProductAjax/GetList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();
                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }

                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");
                var Server = DataServer.Server();
                var search = defaultOption.data || {};
                var ProductName = current.find('input[name="ProductName"]').val();
                var BarCode = current.find('input[name="BarCode"]').val();
                var SupNum = undefined;
                if (defaultOption.Target != undefined) {
                    SupNum = defaultOption.Target.val();
                    if (git.IsEmpty(SupNum)) {
                        $.jBox.tip('请选择货主', "warn");
                        return false;
                    }
                    search["SupNum"] = SupNum;
                }
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["ProductName"] = ProductName;
                search["BarCode"] = BarCode;
                Server.GetList(search, function (result) {
                    $.jBox.closeTip();
                    if (result.Code == 1) {
                        DataServer.SetTable(result);
                    } else {
                        $.jBox.tip(result.Message, "warn");
                    }
                });
            },
            SetTable: function (result) {

                var cols = [
                    {
                        title: '产品编号',
                        name: 'BarCode',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '产品名称',
                        name: 'ProductName',
                        width: 120,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '规格',
                        name: 'Size',
                        width: 50,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '数量',
                        name: 'Num',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="Num" class="m-wrap input-small" value="" style="width:35px;">';
                        }
                    },
                    {
                        title: '重量',
                        name: 'NetWeight',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="NetWeight" class="m-wrap input-small" value="" style="width:35px;">';
                        }
                    },
                    {
                        title: '体积',
                        name: 'Volume',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="Volume" class="m-wrap input-small" value="" style="width:35px;">';
                        }
                    },
                    {
                        title: '托盘',
                        name: 'PalletNum',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="PalletNum" class="m-wrap input-small" value="" style="width:35px;">';
                        }
                    },
                    {
                        title: '批次',
                        name: 'BatchNum',
                        width: 80,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="BatchNum" class="m-wrap input-small" value="" style="width:70px;" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd\'})">';
                        }
                    },
                    {
                        title: '过期时间',
                        name: 'LastTime',
                        width: 80,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="LastTime" class="m-wrap input-small" value="" style="width:70px;" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd\'})">';
                        }
                    },
                    {
                        title: '类别',
                        name: 'CateName',
                        width: 60,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '单位',
                        name: 'UnitName',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '货主',
                        name: 'SupName',
                        width: 100,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '体积(cm)',
                        name: 'ProductVolume',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },
                    {
                        title: '单重(kg)',
                        name: 'NetWeight',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            return val;
                        }
                    },

                ];

                if (this.TabGrid == undefined) {
                    this.TabGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        height: 360,
                        nowrap: true,
                        multiSelect: defaultOption.Mult
                    });
                    //绑定事件
                    DataServer.BindEvent();
                } else {
                    this.TabGrid.load(result.Result);
                }
                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {
                //搜索
                current.find(".search").find('button[data-command="Search"]').unbind("click").bind("click", function (event) {
                    DataServer.PageClick(1, 10);
                });

                DataServer.TabGrid.on('loadSuccess', function (e, data) {
                    current.find("#tabInfo").find('input[name="Num"]').each(function (i, item) {
                        var row = DataServer.TabGrid.row(i);
                        if (row == undefined) {
                            return false;
                        }
                        var parent = $(item).parent().parent().parent();
                        $(item).change(function (event) {
                            var Qty = $(this).val();
                            var ProductVolume = row.ProductVolume;
                            var ProductWeight = row.NetWeight;

                            Qty = git.IsEmptyNum(Qty);
                            ProductVolume = git.IsEmptyNum(ProductVolume);
                            ProductWeight = git.IsEmptyNum(ProductWeight);

                            var VolumeVal = parseFloat(Qty) * parseFloat(ProductVolume);
                            var NetWeightVal = parseFloat(Qty) * parseFloat(ProductWeight);

                            $(parent).find('input[name="Volume"]').val(VolumeVal);
                            $(parent).find('input[name="NetWeight"]').val(NetWeightVal);
                        });
                    });

                    current.find("#tabInfo").find('input[name="LastTime"]').each(function (i, item) {
                        var row = DataServer.TabGrid.row(i);
                        if (row == undefined) {
                            return false;
                        }
                        var parent = $(item).parent().parent().parent();
                        $(item).focus(function (event) {
                            var BatchNum = $(parent).find('input[name="BatchNum"]').val();
                            var Expiry = row.Expiry;
                            Expiry = git.IsEmptyNum(Expiry);
                            if (!git.IsEmpty(BatchNum) && Expiry >= 0) {
                                var date = moment(BatchNum).add(Expiry, 'days');
                                $(parent).find('input[name="LastTime"]').val(moment(date).format("YYYY-MM-DD"));
                            }
                        });
                    });
                });
            },
            GetSelect: function () {
                var list = [];
                current.find('#tabInfo').find('tr').each(function (index, el) {
                    var flag = $(el).find('input.mmg-check').attr("checked");
                    if (flag) {
                        var Num = $(el).find("input[name='Num']").val();
                        var NetWeight = $(el).find("input[name='NetWeight']").val();
                        var Volume = $(el).find("input[name='Volume']").val();
                        var PalletNum = $(el).find("input[name='PalletNum']").val();
                        var BatchNum = $(el).find("input[name='BatchNum']").val();
                        var LastTime = $(el).find("input[name='LastTime']").val();
                        Num = git.IsEmpty(Num) ? 0 : Num;
                        NetWeight = git.IsEmpty(NetWeight) ? 0 : NetWeight;
                        Volume = git.IsEmpty(Volume) ? 0 : Volume;
                        PalletNum = git.IsEmpty(PalletNum) ? 0 : PalletNum;
                        if (Num > 0) {
                            var item = DataServer.TabGrid.row(index);
                            item["Num"] = Num;
                            item["NetWeight"] = NetWeight;
                            item["Volume"] = Volume;
                            item["PalletNum"] = PalletNum;
                            item["BatchNum"] = BatchNum;
                            item["LastTime"] = LastTime;
                            list.push(item);
                        }
                    }
                });
                return list;
            }
        }

        var submit = function (v, h, f) {
            if (v == 1) {
                var list = DataServer.GetSelect();
                if (list == undefined || list.length == 0) {
                    $.jBox.tip("请选择产品", "warn");
                    return false;
                }
                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    if (defaultOption.Mult) {
                        defaultOption.callBack(list);
                    } else {
                        defaultOption.callBack(list[0]);
                    }
                }
            }
        };

        $(this).bind(defaultOption.EventName, function () {
            var SupNum = undefined;
            if (defaultOption.Target != undefined) {
                SupNum = defaultOption.Target.val();
                if (git.IsEmpty(SupNum)) {
                    $.jBox.tip('请选择货主', "warn");
                    return false;
                }
            }
            $.jBox.open("get:/Biz/Purchase/AddProduct", "采购订单-选择产品", 850, 555, {
                buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                    current = h;
                    DataServer.TabGrid = undefined;
                    DataServer.PageClick(1, 10);
                }
            });
        });
    };
})(jQuery);


/*******************************************出库申请单选择产品***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 * 出库申请单选择产品: 产品信息,正式库位(待入库未)库存总和,输入数量框
 **/
;(function ($) {
    $.fn.SaleProduct = function (options) {
        var defaultOption = {
            data: {},
            Mult: true,
            EventName: "dblclick",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);

        var DataServer = {
            TabGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Storage/StockAjax/GetLocalProduct";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();

                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }

                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");
                var ProductName = current.find('input[name="ProductName"]').val();
                var BarCode = current.find('input[name="BarCode"]').val();
                var SupNum = undefined;
                if (defaultOption.Target != undefined) {
                    SupNum = defaultOption.Target.val();
                    if (git.IsEmpty(SupNum)) {
                        $.jBox.tip('请先选择货主');
                        return false;
                    }
                }
                var Server = DataServer.Server();
                var search = {};
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["ProductName"] = ProductName;
                search["BarCode"] = BarCode;
                search["SupNum"] = SupNum;
                Server.GetList(search, function (result) {
                    DataServer.SetTable(result);
                    $.jBox.closeTip();
                });
            },
            SetTable: function (result) {
                var cols = [
                    {
                        title: '产品编码',
                        name: 'BarCode',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '产品名称',
                        name: 'ProductName',
                        width: 120,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '规格',
                        name: 'Size',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '数量',
                        name: 'Num',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '重量',
                        name: 'NetWeight',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '体积',
                        name: 'Volume',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '托盘',
                        name: 'PalletNum',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '出库数',
                        name: 'OutNum',
                        width: 60,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            var Qty = 0;
                            return '<input type="text" name="OutNum" style="width:45px;" class="m-wrap input-small" value="' + Qty + '">';
                        }
                    },
                    {
                        title: '出库重量',
                        name: 'OutNetWeight',
                        width: 60,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            var Qty = 0;
                            return '<input type="text" name="OutNetWeight" style="width:45px;" class="m-wrap input-small" value="' + git.ToDecimal(Qty, 2) + '">';
                        }
                    },
                    {
                        title: '出库体积',
                        name: 'OutVolume',
                        width: 60,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (val, item, rowIndex) {
                            var Qty = 0;
                            return '<input type="text" name="OutVolume" style="width:45px;" class="m-wrap input-small" value="' + git.ToDecimal(Qty, 2) + '">';
                        }
                    },
                    // {title:'出库托盘', name:'OutPalletNum', width: 60, align: 'center',lockWidth:false,  renderer: function(val,item,rowIndex){
                    //     var Qty=0;
                    //     return '<input type="text" name="OutPalletNum" style="width:45px;" class="m-wrap input-small" value="'+ Qty +'">';
                    // }},
                    {
                        title: '类别',
                        name: 'CateName',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '单位',
                        name: 'UnitName',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '单价',
                        name: 'OutPrice',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                ];

                if (this.TabGrid == undefined) {
                    this.TabGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        height: 335,
                        nowrap: true,
                        multiSelect: defaultOption.Mult
                    });
                    //绑定事件
                    DataServer.BindEvent();
                } else {
                    this.TabGrid.load(result.Result);
                }
                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {

                current.find(".search").find('button[data-command="Search"]').unbind("click").bind("click", function (event) {
                    DataServer.PageClick(1, 10);
                });

                DataServer.TabGrid.off("loadSuccess").on('loadSuccess', function (e, data) {
                    current.find("#tabInfo").find('input[name="OutNum"]').each(function (index, el) {

                        var row = DataServer.TabGrid.row(index);
                        console.log(row);
                        var Qty = $(el).val();
                        Qty = git.IsEmptyNum(Qty);
                        if (parseFloat(Qty) == 0) {
                            var parent = $(this).parent().parent();
                            $(parent).find("input.mmg-check").attr("disabled", true);
                        }
                        var parent = $(el).parent().parent().parent();
                        $(el).change(function () {
                            var OutNum = $(this).val();

                            OutNum = git.IsEmptyNum(OutNum);
                            var ProductVolume = row.ProductVolume;
                            var ProductWeight = row.ProductWeight;
                            var VolumeVal = parseFloat(OutNum) * parseFloat(ProductVolume);
                            var NetWeightVal = parseFloat(OutNum) * parseFloat(ProductWeight);
                            $(parent).find('input[name="OutNetWeight"]').val(NetWeightVal);
                            $(parent).find('input[name="OutVolume"]').val(VolumeVal);
                        });
                    });
                });

            },
            GetSelect: function () {
                var list = [];
                current.find('#tabInfo').find('tr').each(function (index, el) {
                    var flag = $(el).find('input.mmg-check').attr("checked");
                    if (flag) {
                        var OutNum = $(el).find("input[name='OutNum']").val();
                        var OutNetWeight = $(el).find("input[name='OutNetWeight']").val();
                        var OutVolume = $(el).find("input[name='OutVolume']").val();
                        var OutPalletNum = $(el).find("input[name='OutPalletNum']").val();

                        OutNum = git.IsEmptyNum(OutNum);
                        OutNetWeight = git.IsEmptyNum(OutNetWeight);
                        OutVolume = git.IsEmptyNum(OutVolume);
                        OutPalletNum = git.IsEmptyNum(OutPalletNum);

                        if (parseFloat(OutNum) > 0) {
                            var item = DataServer.TabGrid.row(index);
                            item["OutNum"] = OutNum;
                            item["OutNetWeight"] = OutNetWeight;
                            item["OutVolume"] = OutVolume;
                            item["OutPalletNum"] = OutPalletNum;
                            list.push(item);
                        }
                    }
                });
                return list;
            }
        }

        var submit = function (v, h, f) {
            if (v == 1) {
                var list = DataServer.GetSelect();
                if (list == undefined || list.length == 0) {
                    $.jBox.tip("请选择产品", "warn");
                    return false;
                }
                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    if (defaultOption.Mult) {
                        defaultOption.callBack(list);
                    } else {
                        defaultOption.callBack(list[0]);
                    }
                }
            }
        };

        $(this).bind(defaultOption.EventName, function () {
            var SupNum = undefined;
            if (defaultOption.Target != undefined) {
                SupNum = defaultOption.Target.val();
                if (git.IsEmpty(SupNum)) {
                    $.jBox.tip('请先选择货主');
                    return false;
                }
            }

            $.jBox.open("get:/Storage/Product/Product", "出库申请单-选择产品", 900, 530, {
                buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                    current = h;
                    DataServer.TabGrid = undefined;
                    DataServer.PageClick(1, 10);
                }
            });
        });
    };
})(jQuery);


/********************************************选择出库单产品***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 * 用于出库单的选择,自建出库单需要显示产品库位等信息
 **/
;(function ($) {
    $.fn.LocalProduct = function (options) {
        var defaultOption = {
            title: "选择库存产品",
            data: {},
            Mult: true,
            EventName: "click",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);
        var current = undefined;
        var DataServer = {
            TabGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Storage/StockAjax/GetOutAbleList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();
                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }
                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");
                var Server = DataServer.Server();
                var BarCode = current.find("input[name='BarCode']").val();
                var ProductName = current.find("input[name='ProductName']").val();
                var StorageNum = undefined;
                var SupNum = undefined;
                if (defaultOption.TargetStore != undefined) {
                    StorageNum = defaultOption.TargetStore.val();
                }
                if (defaultOption.TargetSup != undefined) {
                    SupNum = defaultOption.TargetSup.val();
                }
                var search = {};
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["BarCode"] = BarCode;
                search["ProductName"] = ProductName;
                search["StorageNum"] = StorageNum;
                search["SupNum"] = SupNum;

                Server.GetList(search, function (result) {
                    $.jBox.closeTip();
                    if (result.Code == 1) {
                        DataServer.SetTable(result);
                    } else {
                        $.jBox.tip(result.Message, "warn");
                    }
                });
            },
            SetTable: function (result) {

                var cols = [
                    {
                        title: '产品编号',
                        name: 'BarCode',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '产品名称',
                        name: 'ProductName',
                        width: 120,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '数量',
                        name: 'Num',
                        width: 40,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '体积',
                        name: 'Volume',
                        width: 40,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '重量',
                        name: 'NetWeight',
                        width: 40,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '托盘',
                        name: 'PalletNum',
                        width: 40,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '出库数',
                        name: 'Qty',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="Qty" class="m-wrap input-small" value="" style="width:40px;">';
                        }
                    },
                    {
                        title: '出体积',
                        name: 'VolumeVal',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="VolumeVal" class="m-wrap input-small" value="" style="width:40px;">';
                        }
                    },
                    {
                        title: '出重量',
                        name: 'NetWeightVal',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="NetWeightVal" class="m-wrap input-small" value="" style="width:40px;">';
                        }
                    },
                    {
                        title: '出托盘',
                        name: 'PalletNumVal',
                        width: 55,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="PalletNumVal" class="m-wrap input-small" value="" style="width:40px;">';
                        }
                    },
                    {
                        title: '产品批次',
                        name: 'BatchNum',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '过期时间',
                        name: 'LastTime',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return git.JsonToDateTime(data);
                        }
                    },
                    {
                        title: '仓库',
                        name: 'StorageName',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '库位',
                        name: 'LocalName',
                        width: 80,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                ];

                if (this.TabGrid == undefined) {
                    this.TabGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        height: 335,
                        nowrap: true,
                        multiSelect: defaultOption.Mult
                    });
                    DataServer.BindEvent();
                } else {
                    this.TabGrid.load(result.Result);
                }
                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {
                DataServer.TabGrid.on('loadSuccess', function (e, data) {
                    current.find("#tabInfo").find('input[name="Qty"]').each(function (i, item) {
                        var row = DataServer.TabGrid.row(i);
                        if (row == undefined) {
                            return false;
                        }
                        var parent = $(item).parent().parent().parent();

                        $(item).change(function (event) {
                            console.log(row);
                            var Qty = $(this).val();
                            var ProductVolume = row.ProductVolume;
                            var ProductWeight = row.ProductWeight;

                            Qty = git.IsEmpty(Qty) ? 0 : Qty;
                            ProductVolume = git.IsEmpty(ProductVolume) ? 0 : ProductVolume;
                            ProductWeight = git.IsEmpty(ProductWeight) ? 0 : ProductWeight;

                            var VolumeVal = parseFloat(Qty) * parseFloat(ProductVolume);
                            var NetWeightVal = parseFloat(Qty) * parseFloat(ProductWeight);

                            $(parent).find('input[name="VolumeVal"]').val(VolumeVal);
                            $(parent).find('input[name="NetWeightVal"]').val(NetWeightVal);
                        });
                    });
                });
            },
            GetSelect: function () {
                var list = [];
                current.find('#tabInfo').find('tr').each(function (index, el) {
                    var flag = $(el).find('input.mmg-check').attr("checked");
                    if (flag) {
                        var Qty = $(el).find("input[name='Qty']").val();
                        var VolumeVal = $(el).find("input[name='VolumeVal']").val();
                        var NetWeightVal = $(el).find("input[name='NetWeightVal']").val();
                        var PalletNumVal = $(el).find("input[name='PalletNumVal']").val();

                        Qty = git.IsEmptyNum(Qty)
                        VolumeVal = git.IsEmptyNum(VolumeVal);
                        NetWeightVal = git.IsEmptyNum(NetWeightVal);
                        PalletNumVal = git.IsEmptyNum(PalletNumVal);

                        if (parseFloat(Qty) > 0) {
                            var item = DataServer.TabGrid.row(index);
                            item["Qty"] = Qty;
                            item["VolumeVal"] = VolumeVal;
                            item["NetWeightVal"] = NetWeightVal;
                            item["PalletNumVal"] = PalletNumVal;
                            list.push(item);
                        }
                    }
                });
                return list;
            },
            Init: function () {
                //搜索
                current.find(".search").find('button[data-command="Search"]').click(function (event) {
                    DataServer.PageClick(1, 10);
                });
            }
        }

        var submit = function (v, h, f) {
            if (v == 1) {
                var list = DataServer.GetSelect();
                if (list.length == 0) {
                    $.jBox.tip("请选择产品信息");
                    return false;
                }
                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    if (defaultOption.Mult) {
                        defaultOption.callBack(list);
                    } else {
                        defaultOption.callBack(list[0]);
                    }
                }
            }
        };

        $(this).bind(defaultOption.EventName, function () {
            $.jBox.open("get:/Order/OutStorage/AddProduct", defaultOption.title, 850, 530, {
                buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                    current = h;
                    if (defaultOption.TargetStore != undefined) {
                        var StorageNum = defaultOption.TargetStore.val();
                        if (git.IsEmpty(StorageNum)) {
                            $.jBox.tip('请选择仓库', 'warn');
                            return false;
                        }
                    }
                    if (defaultOption.TargetSup != undefined) {
                        var SupNum = defaultOption.TargetSup.val();
                        if (git.IsEmpty(SupNum)) {
                            $.jBox.tip('请选择货主', 'warn');
                            return false;
                        }
                    }
                    DataServer.TabGrid = undefined;
                    DataServer.PageClick(1, 10);
                    DataServer.Init();
                }
            });
        });
    };
})(jQuery);


/********************************************选择客户***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 **/
;(function ($) {
    $.fn.CustomerDialog = function (options) {
        var defaultOption = {
            data: {},
            Mult: true,
            EventName: "dblclick",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);
        var current = undefined;

        var DataServer = {
            CusGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Client/CustomerAjax/GetAddressList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();

                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }

                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");
                var Server = DataServer.Server();
                var CusNum = current.find("input[name='CusNum']").val();
                var CusName = current.find("input[name='CusName']").val();
                var Address = current.find("input[name='Address']").val();
                var SupNum = undefined;
                if (defaultOption.Target != undefined) {
                    SupNum = defaultOption.Target.val();
                }
                if (SupNum == undefined) {
                    SupNum = current.find("select[name='SupNum']").val();
                }

                var search = {};
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["CusNum"] = CusNum;
                search["CusName"] = CusName;
                search["Address"] = Address;
                search["SupNum"] = SupNum;
                Server.GetList(search, function (result) {
                    DataServer.SetTable(result);
                    $.jBox.closeTip();
                });
            },
            SetTable: function (result) {
                var cols = [
                    {
                        title: '客户编号',
                        name: 'CusNum',
                        width: 90,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '客户名称',
                        name: 'CusName',
                        width: 100,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '货主',
                        name: 'SupName',
                        width: 90,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '地址',
                        name: 'Address',
                        width: 120,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '联系人',
                        name: 'Contact',
                        width: 90,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '电话',
                        name: 'Phone',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '备注',
                        name: 'Remark',
                        width: 100,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '邮箱',
                        name: 'Email',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '传真',
                        name: 'Fax',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '创建时间',
                        name: 'CreateTime',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return git.JsonToDateTime(data);
                        }
                    }
                ];

                if (this.CusGrid == undefined) {
                    this.CusGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        multiSelect: defaultOption.Mult,
                        height: 380
                    });
                    //绑定事件
                    DataServer.BindEvent();
                } else {
                    this.CusGrid.load(result.Result);
                }
                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {
                //搜索
                current.find(".search").find('button[data-command="Search"]').unbind("click").bind("click", function (event) {
                    DataServer.PageClick(1, 10);
                });

                DataServer.CusGrid.off("rowDblclick").on("rowDblclick", function (e, item, rowIndex) {
                    defaultOption.callBack(item);
                    $.jBox.close();
                });
            },
            GetSelect: function () {
                var list = [];
                if (this.CusGrid != undefined) {
                    var rows = this.CusGrid.selectedRows();
                    if (rows != undefined && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            list.push(rows[i]);
                        }
                    }
                }
                return list;
            }
        }

        var submit = function (v, h, f) {
            if (v == 1) {
                var list = DataServer.GetSelect();
                if (list == undefined || list.length == 0) {
                    $.jBox.tip("请选择客户", "warn");
                    return false;
                }
                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    if (defaultOption.Mult) {
                        defaultOption.callBack(list);
                    } else {
                        defaultOption.callBack(list[0]);
                    }
                }
            }
        };

        $(this).bind(defaultOption.EventName, function () {
            $.jBox.open("get:/Client/Customer/Dialog", "选择客户", 850, 580, {
                buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                    current = h;
                    DataServer.CusGrid = undefined;
                    if (defaultOption.Target != undefined) {
                        var SupNum = defaultOption.Target.val();
                        if (git.IsEmpty(SupNum)) {
                            $.jBox.tip("请先选择货主", "info");
                            return false;
                        } else {
                            current.find("select[name='SupNum']").val(SupNum);
                            current.find("select[name='SupNum']").attr("disabled", "disabled");
                        }
                    }
                    DataServer.PageClick(1, 10);
                }
            });
        });
    };
})(jQuery);

/********************************************选择货主***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 **/
;(function ($) {
    $.fn.SupplierDialog = function (options) {
        var defaultOption = {
            data: {},
            Mult: true,
            EventName: "dblclick",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);
        var current = undefined;

        var DataServer = {
            TabGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Client/SupplierAjax/GetList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();

                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }

                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");
                var Server = DataServer.Server();
                var SupNum = current.find("input[name='SupNum']").val();
                var SupName = current.find("input[name='SupName']").val();
                var Phone = current.find("input[name='Phone']").val();
                var search = {};
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["SupNum"] = SupNum;
                search["SupName"] = SupName;
                search["Phone"] = Phone;
                Server.GetList(search, function (result) {
                    $.jBox.closeTip();
                    if (result.Code == 1) {
                        DataServer.SetTable(result);
                    } else {
                        $.jBox.tip(result.Message, "warn");
                    }
                });
            },
            SetTable: function (result) {
                var cols = [
                    {
                        title: '货主编号',
                        name: 'SupNum',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '货主名称',
                        name: 'SupName',
                        width: 150,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '电话',
                        name: 'Phone',
                        width: 100,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '传真',
                        name: 'Fax',
                        width: 80,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: 'Email',
                        name: 'Email',
                        width: 85,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '联系人',
                        name: 'ContactName',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '地址',
                        name: 'Address',
                        width: 150,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                ];

                if (this.TabGrid == undefined) {
                    this.TabGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        height: 335,
                        nowrap: true,
                        multiSelect: defaultOption.Mult
                    });
                    //绑定事件
                    DataServer.BindEvent();
                } else {
                    this.TabGrid.load(result.Result);
                }
                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {
                //搜索
                current.find(".search").find('button[data-command="Search"]').click(function (event) {
                    DataServer.PageClick(1, 10);
                });

                //双击行
                DataServer.TabGrid.off("rowDblclick").on("rowDblclick", function (e, item, rowIndex) {
                    defaultOption.callBack(item);
                    $.jBox.close();
                });

            },
            GetSelect: function () {
                var list = [];
                if (this.TabGrid != undefined) {
                    var rows = this.TabGrid.selectedRows();
                    if (rows != undefined && rows.length > 0) {
                        for (var i = 0; i < rows.length; i++) {
                            list.push(rows[i]);
                        }
                    }
                }
                return list;
            }
        }

        var submit = function (v, h, f) {
            if (v == 1) {
                var list = DataServer.GetSelect();
                if (list == undefined || list.length == 0) {
                    $.jBox.tip("请选择货主", "warn");
                    return false;
                }
                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    if (defaultOption.Mult) {
                        defaultOption.callBack(list);
                    } else {
                        defaultOption.callBack(list[0]);
                    }
                }
            }
        };

        $(this).bind(defaultOption.EventName, function () {
            $.jBox.open("get:/Client/Supplier/Dialog", "选择货主", 850, 530, {
                buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                    current = h;
                    DataServer.TabGrid = undefined;
                    DataServer.PageClick(1, 10);
                }
            });
        });

    };
})(jQuery);


/********************************************选择员工***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 **/
;(function ($) {
    $.fn.UserDialog = function (options) {
        var defaultOption = {
            data: {},
            Mult: true,
            EventName: "dblclick",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);
        var submit = function (v, h, f) {
            if (v == 1) {
                var result = undefined;
                h.find("input[type='checkbox'][name='user_item']").each(function (i, item) {
                    var flag = $(item).attr("checked");
                    if (flag || flag == "checked") {
                        var data = $(item).attr("data-value");
                        if (!git.IsEmpty(data)) {
                            result = JSON.parse(unescape(data));
                        }
                    }
                });
                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    defaultOption.callBack(result);
                }
            }
        };
        $(this).bind(defaultOption.EventName, function () {
            $.jBox.open("get:/Home/Dialog", "选择用户", 850, 500, {
                buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {

                }
            });
        });
    };
})(jQuery);


/********************************************选择移库产品***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 **/
;(function ($) {
    $.fn.MoveProduct = function (options) {
        var defaultOption = {
            title: "选择移库产品",
            data: {},
            Mult: true,
            EventName: "click",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);

        var current = undefined;

        var DataServer = {
            TabGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Storage/StockAjax/GetList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();

                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }

                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");
                var Server = DataServer.Server();
                var BarCode = current.find("input[name='BarCode']").val();
                var ProductName = current.find("input[name='ProductName']").val();
                var LocalNum = current.find("select[name='LocalNum']").val();
                var StorageNum = undefined;
                var SupNum = undefined;
                if (defaultOption.TargetStore != undefined) {
                    StorageNum = defaultOption.TargetStore.val();
                    if (git.IsEmpty(StorageNum)) {
                        $.jBox.tip('请选择仓库', 'warn');
                        return false;
                    }
                }
                if (defaultOption.TargetSup != undefined) {
                    SupNum = defaultOption.TargetSup.val();
                    if (git.IsEmpty(SupNum)) {
                        $.jBox.tip('请选择货主', 'warn');
                        return false;
                    }
                }
                var search = {};
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["BarCode"] = BarCode;
                search["ProductName"] = ProductName;
                search["StorageNum"] = StorageNum;
                search["SupNum"] = SupNum;

                Server.GetList(search, function (result) {
                    DataServer.SetTable(result);
                    $.jBox.closeTip();
                });
            },
            SetTable: function (result) {

                var cols = [
                    {
                        title: '产品名称',
                        name: 'ProductName',
                        width: 120,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '批次',
                        name: 'BatchNum',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '数量',
                        name: 'Num',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '体积',
                        name: 'Volume',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '重量',
                        name: 'NetWeight',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '托盘',
                        name: 'PalletNum',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '移入库位',
                        name: 'ToLocalNum',
                        width: 85,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            var html = '';
                            html += '<input type="hidden" name="ToLocalNum">';
                            html += '<input type="text" name="ToLocalName" class="m-wrap input-small" value="" style="width:65px;">';
                            return html;
                        }
                    },
                    {
                        title: '移库数量',
                        name: 'MoveNum',
                        width: 50,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            var html = '';
                            html += '<input type="text" name="MoveNum" class="m-wrap input-small" value="" style="width:35px;">';
                            return html;
                        }
                    },
                    {
                        title: '移库体积',
                        name: 'MoveVolume',
                        width: 50,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            var html = '';
                            html += '<input type="text" name="MoveVolume" class="m-wrap input-small" value="" style="width:35px;">';
                            return html;
                        }
                    },
                    {
                        title: '移库重量',
                        name: 'MoveNetWeight',
                        width: 50,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            var html = '';
                            html += '<input type="text" name="MoveNetWeight" class="m-wrap input-small" value="" style="width:35px;">';
                            return html;
                        }
                    },
                    {
                        title: '移库托盘',
                        name: 'MovePalletNum',
                        width: 50,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            var html = '';
                            html += '<input type="text" name="MovePalletNum" class="m-wrap input-small" value="" style="width:35px;">';
                            return html;
                        }
                    },
                    {
                        title: '原库位',
                        name: 'LocalName',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '过期时间',
                        name: 'LastTime',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return git.JsonToDateTime(data);
                        }
                    },
                ];

                if (this.TabGrid == undefined) {
                    this.TabGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        height: 335,
                        nowrap: true,
                        multiSelect: defaultOption.Mult
                    });
                    //绑定事件
                    DataServer.BindEvent();
                } else {
                    this.TabGrid.load(result.Result);
                }
                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {
                this.TabGrid.off("loadSuccess").on('loadSuccess', function (e, data) {
                    //绑定选择库位事件
                    current.find("#tabInfo").find("input[name='ToLocalName']").LocalDialog({
                        Mult: false,
                        Target: defaultOption.TargetStore,
                        callBack: function (result) {
                            $(this).parent().children('input[name="ToLocalName"]').val(result.LocalName);
                            $(this).parent().children('input[name="ToLocalNum"]').val(result.LocalNum);
                        }
                    });
                });


                DataServer.TabGrid.on('loadSuccess', function (e, data) {
                    current.find("#tabInfo").find('input[name="MoveNum"]').each(function (i, item) {
                        var row = DataServer.TabGrid.row(i);
                        if (row == undefined) {
                            return false;
                        }

                        var parent = $(item).parent().parent().parent();
                        $(item).change(function (event) {
                            var Qty = $(this).val();
                            var Volume = row.ProductVolume;
                            var Weight = row.ProductWeight;
                            Qty = git.IsEmptyNum(Qty);
                            Volume = git.IsEmptyNum(Volume);
                            Weight = git.IsEmptyNum(Weight);
                            var VolumeVal = parseFloat(Qty) * parseFloat(Volume);
                            var WeightVal = parseFloat(Qty) * parseFloat(Weight);
                            $(parent).find('input[name="MoveVolume"]').val(VolumeVal);
                            $(parent).find('input[name="MoveNetWeight"]').val(WeightVal);
                        });
                    });
                });
            },
            GetSelect: function () {
                var list = [];
                current.find('#tabInfo').find('tr').each(function (index, el) {
                    var flag = $(el).find('input.mmg-check').attr("checked");
                    if (flag) {
                        var MoveNum = $(el).find("input[name='MoveNum']").val();
                        var MoveVolume = $(el).find("input[name='MoveVolume']").val();
                        var MoveNetWeight = $(el).find("input[name='MoveNetWeight']").val();
                        var MovePalletNum = $(el).find("input[name='MovePalletNum']").val();
                        var ToLocalNum = $(el).find("input[name='ToLocalNum']").val();
                        var ToLocalName = $(el).find("input[name='ToLocalName']").val();

                        MoveNum = git.IsEmpty(MoveNum) ? 0 : MoveNum;
                        MoveVolume = git.IsEmpty(MoveVolume) ? 0 : MoveVolume;
                        MoveNetWeight = git.IsEmpty(MoveNetWeight) ? 0 : MoveNetWeight;
                        MovePalletNum = git.IsEmpty(MovePalletNum) ? 0 : MovePalletNum;

                        if (!git.IsEmpty(MoveNum) && parseFloat(MoveNum) > 0) {
                            var item = DataServer.TabGrid.row(index);
                            item["Qty"] = MoveNum;
                            item["MoveVolume"] = MoveVolume;
                            item["MoveNetWeight"] = MoveNetWeight;
                            item["MovePalletNum"] = MovePalletNum;
                            item["ToLocalNum"] = ToLocalNum;
                            item["ToLocalName"] = ToLocalName;
                            list.push(item);
                        }
                    }
                });
                return list;
            },
            Init: function () {
                //搜索
                current.find(".search").find('button[data-command="Search"]').unbind("click").bind("click", function (event) {
                    DataServer.PageClick(1, 10);
                });
            }
        }

        var submit = function (v, h, f) {
            if (v == 1) {
                var list = DataServer.GetSelect();

                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    if (defaultOption.Mult) {
                        defaultOption.callBack(list);
                    } else {
                        defaultOption.callBack(list[0]);
                    }
                }
            }
        };

        $(this).bind(defaultOption.EventName, function () {
            var StorageNum = undefined;
            var SupNum = undefined;
            if (defaultOption.TargetStore != undefined) {
                StorageNum = defaultOption.TargetStore.val();
                if (git.IsEmpty(StorageNum)) {
                    $.jBox.tip('请选择仓库', 'warn');
                    return false;
                }
            }
            if (defaultOption.TargetSup != undefined) {
                SupNum = defaultOption.TargetSup.val();
                if (git.IsEmpty(SupNum)) {
                    $.jBox.tip('请选择货主', 'warn');
                    return false;
                }
            }
            $.jBox.open("get:/Order/Move/AddProduct", defaultOption.title, 1000, 530, {
                buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                    current = h;
                    DataServer.TabGrid = undefined;
                    DataServer.Init();
                    DataServer.PageClick(1, 10);
                }
            });
        });

    };
})(jQuery);


/********************************************选择报损产品***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 **/
;(function ($) {
    $.fn.BadProduct = function (options) {
        var defaultOption = {
            title: "选择报损产品",
            data: {},
            Mult: true,
            EventName: "click",
            callBack: undefined
        };
        defaultOption = $.extend(defaultOption, options);
        var current = undefined;

        var DataServer = {
            TabGrid: undefined,
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Storage/StockAjax/GetBadAbleList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();
                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }
                    return {
                        GetList: GetList
                    }
                })($, config);
                return dataServer;
            },
            PageClick: function (PageIndex, PageSize) {
                $.jBox.tip("正在努力加载数据...", "loading");
                var Server = DataServer.Server();
                var BarCode = current.find("input[name='BarCode']").val();
                var ProductName = current.find("input[name='ProductName']").val();
                var StorageNum = undefined;
                var SupNum = undefined;
                if (defaultOption.TargetStore != undefined) {
                    StorageNum = defaultOption.TargetStore.val();
                    if (git.IsEmpty(StorageNum)) {
                        $.jBox.tip('请选择仓库', 'warn');
                        return false;
                    }
                }
                if (defaultOption.TargetSup != undefined) {
                    SupNum = defaultOption.TargetSup.val();
                    if (git.IsEmpty(SupNum)) {
                        $.jBox.tip('请选择货主', 'warn');
                        return false;
                    }
                }

                var search = {};
                search["PageIndex"] = PageIndex;
                search["PageSize"] = PageSize;
                search["BarCode"] = BarCode;
                search["ProductName"] = ProductName;
                search["StorageNum"] = StorageNum;
                search["SupNum"] = SupNum;

                Server.GetList(search, function (result) {
                    DataServer.SetTable(result);
                    $.jBox.closeTip();
                });
            },
            SetTable: function (result) {

                var cols = [
                    {
                        title: '产品名称',
                        name: 'ProductName',
                        width: 120,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '批次',
                        name: 'BatchNum',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '过期时间',
                        name: 'LastTime',
                        width: 70,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return git.JsonToDateTime(data);
                        }
                    },
                    {
                        title: '数量',
                        name: 'Num',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '体积',
                        name: 'Volume',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '重量',
                        name: 'NetWeight',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '托盘',
                        name: 'PalletNum',
                        width: 45,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },

                    {
                        title: '报损数',
                        name: 'BadNum',
                        width: 50,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="BadNum" class="m-wrap input-small" value="" style="width:35px;">';
                        }
                    },
                    {
                        title: '损体积',
                        name: 'BadVolume',
                        width: 50,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="BadVolume" class="m-wrap input-small" value="" style="width:35px;">';
                        }
                    },
                    {
                        title: '损重量',
                        name: 'BadWeight',
                        width: 50,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="BadWeight" class="m-wrap input-small" value="" style="width:35px;">';
                        }
                    },
                    {
                        title: '损托盘',
                        name: 'BadPalletNum',
                        width: 50,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return '<input type="text" name="BadPalletNum" class="m-wrap input-small" value="" style="width:35px;">';
                        }
                    },

                    {
                        title: '规格',
                        name: 'Size',
                        width: 60,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '仓库',
                        name: 'StorageName',
                        width: 65,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                    {
                        title: '库位',
                        name: 'LocalName',
                        width: 80,
                        align: 'center',
                        lockWidth: false,
                        renderer: function (data, item, rowIndex) {
                            return data;
                        }
                    },
                ];

                if (this.TabGrid == undefined) {
                    this.TabGrid = current.find("#tabInfo").mmGrid({
                        cols: cols,
                        items: result.Result,
                        checkCol: true,
                        nowrap: true,
                        height: 335,
                        nowrap: true,
                        multiSelect: defaultOption.Mult
                    });
                    //绑定事件
                    DataServer.BindEvent();
                } else {
                    this.TabGrid.load(result.Result);
                }
                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }
            },
            BindEvent: function () {
                DataServer.TabGrid.on('loadSuccess', function (e, data) {
                    current.find("#tabInfo").find('input[name="BadNum"]').each(function (i, item) {
                        var row = DataServer.TabGrid.row(i);
                        if (row == undefined) {
                            return false;
                        }

                        var parent = $(item).parent().parent().parent();
                        $(item).change(function (event) {
                            var Qty = $(this).val();
                            var Volume = row.ProductVolume;
                            var Weight = row.ProductWeight;
                            Qty = git.IsEmptyNum(Qty);
                            Volume = git.IsEmptyNum(Volume);
                            Weight = git.IsEmptyNum(Weight);
                            var VolumeVal = parseFloat(Qty) * parseFloat(Volume);
                            var WeightVal = parseFloat(Qty) * parseFloat(Weight);
                            $(parent).find('input[name="BadVolume"]').val(VolumeVal);
                            $(parent).find('input[name="BadWeight"]').val(WeightVal);
                        });
                    });
                });
            },
            GetSelect: function () {
                var list = [];
                current.find('#tabInfo').find('tr').each(function (index, el) {
                    var flag = $(el).find('input.mmg-check').attr("checked");
                    if (flag) {
                        var BadNum = $(el).find("input[name='BadNum']").val();
                        var BadVolume = $(el).find("input[name='BadVolume']").val();
                        var BadWeight = $(el).find("input[name='BadWeight']").val();
                        var BadPalletNum = $(el).find("input[name='BadPalletNum']").val();
                        BadNum = git.IsEmptyNum(BadNum);
                        BadVolume = git.IsEmptyNum(BadVolume);
                        BadWeight = git.IsEmptyNum(BadWeight);
                        BadPalletNum = git.IsEmptyNum(BadPalletNum);

                        if (parseFloat(BadNum) > 0) {
                            var item = DataServer.TabGrid.row(index);
                            item["BadNum"] = BadNum;
                            item["BadVolume"] = BadVolume;
                            item["BadWeight"] = BadWeight;
                            item["BadPalletNum"] = BadPalletNum;
                            list.push(item);
                        }
                    }
                });
                return list;
            },
            Init: function () {
                //搜索
                current.find(".search").find('button[data-command="Search"]').unbind("click").bind("click", function (event) {
                    DataServer.PageClick(1, 10);
                });
            }
        }

        var submit = function (v, h, f) {
            if (v == 1) {
                var list = DataServer.GetSelect();

                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    if (defaultOption.Mult) {
                        defaultOption.callBack(list);
                    } else {
                        defaultOption.callBack(list[0]);
                    }
                }
            }
        };

        $(this).bind(defaultOption.EventName, function () {
            if (defaultOption.TargetStore != undefined) {
                var StorageNum = defaultOption.TargetStore.val();
                if (git.IsEmpty(StorageNum)) {
                    $.jBox.tip('请选择仓库', 'warn');
                    return false;
                }
            }
            if (defaultOption.TargetSup != undefined) {
                var SupNum = defaultOption.TargetSup.val();
                if (git.IsEmpty(SupNum)) {
                    $.jBox.tip('请选择货主', 'warn');
                    return false;
                }
            }
            $.jBox.open("get:/Order/Bad/AddProduct", defaultOption.title, 850, 530, {
                buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                    current = h;
                    DataServer.TabGrid = undefined;

                    DataServer.PageClick(1, 10);
                    DataServer.Init();
                }
            });
        });

    };
})(jQuery);


/********************************************选择自定义报表格式***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 **/
;(function ($) {
    $.fn.CusReportDialog = function (options) {
        var defaultOption = {
            title: "选择打印模板",
            data: {},
            Mult: false,
            EventName: "click",
            callBack: undefined,
            ReportType: undefined
        };
        defaultOption = $.extend(defaultOption, options);

        var current = undefined;
        var target = $(this);

        var DataServer = {
            Server: function () {
                var config = (function () {
                    var URL_GetList = "/Report/ManagerAjax/GetList";
                    return {
                        URL_GetList: URL_GetList
                    };
                })();

                //数据操作服务
                var dataServer = (function ($, config) {
                    //查询分页列表
                    var GetList = function (data, callback) {
                        $.gitAjax({
                            url: config.URL_GetList,
                            data: data,
                            type: "post",
                            dataType: "json",
                            success: function (result) {
                                if (callback != undefined && typeof callback == "function") {
                                    callback(result);
                                }
                            }
                        });
                    }

                    return {
                        GetList: GetList
                    }

                })($, config);
                return dataServer;
            },
            SetTable: function (result) {
                current.find("#tabInfo").DataTable({
                    destroy: true,
                    data: result.Result,
                    paging: false,
                    searching: false,
                    scrollX: false,
                    bAutoWidth: true,
                    bInfo: false,
                    ordering: false,
                    columns: [
                        {
                            data: 'SnNum', render: function (data, type, full, meta) {
                            return "<input type='checkbox' name='item_report' value='" + data + "' data-full='" + JSON.stringify(full) + "'/>";
                        }
                        },
                        {data: 'ReportNum'},
                        {data: 'ReportName'},
                        {data: 'Remark'}
                    ],
                    aoColumnDefs: [
                        {"sWidth": "15px", "aTargets": [0]}
                    ],
                    oLanguage: {
                        sEmptyTable: "没有查询到任何数据"
                    }
                });
                var pageInfo = result.PageInfo;
                if (pageInfo != undefined) {
                    current.find("#myMinPager").minpager({
                        pagenumber: pageInfo.PageIndex,
                        recordCount: pageInfo.RowCount,
                        pageSize: pageInfo.PageSize,
                        buttonClickCallback: DataServer.PageClick
                    });
                }

                DataServer.BindEvent();
            },
            BindEvent: function () {
                if (defaultOption.Mult) {
                    current.find("#tabInfo").find("input[name='item_all']").click(function (event) {
                        var flag = $(this).attr("checked");
                        if (flag) {
                            current.find("#tabInfo").find("input[name='item_report']").attr("checked", true);
                        } else {
                            current.find("#tabInfo").find("input[name='item_report']").attr("checked", false);
                        }
                    });
                }
                else {
                    current.find("#tabInfo").find("input[name='item_all']").hide();
                    current.find("#tabInfo").find("input[name='item_report']").click(function (event) {
                        current.find("#tabInfo").find("input[name='item_report']").attr('checked', false);
                        $(this).attr("checked", true);
                    });
                }
            },
            GetSelect: function () {
                var list = [];
                current.find("#tabInfo").find("input[name='item_report']").each(function (i, item) {
                    var flag = $(item).attr("checked");
                    if (flag) {
                        var value = $(item).attr("data-full");
                        var item = JSON.parse(value);
                        list.push(item);
                    }
                });
                return list;
            }
        }

        var submit = function (v, h, f) {
            if (v == 1) {
                var list = DataServer.GetSelect();

                if (defaultOption.callBack != undefined && typeof (defaultOption.callBack) == "function") {
                    if (defaultOption.Mult) {
                        defaultOption.callBack.call(target, list);
                    } else {
                        defaultOption.callBack.call(target, list[0]);
                    }
                }
            }
        };

        $(this).bind(defaultOption.EventName, function () {


            var Server = DataServer.Server();
            var search = {};
            search["ReportType"] = defaultOption.ReportType;

            Server.GetList(search, function (result) {
                var data = result.Result;
                if (data != undefined && data.length > 1) {
                    $.jBox.open("get:/Report/Manager/Dialog", defaultOption.title, 650, 400, {
                        buttons: {"选择": 1, "关闭": 2}, submit: submit, loaded: function (h) {
                            current = h;
                            DataServer.SetTable(result);
                        }
                    });
                } else {
                    defaultOption.callBack.call(target, data[0]);
                }
            });
        });

    };
})(jQuery);


/********************************************选择产品分类联动***********************************************/
/**
 * data: 传入参数
 * Mult:是否允许选择多个checkbox，默认是true
 * callBack: 选择之后的回调函数
 **/
;(function ($) {
    $.fn.SupChange = function (options) {
        var defaultOption = {
            data: {},
            CateTarget: undefined,
            UnitTarget: undefined,
            EventName: "change",
            callBack: undefined,
        };
        defaultOption = $.extend(defaultOption, options);

        var BindCate = function (SupNum) {
            if (defaultOption.CateTarget != undefined) {
                var param = {};
                param["SupNum"] = SupNum;
                $.gitAjax({
                    url: "/Storage/ProductCategoryAjax/GetList",
                    type: "post",
                    data: param,
                    success: function (result) {
                        var html = '';
                        if (result.Code == 1) {
                            var list = result.Result;
                            list = list == undefined ? [] : list;
                            html += '<option value="">请选择</option>';
                            for (var i = 0; i < list.length; i++) {
                                html += '<option value="' + list[i].SnNum + '">' + list[i].CateName + '</option>';
                            }
                        }
                        defaultOption.CateTarget.html(html);
                    }
                });
            }
        }

        var BindUnit = function (SupNum) {
            if (defaultOption.UnitTarget != undefined) {
                var param = {};
                param["SupNum"] = SupNum;
                $.gitAjax({
                    url: "/Storage/MeasureAjax/GetList",
                    type: "post",
                    data: param,
                    success: function (result) {
                        var html = '';
                        if (result.Code == 1) {
                            var list = result.Result;
                            list = list == undefined ? [] : list;
                            html += '<option value="">请选择</option>';
                            for (var i = 0; i < list.length; i++) {
                                html += '<option value="' + list[i].SnNum + '">' + list[i].CateName + '</option>';
                            }
                        }
                        defaultOption.CateTarget.html(html);
                    }
                });
            }
        }

        $(this).unbind(defaultOption.EventName).bind(defaultOption.EventName, function () {
            var SupNum = $(this).val();
            if (!git.IsEmpty(SupNum)) {
                BindCate(SupNum);
                BindUnit(SupNum);

                if (defaultOption.callBack != undefined) {
                    defaultOption.callBack(SupNum);
                }
            }
        });
    };
})(jQuery);


/****************************************************账户设置************************************************/
var AccountSetting = {
    Add: function () {
        var submit = function (v, h, f) {
            if (v == true) {
                var userCode = h.find("#txtUserCode").val();
                var userName = h.find("#txtUserName").val();
                var realName = h.find("#txtRealName").val();
                var email = h.find("#txtEmail").val();
                var phone = h.find("#txtPhone").val();
                var mobile = h.find("#txtMobile").val();
                var roleNum = h.find("#ddlRole").val();
                var departNum = h.find("#ddlDepart").val();
                if (userName == undefined || userName == "") {
                    $.jBox.tip("请输入用户名", "warn");
                    return false;
                }
                var param = {};
                param["UserCode"] = userCode;
                param["UserName"] = userName;
                param["RealName"] = realName;
                param["Email"] = email;
                param["Phone"] = phone;
                param["Mobile"] = mobile;
                param["RoleNum"] = roleNum;
                param["DepartNum"] = departNum;
                $.gitAjax({
                    url: "/UserAjax/AddUser",
                    type: "post",
                    data: {"entity": JSON.stringify(param)},
                    success: function (result) {
                        if (result.d == "success") {
                            $.jBox.tip("编辑成功", "success");
                            User.PageClick(1, 10);
                        } else {
                            $.jBox.tip("编辑失败", "error");
                        }
                    }
                });
                return true;
            } else {
                return true;
            }
        }
        $.jBox.open("get:/Home/AccountSetting", "编辑用户", 500, 270, {buttons: {"确定": true, "关闭": false}, submit: submit});
    },
    Edit: function () {
        var submit = function (v, h, f) {
            if (v == true) {
                var CurrentPass = h.find('input[name="CurrentPass"]').val();
                var NewPass = h.find('input[name="NewPass"]').val();
                var ConfirmPass = h.find('input[name="ConfirmPass"]').val();
                var UserNum = h.find('input[name="UserNum"]').val();

                if (git.IsEmpty(CurrentPass)) {
                    $.jBox.tip("请输入当前密码", "warn");
                    return false;
                }
                if (git.IsEmpty(NewPass)) {
                    $.jBox.tip("请输入密码", "warn");
                    return false;
                }
                if (git.IsEmpty(ConfirmPass)) {
                    $.jBox.tip("请输入确认密码", "warn");
                    return false;
                }
                if (NewPass != ConfirmPass) {
                    $.jBox.tip("密码和确认密码不一致", "warn");
                    return false;
                }
                if (git.IsEmpty(UserNum)) {
                    $.jBox.tip("该非法操作已经被禁止", "warn");
                    return false;
                }

                var param = {};
                param["CurrentPass"] = CurrentPass;
                param["NewPass"] = NewPass;
                param["ConfirmPass"] = ConfirmPass;
                param["UserNum"] = UserNum;

                $.gitAjax({
                    url: "/UserAjax/ChangePass", type: "post", data: param, success: function (result) {
                        if (result.Code == 1) {
                            $.jBox.tip("修改成功,请重新登录", "success");
                            $.jBox.close();
                        } else {
                            $.jBox.tip(result.Message, "error");

                        }
                    }
                });
                return false;
            } else {
                return true;
            }
        }
        $.jBox.open("get:/Home/EditPass", "修改密码", 350, 250, {buttons: {"确定": true, "关闭": false}, submit: submit});
    }
};