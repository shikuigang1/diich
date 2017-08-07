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
    console.log("pageObj --- >", pageObj);
    // 菜单ID管理对象
    var menu_0 = "menu_0"; // 一级菜单 基础信息菜单MOD ID
    var menu_00 = "menu_00"; // 二级菜单 基本信息菜单MOD ID
    var menu_01 = "menu_01"; // 二级菜单 联系方式菜单MOD ID
    var menu_02 = "menu_02"; // 二级菜单 职业信息菜单MOD ID
    var menu_1 = "menu_1"; // 一级菜单 传承人内容MOD ID
    var menu_10 = "menu_10"; // 二级菜单 简历菜单MOD ID
    var menu_11 = "menu_11"; // 二级菜单 传承历史与现状菜单MOD ID
    var menu_12 = "menu_12"; // 二级菜单 师徒关系菜单MOD ID
    var menu_13 = "menu_13"; // 二级菜单 技能菜单MOD ID
    var menu_14 = "menu_14"; // 二级菜单 个人成就菜单MOD ID
    var menu_15 = "menu_15"; // 二级菜单 传承谱系菜单MOD ID
    var menu_16 = "menu_16"; // 二级菜单 获奖情况菜单MOD ID
    var menu_17 = "menu_17"; // 二级菜单 知识产权菜单MOD ID
    var menu_2 = "menu_2"; // 自定义菜单项
    // 页面填写项ID 集中管理对象
    var arrObj = {
        // 基础信息 一级菜单
        menu_0: {
            menu_00: [10, 13, 14, 15, 49, 17, 18, 127, 128], // 基本信息 attributeId
            menu_01: [58, 59, 55, 54, 56], // 联系方式 attributeId
            menu_02: [24] // 职业信息 attributeId
        },

        // 传承人内容 一级菜单
        menu_1: {
            menu_10: [51], // 简历 attributeId
            menu_11: [119], // 传承历史与现状 attributeId
            menu_12: [125], // 师徒 attributeId
            menu_13: [115], // 技能 attributeId
            menu_14: [110], // 个人成就 attributeId
            menu_15: [21], // 传承谱系 attributeId
            menu_16: [129], // 个人成就 attributeId
            menu_17: [131], // 知识产权 attributeId
        }

    }
    // 页面构建参数所需参数数据
    var mid = getQueryString("mid");
    var ichProjectId = getQueryString("ichProjectId");
    var targetId = pageObj.hasOwnProperty("contentFragmentList") ? pageObj.id : ""; // 传承人ID 用于判断是否是一个人申请的
    var isMaster = "0";// 是否为自己申报传承人 0否 1是 默认 否
    if(pageObj.hasOwnProperty("contentFragmentList")) {
        pageObj.isMaster = pageObj.userId ? 1 : 0;
        isMaster = isMaster;
    }
    var ossPash = "http://diich-resource.oss-cn-beijing.aliyuncs.com/image/master/"; // oss图片地址存放地址
    var imgUrl = ""; // 基础信息模板图片url
    var addressCode = ""; // 联系方式信息模板居住地址code值
    var saveSuccessText = "保存成功";

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
                for(var i = 0; i < arr.length; i++) {
                    var rules = arr[i].split("_");
                    // 调用验证方法
                    if(!check($(this), rules[0], $(this).val(), rules[1], rules[2])) {
                        status = false; // 有一个为false的 表单都不可以提交
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
        reg_chinese: /^[\u4E00-\u9FA5]+$/,     //验证中文
        reg_english: /^([a-zA-Z ]+|[\u4e00-\u9fa5]+)$/, // 验证英文
        reg_pinyin: /^([a-zA-Z ]+|[\u4e00-\u9fa5]+)$/, // 验证拼音
        reg_mobile: /^1[3458]{1}[0-9]{9}$/,    //验证手机
        reg_idcard: /^\d{14}\d{3}?\w$/,     //验证身份证
        reg_passport: /^[a-zA-Z]{5,17}$/, // 护照格式验证
        reg_passport1: /^[a-zA-Z0-9]{5,17}$/, // 护照格式验证1
        reg_zipcode: /^[1-9][0-9]{5}$/,
        reg_length: "/^.{min,max}$\/",
        reg_minLengh: "/^\w{min,}$/"
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
            case 'length' :
                var regular = defaults.reg_length.replace("min", minLength).replace("max", maxLength);
                return chk(_val, eval(regular)) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_length.replace("min", minLength).replace("max", maxLength), false);
            default:
                // 验证长度
                return true;
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
     * 处理化数据
     * @param dicArrCity
     */
    function init(dicArrCity) {
        // 获取浏览器url参数mid ichProjectId
        if(mid != null) {
            onRequest("GET", "/ichMaster/getIchMasterById", {params:mid}).then(function(result) {
                console.log(result)
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
                pageObj.isMaster = pageObj.userId ? 1 : 0;
                isMaster = isMaster;
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
        menusOne(); // 一级菜单监听
        menusTwo(dicArrCity); // 二级菜单监听
        _onWholeSave(); // 全局保存操作
        _onSubmit(); // 全局提交操作
        _onYesMenu(); // 初始化验证哪些填写项已完成
        buildCustom(); // 初始化构建自定义菜单项
        _onPreview(); // 预览
    }

    /**
     * 预览
     * @private
     */
    function _onPreview() {
        $("#preview").on("click", function() {
            tipBox.init("fail", "此功能暂未开通", 1500);
        })
    }

    /**
     *  全局提交操作
     * @private
     */
    function _onSubmit() {
        // 防止用户多次提交
        _bindingSave();
        function _bindingSave() {
            $("#onSend").on("click", function() {
                _onSave($(this));
            })
        }
        function _onSave($this) {
            if($("#onSend").hasClass("empty")) {
                $("#onSend").off("click"); // 解绑点击事件
                // 可以提交
                pageObj.status = 3; // 状态修改为提交状态
                var params = pageObj;
                params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params) }).then(function(result) {
                    console.log("result === >", result,  JSON.stringify(result.res.data));
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
            } else {
                _bindingSave(); // 重新绑定
                tipBox.init("fail", "当前不可以提交", 1500);
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
                var type = "00"; // 默认是基本信息模板页面
                $("li[id^='menu_']").each(function() {
                    if($(this).hasClass("selected")) {
                        type = $(this).attr("id").split("_").pop();
                        return;
                    }
                })

                // 根据不同的停留页面构建不同的参数
                var params = "";
                switch (type) {
                    case "00":
                        // 基本信息模板
                        params = getBasicFormData();
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        console.log("params --- >", params);
                        break;
                    case "01":
                        // 联系方式模板
                        params = getContactFormData();
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        console.log("params --- >", params);
                        break;
                    case "02":
                        // 职业信息模板
                        params = getVocationFormData();
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        console.log("params --- >", params);
                        break;
                    case "10":
                        // 简历
                        params = getResumeFormData("jl");
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        console.log("params --- >", params);
                        break;
                    case "11":
                        // 传承历史与现状
                        params = getResumeFormData("lsxz");
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "12":
                        // 师徒关系
                        params = getMasterFormData();
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "13":
                        // 技能
                        params = getResumeFormData("jn");
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "14":
                        // 个人成就
                        params = getResumeFormData("cj");
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "15":
                        // 传承谱系
                        params = getResumeFormData("ch");
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "16":
                        // 获奖情况
                        params = getResumeFormData("hjqk");
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    case "17":
                        // 知识产权
                        params = getResumeFormData("zscq");
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                        break;
                    default:
                        // 自定义项
                        params = getResumeFormData("menuData");
                        params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                }

                // 如果页面无任何已填写项， 则直接提示保存成功， 有填写项则存库
                if(params.contentFragmentList.length > 0) {
                    onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                        console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                        if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                            targetId = result.res.data.id;
                            _onMergeObj(result.res.data);
                            tipBox.init("success", saveSuccessText, 1500);
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
                    tipBox.init("success", saveSuccessText, 1500);
                    _bindingSave();
                }
            } else {
                tipBox.init("fail", "当前页面不可保存", 1500);
                _bindingSave();
            }
        }
    }

    /**
     *  初始化构建自定义菜单项
     * @private
     */
    function buildCustom() {
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            var attributeIds = [];
            // 合并页面填写项ID
            for(var tem in arrObj) {
                for(var key in arrObj[tem]) {
                    attributeIds = attributeIds.concat(arrObj[tem][key]);// 合并数组
                }
            }

            // 过滤出自定义项， pageObj中不等于 attributeIds 数组中的就是自定义项
            $.each(pageObj.contentFragmentList, function(i, v) {
                var code = $.inArray(parseInt(v.attributeId), attributeIds);
                if(code < 0) {
                    // 生成自定义项菜单

                    var $ul = $("#" + menu_2).next(".dd").children("ul");
                    var menuNum = $ul.children("li").length;
                    var id = menu_2 + menuNum.toString();
                    var menuHtml = Handlebars.compile(menuTpl)({"id" : id, "name": v.attribute.cnName, "menuId" : v.attributeId});
                    $ul.append(menuHtml);
                    $("#" + menu_2 + menuNum.toString()).children(i).addClass("selected").removeClass("unselected"); // 因为自定义项添加时的限制，已确保添加后的是已完成的
                }
            })
        }
    }

    /**
     * 处理菜单回显是否被选中
     * @private
     */
    function _onYesMenu() {
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
                if(num == arrObj[tem][key].length) {
                    $("#" + key).children("i").addClass("selected").removeClass("unselected");
                }
            }
            // 判断一级菜单是否全被填写
            var n = 0;
            $("#" + tem).next(".dd").children("ul").children("li").each(function() {
                if($(this).children("i").hasClass("selected")) {
                    n++;
                }
            })
            // 一级菜单 添加页面选中效果 计数n == js对象属性个数即添加填写完毕效果
            if(n ==  Object.getOwnPropertyNames(arrObj[tem]).length) {
                $("#" + tem).children("i").addClass("selected");
            }
            _onSubmitMenu(); // 验证页面所有填写项是否完成， 完成提交按钮修改为可提交状态
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
                    console.log("检查出来的重复的对象", v);
                    res.fag = false;
                    res.index = i; // 重复数据在pageObj.contentFragmentList中重复的
                    return;
                }
            })
            return res;
        }
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
            //"status": 2,
            "id": targetId ? targetId : "",

        }

        if(ichProjectId) {
            params.ichProjectId = ichProjectId;
        }

        $.each(data, function(i, v) {
            console.log("  --- >", i, v);
            v.attributeId = $("#" + v.name).attr("data-id") ? $("#" + v.name).attr("data-id") : 0 ;
            v.content = v.value;
            v.status = 0;
            v.targetType = 1;
            v.targetId = targetId? targetId : "";
            v.resourceList = v.imgs ? v.imgs : [];

            // 自定义
            if(v.attributeId == 0) {
                v.attribute = {
                    "cnName": v.coustomName,
                    "dataType": 5,
                }
                delete v.coustomName;
            }

            if(v.name == "img") {
                v.content = "";
                v.resourceList = [{uri: v.value}]; // 基本信息中只有一张图片
            }

            if(v.name == "birthday") {
                v.content = new Date(parseInt(1501430400 * 1000)).format('yyyy/MM/dd');
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
                        //delete params.status; // 修改的时候不填写status
                        return;
                    }
                })
            }
        })
        params.contentFragmentList =data;
        return params;
    }

    /**
     * 自定义项模板
     */
    function getCustom(id) {
        // 更新DOM元素
        var resumenHtml = Handlebars.compile(customTpl)();
        $("#content").html(resumenHtml);
        inheritorPage.radioImage(); // 加载上传视频， 上传图片

        _bindingSave();
        function _bindingSave() {
            $("#next").on("click", function() {
                _onSave($(this));
            })
        }

        function _onSave($this) {
            $this.off("click");
            var fag = true;
            var name = $("#customName").val()
            var content = $("#customContent").val();
            // 验证
            if(!name) {
                $("#customName_err").html("<i></i>请填写自定义名称").show();
                fag = false;
            } else if (name.length > 9) {
                $("#customName_err").html("<i></i>自定义名称最多可输入9个字").show();
                fag = false;
            }

            if(!content) {
                $("#customContent_err").html("<i></i>请填写自定义内容，请填写").show();
                fag = false;
            }

            if(fag) {
                var imgs = [];
                $("#images").children("div .item").each(function(i, v) {
                    var img = {};
                    var uri = $(this).children("img").attr("src")
                    img["uri"] = uri.substr(uri.lastIndexOf("/") + 1, uri.length);
                    img["description"] = $(this).children("input").val();
                    img["type"] = 0;
                    img["status"] = 0;
                    imgs.push(img);
                })

                // 构建参数
                var data = [];
                data[0] = {"name": "custom", "value": content, imgs: imgs, coustomName: name};
                var params = buildParams(data, pageObj);
                console.log("params --- >", params)
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data);
                        // 添加自定义菜单
                        var $ul = $("#" + menu_2).next(".dd").children("ul");
                        var menuNum = $ul.children("li").length;
                        var id = menu_2 + menuNum.toString();
                        var menuHtml = Handlebars.compile(menuTpl)({"id" : id, "name": name, "menuId" : result.res.data.contentFragmentList[0].attributeId});
                        $ul.append(menuHtml);
                        //$("#" + menu_2).trigger("click");
                        $("#" + menu_2 + menuNum.toString()).children("i").addClass("selected").removeClass("unselected");
                        $("#" + menu_2 + menuNum.toString()).trigger("click");
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
     * 通用模板 简历、传承历史与现状、技能、个人成就、传承谱系、获奖情况、知识产权
     * @param id 页面菜单项ID
     * @param title 模板页面title名称
     * @param dataId 相关填写项对应数据库ID
     * @param name 用于生成模板中id name属性
     * @param nextId 跳转到下一个页面id
     */
    function getResume(id, title, menuId, name, nextId, minLength) {
        var resume = {title: title, name: name ? name : "menuData", menuId: menuId, startPath: ossPash, pageObj: pageObj};
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
            fag = content ? showMsg($("#jj"), defaults.tips_success, true) : showMsg($("#jj"), defaults.tips_required, false);
            if(content.length < 50) {
                showMsg($("#" + name), defaults.tips_minLength.replace("min", minLength), false);
                fag = false;
            }
            //var regular = defaults.reg_minLengh.replace("min", minLength);
            //fag = chk(content, eval(regular)) ? showMsg($("#" + name), defaults.tips_success, true) : showMsg($("#" + name), defaults.tips_minLength.replace("min", minLength), false);
            //if(minLength) {
            //    // reg_minLengh
            //    //var regular = defaults.reg_length.replace("min", minLength).replace("max", maxLength);
            //    //fag = chk(jconten, eval(regular)) ? showMsg($("#jj"), defaults.tips_success, true) : showMsg($("#jj"), defaults.tips_length.replace("min", minLength).replace("max", maxLength), false);
            //    var regular = defaults.reg_minLengh.replace("min", minLength);
            //    fag = chk(content, eval(regular)) ? showMsg($("#" + name), defaults.tips_success, true) : showMsg($("#" + name), defaults.tips_minLength.replace("min", minLength), false);
            //}

            if(fag) {
                var params = getResumeFormData(resume.name);
                //params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data);
                        // 跳转到下一页面
                        _onNextPage(id, nextId);
                        _onSubmitMenu();
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
            var dataId = $this.attr("id").split("_").pop();
            var modId = $this.attr("id").split("_")[1];
            // 清空DOM层数据
            $("#" + modId).val("");
            $("#images").children("div .item").each(function() {
                $(this).remove();
            })
            console.log("id --- >", dataId, modId);

            if(dataId) {
                // 删除数据库中数据
                onRequest("POST", "/contentFragment/deleteContentFragment", {params: dataId}).then(function(result) {
                    console.log("result --- >", result)
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        _bindingDelete();
                    } else {
                        if(result.res.code != 3) {
                            tipBox.init("fail", result.res.msg , 1500);
                        }
                        _bindingDelete();
                    }
                })
            }
        }

        // 跳过此项
        $("#skip").on("click", function() {
            var num = parseInt(id.split("_").pop()) + 1;
            var str = id.split("_")[0];
            $('#' + str + "_" + num).trigger("click");
        })
    }

    /**
     * 基本信息 - 基本信息模板
     * @param id
     * @param dicArrCity
     */
    function getBasic(dicArrCity) {
        $("#content").html(Handlebars.compile(basicTpl)({countrys: dicArrCity, pageObj: pageObj, ichProjectId: ichProjectId})); // 更新页面模板
        // 上传图片
        upload.submit($('.horizontal .group .control .file_up'),1,'/user/uploadFile?type=master',function (res) {
            console.log("res -- >", res);
            imgUrl = res.data[0].substr((res.data[0].lastIndexOf ("/")+1), res.data[0].length);
            $('.preview').attr('src', res.data[0]).show();
            $('._token').val($('meta[name=token]').attr('content'));
        });

        if(pageObj.hasOwnProperty("contentFragmentList")) {
            // 回显图片
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attributeId == 10) {
                    $(".preview").attr("src", ossPash + v.resourceList[0].uri.toString()).show();
                    $(".file_up").addClass("active");
                    imgUrl = v.resourceList[0].uri.toString();
                }
            })
        }
        //时间
        $("#birthday").ECalendar({type:"date", skin:2, offset:[0,2]});
        // 监听是否为自己申报传承人 选项
        $("span[name^='isApply_']").on("click", function() {
            $("span[name^='isApply_']").each(function() {
                $(this).removeClass("active");
            })
            $(this).addClass("active");
            isMaster = $(this).attr("name").split("_").pop();
        })
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
            if(validate() && imgUrl != "" && isMaster != "") {
                var params = getBasicFormData(); // 获取表单数据 构建参数
                params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                console.log("params -- >", params);
                //// 发送请求
                //onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                //    console.log("result === >", result,  JSON.stringify(result.res.data));
                //    // 处理用户未登录
                //    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                //        targetId = result.res.data.id;
                //        _onMergeObj(result.res.data);
                //        // 跳转到下一页面
                //        _onNextPage(menu_00, [menu_01]);
                //        _onSubmitMenu();
                //        _bindingSave();
                //    } else {
                //        if(result.res.code != 3) {
                //            tipBox.init("fail", result.res.msg , 1500);
                //        }
                //        _bindingSave();
                //    }
                //});
            } else {
                imgUrl == "" ? $("#img_err").html("<i></i>请上传照片,若以上传请等待回显图片后点击 下一步/提交 操作").show() : "";
                isMaster == "" ? $("#isApply_err").html("<i></i>请选择是否为自己申报传承人").show() : "";
                _bindingSave();
            }
        }
    }

    /**
     * 基本信息 - 联系方式模板
     * @param id
     * @param dicArrCity
     */
    function getContact(id) {
        // 更新DOM元素
        $("#content").html(Handlebars.compile(contactTpl)({pageObj: pageObj}));
        var codeArra = []; // 记录地址
        selectArea.init(0,function (data, dataText) {
            codeArra = data[0].split(",");
            codeArra.splice((codeArra.length - 1), 1);
            addressCode = codeArra[(codeArra.length - 1)];
        })

        // 回显地址
        if(pageObj.hasOwnProperty("contentFragmentList")) {
            $.each(pageObj.contentFragmentList, function(i, v) {
                if(v.attributeId == 55) {
                    addressCode = v.content;
                }
            })
        }

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
                console.log("params -- >", params);
                // 发送请求
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("result ---- >", result, JSON.stringify(result.res.data));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data); // 保存成功存储服务器返回数据
                        // 跳转到下一页面
                        _onNextPage(id, [menu_02]);
                        _onSubmitMenu();
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
    function getVocation(id) {
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
            var jconten = $("#jj").val();
            var minLength = 50;
            var maxLength = 200;
            var fag = true;
            fag = jconten ? showMsg($("#jj"), defaults.tips_success, true) : showMsg($("#jj"), defaults.tips_required, false);
            var regular = defaults.reg_length.replace("min", minLength).replace("max", maxLength);
            fag = chk(jconten, eval(regular)) ? showMsg($("#jj"), defaults.tips_success, true) : showMsg($("#jj"), defaults.tips_length.replace("min", minLength).replace("max", maxLength), false);

            if(fag) {
                showMsg($("#jj"), defaults.tips_success, true);
                var params = getVocationFormData();
                // 过滤掉重复数据
                params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                console.log("params -- >", params);
                // 发送请求
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data); // 保存成功存储服务器返回数据
                        // 跳转到下一页面
                        _onNextPage(id, [menu_1, menu_10]);
                        _onSubmitMenu();
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
                params.contentFragmentList = _onFilterNull(params.contentFragmentList);
                console.log("params --- >", params);
                onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                    console.log("result ---- >", result, JSON.stringify(result.res.data));
                    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                        targetId = result.res.data.id;
                        _onMergeObj(result.res.data); // 保存成功存储服务器返回数据
                        _onNextPage(id, [menu_13]);
                        _onSubmitMenu();
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
     * 一级菜单选择项监听
     */
    function menusOne() {
        $("body").delegate(".dt", "click", function(){
            var $this = $(this);
            var type = $this.attr("id").split("_").pop();
            if(type != 0) {
                // 用户点击的是 基本信息之外的模块
                var idArray = $this.attr("id").split("_");
                var status = $("#" + idArray[0] + "_" + "0").children("i").hasClass("selected");
                console.log("status --- >", status);
                if(status) {
                    // 可以点击
                    _onEffect($this);
                    // 添加自定义项  加载模板
                    if(type == 2) {
                        $("#onSubmit").addClass("disabled").removeClass("active");// 修改当前按钮为不可点击
                        getCustom($this.attr("id").toString());
                    }
                } else {
                    // 不可以点击
                    tipBox.init("fail", "请先完成基本信息项填写" , 1500);
                }
                //_onEffect($this);
                //if(type == 2) {
                //    $("#onSubmit").addClass("disabled").removeClass("active");// 修改当前按钮为不可点击
                //    getCustom($this.attr("id").toString());
                //}
            } else {
                // 用户点击的是基本信息模块
                _onEffect($this);
            }

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
            var id = $(this).attr("id");
            var type =  id.split("_").pop();

            if(type != 00) {
                // 用户点击的是 2级基本信息菜单外的选项
                var idArray = $this.attr("id").split("_");
                var status = $("#" + idArray[0] + "_" + "00").children("i").hasClass("selected");
                console.log("status --- >", status);
                if(status) {
                    // 可以点击
                    _onEffect($this);
                } else {
                    // 不可以点击
                    tipBox.init("fail", "请先完成基本信息项填写" , 1500);
                }
                //_onEffect($this);
            } else {
                // 用户点击的是 2级基本信息菜单
                _onEffect($this);
            }

            // 样式模板切换
            function _onEffect($this) {
                // 被点击效果切换
                $("li[id^='menu_']").each(function(i, v) {
                    $(this).removeClass("selected");
                })
                $this.addClass("selected"); //添加被点击效果
                switch (type) {
                    case "00":
                        // 基本信息模板
                        getBasic(dicArrCity);
                        break;
                    case "01":
                        // 联系方式模板
                        getContact(id.toString());
                        break;
                    case "02":
                        // 职业信息模板
                        getVocation(id.toString());
                        break;
                    case "10":
                        // 简历
                        getResume(id, "简历", 51, "jl", [menu_11], 50);
                        break;
                    case "11":
                        // 传承历史与现状
                        getResume(id, "传承历史与现状", 119, "lsxz", [menu_12], 50);
                        break;
                    case "12":
                        // 师徒关系
                        getMaster(id);
                        break;
                    case "13":
                        // 技能
                        getResume(id, "技能", 115, "jn", [menu_14], 50);
                        break;
                    case "14":
                        // 个人成就
                        getResume(id, "个人成就", 110, "cj",  [menu_15], 50);
                        break;
                    case "15":
                        // 传承谱系
                        getResume(id, "传承谱系", 21, "ch",  [menu_16], 50);
                        break;
                    case "16":
                        // 获奖情况
                        getResume(id, "获奖情况", 129, "hjqk",  [menu_17], 50);
                        break;
                    case "17":
                        // 知识产权
                        getResume(id, "知识产权", 131, "zscq",  [], 50);
                        break;
                    default:
                        // 自定义项
                        var titile = $this.children("span").text();
                        var menuId = $this.attr("data-id");
                        getResume(id, titile, menuId);
                }
            }
        });
    }

    // 获取基本信息表单数据 处理成参数
    function getBasicFormData() {
        var data = $("#basicForm").serializeArray(); // 获取表单数据
        data.push({"name" : "img", "value" : imgUrl}); // 构建图片参数
        //$("#ichProjectId")
        return buildParams(data, pageObj); // 构建请求参数数据
    }

    // 获取联系方式表单数据 处理成参数
    function getContactFormData() {
        var data = $("#contactForm").serializeArray(); // 获取表单数据
        data.push({"name" : "live", "value" : addressCode}); // 构建三级联动参数
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
    function getResumeFormData(name) {
        var data = [];
        data[0] = {
            name :  $("#" + name).attr("name"),
            value : $("#" + name).val()
        }
        console.log("data --- >", data);
        var imgs = [];
        $("#images").children("div .item").each(function(i, v) {
            var img = {};
            var uri = $(this).children("img").attr("src")
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
    //function getCustomFormData() {
    //    var name = $("#customName").val()
    //    var content = $("#customContent").val();
    //    var imgs = [];
    //    $("#images").children("div .item").each(function(i, v) {
    //        var img = {};
    //        var uri = $(this).children("img").attr("src")
    //        img["uri"] = uri.substr(uri.lastIndexOf("/") + 1, uri.length);
    //        img["description"] = $(this).children("input").val();
    //        img["type"] = 0;
    //        img["status"] = 0;
    //        imgs.push(img);
    //    })
    //
    //    // 构建参数
    //    var data = [];
    //    data[0] = {"name": "custom", "value": content, imgs: imgs, coustomName: name};
    //    return buildParams(data);
    //}

    /**
     *  判断基本信息 填写项是否填写完成
     *      true 完成则显示基本信息填写完成
     *      false 没完成则不显示
     * @private
     */
    function _onSubmitMenu() {
        var fag = true; // 默认全部填写完成
        $("#" + menu_0).siblings(".dd").children("ul").children("li").each(function(i, v) {
            // 判断有一个没有填写完的都不可以
            if(!$(this).children("i").hasClass("selected")) {
                fag = false;
                return;
            }
        })

        if(fag) {
            $("#" + menu_0).children("i").addClass("selected");
        }

        var fag1 = true; // 默认全部填写完成
        $("#" + menu_1).siblings(".dd").children("ul").children("li").each(function(i, v) {
            if(!$(this).children("i").hasClass("selected")) {
                fag1 = false;
                return;
            }
        })

        if(fag1) {
            $("#" + menu_1).children("i").addClass("selected");
        }

        // 查看页面中所有的选项是否都填写通过了 通过了则可以提交
        if(fag && fag1) {
            //console.log("可以提交", fag, fag1);
            $("#onSend").addClass("empty").removeClass("disabled"); // 更新提交按钮状态为可提交
        }
    }

    /**
     * 下一步 跳转下一页
     * @param id
     * @param nextIds
     * @private
     */
    function _onNextPage(id, nextIds) {
        new Promise(function(resolv, reject) {
            try{
                $("#" + id).removeClass("selected").children("i").addClass("selected").removeClass("unselected"); // 添加已完成效果
                resolv();
            } catch(e) {
                reject({err: e});
            }
        }).then(function(res) {
                $.each(nextIds, function(i, v) {
                    $('#' + v).trigger("click"); // 模拟点击传承人内容
                })
            })
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
