//首页静态数据
var homeData={
    column:[//栏目标题
        {zhTitle:'非遗项目',enTitle:'ICH Project'},
        {
            zhTitle:'非遗在全球',
            enTitle:'intangible cultural heritage in the world',
            zhIntro:'截至2005年7月，世界上有170多个国家成为《保护世界文化和自然公约》的缔约国，已有788处遗产列入《世界遗产名录》，47个列入非物质遗产名录。点击地图，查看全球各地非遗名录。',
            enIntro:'As of July 2005, there are more than 170 countries in the world become "The protection of the world cultural and natural Convention" States parties. There are 788 heritage included in the world heritage list. 47 included in the list of Intangible Heritage. Click on the map, Check the list of intangible cultural heritage around the world.'
        },
        {zhTitle:'非遗资讯',enTitle:'Intangible information'},
        {zhTitle:'非遗保护计划',enTitle:'ICH protection plan'},
        {
            zhTitle:'非遗入驻',
            enTitle:'ICH Apply for',
            zhIntro:'诚邀您入驻联合国教科文组织非遗大数据平台。<br/> 点击“我要入驻”进入非遗大数据平台信息收录系统进行资料录入。填写完成并提交后将由大数据平台评审委员会进行数据审核，<br/> 以确保提交内容真实、可信。审核通过后，数据将入驻非遗大数据平台，并获得唯一ID编码。',
            enIntro:'Welcome to UNESCO non-large data platform.By UNESCO International Organization for the Study of the Unesco, the establishment of a group of experts in the protection of intangible cultural heritage. For all projects, the successor uploaded information for expert review.The panel of experts rigorously selected non-cultural standards and carefully screened them. The group eventually settled in the big data platform to ensure that the content of the settlement is authentic and credible.',
            zhBtn:'我要入驻',
            enBtn:'Apply for',
        },
    ]
};

/**
 * 列表滚动
 * @param { el } 目标元素
 * @param { num } 滚动的li数量
 */
var sliderUlList = function (el,num) {
    var parent = $(el);
    var _ul=parent.find('.col-item ul');
    var _li=_ul.find('li');
    var _liWidth=_li.outerWidth(true); //每个li的宽度 包含margin
    var _liLen=_li.length; //所有li的数量
    var distance=_liWidth*num; //每次滚动距离

    var speed=500; //滚动速度
    var cur=0;  //初始页数
    var total=Math.ceil(_liLen/num)-1; //总页数

    //1.计算ul的宽度
    _ul.css({'width':_liWidth*_liLen+'px'});

    //2.下一页
    parent.on('click','.next',function () {
        if(cur<total) cur++;
        _ul.stop(true).animate({'margin-left':-cur*1200+'px'},speed);
    });

    //3.上一页
    parent.on('click','.prev',function () {
        if(cur>0) cur--;
        _ul.stop(true).animate({'margin-left':cur*distance+'px'},speed);
    });
}

//渲染轮播图
renderTemplate({
    url: api.index.banner,
    el: '#banner',
    success: function (res) {
        var parent = $('#banner');
        //截取字数
        textCut(parent.find('dd'), 100);

        //轮播图效果
        var imgLi = parent.find('ul.img li'); //图片
        var imgLen = imgLi.length;
        var numLi = parent.find('ul.num li'); //索引
        var text = parent.find('.text dl'); //索引
        var cur = 0;
        var speed = 5000;
        var timer = null;
        numLi.mousedown(function () {
            clearInterval(timer);
            cur = $(this).index();
            $(this).addClass('active').siblings('li').removeClass('active');
            imgLi.eq(cur).stop(true, true).fadeIn().siblings('li').fadeOut();
            text.eq(cur).stop(true, true).fadeIn().siblings('dl').fadeOut();
        });

        numLi.mouseup(function () {
            timer = setInterval(slider, speed);
        });

        //轮播
        timer = setInterval(slider, speed);

        function slider() {
            if (cur < imgLen - 1) {
                cur++;
            } else {
                cur = 0;
            }
            numLi.eq(cur).addClass('active').siblings('li').removeClass('active');
            imgLi.eq(cur).stop(true).fadeIn().siblings('li').fadeOut();
            text.eq(cur).stop(true).fadeIn().siblings('dl').fadeOut();
        }

    }
})


