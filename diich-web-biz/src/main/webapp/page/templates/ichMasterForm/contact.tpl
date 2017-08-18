<div class="title">基础信息</div>
<div class="hint"><i class="dot"></i>标有 <em>*</em> 的为必填项 · 信息越完善，申报成功的几率越高</div>
<!--//End-->

<div class="st">
    <h2>联系方式</h2>
</div>
<!--//End-->

<form id="contactForm" action="" class="bd horizontal">
    <div class="main">
        <div class="group" style="display: none">
            <div class="group"><label class="label" for=""><em>*</em></label></div>
            <div class="group"><label class="label" for=""><em>*</em></label></div>
        </div>
    <div>

    {{#each sonterms}}
        {{#equal dataType 0}}
            <div class="group">
                <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                <div class="control">
                    <input value="" validate="true" check="mobile" id="contact_{{id}}" name="contact_{{id}}" data-id="{{id}}" data-maxLength="{{maxLength}}" data-maxLength="{{minLength}}" type="text" class="ipt w310" placeholder="+86">
                    <div id="sj_err" class="errors" style="display: none"><i></i>请填写手机</div>
                </div>
            </div>
        {{/equal}}
        {{#equal dataType 101}}
            <div class="group">
                <label class="label" for=""><!-- <em>*</em> -->{{cnName}}</label>
                <div class="control">
                    <div id="live" class="ipt w650 select" data-type="selectArea" value="" data-id="{{id}}" >请选择地域</div>
                    <div class="area" id="area" style="{{#ifAttribute pageObj.contentFragmentList 55 }}display: block;{{/ifAttribute}}" >
                        <div class="select" id="select" style="display: none"></div>
                        <div class="selected" id="selected"></div>
                    </div>
                    <div class="errors" style="display: none"><i></i>请填写地域</div>
                </div>
            </div>
        {{/equal}}
    {{/each}}
    <div class="handle">
        <!-- <a href="">删除此项</a> -->
        <a id="contact_active" class="active" href="javascript:void(0);">下一步</a>
        <!-- <a href="">跳过此项</a> -->
    </div>
</form>