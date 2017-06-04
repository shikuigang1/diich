<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>
    <#if (obj.contentFragmentList?size>0)>
       <#list obj.contentFragmentList as cf>
        <#if cf.attributeId == 4>
            <#assign proname = cf.content>
        ${cf.content}
        </#if>
      </#list>
    </#if>
    </title>
    <link rel="stylesheet" href="assets/css/common.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <script src="./assets/js/jquery.min.js"></script>
    <script src="./assets/js/system.js"></script>
    <script src="./assets/js/html5media.min.js"></script>
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
        <#assign backImgUrl="assets/uploads/head.png">
        <#if (obj.contentFragmentList?size>0)>
            <#list obj.contentFragmentList as cf>
                <#if cf.attributeId == 1>
                    <#if (cf.resourceList?size>0)>
                        <#list cf.resourceList as res>
                            <#if res.type==0 && res.status==0>
                                <#assign backImgUrl="${res.uri}">
                            </#if>
                        </#list>
                    </#if>
                </#if>
            </#list>
        </#if>
            <img src="${backImgUrl}" alt="">
        <#if (obj.contentFragmentList?size>0)>
            <#list obj.contentFragmentList as cf>
                <#if cf.attributeId == 1>
                    <#if (cf.resourceList?size>0)>
                        <#list cf.resourceList as res>
                            <#if res.type==1 && res.status==0>
                                <video poster="${backImgUrl}" src="${res.uri}"> </video>
                                <span data-type="1"  class="play_big"> </span>
                            </#if>
                        </#list>
                    </#if>
                </#if>
            </#list>
        </#if>


        </div>
        <!--//End main-->
        <div class="crumbs">
            <span>非遗名录</span>
        <#--<i class="gt"></i>
        <span><a href="" title="口头传说和表述">口头传说和表述</a></span>-->
        <#if (obj.ichCategory.name)??>
            <i class="gt"></i>
            <span><a href="" title="${obj.ichCategory.name}"> ${obj.ichCategory.name}</a></span>
            <#if (obj.ichCategory.children??) && (obj.ichCategory.children?size>0)>
                <#list obj.ichCategory.children as ch>
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
            <span class="last"><#if (obj.contentFragmentList?size>0)>
                                        <#list obj.contentFragmentList as cf>
                <#if cf.attributeId == 4>
                    <#assign proname = cf.content>
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
                    <a class="album albums" onclick="show()" data-type="mediaLayer" datatype="0" data-id="0"><i class="play_sm"></i>
                    ${numPic}张图片/${numVed}个视频
                    </a>
                </#if>
                <#if (numPic >0) && (numVed =0)>
                    <a class="album albums"><i class="icon_img"></i>
                    ${numPic}张图片
                    </a>
                </#if>
                <#if (numPic =0) && (numVed >0)>
                    <a class="album albums"><i class="icon_img"></i>
                    ${numVed}个视频
                    </a>
                </#if>
                <#-- <a class="album" onclick="show()" data-type="mediaLayer"><i class="play_sm"></i>【视频】昆曲传承人讲述昆曲…(2个视频／9张图片)</a>-->
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
                    <h2><#if (obj.contentFragmentList?size>0)>
                                <#list obj.contentFragmentList as cf>
                        <#if cf.attributeId == 4>
                        ${cf.content}
                        </#if>
                    </#list>
                            </#if></h2>
                    <div class="doi_code">
                        <i class="icon">ID</i>
                        <span>标识码：<#if (obj.contentFragmentList?size>0)>
                            <#list obj.contentFragmentList as cf>
                                <#if cf.attributeId == 2>
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
                            <strong>类别：</strong>
                            <em><#if (obj.ichCategory.name)??>
                            ${obj.ichCategory.name}
                                <#if ((obj.ichCategory.children)?? && obj.ichCategory.children?size>0)>
                                    <#list obj.ichCategory.children as ch>
                                        -${ch.name}
                                        <#if (ch.children)?? && (ch.children?size>0)>
                                            <#list ch.children as chh>
                                                -${chh.name}
                                            </#list>
                                        </#if>
                                    </#list>
                                </#if>
                            </#if>
                            <#--<#if type??>
                                                ${type.name}
                               </#if>-->
                            </em>
                        </span>
                    <span>
                            <strong>地区：</strong>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 33 && cf.content??>
                                <#assign codeList = cf.content?split(";")>
                                <#list codeList as s>
                                    <em>${s}</em>
                                    <#if s_index+1 < (codeList?size)>
                                        <i>|</i>
                                    </#if>
                                </#list>
                            </#if>
                        </#list>
                    </#if>
                        </span>
                </div>
                <!--//End-->

            <#if obj.ichMasterList?? && (obj.ichMasterList?size > 0)>
                <div class="bd inheritor">

                    <div class="tname">代表性传承人</div>
                    <div class="master">
                        <ul>

                        <li>
                            <#list obj.ichMasterList as master>
                                <#assign masterPic="assets/uploads/default_avatar2.png">
                                <#if master.contentFragmentList??>
                                    <div class="item">
                                        <#list master.contentFragmentList as cf>
                                            <#if cf.attributeId == 10 && cf.targetType == 1>

                                                <#if cf.resourceList??>
                                                    <#list cf.resourceList as r>
                                                        <#if r.uri??>
                                                            <#assign masterPic="${r.uri}">
                                                        </#if>
                                                    </#list>
                                                </#if>
                                            <#---->
                                            </#if>

                                        </#list>
                                        <a href="<#if master.uri??>${master.uri}</#if>" class="avatar">
                                            <img src="${masterPic}" alt=""/>
                                        </a>

                                        <span class="txt">
                                            <#list master.contentFragmentList as cf>
                                                <#if cf.attributeId == 13 && cf.targetType == 1>
                                                    <p class="name"><a href="<#if master.uri??>${master.uri}</#if>">${cf.content}</a></p>
                                                </#if>

                                                <#if cf.attributeId == 50 && cf.targetType == 1>
                                                    <p >${cf.content}</p>
                                                </#if>

                                                <#if cf.attributeId == 48 && cf.targetType == 1>
                                                    <p >${cf.content}</p>
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
                            <a href="javascript:;"><span>其他<em></em>人</span><i class="gt_big"></i></a>
                        </div>
                        <div class="prev"></div>
                        <div class="next"></div>
                        <div class="page"></div>
                    </div>
                </div>
            </#if>
                <!--//ENd-->
                <div class="bd batch">
                    <div class="tname">非遗在中国<i></i></div>
                    <div class="subcon">
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 106 && cf.content??>
                                <span>人类非物质文化遗产编号：${cf.content}</span>
                            </#if>
                        </#list>
                    </#if>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 41 &&  cf.content??>
                                <span>级别： ${cf.content} </span>
                            </#if>
                        </#list>
                    </#if>

                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 7 && cf.content??>
                                <span>批次： ${cf.content} </span>
                            </#if>
                        </#list>
                    </#if>

                    </div>
                </div>
                <!--//ENd-->
            </div>
            <!--//End 主内容-->

            <div class="card_base">
                <duv class="detail_title">
                    <h2>基礎信息</h2>
                </duv>
                <div class="info">
                    <ul>
                    <#if (obj.contentFragmentList?size>0)>
                        <#list obj.contentFragmentList as cf>
                            <#if cf.attribute?? && cf.attribute.dataType==0 && cf.content?? && cf.attributeId != 106 && cf.attributeId != 7 && cf.attributeId != 8>
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
    <#if obj.worksList?? && (obj.worksList?size>0)>
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
                                    </#list>
                                    <#list work.contentFragmentList as c>
                                        <#if c.attributeId==25>
                                            <#if c.resourceList??>
                                                <#list c.resourceList as p>
                                                    <p class="master"><#if p.description??>${p.description}</#if></p>
                                                </#list>
                                            </#if>
                                        </#if>
                                    <#-- <#if c.attributeId==31>
                                         <p class="master">${c.content}</p>
                                     </#if>-->
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
            <#if (cf.attribute.dataType == 5 && cf.resourceList?? && cf.resourceList?size>0)>
                <section name="tuwen" class="bd floor <#if odd_even%2 == 0 >odd</#if><#if odd_even%2 != 0 >even</#if>">
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
                                                    <div class="play" data-type="1" data-id="1" ></div>
                                                    <video poster="assets/uploads/exp2.png"  src="${r.uri}" type="video/mp4" style="width: 100%;">

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
                                        <a class="albums" data-type="mediaLayer" datatype="0" data-id="0" href="javascript:;">查看完整图集<i class="arrow_right"></i></a>
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
    <#-- <#if (obj.contentFragmentList?size>0)>
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
                            &lt;#&ndash;${cf.content?replace("\n","</p></p>")}&ndash;&gt;

                        </article>
                    </div>
                </section>

                <#assign odd_even = odd_even+1 />
            </#if>

        </#list>
    </#if>-->



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


