/**
 * Created by Administrator on 2017/8/3.
 */

var project = null;
var attributes = null;
var edit_main_info_tmp;
var edit_image_text_tmp;

var base_url = '..';

$(function() {
    init();
});

var edit_project_tmp = '<div class="edit-project-tool-bar">' +
    '<div class="inner">' +
    '<button class="ui save button">暂存</button>' +
    '<button class="ui add button">新增项</button>' +
    '<button class="ui submit primary button">提交</button>' +
    '<button class="ui abandon red button">放弃</button>' +
    '</div>' +
    '<div>';

var edit_short_text_tmp =
    '<div class="group">' +
    '<label class="label"><em>*</em></label> ' +
    '<div class="control"> <input type="text" class="ipt w562 data-item"> ' +
    '<div class="errors" style="display: none"><i></i>请填入正确格式的拼音且长度在1-50之间</div> ' +
    '</div> ' +
    '</div>';

var custom_image_text_tmp = '<section  name="custom" id="custom" class="bd floor odd" data-type="image-text"> ' +
    '<div class="card"> ' +
    '<header class="title handle-button"><h4></h4> ' +
    '<input type="text" placeholder="请输入标题" style="font-size: 24px;"/> ' +
    '<span class="edit link" style="display: none;">编辑</span><span class="save link">保存</span>' +
    '</header> ' +
    '</div> ' +
    '</section>';

var custom_show_tmp = ' <article class="text_img read-piece"> <div class="side"> <div class="item"> ' +
    '<p class="data-item" data-id="35"> </p> </div> </div> <div class="media"> <ul> <li> ' +
    /*'<img src="http://resource.efeiyi.com/image/project/10178-BIG.jpg"> ' +*/
    '</li> </ul><div class="more"></div> </div> </article>';

var to_image_text_tmp = '<div class="side" style="margin-right:30px;"> ' +
    '<div class="item"> ' +
    '<p class="data-item" data-id="35"> <p>dsfdsfe&lt;/p> </p> ' +
    '</div> </div> ' +
    '<div class="media"> <ul> <li> <img src="" alt="" class="data-item" data-id="35"> </li> </ul> </div>';

function init() {
    $('.edit.link').on('click', function() {
        var projectId = $(this).attr('project-id');
        if(projectId == null) {
            alert('获取项目信息失败');
            return;
        }
        loadProjectFromServer(projectId);
    });
}

function loadProjectFromServer(projectId) {
    $.ajax({
        type: 'get',
        url: base_url + '/ichProject/getIchProjectById?params=' + projectId,
        async: false,
        xhrFields:{
            withCredentials:true
        },
        success: function (data) {
            if(data == null || data.code == 3) {
                alert('您还没有登录，请登录后操作！');
                return;
            }
            project = data.data;
            loadAttributesFromServer();
            displayEditMode();
        },
        error: function () {
            alert('数据载入错误');
        }
    });
}

function loadAttributesFromServer() {

    if(project == null || project.id == null) {
        return;
    }

    if(project.ichCategoryId == null) {
        attributes = [];

        var contentFragmentList = project.contentFragmentList;
        for(var i = 0; i < contentFragmentList.length; i++) {
            var contentFragment = contentFragmentList[i];
            attributes.push(contentFragment.attribute);
        }
        return;
    }

    var url = base_url + '/ichCategory/getAttributeListByCatIdAndProId?proId=' +
        project.id + '&categoryId' + project.ichCategoryId;

    $.ajax({
        type: 'post',
        url: url,
        success: function (data) {
            if(data == null || data.code == 3) {
                return;
            }
            attributes = data.data;
        },
        error: function () {
            alert('载入数据错误');
        }
    });
}

