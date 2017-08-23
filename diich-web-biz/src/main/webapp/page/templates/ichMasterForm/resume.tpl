 <div class="title">传承人内容</div>
    <div class="hint"><i class="dot"></i>标有 <em>*</em> 的为必填项 · 信息越完善，申报成功的几率越高</div>
    <div class="st">
       <h2>{{sonterms.menusName}}</h2><!-- <span>查看填写示例</span> -->
    </div>

    <div id="temp">
        <div class="edit">
            <form id="currencyForm" action="">
                {{#each sonterms.sonTerms}}
                    {{#equal dataType 5}}
                         <div class="text">
                            <textarea data-id="{{id}}" name="resum_{{id}}" id="resum_{{id}}" data-maxLength="{{maxLength}}" data-maxLength="{{minLength}}" validate="true" check="required" cols="30" rows="10"></textarea>
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
                    {{/equal}}
                    {{#equal dataType 1}}
                        <div class="text">
                            <textarea data-id="{{id}}" name="resum_{{id}}" id="resum_{{id}}" data-maxLength="{{maxLength}}" data-minLength="{{minLength}}" validate="true" check="required" cols="30" rows="10"></textarea>
                        </div>
                    {{/equal}}
                {{/each}}
            </form>
        </div>
        <div id="{{name}}_err" class="prompt" style="display:none"><i></i>此项是必添项，请填写</div>
        <!--//edit End-->
        <div class="buttons">
            <a id="delete" href="javascript:void(0);">删除此项</a>
            <a id="next" class="next" href="javascript:void(0);" >下一步</a>
        </div>
    </div>
