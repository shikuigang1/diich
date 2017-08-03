//上传图片
var imageUpload={
    init:function () {
        this.create();
        this.handle(); //填写图片标题 删除图片
    },
    create:function () {//上传图片
        var _this=this;
        var parent=$('.card');
        var thumb=parent.find('.thumb');
        thumb.on('change', '.imgfile input[type=file]', function() {
            var _thumb=$(this).parents('.thumb');
            var _val=$(this).val();
            //验证图片类型
            if (_this.validate(_val)) {
                var uri = _this.getURI(this.files[0]);
                if (uri) {
                    _thumb.addClass('active');
                    $(this).parents('.item').before(DOM.preview(uri));
                }
            } else {
                alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
                return;
            }
            _this.handle(); //填写图片标题
        });
    },
    validate:function (val) {//验证
        if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(val)) {
            return true;
        }else {
            return false;
        }
    },
    getURI:function (file) {//建立一個可存取到該file的url
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    },
    handle:function () {//填写图片标题 删除图片
        var parent=$('.card');
        //填写图片标题
        parent.on('keyup','.thumb .item input[data-type="entry"]',function () {
            var _txt=$(this).siblings('span[data-type="entryText"]');
            var len=$(this).val().length;
            if(len<15){
                _txt.text($(this).val());
            }
        });

        //删除图片
        parent.on('click','.thumb .item .remove',function () {
            var thumb=$(this).parents('.thumb');
            $(this).parents('.item').remove();
            if(thumb.find('.item').length<2){
                thumb.removeClass('active');
            }
        });


    }
};