function displayEditMode() {
    var $edit_project_tool_bar = $(edit_project_tmp);
    $('.header.header_detail').after($edit_project_tool_bar);
    $('.header.header_detail').hide();
    $('.edit.link').hide();
    var $edit_link = $('<span class="edit link">编辑</span>');
    $('.handle-button').append($edit_link);

    $('.abandon.button').on('click', function () {
        displayReadMode();
    });

    $('.save.button').on('click', function () {
        alert('暂存功能马上上线，敬请期待！');
    });

    $('.submit.button').on('click', function () {
        if(project == null) {
            return;
        }

        var params = JSON.stringify(project);

        $.ajax({
            type: 'post',
            url: base_url + '/ichProject/saveIchProject',
            data: {'params': params},
            /*xhrFields:{
                withCredentials:true
            },*/
            success: function (data) {
                if(data.code == 0) {
                    alert('提交成功！通过审核后，会及时通知你呦！');
                }
                displayReadMode();
            },
            error: function () {
                alert('error');
            }
        });
    });

    var has_edit = false;
    $('.edit.link').on('click', function () {
        if(has_edit == true) {
            alert('已经有模块处于编辑状态，请关闭后再进行此操作。');
            return;
        }

        has_edit = true;

        var $section = getSection(this);

        var data_type = $section.attr('data-type');

        if(data_type == 'main-text') {
            eidtMainInfoUi($section);
        } else if(data_type == 'short-text') {
            editShortTextUi($section);
        } else if(data_type == 'image-text') {
            editImageTextUi($section);
        }

        //编辑或保存按钮处理
        $(this).hide();
        $(this).parent().children('.save').remove();
        var $save_link = $('<span class="save link">保存</span>');
        $(this).parent().append($save_link);

        $save_link.on('click', function () {
            saveProjectToClient($section)
            showProjectUi($section);

            if(data_type == 'main-text') {
                $section.find('.read-piece').show();
                $(this).hide();
                $save_link.parent().find('.edit').show();
                $section.find('form').remove();
            }  else if(data_type == 'short-text') {
                $section.find('.read-piece').show();
                $(this).hide();
                $save_link.parent().find('.edit').show();
                $section.find('form').remove();
            } else if(data_type == 'image-text') {
                var editor_id = $section.find('.editor').attr('id');
                UE.getEditor(editor_id).destroy();
                $section.find('.image-text').remove();

                $section.find('article').show();
                $(this).hide();
                $save_link.parent().find('.edit').show();
            }
            has_edit = false;
        });

    });
    
    $('a.albums').hide();
    $('a.share').hide();
    $('a.praise').hide();
    
    $('.add.button').on('click', function () {
        if(has_edit == true) {
            alert('已经有模块处于编辑状态，请关闭后再进行此操作。');
            return;
        }

        has_edit = true;

        var $ui = $(custom_image_text_tmp);
        var $last = $('.bd.detail').find('section') != null ? $('.bd.detail').find('section').last() : null;
        if($last != null && $last.hasClass('odd')) {
            $ui.removeClass('odd').addClass('even');
        }

        $ui.find('.card').append(edit_image_text_tmp);
        $('.bd.detail').append($ui);

        var rand_id = generateMathRand(8);
        $ui.find('.editor').attr('id', rand_id);
        var editor = UE.getEditor(rand_id);

        var top = $('#custom').offset().top;
        $('html, body').animate({
            scrollTop: top
        }, 500);

        var resourceList_tmp = [];
        $ui.find('.save.link').on('click', function () {
            var title = $ui.find('.title input').val();
            var content = editor.getContent();
            if(title == '') {
                alert('标题不能为空');
                return;
            } else if(content == '') {
                alert('内容不能为空');
                return;
            }

            var contentFragmentList = project.contentFragmentList;
            for(var i = 0; i < contentFragmentList.length; i++) {
                var attr = contentFragmentList[i].attribute;
                if(attr != null && attr.cnName == title) {
                    contentFragmentList[i].content = content;
                    return;
                }
            }

            var contentFragment = {};
            var attribute = {};
            attribute.cnName = title;
            attribute.dataType = 5;
            attribute.ichCategoryId = 0;
            contentFragment.content = content;
            contentFragment.targetType = 0;
            contentFragment.attribute = attribute;
            if(resourceList_tmp.length > 0) {
                contentFragment.resourceList = resourceList_tmp;
            }
            contentFragmentList.push(contentFragment);

            $ui.find('.title input').hide();
            $ui.find('h4').text(title);

            var $custom_ui = $(custom_show_tmp);
            if(resourceList_tmp.length > 0) {
                var $custom_img = $custom_ui.find('.media li');
                if($custom_img != null) {
                    $custom_img.append($('<img src="http://resource.efeiyi.com/image/project/'+ resourceList_tmp[0].uri +'"/>'));
                }
            }

            $ui.find('.image-text').hide();
            $ui.find('.card').append($custom_ui);
            $ui.find('.read-piece p').html(content);

            $ui.find('.save.link').hide();
            $ui.find('.edit.link').show();

            $ui.removeClass('custom');
            $ui.removeAttr('id');
            has_edit = false;
        });

        $ui.find('.edit.link').on('click', function(){
            /*$ui.find('h4').hide();
            $ui.find('.title input').show();

            $ui.find('.image-text').show();
            $ui.find('.read-piece').hide();

            $ui.find('.save.link').show();
            $ui.find('.edit.link').hide();
            has_edit = true;*/

            alert('自定义项编辑功能马上上线，敬请期待！');
        });

        var file_id = generateMathRand(8);
        var $fileElement = $ui.find('input.image');
        $fileElement.attr('id', file_id);
        $fileElement.attr('name', file_id);
        $fileElement.on('change', function () {
            uploadFile(file_id, uploadFileCallBack);
        });

        function uploadFileCallBack(data) {
            var arr = data.data;

            for(var i = 0; i < arr.length; i ++) {
                var $img = $('<img />');
                $img.attr('src', arr[i] + '?x-oss-process=style/temporary-preview');
                var uri_str = arr[i];
                uri_str = uri_str.substring(uri_str.lastIndexOf('/') + 1, uri_str.length);
                $ui.find('.image-container').append($img);

                /*var contentFragmentList = project.contentFragmentList;
                for(var i = 0; i < contentFragmentList.length; i++) {
                    var contentFragment = contentFragmentList[i];
                    if(contentFragment.attributeId == data_id) {
                        var resource = {};
                        resource.status = 0;
                        resource.type = 0;
                        resource.uri = uri_str;
                        resource.description = '';

                        contentFragment.resourceList.push(resource);
                    }
                }*/

                var resource = {};
                resource.status = 0;
                resource.type = 0;
                resource.uri = uri_str;
                resource.description = '';
                resourceList_tmp.push(resource);
            }

            $ui.find('input.image').replaceWith('<input class="file image" ' +
                'name="'+file_id+'" type="file" id="'+file_id+'" />');
            $ui.find('input.image').on('change', function () {
                uploadFile(file_id, uploadFileCallBack);
            });

        }
    });

    getTemplateUi('../page/editTemplate/proMainInfo.html', initMainInfoTemplate);
    getTemplateUi('../page/editTemplate/proImageText.html', initImageTextTemplate);
}

