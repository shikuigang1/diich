package com.diich.search.test;

import com.sun.xml.internal.txw2.output.DomSerializer;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import javax.lang.model.element.Element;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import java.util.List;

/**
 * Created by Administrator on 2017/6/9 0009.
 */
public class TestJsoup {

    String xpath="//div[@id='post_list']/div[./div/div/span[@class='article_view']/a/num()>1000]/div/h3/allText()";



    public void parseHTML() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    HttpClient httpClient = new DefaultHttpClient();
                    HttpGet httpGet = new HttpGet("http://www.baidu.com/s?wd=" + "ÖÜ½ÜÂ×");
                    HttpResponse httpResponse = httpClient.execute(httpGet);

                    HttpEntity entity = httpResponse.getEntity();
                    String response = EntityUtils.toString(entity);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
