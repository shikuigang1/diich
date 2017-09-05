<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <#assign caturi="http://diich.efeiyi.com" />
    <#assign h5uri="http://47.95.32.236/lntang" />
    <title>
    <#if (obj.contentFragmentList??) && (obj.contentFragmentList?size>0)>
       <#list obj.contentFragmentList as cf>
        <#if (obj.lang == "chi")>
            <#if cf.attributeId == 4>
            ${cf.content}
            </#if>
        </#if>
        <#if (obj.lang == "eng")>
            <#if cf.attributeId == 5>
            ${cf.content}
            </#if>
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
    <link rel="stylesheet" type="text/css" href="${h5uri}/css/project.css"/>
    <link rel="stylesheet" type="text/css" href="${h5uri}/links/js/reset.css"/>
    <script src="${h5uri}/links/js/rem.js" type="text/javascript" charset="utf-8"></script>
    <script src="${h5uri}/links/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${h5uri}/assets/js/Menu2.js" type="text/javascript" charset="utf-8"></script>
    <script src="${h5uri}/assets/js/scrollBar.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" type="text/css" href="${h5uri}/links/css/style.css"/>
    <link rel="stylesheet" type="text/css" href="${h5uri}/css/swiper.min.css"/>
    <script src="${h5uri}/links/js/swiper.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${caturi}/data/dictionary.js"></script>
    <script src="${caturi}/data/category.js"></script>
    <script src="${caturi}/js/util.js"></script>

</head>
<body>
<div class="box" id="box">
    <!--上导航-->
    <div class="box_header" id="box_header">
    </div>
    <!--分类-->
    <div class="box_list" id="box_list">
        <ul>
            <li id="li1">
                <a href="javascript:;"><img src="${h5uri}/links/img/souye.png"/></a>
                <a href="javascript:;"><img src="${h5uri}/assets/images/home.png"/></a>
                <span>首页</span>
            </li>
            <li id="box_list_search">
                <a href="javascript:;"><img src="${h5uri}/links/img/feiyiminglu.png"/></a>
                <a href="javascript:;"><img src="${h5uri}/assets/images/feiyi.png"/></a>
                <span>搜索</span>
            </li>
            <li class="lii"  id="li2">
                <a href="javascript:;"><img src="${h5uri}/links/img/minglupass.png"/></a>
                <a href="javascript:;"><img src="${h5uri}/assets/images/pass.png"/></a>
                <span>非遗名录</span>
            </li>
            <li id="li3">
                <a href="javascript:;"><img src="${h5uri}/links/img/shenbao.png"/></a>
                <a href="javascript:;"><img src="${h5uri}/assets/images/shenbao.png"/></a>
                <span>我要申报</span>
            </li>
            <li id="li4">
                <a href="javascript:;"><img src="${h5uri}/links/img/Group 13.png"/></a>
                <a href="javascript:;"><img src="${h5uri}/assets/images/Group 13.png"/></a>
                <span>官方服务</span>
            </li>
        </ul>
    </div>

