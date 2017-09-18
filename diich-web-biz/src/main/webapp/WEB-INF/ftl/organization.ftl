<!DOCTYPE html>
<html lang="en">

<head>
<#assign caturi="http://diich.efeiyi.com" />
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <title id="title">
    <#if (obj.contentFragmentList?size>0)>
               <#list obj.contentFragmentList as cf>
                    <#if cf.attributeId == 132>
                        ${cf.content}
                    </#if>
                </#list>
     </#if>
    </title>
    <link rel="shortcut icon" type="image/x-icon" href="${caturi}/assets/images/logo.png" media="screen" />
    <link rel="stylesheet" href="${caturi}/assets/css/common.css">
    <link rel="stylesheet" href="${caturi}/assets/css/layout.css">
    <!--[if IE]>
    <link rel="stylesheet" href="${caturi}/assets/css/ie.css">
    <script src="${caturi}/assets/js/html5.js"></script>
    <![endif]-->
    <style>
        .card .plain_text,.card .text_img .side {
            word-wrap: break-word;
        }
    </style>
    <script src="${caturi}/js/base-url.js"></script>
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
        br{line-height:36px;}
        .drop_menu .content .item dl br {line-height: 20px;}
    </style>
</head>

<body class="js-organization">
<div class="header header_detail"></div>
<!--//End header -->
<div class="filter_search filter_search_fixed">
    <div class="content">
        <form class="form" action="http://diich.efeiyi.com/page/search.html">
            <input class="ipt" type="text" id="keyword" name="keyword" value="" autocomplete="off">
            <input type="hidden" id="area_code" name="area_code" value=""/>
            <input type="hidden" id="gb_category_code" name="gb_category_code" value=""/>
            <input type="hidden" id="type" name="type" value=""/>
            <input class="submit" type="button" value="搜索" onclick="submit()">
            <div class="suggest" style="display: none;">
                <ul>

                </ul>
            </div>
        </form>
        <!--//End form-->

        <div class="attr">
            <span id="attr_text">所属类别</span>
            <span id="area_text">全球</span>
        </div>
        <!--//End attribute-->

        <div class="dropbox" id="drag">
            <!--//ENd 全部-->

            <div class="item" id="item_1">
                <dl class="level">
                    <dt>
                    <div class="title">一级分类</div>
                    <div class="subtitle">所有分类</div>
                    </dt>
                    <dd>
                        <ul id="mainCategory">

                        </ul>
                    </dd>
                </dl>
                <dl class="level2">
                    <dt>
                    <div class="title">二级分类</div>
                    <div class="subtitle">所有二级分类</div>
                    </dt>
                    <dd>
                        <ul id="catecontent">

                        </ul>
                    </dd>
                </dl>
            </div>
            <!--//End 所属分类-->

            <div class="item">
                <dl class="level">
                    <dt>
                    <div class="title">位置</div>
                    </dt>
                    <dd>
                        <ul>
                            <li>中国</li>
                        </ul>
                    </dd>
                </dl>
                <dl class="level2">
                    <dt>
                    <div class="title">按照字母顺序</div>
                    </dt>
                    <dd>
                        <ul id="citycontent">
                            <li>安微</li>
                            <li>澳门</li>
                            <li>北京</li>
                            <li>上海</li>
                            <li>福建</li>
                            <li>甘肃</li>
                            <li>广东</li>
                        </ul>
                    </dd>
                </dl>
            </div>
            <!--//End 位置-->

        </div>
        <!--//End attribute-->
    </div>
</div>
<!--//End filter_search -->

