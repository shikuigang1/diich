//上传图片
var upload={
    template:function (type,url) {//0是视频  1是图片 url上传的地址
        var _name='';
        _name=(type==1)?'mypic':'video';
        var _parent='<form class="upload" action="'+url+'" method="post" enctype="multipart/form-data">'+
            '<input class="_token" type="hidden" name="_token" value="">'+
            '<div class="progress"><em class="bar"></em><em class="percent"></em></div>' +
            '<input class="file" type="file" name="mypic">'+
            '</form>'+
            '<img class="preview" src="" />';
        return _parent;
    },
    submit:function (obj,type,url,callback) {
        var _this=this;
        $(obj).append(this.template(type,url));
        $(document).on('change','.file',function () {
            var parent=$(this).parents('.file_up');
            var preview=parent.find('.preview');
            var _form = $(this).parents('.upload');
            var progress=_form.find('.progress');
            var bar=progress.find('.bar');
            var percent=progress.find('.percent');
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
                success: function (data) {
                    if(callback || callback!='undefinied'){
                        callback(data);
                        bar.width('');
                        parent.addClass('active');
                        progress.hide();
                    }
                },
                error: function (xhr) {
                    //todo
                }
            });
        });
    }
};


//选择地域
var selectArea={
    init:function (type,callback) {
        if(type==0){
            this.bind(callback);
        }else{
            this.radio(callback);
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
    bind:function (callback) {
        var _this=this;
        var result=[];
        var resultText=[];
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
                        result.push(store);
                        resultText.push(storeText);
                        localStorage.setItem("codeText",JSON.stringify(resultText));
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
        });

    },
    radio:function (callback) {
        var _this=this;
        var result=[];
        var resultText=[];
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
        });
    }
};

