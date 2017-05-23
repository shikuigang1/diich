<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>项目详情页</title>
    <link rel="stylesheet" href="assets/css/common.css">
    <link rel="stylesheet" href="assets/css/layout.css">
    <script src="./assets/js/jquery-2.2.4.min.js"></script>
    <script src="./assets/js/system.js"></script>
</head>

<body>
<div class="container">
    <div class="header header_detail">
        <div class="content">
            <a class="logo" href=""></a>
            <div class="nav">
                <a class="active" href="">首页</a>
                <a href="">非遗名录</a>
                <a href="">非遗大师</a>
                <a href="">精选内容</a>
                <a href="">非遗咨询</a>
                <a href="">关于我们</a>
                <a href="">我要申报</a>
            </div>
            <div class="info">
                <ul>
                    <li class="login"><a class="active" href=""><i class="icon"></i><em>登录</em></a></li>
                    <li class="language">
                        <a class="zh active" href=""><em>中文</em></a>
                        <a class="en" href=""><em>EN</em></a>
                    </li>
                    <li class="search">
                        <i class="icon"></i>
                    </li>
                </ul>
            </div>
        </div>
        <!--//End content-->
        <div class="drop_menu">
            <div class="content">
                <div class="item">
                    <dl>
                        <dt>口头传说和表述</dt>
                        <dd>
                            <a href="">语言</a>
                            <a href="">文字</a>
                            <a href="">口述</a>
                            <a href="">其他口头传统</a>
                            <a href="">及表述</a>
                        </dd>
                    </dl>
                </div>
                <!--//End-->

                <div class="item">
                    <dl>
                        <dt>表演艺术</dt>
                        <dd>
                            <a href="">音乐演奏</a>
                            <a href="">舞蹈</a>
                            <a href="">民歌</a>
                            <a href="">传统戏剧</a>
                            <a href="">曲艺</a>
                            <a href="">传统体育、游艺与杂技</a>
                            <a href="">其他表演艺术</a>
                        </dd>
                    </dl>
                </div>
                <!--//End-->

                <div class="item">
                    <dl>
                        <dt>社会风俗<br>礼仪、节庆</dt>
                        <dd>
                            <a href="">生产商贸习俗</a>
                            <a href="">生活习俗</a>
                            <a href="">人生仪式</a>
                            <a href="">节日庆典</a>
                            <a href="">其他仪式及庆典</a>
                        </dd>
                    </dl>
                </div>
                <!--//End-->

                <div class="item">
                    <dl>
                        <dt>有关自然界和<br>宇宙的知识和实践</dt>
                        <dd>
                            <a href="">农林牧畜渔</a>
                            <a href="">服装</a>
                            <a href="">食品</a>
                            <a href="">住房与建筑</a>
                            <a href="">交通</a>
                            <a href="">旅行</a>
                            <!--</dd>-->
                            <!--<dd>-->
                            <a href="">医、药</a>
                            <a href="">军事防御</a>
                            <a href="">商贸</a>
                            <a href="">工业、工程</a>
                            <a href="">天文、地理、水文等</a>
                            <a href="">其他自然知识和实践</a>
                        </dd>
                    </dl>
                </div>
                <!--//End-->

                <div class="item">
                    <dl>
                        <dt>传统的手工艺技能</dt>
                        <dd>
                            <a href="">工具及机械制作</a>
                            <a href="">髹饰工艺</a>
                            <a href="">家畜农林产品加工</a>
                            <a href="">织染工艺</a>
                            <a href="">造纸、印刷机装裱</a>
                            <a href="">编扎工艺</a>
                            <a href="">字画工艺</a>
                            <a href="">锻冶工艺</a>
                            <a href="">剪刻工艺</a>

                            <a href="">雕塑工艺</a>
                            <a href="">烧造工艺</a>
                            <a href="">木作工艺</a>
                            <a href="">其他类</a>


                        </dd>
                    </dl>
                </div>


            </div>
        </div>
        <!--//End drop_menu-->
    </div>
    <!--//End header -->

    <div class="bd detail">
        <div class="mainbg">
            <img src="assets/uploads/project_detail_01.png" alt="">
            <span class="play_big"></span>
        </div>
        <!--//End main-->

        <div class="crumbs">
            <span>非遗名录</span>
            <i class="gt"></i>
            <span><a href="#" title="口头传说和表述">口头传说和表述</a></span>
            <i class="gt"></i>

            <#if (obj.contentFragmentList?size>0)>
                    <#list obj.contentFragmentList as cf>
                            <#if cf.attributeId == 4>
                                <#assign proname = cf.content>
                                <span class="last">${cf.content}</span>
                            </#if>
                    </#list>
            </#if>


        </div>
        <!--//End crumbs-->


        <div class="bd project">
            <div class="card">
                <div class="content">
                    <div class="floor">
                        <a class="share" title="分享"></a>
                        <a class="praise active" title="点赞" style="position: relative;"></a>
                        <a class="album"><i class="play_sm"></i>【视频】昆曲传承人讲述昆曲…(2个视频／9张图片)</a>
                        <div class="share_box">
                            <div class="icons">
                                <a href="" class="sina"></a>
                                <a href="" class="facebook"></a>
                                <a href="" class="twitter"></a>
                            </div>
                            <img class="qrcode" src="assets/images/code.png" alt="">
                        </div>
                    </div>
                    <!--//End -->
                    <div class="title">
                        <div class="title_big"><h2>
                        <#if (obj.contentFragmentList?size>0)>
                            <#list obj.contentFragmentList as cf>
                                <#if cf.attributeId == 4>
                                    <span class="last">${cf.content}</span>
                                </#if>
                            </#list>
                        </#if></h2></div>
                        <div class="code">
                            <i class="icon"></i>

                                    <#if (obj.contentFragmentList?size>0)>
                                        <#list obj.contentFragmentList as cf>
                                            <#if cf.attributeId == 2>
                                            <span>标识码：${cf.content}</span><em class="icon"></em>
                                            </#if>
                                        </#list>
                                    </#if>

                            <div class="drop">
                                <img src="assets/images/code.png" alt="">
                            </div>
                        </div>
                    </div>
                    <!--//End title-->

                    <div class="bd subtxt">
                        <span>
                            <#if obj.ichCategory??>
                                <strong>类别：</strong> <em>${obj.ichCategory.name}</em>
                            </#if>
                        </span>
                        <span>
                            <strong>地区：</strong>

                        <#if (obj.contentFragmentList?size>0)>
                            <#list obj.contentFragmentList as cf>
                                <#if cf.attributeId == 33 && cf.content??>
                                    <#assign codeList = cf.content?split(";")>
                                    <#list codeList as s>
                                        <em>${s}</em>
                                            <#if s_index+1 < (codeList?size)>
                                                <i>|</i>
                                            </#if>
                                    </#list>
                                </#if>
                            </#list>
                        </#if>
                        </span>
                    </div>
                    <!--//End-->


                    <div class="bd inheritor">
                        <div class="tname">代表性传承人</div>
                        <ul class="master">
                            <li>
                                <a href="" class="avatar"><img src="assets/uploads/inheritor_01.png" alt=""></a>
                                <span class="txt">
                                <p class="name"><a href="">周雪华</a></p>
                                <p>国家级非遗传承人</p>
                                <p>国家一级演员／著名…</p>
                            </span>
                            </li>
                            <li>
                                <a href="" class="avatar"><img src="assets/uploads/inheritor_02.png" alt=""></a>
                                <span class="txt">
                                <p class="name"><a href="">林为林</a></p>
                                <p>国家级非遗传承人</p>
                                <p>国家一级演员</p>
                            </span>
                            </li>
                            <li>
                                <a href="" class="avatar"><img src="assets/uploads/inheritor_03.png" alt=""></a>
                                <span class="txt">
                                <p class="name"><a href="">张铭荣</a></p>
                                <p>国家级非遗传承人</p>
                                <p>国家一级演员</p>
                            </span>
                            </li>
                            <li class="more">
                                <a href=""><span>其他33人</span><i class="gt_big"></i></a>
                            </li>
                        </ul>
                    </div>
                    <!--//ENd-->

                    <div class="bd batch">
                        <div class="tname">非遗在中国<i></i></div>
                        <div class="subcon">
                            <span>人类非物质文化遗产编号：Ⅳ-1</span>
                            <span>级别：世界级</span>
                            <span>批次：第一批</span>
                        </div>
                    </div>
                    <!--//ENd-->

                </div>
            </div>
            <!--//Ene project-->
        </div>
        <!--//End project-->

        <div class="bd baseinfo">
            <div class="card">
                <div class="content">
                    <div class="bd title_big">
                        <h2>基礎信息</h2>
                    </div>
                    <!--//End title_big-->
                    <div class="info">
                        <ul>
                            <li>
                                <span class="key">拼音：</span>
                                <span class="value">Kun Qu</span>
                            </li>
                            <li>
                                <span class="key">民族：</span>
                                <span class="value">汉族</span>
                            </li>
                            <li>
                                <span class="key">外文名：</span>
                                <span class="value">Kun Opera ／ Kunqu Opera</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--//End baseinfo-->

        <#if obj.contentfragmentList?size>0>
        <#list obj.contentfragmentList as c>
            <#if c.dataType == 1>

                <section class="bd floor odd">
                    <div class="card">
                        <header>個人成就</header>
                        <article class="text_img">
                            <div class="side">
                                <div class="item">
                                    <p>${c.content}</p>
                                </div>
                            </div>
                            <div class="media">
                                <ul>
                                    <li>
                                        <img src="assets/uploads/exp1.png" alt="">
                                        <span>昆曲</span>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
                </section>
            </#if>

            <#if c.dataType == 5>

                <section class="bd floor odd">
                    <div class="card">
                        <header>個人成就</header>
                        <article class="text_img">
                            <div class="side">
                                <div class="item">
                                    <p>${c.content}</p>
                                </div>
                            </div>
                            <div class="media">
                                <ul>
                                    <li>
                                        <img src="assets/uploads/exp1.png" alt="">
                                        <span>昆曲</span>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
                </section>
            </#if>


        </#list>

        </#if>

        <section class="bd floor odd">
            <div class="card">
                <header>個人成就</header>
                <article class="text_img">
                    <div class="side">
                        <div class="item">
                            <p>昆曲又称昆腔、昆山腔、昆剧，是元末明初南戏发展到昆山一带，与当地的音乐、歌舞、语言结合而生成的一个新的声腔剧种。明代初年在昆山地区形成了“昆山腔”，嘉靖年间经过魏良辅等人的革新，昆山腔吸收北曲及海盐腔、弋阳腔的长处，形成委婉细腻、流丽悠长的“水磨调”风格，昆曲至此基本成型。梁辰鱼将传奇《浣纱记》以昆曲形式搬上舞台，使原来主要用于清唱的昆曲正式进入戏剧表演领域，进一步扩大了影响。万历年间，昆曲从江浙一带逐渐流播到全国各地。明代天启初年到清代康熙末年的一百多年是昆曲蓬勃兴盛的时期。清代乾隆年以后，昆曲逐渐衰落下去。新中国诞生以来，昆曲艺术出现了转机，国家先后建立了7个有独立建制的专业昆曲院团。目前昆曲主要由专业昆曲院团演出，有关演出活动多集中在江苏、浙江、上海、北京、湖南等地。</p>
                            <p>清末，昆曲就逐渐没落。中华人民共和国成立后，曾得到一度的振兴。近年来，随着传统戏曲演出在城市中的衰微，昆曲正面临着生存的困境，演员和观众队伍不断缩减。昆曲要生存发展，有许多迫在眉睫的问题亟待解决。昆曲要生存发展，有许多迫在眉睫的问题亟待解决。</p>
                        </div>
                    </div>
                    <div class="media">
                        <ul>
                            <li>
                                <img src="assets/uploads/exp1.png" alt="">
                                <span>昆曲</span>
                            </li>
                        </ul>
                    </div>
                </article>
            </div>
        </section>
        <!--//End brief-->

        <section class="bd floor even">
            <div class="card">
                <header>代表作品<em>共5项</em></header>
                <article class="product_list">
                    <ul>
                        <li>
                            <a href=""><img src="assets/uploads/detail_02.jpg" alt=""></a>
                            <p class="name">《界牌关》选段</p>
                            <p class="master">CCTV1 空中剧院演出 2001年</p>
                        </li>
                        <li>
                            <a href=""><img src="assets/uploads/detail_03.jpg" alt=""></a>
                            <p class="name">《界牌关》选段</p>
                            <p class="master">CCTV1 空中剧院演出 2001年</p>
                        </li>
                        <li>
                            <a href=""><img src="assets/uploads/detail_04.jpg" alt=""></a>
                            <p class="name">《界牌关》选段</p>
                            <p class="master">CCTV1 空中剧院演出 2001年</p>
                        </li>
                        <li>
                            <a href=""><img src="assets/uploads/detail_05.jpg" alt=""></a>
                            <p class="name">《界牌关》选段</p>
                            <p class="master">CCTV1 空中剧院演出 2001年</p>
                        </li>
                        <li>
                            <a href=""><img src="assets/uploads/detail_02.jpg" alt=""></a>
                            <p class="name">《界牌关》选段</p>
                            <p class="master">CCTV1 空中剧院演出 2001年</p>
                        </li>
                    </ul>
                    <div class="page"></div>
                </article>
            </div>
        </section>
        <!--//End product_list-->

        <section class="bd floor odd">
            <div class="card">
                <header>历史渊源</header>
                <article class="text_img">
                    <div class="side">
                        <p>1917年以来，京剧优秀演员大量涌现，呈现出流派纷呈的繁盛局面，由成熟期发展到鼎盛期，这一时期的代表人物为杨小楼、梅兰芳、余叔岩。</p>
                        <p>
                            1927年，北京《顺天吋报》举办京剧旦角名伶评选。读者投票选举结果:梅兰芳以演《太真外传》，尚小云以演《摩登伽女》，程砚秋以演《红拂传》，荀慧生以演《丹青引》，荣获“四大名旦”。“四大名旦”脱颖而出，是京剧走向鼎盛的重要标志。他们创造出各具特色的艺术风格，形成了梅兰芳的端庄典雅，尚小云的俏丽刚健，程砚秋的深沉委婉，荀慧生的娇昵柔媚“四大流派”，开创了京剧舞台上以旦为主的格局。武生杨小楼在继俞菊笙、杨月楼之后，将京剧武生表演艺术发展到新高度，被誉为“国剧宗师”、“武生泰斗”。老生中的余叔岩、高庆奎、言菊朋、马连良，20年代时称“四大须生”。同期的时慧宝、王凤卿、贯大元等也是生行中的优秀人才。30年代末、余、言、高先后退出舞台，马连良与谭富英、奚啸伯、杨宝森称之“四大须生”。女须生孟小冬，具有较高艺术造诣，颇有乃师余叔岩的艺术风范。</p>
                        <p>
                            1936年秋，北京大、中学校爱好京剧者及广大观众给各报写信，倡议进行京剧童伶选举。时富连成社社长叶龙章与北平《立言报》社长金达志商妥，由该报发表通告，专门接待各界投票，逐日在报上发表投票数字，并约请“韵石社”几人来报社监督。规定投票日期为半月，到期查点票数中华戏曲学校和富连成社负责人及《实报》、《实事白话报》、《北京晚报》、《戏剧报》亦派人当场查验票数。选举结果，富连成社李世芳得票约万张，当选“童伶主席”。生部冠军王金璐，亚军叶世长；旦角冠军毛世来，亚军宋德珠；净角冠军裘世戎，亚军赵德钰；丑角冠军詹世甫，亚军殷金振。选举结束后，于虎坊桥富连成社举行庆祝大会，并于当晚在鲜鱼口内华乐戏院举行加冕典礼，由李世芳，袁世海演出了《霸王别姬》。</p>
                        <p>童伶选举结束后，仍由《立言报》主持，选出李世芳、张君秋、毛世来、宋德珠为“四小名旦”，“四小名旦”联抉于长安、新新两家戏院演出了《白蛇传》和《四五花洞》，以示祝贺。</p>
                    </div>
                    <div class="media">
                        <ul>
                            <li>
                                <div class="card_video">
                                    <div class="time">30:24</div>
                                    <div class="play"></div>
                                    <video poster="assets/uploads/exp2.png">
                                        <source style="width: 100%;" src="assets/uploads/video.mp4" type="video/mp4">
                                    </video>
                                </div>
                                <span>鼓锣</span>
                            </li>
                            <li>
                                <img src="assets/uploads/exp3.png" alt="">
                                <span>建国后昆剧界的杰出代表人物之一周传瑛</span>
                            </li>
                        </ul>
                        <div class="more">
                            <a href="">查看完整图集<i class="arrow_right"></i></a>
                        </div>
                    </div>
                </article>
            </div>
        </section>
        <!--//End 历史渊源-->

        <section class="bd floor even">
            <div class="card">
                <header>重要價值</header>
                <article class="text_content">
                    <p>傅谨：京剧是中国文化传统的重要表征之一。它是“地方戏时代”i出现的最重要的剧种，是雅文化在中国文化整体中渐趋 衰落的时代变革的产物。</p>
                    <p>让·热内：京剧的主题、结构、表现手法之精妙绝顶。</p>
                    <p>爱德华·戈登·克雷：中国京剧已经比西方任何其他戏剧更加成为一种独立而优秀的艺术形式。</p>
                </article>
            </div>
        </section>
        <!--//End 价值-->

        <section class="bd floor odd">
            <div class="card">
                <header>影响</header>
                <article class="plain_text">
                    <ul>
                        <li>
                            <p>京剧曾称平剧，中国五大戏曲剧种之一，腔调以西皮、二黄为主，用胡琴和锣鼓等伴奏，被视为中国国粹，中国戏曲三鼎甲“榜首”。</p>
                            <p>徽剧是京剧的前身。清代乾隆五十五年（1790年）起，原在南方演出的三庆、四喜、春台、和春， 四大徽班陆续进入北京，他们与来自湖北的汉调艺人合</p>
                        </li>
                        <li>
                            <p>作，同时又接受了昆曲、秦腔的部分剧目、曲调和表演方法，民间曲调，通过不断的交流、融合，最终形成京剧。京剧形成后在清朝宫廷内开始快速发展，直至共国得到空前的繁荣。</p>
                            <p>京剧走遍世界各地，成为介绍、传播中国传统艺术文化的重要媒介。分布地以北京为中心，遍及中国。</p>
                        </li>
                        <li>
                            <p>统艺术文化的重要媒介。分布地以北京为中心，遍及中国。在2010年11月16日，京剧被列入“人类非物质文化遗产代表作名录”。</p>
                        </li>
                    </ul>
                </article>
            </div>
        </section>
        <!--//ENd-->
    </div>
    <!--//End detail -->

    <div class="bd footer">
        <div class="diich">
            <p class="name">非遺國際 DIICH</p>
            <p class="subname">2017 © FeiYi. All rights<br> reserved</p>
        </div>
        <div class="msg mese">Mese Selimovica, 52<br>78000, Banja Luka BiH</div>
        <div class="msg phone">+387 065 252 552<br>email@example.com</div>
        <div class="share">
            <a href="" class="facebook" title="facebook"></a>
            <a href="" class="twitter" title="twitter"></a>
            <a href="" class="instagram" title="instagram"></a>
            <a href="" class="linkedin" title="linkedin"></a>
        </div>
    </div>
    <!--//End--footer-->

    <div class="side_fixed">
        <ul>
            <li class="active">
                <span>簡介</span>
                <strong>01</strong>
            </li>
            <li>
                <span>代表性作品</span>
                <strong>02</strong>
            </li>
            <li>
                <span>历史渊源</span>
                <strong>03</strong>
            </li>
            <li>
                <span>重要價值</span>
                <strong>04</strong>
            </li>
            <li>
                <span>影响</span>
                <strong>05</strong>
            </li>
        </ul>
        <a class="gotop" href="javascript:void(0)" title="返回顶部"></a>
    </div>
    <!--//End 右侧悬浮-->



</div>
</body>
</html>