<div class="media_layer" style="display:none;">
    <div class="content">
        <div class="head">
            <div class="menu">
                <span class="active">图片</span>

            <#if (obj.contentFragmentList?size>0)>
                <#assign breaklop=0>
                <#list obj.contentFragmentList as cf>
                    <#if breaklop==1><#break ></#if>
                        <#if cf.resourceList??>
                            <#list cf.resourceList as r>
                                <#if r.type ==1>
                                    <span>视频</span>
                                    <#assign breaklop=1>
                                    <#break>
                                </#if>
                            </#list>
                        </#if>
                </#list>
            </#if>

            </div>
            <a href="" class="icon_close"></a>
        </div>
        <!--//End-->

        <div class="items album" style="display: block">
            <div class="title">
                <ul class="dt">


                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.resourceList??>
                            <#list cf.resourceList as r>
                                <#if r.type ==0>
                                    <li>${r.description}</li>
                                </#if>
                            </#list>
                        </#if>
                    </#list>
                </#if>
                <#--   <li>《1111-名称示意最多显示20字…》</li>
                   <li>《2222-名称示意最多显示20字…》</li>
                   <li>《3333-名称示意最多显示20字…》</li>
                   <li>《4444-名称示意最多显示20字…》</li>
                   <li>《5555-名称示意最多显示20字…》</li>
                   <li>《6666-名称示意最多显示20字…》</li>-->
                </ul>
                <a href="" class="more">查看详情</a>
                <div class="master">
                    <div class="item">
                        <a class="avatar" href=""><img src="assets/uploads/master1.jpg" alt=""></a>
                        <span>林为林</span>
                        <span class="auth">UNESCO认证传承人</span>
                    </div>
                </div>
            </div>
            <!--//End-->
            <div class="main">
                <ul class="media" id="imgs">

                <#if (obj.contentFragmentList?size>0)>
                    <#assign idx=0 />
                    <#list obj.contentFragmentList as cf>
                        <#if cf.resourceList??>
                        <#list cf.resourceList as r>
                            <#if r.type ==0>
                                <li><a href=""><img src="${r.uri}" alt="" data-type="0" data-id="${idx}"></a></li>
                                <#assign idx=idx+1 />
                            </#if>
                        </#list>
                        </#if>
                    </#list>
                </#if>

                <#--
                                        <li><a href=""><img src="assets/uploads/media_02.jpg" alt=""></a></li>
                                        <li><a href=""><img src="assets/uploads/media_03.jpg" alt=""></a></li>
                                        <li><a href=""><img src="assets/uploads/media_04.jpg" alt=""></a></li>
                                        <li><a href=""><img src="assets/uploads/media_05.jpg" alt=""></a></li>
                                        <li><a href=""><img src="assets/uploads/media_06.jpg" alt=""></a></li>-->
                </ul>
                <ul class="num">
                    <li class="active a-active"></li>
                    <li class="line">/</li>
                    <li class="total"></li>
                </ul>
            </div>
            <!--//End-->
            <span class="prev"></span>
            <span class="next"></span>
        </div>
        <!--//End 相册-->

        <div class="items video">
            <div class="title">
                <ul class="dt">

                <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                        <#if cf.resourceList??>
                        <#list cf.resourceList as r>
                            <#if r.type == 1>
                                <li>${r.description}</li>
                            </#if>
                        </#list>
                        </#if>
                    </#list>
                </#if>
                <#-- <li>111111</li>
                 <li>222222</li>
                 <li>333333</li>
                 <li>444444</li>
                 <li>555555</li>-->
                </ul>
            </div>
            <div class="main">
                <ul class="media" id="videos">

                <#if (obj.contentFragmentList?size>0)>
                    <#assign idx=0 />
                    <#list obj.contentFragmentList as cf>
                        <#if cf.resourceList??>
                        <#list cf.resourceList as r>
                            <#if r.type ==1>
                                <li><video src="${r.uri}" controls  data-type="1" data-id="${idx}"></video></li>
                                <#assign idx=idx+1 />
                            </#if>
                        </#list>
                    </#if>
                    </#list>
                </#if>

                <#--   <li><video src="assets/uploads/video1.mp4" controls></video></li>
                   <li>
                       <video src="assets/uploads/video1.mp4" controls></video>
                   </li>
                   <li>
                       <video src="assets/uploads/video1.mp4" controls></video>
                   </li>
                   <li>
                       <video src="assets/uploads/video1.mp4" controls></video>
                   </li>
                   <li>
                       <video src="assets/uploads/video1.mp4" controls></video>
                   </li>-->
                </ul>
            <#-- <ul class="num">
                 <li class="active v-active">01_<span>鼓罗</span>(30:20)</li>
                 <li>02_<span>建国后昆剧杰出的英才</span>(60:00)</li>
                 <li>03_<span>水调歌头</span>(90:30)</li>
                 <li>04_<span>吕布与貂蝉</span>(45:15)</li>
                 <li>05_<span>三国演义</span>(45:15)</li>
             </ul>-->
            </div>
            <!--//End-->

            <span class="prev"></span>
            <span class="next"></span>
        </div>
        <!--//End 视频-->

    </div>
