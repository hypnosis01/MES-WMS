var EAudite = [
    {
        "Name": "Wait",
        "Value": "1",
        "Description": "等待审核"
    },
    {
        "Name": "Pass",
        "Value": "2",
        "Description": "审核成功"
    },
    {
        "Name": "NotPass",
        "Value": "3",
        "Description": "审核失败"
    }
];
var EBadType = [
    {
        "Name": "Bad",
        "Value": "1",
        "Description": "损坏报损"
    },
    {
        "Name": "Loss",
        "Value": "2",
        "Description": "丢失报损"
    }
];
var ECusType = [
    {
        "Name": "Cooperation",
        "Value": "1",
        "Description": "合作客户"
    },
    {
        "Name": "Potential",
        "Value": "2",
        "Description": "潜在客户"
    },
    {
        "Name": "Lost",
        "Value": "3",
        "Description": "丢失客户"
    },
    {
        "Name": "Invented",
        "Value": "4",
        "Description": "虚拟客户"
    }
];
var EInType = [
    {
        "Name": "Purchase",
        "Value": "1",
        "Description": "采购收货入库"
    },
    {
        "Name": "SellToBack",
        "Value": "2",
        "Description": "销售退货入库"
    },
    {
        "Name": "Produce",
        "Value": "3",
        "Description": "生产产品入库"
    },
    {
        "Name": "BorrowToBack",
        "Value": "4",
        "Description": "领用退还入库"
    },
    {
        "Name": "BorrowIn",
        "Value": "5",
        "Description": "借货入库"
    },
    {
        "Name": "BorrowOut",
        "Value": "6",
        "Description": "借出还入"
    }
];
var EEquipmentStatus = [
    {
        "Name": "Unused",
        "Value": "1",
        "Description": "闲置"
    },
    {
        "Name": "IsUsing",
        "Value": "2",
        "Description": "正在使用"
    },
    {
        "Name": "Repair",
        "Value": "3",
        "Description": "报修"
    },
    {
        "Name": "Breakage",
        "Value": "4",
        "Description": "报损"
    },
    {
        "Name": "Lost",
        "Value": "5",
        "Description": "遗失"
    }
];
var EIsDelete = [
    {
        "Name": "NotDelete",
        "Value": "0",
        "Description": "未删除"
    },
    {
        "Name": "Deleted",
        "Value": "1",
        "Description": "已删除"
    }
];
var ELocalType = [
    {
        "Name": "Normal",
        "Value": "1",
        "Description": "正式库区"
    },
    {
        "Name": "WaitIn",
        "Value": "2",
        "Description": "待入库区"
    },
    {
        "Name": "WaitCheck",
        "Value": "3",
        "Description": "待检库区"
    },
    {
        "Name": "WaitOut",
        "Value": "4",
        "Description": "待出库区"
    },
    {
        "Name": "Bad",
        "Value": "5",
        "Description": "报损库区"
    }
];
var EMoveType = [
    {
        "Name": "ToRack",
        "Value": "1",
        "Description": "移库上架"
    },
    {
        "Name": "RackToRack",
        "Value": "2",
        "Description": "仓库移库"
    },
    {
        "Name": "MoveToBad",
        "Value": "3",
        "Description": "报损移库"
    }
];
var EOutType = [
    {
        "Name": "BuyToBack",
        "Value": "1",
        "Description": "采购退货出库"
    },
    {
        "Name": "Sell",
        "Value": "2",
        "Description": "销售提货出库"
    },
    {
        "Name": "Use",
        "Value": "3",
        "Description": "领用出库"
    },
    {
        "Name": "Borrow",
        "Value": "4",
        "Description": "借货出库"
    },
    {
        "Name": "ToBack",
        "Value": "5",
        "Description": "借入还出"
    }
];
var EProductType = [
    {
        "Name": "Material",
        "Value": "1",
        "Description": "原料"
    },
    {
        "Name": "Goods",
        "Value": "2",
        "Description": "产品"
    }
];
var EReturnStatus = [
    {
        "Name": "Success",
        "Value": "1",
        "Description": "Success"
    },
    {
        "Name": "Error",
        "Value": "2",
        "Description": "Error"
    },
    {
        "Name": "Pass",
        "Value": "3",
        "Description": "Pass"
    }
];
var EStorageType = [
    {
        "Name": "Product",
        "Value": "1",
        "Description": "成品仓库"
    },
    {
        "Name": "Material",
        "Value": "2",
        "Description": "原料仓库"
    },
    {
        "Name": "Semiproduct",
        "Value": "3",
        "Description": "半成品仓库"
    }
];
var EOpType = [
    {
        "Name": "PC",
        "Value": "1",
        "Description": "电脑"
    },
    {
        "Name": "PDA",
        "Value": "2",
        "Description": "PDA"
    }
];
var ECheckType = [
    {
        "Name": "Local",
        "Value": "1",
        "Description": "库位盘点"
    },
    {
        "Name": "Product",
        "Value": "2",
        "Description": "产品盘点"
    }
];
var EReturnType = [
    {
        "Name": "Sell",
        "Value": "1",
        "Description": "销售退货"
    },
    {
        "Name": "Purchase",
        "Value": "2",
        "Description": "采购退货"
    }
];
var EChange = [
    {
        "Name": "In",
        "Value": "1",
        "Description": "入库"
    },
    {
        "Name": "Out",
        "Value": "2",
        "Description": "出库"
    },
    {
        "Name": "MoveOut",
        "Value": "3",
        "Description": "移库-入"
    },
    {
        "Name": "BadOut",
        "Value": "4",
        "Description": "报损-入"
    },
    {
        "Name": "InventoryIncome",
        "Value": "5",
        "Description": "盘盈"
    },
    {
        "Name": "AllocateIn",
        "Value": "7",
        "Description": "调拨-入"
    },
    {
        "Name": "AllocateOut",
        "Value": "-7",
        "Description": "调拨-出"
    },
    {
        "Name": "InventoryLoss",
        "Value": "-5",
        "Description": "盘亏"
    },
    {
        "Name": "BadIn",
        "Value": "-4",
        "Description": "报损-出"
    },
    {
        "Name": "MoveIn",
        "Value": "-3",
        "Description": "移库-出"
    }
];
var EOrderStatus = [
    {
        "Name": "CreateOrder",
        "Value": "1",
        "Description": "创建订单"
    },
    {
        "Name": "OrderConfirm",
        "Value": "2",
        "Description": "订单确认"
    },
    {
        "Name": "OrderCancel",
        "Value": "3",
        "Description": "订单取消"
    },
    {
        "Name": "InTheStock",
        "Value": "4",
        "Description": "备货中"
    },
    {
        "Name": "PartialDelivery",
        "Value": "5",
        "Description": "部分出货"
    },
    {
        "Name": "AllDelivery",
        "Value": "6",
        "Description": "全部出货"
    },
    {
        "Name": "DeliveryFailure",
        "Value": "7",
        "Description": "出货失败"
    }
];
var EOrderType = [
    {
        "Name": "Really",
        "Value": "1",
        "Description": "实际订单"
    },
    {
        "Name": "Invented",
        "Value": "2",
        "Description": "虚拟订单"
    }
];
var ESupType = [
    {
        "Name": "Invented",
        "Value": "1",
        "Description": "虚拟供应商"
    },
    {
        "Name": "Cooperation",
        "Value": "2",
        "Description": "合作供应商"
    }
];
var EDataSourceType = [
    {
        "Name": "SQL",
        "Value": "1",
        "Description": "SQL语句"
    },
    {
        "Name": "Procedure",
        "Value": "2",
        "Description": "存储过程"
    }
];
var EReportType = [
    {
        "Name": "InBill",
        "Value": "1",
        "Description": "入库单"
    },
    {
        "Name": "OutBill",
        "Value": "2",
        "Description": "出库单"
    },
    {
        "Name": "CheckBill",
        "Value": "3",
        "Description": "盘点单"
    },
    {
        "Name": "AllocateBill",
        "Value": "4",
        "Description": "调拨"
    },
    {
        "Name": "BadBill",
        "Value": "5",
        "Description": "报损"
    },
    {
        "Name": "User",
        "Value": "41",
        "Description": "工号"
    },
    {
        "Name": "Product",
        "Value": "42",
        "Description": "产品"
    },
    {
        "Name": "Storage",
        "Value": "43",
        "Description": "仓库"
    },
    {
        "Name": "Location",
        "Value": "44",
        "Description": "库位"
    },
    {
        "Name": "Report",
        "Value": "100",
        "Description": "报表"
    }
];
var EElementType = [
    {
        "Name": "TextBox",
        "Value": "1",
        "Description": "文本框"
    },
    {
        "Name": "TextArea",
        "Value": "2",
        "Description": "文本域"
    },
    {
        "Name": "Select",
        "Value": "3",
        "Description": "下拉框"
    },
    {
        "Name": "DateTime",
        "Value": "4",
        "Description": "时间框"
    },
    {
        "Name": "Date",
        "Value": "5",
        "Description": "日期框"
    }
];
var ESequence = [
    {
        "Name": "Constant",
        "Value": "1",
        "Description": "常量"
    },
    {
        "Name": "Guid",
        "Value": "2",
        "Description": "GUID"
    },
    {
        "Name": "CustomerTime",
        "Value": "3",
        "Description": "自定义时间"
    },
    {
        "Name": "Sequence",
        "Value": "4",
        "Description": "流水号"
    },
    {
        "Name": "SequenceOfDay",
        "Value": "5",
        "Description": "每日流水号"
    }
];
var EFinanceStatus = [
    {
        "Name": "Wait",
        "Value": "1",
        "Description": "待审核"
    },
    {
        "Name": "Pass",
        "Value": "2",
        "Description": "审核通过"
    },
    {
        "Name": "NotPass",
        "Value": "3",
        "Description": "审核失败"
    },
    {
        "Name": "Cancel",
        "Value": "4",
        "Description": "取消"
    },
    {
        "Name": "InProgress",
        "Value": "5",
        "Description": "等待付款"
    },
    {
        "Name": "PayPart",
        "Value": "6",
        "Description": "部分付款"
    },
    {
        "Name": "PayFull",
        "Value": "7",
        "Description": "全部付款"
    }
];
var EPayType = [
    {
        "Name": "AliPay",
        "Value": "1",
        "Description": "支付宝"
    },
    {
        "Name": "OnlineBank",
        "Value": "2",
        "Description": "网银"
    },
    {
        "Name": "HuiKuan",
        "Value": "3",
        "Description": "汇款"
    }
];
var EFinanceType = [
    {
        "Name": "BillReceivable",
        "Value": "1",
        "Description": "应收"
    },
    {
        "Name": "Payable",
        "Value": "2",
        "Description": "应付"
    },
    {
        "Name": "BillReceivableBack",
        "Value": "3",
        "Description": "应收(退款)"
    },
    {
        "Name": "PayableBack",
        "Value": "4",
        "Description": "应付(退款)"
    }
];
var EPurchaseType = [
    {
        "Name": "Really",
        "Value": "1",
        "Description": "实际订单"
    },
    {
        "Name": "Invented",
        "Value": "2",
        "Description": "虚拟订单"
    }
];
var EResourceType = [
    {
        "Name": "NoRole",
        "Value": "0",
        "Description": "非控制"
    },
    {
        "Name": "Page",
        "Value": "1",
        "Description": "页面"
    },
    {
        "Name": "Dialog",
        "Value": "2",
        "Description": "对话框"
    },
    {
        "Name": "Ajax",
        "Value": "3",
        "Description": "Ajax请求"
    },
    {
        "Name": "Link",
        "Value": "4",
        "Description": "链接"
    }
];
var EPurchaseStatus = [
    {
        "Name": "CreateOrder",
        "Value": "1",
        "Description": "创建订单"
    },
    {
        "Name": "OrderConfirm",
        "Value": "2",
        "Description": "订单确认"
    },
    {
        "Name": "OrderCancel",
        "Value": "3",
        "Description": "订单取消"
    },
    {
        "Name": "InTheStock",
        "Value": "4",
        "Description": "采购中"
    },
    {
        "Name": "PartialIn",
        "Value": "5",
        "Description": "部分入库"
    },
    {
        "Name": "AllIn",
        "Value": "6",
        "Description": "全部入库"
    },
    {
        "Name": "InFailure",
        "Value": "7",
        "Description": "入库失败"
    }
];
var EProductPackage = [
    {
        "Name": "Single",
        "Value": "1",
        "Description": "单品"
    },
    {
        "Name": "Combination",
        "Value": "2",
        "Description": "组合品"
    },
    {
        "Name": "Pack",
        "Value": "3",
        "Description": "包装品"
    }
];
var EAllocateType = [
    {
        "Name": "Equivalence",
        "Value": "1",
        "Description": "同价调拨"
    }
];
var ESaleReturnStatus = [
    {
        "Name": "CreateOrder",
        "Value": "1",
        "Description": "创建订单"
    },
    {
        "Name": "OrderConfirm",
        "Value": "2",
        "Description": "订单确认"
    },
    {
        "Name": "OrderCancel",
        "Value": "3",
        "Description": "订单取消"
    },
    {
        "Name": "InStorage",
        "Value": "4",
        "Description": "已入库"
    }
];
var EPurchaseReturnStatus = [
    {
        "Name": "CreateOrder",
        "Value": "1",
        "Description": "创建订单"
    },
    {
        "Name": "OrderConfirm",
        "Value": "2",
        "Description": "订单确认"
    },
    {
        "Name": "OrderCancel",
        "Value": "3",
        "Description": "订单取消"
    },
    {
        "Name": "OutStorage",
        "Value": "4",
        "Description": "已出库"
    }
];
var EBool = [
    {
        "Name": "No",
        "Value": "0",
        "Description": "否"
    },
    {
        "Name": "Yes",
        "Value": "1",
        "Description": "是"
    }
];
var EAuditeJson = {
    "Wait": "1",
    "Pass": "2",
    "NotPass": "3"
};
var EBadTypeJson = {
    "Bad": "1",
    "Loss": "2"
};
var ECusTypeJson = {
    "Cooperation": "1",
    "Potential": "2",
    "Lost": "3",
    "Invented": "4"
};
var EInTypeJson = {
    "Purchase": "1",
    "SellToBack": "2",
    "Produce": "3",
    "BorrowToBack": "4",
    "BorrowIn": "5",
    "BorrowOut": "6"
};
var EEquipmentStatusJson = {
    "Unused": "1",
    "IsUsing": "2",
    "Repair": "3",
    "Breakage": "4",
    "Lost": "5"
};
var EIsDeleteJson = {
    "NotDelete": "0",
    "Deleted": "1"
};
var ELocalTypeJson = {
    "Normal": "1",
    "WaitIn": "2",
    "WaitCheck": "3",
    "WaitOut": "4",
    "Bad": "5"
};
var EMoveTypeJson = {
    "ToRack": "1",
    "RackToRack": "2",
    "MoveToBad": "3"
};
var EOutTypeJson = {
    "BuyToBack": "1",
    "Sell": "2",
    "Use": "3",
    "Borrow": "4",
    "ToBack": "5"
};
var EProductTypeJson = {
    "Material": "1",
    "Goods": "2"
};
var EReturnStatusJson = {
    "Success": "1",
    "Error": "2",
    "Pass": "3"
};
var EStorageTypeJson = {
    "Product": "1",
    "Material": "2",
    "Semiproduct": "3"
};
var EOpTypeJson = {
    "PC": "1",
    "PDA": "2"
};
var ECheckTypeJson = {
    "Local": "1",
    "Product": "2"
};
var EReturnTypeJson = {
    "Sell": "1",
    "Purchase": "2"
};
var EChangeJson = {
    "In": "1",
    "Out": "2",
    "MoveOut": "3",
    "BadOut": "4",
    "InventoryIncome": "5",
    "AllocateIn": "7",
    "AllocateOut": "-7",
    "InventoryLoss": "-5",
    "BadIn": "-4",
    "MoveIn": "-3"
};
var EOrderStatusJson = {
    "CreateOrder": "1",
    "OrderConfirm": "2",
    "OrderCancel": "3",
    "InTheStock": "4",
    "PartialDelivery": "5",
    "AllDelivery": "6",
    "DeliveryFailure": "7"
};
var EOrderTypeJson = {
    "Really": "1",
    "Invented": "2"
};
var ESupTypeJson = {
    "Invented": "1",
    "Cooperation": "2"
};
var EDataSourceTypeJson = {
    "SQL": "1",
    "Procedure": "2"
};
var EReportTypeJson = {
    "InBill": "1",
    "OutBill": "2",
    "CheckBill": "3",
    "AllocateBill": "4",
    "BadBill": "5",
    "User": "41",
    "Product": "42",
    "Storage": "43",
    "Location": "44",
    "Report": "100"
};
var EElementTypeJson = {
    "TextBox": "1",
    "TextArea": "2",
    "Select": "3",
    "DateTime": "4",
    "Date": "5"
};
var ESequenceJson = {
    "Constant": "1",
    "Guid": "2",
    "CustomerTime": "3",
    "Sequence": "4",
    "SequenceOfDay": "5"
};
var EFinanceStatusJson = {
    "Wait": "1",
    "Pass": "2",
    "NotPass": "3",
    "Cancel": "4",
    "InProgress": "5",
    "PayPart": "6",
    "PayFull": "7"
};
var EPayTypeJson = {
    "AliPay": "1",
    "OnlineBank": "2",
    "HuiKuan": "3"
};
var EFinanceTypeJson = {
    "BillReceivable": "1",
    "Payable": "2",
    "BillReceivableBack": "3",
    "PayableBack": "4"
};
var EPurchaseTypeJson = {
    "Really": "1",
    "Invented": "2"
};
var EResourceTypeJson = {
    "NoRole": "0",
    "Page": "1",
    "Dialog": "2",
    "Ajax": "3",
    "Link": "4"
};
var EPurchaseStatusJson = {
    "CreateOrder": "1",
    "OrderConfirm": "2",
    "OrderCancel": "3",
    "InTheStock": "4",
    "PartialIn": "5",
    "AllIn": "6",
    "InFailure": "7"
};
var EProductPackageJson = {
    "Single": "1",
    "Combination": "2",
    "Pack": "3"
};
var EAllocateTypeJson = {
    "Equivalence": "1"
};
var ESaleReturnStatusJson = {
    "CreateOrder": "1",
    "OrderConfirm": "2",
    "OrderCancel": "3",
    "InStorage": "4"
};
var EPurchaseReturnStatusJson = {
    "CreateOrder": "1",
    "OrderConfirm": "2",
    "OrderCancel": "3",
    "OutStorage": "4"
};
var EBoolJson = {
    "No": "0",
    "Yes": "1"
};