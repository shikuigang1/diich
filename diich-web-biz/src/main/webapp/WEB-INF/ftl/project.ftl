<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>
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
    <!-- Set render engine for 360 browser -->
    <meta name="renderer" content="webkit">
    <meta name="keywords" content="">
    <meta name="description" content="">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta property="wb:webmaster" content="cb5cc5c20f10165d">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- 禁止浏览器使用缓存 -->
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
    <meta http-equiv="expires" content="0">

    <!--STYLES-->
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/inputs.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="swiper/css/swiper.min.css">
    <link rel="stylesheet" type="text/css" href="css/swiper.css">


    <link rel="stylesheet" type="text/css" href="css/webuploader.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
    <!--SCRIPT-->
    <script type="text/javascript" src="js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="swiper/js/swiper.min.js"></script>
    <script type="text/javascript" src="js/dialog.js"></script>
    <script type="text/javascript" src="js/system.js"></script>
    <script type="text/javascript" src="js/autosize.min.js"></script>
    <script src="http://123.57.174.187/data/dictionary.js"></script>
    <script src="http://123.57.174.187/js/util.js"></script>
    <script src="http://123.57.174.187/data/category.js"></script>
</head>
<#assign masterpage = "http://inheritor.diich.com/m/"/>
<#assign workspage = "http://works.diich.com/w/"/>
<#assign prouri="http://resource.efeiyi.com/image/project/" />
<#assign masteruri="http://resource.efeiyi.com/image/master/" />
<#assign worksuri="http://resource.efeiyi.com/image/works/" />
<#assign str="http:" />
<#assign strs="https:" />
<body>
<div class="warpAll">
<#--上导航-->
<div class="header fixed" id="home-header"></div>

