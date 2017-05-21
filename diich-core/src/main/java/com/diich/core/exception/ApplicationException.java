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

	private static final String[] ERROR_DESC_LIST = new String[] { "", "内部错误.", "参数错误", "用户没有登录"};

	private int code;
	private String msg;

	public ApplicationException(int code, String s) {
		this.code = code;
		this.msg = ERROR_DESC_LIST[code];
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

	public Map<String, Object> toMap() {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("code", this.code);
		result.put("msg", this.msg);
		return result;
	}

}