function displayReadMode() {
    window.location.reload();
    /*$('.edit-project-tool-bar').remove();
    $('.header.header_detail').show();
    $('.primary.edit.link').show();
    $('.title>.edit.link').remove();*/
}

function getSection(edit_link) {
    var parent = $(edit_link).parent();
    while(!parent.is('section') && !parent.is('.section')) {
        parent = parent.parent();
    }
    return parent;
}

function eidtMainInfoUi($section) {
    $section.find('.read-piece').hide();
    var $edit_main_info_tmp = $(edit_main_info_tmp);
    $section.append($edit_main_info_tmp);

    addMainInfoCompListener($section);

    buildOneComboUi(dic_arr_city, $('#area_temp').parent().parent().find('.item'));
    buildOneComboUi(category_all, $('#category_temp').parent().parent().find('.item'));

    if(project == null) {
        return;
    }
    var contentFragmentList = project.contentFragmentList;
    var resourceList = [];

    var aim_arr = $edit_main_info_tmp.find('.data-item');

    for(var i = 0; i < aim_arr.length; i++) {
        var $a_item = $(aim_arr[i]);
        for(var j = 0; j < contentFragmentList.length; j++) {
            var contentFragment = contentFragmentList[j];

            if(contentFragment.attributeId == 1) {
                resourceList = contentFragment.resourceList;
                continue;
            }

            if($(aim_arr[i]).hasClass('category')) {
                var category_id = project.ichCategoryId != null ? project.ichCategoryId : '';
                $a_item.attr('data-value', category_id);
                $a_item.text(getCategoryTextById(category_id));
                break;
            } else if(contentFragment.attributeId == $a_item.attr('data-id')) {
                var value = contentFragment.content;

                value = value != null ? value.trim() : '';

                if($a_item.is('input[type="text"]') || $a_item.is('select')) {
                    $a_item.val(value);
                } else if($a_item.attr('data-id') == '33') {
                    $a_item.attr('data-value', value);
                    $a_item.text(getSingleCityText(value, dic_arr_city));
                } else {
                    $a_item.text(value);
                }
                break;
            }
        }
    }

    if(resourceList != null && resourceList.length > 0) {
        $section.find('.file_up').find('img') != null ?
            $section.find('.file_up').find('img').remove() : null;

        var resource = resourceList[0];
        var $img = $('<img class="preview" style="display: inline;z-index: 0;">');
        $img.attr('src', 'http://diich-resource.oss-cn-beijing.aliyuncs.com/image/project/' + resource.uri);
        $section.find('.file_up').append($img);
    }
}

