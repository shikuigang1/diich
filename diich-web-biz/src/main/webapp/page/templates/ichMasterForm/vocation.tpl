 <div class="title">基础信息</div>
    <div class="hint"><i class="dot"></i>标有 <em>*</em> 的为必填项 · 信息越完善，申报成功的几率越高</div>
    <!--//End-->

    <div class="st">
        <h2>职业信息</h2>
    </div>
    <!--//End-->

    <form id="vocationForm" action="" class="bd horizontal">
        <div class="main">
            <div class="group" style="display: none">
                <div class="group"><label class="label" for=""><em>*</em></label></div>
                <div class="group"><label class="label" for=""><em>*</em></label></div>
            </div>
            <!--//End 没什么用就是解决一个*的bug-->

           {{#each sonterms}}
                {{#equal dataType 0}}
                    <div class="group">
                        <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                        <div class="control">
                            <input value="{{getContent ../../pageObj.contentFragmentList id}}" validate="true" check="mobile" id="vocation_{{id}}" name="vocation_{{id}}" data-id="{{id}}" data-minLength="{{maxLength}}" data-maxLength="{{minLength}}" type="text" class="ipt w310">
                            <div id="vocation_{{id}}_err" class="errors" style="display: none"><i></i>请填写手机</div>
                        </div>
                    </div>
                {{/equal}}
                {{#equal dataType 1}}
                    <div class="group">
                        <label class="label"><!-- <em>*</em> -->简介</label>
                        <div class="control">
                            <textarea value="" name="vocation_{{id}}" id="vocation_{{id}}" data-id="{{id}}" data-maxLength="{{maxLength}}" data-minLength="{{minLength}}" cols="30" rows="10">{{getContent ../../pageObj.contentFragmentList id}}</textarea>
                            <div id="vocation_{{id}}_err" class="errors" style="display: none"><i></i>请填写简写</div>
                        </div>
                    </div>
                {{/equal}}
           {{/each}}

        </div>
        <!--//End-->
        <div class="handle">
           <!-- <a href="">删除此项</a> -->
            <a id="vocation_active" class="active" href="javascript:void(0);">下一步</a>
           <!-- <a href="">跳过此项</a> -->
        </div>
    </form>