<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <#assign caturi="http://diich.efeiyi.com" />
    <#assign h5uri="http://diich.efeiyi.com/lntang" />
    <title>
    <#if (obj.contentFragmentList??) && (obj.contentFragmentList?size>0)>
       <#list obj.contentFragmentList as cf>
            <#if cf.attributeId == 13>
            ${cf.content}
            </#if>
        </#list>
    </#if>
    </title>
    <meta name="author" content="...">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="Content-Type" content="text/html; charset=GBK">
    <meta name="author" content="....">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="Expires" content="-1">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta name="description" content="...." />
    <link rel="shortcut icon" type="image/x-icon" href="${h5uri}/assets/logo.png" media="screen">
    <link rel="stylesheet" type="text/css" href="${h5uri}/css/name.css"/>
    <link rel="stylesheet" type="text/css" href="${h5uri}/links/js/reset.css"/>
    <script src="${h5uri}/links/js/rem.js" type="text/javascript" charset="utf-8"></script>
    <script src="${h5uri}/links/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${h5uri}/assets/js/Menu2.js" type="text/javascript" charset="utf-8"></script>
    <script src="${h5uri}/assets/js/scrollBar.js" type="text/javascript" charset="utf-8"></script>
    <script src="${h5uri}/Sign_ajax.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" type="text/css" href="${h5uri}/links/css/style.css"/>
    <link rel="stylesheet" type="text/css" href="${h5uri}/css/swiper.min.css"/>
    <script src="${h5uri}/links/js/swiper.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${caturi}/data/dictionary.js"></script>
    <script src="${caturi}/data/category.js"></script>
    <script src="${caturi}/js/util.js"></script>

