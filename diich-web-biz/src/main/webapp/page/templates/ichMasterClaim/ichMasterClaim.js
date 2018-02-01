define(["text!ichMasterClaim/claim.tpl", "text!ichMasterClaim/claim-success.tpl"], function(claimTpl, claimSuccessTpl) {
    var countrys = []; // 国籍
    var masterId = getQueryString("masterId"); // 传承人ID
    console.log("masterId -- >", masterId);
    function _init(dic_arr_city) {
        countrys = dic_arr_city; // 接收页面传递过来的国籍
        getMasterTmp(); // 获取认领词条模板
        //successTpl();
    }

    // 获取认领词条模板
    function getMasterTmp() {
        var coverImg = ""; // 封面
        var backImg = ""; // 反面
        var justImg = ""; // 正面
        var nations = getDictionaryArrayByType(105); // 获取到民族
        var certificates = getDictionaryArrayByType(108); // 获取到证件类型
        $("#content").html(Handlebars.compile(claimTpl)({
            nations: nations,
            certificates: certificates,
            countrys: countrys
        })); // 更新页面模板


        // 初始化上传
        newUpload.create("coverImg", "image/master/", {width: "244px", height: "172px"}, function(res) {
            if(res.code == "1") {
                coverImg = res.path;
            }
            console.log("coverImg == ", coverImg, res)
        }); // 图片
        newUpload.create("justImg", "image/master/", {width: "382px", height: "286px"}, function(res) {
            if(res.code == "1") {
                justImg = res.path;
            }
            console.log("justImg == ", justImg, res)
        });
        newUpload.create("backImg", "image/master/", {width: "382px", height: "286px"}, function(res) {
            if(res.code == "1") {
                backImg = res.path;
            }
            console.log("backImg == ", backImg, res)
        });

        // 监听提交
        $("#form_inof").submit(function() {
            return false;
        })

        //自定义验证 手机号码
        $.validator.addMethod("isMobile", function(value, element) {
            var length = value.length;
            var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
            return this.optional(element) || (length == 11 && mobile.test(value));
        }, "请正确填写您的手机号码");

        $("#form_inof").validate({
            onkeyup: false,
            errorElement: "div",
            rules: {
                userName: {
                    required: true
                },
                otherName: {
                    required: true
                },
                areaCode: {
                    required: true
                },
                nation: {
                    required: true
                },
                documentType: {
                    required: true
                },
                numBer: {
                    required: true
                },
                phone: {
                    required: true,
                    isMobile: true
                },
                email: {
                    required: true,
                    email: true
                },
                address: {
                    required: true
                },
                code: {
                    required: true
                }
            },
            messages: {
                userName: {
                    required: "姓名不能为空"
                },
                otherName: {
                    required: "曾用名不能为空"
                },
                areaCode: {
                    required: "国籍不能为空"
                },
                nation: {
                    required: "民族不能为空"
                },
                documentType: {
                    required: "证件类型不能为空"
                },
                numBer: {
                    required: "证件号码不能为空"
                },
                phone: {
                    required: "手机号码不能为空"
                },
                email: {
                    required: "邮箱不能为空",
                    email: "请输入正确的邮箱格式"
                },
                address: {
                    required: "详细地址不能为空"
                },
                code: {
                    required: "邮编不能为空"
                }
            }
        })

        $("#on_submit").on("click", function() {
            var flag = $("#form_inof").valid(); // buttion 提交方式监听
            if(!flag){
                //没有通过验证
                return;
            } else {
                // 验证图片
                var strHtml = "";
                if(!coverImg) {
                    strHtml += "<p>请上传照片</p>"
                }

                if(!backImg) {
                    strHtml += "<p>请上证件照片(反面)</p>"
                }

                if(!justImg) {
                    strHtml += "<p>请上证件照片(正面)</p>"
                }

                if(strHtml != "") {
                    $("#errors").html(strHtml);
                    return;
                } else {
                    $("#errors").html("");
                }
            }

            // 获取表单数据
            var params = $("#form_inof").serializeArray();
            // 追加
            params.push({name: "sex", value: $("[name='sex'].active").attr("data-type"), type: 0}); // 性别
            params.push({name: "coverImg", value: coverImg, type: 1});
            params.push({name: "backImg", value: backImg, type: 1});
            params.push({name: "justImg", value: justImg, type: 1});

            var authInfo =  buildParams(params); // 构建数据
            //var masterId = "5014";
            //console.log("masterId -- >", masterId)

            // 保存数据
            $.post("/ichMaster/claimEntry", {authInfo: JSON.stringify(authInfo), masterId: masterId}, function(result) {
                if(result.code == 0 && result.msg == "SUCCESS") {
                    successTpl();
                } else {
                    tipBox.init("fail", result.msg, 1500);
                }
            })

        })

        // 构建参数
        function buildParams(paramArr) {
            var authInfo = {
                "targetType": 1, // 传承人
                contentFragmentList: [],
            }
            var masterId = 1;

            // 构建authInfo.contentFragmentList 参数
            $.each(paramArr, function(i, v) {
                var obj = {};
                if(v.type == 0) {
                    obj.attributeId = $("[name='sex'].active").attr("data-id");
                } else {
                    obj.attributeId = $("#" + v.name).attr("data-id");
                    if(v.type == 1) {
                        // 构建图片
                        obj.resourceList = [];
                        obj.resourceList.push({
                            description: "",
                            type: 0,
                            uri: v.value
                        })
                        obj.content = "";
                    } else {
                        obj.content = v.value;
                    }
                }
                obj.targetType = 1;
                authInfo.contentFragmentList.push(obj);
            })
            return authInfo;
        }
    }

    // 成功页面
    function successTpl() {
        $(".project_content").html(Handlebars.compile(claimSuccessTpl)()); // 更新页面模板
    }

    return {
        init: _init
    }
})