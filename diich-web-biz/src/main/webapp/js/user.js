/**
 * 根据用户id 获取用户信息
 */
function getUserOrganizationInfo(){
    var id = localStorage.getItem("pid");
    if(id == null){
        return null;
    }

    var result= null;
    $.ajax({
        cache: true,
        type: "POST",
        url: "/organization/getOrganizationById",
        data: {params:id}, // 你的formid
        dataType: "json",
        async: false,
        error: function(request) {
            console.log(request);
        },
        success: function(data) {
            result = data;
        }
    });
    return result;
}