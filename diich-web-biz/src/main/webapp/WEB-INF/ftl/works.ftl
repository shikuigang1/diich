<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>作品详情页</title>
    <link rel="stylesheet" href="assets/css/common.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <style>
        .header .content .nav a:after {
            display: none;
        }
    </style>
    <script src="./assets/js/jquery.min.js"></script>
    <script src="./assets/js/system.js"></script>
</head>

<body style="background:rgba(245,246,248,1);">
    <div class="header header_detail"></div>
    <!--//End header -->
    <div class="filter_search filter_search_fixed">
        <div class="content">
            <form class="form" action="">
                <input class="ipt" type="text" value="从这里搜索您感兴趣的...">
                <input class="submit" type="submit" value="搜索">
                <div class="suggest" style="display: none;">
                    <ul>
                        <li><a href=""><span>苏州</span>传承人</a></li>
                        <li><a href=""><span>苏州</span>苏绣</a></li>
                        <li><a href=""><span>苏州</span>苏绣</a></li>
                        <li><a href=""><span>苏州</span>苏绣</a></li>
                        <li><a href=""><span>苏州</span>苏绣</a></li>
                        <li><a href=""><span>苏州</span>苏绣</a></li>
                        <li><a href=""><span>苏州</span>苏绣</a></li>
                        <li><a href=""><span>苏州</span>苏绣</a></li>
                        <li><a href=""><span>苏州</span>苏绣</a></li>
                    </ul>
                </div>
            </form>
            <!--//End form-->

            <div class="attr">
                <span>全部</span>
                <span>所属类别</span>
                <span>全球</span>
            </div>
            <!--//End attribute-->

            <div class="dropbox" id="drag">
                <div class="item">
                    <dl class="level">
                        <dt>
                    <div class="title">查看</div>
                    </dt>
                        <dd>
                            <ul>
                                <li class="active">全部<span>342</span></li>
                                <li>项目<span>42</span></li>
                                <li>传承人<span>42</span></li>
                                <li>作品<span>42</span></li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <!--//ENd 全部-->

                <div class="item">
                    <dl class="level">
                        <dt>
                    <div class="title">一级分类</div>
                    <div class="subtitle">所有分类</div>
                    </dt>
                        <dd>
                            <ul>
                                <li>口头传统和表述</li>
                                <li>表演艺术</li>
                                <li>社会风俗、礼仪、节庆</li>
                                <li>有关自然界和宇宙的知识和实践</li>
                                <li>传统的手工艺技能</li>
                                <li>传统的手工艺技能</li>
                                <li>传统的手工艺技能</li>
                                <li>传统的手工艺技能</li>
                                <li>传统的手工艺技能</li>
                                <li>传统的手工艺技能</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl class="level2">
                        <dt>
                    <div class="title">二级分类</div>
                    <div class="subtitle">所有二级分类</div>
                    </dt>
                        <dd>
                            <ul>
                                <li>工具和机械制作</li>
                                <li>家畜农林产品加工</li>
                                <li>造纸、印刷及装裱</li>
                                <li>烧造工艺</li>
                                <li>锻冶工艺</li>
                                <li>雕塑工艺</li>
                                <li>雕塑工艺</li>
                                <li>雕塑工艺</li>
                                <li>雕塑工艺</li>
                                <li>雕塑工艺</li>
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
                                <li>全球</li>
                                <li>中国</li>
                                <li>非洲</li>
                                <li>阿拉伯地区</li>
                                <li>亚太</li>
                                <li>欧美</li>
                                <li>拉美</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl class="level2">
                        <dt>
                    <div class="title">按照字母顺序</div>
                    </dt>
                        <dd>
                            <ul>
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

    <div class="container">
        <div class="bd detail_product">

            <div class="crumbs">
                <#if (obj.ichProject??)>
                    <#if (obj.ichProject.ichCategory??)>
                        <span>${obj.ichProject.ichCategory.name}</span>
                        <#if (obj.ichProject.ichCategory.children?? && obj.ichProject.ichCategory.children?size>0)>
                            <#list obj.ichProject.ichCategory.children as second>
                                <i class="gt"></i>
                                <span>${second.name}</span>
                                <#if (second.children?? && second.children?size>0)>
                                    <#list second.children as third>
                                        <i class="gt"></i>
                                        <span class="last">${third.name}</span>
                                    </#list>
                                </#if>
                            </#list>
                        </#if>
                    </#if>
                </#if>
                <#--<span>非遗名录</span>
                <i class="gt"></i>
                <span><a href="" title="口头传说和表述">口头传说和表述</a></span>
                <i class="gt"></i>
                <span class="last">昆曲</span>-->
            </div>
            <!--//End crumbs-->

            <div class="content">
                <div class="main">
                    <div class="detail_title">
                        <h2><#--《吕布与貂蝉》-->
                            <#if (obj.contentFragmentList?size>0)>
                                <#list obj.contentFragmentList as cf>
                                    <#if cf.attributeId == 28>
                                        <#assign worksname = cf.content>
                                    ${cf.content}
                                    </#if>
                                </#list>
                            </#if>
                        </h2>
                        <div class="doi_code">
                            <i class="icon"></i>
                            <span>标识码：
                                <#if (obj.contentFragmentList?? && obj.contentFragmentList?size>0)>
                                    <#list obj.contentFragmentList as cf>
                                        <#if cf.attributeId == 26>
                                        ${cf.content}
                                        </#if>
                                    </#list>
                                </#if>
                            </span>
                            <em class="icon"></em>
                            <div class="drop">
                                <img src="assets/images/code.png" alt="">
                            </div>

                            <#--<i class="icon"></i>
                            <span>标识码：37232519870103004383</span>
                            <em class="icon"></em>
                            <div class="drop">
                                <img src="assets/images/code.png" alt="">
                            </div>-->
                        </div>
                    </div>
                    <!--//End title-->

                    <div class="master">
                        <div class="item">

                        <#if (obj.ichMaster.contentFragmentList?size>0)>
                            <#list obj.ichMaster.contentFragmentList as cf>
                                <#if cf.attributeId == 10>
                                    <#if (cf.resourceList?size>0)>
                                        <#list cf.resourceList as r>
                                            <#if r.type==0 && r.status== 0>
                                                <a class="avatar" href=""><img src="<#if r.uri??>${r.uri}</#if>" alt=""></a>
                                            </#if>
                                        </#list>
                                    </#if>
                                </#if>
                            </#list>
                        </#if>

                        <#if (obj.ichMaster.contentFragmentList?size>0)>
                            <#list obj.ichMaster.contentFragmentList as cf>

                                <#if cf.attributeId == 13>
                                    <span><#--林为林-->${cf.content}</span>
                                </#if>
                            </#list>
                        </#if>

                        <#if (obj.ichMaster?? && obj.ichMaster.contentFragmentList?? && obj.ichMaster.contentFragmentList?size>0)>
                            <#list obj.ichMaster.contentFragmentList as cf>
                                <#if (cf.attributeId == 111)>
                                    <span class="auth"><#--UNESCO认证传承人-->
                                        ${cf.content}
                                    </span>
                                </#if>
                            </#list>
                        </#if>

                        </div>

                        <div class="item">
                            <span>所属项目：</span>
                            <strong><#--昆曲-->
                                <#if (obj.ichProject?? && obj.ichProject.contentFragmentList?? && obj.ichProject.contentFragmentList?size>0)>
                                    <#list obj.ichProject.contentFragmentList as cf>
                                        <#if (cf.attributeId == 4 && cf.content??)>
                                            ${cf.content}
                                        </#if>
                                    </#list>
                                </#if>
                            </strong>
                        </div>
                    </div>
                    <!--//End master-->
                </div>
                <!--//End main-->

                <div class="media_box">
                    <div class="pic video">
                        <#--<span class="play play120"><i></i></span>
                        <img src="assets/uploads/detail_product_bg.jpg" alt="">-->
                        <#if (obj.contentFragmentList?? && obj.contentFragmentList?size>0)>
                            <#list obj.contentFragmentList as cf>
                                <#if cf.attributeId == 25>
                                    <#list cf.resourceList as r>
                                        <#if r.type == 0>
                                            <div class="item" data-type="0">
                                                <img src="${r.uri}" alt="">
                                            </div>
                                        </#if>
                                        <#if r.type == 1>
                                            <div class="item" data-type="1">
                                                <span class="play play120"><i></i></span>
                                                <video src="http://diich-resource.oss-cn-beijing.aliyuncs.com/video/video1.mp4"></video>
                                            </div>
                                        </#if>
                                    </#list>
                                </#if>
                            </#list>
                        </#if>
                    </div>
                    <div class="thumb">
                        <#--<ul>
                            <li class="active"><img src="assets/uploads/detail_product_thumb01.jpg" alt=""></li>
                            <li><img src="assets/uploads/detail_product_thumb02.jpg" alt=""></li>
                            <li><img src="assets/uploads/detail_product_thumb03.jpg" alt=""></li>
                            <li><img src="assets/uploads/detail_product_thumb04.jpg" alt=""></li>
                            <li><img src="assets/uploads/detail_product_thumb05.jpg" alt=""></li>
                            <li><img src="assets/uploads/detail_product_thumb06.jpg" alt=""></li>
                        </ul>-->

                        <ul>
                            <#if (obj.contentFragmentList?? && obj.contentFragmentList?size>0)>
                                <#list obj.contentFragmentList as cf>
                                    <#if cf.attribute.dataType == 5 || cf.attribute.dataType == 25>
                                        <#list cf.resourceList as r>
                                            <#if r.type == 0>
                                                <li data-type="0">
                                                    <img src="${r.uri}" alt=""><#--?x-oss-process=style/pc-works-style-->
                                                </li>
                                            </#if>
                                            <#if r.type == 1>
                                                <li data-type="1">
                                                    <img src="${r.uri}" alt=""><#--?x-oss-process=style/pc-works-style-->
                                                </li>
                                            </#if>
                                        </#list>
                                    </#if>
                                </#list>
                            </#if>
                        </ul>

                        <div class="prev"></div>
                        <div class="next"></div>
                        <div class="num">
                            <em class="active">01</em><em>/</em><em>09</em>
                        </div>
                    </div>
                </div>
                <!--//End media_box-->

                <div class="card_base">
                    <duv class="detail_title">
                        <h2>基础信息</h2>
                    </duv>
                    <div class="info" id="info">
                        <ul>
                            <#if (obj.contentFragmentList?size>0)>
                                <#list obj.contentFragmentList as cf>
                                    <#if cf.attribute?? && cf.attribute.dataType==0 && cf.content?? && cf.attributeId != 26 && cf.attributeId != 28>
                                        <li>
                                            <span class="key">${cf.attribute.cnName}：</span>
                                            <span class="value">${cf.content}</span>
                                        </li>
                                    </#if>
                                </#list>
                            </#if>
                        </ul>
                    </div>
                </div>
                <!--//End 基础信息-->
            </div>

        <#assign odd_even =0 />

        <#if (obj.contentFragmentList?? && obj.contentFragmentList?size>0)>
            <#list obj.contentFragmentList as cf>
                <#if (cf.attribute.dataType == 5 && cf.resourceList?? && cf.resourceList?size>0) >
                    <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                        <div class="card">
                            <header><h4>${cf.attribute.cnName} </h4></header>
                            <article class="text_img">
                                <div class="side">
                                    <div class="item">
                                        <p>${cf.content?replace("\n","</p><p>")}</p>
                                    </div>
                                </div>
                                <div class="media">
                                    <ul>
                                        <#list cf.resourceList as r>
                                            <li>
                                                <#if r.type ==0>
                                                    <img src="${r.uri}" alt="">
                                                    <#if r.description??>
                                                        <span>${r.description}</span>
                                                    </#if>
                                                </#if>
                                                <#if r.type ==1>
                                                    <div class="card_video">
                                                        <div class="time">30:24</div>
                                                        <div class="play"></div>
                                                        <video poster="assets/uploads/exp2.png">
                                                            <source style="width: 100%;" src="${r.uri}" type="video/mp4">
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
                                            <a href="">查看完整图集<i class="arrow_right"></i></a>
                                        </div>
                                    </#if>
                                </div>
                            </article>
                        </div>
                    </section>
                    <#assign odd_even = odd_even+1 />
                </#if>

                <#if (cf.attribute.dataType == 5 && cf.resourceList?? && cf.resourceList?size<1)>
                    <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                        <div class="card">
                            <header><h4>${cf.attribute.cnName}  </h4></header>
                            <article class="plain_text">
                                <p>
                                ${cf.content?replace("\n", "</p><p>")}
                                </p>
                            </article>
                        </div>
                    </section>
                    <#assign odd_even = odd_even+1 />
                </#if>

                <#if cf.attribute.dataType == 1>
                    <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                        <div class="card">
                            <header><h4>${cf.attribute.cnName}  </h4></header>
                            <article class="plain_text">
                                <p>
                                ${cf.content?replace("\n", "</p><p>")}
                                </p>
                            </article>
                        </div>
                    </section>
                    <#assign odd_even = odd_even+1 />
                </#if>
            </#list>
        </#if>

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
        detailProductPage.init();
        //去掉head的定位
        $(".header .content .nav li").eq(0).removeClass("active");
    });
</script>
<script	src="http://diich-resource.oss-cn-beijing.aliyuncs.com/html/project/assets/js/static.js"></script>
</html>