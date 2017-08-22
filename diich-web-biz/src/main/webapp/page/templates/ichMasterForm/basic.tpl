<div class="title">基础信息</div>
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
                <span name="isApply_1" class="radio"><i></i><input type="radio" name="">是</span>
                <span name="isApply_0" class="radio active"><i></i><input type="radio" name="">否</span>
                <div id="isApply_err" class="errors" style="display: none" ><i></i>请选择是否为自己申报传承人</div>
            </div>
        </div> -->
        <div id="inheritor"></div>

        {{#each sonterms}}
            {{#equal dataType 0}}
                {{#equal id 10}}
                    <div id="img" class="group" data-id="{{id}}">
                        <label class="label" for=""><!-- <em>*</em> -->照片</label>
                        <div class="control">
                            <div class="file_up">
                                <span class="text">上传题图</span>
                            </div>
                            <div class="tips">建议比例：x*x，不符合的图片将进行裁剪；格式：jpg\png</div>
                            <div id="basic_{{id}}_err" class="errors" style="display: none" ><i></i>请上传图片</div>
                        </div>
                    </div>
                {{else}}
                    {{#equal id 127}}
                        <div class="group">
                            <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                            <div class="control">
                            <select id="basic_{{id}}" name="basic_{{id}}" data-id="{{id}}" class="ipt w310" name="">
                                <option value="0">身份证</option>
                                <option value="1">签证</option>
                                <option value="2">护照</option>
                                <option value="3">军人证</option>
                            </select>
                            <div class="errors" style="display: none"><i></i>请填写证件类型</div>
                        </div>
                    </div>
                    {{else}}
                     <div class="group">
                        <label class="label">{{#equal id 13}}<em>*</em>{{/equal}}<!-- <em>*</em> -->{{cnName}}</label>
                        <div class="control">
                            <input value="" id="basic_{{id}}" name="basic_{{id}}" data-id="{{id}}" type="text" data-maxLength="{{maxLength}}" data-minLength="{{minLength}}" class="ipt w310">
                            <div id="basic_{{id}}_err" class="errors" style="display: none"><i></i>请填写姓名</div>
                        </div>
                     </div>
                    {{/equal}}
                {{/equal}}
            {{/equal}}
            {{#equal dataType 101}}
                 <div class="group">
                    <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                        <div class="control">
                            <select id="basic_{{id}}" name= "basic_{{id}}" data-id="{{id}}" class="ipt w310">
                                {{#each ../../countrys}}
                                    {{#eif @index 0 op=">"}}
                                        <option code="{{code}}" value="{{code}}">{{name}}</option>
                                     {{/eif}}
                                {{/each}}
                             </select>
                        <div id="basic_{{id}}_err" class="errors" style="display: none"><i></i>请填写国籍</div>
                    </div>
                 </div>
            {{/equal}}
            {{#equal dataType 106}}
                 <div class="group">
                    <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                        <div class="control">
                            <select id="basic_{{id}}" name= "basic_{{id}}" data-id="{{id}}" class="ipt w310">
                                {{#each ../../countrys}}
                                    {{#eif @index 0 op=">"}}
                                        <option code="{{code}}" value="{{code}}">{{name}}</option>
                                    {{/eif}}
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
                        <input value="" validate="true" id="basic_{{id}}" name="basic_{{id}}" data-id="{{id}}" data-maxLength="{{maxLength}}" data-maxLength="{{minLength}}" type="text" class="ipt w310">
                        <div id="basic_{{id}}_err" class="errors" style="display: none"><i></i>请填写民族</div>
                    </div>
                    </div>
            {{/equal}}
            {{#equal dataType 3}}
                <div class="group">
                    <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                    <div class="control">
                        <input value="" validate="true" check="required" id="basic_{{id}}" name="basic_{{id}}" data-id="{{id}}" type="text" class="ipt w310">
                        <div id="basic_{{id}}_err" class="errors" style="display: none"><i></i>出生日期</div>
                    </div>
                </div>
            {{/equal}}
        {{/each}}
         <div class="group">
            <label class="label"><em>*</em>项目ID</label>
            <div class="control">
                <input value="{{ichProjectId}}" validate="true" id="basic_pid" type="text" class="ipt w310">
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