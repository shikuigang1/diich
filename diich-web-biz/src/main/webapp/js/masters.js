var current_master = null;
var aliyun_img_uri = 'http://diich-resource.oss-cn-beijing.aliyuncs.com/image/20masterImage/';

$(function () {
    buildMasterUi();

    addLiListener();
});

function buildMasterUi() {
    var $container = $('.master_avatar');

    for(var i = 0; i < masters.length; i ++) {
        buildTemplate($container, masters[i]);
    }
}


function buildTemplate($container, master) {
    var $li = $('<li></li>');
    $li.attr('data-no', master.no);
    var $img = $('<img />');
    $img.attr('src', aliyun_img_uri + master.photo.split(',')[0]);

    var $div = $('<div></div>');
    $div.addClass('mask');
    var $h4 = $('<h4></h4>');
    $h4.text(master.name);
    $div.append($h4);

    var title_omit = master.title;
    if(title_omit.length > 15) {
        title_omit = title_omit.substring(0, 15) + '...';
    }
    var $p = ('<p>' + title_omit + '</p>');
    $div.append($p);

    $li.append($img);
    $li.append($div);

    $container.append($li);
}

function buildItemUi(master) {
    var $item = $('.master_page .rbox .item');

    $item.find('h1').text(master.name);

    if(master.skill != null) {
        $item.find('.cate').show();
        $item.find('.cate').text(master.skill);
    } else {
        $item.find('.cate').text("");
    }

    $item.find('h4').text(master.title);

    $item.find('.context p').text(master.outline);

    var imgs = $item.find('.bottom .imgs img');
    for(var i = 0; i < imgs.length; i ++) {
        $(imgs[i]).attr('src', aliyun_img_uri + master.worksPic.split(',')[i] + '?x-oss-process=style/masters-works-img');
    }
}

function addLiListener() {
    var $li = $('.master_avatar li');
    var $default = $('.master_page .rbox .default');
    var $item = $('.master_page .rbox .item');

    $li.hover(
        function() {
            $default.hide();
            $item.show();

            $li.off('click');

            if(current_master != null) {
                $(this).parent().find('.active img').attr('src', aliyun_img_uri + current_master.photo.split(',')[0]);
            }

            var data_no = $(this).attr('data-no');
            var master = null;
            for(var i = 0; i < masters.length; i ++) {
                if(masters[i].no == data_no) {
                    master = masters[i];
                    break;
                }
            }

            $(this).find('img').attr('src', aliyun_img_uri + master.photo.split(',')[1]);
            $(this).addClass('active').siblings('li').removeClass('active');

            current_master = master;
            buildItemUi(master);
        }
    );
}