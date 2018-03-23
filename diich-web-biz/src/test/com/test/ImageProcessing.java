package com.test;

import com.aliyun.openservices.oss.OSSClient;
import com.aliyun.openservices.oss.model.ListObjectsRequest;
import com.aliyun.openservices.oss.model.OSSObjectSummary;
import com.aliyun.openservices.oss.model.ObjectListing;

import java.util.List;

/**
 * Created by Administrator on 2018/2/9.
 */
public class ImageProcessing {

    private static String accessKeyId = "maTnALCpSvWjxyAy";
    private static String accessKeySecret = "0Ou6P67WhuSHESKrwJClFqCKo5BuBf";

    public static void getObjectListing(String nextMarker) {
        String endPoint = "http://oss-cn-beijing.aliyuncs.com";
        String bucketName = "diich-resource";
        Integer maxKeys = 1000;
        String prefix = "image/project/";
        String marker = nextMarker;

        OSSClient client = new OSSClient(endPoint, accessKeyId, accessKeySecret);

        ListObjectsRequest request = new ListObjectsRequest();
        request.setBucketName(bucketName);
        request.setMaxKeys(maxKeys);
        request.setPrefix(prefix);
        request.setMarker(marker);

        ObjectListing list = client.listObjects(request);
        List<OSSObjectSummary> summaries = list.getObjectSummaries();

        for(OSSObjectSummary summary : summaries) {
            String key = summary.getKey();
            String doneKey = null;
            if(key.contains(" ")) {
                doneKey = key.replace(" ", "");
                client.copyObject(bucketName, key, bucketName, doneKey);
            }
        }

        if(summaries.size() == 1000) {
            System.out.println(list.getNextMarker());
            getObjectListing(list.getNextMarker());
        }
    }

    public static void main(String[] args) {
        getObjectListing("image/project/971-3 (112).jpg");
        System.out.println("---------------------END------------------------");
    }
}