<#--content-->
<div id="content" class="mu_content muAll">

    <div class="details_content">
        <!--banner-->
        <div class="details_body" style="overflow: hidden;">
            <!--模糊背景图-->
            <p>
            <#assign backImgUrl="http://resource.efeiyi.com/image/uploads/head.png">
            <#if (obj.contentFragmentList?size>0)>
                <#list obj.contentFragmentList as cf>
                    <#if cf.attributeId == 1>
                        <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                            <#list cf.resourceList as res>
                                <#if res.type==0 && res.status==0 && res.uri?? && res.uri != "">
                                    <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                        <#assign backImgUrl="${prouri}${res.uri}">
                                    </#if>
                                    <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                        <#assign backImgUrl="${res.uri}">
                                    </#if>
                                </#if>
                            </#list>
                        </#if>
                    </#if>
                </#list>
            </#if>
            <img src="${backImgUrl}" data-id="1" class="data-item">
            <#--<img src="{{efeiyiCover projectInfo.cover 1 'banner_background'}}"/>-->
                <a href="javascript:;"></a>
            </p>
            <!--头图-->
            <div class="details_head">
                <div class="details_vim">
                <#assign backImgUrl="http://resource.efeiyi.com/image/uploads/head.png">
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 1>
                            <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                <#list cf.resourceList as res>
                                    <#if res.type==0 && res.status==0 && res.uri?? && res.uri != "">
                                        <#if !(res.uri?contains("${str}")) && !(res.uri?contains("${strs}"))>
                                            <#assign backImgUrl="${prouri}${res.uri}">
                                        </#if>
                                        <#if (res.uri?contains("${str}")) || (res.uri?contains("${strs}"))>
                                            <#assign backImgUrl="${res.uri}">
                                        </#if>
                                    </#if>
                                </#list>
                            </#if>
                        </#if>
                    </#list>
                </#if>
                    <img src="${backImgUrl}" data-id="1" class="data-item">
                </div>
                <div class="details_hp">
                    <h2 id="project_h2">
                    <#if (obj.contentFragmentList?size>0)>
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
                    </h2>
                    <p class="class_name">
                        <span>类别：</span>
                        <span>
                            <#if (obj.ichCategoryId??)>
                                <em id="category" category-id="${obj.ichCategoryId?c}" class="data-item"></em>
                            </#if>
                            <#if (!obj.ichCategoryId??)>
                                <em id="category" category-id="" class="data-item"></em>
                            </#if>
                        </span>
                    </p>
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 33 && cf.content?? && cf.content != "">
                            <p id="project_area" class="class_area">
                                <span>
                                    <#if obj.lang == "chi">
                                        地区：
                                    </#if>
                                    <#if obj.lang == "eng">
                                        District：
                                    </#if>
                                </span>
                                <#assign codeList = cf.content?split(",")>
                                <#list codeList as district>
                                    <span class="value dic data-item" dic-type="${cf.attribute.dataType}" lang="${obj.lang}" data-id="33" >${district}</span>
                                </#list>
                            </p>
                        </#if>
                    </#list>
                </#if>
                    <h3>
                        <span>
                        <#if obj.lang == "chi">
                            非遗在中国
                        </#if>
                        <#if obj.lang == "eng">
                            The heritage in China
                        </#if>
                        </span><b></b>
                    </h3>
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 106 && cf.content?? && cf.content != "">
                            <p class="bian">
                                <span>
                                    <#if obj.lang == "chi">
                                        人类非物质文化遗产编号：
                                    </#if>
                                    <#if obj.lang == "eng">
                                        Human intangible cultural heritage number：
                                    </#if>
                                </span>
                                <span class="dic data-item" dic-type="${cf.attribute.dataType}" lang="${obj.lang}" data-id="106">${cf.content}</span>
                            </p>
                        </#if>
                    </#list>
                </#if>
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 41 &&  cf.content?? && cf.content != "">
                            <p class="jibie">
                                <span>
                                    <#if obj.lang == "chi">
                                        认证级别:
                                    </#if>
                                    <#if obj.lang == "eng">
                                        Rank:
                                    </#if>
                                </span>
                                <span class="dic data-item" dic-type="${cf.attribute.dataType}" lang="${obj.lang}" data-id="41">${cf.content}</span>
                            </p>
                        </#if>
                    </#list>
                </#if>
                </div>
            <#if (obj.contentFragmentList??) && (obj.contentFragmentList?size>0)>
                <#list obj.contentFragmentList as cf>
                    <#if cf.attributeId == 2>
                        <#if cf.content??>
                            <div class="idma">
                                <p>
                                    <b></b>
                                    <strong>
                                        <span>ID：</span>
                                        <span data-id="2" class="data-item">${cf.content}</span>
                                    </strong>
                                    <em></em>
                                </p>
                            </div>
                        </#if >
                    </#if>
                </#list>
            </#if>
                <!--<p class="give">-->
                <!--<b></b>-->
                <!--<span>点赞( <i>233</i> )</span>-->
                <!--<em></em>-->
                <!--<span>分享( <i>47</i> )</span>-->
                <!--</p>-->

            </div>
        </div>


        <!--基础信息-->
        <div class="details_inifor oDiv">
            <div class="inifor">
                <div class="ini_map">
                    <h2 class="inif_h2">
                    <#if obj.lang == "chi">
                        基础信息
                    </#if>
                    <#if obj.lang == "eng">
                        Basic information
                    </#if>
                    </h2>
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.attribute?? && cf.attribute.dataType !=1 &&cf.attribute.dataType !=5 && cf.content?? && cf.content !="" && cf.attributeId != 106 && cf.attributeId != 2 && cf.attributeId != 41 && cf.attributeId != 33>
                            <p>
                                <label>
                                    <#if obj.lang == "chi">
                                    ${cf.attribute.cnName}：
                                    </#if>
                                    <#if obj.lang == "eng">
                                    ${cf.attribute.enName}：
                                    </#if>
                                </label>
                                <span class="dic data-item" dic-type="${cf.attribute.dataType}" lang="${obj.lang}" data-id="${cf.attributeId}">
                                ${cf.content}
                                                    </span>
                            </p>
                        </#if>
                    </#list>
                </#if>
                <#if obj.ichMasterList?? && (obj.ichMasterList?size > 0)>
                    <h2>
                        <#if obj.lang == "chi">
                            代表性传承人
                        </#if>
                        <#if obj.lang == "eng">
                            Representativeness
                        </#if>
                    </h2>
                    <div id="herfor">

                        <div class="swiper-container-enterprise">
                            <div class="swiper-wrapper" style="height:auto;">
                                <#list  obj.ichMasterList as master>
                                    <#assign  masterPic="http://resource.efeiyi.com/image/uploads/default_avatar2.png?x-oss-process=style/head-image-style" />
                                    <#if (master.contentFragmentList??) && (master.contentFragmentList?size >0)>
                                        <div class="swiper-slide swiper-no-swiping" style="height:auto;">
                                            <#list master.contentFragmentList as cf>
                                                <#if cf.attributeId == 113 && cf.targetType == 1>

                                                    <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                                        <#list cf.resourceList as r>
                                                            <#if r?? &&(r.uri??)>
                                                                <#assign masterPic="${masteruri}${r.uri}?x-oss-process=style/head-image-style">
                                                            </#if>
                                                        </#list>
                                                    </#if>
                                                </#if>
                                            </#list>
                                            <a href="${masterpage}${master.id?c }.html">
                                                                    <span>
                                                                        <img src="${masterPic}" data-id="113"/>
                                                                    </span>
                                                <p>
                                                    <#list master.contentFragmentList as cf>
                                                        <#if obj.lang == "chi">
                                                            <#if cf.attributeId == 13 && cf.targetType == 1>
                                                                <span>${cf.content}</span>
                                                            </#if>
                                                        </#if>
                                                        <#if obj.lang == "eng">
                                                            <#if cf.attributeId == 14 && cf.targetType == 1>
                                                                <span>${cf.content}</span>
                                                            </#if>
                                                        </#if>
                                                        <#if cf.attributeId == 50 && cf.targetType == 1>
                                                            <strong>${cf.content}</strong>
                                                        </#if>

                                                        <#if cf.attributeId == 48 && cf.targetType == 1>
                                                            <strong>${cf.content}</strong>
                                                        </#if>
                                                    </#list>
                                                </p>
                                            </a>
                                        </div>
                                    </#if>
                                </#list>
                            </div>
                            <!--按钮-->
                            <div class="swiper-button-prev swiper-button-black"
                                 style="margin-top: -35px; left: -65px;z-index: 0;"></div>
                            <div class="swiper-button-next swiper-button-black"
                                 style="margin-top: -35px; right: -65px;z-index: 0;"></div>
                        </div>
                        <!--<a href="javascript:;">-->
                        <!--<b></b>-->
                        <!--<em>查看全部<i></i>人</em>-->
                        <!--</a>-->
                    </div>
                </#if>
                </div>
            </div>
        <#--{{#if projectInfo.organizes}}-->
        <#--<div class="enter">-->
        <#--<div>-->
        <#--<h2>认证企业</h2>-->
        <#--<div class="enter_content">-->
        <#--<div class="swiper-container-organ">-->
        <#--<div class="swiper-wrapper">-->
        <#--{{#each projectInfo.organizes}}-->
        <#--<div class="swiper-slide swiper-no-swiping">-->
        <#--<div>-->
        <#--<a href="/organize/details?organizeId={{userId}}">-->
        <#--<img src="{{efeiyiCover cover 4 'organ'}}"/>-->
        <#--</a>-->
        <#--<h3>{{zh_name}}</h3>-->
        <#--<p>-->
        <#--<span>所属项目：</span>-->
        <#--<span class="suoproject"></span>-->
        <#--</p>-->
        <#--<p>-->
        <#--<span>所在城市：</span>-->
        <#--<span class="soucheng"></span>-->
        <#--</p>-->
        <#--</div>-->
        <#--</div>-->
        <#--{{/each }}-->
        <#--</div>-->
        <#--<!--按钮&ndash;&gt;-->
        <#--<div class="swiper-button-prev swiper-button-black"-->
        <#--style="margin-top: -35px; left: -65px;z-index: 0;"></div>-->
        <#--<div class="swiper-button-next swiper-button-black"-->
        <#--style="margin-top: -35px; right: -65px;z-index: 0;"></div>-->
        <#--</div>-->
        <#--<script type="text/javascript">-->
        <#--(function () {-->
        <#--var mySwiper = new Swiper('.swiper-container-organ', {-->
        <#--//默认是左右的普通效果-->
        <#--cube: {-->
        <#--slideShadows: true,-->
        <#--shadow: true,-->
        <#--shadowOffset: 100,-->
        <#--shadowScale: 0.6-->
        <#--},-->
        <#--prevButton: '.swiper-button-prev',-->
        <#--nextButton: '.swiper-button-next',-->
        <#--slidesPerView: 3,-->
        <#--slidesPerGroup: 1,-->
        <#--spaceBetween: 10,-->
        <#--//持续时间-->
        <#--speed: 500-->
        <#--})-->
        <#--})()-->
        <#--</script>-->
        <#--</div>-->
        <#--</div>-->
        <#--</div>-->
        <#--{{/if }}-->
    </div>
        <!--代表性作品-->
        <#if obj.worksList?? && (obj.worksList?size>0)>
        <div class="details_works oDiv">
            <div>
                <h2 class="inif_h2">
                    <#if obj.lang == "chi">
                        代表作品
                    </#if>
                    <#if obj.lang == "eng">
                        Representative works
                    </#if>
                </h2>
                <style type="text/css">
                    .swiper-pagination-bullet {
                        color: #000000;
                        background: none;
                        border-radius: 0;
                        padding-bottom: 20px;
                        width: 16px;
                    }

                    .swiper-container-horizontal > .swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
                        top: 372px;
                    }

                    .swiper-pagination-bullet-active {
                        /*background: #007aff;*/
                        border-bottom: 2px solid #007aff;
                    }

                </style>
                <div class="swiper-container-works">
                    <div class="swiper-wrapper">
                        <#list obj.worksList as work>
                            <#if (work.contentFragmentList??) && (work.contentFragmentList?size >0 )>
                                <div class="swiper-slide swiper-no-swiping">
                                    <a href="JavaScript:;">
                                        <#list work.contentFragmentList as c>
                                            <#if c.attributeId==114>
                                                <#if c.resourceList??>
                                                    <#list c.resourceList as p>
                                                        <div>
                                                            <img src="${p.uri}?x-oss-process=style/head-image-style" alt="" class="data-item" data-id="114"/>
                                                        </div>
                                                    </#list>
                                                </#if>
                                            </#if>
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
                                        <!--<p>-->
                                        <!--<b><img src="/images/111.png"/></b>-->
                                        <!--<span>廖明  建盏品名杯</span>-->
                                        <!--</p>-->
                                    </a>

                                </div>
                            </#if>
                        </#list>
                    </div>
                    <!--分页-->
                    <div id="num_siper" class="swiper-pagination" style="width: auto;left:50%;"></div>
                </div>
            </div>
        </div>
    </#if>
        <!--有图片  视频-->
