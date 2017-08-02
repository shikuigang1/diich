<!DOCTYPE html>
<html lang="en">

<head>
<#assign caturi="http://diich.efeiyi.com" />
    <meta charset="UTF-8">
    <title id="title">
    <#if (obj.contentFragmentList?size>0)>
               <#list obj.contentFragmentList as cf>
                    <#if cf.attributeId == 13>
                        ${cf.content}
                    </#if>
                </#list>
     </#if>
    </title>
    <link rel="shortcut icon" type="image/x-icon" href="${caturi}/assets/images/logo.png" media="screen" />
    <link rel="stylesheet" href="${caturi}/assets/css/common.css">
    <link rel="stylesheet" href="${caturi}/assets/css/layout.css">
    <script src="${caturi}/assets/js/jquery.min.js"></script>
    <script src="${caturi}/assets/js/system.js"></script>
    <script src="${caturi}/assets/js/utils.js"></script>
    <script src="${caturi}/assets/js/detail-master.js"></script>
    <script src="${caturi}/assets/js/login.js"></script>
    <script src="${caturi}/data/keyword.js"></script>
    <script src="${caturi}/data/category.js"></script>
    <script src="${caturi}/js/citys.js"></script>
    <script src="${caturi}/js/jquery.i18n.properties-1.0.9.js"></script>
    <script src="${caturi}/js/i18n.js"></script>
    <script src="${caturi}/data/dictionary.js"></script>
    <script src="${caturi}/js/util.js"></script>
    <script>
        var json = ${json.json};
        var jsonAll = ${json.jsonAll};
        var jsonHead = ${json.jsonHead};
    </script>
    <style>
        br{line-height:60px;}
        .drop_menu .content .item dl br {line-height: 20px;}
    </style>
</head>

<body class="js-master">
<div class="header header_detail"></div>
<!--//End header -->
<div class="filter_search filter_search_fixed">
    <div class="content">
        <div id="form"></div>
        <div class="dropbox" id="drag"></div>
        <!--//End attribute-->
    </div>
</div>
<!--//End filter_search -->

