<!DOCTYPE html>
<html lang="en">

<head>
<#assign caturi=".." />
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <title id="title">
    <#if (obj.contentFragmentList?size>0)>
       <#list obj.contentFragmentList as cf>
        <#if (obj.lang == "chi")>
            <#if cf.attributeId == 4>
                <#assign proname = cf.content>
            ${cf.content}
            </#if>
        </#if>
        <#if (obj.lang == "eng")>
            <#if cf.attributeId == 5>
                <#assign proname = cf.content>
            ${cf.content}
            </#if>
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
    <link rel="stylesheet" href="${caturi}/css/project-detail.css?7">

    <!--[if IE]>
    <link rel="stylesheet" href="${caturi}/assets/css/ie.css">
    <script src="${caturi}/assets/js/html5.js"></script>
    <![endif]-->

    <script type="text/javascript" charset="utf-8" src="${caturi}/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="${caturi}/ueditor/_examples/editor_api.js"> </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="${caturi}/ueditor/lang/zh-cn/zh-cn.js"></script>

    <script src="${caturi}/data/keyword.js"></script>
    <script src="${caturi}/assets/js/jquery.min.js"></script>
    <script src="${caturi}/assets/js/system.js"></script>
    <script src="${caturi}/assets/js/utils.js"></script>
    <script src="${caturi}/assets/js/detail-project.js"></script>
    <script src="${caturi}/assets/js/login.js"></script>
    <script src="${caturi}/data/category.js"></script>
    <script src="${caturi}/js/citys.js"></script>
    <script src="${caturi}/js/jquery.i18n.properties-1.0.9.js"></script>
    <script src="${caturi}/js/i18n.js"></script>
    <script src="${caturi}/data/dictionary.js"></script>
    <script src="${caturi}/js/util.js"></script>

    <script src="${caturi}/assets/js/Ecalendar.jquery.min.js"></script>
    <script src="${caturi}/js/ajaxfileupload.js"></script>
    <script src="${caturi}/js/project-detail.js?3"></script>

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

