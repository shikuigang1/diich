<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>传承人详情页</title>
    <link rel="stylesheet" href="assets/css/common.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <script src="./assets/js/jquery.min.js"></script>
    <script src="./assets/js/system.js"></script>
</head>

<body>
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
    <div class="bd detail">
        <div class="mainbg">

       <#--<#assign backImgUrl="assets/uploads/project_detail_01.png">-->
        <#if (obj.contentFragmentList?size>0)>
            <#list obj.contentFragmentList as cf>
                <#if cf.attributeId == 10>
                    <#if (cf.resourceList?size>0)>
                        <#list cf.resourceList as res>
                            <#if res.type==0 && res.status==1>
                                <img src="<#if res.uri??>${res.uri}</#if>" alt="">
                                <#--<#assign backImgUrl="${res.uri}">-->
                            </#if>
                        </#list>
                    </#if>
                </#if>
            </#list>
        </#if>
        <#--<img src="${backImgUrl}" alt="">
            <video poster="${backImgUrl}" src="http://192.168.1.111/video.mp4"> </video>
            <span class="play_big"></span>-->
        </div>
        <!--//End main-->

        <div class="crumbs">
            <span>非遗名录</span>
            <#if (obj.ichProject.ichCategory.name)??>
                <i class="gt"></i>
                <span><a href="" title="${obj.ichProject.ichCategory.name}"> ${obj.ichProject.ichCategory.name}</a></span>
                <#if (obj.ichProject.ichCategory.children?size>0)>
                    <#list obj.ichProject.ichCategory.children as ch>
                        <i class="gt"></i>
                        <span><a href="" title="${ch.name}"> ${ch.name}</a></span>
                        <#if (ch.children)?? && (ch.children?size>0)>
                            <#list ch.children as chh>
                                <i class="gt"></i>
                                <span><a href="" title="${chh.name}"> ${chh.name}</a></span>
                            </#list>
                        </#if>
                    </#list>
                </#if>
            </#if>
            <i class="gt"></i>
            <span class="last">
            <#if (obj.contentFragmentList?size>0)>
               <#list obj.contentFragmentList as cf>
                <#if cf.attributeId == 13>
                    <#assign mastername = cf.content>
                ${cf.content}
                </#if>
               </#list>
             </#if>
            </span>
        </div>
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
                        <#if (cf.resourceList?size>0)>
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
                    <a class="album"><i class="icon_img"></i>
                            ${numPic}张图片/${numVed}个视频
                      </a>
                    </#if>
                    <#if (numPic >0) && (numVed =0)>
                    <a class="album"><i class="icon_img"></i>
                            ${numPic}张图片
                      </a>
                    </#if>
                   <#-- <#if (numPic ==0) && (numVed ==0)>
                    <a class="album"><i class="icon_img"></i>
                            ${numPic}张图片/${numVed}个视频
                      </a>
                    </#if>-->
                    <div class="share_box">
                        <div class="icons">
                            <a href="" class="sina"></a>
                            <a href="" class="facebook"></a>
                            <a href="" class="twitter"></a>
                        </div>
                        <img class="qrcode" src="assets/images/code.png" alt="">
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
                        <span>标识码：<#if (obj.contentFragmentList?size>0)>
                                        <#list obj.contentFragmentList as cf>
                                            <#if cf.attributeId == 11>
                                                ${cf.content}
                                            </#if>
                                        </#list>
                        </#if></span>
                        <em class="icon"></em>
                        <div class="drop">
                            <img src="assets/images/code.png" alt="">
                        </div>
                    </div>
                </div>
                <!--//End title-->

                <div class="bd subtxt">
                        <span>
                            <strong>申报地区：</strong>
                            <em><#if (obj.contentFragmentList?size>0)>
                                <#list obj.contentFragmentList as cf>
                                    <#if cf.attributeId == 23 && cf.content??>
                                        <#assign codeList = cf.content?split(";")>
                                        <#list codeList as s>
                                            <em>${s}</em>
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
                                <#list (obj.ichProject.contentFragmentList) as cf>
                                    <#if cf.attributeId == 1>
                                        <#if (cf.resourceList?size>0)>
                                            <#list cf.resourceList as r>
                                                <#if r.type==0 && r.status==1>
                                                    <img src="<#if r.uri??>${r.uri}</#if>" width="94" height="70" alt="">
                                                </#if>
                                            </#list>
                                        </#if>
                                    </#if>
                                </#list>
                            </#if>
                        </div>
                        <div class="txt">
                            <p class="t">
                                <#if (obj.ichProject.contentFragmentList?size>0)>
                                    <#list (obj.ichProject.contentFragmentList) as cf>
                                        <#if cf.attributeId == 4>
                                            ${cf.content}
                                        </#if>
                                    </#list>
                                </#if>
                            </p>
                            <p>类别：<#if (obj.ichProject.ichCategory.name)??>
                                ${obj.ichProject.ichCategory.name}
                                <#if ((obj.ichProject.ichCategory.children)?? && obj.ichProject.ichCategory.children?size>0)>
                                    <#list obj.ichProject.ichCategory.children as ch>
                                        -${ch.name}
                                        <#if (ch.children)?? && (ch.children?size>0)>
                                            <#list ch.children as chh>
                                                -${chh.name}
                                            </#list>
                                        </#if>
                                    </#list>
                                </#if>
                            </#if>
                                | 地域： <#if (obj.ichProject.contentFragmentList?size>0)>
                                                 <#list (obj.ichProject.contentFragmentList) as cf>
                                                            <#if cf.attributeId == 33>
                                                            ${cf.content}
                                                            </#if>
                                                </#list>
                                            </#if>
                            </p>
                            <p>DOI ：<#if (obj.ichProject.contentFragmentList?size>0)>
                                        <#list obj.ichProject.contentFragmentList as cf>
                                            <#if cf.attributeId == 2>
                                             ${cf.content}
                                            </#if>
                                        </#list>
                                     </#if>
                            </p>
                        </div>
                    </div>
                </div>
        </#if>
                <!--//ENd-->

                <div class="bd batch">
                    <div class="tname">非遗在中国<i></i></div>
                    <div class="subcon">
                        <#if (obj.contentFragmentList?size>0)>
                            <#list obj.contentFragmentList as cf>
                                <#if cf.attributeId == 12 && cf.content??>
                                    <span>人类非物质文化遗产编号：${cf.content}</span>
                                </#if>
                            </#list>
                        </#if>
                        <#if (obj.contentFragmentList?size>0)>
                            <#list obj.contentFragmentList as cf>
                                <#if cf.attributeId == 111 && cf.content??>
                                    <span>级别：${cf.content}</span>
                                </#if>
                            </#list>
                        </#if>
                    </div>
                </div>
                <!--//ENd-->

            </div>

            <div class="card_base">
                <duv class="detail_title">
                    <h2>基礎信息</h2>
                </duv>
                <div class="info">
                    <ul>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attribute?? && cf.attribute.dataType !=1 &&cf.attribute.dataType !=5 && cf.content??&& cf.attributeId != 11 && cf.attributeId != 12 && cf.attributeId != 111 && cf.attributeId != 23 && cf.attribute.isOpen == 1>
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
            <!--//End 基本信息-->
        </div>
    <#assign odd_even =0 />

    <#if obj.worksList??>
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
                                        <#if c.attributeId==25>
                                            <#if c.resourceList??>
                                                <#list c.resourceList as p>
                                                    <a href=""><img src="${p.uri}" alt=""></a>
                                                </#list>
                                            </#if>
                                        </#if>
                                    </#list>

                                    <#list work.contentFragmentList as c>
                                        <#if c.attributeId==28>
                                            <p class="name">${c.content} </p
                                        </#if>
                                  <#--  <#if c.attributeId==25>
                                        <p class="master">${c.content}</p>
                                    </#if>-->
                                    </#list>
                                    <#list work.contentFragmentList as c>
                                        <#if c.attributeId==25>
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
            <#if cf.attribute.dataType == 5 >

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

            <#if cf.attribute.dataType == 1>

                <section class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
                    <div class="card">
                        <header><h4>${cf.attribute.cnName}  </h4></header>
                        <article class="plain_text">
                            <p>
                            ${cf.content?replace("\n", "</p><p>")}
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
    });
</script>

</html>