function editShortTextUi($section) {
    $section.find('.read-piece').hide();

    var short_text_attrs = [];

    var no_include_ids = [1, 2, 4, 33, 41, 112];

    for(var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];

        if(attr.dataType != 0) {
            continue;
        }

        var mark = false;
        for(var j = 0; j < no_include_ids.length; j++) {
            var no_id = no_include_ids[j];
            if(attr.id == no_id) {
                mark = true;
                break;
            }
        }
        if(!mark) {
            short_text_attrs.push(attr);
        }
    }

    var contentFragmentList = [];
    if(project != null) {
        contentFragmentList = project.contentFragmentList;
    }

    var $form = $('<form class="bd horizontal"></form>');
    for(var i = 0; i < short_text_attrs.length; i++) {
        var $ui = $(edit_short_text_tmp);
        var attr = short_text_attrs[i];
        $ui.find('.label').append(attr.cnName);
        $ui.find('input').attr('data-id', attr.id);

        for(var j = 0; j < contentFragmentList.length; j++) {
            var contentFragment = contentFragmentList[j];
            if(attr.id == contentFragment.attributeId) {
                $ui.find('input').val(contentFragment.content);
            }
        }

        $form.append($ui);
    }

    $section.append($form);
}

function editImageTextUi($section) {
    $section.find('.read-piece').hide();

    var content = '';
    var contentFragmentList = [];
    if(project != null) {
        contentFragmentList = project.contentFragmentList;
    }

    var $item = $section.find('.read-piece p.data-item');
    var data_id;
    if($item != null) {
        data_id = $item.attr('data-id');
    }

    var resourceList = [];
    for(var i = 0; i < contentFragmentList.length; i++) {
        var contentFragment = contentFragmentList[i];
        if(contentFragment.attributeId == data_id) {
            content = contentFragment.content;
            resourceList = contentFragment.resourceList;
            break;
        }
    }

    var $ui = $(edit_image_text_tmp);

    for(var i = 0; i < resourceList.length; i++) {
        var resource = resourceList[i];
        var $img = $('<img />');
        if(resource.uri.indexOf('http') > -1) {
            $img.attr('src', resource.uri + '?x-oss-process=style/temporary-preview');
        } else {
            $img.attr('src', 'http://resource.efeiyi.com/image/project/' + resource.uri + '?x-oss-process=style/temporary-preview');
        }
        $img.attr('file-name', resource.uri);
        $ui.find('.image-container').append($img);
    }

    var rand = generateMathRand(8);
    $ui.find('.editor').attr('id', rand);
    $section.find('.card').append($ui);

    var editor = UE.getEditor(rand);
    editor.ready(function () {
        editor.setContent(content);
    });

    var file_id = generateMathRand(8);
    var $fileElement = $ui.find('input.image');
    $fileElement.attr('id', file_id);
    $fileElement.attr('name', file_id);
    $fileElement.on('change', function () {
        uploadFile(file_id, uploadFileCallBack);
    });

    function uploadFileCallBack(data) {
        var arr = data.data;

        for(var i = 0; i < arr.length; i ++) {
            var $img = $('<img />');
            $img.attr('src', arr[i] + '?x-oss-process=style/temporary-preview');
            var uri_str = arr[i];
            uri_str = uri_str.substring(uri_str.lastIndexOf('/') + 1, uri_str.length);
            $ui.find('.image-container').append($img);

            var contentFragmentList = project.contentFragmentList;
            for(var i = 0; i < contentFragmentList.length; i++) {
                var contentFragment = contentFragmentList[i];
                if(contentFragment.attributeId == data_id) {
                    var resource = {};
                    resource.status = 0;
                    resource.type = 0;
                    resource.uri = uri_str;
                    resource.description = '';

                    contentFragment.resourceList.push(resource);
                }
            }
        }

        $ui.find('input.image').replaceWith('<input class="file image" ' +
            'name="'+file_id+'" type="file" id="'+file_id+'" />');
        $ui.find('input.image').on('change', function () {
            uploadFile(file_id, uploadFileCallBack);
        });

    }
}

