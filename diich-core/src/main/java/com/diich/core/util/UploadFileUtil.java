package com.diich.core.util;


import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.*;

/**
 * Created by Administrator on 2017/5/26.
 */
public class UploadFileUtil {

    public static String uploadFile(HttpServletRequest request) throws Exception {
        DiskFileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);
        String filename = null;
        String userType = null;
        String partUrl = null;//Util.buildDirectory(user.getId());

        List<FileItem> list = upload.parseRequest(request);
        //获取上传的文件
        FileItem item = getUploadFileItem(list);
        //获取文件名
        filename = getUploadFileName(item);

        filename = filename.substring(filename.lastIndexOf("."));

        File file = new File("upload/" + userType + partUrl.substring(0,partUrl.length()-1), filename);
        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }
        //真正写到磁盘上
        item.write(file);

        return partUrl + filename;
    }

    private static FileItem getUploadFileItem(List<FileItem> list) {
        for (FileItem fileItem : list) {
            if(!fileItem.isFormField()) {
                return fileItem;
            }
        }
        return null;
    }

    private static String getUploadFileName(FileItem item) {
        // 获取路径名
        String value = item.getName();
        // 索引到最后一个反斜杠
        int start = value.lastIndexOf("/");
        // 截取 上传文件的 字符串名字，加1是 去掉反斜杠，
        String filename = value.substring(start + 1);

        return filename;
    }

    public List uplaodFile(HttpServletRequest request) throws Exception {
        List<Map<String, Object>> list = new ArrayList();

        //创建一个通用的多部分解析器
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());

        //判断 request 是否有文件上传,即多部分请求
        if (multipartResolver.isMultipart(request)) {
            //转换成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;

            Map<String, MultipartFile> fileMap = multiRequest.getFileMap();
            for(String key : fileMap.keySet()) {
                MultipartFile file = fileMap.get(key);
                BufferedImage bi = ImageIO.read(file.getInputStream());
                int width = 0;
                int height = 0;
                if(bi != null) {
                    width = bi.getWidth();
                    height = bi.getHeight();
                }
                String fileName = file.getOriginalFilename();

                if(!"".equals(fileName.trim())) {
                    StringBuilder url = new StringBuilder("master/");

                    url.append("picture/" + new Date().getTime() + fileName);

                    String pictureUrl = "http://rongyitou2.efeiyi.com/" + url.toString();

                    //将图片上传至阿里云
                    //aliOssUploadManager.uploadFile(file, "ec-efeiyi2", url.toString());

                    Map<String, Object> map = new HashMap<>();
                    map.put("pictureUrl", pictureUrl);
                    map.put("width", width);
                    map.put("height", height);
                    list.add(map);
                }
            }
        }

        return list;
    }
}
