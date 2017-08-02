
    <div class="title">基础信息</div>
    <div class="hint"><i class="dot"></i>标有 <em>*</em> 的为必填项 · 信息越完善，申报成功的几率越高</div>
    <!--//End-->

    <div class="st">
        <h2>基础信息</h2>
    </div>
    <!--//End-->

    <form id="basicForm" action="" class="bd horizontal">
        <div class="main">
            <div class="group inheritor">
                <label class="label" for=""><em>*</em>是否为自己申报传承人</label>
                <div class="control">
                    <span name="isApply_0" class="radio {{expr '0' basics.isMaster op='==' true='active' false=''}}"><i></i><input type="radio" name="">是</span>
                    <span name="isApply_1" class="radio {{expr '1' basics.isMaster op='==' true='active' false=''}}"><i></i><input type="radio" name="">否</span>
                    <div id="isApply_err" class="errors" style="display: none" ><i></i>请选择是否为自己申报传承人</div>
                </div>
            </div>
            <div id="inheritor"></div>

            <div id="img" class="group" data-id="10">
                <label class="label" for=""><em>*</em>照片</label>
                <div class="control">
                    <div class="file_up">
                        <span class="text">上传题图</span>
                    </div>
                    <div class="tips">建议比例：x*x，不符合的图片将进行裁剪；格式：jpg\png</div>
                    <div id="img_err" class="errors" style="display: none" ><i></i>请上传图片</div>
                </div>
            </div>

            <!--//End 照片-->

            <div class="group">
                <label class="label"><em>*</em>姓名</label>
                <div class="control">
                    <input value="{{#each basics.contentFragmentList}}{{#equal '13' attributeId }}{{content}}{{/equal}}{{/each}}" validate="true" check="required chinese" id="cnName" name="cnName" data-id="13" type="text" class="ipt w310">
                    <div id="cnName_err" class="errors" style="display: none"><i></i>请填写姓名</div>
                </div>
            </div>
            <!--//End 姓氏-->

            <div class="group">
                <label class="label"><em>*</em>英文名</label>
                <div class="control">
                    <input value="{{#each basics.contentFragmentList}}{{#equal '14' attributeId }}{{content}}{{/equal}}{{/each}}" validate="true" check="required english" id="enName" name="enName" data-id="14" type="text" class="ipt w310">
                    <div id="enName_err" class="errors" style="display: none"><i></i>请填写英文名</div>
                </div>
            </div>
            <!--//End 名字-->

            <div class="group">
                <label class="label" for=""><em>*</em>拼音</label>
                <div class="control">
                    <input value="{{#each basics.contentFragmentList}}{{#equal '15' attributeId }}{{content}}{{/equal}}{{/each}}" validate="true" check="required pinyin" id="py" name="py" data-id="15" type="text" class="ipt w310">
                    <div id="py_err" class="errors" style="display: none"><i></i>请填写拼音</div>
                </div>
            </div>
            <!--//End 地域-->
            <div class="group">
                <label class="label"><em>*</em>国籍{{ basic.gj}}</label>
                <div class="control">
                    <select id="gj" name= "gj" data-id="49" check="required" class="ipt w310">
                        {{#each countrys}}
                            {{#eif @index 0 op=">"}}
                                <option {{#onGj ../../basics.contentFragmentList code }}selected="selected"{{/onGj}} code="{{code}}" value="{{code}}">{{name}}</option>
                            {{/eif}}
                        {{/each}}
                    </select>
                    <div id="gj_err" class="errors" style="display: none"><i></i>请填写国籍</div>
                </div>
            </div>
            <!--//End 国籍-->

            <div class="group">
                <label class="label"><em>*</em>民族</label>
                <div class="control">
                    <input value="{{#each basics.contentFragmentList}}{{#equal '17' attributeId }}{{content}}{{/equal}}{{/each}}" validate="true" check="required" id="mz" name="mz" data-id="17" type="text" class="ipt w310">
                    <div id="mz_err" class="errors" style="display: none"><i></i>请填写民族</div>
                </div>
            </div>
            <!--//End 民族-->

            <div class="group">
                <label class="label"><em>*</em>出生日期</label>
                <div class="control">
                    <input value="{{#each basics.contentFragmentList}}{{#equal '18' attributeId }}{{content}}{{/equal}}{{/each}}" validate="true" check="required" id="birthday" name="birthday" data-id="18" type="text" class="ipt w310">
                    <div id="birthday_err" class="errors" style="display: none"><i></i>出生日期</div>
                </div>
            </div>
            <!--//End 出生日期-->

            <div class="group">
                <label class="label"><em>*</em>证件类型</label>
                <div class="control">
                    <select id="zj_type" name="zj_type" check="required" data-id="127" class="ipt w310" name="">
                        <option {{#onZjType basics.contentFragmentList 0}}selected="selected"{{/onZjType}} value="0">身份证</option>
                        <option {{#onZjType basics.contentFragmentList 1}}selected="selected"{{/onZjType}} value="1">签证</option>
                        <option {{#onZjType basics.contentFragmentList 2}}selected="selected"{{/onZjType}} value="2">护照</option>
                        <option {{#onZjType basics.contentFragmentList 3}}selected="selected"{{/onZjType}} value="3">军人证</option>
                    </select>
                    <div class="errors" style="display: none"><i></i>请填写证件类型</div>
                </div>
            </div>
            <!--//End 证件类型-->

            <div class="group">
                <label class="label"><em>*</em>证件号码</label>
                <div class="control">
                    <input value="{{#each basics.contentFragmentList}}{{#equal '128' attributeId }}{{content}}{{/equal}}{{/each}}" validate="true" check="required idcard" id="zj" name="zj" data-id="128" type="text" class="ipt w310">
                    <div id="zj_err" class="errors" style="display: none"><i></i>请填写证件号码</div>
                </div>
            </div>
            <!--//End 证件号码-->

        </div>
        <!--//End-->
        <div class="handle">
            <a href="">删除此项</a>
            <a id="active" class="active" href="javascript:void(0);">下一步</a>
            <a href="">跳过此项</a>
        </div>
    </form>

