//添加项目相关内容
var attributeData=[];
var saveAndnext=false;
//渲染左侧菜单页面
function renderLeftMenu(ich) {
    var jsondata={} ;
    var url="";
    if(typeof (ich.id)=="undefined"){
        url= "/ichCategory/getAttributeList";
        //{targetType:targetType,categoryId:categoryId}
        jsondata.targetType=0;
        jsondata.categoryId=0;
    }else{
        url = "/ichCategory/getAttributeListByCatIdAndProId";
        jsondata.proId=ich.id;
        if(typeof(ich.ichCategoryId) != "undefined"){
            jsondata.categoryId=ich.ichCategoryId;
        }
    }
    var data = loadPageData(url,jsondata);
    //console.log(data);
    initpage(data);
}

function  initCertRank() {
    var lang = getLang();
    var selectList;
    if(lang=='zh-CN'){
        selectList = getDictionaryArrayByType(103,'chi');
    }else{
        selectList = getDictionaryArrayByType(103,'eng');
    }
    //console.log(selectList);
    $("#certselect").append("<option value=''>请选择</option>");
    for(var i=0;i<selectList.length;i++) {
        $("#certselect").append("<option value='"+selectList[i].code+"'>"+selectList[i].name+"</option>");
    }
}

function initpage(data){
    //初始化 左侧菜单栏
    //<li class="active"><a href=""><i class="checkbox"></i><span>基本内容</span></a></li>
    if(typeof (data.data) != "undefined"){
        $("#menu").empty();
        $("#menu2").empty();

        $.each(data.data,function (index,obj) {
            ////长文本 或者图文
            if(obj.dataType==1 || obj.dataType==5 ){
                //过滤掉简介不再左侧显示
                if((!(obj.id==9 || obj.id==24 || obj.id==31)) && obj.ichCategoryId == 0){
                    //中英文切换  <li><i class="icon unselected"></i><span>传承谱系</span></li>
                    if(getLang()=="zh-CN"){
                        $("#menu").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.cnName+"</span></li>");
                    }else{
                        $("#menu").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.enName+"</span></li>");
                    }
                }

                if((!(obj.id==9 || obj.id==24 || obj.id==31)) && obj.ichCategoryId>0){
                    //中英文切换  <li><i class="icon unselected"></i><span>传承谱系</span></li>
                    if(getLang()=="zh-CN"){
                        $("#menu2").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.cnName+"</span></li>");
                    }else{
                        $("#menu2").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.enName+"</span></li>");
                    }
                }
            }else{
                //右侧字段生成
            }
        });
    }

    //初始化 右侧内容
}
//通过选中分类初始化 项目实战菜单
function initmenu2(dataType,categoryID) {

    var ich = getCurrentProject();
    var jsondata={} ;
    var url=""
    if(typeof (ich.id)=="undefined"){
        url= "/ichCategory/getAttributeList";
        //{targetType:targetType,categoryId:categoryId}
        jsondata.targetType=0;
        if(typeof(ich.ichCategoryId) == "undefined"){
            jsondata.categoryId=categoryID;
        }
    }else{
        url = "/ichCategory/getAttributeListByCatIdAndProId";
        jsondata.proId=ich.id;
        if(typeof(ich.ichCategoryId) != "undefined"){
            if(typeof (categoryID) != "undefined"){
                jsondata.categoryId=categoryID;
            }else{
                jsondata.categoryId=ich.ichCategoryId;
            }
        }
    }
    var data = loadPageData(url,jsondata);
    console.log(data);
    getDataByCateGoryId(data);
}

//请求服务器 获取 属性类型 targetType 标示类型
function loadPageData(url,jsondata) {
    var data ;
    $.ajax({
        type: "POST",
        url: url,
        data:jsondata,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log("1111--->",result);
            if(result.code==0){
                data = result;
                attributeData = result.data ;
            }
        },
        error: function (result, status) {
        }
    });
    return data;
}
//动态获取实践展示 根据分类id
function getDataByCateGoryId(data){
    //console.log(data);
    $("#menu2").empty();
    $("#menu").empty();
    $.each(data.data,function (index,obj) {
        if(obj.dataType==1 || obj.dataType==5 ){
            //过滤掉简介不再左侧显示
            if((!(obj.id==9 || obj.id==24 || obj.id==31)) && obj.ichCategoryId>0){
                //中英文切换  <li><i class="icon unselected"></i><span>传承谱系</span></li>
                if(getLang()=="zh-CN"){
                    $("#menu2").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.cnName+"</span></li>");
                }else{
                    $("#menu2").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.enName+"</span></li>");
                }
            }

            if((!(obj.id==9 || obj.id==24 || obj.id==31)) && obj.ichCategoryId == 0){
                //中英文切换  <li><i class="icon unselected"></i><span>传承谱系</span></li>
                if(getLang()=="zh-CN"){
                    $("#menu").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.cnName+"</span></li>");
                }else{
                    $("#menu").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.enName+"</span></li>");
                }
            }
        }else{
            //右侧字段生成
        }
    });
    //项目实践 合并 状态选中 控制
    var ich = getCurrentProject();

    if(typeof ich.contentFragmentList == "undefined" ||  typeof ich.contentFragmentList.length==0){
        return false;
    }

    $("#menu2").children("li").each(function () {
        var attrid = $(this).find("span").attr('data-id');
        var dataType = $(this).attr('target-type');
        var flag = 0;
        $.each(ich.contentFragmentList,function (index,obj) {
            if(attrid == obj.attributeId  ){
                if(dataType == 5){
                    if((obj.content == "" ||obj.content==null) && (obj.resourceList.length==0 || typeof(obj.resourceList)=="undefined")){
                        flag=1;
                    }else{
                        flag =2;
                    }
                }else{
                    if(obj.content == "" ){
                        flag=1;
                    }else{
                        flag=2;
                    }
                }
            }
        });

        if(flag == 1){
            $(this).find('i').eq(0).addClass('unselected2');
        }
        if(flag==2){
            $(this).find('i').eq(0).addClass('selected');
        }

    });
    $("#menu").children("li").each(function () {
        var attrid = $(this).find("span").attr('data-id');
        var dataType = $(this).attr('target-type');
        var flag = 0;
        $.each(ich.contentFragmentList,function (index,obj) {
            if(attrid == obj.attributeId){
                if(dataType == 5){
                    if((obj.content == "" ||obj.content==null) && (obj.resourceList.length==0 || typeof(obj.resourceList)=="undefined")){
                        flag=1;
                    }else{
                        flag=2;
                    }
                }else{
                    if(obj.content == "" ){
                        flag=1;
                    }else{
                        flag=2;
                    }
                }
            }
        });

        if(flag == 1){
            $(this).find('i').eq(0).addClass('unselected2');
        }
        if(flag==2){
            $(this).find('i').eq(0).addClass('selected');
        }
    });
}
function loadContentFragmentById(cid){
    $.ajax({
        type: "POST",
        url: "../ichCategory/getAttributeList",
        data:{contentFragmentID:cid,categoryId:0} ,
        dataType: "json",
        complete: function () { },
        success: function (result) {

        },
        error: function (result, status) {
        }
    });
}

