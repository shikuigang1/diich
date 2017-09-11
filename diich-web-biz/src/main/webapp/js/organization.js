/**
 * 机构信息添加修改 相关操作
 */
var organization = null;
var orgAttributes = null;

function getCurrentOrganization() {
    if(!window.localStorage){
        //在服务器端获取组织数据
        if(organization == null){
            getOrganizationFromServer();
        }else{
            return organization;
        }
    }else{
        var org = localStorage.getItem("currOrg");
        if(org != null && typeof(org) != "undefined"){
            organization = JSON.parse(org);
        }
    }
    return organization;
}

function setCurrentOrganization(obj) {
    if(!window.localStorage){
        //在服务器端获取组织数据
        organization=obj;
    }else{
        localStorage.setItem("currOrg",JSON.stringify(obj));
    }
}

function getOrganizationFromServer() {
    $.ajax({
        type: "POST",
        url: "/organization/organizationInfo",
        data:{},
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            if(result.code==0){
                setCurrentOrganization(result.data);
            }
        },
        error: function (result, status) {
        }
    });
}

function getOrganizationById(orgID) {
    $.ajax({
        type: "POST",
        url: "/organization/getOrganizationById",
        data:{params:orgID},
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            if(result.code==0){
                setCurrentOrganization(result.data);
            }
        },
        error: function (result, status) {
        }
    });
}

