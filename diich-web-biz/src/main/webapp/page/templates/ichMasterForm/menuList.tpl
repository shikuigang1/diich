{{#each menuss}}
    <div class="item">
        <div id="menu_{{addOne @index}}" class="dt {{#equal 0 @index}}selected{{/equal}}"><i class="icon"></i>{{menusName}}<em class="arrow"></em></div>
        {{#if sonMenus}}
            <div class="dd" id="menuTwo" style="display: none">
                <ul>
                    {{#each sonMenus}}
                        <li id="menutwo_{{../_index}}_{{@index}}" class=""><i class="icon"></i><span>{{menusName}}</span></li>
                    {{/each}}
                </ul>
            </div>
        {{/if}}
    </div>
{{/each}}
<div class="item custom">
    <div id="menu_{{addOne menuss.length}}" class="dt"><i></i>添加自定义项</div>
    <div class="dd"  style="display: none">
        <ul></ul>
    </div>
</div>
<div class="item status">
    <div class="dd">
        <ul>
            <li><i class="icon selected"></i>完成模块内所有的字段</li>
            <li><i class="icon unselected"></i>未完成模块内的必填项</li>
            <li><i class="icon warning"></i>完成模块内所有的必填项<br>未完成某些选填项</li>
        </ul>
    </div>
</div>