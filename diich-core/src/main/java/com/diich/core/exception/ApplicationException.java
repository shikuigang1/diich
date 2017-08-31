package com.diich.core.exception;


import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class ApplicationException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static int INNER_ERROR = 1;
	public static int PARAM_ERROR = 2;
	public static int NO_LOGIN = 3;
	public static int NO_PHONE = 4;
	public static int PHONE_USED = 5;
	public static int CODE_AGAIN = 6;
	public static int RESET_PASSWORD = 7;
	public static int NO_REGISTER = 8;
	public static int CODE_TIMEOUT = 9;
	public static int NO_CODE = 10;
    public static int CODE_ERROR = 11;
	public static int USER_UNCOMPLETE = 12;
	public static int USER_ERROR =13;
	public static int PHONE_SAME =14;
	public static int LOGNAME_USED =15;

	private static final String[] ERROR_DESC_LIST = new String[] { "", "内部错误.", "参数错误", "用户没有登录","请输入手机号","此手机号已经被占用","验证码已发送,请稍后再试...",
																	"手机号,验证码,新密码均不能为空","该手机号没注册","验证码超时,请重新获取","请先获取验证码","验证码错误","用户名,密码不能为空","用户名,密码错误","新老手机号不能相同","用户名已被占用"};

	private int code;
	private String msg;
	private String detailMsg;

	public ApplicationException(int code) {
		this.code = code;
		this.msg = ERROR_DESC_LIST[code];
	}

	public ApplicationException(int code, String detailMsg) {
		this.code = code;
		this.msg = ERROR_DESC_LIST[code];
		this.detailMsg = detailMsg;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getDetailMsg() {
		return detailMsg;
	}

	public void setDetailMsg(String detailMsg) {
		this.detailMsg = detailMsg;
	}

	public Map<String, Object> toMap() {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("code", this.code);
		result.put("msg", this.msg);

		if(this.detailMsg != null) {
			result.put("detailMsg", this.detailMsg);
		}

		return result;
	}

}
