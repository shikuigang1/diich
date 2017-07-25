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


        $('.file').on('change',function () {
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
        this.bind(type,callback);
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
    bind:function (type,callback) {
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

                // if(type==1){//0是多选  1是单选
                //
                // }
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
                    storeText=_this.unique(storeText);
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
                        createSelected(storeText);
                        select.html('').hide();
                        el.attr('value',result);
                        // console.log(_this.unique(result));
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
    unique:function (val) {
        var newStr="";
        for(var i=0;i<val.length;i++){
            if(newStr.indexOf(val[i])==-1){
                newStr+=val[i];
            }
        }
        return newStr;
    }
};

var slideBar={
    init:function () {
        this.effect();
    },
    effect:function () {
        var slide=$('.ipt_base .slide');
        var dt=slide.find('.dt');
        var dd=slide.find('.dd');
        dd.find('li:last-child').css('margin-bottom','0');
        //点击dt 展开收起
        dt.on('click',function () {
            if($(this).siblings('.dd').length>0){
                $(this).siblings('.dd').slideToggle(100);
            }
        });

        //点击子分类
        dd.on('click','li',function () {
            $(this).addClass('active').siblings('li').removeClass('active');
        });
    }
};



//项目基础信息
var projectBaseInfo = {
    init:function () {
        var _data=[
            {value:1,name:'口头传说和表述'},
            {value:11,name:'表演艺术'},
            {value:28,name:'传统的手艺技能'},
            {value:55,name:'社会风俗、利益、节庆'},
            {value:77,name:'有关自然界和宇宙的只是和实践'}
        ];
        this.selectCate.init('div[data-type=selectCate]',_data);
        this.declare();
        this.uploadImgage();
    },
    selectCate:{//选择一级分类
        init:function (obj,data) {
            var _this=this;
            $(obj).on('click',function () {
                var $this=$(this);
                var index=$(this).attr('data-index');

                _this.bind(index,data,function (response) {//value 选中ID data数据
                    $this.attr('value',response.value);
                    $this.attr('data-index',response.index);
                    $this.text(response.name);
                });

            });
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
            $('body').append(this.template(data));
            var parent=$('.cate_layer');
            var _li=parent.find('li');
            var _btn=parent.find('.btn');
            var callData={};

            if(index){
                _btn.addClass('active');
                _li.eq(index).addClass('active');
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
            }else {
                drop.slideUp('fast');
            }
        });
    },
    uploadImgage:function () {//上传图片
        var el=$('.horizontal .group .control .file_up');
        upload.submit(el,1,'http://localhost:8005/admin/upload',function (data) {
            $('.preview').attr('src','/uploads/'+data.image_url).show();
        });
        $('._token').val($('meta[name=token]').attr('content'));
    }
};


//传承人认证
var inheritorPage={
    init:function () { //el元素   url 上传地址
        this.uploadImage();
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



$(function () {
    //选择地址 0是选择地址的类型 0是多选 1是单选
    selectArea.init(0,function (data) {
        console.log(data);
    });

    //左侧菜单
    slideBar.init();

});