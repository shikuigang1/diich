<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>视频图片预览</title>
</head>

<body>
<#--<input type="button" class="btn" value="图片" data-type="0" data-id="0">
<input type="button" class="btn" value="视频" data-type="1" data-id="1">-->



<div class="container">
    <div class="media_layer" style="display:none;">
        <div class="content">
            <div class="head">
                <div class="menu">
                    <span class="active">图片</span>
                    <#if (obj.contentFragmentList?size>0)>
                        <#assign breaklop=0>
                        <#list obj.contentFragmentList as cf>
                        <#if cf.resourceList?? && (cf.resourceList?size>0)>
                            <#if breaklop==1><#break ></#if>
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
                                <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                    <#list cf.resourceList as res>
                                        <#if res.description??>
                                        <li> ${res.description}</li>
                                        </#if>
                                    </#list>
                                </#if>
                            </#list>
                        </#if>
                    </ul>
                    <a href="" class="more">查看详情</a>
                    <div class="master">
                        <div class="item">
                            <a class="avatar" href="">
                            <#if (obj.contentFragmentList?size>0)>
                                <#list obj.contentFragmentList as cf>
                                    <#if cf.attributeId == 113>
                                        <#if (cf.resourceList??) &&(cf.resourceList?size>0)>
                                            <#list cf.resourceList as res>
                                                <#if res.type==0 && res.status==0>
                                                    <img src="<#if res.uri??>${masteruri}${res.uri}?x-oss-process=style/head-image-style</#if>" alt="" width="94" height="70">
                                                </#if>
                                            </#list>
                                        </#if>
                                    </#if>
                                </#list>
                            </#if>
                            </a>
                            <span>
                                <#if (obj.contentFragmentList?size>0)>
                                    <#list obj.contentFragmentList as cf>
                                        <#if cf.attributeId == 13>
                                            ${cf.content}
                                        </#if>
                                    </#list>
                                </#if>
                            </span>
                            <span class="auth">UNESCO认证传承人</span>
                        </div>
                    </div>
                </div>
                <!--//End-->
                <div class="main">
                    <ul class="media">
                    <#if (obj.contentFragmentList?size>0)>
                        <#assign idx=1 />
                        <#list obj.contentFragmentList as cf>
                            <#if (cf.resourceList??)&&(cf.resourceList?size>0)>
                                <#list cf.resourceList as res>
                                    <#if res.type==0 && res.status==0>
                                        <li><a href=""><img src="<#if res.uri??>${masteruri}${res.uri}</#if>" alt="" data-type="0" data-id="${idx}"></a></li>
                                        <#assign idx=idx+1 />
                                    </#if>
                                </#list>
                            </#if>
                        </#list>
                    </#if>
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
                            <#if (cf.resourceList??)&&(cf.resourceList?size>0)>
                                <#list cf.resourceList as res>
                                    <#if res.type==1 && res.status==0>
                                    <#if res.description??>
                                        <li> ${res.description}</li>
                                    </#if>
                                    </#if>
                                </#list>
                            </#if>
                        </#list>
                    </#if>
                    </ul>
                </div>
                <div class="main">
                    <ul class="media">
                    <#if (obj.contentFragmentList?size>0)>
                        <#assign idx=1 />
                        <#list obj.contentFragmentList as cf>
                            <#if (cf.resourceList??) && (cf.resourceList?size>0)>
                                <#list cf.resourceList as res>
                                    <#if res.type==1 && res.status==0>
                                        <li><video src="<#if res.uri??>${masteruri}${res.uri}</#if>" controls data-type="1" data-id="${idx}"></video></li>
                                        <#assign idx=idx+1 />
                                    </#if>
                                </#list>
                            </#if>
                        </#list>
                    </#if>
                    </ul>
                    <ul class="num">
                  <#--  <#if (obj.contentFragmentList?size>0)>
                        <#assign idx=1 />
                        <#list obj.contentFragmentList as cf>
                            <#if (cf.resourceList??) &&(cf.resourceList?size>0)>
                                <#list cf.resourceList as res>
                                    <#if res.type==1 && res.status==0>
                                        <#if res.description??>
                                            0${idx+1}_<span>${res.description}</span>(30:20)
                                            &lt;#&ndash;<li> ${res.description}</li>&ndash;&gt;
                                        </#if>
                                    </#if>
                                </#list>
                            </#if>
                        </#list>
                    </#if>-->
                        <#--<li class="active v-active">01_<span>鼓罗</span>(30:20)</li>
                        <li>02_<span>建国后昆剧杰出的英才</span>(60:00)</li>
                        <li>03_<span>水调歌头</span>(90:30)</li>
                        <li>04_<span>吕布与貂蝉</span>(45:15)</li>
                        <li>05_<span>三国演义</span>(45:15)</li>-->
                    </ul>
                </div>
                <!--//End-->

                <span class="prev"></span>
                <span class="next"></span>
            </div>
            <!--//End 视频-->

        </div>
    </div>
</div>


</body>
<script>
    $(function () {
        $('.btn').click(function () {
            var type = $(this).attr('data-type');
            var index = parseInt($(this).attr('data-id'));
            detailCommon.mediaShow(type, index);
        });
    })
</script>
</html>