//项目表单
var projectPage={
    init:function () {
        var _this=this;
        $('#tpl').load('./Tpl/proBaseInfo.html',function () {//加载基本信息页面
            _this.bind();
            //认证级别数据添加
            initCertRank();
            projectPage.uploadImgage(); //上传题图
        });
        this.slideBar.init(); //左侧菜单
        //添加左侧菜单数据
        renderLeftMenu(0,0);
        //弱当前缓存有数据则在本地 查找并添加
        var ich = getCurrentProject();
        initProjectView(ich);


    },
    bind:function () {
        var _data=[
            {value:1,name:'口头传说和表述'},
            {value:11,name:'表演艺术'},
            {value:28,name:'传统的手艺技能'},
            {value:55,name:'社会风俗、利益、节庆'},
            {value:77,name:'有关自然界和宇宙的只是和实践'}
        ];
        this.selectCate.init('div[data-type=selectCate]',_data); //选择分类
        this.declare();  //是否为自己申报传承人
        selectArea.init(0,function (data) {//选择地址 0是选择地址的类型 0是多选 1是单选
            console.log(data);
            var ich = getCurrentProject();

            var contentFragment={};
            var attr={};

            contentFragment.attributeId=33;//区域id
            attr.dataType=0;
            contentFragment.attribute=attr;
            contentFragment.targetType=0;
            var content=""
            $.each(data,function(index,value) {

                var codepath = value.substring(0,value.length-1);
                if(codepath.lastIndexOf(",") != -1){
                    content=content+codepath.substring(codepath.lastIndexOf(",")+1)+",";
                }else{
                    content=content+codepath+",";
                }
            });

            contentFragment.content=content.substring(0,content.length-1);
            if( ich.contentFragmentList == null || typeof(ich.contentFragmentList)=="undefined"){
                var contentFragmentList=[];
                contentFragmentList.push(contentFragment);
                ich.contentFragmentList=contentFragmentList;
            }else{

                //查询该数据是否已存在  存在覆盖原有数据
                var flag = 0;
                $.each( ich.contentFragmentList,function (idx,obj){
                    if(obj.attributeId==33){
                        ich.contentFragmentList[idx]=contentFragment;
                        flag = 1;
                    }
                });
                if(flag == 0){
                    ich.contentFragmentList.push(contentFragment);
                }
            }
            localStorage.setItem("ichProject",JSON.stringify(ich));

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
                var _dd=$(this).siblings('.dd');
                var _dateType=$(this).attr('data-type');
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
                            projectPage.uploadImgage(); //上传题图
                            //重新初始化 分类信息  认证信息
                            initCertRank();

                            var ich = getCurrentProject();
                            if(typeof (ich)!= "undefined"){
                                //填充分类
                                var c_id = ich.ichCategoryId;
                                var catelist = getCategoryList(0);
                                var name="";
                                for(var i=0;i<catelist.length;i++){
                                    if(catelist[i].id==c_id){
                                        name = catelist[i].name;
                                    }
                                }
                                $('div[data-type=selectCate]').text(name);
                                //填充题图
                                //是否为已认证项目 标记
                                var flag = 0;
                                $.each(ich.contentFragmentList,function (idx,obj) {
                                    //填充题图
                                    if(obj.attributeId == 1){
                                        var uri = obj.resourceList[0].uri;
                                        $(".preview").attr("src",imgserver+"/image/project/"+uri).show();
                                        $(".preview").parent().addClass('active');
                                    }

                                    if(obj.attributeId == 116 && obj.content != ''){
                                        flag=1;
                                        $("#ECalendar_date").val(obj.content);
                                    }
                                    if(obj.attributeId == 108 && obj.content != ''){
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

                                });

                                if(flag==1){
                                    $('.horizontal .group .radio').eq(0).click();
                                }
                                //区域值
                                var codeText=localStorage.getItem("codeText");
                                var codeTextList = JSON.parse(codeText);
                                if(codeTextList !=  null || typeof(codeTextList)!= 'undefined' ){
                                    for(var i=0;i<codeTextList.length;i++){
                                        $("#selected").append('<li><span>'+codeTextList[i]+'<i class="icon"></i></span></li>');
                                    }
                                    $("#area").show();
                                    $('#select').hide();
                                }


                                //填充 是否为 已申报传承人


                            }
                        }

                        if(_dateType == 'longFieldCustom'){
                            projectPage.radioImage();
                        }
                    });
                }

            });

            //点击子分类
            dd.on('click','li',function () {
                var _dateType=$(this).attr('data-type');
                var name = $(this).children("span").first().text();
                var attrid=$(this).children("span").first().attr('data-id');

                //移除其他选中状态
                $(this).addClass('selected').siblings('li').removeClass('selected');
                //当前图标选中
                $(".dt").removeClass("selected");

                $('#tpl').load('./Tpl/'+_dateType+'.html',function () {
                    projectPage.bind();
                    if(_dateType==='longField'){
                        //修改标签内容
                        $(".st").children("h2").text(name);

                        //初始化当前菜单数据
                        var ich = getCurrentProject();
                        $.each(ich.contentFragmentList,function (index,obj) {
                                if(obj.attributeId == attrid){
                                    $("#longContent").val(obj.content);
                                    if(typeof(obj.resourceList) != 'undefined'){
                                        var html="";
                                        $.each(obj.resourceList,function (i,resource) {

                                            if(i%2==0){
                                                html+="<div class=\"item\" style=\"margin-right: 10px;\">";
                                            }else{
                                                html+="<div class=\"item\">";
                                            }
                                            html+="<img src="+imgserver+"/image/project/"+resource.uri+" alt=\"\">";
                                            html+= "<input type=\"text\" name=\"text\" placeholder=\"请输入标题\" value=\""+resource.description+"\"></div>";
                                        });

                                        if(obj.resourceList.length>2){
                                            $("#images").addClass("active");
                                        }

                                        $("#images").prepend(html);
                                    }

                                }
                        });

                        $(".next").prev().attr("href","javascript:delContentFragment("+attrid+")");
                        $(".next").attr("href","javascript:saveContentPragment("+attrid+")");
                        $(".next").next().attr("href","javascript:next("+attrid+")");
                        projectPage.radioImage(); //上传题图
                    }else {
                        projectPage.uploadImgage(); //上传题图
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
                    ich.ichCategoryId=callData.value;
                //}

                localStorage.setItem("ichProject",JSON.stringify(ich));
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
            }
        });
    },
    uploadImgage:function () {//上传图片
        var el=$('.horizontal .group .control .file_up');
        upload.submit(el,1,'/user/uploadFile?type=project',function (data) {
            console.log(data);
            if(data.code==0){
                $('.preview').attr('src',data.data[0]).show();
                //判断是否是题图 提交
                var longfile =  $('li[data-type=longField]').hasClass('selected');
                if(longfile){
                    //获取属性id
                    /*var attrid=0;

                   $('li[data-type=longField]').each(function () {
                        if($(this).hasClass('selected')){
                            attrid = $(this).find('span').eq(0).attr('data-id');
                        }
                    });

                    var imgpath = data.data[0];
                    //获取图片名称
                    var path = imgpath.substring(imgpath.lastIndexOf("/")+1);

                    var ich = getCurrentProject();

                    var contentFragment={};
                    var attr={};
                    var resource={};
                    var resourceList=[];

                    contentFragment.attributeId=attrid;//

                    attr.dataType=5;
                    resource.uri=path;
                    resource.type=0;
                    resource.description='';
                    resourceList.push(resource);

                    contentFragment.attribute=attr;
                    contentFragment.resourceList=resourceList;
                    contentFragment.targetType=0;

                    if( ich.contentFragmentList == null || typeof(ich.contentFragmentList)=="undefined"){
                        var contentFragmentList=[];
                        contentFragmentList.push(contentFragment);
                        ich.contentFragmentList=contentFragmentList;
                    }else{
                        $.each( ich.contentFragmentList,function (idx,obj){
                            if(obj.attributeId==attrid){

                                if(obj.resourceList.length==0 ||  typeof (obj.resourceList)=='undefined'){
                                    obj.resourceList=resourceList;
                                }else{
                                    ich.contentFragmentList[idx].resourceList.push(resource);
                                }
                            }
                        });

                    }
                    console.log(JSON.stringify(ich));
                    localStorage.setItem("ichProject",JSON.stringify(ich));*/
                }else{

                    $('.preview').attr('src',data.data[0]).show();
                    //图上传成功本地保存图片
                    var imgpath = data.data[0];
                    //获取图片名称
                    var path = imgpath.substring(imgpath.lastIndexOf("/")+1);

                    var ich = getCurrentProject();

                    var contentFragment={};
                    var attr={};
                    var resource={};
                    var resourceList=[];

                    contentFragment.attributeId=1;//题图
                    //contentFragment.content=$("#titu").val();//题图对应链接

                    attr.dataType=0;
                    resource.uri=path;
                    resource.type=0;
                    resource.description='';
                    resourceList.push(resource);

                    contentFragment.attribute=attr;
                    contentFragment.resourceList=resourceList;
                    contentFragment.targetType=0;

                    if( ich.contentFragmentList == null || typeof(ich.contentFragmentList)=="undefined"){
                        var contentFragmentList=[];
                        contentFragmentList.push(contentFragment);
                        ich.contentFragmentList=contentFragmentList;
                    }else{
                        var flag = 0;
                        $.each( ich.contentFragmentList,function (idx,obj){
                            if(obj.attributeId==1){
                                ich.contentFragmentList[idx].resourceList[0].uri=contentFragment.resourceList[0].uri;
                                flag = 1;
                            }
                        });
                        if(flag == 0){
                            ich.contentFragmentList.push(contentFragment);
                        }

                    }
                    localStorage.setItem("ichProject",JSON.stringify(ich));
                }
            }else{
                //文件上传出错
                alert(data.msg);
            }

        });
        $('._token').val($('meta[name=token]').attr('content'));
    },
    radioImage:function () {
        var _images=$('#images');
        //
        var el=$('.ipt_base .content .edit .images .handle .file_up .icon');
        upload.submit(el,1,'/user/uploadFile?type=project',function (data) {
            _images.find('.handle').before(templateItem(data.data));
            isItemStatus();
            _images.find('.preview').remove();
        });
        //赋值token  有用则留无用则删除
        $('._token').val($('meta[name=token]').attr('content'));

        //模版
        function templateItem(str) {
            var templ='<div class="item">' +
                '<img src="'+str+'" alt="">' +
                '<input type="text" name="text" placeholder="请输入标题">' +
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

//传承人基本信息
var inheritorBaseInfo={
    init:function () {
        selectArea.init(1,function (data) {
            console.log(data);
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
                        projectPage.bind();
                        projectPage.uploadImgage(); //上传题图
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
        var str=`<div class="edit">
                    <form action="">
                        <div class="text">
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="images" id="images">
                            <div class="handle">
                                <div class="add file_up">
                                    <span class="icon"><i></i></span>
                                    <span>添加图片</span>
                                </div>
                                <div class="add file_up" style="margin-right:0;">
                                    <span class="icon icon2"><i></i></span>
                                    <span>添加视频</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <!--//edit End-->
                <div class="buttons">
                    <a href="">删除此项</a>
                    <a class="next" href="">下一步</a>
                    <a href="">跳过此项</a>
                </div>`;
        return str;
    },
    create:function () {
        var temp=$('#temp');
        temp.html('').append(this.template());
    },
    uploadImage:function () {
        var _images=$('#images');
        //
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

