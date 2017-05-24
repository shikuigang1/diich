
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