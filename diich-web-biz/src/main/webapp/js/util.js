/**
 * 通过type和code获取字典文本
 * @param type 类型
 * @param code 字典编码
 * @param lang 语言，默认为中文（不传lang参数）
 * @returns {string}
 */
function getTextByTypeAndCode(type, code, lang) {
    if (typeof dic_arr == 'undefined') {
        alert('请引入dictionary.js文件');
        return;
    }

    if (typeof lang == 'undefined') {
        lang = 'chi';
    }

    var text = '';

    for (var i = 0; i < dic_arr.length; i++) {
        var dic_obj = dic_arr[i];
        if (dic_obj.type == type && dic_obj.code == code
            && dic_obj.lang == lang) {
            text = dic_obj.name;
            if (dic_obj.parent_id == null) {
                break;
            } else {
                var parent_text = getDictionaryById(dic_obj.parent_id);
                text = parent_text + text;
            }
            break;
        }
    }

    if (text == '' && lang == 'eng') {
        for (var i = 0; i < dic_arr.length; i++) {
            var dic_obj = dic_arr[i];
            if (dic_obj.type == type && dic_obj.code == code
                && dic_obj.lang == 'chi') {
                text = dic_obj.name;
                break;
            }
        }
    }

    return text != '' ? text : code;
}
/**
 * 根据id查询字典表数据
 * @param id
 * @returns {string}
 */
function getDictionaryById(id) {
    var text = '';

    for (var i = 0; i < dic_arr.length; i++) {
        var dic_obj = dic_arr[i];
        if (dic_obj.id != id) {
            continue;
        }

        text = dic_obj.name + text;

        if (dic_obj.parent_id == null) {
            break;
        } else {
            var parent_text = getDictionaryById(dic_obj.parent_id);
            text = parent_text + text;
        }
    }

    return text;
}
/**
 * 获取同一类型的字典数据
 * @param type 数据类型
 * @param lang 语言，默认为中文（不传lang参数）
 * @return {array}
 */
function getDictionaryArrayByType(type, lang) {
    if (typeof dic_arr == 'undefined') {
        alert('请引入dictionary.js文件');
        return;
    }

    if (typeof lang == 'undefined') {
        lang = 'chi';
    }

    var array = [];

    for (var i = 0; i < dic_arr.length; i++) {
        var dic_obj = dic_arr[i];
        if (dic_obj.type == type && dic_obj.lang == lang) {
            array.push(dic_obj);
        }
    }

    return array;
}
function getCategoryTextById(id) {
    if (typeof id == 'undefined' || id == null || id == '') {
        return '非遗项目';
    }

    var text = getCategoryById(id);
    text = text.substr(0, text.length - 3);

    if (text.length > 4) {
        text = text.substr(7, text.length - 1);
    }

    return text;
}

//获取分类 列表
function getCategoryList(type) {
    var temp = [];
    if (type == 0) {
        for (var i = 0; i < ich_category.length; i++) {
            var category = ich_category[i];
            if (category.parent_id == 0) {
                temp.push(category);
            }
        }
    }
    return temp;
}

function getCategoryById(id) {
    var text = '';

    for (var i = 0; i < ich_category.length; i++) {
        var category = ich_category[i];
        if (category.id != id) {
            continue;
        }

        text = category.name + ' - ' + text;

        if (category.parent_id == null) {
            break;
        } else {
            var parent_text = getCategoryById(category.parent_id);
            text = parent_text + text;
        }
    }

    return text;
}

function getSingleCategoryText(_code, _data) {
    var _text = null;
    var lang = getCurrentLanguage();

    for (var i = 0; i < _data.length; i++) {
        if (_data[i].gbCategory == _code) {
            if (lang == 'en') {
                _text = _data[i].eNname;
            } else {
                _text = _data[i].name;
            }
            return _text;
        }

        if (_data[i].children != null) {
            _text = getSingleCategoryText(_code, _data[i].children);
        }

        if (_text != null) {
            break;
        }
    }

    return _text;
}

