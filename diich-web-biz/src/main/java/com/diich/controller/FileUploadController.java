package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.common.utils.BinaryUtil;
import com.aliyun.oss.model.MatchMode;
import com.aliyun.oss.model.PolicyConditions;
/*import com.sdzn.aop.SystemControllerLog;
import com.sdzn.enums.MsgCode;
import com.sdzn.thrift.dubbo.vo.Msg;
import com.sdzn.util.DateUtil;
import com.sdzn.util.MsgUtil;*/
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import junit.framework.Assert;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;


@RestController
@RequestMapping(value = "/file")
public class FileUploadController extends BaseController{
    /**
     * 文件上传OSS获取签名信息
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/getPolicy")
    @ResponseBody
    public String getPolicy(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request, response);
        } catch (Exception e) {
            ApplicationException ae = (ApplicationException) e;
            return ae.toString();
        }

        Map<String, String> respMap = new LinkedHashMap<>();
        try {
            String endpoint = "oss-cn-beijing.aliyuncs.com";
            String accessId = "maTnALCpSvWjxyAy";
            String accessKey = "0Ou6P67WhuSHESKrwJClFqCKo5BuBf";
            String bucket = "diich-resource";
            String dir = "";//暂由前端定义
            String host = "http://" + bucket + "." + endpoint;
            OSSClient client = new OSSClient(endpoint, accessId, accessKey);
            long expireTime = 30;
            long expireEndTime = System.currentTimeMillis() + expireTime * 100000000;
            Date expiration = new Date(expireEndTime);
            PolicyConditions policyConds = new PolicyConditions();
            policyConds.addConditionItem(PolicyConditions.COND_CONTENT_LENGTH_RANGE, 0, 1048576000);
            policyConds.addConditionItem(MatchMode.StartWith, PolicyConditions.COND_KEY, dir);

            String postPolicy = client.generatePostPolicy(expiration, policyConds);
            byte[] binaryData = postPolicy.getBytes("utf-8");
            String encodedPolicy = BinaryUtil.toBase64String(binaryData);
            String postSignature = client.calculatePostSignature(postPolicy);

            respMap.put("accessid", accessId);
            respMap.put("policy", encodedPolicy);
            respMap.put("signature", postSignature);
            respMap.put("dir", dir);
            respMap.put("host", host);
            respMap.put("expire", String.valueOf(expireEndTime / 1000));
            respMap.put("filename", String.valueOf(new Date().getTime()));
            client.shutdown();
        } catch (Exception e) {;
            e.printStackTrace();
            Assert.fail(e.getMessage());
        }

        return JSON.toJSONString(respMap);
    }
}