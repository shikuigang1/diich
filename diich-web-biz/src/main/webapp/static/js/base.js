var baseUrl = 'http://192.168.1.41/';
// var baseUrl = 'http://47.95.32.236';
// var baseUrl='/';
var api = {
    index:{//information.html
        banner: baseUrl + "list",
        project: baseUrl + "getOperList?columnName=project&moduleName=index",
        news: baseUrl + "getOperList?columnName=news&moduleName=index", //资讯
        org: baseUrl + "getOperList?columnName=org",  //授牌企业
    },
    search: '/page/search.html?keyword=&', //搜索地址
    boutique:{//精品内容
        project: baseUrl+"getOperList?columnName=project&moduleName=choiceness",  //项目
        person: baseUrl+"getOperList?columnName=person&moduleName=choiceness",  //传承人
    },
    news:{//非遗资讯
        index: baseUrl + "news/getNewsList",
        detail: baseUrl + "news/getNewsById?id=",
    }
};

base_url='http://47.95.32.236'

//静态数据
var constData={
    //导航数据
    nav:function () {
        var zh=[
            {link: '/', title: '首页'},
            {link: 'javascript:;', title: '非遗名录'},
            {link: '/page/selected_content.html', title: '精品内容'},
            {link: '/page/information.html', title: '非遗资讯'},
            {link: '/page/official_service.html', title: '非遗保护计划'},
            {link: '/page/declare.html', title: '我要入驻'}
        ];
        var en= [
            {link: '/', title: 'Home'},
            {link: 'javascript:;', title: 'ICH Directory'},
            {link: '/page/selected_content.html', title: 'Selected Content'},
            {link: '/page/information.html', title: 'Information'},
            {link: '/page/official_service.html', title: 'Official Service'},
            {link: '/page/declare.html', title: 'Apply for'}
        ];
        return manageLanguageDate({
            zh:zh,
            en:en
        });
    },
    //非遗名录数据
    directories:function () {
        var zh=[
            {
                list:[
                    {href:'/page/search.html?gb_category_code=A', title:'口头传统和表达，包括作为非物质文化遗产媒介的语言'},
                    {href:'/page/search.html?gb_category_code=A01', title:'语言'},
                    {href:'/page/search.html?gb_category_code=A02', title:'文字'},
                    {href:'/page/search.html?gb_category_code=A03', title:'口述'},
                    {href:'/page/search.html?gb_category_code=A04', title:'其他口头传说和表述'}
                ]
            },
            {
                list:[
                    {href:'/page/search.html?gb_category_code=B', title:'表演艺术'},
                    {href:'/page/search.html?gb_category_code=B01', title:'音乐演奏'},
                    {href:'/page/search.html?gb_category_code=B02', title:'舞蹈'},
                    {href:'/page/search.html?gb_category_code=B03', title:'民歌'},
                    {href:'/page/search.html?gb_category_code=B04', title:'传统戏剧'},
                    {href:'/page/search.html?gb_category_code=B05', title:'曲艺'},
                    {href:'/page/search.html?gb_category_code=B06', title:'传统体育、游艺与杂技'},
                    {href:'/page/search.html?gb_category_code=B99', title:'其他表演艺术'}
                ]
            },
            {
                list:[
                    {href:'/page/search.html?gb_category_code=C', title:'社会风俗、礼仪、节庆'},
                    {href:'/page/search.html?gb_category_code=C01', title:'生产商贸习俗'},
                    {href:'/page/search.html?gb_category_code=C02', title:'生活习俗'},
                    {href:'/page/search.html?gb_category_code=C03', title:'人生仪式'},
                    {href:'/page/search.html?gb_category_code=C05', title:'节日庆典'},
                    {href:'/page/search.html?gb_category_code=C99', title:'其他仪式和庆典'}
                ]
            },
            {
                list:[
                    {href:'/page/search.html?gb_category_code=D', title:'有关自然界和宇宙的知识和实践'},
                    {href:'/page/search.html?gb_category_code=D01', title:'农林牧渔'},
                    {href:'/page/search.html?gb_category_code=D02', title:'服装'},
                    {href:'/page/search.html?gb_category_code=D03', title:'食品'},
                    {href:'/page/search.html?gb_category_code=D04', title:'住房与建筑'},
                    {href:'/page/search.html?gb_category_code=D05', title:'交通旅行'},
                    {href:'/page/search.html?gb_category_code=D06', title:'医药'},
                    {href:'/page/search.html?gb_category_code=D07', title:'军事防御'},
                    {href:'/page/search.html?gb_category_code=D08', title:'商贸'},
                    {href:'/page/search.html?gb_category_code=D09', title:'工业工程'},
                    {href:'/page/search.html?gb_category_code=D10', title:'天文地理水文'},
                    {href:'/page/search.html?gb_category_code=D99', title:'其他自然知识实践'}
                ]
            },
            {
                list:[
                    {href:'/page/search.html?gb_category_code=E', title:'传统的手工艺技能'},
                    {href:'/page/search.html?gb_category_code=E01', title:'工具及机械制作'},
                    {href:'/page/search.html?gb_category_code=E02', title:'髹饰工艺'},
                    {href:'/page/search.html?gb_category_code=E03', title:'家畜农林产品加工'},
                    {href:'/page/search.html?gb_category_code=E04', title:'织染工艺'},
                    {href:'/page/search.html?gb_category_code=E05', title:'造纸印刷机装裱'},
                    {href:'/page/search.html?gb_category_code=E06', title:'编扎工艺'},
                    {href:'/page/search.html?gb_category_code=E07', title:'字画工艺'},
                    {href:'/page/search.html?gb_category_code=E08', title:'锻冶工艺'},
                    {href:'/page/search.html?gb_category_code=E09', title:'剪刻工艺'},
                    {href:'/page/search.html?gb_category_code=E10', title:'雕塑工艺'},
                    {href:'/page/search.html?gb_category_code=E11', title:'烧造工艺'},
                    {href:'/page/search.html?gb_category_code=E12', title:'木制工艺'},
                    {href:'/page/search.html?gb_category_code=E99', title:'其他类'}
                ]
            }
        ];
        var en=[
            {
                list:[
                    {href:'/page/search.html?gb_category_code=A', title:'legend'},
                    {href:'/page/search.html?gb_category_code=A01', title:'language'},
                    {href:'/page/search.html?gb_category_code=A02', title:'written language'},
                    {href:'/page/search.html?gb_category_code=A03', title:'oral account'},
                    {href:'/page/search.html?gb_category_code=A04', title:'other oral account'}
                ]
            },
            {
                list:[
                    {href:'/page/search.html?gb_category_code=B', title:'perform'},
                    {href:'/page/search.html?gb_category_code=B01', title:'music'},
                    {href:'/page/search.html?gb_category_code=B02', title:'dance'},
                    {href:'/page/search.html?gb_category_code=B03', title:'folk song'},
                    {href:'/page/search.html?gb_category_code=B04', title:'traditional drama'},
                    {href:'/page/search.html?gb_category_code=B05', title:'chinese folk art forms'},
                    {href:'/page/search.html?gb_category_code=B06', title:'traditional sports entertainment and acrobatics'},
                    {href:'/page/search.html?gb_category_code=B99', title:'other perform'}
                ]
            },
            {
                list:[
                    {href:'/page/search.html?gb_category_code=C', title:'custom and etiquette'},
                    {href:'/page/search.html?gb_category_code=C01', title:'business custom'},
                    {href:'/page/search.html?gb_category_code=C02', title:'life customs'},
                    {href:'/page/search.html?gb_category_code=C03', title:'life ritual'},
                    {href:'/page/search.html?gb_category_code=C05', title:'festival celebration'},
                    {href:'/page/search.html?gb_category_code=C99', title:'other celebration'}
                ]
            },
            {
                list:[
                    {href:'/page/search.html?gb_category_code=D', title:'the practice of nature and universe'},
                    {href:'/page/search.html?gb_category_code=D01', title:'Dense forest and fishery'},
                    {href:'/page/search.html?gb_category_code=D02', title:'Clothing'},
                    {href:'/page/search.html?gb_category_code=D03', title:'Food'},
                    {href:'/page/search.html?gb_category_code=D04', title:'Housing and construction'},
                    {href:'/page/search.html?gb_category_code=D05', title:'Traffic'},
                    {href:'/page/search.html?gb_category_code=D06', title:'Medicine'},
                    {href:'/page/search.html?gb_category_code=D07', title:'Military'},
                    {href:'/page/search.html?gb_category_code=D08', title:'Business'},
                    {href:'/page/search.html?gb_category_code=D09', title:'Project'},
                    {href:'/page/search.html?gb_category_code=D10', title:'Astronomy geography irrigation'},
                    {href:'/page/search.html?gb_category_code=D99', title:'Other natural knowledge'}
                ]
            },
            {
                list:[
                    {href:'/page/search.html?gb_category_code=E', title:'The technical of tradition handmade'},
                    {href:'/page/search.html?gb_category_code=E01', title:'Tool and mechanical manufacture'},
                    {href:'/page/search.html?gb_category_code=E02', title:'Painting techniques'},
                    {href:'/page/search.html?gb_category_code=E03', title:'Domestic animal agriculture and forestry products'},
                    {href:'/page/search.html?gb_category_code=E04', title:'Dyeing process'},
                    {href:'/page/search.html?gb_category_code=E05', title:'Paper printing and paperhanging'},
                    {href:'/page/search.html?gb_category_code=E06', title:'Knit techniques'},
                    {href:'/page/search.html?gb_category_code=E07', title:'Calligraphy and painting craft'},
                    {href:'/page/search.html?gb_category_code=E08', title:'Smithing techniques'},
                    {href:'/page/search.html?gb_category_code=E09', title:'Paper-cut and carve technics'},
                    {href:'/page/search.html?gb_category_code=E10', title:'Sculpture techniques'},
                    {href:'/page/search.html?gb_category_code=E11', title:'Barbecue technics'},
                    {href:'/page/search.html?gb_category_code=E12', title:'Wooden techniques'},
                    {href:'/page/search.html?gb_category_code=E99', title:'Other kind'}
                ]
            }
        ];
        return manageLanguageDate({
            zh:zh,
            en:en
        });
    },
    //头部注册登录
    login:function () {
        var zh={
            title:'登录',
        };
        var en={
            title:'Sign in'
        }

        return manageLanguageDate({
            zh:zh,
            en:en
        });

    }
};



