var renderHhtml = {
    init: function () {
        this.header();
        this.footer();
        this.filter();
    },
    header: function () { //导航
        var htmlStr = `<div class="content">
            <a class="logo" href=""></a>
            <div class="nav">
                <ul>
                    <li class="active"><a href="http://localhost:3000/首页.html">首页</a></li>
                    <li><a href="http://localhost:3000/非遗名录.html">非遗名录</a></li>
                    <li><a href="http://localhost:3000/非遗大师.html">非遗大师</a></li>
                    <li><a href="http://localhost:3000/精选内容.html">精选内容</a></li>
                    <li><a href="http://localhost:3000/非遗资讯.html">非遗资讯</a></li>
                    <li><a href="http://localhost:3000/官方服务.html">官方服务</a></li>
                    <li><a href="http://localhost:3000/我要申报.html">我要申报</a></li>
                </ul>
            </div>
            <div class="info">
                <ul>
                    <li class="login"><a class="active" href="javascript:;"><i class="icon"></i><em>登录</em></a></li>
                    <li class="language">
                        <a class="zh active" href="javascript:;"><em>中文</em></a>
                        <a class="en" href="javascript:;"><em>EN</em></a>
                    </li>
                    <li class="search">
                        <i class="icon"></i>
                    </li>
                </ul>
            </div>
        </div>
        <!--//End content-->
        <div class="drop_menu">
            <div class="content">
                <div class="item">
                    <dl>
                        <dt>口头传说和表述</dt>
                        <dd>
                            <a href="">语言</a>
                            <a href="">文字</a>
                            <a href="">口述</a>
                            <a href="">其他口头传统<br>及表述</a>
                        </dd>
                    </dl>
                </div>
                <!--//End-->

                <div class="item">
                    <dl>
                        <dt>表演艺术</dt>
                        <dd>
                            <a href="">音乐演奏</a>
                            <a href="">舞蹈</a>
                            <a href="">民歌</a>
                            <a href="">传统戏剧</a>
                            <a href="">曲艺</a>
                            <a href="">传统体育、游艺与杂技</a>
                            <a href="">其他表演艺术</a>
                        </dd>
                    </dl>
                </div>
                <!--//End-->

                <div class="item">
                    <dl>
                        <dt>社会风俗<br>礼仪、节庆</dt>
                        <dd>
                            <a href="">生产商贸习俗</a>
                            <a href="">生活习俗</a>
                            <a href="">人生仪式</a>
                            <a href="">节日庆典</a>
                            <a href="">其他仪式及庆典</a>
                        </dd>
                    </dl>
                </div>
                <!--//End-->

                <div class="item">
                    <dl>
                        <dt>有关自然界和<br>宇宙的知识和实践</dt>
                        <dd>
                            <a href="">农林牧畜渔</a>
                            <a href="">服装</a>
                            <a href="">食品</a>
                            <a href="">住房与建筑</a>
                            <a href="">交通</a>
                            <a href="">旅行</a>
                            <!--</dd>-->
                            <!--<dd>-->
                            <a href="">医、药</a>
                            <a href="">军事防御</a>
                            <a href="">商贸</a>
                            <a href="">工业、工程</a>
                            <a href="">天文、地理、水文等</a>
                            <a href="">其他自然知识和实践</a>
                        </dd>
                    </dl>
                </div>
                <!--//End-->

                <div class="item">
                    <dl>
                        <dt>传统的手工艺技能</dt>
                        <dd>
                            <a href="">工具及机械制作</a>
                            <a href="">髹饰工艺</a>
                            <a href="">家畜农林产品加工</a>
                            <a href="">织染工艺</a>
                            <a href="">造纸、印刷机装裱</a>
                            <a href="">编扎工艺</a>
                            <a href="">字画工艺</a>
                            <a href="">锻冶工艺</a>
                            <a href="">剪刻工艺</a>

                            <a href="">雕塑工艺</a>
                            <a href="">烧造工艺</a>
                            <a href="">木作工艺</a>
                            <a href="">其他类</a>


                        </dd>
                    </dl>
                </div>


            </div>
        </div>
        <!--//End drop_menu-->
        
        `;
        this.base('.header', htmlStr);
    },
    footer: function () { //底部
        var htmlStr = `<div class="diich">
        <div class="hd">
            <p class="name"><span>DIICH</span><em>非遺國際</em></p>
            <p class="subname">2017 © EFeiYi. All rights reserved</p>
        </div>
    </div>
    <!--//End diich-->
    <div class="main">
        <div class="hd">
            <div class="lbox">
                <div><span>项目概况</span><em>tel：400-876-8766</em></div>
                <div><span>重大活动</span><em>email：efeiyi@efeiyi.com</em></div>
                <div><span>合作资源</span><em>地址：北京市东城区前门大街72&74号二层</em></div>
                <div><span>业务体系</span><em>add：2Floor，72&74,Qian Men ST.Dongcheng District,Beijing,China</em></div>
            </div>
            <!--//End lbox-->
            <div class="rbox">
                <div class="share">
                    <a href="" class="facebook" title="facebook"></a>
                    <a href="" class="twitter" title="twitter"></a>
                    <a href="" class="instagram" title="instagram"></a>
                    <a href="" class="linkedin" title="linkedin"></a>
                    <span class="code"><img src="../assets/images/footer_code.png" alt=""></span>
                </div>
            </div>
        </div>
    </div>
    <!--//ENd main-->`;
        this.base('.footer', htmlStr);
    },
    filter: function () {
        var htmlStr = `<div class="content">
        <form class="form" action="">
            <input class="ipt" type="text" value="从这里搜索您感兴趣的...">
            <input class="submit" type="submit" value="搜索">
            <div class="suggest" style="display: block;">
                <ul>
                    <li><a href=""><span>苏州</span>传承人</a></li>
                    <li><a href=""><span>苏州</span>苏绣</a></li>
                    <li><a href=""><span>苏州</span>苏绣</a></li>
                    <li><a href=""><span>苏州</span>苏绣</a></li>
                    <li><a href=""><span>苏州</span>苏绣</a></li>
                    <li><a href=""><span>苏州</span>苏绣</a></li>
                    <li><a href=""><span>苏州</span>苏绣</a></li>
                    <li><a href=""><span>苏州</span>苏绣</a></li>
                    <li><a href=""><span>苏州</span>苏绣</a></li>
                </ul>
            </div>
        </form>
        <!--//End form-->

        <div class="attr">
            <span>所属类别</span>
            <span>全球</span>
        </div>
        <!--//End attribute-->

        <div class="dropbox" id="drag">
            <div class="item">
                <dl class="level">
                    <dt>
                    <div class="title">一级分类</div>
                    <div class="subtitle">所有分类</div>
                    </dt>
                    <dd>
                        <ul>
                            <li>口头传统和表述</li>
                            <li>表演艺术</li>
                            <li>社会风俗、礼仪、节庆</li>
                            <li>有关自然界和宇宙的知识和实践</li>
                            <li>传统的手工艺技能</li>
                            <li>传统的手工艺技能</li>
                            <li>传统的手工艺技能</li>
                            <li>传统的手工艺技能</li>
                            <li>传统的手工艺技能</li>
                            <li>传统的手工艺技能</li>
                        </ul>
                    </dd>
                </dl>
                <dl class="level2">
                    <dt>
                    <div class="title">二级分类</div>
                    <div class="subtitle">所有二级分类</div>
                    </dt>
                    <dd>
                        <ul>
                            <li>工具和机械制作</li>
                            <li>家畜农林产品加工</li>
                            <li>造纸、印刷及装裱</li>
                            <li>烧造工艺</li>
                            <li>锻冶工艺</li>
                            <li>雕塑工艺</li>
                            <li>雕塑工艺</li>
                            <li>雕塑工艺</li>
                            <li>雕塑工艺</li>
                            <li>雕塑工艺</li>
                        </ul>
                    </dd>
                </dl>
            </div>
            <!--//End 所属分类-->
            <div class="item">
                <dl class="level">
                    <dt>
                    <div class="title">位置</div>
                    </dt>
                    <dd>
                        <ul>
                            <li>全球</li>
                            <li>中国</li>
                            <li>非洲</li>
                            <li>阿拉伯地区</li>
                            <li>亚太</li>
                            <li>欧美</li>
                            <li>拉美</li>
                        </ul>
                    </dd>
                </dl>
                <dl class="level2">
                    <dt>
                    <div class="title">按照字母顺序</div>
                    </dt>
                    <dd>
                        <ul>
                            <li>安微</li>
                            <li>澳门</li>
                            <li>北京</li>
                            <li>上海</li>
                            <li>福建</li>
                            <li>甘肃</li>
                            <li>广东</li>
                        </ul>
                    </dd>
                </dl>
            </div>
            <!--//End 位置-->
        </div>
        <!--//End attribute-->
    </div>`;
        this.base('.filter_search', htmlStr);
    },
    base: function (obj, html) {
        var _el = $(obj);
        _el.html(html);
    }
};
/*--//End 公共的html--*/