//上传视频
var videoUpload={
    init:function () {
        this.create();
    },
    create:function () {//创建弹出层dom
        var _this=this;
        var parent=$('.card');
        var el=parent.find('.item');

        //1.点击视频图标
        el.on('click','li.video .icon',function (e) {
            var parent=$(this).parents('li.video');
            var _drop=parent.find('.drop');
            if(_drop.length < 1){
                parent.append(DOM.drop());
            }else {
                _drop.show();
            }
            e.preventDefault();
            e.stopPropagation();
        });

        //2.点击插入视频链接
        el.on('click','.drop .url',function (e) {
            var parent =$(this).parents('li.video');
            var _insert=parent.find('.insert');
            if(_insert.length < 1){
                parent.append(DOM.insert());
            }else {
                _insert.show();
            }
            e.preventDefault();
            e.stopPropagation();
        });

        //3.点击插入视频链接输入框 弹层不关闭
        el.on('click','li.video .insert',function (e){
            e.preventDefault();
            e.stopPropagation();
        });

        //4.点击插入本地视频
        el.on('click','li.video input.local',function (e) {
            var parent=$('.card');
            var thumb=parent.find('.thumb');
            thumb.on('change', '.videofile .local', function() {
                var _thumb=$(this).parents('.thumb');
                var _val=$(this).val().substr($(this).val().indexOf("."));

                //验证图片类型
                if (_this.validate(_val)) {
                    var uri = _this.getURI(this.files[0]);
                    if (uri) {
                        _thumb.addClass('active');
                        $(this).parents('.item').before(DOM.videoPeview(uri));
                    }
                }
            });
        });
        //1.点击多余部分关闭
        $(document).on('click', function() {
            parent.find('.drop').hide();
            parent.find('.insert').hide();
        });

    },
    validate:function (val) {//验证
        if (val === '.mp4') {
            return true;
        }else {
            return false;
        }
    },
    getURI:function (file) {//建立一個可存取到該file的url
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
};


//创建模块
var DOM={
    drop:function () {//点击视频提示框DOM
        var str = '<div class="drop"><p class="url">插入视频/音频链接</p> <p class="local">上传本地视频/音频<input class="local" type="file"></p></div>';
        return str;
    },
    insert:function () {//插入视频 输入地址
        var str = '<div class="insert"><dl class="bd"><dt class="bd">插入视频</dt><dd class="bd"><p class="name">输入视频地址</p><p class="form"><input type="text" value=""><a href="">确定</a></p></dd></dl></div>';
        return str;
    },
    preview:function (uri) {//创建图片预览dom
        var str='<div class="item">'+
                    '<span class="pic"><img src="'+uri+'" alt=""></span>'+
                    '<div class="txt">'+
                        '<input data-type="entry" type="text">'+
                        '<span data-type="entryText">填写标题</span>'+
                    '</div>'+
                    '<div class="remove">删除</div>'+
                '</div>';
        return str;
    },
    videoPeview:function (uri) {//创建视频预览dom
        var str='<div class="item">'+
            '<span class="pic"><video src="'+uri+'"></video></span>'+
            '<div class="txt">'+
                '<input data-type="entry" type="text">'+
                '<span data-type="entryText">填写标题</span>'+
            '</div>'+
            '</div>';
        return str;
    },
    card:function () {//模块
        var str = '<section class="card">' +
            '<div class="bd head"><span><input class="new_input" style="font-size:20px;" type="text" placeholder="模块标题"></span></div>' +
            '<div class="textarea">' +
            '<textarea name="" placeholder="输入内容介绍..."></textarea>' +
            '</div>' +
            '<div class="thumb">' +
            '<div class="item handle_up">' +
            '<ul class="bd">' +
            '<li class="img imgfile">' +
            '<span><i class="icon"></i></span>' +
            '<input type="file" accept="image/jpg,image/jpeg,image/png,image/bmp">' +
            '</li>' +
            '<li class="video videofile">' +
            '<span><i class="icon"></i><em class="icon arrow"></em></span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</section>';
        return str;
    },
    cardProduct:function (len) {//项目实践-添加代表作品
        var str = '<div class="bd works">'+
            '<div class="bd head">' +
            '<span>代表作品'+len+'</span>' +
            '</div>'+
            '<dl class="item">'+
            '<dt>作品名称</dt>'+
            '<dd><input type="text" class="ipt"></dd>'+
            '</dl>'+
            '<dl class="item">'+
            '<dt>创作人</dt>'+
            '<dd><input type="text" class="ipt"></dd>'+
            '</dl>'+
            '<div class="thumb">'+
            '<div class="item handle_up">'+
            '<ul class="bd">'+
            '<li class="img imgfile">'+
            '<span><i class="icon"></i></span>'+
            '<input type="file" accept="image/jpg,image/jpeg,image/png,image/bmp">'+
            '</li>'+
            '<li class="video videofile">'+
            '<span><i class="icon"></i><em class="icon arrow"></em></span>'+
            '</li>'+
            '</ul>'+
            '</div>'+
            '</div>'+
            '</div>';
        return str;
    },
};

//项目-基础信息  已开发不动了
var projectFrom = {
    init: function() {
        this.default();
        this.cateLayer();
        this.judge();
        this.addInput();
        this.slideNav();
        this.imageUpload();
    },
    default: function() { //去除默认的一些属性
        //
        $('.ipt_base .content form.base .con dd .judge_drop .item').eq(1).css('margin', '0 60px');
    },
    cateLayer: function() { //一级分类
        var base = $('.ipt_base');
        var el = base.find('a[data-type="cate"]');
        var layer = $('.project_layer');
        var li = layer.find('.items li');
        var btn = layer.find('.confirm a');

        //点击一级分类
        el.on('click', function() {
            $('body').append('<div class="overbg"></div>');
            layer.fadeIn(200);
            //点击背景
            $('.overbg').on('click', function() {
                layer.fadeOut(200);
                $(this).remove();
            });
        });


        //分类选择
        li.on('click', function() {
            //判断是否有选中 没有确认按钮置灰
            $(this).addClass('active').siblings('li').removeClass('active');
            if (li.hasClass('active')) {
                btn.addClass('active');
            } else {
                btn.removeClass('active');
            }
        });

        //点击确定按钮
        btn.on('click', function() {
            li.each(function() {
                var _value = $(this).find('i').attr('value');
                if ($(this).hasClass('active')) {
                    close();
                    el.text($(this).text());
                    el.attr('value', _value);
                    $("#ichCategoryId").val($(this).find('i').attr('value'));
                }
            });
        });


        //关闭分类浮层
        function close() {
            layer.fadeOut(200);
            $('.overbg').remove();
        }
    },
    judge: function() { //是否为中国文化部认定的非遗项目
        var el = $('.ipt_base .content form.base .con dd .judge');
        var radio = el.find('input[type=radio]');
        var drop = el.siblings('.judge_drop');

        el.find('span').on('click', function() {
            radio.removeAttr("checked");
            $(this).find('input').attr('checked','true');
            if ($(this).index() == 0) {
                drop.show();
            } else {
                drop.hide();
            }
            $(this).addClass('active').siblings('span').removeClass('active');


        });
    },
    addInput: function() { //添加新信息
        var target = $('.ipt_base .content .info');
        var el = target.find('dl .ipt_add');
        var index = 0;
        el.on('click', function() {
            index++;
            var elStr = '<dl><dt><input class="new' + index + '" type="text" placeholder="输入信息名称"/><i class="remove"></i></dt><dd><input type="text" class="ipt"></dd></dl>';
            $(this).parents('dl').before(elStr);

            //获取焦点
            var newEl = $('input.new' + index);
            newEl.focus();


            //点击删除按钮
            var del = $('dl .remove');
            del.on('click', function() {
                $(this).parents('dl').remove();
            });

            return false;
        });
    },
    slideNav: function() { //左侧导航
        var parent = $('.ipt_base');
        var project = parent.find('.project');
        var el = parent.find('.slide_nav');
        var content = parent.find('.content');
        //滚动
        $(window).scroll(function() {
            var d = $(window).scrollTop();
            if (d >= 140) {
                parent.css('padding-top', '157px');
                project.addClass('fixed');
                content.css({ 'margin-left': '282px' });
                el.addClass('nav_active');
            } else {
                parent.css('padding-top', '');
                project.removeClass('fixed');
                el.removeClass('nav_active');
                content.css({ 'margin-left': '' });
            }
        });

        //点击菜单
        el.find('dl').each(function() {
            var _this = $(this);
            var dt = _this.find('dt');
            var dd = _this.find('dd');
            var speed = 200;
            dt.on('click', function() {
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) { //收起状态
                    dd.stop(true).slideUp(speed);
                } else { //展开状态
                    dd.stop(true).slideDown(speed);
                }

            });
        });
    },
    imageUpload: function() {
        var el = $('.file');
        var timer;
        el.on('change', 'input[type=file]', function() {
            //验证图片类型
            if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test($(this).val())) {
                var img = $(this).siblings('img');
                var reupload = $(this).siblings('.reupload');
                var objUrl = getObjectURL(this.files[0]);
                if (objUrl) {
                    $(this).parents('.file').addClass('active');
                    img.attr("src", objUrl).show();
                    reupload.text('重新上传');
                }

                //上传图片
                upload($(this).attr("id"));

            } else {
                alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
                return;
            }
        });
        //建立一個可存取到該file的url
        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }



        function upload(obj) {

            $.ajaxFileUpload({
                url : '../user/uploadProcessFile',
                fileElementId : obj,
                dataType : 'text',
                success : function(data) {

                    data=eval("("+data+")");//转化字符串为标准json
                    if(data.code != 0) {
                        alert(data.msg);
                        return;
                    }
                    var arr = data.data;
                  /*  for(var i = 0; i < arr.length; i ++) {
                        var $img = $('<img style="width: 50px;"/>');
                        $img.attr('src', arr[i]);
                        $('#img_block').append($img);
                    }*/
                    //定时获取图片上传进度
                    console.log(data.data[0]);
                    setTimeout(function(){}, 100);
                    timer = window.setInterval(function(){
                        getProcess(data.data[0],obj);
                    }, 1000);
                    //getProcess(data.data[0],obj);

                },
                error : function(e) {

                }
            });
        }

        function getProcess(filename,fileid){
            $.ajax({
                cache: true,
                type: "POST",
                url: "../user/uploadFileProcess",
                data: {filename:filename},
                dataType: "json",
                async: true,
                error: function(request) {
                    //alert("Connection error");
                },
                success: function(data) {

                    //为file 时上传的是 题图
                    if(fileid=='file'){

                        $("#"+fileid).siblings('.reupload').text(data.data);
                        if(data.data=='100.0%'){
                            window.clearInterval(timer);
                            $("#"+fileid).siblings('.reupload').text('重新上传');
                            $("#titu").val(filename);
                            //默认为

                        }
                    }
                },
                complete:function(xhr){

                }
            });
        }

    },
};