//时间格式化
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

//获取设置语言版本
var getLanguage = function(value) {
    var language='';

    if(localStorage.getItem("language2.0")){
        language=localStorage.getItem("language2.0");
    }else {//判断浏览器语言版本
        if (navigator.userLanguage) {
            language = navigator.userLanguage;
        } else {
            language = navigator.language;
        }
        localStorage.setItem('language2.0',language.substring(0,2).toLowerCase());
    }

    if(value){//设置语言版本
        localStorage.setItem('language2.0',value);
    }



    if(language=='zh'){
        localStorage.setItem('language','zh-CN')
    }else {
        localStorage.setItem('language','en')
    }


    return language;

}

//处理语言版本并返回数据
var manageLanguageDate = function (params) {
    var result=null;
    if(getLanguage()=='zh'){
        result=params.zh;
    }else if(getLanguage()=='en'){
        result=params.en;
    }else {//其他语言版本也返回中文
        result=params.zh;
    }
    return result;
}


/**
 * 多余文字截取
 * @param { el }  dom元素
 * @param { num } 截取字数
 */
var textCut = function (el, num) {
    for (var i = 0; i < el.length; i++) {
        var str = $(el[i]).html();
        var s = str;
        if (str.length > num) {
            s = str.substring(0, num) + "...";
        }
        $(el[i]).html(s);
    }
}


