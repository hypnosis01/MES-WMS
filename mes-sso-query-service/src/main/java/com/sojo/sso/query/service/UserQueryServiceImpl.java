package com.sojo.sso.query.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sojo.common.service.RedisService;
import com.sojo.sso.query.api.UserQueryService;
import com.sojo.sso.query.bean.MesUserInfo;

@Service
public class UserQueryServiceImpl implements UserQueryService {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final Integer REDIS_TIME = 60 * 30;

    @Autowired
    private RedisService redisService;

    @Override
    public MesUserInfo queryUserByToken(String token) {
        String key = "TOKEN_" + token;
        String jsonData = this.redisService.get(key);
        if (StringUtils.isEmpty(jsonData)) {
            // 登录超时
            return null;
        }

        // 重新设置Redis中的生存时间
        this.redisService.expire(key, REDIS_TIME);

        try {
            return MAPPER.readValue(jsonData, MesUserInfo.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