var data = {
    //昆曲项目
    kqProject:['项目简介','代表性作品','表演方式','演奏乐器','场景','唱腔','舞台道具'],
    //昆曲传承人 //TODO
    kqMaser:['','','','','','','','','',],
    //苏绣项目
    sxProject:['项目简介','传承谱系','代表性作品','历史渊源','基本内容','项目特征','主要价值','频危状况'],
    //苏绣传承人
    sxMaster:['传承人简介','传承人谱系','代表性作品','技能特点','领域活动','荣誉称号']
};


var utils = {
    pad: function (num, length) { //个位数补零
        if (!length) {
            length = 10;
        }
        return ("0" + num).substr(-length);
    },
    scroll: function () { //楼层
        var _ul = $('.side_fixed ul'); //导航
        var _floor = $('section.floor'); //楼层
        var _nav = $('.card header h4'); //楼层标题
        var arr = []; //把pros对应的几个位置标示出来

        //获取所有楼层标题
        _nav.each(function (i) { //给右侧悬浮添加标题
            _ul.append('<li><span>' + $(this).text() + '</span><strong>0' + (i + 1) + '</strong></li>');
        });
        var _li = _ul.find('li');


        //滚动
        _floor.each(function () { //标记所有楼层导航的高度
            var offsettop = $(this).offset().top;
            arr.push(parseInt(offsettop)); //火狐有半个像素的情况，故取整
        });

        $(window).scroll(function () {
            var d = parseInt($(document).scrollTop());
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] >= d) {
                    break;
                }
            }
            _li.removeClass('active');
            if (i == arr.length) {
                i--;
            }
            if (i > 0) {
                _li.eq(i - 1).addClass('active');
            }
        });

        //点击回到当前楼层
        _ul.on('click', 'li', function () {
            var _index = $(this).index();
            var _top = _floor.eq(_index).offset().top;
            $(this).addClass('active').siblings('li').removeClass('active');
            $('html,body').stop(true).animate({'scrollTop': _top + 'px'}, 500);
        });

    },
    headerScroll: function () { //页面滚动导航悬浮
        var _header = $('#home-header');
        var _top = $('.gotop');
        var _filter = $('.filter_search_fixed');

        if (_header) {
            $(window).scroll(function () {
                if ($(window).scrollTop() > 630) {
                    _header.addClass('active');
                    _top.css('opacity', '1');
                } else {
                    _header.removeClass('active');
                    _top.css('opacity', '0');
                    _filter.slideUp('fast');
                }
            });
        }

    },
    //隐藏文字 点击展开
    lgTextShow: function () {
        var obj = $('div[data-type="lgText"]');

        obj.each(function () {
            var el = $(this).find('.text_more');
            var text = $(this).find('.text');
            var totalNum = text.html().length; //总字数
            var limit = $(this).attr('data-number');

            if (totalNum > limit) {
                var oldText = text.html(); //原始文本
                var oldHeight = text.height();
                var showText = oldText.substring(0, limit); //最终显示的文本

                text.html(showText + '...');
                var showHeight = text.height(); //截取后的高度
                text.css('height', showHeight);

                el.on('click', function () {
                    var _this = $(this);

                    if (_this.hasClass('active')) {
                        _this.removeClass('active');
                        text.html(showText).animate({height: showHeight}, 200);
                    } else {
                        $('.row_img li .lbox').css('height', oldHeight);

                        _this.addClass('active');
                        text.html(oldText).animate({height: oldHeight}, 200);
                    }


                });


            }


            // var _height=text.css('height');
            // var el=$(this).find('.text_more');

        });


    }
};
/*--//End 公共的效果--*/

