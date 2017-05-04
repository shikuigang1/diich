<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>${title}</title>
</head>
<body>
<div >
    <h2>用户信息展示</h2>
<table>
    <thead>
        <tr>
            <td>用户id</td>
            <td>用户名</td>
            <td>密码</td>
        </tr>
    </thead>
<tbody>
    <#if obj?size = 0></#if>
    <#list obj as user>
            <tr style="color: blanchedalmond">
                <td align="center">
                <#if "${user.user_id}"=="1">123
                <#else> ${user.user_id}
                </#if>
                </td>
                <td align="center">${user.user_name}</td>
                <td align="center">${user.password}</td>
            </tr>
    </#list>

</tbody>
</table>
</div>
<#include "user_time.ftl"/>
<script src="common/js/common.js"></script>
<script src="common/js/util.js"></script>
<script src="common/js/weixin.js"></script>
<script src="guide/js/controller.js"></script>
<script src="guide/js/model.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</body>
</html>