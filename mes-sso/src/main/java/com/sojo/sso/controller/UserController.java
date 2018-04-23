package com.sojo.sso.controller;

import com.sojo.common.utils.CookieUtils;
import com.sojo.sso.pojo.MesUserInfo;
import com.sojo.sso.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("user")
@Controller
public class UserController {

	private static final String COOKIE_NAME = "SJL_TOKEN";

	@Autowired
	private UserService userService;

	/**
	 * 注册
	 *
	 * @return
	 */
	@RequestMapping(value = "register", method = RequestMethod.GET)
	public String register() {
		return "register";
	}

	/**
	 * 登录
	 *
	 * @return
	 */
	@RequestMapping(value = "login", method = RequestMethod.GET)
	public ModelAndView login() {
		ModelAndView mv = new ModelAndView();
		//mv.setViewName("indexLocal");
		//mv.setViewName("indexLease");
		mv.setViewName("indexCloud");

		// footer
		String indexAD1 = this.userService.getLOGIN_FOOTER();
		mv.addObject("LoginSign", indexAD1);
		return mv;
	}

	/**
	 * 登录失败
	 *
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "localLogin", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> localLogin(MesUserInfo user, HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			String token = this.userService.doLogin(user.getUserName(), user.getPassWord(), result);
			if (StringUtils.isEmpty(token)) {
				// 登录失败
				result.put("status", 500);
				return result;
			}

			// 登录成功，保存token到cookie
			CookieUtils.setCookie(request, response, COOKIE_NAME, token);
			result.put("status", 200);

		} catch (Exception e) {
			e.printStackTrace();
			// 登录失败
			result.put("status", 500);
		}
		return result;
	}

	/**
	 * 登录失败
	 *
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "cloudLogin", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> cloudLogin(MesUserInfo user, HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			String token = this.userService.doLogin(user.getUserName(), user.getPassWord(), result);
			if (StringUtils.isEmpty(token)) {
				// 登录失败
				result.put("status", 500);
				return result;
			}

			// 登录成功，保存token到cookie
			CookieUtils.setCookie(request, response, COOKIE_NAME, token);
			result.put("status", 200);

		} catch (Exception e) {
			e.printStackTrace();
			// 登录失败
			result.put("status", 500);
		}
		return result;
	}

	/**
	 * 检测数据是否可用
	 *
	 * @return
	 */
	@RequestMapping(value = "{param}/{type}", method = RequestMethod.GET)
	public ResponseEntity<Boolean> check(@PathVariable("param") String param,
										 @PathVariable("type") Integer type) {
		try {
			Boolean bool = this.userService.check(param, type);
			if (bool == null) {
				// 参数有误
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
			}
			// 为了兼容前端逻辑，做出妥协（没有打过过前台，他赢了。。。。。。）
			return ResponseEntity.ok(!bool);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

	/**
	 * 注册
	 *
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "doRegister", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> doRegister(@Valid MesUserInfo user, BindingResult bindingResult) {
		Map<String, Object> result = new HashMap<String, Object>();
		if (bindingResult.hasErrors()) {
			// 没有通过校验
			result.put("status", "400");

			// 获取错误信息
			List<String> msgs = new ArrayList<String>();
			List<ObjectError> allErrors = bindingResult.getAllErrors();
			for (ObjectError objectError : allErrors) {
				String msg = objectError.getDefaultMessage();
				msgs.add(msg);
			}

			result.put("data", "参数有误! " + StringUtils.join(msgs, '|'));

			return result;
		}
		try {
			Boolean bool = this.userService.doRegister(user);
			if (bool) {
				result.put("status", "200");
			} else {
				result.put("status", "500");
				result.put("data", " 哈哈~~~");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put("status", "500");
			result.put("data", " 哈哈~~~");
		}
		return result;
	}
}