function saveandnext() {
    //判断
    //修改状态
    //获取当前选中状态的按钮
     $(".ipt_base .slide .item .dd").find('li.active').next().click();
     //return false;
     // $("li .active").next().click();
}
//保存自定义菜单项
function  saveCustom(next) {

   if(!validateCustom()) {
       return false;
   }

    var attr={};
    var contentFragment={};

    contentFragment.content = $("#longContent").val();
    contentFragment.attributeId=0;
    contentFragment.targetType=0;

    attr.dataType=5;//短字段
    attr.cnName=$("#attrName").val();
    attr.id=0;

    var resource={};
    var resourceList=[];

    //获取图片列表
    $("#images").find(".item").each(function () {
        var fullpath = $(this).find('img').eq(0).attr("src");
        var desc =  $(this).find('img').eq(0).next().val();
        var path = fullpath.substring(fullpath.lastIndexOf("/")+1);
        resource.uri=path;
        resource.description=desc;
        resourceList.push(cloneObj(resource));
    });

    contentFragment.resourceList=resourceList;
    contentFragment.attribute=attr;
    contentFragment.targetId=getCurrentProject().id;

   // console.log(JSON.stringify(contentFragment));
    $.ajax({
        type: "POST",
        url: "../contentFragment/saveContentFragment",
        data:{params:JSON.stringify(contentFragment)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(result);
            if(result.code==0){
                var ich = getCurrentProject();
                ich.contentFragmentList.push(result.data);
                localStorage.setItem("ichProject",JSON.stringify(ich));
                //根据分类重新初始化 左侧菜单
                init3(result.data.targetId);
                if(next==1){
                    $("#attrName").val("");
                    $("#longContent").val("");
                    $("#images").find('.item').remove();
                    //$(".preview").empty();
                    $(".ipt_base .slide .item .dd").find('li.active').next().click();
                }else{
                    //do nothing
                    $("#tpl").empty();
                    var html="<div class=\"info_check step1\">";
                    html+="<div class=\"title\"> <i class=\"icon\"></i> <span> <strong>添加此项目特殊属性，可以提高项目通过率。</strong> <strong>点击增加自定义项进行编辑。</strong> </span>" ;
                    html+="</div>";
                    html+="<div class=\"buttons\"> <a href=\"javascript:addCustom()\">增加自定义项</a> <a href=\"javascript:submitCheck()\">提交审核</a></div></div>";

                    $("#tpl").append(html);
                }
            }else{
                alert("保存失败");
            }
        },
        error: function (result, status) {
        }
    });
}
function  validateCustom() {
    var flag = true;
    var attrName = $("#attrName").val();
    if(attrName.length<1 || attrName.length>10){
        $("#attrName").parent().parent().next().find("span").eq(0).text("自定义名称在1-10字符之间");
        $("#attrName").parent().parent().next().show();
       // return false;
        flag = false;
    }else{
        $("#attrName").parent().next().hide();
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

//根据项目id 初始化自定义属性列表
function init3(targetID) {
    $.ajax({
        type: "POST",
        url: "../ichCategory/getDefAttributeList",
        data:{targetType:10,targetId:targetID} ,
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

//删除此项
function  delContentFragment(aId) {
    //通过属性id 找到当前对应的 contentFragmentID
    var ich = getCurrentProject();
    var cid=0;
    $.each(ich.contentFragmentList,function (index,obj) {
        if(obj.attributeId==aId){
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
        init3(ich.id);
        return false;
    }
    var contentFragment={};
    contentFragment.id=cid;
    contentFragment.attributeId=aId;
    contentFragment.targetType=0;
    contentFragment.targetId=getCurrentProject().id;
    console.log(contentFragment);
    $.ajax({
        type: "POST",
        url: "../contentFragment/deleteContentFragment",
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
                     if($(this).find('span').eq(0).attr('data-id')==aId){
                         flag=true;
                         idx=index;
                         return false;
                     }
                 });
             }
             //是自定义 删除后刷新页面 非自定义 清空内容留在本地
             delContentFragmentLocal(aId);//删除本地缓存
             ich = getCurrentProject();
             if(flag){
                 //location.reload();
                 init3(ich.id);
                 //指定下一个选中状态   当删除 是自定义项
                 if($("#menu3").children().length>0){
                     if(idx==0){
                         $("#menu3").children().eq(0).click();
                     }else{
                         $("#menu3").children().eq(idx-1).click();
                     }
                 }else{
                     //选中上一个 菜单项 末尾子菜单
                     var clickindex=-1;
                     var length = $("#menu2").children().length;
                     for(var i=length-1;i>-1;i--){
                            if( $("#menu2").children().eq(i).find("i").hasClass("selected")||$("#menu2").children().eq(i).find("i").hasClass("unselected2")){
                                clickindex=i;
                                break;
                            }
                     }

                     if(clickindex==-1){
                         length = $("#menu").children().length;
                         for(var i=length-1;i>-1;i--){
                             if( $("#menu").children().eq(i).find("i").hasClass("selected")||$("#menu").children().eq(i).find("i").hasClass("unselected2")){
                                 clickindex=i;
                                 break;
                             }
                         }
                         if(clickindex==-1){ //未找到位置 点击 基础信息
                             $('div[data-type=proBaseInfo]').click();
                         }else{
                             $("#menu").children().eq(clickindex).click();
                         }
                     }else{
                         $("#menu2").children().eq(clickindex).click();
                     }
                 }
             }else{
                 //非自定义属性 下标索引获取
                 $("li[data-type=longField]").each(function (index) {
                        if($(this).hasClass("selected")){
                                idx = index;
                                return false;
                        }
                 });

                 //判断当前是否有分类
                 renderLeftMenu(ich);
                 initMenuStatus(ich);

                //清空内容
                 $("#longContent").val("");
                 $("#images").empty();
                 var clickindex=-1;
                 //删除后 去向  重新定位到以前 下标位置
                 if($("li[data-type=longField]").length > (idx) ){
                     if($("li[data-type=longField]").eq(idx).find("i").eq(0).hasClass("selected") || $("li[data-type=longField]").eq(idx).find("i").eq(0).hasClass("unselected2")){
                         $("li[data-type=longField]").eq(idx).click();
                     }else{
                         //向上选择可点击位置
                        for(var i=idx;-1<i;i--){
                            if($("li[data-type=longField]").eq(i).find("i").eq(0).hasClass("selected") || $("li[data-type=longField]").eq(i).find("i").eq(0).hasClass("unselected2")){
                                clickindex=i;
                                break;
                            }
                        }
                        if(clickindex>-1){
                            $("li[data-type=longField]").eq(clickindex).click();
                        }
                     }
                 }else{
                     $("li[data-type=longField]").eq(idx-1).click();
                 }



                 if($("li[data-type=longField]").length==0 ){//基础信息点中
                     $('div[data-type=proBaseInfo]').click();
                 }
                /* if(ich.ichCategoryId == null || typeof (ich.ichCategoryId) == "undefined"){
                  //无分类 情况
                      $("li[data-type=longField]").each(function () {
                          if($(this).hasClass("selected")){
                              if($(this).next()){
                                  $(this).next().click();
                              }else{
                                  if($(this).prev()){
                                      $(this).prev().click();
                                  }
                              }
                          }
                      });

                  }else{
                  //有分类情况
                  $("li[data-type=longField]").each(function () {
                      if($(this).hasClass("selected")){
                      if(typeof($(this).prev().html())!="undefined"){
                          $(this).removeClass("selected");
                          $(this).removeClass("unselected2");
                          $(this).prev().click();
                          }
                          }
                      });
                  }
                */

                 //去掉选中标记
                /* $("#menu").children().each(function () {
                     if($(this).find('span').eq(0).attr('data-id')==aId){
                         $(this).find('i').eq(0).removeClass('selected');
                     }
                 });

                 $("#menu2").children().each(function () {
                     if($(this).find('span').eq(0).attr('data-id')==aId){
                         $(this).find('i').eq(0).removeClass('selected');
                     }
                 });*/
             }
             //提交按钮判断
                $(".handle").find('a').eq(2).removeClass('disabled').addClass('empty');
              /*  $.each(ich.contentFragmentList,function (index,obj) {
                    if(obj.attributeId < 41 && 33<obj.attributeId && obj.content != null && obj.content.length>0){
                        opencheck= true;
                    }

                });

                if(opencheck){
                    $(".handle").find('a').eq(2).removeClass('disabled').addClass('empty');
                }else{
                    $(".handle").find('a').eq(2).removeClass('empty').addClass('disabled');
                }*/
            }else{
                alert("保存失败");
            }

        },
        error: function (result, status) {
        }
    });
}
//根据 contentFragemntId 删除本地缓存
function delContentFragmentLocal(attrId){
    var ich = getCurrentProject();
    $.each(ich.contentFragmentList,function (index,obj) {
        if(obj.attributeId == attrId){
            if(obj.attribute!=null && obj.attribute.targetType==10){//自定义 对象 本地删除
                ich.contentFragmentList.splice(index,1);
            }else {
                ich.contentFragmentList[index].content="";
                ich.contentFragmentList[index].resourceList=null;
            }
            return  false;
        }
    });
    localStorage.setItem("ichProject",JSON.stringify(ich));
}

function  saveContentPragment(attrid) {
    //验证数据
    var flag = false;
      $.each(attributeData,function (index,obj) {
            if(obj.id == attrid){
                if(obj.minLength==null || obj.minLength ==0){
                    flag = false;
                    return false;
                }else
                if(obj.minLength>0 && $("#longContent").val().length>0){
                    flag=true;
                    return false;
                }
            }
      });

    if(flag){//必填字段
        $("#longContent").next().show();
        return false;
    }

    //先通过 attributeID 在本地寻找是否有相应的 内容片断
    var contentFragment = getContentFragmentByID(attrid);
    if (typeof(contentFragment) == "undefined" || contentFragment== null){
        contentFragment={};
    }
    //在页面 获取数据 封装数据
    contentFragment.attributeId=attrid;
    contentFragment.content=$("#longContent").val();
    contentFragment.targetType=0;

    var resource={};
    var resourceList=[];

    //获取图片列表
    $("#images").find(".item").each(function () {
        var fullpath = $(this).find('img').eq(0).attr("src");
        var desc =  $(this).find('img').eq(0).next().val();
        var path = fullpath.substring(fullpath.lastIndexOf("/")+1);
        resource.uri=path;
        resource.description=desc;
        resourceList.push(cloneObj(resource));
    });
    contentFragment.resourceList=resourceList;

    var ich = getCurrentProject();
    if(typeof (ich.contentFragmentList)!="undefined" || ich.contentFragmentList.length>0){
        var flag_1 =0;
        $.each(ich.contentFragmentList,function (idx,obj) {
            if(obj.attributeId == attrid){
                flag_1=1;
                ich.contentFragmentList[idx].content=$("#longContent").val();
                if(typeof (obj.resourceList) == 'undefined'){
                    ich.contentFragmentList[idx].resourceList = resourceList;
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
                            ich.contentFragmentList[idx].resourceList.push(object);
                        }
                    });
                }
            }
        });

        if(flag_1==0){
            contentFragment.targetId=ich.id;
            contentFragment.targetType=0;
            ich.contentFragmentList.push(contentFragment);
        }
    }
    var temp={};
    if(typeof (ich.contentFragmentList)!="undefined" || ich.contentFragmentList.length>0){
        $.each(ich.contentFragmentList,function (idx,obj) {
            if(obj.attributeId == attrid){
                temp = obj;
            }
        });
    }
    //ich.status=2;
    //alert(JSON.stringify(temp));
    console.log(JSON.stringify(ich));
    //return false;
    $.ajax({
        type: "POST",
        //url: "../contentFragment/saveContentFragment",
        url: "../ichProject/saveIchProject",
        data:{params:JSON.stringify(ich)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                    localStorage.setItem("ichProject",JSON.stringify(result.data));
                    //跳转到下一菜单
                    var index=0;
                    $('li[data-type=longField]').each(function (idx,obj) {
                        if($(this).find('span').eq(0).attr('data-id')==attrid){
                            index=idx;
                        }
                    });
                    if($('li[data-type=longField]').length>index+1){
                        if($('li[data-type=longField]').hasClass("selected")){
                            $('li[data-type=longField]').each(function () {
                                if($(this).hasClass('selected')){
                                    if($("#longContent").val()==""){
                                        $(this).find("i").eq(0).removeClass("selected");
                                        $(this).find("i").eq(0).addClass("unselected2");
                                    }else {
                                        $(this).find("i").eq(0).removeClass("unselected2");
                                        $(this).find("i").eq(0).addClass("selected");
                                    }
                                }
                            });
                        }
                        $('li[data-type=longField]').removeClass("selected");
                       // $('li[data-type=longField]').eq(index).find("i").addClass('selected');
                        saveAndnext = true;
                        $('li[data-type=longField]').eq(index+1).click();
                    }else{
                        if($("#longContent").val()==""){
                            $('li[data-type=longField]').eq(index).find("i").removeClass('selected');
                            $('li[data-type=longField]').eq(index).find("i").addClass('unselected2');
                        }else{
                            $('li[data-type=longField]').eq(index).find("i").removeClass('unselected2');
                            $('li[data-type=longField]').eq(index).find("i").addClass('selected');
                        }

                        //do nothing
                        $("#tpl").empty();
                        var html="<div class=\"info_check step1\">";
                            html+="<div class=\"title\"> <i class=\"icon\"></i> <span> <strong>添加此项目特殊属性，可以提高项目通过率。</strong> <strong>点击增加自定义项进行编辑。</strong> </span>" ;
                            html+="</div>";
                            html+="<div class=\"buttons\"> <a href=\"javascript:addCustom()\">增加自定义项</a> <a href=\"javascript:submitCheck()\">提交审核</a></div></div>";

                        $("#tpl").append(html);
                    }
                    //判断开启提交按钮

                var opencheck = isMustAdd();

                if(opencheck){
                    $(".handle").find('a').eq(2).removeClass('disabled').addClass('empty');
                }else{
                    $(".handle").find('a').eq(2).removeClass('empty').addClass('disabled');
                }

                initMainMenuStatus();
            }else{
                alert("保存失败");
            }
        },
        error: function (result, status) {
        }
    });

}
//通过id 获取 ichProject
function  getichProById(id) {
    $.ajax({
        type: "POST",
        url: "../ichProject/getIchProjectById",
        data:{params:id} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            ichproject=result.data;
        },
        error: function (result, status) {
        }
    });
}

