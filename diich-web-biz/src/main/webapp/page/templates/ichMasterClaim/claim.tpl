<form id="form_inof">
    <div class="in_Basics">
        <div>
            <h2>基础信息</h2>
            <div>
                <ul class="clear">
                    <li>
                        <label><em>*</em>姓名</label>
                        <input type="text" name="userName" id="userName" data-id="13" value="">
                    </li>
                    <li>
                        <label style="margin-left: 16px;">用其他名字或曾用名</label>
                        <input type="text" name="otherName" id="otherName" data-id="156" value="">
                    </li>
                    <li class="clear">
                        <label><em>*</em>性别</label>
                        <b class="active" name="sex" data-type="0" data-id="16"></b><span>男</span>
                        <b data-type="1" name="sex" data-id="16"></b><span>女</span>
                    </li>
                    <li>
                        <label><em>*</em>国籍</label>
                        <!--<input type="text" name="areaCode" id="" value="" />-->
                        <select style="width: 384px; margin-left: 16px;" name="areaCode" id="areaCode" class="form_select" data-id="49">
                            <option value="">请选择...</option>
                            {{#each countrys}}
                                {{#if code}}
                                    <option value="{{code}}">{{name}}</option>
                                {{/if}}
                            {{/each}}
                        </select>
                    </li>
                    <li>
                        <label><em>*</em>民族</label>
                        <!--<input type="text" name="nation" id="" value="" />-->
                        <!--<label><em>*</em>民{{base.nationCode}}族</label>-->
                        <select style="margin-left: 16px; width: 384px;" name="nation" id="nation" class="form_select" data-id="17">
                            <option value="">请选择...</option>
                            {{#each nations}}
                                <option value="{{code}}">{{name}}</option>
                            {{/each}}
                        </select>
                    </li>

                    <li>
                        <label><em>*</em>证件类型</label>
                        <!--<input type="text" name="documentType" id="" value="" />-->

                        <select style="width: 384px; margin-left: 16px;" name="documentType" id="documentType" class="form_select" data-id="127">
                            <option value="">请选择...</option>
                            {{#each certificates}}
                                <option value="{{code}}">{{name}}</option>
                            {{/each}}
                        </select>
                    </li>

                    <li style="margin-bottom: 37px; margin-top: 5px;">
                        <label><em>*</em>证件号码</label>
                        <input type="text" name="numBer" id="numBer" data-id="128" value="">
                    </li>
                    <li>
                        <div class="add_cover">
                            <label><em>*</em>证件照片 - 正面</label>
                            <div id="justImg" class="sDiv" data-id="153">
                                <div style="padding-top: 20%;">
                                    <img src="../static/images/jia.png">
                                    <p>上传照片</p>
                                </div>
                            </div>
                            <div id="just_img" class="clear" style="color: red; display: none; margin-left: 20px;">请上传图片</div>
                        </div>
                    </li>
                    <li>
                        <!--<label><em>*</em>证件照片 - 反面</label>-->
                        <!--<div class="sDiv">-->
                        <!--<p>上传照片</p>-->
                        <!--</div>-->
                        <div class="add_cover">
                            <label><em>*</em>证件照片 - 反面</label>
                            <div id="backImg" class="sDiv" data-id="154">
                                <div style="padding-top: 20%;">
                                    <img src="../static/images/jia.png">
                                    <p>上传照片</p>
                                </div>
                            </div>
                            <div id="back_img" class="clear" style="color: red; display: none; margin-left: 20px;">请上传图片</div>
                        </div>
                    </li>
                </ul>
                <!--照片-->

                    <div>
                        <label><em>*</em>照片</label>
                        <div id="coverImg" class="uploda-div" data-id="155">
                            <div style="padding-top: 20%;">
                                <img src="../static/images/jia.png">
                                <p>上传照片</p>
                            </div>
                        </div>
                        <p>格式：jpg/png, 尺寸(560*420px)以上</p>
                        <p style="color: red; display: none">请上传图片</p>
                    </div>

            </div>
        </div>
        <div>
            <h2>联系方式</h2>
            <div>
                <ul class="clear">
                    <li>
                        <label><em>*</em>手机号</label>
                        <input type="text" name="phone" id="phone" value="" data-id="152">
                    </li>
                    <li>
                        <label><em>*</em>电子邮箱</label>
                        <input  type="text" name="email" id="email" value="" data-id="59">
                    </li>
                    <li>
                        <label><em>*</em>详细地址</label>
                        <input  type="text" name="address" id="address" value="" data-id="54">
                    </li>
                    <li>
                        <label><em>*</em>邮编</label>
                        <input  type="text" name="code" id="code" value="" data-id="56">
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <div id="errors" style="padding-bottom: 5px;color: red;line-height: 20px;"></div>
            <input type="button" name="" id="on_submit" value="提交">
        </div>
    </div>
</form>