//通用
var common={
    init:function () {
        utils.headerScroll();
        renderHhtml.header();
        renderHhtml.footer();
        this.mainBg();
        this.share();
        this.praise();
        this.productsTab();
        this.productsHover();
        this.history();
        utils.lgTextShow();
    },
    mainBg: function () { //首屏图片 视频

        var _img = $('.img_bg');
        _img.each(function () {
            var imgW = $(this).width();
            var imgH = $(this).height();
            $(this).css({
                'margin-top': -parseInt(imgH / 2) + 'px',
                'margin-left': -parseInt(imgW / 2) + 'px',
            });
        });


    },
    share: function () { //分享
        var obj = $('.base .main .floor');

        obj.each(function () {
            var _share = $(this).find('a.share');
            var _shareBox = $(this).find('.share_box');
            //弹出框
            _share.on('click', function () {
                _shareBox.stop(true).fadeToggle();
                return false;
            });

            _shareBox.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $(document).on("click", function () {
                _shareBox.fadeOut();
            });
        });
    },
    praise: function () { //点赞功能
        var obj = $('.base .main .floor');
        var praise = obj.find('.praise');
        praise.on('click', function () {
            var _this = $(this);

            //创建动画数字
            if (_this.hasClass('active')) { //取消点赞
                _this.removeClass('active');
                _this.append('<div class="add"><b>-1</b></div>');
                animateNum('.add');
            } else { //点赞
                _this.addClass('active');
                _this.append('<div class="add"><b>+1</b></div>');
                animateNum('.add');

            }

            function animateNum(obj) {
                $(obj).css({
                    'position': 'absolute',
                    'z-index': '1',
                    'color': '#C30',
                    'left': '5px',
                    'top': '-15px',
                }).animate({
                    left: 15,
                    top: -30
                }, 'slow', function () {
                    $(this).fadeIn('fast').remove();
                });
            }

        });

    },
    productsTab: function () { //作品分页
        var _products = $('.product');
        _products.each(function () {
            //分页相关属性
            var _page = $(this).find('.page'); //分页显示容器
            var _sShow = _page.find('span.show'); //当前页数
            var _sToal = _page.find('span.total'); //当前页数
            var _sPrev = _page.find('span.prev');
            var _sNext = _page.find('span.next');
            //列表相关属性
            var _ul = $(this).find('ul'); //获取列表ul
            var _li = _ul.find('li'); //获取列表li
            var liLen = _li.length; //获取列表的length
            var cur = 0;

            var currentNum = 3; //当前页显示个数
            var total = Math.ceil(liLen / currentNum); //分页总数
            _sToal.html(utils.pad(total));
            _sShow.html(utils.pad(1));
            _sPrev.addClass('active');

            // console.log(_li)


            //下一页
            _sNext.on('click', function () {
                _sPrev.removeClass('active');
                if (cur < total - 1) {
                    cur++
                }

                if (cur == total - 1) {
                    $(this).addClass('active');
                }

                $(this).parents('.page').siblings('ul').animate({'margin-left': -cur * 1200 + 'px'}, 300);
                _sShow.html(utils.pad(cur + 1));

            });


            //上一页
            _sPrev.on('click', function () {
                _sNext.removeClass('active');
                if (cur > 0) {
                    cur--;
                }

                if (cur == 0) {
                    $(this).addClass('active');
                }

                $(this).parents('.page').siblings('ul').animate({'margin-left': -cur * 1200 + 'px'}, 300);
                _sShow.html(utils.pad(cur + 1));
            });


        });
    },
    scroll: function (data) {
        // var data = ['传承人简介', '传承人谱系', '代表性作品', '技能特点', '领域活动', '荣誉称号'];
        var model = $('.model_fixed');
        var obj = model.find('ul');
        var floor = $('section.floor');
        var arr = []; //把pros对应的几个位置标示出来

        //获取所有楼层标题
        obj.each(function () {
            for (var i = 0; i < data.length; i++) {
                obj.append('<li><i></i><span class="active">' + data[i] + '0' + (i + 1) + '</span><span class="default">' + data[i] + '</span></li>');
            }
        });
        var _li = obj.find('li');

        //滚动
        floor.each(function () { //标记所有楼层导航的高度
            var offsettop = $(this).offset().top;
            arr.push(parseInt(offsettop)); //火狐有半个像素的情况，故取整
        });

        $(window).scroll(function () {
            var d = parseInt($(document).scrollTop());
            if (d > 800) {
                model.fadeIn(100);
            } else {
                model.fadeOut(100);
            }

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] > d) {
                    break;
                }
            }

            _li.removeClass('active');
            if (i > 0) {
                _li.eq(i - 1).addClass('active');
            }
            if (i == arr.length) {
                i--;
            }
        });

        //右侧楼层选中效果
        _li.on('click', function () {
            var _index = $(this).index();
            var _top = floor.eq(_index).offset().top;

            $('html,body').stop(true).animate({'scrollTop': _top + 'px'}, 500);
            $(this).addClass('active').siblings('li').removeClass('active');
        });


    },
    //代表性作品hover
    productsHover: function () {
        var parent = $('.product');
        var el = parent.find('li');
        var mask = el.find('.mask');
        if (mask) {
            el.hover(function () {
                $(this).find('.mask').stop(true).fadeIn(100);
            }, function () {
                $(this).find('.mask').stop(true).fadeOut(100);
            })
        }
    },
    //历史渊源
    history: function () {
        var parent = $('.history');
        var tab = parent.find('.tab span');
        var item = parent.find('.context .item');

        tab.on('click', function () {
            var _index = $(this).index();
            $(this).addClass('active').siblings('span').removeClass('active');
            item.eq(_index).show().siblings('.item').hide();
        })

    }
};


//标杆昆曲2.1.1
var kxProject = {
    init:function () {
        common.init();
        common.scroll(data.kqProject)
    }
};

//标杆昆曲2.1.2
var kxMaster = {//TODO
    init:function () {
        common.init();
        // common.scroll(data.kxMaster)
    }
};



//标杆苏绣2.1.1
var sxProject = {
    init:function () {
        common.init();
        common.scroll(data.sxProject)
    }
};

//标杆苏绣2.1.2
var sxMaster = {
    init:function () {
        common.init();
        common.scroll(data.sxMaster)
    }
};

