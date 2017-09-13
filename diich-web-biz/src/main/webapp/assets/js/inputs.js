//上传图片
var codes=null;//区域代码值
var codesText="";//区域代码字符串值
var upload={
    template:function (type) {//0是视频  1是图片 url上传的地址
        var _name='';
        _name=(type==1)?'file':'video';
        var _parent='<form class="upload" method = "POST" action="" method="post" enctype="multipart/form-data">'+
            '<input class="_token" type="hidden" name="OSSAccessKeyId" value="">'+
            '<input class="_token" type="hidden" name="policy" value="">'+
            '<input class="_token" type="hidden" name="Signature" value="">'+
            '<input class="_token" type="hidden" name="key" value="">'+
            '<input class="_token" type="hidden" name="Filename" value="">'+
            '<input class="_token" type="hidden" name="success_action_status" value="200">'+
            '<div class="progress">' +
            '<div class="ui loader" style="width: 40px;height: 40px;position: absolute;top: 50%;left: 50%;display: block;"></div>'+
            '</div>' +
            '<input class="file" type="file" id="file" name="file">'+
            '</form>';
        return _parent;
    },

    // code 0项目 1传承人
    submit:function (filePath, code, callback) {
        //获取相关信息
        var _this=this;
        $('.file_up').append(_this.template());
        // $(document).find('.file').off();
        $('.file').change(function () {
            var parent=$(this).parents('.file_up');
            var preview=parent.find('.preview');
            var _form = $(this).parents('.upload');
            var progress=_form.find('.progress');
            var bar=progress.find('.bar');
            var percent=progress.find('.percent');
            var path = $(this).val();
            var imgType  = path.substring(path.lastIndexOf(".")+1);
            var  serverInfo = send_request();
            var host =serverInfo["host"];
            var accessId =serverInfo["accessid"];
            var policy = serverInfo["policy"];
            var signature = serverInfo["signature"];
            var key =filePath+ serverInfo["filename"]+"."+imgType;//生成文件路径
            var signature = serverInfo["signature"];
            //
            $("input[name='OSSAccessKeyId']").val(accessId);
            $("input[name='policy']").val(policy);
            $("input[name='Signature']").val(signature);
            $("input[name='key']").val(key);
            _form.attr("action",host);

            _form.ajaxSubmit({
                dataType: 'json',
                beforeSend: function () {
                    var percentVal = '0%';
                    progress.show();
                    bar.width(percentVal);
                },
                uploadProgress: function (event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal);
                },
                //模版
                //    function templateItem(str) {
                //    var newStr = str[0];
                //    // 常用图片格式
                //    var imgArr = [".BMP", ".PCX", ".PNG", ".JPEG", ".GIF", ".TIFF", ".JPG", ".ICO", ".TIF",
                //        ".bmp", ".pcx", ".png", ".jpeg", ".gif", ".tiff", ".jpg", ".ico", ".tif"];
                //    if(imgArr.indexOf(str[0].substr(str[0].lastIndexOf("."), str[0].length).toString()) < 0) {
                //        var localhostPaht = window.document.location.href.substring(0,window.document.location.href.indexOf(window.document.location.pathname))
                //        newStr = localhostPaht + "/assets/images/inputs/play.jpg";
                //    }
                //    var templ='<div class="item">' +
                //        '<img data-src="' + str[0] + '" src="' + newStr + '" alt="">' +
                //        '<input type="text" name="text" placeholder="请输入标题">' +
                //        '<span id="remove_delete" class="remove"><i></i></span>'+
                //        '</div>';
                //    return templ;
                //    data-src="'+ data.src +'"
                //}
                success: function () {
                    var data={};
                    data.code=0;
                    data.src=host+"/"+key;
                    bar.width('');
                    parent.addClass('active');
                    progress.hide();

                    var _images=$('#images');
                    if(code == 0) {
                        //长字段 项目
                        if(!$('div').hasClass('control')){
                            var d=/\.[^\.]+$/.exec(data.src);
                            if(d=='.mp4'){
                                var templ = '<div class="item">' +
                                    '<video data-src="' + data.src + '" style="width: 100%;" src="' + data.src + '" controls></video>' +
                                    '<input type="text" name="text" placeholder="请输入标题">' +
                                    '<span id="remove_delete" class="remove"><i></i></span>' +
                                    '</div>';

                                _images.find('.handle').before(templ);
                            }else if (d=='.jpg' || d=='.gif' || d=='.png' || d=='.JPEG') {
                                var templ = '<div class="item">' +
                                    '<img data-src="' + data.src + '" src="' + data.src + '" alt="">' +
                                    '<input type="text" name="text" placeholder="请输入标题">' +
                                    '<span id="remove_delete" class="remove"><i></i></span>' +
                                    '</div>';
                                _images.find('.handle').before(templ);
                            }
                        }else {//题图
                            $('.file_up').find('.preview').remove();
                            $('.file_up').append('<img style="display: block;" class="preview" src="'+data.src+'">')
                        }
                        upload.isItemStatus();
                        upload.remove(filePath); //删除图片
                    } else {
                        // 传承人
                        if(!$('div').hasClass('control')){
                            var d=/\.[^\.]+$/.exec(data.src);
                            if(d=='.mp4'){
                                var templ = '<div class="item">' +
                                    '<video data-src="' + data.src + '" style="width: 100%;" src="' + data.src + '" controls></video>' +
                                    '<input type="text" name="text" placeholder="请输入标题">' +
                                    '<span id="remove_delete" class="remove"><i></i></span>' +
                                    '</div>';

                                _images.find('.handle').before(templ);
                            }else if (d=='.jpg' || d=='.gif' || d=='.png' || d=='.JPEG') {
                                var templ = '<div class="item">' +
                                    '<img data-src="' + data.src + '" src="' + data.src + '" alt="" data-src="' + data.src + '">' +
                                    '<input type="text" name="text" placeholder="请输入标题">' +
                                    '<span id="remove_delete" class="remove"><i></i></span>' +
                                    '</div>';
                                _images.find('.handle').before(templ);
                            }
                        }else {//题图
                            $('.file_up').find('.preview').remove();
                            $('.file_up').append('<img style="display: block;" class="preview" src="'+data.src+'">')
                        }
                        upload.isItemStatus();
                    }

                    if(callback && callback!='undefined'){
                        callback(data);
                    }
                },
                error: function (xhr) {
                    var data={};
                    data.code=0;
                    data.src=host+"/"+key;
                    bar.width('');
                    parent.addClass('active');
                    progress.hide();

                    var _images=$('#images');
                    if(code == 0) {
                        //长字段 项目
                        if(!$('div').hasClass('control')){
                            var d=/\.[^\.]+$/.exec(data.src);
                            if(d=='.mp4'){
                                var templ = '<div class="item">' +
                                    '<video style="width: 100%;" src="' + data.src + '" controls></video>' +
                                    '<input type="text" name="text" placeholder="请输入标题">' +
                                    '<span id="remove_delete" class="remove"><i></i></span>' +
                                    '</div>';

                                _images.find('.handle').before(templ);
                            }else if (d=='.jpg' || d=='.gif' || d=='.png' || d=='.JPEG') {
                                var templ = '<div class="item">' +
                                    '<img src="' + data.src + '" alt="">' +
                                    '<input type="text" name="text" placeholder="请输入标题">' +
                                    '<span id="remove_delete" class="remove"><i></i></span>' +
                                    '</div>';
                                _images.find('.handle').before(templ);
                            }
                        }else {//题图
                            $('.file_up').find('.preview').remove();
                            $('.file_up').append('<img style="display: block;" class="preview" src="'+data.src+'">')
                        }
                        upload.isItemStatus();
                        upload.remove(filePath); //删除图片
                    } else {
                        // 传承人
                        if(!$('div').hasClass('control')){
                            var d=/\.[^\.]+$/.exec(data.src);
                            if(d=='.mp4'){
                                var templ = '<div class="item">' +
                                    '<video data-src="' + data.src + '" style="width: 100%;" src="' + data.src + '" controls ></video>' +
                                    '<input type="text" name="text" placeholder="请输入标题">' +
                                    '<span id="remove_delete" class="remove"><i></i></span>' +
                                    '</div>';

                                _images.find('.handle').before(templ);
                            }else if (d=='.jpg' || d=='.gif' || d=='.png' || d=='.JPEG') {
                                var templ = '<div class="item">' +
                                    '<img src="' + data.src + '" alt="" data-src="' + data.src + '">' +
                                    '<input type="text" name="text" placeholder="请输入标题">' +
                                    '<span id="remove_delete" class="remove"><i></i></span>' +
                                    '</div>';
                                _images.find('.handle').before(templ);
                            }
                        }else {//题图
                            $('.file_up').find('.preview').remove();
                            $('.file_up').append('<img style="display: block;" class="preview" src="'+data.src+'">')
                        }
                        upload.isItemStatus();
                    }

                    if(callback && callback!='undefined'){
                        callback(data);
                    }
                }
            });
        });
    },
    isItemStatus:function () {
        //判断上传图片的状态
        var _images=$('#images');
        var _item = _images.find('.item');
        if (_item.length >= 3) {
            _images.addClass('active');
        }
        _images.find('.item:even').css('margin-right', '10px');
    },
    remove:function (filePath) {
        $('#images').on('click','.remove i',function () {
            //console.log(filePath);
            var rid = $(this).attr("data-id");
            if(filePath.indexOf("organization") != -1){
                var imageIsExsit=false;
                $.each(organization.contentFragmentList,function (index,obj) {
                    if(obj.resourceList != null && typeof(obj.resourceList)!="undefined" && obj.resourceList.length>0 ){
                        $.each(obj.resourceList,function (i,o) {
                            if(o.id==rid){
                                imageIsExsit = true;
                                return false;
                            }
                        });
                    }
                });

                if(imageIsExsit){ //本地存在 进行删除操作
                    if(delResourceImage(rid)){
                        tipBox.init("success","删除成功！",1500);
                        //删除图片在本地缓存
                        $.each(organization.contentFragmentList,function (index,obj) {
                            if(obj.resourceList != null && typeof(obj.resourceList)!="undefined" && obj.resourceList.length>0 ){
                                $.each(obj.resourceList,function (i,o) {
                                    if(o.id==rid){
                                        organization.contentFragmentList[index].resourceList.splice(i,1);
                                        setCurrentOrganization(organization);
                                        return false;
                                    }
                                });
                            }
                        });

                    }else{
                        tipBox.init("fail","删除失败！",1500);
                    }
                }else{
                    //do nothing
                }
            }else if(filePath.indexOf("project") != -1){
                //判断本地图片是否存在
                var imageIsExsit=false;
                var ich = getCurrentProject();
                $.each(ich.contentFragmentList,function (index,obj) {

                    if(obj.resourceList != null && typeof(obj.resourceList)!="undefined" && obj.resourceList.length>0 ){

                        $.each(obj.resourceList,function (i,o) {
                            if(o.id==rid){
                                imageIsExsit = true;
                                return false;
                            }
                        });
                    }

                });

                if(imageIsExsit){ //本地存在 进行删除操作
                    if(delImage(rid)){
                        tipBox.init("success","删除成功！",1500);
                        //删除图片在本地缓存
                        var ich = getCurrentProject();
                        $.each(ich.contentFragmentList,function (index,obj) {

                            if(obj.resourceList != null && typeof(obj.resourceList)!="undefined" && obj.resourceList.length>0 ){

                                $.each(obj.resourceList,function (i,o) {
                                    if(o.id==rid){
                                        var res = obj.resourceList;
                                        //console.log(res.splice(i,1).length);
                                        res.splice(i,1);
                                        ich.contentFragmentList[index].resourceList=res;
                                        return false;
                                    }
                                });
                            }

                        });
                        //localStorage.setItem("ichProject",JSON.stringify(ich));
                        setCurrentProject(ich);
                    }else{
                        tipBox.init("fail","删除失败！",1500);
                    }
                }else{

                }
            }

            console.log(rid);
            $(this).parents('.item').remove();
            // upload.isItemStatus();

        });
    }
};

