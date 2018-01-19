var baseUrl = {
  banner: "http://192.168.1.41/list", //轮播图
  recommend: "http://192.168.1.41/getOperList", //推荐位,
  projectPro: "http://192.168.1.41/getOperList?columnName=project&moduleName=index",  //非遗项目产品
  news: "http://192.168.1.41/getOperList?columnName=news&moduleName=index",  //非遗资讯
  org: "http://192.168.1.41/getOperList?columnName=org",  //非遗保护计划
  // projectUrl: "http://192.168.1.41/getOperList?columnName=project&moduleName=choiceness",  //精品内容->项目
  // projectUrl: "http://192.168.1.41/getOperList?columnName=person&moduleName=choiceness",  //精品内容->传承人
};

/**
 *
 * @param {接口地址}  params.url
 * @param {渲染目标位置}  params.el
 * @param {模版id}  params.templ
 * @param {成功回调} params.success
 */
function renderTemplate(params) {
  ajaxGetRequest(params.url, function(data) {
    var interText = doT.template($(params.templ).text());
    $(params.el).html(interText(data));
    if (params.success) {
      params.success(data);
    }
  });
}

//非遗项目选择分类
(function () { 
  var interText = doT.template($("#project-list-li-templ").text());
  var obj = $("#project-list");
  var cation=obj.find('.cation_list');
  var categories = category_all; //分类
  var city=dic_arr_city;  //地区
  var result={};
  var searchUrl='http://diich.efeiyi.com/page/search.html?keyword=&';
  //1.渲染一级分类
  renderLiHtml(1,0,categories);
  cation.removeClass('active');

  //2.展开下拉框
  obj.on("click", ".item", function() {
    $(this).find('.cation_list').toggleClass('active');
    if($(this).hasClass('item3')){
      renderLiHtml(2,2,city);
    }
  });

  //3.选择分类
  obj.on("click", ".cation_list li", function() {
    var _index = $(this).index();
    var _item=$(this).parents('.item');
    _item.find('p').html($(this).text());

    //如果点击的是一级分类 数据源是分类并展开二级分类
    if(_item.hasClass('item1')){
      renderLiHtml(1,1,categories[_index].children);
    }

    //如果点击的是二级分类 数据源变成区域并展开地区
    if(_item.hasClass('item2')){
      renderLiHtml(2,2,city);
    }

    //点击地区
    if(_item.hasClass('item3')){
      result.area='area='+$(this).data('code')
    }


    if($(this).data('code')){
      result.area='area='+$(this).data('code');
    }else {
      result.area='area=';
    }

    //获取分类id
    if($(this).data('id')){
      result.category='gb_category_code='+$(this).data('id');
    }else {
      result.category='gb_category_code=';
    }

    $('#search').attr('href',searchUrl+result.category+'&'+result.area);
    
  });


  /**
   * 渲染li模版
   * @param {模版类型} type 
   * @param {点击的索引} index 
   * @param {数据源} data 
   */
  function renderLiHtml(type,index,data){
    var html='';
    if(type==1){
        for (var i = 0; i < data.length; i++) {
          html+='<li data-id="'+data[i].gbCategory+'"><a>'+data[i].name+'</a></li>';
        }
        cation.eq(index).html('<ul>'+html+'</ul>').addClass('active');   
    }else if(type==2){
      for (var i = 0; i < data.length; i++) {
        html+='<li data-code="'+data[i].code+'"><a>'+data[i].name+'</a></li>';
      }
      cation.eq(index).html('<ul>'+html+'</ul>');
    }
    
  }
})();

//轮播图
renderTemplate({
  url: baseUrl.banner,
  el: "#banner",
  templ: "#bannertempl",
  success: function(data) {
    iniof.init($("#banner span"), 100);
    var mySwiper = new Swiper(".swiper-container", {
      //淡入淡出效果
      effect: "fade",
      pagination: ".swiper-pagination",
      paginationClickable: true,
      paginationBulletRender: function(swiper, index, className) {
        return (
          '<span class="' + className + '">' + "0" + (index + 1) + "</span>"
        );
      },
      //循环轮播
      loop: true,
      //持续时间
      speed: 1000,
      //循环播放
      autoplay: 4000,
      //触摸后轮播不停止(为false时,默认停止位true)
      autoplayDisableOnInteraction: false
    });
  }
});

//非遗项目产品
renderTemplate({
  url: baseUrl.projectPro,
  el: "#project-banner",
  templ: "#project-banner-templ",
  success: function(data) {
    //截取字数
    $("#project-banner .swiper-slide").each(function() {
      iniof.init(
        $(this)
          .find("p")
          .eq(0),
        16
      );
    });

    var mySwiper = new Swiper("#project-banner .swiper-container-project", {
      //默认是左右的普通效果
      cube: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 100,
        shadowScale: 1
      },
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
      slidesPerView: 4,
      slidesPerGroup: 4,
      //循环轮播
      loop: true,
      //持续时间
      speed: 2000
    });
  }
});

//非遗资讯
renderTemplate({
  url: baseUrl.news,
  el: "#information-ul",
  templ: "#information-ul-templ",
  success: function(data) {
    //处理时间
    var _time = $("#information-ul .time");
    _time.each(function() {
      var str = $(this).text();
      $(this).html(
        str.substr(5, 2) + "月 " + str.substr(8, 2) + "," + str.substr(0, 4)
      );
    });
  }
});

//非遗保护计划
renderTemplate({
  url: baseUrl.org,
  el: "#enterprise-banner",
  templ: "#enterprise-banner-templ",
  success: function(data) {
    var mySwiper = new Swiper(".swiper-container-enterprise", {
      //默认是左右的普通效果
      cube: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 100,
        shadowScale: 0.6
      },
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 20,
      //循环轮播
      loop: true,
      //持续时间
      speed: 2000,
      //循环播放
      autoplay: 6000,
      //触摸后轮播不停止(为false时,默认停止位true)
      autoplayDisableOnInteraction: false
    });
  }
});

/**
 * 判断浏览器
 */
(function() {
  var browser = {
    versions: (function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        //移动终端浏览器版本信息
        trident: u.indexOf("Trident") > -1, //IE内核
        presto: u.indexOf("Presto") > -1, //opera内核
        webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
        iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf("iPad") > -1, //是否iPad
        webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
      };
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };

  var M = false;

  if (browser.versions.mobile) {
    //判断是否是移动设备打开。browser代码在下面
    var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      M = true;
    }
    if (ua.match(/WeiBo/i) == "weibo") {
      M = true;
    }
    if (ua.match(/QQ/i) == "qq") {
      M = true;
    }
    if (browser.versions.ios) {
      M = true;
    }
    if (browser.versions.android) {
      M = true;
    }
  }
  if (M) {
    document.location.href = "http://m.diich.com";
  }
})();
