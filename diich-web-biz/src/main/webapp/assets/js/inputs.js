//
var effectInputs= {
    slideNav:function () {//左侧导航
        var parent=$('.ipt_base');
        var project=parent.find('.project');
        var el=parent.find('.slide_nav');
        var content=parent.find('.content');
        //滚动
        $(window).scroll(function () {
           var d=$(window).scrollTop();
           if(d>=140){
               parent.css('padding-top','157px');
               project.addClass('fixed');
               content.css({'margin-left':'282px'});
               el.addClass('nav_active');
           }else{
               parent.css('padding-top','');
               project.removeClass('fixed');
               el.removeClass('nav_active');
               content.css({'margin-left':''});
           }
        });

        //点击菜单
        el.find('dl').each(function () {
            var _this = $(this);
            var dt = _this.find('dt');
            var dd = _this.find('dd');
            var speed = 200;
            dt.on('click', function () {
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) { //收起状态
                    dd.stop(true).slideUp(speed);
                } else { //展开状态
                    dd.stop(true).slideDown(speed);
                }

            });
        });
    },
    imageUpload:function () {//图片上传
        var delParent;
        var defaults = {
            fileType         : ["jpg","png","bmp","jpeg"],   // 上传文件的类型
            fileSize         : 1024 * 1024 * 10                  // 上传文件的大小 10M
        };
        /*点击图片的文本框*/
        $('.file').change(function () {
            var file = document.getElementById($(this).attr('id'));
            var fileList = file.files; //获取的图片文件
            console.log(fileList+"======filelist=====");

            var imgArr = [];
            var imgUrl = window.URL.createObjectURL(fileList);
            imgArr.push(imgUrl);
            console.log(imgArr)

        });
    }
};


//项目表单
var projectFrom = {
    init: function () {
        this.default();
        this.cateLayer();
        this.judge();
        this.addInput();
        this.scrollFixed();
        effectInputs.slideNav();
    },
    default: function () { //去除默认的一些属性
        //
        $('.ipt_base .content form.base .con dd .judge_drop .item').eq(1).css('margin', '0 60px');
    },
    cateLayer: function () { //一级分类
        var base = $('.ipt_base');
        var el = base.find('a[data-type="cate"]');
        var layer = $('.project_layer');
        var li = layer.find('.items li');
        var btn = layer.find('.confirm a');

        //点击一级分类
        el.on('click', function () {
            $('body').append('<div class="overbg"></div>');
            layer.fadeIn(200);
            //点击背景
            $('.overbg').on('click', function () {
                layer.fadeOut(200);
                $(this).remove();
            });
        });


        //分类选择
        li.on('click', function () {
            //判断是否有选中 没有确认按钮置灰
            $(this).addClass('active').siblings('li').removeClass('active');
            if (li.hasClass('active')) {
                btn.addClass('active');
            } else {
                btn.removeClass('active');
            }
        });

        //点击确定按钮
        btn.on('click', function () {
            li.each(function () {
                var _value=$(this).find('i').attr('value');
                if ($(this).hasClass('active')) {
                    close();
                    el.text($(this).text());
                    el.attr('value',_value);
                }
            });
        });


        //关闭分类浮层
        function close() {
            layer.fadeOut(200);
            $('.overbg').remove();
        }
    },
    judge: function () { //是否为中国文化部认定的非遗项目
        var el = $('.ipt_base .content form.base .con dd .judge');
        var drop = el.siblings('.judge_drop');

        el.find('span').on('click', function () {
            if ($(this).index() == 0) {
                drop.show();
            } else {
                drop.hide();
            }
            $(this).addClass('active').siblings('span').removeClass('active');
        })
    },
    addInput: function () { //添加新信息
        var target = $('.ipt_base .content .info');
        var el = target.find('dl .ipt_add');
        var index = 0;
        el.on('click', function () {
            index++;
            var elStr = '<dl><dt><input class="new' + index + '" type="text" placeholder="输入信息名称"/><i class="remove"></i></dt><dd><input type="text" class="ipt"></dd></dl>';
            $(this).parents('dl').before(elStr);

            //获取焦点
            var newEl = $('input.new' + index);
            newEl.focus();


            //点击删除按钮
            var del = $('dl .remove');
            del.on('click', function () {
                $(this).parents('dl').remove();
            });

            return false;
        });

    },
    scrollFixed: function () {
        var height = $('.header').outerHeight(true);
        var target = $('.ipt_base .project');

        $(window).scroll(function () {
            var d = $(document).scrollTop();

            if (d > height) {
                target.addClass('fixed');
            } else {
                target.removeClass('fixed');
            }


        })
    }
};