<#if (obj.contentFragmentList?size>0)>
    <#list obj.contentFragmentList as cf>
        <#if cf.attribute?? && ((cf.attribute.dataType == 5 || cf.attribute.dataType == 1) && (!cf.resourceList?? || cf.resourceList?size==0)) && cf.content?? && cf.content != "">
            <!--无图片 视频-->
            <div class="details_lineage oDiv">
                <div>
                    <h2 class="inif_h2">
                        <#if obj.lang == "chi">
                        ${cf.attribute.cnName}
                        </#if>
                        <#if obj.lang == "eng">
                        ${cf.attribute.enName}
                        </#if>
                    </h2>
                    <p class="add_content">${cf.content?replace("\n","<br/>")?replace("<p>","<br/>")?replace("</p>","")}</p>
                </div>
            </div>
        </#if>
        <#if cf.attribute?? && (cf.attribute.dataType == 5  && cf.resourceList?? && cf.resourceList?size>0)>
            <div class="details_History oDiv">
                <div>
                    <h2 class="inif_h2" data-id="${cf.attributeId?c}">
                    <#if obj.lang == "chi">
                    ${cf.attribute.cnName}
                    </#if>
                    <#if obj.lang == "eng">
                    ${cf.attribute.enName}
                    </#if></h2>
                    <div>
                        <div>
                            <p class="add_content" data-id="${cf.attributeId?c}">
                                <#if cf.content??>
                                    <#assign content =cf.content?replace("\n","<br/>")?replace("<p>","<br/>")?replace("</p>","")/>
                                    ${content}
                                </#if>
                            </p>
                        </div>
                        <div>
                            <ul>
                                <#list cf.resourceList as r>

                                        <#if r.type ==0>
                                            <#if !(r.uri?contains("${str}")) && !(r.uri?contains("${strs}"))>
                                                <div class="swiper-slide swiper-no-swiping">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <img src="${prouri}${r.uri}" resource-id="${r.id?c}"/>
                                                        </a>
                                                        <#if r.description?? && r.description!="">
                                                            <p>${r.description}</p>
                                                        </#if>
                                                    </li>
                                                </div>
                                            </#if>
                                            <#if (r.uri?contains("${str}")) || (r.uri?contains("${strs}"))>
                                                <div class="swiper-slide swiper-no-swiping">
                                                    <li>
                                                        <a href="javascript:;">
                                                            <img src="${r.uri}" resource-id="${r.id?c}"/>
                                                        </a>
                                                        <#if r.description?? && r.description!="">
                                                            <p>${r.description}</p>
                                                        </#if>
                                                    </li>
                                                </div>
                                            </#if>
                                        </#if>

                                        <#if r.type ==1>
                                                <#if !(r.uri?contains("${str}")) && !(r.uri?contains("${strs}"))>
                                                    <div class="swiper-slide swiper-no-swiping">
                                                        <li>
                                                            <a href="javascript:;">
                                                                <video src="${prouri}${r.uri}"></video>
                                                            </a>
                                                            <s class="diss"><s></s></s>
                                                            <#if r.description?? && r.description!="">
                                                                <p>${r.description}</p>
                                                            </#if>
                                                        </li>
                                                    </div>
                                                </#if>
                                                <#if (r.uri?contains("${str}")) || (r.uri?contains("${strs}"))>
                                                    <div class="swiper-slide swiper-no-swiping">
                                                        <li>
                                                            <a href="javascript:;">
                                                                <video src="${r.uri}"></video>
                                                            </a>
                                                            <s class="diss"><s></s></s>
                                                            <#if r.description?? && r.description!="">
                                                                <p>${r.description}</p>
                                                            </#if>
                                                        </li>
                                                    </div>
                                                </#if>
                                        </#if>

                                </#list>
                                <strong class="atlas_img">查看完整图集<b></b></strong>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </#if>
    </#list>
