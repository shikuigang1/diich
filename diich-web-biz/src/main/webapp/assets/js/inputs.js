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
                        callback(data.data[0]);
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

        //加载菜单数据
        loadPageData(0);
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
        upload.submit(el,1,'../user/uploadFile',function (data) {
            $('.preview').attr('src',data).show();
        });
        $('._token').val($('meta[name=token]').attr('content'));
    }
};


//传承人认证
var inheritorPage={
    init:function () { //el元素   url 上传地址
        this.change();
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
    change:function () {//改变数据 和 渲染dom
        var _this=this;
        var slide=$('.ipt_base .slide');
        var dt=slide.find('.dt');
        var dd=slide.find('.dd');
        var content=$('.ipt_base .content');
        var st=content.find('.st h2');

        //点击dt 展开收起
        dt.on('click',function () {
            if($(this).siblings('.dd').length>0){
                $(this).toggleClass('active');
                $(this).siblings('.dd').slideToggle(100);
            }
        });

        //点击子分类
        dd.on('click','li',function () {
            _this.create();
            st.text($(this).text());
            $(this).addClass('active').siblings('li').removeClass('active');
            _this.uploadImage();
        });



    },
    uploadImage:function () {
        var _images=$('#images');
        //
        var el=$('.ipt_base .content .edit .images .handle .file_up .icon');
        upload.submit(el,1,'../user/uploadFile',function (data) {
            _images.find('.handle').before(templateItem(data));
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