//在当前页面对象通过 attributeId 获取当前的contentFragment
function  getContentFragmentByID(attid) {

    var contentFragment=null;
    var ichproject = getCurrentProject();
    $.each(ichproject.contentFragmentList,function (i,obj) {
        if(obj.attributeId==attid){
            contentFragment = obj;
        }
    });
    return contentFragment;
}

function saveIchProject(page) {
    //本地缓存获取对象
    var ichjsonStr = localStorage.getItem("ichProject");
    //第一次添加操作
    var contentFragmentList = [];
    var ich = {};
    //console.log(ichjsonStr);
    if(typeof (ichjsonStr)=='undefined' || ichjsonStr == null) {
        //do nothing
    }else{
        ich = JSON.parse(ichjsonStr);
        console.log(JSON.stringify(ich));
        //contentFragmentList = ich.contentFragmentList;
    }

    if( $('div[data-type=proBaseInfo]').hasClass("selected")){//基础信息 点中

        var contentFragment={};

        //图上传成功本地保存图片
        var imgpath =  $('.preview').attr('src');
        //获取图片名称
        var path = imgpath.substring(imgpath.lastIndexOf("/")+1);
        //var attr={};

        if(path !=""){
            var resource={};
            var resourceList=[];
            contentFragment.attributeId=1;//题图
            resource.uri=path;
            resource.type=0;
            resource.description='';
            resourceList.push(resource);
            contentFragment.resourceList=resourceList;
            contentFragment.targetType=0;
            contentFragmentList.push(cloneObj(contentFragment));
            contentFragment={};
        }


        contentFragment.attributeId=9;//简介
        contentFragment.content=$("#summary").val();
        contentFragment.targetType=0;
        //attr.dataType=1;//长文本
        //contentFragment.targetType=0;
        //contentFragment.attribute=attr;
        contentFragmentList.push(cloneObj(contentFragment));
        contentFragment={};
        contentFragment.attributeId=6;//拼音
        contentFragment.content=$("#pinyin").val();
        //attr.dataType=0;//短文本
        contentFragment.targetType=0;
        //contentFragment.attribute=attr;
        contentFragmentList.push(cloneObj(contentFragment));
        contentFragment={};

        contentFragment.attributeId=5;//英文名
        contentFragment.content=$("#engName").val();
        //attr.dataType=0;//短文本
        contentFragment.targetType=0;

        //contentFragment.attribute=attr;
        contentFragmentList.push(cloneObj(contentFragment));
        contentFragment={};

        contentFragment.attributeId=4;//中文名
        contentFragment.content=$("#chiName").val();//中文名
        contentFragment.targetType=0;
        //attr.dataType=0;
        //contentFragment.attribute=attr;
        contentFragmentList.push(cloneObj(contentFragment));
        contentFragment={};

        contentFragment.attributeId=109;//开始年代
        contentFragment.content=$("#beginTimes").val();//
        contentFragment.targetType=0;
        //attr.dataType=0;
        //contentFragment.attribute=attr;
        contentFragmentList.push(cloneObj(contentFragment));
        contentFragment={};

        contentFragment.attributeId=108;//国家代码
        contentFragment.content=$("#countryCode").val();//中文名
        contentFragment.targetType=0;
        //attr.dataType=0;
        //contentFragment.attribute=attr;
        contentFragmentList.push(cloneObj(contentFragment));
        contentFragment={};

        contentFragment.attributeId=32;//主题词
        contentFragment.content=$("#titleWords").val();//中文名
        contentFragment.targetType=0;
        //attr.dataType=0;
        //contentFragment.attribute=attr;
        contentFragmentList.push(cloneObj(contentFragment));
        contentFragment={};


        contentFragment.attributeId=33;//区域
        if(localStorage.getItem("codes")== null){
            contentFragment.content="";
        }else{
            contentFragment.content=localStorage.getItem("codes");
        }
        contentFragment.targetType=0;

        contentFragmentList.push(cloneObj(contentFragment));
        contentFragment={};

        var val=$("input:radio[name='authenticated']:checked").val();
        if(typeof (val)=='undefined'){
            //alert("请选择是否已认证！"); return false;
        }

        if(val=="1"){
            contentFragment.attributeId=116;//认证时间
            contentFragment.content=$("#ECalendar_date").val();
            //attr.dataType=0;//短文本
            contentFragment.targetType=0;

            // contentFragment.attribute=attr;
            contentFragmentList.push(cloneObj(contentFragment));
            contentFragment={};

            contentFragment.attributeId=41;//认证级别
            contentFragment.content=$("#certselect").val();
            //attr.dataType=103;//字典码
            contentFragment.targetType=0;
            //contentFragment.attribute=attr;
            contentFragmentList.push(cloneObj(contentFragment));
            contentFragment={};
            contentFragment.attributeId=107;//认证编号
            contentFragment.content=$("#certCode").val();
            // attr.dataType=0;//短文本
            contentFragment.targetType=0;
            //contentFragment.attribute=attr;
            contentFragmentList.push(cloneObj(contentFragment));
            contentFragment={};
        }
        //添加自定义 属性值
        var flag = 0;
        $.each(contentFragmentList,function (index,obj) {
            flag = 0;
            if(typeof (ich.contentFragmentList)!="undefined" && ich.contentFragmentList.length>0){
                $.each(ich.contentFragmentList,function (idx,o) {
                    if(obj.attributeId == o.attributeId){
                        flag = 1;

                        if(obj.attributeId==1 && ich.contentFragmentList[idx].resourceList.length>0){//图片
                            ich.contentFragmentList[idx].resourceList[0].uri=obj.resourceList[0].uri;
                        }else{
                            ich.contentFragmentList[idx].content=obj.content;
                        }
                    }
                });
            }

            if(flag == 0){
                if( typeof (ich.contentFragmentList)=="undefined" || ich.contentFragmentList==null){
                    var temp =[];
                    temp.push(obj);
                    ich.contentFragmentList = temp;
                }else{
                    ich.contentFragmentList.push(obj);
                }
            }
        });
        //统一验证

        localStorage.setItem("ichProject",JSON.stringify(ich));

    }else if($('div[data-type=longFieldCustom]').hasClass("selected")){//添加自定义选中
        //添加自定义 选中
        var ich = getCurrentProject();
        var attr={};
        var contentFragment={};

        contentFragment.content = $("#longContent").val();
        contentFragment.attributeId=0;
        contentFragment.targetType=0;

        attr.dataType=5;//短字段
        attr.cnName=$("#attrName").val();
        attr.id=0;

        var resource={};
        var resourceList=[];

        //获取图片列表
        $("#images").find(".item").each(function () {
            var fullpath = $(this).find('img').eq(0).attr("src");
            var desc =  $(this).find('img').eq(0).next().val();
            var path = fullpath.substring(fullpath.lastIndexOf("/")+1);
            resource.uri=path;
            resource.description=desc;
            resourceList.push(cloneObj(resource));
        });

        contentFragment.resourceList=resourceList;
        contentFragment.attribute=attr;
        contentFragment.targetId=ich.id;

        ich.contentFragmentList.push(contentFragment);
    }
    else{  //修改其他子信息内容选中
        var attid;
        $('li[data-type=longField]').each(function () {
          if($(this).hasClass('selected')){
              attid = $(this).find('span').eq(0).attr('data-id');
              return false;
          }
        });

        var condition = getConditionByAttributeID(attid);
        if(condition.minLength>0 && $("#longContent").val().length<condition.minLength){
            $("#longContent").next().find('span').eq(0).text("文本内容的最小长度为"+condition.minLength).show();
            return false;
        }
        //先通过 attributeID 在本地寻找是否有相应的 内容片断
        var contentFragment = getContentFragmentByID(attid);
        if (typeof(contentFragment) == "undefined" || contentFragment== null){
            contentFragment={};
        }

        contentFragment.attributeId=attid;
        contentFragment.content=$("#longContent").val();
        contentFragment.targetType=0;

        var resource={};
        var resourceList=[];

        //获取图片列表
        $("#images").find(".item").each(function () {
            var fullpath = $(this).find('img').eq(0).attr("src");
            var desc =  $(this).find('img').eq(0).next().val();
            var path = fullpath.substring(fullpath.lastIndexOf("/")+1);
            resource.uri=path;
            resource.description=desc;
            resourceList.push(cloneObj(resource));
        });
        contentFragment.resourceList=resourceList;

        var ich = getCurrentProject();
        if(typeof (ich.contentFragmentList)!="undefined" || ich.contentFragmentList.length>0){
            var flag_1 =0;
            $.each(ich.contentFragmentList,function (idx,obj) {
                if(obj.attributeId == attid){
                    flag_1=1;
                    ich.contentFragmentList[idx].content=$("#longContent").val();
                    if(typeof (obj.resourceList) == 'undefined'){
                        ich.contentFragmentList[idx].resourceList = resourceList;
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
                                ich.contentFragmentList[idx].resourceList.push(object);
                            }
                        });
                    }
                }
            });

            if(flag_1==0){
                contentFragment.targetId=ich.id;
                contentFragment.targetType=0;
                ich.contentFragmentList.push(contentFragment);
            }
        }
      /*  var temp={};
        if(typeof (ich.contentFragmentList)!="undefined" || ich.contentFragmentList.length>0){
            $.each(ich.contentFragmentList,function (idx,obj) {
                if(obj.attributeId == attid){
                    temp = obj;
                }
            });
        }*/
    }

    //获取当前分类数据
    if($("div[data-type=selectCate]").attr("value") != "undefined"){
        ich.ichCategoryId=$("div[data-type=selectCate]").attr("value");
    }

  $.ajax({
        type: "POST",
        url: "../ichProject/saveIchProject",
        data:{params:JSON.stringify(ich)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                //存储本地
                /*if(page == 1){
                    tipBox.init("success","保存成功",1500);
                }*/
                localStorage.setItem("ichProject",JSON.stringify(result.data));
                //跳下一步操作
                if(page==0){
                    //当前信息完善
                    $('div[data-type=proBaseInfo]').removeClass("selected");
                    $('div[data-type=proBaseInfo]').find("i").addClass('selected');
                    saveAndnext = true;
                    if( $("#menu").find("li").length>0){
                        $("#menu").find("li")[0].click();
                    }
                }else{
                    tipBox.init("success","保存成功",1500);
                    //$('div[data-type=proBaseInfo]').removeClass("selected");
                    $('div[data-type=proBaseInfo]').find("i").addClass('selected');

                    if($('li[data-type=longField]').hasClass("selected")){

                        $('li[data-type=longField]').each(function () {

                            if($(this).hasClass('selected')){
                                if($("#longContent").val()==""){
                                    $(this).find("i").eq(0).removeClass("selected");
                                    $(this).find("i").eq(0).addClass("unselected2");
                                }else {
                                    $(this).find("i").eq(0).addClass("selected");
                                }
                            }
                        });
                    }

                }

            //提交按钮开启
              var opencheck = isMustAdd();

              if(opencheck){
                  $(".handle").find('a').eq(2).removeClass('disabled').addClass('empty');
              }else{
                  $(".handle").find('a').eq(2).removeClass('empty').addClass('disabled');
              }

              if($('div[data-type=longFieldCustom]').hasClass("selected")){
                  console.log(result.data.id);
                  init3(result.data.id);
              }
              initMainMenuStatus();
            }else if(result.code==3){
                //tipBox.init("fail",result.msg,1500);
                $('.header .content .info li.login').click();
            }else {
                //tipBox.init("fail",result.msg,1500);
            }
        },
        error: function (result, status) {
        }
    });
}

