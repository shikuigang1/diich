//添加项目相关内容
var basticTemplate ="";

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

function initpage(data){
    //初始化 左侧菜单栏
    //<li class="active"><a href=""><i class="checkbox"></i><span>基本内容</span></a></li>
    $.each(data.data,function (index,obj) {
        ////长文本 或者图文
        if(obj.dataType==1 || obj.dataType==5 ){
            //过滤掉简介不再左侧显示
            if(!(obj.id==9 || obj.id==24 || obj.id==31)){
                //中英文切换  <li><i class="icon unselected"></i><span>传承谱系</span></li>
                if(getLang()=="zh-CN"){
                    $("#menu").append("<li><i class=\"icon selected\"></i><span data-id=\""+obj.id+"\">"+obj.cnName+"</span></li>");
            }else{
                    $("#menu").append("<li><i class=\"icon unselected\"></i><span data-id=\""+obj.id+"\">"+obj.enName+"</span></li>");
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
            $("#menu2").append("<li><li class=\"icon unselected\"></i><span>"+obj.cnName+"</span></li>");
        }else{
            $("#menu2").append("<li><li class=\"icon unselected\"></i><span>"+obj.enName+"</span></li>");
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

function  saveContentPragment(attrid) {
    //先通过 attributeID 在本地寻找是否有相应的 内容片断
    var contentFragment = getContentFragmentByID(attrid);

    if (typeof(contentFragment) == "undefined"){
        contentFragment={};
    }
    //在页面 获取数据 封装数据

    $.ajax({
        type: "POST",
        url: "../contentFragment/saveContentFragment",
        data:{params:contentFragment} ,
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

    var contentFragment;
    $.each(ichproject.contentFragmentList,function (i,obj) {
        if(obj.attributeId==attid){
            contentFragment = obj;
            return false;
        }
    })
    return contentFragment;
}

function saveIchProject() {
    //本地缓存获取对象
    var ichProject = localStorage.getItem("ichProject");
    if(typeof (ichProject)=='undefined'){

    }

    //获取本地
    $.ajax({
        type: "POST",
        url: "../ichProject/saveIchProject",
        data:{params:JSON.stringify(ichproject)} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            if(result.code==0){
                alert(result.msg);
            }
        },
        error: function (result, status) {
        }
    });
}