//选择地域
var selectArea={
    init:function (type,initVal,callback) {
        if(type==0){
            this.bind(initVal,callback);
        }else{
            this.radio(initVal,callback);
        }

    },
    template:function (data) {
        var _dom='';
        if(data.length!=0){
            for(var i=0;i<data.length;i++){
                _dom+='<li data-code="'+data[i].code+'"><span>'+data[i].name+'</span></li>';
            }
            return '<ul>'+_dom+'</ul>';
        }else {
            return '';
        }
    },
    initDom:function (data) {//获取国家
        var temp='<div class="tab">' +
            '  <span style="display: block;"><strong>请选择</strong><i class="icon"></i><em class="icon"></em></span>' +
            '  <span><strong>请选择</strong><i class="icon"></i></span>' +
            '  <span style="margin-right:0"><strong>请选择</strong><i class="icon"></i></span>' +
            '</div>' +
            '<div class="con">' +
            '  <div class="items scrollbar" data-type="level1"" style="display:block">'+ this.template(data) +'</div>'+
            '  <div class="items scrollbar" data-type="level2""></div>'+
            '  <div class="items scrollbar" data-type="level3""></div>'+
            '</div>';
        return temp;
    },
    bind:function (initVal,callback) {
        var _this=this;
        var result=[];
        var resultText=[];

        if(initVal && initVal.result){
            result=initVal.result;
            resultText=initVal.resultText;
        }

        if($.getUrlParam("pid")==null){
            result=[];
            resultText=[];
        }

        var area=$('#area');
        var select=$('#select');
        var selected=$('#selected');
        var isFirst=true;
        $('div[data-type=selectArea]').on('click',function (e) {
            e.preventDefault();
            e.stopPropagation();
            if(isFirst){
                isFirst=false;
                var el=$(this);
                var data2=[];
                var data3=[];
                var store=''; //临时
                var storeText=''; //临时
                //初始化dom
                select.append(_this.initDom(dic_arr_city)).show();
                area.show();
                var tab= select.find('.tab span');
                var items= select.find('.items');
                var items1=items.eq(0);
                var items2=items.eq(1);
                var items3=items.eq(2);

                //1.点击第一个
                items1.on('click','li',function () {
                    var _index=$(this).index();
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    data2=dic_arr_city[_index].children;
                    items.hide().html('');
                    items2.html('').append(_this.template(data2)).show();
                    isTab(data2.length,0,_text,_code);
                });
                //2.点击第二个
                items2.on('click','li',function () {
                    var _index=$(this).index();
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    data3=data2[_index].children;
                    items.hide().html('');
                    items3.html('').append(_this.template(data3)).show();
                    isTab(data3.length,1,_text,_code);
                });
                //2.点击第三个
                items3.on('click','li',function () {
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    tab.removeClass('selected');
                    isTab(0,2,_text,_code);
                });
                //tab标签状态
                function isTab(size,index,text,code) {//a索引  b选中的文字 c是code值
                    tab.removeClass('selected');
                    tab.eq(index).addClass('active selected').find('strong').text(text);
                    tab.eq(index+1).show();
                    store=code;
                    storeText+=text;
                    //当没有子数据的时候赋值给result
                    if(size==0 && index==0){
                        assignValue();
                        isFirst=true;
                    }
                    //当选择区县的时候把数据赋值给result
                    if(index==2){
                        assignValue();
                        isFirst=true;
                    }

                    function assignValue() {
                        //去重处理
                        var flag = true;
                        $.each(result,function (index,obj) {
                            if(obj==store){
                                flag =false;
                            }
                        });
                        if(flag){
                            result.push(store);
                            resultText.push(storeText);
                            //localStorage.setItem("codeText",resultText.join(","));
                            codesText = resultText.join(",");
                            createSelected(storeText);
                            select.html('').hide();
                            el.attr('value',result);
                            if(callback && callback!='undefined'){
                                callback(result, resultText);
                            }
                        }
                    }
                }
                //创建选中元素
                function createSelected(data) {
                    selected.append('<li><span>'+data+'<i class="icon"></i></span></li>');
                }
                //关闭
                select.on('click',function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                $(document).on("click", function () {
                    isFirst=true;
                    select.hide().html('');
                });
            }
        });
        //删除选中的数据
        selected.on('click','li',function () {
            var _index=$(this).index();
            $(this).remove();
            result.splice(_index,1);
            resultText.splice(_index,1);
           // localStorage.setItem("codeText",resultText.join(","));
            codesText = resultText.join(",");
            if(callback && callback!='undefined'){
                callback(result,resultText);
            }
            //删除本地缓存
        });
    },
    radio:function (callback) {
        var _this=this;
        var result=[];
        var resultText=[];

        var codeText = codesText;
        if(codeText != null && typeof (codeText) !="undefined"){
            resultText = codeText.split(",");
        }

        var area=$('#area');
        var select=$('#select');
        var selected=$('#selected');
        var isFirst=true;
        $('div[data-type=selectArea]').on('click',function () {
            if(isFirst){
                isFirst=false;
                var el=$(this);
                var data2=[];
                var data3=[];
                var store=''; //临时
                var storeText=''; //临时
                //初始化dom
                select.append(_this.initDom(dic_arr_city)).show();
                area.show();
                var tab= select.find('.tab span');
                var items= select.find('.items');
                var items1=items.eq(0);
                var items2=items.eq(1);
                var items3=items.eq(2);

                //1.点击第一个
                items1.on('click','li',function () {
                    var _index=$(this).index();
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    data2=dic_arr_city[_index].children;
                    items.hide().html('');
                    items2.html('').append(_this.template(data2)).show();
                    isTab(data2.length,0,_text,_code);
                });

                //2.点击第二个
                items2.on('click','li',function () {
                    var _index=$(this).index();
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    data3=data2[_index].children;
                    items.hide().html('');
                    items3.html('').append(_this.template(data3)).show();
                    isTab(data3.length,1,_text,_code);
                });

                //2.点击第三个
                items3.on('click','li',function () {
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    tab.removeClass('selected');
                    isTab(0,2,_text,_code);
                });

                //tab标签状态
                function isTab(size,index,text,code) {//a索引  b选中的文字 c是code值
                    tab.removeClass('selected');
                    tab.eq(index).addClass('active selected').find('strong').text(text);
                    tab.eq(index+1).show();
                    store=code;
                    storeText+=text;
                    selected.html('');
                    //当没有子数据的时候赋值给result
                    if(size==0 && index==0){
                        assignValue();
                        isFirst=true;
                    }
                    //当选择区县的时候把数据赋值给result
                    if(index==2){
                        assignValue();
                        isFirst=true;
                    }

                    function assignValue() {
                        result=result.splice(1,1);
                        result.push(store);
                        resultText.push(storeText);
                        createSelected(storeText);
                        select.html('').hide();
                        el.attr('value',result);
                        if(callback && callback!='undefined'){
                            callback(result);
                        }
                    }
                }
                //创建选中元素
                function createSelected(data) {
                    selected.append('<li><span>'+data+'<i class="icon"></i></span></li>');
                }
            }
        });
        //删除选中的数据
        selected.on('click','span',function () {
            var _index=$(this).index();
            $(this).parents('li').remove();
            result.splice(_index,1);
            if(callback && callback!='undefined'){
                callback(result);
            }
            //删除本地缓存数据
        });
    }
};

//项目表单
var projectPage={
    init:function () {
        var _this=this;
        $('#tpl').load('./Tpl/proBaseInfo.html',function () {//加载基本信息页面
            _this.bind();
            upload.submit('image/project/',0);
            //projectPage.uploadImgage(); //上传题图
        });
        this.slideBar.init(); //左侧菜单
        //弱当前缓存有数据则在本地 查找并添加
        var ich = getCurrentProject();
        initProjectView(ich);
    },
    bind:function (areaData) {
        //初始化区域数据
        var areaData={};
        var result = codes;
        var resultText = codesText;

        if(result!= null && resultText!=null){
            if(typeof(result)!= "undefined" && result.length>0){
                areaData.result = result.split(",");
            }else{
                areaData.result=[];
            }

            if(typeof(resultText)!= "undefined" &&resultText.length>0){
                areaData.resultText = resultText.split(",") ;
            }else{
                areaData.resultText=[];
            }
        }
        //初始化 一级分类数据
        /*  var _data=[
         {value:1,name:'口头传说和表述'},
         {value:11,name:'表演艺术'},
         {value:28,name:'社会风俗、礼仪、节庆'},
         {value:55,name:'有关自然界和宇宙的知识和实践'},
         {value:67,name:'传统的手工艺技能'}
         ];*/
        var _data=[];
        var _datatemp= getCategoryList(0); //数据库字段太长 暂不使用
        $.each(_datatemp,function (idx,obj) {
            var o = {};
            o.value=obj.id;
            o.name= obj.name;

            _data.push(o);
        });

        this.selectCate.init('div[data-type=selectCate]',_data); //选择分类
        this.declare();  //是否为自己申报传承人
        selectArea.init(0,areaData,function (data) {//选择地址 0是选择地址的类型 0是多选 1是单选
            //把每次code 值存在本地
            //localStorage.setItem("codes",data.join(","));
            codes = data.join(",");
    //        console.log(codes);
        });
    },
    slideBar:{//左侧菜单
        init:function () {
            this.effect();
        },
        effect:function () {
            var _this=this;
            var slide=$('.ipt_base .slide');
            var dt=slide.find('.dt');
            var dd=slide.find('.dd');
            dd.find('li:last-child').css('margin-bottom','0');
            //点击dt 展开收起
            dt.on('click',function () {
                var _dateType=$(this).attr('data-type');
                if((!validateIchID()) && (_dateType !='proBaseInfo') ){
                    //tipBox.init('fail','请先填写基础信息',1500);
                    tipBox.init('fail','请先填写基础信息',1500);
                    return false;
                }

                var _dd=$(this).siblings('.dd');
                if(_dd.length>0){
                    _dd.slideToggle(100);
                }
                //添加选中
                $(".dt").removeClass("selected");
                $(this).addClass("selected");
                $('li[data-type=longField]').removeClass("selected");

                if(typeof (_dateType) != 'undefined'){
                    //移除其他选中
                    $('#tpl').load('./Tpl/'+_dateType+'.html',function () {
                        projectPage.bind();
                        if(_dateType == 'proBaseInfo'){

                            $(".editListen").on("click",function () {
                                editFlag = true;
                            });

                            upload.submit('image/project/',0);
                            //重新初始化 分类信息  认证信息
                            initCertRank();
                            var ich = getCurrentProject();
                            if(typeof (ich)!= "undefined"){

                                var str = getCategoryTextById(ich.ichCategoryId);
                                if(str != "非遗项目"){
                                    $('div[data-type=selectCate]').text(str);
                                    $('div[data-type=selectCate]').attr("value",ich.ichCategoryId);
                                }
                                //判断分类按钮是否可以编辑
                                /* if(localStorage.getItem("action")=='update'&& getCurrentProject().ichCategoryId !=null ){
                                 $('div[data-type=selectCate]').before('<div style="width: 100%;float:left;background:#fff;border: 0;z-index:2;">'+str+'</div>');
                                 $('div[data-type=selectCate]').remove();
                                 }*/
                                //填充题图
                                //是否为已认证项目 标记
                                var flag = 0;
                                if(typeof ich.contentFragmentList != "undefined"){
                                    $.each(ich.contentFragmentList,function (idx,obj) {
                                        //填充题图
                                        if(obj.attributeId == 1 && obj.resourceList.length>0){
                                            var uri = obj.resourceList[0].uri;
                                            if(uri != null && uri != "" && typeof(uri) != "undefined" ){
                                                $('.file_up').append('<img style="display: block;" class="preview" src="'+imgserver+"/image/project/"+uri+'">')
                                                //$(".preview").attr("src",imgserver+"/image/organization/"+obj.resourceList[0].uri);
                                                //$(".preview").show();
                                                $(".file_up").addClass("active");
                                            }

                                            /*$(".preview").attr("src",imgserver+"/image/project/"+uri).show();
                                             $(".preview").parent().addClass('active');*/
                                        }

                                        if(obj.attributeId == 116 && obj.content != ''){
                                            flag=1;
                                            $("#ECalendar_date").val(obj.content);
                                        }
                                        if(obj.attributeId == 107 && obj.content != ''){
                                            flag=1;
                                            $("#certCode").val(obj.content);
                                        }
                                        if(obj.attributeId == 9 && obj.content != ''){
                                            $("#summary").val(obj.content);
                                        }
                                        if(obj.attributeId == 6 && obj.content != ''){
                                            $("#pinyin").val(obj.content);
                                        }
                                        if(obj.attributeId == 5 && obj.content != ''){
                                            $("#engName").val(obj.content);
                                        }
                                        if(obj.attributeId == 41 && obj.content != ''){
                                            $("#certselect").val(obj.content);
                                        }
                                        if(obj.attributeId == 109 && obj.content != ''){
                                            $("#beginTimes").val(obj.content);
                                        }
                                        if(obj.attributeId == 108 && obj.content != ''){
                                            $("#countryCode").val(obj.content);
                                        }
                                        if(obj.attributeId == 32 && obj.content != ''){
                                            $("#titleWords").val(obj.content);
                                        }
                                        if(obj.attributeId == 2 && obj.content != ''){
                                            $("#doi").val(obj.content);
                                        }
                                    });
                                }

                                //显示选中内容
                                if(flag==1){
                                    $('.horizontal .group .radio').eq(0).click();
                                }
                                //区域值
                                //var codeText=localStorage.getItem("codeText");
                                var codeText= codesText;
                                if(codeText != null && codeText !="" && typeof (codeText) !="undefined"){
                                    var codeTextList = codeText.split(",");
                                    if(codeTextList !=  null || typeof(codeTextList)!= 'undefined' ){
                                        for(var i=0;i<codeTextList.length;i++){
                                            $("#selected").append('<li><span>'+codeTextList[i]+'<i class="icon"></i></span></li>');
                                        }
                                        $("#area").show();
                                        $('#select').hide();
                                    }
                                }
                                //分类值回填
                                //填充 是否为 已申报传承人
                            }
                        }else if(_dateType == 'longFieldCustom'){

                            upload.submit('image/project/',0);
                        }

                    });
                }
            });

            //点击子分类
            dd.on('click','li',function () {
                var attrid=$(this).children("span").first().attr('data-id');
                var _dateType=$(this).attr('data-type');
                //判断当前 是否可以编辑（父菜单未完成 状态子菜单不可编辑）
                var flag = false;//当前是否可点击标记

                if(typeof ($(this).prev().html())!="undefined" && $(this).prev().html()!=null){ //判断上一级 对象是否侧你在
                    //查看上一级 菜单的 编辑状态
                    if($(this).prev().find('i').eq(0).hasClass('selected') || $(this).prev().find('i').eq(0).hasClass('unselected2')){
                        flag = true;
                    }
                    if($(this).find('i').eq(0).hasClass('selected') || $(this).find('i').eq(0).hasClass('unselected2')){
                        flag = true;
                    }
                    if(!flag){
                        if(!validateIchID()){
                            //tipBox.init('fail',"请先添加",1500);
                        }
                    }
                }else{
                    //上一级菜单不存在
                    if(!validateIchID()){
                        tipBox.init('fail',"请先添加基础信息",1500);
                        flag = false;
                    }else{
                        if($(this).parent().attr("id")=="menu2"){
                            var length = $("#menu").children().length;
                            var obj =  $("#menu").find("li").eq(length-1);
                            //判断上一菜单栏 是否
                            if(obj.find("i").eq(0).hasClass("selected")||obj.find("i").eq(0).hasClass("unselected2")){
                                flag=true;
                            }
                            // flag = false;
                        }else{
                            flag = true;
                        }
                    }
                }
                if(!flag){
                    return false;
                }
                editFlag = false;
                //验证
                var ich = getCurrentProject();

                var name = $(this).children("span").first().text();
                var targetType=$(this).attr('target-type');
                //移除其他选中状态
                $("#menu").find("li").removeClass('selected');
                $("#menu2").find("li").removeClass('selected');
                $("#menu3").find("li").removeClass('selected');
                $(this).addClass('selected').siblings('li').removeClass('selected');
                //当前图标选中
                $(".dt").removeClass("selected");

                $('#tpl').load('./Tpl/'+_dateType+'.html',function () {
                    projectPage.bind();
                    if(_dateType==='longField'){
                        upload.submit('image/project/',0);
                        //修改标签内容
                        //初始化当前菜单数据
                        var ich = getCurrentProject();

                        var customflag = false;

                        $.each(attributeData,function (index,obj) {
                                    if( obj.id == attrid){

                                        if(obj.targetType=="10"){
                                            customflag = true;
                                            $(".st").children("h2").empty();
                                            $(".st").children("h2").addClass("custom");
                                            $(".st").children("h2").append("<input type=\"text\" value=\""+name+"\" id=\"attrName\" placeholder=\"请输入自定义项的名称......\">")
                                        }else{
                                            $(".st").children("h2").text(name);
                                        }
                                        return false;
                                    }


                        });

                        if(!customflag){
                            $(".st").children("h2").text(name);
                        }

                        // var flag = false;//缓存命中标记
                        $.each(ich.contentFragmentList,function (index,obj) {
                            if(obj.attributeId == attrid){

                                // flag = true;
                                $("#longContent").val(obj.content);
                                if(typeof(obj.resourceList) != 'undefined' && obj.resourceList !=null ){
                                    var html="";
                                    $.each(obj.resourceList,function (i,resource) {
                                        if(i%2==0){
                                            html+="<div class=\"item\" style=\"margin-right: 10px;\">";
                                        }else{
                                            html+="<div class=\"item\">";
                                        }

                                        if(resource.type=="0"){
                                            html+="<img src="+imgserver+"/image/project/"+resource.uri+" alt=\"\">";
                                        }else{
                                            html+="<video style=\"width: 100%;\" src="+imgserver+"/image/project/"+resource.uri+" controls=\"\"></video>";
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
                        //是否显示 添加图片
                        if(targetType==1){ //不显示 上传图片
                            $("#images").hide();
                            $("#images").siblings('.text').css('width','100%');
                        }else{
                            upload.remove('image/project/');
                        }

                        $(".next").prev().attr("href","javascript:delContentFragment('"+attrid+"')");
                        $(".next").attr("href","javascript:saveContentPragment('"+attrid+"')");

                        /*  $(".next").next().attr("href","javascript:next("++attrid")");
                         */

                    }else if(_dateType==='longFieldCustom'){
                        //自定义编辑
                        upload.submit('image/project/',0);
                    }

                });
            });
        }
    },
    selectCate:{//选择一级分类
        init:function (obj,data) {
            var _this=this;
            if(data){
                $(document).on('click',obj,function () {
                    var $this=$(this);
                    var index=$(this).attr('value');
                    _this.bind(index,data,function (response) {//value 选中ID data数据
                        $this.attr('value',response.value);
                        $this.attr('data-index',response.index);
                        $this.text(response.name);
                    });
                });
            }
        },
        template:function (data) {
            var str='';
            for(var i=0;i<data.length;i++){
                str+='<li value="'+data[i].value+'"><span class="radio"><i></i></span>'+data[i].name+'</li>';
            }
            var temp='<div class="cate_layer" style="display: block;">'+
                '<div class="content">'+
                '<div class="title">选择项目类别</div>'+
                '<div class="items">'+ str + '</div>'+
                '<div class="confirm">'+
                '<a href="javascript:;" class="btn">确认</a>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="overbg"></div>';
            return temp;
        },
        bind:function (index,data,callback) {//操作弹出框
            var body=$('body');
            body.find('.cate_layer').remove();
            body.find('.overbg').remove();
            body.append(this.template(data));
            var _text=body.find('div[data-type=selectCate]').text();

            var parent=$('.cate_layer');
            var _li=parent.find('li');
            var _btn=parent.find('.btn');
            var callData={};

            for(var i=0;i<data.length;i++) {
                if(_text==data[i].name){
                    console.log(i);
                    _btn.addClass('active');
                    _li.eq(i).addClass('active');
                }
            }
            //选择
            _li.on('click',function () {
                _btn.addClass('active');
                $(this).addClass('active').siblings('li').removeClass('active');
                //填充数据
                return callData={
                    value:$(this).attr('value'),
                    name:$(this).text(),
                    index:$(this).index()
                };
            });
            //选中
            _btn.on('click',function () {
                parent.remove();
                $('.overbg').remove();
                if(callback || callback!='undefinied'){
                    callback(callData);
                }
                //本地获取 project 对象
                var ich = getCurrentProject();
                //if(typeof (ich.ichCategoryId) == "undefined" || ich.ichCategoryId==null){
                if(ich.id==null || typeof(ich.id)=="undefined"){
                    //do nothing
                }else{
                    //不删除 以前 数据
                    /* if(ich.id != callData.value){
                     //清空本地 分类相关数据
                     $("#menu2").children("li").each(function () {
                     var attrid = $(this).find("span").attr('data-id');
                     $.each(ich.contentFragmentList,function (index,obj) {
                     if(attrid == obj.attributeId){
                     ich.contentFragmentList.slice(index,1);
                     return false;
                     }
                     });
                     });
                     }*/
                }
                ich.ichCategoryId=callData.value;
                //localStorage.setItem("ichProject",JSON.stringify(ich));
                initmenu2(0,callData.value);
            });

        }
    },
    declare:function () {//是否为自己申报传承人
        $('.horizontal .group').on('click','.radio',function () {
            var index=$(this).index();
            var drop=$(this).parents('.group').siblings('div[data-type=group-drop]');
            $(this).addClass('active').siblings('.radio').removeClass('active');
            if(index==0){
                drop.slideDown('fast');
                $(this).siblings('span').find('input').removeAttr("checked");
                $(this).find('input').attr("checked","true");
                //时间
                $("#ECalendar_date").ECalendar({
                    type:"date",
                    skin:2,
                    offset:[0,2]
                });

            }else {
                drop.slideUp('fast');
                $(this).siblings('span').find('input').removeAttr("checked");
                $(this).find('input').attr("checked","true");

                //清空相关内容
                $("#ECalendar_date").val("");
                $("#certCode").val("");
                $("#certselect").val("");
                //清除本地缓存
                var ich = getCurrentProject();
                if(ich != null && typeof (ich.contentFragmentList) !="undefined"){
                    $.each(ich.contentFragmentList,function (index,obj) {
                        if(obj.attributeId==116 || obj.attributeId==41 || obj.attributeId==107){
                            ich.contentFragmentList[index].content="";
                        }
                    });
                }

                //localStorage.setItem("ichProject",JSON.stringify(ich));
                setCurrentProject(ich);

            }
        });
    }

};

//选择地域
var selectArea1={
    init:function (type, initValue, callback) {
        if(type==0){
            this.bind(initValue, callback);
        }else{
            this.radio(initValue, callback);
        }
    },
    template:function (data) {
        var _dom='';
        if(data.length!=0){
            for(var i=0;i<data.length;i++){
                _dom+='<li data-code="'+data[i].code+'"><span>'+data[i].name+'</span></li>';
            }
            return '<ul>'+_dom+'</ul>';
        }else {
            return '';
        }
    },
    initDom:function (data) {//获取国家
        var temp='<div class="tab">' +
            '  <span style="display: block;"><strong>请选择</strong><i class="icon"></i><em class="icon"></em></span>' +
            '  <span><strong>请选择</strong><i class="icon"></i></span>' +
            '  <span style="margin-right:0"><strong>请选择</strong><i class="icon"></i></span>' +
            '</div>' +
            '<div class="con">' +
            '  <div class="items scrollbar" data-type="level1"" style="display:block">'+ this.template(data) +'</div>'+
            '  <div class="items scrollbar" data-type="level2""></div>'+
            '  <div class="items scrollbar" data-type="level3""></div>'+
            '</div>';
        return temp;
    },
    bind:function (initValue, callback) {
        var _this=this;
        var result=[];

        // 初始化赋值
        if(initValue) {
            var arr = initValue.split(",");
            $.each(arr, function(i, v) {
                result.push(v);
            })
        }

        var resultText=[];
        var area=$('#area');
        var select=$('#select');
        var selected=$('#selected');
        var isFirst=true;
        $('div[data-type=selectArea]').on('click',function (e) {
            e.preventDefault();
            e.stopPropagation()
            if(isFirst){
                isFirst=false;
                var el=$(this);
                var data2=[];
                var data3=[];
                var store=''; //临时
                var storeText=''; //临时
                //初始化dom
                select.append(_this.initDom(dic_arr_city)).show();
                area.show();
                var tab= select.find('.tab span');
                var items= select.find('.items');
                var items1=items.eq(0);
                var items2=items.eq(1);
                var items3=items.eq(2);

                //1.点击第一个
                items1.on('click','li',function () {
                    var _index=$(this).index();
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    data2=dic_arr_city[_index].children;
                    items.hide().html('');
                    items2.html('').append(_this.template(data2)).show();
                    isTab(data2.length,0,_text,_code);
                });
                //2.点击第二个
                items2.on('click','li',function () {
                    var _index=$(this).index();
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    data3=data2[_index].children;
                    items.hide().html('');
                    items3.html('').append(_this.template(data3)).show();
                    isTab(data3.length,1,_text,_code);
                });
                //2.点击第三个
                items3.on('click','li',function () {
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    tab.removeClass('selected');
                    isTab(0,2,_text,_code);
                });
                //tab标签状态
                function isTab(size,index,text,code) {//a索引  b选中的文字 c是code值
                    tab.removeClass('selected');
                    tab.eq(index).addClass('active selected').find('strong').text(text);
                    tab.eq(index+1).show();
                    store+=code+',';
                    storeText+=text;
                    //当没有子数据的时候赋值给result
                    if(size==0 && index==0){
                        assignValue();
                        isFirst=true;
                    }
                    //当选择区县的时候把数据赋值给result
                    if(index==2){
                        assignValue();
                        isFirst=true;
                    }

                    function assignValue() {
                        var storeVal = store.substr(0, store.length - 1).split(",").pop();
                        var num = result.indexOf(storeVal);
                        if(num == -1) {
                            result.push(storeVal);
                            resultText.push(storeText.substr(0, storeText.length - 1));
                            //localStorage.setItem("codeText",resultText.join(","));
                            codesText = resultText.join(",");
                            createSelected(storeText);

                        }
                        select.html('').hide();
                        el.attr('value',result);
                        if(callback && callback!='undefined'){
                            callback(result, resultText);
                        }
                    }
                }
                //创建选中元素
                function createSelected(data) {
                    selected.append('<li><span>'+data+'<i class="icon"></i></span></li>');
                }

                //关闭
                select.on('click',function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                $(document).on("click", function () {
                    isFirst=true;
                    select.hide().html('');
                });
            }
        });
        //删除选中的数据
        selected.on('click','span',function () {
            var _index=$(this).index();
            $(this).parents('li').remove();
            result.splice(_index,1);
            resultText.splice(_index,1);
            // console.log(resultText);
            //localStorage.setItem("codeText",resultText.join(","));
            codesText = resultText.join(",");
            if(callback && callback!='undefined'){
                callback(result);
            }
            //删除本地缓存
        });
    },
    radio:function (initValue, callback) {
        var _this=this;
        var result=[];
        var resultText=[];

       // var codeText = localStorage.getItem("codeText");
        var codeText = codesText;
        if(codeText != null && typeof (codeText) !="undefined"){
            resultText = codeText.split(",");
        }

        var area=$('#area');
        var select=$('#select');
        var selected=$('#selected');
        var isFirst=true;
        $('div[data-type=selectArea]').on('click',function (e) {
            e.preventDefault();
            e.stopPropagation();
            if(isFirst){
                isFirst=false;
                var el=$(this);
                var data2=[];
                var data3=[];
                var store=''; //临时
                var storeText=''; //临时
                //初始化dom
                select.append(_this.initDom(dic_arr_city)).show();
                area.show();
                var tab= select.find('.tab span');
                var items= select.find('.items');
                var items1=items.eq(0);
                var items2=items.eq(1);
                var items3=items.eq(2);

                //1.点击第一个
                items1.on('click','li',function () {
                    var _index=$(this).index();
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    data2=dic_arr_city[_index].children;
                    items.hide().html('');
                    items2.html('').append(_this.template(data2)).show();
                    isTab(data2.length,0,_text,_code);
                });

                //2.点击第二个
                items2.on('click','li',function () {
                    var _index=$(this).index();
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    data3=data2[_index].children;
                    items.hide().html('');
                    items3.html('').append(_this.template(data3)).show();
                    isTab(data3.length,1,_text,_code);
                });

                //2.点击第三个
                items3.on('click','li',function () {
                    var _text=$(this).text();
                    var _code=$(this).attr('data-code');
                    tab.removeClass('selected');
                    isTab(0,2,_text,_code);
                });

                //tab标签状态
                function isTab(size,index,text,code) {//a索引  b选中的文字 c是code值
                    tab.removeClass('selected');
                    tab.eq(index).addClass('active selected').find('strong').text(text);
                    tab.eq(index+1).show();
                    store+=code+',';
                    storeText+=text;
                    selected.html('');
                    //当没有子数据的时候赋值给result
                    if(size==0 && index==0){
                        assignValue();
                        isFirst=true;
                    }
                    //当选择区县的时候把数据赋值给result
                    if(index==2){
                        assignValue();
                        isFirst=true;
                    }

                    function assignValue() {
                        var storeVal = store.substr(0, store.length - 1).split(",").pop();
                        result=result.splice(1,1);
                        result.push(storeVal);
                        resultText.push(storeText);
                        createSelected(storeText);
                        select.html('').hide();
                        el.attr('value',result);
                        if(callback && callback!='undefined'){
                            callback(result);
                        }
                    }
                }
                //创建选中元素
                function createSelected(data) {
                    selected.append('<li><span>'+data+'<i class="icon"></i></span></li>');
                }

                //关闭
                select.on('click',function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                $(document).on("click", function () {
                    isFirst=true;
                    select.hide().html('');
                });
            }
        });
        //删除选中的数据
        selected.on('click','span',function () {
            var _index=$(this).index();
            $(this).parents('li').remove();
            result.splice(_index,1);
            if(callback && callback!='undefined'){
                callback(result);
            }
        });
    }
};

//是否为自己申报
var organizationPage = {
    init: function () {
        var _this = this;
        _this.judge();
        $('#tpl').load('./Tpl/org_basic.html', function () {//加载基本信息页面
            _this.slideBar();

            upload.submit('image/organization/',0);

            //处理必填项
            mustInputflag();
            initBasicInfo();
        });
    },
    slideBar: function () {
        var _this = this;
        var slide = $('.ipt_base .slide');
        var dt = slide.find('.dt');
        var dd = slide.find('.dd');
        dd.find('li:last-child').css('margin-bottom', '0');
        //点击dt 展开收起
        dt.on('click', function () {
            var _dd = $(this).siblings('.dd');
            var _dateType = $(this).attr('data-type');
            if (_dd.length > 0) {
                _dd.slideToggle(100);
            }
            $('#tpl').load('./Tpl/' + _dateType + '.html', function () {
                if (_dateType === 'longFieldCustom') {
                    upload.submit('image/organization/',0); //上传题图
                    if($('div[data-type=org_basic]').hasClass('selected')){
                        $('div[data-type=org_basic]').removeClass('selected')
                    }

                    if(!$('div[data-type=longFieldCustom]').hasClass('selected')){
                        $('div[data-type=longFieldCustom]').addClass('selected')
                    }
                    $("#menu3 li").removeClass("selected");

                }else{
                    upload.submit('image/organization/',0); //上传题图
                    if(!$('div[data-type=org_basic]').hasClass('selected')){
                        $('div[data-type=org_basic]').addClass('selected')
                    }

                    if($('div[data-type=longFieldCustom]').hasClass('selected')){
                        $('div[data-type=longFieldCustom]').removeClass('selected')
                    }
                    $("#menu3 li").removeClass("selected");
                    mustInputflag();//添加必选标记
                    initBasicInfo();
                }
            });
        });
        dd.on('click','li',function () {
            var attrid=$(this).find("span").first().attr('data-id');
            $('div[data-type=org_basic]').removeClass("selected");
            $('div[data-type=longFieldCustom]').removeClass("selected");
            $(this).siblings("li").removeClass("selected");
            $(this).addClass("selected");

            var _dateType=$(this).attr('data-type');
            var name = $(this).find("span").first().text();
            var targetType=$(this).attr('target-type');
            $('#tpl').load('./Tpl/'+_dateType+'.html',function () {
                upload.submit('image/organization/',0);
                if(_dateType==='longField'){

                    //修改标签内容
                    $("#attrName").val(name);
                    /*$(".st").children("h2").text(name);*/
                    //初始化当前菜单数据
                    // var flag = false;//缓存命中标记
                    organization = getCurrentOrganization();
                    $.each(organization.contentFragmentList,function (index,obj) {
                        if(obj.attributeId == attrid){
                            $("#longContent").val(obj.content);
                            return false;
                        }
                    });
                    initCustomAttribute(attrid);
                    //是否显示 添加图片
                    if(targetType==1){ //不显示 上传图片
                        $("#images").hide();
                        $("#images").siblings('.text').css('width','100%');
                    }else{
                        upload.remove('image/organization/');
                    }
                    $(".next").prev().attr("href","javascript:delOrgCustom('"+attrid+"')");
                    $(".next").attr("href","javascript:saveOrganization()");

                    //organizationPage.radioImage(); //上传题图
                }
            });

        });
    },
    judge: function () {//是否申报传承人
        var parent = $('.ipt_over');
        var judgeBox=parent.find('.judge_box');
        //1.是否申报传承人
        parent.on('click', '.radio', function () {
            var _index = $(this).index();
            //去掉选中的兄弟(选中效果)
            parent.find('.radio').removeClass('active');
            parent.find('input[type=radio]').removeAttr('checked');
            //当前选中效果
            $(this).addClass('active');
            $(this).find('input[type=radio]').attr('checked', true);
            //如果点击否
            if (_index != 0) {
                judgeBox.fadeIn('fast');
            }
        });

        //2.是否代表机构进行申报
        judgeBox.on('click','.buttons a',function () {
            var _index = $(this).index();
            if(_index==0){
                alert('你点击的是')
            }else {
                judgeBox.fadeOut('fast');
            }
        });

    }
};

//传承人认证
var inheritorPage={
    init:function () { //el元素   url 上传地址
        var _this=this;
        $('#tpl').load('/Tpl/masterBaseInfo.html',function () {//加载基本信息页面
            _this.bind();
        });
        this.slideBar.init(); //左侧菜单
    },
    bind:function () {

    },
    slideBar:{//左侧菜单
        init:function () {
            this.effect();
        },
        effect:function () {
            var _this=this;
            var slide=$('.ipt_base .slide');
            var dt=slide.find('.dt');
            var dd=slide.find('.dd');
            dd.find('li:last-child').css('margin-bottom','0');
            //点击dt 展开收起
            dt.on('click',function () {
                var _dd=$(this).siblings('.dd');
                var _dateType=$(this).attr('data-type');
                if(_dd.length>0){
                    _dd.slideToggle(100);
                }
                if(_dateType=='shortField'){
                    $('#tpl').load('/Tpl/proBaseInfo.html',function () {
                        upload.submit("image/master/");
                        //projectPage.bind();
                        //projectPage.uploadImgage(); //上传题图
                    });
                }
                projectPage.selectCate.init();
            });

            //点击子分类
            dd.on('click','li',function () {
                var _dateType=$(this).attr('data-type');
                $(this).addClass('active').siblings('li').removeClass('active');
                if(_dateType==='longField'){
                    $('#tpl').load('/Tpl/longField.html',function () {
                        projectPage.bind();
                        projectPage.radioImage(); //上传题图
                    });
                }
            });
        }
    },
    template:function () {
        var str='<div class="edit">'+
            '    <form action="">'+
            '        <div class="text">'+
            '            <textarea name="" id="" cols="30" rows="10"></textarea>'+
            '        </div>'+
            '        <div class="images" id="images">'+
            '            <div class="handle">'+
            '                <div class="add file_up">'+
            '                    <span class="icon"><i></i></span>'+
            '                    <span>添加图片</span>'+
            '                </div>'+
            '                <div class="add file_up" style="margin-right:0;">'+
            '                    <span class="icon icon2"><i></i></span>'+
            '                    <span>添加视频</span>'+
            '                </div>'+
            '            </div>'+
            '        </div>'+
            '    </form>'+
            '</div>'+
            '<!--//edit End-->'+
            '<div class="buttons">'+
            '    <a href="">删除此项</a>'+
            '    <a class="next" href="">下一步</a>'+
            '    <a href="">跳过此项</a>'+
            '</div>';
        return str;
    },
    create:function () {
        var temp=$('#temp');
        temp.html('').append(this.template());
    },
    uploadImage:function () {
        var _images=$('#images');
        var el=$('.ipt_base .content .edit .images .handle .file_up .icon');
        upload.submit(el,1,'http://localhost:8005/admin/upload',function (data) {
            _images.find('.handle').before(templateItem('/uploads/'+data.image_url));
            isItemStatus();
        });
        //赋值token  有用则留无用则删除
        $('._token').val($('meta[name=token]').attr('content'));

        //模版
        function templateItem(str) {
            var templ='<div class="item">' +
                '<img src="'+str+'" alt="">' +
                '<input type="text" name="text" placeholder="请输入标题">' +
                '<span class="remove"><i></i></span>'+
                '</div>';
            return templ;
        }

        isItemStatus();
        //判断上传图片的状态
        function isItemStatus() {
            var _item=_images.find('.item');
            if(_item.length>=3){
                _images.addClass('active');
            }
            _images.find('.item:even').css('margin-right','10px');
        }
    },
    radioImage:function () {
        var _images=$('#images');
        $(".preview").remove();
        var el=$('.ipt_base .content .edit .images .handle .file_up .icon');
        upload.submit(el,1,'/user/uploadFile?type=master',function (data) {
            if(data.data.length > 0) {
                _images.find('.handle').before(templateItem(data.data));
                isItemStatus();
                _images.find('.preview').remove();
            }
        });
        //赋值token  有用则留无用则删除
        $('._token').val($('meta[name=token]').attr('content'));

        //模版
        function templateItem(str) {
            var newStr = str[0];
            // 常用图片格式
            var imgArr = [".BMP", ".PCX", ".PNG", ".JPEG", ".GIF", ".TIFF", ".JPG", ".ICO", ".TIF",
                ".bmp", ".pcx", ".png", ".jpeg", ".gif", ".tiff", ".jpg", ".ico", ".tif"];
            if(imgArr.indexOf(str[0].substr(str[0].lastIndexOf("."), str[0].length).toString()) < 0) {
                var localhostPaht = window.document.location.href.substring(0,window.document.location.href.indexOf(window.document.location.pathname))
                newStr = localhostPaht + "/assets/images/inputs/play.jpg";
            }
            var templ='<div class="item">' +
                '<img data-src="' + str[0] + '" src="' + newStr + '" alt="">' +
                '<input type="text" name="text" placeholder="请输入标题">' +
                '<span id="remove_delete" class="remove"><i></i></span>'+
                '</div>';
            return templ;
        }

        isItemStatus();
        //判断上传图片的状态
        function isItemStatus() {
            var _item=_images.find('.item');
            if(_item.length>=3){
                _images.addClass('active');
            }
            _images.find('.item:even').css('margin-right','10px');
        }
    }
};

var modal={
    loading:function (options) {
        var _speed,_text='';
        _speed = (!options.speed || options.speed=='') ? 2000 : options.speed;
        _text = (!options.text || options.text=='') ? '加载中，请稍候...' : options.text;
        var _str='<div class="modal" id="modal">' +
            '        <div class="content">' +
            '            <div class="loading"><img src="../assets/images/icon_preview_loading.gif">'+_text+'</div>' +
            '        </div>' +
            '        <div class="bg"></div>' +
            '    </div>';

        $('body').append(_str);
        var modal=$('#modal');
        modal.fadeIn();
        modal.find('.loading').stop(true).animate({'top':'50%'},300,function () {
            setTimeout(function(){
                options.success();
                modal.remove();
            },_speed);
        });
    }
};

//文件上传获取签名
function send_request()
{
    var signituredata={};
    // http://192.168.1.36
    $.ajax("/file/getPolicy", {
        type: "POST",
        data: {},
        dataType: "json",
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(data, status, xhr) {
            signituredata= JSON.parse(data);
        }
    });

    return signituredata;
};
