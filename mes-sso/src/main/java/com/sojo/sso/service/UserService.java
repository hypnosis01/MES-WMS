package com.sojo.sso.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sojo.common.service.RedisService;
import com.sojo.sso.mapper.UserMapper;
import com.sojo.sso.pojo.MesUserInfo;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.taglibs.standard.lang.jstl.test.beans.PublicBean1b;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private RedisService redisService;

	@Value("${LOGIN_FOOTER}")
	private String LOGIN_FOOTER;

	private static final ObjectMapper MAPPER = new ObjectMapper();

	private static final Integer REDIS_TIME = 60 * 30;

	public String getLOGIN_FOOTER() {
		return LOGIN_FOOTER;
	}

	public Boolean check(String param, Integer type) {
		MesUserInfo record = new MesUserInfo();

		switch (type) {
			case 1:
				record.setUserName(param);
				break;
			case 2:
				record.setPhone(param);
				break;
			case 3:
				record.setEmail(param);
				break;
			default:
				// 参数有误
				return null;
		}

		return this.userMapper.selectOne(record) == null;
	}

	public Boolean doRegister(MesUserInfo user) {
		// 初始化的处理
		user.setId(null);
		user.setCreateTime(new Date());
		user.setUpdateTime(user.getCreateTime());
		// 加密处理，MD5加密
		user.setPassWord(DigestUtils.md5Hex(user.getPassWord()));
		return this.userMapper.insert(user) == 1;
	}

	public String doLogin(String username, String password, Map<String, Object> result) throws Exception {

		MesUserInfo record = new MesUserInfo();
		record.setUserName(username);
		MesUserInfo user = this.userMapper.selectOne(record);
		if (null == user) {
			// 用户不存在
			result.put("message", "用户不存在");
			return null;
		}

		if (!StringUtils.equals(DigestUtils.md5Hex(password), user.getPassWord())) {
			// 密码错误
			result.put("message", "密码错误");
			return null;
		}

		// 登录成功，将用户的信息保存到Redis中
		String token = DigestUtils.md5Hex(username + System.currentTimeMillis());

		this.redisService.set("TOKEN_" + token, MAPPER.writeValueAsString(user), REDIS_TIME);

		return token;
	}

	public MesUserInfo queryUserByToken(String token) {
		String key = "TOKEN_" + token;
		String jsonData = this.redisService.get(key);
		if (StringUtils.isEmpty(jsonData)) {
			// 登录超时
			return null;
		}

		//重新设置Redis中的生存时间
		this.redisService.expire(key, REDIS_TIME);

		try {
			return MAPPER.readValue(jsonData, MesUserInfo.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
