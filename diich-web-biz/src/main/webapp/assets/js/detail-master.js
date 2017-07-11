//传承人详情页 ok
var inheritorlPage = {
    init: function () {
        this.call();
    },
    call:function () {//调用外部
        Detail.productsTab(); //产品分页tab
        Detail.scrollFloor(); //楼层导航效果
        Detail.widget.init('.detail'); //分享/点赞/doi二维码
        Detail.topPic(); //题图
        Detail.modal.init();
        Detail.computeBaseInfo();//基本信息左右
        Detail.judgeDom(); //判断doi和非遗中国是否存在
        Detail.code_arr(); //替换资源数据
        Detail.catgary(); //查询分类
        searchPage.init();
    }
};

$(function () {
    inheritorlPage.init();
});