</div>


</body>
<script>
    $(function() {
        //初始化
        projectPage.init();

        //reset 视频 data-id
        $("#imgs img").each(function(){
            //alert($(this).attr("src")+"---"+$(this).attr("data-id"));
            var obj=$(this);
            if($(".mainbg img")){
                if($(this).attr("src")==$(".mainbg img").attr("src")){
                    $(".mainbg img").attr("data-id",$(this).attr("data-id"));
                    $(".mainbg img").attr("data-type",$(this).attr("data-type"));
                }

            };
            //section 代码块寻找
            $("section[name='tuwen']").each(function(index,item){
                $(this).find("img").each(function(){
                    if(obj.attr("src")==$(this).attr("src")){
                        $(this).attr("data-id",obj.attr("data-id"));
                        $(this).attr("data-type",obj.attr("data-type"));
                    }
                });
            });
        });
        //reset 视频 data-id
        $("#videos video").each(function(){
            //alert($(this).attr("src")+"---"+$(this).attr("data-id"));
            var obj=$(this);
            if($(".mainbg video")){
                if($(this).attr("src")==$(".mainbg video").attr("src")){
                    $(".mainbg video").attr("data-id",$(this).attr("data-id"));
                    $(".mainbg video").attr("data-type",$(this).attr("data-type"));
                }
            };
            //section 代码块寻找

            $("section[name='tuwen']").each(function(index,item){
                $(this).find("video").each(function(){
                    if(obj.attr("src")==$(this).attr("src")){

                        $(this).attr("data-id",obj.attr("data-id"));
                        $(this).attr("data-type",obj.attr("data-type"));
                    }
                });
            });
        });
    });
</script>

</html>