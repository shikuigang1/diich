var baseUrl = {
  home: "http://192.168.1.41/news/getNewsList", //首页
  detail: "http://192.168.1.41/news/getNewsById?id=" //详情
};

//渲染资讯首页
ajaxGetRequest(baseUrl.home,function(data){
    var _data=data.data; //获取的数据列表
    var recomData={}; //置顶数据
    var listData=[]; //列表数据

    
    
    //1.处理数据
    for (var i = 0; i < _data.length; i++) {
        if(_data[i].labelName=='是'){//推荐的数据
            recomData=_data[i];        
        }else {
            listData.push(_data[i]);
        }
    }

    var interText1 = doT.template($('#grid-templ').text());
    $('#grid').html(interText1(recomData));


    var interText2 = doT.template($('#grid-ul-templ').text());
    $('#grid-ul').html(interText2(listData));

});

//渲染推荐位
var renderRecommend = function(data){

}