<#assign propage = "http://project.efeiyi.com/p/"/>
<#assign workspage = "http://works.efeiyi.com/w/"/>
<#assign masterpage = "http://inheritor.efeiyi.com/m/"/>
<#assign orguri="http://resource.efeiyi.com/image/organization/" />
<#assign orgvuri="http://resource.efeiyi.com/video/organization/" />
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
                            <#if cf.attributeId == 136>
                                <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                    <#list cf.resourceList as res>
                                        <#if res.type==0 && res.status==0>
                                            <#if res.uri??>
                                                <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                                    <img src="${orguri}${res.uri}" alt="" id="detailTopic" style="display:none">
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
                           <#if cf.attributeId == 136>
                               <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                   <#list cf.resourceList as res>
                                       <#if res.type==1 && res.status==0>
                                           <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                               <video poster="${backImgUrl}" src="${orgvuri}${res.uri}"> </video>
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
                            <a href="" class="weixin active"></a>
                        </div>
                        <div class="qrcode">
                            <img width="108" style="display:block" src="${caturi}/organization/getImage?id=${obj.id?c}" alt="微信">
                        </div>
                    </div>
                </div>
                <!--//End -->
                <div class="detail_title">
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 132>
                        <h2>${cf.content}</h2>
                        </#if>
                    </#list>
                </#if>
                    <a href="${caturi}/page/organization/organization.html?orgid=${obj.id?c}" class="edit"><i class="icon"></i>编辑</a>
                    <div class="doi_code">
                        <i class="icon">ID</i>
                        <span>：<em id="doi_code"><#if (obj.contentFragmentList?size>0)>
                                        <#list obj.contentFragmentList as cf>
                                            <#if cf.attributeId == 137>
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

                </div>
                <!--//End-->

                <div class="bd inheritor">

                </div>
                <!--//ENd-->
                <div class="bd batch" id="mas">

                </div>
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
                            <#if cf.attribute?? && cf.attribute.dataType !=1 &&cf.attribute.dataType !=5 && cf.content?? && cf.content !="" && cf.attributeId != 132 && cf.attributeId != 136 && cf.attributeId != 137>
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

        <!--//主内容-->

    <#if (obj.contentFragmentList?size>0)>
        <#list obj.contentFragmentList as cf>
            <#if (cf.attribute??) &&(cf.attribute.dataType == 5) && (cf.resourceList??) && (cf.resourceList?size>0)>

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                    <div class="card" data-id="${cf.id?c}">
                        <header><h4>${cf.attribute.cnName} </h4></header>
                        <article class="text_img">
                            <#if cf.content?? && cf.content != "">
                                <div class="side" style="margin-right:30px;">
                                    <div class="item">
                                        <p>
                                            <#if cf.content??>
                                                <#assign content =cf.content?replace("\n","<p></p>") />
                                                 ${content}
                                            </#if>
                                        </p>
                                    </div>
                                </div>
                            </#if>
                            <div class="media">
                                <ul>
                                    <#list cf.resourceList as r>
                                        <li>
                                            <#if r.type ==0>
                                                <#if !(r.uri?contains("${str}")) && !(r.uri?contains("${strs}"))>
                                                    <img src="${orguri}${r.uri}" alt="">
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
                                                    <#if !(r.uri?contains("${str}")) && !(r.uri?contains("${strs}"))>
                                                        <video poster="" controls src="${orguri}${r.uri}" type="video/mp4" style="width:100%;max-height:277px;background: #000;">
                                                        </video>
                                                    </#if>
                                                    <#if (r.uri?contains("${str}")) || (r.uri?contains("${strs}"))>
                                                        <video poster="" controls src="${r.uri}" type="video/mp4" style="width: 100%;">
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

            <#if ((cf.attribute??) && (cf.attribute.dataType == 5 || cf.attribute.dataType == 1) && (!cf.resourceList?? || cf.resourceList?size==0)) && cf.content?? && cf.content != "">

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                    <div class="card" data-id="${cf.id?c}">
                        <header><h4>${cf.attribute.cnName}  </h4></header>
                        <article class="plain_text">
                            <p>
                                <#if cf.content??>
                                    <#assign content =cf.content?replace(" ","&nbsp;")?replace("\n","<br/>") />
                                     ${content}
                                </#if>
                            </p>

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
        $('.logo').attr('href','${caturi}/page/index.html');
    });

    //判断图片是否加载完成
    setTimeout(function () {
        var $img = $('#detailTopic');
        var $content = $('#detailContent');
        var img = document.getElementById('detailTopic');

        if(img != null){
            img.onload = function () {
                // 加载完成
                var imgW = parseInt($img.width());
                $img.css({width:imgW+'px','margin-left':-parseInt(imgW/2)+'px'});
                $content.css({width:imgW+'px'});
                $img.fadeIn(800);
            };
        }


        var imgW = parseInt($img.width());
        $img.css({width:imgW+'px','margin-left':-parseInt(imgW/2)+'px'});
        $content.css({width:imgW+'px'});
        $img.fadeIn(800);

    },2000);




</script>
</html>