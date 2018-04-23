package com.sojo.sso.query.api;

import com.sojo.sso.query.bean.MesUserInfo;

public interface UserQueryService {

    /**
     * 根据token查询User对象
     * 
     * @return
     */
    public MesUserInfo queryUserByToken(String token);

}