function  saveOrganization() {

    //判断当前选中状态
    if($('div[data-type=org_basic]').hasClass("selected")){
        var contentFragmentList = [];
        var contentFragment={};

        contentFragment.attributeId=132;
        contentFragment.content=$("#orgName").val();
        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        contentFragment={};
        contentFragment.attributeId=133;
        contentFragment.content=$("#orgPerson").val();
        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        contentFragment={};
        contentFragment.attributeId=134;
        contentFragment.content=$("#orgSummary").val();
        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        contentFragment={};
        contentFragment.attributeId=135;
        contentFragment.content=$("#webSite").val();
        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        contentFragment={};
        contentFragment.attributeId=136;

        var path = $(".preview").attr("src");
        if(path != "" && typeof (path) != "undefined"){
            path = path.substring(path.lastIndexOf("/")+1);
            contentFragment.content=path;

            var resource={};
            var resourceList=[];
            resource.uri=path;
            resource.type=0;
            resource.description='';
            resourceList.push(resource);
            contentFragment.resourceList=resourceList;
            contentFragment.attributeId=136;
        }


        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        if(organization==null){
            organization={};
            organization.contentFragmentList = contentFragmentList;
        }else{
            $.each(contentFragmentList,function (index,obj) {
                $.each(organization.contentFragmentList,function (i,o) {
                    if(o.attributeId == obj.attributeId){
                        if(o.attributeId==136){
                            if(obj.resourceList != null && typeof (obj.resourceList)!="undefined" && obj.resourceList.length>0){
                                    if(organization.contentFragmentList[i].resourceList != null && typeof organization.contentFragmentList[i].resourceList != "undefined" && organization.contentFragmentList[i].resourceList.length>0){
                                        organization.contentFragmentList[i].resourceList[0].uri=obj.resourceList[0].uri;
                                    }else{
                                        organization.contentFragmentList[i].resourceList = obj.resourceList;
                                    }
                            }else{
                                //不做修改
                            }

                        }else{
                            organization.contentFragmentList[i].content=obj.content;
                        }
                    }
                });
            });
        }
        if(!validataOrginztion(organization)){
            return false;
        }
    }else{
        //获取当前id
        var attributeID = "";
        $('li[data-type=longField]').each(function () {
            if($(this).hasClass("selected")){
                attributeID = $(this).find("span").eq(0).attr("data-id");
            }
        });
        //验证数据
        if(!validateOrgCustom()) {
            return false;
        }
        //更新本地缓存

        var resource={};
        var resourceList=[];

        //获取图片列表
        $("#images").find(".item").each(function () {
            var fullpath="";
            var desc="";
            var path="";
            var type="0";

            if($(this).find('img').length>0){
                fullpath = $(this).find('img').eq(0).attr("src");
                desc =  $(this).find('img').eq(0).next().val();
                path = fullpath.substring(fullpath.lastIndexOf("/")+1);
            }else{
                fullpath = $(this).find('video').eq(0).attr("src");
                desc =  $(this).find('video').eq(0).next().val();
                path = fullpath.substring(fullpath.lastIndexOf("/")+1);
                type ="1";
            }
            resource.type=type;
            resource.uri=path;
            resource.description=desc;
            resourceList.push(cloneObj(resource));
        });

        var flag_1 =0;
        $.each(organization.contentFragmentList,function (idx,obj) {
            if(obj.attributeId == attributeID){
                flag_1=1;
                organization.contentFragmentList[idx].content=$("#longContent").val();
                organization.contentFragmentList[idx].attribute.cnName=$("#attrName").val();
                if(typeof (obj.resourceList) == 'undefined'){
                    organization.contentFragmentList[idx].resourceList = resourceList;
                }else{
                    $.each(resourceList,function (index,object) {
                        var flag = 0;
                        $.each(obj.resourceList,function (i,o) {
                            if(object.uri==o.uri){
                                flag=1;
                                o.description=object.description;
                            }
                        });
                        if(flag==0){
                            organization.contentFragmentList[idx].resourceList.push(object);
                        }
                    });
                }
            }
        });

    }

    console.log(JSON.stringify(organization));
    $.ajax({
        type: "POST",
        url: "/organization/saveOrganization",
        data:{params:JSON.stringify(organization)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                setCurrentOrganization(result.data);
                organization = result.data;

                if($("div[data-type=org_basic]").hasClass("selected")){
                    if($("#menu3").find("li").length>0){
                        $("#menu3").find("li").eq(0).click();
                    }else {
                        $("#tpl").empty();
                        var html="<div class=\"info_check step1\">";
                        html+="<div class=\"title\"> <i class=\"icon\"></i> <span> <strong>添加此机构特殊属性，可以提高审核通过率。</strong> <strong>点击增加自定义项进行编辑。</strong> </span>" ;
                        html+="</div>";
                        html+="<div class=\"buttons\"> <a href=\"javascript:addOrgCustom()\">增加自定义项</a> <a href=\"javascript:submitCheck()\">提交审核</a></div></div>";

                        $("#tpl").append(html);
                    }
                }else{

                    var length = $('li[data-type=longField]').length;
                    var index= 0;
                    $('li[data-type=longField]').each(function (idx,obj) {
                        if($(this).hasClass('selected')){
                            index=idx;
                        }
                    });
                    initCustomMenu(organization.id);
                    if(length>index+1){
                        $('li[data-type=longField]').eq(index+1).click();
                    }else{
                        $("#tpl").empty();
                        var html="<div class=\"info_check step1\">";
                        html+="<div class=\"title\"> <i class=\"icon\"></i> <span> <strong>添加此机构特殊属性，可以提高通过率。</strong> <strong>点击增加自定义项进行编辑。</strong> </span>" ;
                        html+="</div>";
                        html+="<div class=\"buttons\"> <a href=\"javascript:addCustom()\">增加自定义项</a> <a href=\"javascript:submitOrgCheck()\">提交审核</a></div></div>";

                        $("#tpl").append(html);
                    }
                }
            }
        },
        error: function (result, status) {
        }
    });
}

function  validataOrginztion(organization) {
    var flag = true;//验证结果标记
    if(orgAttributes == null){
        return false;
    }else{
        $.each(orgAttributes,function (index,obj) {
            $.each(organization.contentFragmentList,function (idx,c) {
                if(obj.id == c.attributeId){
                    if(obj.minLength==null || obj.minLength ==0){
                        //允许为空
                    }else if((obj.minLength>0 && c.content.length<obj.minLength)||(obj.maxLength>0 && c.content.length>obj.maxLength)){
                        flag=false;
                        if(obj.id==132){
                            $("#orgName").next().find("span").eq(0).text(obj.description);
                            $("#orgName").next().show();
                        }else{
                            $("#orgName").next().hide();
                        }
                        if(obj.id==133){
                            $("#orgPerson").next().find("span").eq(0).text(obj.description);
                            $("#orgPerson").next().show();
                        }else {
                            $("#orgPerson").next().hide();
                        }
                        if(obj.id==134){
                            $("#orgSummary").next().find("span").eq(0).text(obj.description);
                            $("#orgSummary").next().show();
                        }else{
                            $("#orgSummary").next().hide();
                        }
                        if(obj.id==135){
                            $("#webSite").next().find("span").eq(0).text(obj.description);
                            $("#webSite").next().show();
                        }else{
                            $("#webSite").next().hide();
                        }
                        if(obj.id==136){
                            $(".tips").next().find("span").eq(0).text(obj.description);
                            $(".tips").next().show();
                        }else{
                            $(".tips").next().hide();
                        }
                    }
                }
            });
        });
    }
    return flag;
}
/**
 * 获取机构属性相关信息
 */