//项目内容
var ancestryPgae = {
    init: function () {
        this.upload();
        this.modalExample();
        this.addCard();
        effectInputs.slideNav();
    },
    upload: function () {
        var parent = $('.ipt_base .ancestry .card .handle_up li.video');

        //点击视频提示框DOM
        var videoStr = '<div class="drop"><p class="url">插入视频/音频链接</p> <p class="local">上传本地视频/音频<input class="local" type="file"></p></div>';
        //点击插入视频链接提示框DOM
        var insertStr = '<div class="insert"><dl class="bd"><dt class="bd">插入视频</dt><dd class="bd"><p class="name">输入视频地址</p><p class="form"><input type="text" value=""><a href="">确定</a></p></dd></dl></div>';


        //遍历li
        parent.each(function () {
            var _this = $(this);
            var span = $(this).find('span');
            var isDrop=_this.find('.drop');

            //1.每一个li.video都新增加2个浮层
            if(isDrop.length<1){
                _this.append(videoStr);
                _this.append(insertStr);
            }

            var _drop=_this.find('.drop');
            var _dropUrl=_drop.find('.url');
            var _insert=_this.find('.insert');

            //2.点击视频图标
            _this.on('click', 'span',function (e) {
                _drop.show();
                e.preventDefault();
                e.stopPropagation();
            });

            //3.点击插入视频地址
            _dropUrl.on('click',function () {
                _insert.show();
            });

            //4.阻止input框关闭浮层
            _insert.on('click','input',function (e) {
                e.preventDefault();
                e.stopPropagation();
            });


            //获取输入视频地址弹出框
            _this.on('click', '.url', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });


            //点击多余部分关闭
            $(document).on('click', function () {
                _this.find('.drop').hide();
                _this.find('.insert').hide();
            });

        });
    },
    modalExample:function () {
        var modal=$('.modal_example');
        modal.on('click','a[data-type="modalExample"]',function () {
            modal.fadeIn(200);
            modal.append('<div class="overbg"></div>');
            $('body').css('overflow','hidden');
        });
        // var overbg=modal.find('.overbg');
        modal.on('click','.overbg',function () {
            modal.fadeOut(200);
            $(this).remove();
            $('body').css('overflow','');
        });
    },
    addCard:function () {//添加新信息
        var str='<section class="card">'+
                    '<div class="bd head"><span><input class="new_input" style="font-size:20px;" type="text" placeholder="模块标题"></span></div>'+
                    '<div class="textarea">'+
                        '<textarea name="" placeholder="输入内容介绍..."></textarea>'+
                    '</div>'+
                    '<div class="handle_up">'+
                        '<ul class="bd">'+
                            ' <li class="img">'+
                                ' <span><i class="icon"></i></span>'+
                            ' </li>'+
                            '<li class="video">'+
                                '<span><i class="icon"></i><em class="icon arrow"></em></span>'+
                            '</li>'+
                        '</ul>'+
                    '</div>'+
                '</section>';
        var parent= $('.ipt_base .ancestry');
        var el = parent.find('a[data-type="addCard"]');

        el.on('click',function () {
            $(this).before(str);
            ancestryPgae.upload();
            $('.new_input').focus();
            return false;
        });

    }
};




$(function () {
    // effectInputs.imageUpload();
})