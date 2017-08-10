 <div class="title">自定义内容</div>
    <div class="hint"><i class="dot"></i>标有 <em>*</em> 的为必填项 · 信息越完善，申报成功的几率越高</div>
    <div class="st">
        <h2 class="custom"><input type="text" id="customName" placeholder="请输入自定义项的名称......"></h2>
        <div id="customName_err" class="errors" style="display: none"><i></i>请填写自定义名称</div>
    </div>

    <div id="temp">
        <div class="edit">
            <form id="currencyForm" action="">
                <div class="text">
                    <textarea data-id="" name="customContent" id="customContent" validate="true" check="required" cols="30" rows="10"></textarea>
                </div>
                <div class="images" id="images">
                    <div class="handle">
                        <div class="add file_up">
                            <span class="icon"><i></i></span>
                            <span>添加图片</span>
                        </div>
                        <div class="add file_up" style="margin-right:0;">
                            <span class="icon icon2"><i></i></span>
                            <span>添加视频</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div id="customContent_err" class="prompt" style="display: none"><i></i>此项是必添项，请填写</div>
        <!--//edit End-->
        <div class="buttons">
            <a id="delete_" href="javascript:void(0);">删除此项</a>
            <a id="next" class="next" href="javascript:void(0);" >下一步</a>
            <!-- <a id="skip" href="javascript:void(0);">跳过此项</a> -->
        </div>
    </div>
