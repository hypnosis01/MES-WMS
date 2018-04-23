package com.sojo.wms.service;

import org.springframework.stereotype.Service;

@Service
public class IndexService {

	/// <summary>
	/// 设置导航信息
	/// </summary>
	public String navShow(){
		StringBuilder sb = new StringBuilder();
		sb.append("<ul class=\"breadcrumb\">");
		sb.append("<li>");
		sb.append("<i class=\"icon-home\"></i>");
		sb.append("<a href=\"/rest/index\">首页</a>");
		sb.append("<i class=\"icon-angle-right\"></i>");
		sb.append("</li>");
		sb.append("</ul>");
		return sb.toString();
	}

}
