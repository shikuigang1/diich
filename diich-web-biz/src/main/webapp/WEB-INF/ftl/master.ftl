<!DOCTYPE html>
<html lang="en">

<head>
<#assign caturi="http://123.57.174.187" />
<#--<#assign caturi=".." />-->
<#--<#assign caturi="http://47.95.32.236" />-->
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
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

    <link rel="stylesheet" href="${caturi}/css/icon.min.css">
    <link rel="stylesheet" href="${caturi}/css/button.min.css">
    <link rel="stylesheet" href="${caturi}/assets/css/inputs.css">
    <link rel="stylesheet" href="${caturi}/css/loader.min.css">
    <link rel="stylesheet" href="${caturi}/css/dropdown.min.css">
    <link rel="stylesheet" href="${caturi}/css/transition.min.css">
    <link rel="stylesheet" href="${caturi}/css/jHsDate.css">
    <link rel="stylesheet" href="${caturi}/css/master-edit.css">

    <!--[if IE]>
    <link rel="stylesheet" href="${caturi}/assets/css/ie.css">
    <script src="${caturi}/assets/js/html5.js"></script>
    <![endif]-->
    <style>
        .card .plain_text,.card .text_img .side {
            word-wrap: break-word;
        }
        .detail_title .edit{top:-50px}
    </style>
    <script src="${caturi}/js/base-url.js"></script>

    <script type="text/javascript" charset="utf-8" src="${caturi}/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="${caturi}/ueditor/_examples/editor_api.js"> </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="${caturi}/ueditor/lang/zh-cn/zh-cn.js"></script>

    <script src="${caturi}/assets/js/jquery.min.js"></script>
    <script src="${caturi}/assets/js/jQuery.Form.js"></script>
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

    <script src="${caturi}/js/semantic.min.js"></script>
    <script src="${caturi}/js/jHsDate.js"></script>
    <script src="${caturi}/js/master-edit-template.js"></script>
    <script src="${caturi}/js/master-edit.js"></script>

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

<body class="js-master">
<div class="header header_detail"></div>
<!--//End header -->
<div class="filter_search filter_search_fixed">
    <div class="content">
        <form class="form" action="${caturi}/page/search.html">
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

<#assign propage = "http://project.diich.com/p/"/>
<#assign workspage = "http://works.diich.com/w/"/>
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
                                        <#if res.type?? && res.type==0 && res.status?? && res.status==0 && res.uri?? && res.uri != "">
                                            <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                                <img src="${masteruri}${res.uri}" alt="" id="detailTopic" style="display:none">
                                            </#if>
                                            <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                                <img src="${res.uri}" alt="" id="detailTopic" style="display:none">
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
                                       <#if res.type?? && res.type==1 && res.uri?? && res.uri != "">
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
            <div class="card_main section" data-type="main-text">
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
                <div class="main-info-button handle-button"></div>
                <div class="read-piece">
                <div class="detail_title">
                <#if obj.type?? && obj.type == 1>
                    <div class="icon-Official"></div>
                </#if>
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 13>
                            <#assign mastername = cf.content>
                        <h2>
                            ${cf.content}
                            <span class="primary edit link" master-id="${obj.id?c}"><i class="icon"></i>编辑</span>
                        </h2>
                        </#if>
                    </#list>
                </#if>
                <#--获取所属项目的名称-->
                <#assign pname = "" />
                <#if obj.ichProject?? && (obj.ichProject.contentFragmentList??) && (obj.ichProject.contentFragmentList?size>0)>
                    <#list (obj.ichProject.contentFragmentList) as cf>
                        <#if cf.attributeId == 4>
                            <#assign pname = "${cf.content}" />
                        </#if>
                    </#list>
                </#if>
                    <#--<a href="${caturi}/page/ichMasterForm.html?mid=${obj.id?c}&pname=${pname}" class="edit"><i class="icon"></i>编辑</a>-->
                    <div class="doi_code">
                        <i class="icon">ID</i>
                        <span>：<em id="doi_code"><#if (obj.contentFragmentList?size>0)>
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
                                    <#if cf.attributeId == 23 && cf.content?? && cf.content != "">
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
                            <#assign proPic="http://resource.efeiyi.com/image/uploads/head.png"/>
                            <#if (obj.ichProject.contentFragmentList?size>0)>
                                <#list (obj.ichProject.contentFragmentList) as cf>
                                    <#if cf.attributeId == 1>
                                        <#if (cf.resourceList??)&&(cf.resourceList?size>0)>
                                            <#list cf.resourceList as r>
                                                <#if r.type?? && r.type==0 && r.status?? && r.status==0>
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
                                <#if cf.attributeId == 12 && cf.content?? && cf.content != "">
                                    <span>非遗编码：${cf.content}</span>
                                </#if>
                                <#if cf.attributeId == 111 && cf.content?? && cf.content != "">
                                    <span>非遗等级：<em  style="font-size: 12px" class="value dic" dic-type="${cf.attribute.dataType}" lang="${obj.lang}">${cf.content}</em></span>
                                </#if>
                            </#list>
                    </div>
                </div>
            </#if>
                <!--//ENd-->
                </div>

            </div>

            <div class="card_base section" data-type="short-text">
                <duv class="detail_title handle-button">
                    <h2 class="title">基础信息</h2>
                </duv>
                <div class="info read-piece" id="info">
                    <ul>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attribute?? && cf.attribute.dataType !=1 &&cf.attribute.dataType !=5 && cf.content?? && cf.content !="" && cf.attributeId != 11 && cf.attributeId != 12 && cf.attributeId != 111 && cf.attributeId != 23 && cf.attribute.isOpen == 1>
                                <li data-open="${cf.attribute.isOpen}">
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

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>" data-type="image-text">
                    <div class="card" data-id="${cf.attributeId?c}">
                        <header class="title handle-button"><h4>${cf.attribute.cnName} </h4></header>
                        <article class="text_img read-piece">
                            <#if cf.content??>
                                <div class="side" style="margin-right:30px;">
                                    <div class="item data-item item-content" data-id="${cf.attributeId?c}">

                                            <#assign content =cf.content?replace(" ","&nbsp;")?replace("\n","<br/>") />
                                             ${content}

                                    </div>
                                </div>
                            </#if>
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
                                                    <#if !(r.uri?contains("${str}")) && !(r.uri?contains("${strs}"))>
                                                        <video poster="" controls src="${masteruri}${r.uri}" type="video/mp4" style="width:100%;max-height:277px;background: #000;">
                                                        </video>
                                                    </#if>
                                                    <#if (r.uri?contains("${str}")) || (r.uri?contains("${strs}"))>
                                                        <video poster=""  src="${r.uri}" type="video/mp4" style="width: 100%;">
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

                                <#if (cf.resourceList?size > 0) >
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

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>"  data-type="image-text">
                    <div class="card" data-id="${cf.attributeId?c}">
                        <header class="title handle-button"><h4>${cf.attribute.cnName}  </h4></header>
                        <article class="plain_text read-piece">
                            <div class="data-item item-content" data-id="${cf.attributeId?c}">
                                <#if cf.content??>
                                    <#assign content =cf.content?replace(" ","&nbsp;")?replace("\n","<br/>") />
                                     ${content}
                                </#if>
                            </div>
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