//非遗项目选择分类
var renderProjectTemplate = function () {
    var obj = $("#project-list");
    var result = {
        category:'',
        area:'',
        keyword:''
    };


    //点击展开
    obj.on('click','.title',function (e) {
        e.stopPropagation();
        var _data=null;
        var group=$(this).parents('.group');
        var type=$(this).data('type');
        //0代表分类 1代表地区
        _data=(type==0)?category_all:dic_arr_city;

        obj.find('.group').removeClass('active');
        obj.find('dl').hide();
        obj.find('dl dd').html('');
        group.toggleClass('active');
        group.find('dl').eq(0).find('dd').html(renderLiHtml(type,_data));
        group.find('dl').eq(0).show();
        group.find('input').focus();

    });

    //点击
    obj.on('click','.links li',function () {
        var parent=$(this).parents('.group');
        var type=$(this).data('type');
        var _id=$(this).data('id'); //code
        if(type==0){//分类
            result.category=_id;
        }else {//地区
            result.area=_id;
        }
        parent.find('.title .t2').html($(this).text());
        parent.find('dl').hide();
        parent.removeClass('active')
    });

    //滑动
    obj.on('mouseover','.links li',function () {
        var _data=null;
        var parent=$(this).parents('dl');
        var type=$(this).data('type');
        _data=(type==0)?category_all:dic_arr_city;

        if(parent.hasClass('first')){
            if(_data[$(this).index()].children.length && _data[$(this).index()].children.length!='undefined'){
                parent.siblings('dl').find('dd').html(renderLiHtml(type,_data[$(this).index()].children));
                parent.siblings('dl').show();
            }else {
                parent.siblings('dl').hide();
            }
        }
    });

    //关键词
    obj.find('.keyword').blur(function () {
        result.keyword=$(this).val();
    });

    //搜索
    $('#search').on('click',function () {
        var url='/page/search.html?'+'gb_category_code='+result.category+'&area='+result.area+'&keyword='+result.keyword;
        window.location.href=url;
    });

    //点击页面关闭弹出框
    $(document).on('click',function () {
        var parent=$('#project-list');
        parent.find('.group').removeClass('active');
        parent.find('dl').hide();
    });

    /**
     * 渲染li模版
     * @param {点击的索引} index
     * @param {数据源} data
     */
    function renderLiHtml(type,data) {
        var html = '';
        if(type==0){
            $.each(data,function (i) {
                html += '<li data-type="0" data-id="' + data[i].gbCategory + '"><a>' + data[i].name + '</a></li>';
            });
        }else if(type==1) {
            $.each(data,function (i) {
                html += '<li data-type="1" data-id="' + data[i].code + '"><a>' + data[i].name + '</a></li>';
            });
        }
        return '<ul class="scrollbar">'+html+'</ul>';
    }
}

//非遗项目
renderTemplate({
    url: api.index.project,
    el: '#project-slider',
    success: function (res) {
        //中英文切换
        $('.project .big-title h3').html(manageLanguageDate({
            zh:homeData.column[0].zhTitle,
            en:homeData.column[0].enTitle,
        }));
        sliderUlList('#project-slider',4);
    }
})