<#assign prouri="http://resource.efeiyi.com/image/project/" />
<#assign provuri="http://resource.efeiyi.com/video/project/" />
<#assign masteruri="http://resource.efeiyi.com/image/master/" />
<#assign worksuri="http://resource.efeiyi.com/image/works/" />
<#assign str="http:" />
<#assign strs="https:" />
    <!--内容信息-->
    <div class="content" id="content">
        <!--搜索-->
        <div class="content_search" id="content_search">
            <!--删除按钮-->
            <div class="banner_remove" id="">
                <a href="javascript:;">
                    <span>|</span>
                    <img src="${h5uri}/links/img/Combined Shape.png" id="val_rem"/>
                </a>
            </div>
            <!--搜索-->
            <div class="banner_search">
                <input type="text" placeholder="请输入非遗相关内容" id="Text_inp"/>
                <input type="image" src="${h5uri}/links/img/sousuo.png" id="Text"/>
            </div>
        </div>

        <!--banner-->
        <div class="banner">
        <#assign backImgUrl="http://resource.efeiyi.com/image/uploads/head.png">
        <#if (obj.contentFragmentList?size>0)>
            <#list obj.contentFragmentList as cf>
                <#if cf.attributeId == 1>
                    <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                        <#list cf.resourceList as res>
                            <#if res.type==0 && res.status==0 && res.uri?? && res.uri != "">
                                <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                    <#assign backImgUrl = "${prouri}${res.uri}" />
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
                        <li>
                        <#if obj.contentFragmentList?? && (obj.contentFragmentList?size>0)>
                            <#list obj.contentFragmentList as cf>
                            <#if obj.lang == "chi">
                                <#if cf.attributeId == 4 && cf.content?? && cf.content !="">
                                    ${cf.content}
                                </#if>
                            </#if>
                            <#if obj.lang == "eng">
                                <#if cf.attributeId == 5 && cf.content?? && cf.content !="">
                                    ${cf.content}
                                </#if>
                            </#if>
                            </#list>
                        </#if>
                        </li>
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
                <#if (obj.version??) && (obj.version.mainVersionId??) && (obj.version.branchVersionId??)>
                <div>
                    <#if obj.lang == "chi">
                        <p>英文条目：<a href="${obj.version.branchVersionId?c}.html">English version</a></p>
                    </#if>
                    <#if obj.lang == "eng">
                        <p>English version：<a href="${obj.version.mainVersionId?c}.html">该词条中文版</a></p>
                    </#if>
                </div>
                </#if>

                <#if obj.lang == "chi">
                    <div>
                        <p>类别</p>

                        <#if (obj.ichCategoryId??)>
                            <p id="category" category-id="${obj.ichCategoryId?c}">${obj.ichCategoryId?c}</p>
                        </#if>
                        <#if (!obj.ichCategoryId??)>
                            <p id="category" category-id="" ></p>
                        </#if>

                    </div>
                </#if>
                <#if obj.lang == "eng">
                    <div>
                        <p>Category</p>

                        <#if (obj.ichCategoryId??)>
                            <P id="category" category-id="${obj.ichCategoryId?c}">${obj.ichCategoryId?c}</P>
                        </#if>
                        <#if (!obj.ichCategoryId??)>
                            <p id="category" category-id="" ></p>
                        </#if>

                    </div>
                </#if>
                <#if obj.contentFragmentList?? && (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 33 && cf.content?? && cf.content !="">
                            <div>
                                <#if obj.lang == "chi">
                                    <p>地域</p>
                                </#if>
                                <#if obj.lang == "eng">
                                    <p>District</p>
                                </#if>
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
        <!--传承人-->

        <div class="inherit">
        <#if obj.ichMasterList?? && (obj.ichMasterList?size > 0)>
            <div class="inherit_content" id="Representative_inheritors">

                <#if obj.lang == "chi">
                    <h4>代表性传承人</h4>
                </#if>
                <#if obj.lang == "eng">
                    <h4>Representativeness</h4>
                </#if>

                <!--默认显示内容-->
                <ul id="inherit_content_ul">
                <#list obj.ichMasterList as master>
                    <#assign masterPic="http://resource.efeiyi.com/image/uploads/default_avatar2.png?x-oss-process=style/head-image-style">
                    <#assign masterName=""/>
                    <#assign masterRank=""/>
                    <#assign masterTitle=""/>
                    <#assign dataType=""/>
                    <#if (master.contentFragmentList??) && (master.contentFragmentList?size>0)>
                    <li>
                        <#list master.contentFragmentList as cf>
                            <#if cf.attributeId == 113>
                                <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                    <#list cf.resourceList as r>
                                        <#if r?? &&(r.uri??)>
                                            <#assign masterPic="${masteruri}${r.uri}?x-oss-process=style/head-image-style">
                                        </#if>
                                    </#list>
                                </#if>
                            </#if>
                            <#if obj.lang == "chi" >
                                <#if cf.attributeId == 13 && cf.content?? && cf.content != "">
                                    <#assign masterName="${cf.content}"/>
                                </#if>
                            </#if>
                            <#if obj.lang == "eng" >
                                <#if cf.attributeId == 14 && cf.content?? && cf.content != "">
                                    <#assign masterName="${cf.content}"/>
                                </#if>
                            </#if>
                            <#if cf.attributeId == 111 && cf.content?? && cf.content != "">
                                <#assign masterRank="${cf.content}"/>
                                <#assign dataType="${cf.attribute.dataType}"/>
                            </#if>
                            <#if cf.attributeId == 50 && cf.content?? && cf.content != "">
                                <#assign masterTitle="${cf.content}"/>
                            </#if>
                        </#list>
                        <div>
                            <img src="${masterPic}"/>
                        </div>
                        <div>
                            <#if ("${masterName}" !=  "")>
                                <p>${masterName}</p>
                            </#if>
                            <#if ("${masterRank}" !=  "")>
                                <p class="value dic" dic-type="${dataType}" lang="${obj.lang}">${masterRank}</p>
                            </#if>
                            <#if ("${masterTitle}" !=  "")>
                                <p>${masterTitle}</p>
                            </#if>
                        </div>
                    </li>
                    </#if>
                </#list>
                </ul>

                <p class="Load_la" id="Load_la">
                    <img src="${h5uri}/images/hide.png" class="shOp" id="img1"/>
                    <img src="${h5uri}/images/shop.png" id="img2"/>
                </p>
            </div>
        </#if>
            <div class="inherit_content2">
                <#if obj.lang == "chi">
                    <h4><span>非遗在中国</span><img src="${h5uri}/images/logo123.png"></h4>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 106 && cf.content?? && cf.content != "" >
                            <p>
                                <span>中国非遗名录编号</span>
                                <span class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</span>
                            </p>
                        </#if>
                    </#list>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 41 &&  cf.content?? && cf.content != "">
                                <p>
                                    <span>级别 </span>
                                    <span class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</span>
                                </p>
                            </#if>
                        </#list>
                    </#if>

                </#if>
                <#if obj.lang == "eng">
                    <h4><span>The heritage in China</span><img src="${h5uri}/images/logo123.png"></h4>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 106 && cf.content?? && cf.content != "" >
                            <p>
                                <span>Human intangible cultural heritage number</span>
                                <span class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</span>
                            </p>
                        </#if>
                    </#list>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 41 &&  cf.content?? && cf.content != "">
                                <p>
                                    <span>Rank </span>
                                    <span class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</span>
                                </p>
                            </#if>
                        </#list>
                    </#if>

                </#if>
            </div>

        </div>


        <div class="content_box">
            <!--基本信息-->
            <div class="inFormation" id="Essential_information">
                <h3><#if obj.lang == "chi">
                    基础信息
                </#if>
                <#if obj.lang == "eng">
                    Basic information
                </#if><span>_</span>
                </h3>
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attribute?? && cf.attribute.dataType !=1 &&cf.attribute.dataType !=5 && cf.content?? && cf.content !="" && cf.attributeId != 106 && cf.attributeId != 2 && cf.attributeId != 41 && cf.attributeId != 33>
                            <p>
                                <span>
                                <#if obj.lang == "chi">
                                    ${cf.attribute.cnName}
                                </#if>
                                <#if obj.lang == "eng">
                                    ${cf.attribute.enName}
                                </#if>
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
                <h3><#if obj.lang == "chi">
                    代表作品
                    </#if>
                    <#if obj.lang == "eng">
                        Representative works
                    </#if><span>_</span>
                </h3>
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
                    <#if cf.attribute?? && (cf.attribute.dataType == 5 || cf.attribute.dataType == 1)>
                        <div class="inFormation2" id="Essential_${cf.id?c}">
                            <h3><#if obj.lang == "chi">
                                ${cf.attribute.cnName}
                                </#if>
                                <#if obj.lang == "eng">
                                ${cf.attribute.enName}
                                </#if><span>_</span>
                            </h3>
                            <div class="inFormation2_num">
                                <ul class="link">
                                    <#if cf.resourceList?? && (cf.resourceList?size>0)>
                                        <#list cf.resourceList as res>
                                            <#if res?? && res.uri?? && res.uri != "" >
                                                <#if res.type == 1>
                                                    <div class="swiper-slide">
                                                        <li>
                                                            <!--视频-->
                                                            <div class="viDeo2">
                                                                <video preload="preload" poster width="100%">
                                                                    <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                                                        <source src="${provuri}${res.uri}">
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
                                                                <img src="${prouri}${res.uri}"/>
                                                            </#if>
                                                            <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                                                <img src="${res.uri}"/>
                                                            </#if>
                                                        </li>
                                                    </div>
                                                </#if>
                                            </#if>
                                        </#list>
                                    </#if>
                                </ul>
                                <div class="show_num">
                                    <span class="numBerStr"></span>
                                    <img src="${h5uri}/assets/iocn/Group .png"/>
                                </div>
                            </div>
                            <#if cf.resourceList?? && (cf.resourceList?size>0)>
                                <#list cf.resourceList as res>
                                    <#if res?? && res.description?? && res.description != "" >
                                        <p class="For_h">${res.description}</p>
                                    </#if>
                                </#list>
                            </#if>
                            <#if cf.content?? && cf.content != "">
                                <p class="For_content2">
                                    <#assign content =cf.content?replace("<", "&lt;")?replace(" ","&nbsp;")?replace("\n","<br>") />
                                    ${content}
                                </p>
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

