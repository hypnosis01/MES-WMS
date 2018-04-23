package com.sojo.wms.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sojo.common.service.ApiService;
import com.sojo.sso.query.api.UserQueryService;
import com.sojo.sso.query.bean.MesUserInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserQueryService userQueryService;

    @Value("${MES_SSO_URL}")
    private String MES_SSO_URL;

    public String getMesSsoLogin() {
        return MES_SSO_URL;
    }

    /**
     * 根据token查询用户信息
     *
     * @param token
     * @return
     */
    public MesUserInfo queryByToken(String token) {
        return this.userQueryService.queryUserByToken(token);
    }

}
