/**我要申报-项目表单-基础信息页  模板管理器 **/
define(["text!ichProForm/list.tpl"], function(tpl) {

    var $this = null;
    function init() {
        $this = this;
        //_onSearch();
        //// 处理
        //processed();
        //// 确认
        //confirm();
        //_TabSwitch();
    }

    ///**
    // * 绑定列表搜索方法
    // */
    //function _onSearch() {
    //    $("#search").off().on("click", function () {
    //        $this.search("getMoney/list", "storeApply", "storeApply_form");
    //    });
    //}
    //
    ///**
    // * 处理
    // */
    //function processed() {
    //    $this.delegate("get_money", "btn_processed", function (obj) {
    //        $.EU.confirm("您确定要处理吗?", function () {
    //            $.post("getMoney/updateProcessed", {id: obj["id"]}, function(data) {
    //                if (data > 0) {
    //                    $.EU.closeArt();
    //                    _back();
    //                } else {
    //                    $.EU.closeArt();
    //                    $.EU.alert("保存失败");
    //                }
    //            });
    //        }, function () {
    //            $.EU.closeArt();
    //        })
    //    });
    //}
    //
    ///**
    // * 确认
    // */
    //function confirm() {
    //    $this.delegate("get_money", "btn_confirm", function (obj) {
    //        $.EU.confirm("您确定已经转账了吗?", function () {
    //            $.post("getMoney/updateConfirm", {id: obj["id"]}, function(data) {
    //                if (data > 0) {
    //                    $.EU.closeArt();
    //                    $E("storageApply_list").get("getMoney/list", {"status" : obj["status"]}, applyListtpl, function (html, data){
    //                        $("#storageApply_list").html(html);
    //                        // 确认
    //                        confirm();
    //                    });
    //                } else {
    //                    $.EU.closeArt();
    //                    $.EU.alert("保存失败");
    //                }
    //            });
    //        }, function () {
    //            $.EU.closeArt();
    //        })
    //    });
    //}
    //
    //
    ////页签切换
    //function _TabSwitch(){
    //    $this.delegate("storeApply_tab", "bill", function (data) {
    //        //请空选中样式
    //        $("li[id^='bill']").each(function () {
    //            $(this).removeClass("active");
    //        });
    //        $(this).addClass("active");
    //        var status = $(this).attr("id").split("_").pop();
    //
    //        $E("storageApply_list").get("getMoney/list", {"status" : status}, applyListtpl, function (html, data){
    //            $("#storageApply_list").html(html);
    //            // 确认
    //            confirm();
    //        });
    //    });
    //
    //}
    //
    //function _back() {
    //    $.EU.menuClick("getMoney");
    //}

    return {
        tpl: tpl,
        init: init
    }
});