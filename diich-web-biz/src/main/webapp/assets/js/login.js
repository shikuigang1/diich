//登录注册
var loginPage = {
    init: function () {
        //去除表单最后一组的下边距
        this.show();
    },
    show: function () {//点击展示
        var _this = this;
        var el = $('.header .content .info li.login');
        el.on('click', function () {
            var lang = localStorage.getItem("language");
            if(lang == null){
                lang = (navigator.systemLanguage?navigator.systemLanguage:navigator.language);
            }
           if(lang == 'zh-CN'){
               _this.template();
           }else{
               _this.templateEn();
           }

            _this.close();
            _this.code();
            _this.tabItem();
        });
    },
    code: function () { //验证码
        var _form = $('.form_area');null
        var _span = _form.find('.code span');
        var _oldSpan = _span.text();
        var time = 60;
        _span.on('click', function () {
            var _this = $(this);

            $.ajax({
                cache: true,
                type: "POST",
                url: "/user/getVerifycode",
                data: {phone:$("#phone").val()},
                dataType: "json",
                async: true,
                error: function(request) {

                },
                success: function(res) {
                    alert(JSON.stringify(res));
                }

            });


            if (!_this.hasClass('active')) {
                _this.addClass('active').text(time + 's后重新发送');
                var timer = setInterval(function () {
                    time--;
                    _this.text(time + 's后重新发送');

                    if (time == 0) {
                        clearInterval(timer);
                        time = 60;
                        _this.removeClass('active').text(_oldSpan);
                    }
                }, 1000);
            }

        });
    },
    close: function () {//移出弹层
        var boxLayer = $('.box_layer');
        boxLayer.on('click', '.close, .overbg0', function () {
            boxLayer.fadeOut(100).remove();
        });
    },
    tabItem: function () {
        var boxLayer = $('.box_layer');
        var item = boxLayer.find('.item');
        var login = boxLayer.find('.login');
        var register = boxLayer.find('.register');
        var reset = boxLayer.find('.reset');
        $('.js-to-reset').on('click', function () {
            item.hide();
            reset.show();
        });
        $('.js-to-login').on('click', function () {
            item.hide();
            login.show();
        });
        $('.js-to-register').on('click', function () {
            item.hide();
            register.show();
        });
    },
    template: function () {
        var html = `<div class="box_layer">
                    <div class="item login" style="display: block;">
                        <form class="form_area" action="">
                            <div class="title" >登录<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span id="nickname">昵&nbsp;&nbsp;称</span></div>
                                <div class="area">
                                    <input class="ipt" id="loginName" name="loginName" type="text" placeholder="请输入昵称">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>密&nbsp;&nbsp;码</span></div>
                                <div class="area">
                                    <input class="ipt" id="password" type="text" name="password" placeholder="请输入密码">
                                    <a class="forget js-to-reset" href="javascript:;">忘记登录密码</a>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="button" value="登录" onclick="login()">
                                    <a class="arrow_right js-to-register" href="javascript:;">暂无账号，去注册</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 登录-->
                    <div class="item register" style="display: none;">
                        <form action="" class="form_area">
                            <div class="title">注册<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span>昵称</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" name="loginName" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>手机号</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" id="phone" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>验证码</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="" id="code" name="code" maxlength="10">
                                    <div class="code">
                                        <span>获取验证码</span>
                                    </div>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>密码</span></div>
                                <div class="area">
                                    <input type="password"  id="password" name="password" class="ipt" value="">
                                </div>
                            </div>
                
                            <div class="group policy">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <label for="policy"><input id="policy" type="checkbox">我已仔细阅读并同意《法律声明及隐私权政策》</label>
                                </div>
                            </div>
                            <div class="group" style="margin-bottom: 0">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="submit" value="注册">
                                    <a class="arrow_right js-to-login" href="javascript:;">已有账号，去登录</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 注册-->
                    <div class="item reset" style="display: none;">
                        <form action="" class="form_area">
                            <div class="title">重置密码<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span>手机号</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>验证码</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="" maxlength="10">
                                    <div class="code">
                                        <span>获取验证码</span>
                                    </div>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>新密码</span></div>
                                <div class="area">
                                    <input type="password" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group" style="margin-top:50px;margin-bottom: 0;">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="submit" value="确认">
                                    <a class="arrow_right js-to-login" href="javascript:;">去登录</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 重置密码-->
                
                
                    <div class="overbg0" style="z-index:11;"></div>
                </div>`;

        $('body').append(html);
    },
    templateEn:function () {
        var html = `<div class="box_layer">
                    <div class="item login" style="display: block;">
                        <form class="form_area" action="">
                            <div class="title">Sign in<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span style="font-size:16px;">Name</span></div>
                                <div class="area">
                                    <input class="ipt" name="loginName" id="loginName" type="text" placeholder="Please enter your nickname">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span style="font-size:16px;">Password</span></div>
                                <div class="area">
                                    <input class="ipt" type="text" name="password" placeholder="Please input a password">
                                    <a class="forget js-to-reset" href="javascript:;">Forgot login password</a>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="button" value="Sign in" onclick="login()">
                                    <a class="arrow_right js-to-register" href="javascript:;">No account to register</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 登录-->
                    <div class="item register" style="display: none;">
                        <form action="" class="form_area">
                            <div class="title">register<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span style="font-size:16px;">Name</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span style="font-size:16px;">Phone</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span style="font-size:16px;">Verification</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="" maxlength="10">
                                    <div class="code">
                                        <span style="font-size:16px;">Get validation code</span>
                                    </div>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span style="font-size:16px;">Password</span></div>
                                <div class="area">
                                    <input type="password" class="ipt" value="">
                                </div>
                            </div>
                
                            <div class="group policy">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <label for="policy"><input id="policy" type="checkbox">I have read and agreed to the legal declaration and privacy policy</label>
                                </div>
                            </div>
                            <div class="group" style="margin-bottom: 0">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="submit" value="register">
                                    <a class="arrow_right js-to-login" href="javascript:;" style="font-size:16px;">Have an account to log on</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 注册-->
                    <div class="item reset" style="display: none;">
                        <form action="" class="form_area">
                            <div class="title">reset password<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span style="font-size:16px;">Phone</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span style="font-size:16px;">Verification</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="" maxlength="10">
                                    <div class="code">
                                        <span style="font-size:16px;">Get validation code</span>
                                    </div>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span style="font-size:16px;">Password</span></div>
                                <div class="area">
                                    <input type="password" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group" style="margin-top:50px;margin-bottom: 0;">
                                <div class="name" style="font-size:16px;">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="submit" value="confirm">
                                    <a class="arrow_right js-to-login" href="javascript:;">Log in</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 重置密码-->
                
                
                    <div class="overbg0" style="z-index:11;"></div>
                </div>`;
        $('body').append(html);
    }
};


