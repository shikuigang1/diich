/**
 * 通过type和code获取字典文本
 * @param type 类型
 * @param code 字典编码
 * @param lang 语言，默认为中文（不传lang参数）
 * @returns {string}
 */
function getTextByTypeAndCode(type, code, lang) {
    if(typeof dic_arr == 'undefined') {
        alert('请引入dictionary.js文件');
        return;
    }

    if(typeof lang == 'undefined') {
        lang = 'chi';
    }

    var text = '';

    for(var i = 0; i < dic_arr.length; i ++) {
        var dic_obj = dic_arr[i];
        if(dic_obj.type == type && dic_obj.code == code
                && dic_obj.lang == lang) {
            text = dic_obj.name;
            break;
        }
    }

    return text != ''? text : code;
}

/**
 * 获取同一类型的字典数据
 * @param type 数据类型
 * @param lang 语言，默认为中文（不传lang参数）
 * @return {array}
 */
function getDictionaryArrayByType(type, lang) {
    if(typeof dic_arr == 'undefined') {
        alert('请引入dictionary.js文件');
        return;
    }

    if(typeof lang == 'undefined') {
        lang = 'chi';
    }

    var array = [];

    for(var i = 0; i < dic_arr.length; i ++) {
        var dic_obj = dic_arr[i];
        if(dic_obj.type == type && dic_obj.lang == lang) {
            array.push(dic_obj);
        }
    }

    return array;
}

function uploadFile(uri) {
    $.ajaxFileUpload({
        url : uri,
        secureuri : false,
        fileElementId : 'file_upload',
        success : function(data) {

        },
        error : function(e) {
            alert(e.responseText);
        }
    });
}

function getTemplateUi(fileName) {
    $.ajax({
        url: fileName,
        async: false,
        contentType: 'text/plain;charset=utf-8',
        dataType: 'text',
        success: function(data, status) {
            alert(typeof data);
        }
    });
}