function saveProjectToClient($section) {
    if(project == null) {
        project = {};
    }

    if(project.contentFragmentList == null) {
        project.contentFragmentList = [];
    }

    var contentFragmentList = project.contentFragmentList;

    var data_type = $section.attr('data-type');

    var item_arr;
    if(data_type == 'long-text' || data_type == 'image-text') {
        item_arr = $section.find('.editor');
    } else {
        item_arr = $section.find('form .data-item');
    }

    for(var i = 0; i < item_arr.length; i++) {
        var data_value;

        var data_id;
        var editor_id;
        if(data_type == 'image-text') {
            data_id = $section.find('.read-piece .data-item').attr('data-id');
            editor_id = $(item_arr[i]).attr('id');
            data_value = UE.getEditor(editor_id).getContent();
        } else {
            data_id = $(item_arr[i]).attr('data-id');
            if($(item_arr[i]).is('input[type="text"]') || $(item_arr[i]).is('select')) {
                data_value = $(item_arr[i]).val();
            } else {
                data_value = $(item_arr[i]).attr('data-value');
            }
        }

        if(data_value == null || data_value == '') {
            continue;
        }

        if($(item_arr[i]).hasClass('category')) {
            project.ichCategoryId = data_value;
            continue;
        }

        for(var j = 0; j < contentFragmentList.length; j++) {
            var contentFragment = contentFragmentList[j];
            if(contentFragment.attributeId == data_id) {
                contentFragment.content = data_value;
                break;
            }
        }
    }
}

