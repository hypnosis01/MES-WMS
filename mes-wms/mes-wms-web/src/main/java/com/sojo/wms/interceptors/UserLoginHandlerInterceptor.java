package com.sojo.wms.interceptors;

import com.sojo.common.utils.CookieUtils;
import com.sojo.sso.query.bean.MesUserInfo;
import com.sojo.wms.service.UserService;
import com.sojo.wms.threadlocal.UserThreadLocal;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserLoginHandlerInterceptor implements HandlerInterceptor {

    public static final String COOKIE_NAME = "SJL_TOKEN";

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        
        String loginUrl = this.userService.getMesSsoLogin() + "/user/login.html";
        String token = CookieUtils.getCookieValue(request, COOKIE_NAME);
        if (StringUtils.isEmpty(token)) {
            // 未登录，跳转到登录页面
            response.sendRedirect(loginUrl);
            return false;
        }

        MesUserInfo user = this.userService.queryByToken(token);
        if (null == user) {
            // 登录超时，跳转到登录页面
            response.sendRedirect(loginUrl);
            return false;
        }

        // 登录成功
        
        UserThreadLocal.set(user); //将user对象放置到本地线程中，方便在Controller和Service中获取
        
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
            Exception ex) throws Exception {
        UserThreadLocal.set(null); //清空本地线程中的User对象数据
    }

}
