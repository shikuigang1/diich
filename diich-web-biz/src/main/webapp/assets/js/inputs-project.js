//添加项目相关内容

//页面渲染
function renderpage(){

}

//页面校验
function checkPageInputs(){

}

//渲染左侧菜单页面
function renderLeftMenu(bytype) {
    //初始化页面
    var data = loadPageData(bytype,0);
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
    console.log(selectList);
    for(var i=0;i<selectList.length;i++) {
        $("#certselect").append("<option value='"+selectList[i].code+"'>"+selectList[i].name+"</option>");
    }
}

function initpage(data){
    //初始化 左侧菜单栏
    //<li class="active"><a href=""><i class="checkbox"></i><span>基本内容</span></a></li>
    //console.log(data);
    $.each(data.data,function (index,obj) {
        ////长文本 或者图文
        if(obj.dataType==1 || obj.dataType==5 ){
            //过滤掉简介不再左侧显示
            if(!(obj.id==9 || obj.id==24 || obj.id==31)){
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
    //初始化 右侧内容
}
//通过选中分类初始化 项目实战菜单
function initmenu2(targetType,categoryId) {
    var data = loadPageData(targetType,categoryId);
    getDataByCateGoryId(data);
}

//请求服务器 获取 属性类型 targetType 标示类型
function loadPageData(targetType,categoryId) {

    var data ;
    $.ajax({
        type: "POST",
        url: "../ichCategory/getAttributeList",
        data:{targetType:targetType,categoryId:categoryId} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(result);
            if(result.code==0){
                data = result;
            }
        },
        error: function (result, status) {
        }
    });
    return data;
}
//动态获取实践展示 根据分类id
function getDataByCateGoryId(data){
    $("#menu2").empty();
    $.each(data.data,function (index,obj) {
        if(getLang()=="zh-CN"){
            $("#menu2").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.cnName+"</span></li>");
        }else{
            $("#menu2").append("<li data-type='longField' target-type=\""+obj.dataType+"\"><i class=\"icon\"></i><span data-id=\""+obj.id+"\">"+obj.enName+"</span></li>");
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

    validateCustom();

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

    console.log(JSON.stringify(contentFragment));
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

  //  alert($("#attrName").val().trim().length);
    if($("#attrName").val()==""|| $("#attrName").val().trim().length==0){
        $("#attrName").next().show();
        return false;
    }

    if($("#longContent").val()==""){
        $("#longContent").next().show();
        return false;
    }

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
function  delContentFragment(attrId) {
    //通过属性id 找到当前对应的 contentFragmentID
    var ich = getCurrentProject();
    var cid=0;
    $.each(ich.contentFragmentList,function (index,obj) {
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

        init3(ich.id);
        return false;
    }
     console.log(cid);
    $.ajax({
        type: "POST",
        url: "../contentFragment/deleteContentFragment",
        data:{params:cid} ,
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
             delContentFragmentLocal(attrId);//删除本地缓存
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
                     if($("#menu2").children().length>0){
                         $("#menu2").children().eq($("#menu2").children().length-1).click();
                     }
                 }

             }else{
                //清空内容
                 $("#longContent").val("");
                 $("#images").empty();
                 //去掉选中标记
                 $("#menu").children().each(function () {
                     if($(this).find('span').eq(0).attr('data-id')==attrId){
                         $(this).find('i').eq(0).removeClass('selected');
                     }
                 });

                 $("#menu1").children().each(function () {
                     if($(this).find('span').eq(0).attr('data-id')==attrId){
                         $(this).find('i').eq(0).removeClass('selected');
                     }
                 });
             }
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
            ich.contentFragmentList.splice(index,1);
            return  false;
        }
    });
    localStorage.setItem("ichProject",JSON.stringify(ich));
}


function  saveContentPragment(attrid) {
    //先通过 attributeID 在本地寻找是否有相应的 内容片断
    var contentFragment = getContentFragmentByID(attrid);

    if (typeof(contentFragment) == "undefined" || contentFragment== null){
        contentFragment={};
    }
    //在页面 获取数据 封装数据

    if($("#longContent").val().trim()==''){
        alert("请添加文本");
        return false;
    }
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
                flag_1=1
                ich.contentFragmentList[idx].content=$("#longContent").val();
                if(typeof (obj.resourceList) == 'undefined'){
                    ich.contentFragmentList[idx].resourceList = resourceList;
                }else{
                    $.each(resourceList,function (index,object) {
                        var flag = 0;
                        $.each(obj.resourceList,function (i,o) {
                                if(object.uri==o.uri){
                                    flag=1;
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

    //alert(JSON.stringify(temp));
    console.log(JSON.stringify(temp));
    //return false;
    $.ajax({
        type: "POST",
        url: "../contentFragment/saveContentFragment",
        data:{params:JSON.stringify(temp)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(result);
            if(result.code==0){
                    var ich = getCurrentProject();

                    var flag =0;
                    $.each(ich.contentFragmentList,function (index,obj) {
                        if(obj.attributeId == result.data.attributeId){
                            flag =1;
                            ich.contentFragmentList[index]=result.data;
                        }
                    });
                    if(flag==0){
                        ich.contentFragmentList.push(result.data);
                    }
                    //console.log(JSON.stringify(ich));
                    localStorage.setItem("ichProject",JSON.stringify(ich));
                    //跳转到下一菜单
                    $('li[data-type=longField]').removeClass("selected");
                    var index=0;
                    $('li[data-type=longField]').each(function (idx,obj) {
                        if($(this).find('span').eq(0).attr('data-id')==attrid){
                            index=idx;
                        }
                    });
                    if($('li[data-type=longField]').length>index+1){
                        $('li[data-type=longField]').eq(index).find("i").addClass('selected');
                        $('li[data-type=longField]').eq(index+1).click();
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
        //contentFragmentList = ich.contentFragmentList;
    }
        //var attr={};//contentFragment 内部属性对象
        var contentFragment={};

        contentFragment.attributeId=9;//简介
        contentFragment.content=$("#summary").val();
        contentFragment.targetType=0;
        //attr.dataType=1;//长文本
        contentFragment.targetType=0;
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
        //判断是否 为已经认证项目

        var val=$("input:radio[name='authenticated']:checked").val();

        if(typeof (val)=='undefined'){
            alert("请选择是否已认证！"); return false;
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
            contentFragment.attributeId=108;//认证编号
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
           if(typeof (ich.contentFragmentList)!="undefined" || ich.contentFragmentList.length>0){
               $.each(ich.contentFragmentList,function (idx,o) {
                   if(obj.attributeId == o.attributeId){
                       flag = 1;

                       if(obj.attributeId==1){//图片
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
       // ich.contentFragmentList=contentFragmentList;
        ich.status=2;
        localStorage.setItem("ichProject",JSON.stringify(ich));
        console.log(JSON.stringify(ich));
        vaidateForm(ich);

    //获取本地
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
                localStorage.setItem("ichProject",JSON.stringify(result.data));
                //跳下一步操作
                if(page==0){
                    //当前信息完善
                    $('div[data-type=proBaseInfo]').removeClass("selected");
                    $('div[data-type=proBaseInfo]').find("i").addClass('selected');
                    $("#menu").find("li")[0].click();
                }else{
                    $('div[data-type=proBaseInfo]').removeClass("selected");
                    $('div[data-type=proBaseInfo]').find("i").addClass('selected');
                }
            }
            //提交按钮开启 默认 只要保存基本信息 就可以提交
            $(".handle").find('a').eq(2).removeClass('disabled').addClass('empty');
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

    if(ich.ichCategoryId == null || typeof (ich.ichCategoryId) == "undefined"){
       $("div[data-type=selectCate]").next().show();
    }
    var val=$("input:radio[name='authenticated']:checked").val();
    $.each(ich.contentFragmentList,function (index,obj) {

        if(obj.attributeId==9 && obj.content==""){
            $("#summary").next().show();
            $("#summary").focus();
            return false;
        }

        if(obj.attributeId==33 && obj.content==""){
            $("#select").next().show();
            return false;
        }

        if(obj.attributeId==6 && obj.content==""){
            alert(obj.content +"###");
            $("#pinyin").next().show();

            return false;
        }

        if(obj.attributeId==5 && obj.content==""){
            $("#engName").next().show();

            return false;
        }

        if(val=="1"){

            if(obj.attributeId==116 && obj.content==""){
                $("#certTime").next().show();
                return false;
            }

            if(obj.attributeId==41 && obj.content==""){
                $("#certselect").next().show();
                return false;
            }

            if(obj.attributeId==108 && obj.content==""){
                $("#certCode").next().show();
                return false;
            }

        }
    });

    if ($("#summary").val() == "") {
        alert("请填写简介！");
        return false;
    }

    if ($("#pinyin").val() == "") {
        alert("请填写拼音！");
        return false;
    }
}
function  initProjectView(ich) {
    if(ich.ichCategoryId == null || typeof (ich.ichCategoryId) == "undefined"){

    }else {
        $('div[data-type=proBaseInfo]').click();
        //选中状态补全
        $('div[data-type=proBaseInfo]').find("i").addClass('selected');
        //通过分类选择 项目实战
        initmenu2(0,ich.ichCategoryId);

        if(ich.contentFragmentList!= null && typeof (ich.contentFragmentList) != 'undefined'){

            $('li[data-type=longField]').each(function () {

                var dataid = $(this).find('span').eq(0).attr('data-id');

                var flag = 0;
                $.each(ich.contentFragmentList,function (idx,obj) {
                    if(obj.attributeId == dataid ){
                        flag = 1;
                    }
                });
                if(flag==1){
                    $(this).find('i').eq(0).addClass("selected");
                }
                //==
            });
        }
        //初始化 自定义属性
        init3(ich.id);
        //修改提交按钮状态
        if(ich.id != null && typeof (ich.id) != 'undefined'){
            $(".handle").find('a').eq(2).removeClass('disabled').addClass('empty');
        }
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
                location.href="../page/ichProjectOver.html";
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
                location.href="../page/"+ich.id+".html";
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
    var ich={};
    $.ajax({
        type: "POST",
        url: "../ichProject/getIchProjectById",
        data:{params:pid} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            if(result.code==0){
                ich = result.data;
            }
        },
        error: function (result, status) {
        }
    });
    return ich;
}