function getOrganizationAttributes(){
    $.ajax({
        type: "POST",
        url: "/ichCategory/getAttributeList",
        data:{targetType:3},
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
           // console.log("1111--->",result);
            if(result.code==0){
                orgAttributes = result.data ;
            }
        },
        error: function (result, status) {
        }
    });
}
/**
 * 必填字段 加 * 处理
 */
function mustInputflag(){
    console.log(orgAttributes);
    if(orgAttributes != null){
        $.each(orgAttributes,function (index,obj) {
            if((obj.minLength>0 &&obj.minLength != null)||(obj.maxLength>0 && bj.maxLength != null)){
                if(obj.id==132){
                    $("#orgName").parent().prev().find("i").eq(0).text("*");
                }
                if(obj.id==133){
                    $("#orgPerson").parent().prev().find("i").eq(0).text("*");
                }
                if(obj.id==134){
                    $("#orgSummary").parent().prev().find("i").eq(0).text("*");
                }
                if(obj.id==135){
                    $("#webSite").parent().prev().find("i").eq(0).text("*");
                }
                if(obj.id==136){
                    $(".tips").parent().prev().find("i").eq(0).text("*");
                }
            }
        });
    }
}
//机构添加自定义
function addOrgCustom(){
    //$('div[data-type=longFieldCustom]').click();
    $('#tpl').load('./Tpl/longFieldCustom.html', function () {
            //projectPage.radioImage(); //上传题图
        upload.submit("image/organization/",0);
    });
}