function getCurrentProject(){
    var ich = localStorage.getItem("ichProject");
    //console.log(ich);
    if(typeof(ich) == "undefined" || ich == null||ich==''){
        ich={};
    }else{
        ich = JSON.parse(ich);
    }
    return ich;
}

//表单验证
function vaidateForm(ich) {

    var flag = true;
    if(ich.ichCategoryId == null || typeof (ich.ichCategoryId) == "undefined"){
       $("div[data-type=selectCate]").next().show();
    }else{
        $("div[data-type=selectCate]").next().hide();
    }
    var val=$("input:radio[name='authenticated']:checked").val();

    var isImage=false;
    var patten=/^[a-zA-Z \s]{1,20}$/;
    $.each(ich.contentFragmentList,function (index,obj) {
        console.log(JSON.stringify(obj));

        if(obj.attributeId==9 && (obj.content.length<20 || obj.content.length>200)){
            $("#summary").next().show();
            $("#summary").focus();
            flag = false;
        }
        else if(obj.attributeId==9){
            $("#summary").next().hide();
        }

        if(obj.attributeId==1){
            isImage = true;
        }

        if(obj.attributeId==33 && obj.content==""){
            $("#area").next().show();
            flag = false;
            //return false;
        }else if(obj.attributeId==33){
            $("#area").next().hide();
        }

        if(obj.attributeId==6 && (obj.content.length<1 || obj.content.length>50)){
            $("#pinyin").next().show();
            $("#pinyin").focus();
            flag = false;
            //return false;
        }else if(obj.attributeId==6){

            if( !patten.test( obj.content)){
                flag = false;
                $("#pinyin").next().show();
                $("#pinyin").focus();
            }else{
                $("#pinyin").next().hide();
            }

        }

        if(obj.attributeId==5 && (obj.content.length<1 || obj.content.length>50)){
            $("#engName").next().show();
            $("#engName").focus();
            flag = false;
           // return false;
        }else if(obj.attributeId==5){

            if(!patten.test( obj.content)){
                flag = false;
                $("#engName").next().show();
                $("#engName").focus();
            }else{
                $("#engName").next().hide();
            }
        }

        if(val=="1"){
            if(obj.attributeId==116 && obj.content==""){
                //$("#ECalendar_date").next().show();
                flag = false;
                //return false;
            }

            if(obj.attributeId==41 && obj.content==""){
                $("#certselect").next().show();
                flag = false;
                //return false;
            }else if(obj.attributeId==41){
                $("#certselect").next().hide();
            }

            if(obj.attributeId==107 && obj.content==""){
                $("#certCode").next().show();
                flag = false;
                //return false;
            }else if(obj.attributeId==107){
                $("#certCode").next().hide();
            }

        }
    });

    if(!isImage){
        $(".tips").next().show();
        flag = false;
    }else{
        $(".tips").next().hide();
    }
    return flag;
}
function  initProjectView(ich) {

    if(localStorage.getItem("action")=="update" && (ich == null || typeof (ich) == "undefined")){
        return;
    }
    if(ich.id == null || typeof (ich.id) == "undefined"){
        ich = {};
        renderLeftMenu(ich);
        $('div[data-type=proBaseInfo]').click();
        //选中状态补全
        $('div[data-type=proBaseInfo]').find("i").addClass('selected');
    }else {
        $('div[data-type=proBaseInfo]').click();
        //选中状态补全
        $('div[data-type=proBaseInfo]').find("i").addClass('selected');
        //项目内容
        renderLeftMenu(ich);
        //通过分类选择 项目实战
        //initmenu2(0,ich.ichCategoryId);
        initMenuStatus(ich);//初始化 按钮状态
        //初始化 自定义属性
        init3(ich.id);
        //修改提交按钮状态
        if(ich.id != null && typeof (ich.id) != 'undefined'){
            $(".handle").find('a').eq(2).removeClass('disabled').addClass('empty');
        }
    }
}
function initMenuStatus(ich) {
    if(ich.contentFragmentList!= null && typeof (ich.contentFragmentList) != 'undefined'){
        $('li[data-type=longField]').each(function () {
            if(localStorage.getItem("action")=="add"){
                var dataid = $(this).find('span').eq(0).attr('data-id');
                var flag = 0;
                $.each(ich.contentFragmentList,function (idx,obj) {
                    if(obj.attributeId == dataid ){

                        if(obj.content==""){
                            flag = 2;
                        }else{
                            flag = 1;
                        }
                    }
                });
                if(flag==1){
                    // $(this).find('i').eq(0).addClass("full checked");
                    $(this).find('i').eq(0).addClass("selected");
                }else if(flag==2){
                    //$(this).find('i').eq(0).addClass("empty checked");
                    $(this).find('i').eq(0).addClass("unselected2");
                }else{
                    //$(this).find('i').eq(0).removeClass("full unchecked ");
                }
            }else{
                ///$(this).find('i').eq(0).addClass("selected");
                var dataid = $(this).find('span').eq(0).attr('data-id');
                var flag = 0;
                $.each(ich.contentFragmentList,function (idx,obj) {
                    if(obj.attributeId == dataid ){

                        if(obj.content==""){
                            flag = 2;
                        }else{
                            flag = 1;
                        }
                        return false;
                    }
                });
                if(flag==1){
                    $(this).find('i').eq(0).addClass("selected");
                }else if(flag==2){
                    $(this).find('i').eq(0).addClass("unselected2");
                }else{
                    $(this).find('i').eq(0).removeClass("selected ");
                    $(this).find('i').eq(0).removeClass("unselected2");
                }
            }
        });

        //修改主菜单 状态 查看当前内容是否完整
        initMainMenuStatus();
    }
}

