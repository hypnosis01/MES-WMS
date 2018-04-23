<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<div id="footer">
	版本:@ViewBag.DebugVersion&nbsp;&nbsp;
	@*技术支持:15800466429&nbsp;&nbsp;
	QQ:821865130&nbsp;&nbsp;
	QQ群:142050808&nbsp;&nbsp;88718955&nbsp;&nbsp;
	版权声明: 不得用于任何商业用途,违法必究*@

	@Html.Raw(ViewBag.Sign)
	<div class="span pull-right">
		<span class="go-top"><i class="icon-arrow-up"></i></span>
	</div>
</div>