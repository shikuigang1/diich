define(["text!ichMasterForm/menuList.tpl", "text!ichMasterForm/basic.tpl",
        "text!ichMasterForm/contact.tpl", "text!ichMasterForm/vocation.tpl",
        "text!ichMasterForm/master.tpl", "text!ichMasterForm/resume.tpl",
        "text!ichMasterForm/custom.tpl", "text!ichMasterForm/menu.tpl"], function(menuListTpl, basicTpl, contactTpl, vocationTpl, masterTpl, resumeTpl, customTpl, menuTpl) {


    var menuss = []; // 菜单项目
    var pageObj = {}; // 页面缓存对象
    var targetId = "";
    var ichProjectId = getQueryString("pid"); // 所属项目ID
    var ichProjectName = getQueryString("pname"); // 所属项目ID
    var addressCode = ""; // 联系方式信息模板居住地址code值
    var declareCode = ""; // 申报地址
    var ossImgPash = "http://diich-resource.oss-cn-beijing.aliyuncs.com/image/master/"; // oss图片地址存放地址
    var mid = getQueryString("mid");
    var userType = 1; // 用户类型
    function _init() {
        if(mid != null) {
            _onRequest("GET", "/ichMaster/getIchMasterById", {params:mid}).then(function(result) {
                console.log("result -- >", result);
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
                // 加载其他模块
                _onInitLoad();
            })
        } else {
            // 加载其他模块
            _onInitLoad();
            // 获取用户信息
            // 判断用户type
        }
    }

    // 加载项
    function _onInitLoad() {
        _onGetMenus();
        _menusOne();
        _menusTwo();
        _onOverallSave();
        _onOveraPreview();
        _onOveraSubmit();
        _addCustom();
        _getUserInfo();
    }

    // 获取用户信息
    function _getUserInfo() {
        _onRequest("POST", "/user/userinfo", {params: ""}).then(function(data){
            userType = data.res.data.type;
        })
    }

    // 判断哪些菜单是填写完成的
    function _onYesMenu() {
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            $.each(menuss, function(i, v) {
                console.log(i, v);
                if(v.sonTerms) {
                    // 验证基本信息项
                    var num = 0;
                    $.each(menuss[i].sonTerms, function(i2, v2) {
                        $.each(pageObj.contentFragmentList, function(i3, v3) {
                            // 菜单填写项中 有一个填写项填写了，或者有图片就算过了
                            if(v2.id == v3.attributeId && (v3.content != "" || v3.resourceList.length > 0)) {
                                num++;
                                return;
                            }
                        })
                    })

                    if(num > 0) {
                        $("#" + menuss[i].muid).children("i").addClass("selected").removeClass("unselected");
                    } else {
                        $("#" + menuss[i].muid).children("i").addClass("unselected2").removeClass("unselected");
                    }
                } else {
                    $.each(v.sonMenus, function(i1, v1) {
                        var num = 0;
                        $.each(v1.sonTerms,function(i2, v2){
                            $.each(pageObj.contentFragmentList, function(i3, v3) {
                                // 菜单填写项中 有一个填写项填写了，或者有图片就算过了
                                if(v2.id == v3.attributeId && (v3.content != "" || v3.resourceList.length > 0)) {
                                    num++;
                                    return;
                                }
                            })
                        })

                        if(num > 0) {
                            $("#" + v1.muid).children("i").addClass("selected").removeClass("unselected");
                        } else {
                            $("#" + v1.muid).children("i").addClass("unselected2").removeClass("unselected");
                        }
                    })
                    $("#" + v.muid).children("i").addClass("selected").removeClass("unselected");
                }
            })
        }
    }

    /**************************************************** 构建菜单 *****************************************************/
    // 获取菜单数据
    function _onGetMenus() {
        _onRequest("GET", "/ichCategory/getAttributeList", {targetType: 1}).then(function(result) {
            if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                console.log(" --- res  ", result.res.data);
                menuss = _onBuildMenus(result.res.data);
                console.log("menuss --- >", menuss)
                $("#menusAll").html(Handlebars.compile(menuListTpl)({menuss: menuss})); // 添加菜单
                _buildCustom(); // 生成自定义菜单
                _getBasicTpl($("#menu_1")); // 加载基本信息模板
                _onYesMenu(); // 自动检索菜单项各个表单是否填写完成
                _isSureSumit($("#menu_1")); // 自动检索保存、提交是否可以点击
                console.log(" menuss --- >", menuss)
            } else {
                tipBox.init("fail", result.res.msg , 1500);
            }
        })
    }

    // 构建菜单
    function _onBuildMenus(menus) {
        var menus0 = {}, menus1 = {}, menus2 = {}, menus3 = {}, menus4 = {}; // 声明菜单
        $.each(menus, function(i, v) {
            switch (v.lable) {
                case "基本信息":
                    _buildSort(menus0, v, 0, "menu_1");
                    break;
                case "联系方式":
                    _buildSort(menus1, v, 0, "menu_2");
                        break;
                case "职业信息":
                    _buildSort(menus2, v, 0, "menu_3");
                    break;
                case  "师徒关系":
                    _buildSort(menus3, v, 0, "menu_4");
                    break;
                default:
                    _buildSort(menus4, v, 1, "menu_5");
                    break;
            }
        })
        function _buildSort(menusArr, v, code, muid) {
            if(code == 0) {
                // 基本信息菜单
                if(menusArr.hasOwnProperty("menusName")) {
                    menusArr.muid = muid;
                    menusArr.sonTerms.push(v);
                } else {
                    menusArr.menusName = v.lable;
                    menusArr.sonTerms = [];
                    menusArr.sonTerms.push(v);
                }
                // 排序
                menusArr.sonTerms.sort(function(a, b) {
                    return a.seq - b.seq;
                })
            } else {
                // 传承人菜单
                if(v.lable != "") {
                    var obj = {};
                    obj.menusName =  v.lable;
                    obj.sonTerms = [];
                    obj.sonTerms.push(v);
                    if(menusArr.hasOwnProperty("menusName")) {
                        var status = true;
                        $.each(menusArr.sonMenus, function(i, value) {
                            if(value.menusName == v.lable) {
                                value.sonTerms.push(v);
                                status = false;
                                return;
                            }
                        })
                        if(status) {
                            menusArr.sonMenus.push(obj);
                        }
                    } else {
                        menusArr.muid = muid;
                        menusArr.menusName = "传承人内容";
                        menusArr.sonMenus = [];
                        menusArr.sonMenus.push(obj);
                    }

                    // 排序
                    $.each(menusArr.sonMenus, function(i, vlaue) {
                        vlaue.sonTerms.sort(function(a,b) {
                            return a.seq - b.seq;
                        })
                    })
                }
            }
        }

        // 传承人子菜单生成ID
        $.each(menus4.sonMenus, function(i, v) {
            v.muid = "menutwo_" +menus4.muid.split("_").pop() + "_" + i;
        })
        var myMenus = new Array();
        myMenus.push(menus0);
        myMenus.push(menus1);
        myMenus.push(menus2);
        myMenus.push(menus3);
        myMenus.push(menus4);
        return myMenus;
    }

    // 初始化构建自定义菜单项
    function _buildCustom() {
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attribute.targetType == 11) {
                    var coustomId = $("#menus_custom").children(".dt").attr("id"); // 获取自定义项一级菜单ID
                    var $ul = $("#" + coustomId).next(".dd").children("ul");
                    var lengt = $ul.children("li").length == 0 ? $ul.children("li").length : $ul.children("li").length + 1;
                    var menuHtml = Handlebars.compile(menuTpl)({mid: "menutwo_" + coustomId.split("_")[1] + "_" + lengt, name: v.attribute.cnName, menuId : v.attributeId});
                    $ul.append(menuHtml);
                    $("#menutwo_" + coustomId.split("_")[1] + "_" + lengt).children(i).addClass("selected").removeClass("unselected"); // 因为自定义项添加时的限制，已确保添加后的是已完成的
                }
            })
        }
    }
    /**************************************************** 监听菜单模本 *****************************************************/
    // 监听一级菜单
    function _menusOne() {
        $("body").delegate(".dt", "click", function(){
            var $this = $(this);
            var type = $this.attr("id").split("_").pop();
            if(type != 1) {
                var idArr = $this.attr("id").split("_");
                var status = $("#" + idArr[0] + "_" + (parseInt(idArr[1]) - 1)).children("i").hasClass("selected");
                var status1 = $("#" + idArr[0] + "_" + (parseInt(idArr[1]) - 1)).children("i").hasClass("unselected2");
                if(status || status1) {
                    _onSelected($this, type);
                } else {
                    tipBox.init("fail", "请先完成上一级填写项" , 1500);
                }
            } else {
                _onSelected($this, type);
            }
        })

        // 选中效果
        function _onSelected($this, type) {
            $(".dt").each(function(i, v) {
                $(this).removeClass("selected");
                if(type != 5) {
                    $(this).next(".dd").hide();
                }
            })
            $this.addClass("selected"); // 添加被点击效果
            $this.next(".dd").show();

            // 根据不同的type加载不同的模板
            switch (type) {
                case "1":
                    _getBasicTpl($this);// 基本信息
                    break;
                case "2":
                    _getContactTpl($this);// 联系方式
                    break;
                case "3":
                    _getVocationTpl($this);// 职业信息
                    break;
                case "4":
                    _getMasterTpl($this);// 师徒关系
                    break;
                case "5":
                    // 传承人内容
                    $('#menutwo_5_0').trigger("click"); // 模拟点击传承人内容下第一个子菜单
                    break;
                default:
                    // 清空子项被选中样式
                    $this.next(".dd").children("ul").children("li").each(function(i, v) {
                        $(this).removeClass("selected");
                    })
                    _getCustomTpl($this, null);// 自定义项
                    break;
            }
            _changePage(false); // 显示 内容页面 隐藏 结束页面
        }
    }

    // 监听二级菜单
    function _menusTwo() {
        $("body").delegate("li[id^='menutwo_']", "click", function() {
            var $this = $(this);
            console.log("1-- >", $this.attr("id"))
            var ids = $this.attr("id").split("_");
            console.log("ids -- >", ids);
            // 传承人内容二级菜单
            var inheritId = $("#menus_inherit").children(".dt").attr("id").split("_").pop();
            if(ids[1] == inheritId) {
                if(ids[2] != 0) {
                    var status = $("#" + ids[0] + "_" + ids[1] + "_" + (ids[2] - 1)).children("i").hasClass("selected");
                    var status1 = $("#" + ids[0] + "_" + ids[1] + "_" + (ids[2] - 1)).children("i").hasClass("unselected2");
                    if(status || status1) {
                        _onSelected($this, ids[2], 0);
                    } else {
                        tipBox.init("fail", "请先完成上一级填写项" , 1500);
                    }
                } else {
                    _onSelected($this, ids[2], 0);
                }
            }
            // 自定义项
            var customId = $("#menus_custom").children(".dt").attr("id").split("_").pop();
            if(ids[1] == customId) {
                 _onSelected($this, ids[2], 1);
            }
        })

        // 选中效果 code 0加载通用模板  1加载自定义项模板
        function _onSelected($this, type, code) {
            // 被点击效果切换
            $("li[id^='menutwo_']").each(function(i, v) {
                $(this).removeClass("selected");
            })
            $this.addClass("selected"); //添加被点击效果

            if(code == 0) {
                _getCommonTpl($this, menuss[4].sonMenus[type]); // 调用通用模板
            } else {
                console.log("2-- >", $this.attr("id"))
                _getCustomTpl($this);
            }

            _changePage(false); // 显示 内容页面 隐藏 结束页面
        }
    }

    /**************************************************** 右侧模本 *****************************************************/

    var isMaster = 0; // 是否申请传承人 0否 1是
    var imgUrl = ""; // 上传图片地址
    var zjCode = "0"; // 证件Code 默认身份证
    // 基本信息模板
    function _getBasicTpl($this) {
        var fyGrade = getDictionaryArrayByType(106); // 获取到非遗等级
        // 显示 申报地 国籍
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attributeId == 23) {
                    v.addressCodes = v.content != "" ? v.content.split(",") : [];
                    declareCode = v.content;
                    return;
                }
            })
        }
        console.log(" menuss[0].sonTerms --- >",  menuss[0].sonTerms);
        $("#content").html(Handlebars.compile(basicTpl)({countrys: dic_arr_city, sonterms: menuss[0].sonTerms, ichProjectId: ichProjectId, ichProjectName: ichProjectName, pageObj : pageObj, fyGrade: fyGrade})); // 更新页面模板
        // 上传图片
        upload.submit('image/master/',function (res) {
            console.log("res --- >", res);
            //if(res.data.length > 0) {
            //    imgUrl = res.data[0].substr((res.data[0].lastIndexOf ("/")+1), res.data[0].length);
            //    $('.preview').attr('src', res.data[0]).show();
            //    $('._token').val($('meta[name=token]').attr('content'));
            //}
        });

        // 回显图片
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attributeId == 10) {
                    $(".preview").attr("src", ossImgPash + v.resourceList[0].uri.toString()).show();
                    $(".file_up").addClass("active");
                    imgUrl = v.resourceList[0].uri.toString();
                }
            })
        }
        //时间
        $("#basic_18").ECalendar({type:"date", skin:2, offset:[0,2]});
        // 监听证件选择框 更新证件验证方式
        $("#basic_127").change(function(){
            zjCode =  $(this).val();
        });
        // 申报地址
        selectArea1.init(1, declareCode, function (data, dataText) {
            //console.log(data, dataText)
            declareCode = data.toString();
        })

        // 選擇項目
        $("#basic_pid").on("click", function() {
            var d = dialog({id: "project", width: 800, height: 500, fixed: true, hide:true, title: '搜索非遗项目', content: $('#ff'), modal:true});
            d.show();
        })

        // 下一步监听
        _bindingSave();
        function _bindingSave() {
            $("#basic_active").on("click", function() {  // 监听提交
                _onSave();
            })
        }
        function _onSave() {
            $("#basicForm").off("click");
            var data = $("#basicForm").serializeArray();
            //data.push({name: "basic_pid", value: $("#basic_pid").val()})
            var status = true, errNum = 0;
            // 验证
            $.each(data, function(i, v) {
                var id = v.name.split("_").pop();
                var maxlength = $("#" + v.name).attr("data-maxLength");
                var minlength = $("#" + v.name).attr("data-minLength");
                //if(v.value) {
                    var rule = ""; // 正则规则
                    var rule2 = ""; // 正则验证2
                    var isNull = false; // 是否为空验证
                    switch (id) {
                        case "13": // 中文名
                            rule = "reg_chinese";
                            isNull = true;
                            break;
                        case "14": // 英文名
                            rule = "reg_english";
                            break;
                        case "15": // 拼音
                            rule = "reg_pinyin";
                            break
                        case "128": // 证件号码
                            if(zjCode == "0") {
                                rule = "reg_idcard";
                            } else if(zjCode == "2") {
                                rule = "reg_passport";
                                rule2 = "reg_passport1";
                            }
                            break
                        case "pid": // 拼音
                            rule = "";
                            isNull = true;
                            break
                        default:
                            break;
                    }
                    if(!_onChk(v, rule, rule2, isNull, maxlength, minlength)) {
                        errNum++;
                    }
                //}
            })
            // 更新状态
            status = errNum > 0 ? false : true;
            if(status) {
                // 可以提交
                if(imgUrl) {
                    data.push({"name" : "img", "value" : imgUrl}); // 构建图片参数
                }
                data.push({"name" : "declare", "value" : declareCode.toString()}); // 构建三级联动参数
                var params = buildParams(data, pageObj);
                //console.log("params --- >", params);
                _onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("result === >", result,  JSON.stringify(result.res.data));
                    // 处理用户未登录
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data);
                        _onNextPage($this.attr("id"), ["menu_2"], result.res.data);
                        _isSureSumit($this);
                        _bindingSave();
                    } else {
                        tipBox.init("fail", result.res.msg, 1500);
                        _bindingSave();
                    }
                });
            }
        }
    }

    // 关闭窗口
    function _closeWindow(id, name) {
        //console.log("关闭窗口", id, name);
        ichProjectId = id;
        ichProjectName = name;
        $("#basic_pid").val(name);
        $("#basic_pid").attr("data-id", id);
        dialog.list['project'].close(); // 关闭窗口
    }

    // 联系方式模板
    function _getContactTpl($this) {
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attributeId == 55) {
                    v.addressCodes = v.content != "" ? v.content.split(",") : [];
                    addressCode = v.content;
                    return;
                }
            })
        }
        $("#content").html(Handlebars.compile(contactTpl)({sonterms: menuss[1].sonTerms, pageObj: pageObj})); // 更新页面模板
        selectArea1.init(0, addressCode, function (data, dataText) {
            var code = "";
            if(data.length > 0) {
                $.each(data, function(i, v) {
                    //console.log(i, v);
                    var dd = v.split(",");
                    if((i + 1) < data.length) {
                        code += dd[dd.length - 1] + ",";
                    } else {
                        code += dd[dd.length - 1]
                    }
                })
            }
            addressCode = code;
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
            $("#contactForm").off("click");
            var data = $("#contactForm").serializeArray();
            //console.log("data --- >", data);
            var status = true, errNum = 0;
            // 验证
            $.each(data, function(i, v) {
                var id = v.name.split("_").pop();
                var maxlength = $("#" + v.name).attr("data-maxLength");
                var minlength = $("#" + v.name).attr("data-minLength");
                var rule = ""; // 正则规则
                var rule2 = ""; // 正则验证2
                var isNull = false; // 是否为空验证
                switch (id) {
                    case "58": // 手机号
                        rule = "reg_mobile";
                        break;
                    case "59": // 邮箱
                        rule = "reg_email";
                        break;
                    case "56": // 邮编
                        rule = "reg_zipcode";
                        break
                    default:
                        break;
                }
                if(!_onChk(v, rule, rule2, isNull, maxlength, minlength)) {
                    errNum++;
                }
            })
            // 更新状态
            status = errNum > 0 ? false : true;
            if(status) {
                // 可以提交
                data.push({"name" : "live", "value" : addressCode.toString()}); // 构建三级联动参数
                var params = buildParams(data, pageObj);
                //console.log("params --- >", params);
                _onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    //console.log("result === >", result,  JSON.stringify(result.res.data));
                    // 处理用户未登录
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data);
                        _onNextPage($this.attr("id"), ["menu_3"], result.res.data);
                        _bindingSave();
                    } else {
                        tipBox.init("fail", result.res.msg, 1500);
                        _bindingSave();
                    }
                });
            }
        }
    }

    // 职业信息模板
    function _getVocationTpl($this) {
        $("#content").html(Handlebars.compile(vocationTpl)({sonterms: menuss[2].sonTerms, pageObj: pageObj})); // 更新页面模板
        _bindingSave();
        function _bindingSave() {
            $("#vocation_active").on("click", function() {     // 监听提交
                onSave();
            })
        }

        // 保存
        function onSave() {
            var data = $("#vocationForm").serializeArray();
            var params = buildParams(data, pageObj);
            //console.log("params -- >", params);
            // 发送请求
            _onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                //console.log("返回数据 -- >", result,  JSON.stringify(result.res.data),  "----pageObj ---", pageObj);
                if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                    targetId = result.res.data.id;
                    _onMergeObj(result.res.data);
                    _onNextPage($this.attr("id"), ["menu_4"], result.res.data);
                    //
                    _bindingSave();
                } else {
                    tipBox.init("fail", result.res.msg , 1500);
                    _bindingSave();
                }
            });
        }
    }

    // 师徒信息模板
    function _getMasterTpl($this) {
        $("#content").html(Handlebars.compile(masterTpl)({sonterms: menuss[3].sonTerms, pageObj: pageObj})); // 更新页面模板
        _bindingSave();
        function _bindingSave() {
            $("#master_active").on("click", function() {
                onSave();
            })
        }

        // 防止用户多次点击下一步按钮  处理过程解绑点击事件 处理完成后重新绑定
        function onSave() {
            //$("#master_active").off("click");
            var data = $("#masterForm").serializeArray();
            var params = buildParams(data, pageObj);
            //console.log("params -- >", params);
            _onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                //console.log("result ---- >", result, JSON.stringify(result.res.data));
                if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                    targetId = result.res.data.id;
                    _onMergeObj(result.res.data); // 保存成功存储服务器返回数据
                    _onNextPage($this.attr("id"), ["menu_5","menutwo_5_0"], result.res.data);
                    _bindingSave();
                } else {
                    tipBox.init("fail", result.res.msg , 1500);
                    _bindingSave();
                }
            });
        }
    }

    // 通用模板（长文本）
    function _getCommonTpl($this, sonterms) {
        $("#content").html(Handlebars.compile(resumeTpl)({sonterms: sonterms, pageObj: pageObj})); // 更新页面模板
        inheritorPage.radioImage(); // 加载上传视频， 上传图片
        var id = parseInt($this.attr("id").split("_").pop());
        _bindingSave();
        function _bindingSave() {
            $("#next").on("click", function() {
                _onSave();
            })
        }

        function _onSave() {
            //$("#next").off("click");
            var $textarea = $("textarea[id^='resum_']");
            var v = {name: $textarea.attr("id"), value: $textarea.val()};
            var maxlength = $textarea.attr("data-maxLength");
            var minlength = $textarea.attr("data-minLength");
            // 验证
            var status = true, errNum = 0;
            if(!_onChk(v, "", "", false, maxlength, minlength)) {
                errNum++;
            }
            // 更新状态
            status = errNum > 0 ? false : true;
            if(status) {
                var params = _getResumeFormData($textarea);
                //console.log("params --- >", params);
                _onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("返回数据 -- >", result,  JSON.stringify(result.res.data),  "----pageObj ---", pageObj);
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data); // 保存成功存储服务器返回数据
                        _onNextPage($this.attr("id"), ["menutwo_5_" + (id + 1)], result.res.data);
                        _bindingSave();
                    } else {
                        tipBox.init("fail", result.res.msg , 1500);
                        _bindingSave();
                    }
                });
            }
        }

        // 删除数据操作防止用户多次点击
        _bindingDelete();
        function _bindingDelete() {
            $("a[id='delete']").on("click", function() {
                _onDelete($(this));
            })
        }

        // 删除
        function _onDelete($this) {
            var did = sonterms.sonTerms[0].id;
            $this.off("click");
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
                _onRequest("POST", "/contentFragment/deleteContentFragment", {params: JSON.stringify(obj)}).then(function(result) {
                    //console.log("result --- >", result);
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
                // 清空DOM层数据
                $("#resum_" + did).val("");
                $("#images").children("div .item").each(function() {
                    $(this).remove();
                })
                _bindingDelete();
            }
        }

        // 删除图片操作
        _bindingDeleteImg();
        function _bindingDeleteImg() {
            $("body").delegate("span[id^='remove_']", "click", function(){
                _deleteImg($(this));
            })
        }

        function _deleteImg($this) {
            var pop = $this.attr("id").split("_").pop(); // 图片Id
            var mid = $this.attr("data-id");
            if(pop != "delete") {
                console.log("pop -- >", pop);
                // 删除数据库存储数据
                _onRequest("POST", "/resource/deleteResource", {params: pop}).then(function(result) {
                    console.log("result --- >", result);
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        // 删掉页面缓存对象中的数据
                        if(pageObj.hasOwnProperty("contentFragmentList")){
                            $.each(pageObj.contentFragmentList, function(i, v) {
                                if(v.attributeId == mid) {
                                    $.each(v.resourceList, function(i1, v1) {
                                        if(v1.id == pop) {
                                            v.resourceList.splice(i1,1);
                                        }
                                    })
                                }
                            })
                        }
                        // 清空dom层
                        $this.parent(".item").remove();
                        _bindingDeleteImg();
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                        _bindingDeleteImg();
                    }
                });
            } else {
                // 清空dom层
                $this.parent(".item").remove();
                _bindingDeleteImg();
            }
        }
    }

    // 通用模板函数
    function  _getResumeFormData($textarea) {
        var data = [];
        data[0] = {
            name :  $textarea.attr("name"),
            value : $textarea.val()
        }
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

    // 自定义模板
    function _getCustomTpl($this) {
        $("#content").html(Handlebars.compile(customTpl)({pageObj: pageObj, customId: $this.attr("data-id")})); // 更新页面模板
        inheritorPage.radioImage(); // 加载上传视频， 上传图片

        // 保存
        _bindingSave();
        function _bindingSave() {
            $("a[id^='custom_save']").on("click", function() {
                _onSave($(this));
            })
        }

        function _onSave($sthis) {
            var code = $sthis.attr("id").split("_").pop();
            var data = [];
            data.push({name: "customName", value: $("#customName").val()});
            data.push( {name: "customContent", value: $("#customContent").val()});
            var status = true, errNum = 0;
            $.each(data, function(i, v) {
                //var maxlength = $textarea.attr("data-maxLength");
                //var minlength = $textarea.attr("data-minLength");
                if(!_onChk(v, "", "", true, null, null)) {
                    errNum++;
                }
            })
            // 更新状态
            status = errNum > 0 ? false : true;
            var p = {name: "customContent", value: $("#customContent").val(), coustomName: $("#customName").val()};
            if(status) {
                var params = getCustomFormData(p);
                console.log("自定义参数 --- >", params);
                _onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("返回数据 -- >", result,  JSON.stringify(result.res.data),  "----pageObj ---", pageObj);
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
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
                        _onMergeObj(result.res.data); // 保存成功存储服务器返回数据
                        if(!fag) {
                            // 添加自定义菜单项目
                            var arrLi = $this.next(".dd").children("ul").children("li:last-child");
                            var mid = "menutwo_" + $this.attr("id").split("_").pop() + "_";
                            if(arrLi.length > 0) {
                                //console.log(arrLi.attr("id").split("_").pop())
                                mid += parseInt(arrLi.attr("id").split("_").pop()) + 1;
                            } else {
                                mid += "0";
                            }
                            //console.log("mid --- >", mid);
                            $this.next(".dd").children("ul").append(Handlebars.compile(menuTpl)({mid: mid, name: data[0]["value"], menuId: result.res.data.contentFragmentList[0].attributeId}));
                            $("#" + mid).children("i").addClass("selected").removeClass("unselected");
                        } else {
                            // 修改自定义项目
                            $("#" + $this.attr("id")).children("span").text(result.res.data.contentFragmentList[0].attribute.cnName); // 更新自定义菜单名字
                        }

                        if(code == "next") {
                            // 跳转到下一个页面
                            var cidStr = $this.attr("id");
                            cidStr = cidStr.replace(cidStr.split("_").pop(), (parseInt(cidStr.split("_").pop()) + 1));
                            if($("#" + cidStr).length > 0) {
                                // 存在
                                _onNextPage($this.attr("id"), [cidStr], result.res.data);
                            } else {
                                // 不存在
                                _onNextPage($this.attr("id"), [], result.res.data);
                            }
                        } else {
                            // 模拟点击添加自定义
                            $('#' + $this.attr("id")).trigger("click");
                        }
                        _bindingSave();
                    } else {
                        tipBox.init("fail", result.res.msg , 1500);
                        _bindingSave();
                    }
                })
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
            var did = $this.attr("id").split("_").pop();
            var obj = {};
            var index = 0; // 记录删除对象在pageObj中对应的索引位置
            // 去除对应的数据
            if (pageObj.hasOwnProperty("contentFragmentList")) {
                $.each(pageObj.contentFragmentList, function (i, v) {
                    if (v.attributeId == did) {
                        index = i;
                        obj = v;
                        return;
                    }
                })
            }

            // 如果obj属性大于0 则表示有数据
            if (Object.getOwnPropertyNames(obj).length > 0) {
                //console.log("obj --- >", obj);
                _onRequest("POST", "/contentFragment/deleteContentFragment", {params: JSON.stringify(obj)}).then(function (result) {
                    //console.log("result --- >", result);
                    if (result.res.code == 0 && result.res.msg == "SUCCESS") {
                        _emptyMod(); // 清空MOD层数据
                        // 删除pageObj中对应的对象
                        pageObj.contentFragmentList.splice(index, 1);
                    } else {
                        if (result.res.code != 3) {
                            tipBox.init("fail", result.res.msg, 1500);
                        }
                        _bindingDelete();
                    }
                });
            } else {
                // 暂留提示删除无数据
                _emptyMod(); // 清空MOD层数据
            }

            // 清空菜单 删除数据页面
            function _emptyMod() {
                //var oli = $("#" + $this.attr("id"));
                $("#" + $this.parent().parent().prev().attr("id")).trigger("click");
                $this.remove(); // 删除菜单
                _bindingDelete();
            }


            $("#menus_custom").children(".dd").children("ul").children(".selected").remove();// 删除菜单

        }

        // 删除图片操作
        _bindingDeleteImg();
        function _bindingDeleteImg() {
            $("body").delegate("span[id^='remove_']", "click", function(){
                _deleteImg($(this));
            })
        }

        function _deleteImg($this) {
            $this.off("click");
            //var $this = $(this);
            var pop = $this.attr("id").split("_").pop(); // 图片Id
            var mid = $this.attr("data-id");
            if(pop != "delete") {
                console.log("pop -- >", pop);
                // 删除数据库存储数据
                _onRequest("POST", "/resource/deleteResource", {params: pop}).then(function(result) {
                    console.log("result --- >", result);
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        // 删掉页面缓存对象中的数据
                        if(pageObj.hasOwnProperty("contentFragmentList")){
                            $.each(pageObj.contentFragmentList, function(i, v) {
                                if(v.attributeId == mid) {
                                    $.each(v.resourceList, function(i1, v1) {
                                        if(v1.id == pop) {
                                            v.resourceList.splice(i1,1);
                                        }
                                    })
                                }
                            })
                        }
                        // 清空dom层
                        $this.parent(".item").remove();
                        _bindingDeleteImg();
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                        _bindingDeleteImg();
                    }
                });
            } else {
                // 清空dom层
                $this.parent(".item").remove();
                _bindingDeleteImg();
            }
        }
    }

    // 获取自定义模块 表单数据 处理成参数
    function getCustomFormData(v) {
        var data = [];
        data[0] = v;
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
        data[0].imgs = imgs;
        return buildParams(data, pageObj);
    }

    /**************************************************** 全局操作 *****************************************************/
    // 全局保存监听
    function _onOverallSave() {
        _bindingSave();
        function _bindingSave() {
            $("#onSubmit").on("click", function() {
                if(!$("#content").is(":hidden")) {
                    _onSave();
                } else {
                    tipBox.init("fail", "当前页面无保存项", 1500);
                }
            })
        }

        function _onSave() {
            var strCode = $("[id^='page_']").attr("id").split("_").pop();
            $("#onSubmit").off("click");
            var params = "";
            switch (strCode) {
                case "basic":  // 基本信息页面
                    var data = $("#basicForm").serializeArray()
                    if(imgUrl) {
                        data.push({"name" : "img", "value" : imgUrl}); // 构建图片参数
                    }
                    params = buildParams(data, pageObj);
                    break;
                case "contact":  // 联系方式页面
                    var data = $("#contactForm").serializeArray();
                    data.push({"name" : "live", "value" : addressCode.toString()}); // 构建三级联动参数
                    params = buildParams(data, pageObj);
                    break;
                case "vocation":  // 职业信息页面
                    var data = $("#vocationForm").serializeArray();
                    params = buildParams(data, pageObj);
                    break;
                case "master":  // 师徒关系页面
                    var data = $("#masterForm").serializeArray();
                    params = buildParams(data, pageObj);
                    break;
                case "resume": // 传承人内容
                    var $textarea = $("textarea[id^='resum_']");
                    params = _getResumeFormData($textarea);
                    break;
                case "custom": // 自定义模块
                    var p = {name: "customContent", value: $("#customContent").val(), coustomName: $("#customName").val()};
                    var fag = true;
                    if(p.coustomName.length < 1 || p.coustomName.length >10) {
                        msg = "自定义名称在1-10字符之间";
                        $("#customName_err").html("<i></i>" + msg).show();
                        fag = false;
                    } else {
                        $("#customName_err").html("").hide();
                    }
                    if(p.value == "") {
                        msg = "请填写自定义内容";
                        $("#customContent_err").html("<i></i>" + msg).show();
                        fag = false;
                    } else {
                        $("#customName_err").html("").hide();
                    }
                    if(fag) {
                        params = getCustomFormData(p);
                    }
                    break;
                default:
                    break;
            }
            if(params != "") {
                _onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    //console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data);
                        if(strCode == "custom") {
                            _generateMenu(result.res.data);
                        }
                        tipBox.init("success", "保存成功", 1500);
                        _onOverallSave();
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg, 1500);
                        }
                        _onOverallSave();
                    }
                });
            } else {
                _onOverallSave();
            }

            // 自定义生成菜单
            function _generateMenu(data) {
                console.log("data -- >", data);
                var id = $("#menus_custom").children(".dt").attr("id");
                // 添加自定义菜单项目
                var arrLi = $("#" + id).next(".dd").children("ul").children("li:last-child");
                var mid = "menutwo_" + $("#" + id).attr("id").split("_").pop() + "_";
                if(arrLi.length > 0) {
                    //console.log(arrLi.attr("id").split("_").pop())
                    mid += parseInt(arrLi.attr("id").split("_").pop()) + 1;
                } else {
                    mid += "0";
                }
                //console.log("mid --- >", mid);
                $("#" + id).next(".dd").children("ul").append(Handlebars.compile(menuTpl)({mid: mid, name: $("#customName").val(), menuId: data.contentFragmentList[0].attributeId}));
                $("#" + mid).children("i").addClass("selected").removeClass("unselected");
            }
        }
    }

    // 预览
    function _onOveraPreview() {
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
                _onRequest("POST", "/ichMaster/preview", {params: targetId}).then(function(result) {
                    //console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        window.open(result.res.data.replace('./',''));
                        _bindingSave();
                    } else {
                        _bindingSave();
                    }
                });
            } else {
                tipBox.init("fail", "请填写基本信息后预览", 1500);
                _bindingSave();
            }
        }
    }

    // 全局提交监听
    function _onOveraSubmit() {
        // 防止用户多次提交
        _bindingSave();
        function _bindingSave() {
            $("a[id^='onSend_']").on("click", function() {
                _onSave($(this));
            })
        }
        function _onSave($this) {
            var status = $this.hasClass("empty");

            if(status) {
                _fu();
            } else {
                $this.attr("data-status")? _fu() : tipBox.init("fail", "请填写基本数据后提交", 1500);
            }

            function _fu() {
                $("a[id^='onSend_']").off("click"); //解绑点击事件
                pageObj.status = 3; // 状态修改为提交状态
                _onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(pageObj) }).then(function(result) {
                    //console.log("result === >", result,  JSON.stringify(result.res.data),  "----pageObj ---", pageObj);
                    // 处理用户未登录
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        if(userType != null && userType == 3) {
                            window.location.href = "organization/organization.html"; // 跳转到机构
                        } else {
                            window.location.href = "ichMasterOver.html"; // 跳转成功页面
                        }
                        _bindingSave(); // 重新绑定
                    } else {
                        tipBox.init("fail", result.res.msg, 1500);
                        _bindingSave(); // 重新绑定
                    }
                });
           }
        }
    }

    // 添加自定义项
    function _addCustom() {
        $("#add_custom").on("click", function() {
            var id = $("#menus_custom").children(".dt").attr("id");
            $('#' + id).trigger("click"); // 模拟点击添加自定义
        })
    }

    /************************************************************* 通用封装函数 ***************************************************/

    /**
     * 自动判断预览、提交是否可以操作
     * @private
     */
    // 预览, 提交按钮更新可点击状态
    function _isSureSumit($this) {
        var status = $this.children("i").hasClass("selected");
        if(status) {
            $("#onSend_top").addClass("empty").removeClass("disabled"); // 更新提交按钮状态为可提交
            $("#preview").addClass("empty").removeClass("disabled"); // 更新预览按钮状态为可提交
        }
    }


    /**
     * 下一步 跳转下一页
     * @param id
     * @param nextIds
     * @private
     */
    function _onNextPage(id, nextIds, resData) {
        new Promise(function(resolv, reject) {
            try{
                if(resData.contentFragmentList.length > 0) {
                    var num = 0;
                    $.each(resData.contentFragmentList,function(i, v) {
                        if(v.content != "" || v.resourceList.length > 0) {
                            num++;
                        }
                    })

                    if(num > 0) {
                        $("#" + id).removeClass("selected").children("i").addClass("selected").removeClass("unselected").removeClass("unselected2"); // 添加已完成效果
                    } else {
                        $("#" + id).removeClass("selected").children("i").addClass("unselected2").removeClass("unselected"); // 添加已完成效果
                    }
                } else {
                    $("#" + id).removeClass("selected").children("i").addClass("unselected2").removeClass("unselected"); // 添加已完成效果
                }
                resolv();
            } catch(e) {
                reject({err: e});
            }
        }).then(function(res) {
                if(nextIds.length > 0) {
                    $.each(nextIds, function(i, v) {
                        // 判断向下是否还有匹配的节点 有则模拟点击  没有则提示是否添加自定义项页面
                        if($('#' + v).length > 0) {
                            $('#' + v).trigger("click"); // 模拟点击传承人内容
                        } else {
                            var i = v.split("_").pop();
                            var num = v.replace(i, (parseInt(i) -1));
                            $("#" + num).parent().parent().siblings().children("i").addClass("selected").removeClass("unselected");
                            _changePage(true);
                        }
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
     * 构建请求参数
     * @param data
     * @param updateData
     * @returns {{contentFragmentList: *, isMaster: Number, lang: string, status: number, id: string}}
     */
    function buildParams(data, pageObj) {
        console.log("data -- >", data);
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
            if(i == data.length) {
                return;
            }
            console.log("  --- >", i, v, data.length);
            v.attributeId = $("#" + v.name).attr("data-id") ? $("#" + v.name).attr("data-id") : 0 ;
            v.content = v.content? v.content: v.value;
            v.status = 0;
            v.targetType = 1;
            v.targetId = targetId? targetId : "";
            v.resourceList = v.imgs ? v.imgs : [];

            // 自定义
            if(v.hasOwnProperty("coustomName") ) {
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

            if(v.name == "basic_18" && v.content != "") {
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
                        if(d.resourceList.length > 0) {
                            $.each(v.resourceList, function(r, va) {
                                if(d.resourceList[r]) {
                                    va.id = d.resourceList[r].id;
                                }
                            })
                        }
                        //delete params.status; // 修改的时候不填写status
                        return;
                    }
                })
            }
        })
        params.contentFragmentList =data;
        return params;
    }

    var defaults = {
        // 正则
        reg_email: /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i, //验证邮箱
        reg_num: /^\d+$/,         //验证数字
        reg_chinese: /^[\u4E00-\u9FA5]+$/,     //验证中文
        reg_english: /^[A-Za-z\s]*[A-Za-z]$/, // 验证英文
        reg_pinyin: /^[A-Za-z\s]*[A-Za-z]$/, // 验证拼音
        reg_mobile: /^1[3458]{1}[0-9]{9}$/,    //验证手机
        reg_idcard: /^\d{14}\d{3}?\w$/,     //验证身份证
        reg_passport: /^[a-zA-Z]{5,17}$/, // 护照格式验证
        reg_passport1: /^[a-zA-Z0-9]{5,17}$/, // 护照格式验证1
        reg_zipcode: /^[1-9][0-9]{5}$/, // 邮编
        reg_length: "/^.{min,max}$\/",
        reg_minLengh: "/^\w{min,}$/",

        tips_sucess :"", // 验证成功时候的提示语，默认是空
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
    };

    // 验证
    function _onChk (obj, reg, reg2, isNull, maxlength, minlength) {
        var errId = obj.name + "_err";
        // 是否为空
        if(isNull) {
            if(!obj.value && obj) {
                $("#" + errId).html("<i></i>" +defaults["tips_required"]).show(); // 显示提示语
                return false;
            }
        }  else {
            $("#" + errId).hide();
        }

        // 验证正则 用户输入值了就验证正则
        if(obj && obj.value != "") {
            if(reg2 != "") {
                if(defaults[reg].test(obj.value) || defaults[reg2].test(obj.value)) {
                    $("#" + errId).hide();
                    return true;
                } else {
                    $("#" + errId).html("<i></i>" +defaults["tips" + reg.substr(reg.indexOf("_"), reg.length)]).show(); // 显示提示语
                    return false;
                }
            } else if(reg != ""){
                if(!defaults[reg].test(obj.value)) {
                    $("#" + errId).html("<i></i>" +defaults["tips" + reg.substr(reg.indexOf("_"), reg.length)]).show(); // 显示提示语
                    return false;
                } else {
                    $("#" + errId).hide();
                }
            }
        }

        // 验证长度
        if(maxlength && minlength) {
            if(obj.value > parseInt(maxlength) && obj.value < parseInt(minlength)) {
                $("#" + errId).html("<i></i>请输入(" + minlength + "-" + maxlength + "字)").show(); // 显示提示语
                return false;
            }
        } else if(maxlength) {
            if(obj.value > parseInt(maxlength)) {
                $("#" + errId).html("<i></i>请最多输入(" + maxlength + "字)").show(); // 显示提示语
                return false;
            }
        } else if(minlength) {
            if(obj.value < parseInt(minlength)) {
                $("#" + errId).html("<i></i>请最少输入(" + maxlength + "字)").show(); // 显示提示语
                return false;
            }
        } else {
            $("#" + errId).hide();
        }
        return true;
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
        //console.log("pageObj --- >", pageObj)
    }

    /**
     * 请求
     * @param mode  请求方式
     * @param url   请求地址
     * @param params    参数
     * @returns {Promise}
     */
    function _onRequest(mode, url, params) {
        return new Promise(function (resolve, reject) {
            //
            //
            //// 统一处理 ajax获取数据code != 0的自定义异常
            //$(document).ajaxSuccess(function(e, x, o){
            //    // o为ajax请求本身 x.responseJSON是返回结果
            //    console.log("e --- >", e);
            //    console.log("x --- >", x);
            //    console.log("o --- >", o);
            //
            //    if(x.responseJSON.code != 0) {
            //        console.log("登录")
            //    }
            //});
            //
            //// 设置AJAX的全局默认选项
            //$.ajaxSetup({
            //    async: false,
            //    dataType: "json",
            //    error: function (xhr, status, e) {
            //        console.log(xhr, status, e)
            //    },
            //});

            $.ajax({
                type: mode,
                url: url,
                data: params, // {params: JSON.stringify(params)}
                error: function (err) {
                    reject(err)
                },
                success: function (res) {
                    if(res.code == 0) {
                        resolve({res: res })
                    } else {
                        resolve({res: res ? res : null})
                    }
                },
            });
        })
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
        init: _init,
        closeWindow: _closeWindow
    }
})