function showProjectUi($section) {
    var item_arr = $section.find('.read-piece .data-item');

    var contentFragmentList = [];
    if(project != null && project.contentFragmentList != null) {
        contentFragmentList = project.contentFragmentList;
    }

    for(var i = 0; i < item_arr.length; i++) {
        var $item = $(item_arr[i]);

        if(item_arr[i].hasAttribute('category-id')) {
            $item.text(getCategoryTextById(project.ichCategoryId));
            continue;
        }

        for(var j = 0; j < contentFragmentList.length; j++) {
            var contentFragment = contentFragmentList[j];

            if($item.attr('data-id') == contentFragment.attributeId) {
                if($section.find('.editor') != null && $section.find('.editor').length > 0) {
                    var editor_id = $section.find('.editor').attr('id');
                    $item.html(UE.getEditor(editor_id).getContent());
                } else if($item.hasClass('dic')) {
                    $item.text(getTextByTypeAndCode($item.attr('dic-type'), contentFragment.content, 'chi'));
                } else {
                    $item.text(contentFragment.content);
                }
                break;
            }

        }
    }
}

function addMainInfoCompListener($section) {
    $('#category_temp').on('click', function () {
        var _this = $(this);
        var $comb = _this.parent().parent().find('.item');
        $comb.css('left', parseInt(_this.position().left) + 'px');
        $comb.animate({height:'toggle'}, 150);
        $comb.siblings('.item').animate({height:'hide'},50);
    });

    $('#area_temp').on('click', function () {
        var _this = $(this);
        var $comb = _this.parent().parent().find('.item');
        $comb.css('left', parseInt(_this.position().left) + 'px');
        $comb.animate({height:'toggle'}, 150);
        $comb.siblings('.item').animate({height:'hide'},50);
    });

    //3.阻止点击自身关闭
    $('#area_temp').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('#category_temp').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('.dropbox .item').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    //4.点击自身之外的地方关闭下拉框
    $(document).on("click", function () {
        $('.dropbox .item').animate({height:'hide'}, 50);
    });

    /*$('.group.inheritor .radio').on('click', function () {
        $(this).addClass('active').siblings('span').removeClass('active');

        var $next = $(this).parent().parent().next();

        if($(this).attr('value') == '1') {
            $next.animate({height:'toggle'}, 100);
        } else {
            $next.animate({height:'hide'}, 100);
        }
    });*/

    var selectList = getDictionaryArrayByType(103,'chi');
    for(var i=0;i<selectList.length;i++) {
        $("#certselect").append("<option value='"+selectList[i].code+"'>"+selectList[i].name+"</option>");
    }

    /*$("#ECalendar_date").ECalendar({
        type:"date",
        skin:2,
        offset:[0,2]
    });*/

    var file_id = generateMathRand(8);
    var $fileElement = $section.find('input[type="file"]');
    $fileElement.attr('id', file_id);
    $fileElement.attr('name', file_id);
    $fileElement.on('change', function () {
        uploadFile(file_id, uploadFileCallBack);
    });

    function uploadFileCallBack(data) {
        var arr = data.data;
        $('#' + file_id).parent().find('img').remove();
        var uri_str;
        for(var i = 0; i < arr.length; i++) {
            var $img = $('<img />');
            $img.attr('src', arr[i]);
            $img.addClass('preview');
            uri_str = arr[i];
            uri_str = uri_str.substring(uri_str.lastIndexOf('/') + 1, uri_str.length);
            $('#' + file_id).parent().append($img);
        }

        var contentFragmentList = project.contentFragmentList;
        var has_head_img = false;
        for(var i = 0; i < contentFragmentList.length; i++) {
            var contentFragment = contentFragmentList[i];
            if(contentFragment.attributeId == 1) {
                var resourceList = contentFragment.resourceList;
                if(resourceList.length == 0) {
                    var resource = {};
                    resource.status = 0;
                    resource.type = 0;
                    resource.uri = uri_str;
                    resourceList.push(resource);
                } else {
                    resourceList[0].uri = uri_str;
                }
                has_head_img = true;
                break;
            }
        }

        if(!has_head_img) {
            var contentFragment = {};
            contentFragment.attributeId = 1;
            contentFragment.targetId = project.id;
            contentFragment.targetType = 0;
            contentFragment.status = 0;

            var resource = {};
            resource.type = 0;
            resource.status = 0;
            resource.uri = uri_str;

            var resourceList = [];
            resourceList.push(resource);

            contentFragment.resourceList = resourceList;

            contentFragmentList.push(contentFragment);
        }

        $('#' + file_id).replaceWith('<input class="file" ' +
            'name="'+file_id+'" type="file" id="'+file_id+'" />');
        $('#' + file_id).on('change', function () {
            uploadFile(file_id, uploadFileCallBack);
        });
    }
}