function getSingleCityText(_code, _data) {
    var _text = null;
    var lang = getCurrentLanguage();

    for (var i = 0; i < _data.length; i++) {
        if (_data[i].code == _code) {
            if (lang == 'en') {
                _text = _data[i].eNname;
            } else {
                _text = _data[i].name;
            }
            return _text;
        }

        if (_data[i].children != null) {
            _text = getSingleCityText(_code, _data[i].children);
        }

        if (_text != null) {
            break;
        }
    }

    return _text;
}

function uploadFile(uri) {
    $.ajaxFileUpload({
        url: uri,
        secureuri: false,
        fileElementId: 'file_upload',
        success: function (data) {

        },
        error: function (e) {
            alert(e.responseText);
        }
    });
}

function getTemplateUi(fileName, callback) {
    $.ajax({
        url: fileName,
        contentType: 'text/plain;charset=utf-8',
        dataType: 'text',
        success: function (data, status) {
            callback(data);
        }
    });
}
//error code message
function getMsgByCode(code, lang) {

    if (lang == 'zh-CN') {
        return error_message[code].msg;
    } else {
        return error_message[code].enMsg;
    }


}

function generateMathRand(num) {
    var v = "";
    for (var i = 0; i < num; i++) {
        v += Math.floor(Math.random() * 10);
    }
    return v;
}

/**
 * 通用自定义请求
 * @param mode 请求方式
 * @param url 请求地址
 * @param params 参数
 * @returns {Promise}
 * @private
 */
function _onRequest(mode, url, params) {
    return new Promise(function (resolve, reject) {
        // 监听ajax请求成功后出发统一处理 ajax获取数据code != 0的自定义异常
        $(document).ajaxSuccess(function (e, x, o) {
            // o为ajax请求本身 x.responseJSON是返回结果
            //console.log("e --- >", e);
            //console.log("x --- >", x);
            //console.log("o --- >", o);

            if (x.responseJSON.code != 0) {
                console.log("登录");
            }
        });
        // jquery ajax
        $.ajax({
            async: true, // 异步请求
            dataType: "json", // 服务器返回的数据类型
            type: mode,
            url: url,
            data: params, // {params: JSON.stringify(params)}
            error: function (err) {
                reject(err)
            },
            success: function (res) {
                if (res.code == 0) {
                    resolve({res: res})
                }
            },
        });
    })
}

// 弹窗
var myDialog = {
    init: function () {
        this.create(el, url);
    },
    // code, wid, width, height, ifrId, url, title
    create: function (paramObj) {
        var code, wid, width, height, ifrId, url, title;

        if (!paramObj) {
            throw new Error('Parameter cannot be null!');
        } else {
            if (!paramObj.wid) {
                throw new Error('Parameter wid cannot be null!');
            }

            if (!paramObj.ifrId) {
                throw new Error('Parameter ifrId cannot be null!');
            }
            code = paramObj.code == 0 ? paramObj.code : 1; // 0固定弹窗  1自定义弹窗
            wid = paramObj.wid ? paramObj.wid : "project"; // 弹窗ID
            width = paramObj.width || paramObj.width;
            height = paramObj.height || paramObj.height;
            ifrId = paramObj.ifrId || paramObj.ifrId;
            url = paramObj.url || paramObj.url;
            title = paramObj.title ? paramObj.title : "提示";
        }

        if (code == 0) {
            var $ifrId = $('#' + ifrId);
            var wWidth = $(window).width() - 200;
            var wHeight = $(window).height() - 100;
            $ifrId.attr("width", wWidth);
            $ifrId.attr("height", wHeight);
            $ifrId.attr("src", url);
            var d = dialog({
                id: wid,
                width: wWidth,
                height: wHeight,
                fixed: true,
                hide: true,
                title: title,
                content: $('#' + ifrId),
                modal: true
            });
            d.show();
        } else {
            var d = dialog({
                id: wid,
                width: (width ? width : 800),
                height: (height ? height : 500),
                fixed: true,
                hide: true,
                title: title,
                content: $('#' + ifrId),
                modal: true
            });
            d.show();
        }
    },
    close: function (wid) {
        dialog.list[wid].close(); // 关闭窗口
    }

}