function initMainMenuStatus() {
    var flag = 0;
    $("#menu").find("li").each(function () {
        if(!$(this).find("i").eq(0).hasClass("selected")&&!$(this).find("i").eq(0).hasClass("unselected2")){
            flag = 1;
            return false;
        }
    });
    if(flag == 0){
        $("#menu").parent().prev().find("i").eq(0).addClass("selected");
    }else{
        $("#menu").parent().prev().find("i").eq(0).removeClass("selected");
    }
    flag = 0;
    $("#menu2").find("li").each(function () {
        if(!$(this).find("i").eq(0).hasClass("selected")&&!$(this).find("i").eq(0).hasClass("unselected2")){
            flag = 1;
            return false;
        }
    });
    if(flag == 0){
        $("#menu2").parent().prev().find("i").eq(0).addClass("selected");
    }else{
        $("#menu2").parent().prev().find("i").eq(0).removeClass("selected");
    }
}
function  next(attrId) {
    var index=0;
    $('li[data-type=longField]').each(function (idx,obj) {
        if($(this).find('span').eq(0).attr('data-id')==attrId){
            index=idx;
        }
    });
    if($('li[data-type=longField]').length>index+1){
        $('li[data-type=longField]').eq(index+1).click();
    }else{
        //do nothing
    }
}
//添加自定义
function addCustom(){
    $('div[data-type=longFieldCustom]').click();
}
function submitCheck() {

    var ich = getCurrentProject();
    ich.status=3;

    //验证是否可以提交
    $.ajax({
        type: "POST",
        url: "../ichProject/saveIchProject",
        data:{params:JSON.stringify(ich)} ,
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
function ichProjectpreview(){
    var ich = getCurrentProject();
    $.ajax({
        type: "POST",
        url: "../ichProject/preview",
        data:{params:ich.id} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                //存储本地
                location.href="/tmp/"+ich.id+".html";
            }
        },
        error: function (result, status) {
        }
    });
}
//验证 是否已经添加基础信息 否则不能点击其他 菜单按钮
function  validateIchID() {
    var ich = getCurrentProject();
    if(ich.id==null || typeof(ich.id) =='undefined'){
        return  false;
    }else{
        return true;
    }
}
function getIchProByID(pid) {
    console.log(pid);
    var ich={};
    $.ajax({
        type: "POST",
        url: "/ichProject/getIchProjectById",
        data:{params:pid} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(result);
            if(result.code==0){
                ich = result.data;
            }
        },
        error: function (result, status) {
        }
    });
    return ich;
}


