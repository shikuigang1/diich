var cutStr = {
    get: function (str) {//计算长度 汉字是2
        var real = 0;
        var len = str.length;
        var charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                real += 1;
            } else {
                real += 2;
            }
        }
        return real;
    },
    setStage: function (str) {
        var len = cutStr.get(str) / 2;
        if (len >= 200 && len <= 1200) {
            var strLi = '<div class="plain_text"><ul><li><p>' + str.substring(0, 400) + '</p></li><li><p>' + str.substring(400, 800) + '</p></li><li style="margin-right: 0"><p>' + str.substring(800, 1200) + '</p></li></ul></div>';
            return strLi;
        }
    }
};


