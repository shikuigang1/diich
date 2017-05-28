
function getTextByTypeAndCode(type, code) {
    var text = '';

    for(var i = 0; i < dic_arr.length; i ++) {
        var dic_obj = dic_arr[i];
        if(dic_obj.type == type && dic_obj.code == code) {
            text = dic_obj.name;
            break;
        }
    }

    return text;
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