</#if>

    </div>
    <!--滚动定位-->
    <div class="loutiNav" id="loutiNav">
        <p><b></b></p>
        <ul id="uli">

        </ul>
        <p><b></b></p>
    </div>

    <!--视频播放-->
    <!--<div class="disp">-->
    <!--<video controls src=""></video>-->
    <!--</div>-->

    <!--图集展示-->
    <div class="atlas">
        <div class="center">
            <div class="atlas_max">
                <div class="atlas_max_img">

                </div>
                <span class="remove_Gupimg"></span>
            </div>
            <div class="posi">
                <div class="swiper-atlas">
                    <div class="swiper-wrapper" id="swiper_atlas">
                        <!--<div class="swiper-slide swiper-no-swiping">-->

                        <!--</div>-->
                    </div>
                    <!--按钮-->
                    <div class="swiper-button-prev swiper-button-black" style="left: -76px; top: auto; bottom: 54px;"></div>
                    <div class="swiper-button-next swiper-button-black"
                         style="right: -76px; top: auto; bottom: 54px;"></div>
                </div>
            </div>
        </div>
    </div>

</div>

<#--下导航-->

    <style>
        .rbox>div:nth-child(1)>a:hover {
            text-decoration: underline;
        }

        .share>span:nth-child(1)>i:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    </style>
    <div class="bd footer"></div>


</div>
</body>
<script>
    <#--分类-->
    var _catId = $("#category").attr("category-id");
    var text = getCategoryTextById(_catId);
    $("#category").text(text);

    // 字典数据
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
</script>
<script type="text/javascript" src="js/project.js"></script>