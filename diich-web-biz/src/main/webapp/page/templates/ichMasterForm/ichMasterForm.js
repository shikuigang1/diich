
/**
 * 我要申报-传承人模块管理器
 * customTpl : 自定义项模板
 * basicTpl : 基本信息模板
 * contactTpl ：联系方式模板
 * vocationTpl : 职业信息模板
 * resumeTpl: 简历模板 传承历史与现状模板 记忆特征模板  个人成就模板 统一调用resumeTpl
 * masterTpl
 */
define(["text!ichMasterForm/custom.tpl", "text!ichMasterForm/basic.tpl",
    "text!ichMasterForm/contact.tpl", "text!ichMasterForm/vocation.tpl",
    "text!ichMasterForm/resume.tpl", "text!ichMasterForm/master.tpl",
    "text!ichMasterForm/menu.tpl"], function(customTpl, basicTpl, contactTpl, vocationTpl, resumeTpl, masterTpl, menuTpl) {

    var pageObj = {};
    //console.log("pageObj --- >", pageObj);
    // 菜单ID管理对象
    var menu_0 = "menu_0"; // 一级菜单 基础信息菜单MOD ID
    var menu_00 = "menu_0_0"; // 二级菜单 基本信息菜单MOD ID
    var menu_01 = "menu_0_1"; // 二级菜单 联系方式菜单MOD ID
    var menu_02 = "menu_0_2"; // 二级菜单 职业信息菜单MOD ID
    var menu_1 = "menu_1"; // 一级菜单 传承人内容MOD ID
    var menu_10 = "menu_1_3"; // 二级菜单 简历菜单MOD ID
    var menu_11 = "menu_1_4"; // 二级菜单 传承历史与现状菜单MOD ID
    var menu_12 = "menu_1_5"; // 二级菜单 师徒关系菜单MOD ID
    var menu_13 = "menu_1_6"; // 二级菜单 技能菜单MOD ID
    var menu_14 = "menu_1_7"; // 二级菜单 个人成就菜单MOD ID
    var menu_15 = "menu_1_8"; // 二级菜单 传承谱系菜单MOD ID
    var menu_16 = "menu_1_9"; // 二级菜单 获奖情况菜单MOD ID
    var menu_17 = "menu_1_10"; // 二级菜单 知识产权菜单MOD ID
    var menu_2 = "menu_2"; // 自定义菜单项

    // 页面构建参数所需参数数据
    var mid = getQueryString("mid");
    var ichProjectId = getQueryString("pid");
    var targetId = pageObj.hasOwnProperty("contentFragmentList") ? pageObj.id : ""; // 传承人ID 用于判断是否是一个人申请的
    var isMaster = "0";// 是否为自己申报传承人 0否 1是 默认 否
    if(pageObj.hasOwnProperty("contentFragmentList")) {
        pageObj.isMaster = pageObj.userId ? 1 : 0;
        isMaster = isMaster;
    }
    var ossImgPash = "http://diich-resource.oss-cn-beijing.aliyuncs.com/image/master/"; // oss图片地址存放地址
    var ossVideoPash = "http://diich-resource.oss-cn-beijing.aliyuncs.com/video/master/"; // oss视频存放地址
    var imgUrl = ""; // 基础信息模板图片url
    var addressCode = ""; // 联系方式信息模板居住地址code值
    var status;

    /**
     * 处理化数据
     * @param dicArrCity
     */
    function  init(dicArrCity) {
        // 获取浏览器url参数mid ichProjectId
        if(mid != null) {
            onRequest("GET", "/ichMaster/getIchMasterById", {params:mid}).then(function(result) {
                //console.log(result)
                // 处理用户未登录
                if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                    if(result.res.data) {
                        _onMergeObj(result.res.data);
                    }
                } else {
                    if(result.res.code != 3) {
                        tipBox.init("fail", result.res.msg, 1500);
                    }
                }
            }).then(function() {
                targetId = pageObj.hasOwnProperty("contentFragmentList") ? pageObj.id : mid;
                ichProjectId = pageObj.ichProjectId;
                isMaster = pageObj.userId ? 1 : 0;;
                // 加载其他模块
                _onInitLoad(dicArrCity);
            })
        } else {
            // 加载其他模块
            _onInitLoad(dicArrCity);
        }
    }

    /**
     * 初始化需要加载的
     * @private
     */
    function _onInitLoad(dicArrCity) {
        getBasic(dicArrCity);// 初始化第一个呈现页面为基础信息页面
        menusOne(dicArrCity); // 一级菜单监听
        menusTwo(dicArrCity); // 二级菜单监听
        _onWholeSave(); // 全局保存操作
        _onSubmit(); // 全局提交操作
        _onYesMenu(); // 初始化验证哪些填写项已完成
        buildCustom(); // 初始化构建自定义菜单项
        _onPreview(); // 预览
        _isSureSumit(); // 提交按钮是否可以提交 预览是否可以预览
        _addCustom(); // 添加自定义
    }


    /**
     * 一级菜单选择项监听
     */
    function menusOne(dicArrCity) {
        $("body").delegate(".dt", "click", function(){
            var $this = $(this);
            var type = $this.attr("id").split("_").pop();
            if(type != 0) {
                // 用户点击的是 基本信息之外的模块
                var thisId = $this.attr("id").split("_")
                var status = $("#" + thisId[0] + "_" + (parseInt(thisId[1]) - 1)).children("i").hasClass("selected");
                if(status) {
                    // 可以点击
                    _onEffect($this);
                    // 添加自定义项  加载模板
                    if(type == 2) {
                        // $("#onSubmit").addClass("disabled").removeClass("active");// 修改当前按钮为不可点击
                        getCustom();
                    }
                } else {
                    // 不可以点击
                    tipBox.init("fail", "请先完成上一级填写项" , 1500);
                }
            } else {
                // 用户点击的是基本信息模块
                _onEffect($this);
            }
            _changePage(false); // 显示 内容页面 隐藏 结束页面
            // 样式模板切换
            function _onEffect($this) {
                // 被点击效果切换
                $(".dt").each(function(i, v) {
                    $(this).removeClass("selected");
                    if(type != 2) {
                        $(this).next(".dd").hide();
                    }
                })
                $this.addClass("selected"); // 添加被点击效果
                $this.siblings(".dd").children("ul").children("li:first").addClass("selected"); // 选中一级菜单下第一个二级菜单
                $("li[id^='menu_']").each(function(i, v) {
                    $(this).removeClass("selected");
                })
                if($this.attr("id") != menu_2) {
                    $('#' + $this.siblings(".dd").children("ul").children("li:first").attr("id")).trigger("click");
                }

                $this.next(".dd").show();
            }
        });
    }

    /**
     * 二级菜单监听
     */
    function menusTwo(dicArrCity) {
        $("body").delegate("li[id^='menu_']", "click", function(){
            $("#onSubmit").addClass("active").removeClass("disabled");// 修改当前按钮为不可点击
            var $this = $(this);
            var ids = $this.attr("id").split("_");
            if(ids[2] != 0) {
                var fatherCode = "";
                if(ids[2] == 3) {
                    fatherCode = ids[1] - 1;
                } else if(ids[1] == 2) {
                    // 自定义
                    var code = $this.attr("data-code");
                    fatherCode = code != 0 ? ids[1] : ids[1] - 1;
                } else {
                    fatherCode = ids[1];
                }

                // 基础信息的
                //console.log("#" + ids[0] + "_" + ids[1] + "_" + (ids[2] - 1));
                var status = $("#" + ids[0] + "_" + fatherCode + "_" + (ids[2] - 1)).children("i").hasClass("selected");
                var status1 = $("#" + ids[0] + "_" + fatherCode + "_" + (ids[2] - 1)).children("i").hasClass("unselected2");
                if(status || status1) {
                    _onEffect($this);
                } else {
                    tipBox.init("fail", "请完成上一项菜单填写" , 1500);
                }
            } else {
                _onEffect($this);
            }

            // 样式模板切换
            function _onEffect($this) {
                // 被点击效果切换
                $("li[id^='menu_']").each(function(i, v) {
                    $(this).removeClass("selected");
                })
                $this.addClass("selected"); //添加被点击效果
                _changePage(false); // 显示 内容页面 隐藏 结束页面
                switch (ids[2]) {
                    case "0":
                        // 基本信息模板
                        getBasic(dicArrCity);
                        break;
                    case "1":
                        // 联系方式模板
                        getContact();
                        break;
                    case "2":
                        // 职业信息模板
                        getVocation();
                        break;
                    case "3":
                        // 简历
                        getResume($this.attr("id"), "简历", 51, "jl", [menu_11], 50, 5);
                        break;
                    case "4":
                        // 传承历史与现状
                        getResume($this.attr("id"), "传承历史与现状", 119, "lsxz", [menu_12], 50, 5);
                        break;
                    case "5":
                        // 师徒关系
                        getMaster($this.attr("id"));
                        break;
                    case "6":
                        // 技能
                        getResume($this.attr("id"), "技能", 115, "jn", [menu_14], 50, 1);
                        break;
                    case "7":
                        // 个人成就
                        getResume($this.attr("id"), "个人成就", 110, "cj",  [menu_15], 50, 5);
                        break;
                    case "8":
                        // 传承谱系
                        getResume($this.attr("id"), "传承谱系", 21, "ch",  [menu_16], 50, 5);
                        break;
                    case "9":
                        // 获奖情况
                        getResume($this.attr("id"), "获奖情况", 129, "hjqk",  [menu_17], 50, 5);
                        break;
                    case "10":
                        // 知识产权
                        getResume($this.attr("id"), "知识产权", 131, "zscq",  [], 50);
                        break;
                    default:
                        // 自定义项
                        getCustom($this.attr("id"), $this.attr("data-id"));
                }
            }
        });
    }

    /****************** start 基本信息模板开始 ******************/

    /**
     * 基本信息 - 基本信息模板
     * @param id
     * @param dicArrCity
     */
    function getBasic(dicArrCity) {
        var fyGrade = getDictionaryArrayByType(106);
        console.log(fyGrade)
        $("#content").html(Handlebars.compile(basicTpl)({countrys: dicArrCity, fyGrade: fyGrade, pageObj: pageObj, ichProjectId: ichProjectId})); // 更新页面模板
        // 回显是否为自己申报传承人
        if(isMaster) {
            if(isMaster == 1) {
                $("span[name='isApply_1']").addClass("active")
                $("span[name='isApply_0']").removeClass("active");
            } else {
                $("span[name='isApply_1']").removeClass("active");
                $("span[name='isApply_0']").addClass("active");
            }
        }

        // 监听是否为自己申报传承人 选项
        $("span[name^='isApply_']").on("click", function() {
            $("span[name^='isApply_']").each(function() {
                $(this).removeClass("active");
            })
            $(this).addClass("active");
            isMaster = $(this).attr("name").split("_").pop();
        })

        // 上传图片
        upload.submit($('.horizontal .group .control .file_up'),1,'/user/uploadFile?type=master',function (res) {
            //console.log("res -- >", res);
            imgUrl = res.data[0].substr((res.data[0].lastIndexOf ("/")+1), res.data[0].length);
            $('.preview').attr('src', res.data[0]).show();
            $('._token').val($('meta[name=token]').attr('content'));
        });

        if(pageObj.hasOwnProperty("contentFragmentList")) {
            // 回显图片
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attributeId == 10) {
                    $(".preview").attr("src", ossImgPash + v.resourceList[0].uri.toString()).show();
                    $(".file_up").addClass("active");
                    imgUrl = v.resourceList[0].uri.toString();
                }
            })
        }
        //时间
        $("#birthday").ECalendar({type:"date", skin:2, offset:[0,2]});
        // 监听证件选择框 更新证件验证方式
        $("#zj_type").change(function(){
            var code = $(this).val();
            switch (code) {
                case "0":
                    $("#zj").attr("check", "required idcard");// 身份证验证标示
                    break;
                case "2":
                    $("#zj").attr("check", "required passport");// 护照验证标示
                    break;
                default:
                    $("#zj").attr("check", "required")
            }
        });

        // 保存操作防止用户多次点击
        _bindingSave();
        function _bindingSave() {
            $("#active").on("click", function() {  // 监听提交
                _onSave();
            })
        }
        // 保存
        function _onSave() {
            $("#active").off("click");
            if(validate()) {
                var params = getBasicFormData(); // 获取表单数据 构建参数
                //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                console.log("params -- >", params);
                // 发送请求
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("result === >", result,  JSON.stringify(result.res.data));
                    // 处理用户未登录
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data);
                        //console.log("pageObj --- >", JSON.stringify(pageObj))
                        // 跳转到下一页面
                        _onNextPage(menu_00, [menu_01], result.res.data);
                        _isSureSumit();
                        _bindingSave();
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                        _bindingSave();
                    }
                });
            } else {
                //imgUrl == "" ? $("#img_err").html("<i></i>请上传照片 (如若已上传图片请等待图片回显后点击 下一步 操作)").show() : "";
                //isMaster == "" ? $("#isApply_err").html("<i></i>请选择是否为自己申报传承人").show() : "";
                _bindingSave();
            }
        }
    }


    /**
     * 基本信息 - 联系方式模板
     * @param id
     * @param dicArrCity
     */
    function getContact() {
        var dataCode;
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attributeId == 55) {
                    v.addressCodes = v.content != "" ? v.content.split(",") : [];
                    addressCode = v.content;
                    return;
                }
            })
        }

        // 更新DOM元素
        $("#content").html(Handlebars.compile(contactTpl)({pageObj: pageObj}));
        var codeArra = []; // 记录地址
        selectArea1.init(0, addressCode, function (data, dataText) {
            //var code = data;
            var code = "";
            if(data.length > 0) {
                $.each(data, function(i, v) {
                    console.log(i, v);
                    var dd = v.split(",");
                    if((i + 1) < data.length) {
                        code += dd[dd.length - 1] + ",";
                    } else {
                        code += dd[dd.length - 1]
                    }
                })
            }
            addressCode = code;
            console.log(addressCode)
        })

        // 保存操作防止用户多次点击
        _bindingSave();
        function _bindingSave() {
            $("#contact_active").on("click", function() {     // 监听提交
                onSave();
            })
        }

        // 保存
        function onSave() {
            $("#contact_active").off("click");
            if(validate()) {
                var params = getContactFormData();
                //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                console.log("params -- >", params);
                // 发送请求
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    //console.log("result ---- >", result, JSON.stringify(result.res.data), "----pageObj ---", pageObj);
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data); // 保存成功存储服务器返回数据
                        //console.log("pageObj --- >", JSON.stringify(pageObj))
                        // 跳转到下一页面
                        _onNextPage(menu_01, [menu_02], result.res.data);
                        _isSureSumit();
                        _bindingSave();
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                        _bindingSave();
                    }
                });
            } else {
                _bindingSave();
            }
        }
    }

    /**
     * 基本信息 - 职业信息模板
     * @param id
     * @param dicArrCity
     */
    function getVocation() {
        // 更新DOM元素
        $("#content").html(Handlebars.compile(vocationTpl)({pageObj: pageObj}));
        // 保存操作防止用户多次点击
        _bindingSave();
        function _bindingSave() {
            $("#vocation_active").on("click", function() {     // 监听提交
                onSave();
            })
        }

        // 保存
        function onSave() {
            $("#vocation_active").off("click");
            var jvalue = $("#jj").val();
            var minLength = 50;
            var maxLength = 200;
            var fag = true;
            if(jvalue) {
                fag = jvalue ? showMsg($("#jj"), defaults.tips_success, true) : showMsg($("#jj"), defaults.tips_required, false);
                if(jvalue.length > minLength && jvalue.length < maxLength) {
                    showMsg($("#jj"), defaults.tips_success, true)
                } else {
                    fag = false;
                    showMsg($("#jj"), defaults.tips_length.replace("min", minLength).replace("max", maxLength), false);
                }
            }

            if(fag) {
                showMsg($("#jj"), defaults.tips_success, true);
                var params = getVocationFormData();
                // 过滤掉重复数据
                //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                //console.log("params -- >", params);
                // 发送请求
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    //console.log("返回数据 -- >", result,  JSON.stringify(result.res.data),  "----pageObj ---", pageObj);
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data); // 保存成功存储服务器返回数据
                        //console.log("pageObj --- >", JSON.stringify(pageObj))
                        // 跳转到下一页面
                        _onNextPage(menu_02, [menu_1, menu_10], result.res.data);
                        _isSureSumit();
                        _bindingSave();
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                        _bindingSave();
                    }
                });
            } else {
                _bindingSave();
            }
        }
    }

    /****************** end 基本信息模板结束 ******************/

    /****************** statrt 传承人内容开始 ******************/

    /**
     * 通用模板 简历、传承历史与现状、技能、个人成就、传承谱系、获奖情况、知识产权
     * @param id 页面菜单项ID
     * @param title 模板页面title名称
     * @param dataId 相关填写项对应数据库ID
     * @param name 用于生成模板中id name属性
     * @param nextId 跳转到下一个页面id
     * @param minLength 验证最小长度
     * @param dataType 5图文  1长文本 0短文本
     */
    function getResume(id, title, menuId, name, nextId, minLength, dataType) {
        var resume = {title: title, name: name ? name : "menuData", menuId: menuId, startPath: ossImgPash, pageObj: pageObj, dataType: dataType};
        // 更新DOM元素
        var resumenHtml = Handlebars.compile(resumeTpl)(resume);
        $("#content").html(resumenHtml);
        inheritorPage.radioImage(); // 加载上传视频， 上传图片


        // 保存操作防止用户多次点击
        _bindingSave();
        function _bindingSave() {
            $("#next").on("click", function() {
                _onSave($(this));
            })
        }
        // 保存
        function _onSave($this) {
            $this.off("click");
            var content = $("#" + name).val();
            var fag = true;
            if(content) {
                fag = content ? showMsg($("#jj"), defaults.tips_success, true) : showMsg($("#jj"), defaults.tips_required, false);
                if(content.length < 50) {
                    showMsg($("#" + name), defaults.tips_minLength.replace("min", minLength), false);
                    fag = false;
                }
            }

            if(fag) {
                var params = getResumeFormData(resume.name);
                console.log("params --- >", params);
                //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("返回数据 -- >", result,  JSON.stringify(result.res.data),  "----pageObj ---", pageObj);
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data);
                        // 跳转到下一页面
                        _onNextPage(id, nextId, result.res.data);
                        _bindingSave();
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                        _bindingSave();
                    }
                });
            } else {
                //$("#nr_err").show();
                _bindingSave();
            }
        }

        // 删除操作防止用户多次点击
        _bindingDelete();
        function _bindingDelete() {
            $("a[id^='delete_']").on("click", function() {
                _onDelete($(this));
            })
        }

        // 删除
        function _onDelete($this) {
            $this.off("click");
            var did = $this.attr("id").split("_").pop();
            var obj = {};
            var index = 0; // 记录删除对象在pageObj中对应的索引位置
            // 去除对应的数据
            if(pageObj.hasOwnProperty("contentFragmentList")) {
                $.each(pageObj.contentFragmentList, function(i, v) {
                    if(v.attributeId == did) {
                        index = i;
                        obj = v;
                        return;
                    }
                })
            }

            // 如果obj属性大于0 则表示有数据
            if(Object.getOwnPropertyNames(obj).length > 0) {
                onRequest("POST", "/contentFragment/deleteContentFragment", {params: JSON.stringify(obj)}).then(function(result) {
                    console.log("result --- >", result);
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        _emptyMod(); // 清空MOD层数据
                        // 删除pageObj中对应的对象
                        pageObj.contentFragmentList.splice(index, 1);
                        // 更新菜单状态
                        $("#" + id).children("i").removeClass("selected").addClass("unselected2");
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                        _bindingDelete();
                    }
                });
            } else {
                // 暂留提示删除无数据
                _emptyMod(); // 清空MOD层数据
            }

            // 清空MOD层数据
            function _emptyMod() {
                var modId = $this.attr("id").split("_")[1];
                // 清空DOM层数据
                $("#" + modId).val("");
                $("#images").children("div .item").each(function() {
                    $(this).remove();
                })
                _bindingDelete();
            }
        }

        // 跳过此项
        $("#skip").on("click", function() {
            var num = parseInt(id.split("_").pop()) + 1;
            var str = id.split("_");
            //$("#" + id).children("i").addClass("selected").removeClass("unselected");
            $("#" + id).children("i").addClass("unselected2").removeClass("unselected");
            $('#' + str[0] + "_" + str[1] + "_" + num).trigger("click");
        })
    }

    /**
     * 传承人内容 - 师徒关系模板
     * @param id
     * @param dicArrCity
     */
    function getMaster(id) {
        // 更新DOM元素
        $("#content").html(Handlebars.compile(masterTpl)({pageObj: pageObj}));

        // 保存操作防止用户多次点击
        _bindingSave();
        function _bindingSave() {
            $("#master_active").on("click", function() {
                onSave();
            })
        }

        // 防止用户多次点击下一步按钮  处理过程解绑点击事件 处理完成后重新绑定
        function onSave() {
            $("#master_active").off("click");
            if(validate()) {
                var params = getMasterFormData();
                //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                //console.log("params --- >", params);
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    //console.log("result ---- >", result, JSON.stringify(result.res.data));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data); // 保存成功存储服务器返回数据
                        _onNextPage(id, [menu_13], result.res.data);
                        //_onSubmitMenu();
                        _bindingSave();
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                        _bindingSave();
                    }
                });
            } else {
                _bindingSave();
            }
        }
    }

    // 添加自定义项
    function _addCustom() {
        $("#add_custom").on("click", function() {
            $('#menu_2').trigger("click"); // 模拟点击添加自定义
        })
    }

    /**
     * 自定义项模板
     */
    function getCustom(menuId, customId) {
        // 更新DOM元素
        console.log("pageObj ---- >", pageObj);
        var resumenHtml = Handlebars.compile(customTpl)({pageObj: pageObj, customId : customId});
        $("#content").html(resumenHtml);
        inheritorPage.radioImage(); // 加载上传视频， 上传图片

        _bindingSave();
        function _bindingSave() {
            $("a[id^='custom_save']").on("click", function() {
                _onSave($(this));
            })
        }

        function _onSave($this) {
            var code = $this.attr("id").split("_").pop();
            $("a[id^='custom_save']").off("click");
            var fag = true;
            var name = $("#customName").val()
            //var content = $("#customContent").val();
            // 验证
            if(!name) {
                $("#customName_err").html("<i></i>请填写自定义名称").show();
                fag = false;
            } else if (name.length > 10) {
                $("#customName_err").html("<i></i>自定义名称最多可输入10个字").show();
                fag = false;
            }

            //if(!content) {
            //    $("#customContent_err").html("<i></i>请填写自定义内容，请填写").show();
            //    fag = false;
            //} else if (content.length >= 50 && content.length <= 200) {
            //    $("#customContent_err").html("<i></i>请最少输入(50字)").show();
            //}

            if(fag) {
                // 构建参数
                var data = [];
                data[0] = {"name": "custom", "value": content, coustomName: name};
                var params = getCustomFormData(data, pageObj);
                console.log("params --- >", params)
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        console.log("result -- >", result, "pageObj -- >", pageObj)

                        var fag = false;
                        // 判断是否存在页面缓存对象中
                        if(pageObj.hasOwnProperty("contentFragmentList")) {
                            $.each(pageObj.contentFragmentList, function(i, v) {
                                $.each(result.res.data.contentFragmentList, function(j, k) {
                                    if(v.attributeId == k.attributeId) {
                                        fag = true;
                                        return;
                                    }
                                })
                            })
                        }
                        _onMergeObj(result.res.data);

                        var mLength = "";
                        if(!fag) {
                            // 添加自定义菜单
                            mLength = $("#menu_2").next(".dd").children("ul").children("li").length;
                            if(mLength == 0) {
                                mLength = parseInt($("#menu_1").next(".dd").children("ul").children("li:last-child").attr("id").split("_").pop()) + 1;
                            } else {
                                mLength = parseInt($("#menu_2").next(".dd").children("ul").children("li:last-child").attr("id").split("_").pop()) + 1;
                            }
                            var id =  menu_2 + "_" + (mLength).toString();
                            var menuHtml = Handlebars.compile(menuTpl)({"id" : id, "name": name, "menuId" : result.res.data.contentFragmentList[0].attributeId, code: $("#menu_2").next(".dd").children("ul").children("li").length});
                            $("#" + menu_2).next(".dd").children("ul").append(menuHtml);
                            $("#" + menu_2 + "_" + mLength).children("i").addClass("selected").removeClass("unselected");
                        }

                        if(code == "add") {
                            $("#" + menu_2).trigger("click");
                        } else {
                            console.log("menuId --- >", menuId);
                            var nextId = $("#" + menuId).next("li").attr("id");
                            if(nextId) {
                                _onNextPage("menu_2" + "_" + mLength, [nextId], result.res.data);
                            } else {
                                _onNextPage("menu_2" + "_" + mLength, [], result.res.data);
                            }
                        }
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                    }
                });
            } else {
                _bindingSave();
            }
        }
    }
    /******************************end 传承人内容结束*********************************/

    /**
     *  全局提交操作
     * @private
     */
    function _onSubmit() {
        // 防止用户多次提交
        _bindingSave();
        function _bindingSave() {
            $("a[id^='onSend_']").on("click", function() {
                _onSave($(this));
            })
        }
        function _onSave($this) {
            var code = $this.attr("id").split("_").pop();
            //console.log("code === ", code);
            if(code == "top") {
                // 右上角提交
                if($this.hasClass("empty")){
                    _fu();
                } else {
                    _bindingSave(); // 重新绑定
                    tipBox.init("fail", "请填写基本数据后提交", 1500);
                }
            } else {
                // 结束页提交
                _fu();
            }

            function _fu() {
                $("a[id^='onSend_']").off("click"); //解绑点击事件
                pageObj.status = 3; // 状态修改为提交状态
                var params = pageObj;
                //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params) }).then(function(result) {
                    console.log("result === >", result,  JSON.stringify(result.res.data),  "----pageObj ---", pageObj);
                    // 处理用户未登录
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        //alert("提交成功");
                        window.location.href = "ichMasterOver.html"; // 跳转成功页面
                        _bindingSave(); // 重新绑定
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg, 1500);
                        }
                        _bindingSave(); // 重新绑定
                    }
                });
            }
        }
    }

    /**
     *  全局保存按钮提交
     * @private
     */
    function _onWholeSave() {
        _bindingSave();
        function _bindingSave() {
            $("#onSubmit").on("click", function() {
                _onSave();
            })
        }

        function _onSave() {
            // 判断当前按钮是否可以提交
            if($("#onSubmit").hasClass("active")) {
                $("#onSubmit").off("click");
                // 得到当前停留的页面
                var type = "custom"; // 默认是基本信息模板页面
                $("li[id^='menu_']").each(function() {
                    if($(this).hasClass("selected")) {
                        type = $(this).attr("id").split("_").pop();
                        return;
                    }
                })

                // 根据不同的停留页面构建不同的参数
                var params = "";
                switch (type) {
                    case "0":
                        // 基本信息模板
                        params = getBasicFormData();
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        //console.log("params --- >", params);
                        break;
                    case "1":
                        // 联系方式模板
                        params = getContactFormData();
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        //console.log("params --- >", params);
                        break;
                    case "2":
                        // 职业信息模板
                        params = getVocationFormData();
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        //console.log("params --- >", params);
                        break;
                    case "3":
                        // 简历
                        params = getResumeFormData("jl");
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        //console.log("params --- >", params);
                        break;
                    case "4":
                        // 传承历史与现状
                        params = getResumeFormData("lsxz");
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "5":
                        // 师徒关系
                        params = getMasterFormData();
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "6":
                        // 技能
                        params = getResumeFormData("jn");
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "7":
                        // 个人成就
                        params = getResumeFormData("cj");
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "8":
                        // 传承谱系
                        params = getResumeFormData("ch");
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "9":
                        // 获奖情况
                        params = getResumeFormData("hjqk");
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "10":
                        // 知识产权
                        params = getResumeFormData("zscq");
                        //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    default:
                        // 自定义项
                        params = getCustomFormData("menuData");
                    //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                }

                console.log(params);

                // 如果页面无任何已填写项， 则直接提示保存成功， 有填写项则存库
                if(params.contentFragmentList.length > 0) {
                    onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                        console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                        if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                            targetId = result.res.data.id;
                            _onMergeObj(result.res.data);
                            console.log("--->", pageObj);
                            tipBox.init("success", "保存成功", 1500);
                            _bindingSave();
                        } else {
                            if(result.res.code != 3) {
                                tipBox.init("fail", result.res.msg, 1500);
                            }
                            _bindingSave();
                        }
                    });
                } else {
                    // 页面无添加项目， 则直接提示保存成功
                    tipBox.init("success", "保存成功", 1500);
                    _bindingSave();
                }
            } else {
                tipBox.init("fail", "当前页面不可保存", 1500);
                _bindingSave();
            }
        }
    }

    /**
     *  提交按钮是否可以提交 预览是否可以预览
     * @private
     */
    function _isSureSumit() {
        var status = $("#" + menu_0).children("i").hasClass("selected");
        if(status) {
            $("#onSend_top").addClass("empty").removeClass("disabled"); // 更新提交按钮状态为可提交
            $("#preview").addClass("empty").removeClass("disabled"); // 更新预览按钮状态为可提交
        }
    }

    /**
     * 预览
     * @private
     */
    function _onPreview() {
        _bindingSave();
        function _bindingSave() {
            $("#preview").on("click", function() {
                var $this = $(this);
                _onOpen($this);
            });
        }

        function _onOpen($this) {
            $("#preview").off("click");
            if($this.hasClass("empty")) {
                //console.log("targetId --- >", targetId);
                onRequest("POST", "/ichMaster/preview", {params: targetId}).then(function(result) {
                    //console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                    var url = result.res.data;
                    //window.open(url.substr((url.indexOf(".") + 1), url.length));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        modal.loading({
                            //speed:'10000000000', //可选  默认2000
                            //text:'', //可选  默认加载中，请稍候...
                            success:function () {
                                var url = result.res.data;
                                window.open(url.substr((url.indexOf(".") + 1), url.length));
                                _bindingSave();
                            }
                        });
                    } else {
                        tipBox.init("fail", result.res.msg, 1500);
                        _bindingSave();
                    }
                });
            } else {
                tipBox.init("fail", "请填写基本数据后预览", 1500);
                _bindingSave();
            }
        }
    }

    // 过滤掉没填写值的数据
    function _onFilterNull(arr) {
        var newArr = [];
        $.each(arr, function(i, v) {
            if(v.attributeId != 10) {
                if(v.content != "") {
                    newArr.push(v);
                }
            } else {
                $.each(v.resourceList, function(j, d) {
                    if(d.uri != "") {
                        newArr.push(v);
                    }
                })
            }
        })
        return newArr;
    }

    /**
     *  初始化构建自定义菜单项
     * @private
     */
    function buildCustom() {
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attribute.targetType == 11) {
                    // 生成自定义项菜单
                    var $ul = $("#" + menu_2).next(".dd").children("ul");
                    var menuNum = parseInt($("#menu_1").next(".dd").children("ul").children("li:last-child").attr("id").split("_").pop()) + 1;
                    var id = menu_2 + "_" + menuNum.toString();
                    var menuHtml = Handlebars.compile(menuTpl)({"id" : id, "name": v.attribute.cnName, "menuId" : v.attributeId});
                    $ul.append(menuHtml);
                    $("#" + menu_2 + "_" + menuNum.toString()).children(i).addClass("selected").removeClass("unselected"); // 因为自定义项添加时的限制，已确保添加后的是已完成的
                }
            })
        }
    }

    // 页面填写项ID 集中管理对象
    var arrObj = {
        // 基础信息 一级菜单
        menu_0: {
            menu_0_0: [10, 13, 14, 15, 49, 17, 18, 127, 128], // 基本信息 attributeId
            menu_0_1: [58, 59, 55, 54, 56], // 联系方式 attributeId
            menu_0_2: [47, 48, 50, 24] // 职业信息 attributeId
        },

        // 传承人内容 一级菜单
        menu_1: {
            menu_1_3: [51], // 简历 attributeId
            menu_1_4: [119], // 传承历史与现状 attributeId
            menu_1_5: [125, 126], // 师徒 attributeId
            menu_1_6: [115], // 技能 attributeId
            menu_1_7: [110], // 个人成就 attributeId
            menu_1_8: [21], // 传承谱系 attributeId
            menu_1_9: [129], // 个人成就 attributeId
            menu_1_10: [131], // 知识产权 attributeId
        }

    }

    /**
     * 处理菜单回显是否被选中
     * @private
     */
    function _onYesMenu() {
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            //$("#" + menu_0).children("i").addClass("selected").removeClass("unselected");
            //$("#" + menu_1).children("i").addClass("selected").removeClass("unselected");
            //$("#" + menu_0).next(".dd").children("ul").children("li").each(function(){$(this).children("i").addClass("selected").removeClass("unselected")});
            //$("#" + menu_1).next(".dd").children("ul").children("li").each(function(){$(this).children("i").addClass("selected").removeClass("unselected")});

            // 迭代arrObj的menu_0..... xxx_1 ....属性
            for(var tem in arrObj) {
                // 迭代menu_0属性中的 menu_00.... xxx_01 ...属性
                for(var key in arrObj[tem]) {
                    var num = 0;
                    $.each(arrObj[tem][key], function(i, v) {
                        $.each(pageObj.contentFragmentList, function(j, d) {
                            // 如果content有值或有图片 并且 attributeId也存在pageObj页面缓存对象中 则计数
                            if(v == d.attributeId && (d.content != "" || d.resourceList.length > 0)) {
                                num++
                            }
                        })
                    })
                    ;
                    // 二级菜单 添加页面选中效果 页面填写项ID都存在在pageObj页面缓存对象中，则表示填写完
                    //if(num == arrObj[tem][key].length) {
                    //    $("#" + key).children("i").addClass("selected").removeClass("unselected");
                    //}
                    if(num > 0) {
                        $("#" + key).children("i").addClass("selected").removeClass("unselected");
                    } else {
                        $("#" + key).children("i").addClass("unselected2").removeClass("unselected");
                    }
                }
                // 判断一级菜单是否全被填写
                var n = 0;
                $("#" + tem).next(".dd").children("ul").children("li").each(function() {
                    if($(this).children("i").hasClass("selected") || $(this).children("i").hasClass("unselected2")) {
                        n++;
                    }
                })
                // 一级菜单 添加页面选中效果 计数n == js对象属性个数即添加填写完毕效果
                if(n ==  Object.getOwnPropertyNames(arrObj[tem]).length) {
                    $("#" + tem).children("i").addClass("selected");
                }
                //_onSubmitMenu(); // 验证页面所有填写项是否完成， 完成提交按钮修改为可提交状态
            }
        }
    }

    /**
     * 公共调用 合并js对象。
     * @param obj1
     * @param obj2
     * @private
     */
    function _onMergeObj(obj2) {
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            for(var tem in pageObj) {
                if(pageObj[tem] instanceof Array && tem == "contentFragmentList") {
                    // pageObj.contentFragmentList = pageObj.contentFragmentList.concat(obj2.contentFragmentList);
                    $.each(obj2.contentFragmentList, function(i, v) {
                        var res = onFilterRepeat(v.attributeId);
                        if(res.fag) {
                            pageObj.contentFragmentList = pageObj.contentFragmentList.concat(obj2.contentFragmentList);
                        } else {
                            // 不合并数据 但更新对象
                            Object.assign(pageObj[tem][res.index], v);
                        }
                    })
                } else {
                    pageObj[tem] = obj2[tem];
                }
            }
        } else {
            pageObj = obj2;
        }

        // 过滤掉重复的数据
        function onFilterRepeat(attributeId) {
            var res = {};
            res.fag = true;
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attributeId == attributeId) {
                    //console.log("检查出来的重复的对象", v);
                    res.fag = false;
                    res.index = i; // 重复数据在pageObj.contentFragmentList中重复的
                    return;
                }
            })
            return res;
        }
        console.log("pageObj --- >", pageObj)
    }

    /**
     * 构建请求参数
     * @param data
     * @param updateData
     * @returns {{contentFragmentList: *, isMaster: Number, lang: string, status: number, id: string}}
     */
    function buildParams(data, pageObj) {
        var  params = {
            "isMaster": parseInt(isMaster),
            "lang": getLang()=="zh-CN" ? "chi" : "eng",
            "id": targetId ? targetId : "",
        }

        if(ichProjectId) {
            params.ichProjectId = ichProjectId;
        }

        if(pageObj.hasOwnProperty("contentFragmentList")) {
            params.status = pageObj.status;
        }

        $.each(data, function(i, v) {
            v.attributeId = $("#" + v.name).attr("data-id") ? $("#" + v.name).attr("data-id") : 0 ;
            v.content = v.value;
            v.status = 0;
            v.targetType = 1;
            v.targetId = targetId? targetId : "";
            v.resourceList = v.imgs ? v.imgs : [];

            // 自定义
            if(v.hasOwnProperty("coustomName")) {
                v.attribute = {
                    "cnName": v.coustomName,
                    "dataType": 5,
                    "id": v.attributeId,
                    "targetType": 11
                }
                delete v.coustomName;
            }

            if(v.name == "img") {
                v.content = "";
                v.resourceList = [{uri: v.value}]; // 基本信息中只有一张图片
            }

            if(v.name == "birthday" && v.content != "") {
                v.content = new Date(parseInt(v.content) * 1000).format('yyyy/MM/dd');
            }

            if(v.imgs) {
                delete v.imgs
            }
            delete v.name;
            delete v.value;

            // 修改时候添加ID
            if(pageObj.hasOwnProperty("contentFragmentList")) {
                $.each(pageObj.contentFragmentList, function(j, d) {
                    if(v.attributeId == d.attributeId) {
                        v.id = d.id;
                        if(v.resourceList.length > 0 && d.resourceList.length > 0) {
                            $.each(v.resourceList, function(r, va) {
                                va.id = d.resourceList[r].id;
                            })
                        }
                        //delete params.status; // 修改的时候不填写status
                        return;
                    }
                })
            }
        })

        params.contentFragmentList = data;
        return params;
    }

    // 获取基本信息表单数据 处理成参数
    function getBasicFormData() {
        var data = $("#basicForm").serializeArray(); // 获取表单数据
        if(imgUrl) {
            data.push({"name" : "img", "value" : imgUrl}); // 构建图片参数
        }
        return buildParams(data, pageObj); // 构建请求参数数据
    }

    // 获取联系方式表单数据 处理成参数
    function getContactFormData() {
        var data = $("#contactForm").serializeArray(); // 获取表单数据
        data.push({"name" : "live", "value" : addressCode.toString()}); // 构建三级联动参数
        return buildParams(data, pageObj) // 构建请求参数数据
    }

    // 获取职业信息表单数据 处理成参数
    function getVocationFormData() {
        var data = $("#vocationForm").serializeArray(); // 获取表单数据
        return buildParams(data, pageObj); // 构建请求参数数据
    }

    // 获取师徒信息表单数据 处理成参数
    function getMasterFormData() {
        var data = $("#masterForm").serializeArray(); // 获取表单数据
        return buildParams(data, pageObj);  // 构建请求参数数据
    }

    // 获取长文本模板 表单数据 处理成参数
    function  getResumeFormData(name) {
        var data = [];
        data[0] = {
            name :  $("#" + name).attr("name"),
            value : $("#" + name).val()
        }
        console.log("data --- >", data);
        var imgs = [];
        $("#images").children("div .item").each(function(i, v) {
            var img = {};
            var uri = $(this).children("img").attr("data-src")
            img["uri"] = uri.substr(uri.lastIndexOf("/") + 1, uri.length)  ;
            img["description"] = $(this).children("input").val();
            img["type"] = 0;
            img["status"] = 0;
            imgs.push(img);
        })
        data[0].imgs = imgs;
        return buildParams(data, pageObj);
    }

    // 获取自定义模块 表单数据 处理成参数
    function getCustomFormData() {
        var name = $("#customName").val()
        var content = $("#customContent").val();
        var imgs = [];
        $("#images").children("div .item").each(function(i, v) {
            var img = {};
            var uri = $(this).children("img").attr("data-src")
            img["uri"] = uri.substr(uri.lastIndexOf("/") + 1, uri.length);
            img["description"] = $(this).children("input").val();
            img["type"] = 0;
            img["status"] = 0;
            imgs.push(img);
        })

        // 构建参数
        var data = [];
        data[0] = {"name": "customContent", "value": content, imgs: imgs, coustomName: name};
        return buildParams(data, pageObj);
    }

    /**
     *  判断基本信息 填写项是否填写完成
     *      true 完成则显示基本信息填写完成
     *      false 没完成则不显示
     * @private
     */
    //function _onSubmitMenu() {
    //    var fag = true; // 默认全部填写完成
    //    $("#" + menu_0).siblings(".dd").children("ul").children("li").each(function(i, v) {
    //        // 判断有一个没有填写完的都不可以
    //        if(!$(this).children("i").hasClass("selected")) {
    //            fag = false;
    //            return;
    //        }
    //    })
    //
    //    if(fag) {
    //        $("#" + menu_0).children("i").addClass("selected");
    //    }
    //
    //    var fag1 = true; // 默认全部填写完成
    //    $("#" + menu_1).siblings(".dd").children("ul").children("li").each(function(i, v) {
    //        if(!$(this).children("i").hasClass("selected")) {
    //            fag1 = false;
    //            return;
    //        }
    //    })
    //
    //    if(fag1) {
    //        $("#" + menu_1).children("i").addClass("selected");
    //    }
    //
    //    // 查看页面中所有的选项是否都填写通过了 通过了则可以提交
    //    if(fag && fag1) {
    //        //console.log("可以提交", fag, fag1);
    //        $("#onSend").addClass("empty").removeClass("disabled"); // 更新提交按钮状态为可提交
    //    }
    //}

    /**
     * 下一步 跳转下一页
     * @param id
     * @param nextIds
     * @private
     */
    function _onNextPage(id, nextIds, resData) {
        console.log(id, nextIds)
        new Promise(function(resolv, reject) {
            try{
                var status = false;
                $.each(resData.contentFragmentList,function(i, v) {
                    if(v.content != "" || v.resourceList.length > 0) {
                        status = true;
                        return;
                    }
                })
                if(status) {
                    $("#" + id).removeClass("selected").children("i").addClass("selected").removeClass("unselected").removeClass("unselected2"); // 添加已完成效果
                } else {
                    $("#" + id).removeClass("selected").children("i").addClass("unselected2").removeClass("unselected"); // 添加已完成效果
                }

                //$("#" + id).removeClass("selected").children("i").addClass("selected").removeClass("unselected"); // 添加已完成效果
                if(id.split("_")[1] == "0") {
                    _onHandle(menu_0);
                }
                if(id.split("_")[1] == "1") {
                    _onHandle(menu_1);
                }
                // 内部处理函数
                function _onHandle(id) {
                    var status = true;
                    $("#" + id).next(".dd").children("ul").children("li").each(function(i, v) {
                        if(!$(this).children("i").hasClass("selected") && !$(this).children("i").hasClass("unselected2")) {
                            status = false;
                            return;
                        }
                    })

                    if(status) {
                        $("#" + id).children("i").addClass("selected");
                    }
                }
                resolv();
            } catch(e) {
                reject({err: e});
            }
        }).then(function(res) {
                if(nextIds.length > 0) {
                    $.each(nextIds, function(i, v) {
                        $('#' + v).trigger("click"); // 模拟点击传承人内容
                    })
                } else {
                    // 更新DOM元素
                    _changePage(true);
                }
            })
    }

    // 切换结束页面与内容页面
    function _changePage(status) {
        if(status) {
            // 显示内容页面。 隐藏结束页面
            $("#content").hide();
            $("#endPage").show();
        } else {
            // 显示结束页面。 隐藏内容页面
            $("#content").show();
            $("#endPage").hide();
        }

    }

    /**
     * 请求
     * @param mode  请求方式
     * @param url   请求地址
     * @param params    参数
     * @returns {Promise}
     */
    function onRequest(mode, url, params) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: mode,
                url: url,
                data: params, // {params: JSON.stringify(params)}
                dataType: "json",
                async: false,
                success: function (res) {
                    if(res.code == 0) {
                        resolve({res: res })
                    } else {
                        resolve({res: res ? res : null})
                    }
                },
                error: function (err) {
                    reject(err)
                }
            });
        })
    }

    /**
     * 获取浏览器url参数  根据参数KEY获取
     * @param name
     * @returns {null}
     */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    /**
     * 正则匹配(返回bool值)
     */
    function chk (str, reg, reg1) {
        if(reg1) {
            return reg.test(str) || reg1.test(str);
        } else {
            return reg.test(str);
        }
    }

    /**
     * 统一验证入口
     */
    function validate() {
        var status = true;
        // 表单验证
        $("input[validate='true']").each(function (){
            var _validate = $(this).attr("check"); // 获取check属性值
            if(_validate) {
                var arr = _validate.split(" "); // 根据空格将其拆分成数组
                var value = $.trim($(this).val());
                var name = $(this).attr("name");
                if(value || name == "cnName") {
                    for(var i = 0; i < arr.length; i++) {
                        // 调用验证方法
                        if(!check($(this), arr[i], value)) {
                            status = false; // 有一个为false的 表单都不可以提交
                            break;
                        }
                    }
                }
            }
        })
        return status;
    }

    /**
     * 验证 正则 提示语
     * @type {{tips_sucess: string, tips_required: string, tips_email: string, tips_num: string, tips_chinese: string, tips_english: string, tips_pinyin: string, tips_mobile: string, tips_idcard: string, tips_pwdequal: string, tips_passport: string, tips_zipcode: string, reg_email: RegExp, reg_num: RegExp, reg_chinese: RegExp, reg_english: RegExp, reg_pinyin: RegExp, reg_mobile: RegExp, reg_idcard: RegExp, reg_passport: RegExp, reg_passport1: RegExp, reg_zipcode: RegExp}}
     */
    var defaults = {
        // 提示语
        tips_sucess: "", // 验证成功时候的提示语，默认是空
        tips_required: '此项是必添项，请填写',
        tips_email: '邮箱地址格式有误',
        tips_num: '请填写数字',
        tips_chinese: '请填写中文',
        tips_english: '请填写英文',
        tips_pinyin: '请填写拼音',
        tips_mobile: '手机号码格式有误',
        tips_idcard: '身份证号码格式有误',
        tips_pwdequal: '两次密码不一致',
        tips_passport: '护照号码格式有误',
        tips_zipcode: '邮编格式有误',
        tips_length: '请输入(min-max字)',
        tips_minLength: '请最少输入(min字)',

        // 正则
        reg_email: /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i, //验证邮箱
        reg_num: /^\d+$/,         //验证数字
        reg_chinese: /^[\u4e00-\u9fa5\s]+$/,     //验证中文
        reg_english: /^[A-Za-z\s]*[A-Za-z]$/, // 验证英文
        reg_pinyin: /^[A-Za-z\s]*[A-Za-z]$/, // 验证拼音
        reg_mobile: /^1[3458]{1}[0-9]{9}$/,    //验证手机
        reg_idcard: /^\d{14}\d{3}?\w$/,     //验证身份证
        reg_passport: /^[a-zA-Z]{5,17}$/, // 护照格式验证
        reg_passport1: /^[a-zA-Z0-9]{5,17}$/, // 护照格式验证1
        reg_zipcode: /^[1-9][0-9]{5}$/,
        reg_length: "/^.{min,max}$\/",
    };

    //验证方法
    function check(obj, _match, _val, minLength, maxLength) {
        //根据验证情况，显示相应提示信息，返回相应的值
        switch (_match) {
            case 'required':
                return _val ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_required, false);
            case 'email':
                return chk(_val, defaults.reg_email) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_email, false);
            case 'num':
                return chk(_val, defaults.reg_num) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_num, false);
            case 'chinese':
                return chk(_val, defaults.reg_chinese) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_chinese, false);
            case 'english':
                return chk(_val, defaults.reg_english) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_english, false);
            case 'pinyin' :
                return chk(_val, defaults.reg_pinyin) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_pinyin, false);
            case 'mobile':
                return chk(_val, defaults.reg_mobile) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_mobile, false);
            case 'idcard':
                return chk(_val, defaults.reg_idcard) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_idcard, false);
            case 'passport':
                return chk(_val, defaults.reg_passport, defaults.reg_passport1) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_passport, false);
            case 'zipcode' :
                return chk(_val, defaults.reg_zipcode) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_zipcode, false);
            default:
                var fag = true;
                var gz = _match.split("_");
                if(_val.length >= gz[1] && _val.length <= gz[2]) {
                    showMsg(obj, defaults.tips_success, true)
                } else {
                    fag = false;
                    showMsg(obj, defaults.tips_length.replace("min", gz[1]).replace("max", gz[2]), false);
                }
                return fag;
        }
    }

    /**
     * 渲染 页面提示语
     * @param obj   dom对象
     * @param msg   提示语
     * @param mark 结果true false
     * @returns {*}
     */
    function showMsg(obj, msg, mark) {
        if(!mark) {
            $("#" + obj.attr("id") + "_err").html("<i></i>" + msg).show(); // 显示提示语
            return mark;
        } else {
            $("#" + obj.attr("id") + "_err").html("<i></i>" + msg).hide(); // 隐藏提示语
            return mark;
        }
    }

    /**
     * 扩展DATE
     * @param format
     * @returns {*}
     */
    Date.prototype.format = function(format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }

    return {
        init: init
    }
});