<body class="js-project">
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
<!--//End filter_search -->
<#assign masterpage = "http://inheritor.efeiyi.com/m/"/>
<#assign workspage = "http://works.efeiyi.com/w/"/>
<#assign prouri="http://resource.efeiyi.com/image/project/" />
<#assign masteruri="http://resource.efeiyi.com/image/master/" />
<#assign str="http:" />
<#assign strs="https:" />
<div class="container data-item" data-id="${obj.id?c}">
    <div class="bd detail">
        <div class="mainbg">
            <div class="content" id="detailContent">
                <div class="mask_left"></div>
                <#assign backImgUrl="http://resource.efeiyi.com/image/uploads/head.png">
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 1>
                            <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                <#list cf.resourceList as res>
                                    <#if res.type==0 && res.status==0 && res.uri?? && res.uri != "">
                                        <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                            <img src="${prouri}${res.uri}" alt="" id="detailTopic" style="display:none" data-id="1" class="data-item">
                                        </#if>
                                        <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                            <img src="${res.uri}" alt="" id="detailTopic" style="display:none" data-id="1" class="data-item">
                                        </#if>
                                    </#if>
                                </#list>
                            </#if>
                        </#if>
                    </#list>
                </#if>
               <#-- 默认图-->
            <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 1>
                            <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                <#list cf.resourceList as res>
                                    <#if res.type==1 && res.status==0 && res.uri?? && res.uri != "">
                                        <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                            <video poster="${backImgUrl}" src="${prouri}${res.uri}"> </video>
                                        </#if>
                                        <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                            <video poster="${backImgUrl}" src="${res.uri}"> </video>
                                        </#if>
                                        <span data-type="1"  class="play_big"> </span>
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
                            <a href="" class="weixin active"></a>
                        </div>
                        <div class="qrcode">
                            <img width="108" style="display:block" src="${caturi}/ichProject/getImage?id=${obj.id?c}" alt="微信">
                        </div>
                    </div>
                </div>
                <!--//End -->
                <div class="main-info-button handle-button"></div>
                <div class="read-piece">
                <div class="detail_title">
                        <#if obj.lang == "chi">
                            <#assign cNid = 4/>
                        </#if>
                        <#if obj.lang == "eng">
                                <#assign cNid = 5/>
                        </#if>
                    <h2 data-id="${cNid}" class="data-item title"><#if (obj.contentFragmentList?size>0)>
                                <#list obj.contentFragmentList as cf>
                                    <#if obj.lang == "chi">
                                        <#if cf.attributeId == 4>
                                        ${cf.content}
                                        </#if>
                                    </#if>
                                    <#if obj.lang == "eng">
                                        <#if cf.attributeId == 5>
                                            ${cf.content}
                                        </#if>
                                    </#if>
                                </#list>
                         </#if>
                        <span class="primary edit link"><i class="icon"></i>编辑</span>
                    </h2><#--<a href="${caturi}/page/ichProForm.html?pid=${obj.id?c}" class="edit"><i class="icon"></i>编辑</a>-->
                    <#if (obj.contentFragmentList??) && (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 2>
                                <#if cf.content??>
                                        <div class="doi_code">
                                            <i class="icon">ID</i>
                                            <span>
                                            <em id="doi_code" data-id="2" class="data-item">
                                               ：${cf.content}
                                            </em></span>
                                            <em class="icon"></em>
                                            <div class="drop">
                                                <img src="" alt="">
                                            </div>
                                        </div>
                                </#if >
                            </#if>
                        </#list>
                    </#if>
                </div>
                <!--//End title-->

                <div class="bd subtxt">
                        <span >
                            <strong>
                                <#if obj.lang == "chi">
                                    类别：
                                </#if>
                                <#if obj.lang == "eng">
                                    Category：
                                </#if>
                            </strong>
                            <#if (obj.ichCategoryId??)>
                            <em id="category" category-id="${obj.ichCategoryId?c}" class="data-item"></em>
                            </#if>
                            <#if (!obj.ichCategoryId??)>
                                <em id="category" category-id="" class="data-item"></em>
                            </#if>

                        </span>
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 33 && cf.content?? && cf.content != "">
                            <span>
                                   <strong>
                                    <#if obj.lang == "chi">
                                        地区：
                                    </#if>
                                    <#if obj.lang == "eng">
                                        District：
                                    </#if>
                                </strong>
                                    <#assign codeList = cf.content?split(",")>
                                    <#list codeList as s>
                                        <em class="value dic data-item" dic-type="${cf.attribute.dataType}" lang="${obj.lang}" data-id="33" >${s}</em>
                                        <#if s_index+1 < (codeList?size)>
                                            <i>|</i>
                                        </#if>
                                    </#list>
                            </span>
                        </#if>
                    </#list>
                </#if>
                    <span class="language" id="trans_lang">
                            <a href="" id="trans"></a>
                    </span>
                </div>
                <!--//End-->

            <#if obj.ichMasterList?? && (obj.ichMasterList?size > 0)>
                <div class="bd inheritor">

                    <div class="tname">
                        <#if obj.lang == "chi">
                            代表性传承人
                        </#if>
                        <#if obj.lang == "eng">
                            Representativeness
                        </#if>
                    </div>
                    <div class="master">
                        <ul>
                        <li>
                            <#list obj.ichMasterList as master>
                                <#assign masterPic="http://resource.efeiyi.com/image/uploads/default_avatar2.png?x-oss-process=style/head-image-style">
                                <#if master.contentFragmentList??>
                                    <div class="item">
                                        <#list master.contentFragmentList as cf>
                                            <#if cf.attributeId == 113 && cf.targetType == 1>

                                                <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                                    <#list cf.resourceList as r>
                                                        <#if r?? &&(r.uri??)>
                                                            <#assign masterPic="${masteruri}${r.uri}?x-oss-process=style/head-image-style">
                                                        </#if>
                                                    </#list>
                                                </#if>
                                            <#---->
                                            </#if>

                                        </#list>
                                        <a href="${masterpage}${master.id?c }.html" class="avatar">
                                            <img src="${masterPic}" alt="" class="data-item" data-id="113"/>
                                        </a>

                                        <span class="txt">
                                            <#list master.contentFragmentList as cf>
                                                <#if obj.lang == "chi">
                                                    <#if cf.attributeId == 13 && cf.targetType == 1>
                                                        <p class="name"><a href="${masterpage}${master.id?c }.html" data-id="13" class="data-item">${cf.content}</a></p>
                                                    </#if>
                                                </#if>
                                                <#if obj.lang == "eng">
                                                    <#if cf.attributeId == 14 && cf.targetType == 1>
                                                        <p class="name"><a href="${masterpage}${master.id?c }.html" data-id="14" class="data-item">${cf.content}</a></p>
                                                    </#if>
                                                </#if>
                                                <#if cf.attributeId == 50 && cf.targetType == 1>
                                                    <p data-id="50" class="data-item">${cf.content}</p>
                                                </#if>

                                                <#if cf.attributeId == 111 && cf.targetType == 1>
                                                    <p class="value dic data-item" dic-type="${cf.attribute.dataType}" lang="${obj.lang}" data-id="111">${cf.content}</p>
                                                </#if>
                                            </#list>

                                                    </span>
                                    </div>

                                </#if>
                                <#if ((master_index+1) %12 == 0) && (obj.ichMasterList?size > master_index+1)>
                                </li><li>
                                </#if>
                            </#list>

                        </li>

                        </ul>
                        <div class="more">
                            <a href="javascript:;"><span>
                                <#if obj.lang == "chi">
                                    全部<em></em>人
                                </#if>
                                <#if obj.lang == "eng">
                                    All<em></em>persons
                                </#if>
                            </span><i class="gt_big"></i></a>
                        </div>
                        <div class="prev"></div>
                        <div class="next"></div>
                        <div class="page"></div>
                    </div>
                </div>
            </#if>
                <!--//ENd-->
                <div class="bd batch" id="mas">
                    <div class="tname">
                    <#if obj.lang == "chi">
                        非遗在中国
                        <i></i>
                    </#if>
                    <#if obj.lang == "eng">
                        The heritage in China
                        <i></i>
                    </#if>
                </div>
                    <div class="subcon" id="subcon">
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 106 && cf.content?? && cf.content != "">
                                <span>
                                     <#if obj.lang == "chi">
                                         人类非物质文化遗产编号：
                                     </#if>
                                    <#if obj.lang == "eng">
                                        Human intangible cultural heritage number：
                                    </#if>
                                  <em class="value dic data-item" dic-type="${cf.attribute.dataType}" lang="${obj.lang}" data-id="106">${cf.content}</em> </span>
                            </#if>
                        </#list>
                    </#if>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 41 &&  cf.content?? && cf.content != "">
                                <span>
                                     <#if obj.lang == "chi">
                                         级别
                                     </#if>
                                    <#if obj.lang == "eng">
                                        Rank
                                    </#if>
                                    ： <em style="font-size: 12px" class="value dic data-item" dic-type="${cf.attribute.dataType}" lang="${obj.lang}" data-id="41">${cf.content}</em> </span>
                            </#if>
                        </#list>
                    </#if>

                    </div>
                </div>
                </div>
                <!--//ENd-->
            </div>
            <!--//End 主内容-->

            <div class="card_base section" data-type="short-text">
                <duv class="detail_title handle-button">
                    <h2 class="title">
                        <#if obj.lang == "chi">
                            基础信息
                        </#if>
                        <#if obj.lang == "eng">
                            Basic information
                        </#if>
                    </h2>
                </duv>
                <div class="info read-piece" id="info">
                    <ul>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attribute?? && cf.attribute.dataType !=1 &&cf.attribute.dataType !=5 && cf.content?? && cf.content !="" && cf.attributeId != 106 && cf.attributeId != 2 && cf.attributeId != 41 && cf.attributeId != 33>
                                <li>
                                    <span class="key">
                                        <#if obj.lang == "chi">
                                            ${cf.attribute.cnName}
                                        </#if>
                                        <#if obj.lang == "eng">
                                             ${cf.attribute.enName}
                                        </#if>
                                        ：</span>
                                    <span class="value dic data-item" dic-type="${cf.attribute.dataType}" lang="${obj.lang}" data-id="${cf.attributeId}">${cf.content}</span>
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
    <#if obj.worksList?? && (obj.worksList?size>0)>
        <section class="bd floor odd">
            <div class="card">
                <header><h4>
                    <#if obj.lang == "chi">
                        代表作品
                    </#if>
                    <#if obj.lang == "eng">
                        Representative works
                    </#if>
                </h4><em>
                    <#if obj.lang == "chi">
                        共
                    </#if>
                    <#if obj.lang == "eng">
                        Total
                    </#if>
                         ${obj.worksList?size}
                    <#if obj.lang == "chi">
                        项
                    </#if>
                    <#if obj.lang == "eng">
                        item
                    </#if>
                   </em></header>
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
                                                    <a href="${workspage}${work.id?c}.html"><img src="${p.uri}?x-oss-process=style/head-image-style" alt="" class="data-item" data-id="114"></a>
                                                </#list>
                                            </#if>
                                        </#if>
                                    </#list>

                                    <#list work.contentFragmentList as c>
                                        <#if obj.lang == "chi">
                                            <#if c.attributeId==28>
                                            <p class="name data-item" data-id="28">${c.content} </p>
                                            </#if>
                                        </#if>
                                        <#if obj.lang == "eng">
                                            <#if c.attributeId==29>
                                                <p class="name data-item" data-id="29">${c.content} </p>
                                            </#if>
                                        </#if>

                                    </#list>
                                    <#list work.contentFragmentList as c>
                                        <#if c.attributeId==114>
                                            <#if c.resourceList??>
                                                <#list c.resourceList as p>
                                                    <p class="master data-item" data-id="114"><#if p.description??>${p.description}</#if></p>
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


    <#if (obj.contentFragmentList?size>0)>
        <#list obj.contentFragmentList as cf>
            <#if (cf.attribute.dataType == 5  && cf.resourceList?? && cf.resourceList?size>0)>
                <section  name="tuwen" class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>" data-type="image-text">
                    <div class="card" data-id="${cf.id?c}">
                        <header class="title handle-button"><h4>
                            <#if obj.lang == "chi">
                                 ${cf.attribute.cnName}
                            </#if>
                            <#if obj.lang == "eng">
                                 ${cf.attribute.enName}
                            </#if>
                        </h4></header>
                        <article class="text_img read-piece">
                            <#if cf.content?? && cf.content != "">
                            <div class="side" style="margin-right:30px;">
                                <div class="item">
                                    <p class="data-item" data-id="${cf.attributeId}">
                                       <#assign content =cf.content?replace("<", "&lt;")?replace(" ","&nbsp;")?replace("\n","<br>") />
                                         ${content}
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
                                                    <img src="${prouri}${r.uri}" alt="" class="data-item" data-id="${cf.attributeId}">
                                                </#if>
                                                <#if (r.uri?contains("${str}")) || (r.uri?contains("${strs}"))>
                                                    <img src="${r.uri}" alt="" class="data-item" data-id="${cf.attributeId}">
                                                </#if>

                                                <#if r.description??>
                                                    <#--<span class="data-item" data-id="${cf.attributeId}">${r.description}</span>-->
                                                </#if>
                                            </#if>

                                            <#if r.type ==1>
                                                <div class="card_video">
                                                    <div class="time">30:24</div>
                                                    <div class="play" data-type="1" data-id="1" ></div>
                                                    <#if !(r.uri?contains("${str}")) && !(r.uri?contains("${strs}"))>
                                                        <video poster="http://resource.efeiyi.com/image/uploads/exp2.png"  src="${prouri}${r.uri}" type="video/mp4" style="width: 100%;" class="data-item" data-id="${cf.attributeId}">
                                                        </video>
                                                    </#if>
                                                    <#if (r.uri?contains("${str}")) || (r.uri?contains("${strs}"))>
                                                        <video poster="http://resource.efeiyi.com/image/uploads/exp2.png"  src="${r.uri}" type="video/mp4" style="width: 100%;" class="data-item" data-id="${cf.attributeId}">
                                                        </video>
                                                    </#if>


                                                </div>
                                                <#if r.description??>
                                                    <#--<span class="data-item" data-id="${cf.attributeId}">${r.description}</span>-->
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
                                        <a class="albums arrow_right" data-id="${cf.id?c}" href="javascript:;">
                                            <#if obj.lang == "chi">
                                                查看完整图集
                                            </#if>
                                            <#if obj.lang == "eng">
                                                View the complete set of images
                                            </#if>
                                            </a>
                                    </div>
                                </#if>
                            </div>
                        </article>
                    </div>
                </section>

                <#assign odd_even = odd_even+1 />
            </#if>
            <#if ((cf.attribute.dataType == 5 || cf.attribute.dataType == 1) && (!cf.resourceList?? || cf.resourceList?size==0)) && cf.content?? && cf.content != "">

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>" data-type="image-text">
                    <div class="card" data-id="${cf.id?c}">
                        <header class="title handle-button"><h4>
                            <#if obj.lang == "chi">
                                ${cf.attribute.cnName}
                            </#if>
                            <#if obj.lang == "eng">
                                ${cf.attribute.enName}
                            </#if>
                        </h4></header>
                        <article class="plain_text read-piece">
                            <p class="data-item" data-id="${cf.attributeId?c}">
                                <#if cf.content??>
                                    <#assign content =cf.content?replace("<", "&lt;")?replace(" ","&nbsp;")?replace("\n","<br>") />
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

        <!--//ENd-->
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

        //控制header中英文显示
        <#if obj.version?? && (obj.version.mainVersionId??) && (obj.version.branchVersionId??)>
            <#if obj.lang == "eng">
                $("#trans").text("该词条中文版");
                $("#trans").attr('href',${obj.version.mainVersionId?c}+ ".html");
            </#if>
            <#if obj.lang == "chi">
                $("#trans").text("English version");
                $("#trans").attr('href',${obj.version.branchVersionId?c}+ ".html");
            </#if>
        </#if>
        <#if !obj.version?? || (!obj.version.mainVersionId??) || (!obj.version.branchVersionId??)>
                $("#trans_lang").hide();
        </#if>


        //去掉头部标记
        $(".header .content .nav li").eq(0).removeClass("active");
        //给logo加首页链接
        $('.logo').attr('href','${caturi}/page/index.html');

    });

</script>
<script>
    //详情页题图居中遮罩
    (function () {
        var $img = $('#detailTopic');
        var $content = $('#detailContent');
        var img = document.getElementById('detailTopic');

        img.onload = function () {
            // 加载完成
            var imgW = parseInt($img.width());
            $img.css({width:imgW+'px','margin-left':-parseInt(imgW/2)+'px'});
            $content.css({width:imgW+'px'});
            $img.fadeIn(800);
        };


        var imgW = parseInt($img.width());
        $img.css({width:imgW+'px','margin-left':-parseInt(imgW/2)+'px'});
        $content.css({width:imgW+'px'});
        $img.fadeIn(800);
    })();
</script>
</html>