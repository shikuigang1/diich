    <div class="title">传承人内容</div>
    <div class="hint"><i class="dot"></i>标有 <em>*</em> 的为必填项 · 信息越完善，申报成功的几率越高</div>
    <!--//End-->

    <div class="st">
        <h2>师徒关系</h2>
    </div>
    <!--//End-->

    <form id="masterForm" action="" class="bd horizontal">
        <div class="main">
             {{#each sonterms}}
                {{#equal dataType 0}}
                    <div class="group">
                        <label class="label"><!-- <em>*</em> -->{{cnName}}</label>
                        <div class="control">
                            <input value="{{getContent ../../pageObj.contentFragmentList id}}" id="master_{{id}}" name="master_{{id}}" data-id="{{id}}"  type="text" class="ipt w650">
                            <div id="sf_err" class="errors" style="display: none" ><i></i>请填写师</div>
                        </div>
                    </div>
                {{/equal}}
             {{/each}}
        </div>
        <!--//End-->
        <div class="handle">
            <!-- <a href="">删除此项</a> -->
            <a id="master_active" class="active" href="javascript:void(0);">下一步</a>
            <!-- <a href="">跳过此项</a> -->
        </div>
    </form>