/**
 * 获取url参数
 * @param name
 * @returns {*}
 */
var getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}



/**
 * 渲染模版  dot.js
 * @param { url } 接口地址
 * @param { tpl } 模版id
 * @param { el } 输出模版id
 * @param { success } 渲染模版后的回调
 */
var renderTemplate = function (params) {
    $.ajax({
        url: params.url,
        type: "GET",
        success: function (data) {
            var tempFn = doT.template($(params.el + '-templ').html());
            var resultText = tempFn(data);
            $(params.el).html(resultText);
            params.success(data);
        }
    });
}


//渲染头部、尾部
var renderHtml = {
    render:function () {
        var header=$('.header');
        $('.header').html(renderHtml.headerTpl(getLanguage()));
        renderHtml.navRouter();
        renderHtml.directoriesHandle(header);
        renderHtml.headerHandle(header);
        renderHtml.loginHandle();
        $('.footer').html(renderHtml.footerTpl());
    },
    headerTpl:function () {//渲染头部
        var logo = '<a class="logo" href="" title="非遗大数据平台"></a>'; //logo
        var navs = ''; //导航
        var directory = renderHtml.directoriesTpl();  //非遗名录
        var login = renderHtml.loginTpl();  //登录注册部分

        var _data=constData.nav();

        navs='<div class="navs">' +
            '            <div class="link"><a class="tt" href="'+_data[0].link+'">'+_data[0].title+'</a></div>' +
            '            <div class="link">' +
            '                <a class="tt" href="'+_data[1].link+'">'+_data[1].title+'</a>' +
            '                <div class="directories" id="directories"><div class="hd">'+directory+'</div></div>' +
            '            </div>' +
            '            <div class="link"><a class="tt" href="'+_data[2].link+'">'+_data[2].title+'</a></div>' +
            '            <div class="link"><a class="tt" href="'+_data[3].link+'">'+_data[3].title+'</a></div>' +
            '            <div class="link"><a class="tt" href="'+_data[4].link+'">'+_data[4].title+'</a></div>' +
            '            <div class="link"><a class="tt" href="'+_data[5].link+'">'+_data[5].title+'</a></div>' +
            '        </div>';
        return logo + navs + login;
    },
    directoriesTpl:function () {//渲染非遗名录
        var data=constData.directories();
        //渲染非遗名录
        var html='';
        $.each(data,function (i) {
            (function () {
                var dt='';
                var dd='';
                $.each(data[i].list,function (j) {
                    if(j==0){
                        dt+='<dt><a href="'+data[i].list[j].href+'" title="'+data[i].list[j].title+'">' + data[i].list[j].title + '</a></dt>';
                    }else {
                        dd+='<a href="'+data[i].list[j].href+'" title="'+data[i].list[j].title+'">' + data[i].list[j].title + '</a>';
                    }
                })
                html+='<dl class="item">'+dt+'<dd>'+dd+'</dd></dl>'
            })(i)
        });
        return html;
    },
    loginTpl:function () {
        var _data=constData.login();
        var html='<div class="info">' +
            '            <div class="item login">' +
            '                <div class="main">' +
            '                    <div class="user">' +
            '                        <a href="javascript:;"><i class="avatar"></i><span id="sign_in">'+_data.title+'</span></a>' +
            '                    </div>' +
            '                </div>' +
            '            </div>' +
            '' +
            '            <div class="item logined" style="display: none">' +
            '                <div class="user">' +
            '                    <a href="javascript:;"><img width="33" src="/static/images/user_head.png" alt=""><span></span></a>' +
            '                </div>' +
            '                <div class="center"><a href="/page/center/usercenter.html">个人中心</a></div>' +
            '                <div class="logout"><a href="javascript:void(0)">退出</a></div>' +
            '            </div>' +
            '' +
            '            <div class="item language" id="language">' +
            '                <a class="zh" data-lang="zh" href="javascript:;" title="中文"><span>中文</span></a>' +
            '                <a class="en" data-lang="en" href="javascript:;" title="English"><span>EN</span></a>' +
            '            </div>' +
            '            <div class="item search"><a href="/page/search.html"></a></div>' +
            '        </div>';
        return html;
    },
    loginHandle:function () {
        $('#language,#footer').on('click','a',function () {
           getLanguage($(this).data('lang'));
           window.location.href=window.location.href;
        });
    },
    footerTpl:function () {
        var str='<div class="diich"><div class="hd"><div class="logo"><a href="#"></a></div></div></div>'+
                '<div class="main">' +
                '   <div class="hd">' +
                '       <div class="lbox">' +
                '           <div><em>tel：400-876-8766</em></div>' +
                '           <div><em>email：efeiyi@efeiyi.com</em></div>' +
                '           <div><em>地址：北京市东城区前门大街72&74号二层</em></div>' +
                '           <div><em>add：2Floor，72&74,Qian Men ST.Dongcheng District,Beijing,China</em></div>' +
                '       </div>' +
                '       <div class="rbox">' +
                '           <div class="links">' +
                '               <a target="_blank" href="/page/protocol/copyright.html">版权声明</a>' +
                '               <a>|</a>' +
                '               <a target="_blank" href="/page/protocol/disclaimer.html">免责声明</a>' +
                '               <a>|</a>' +
                '               <a target="_blank" href="/page/protocol/privacy.html" style="margin-right:0;">隐私保护政策</a>' +
                '           </div>' +
                '           <div class="share"><!-- <a href="" class="twitter" title="twitter"></a><a href="" class="instagram" title="instagram"></a><a href="" class="linkedin" title="linkedin"></a>-->' +
                '               <div class="code"><div class="lang"><a class="en" data-lang="en">ENGLISH</a><a class="line">|</a><a class="zh" data-lang="zh">中文</a></div><img src="/static/images/footer-wechat@1x.png" alt=""></div>' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '</div>';
        return str;
    },
    headerHandle:function (obj) {
        var parent=obj;
        //悬浮固定
        if (parent.hasClass('fixed')) {
            $(window).scroll(function () {
                if ($(window).scrollTop() > 630) {
                    parent.addClass('normal');
                } else {
                    parent.removeClass('normal');
                }
            });
        }

        //登录
        parent.find('.logined').hover(function () {
            $(this).addClass('selected');
        },function () {
            $(this).removeClass('selected');
        })
    },
    directoriesHandle:function (obj) {//非遗名录交互
        var parent=obj;
        var elA=parent.find('.link');
        var elDrop=elA.find('#directories');
        var item = elDrop.find('.item');
        var timer=null;
        var _index=1; //非遗名录的索引

        //0.判断是否悬浮
        if(parent.hasClass('home-header')){
            parent.addClass('fixed');
        }

        //2.动态给每个分栏增加宽度
        if(getLanguage()=='en'){
            elDrop.addClass('directories-en');
            elDrop.find('.item').each(function (i) {
                $(this).addClass('item'+i)
            });
        }else {
            item.eq(0).css('width', '180px');
            item.eq(1).css('width', '180px');
            item.eq(2).css('width', '170px');

            item.eq(3).css('width', '230px');
            item.eq(3).find('dd a:even').css('width', '72px');
            item.eq(3).find('dd a:odd').css({'width': '120px', 'margin-left': '24px'});

            item.eq(4).css({'width':'240px','margin-right':'0'});
            item.eq(4).find('dd a:even').css('width', '115px');
            item.eq(4).find('dd a:odd').css({'width': '70px', 'margin-left': '24px'});
        }

        elA.hover(function () {
            $(this).addClass('selected');
            if($(this).index()==_index){
                isDirectoriesShow($(this).index());
            }
            stopWheel();
        },function () {
            if($(this).index()==_index){
                elMouseOut();
            }else {
                $(this).removeClass('selected');
            }
            $(document).off('wheel');
        });

        elDrop.hover(function () {
            clearInterval(timer);
            stopWheel();
        },function () {
            elMouseOut();
            clearInterval(timer);
            $(document).off('wheel');
        });


        //判断是否展开
        function isDirectoriesShow() {
            if(elA.eq(_index).hasClass('selected')){
                elDrop.css({'top':parent.outerHeight(true)+'px'}).slideDown('fast');
            }else {
                elDrop.slideUp('fast');
            }
            clearInterval(timer);
        }

        //鼠标移出元素后 非遗名录隐藏
        function elMouseOut() {
            timer=setInterval(function () {
                elA.eq(_index).removeClass('selected');
                isDirectoriesShow();
            },300);
        }

        //阻止鼠标滚动
        function stopWheel() {
            $(document).on('wheel',function () {
                return false;
            });
        };

    },
    navRouter:function () {//导航选中效果
        var nav=$('.header .navs .link');
        var currentClass=$('body').attr('class');
        if(currentClass=='home'){//首页
            nav.eq(0).addClass('active');
        }else if(currentClass=='boutique') {//精品内容
            nav.eq(2).addClass('active');
        }else if(currentClass=='news') {//非遗资讯
            nav.eq(3).addClass('active');
        }else if(currentClass=='declare') {//我要入驻
            nav.eq(5).addClass('active');
        }else if(currentClass=='official'){//非遗保护计划
            nav.eq(4).addClass('active');
        }
    }
};






$(function () {
    getLanguage();
    renderHtml.render();
});