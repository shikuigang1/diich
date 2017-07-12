$(function(){
    var language = localStorage.getItem("language") ? localStorage.getItem("language") : 'zh-CN';
    if(language == 'zh-CN'){
        $("#keyword1").attr('placeholder',"苏州刺绣技艺");
    }else if(language == 'en'){
        $("#keyword1").attr('placeholder',"Embroidery");
    }
});