//地图
var renderMapTemplate = function () {
    //处理中英文
    $('#global').each(function () {
        $(this).find('h3').html(manageLanguageDate({
            zh:homeData.column[1].zhTitle,
            en:homeData.column[1].enTitle,
        }));

        $(this).find('.text span').html(manageLanguageDate({
            zh:homeData.column[1].zhIntro,
            en:homeData.column[1].enIntro,
        }));

    })





    var data = [
        {
            name: '克罗地亚',
            en: 'Croatia',
            style: 'top:120px;left:512px;',
            count: '共计14项非遗项目',
            desc: '克罗地亚北部的姜饼制作技艺、奥耶康卲演唱方式、锡尼斯卡圆环骑士竞赛',
            present: '具有代表性项目有：'
        },
        {
            name: '希腊',
            en: 'Greece',
            style: 'top:162px;left:490px;',
            count: '共计3项非遗项目',
            desc: '希俄斯岛玛蒂脂制作工艺、提尼安岛大理石工艺',
            present: '具有代表性项目有：'
        },
        {
            name: '墨西哥',
            en: 'Mexico',
            count: '共计9项非遗项目',
            style: 'top: 206px;left: 158px',
            desc: '土著亡灵节、飞人典礼',
            present: '具有代表性项目有：'
        },
        {
            name: '巴西',
            en: 'Brazil',
            style: 'top: 322px;left: 302px',
            count: '共计8项非遗项目',
            desc: '巴亥瑞康卡乌的圆圈桑巴舞、瓦雅皮人的口头和图画表达形式',
            present: '具有代表性项目有：'
        },
        {
            name: '阿根廷',
            en: 'Argentina',
            style: 'top: 390px;left: 256px',
            count: '共计1项非遗项目',
            desc: '布宜诺斯艾利斯的传统装饰画绘画技巧',
            present: '具有代表性项目有：'
        },
        {
            name: '比利时',
            en: 'Belgium',
            style: 'top:76px;left:472px',
            count: '共计11项非遗项目',
            desc: '比利时啤酒文化、东戴恩克尔克骑马捕虾、班什狂欢节',
            present: '具有代表性项目有：'
        },
        {
            name: '匈牙利',
            en: 'Hungary',
            style: 'top: 102px;left: 502px;',
            count: '共计4项非遗项目',
            desc: '莫哈奇的冬末面具狂欢节、保护传统民俗音乐的柯达伊概念',
            present: '具有代表性项目有：'
        },
        {
            name: '法国',
            en: 'France',
            style: 'top: 102px;left: 459px;',
            count: '共计14项非遗项目',
            desc: '法国美食大餐、法国传统马术、奥布松挂毯',
            present: '具有代表性项目有：'
        },
        {
            name: '德国',
            en: 'Germany',
            style: 'top:82px;left:484px;',
            count: '共计1项非遗项目',
            desc: '合作社组织共同分享利益的理念和方法',
            present: '具有代表性项目有：'
        },
        {
            name: '意大利',
            en: 'Italy',
            style: 'top: 119px;left: 471px;',
            count: '共计5项非遗项目',
            desc: '克雷莫纳的传统小提琴工艺、西西里木偶剧',
            present: '具有代表性项目有：'
        },
        {
            name: '土耳其',
            en: 'Turkey',
            style: 'top: 179px;left: 513px;',
            count: '共计13项非遗项目',
            desc: '土耳其咖啡、土耳其水拓画、科萨克传统仪式',
            present: '具有代表性项目有：'
        },
        {
            name: '沙特阿拉伯',
            en: 'Saudi Arabia',
            style: 'top: 222px;left: 552px;',
            count: '共计2项非遗项目',
            desc: 'Almezmar,应和鼓点节奏的棍舞、Alardah Alnajdiyah,沙特阿拉伯的舞蹈、鼓乐和诗歌',
            present: '具有代表性项目有：'
        },
        {
            name: '印度',
            en: 'India',
            style: 'top: 224px;left: 640px;',
            count: '共计11项非遗项目',
            desc: '瑜伽、拉达克的佛经诵读，在印度查谟和克什米尔地区跨喜马拉雅的拉达克诵读神圣的佛教经文',
            present: '具有代表性项目有：'
        },
        {
            name: '蒙古',
            en: 'Mongolia',
            style: 'top: 124px;left: 666px;',
            count: '共计11项非遗项目',
            desc: '马头琴传统音乐、蒙古传统艺术呼麦、那达慕大会',
            present: '具有代表性项目有：'
        },
        {
            name: '中国',
            en: 'China',
            style: 'top: 177px;left: 734px;',
            count: '共计39项非遗项目',
            desc: '京剧、中国书法、中医针灸、端午节',
            present: '具有代表性项目有：'

        },
        {
            name: '日本',
            en: 'Japan',
            style: 'top: 188px;left: 798px;',
            count: '共计21项非遗项目',
            desc: '歌舞伎、和食，日本的传统饮食文化，常见于新年庆祝活动、和纸，日本的传统手工造纸工艺',
            present: '具有代表性项目有：'
        },
        {
            name: '韩国',
            en: 'Korea',
            style: 'top: 189px;left: 769px',
            count: '共计17项非遗项目',
            desc: '韩国传统泡菜制作工艺、江陵端午祭',
            present: '具有代表性项目有：'
        },
        {
            name: '印度尼西亚',
            en: 'Indonesia',
            style: 'top: 298px;left: 744px',
            count: '共计8项非遗项目',
            desc: '哇扬皮影偶戏、印度尼西亚的蜡染印花工艺',
            present: '具有代表性项目有：'
        },
        {
            name: '西班牙',
            en: 'Spain',
            style: 'top: 183px;left: 426px',
            count: '共计13项非遗项目',
            desc: '弗拉明戈、叠人塔',
            present: '具有代表性项目有：'
        },
        {
            name: '越南',
            en: 'Vietnam',
            style: 'top: 246px;left: 709px',
            count: '共计11项非遗项目',
            desc: '歌筹、雅乐——越南宫廷音乐',
            present: '具有代表性项目有：'
        }

    ];
    var map = $('#map');
    map.find('span').remove();
    var broWidth = document.documentElement.clientWidth;  //浏览器可视宽度
    var modal = map.find('.modal');
    var zh = modal.find('.zh');
    var en = modal.find('.en');
    var count = modal.find('.count');
    var name = modal.find('.name');
    var txt = modal.find('.content .txt');
    var more = modal.find('.content .more');
    var str = '';
    var active = '';
    for (var i = 0; i < data.length; i++) {
        if (i == 14) {
            active = ' active';
        } else {
            active = '';
        }
        str += '<span class="breathe item' + (i + 1) + active + '" style="' + data[i].style + '" title="' + data[i].name + '"></span>';
    }
    map.append(str);


    getData(14);
    var _span = map.find('span');

    //初始化计算
    var leftOffset = _span.eq(14).offset().left + 380 + 31;


    if (broWidth - leftOffset < 10) {
        modal.addClass('less');
        modal.css({top: 150, left: 334}).fadeIn(100);
    } else {
        modal.removeClass('less');
        modal.css({top: 150, left: 765}).fadeIn(100);
    }


    // computeScreen();
    _span.hover(function () {
        var index = $(this).index() - 1;
        //位置
        var _top = $(this).position().top;
        var _left = $(this).position().left;
        var _leftOffset = $(this).offset().left + 380 + 31;
        //数据
        getData(index);

        //判断浮层距离右侧间距

        if (broWidth - _leftOffset < 10) {
            modal.addClass('less');
            modal.css({top: _top - 27, left: _left - 400}).fadeIn(100);
        } else {
            modal.removeClass('less');
            modal.css({top: _top - 27, left: _left + 31}).fadeIn(100);
        }


        $(this).addClass('active').siblings('span').removeClass('active');
    });

    //动态获取数据
    function getData(index) {
        zh.text(data[index].name);
        en.text(data[index].en);
        txt.text(data[index].desc);
        count.text(data[index].count);
        name.text(data[index].present);
        //var isLink = data[index].link;
        // if(isLink){
        //     more.show().html('<a href="'+data[index].link+'" title="查看全部" target="_blank">查看全部</a>');
        // }else {
        //     more.hide();
        // }

    }

}

