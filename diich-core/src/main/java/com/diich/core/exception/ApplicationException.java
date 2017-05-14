package com.diich.core.exception;


import com.alibaba.fastjson.JSONObject;

import java.util.Map;

public class ApplicationException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static int INNER_ERROR = 0x01;
	public static int PARAM_ERROR = 0x02;

	private static final String[] ERROR_DESC_LIST = new String[] { "", "内部错误.", "参数错误"};

	private int code;
	private String msg;

	public ApplicationException(int code) {
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

	public String toJsonString() {
		JSONObject result = new JSONObject();
		result.put("code", this.code);
		result.put("msg", this.msg);
		return result.toString();
	}

}
