<div class="item">
    <div id="menu_0" class="dt selected"><i class="icon"></i>基础信息<em class="arrow"></em></div>
    <div class="dd">
        <ul>
            <li id="menu_0_0" class="selected"><i class="icon unselected"></i><span>基本信息</span></li>
            <li id="menu_0_1"><i class="icon unselected"></i><span>联系方式</span></li>
            <li id="menu_0_2"><i class="icon unselected"></i><span>职业信息</span></li>
        </ul>
    </div>
</div>

<div class="item">
    <div id="menu_1" class="dt" data-type="content"><i class="icon"></i>传承人内容<em class="arrow"></em></div>
    <div class="dd"  style="display: none">
        <ul id="menuTwo">
           <li id="menu_1_3"><i class="icon unselected"></i><span>简历</span></li>
           <li id="menu_1_4"><i class="icon unselected"></i><span>传承历史与现状</span></li>
           <li id="menu_1_5"><i class="icon unselected"></i><span>师徒关系</span></li>
           <li id="menu_1_6"><i class="icon unselected"></i><span>技能</span></li>
           <li id="menu_1_7"><i class="icon unselected"></i><span>个人成就</span></li>
           <li id="menu_1_8"><i class="icon unselected"></i><span>传承谱系</span></li>
           <li id="menu_1_9"><i class="icon unselected"></i><span>获奖情况</span></li>
           <li id="menu_1_10"><i class="icon unselected"></i><span>知识产权</span></li>
        </ul>
    </div>
</div>

<div class="item custom">
    <div id="menu_2" class="dt"><i></i>添加自定义项</div>
    <div class="dd"  style="display: none">
        <ul></ul>
    </div>
</div>

{{#each menuss}}
    <div class="item">
        <div id="meun_{{@index}}" class="dt selected"><i class="icon"></i>基础信息<em class="arrow"></em></div>
    </div>
{{/each}}