function delImage(rid) {
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
//通过属性id 获取判断条件
function getConditionByAttributeID(attid){
    var condition={};
    $.each(attributeData,function (index,obj) {
        if(obj.id == attid){
            if(obj.minLength==null || obj.minLength ==0){
                condition.minLength=0;
            }else if(obj.minLength>0){
                condition.minLength=obj.minLength
            }

            if(obj.maxLength==null || obj.maxLength ==0){
                condition.maxLength=0;
            }else if(obj.maxLength>0){
                condition.maxLength=obj.maxLength
            }
        }
    });
    return condition;
}
//判断 所有必填字段是否 已经添加
function isMustAdd() {
    var ich = getCurrentProject();
    var hasAddMust=true;//默认所有必填 都已添加

    $.each(attributeData,function (index,obj) {
        //外层 判断是否为必填字段
        var flag = false;//必填字段标记
        var hasSavedata = false;//必填数据是否 已添加标记

    });
    return　hasAddMust;
}
//初始化
function  initProjectData() {
    var pid = $.getUrlParam("pid");
    var ich = getCurrentProject();

    if(pid == null ||  typeof(pid)=='undefined' ){
        localStorage.setItem('action',"add");
        $("#chiName").val(localStorage.getItem('ichProName'));
        $(".name").text('填写申报信息-'+localStorage.getItem('ichProName'));
    }else{
        localStorage.setItem('action',"update");//添加修改标记状态
        var code="";
        $.each(ich.contentFragmentList,function (idnex,object) {
            if(object.attributeId==4){//获取用户中文名信息
                $(".name").text('编辑申报信息-'+object.content);
                $("#chiName").val(object.content);
            }
            if(object.attributeId==33){//获取区域code 值
                code = object.content;
            }
        });
        //初始化本地区域 文本数据
        if(code != ""){
            localStorage.setItem("codes",code);
            toArray(dic_arr_city);
            var codeText=[];
            if(code.indexOf(",") != -1){
                var codes = code.split(",");
                for(var i=0;i<codes.length;i++){
                    var str="";
                    var obj=getAreaName(codes[i],dic_arr_city);
                    str=obj.name;
                    while (obj.parent_id>0){
                        obj=getAreaName(obj.parent_id,dic_arr_city);
                        str=obj.name+str;
                    }
                    codeText.push(str);
                }
            }else{
                var str="";
                var obj=getAreaName(code,dic_arr_city);
                if(obj != null && typeof(obj) != "undefined"){
                    str=obj.name;
                    while (obj.parent_id>0){
                        obj=getAreaName(obj.parent_id,dic_arr_city);
                        str=obj.name+str;
                    }
                    codeText.push(str);
                }
            }
            //console.log(JSON.stringify(codeText));
            localStorage.setItem("codeText",codeText.join(","));
        }
        localStorage.setItem("ichProject",JSON.stringify(ich));
    }
}
function validateBasicInfo() {
    
}
