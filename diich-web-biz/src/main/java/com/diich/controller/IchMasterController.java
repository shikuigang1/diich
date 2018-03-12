package com.diich.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.diich.core.base.BaseController;
import com.diich.core.exception.ApplicationException;
import com.diich.core.model.IchMaster;
import com.diich.core.model.User;
import com.diich.core.service.IchMasterService;
import com.diich.core.util.QRCodeGenerator;
import com.diich.core.util.WebUtil;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/9.
 */
@Controller
@RequestMapping("ichMaster")
public class IchMasterController extends BaseController<IchMaster> {

    @Autowired
    private IchMasterService ichMasterService;

    @RequestMapping("getIchMaster")
    @ResponseBody
    public Map<String, Object> getIchMaster(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("params");
        if (id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        IchMaster ichMaster = null;
        try {
            ichMaster = ichMasterService.getIchMaster(id);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(ichMaster);
    }

    /**
     * 对status 不做限制
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("getIchMasterById")
    @ResponseBody
    public Map<String, Object> getIchMasterById(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request, response);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        String id = request.getParameter("params");
        if (id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        IchMaster ichMaster = null;
        try {
            ichMaster = ichMasterService.getIchMasterByIdAndUser(Long.parseLong(id), user);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(ichMaster);
    }

    @RequestMapping("getIchMasterList")
    @ResponseBody
    public Map<String, Object> getIchMasterList(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try {
            if (param != null) {
                params = JSON.parseObject(param, Map.class);
            }
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        Page<IchMaster> page = null;
        try {
            page = ichMasterService.getIchMasterPage(params);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(page);
    }

    @RequestMapping("saveIchMaster")
    @ResponseBody
    public Map<String, Object> saveIchMaster(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request, response);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String params = request.getParameter("params");
        IchMaster ichMaster = null;

        try {
            ichMaster = parseObject(params, IchMaster.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        ichMaster.setLastEditorId(user.getId());

        try {
            ichMasterService.saveIchMaster(ichMaster, user);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(ichMaster);
    }

    @RequestMapping("submitIchMaster")
    @ResponseBody
    public Map<String, Object> submitIchMaster(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request, response);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.INNER_ERROR);
            return putDataToMap(ae);
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String params = request.getParameter("params");
        IchMaster ichMaster = null;

        try {
            ichMaster = parseObject(params, IchMaster.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        ichMaster.setLastEditorId(user.getId());

        try {
            ichMaster.setStatus(3);
            ichMasterService.saveIchMaster(ichMaster, user);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(ichMaster);
    }

    /**
     * 预览
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("preview")
    @ResponseBody
    public Map<String, Object> preview(HttpServletRequest request, HttpServletResponse response) {

        String id = request.getParameter("params");
        if (id == null || "".equals(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        String uri = null;
        try {
            uri = ichMasterService.preview(Long.parseLong(id));
        } catch (Exception e) {
            return putDataToMap(e);
        }
        response.setHeader("Access-Control-Allow-Origin", "*");
        return putDataToMap(uri);
    }

    /**
     * 个人中心
     *  传承人列表
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("getIchMasterByUserId")
    @ResponseBody
    public Map<String, Object> getIchMasterByUserId(HttpServletRequest request, HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try {
            if (param != null) {
                params = JSON.parseObject(param, Map.class);
            }
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        if (user.getType() != null && user.getType() != 0) {
            params.put("userId", user.getId());
        }
        Page<IchMaster> page = null;
        try {
            page = ichMasterService.getIchMasterByUserId(params);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        return putDataToMap(page);
    }

    /**
     * 审核
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("audit")
    @ResponseBody
    public Map<String, Object> audit(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String id = request.getParameter("id");
        String doi = request.getParameter("doi");
        if (id == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try {
            ichMasterService.audit(Long.parseLong(id), user, doi);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }

    /**
     * 拒绝审核
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("refuseAudit")
    @ResponseBody
    public Map<String, Object> refuseAudit(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String id = request.getParameter("id");
        String reason = request.getParameter("reason");
        if (StringUtils.isEmpty(id)) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try {
            ichMasterService.refuseAudit(Long.parseLong(id), user, reason);
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }

    /**
     * 假删
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("delete")
    @ResponseBody
    public Map<String, Object> delete(HttpServletRequest request, HttpServletResponse response) {
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        String id = request.getParameter("params");
        if (id == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        try {
            int delete = ichMasterService.deleteIchMaster(Long.parseLong(id));
        } catch (Exception e) {
            return putDataToMap(e);
        }
        return putDataToMap(id);
    }

    @RequestMapping("/getImage")
    public void exportQRCode(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String id = request.getParameter("id");
        String url = "http://inheritor.diich.com/m/" + id + ".html";
        QRCodeGenerator qrCode = new QRCodeGenerator(url);
        qrCode.createQRCode(108, 108);
        BufferedImage bufferedImage = qrCode.getImageResult();
        ServletOutputStream stream = response.getOutputStream();
        byte[] buffer = getBuffer(bufferedImage);
        stream.write(buffer);
    }

    public byte[] getBuffer(BufferedImage image) {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(bos);
        try {
            encoder.encode(image);
        } catch (Exception e) {
            return new byte[]{};
        }
        byte[] imageBts = bos.toByteArray();
        return imageBts;
    }

    /**
     * 认领词条
     *
     * @param request
     * @return
     */
    @RequestMapping("claimEntry")
    @ResponseBody
    public Map<String, Object> claimEntry(HttpServletRequest request) {
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }

        Long masterId = null;
        IchMaster authInfo = null;

        try {
            masterId = Long.parseLong(request.getParameter("masterId"));
            authInfo = parseObject(request.getParameter("authInfo"), IchMaster.class);
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }

        try {
            ichMasterService.claimEntry(masterId, authInfo, user);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        return putDataToMap(null);
    }

    /**
     * 个人中心
     *  认领词条列表
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("getEntryByUserId")
    @ResponseBody
    public Map<String, Object> getEntryByUserId(HttpServletRequest request, HttpServletResponse response) {
        try {
            setHeader(request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        User user = (User) WebUtil.getCurrentUser(request);
        if (user == null) {
            ApplicationException ae = new ApplicationException(ApplicationException.NO_LOGIN);
            return putDataToMap(ae);
        }
        Map<String, Object> params = new HashMap<>();
        String param = request.getParameter("params");
        try {
            if (param != null) {
                params = JSON.parseObject(param, Map.class);
            }
        } catch (Exception e) {
            ApplicationException ae = new ApplicationException(ApplicationException.PARAM_ERROR);
            return putDataToMap(ae);
        }
        params.put("userId", user.getId());
        Page<IchMaster> page = null;
        try {
            page = ichMasterService.getEntryByUserId(params);
        } catch (Exception e) {
            return putDataToMap(e);
        }

        return putDataToMap(page);
    }
}
