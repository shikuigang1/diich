 <div class="title">传承人内容</div>
    <div class="hint"><i class="dot"></i>标有 <em>*</em> 的为必填项 · 信息越完善，申报成功的几率越高</div>
    <div class="st">
        <h2>{{title}}</h2><!-- <span>查看填写示例</span> -->
    </div>

    <div id="temp">
        <div class="edit">
            <form id="currencyForm" action="">
                <div class="text">
                    <textarea data-id="{{id}}" name="{{name}}" id="{{name}}" validate="true" check="required" cols="30" rows="10"></textarea>
                </div>
                <div class="images" id="images">
                    <div class="handle">
                        <div class="add file_up">
                            <span class="icon"><i></i></span>
                            <span>添加图片</span>
                        </div>
                       <!-- <div class="add file_up" style="margin-right:0;">
                            <span class="icon icon2"><i></i></span>
                            <span>添加视频</span>
                        </div> -->
                    </div>
                </div>
            </form>
        </div>
        <div id="nr_err" class="prompt" style="display: none"><i></i>此项是必添项，请填写</div>
        <!--//edit End-->
        <div class="buttons">
            <a href="">删除此项</a>
            <a id="next" class="next" href="javascript:void(0);" >下一步</a>
            <a href="">跳过此项</a>
        </div>
    </div>