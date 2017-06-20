$(function(){
    var language = localStorage.getItem("language") ? localStorage.getItem("language") : 'zh-CN';
    if(language == 'zh-CN'){
        $("#keyword").attr('placeholder',"苏州刺绣技艺");
    }else if(language == 'en'){
        $("#keyword").attr('placeholder',"Embroidery");
    }
});
