
$(document).ready(function () {
    $("#input-password").keydown(function (e) {
        if (e.which == 13) {
            User.Login();
        }
    });

    $("#imgCode").click(function () {
        $("#imgCode").attr("src", "/Common/Val");
    });

    User.Ad();
});

var User = {
    Login: function () {
        var username = $("#input-username").val();
        var password = $("#input-password").val();
        var code = $("#txtCode").val();
        if (git.IsEmpty(username)) {
            $.jBox.tip("请输入密码", "warn");
            return false;
        }
        if (git.IsEmpty(password)) {
            $.jBox.tip("请输入密码", "warn");
            return false;
        }
        //if (git.IsEmpty(code)) {
        //    $.jBox.tip("请输入4位验证码", "warn");
        //    return false;
        //}

        $.ajax({
            type: "post",
            url: "/service/user/localLogin?r=" + Math.random(),
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {userName:username,passWord:password},
            dataType: "json",
            success: function (result) {
                var obj = eval(result);
                if (obj.status == 200) {
                    var reutrnurl = $("#hdUrl").val();
                    if (git.IsEmpty(reutrnurl)) {
                        obj.success = "http://wms.sojo.com/";
                    } else {
                        obj.success = reutrnurl;
                    }
                    var isIE = !-[1,];
                    if (isIE) {
                        var link = document.createElement("a");
                        link.href = obj.success;
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                    } else {
                        window.location.href = obj.success;
                    }
                    return;
                }else{
                    $.jBox.tip(obj.message, "warn");
                }
            }
        });
    },
    Ad: function () {
        //$.jBox.messager("<img alt='' src='/Theme/img/PDA.jpg'/>", "&nbsp;&nbsp;系统动态:新增Android版本手持机支持 ", 10000, {
        //    width: 350, showType: 'fade', buttons: { '关闭': true }, submit: function (v, h, f) {
        //        //window.open("http://www.jooshow.com/");
        //        return true;
        //    }
        //});
    }
};