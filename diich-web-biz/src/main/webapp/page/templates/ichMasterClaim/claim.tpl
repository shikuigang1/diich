<div class="title" id="page_basic" data-id="{{clickMenuId}}">基础信息</div>
<div class="hint"><i class="dot"></i>标有 <em>*</em> 的为必填项 · 信息越完善，申报成功的几率越高</div>
<!--//End-->

<div class="st">
   <h2>基础信息</h2>
</div>
<!--//End-->

<form id="basicForm" action="" class="bd horizontal">

    <div class="main">
        <!-- <div class="group inheritor">
            <label class="label" for=""><em>*</em>是否为自己申报传承人</label>
            <div class="control">
                <span name="sex_1" class="radio"><i></i><input type="radio" name="">是</span>
                <span name="sex_0" class="radio active"><i></i><input type="radio" name="">否</span>
                <div id="isApply_err" class="errors" style="display: none" ><i></i>请选择是否为自己申报传承人</div>
            </div>
        </div> -->
        <div id="inheritor"></div>
        {{#each sonterms}}
            {{#equal dataType 107}}
                 <div class="group">
                    <label class="label" for="">性别</label>
                    <div id="sex" data-id="{{id}}" class="control">
                        {{#if ../../pageObj.contentFragmentList}}
                            {{#ifAttribute ../../../pageObj.contentFragmentList ../../id}}
                                {{#each ../../../../pageObj.contentFragmentList}}
                                    {{#equal attributeId ../../id}}
                                        <span id="sex_1" class="radio {{#equal ../content 1}}active{{/equal}}"><i></i><input type="radio" name="">男</span>
                                        <span id="sex_0" class="radio {{#equal ../content 0}}active{{/equal}}"><i></i><input type="radio" name="">女</span>
                                    {{/equal}}
                                {{/each}}
                            {{else}}
                                <span id="sex_1" class="radio active"><i></i><input type="radio" name="">男</span>
                                <span id="sex_0" class="radio"><i></i><input type="radio" name="">女</span>
                            {{/ifAttribute}}
                        {{else}}
                            <span id="sex_1" class="radio active"><i></i><input type="radio" name="">男</span>
                            <span id="sex_0" class="radio"><i></i><input type="radio" name="">女</span>
                        {{/if}}
                        <div id="isApply_err" class="errors" style="display: none" ><i></i>请选择性别</div>
                    </div>
                 </div>
            {{/equal}}
            {{#equal dataType 0}}
                <div class="group">
                    <label class="label">{{#equal id 13}}<em>*</em>{{/equal}}<!-- <em>*</em> -->{{cnName}}</label>
                    <div class="control">
                       <input value="{{getContent ../../pageObj.contentFragmentList id}}" id="basic_{{id}}" name="basic_{{id}}" data-id="{{id}}" type="text" data-maxLength="{{maxLength}}" data-minLength="{{minLength}}" class="ipt w310">
                       <div id="basic_{{id}}_err" class="errors" style="display: none"><i></i>请填写姓名</div>
                    </div>
                </div>
            {{/equal}}
            {{#equal dataType 7}}
                <div id="img" class="group" data-id="{{id}}">
                    <label class="label" for=""><!-- <em>*</em> -->照片</label>
                    <div class="control">
                        <div class="file_up">
                            <span class="text">上传题图</span>
                            {{#each ../../pageObj.contentFragmentList}}
                                {{#equal attributeId 10}}
                                    {{#each resourceList}}
                                         <img style="display: block;" class="preview" src="{{handleUrl uri 0}}">
                                    {{/each}}
                                {{/equal}}
                            {{/each}}
                        </div>
                        <div class="tips">建议比例：x*x，不符合的图片将进行裁剪；格式：jpg\png</div>
                        <div id="basic_{{id}}_err" class="errors" style="display: none" ><i></i>请上传图片</div>
                    </div>
                </div>
            {{/equal}}
            {{#equal dataType 101}}
                {{#equal id 23}}
                     <div class="group" style="z-index: 10;position: relative;">
                        <label class="label" for=""><!-- <em>*</em> -->{{cnName}}</label>
                        <div class="control">
                            <div id="declare" class="ipt w650 select" data-type="selectArea" value="" data-id="{{id}}" >请选择申报地</div>
                            <div class="area" id="area" style="{{#ifAttribute ../../../pageObj.contentFragmentList id }}display: block;{{/ifAttribute}}" >
                                <div class="select" id="select" style="{{#ifAttribute ../../../pageObj.contentFragmentList id }}display: none;{{/ifAttribute}}"></div>
                                <div class="selected" id="selected">
                                    {{#each ../../../pageObj.contentFragmentList}}
                                        {{#equal attributeId 23}}
                                            {{#each addressCodes}}
                                                <li><span>{{getAddressText this}}<i class="icon"></i></span></li>
                                            {{/each}}
                                        {{/equal}}
                                    {{/each}}
                                </div>
                            </div>
                            <div class="errors" style="display: none"><i></i>请选择申报地</div>
                        </div>
                     </div>
                {{else}}
                    <div class="group">
                        <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                        <div class="control">
                            <select id="basic_{{id}}" name= "basic_{{id}}" data-id="{{id}}" class="ipt w310">
                                {{#each ../../../countrys}}
                                    {{#if code}}
                                        <option {{#onGj ../../../../pageObj.contentFragmentList code ../id }}selected="selected"{{/onGj}} code="{{code}}" value="{{code}}">{{name}}</option>
                                    {{/if}}
                                {{/each}}
                            </select>
                            <div id="basic_{{id}}_err" class="errors" style="display: none"><i></i>请填写国籍</div>
                        </div>
                    </div>
                {{/equal}}
            {{/equal}}
              {{#equal dataType 20}}

                        {{/equal}}
            {{#equal dataType 106}}
                 <div class="group">
                    <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                        <div class="control">
                            <select id="basic_{{id}}" name= "basic_{{id}}" data-id="{{id}}" class="ipt w310">
                                <option code="" value="">请选择</option>
                                {{#each ../../fyGrade}}
                                    <option {{#onGj ../../../pageObj.contentFragmentList code ../id }}selected="selected"{{/onGj}} code="{{code}}" value="{{code}}">{{name}}</option>
                                {{/each}}
                            </select>
                        <div id="basic_{{id}}_err" class="errors" style="display: none"><i></i>请填非遗等级</div>
                    </div>
                 </div>
            {{/equal}}
            {{#equal dataType 105}}
                <div class="group">
                    <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                    <div class="control">
                        <select id="basic_{{id}}" name="basic_{{id}}" data-id="{{id}}" class="ipt w310" name="">
                            <option code="" value="">请选择</option>
                            {{#each ../../nations}}
                                <option {{#onGj ../../../pageObj.contentFragmentList code ../id }}selected="selected"{{/onGj}} code="{{code}}" value="{{code}}" >{{name}}</option>
                            {{/each}}
                        </select>
                        <div class="errors" style="display: none"><i></i>请填写证件类型</div>
                    </div>
                </div>
            {{/equal}}
            {{#equal dataType 108}}
                <div class="group">
                    <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                    <div class="control">
                        <select id="basic_{{id}}" name="basic_{{id}}" data-id="{{id}}" class="ipt w310" name="">
                            <option code="" value="">请选择</option>
                            {{#each ../../certificates}}
                                <option {{#onGj ../../../pageObj.contentFragmentList code ../id }}selected="selected"{{/onGj}} code="{{code}}" value="{{code}}" >{{name}}</option>
                            {{/each}}
                        </select>
                        <div class="errors" style="display: none"><i></i>请填写证件类型</div>
                    </div>
                </div>
            {{/equal}}
            {{#equal dataType 3}}
                <div class="group">
                    <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                    <div class="control">
                        <input value="{{getContent ../../pageObj.contentFragmentList id}}" validate="true" check="required" id="basic_{{id}}" name="basic_{{id}}" data-id="{{id}}" type="text" class="ipt w310">
                        <div id="basic_{{id}}_err" class="errors" style="display: none"><i></i>出生日期</div>
                    </div>
                </div>
            {{/equal}}
        {{/each}}
        <!-- <div class="group">
            <label class="label"><em>*</em>项目ID</label>
            <div class="control">
                <input value="{{ichProjectId}}" readonly="readonly" validate="true" id="basic_pid" type="text" class="ipt w310">
                <div id="basic_pid_err" class="errors" style="display: none"><i></i>请填写证件号码</div>
            </div>
         </div> -->
         <div class="group">
            <label class="label"><em>*</em>所属项目</label>
            <div class="control">
                <input data-id="{{ichProjectId}}" value="{{ichProjectName}}" readonly="readonly" validate="true" id="basic_pid" type="text" class="ipt w310">
                <div id="basic_pid_err" class="errors" style="display: none"><i></i>请填写证件号码</div>
            </div>
         </div>
    </div>
    <div class="handle">
        <!-- <a href="">删除此项</a> -->
        <a id="basic_active" class="active" href="javascript:void(0);">下一步</a>
        <!-- <a href="">跳过此项</a> -->
    </div>
</form>