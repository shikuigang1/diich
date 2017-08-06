/*--//End 左侧菜单--*/

var centerPage = {
    init: function () {
        this.slide.init();
    },
    slide: {//左侧导航
        init: function () {
            var _this = this;
            var slide = $('#slide');
            var nav = slide.find('.nav');
            var content = $('#content');
            var isFirst = true;
            var type = '';

            //1.左侧菜单
            nav.find('li div.dd a:last-child').css('margin-bottom', '0');
            nav.find('li:last-child').css('margin-bottom', '0');
            //2.效果
            _this.handle(nav,content);

            //3.第一次加载
            if (isFirst) {
                type = 'masterDeclareTpl';
                _this.loadTpl(content, type);
                isFirst = false;
            }

        },
        handle: function (nav,content) {//点击展开收起
            var _this=this;
            var aLi = nav.find('li');
            aLi.eq(0).addClass('selected');

            //1.点击一级菜单
            aLi.on('click', 'a.dt', function () {
                var _dd = $(this).siblings('.dd');
                var _li = $(this).parent();
                var _sLi = _li.siblings('li');

                _li.addClass('selected').siblings('li').removeClass('selected');
                _dd.slideToggle('fast');
                _sLi.find('.dd').slideUp('fast');
                _sLi.find('.dd a').removeClass('selected');
                isSelected();
            });

            //2.点击二级菜单
            aLi.on('click', '.dd a', function () {
                $(this).addClass('selected').siblings('a').removeClass('selected');



            });

            //3.加载模版
            aLi.on('click', 'a', function () {
                var type = $(this).attr('data-type');
                if (type != '' && type) {
                    _this.loadTpl(content, type);
                }
                return false;
            });

            isSelected();
            //判断是否选中 添加line
            function isSelected() {
                aLi.each(function () {
                    if ($(this).hasClass('selected')) {
                        if ($(this).find('.line').length == 0) {
                            $(this).append('<i class="line"></i>');
                        }
                    } else {
                        $(this).find('.line').remove();
                    }
                });
            }

        },
        loadTpl: function (el, type) {
            var _el = el;
            _el.load('Tpl/' + type + '.html', function () {



                centerPage.declare.tabs();
                //删除
                centerPage.declare.delete({
                    buttons:true,
                    title:'确定删除吗？',
                    text:'啊斯柯达哈吉卡死活动空间啊哈加快速度黄金卡和设计肯定和',
                    callback:function (data) {
                        alert('我点击了确定'+data);
                    }
                });

                //查看原因
                centerPage.declare.reason({
                    buttons:false,
                    title:'申报未通过原因',
                    text:'申报未通过原因申报未通过原因，申报未通过原因申报未通过原因，申报未通过原因申报未通过原因。'
                });

                if (type === 'masterDeclareTpl') {//传承人
                    var tips = _el.find('.tips');
                    centerPage.cutString(tips, 24);
                } else if (type === 'collectTpl') {//我的收藏
                    var brief = _el.find('.brief');
                    var cate = _el.find('.cate .attr');
                    centerPage.cutString(cate, 46);
                    centerPage.cutString(brief, 90);
                }
            });
        }
    },
    declare: {//我的申报
        tabs: function () {
            var parent = $('#content');
            parent.on('click', '.tabs span', function () {
                var _index = $(this).index();
                $(this).addClass('selected').siblings('span').removeClass('selected');
                parent.find('.item').eq(_index).show().siblings('.item').hide();
            });
        },
        delete:function (options) {//删除
            this.modal('a[data-type=delete]',options);
        },
        reason:function (options) {//查看原因
            this.modal('*[data-type=reason]',options);
        },
        modal:function (el,options) {
            var content = $('#content');
            content.on('click', el, function () {
                centerPage.confirm.init(options);
                return false;
            });
        }
    },
    cutString: function (el, limit) {//截取文字
        el.each(function () {
            var text = $(this).text();
            var cause = $(this).siblings('.cause');
            if (text.length > limit) {
                $(this).text(text.substring(0, limit - 2) + '...');
            } else {
                cause.hide();
            }
        });
    },
    confirm:{
        init:function (options) {
            this.template(options);
        },
        template:function (options) {
            //操作按钮
            var _handle,_confirm='';
            _handle = options.buttons?'<div class="handle"><a class="cancel">取消</a><a class="sure">确定</a></div>':'';
            _confirm='<div class="confirm">' +
                        '    <div class="head">'+options.title+'<span class="close"></span></div>' +
                        '    <div class="content"><div class="text scrollbar">'+options.text+'</div></div>' +
                            _handle +
                        '</div>';
            $('body').append(_confirm);
            var confirm=$('.confirm');
            confirm.fadeIn('fast');
            //点击确定
            confirm.on('click','.sure',function () {
                if(options.callback || options.callback!='undefinied'){
                    options.callback(true);
                    confirm.remove();
                }
            });
            //点击取消
            confirm.on('click','.cancel,.close',function () {
                confirm.remove();
            });
        }
    }
};
/*--//End--*/

$(function () {
    centerPage.init();
});