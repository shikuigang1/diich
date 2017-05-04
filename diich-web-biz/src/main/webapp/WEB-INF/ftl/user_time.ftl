
<div >
    <h2>包含页面测试</h2>
    <table>
        <thead>
        <tr>
            <td>创建时间</td>
        </tr>
        </thead>
        <tbody>
        <#if obj?size = 0></#if>
        <#list obj as user>
            <tr style="color: blanchedalmond">
                <td align="center">${user.create_time?string("yyyy-MM-dd")}</td>
            </tr>
        </#list>
        </tbody>
    </table>
</div>
