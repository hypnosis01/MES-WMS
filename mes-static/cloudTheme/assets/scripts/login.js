var Login = function () {


    return {

        init: function () {

            jQuery('#forget-password').click(function () {
                jQuery('#loginform').hide();
                jQuery('#forgotform').show(200);
            });

            jQuery('#forget-btn').click(function () {

                jQuery('#loginform').slideDown(200);
                jQuery('#forgotform').slideUp(200);
            });


            jQuery('#login-btn').click(function () {

                var CompanyNum = $("input[name='CompanyNum']").val();
                var UserName = $("input[name='UserName']").val();
                var PassWord = $("input[name='PassWord']").val();

                if (git.IsEmpty(CompanyNum)) {
                    $.jBox.tip("请输入公司编号", "warn");
                    return false;
                }

                if (git.IsEmpty(UserName)) {
                    $.jBox.tip("请输入用户名", "warn");
                    return false;
                }

                if (git.IsEmpty(PassWord)) {
                    $.jBox.tip("请输入密码", "warn");
                    return false;
                }

                var param = {};
                param["CompanyNum"] = CompanyNum;
                param["UserName"] = UserName;
                param["PassWord"] = PassWord;

                $.ajax({
                    type: "post",
                    url: "/service/user/cloudLogin?r=" + Math.random(),
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: {companyNum: CompanyNum, userName: UserName, passWord: PassWord},
                    dataType: "json",
                    success: function (result) {
                        var obj = eval(result);
                        if (obj.status == 200) {
                            var reutrnUrl = $("#hdReturnUrl").val();
                            if (git.IsEmpty(reutrnUrl)) {
                                obj.success = "http://wms.sojo.com/";
                            } else {
                                obj.success = reutrnUrl;
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
                        } else {
                            $.jBox.tip(result.message, "warn");
                        }
                    }
                });
            });
        }
    };
}();