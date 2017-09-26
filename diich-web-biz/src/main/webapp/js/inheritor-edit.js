var inheritor = null;
var attributes = null;

$(function () {
    init();
});

function init() {
    $('.edit.link').on('click', function() {
        var inheritorId = $(this).attr('inheritor-id');
        if(inheritorId == null) {
            alert('获取项目信息失败');
            return;
        }
        loadInheritorFromServer(inheritorId);
    });
}

function loadInheritorFromServer(inheritorId) {
    $.ajax({
        type: 'POST',
        url: '../ichMaster/getIchMasterById?params=' + inheritorId,
        /*xhrFields:{
            withCredentials:true
        },*/
        success: function (data) {
            if(data == null || data.code == 3) {
                alert('您还没有登录，请登录后操作！');
                return;
            }
            inheritor = data.data;
            //loadAttributesFromServer();
            //displayEditMode();
        },
        error: function () {

        }
    });
}