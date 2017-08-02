/**
 * 我要申报-传承人模块管理器
 * menuTpl : 左侧菜单模板
 * basicTpl : 基本信息模板
 * contactTpl ：联系方式模板
 * vocationTpl : 职业信息模板
 * resumeTpl: 简历模板 传承历史与现状模板 记忆特征模板  个人成就模板 统一调用resumeTpl
 * masterTpl
 */
define(["text!ichMasterForm/menu.tpl", "text!ichMasterForm/basic.tpl",
    "text!ichMasterForm/contact.tpl", "text!ichMasterForm/vocation.tpl",
    "text!ichMasterForm/resume.tpl", "text!ichMasterForm/master.tpl"], function(menuTpl, basicTpl, contactTpl, vocationTpl, resumeTpl, masterTpl) {


    var basicObj = {"contentFragmentList":[{"attribute":null,"attributeId":"13","content":"张天赐","id":"892204434849828864","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"14","content":"zhangChina","id":"892204435051155456","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"15","content":"zhangPinYin","id":"892204435273453568","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"49","content":"CHN","id":"892204435499945984","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"17","content":"汉","id":"892204435718049792","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"18","content":"2017/07/31","id":"892204435923570688","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"127","content":"0","id":"892204436162646016","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"128","content":"230702198909021410","id":"892204436384944128","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"10","content":"","id":"892204436598853632","resourceList":[{"description":"","id":"892204436691128320","resOrder":null,"status":"0","type":"0","uri":"150155305316320151023153449 (1).jpg"}],"status":"0","targetId":"892204434384261120","targetType":"1"}],"editRank":null,"ichProject":null,"ichProjectId":null,"id":"892204434384261120","isMaster":"0","json":"","jsonAll":"","jsonHead":"","lang":"chi","lastEditDate":null,"lastEditorId":"1","status":"2","uri":"892204434384261120.html","userId":null,"worksList":[]};
    console.log(" --- >", basicObj)
    var contactObj = {"contentFragmentList":[{"attribute":null,"attributeId":"58","content":"18612057290","id":"892218910567354368","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"59","content":"chinazhangtianci@163.com","id":"892218910839984128","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"54","content":"凯撒看卡萨","id":"892218911108419584","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"56","content":"100100","id":"892218911339106304","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"55","content":"120102","id":"892218911573987328","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"}],"editRank":null,"ichProject":null,"ichProjectId":null,"id":"892204434384261120","isMaster":"1","json":"","jsonAll":"","jsonHead":"","lang":"chi","lastEditDate":null,"lastEditorId":"1","status":"2","uri":"892204434384261120.html","userId":"1","worksList":[]}; // 联系方式模板缓存对象
    console.log(" --- >", contactObj)
    var vocationObj = {"contentFragmentList":[{"attribute":null,"attributeId":"47","content":"sadsaa","id":"892229844073500672","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"48","content":"分公司的","id":"892229844274827264","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"50","content":"人多","id":"892229844476153856","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"},{"attribute":null,"attributeId":"24","content":"asdasd","id":"892229844677480448","resourceList":[],"status":"0","targetId":"892204434384261120","targetType":"1"}],"editRank":null,"ichProject":null,"ichProjectId":null,"id":"892204434384261120","isMaster":"1","json":"","jsonAll":"","jsonHead":"","lang":"chi","lastEditDate":null,"lastEditorId":"1","status":"2","uri":"892204434384261120.html","userId":"1","worksList":[]};
    console.log(" --- >", vocationObj);
    var masterObj = {}; // 师徒信息模板缓存对象
    var resumeObj = {}; // 简历信息模板缓存对象
    var historyObj = {}; // 传承历史与现状缓存对象
    var skillObj = {}; // 技能缓存对象
    var achieveObj = {}; // 成就缓存对象
    var inheritObj = {}; // 传承谱系缓存对象
    var rewardObj = {}; // 获奖情况缓存对象
    var loreObj = {}; // 支持产权缓存对象

    var targetId = "892204434384261120"; // 传承人ID 用于判断是否是一个人申请的
    var isMaster = "0"; // 是否为自己申报传承人 0否 1是 默认 否
    var ossPash = "http://diich-resource.oss-cn-beijing.aliyuncs.com/image/master/"; // oss图片地址存放地址
    var addressText = ""; // 存储用户选取的地址
    // 初始化数据
    function init(dicArrCity) {

        // 初始化右侧内容栏目为基本信息模块
        getBasic("menu_00", dicArrCity);

        // 一级菜单选择效果动作
        menusOne();

        // 二级菜单选择效果动作
        menusTwo(dicArrCity);
    }

    /**
     * 一级菜单选择项监听
     */
    function menusOne() {
        $("body").delegate(".dt", "click", function(){
            // 被点击效果切换
            $(".dt").each(function(i, v) {
                $(this).removeClass("selected");
                if(type != 2) {
                    $(this).next(".dd").hide();
                }
            })
            $(this).addClass("selected"); // 添加被点击效果

            var type = $(this).attr("id").split("_").pop();
            if(type != 2) {
                $(this).next(".dd").show();
            }
        });
    }

    /**
     * 二级菜单选择项监听
     */
    function menusTwo(dicArrCity) {
        $("body").delegate("li[id^='menu_']", "click", function(){
            // 被点击效果切换
            $("li[id^='menu_']").each(function(i, v) {
                $(this).removeClass("selected");
            })
            $(this).addClass("selected"); //添加被点击效果
            var id = $(this).attr("id");
            var type =  id.split("_").pop();
            // 切换各个模板页面
            switch (type) {
                case "00":
                    // 基本信息模板
                    getBasic(id.toString(), dicArrCity);
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
                    getResume(id, "简历", 51, "jl");
                    break;
                case "11":
                    // 传承历史与现状
                    getResume(id, "传承历史与现状", 119, "lsxz");
                    break;
                case "12":
                    // 师徒关系
                    getMaster(id);
                    break;
                case "13":
                    // 技能
                    getResume(id, "技能", 115, "jn");
                    break;
                case "14":
                    // 个人成就
                    getResume(id, "个人成就", 110, "cj");
                    break;
                case "15":
                    // 传承谱系
                    getResume(id, "传承谱系", 21, "ch");
                    break;
                case "16":
                    // 获奖情况
                    getResume(id, "获奖情况", 129, "hjqk");
                    break;
                case "17":
                    // 知识产权
                    getResume(id, "知识产权", 131, "zscq");
                    break;
                default:
                    console.log("没有")
            }
        });
    }

    /**
     * 基本信息 - 基本信息模板
     * @param id
     * @param dicArrCity
     */
    function getBasic(id, dicArrCity) {
        $("#content").html( Handlebars.compile(basicTpl)({countrys: dicArrCity, basics: basicObj})); // 更新页面模板
        var imgUrl = "http://diich-resource.oss-cn-beijing.aliyuncs.com/image/master/150155305316320151023153449 (1).jpg"; // 上传他图片地址
        // 上传图片
        upload.submit($('.horizontal .group .control .file_up'),1,'/user/uploadFile?type=master',function (res) {
            console.log("res -- >", res);
            imgUrl = res.data[0].substr((res.data[0].lastIndexOf ("/")+1), res.data[0].length);
            $('.preview').attr('src', res.data[0]).show();
            $('._token').val($('meta[name=token]').attr('content'));
        });

        // 回显图片
        if(basicObj != {}) {
            $.each(basicObj.contentFragmentList, function(i, v) {
                if(v.attributeId == 10) {
                    $(".preview").attr("src", ossPash + v.resourceList[0].uri.toString()).show();
                    $(".file_up").addClass("active");
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
            //basicObj["zj_type"] = code; // 缓存在临时页面对象中
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

        _binding();
        function _binding() {
            $("#active").on("click", function() {  // 监听提交
                onSave();
            })
        }
        // 防止用户多次点击下一步按钮  处理过程解绑点击事件 处理完成后重新绑定
        function onSave() {
            $("#active").off("click");
            if(validate() && imgUrl != "" && isMaster != "") {
                var data = $("#basicForm").serializeArray(); // 获取表单数据
                data.push({"name" : "img", "value" : imgUrl}); // 构建图片参数
                var params = basicObj ? buildParams(data, basicObj) :  buildParams(data, null); // 构建请求参数数据
                console.log("params  --- 》", params);


                // 跳转到下一页面
                _onNextPage(id, ["menu_01"]);
                //_onBasicsMenu();
                _onSubmitMenu();

                //onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                //    console.log("result === >", result,  JSON.stringify(result.res.data));
                //    // 处理用户未登录
                //    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                //        targetId = result.res.data.id;
                //        basicObj = result.res.data; // 保存成功存储服务器返回数据
                //        // 跳转到下一页面
                //        var nextId = id.split("_")[0] + "_01";
                //        nextPage(id, nextId, function() {
                //            getContact(nextId);
                //        });
                //    } else {
                //        console.log(result.res.code, result.res.msg);
                //    }
                //});
                _binding();
            } else {
                imgUrl == "" ? $("#img_err").html("<i></i>请上传照片,若以上传请等待回显图片后点击 下一步/提交 操作").show() : "";
                isMaster == "" ? $("#isApply_err").html("<i></i>请选择是否为自己申报传承人").show() : "";
                _binding();
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
        console.log("contactObj --- >", contactObj)
        $("#content").html(Handlebars.compile(contactTpl)({contacts: contactObj }));
        var addressCode = []; // 记录地址
        selectArea.init(0,function (data, dataText) {
            addressCode = data[0].split(",");
            addressCode.splice((addressCode.length - 1), 1);
            addressText = dataText; // 用户选取的地址
        })

        console.log("dic_arr_city   --- >", dic_arr_city)
        _binding();
        function _binding() {
            $("#contact_active").on("click", function() {     // 监听提交
                onSave();
            })
        }

        // 防止用户多次点击下一步按钮  处理过程解绑点击事件 处理完成后重新绑定
        function onSave() {
            $("#contact_active").off("click");
            if(validate()) {
                var data = $("#contactForm").serializeArray(); // 获取表单数据
                data.push({"name" : "live", "value" : addressCode[(addressCode.length - 1)]}); // 构建三级联动参数
                var params = contactObj ? buildParams(data, contactObj) :  buildParams(data, null); // 构建请求参数数据
                console.log("params -- >", params);
                // 跳转到下一页面
                _onNextPage(id, ["menu_02"]);
                //_onBasicsMenu();
                _onSubmitMenu();
                //onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                //    console.log("result ---- >", result, JSON.stringify(result.res.data));
                //    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                //        targetId = result.res.data.id;
                //        contactObj = result.res.data; // 保存成功存储服务器返回数据
                //        var nextId = id.split("_")[0] + "_02";
                //        nextPage(id, nextId, function() {
                //            getVocation(nextId);
                //        });
                //    } else {
                //        console.log("失败")
                //    }
                //});
                _binding();
            } else {
                _binding();
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
        $("#content").html(Handlebars.compile(vocationTpl)({vocations: vocationObj}));
        //getInputText(vocationObj, "vocationObj"); // 监听用户再此页面输入的内容
        _binding();
        function _binding() {
            $("#vocation_active").on("click", function() {     // 监听提交
                onSave();
            })
        }

        // 防止用户多次点击下一步按钮  处理过程解绑点击事件 处理完成后重新绑定
        function onSave() {
            $("#vocation_active").off("click");
            if($("#jj").val()) {
                showMsg($("#jj"), defaults.tips_success, true);
                var data = $("#vocationForm").serializeArray(); // 获取表单数据
                var params = vocationObj ? buildParams(data, vocationObj) :  buildParams(data, null); // 构建请求参数数据
                console.log("params -- >", params);

                // 跳转到下一页面
                _onNextPage(id, ["menu_1", "menu_10"]);
                //_onBasicsMenu();
                _onSubmitMenu();

                //onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                //    console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                //    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                //        targetId = result.res.data.id;
                //        vocationObj = result.res.data; // 保存成功存储服务器返回数据
                //        var nextId = id.split("_")[0] + "_10";
                //        nextPage(id, nextId, function() {
                //            getVocation(nextId);
                //        });
                //    } else {
                //        console.log("失败")
                //    }
                //});
                _binding();
            } else {
                showMsg($("#jj"), defaults.tips_required, false);
                _binding();
            }

        }
    }

    /**
     * 基本信息 - 师徒关系模板
     * @param id
     * @param dicArrCity
     */
    function getMaster(id) {
        // 更新DOM元素
        $("#content").html(Handlebars.compile(masterTpl)({}));

        _binding();
        function _binding() {
            $("#master_active").on("click", function() {
                onSave();
            })
        }

        // 防止用户多次点击下一步按钮  处理过程解绑点击事件 处理完成后重新绑定
        function onSave() {
            $("#master_active").off("click");
            if(validate()) {
                var data = $("#masterForm").serializeArray(); // 获取表单数据
                params = resumeObj ? buildParams(data, resumeObj) :  buildParams(data, null); // 构建请求参数数据
                console.log("params --- >", params);
                _onNextPage(id, ["menu_13"]);
                //_onInheritorMenu();
                _onSubmitMenu();
                _binding();
            } else {
                console.log("不可以提交");
                _binding();
            }
        }

    }

    /**
     * 通用模板 简历、传承历史与现状、技能、个人成就、传承谱系、获奖情况、知识产权
     * @param id 页面菜单项ID
     * @param title 模板页面title名称
     * @param dataId 相关填写项对应数据库ID
     * @param name 用于生成模板中id name属性
     */
    function getResume(id, title, dataId, name) {
        // 更新DOM元素
        var resumenHtml = Handlebars.compile(resumeTpl)({title: title, name: name, id: dataId});
        $("#content").html(resumenHtml);
        inheritorPage.radioImage(); // 加载上传视频， 上传图片

        _binding();
        function _binding() {
            $("#next").on("click", function() {
                onSave();
            })
        }

        function onSave() {
            var content = $("#" + name).val();
            if(content != "") {
                //var data = $("#currencyForm").serializeArray(); // 获取表单数据
                var data = [];
                data[0] = {
                    name :  $("#" + name).attr("name"),
                    value : content
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
                var params = "";
                var nextId = []; // 跳转到下一个页面的MOD ID集合
                switch (dataId) {
                    case 51:
                        // 简历
                        params = resumeObj ? buildParams(data, resumeObj) :  buildParams(data, null); // 构建请求参数数据
                        nextId = ["menu_11"];
                        break;
                    case 119:
                        // 传承历史与现状
                        params = historyObj ? buildParams(data, historyObj) :  buildParams(data, null); // 构建请求参数数据
                        nextId = ["menu_12"];
                        break;
                    case 115:
                        // 技能
                        params = skillObj ? buildParams(data, skillObj) :  buildParams(data, null); // 构建请求参数数据
                        nextId = ["menu_14"];
                        break;
                    case 110:
                        // 个人成就
                        params = achieveObj ? buildParams(data, achieveObj) :  buildParams(data, null); // 构建请求参数数据
                        nextId = ["menu_15"];
                        break;
                    case 21:
                        // 传承谱系
                        params = inheritObj ? buildParams(data, inheritObj) :  buildParams(data, null); // 构建请求参数数据
                        nextId = ["menu_16"];
                        break;
                    case 129:
                        // 获奖情况
                        params = rewardObj ? buildParams(data, rewardObj) :  buildParams(data, null); // 构建请求参数数据
                        nextId = ["menu_17"];
                        break;
                    case 131:
                        // 知识产权
                        params = loreObj ? buildParams(data, loreObj) :  buildParams(data, null); // 构建请求参数数据
                        break;
                    default:
                        console.log("没有")
                }
                console.log("params -- >", params);
                //onRequest("POST", "/ichMaster/saveIchMaster", {params: JSON.stringify(params)}).then(function(result) {
                //    console.log("返回数据 -- >", result,  JSON.stringify(result.res.data));
                //    if(result.res.code == 0 && result.res.msg == "SUCCESS") {
                //        targetId = result.res.data.id;
                //        vocationObj = result.res.data; // 保存成功存储服务器返回数据
                //        var nextId = id.split("_")[0] + "_10";
                //        nextPage(id, nextId, function() {
                //            getVocation(nextId);
                //        });
                //    } else {
                //        console.log("失败")
                //    }
                //});
                // 跳转到下一页面
                _onNextPage(id, nextId);
                //_onInheritorMenu();
                _onSubmitMenu();
            } else {
                $("#nr_err").show();
            }

         }

    }

    /**
     *  判断基本信息 填写项是否填写完成
     *      true 完成则显示基本信息填写完成
     *      false 没完成则不显示 _onBasicsMenu
     * @private
     */
    function _onSubmitMenu() {
        var fag = true; // 默认全部填写完成
        $("#menu_0").siblings(".dd").children("ul").children("li").each(function(i, v) {
            // 判断有一个没有填写完的都不可以
            if(!$(this).children("i").hasClass("selected")) {
                fag = false;
                return;
            }
        })

        if(fag) {
            $("#menu_0").children("i").addClass("selected");
        }

        var fag1 = true; // 默认全部填写完成
        $("#menu_1").siblings(".dd").children("ul").children("li").each(function(i, v) {
            if(!$(this).children("i").hasClass("selected")) {
                fag1 = false;
                return;
            }
        })

        if(fag1) {
            $("#menu_1").children("i").addClass("selected");
        }

        // 查看页面中所有的选项是否都填写通过了 通过了则可以提交
        if(fag && fag1) {
            console.log("可以提交", fag, fag1);
            $("#notSend").hide();
            $("#onSend").show();
        }
    }

    /**
     * 下一步 跳转下一页
     * @param id
     * @param nextIds
     * @private
     */
    function _onNextPage(id, nextIds) {
        $("#" + id).removeClass("selected").children("i").addClass("selected").removeClass("unselected"); // 添加已完成效果
        $.each(nextIds, function(i, v) {
            $('#' + v).trigger("click"); // 模拟点击传承人内容
        })
    }

    /**
     * 构建请求参数
     * @param data
     * @param updateData
     * @returns {{contentFragmentList: *, isMaster: Number, lang: string, status: number, id: string}}
     */
    function buildParams(data, updateData) {
        $.each(data, function(i, v) {
            console.log("  --- >", i, v);
            v.attributeId = $("#" + v.name).attr("data-id");
            v.content = v.value;
            v.status = 0;
            v.targetType = 1;
            v.targetId = targetId? targetId : "";
            v.resourceList = v.imgs ? v.imgs : [];
            if(v.name == "img") {
                v.content = "";
                v.resourceList = [{uri: v.value}]; // 基本信息中只有一张图片
            }

            if(v.name == "jl") {

            }

            if(v.name == "birthday") {
                v.content = new Date(parseInt(1501430400 * 1000)).format('yyyy/MM/dd');
            }

            if(v.imgs) {
                delete v.imgs
            }
            delete v.name;
            delete v.value;

            // 修改
            if(updateData != null) {
                $.each(updateData.contentFragmentList, function(j, d) {
                    if(v.attributeId == d.attributeId) {
                        v.id = d.id;
                        return;
                    }
                })
            }

        })

        return params = {
                "contentFragmentList": data,
                "isMaster": parseInt(isMaster),
                "lang": getLang()=="zh-CN" ? "chi" : "eng",
                "status": 2,
                "id": targetId ? targetId : ""
        }
    }

    /**
     * 监听当前页面所有input type="text"输入框中值, 每次变化都会缓存一个JS对象
     * @returns {{}}
     */
    function getInputText(obj, onkey) {
        $("input[type='text']").on("input propertychange", function() {
            var key = $(this).attr("name");
            obj[key? key.toString(): $(this).attr("id").toString()] = $(this).val();
            console.log("obj --- >", obj)
            localStorage.setItem(onkey,JSON.stringify(obj)); // 缓存基本信息模板对象
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
                    // 调用验证方法
                    if(!check($(this), arr[i], $(this).val())) {
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

        // 正则
        reg_email: /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i, //验证邮箱
        reg_num: /^\d+$/,         //验证数字
        reg_chinese: /^[\u4E00-\u9FA5]+$/,     //验证中文
        reg_english: /^[A-Za-z]+$/, // 验证英文
        reg_pinyin: /^[A-Za-z]+$/, // 验证拼音
        reg_mobile: /^1[3458]{1}[0-9]{9}$/,    //验证手机
        reg_idcard: /^\d{14}\d{3}?\w$/,     //验证身份证
        reg_passport: /^[a-zA-Z]{5,17}$/, // 护照格式验证
        reg_passport1: /^[a-zA-Z0-9]{5,17}$/, // 护照格式验证1
        reg_zipcode: /^[1-9][0-9]{5}$/,
    };

    //验证方法
    function check(obj, _match, _val) {
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
     * 获取表单信息 (暂时不用)
     * @param targetType 目标ID 1为传承人
     * @author zhangtianci
     */
    //function getMenus() {
    //    // 获取菜单数据
    //    function getMenuData() {
    //        return new Promise(function (resolve, reject) {
    //            $.ajax({
    //                type: 'POST',
    //                url: "/ichCategory/getAttributeList",
    //                data: {targetType: 1},
    //                success: function (res) {
    //                    if(res.code == 0) {
    //                        resolve({ menus: res.data })
    //                    } else {
    //                        resolve({menus: null})
    //                    }
    //                },
    //                error: function (err) {
    //                    reject(err)
    //                },
    //                dataType: "json"
    //            });
    //        })
    //    }
    //
    //    // 过滤菜单 添加到DOM元素中
    //    getMenuData().then(function(res) {
    //        var newMenus = [];
    //        $.each(res.menus, function(i, menu) {
    //            // 长文本 或图文
    //            if(menu.dataType == 1 || menu.dataType == 5) {
    //                // 简介不显示在左侧菜单栏 过滤
    //                if(!(menu.id==9 || menu.id==24 || menu.id==31)){
    //                    newMenus.push(menu);
    //                }
    //            }
    //        })
    //        console.log("newMenus --- >", newMenus);
    //        // 更新DOM元素
    //        var menuHtml = Handlebars.compile(menuTpl)({menus: newMenus});
    //        $("#menuTwo").html(menuHtml);
    //    });
    //}

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