$(function () {
    //判断当前用户是否登录
    $.ajax({
        cache: true,
        type: "POST",
        url: "/user/userinfo",
        dataType: "json",
        async: true,
        error: function(request) {
            //alert("Connection error");
        },
        success: function(data) {
            if(data.code==2){
                alert("用户名 密码错误!");
            }else{
                $('.box_layer').hide();
            }
            //隐藏 显示数据
            if(typeof (data.data)!='undefined'){
                $(".login").hide();
                $(".logined").show();
                //根据当前 语言环境判断
                var lang = localStorage.getItem("language");
                if(lang=='zh-CN'){
                    $(".logined").find('a').text("你好，"+data.data.name);
                }else{
                    $(".logined").find('a').text("hello，"+data.data.name);
                }
            }else{
                $(".login").show();
                $(".logined").hide();
            }
        }
    });

    loginPage.init();

    //window.sessionStorage.setItem();
});

function login(){

    $.ajax({
        cache: true,
        type: "POST",
        url: "/user/login",
        data: $('.form_area').serialize(), // 你的formid
        dataType: "json",
        async: true,
        error: function(request) {
            //alert("Connection error");
        },
        success: function(data) {

            if(data.code==2){
                alert("用户名 密码错误!");
            }else{
                $('.box_layer').hide();
                $(".login").hide();
                $(".logined").show();
                //根据当前 语言环境判断   默认显示英文
                var lang = localStorage.getItem("language");
                if(lang=='zh-CN'){
                    $(".logined").find('a').text("你好，"+$("#loginName").val());
                }else{
                    $(".logined").find('a').text("hello，"+$("#loginName").val());
                }
            }

        }
    });
}

//手动提交表单
function submitForm(){

    $.ajax({
        cache: true,
        type: "POST",
        url: "/user/register",
        data: $('#form').serialize(),
        dataType: "json",
        async: true,
        scriptCharset: 'utf-8',
        error: function(ajaxobj) {
            alert(ajaxobj.responseText);
        },
        success: function(res) {
            if(rea.code==0){
                location.href="../page/index.html";
            }else{
                //alert("参数错误");
            }
        }

    });

}
