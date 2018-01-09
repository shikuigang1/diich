var baseUrl='';

var usercenterPage = {
    url: {//获取链接地址
        project: baseUrl + '/ichProject/getIchProjectByUserId',
        words: baseUrl + '/ichMaster/getIchMasterByUserId',
        account: baseUrl + '/organization/getOrganizationByUserId'
    },
    init: function () {
        this.bindEvent();
        var options = {
            name: 'myProject'
        };
        this.loadTpl(options);
    },
    bindEvent: function () {//帮点左侧菜单事件
        var _this = this;
        $(".menu li").on("click", function (){
            $(".menu li em").removeClass("active");
            $(this).find("em").addClass("active");
            _this.loadingGIF();//加载动画
            var url = $(this).attr("data-url");//获取需要加载的模板

            //加载模版
            var options = {
                name: url,
                params: {
                    status: 0
                }
            };
            _this.loadTpl(options);
        })
    },
    loadingGIF: function () {
        var strHtml = '<div style="text-align: center;line-height: 500px;">' +
            '<img src="../../2.0/images/loading1.gif">' +
            '</div>';
        $("#right_content").html(strHtml);
    },
    ajax: function (url, params, callback) {
        $.ajax({
            type: "POST",
            url: url,
            data: {params: JSON.stringify(params)},
            dataType: "json",
            async: true,
            success: function (data) {
                if (data.code == 0) {
                    $('#content').find('.loading').remove();
                    if (callback || callback != 'undefinied') {
                        callback(data.data);
                    }
                    //数据为空
                    if(data.data.length==0){
                        $('#table').html('<div style="line-height: 51px;text-align: center;font-size:20px;background: #fff;">暂无数据</div>');
                    }
                }
            }
        });
    },
    loadTpl: function (options) {
        var _this = this;
        var name = options.name;
        var content = $('#right_content');

        content.load('../../page/center/Tpl/' + options.name + '.html', function () {
            if (options.name === 'myProject') {//我的项目

            } else if (options.name === 'myWords') {//我的词条

            }else if (options.name === 'setAccount') {//账户设置

            }

        });
    }
};

$(function () {
    usercenterPage.init();
});