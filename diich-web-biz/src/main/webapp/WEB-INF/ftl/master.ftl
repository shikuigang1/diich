<!DOCTYPE html>
<html lang="en">

<head>
<#assign caturi="http://diich.efeiyi.com" />
    <meta charset="UTF-8">
    <title>
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
    <script src="${caturi}/data/keyword.js"></script>
    <script src="${caturi}/js/category.js"></script>
    <script src="${caturi}/js/citys.js"></script>
    <script src="${caturi}/js/doT.js"></script>
    <script src="${caturi}/js/serverinfo.js"></script>
    <script src="${caturi}/js/masters.js"></script>
    <script src="${caturi}/data/master_data.js"></script>
    <script src="${caturi}/assets/js/inputs.js"></script>
    <script src="${caturi}/js/jquery.i18n.properties-1.0.9.js"></script>
    <script src="${caturi}/js/i18n.js"></script>
    <script src="${caturi}/data/dictionary.js"></script>
    <script src="${caturi}/js/util.js"></script>
    <script>
        $(function () {
            var btn=$('a[data-type="mediaLayer"]').on('click',function () {
                var type = $(this).attr('data-type');
                var index = parseInt($(this).attr('data-id'));
                detailCommon.mediaShow(type, index);
            })
        })
    </script>
</head>

<body>
<div class="header header_detail"></div>
<!--//End header -->
<div class="filter_search filter_search_fixed">
    <div class="content">
        <form class="form" action="${caturi}/page/search.html">
            <input class="ipt" type="text" id="keyword" name="keyword" value="" autocomplete="off">
            <input type="hidden" id="area_code" name="area_code" value="" />
            <input type="hidden" id="gb_category_code" name="gb_category_code" value="" />
            <input type="hidden" id="type" name="type" value="" />
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

