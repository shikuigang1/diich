package com.diich.core.exception;


import com.alibaba.fastjson.JSONObject;

public class ApplicationException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static int INNER_ERROR = 0x01;
	public static int INVALID_CODE_ERROR = 0x02;
	public static int WROTE_CODE_ERROR = 0x03;
	public static int WROTE_CODE_OCCUPIED = 0x04;
	public static int PARAM_ERROR = 0x05;
	public static int SQL_ERROR = 0x06;
	public static int VERSION_LATEST = 0x07;

	private static final String[] ERROR_DESC_LIST = new String[] { "", "内部错误.", "数据库错误", "账号或密码错误", "此账号已存在", "参数错误", "sfdd", "已是最新版本，无需升级"};

	private int code;
	private String description;
	private String innerDescription;

	public ApplicationException(int code) {
		this.code = code;
		this.description = ERROR_DESC_LIST[code];
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setInnerDescription(String innerDescription) {
		this.innerDescription = innerDescription;
	}

	public String toJsonString() {
		JSONObject result = new JSONObject();
		result.put("code", this.code);
		result.put("description", this.description);
		result.put("innerDescription", innerDescription);
		return result.toString();
	}

}
