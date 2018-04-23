package com.sojo.wms.threadlocal;


import com.sojo.sso.query.bean.MesUserInfo;

public class UserThreadLocal {

    private static final ThreadLocal<MesUserInfo> LOCAL = new ThreadLocal<MesUserInfo>();

    private UserThreadLocal() {

    }

    public static void set(MesUserInfo user) {
        LOCAL.set(user);
    }

    public static MesUserInfo get() {
        return LOCAL.get();
    }

}
