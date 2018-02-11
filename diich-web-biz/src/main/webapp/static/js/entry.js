$(function() {


//    //保存
//    $("#Preservation").click(function(){
//        $(this).html('已保存');
//        $(this).css('background','#C3C5C9');
//    })

    //模拟input[type="radio"]
    $('.in_Basics b').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    })


    //根据证件类型判断证件号码
    $("#documentType").change(function () {
        var indexMun = $('select[name="documentType"]').val();
        if(indexMun == 0){
            $('input[name="numBer"]').attr("data-validate","required,identity");
        }
        if(indexMun == 1){
            $('input[name="numBer"]').attr("data-validate","required,passport");
        }
        if(indexMun == 2){
            $('input[name="numBer"]').attr("data-validate","required,officer");
        }
        if(indexMun == 3){
            $('input[name="numBer"]').attr("data-validate","required,macao");
        }
    })


    //表单提交
    $("#subInof").on("click",function () {
        $("#form_inof").verify().validate(function (success) {
            if(success == true){
                var flag = true;
                var data = $("#form_inof").serializeArray();
                var params = {};
                $.each(data, function(i, v) {
                    params[v.name] = v.value;
                })
                //用户id
                var objectId = location.href.split('=')[1];
                params.objectId = objectId;
                //性别
                var agEb = $('.in_Basics b');

                for(var i = 0; i < agEb.length; i++){
                    if($(agEb[i]).attr("class") == "active"){
                        params.age = $(agEb[i]).attr("data-type");
                    }
                }

                // 获取图片地址 照片
                var cover = $.EU.getUParams("upload-img");
                if(cover.length <= 0) {
                    $('#coverImg').children('p:nth-of-type(1)').css('display','none');
                    $('#coverImg').children('p:nth-of-type(2)').css('display','block');
                    flag = false;
                }else{
                    $('#coverImg').children('p:nth-of-type(1)').css('display','block');
                    $('#coverImg').children('p:nth-of-type(2)').css('display','none');
                }

                // 获取图片地址 证件反面
                var back = $.EU.getUParams("upload-back");
                console.log("证件反面图片地址:", back);
                if(back.length <= 0) {
                    $('.add_cover:nth-of-type(1)').children('clear').css('display','block');
                    $("#back_img").css('display','block');
                    flag = false;
                }else{
                    $('.add_cover:nth-of-type(1)').children('clear').css('display','none');
                    $("#back_img").css('display','none');
                }

                // 获取图片地址 证件正面
                var just = $.EU.getUParams("upload-just");
                if(just.length <= 0) {
                    $('.add_cover:nth-of-type(2)').children('clear').css('display','block');
                    $("#just_img").css('display','block');
                    flag = false;
                }else{
                    $('.add_cover:nth-of-type(2)').children('clear').css('display','none');
                    $("#just_img").css('display','none');
                }

                params.cover = cover;
                params.back = back;
                params.just = just;


                console.log("params -- >", params);

                if(flag) {
                    $.ajax({
                        type: "POST",
                        url: "/entries/insert",
                        data: params,
                        success: function(res){
                            if(res.code == "0000") {
                                window.location.href = "success";
                            } else {

                            }
                        }
                    });
                }
            }else{
                // 获取图片地址 照片
                var cover = $.EU.getUParams("upload-img");
                if(cover.length <= 0) {
                    $('#coverImg').children('p:nth-of-type(1)').css('display','none');
                    $('#coverImg').children('p:nth-of-type(2)').css('display','block');
                    flag = false;
                }else{
                    $('#coverImg').children('p:nth-of-type(1)').css('display','block');
                    $('#coverImg').children('p:nth-of-type(2)').css('display','none');
                }

                // 获取图片地址 证件反面
                var back = $.EU.getUParams("upload-back");
                console.log("证件反面图片地址:", back);
                if(back.length <= 0) {
                    $('.add_cover:nth-of-type(1)').children('clear').css('display','block');
                    $("#back_img").css('display','block');
                    flag = false;
                }else{
                    $('.add_cover:nth-of-type(1)').children('clear').css('display','none');
                    $("#back_img").css('display','none');
                }

                // 获取图片地址 证件正面
                var just = $.EU.getUParams("upload-just");
                if(just.length <= 0) {
                    $('.add_cover:nth-of-type(2)').children('clear').css('display','block');
                    $("#just_img").css('display','block');
                    flag = false;
                }else{
                    $('.add_cover:nth-of-type(2)').children('clear').css('display','none');
                    $("#just_img").css('display','none');
                }
            }

        })

    })


    // 证件照片 - 正面
    function _initUploaderJust() {
        $.EU.uploader("upload-just", {width: "381px", height: "285px", single: true, progress: true}, {}, function () {}, function () {
            $("#upload-just-list li").html('<a id="upload-just" href="javascript:void(0);"><em class="upload-btn"></em>' +
                '<p style="margin-top: 120px;"><span class="active_span"></span>上传图片</p>' +
                '</a>');
            _initUploaderJust();
        });
    }
    _initUploaderJust();

    // 证件照片 - 反面
    function _initUploaderBack() {
        $.EU.uploader("upload-back", {width: "381px", height: "285px", single: true, progress: true}, {}, function () {}, function () {
            $("#upload-back-list li").html('<a id="upload-back" href="javascript:void(0);"><em class="upload-btn"></em>' +
                '<p style="margin-top: 120px;"><span class="active_span"></span>上传图片</p>' +
                '</a>');
            _initUploaderBack();
        });
    }
    _initUploaderBack();

    // 照片
    function _initUploaderImg() {
        $.EU.uploader("upload-img", {width: "244px", height: "172px", single: true, progress: true}, {}, function () {}, function () {
            $("#upload-img-list li").html('<a id="upload-img" href="javascript:void(0);"><em class="upload-btn"></em>' +
                '<p style="margin-top: 120px;"><span></span>上传图片</p>' +
                '</a>');
            _initUploaderImg();
        });
    }
    _initUploaderImg();



})