<#assign propage = "http://project.efeiyi.com/p/"/>
<#assign workspage = "http://works.efeiyi.com/w/"/>
<#assign prouri="http://resource.efeiyi.com/image/project/" />
<#assign masteruri="http://resource.efeiyi.com/image/master/" />
<#assign str="http:" />
<#assign strs="https:" />
<div class="container">
    <div class="bd detail">
        <div class="mainbg">
            <div class="content" id="detailContent">
                <div class="mask_left"></div>
                   <#assign backImgUrl="http://resource.efeiyi.com/image/uploads/head.png">
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 10>
                                <#if (cf.resourceList?size>0)>
                                    <#list cf.resourceList as res>
                                        <#if res.type==0 && res.status==0>
                                            <#if res.uri??>
                                                <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                                    <img src="${masteruri}${res.uri}" alt="" id="detailTopic" style="display:none">
                                                </#if>
                                                <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                                    <img src="${res.uri}" alt="" id="detailTopic" style="display:none">
                                                </#if>
                                            </#if>
                                        </#if>
                                    </#list>
                                </#if>
                            </#if>
                        </#list>
                    </#if>
                   <#if (obj.contentFragmentList?size>0)>
                       <#list obj.contentFragmentList as cf>
                           <#if cf.attributeId == 10>
                               <#if (cf.resourceList?size>0)>
                                   <#list cf.resourceList as res>
                                       <#if res.type==1 && res.status==0>
                                           <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                               <video poster="${backImgUrl}" src="${masteruri}${res.uri}"> </video>
                                           </#if>
                                           <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                               <video poster="${backImgUrl}" src="${res.uri}"> </video>
                                           </#if>
                                           <span data-type="1" class="play_big"> </span>
                                       </#if>
                                   </#list>
                               </#if>
                           </#if>
                       </#list>
                   </#if>
            <div class="mask_right"></div>
        </div>
         </div>
        <!--//End main-->

        <!--//End crumbs-->

        <div class="card">
            <div class="card_main">
                <div class="floor">
                    <a class="share" title="分享"></a>
                    <a class="praise" title="点赞" style="position: relative;"></a>
                    <a class="album albums" data-id="all"><i class="icon_img"></i>

                    </a>
                    <div class="share_box">
                        <div class="icons">
                            <span></span>
                            <!--<a href="" class="facebook"></a>-->
                            <!--<a href="" class="twitter"></a>-->
                            <a href="" class="weixin active"></a>
                        </div>
                        <div class="qrcode">
                            <img width="108" style="display:block" src="${caturi}/ichMaster/getImage?id=${obj.id?c}" alt="微信">
                        </div>
                    </div>
                </div>
                <!--//End -->
                <div class="detail_title">
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 13>
                            <#assign mastername = cf.content>
                        <h2>${cf.content}</h2>
                        </#if>
                    </#list>
                </#if>
                    <div class="doi_code">
                        <i class="icon">ID</i>
                        <span>标识码：<em id="doi_code"><#if (obj.contentFragmentList?size>0)>
                                        <#list obj.contentFragmentList as cf>
                                            <#if cf.attributeId == 11>
                                                ${cf.content}
                                            </#if>
                                        </#list>
                        </#if></em></span>
                        <em class="icon"></em>
                        <div class="drop">
                            <img src="" alt="">
                        </div>
                    </div>
                </div>
                <!--//End title-->

                <div class="bd subtxt">
                        <span>
                            <em><#if (obj.contentFragmentList?size>0)>
                                <#list obj.contentFragmentList as cf>
                                    <#if cf.attributeId == 23 && cf.content??>
                                        <strong>申报地区：</strong>
                                        <#assign codeList = cf.content?split(",")>
                                        <#list codeList as s>
                                            <em class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${s}</em>
                                            <#if s_index+1 < (codeList?size)>
                                                <i>|</i>
                                            </#if>
                                        </#list>
                                    </#if>
                                </#list>
                            </#if></em>
                        </span>
                </div>
                <!--//End-->

        <#if obj.ichProject??>
                <div class="bd inheritor">
                    <div class="tname">传承项目</div>
                    <div class="pro">
                        <div class="img">
                            <#if (obj.ichProject.contentFragmentList?size>0)>
                                <#assign proPic="http://resource.efeiyi.com/image/uploads/head.png"/>
                                <#list (obj.ichProject.contentFragmentList) as cf>
                                    <#if cf.attributeId == 112>
                                        <#if (cf.resourceList??)&&(cf.resourceList?size>0)>
                                            <#list cf.resourceList as r>
                                                <#if r.type==0 && r.status==0>
                                                    <#if r.uri??>
                                                        <#assign proPic="${prouri}${r.uri}?x-oss-process=style/head-image-style" />
                                                    </#if>
                                                </#if>
                                            </#list>
                                        </#if>
                                    </#if>
                                </#list>
                            </#if>
                            <a href="${propage}${obj.ichProject.id?c}.html"><img src="${proPic}" width="94" height="70" alt=""></a>
                        </div>
                        <div class="txt">
                            <p class="t">
                                <#if (obj.ichProject.contentFragmentList?size>0)>
                                    <#list (obj.ichProject.contentFragmentList) as cf>
                                        <#if cf.attributeId == 4>
                                        <a href="${propage}${obj.ichProject.id?c}.html">${cf.content}</a>
                                        </#if>
                                    </#list>
                                </#if>
                            </p>
                            <p><#if (obj.ichProject??)>
                                <#if (obj.ichProject.ichCategoryId??)>
                                    类别：<em style="font-size: 12px" id="category" category-id="${obj.ichProject.ichCategoryId}"></em>
                                </#if>
                                <#if !(obj.ichProject.ichCategoryId??)>
                                    类别：<em  style="font-size: 12px" id="category" category-id=""></em>
                                </#if>
                            </#if>
                                 <#if (obj.ichProject.contentFragmentList?size>0)>
                                                 <#list (obj.ichProject.contentFragmentList) as cf>
                                                            <#if cf.attributeId == 33 && cf.content?? && cf.content !="" >
                                                                | 地域： <em style="font-size: 12px" class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</em>
                                                            </#if>
                                                </#list>
                                            </#if>
                            </p>
                            <p><#if (obj.ichProject.contentFragmentList?size>0)>
                                        <#list obj.ichProject.contentFragmentList as cf>
                                            <#if cf.attributeId == 2 && cf.content?? && cf.content !="">
                                                ID：${cf.content}
                                            </#if>
                                        </#list>
                                     </#if>
                            </p>
                        </div>
                    </div>
                </div>
        </#if>
                <!--//ENd-->
            <#if (obj.contentFragmentList??) &&(obj.contentFragmentList?size>0)>
                <div class="bd batch" id="mas">
                    <div class="tname">非遗在中国<i></i></div>
                    <div class="subcon" id="subcon">
                            <#list obj.contentFragmentList as cf>
                                <#if cf.attributeId == 12 && cf.content??>
                                    <span>人类非物质文化遗产编号：${cf.content}</span>
                                </#if>
                                <#if cf.attributeId == 111 && cf.content??>
                                    <span>级别：<em  style="font-size: 12px" class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</em></span>
                                </#if>
                            </#list>
                    </div>
                </div>
            </#if>
                <!--//ENd-->

            </div>

            <div class="card_base">
                <duv class="detail_title">
                    <h2>基础信息</h2>
                </duv>
                <div class="info" id="info">
                    <ul>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attribute?? && cf.attribute.dataType !=1 &&cf.attribute.dataType !=5 && cf.content?? && cf.content !="" && cf.attributeId != 11 && cf.attributeId != 12 && cf.attributeId != 111 && cf.attributeId != 23 && cf.attribute.isOpen == 1>
                                <li>
                                        <span class="key">${cf.attribute.cnName}：</span>
                                        <span class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</span>
                                </li>
                            </#if>
                        </#list>
                    </#if>
                    </ul>
                </div>
            </div>
            <!--//End 基本信息-->
        </div>
    <#assign odd_even =0 />

    <#if (obj.worksList??) && (obj.worksList?size>0)>
        <section class="bd floor odd">
            <div class="card">
                <header><h4>代表作品 </h4><em>共${obj.worksList?size}项</em></header>
                <article class="product_list">
                    <ul>
                        <#list obj.worksList as work>
                            <#if  work.contentFragmentList??>
                                <li>
                                    <!-- 保证图片在上面-->
                                    <#list work.contentFragmentList as c>
                                        <#if c.attributeId==114>
                                            <#if c.resourceList??>
                                                <#list c.resourceList as p>
                                                    <a href="${workspage}${work.id?c}.html"><img src="${p.uri}?x-oss-process=style/head-image-style" alt=""></a>
                                                </#list>
                                            </#if>
                                        </#if>
                                    </#list>

                                    <#list work.contentFragmentList as c>
                                        <#if c.attributeId==28>
                                            <p class="name"><a href="${workspage}${work.id?c}.html">${c.content}</a> </p>
                                        </#if>
                                    </#list>
                                    <#list work.contentFragmentList as c>
                                        <#if c.attributeId==114>
                                            <#if c.resourceList??>
                                                <#list c.resourceList as p>
                                                    <p class="master"><#if p.description??>${p.description}</#if></p>
                                                </#list>
                                            </#if>
                                        </#if>
                                    </#list>
                                </li>
                            </#if>
                        </#list>
                        <#assign odd_even = odd_even+1 />
                    </ul>
                    <div class="page"></div>
                </article>
            </div>
        </section>
    </#if>


        <!--//主内容-->

    <#if (obj.contentFragmentList?size>0)>
        <#list obj.contentFragmentList as cf>
            <#if (cf.attribute??) &&(cf.attribute.dataType == 5) && (cf.resourceList??) && (cf.resourceList?size>0)>

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                    <div class="card" data-id="${cf.id?c}">
                        <header><h4>${cf.attribute.cnName} </h4></header>
                        <article class="text_img">
                            <div class="side">
                                <div class="item">
                                    <p>
                                        <#if cf.content??>
                                        <#assign content =cf.content?replace("。\n", "。<br/>") />
                                    <#--  <#assign content =content?replace("\n", "?<br/>") />-->
                                        <#assign content =content?replace("\n 1、", "<br/>1、") />
                                        <#assign content =content?replace("\n 2、", "<br/>2、") />
                                        <#assign content =content?replace("\n 3、", "<br/>3、") />
                                        <#assign content =content?replace("\n 4、", "<br/>4、") />
                                        ${content}
                                        </#if>
                                    </p>
                                </div>
                            </div>
                            <div class="media">
                                <ul>
                                    <#list cf.resourceList as r>
                                        <li>
                                            <#if r.type ==0>
                                                <#if !(r.uri?contains("${str}")) && !(r.uri?contains("${strs}"))>
                                                    <img src="${masteruri}${r.uri}" alt="">
                                                </#if>
                                                <#if (r.uri?contains("${str}")) || (r.uri?contains("${strs}"))>
                                                    <img src="${r.uri}" alt="">
                                                </#if>
                                                <#if r.description??>
                                                    <span>${r.description}</span>
                                                </#if>

                                            </#if>

                                            <#if r.type ==1>
                                                <div class="card_video">
                                                    <div class="time">30:24</div>
                                                    <div class="play"></div>
                                                    <#if !(r.uri?contains("${str}")) && !(r.uri?contains("${strs}"))>
                                                        <video poster="http://resource.efeiyi.com/image/uploads/exp2.png"  src="${masteruri}${r.uri}" type="video/mp4" style="width: 100%;">
                                                        </video>
                                                    </#if>
                                                    <#if (r.uri?contains("${str}")) || (r.uri?contains("${strs}"))>
                                                        <video poster="http://resource.efeiyi.com/image/uploads/exp2.png"  src="${r.uri}" type="video/mp4" style="width: 100%;">
                                                        </video>
                                                    </#if>
                                                </div>
                                                <#if r.description??>
                                                    <span>${r.description}</span>
                                                </#if>
                                            </#if>
                                            <#if (r_index == 1)>
                                                <#break />
                                            </#if>

                                        </li>
                                    </#list>
                                </ul>

                                <#if (cf.resourceList?size > 2) >
                                    <div class="more">
                                        <a class="albums arrow_right" data-id="${cf.id?c}" href="javascript:;">查看完整图集</a>
                                    </div>
                                </#if>
                            </div>
                        </article>
                    </div>
                </section>

                <#assign odd_even = odd_even+1 />
            </#if>

            <#if ((cf.attribute??) && (cf.attribute.dataType == 5 || cf.attribute.dataType == 1) && (!cf.resourceList?? || cf.resourceList?size==0))>

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                    <div class="card" data-id="${cf.id?c}">
                        <header><h4>${cf.attribute.cnName}  </h4></header>
                        <article class="plain_text">
                            <p>
                                <#if cf.content??>

                                      <#assign content =cf.content />
                                      <#assign content =content?replace("。\n", "。<br>") />
                                      <#assign content =content?replace("？\n", "？<br>") />
                                      <#assign content =content?replace("！\n", "！<br>") />
                                      <#assign content =content?replace("：\n", "：<br>") />

                                      <#assign content =content?replace("（1）、", "<br>（1）、") />
                                      <#assign content =content?replace("（2）、", "<br>（2）、") />
                                      <#assign content =content?replace("（3）、", "<br>（3）、") />
                                      <#assign content =content?replace("（4）、", "<br>（4）、") />
                                      <#assign content =content?replace("（5）、", "<br>（5）、") />
                                      <#assign content =content?replace("（6）、", "<br>（6）、") />

                                    <#-- <#assign content =content?replace("（1）", "<br>（1）") />
                                     <#assign content =content?replace("（2）", "<br>（2）") />
                                     <#assign content =content?replace("（3）", "<br>（3）") />
                                     <#assign content =content?replace("（4）", "<br>（4）") />
                                     <#assign content =content?replace("（5）", "<br>（5）") />
                                     <#assign content =content?replace("（6）", "<br>（6）") />-->


                                      <#assign content =content?replace("\n（1）", "<br>（1）") />
                                     <#assign content =content?replace("\n（2）", "<br>（2）") />
                                     <#assign content =content?replace("\n（3）", "<br>（3）") />
                                     <#assign content =content?replace("\n（4）", "<br>（4）") />
                                     <#assign content =content?replace("\n（5）", "<br>（5）") />
                                     <#assign content =content?replace("\n（6）", "<br>（6）") />

                                        <#assign content =content?replace("（一）", "<br>（一）") />
                                        <#assign content =content?replace("（二）", "<br>（二）") />
                                        <#assign content =content?replace("（三）", "<br>（三）") />
                                        <#assign content =content?replace("（四）", "<br>（四）") />
                                        <#assign content =content?replace("（五）", "<br>（五）") />
                                        <#assign content =content?replace("（六）", "<br>（六）") />
                                        <#assign content =content?replace("（七）", "<br>（七）") />
                                        <#assign content =content?replace("（八）", "<br>（八）") />
                                        <#assign content =content?replace("（九）", "<br>（九）") />


                                     <#assign content =content?replace(" 1、", "<br>1、") />
                                     <#assign content =content?replace(" 2、", "<br>2、") />
                                     <#assign content =content?replace(" 3、", "<br>3、") />
                                     <#assign content =content?replace(" 4、", "<br>4、") />
                                     <#assign content =content?replace(" 5、", "<br>5、") />
                                     <#assign content =content?replace(" 6、", "<br>6、") />
                                      <#assign content =content?replace(" 7、", "<br>7、") />
                                      <#assign content =content?replace(" 8、", "<br>8、") />
                                      <#assign content =content?replace(" 9、", "<br>9、") />



                                    <#--  <#assign content =content?replace("\n", "<br>") />-->
                                     <#assign content =content?replace("\n1、", " <br>1、") />
                                     <#assign content =content?replace("\n2、", "<br>2、") />
                                     <#assign content =content?replace("\n3、", "<br>3、") />
                                     <#assign content =content?replace("\n4、", "<br>4、") />
                                     <#assign content =content?replace("\n5、", "<br>5、") />
                                     <#assign content =content?replace("\n6、", "<br>6、") />
                                      <#assign content =content?replace("\n7、", "<br>7、") />
                                        <#assign content =content?replace("\n8、", "<br>8、") />
                                        <#assign content =content?replace("\n9、", "<br>9、") />
                                        <#assign content =content?replace("\n10、", "<br>10、") />
                                        <#assign content =content?replace("\n11、", "<br>11、") />
                                        <#assign content =content?replace("\n12、", "<br>12、") />
                                        <#assign content =content?replace("\n13、", "<br>13、") />
                                        <#assign content =content?replace("\n14、", "<br>14、") />
                                        <#assign content =content?replace("\n15、", "<br>15、") />
                                        <#assign content =content?replace("\n16、", "<br>16、") />
                                        <#assign content =content?replace("\n17、", "<br>17、") />
                                        <#assign content =content?replace("\n18、", "<br>18、") />
                                        <#assign content =content?replace("\n19、", "<br>19、") />
                                        <#assign content =content?replace("\n20、", "<br>20、") />
                                        <#assign content =content?replace("\n21、", "<br>21、") />
                                        <#assign content =content?replace("\n一、", " <br>一、") />
                                        <#assign content =content?replace("\n二、", "<br>二、") />
                                        <#assign content =content?replace("\n三、", "<br>三、") />
                                        <#assign content =content?replace("\n四、", "<br>四、") />
                                        <#assign content =content?replace("\n五、", "<br>五、") />
                                        <#assign content =content?replace("\n六、", "<br>六、") />
                                        <#assign content =content?replace("\n七、", "<br>七、") />
                                       <#assign content =content?replace("\n八、", "<br>八、") />
                                        <#assign content =content?replace("\n九、", "<br>九、") />


                                    ${content}

                                </#if>
                            </p>
                        <#--${cf.content?replace("\n","</p></p>")}-->

                        </article>
                    </div>
                </section>

                <#assign odd_even = odd_even+1 />
            </#if>

        </#list>
    </#if>
        <!--//End-->

    </div>
    <!--//End detail -->
</div>

<div class="bd footer"></div>
<!--//End--footer-->

<div class="side_fixed">
    <ul></ul>
    <a class="gotop" href="javascript:void(0)" title="返回顶部"></a>
</div>
<!--//End 右侧悬浮-->

</body>

<script>
    $(function() {
        $(".header .content .nav li").eq(0).removeClass("active");
        //给logo加首页链接
        $('.logo').attr('href','http://diich.efeiyi.com/page/index.html');
    });

    //判断图片是否加载完成
    (function () {
        var $img = $('#detailTopic');
        var $content = $('#detailContent');
        var img = document.getElementById('detailTopic');

        img.onload = function () {
            // 加载完成
            var imgW = parseInt($img.width());
            $img.css({width:imgW+'px','margin-left':-parseInt(imgW/2)+'px'});
            $content.css({width:imgW+'px'});
            $img.fadeIn(1000);
        };


        var imgW = parseInt($img.width());
        $img.css({width:imgW+'px','margin-left':-parseInt(imgW/2)+'px'});
        $content.css({width:imgW+'px'});
        $img.fadeIn(1000);
    })();




</script>
</html>