// 认领词条上传
var newUpload =  {
    // 模板
    tmp: '<div style="padding-top: 20%;">' +
        '<img src="../static/images/jia.png">' +
        '<p>上传照片</p>' +
        '</div>',

    // 创建上传
    create: function(id, url, params, callback) {
        var path = "";
        var objdata = {
            upfile_endpoint: "",//上传地址
            upfile_nametype:'random_name',//local_name random_name  上传文件的文件名类型
            upfile_defaltdir: url//上传路径 多层  格式  upload/floder1/floder2
        };
        // 获取oss 相关参数
        $.ajax({
            type : "post",
            url : base_url + '/file/getPolicy',
            timeout : 10000,
            data : {},
            success : function(str) {
                console.log("str -- >", str);
                if (str) {
                    try {
                        var re = JSON.parse(str);
                        // 构建上传oss参数
                        objdata.osssignature = {
                            'key' : url + re["filename"],//生成文件路径,
                            'policy': re["policy"],
                            'OSSAccessKeyId': re["accessid"],
                            'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                            'signature': re["signature"]
                        };
                        objdata.upfile_endpoint = re["host"];
                    } catch (e) {
                        alert("系统错误");
                    }
                } else {
                    alert("结果为空");
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                alert("ajax error");
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                if(status == 'timeout'){
                    alert('请求超时，请稍后再试！');
                }
            },
            async : false
        });

        //console.log("objdata.osssignature -- >", objdata)
        // 初始化上传
        var uploader = WebUploader.create({

            // 选完文件后，是否自动上传。
            auto: true,

            // swf文件路径
            swf:  + '../require/webuploader/Uploader.swf',

            // 文件接收服务端。
            server: objdata.upfile_endpoint,

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#' + id,

            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                //mimeTypes: 'image/*'
                mimeTypes: 'image/jpg,image/jpeg,image/png'
            }
        });

        // 当有文件添加进来的时候
        uploader.on( 'fileQueued', function( file ) {
            file["width"] = params["width"] ? params["width"] : "244px";
            file["height"] = params["height"] ? params["height"] : "172px";
            var mheight = $("#" + id).height();

            var $li = $(
                    '<div id="' + file.id + '" class="webuploader-echo-div">' +
                    '<img style="width: 100%; height:' + mheight + 'px">' +
                    '<div class="webuploader-echo-mongolia" style="line-height:' + mheight + 'px;"><span id="delete-' + file.id + '" >删除</span></div>' +
                    '</div>'
                ),
                $img = $li.find('img');

            $("#" + id).html($li);

            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }
                $img.attr('src', src);
            }, file.width.replace("px", ""), file.width.replace("px", ""));

            // 监听删除
            newUpload.delete(url, params, callback);

        })

        // 处理访问前参数
        uploader.on('uploadBeforeSend', function(obj, data, headers) {

            // 赋值参数
            data = $.extend(data, objdata.osssignature);
            data.key = data.key + "." + obj.file.ext;
            data.filepath = data.key;
            path =  data.key; // 记录用户上传的图片地址
            headers['Access-Control-Allow-Origin'] = "*"
            console.log("data -- >", data)
        });

        // 上传成功
        uploader.on("uploadSuccess", function(file) {
            var res = {
                path: path,
                msg: "上传成功",
                code: "1"
            }
            callback(res);
        });

        // 上传失败
        uploader.on("uploadError", function(file) {
            var res = {
                path: path,
                msg: "上传失败",
                code: "0"
            }
            callback(res);
        });
    },

    // 删除插件
    delete: function(url, params, callback) {
        $("[id^='delete-']").off().on("click", function() {
            var thisID = $(this).attr("id");
            var id = $("#" + thisID).parent().parent().parent().attr("id")
            var cid = thisID.split("-").pop();

            console.log(thisID)
            $("#" + cid).remove();
            $("#" + id).html(newUpload.tmp)
            newUpload.create(id, url, params, callback);
        })
    }
}