//项目申报公共函数初始化
var projectReport= {
    init:function () {
        imageUpload.init();
        videoUpload.init();
        this.modalExample();
        this.addCard();
        this.slideNav();
    },
    modalExample: function() {//查看示例弹出框
        var modal = $('.modal_example');
        var el = $('.ipt_base a[data-type="modalExample"]');
        el.on('click', function() {
            modal.fadeIn(200);
            modal.append('<div class="overbg"></div>');
            $('body').css('overflow', 'hidden');
        });
        // var overbg=modal.find('.overbg');
        modal.on('click', '.overbg', function() {
            modal.fadeOut(200);
            $(this).remove();
            $('body').css('overflow', '');
        });
        modal.on('click', '.close', function() {
            modal.fadeOut(200);
            $('body').css('overflow', '');
        });
    },
    addCard:function () {//创建模块
        var parent = $('.ipt_base .ancestry');
        var el = parent.find('a[data-type="addCard"]');

        el.on('click', function() {
            $(this).before(DOM.card());
            $('.new_input').focus();
            imageUpload.init();
            videoUpload.init();
            return false;
        });
    },
    slideNav: function() { //左侧导航
        var parent = $('.ipt_base');
        var project = parent.find('.project');
        var el = parent.find('.slide_nav');
        var content = parent.find('.content');
        //滚动
        $(window).scroll(function() {
            var d = $(window).scrollTop();
            if (d >= 140) {
                parent.css('padding-top', '157px');
                project.addClass('fixed');
                content.css({ 'margin-left': '282px' });
                el.addClass('nav_active');
            } else {
                parent.css('padding-top', '');
                project.removeClass('fixed');
                el.removeClass('nav_active');
                content.css({ 'margin-left': '' });
            }
        });

        //点击菜单
        el.find('dl').each(function() {
            var _this = $(this);
            var dt = _this.find('dt');
            var dd = _this.find('dd');
            var speed = 200;
            dt.on('click', function() {
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) { //收起状态
                    dd.stop(true).slideUp(speed);
                } else { //展开状态
                    dd.stop(true).slideDown(speed);
                }

            });
        });
    }
};
//项目内容
var ancestryPgae = {
    init: function() {
        projectReport.init();
    }
};

//项目实践
var practicePage = {
    init: function() {
        projectReport.init();
        this.addCardProduct();
    },
    addCardProduct: function() {
        var parent=$('.ipt_base');
        var el = parent.find('a[data-type="addCardProduct"]');
        el.on('click',function(){
            var len=parent.find('.works').length+1;
            $(this).parent('.add_card').before(DOM.cardProduct(len));
            imageUpload.init();
            videoUpload.init();
        });
    }
};