//非遗资讯
renderTemplate({
    url: api.index.news,
    el: '#information',
    success: function (res) {
        //处理中英文
        $('#information').each(function () {
           $(this).find('h3').html(manageLanguageDate({
               zh:homeData.column[2].zhTitle,
               en:homeData.column[2].enTitle,
           }))
        });

        $('.time').each(function () {
            var date = new Date($(this).html());
            $(this).html(date.pattern("yyyy年 MM月 dd日"));
        });
    }
})

//授牌企业
renderTemplate({
    url: api.index.org,
    el: '#license',
    success: function (res) {
        //中英文数据梳理
        $('.service').each(function () {
           $(this).find('h3').html(manageLanguageDate({
               zh:homeData.column[3].zhTitle,
               en:homeData.column[3].enTitle,
           }))
        });

        sliderUlList('#license',3);
    }
});


$(function () {
    renderProjectTemplate();
    renderMapTemplate();


    //非遗入驻
    (function () {
        $('#enter').each(function () {
            $(this).find('h3').html(manageLanguageDate({
                zh:homeData.column[4].zhTitle,
                en:homeData.column[4].enTitle,
            }));

            $(this).find('.part .txt').html(manageLanguageDate({
                zh:homeData.column[4].zhIntro,
                en:homeData.column[4].enIntro,
            }));

            $(this).find('.part .declare').html(manageLanguageDate({
                zh:homeData.column[4].zhBtn,
                en:homeData.column[4].enBtn,
            }));
        })
    })();
});

























