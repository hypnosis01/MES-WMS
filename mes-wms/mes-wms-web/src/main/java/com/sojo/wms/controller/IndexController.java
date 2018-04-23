package com.sojo.wms.controller;

import com.sojo.sso.query.bean.MesUserInfo;
import com.sojo.wms.service.IndexService;
import com.sojo.wms.threadlocal.UserThreadLocal;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("index")
@Controller
public class IndexController {

    @Autowired
    private IndexService indexService;

    /**
     * 首页
     * 
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView index() {
        //web.xml中配置<welcome-file></welcome-file>，应用程序服务器起动后，
        //再浏览器地址栏输入 http://wms.sojo.com/ 相当于输入 http://wms.sojo.com/rest/index
        //解决windows下tomcat端口被占用 netstat -ano|findstr 8005
        ModelAndView mv = new ModelAndView();
        MesUserInfo userNow = UserThreadLocal.get();
        if(userNow != null){
            mv.addObject("userCur",userNow);
        }
        String viewBagNavMenu = indexService.navShow();
        if(!StringUtils.isBlank(viewBagNavMenu)){
            mv.addObject("ViewBagNavMenu",viewBagNavMenu);
        }
        //mv.setViewName("LocalIndex");
        mv.setViewName("CloudIndex");
        return mv;
    }



}
