$(function () {

    //渲染资讯首页
    if($('#news').length && $('#news').length > 0){
        renderTemplate({
            url:api.news.index,
            el:'#news',
            success:function (res) {
                // console.log(res)
            }
        });
    }




    //渲染资讯详情
    if($('#detail').length && $('#detail').length > 0){
        renderTemplate({
            url:api.news.detail+getQueryString('id'),
            el:'#detail',
            success:function (res) {
                // console.log(res)
            }
        })
    }

});