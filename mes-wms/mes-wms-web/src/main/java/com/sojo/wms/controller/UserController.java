package com.sojo.wms.controller;

import com.sojo.common.service.RedisService;
import com.sojo.common.utils.CookieUtils;
import com.sojo.sso.query.bean.MesUserInfo;
import com.sojo.wms.interceptors.UserLoginHandlerInterceptor;
import com.sojo.wms.service.UserService;
import com.sojo.wms.threadlocal.UserThreadLocal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequestMapping("user")
@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RedisService redisService;

    /**
     * 首页
     * logout
     * @return
     */
    @RequestMapping(value = "accountSetting", method = RequestMethod.GET)
    public ModelAndView accountSetting(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView("AccountSetting");
        MesUserInfo userNow = UserThreadLocal.get();
        if(userNow != null){
            mv.addObject("userCur",userNow);
        }
        return mv;
    }

    /**
     * 首页
     * logout
     * @return
     */
    @RequestMapping(value = "changePwd", method = RequestMethod.GET)
    public ModelAndView changePwd(HttpServletRequest request, HttpServletResponse response) {
        ModelAndView mv = new ModelAndView("AccountSetting");
        MesUserInfo userNow = UserThreadLocal.get();
        if(userNow != null){
            mv.addObject("userCur",userNow);
        }
        return mv;
    }

    /**
     * 首页
     * logout
     * @return
     */
    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        String loginUrl = this.userService.getMesSsoLogin() + "/user/login.html";

        // 删除token
        String token = CookieUtils.getCookieValue(request, UserLoginHandlerInterceptor.COOKIE_NAME);
        this.redisService.del("TOKEN_" + token);

        // 删除cookie
        CookieUtils.deleteCookie(request, response, UserLoginHandlerInterceptor.COOKIE_NAME);


        return "redirect:http://sso.sojo.com";
    }



}