function buildOneComboUi(data, $ui) {
    if(data == null) {
        return;
    }

    var curr_lang = getCurrentLanguage();

    var $container = $ui.find('.level ul');
    $container.children().remove();

    for(var i = 0; i < data.length; i ++) {
        var $li = $('<li></li>');
        $li.attr('data-id', data[i].code != null ?
            data[i].code : data[i].id);
        if(curr_lang == 'en') {
            $li.text(data[i].eNname);
        } else {
            $li.text(data[i].name);
        }

        $li.hover(function () {
            var li_data_id = $(this).attr('data-id');
            var oneComboChildre = null;

            for(var j = 0; j < data.length; j ++) {
                if(data[j].id == li_data_id || data[j].code == li_data_id) {
                    oneComboChildre = data[j].children;
                    break;
                }
            }

            if(oneComboChildre != null && oneComboChildre.length > 0) {
                buildTwoComboUi(data, li_data_id, $ui);
                $ui.find('.level2').show();
            } else {
                $ui.find('.level2').hide();
            }
        });

        $li.on('click', function(){
            var li_data_id = $(this).attr('data-id');
            var li_name = $(this).text();

            var container_id = $(this).parent().attr('id');
            if(container_id == 'mainCategory') {
                $('#category_temp').attr('data-value', li_data_id);
                $('#category_temp').text(li_name);
            } else if(container_id == 'country') {
                $('#area_temp').attr('data-value', li_data_id);
                $('#area_temp').text(li_name);
            }

            $ui.animate({height:'hide'},50);
        });

        $container.append($li);
    }

}

function buildTwoComboUi(data, data_id, $ui) {
    var $container = $ui.find('.level2 ul');
    $container.children().remove();
    var twoData = [];

    for(var i = 0; i < data.length; i ++) {
        var tmp = data[i].code != null ? data[i].code : data[i].id;

        if(tmp == data_id) {
            twoData = data[i].children;
            break;
        }
    }

    var curr_lang = getCurrentLanguage();

    for(var i = 0; i < twoData.length; i ++) {
        var $li = $('<li></li>');
        $li.attr('data-id', twoData[i].code != null ?
            twoData[i].code : twoData[i].id);

        if(curr_lang == 'en') {
            $li.text(twoData[i].eNname);
        } else {
            $li.text(twoData[i].name);
        }

        $li.on('click', function () {
            var li_data_id = $(this).attr('data-id');
            var li_name = $(this).text();

            var container_id = $(this).parent().attr('id');
            if(container_id == 'catecontent') {
                $('#category_temp').attr('data-value', li_data_id);
                $('#category_temp').text(li_name);
            } else if(container_id == 'citycontent') {
                $('#area_temp').attr('data-value', li_data_id);
                $('#area_temp').text(li_name);
            }

            $ui.animate({height:'hide'},50);
        });

        $container.append($li);
    }
}

function uploadFile(file_id, callback) {
    $.ajaxFileUpload({
        url : '../user/uploadFile?type=project',
        secureuri : false,
        fileElementId : file_id,
        dataType : 'JSON',
        success : function(data) {
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }

            if(data.code != 0) {
                alert(data.msg);
                return;
            }

            callback(data);
        },
        error : function(e) {
            alert('文件上传错误');
        }
    });
}

function initMainInfoTemplate(data) {
    edit_main_info_tmp = data;
}

function initImageTextTemplate(data) {
    edit_image_text_tmp = data;
}