function saveOrgCustom(next) {
    organization = getCurrentOrganization();
    if(organization == null || organization.id== null || typeof organization.id == "undefined"){
            tipBox.init("fail","请先填写 基础信息！",1500);
            return false;
    }

    if(!validateOrgCustom()) {
        return false;
    }

    var attr={};
    var contentFragment={};

    contentFragment.content = $("#longContent").val();
    contentFragment.attributeId=0;
    contentFragment.targetType=3;

    attr.dataType=5;//短字段
    attr.cnName=$("#attrName").val();
    attr.id=0;

    var resource={};
    var resourceList=[];

    //获取图片列表
    $("#images").find(".item").each(function () {
       /* var fullpath = $(this).find('img').eq(0).attr("src");
        var desc =  $(this).find('img').eq(0).next().val();
        var path = fullpath.substring(fullpath.lastIndexOf("/")+1);
        resource.uri=path;
        resource.description=desc;
        resourceList.push(cloneObj(resource));
*/
        var fullpath="";
        var desc="";
        var path="";
        var type="0";

        if($(this).find('img').length>0){
            fullpath = $(this).find('img').eq(0).attr("src");
            desc =  $(this).find('img').eq(0).next().val();
            path = fullpath.substring(fullpath.lastIndexOf("/")+1);
        }else{
            fullpath = $(this).find('video').eq(0).attr("src");
            desc =  $(this).find('video').eq(0).next().val();
            path = fullpath.substring(fullpath.lastIndexOf("/")+1);
            type ="1";
        }
        resource.type=type;
        resource.uri=path;
        resource.description=desc;
        resourceList.push(cloneObj(resource));

    });

    contentFragment.resourceList=resourceList;
    contentFragment.attribute=attr;
    contentFragment.targetId=organization.id;


    var org = getCurrentOrganization();
    org.contentFragmentList.push(contentFragment);

   // console.log(JSON.stringify(contentFragment));
    $.ajax({
        type: "POST",
        url: "/organization/saveOrganization",
        data:{params:JSON.stringify(org)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(result);
            if(result.code==0){

                setCurrentOrganization(result.data);
                //根据分类重新初始化 左侧菜单
                initCustomMenu(result.data.id);
                if(next==1){
                    $("#attrName").val("");
                    $("#longContent").val("");
                    $("#images").find('.item').remove();
                    //$(".preview").empty();
                    addOrgCustom();
                }else if(next == 0){
                    //do nothing
                    $("#tpl").empty();
                    var html="<div class=\"info_check step1\">";
                    html+="<div class=\"title\"> <i class=\"icon\"></i> <span> <strong>添加此机构特殊属性，可以提高通过率。</strong> <strong>点击增加自定义项进行编辑。</strong> </span>" ;
                    html+="</div>";
                    html+="<div class=\"buttons\"> <a href=\"javascript:void(0)\" onclick=\"addCustom()\">增加自定义项</a> <a href=\"javascript:void(0)\" onclick=\"submitOrgCheck()\">提交审核</a></div></div>";

                    $("#tpl").append(html);

                }else{


                }
            }else{
                alert("保存失败");
            }
        },
        error: function (result, status) {
        }
    });
}
function  validateOrgCustom() {
    var flag = true;
    var attrName = $("#attrName").val();
    if(attrName.length<1 || attrName.length>10){
        $("#attrName").parent().parent().next().find("span").eq(0).text("自定义名称在1-10字符之间");
        $("#attrName").parent().parent().next().show();
        // return false;
        flag = false;
    }else{
        $("#attrName").parent().parent().next().hide();
    }

    if($("#longContent").val()=="" ){
        $("#longContent").next().find("span").text("请填写自定义内容");
        $("#longContent").next().show();
        flag = false;
    }else{
        $("#longContent").next().hide();
    }
    return flag;
}
//提交审核
function submitOrgCheck() {
    organization.status=3;
    //验证是否可以提交
    $.ajax({
        type: "POST",
        url: "/organization/saveOrganization",
        data:{params:JSON.stringify(organization)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                //存储本地
                location.href="../ichProjectOver.html";
            }
        },
        error: function (result, status) {
        }
    });
}
//获取自定义菜单列表
function initCustomMenu(targetID) {
    $.ajax({
        type: "POST",
        url: "/ichCategory/getDefAttributeList",
        data:{targetType:13,targetId:targetID} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(result);
            if(result.code==0){
                $("#menu3").empty();
                $.each(result.data,function (index,obj) {
                    if(getLang()=="zh-CN"){
                        $("#menu3").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon selected\"></i><span data-id=\""+obj.id+"\">"+obj.cnName+"</span></li>");
                    }else{
                        $("#menu3").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon selected\"></i><span data-id=\""+obj.id+"\">"+obj.enName+"</span></li>");
                    }
                });
                $("#menu3").parent().show();
            }else{
                alert("获取自定义属性失败");
            }
        },
        error: function (result, status) {
        }
    });
}
//初始化 基础信息
function initBasicInfo() {

    ///$('.file_up').find('.preview').remove();

    var org = getCurrentOrganization();
    if(org != null){
        $.each(org.contentFragmentList,function (idx,obj) {
            if(obj.attributeId==132){
                $("#orgName").val(obj.content);
            }
            if(obj.attributeId==133){
                $("#orgPerson").val(obj.content);
            }
            if(obj.attributeId==134){
                $("#orgSummary").val(obj.content);
            }
            if(obj.attributeId==135){
                $("#webSite").val(obj.content);
            }
            if(obj.attributeId==136){
                $('.file_up').append('<img style="display: none;" class="preview" src="">')
                if(obj.resourceList != null && typeof (obj.resourceList) !="undefined" && obj.resourceList.length>0){
                    if(obj.resourceList[0].uri != ""){
                        $(".preview").attr("src",imgserver+"/image/organization/"+obj.resourceList[0].uri);
                        $(".preview").show();
                        $(".file_up").addClass("active");
                    }
                }
            }
        });
    }

}
//初始化 自定义信息
function initCustomAttribute(attrid) {
    $.each(organization.contentFragmentList,function (index,obj) {
        if(obj.attributeId == attrid){
            // flag = true;
            $("#longContent").val(obj.content);
            if(typeof(obj.resourceList) != 'undefined' && obj.resourceList !=null ){
                var html="";
                $.each(obj.resourceList,function (i,resource) {
                   /* if(i%2==0){
                        html+="<div class=\"item\" style=\"margin-right: 10px;\">";
                    }else{
                        html+="<div class=\"item\">";
                    }
                    html+="<img src="+imgserver+"/image/organization/"+resource.uri+" alt=\"\">";
                    html+= "<input type=\"text\" name=\"text\" placeholder=\"请输入标题\" value=\""+resource.description+"\">";
                    html+="<span class=\"remove\"><i data-id='"+resource.id+"'></i></span></div>";*/

                    if(i%2==0){
                        html+="<div class=\"item\" style=\"margin-right: 10px;\">";
                    }else{
                        html+="<div class=\"item\">";
                    }

                    if(resource.type=="0"){
                        html+="<img src="+imgserver+"/image/organization/"+resource.uri+" alt=\"\">";
                    }else{
                        html+="<video style=\"width: 100%;\" src="+imgserver+"/image/organization/"+resource.uri+" controls=\"\"></video>";
                    }

                    html+= "<input type=\"text\" name=\"text\" placeholder=\"请输入标题\" value=\""+resource.description+"\">";
                    html+="<span class=\"remove\"><i data-id='"+resource.id+"'></i></span></div>";

                });

                if(obj.resourceList.length>2){
                    $("#images").addClass("active");
                }
                $("#images").prepend(html);
            }
        }
    });
}
//删除自定义属性
function delOrgCustom(attrId){
    //通过属性id 找到当前对应的 contentFragmentID;
    var org=getCurrentOrganization();
    var cid=0;
    $.each(org.contentFragmentList,function (index,obj) {
        if(obj.attributeId==attrId){
            cid=obj.id;
        }
    });
    if(cid==0){
        //清除本地数据
        $('li[data-type=longField]').each(function (idx,obj) {
            if($(this).hasClass("selected")){
                $("#longContent").val("");
                if($(this).attr("target-type")==5){
                    $("#images").find('.item').remove();
                }
            }
        });
        return false;
    }
    var contentFragment={};
    contentFragment.id=cid;
    contentFragment.attributeId=attrId;
    contentFragment.targetType=13;
    contentFragment.targetId=org.id;

    console.log(contentFragment);

    $.ajax({
        type: "POST",
        url: "/contentFragment/deleteContentFragment",
        data:{params:JSON.stringify(contentFragment)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            // console.log(result);
            if(result.code==0){
                //判断是否是自定义属性
                var flag=false; //判断是否为自定义 标记
                var idx=-1;
                if($("#menu3").children().length>0){
                    $("#menu3").children().each(function (index,obj) {
                        if($(this).find('span').eq(0).attr('data-id')==attrId){
                            flag=true;
                            idx=index;
                            return false;
                        }
                    });
                }
                //是自定义 删除后刷新页面 非自定义 清空内容留在本地
                delOrgAttributetLocal(attrId);//删除本地缓存
                if(flag){
                    initCustomMenu(org.id);
                    //指定下一个选中状态   当删除 是自定义项
                    if($("#menu3").children().length>0){
                        if(idx==0){
                            $("#menu3").children().eq(0).click();
                        }else if($("#menu3").children().length>idx){
                            $("#menu3").children().eq(idx).click();
                        } else{
                            $("#menu3").children().eq(idx-1).click();
                        }
                    }else{
                        //选中上一个 菜单项 末尾子菜单
                        $('div[data-type=org_basic]').click();
                    }
                }else{

                }
                //提交按钮判断
                $(".handle").find('a').eq(2).removeClass('disabled').addClass('empty');

            }else{
                alert("保存失败");
            }

        },
        error: function (result, status) {
        }
    });

}
//根据 contentFragemntId 删除本地缓存
function delOrgAttributetLocal(attrId){
    var org = getCurrentOrganization();
    $.each(org.contentFragmentList,function (index,obj) {
        if(obj.attributeId == attrId){
            if(obj.attribute!=null && obj.attribute.targetType==13){//自定义 对象 本地删除
                org.contentFragmentList.splice(index,1);
            }else {
                org.contentFragmentList[index].content="";
                org.contentFragmentList[index].resourceList=null;
            }
            return  false;
        }
    });
    setCurrentOrganization(org);
}
//删除自定义图片
function delResourceImage(rid) {
    var flag = false;
    $.ajax({
        type: "POST",
        url: "/resource/deleteResource",
        data:{params:rid} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(result);
            if(result.code==0){
                flag = true;
            }
        },
        error: function (result, status) {
        }
    });
    return flag;
}
//预览
function organizationPreview(){
    var org = getCurrentOrganization();
    $.ajax({
        type: "POST",
        url: "/organization/preview",
        data:{params:org.id} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                //存储本地
                modal.loading({
                    success:function () {
                        //location.href="/tmp/"+ich.id+".html";
                        location.href="/organizationtmp/"+org.id+".html";
                    }
                });

            }
        },
        error: function (result, status) {
        }
    });
}
//提交
function submitOrganization() {
    var org = getCurrentOrganization();
    org.status=3;

    //验证是否可以提交
    $.ajax({
        type: "POST",
        url: "/organization/saveOrganization",
        data:{params:JSON.stringify(org)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                //存储本地
                location.href="../page/createMastorSelect.html";
            }
        },
        error: function (result, status) {
        }
    });
}
function  saveOrganiztionOnTop() {
    //判断当前选中状态
    if($('div[data-type=org_basic]').hasClass("selected")){
        var contentFragmentList = [];
        var contentFragment={};

        contentFragment.attributeId=132;
        contentFragment.content=$("#orgName").val();
        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        contentFragment={};
        contentFragment.attributeId=133;
        contentFragment.content=$("#orgPerson").val();
        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        contentFragment={};
        contentFragment.attributeId=134;
        contentFragment.content=$("#orgSummary").val();
        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        contentFragment={};
        contentFragment.attributeId=135;
        contentFragment.content=$("#webSite").val();
        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        contentFragment={};
        contentFragment.attributeId=136;

        var path = $(".preview").attr("src");
        if(path != "" && typeof (path) != "undefined"){
            path = path.substring(path.lastIndexOf("/")+1);
            contentFragment.content=path;

            var resource={};
            var resourceList=[];
            resource.uri=path;
            resource.type=0;
            resource.description='';
            resourceList.push(resource);
            contentFragment.resourceList=resourceList;
        }

        contentFragment.targetType=3;
        contentFragmentList.push(cloneObj(contentFragment));

        if(organization==null){
            organization={};
            organization.contentFragmentList = contentFragmentList;
        }else{
            $.each(contentFragmentList,function (index,obj) {
                $.each(organization.contentFragmentList,function (i,o) {
                    if(o.attributeId == obj.attributeId){
                        if(o.attributeId==136){
                            if(obj.resourceList != null && typeof (obj.resourceList)!="undefined" && obj.resourceList.length>0){
                                if(organization.contentFragmentList[i].resourceList != null && typeof organization.contentFragmentList[i].resourceList != "undefined" && organization.contentFragmentList[i].resourceList.length>0){
                                    organization.contentFragmentList[i].resourceList[0].uri=obj.resourceList[0].uri;
                                }else{
                                    organization.contentFragmentList[i].resourceList = obj.resourceList[0];
                                }
                            }else{
                                //不做修改
                            }

                        }else{
                            organization.contentFragmentList[i].content=obj.content;
                        }
                    }
                });
            });
        }
        if(!validataOrginztion(organization)){
            return false;
        }
    }else if($('div[data-type=longFieldCustom]').hasClass("selected")) {
        //保存自定义
        organization = getCurrentOrganization();
        if(organization == null || organization.id== null || typeof organization.id == "undefined"){
            tipBox.init("fail","请先填写 基础信息！",1500);
            return false;
        }

        if(!validateOrgCustom()) {
            return false;
        }

        var attr={};
        var contentFragment={};

        contentFragment.content = $("#longContent").val();
        contentFragment.attributeId=0;
        contentFragment.targetType=3;

        attr.dataType=5;//短字段
        attr.cnName=$("#attrName").val();
        attr.id=0;

        var resource={};
        var resourceList=[];

        //获取图片列表
        $("#images").find(".item").each(function () {
            /* var fullpath = $(this).find('img').eq(0).attr("src");
             var desc =  $(this).find('img').eq(0).next().val();
             var path = fullpath.substring(fullpath.lastIndexOf("/")+1);
             resource.uri=path;
             resource.description=desc;
             resourceList.push(cloneObj(resource));
             */
            var fullpath="";
            var desc="";
            var path="";
            var type="0";

            if($(this).find('img').length>0){
                fullpath = $(this).find('img').eq(0).attr("src");
                desc =  $(this).find('img').eq(0).next().val();
                path = fullpath.substring(fullpath.lastIndexOf("/")+1);
            }else{
                fullpath = $(this).find('video').eq(0).attr("src");
                desc =  $(this).find('video').eq(0).next().val();
                path = fullpath.substring(fullpath.lastIndexOf("/")+1);
                type ="1";
            }
            resource.type=type;
            resource.uri=path;
            resource.description=desc;
            resourceList.push(cloneObj(resource));

        });

        contentFragment.resourceList=resourceList;
        contentFragment.attribute=attr;
        contentFragment.targetId=organization.id;


        var org = getCurrentOrganization();
        org.contentFragmentList.push(contentFragment);

    } else{
        //获取当前id
        var attributeID = "";
        $('li[data-type=longField]').each(function () {
            if($(this).hasClass("selected")){
                attributeID = $(this).find("span").eq(0).attr("data-id");
            }
        });
        if(attributeID==""){
            return false;
        }
        //验证数据
        if(!validateOrgCustom()) {
            return false;
        }
        //更新本地缓存
        var resource={};
        var resourceList=[];

        //获取图片列表
        $("#images").find(".item").each(function () {
            var fullpath="";
            var desc="";
            var path="";
            var type="0";

            if($(this).find('img').length>0){
                fullpath = $(this).find('img').eq(0).attr("src");
                desc =  $(this).find('img').eq(0).next().val();
                path = fullpath.substring(fullpath.lastIndexOf("/")+1);
            }else{
                fullpath = $(this).find('video').eq(0).attr("src");
                desc =  $(this).find('video').eq(0).next().val();
                path = fullpath.substring(fullpath.lastIndexOf("/")+1);
                type ="1";
            }

            resource.uri=path;
            resource.description=desc;
            resourceList.push(cloneObj(resource));
        });

        var flag_1 =0;
        $.each(organization.contentFragmentList,function (idx,obj) {
            if(obj.attributeId == attributeID){
                flag_1=1;
                organization.contentFragmentList[idx].content=$("#longContent").val();
                organization.contentFragmentList[idx].attribute.cnName=$("#attrName").val();
                if(typeof (obj.resourceList) == 'undefined'){
                    organization.contentFragmentList[idx].resourceList = resourceList;
                }else{
                    $.each(resourceList,function (index,object) {
                        var flag = 0;
                        $.each(obj.resourceList,function (i,o) {
                            if(object.uri==o.uri){
                                flag=1;
                                o.description=object.description;
                            }
                        });
                        if(flag==0){
                            organization.contentFragmentList[idx].resourceList.push(object);
                        }
                    });
                }
            }
        });

    }

    $.ajax({
        type: "POST",
        url: "/organization/saveOrganization",
        data:{params:JSON.stringify(organization)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            //console.log(JSON.stringify(result));
            if(result.code==0){
                tipBox.init("success","保存成功",1500);
                setCurrentOrganization(result.data);
                organization = result.data;
                if(!$('div[data-type=org_basic]').hasClass("selected")){
                    var index= -1;
                    $('li[data-type=longField]').each(function (idx,obj) {
                        if($(this).hasClass('selected')){
                            index=idx;
                        }
                    });
                    initCustomMenu(organization.id);
                    if(index != -1){
                        $('li[data-type=longField]').eq(index).addClass("selected");
                    }else{
                        $('li[data-type=longField]').eq($('li[data-type=longField]').length-1).addClass("selected");
                    }
                }
            }
        },
        error: function (result, status) {
        }
    });
}
//通过id 获取机构信息
function getOrganizationById(orgid){

    $.ajax({
        type: "POST",
        url: "/organization/getOrganizationById",
        data:{params:orgid} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            //console.log(JSON.stringify(result));
            if(result.code==0){
                setCurrentOrganization(result.data);
                organization = result.data;
            }
        },
        error: function (result, status) {
        }
    });

}
//添加自定义
function addCustom(){
    $('div[data-type=longFieldCustom]').click();
}