//渲染轮播项目
renderTemplate({
    url:api.boutique.project,
    el:'#project',
    success:function (res) {
        //轮播图效果
        var parent=$('#project');
        var imgLi = parent.find('ul.img li'); //图片
        var imgLen = imgLi.length;
        var numLi = parent.find('ul.num li'); //索引
        var cur = 0;
        var speed = 5000;
        var timer = null;
        numLi.mousedown(function () {
            clearInterval(timer);
            cur = $(this).index();
            $(this).addClass('active').siblings('li').removeClass('active');
            imgLi.eq(cur).stop(true, true).fadeIn().siblings('li').fadeOut();
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
        }
    }
})


//渲染代表性传承人
renderTemplate({
    url:api.boutique.person,
    el:'#masters',
    success:function (res) {
        var parent=$('#masters');
        var main=parent.find('.main');
        var _ul=parent.find('ul');
        var distance=_ul.width(); //每次滚动距离
        var speed=500; //滚动速度
        var cur=0;  //初始页数
        var total=_ul.length-1; //总页数

        //1.计算main的宽度
        main.css('width',_ul.width()*_ul.length+'px')

        //2.下一页
        parent.on('click','.next',function () {
            if(cur<total) cur++;
            main.stop(true).animate({'margin-left':-cur*distance+'px'},speed);
        });

        //3.上一页
        parent.on('click','.prev',function () {
            if(cur>0) cur--;
            main.stop(true).animate({'margin-left':cur*distance+'px'},speed);
        });
    }
})