</head>
<body class="js-h5master" data-id="${obj.id?c}">
<div class="box" id="box">
    <!--上导航-->
    <div class="box_header" id="box_header">
    </div>
    <!--分类-->
    <div class="box_list" id="box_list">
        <ul>
            <li id="li1">
                <a href="javascript:;"><img src="${h5uri}/links/img/souye.png"/></a>
                <span>首页</span>
            </li>
            <li id="box_list_search">
                <a href="javascript:;"><img src="${h5uri}/links/img/feiyiminglu.png"/></a>
                <span>搜索</span>
            </li>
            <li id="li3">
                <a href="javascript:;"><img src="${h5uri}/links/img/shenbao.png"/></a>
                <span>我要申报</span>
            </li>
            <li id="li4">
                <a href="javascript:;"><img src="${h5uri}/links/img/Group 13.png"/></a>
                <span>官方服务</span>
            </li>
        </ul>
    </div>

    <#assign prouri="http://resource.efeiyi.com/image/project/" />
    <#assign provuri="http://resource.efeiyi.com/video/project/" />
    <#assign masteruri="http://resource.efeiyi.com/image/master/" />
    <#assign mastervuri="http://resource.efeiyi.com/video/master/" />
    <#assign worksuri="http://resource.efeiyi.com/image/works/" />
    <#assign str="http:" />
    <#assign strs="https:" />
    <!--搜索-->
    <div class="content_search" id="content_search">
    </div>
    <!--内容信息-->
    <div class="content" id="content">

        <!--banner-->
        <div class="banner">
            <#assign backImgUrl="http://resource.efeiyi.com/image/uploads/head.png">
            <#if (obj.contentFragmentList?size>0)>
                <#list obj.contentFragmentList as cf>
                    <#if cf.attributeId == 10>
                        <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                            <#list cf.resourceList as res>
                                <#if res.type==0 && res.status==0 && res.uri?? && res.uri != "">
                                    <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                        <#assign backImgUrl = "${masteruri}${res.uri}" />
                                    </#if>
                                    <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                        <#assign backImgUrl = "${res.uri}" />
                                    </#if>
                                </#if>
                            </#list>
                        </#if>
                    </#if>
                </#list>
            </#if>
            <img src="${backImgUrl}"/>
        </div>

        <!--介绍-->
        <div class="forma_duce">
            <div>
                <h3>
                    <ul>
                        <#if (obj.contentFragmentList??) && (obj.contentFragmentList?size>0)>
                            <#list obj.contentFragmentList as cf>
                                <#if cf.attributeId == 13>
                                <li>${cf.content}</li>
                                </#if>
                            </#list>
                        </#if>
                        <li>
                            <div>
                                <a href="javascript:;">
                                </a>
                                <a href="javascript:;">
                                    <div  class="heart" id="like11" rel="like"></div>
                                    <span class="likeCount" id="likeCount11">665</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </h3>
                <div>

                </div>
                <div>

                </div>
                <div>
                    <#if obj.contentFragmentList?? && (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 23 && cf.content?? && cf.content !="">
                                <div>
                                    <p>地域</p>
                                    <ul>
                                        <#assign codeList = cf.content?split(",")>
                                        <#list codeList as s>
                                            <li class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${s}</li>
                                        </#list>
                                    </ul>
                                </div>
                            </#if>
                        </#list>
                    </#if>
                </div>
            </div>
        </div>
        <!--传承人-->
        <div class="inherit">
            <div class="inherit_content2">
                <h4><span>非遗在中国</span><img src="${h5uri}/images/logo123.png"></h4>
                <#list obj.contentFragmentList as cf>
                    <#if cf.attributeId == 12 && cf.content?? && cf.content != "" >
                        <p>
                            <span>非遗编码</span>
                            <span class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</span>
                        </p>
                    </#if>
                </#list>
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 111 &&  cf.content?? && cf.content != "">
                            <p>
                                <span>非遗等级</span>
                                <span class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</span>
                            </p>
                        </#if>
                    </#list>
                </#if>
            </div>

        </div>


        <div class="content_box">
            <!--基本信息-->
            <div class="inFormation" id="Essential_information">
                <h3>基本信息<span>_</span></h3>
            <#if (obj.contentFragmentList?size>0)>
                <#list obj.contentFragmentList as cf>
                    <#if cf.attribute?? && cf.attribute.dataType !=1 &&cf.attribute.dataType !=5 && cf.content?? && cf.content !="" && cf.attributeId != 11 && cf.attributeId != 12 && cf.attributeId != 111 && cf.attributeId != 23 && cf.attribute.isOpen == 1>
                        <p>
                                <span>
                                    ${cf.attribute.cnName}
                                </span>
                            <span  class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</span>
                        </p>
                    </#if>
                </#list>
            </#if>
            </div>
            <!--代表性作品-->
             <#if obj.worksList?? && (obj.worksList?size>0) >
            <div class="inFormation3" id="Representative_works">
                <h3>代表作品<span>_</span></h3>
                <!--picture-->
                <div class="picTure">
                    <ul class="link">
                        <#assign workSummary = ""/>
                        <#list obj.worksList as work>
                            <#if (work.contentFragmentList??) && (work.contentFragmentList?size>0)>
                                <#list work.contentFragmentList as cf>
                                    <#if cf.resourceList?? && cf.resourceList?size>0>
                                        <#list cf.resourceList as res>
                                            <#if res?? && res.type == 0 && res.uri?? &&res.uri != "">
                                                <div class="swiper-slide">
                                                    <li>
                                                        <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                                            <img src="${worksuri}${res.uri}">
                                                        </#if>
                                                        <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                                            <img src="${res.uri}">
                                                        </#if>
                                                    <#--<img src="images/stock-photo-too.png"/>-->
                                                    </li>
                                                </div>
                                            </#if>
                                        </#list>
                                    </#if>
                                    <#if cf.attributeId?? && cf.attributeId == 31>
                                        <#assign workSummary = cf.content/>
                                    </#if>
                                </#list>
                            </#if>
                            <#if work_index == 1>
                                <#break />
                            </#if>>
                        </#list>
                    </ul>
                    <b class="More_num">共<b class="numBerStr"></b>张</b>
                </div>
                <#if workSummary != "" >
                    <p class="For_content3">
                    ${workSummary}
                    </p>
                </#if>
            </div>
        </#if>
            <!--基本内容-->
            <#if (obj.contentFragmentList??) && (obj.contentFragmentList?size>0)>
                <#list obj.contentFragmentList as cf>
                    <#if cf.attribute?? && ((cf.attribute.dataType == 5 && ((cf.content?? && cf.content != "") || (cf.resourceList?? && cf.resourceList?size>0))) || (cf.attribute.dataType == 1 && cf.content?? && cf.content != ""))>
                        <div class="inFormation2" id="Essential_${cf.id?c}">
                            <h3>
                            ${cf.attribute.cnName}
                            <span>_</span>
                            </h3>
                            <#if cf.resourceList?? && (cf.resourceList?size>0)>
                            <div class="inFormation2_num">
                                <ul class="link">
                                        <#list cf.resourceList as res>
                                            <#if res?? && res.uri?? && res.uri != "" >
                                                <#if res.type == 1>
                                                    <div class="swiper-slide">
                                                        <li>
                                                            <!--视频-->
                                                            <div class="viDeo2">
                                                                <video preload="preload" poster width="100%">
                                                                    <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                                                        <source src="${masteruri}${res.uri}">
                                                                    </#if>
                                                                    <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                                                        <source src="${res.uri}">
                                                                    </#if>
                                                                </video>
                                                                <div class="clIck2">
                                                                    <div class="triangle-right2"></div>
                                                                </div>
                                                            </div>

                                                        </li>
                                                    </div>
                                                </#if>
                                            </#if>
                                        </#list>
                                        <#list cf.resourceList as res>
                                            <#if res?? && res.uri?? && res.uri != "" >
                                                <#if res.type == 0>
                                                    <div class="swiper-slide">
                                                        <li>
                                                            <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                                                <img src="${masteruri}${res.uri}"/>
                                                            </#if>
                                                            <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                                                <img src="${res.uri}"/>
                                                            </#if>
                                                        </li>
                                                    </div>
                                                </#if>
                                            </#if>
                                        </#list>

                                </ul>
                                <div class="show_num">
                                    <span class="numBerStr"></span>
                                    <img src="${h5uri}/assets/iocn/Group .png"/>
                                </div>
                            </div>
                            </#if>
                            <#if cf.resourceList?? && (cf.resourceList?size>0)>
                                <#list cf.resourceList as res>
                                    <#if res?? && res.description?? && res.description != "" >
                                        <p class="For_h">${res.description}</p>
                                    </#if>
                                </#list>
                            </#if>
                            <#if cf.content?? && cf.content != "">
                                <div class="For_content2">
                                    <#assign content =cf.content?replace(" ","&nbsp;")?replace("\n","<br>") />
                                        ${content}
                                </div>
                            </#if>

                        </div>
                    </#if>
                </#list>
            </#if>

        </div>

    </div>





    <!--小功能-->
    <div id="gong"></div>
    <!--牛逼马赛克-->
    <div class="Mosaic" id="Mosaic"></div>
    <div class="Mosaic_left"></div>
    <div class="Mosaic_right"></div>


    <!--图片展示图层-->
    <div class="box_layer" id="box_layer">
        <button id="Close">关闭</button>
        <!--内容-->
        <div class="box_layer_content">
            <!--展示图-->
            <!--<div class="back_img" id="back_img"></div>-->
            <div class="swiper-banner-Lu-back">
                <div class="swiper-wrapper" id="banner_back">

                </div>
            </div>
        </div>
        <div class="back_Slide">
            <div class="banner">
                <div class="swiper-banner-Lu">
                    <div class="swiper-wrapper" id="swiper-wrapper-append">

                    </div>
                    <!--方向-->
                    <div class="swiper-button-prev swiper-button-white"></div>
                    <div class="swiper-button-next swiper-button-white"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="box_layer_tow" id="box_layer_tow_show">
        <span id="Close_tow">关闭</span>
        <div id="box_layer_tow">

        </div>
    </div>

</div>
</body>
<script>
    $(function() {
        _dic();
        _category();
    });
    function _dic() {
        //替换资源数据
        var code_arr = $('.dic');
        for(var i = 0; i < code_arr.length; i ++) {
            var _code = $(code_arr[i]).text();
            var _type = $(code_arr[i]).attr('dic-type');
            if(_type<100){
                $(code_arr[i]).text(_code);
            }
            var _lang = $(code_arr[i]).attr('lang');
            var _value = getTextByTypeAndCode(_type, _code, _lang);
            $(code_arr[i]).text(_value);
        }
    }

    function _category() {
        var _catId = $("#category").attr("category-id");
        var text = getCategoryTextById(_catId);
        $("#category").text(text);
    }
</script>
</html>