<#assign propage = "http://resource.efeiyi.com/html/project/"/>
<#assign workspage = "http://resource.efeiyi.com/html/works/"/>
<#assign prouri="../../image/project/" />
<#assign masteruri="../../image/master/" />
<div class="container">
    <div class="bd detail">
        <div class="mainbg">

       <#assign backImgUrl="http://resource.efeiyi.com/image/uploads/head.png">
        <#if (obj.contentFragmentList?size>0)>
            <#list obj.contentFragmentList as cf>
                <#if cf.attributeId == 10>
                    <#if (cf.resourceList?size>0)>
                        <#list cf.resourceList as res>
                            <#if res.type==0 && res.status==0>
                                <#if res.uri??>
                                <#assign backImgUrl="${masteruri}${res.uri}">
                                </#if>
                            </#if>
                        </#list>
                    </#if>
                </#if>
            </#list>
        </#if>
           <img src="${backImgUrl}" alt="">
       <#if (obj.contentFragmentList?size>0)>
           <#list obj.contentFragmentList as cf>
               <#if cf.attributeId == 10>
                   <#if (cf.resourceList?size>0)>
                       <#list cf.resourceList as res>
                           <#if res.type==1 && res.status==0>
                               <video poster="${backImgUrl}" src="${masteruri}${res.uri}"> </video>
                               <span data-type="1" class="play_big"> </span>
                           </#if>
                       </#list>
                   </#if>
               </#if>
           </#list>
       </#if>
        </div>
        <!--//End main-->

        <!--//End crumbs-->

        <div class="card">
            <div class="card_main">
                <div class="floor">
                    <a class="share" title="分享"></a>
                    <a class="praise active" title="点赞" style="position: relative;"></a>
                <#assign numPic = 0>
                <#assign numVed = 0>
                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                            <#list cf.resourceList as res>
                                <#if res.type==0>
                                    <#assign numPic = numPic+1>
                                </#if>
                                <#if res.type==1>
                                    <#assign numVed = numVed +1>
                                </#if>
                            </#list>
                        </#if>
                    </#list>
                </#if>
                    <#if (numPic >0) && (numVed >0)>
                    <a class="album albums" onclick="show()" data-type="mediaLayer" datatype="0" data-id="1"><i class="icon_img"></i>
                            ${numPic}张图片/${numVed}个视频
                      </a>
                    </#if>
                    <#if (numPic >0) && (numVed =0)>
                    <a class="album albums" onclick="show()"  data-type="mediaLayer" datatype="0" data-id="1"><i class="icon_img"></i>
                            ${numPic}张图片
                      </a>
                    </#if>
                    <#if (numPic =0) && (numVed >0)>
                        <a class="album albums" onclick="show()" data-type="mediaLayer" datatype="1" data-id="1"><i class="icon_img"></i>
                            ${numVed}个视频
                        </a>
                    </#if>
                    <div class="share_box">
                        <div class="icons">
                            <a href="" class="sina"></a>
                            <!--<a href="" class="facebook"></a>-->
                            <!--<a href="" class="twitter"></a>-->
                            <a href="" class="weixin active"></a>
                        </div>
                        <div class="qrcode">
                            <img width="108" src="${caturi}/ichMaster/getImage?id=${obj.id?c}&type=sina" alt="新浪">
                            <img width="108" src="${caturi}/ichMaster/getImage?id=${obj.id?c}&type=weixin" alt="微信">
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
                        <span id="doi_code">标识码：<#if (obj.contentFragmentList?size>0)>
                                        <#list obj.contentFragmentList as cf>
                                            <#if cf.attributeId == 11>
                                                ${cf.content}
                                            </#if>
                                        </#list>
                        </#if></span>
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
                                        <#assign codeList = cf.content?split(";")>
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
                            <p><#if (obj.ichProject.ichCategory.name)??>
                                类别： ${obj.ichProject.ichCategory.name}
                                <#if ((obj.ichProject.ichCategory.children)?? && obj.ichProject.ichCategory.children?size>0)>
                                    <#list obj.ichProject.ichCategory.children as ch>
                                        - ${ch.name}
                                        <#if (ch.children)?? && (ch.children?size>0)>
                                            <#list ch.children as chh>
                                                - ${chh.name}
                                            </#list>
                                        </#if>
                                    </#list>
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
            <#if (cf.attribute.dataType == 5) && (cf.resourceList??) && (cf.resourceList?size>0)>

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                    <div class="card">
                        <header><h4>${cf.attribute.cnName} </h4></header>
                        <article class="text_img">
                            <div class="side">
                                <div class="item">
                                    <p>
                                        <#if cf.content??>
                                        <#assign content =cf.content?replace("。\n", "。</p><p>") />
                                    <#--  <#assign content =content?replace("\n", "?</p><p>") />-->
                                        <#assign content =content?replace("\n 1、", "</p><p>1、") />
                                        <#assign content =content?replace("\n 2、", "</p><p>2、") />
                                        <#assign content =content?replace("\n 3、", "</p><p>3、") />
                                        <#assign content =content?replace("\n 4、", "</p><p>4、") />
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
                                                <img src="${masteruri}${r.uri}" alt="">

                                                <#if r.description??>
                                                    <span>${r.description}</span>
                                                </#if>

                                            </#if>

                                            <#if r.type ==1>
                                                <div class="card_video">
                                                    <div class="time">30:24</div>
                                                    <div class="play"></div>
                                                    <video poster="http://resource.efeiyi.com/image/uploads/exp2.png">
                                                        <source style="width: 100%;" src="${masteruri}${r.uri}" type="video/mp4">
                                                    </video>
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
                                        <a class="albums" data-type="mediaLayer" datatype="0" data-id="1" href="javascript:;">查看完整图集<i class="arrow_right"></i></a>
                                    </div>
                                </#if>
                            </div>
                        </article>
                    </div>
                </section>

                <#assign odd_even = odd_even+1 />
            </#if>

            <#if ((cf.attribute.dataType == 5 || cf.attribute.dataType == 1) && (!cf.resourceList?? || cf.resourceList?size==0))>

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                    <div class="card">
                        <header><h4>${cf.attribute.cnName}  </h4></header>
                        <article class="plain_text">
                            <p>
                                <#if cf.content??>
                                    <#-- <#assign content =cf.content?replace("。\n", "。</p><p>") />-->
                                    <#assign content =cf.content />
                                    <#assign content =content?replace("1、", "</p><p>1、") />
                                     <#assign content =content?replace("2、", "</p><p>2、") />
                                     <#assign content =content?replace("3、", "</p><p>3、") />
                                     <#assign content =content?replace("4、", "</p><p>4、") />
                                     <#assign content =content?replace("5、", "</p><p>5、") />
                                     <#assign content =content?replace("6、", "</p><p>6、") />
                                     <#assign content =content?replace("7、", "</p><p>7、") />
                                     <#assign content =content?replace("8、", "</p><p>8、") />
                                    <#assign content =content?replace("9、", "</p><p>9、") />


                                      <#assign content =content?replace("（1）、", "</p><p>（1）、") />
                                     <#assign content =content?replace("（2）、", "</p><p>（2）、") />
                                      <#assign content =content?replace("（3）、", "</p><p>（3）、") />
                                     <#assign content =content?replace("（4）、", "</p><p>（4）、") />
                                      <#assign content =content?replace("（5）、", "</p><p>（5）、") />
                                     <#assign content =content?replace("（6）、", "</p><p>（6）、") />

                                     <#assign content =content?replace("（1）", "</p><p>（1）") />
                                     <#assign content =content?replace("（2）", "</p><p>（2）") />
                                     <#assign content =content?replace("（3）", "</p><p>（3）") />
                                     <#assign content =content?replace("（4）", "</p><p>（4）") />
                                     <#assign content =content?replace("（5）", "</p><p>（5）") />
                                     <#assign content =content?replace("（6）", "</p><p>（6）") />

                                     <#assign content =content?replace("（一）", "</p><p>（一）") />
                                     <#assign content =content?replace("（二）", "</p><p>（二）") />
                                      <#assign content =content?replace("（三）", "</p><p>（三）") />
                                       <#assign content =content?replace("（四）", "</p><p>（四）") />
                                    <#assign content =content?replace("（五）", "</p><p>（五）") />
                                     <#assign content =content?replace("（六）", "</p><p>（六）") />
                                     <#assign content =content?replace("（七）", "</p><p>（七）") />
                                     <#assign content =content?replace("（八）", "</p><p>（八）") />
                                     <#assign content =content?replace("（九）", "</p><p>（九）") />

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
    <#include "masterFloat.ftl">
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
        //初始化
        detaiInheritorlPage.init();

        var mainCategory = $('#mainCategory');

        //初始化分类数据
        $.each(category_all, function(index, content) {
            mainCategory.append("<li data-id=\"" + content.gbCategory + "\" >" + content.name + "</li>");
        });

        mainCategory.find('li').on('click', function() {
            $("#attr_text").text($(this).html());
            $("#gb_category_code").val($(this).attr("data-id"));
            $("#item_1").hide();

            //searchData_();
        });



        var searchPage = {
            init: function() {
                //$('.header_detail .content .info li.search').hide();
                $('.header_detail .content .info li.login').addClass('line');
                this.filterBar();
                this.search();
            },
            filterBar: function() {
                var obj = $('.filter_bar');
                var linkTab = obj.find('a');
                var iconTab = obj.find('.icon_tab');
                var proColumn = $('.pro_column3'); //搜索列表

                //筛选
                linkTab.on('click', function() {
                    $(this).addClass('active').siblings('a').removeClass('active');

                    //刷新搜索结果页

                    if ($(this).index() == 0) {
                        $("#type").val("");
                    }
                    if ($(this).index() == 1) {
                        $("#type").val("0");
                    }
                    if ($(this).index() == 2) {
                        $("#type").val("1");
                    }
                    if ($(this).index() == 3) {
                        $("#type").val("2");
                    }

                    searchData_();

                    return false;
                });

                //切换图标
                iconTab.on('click', function() {
                    if ($(this).hasClass('active')) { //九宫格
                        $(this).removeClass('active');
                        proColumn.removeClass('active');
                    } else { //横排
                        $(this).addClass('active');
                        proColumn.addClass('active');
                    }
                });
            },
            search: function() {
                var filter = $('.filter_search'); //下拉搜索
                var filterFixed = $('.filter_search_fixed');
                var ipt = filter.find('.ipt');
                var iptVal = ipt.val();
                var filterAll = filter.find('.attr span'); //筛选项
                var filterItem = filter.find('.item'); //筛选下来框
                var suggest = filter.find('.suggest');
                var body = $('body');
                //获取焦点
                ipt.focus(function() {
                    $(this).val('');
                    body.append('<div class="overbg" style="z-index:1;"></div>');
                });

                //失去焦点如果为空则显示原始值
                ipt.blur(function() {
                    var _val = $(this).val();
                    if (_val == '') {
                        $(this).val(iptVal);
                    }
                    $('.overbg').remove();
                });

                //2.点击筛选
                filterAll.on('click', function() {
                    var _this = $(this);
                    var _index = _this.index();
                    filterItem.eq(_index)
                            .css('left', parseInt(_this.position().left) + 'px')
                            .show()
                            .siblings('.item')
                            .hide();
                });

                filterItem.each(function() {
                    var _this = $(this);
                    var level = $(this).find('.level');
                    var level2 = $(this).find('.level2');
                    var _li = level.find('li'); //分类

                    _li.hover(function() {
                        $(this).addClass('active').siblings('li').removeClass('active');

                        $("#catecontent").empty();
                        $("#citycontent").empty();

                        if (typeof(category_all[$(this).index()].children) != "undefined") {
                            $.each(category_all[$(this).index()].children, function(index, content) {
                                $("#catecontent").append("<li data-id=\"" + content.gbCategory + "\" >" + content.name + "</li>");
                            });

                            //点击二级分类
                            $("#catecontent").find('li').on('click', function() {
                                filterAll.eq(0).text($(this).html());
                                _this.hide();
                                $("#gb_category_code").val($(this).attr("data-id"));
                                //searchData_();
                            });
                        }

                        if (typeof(dic_arr) != "undefined") {
                            $.each(dic_arr, function(index, content) {
                                $("#citycontent").append("<li data-id=\"" + content.code + "\"  >" + content.name + "</li>");
                            });

                            //国家级
                            $("#country").find('li').on('click', function() {
                                filterAll.eq(1).text($(this).html());
                                _this.hide();
                                $("#area_code").val("");
                                // searchData_();
                            });

                            //一级城市
                            $("#citycontent").find('li').on('click', function() {
                                filterAll.eq(1).text($(this).html());
                                _this.hide();
                                $("#area_code").val($(this).attr("data-id"));
                                //searchData_();
                            });
                        }
                        level2.show();
                    });
                });


                //点击一级类别

                //3.阻止点击自身关闭
                filter.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                });

                //4.点击自身之外的地方关闭下拉框
                $(document).on("click", function() {
                    filterItem.hide();
                    filterFixed.slideUp('fast');
                });
                //自动提示
                body.find('.overbg').on('click', function() {
                    filterItem.hide();
                    filterFixed.slideUp('fast');
                    suggest.hide();
                    $(this).remove();
                    body.css('overflow', '');
                });

            },
        };
        searchPage.init();
        doi_code();

        $(".header .content .nav li").eq(0).removeClass("active");
        //给logo加首页链接
        $('.logo').attr('href','http://diich.efeiyi.com/page/index.html');
    });
    function submit(){

        $(".form").ajaxSubmit();
    }
</script>
<script>
    $(function(){

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
    });

    //当doi编码不存在时隐藏div
    function doi_code(){

        var doi_code = $("#doi_code").text().trim(" ");
        if(doi_code == null || doi_code == ""){
            $(".doi_code").hide();
        }
    }
</script>
<script>
    //非遗在中国如果没有内容  就隐藏这个div
    $(function(){
        if($("#subcon").find("span").length==0){
            $("#mas").css("display","none");
        }

    })
</script>
<script	src="http://diich-resource.oss-cn-beijing.aliyuncs.com/html/project/assets/js/static.js"></script>
</html>