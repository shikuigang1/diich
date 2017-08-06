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

            <div class="group">
                <label class="label">职业</label>
                <div class="control">
                    <input value="{{getContent pageObj.contentFragmentList 47}}" id="zy" name="zy" data-id="47" type="text" class="ipt w310">
                </div>
            </div>
            <!--//End 手机-->

            <div class="group">
                <label class="label">职务职称</label>
                <div class="control">
                    <input value="{{getContent pageObj.contentFragmentList 48}}" id="zc" name="zc" data-id="48" type="text" class="ipt w310">
                </div>
            </div>
            <!--//End 电子邮箱-->

            <div class="group">
                <label class="label">荣誉称号</label>
                <div class="control">
                    <input value="{{getContent pageObj.contentFragmentList 50}}" id="ch" name="ch" data-id="50" type="text" class="ipt w650">
                </div>
            </div>
            <!--//End 详情地址-->

            <div class="group">
                <label class="label"><em>*</em>简介</label>
                <div class="control">
                    <textarea value="" name="jj" id="jj" data-id="24" cols="30" rows="10">{{getContent pageObj.contentFragmentList 24}}</textarea>
                    <div id="jj_err" class="errors" style="display: none"><i></i>请填写简写</div>
                </div>
            </div>
            <!--//End 简介-->

        </div>
        <!--//End-->
        <div class="handle">
           <!-- <a href="">删除此项</a> -->
            <a id="vocation_active" class="active" href="javascript:void(0);">下一步</a>
           <!-- <a href="">跳过此项</a> -->
        </div>
    </form>