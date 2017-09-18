var project = null;
var attributes = null;

$(function() {
    init();
});

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
        type: 'POST',
        url: base_url + '/ichProject/getIchProjectById?params=' + projectId,
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
        project.id + '&categoryId=' + project.ichCategoryId;

    $.ajax({
        type: 'POST',
        url: url,
        success: function (data) {
            if(data == null || data.code == 3) {
                return;
            }
            attributes = data.data;
        },
        error: function () {

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
        saveProjectToServer(function () {
            alert('数据保存成功！');
            return false;
        });
    });

    $('.submit.button').on('click', function () {
        saveProjectToServer(function () {
            alert('提交成功！通过审核后，会及时通知你呦！');
            return true;
        });
    });

    var has_edit = false;
    $('.edit.link').on('click', function () {
        if(has_edit == true) {
            alert('已经有模块处于编辑状态，请保存后再进行此操作。');
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
            saveProjectToClient($section);
            var item_arr;

            if(data_type == 'main-text') {
                $(this).hide();
                $save_link.parent().find('.edit').show();
                $section.find('form').remove();

                var $show_main_ui = $(show_main_info_template);
                item_arr = $show_main_ui.find('.data-item');
                $section.append($show_main_ui);
                showProjectUi(item_arr);
            }  else if(data_type == 'short-text') {
                $section.find('.read-piece ul li').remove();

                var short_item_arr = $section.find('form .data-item');
                for(var i = 0; i < short_item_arr.length; i++) {
                    var item = short_item_arr[i];
                    var contentFragmentList = project.contentFragmentList;
                    for(var j = 0; j < contentFragmentList.length; j++) {
                        var contentFragment = contentFragmentList[j];
                        var attr = contentFragment.attribute != null ? contentFragment.attribute : {};
                        if($(item).attr('data-id') == contentFragment.attributeId) {
                            var $show_short_text_ui = $(show_short_text_template);
                            $show_short_text_ui.find('.key').text(attr.cnName + ': ');
                            $show_short_text_ui.find('.value').text(contentFragment.content);
                            $section.find('.read-piece ul').append($show_short_text_ui);
                            break;
                        }
                    }
                }

                $section.find('.read-piece').show();
                $(this).hide();
                $save_link.parent().find('.edit').show();
                $section.find('form').remove();
            } else if(data_type == 'image-text') {
                item_arr = $section.find('.read-piece .data-item');
                showProjectUi(item_arr);

                var editor_id = $section.find('.editor').attr('id');
                UE.getEditor(editor_id).destroy();
                $section.find('.image-text').remove();

                $section.find('article').show();
                $(this).hide();
                $save_link.parent().find('.edit').show();

                adjustImageText($section, item_arr);//调整没有图片的图文展示模式
            }

            has_edit = false;
        });

    });
    
    $('a.albums').hide();
    $('a.share').hide();
    $('a.praise').hide();
    
    $('.add.button').on('click', function () {
        if(has_edit == true) {
            alert('已经有模块处于编辑状态，请保存后再进行此操作。');
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
        var editor = UE.getEditor(rand_id, {
            enterTag: 'br'
        });

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
                    alert('标题重复，请更换新标题');
                    return;
                }
            }

            var contentFragment = {};
            var attribute = {};
            attribute.cnName = title;
            attribute.dataType = 5;
            contentFragment.content = content;
            contentFragment.attributeId = 0;
            contentFragment.targetType = 0;
            contentFragment.attribute = attribute;
            if(resourceList_tmp.length > 0) {
                contentFragment.resourceList = resourceList_tmp;
            }
            contentFragmentList.push(contentFragment);

            $ui.find('.title input').hide();
            $ui.find('h4').text(title);

            var $custom_ui = $(custom_show_tmp);
            var $file_con = $custom_ui.find('.media ul');
            for(var i = 0; i < resourceList_tmp.length; i++) {
                var resource_tmp = resourceList_tmp[i];

                var $li = $('<li></li>');
                if(resource_tmp.type == 0) {
                    var $img = $('<img />');
                    $img.attr('src', 'http://resource.efeiyi.com/image/project/' + resource_tmp.uri);
                    $li.append($img);
                } else if(resource_tmp.type == 1) {
                    var $video = $('<video></video>');
                    $video.attr('controls', 'controls');
                    $video.attr('width', '325px');
                    $video.attr('src', 'http://resource.efeiyi.com/video/project/' + resource_tmp.uri);
                    $li.append($video);
                }

                $file_con.append($li);
            }

            $ui.find('.image-text').hide();
            $ui.find('.card').append($custom_ui);
            $ui.find('.item-content').html(content);

            $ui.find('.save.link').hide();
            $ui.find('.edit.link').show();

            $ui.removeClass('custom');
            $ui.removeAttr('id');
            has_edit = false;
        });

        $ui.find('.edit.link').on('click', function(){
            alert('自定义项编辑功能马上上线，敬请期待！');
        });

        $ui.find('.add.file_up').append($(getTemplate()));
        $ui.find('.add.file_up input').change(function () {
            var _this = $(this);
            _this.attr('data-type', _this.parent().parent().attr('data-type'));
            uploadFile(_this, _this.parent(), uploadFileCallBack);
        });

        function uploadFileCallBack(uri, dataType) {
            var file_name = uri.substring(uri.lastIndexOf('/') + 1, uri.length);
            var resource = {};

            var $div = $('<div></div>');
            if(dataType == 'image') {
                resource.type = 0;

                var $img = $('<img />');
                $img.attr('src', uri + '?x-oss-process=style/temporary-preview');
                $img.attr('type', 'new');
                $img.attr('file-name', file_name);
                $img.addClass('file-tag');
                $div.append($img);
                $ui.find('.image-container').append($div);
            } else if(dataType == 'video') {
                resource.type = 1;

                var $video = $('<video></video>');
                $video.attr('controls', 'controls');
                $video.attr('src', uri);
                $video.attr('width', '208px');
                $video.attr('height', '208px');
                $video.attr('type', 'new');
                $video.attr('file-name', file_name);
                $video.addClass('file-tag');
                $div.append($video);
                $ui.find('.image-container').append($div);
            }

            deleteImageUi($ui);

            resource.status = 0;
            resource.uri = file_name;
            resource.description = '';
            resourceList_tmp.push(resource);
        }
    });
}

function displayReadMode() {
    window.location.reload();
}

function getSection(edit_link) {
    var parent = $(edit_link).parent();
    while(!parent.is('section') && !parent.is('.section')) {
        parent = parent.parent();
    }
    return parent;
}

function eidtMainInfoUi($section) {
    $section.find('.read-piece').remove();
    var $edit_main_info_tmp = $(edit_main_info_tmp);
    $section.append($edit_main_info_tmp);

    addMainInfoCompListener($section);

    buildOneComboUi(dic_arr_city, $('#area_temp').parent().parent().find('.item'));
    buildOneComboUi(category_all, $('#category_temp').parent().parent().find('.item'));

    if(project == null) {
        return;
    }
    var contentFragmentList = project.contentFragmentList;

    var aim_arr = $edit_main_info_tmp.find('.data-item');

    for(var i = 0; i < aim_arr.length; i++) {
        var $a_item = $(aim_arr[i]);
        for(var j = 0; j < contentFragmentList.length; j++) {
            var contentFragment = contentFragmentList[j];

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

    var resourceList = [];
    for(var i = 0; i < contentFragmentList.length; i++) {
        var contentFragment = contentFragmentList[i];
        if(contentFragment.attributeId == 1) {
            resourceList = contentFragment.resourceList;
            break;
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

        if(attr == null || attr.dataType != 0) {
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

    var $item = $section.find('.item-content');
    var data_id;
    if($item != null) {
        data_id = $item.attr('data-id');
    }

    var resourceList = [];
    var attr_type = '5';
    for(var i = 0; i < contentFragmentList.length; i++) {
        var contentFragment = contentFragmentList[i];
        if(contentFragment.attributeId == data_id) {
            content = contentFragment.content;
            var attribute = contentFragment.attribute;
            if(attribute != null) {
                attr_type = attribute.dataType;
            }
            if(attr_type == '5') {
                resourceList = contentFragment.resourceList;
            }
            break;
        }
    }

    var $ui = $(edit_image_text_tmp);
    $section.find('.card').append($ui);

    var rand = generateMathRand(8);
    $ui.find('.editor').attr('id', rand);
    var editor = UE.getEditor(rand, {
        enterTag: 'br'
    });

    content = content.replace(/\n/g,"<br/>");

    editor.ready(function () {
        editor.setContent(content);
    });

    if(attr_type != '5') {
        $ui.find('.images').hide();
        $ui.find('.text').css({'width':'100%'});
        return;
    }

    for(var i = 0; i < resourceList.length; i++) {
        var resource = resourceList[i];

        var $div = $('<div></div>');
        if(resource.type == 0) {
            var $img = $('<img />');
            if(resource.uri.indexOf('http') > -1) {
                $img.attr('src', resource.uri + '?x-oss-process=style/temporary-preview');
            } else {
                $img.attr('src', 'http://resource.efeiyi.com/image/project/' + resource.uri + '?x-oss-process=style/temporary-preview');
            }
            $img.attr('file-name', resource.uri);
            $img.attr('resource-id', resource.id);
            $img.addClass('file-tag');
            $div.append($img);
            $ui.find('.image-container').append($div);
        } else if(resource.type == 1) {
            var $video = $('<video></video>');
            $video.attr('controls', 'controls');
            $video.attr('src', 'http://resource.efeiyi.com/video/project/' + resource.uri);
            $video.attr('width', '208px');
            $video.attr('height', '208px');
            $video.attr('file-name', resource.uri);
            $video.attr('resource-id', resource.id);
            $video.addClass('file-tag');
            $div.append($video);
            $ui.find('.image-container').append($div);
        }

        deleteImageUi($ui);
    }

    $ui.find('.add.file_up').append($(getTemplate()));
    $ui.find('.add.file_up input').change(function () {
        var _this = $(this);
        _this.attr('data-type', _this.parent().parent().attr('data-type'));
        uploadFile(_this, _this.parent(), uploadFileCallBack);
    });

    function uploadFileCallBack(uri, dataType) {
        var file_name = uri.substring(uri.lastIndexOf('/') + 1, uri.length);

        var $div = $('<div></div>');
        if(dataType == 'image') {
            var $img = $('<img />');
            $img.attr('src', uri + '?x-oss-process=style/temporary-preview');
            $img.attr('type', 'new');
            $img.attr('file-name', file_name);
            $img.addClass('file-tag');
            $div.append($img);
            $ui.find('.image-container').append($div);
        } else if(dataType == 'video') {
            var $video = $('<video></video>');
            $video.attr('controls', 'controls');
            $video.attr('src', uri);
            $video.attr('width', '208px');
            $video.attr('height', '208px');
            $video.attr('type', 'new');
            $video.attr('file-name', file_name);
            $video.addClass('file-tag');
            $div.append($video);
            $ui.find('.image-container').append($div);
        }

        deleteImageUi($ui);

        var contentFragmentList = project.contentFragmentList;
        for(var i = 0; i < contentFragmentList.length; i++) {
            var contentFragment = contentFragmentList[i];
            if(contentFragment.attributeId == data_id) {
                var resource = {};
                resource.status = 0;
                resource.type = dataType == 'image' ? 0 : 1;
                resource.uri = file_name;
                resource.description = '';

                contentFragment.resourceList.push(resource);
            }
        }
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
            data_id = $section.find('.item-content').attr('data-id');
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

        if(data_value == null) {
            continue;
        }

        if($(item_arr[i]).hasClass('category')) {
            project.ichCategoryId = data_value;
            continue;
        }

        var is_new_attr = true;
        for(var j = 0; j < contentFragmentList.length; j++) {
            var contentFragment = contentFragmentList[j];
            if(contentFragment.attributeId == data_id) {
                contentFragment.content = data_value;
                is_new_attr = false;
                break;
            }
        }

        //基础信息条目显示不全，加的补丁
        if(data_type == 'short-text' && is_new_attr) {
            for(var j = 0; j < attributes.length; j++) {
                var attribute = attributes[j];
                if(attribute.id == data_id) {
                    var contentFragment = {};
                    contentFragment.attribute = attribute;
                    contentFragment.attributeId = attribute.id;
                    contentFragment.content = data_value;
                    contentFragment.targetId = project.id;
                    contentFragment.targetType = 0;
                    contentFragmentList.push(contentFragment);
                    break;
                }
            }
        }

    }
}

function showProjectUi(item_arr) {
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
                if($item.hasClass('dic')) {
                    $item.text(getTextByTypeAndCode($item.attr('dic-type'), contentFragment.content, 'chi'));
                } else if(!$item.is('img')) {
                    $item.html(contentFragment.content);
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

    var selectList = getDictionaryArrayByType(103,'chi');
    for(var i=0;i<selectList.length;i++) {
        $("#certselect").append("<option value='"+selectList[i].code+"'>"+selectList[i].name+"</option>");
    }

    /*$("#ECalendar_date").ECalendar({
        type:"date",
        skin:2,
        offset:[0,2]
    });*/

    var $file_up = $section.find('.file_up');
    $file_up.append($(getTemplate()));
    $file_up.find('input[type="file"]').change(function () {
        var _this = $(this);
        _this.attr('data-type', 'image');
        uploadFile(_this, _this.parent(), uploadFileCallBack);
    });

    function uploadFileCallBack(uri) {
        $section.find('.file_up img').remove();

        var $img = $('<img />');
        $img.attr('src', uri);
        $img.addClass('preview');
        var uri_str = uri;
        uri_str = uri_str.substring(uri_str.lastIndexOf('/') + 1, uri_str.length);
        $section.find('.file_up').append($img);

        if(typeof $('#detailTopic').attr('src') == 'undefined') {
            var $bgContainer = $('#detailContent');
            $bgContainer.css({'width': '316px'});

            var $bg_img = $('<img id="detailTopic" style="width:316px;margin-left: -158px;"/>')
            $bg_img.attr('src', uri);

            $bgContainer.find('.mask_left').remove();
            $bgContainer.find('.mask_right').remove();
            $bgContainer.find('#back_img').hide();

            $bgContainer.prepend($('<div class="mask_right"></div>'));
            $bgContainer.prepend($($bg_img));
            $bgContainer.prepend($('<div class="mask_left"></div>'));
        } else {
            $('#detailTopic').attr('src', uri);
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

        if(!has_head_img) {//没有题图，新增
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

function uploadFile(_this, $ui, callback) {
    var path = _this.val();

    if(path == null && path == '') {
        alert('文件有错误');
        return;
    }

    var reg;
    var errorMsg;

    var dataType = _this.attr('data-type');
    if(dataType == 'image') {
        reg = /^.*[^a][^b][^c]\.(?:png|jpg|bmp|gif|jpeg)$/;
        errorMsg = '请上传格式为png|jpg|bmp|gif|jpeg的图片';
    } else if(dataType == 'video') {
        reg = /^.*[^a][^b][^c]\.(?:mp4|rmvb|flv|mpeg|avi)$/;
        errorMsg = '请上传格式为mp4|rmvb|flv|mpeg|avi的视频';
    }

    if(!reg.test(path.toLowerCase())) {
        alert(errorMsg);
        return;
    }

    var suffix = path.substring(path.lastIndexOf(".") + 1);

    var serverInfo = send_request();
    var host =serverInfo["host"];
    var accessId =serverInfo["accessid"];
    var policy = serverInfo["policy"];
    var signature = serverInfo["signature"];
    var key = dataType + '/project/' + serverInfo["filename"] + "." + suffix;//生成文件路径

    $ui.find("input[name='OSSAccessKeyId']").val(accessId);
    $ui.find("input[name='policy']").val(policy);
    $ui.find("input[name='Signature']").val(signature);
    $ui.find("input[name='key']").val(key);
    $ui.attr("action",host);

    $ui.ajaxSubmit({
        dataType: 'text',
        beforeSend: function () {
            $ui.find('.progress').show();
            $ui.parent().find('.icon i').hide();
        },
        success: function () {
            callback(host + "/" + key, dataType);

            $ui.find('.progress').hide();
            $ui.parent().find('.icon i').show();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

function send_request() {
    var signituredata = {};

    $.ajax(base_url + '/file/getPolicy', {
        type: "POST",
        data: {},
        dataType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(data, status, xhr) {
            signituredata= JSON.parse(data);
        }
    });

    return signituredata;
}

function getTemplate() {
    return '<form class="upload" method = "POST" action="" method="post" enctype="multipart/form-data">'+
        '<input class="_token" type="hidden" name="OSSAccessKeyId" value="">'+
        '<input class="_token" type="hidden" name="policy" value="">'+
        '<input class="_token" type="hidden" name="Signature" value="">'+
        '<input class="_token" type="hidden" name="key" value="">'+
        '<input class="_token" type="hidden" name="Filename" value="">'+
        '<input class="_token" type="hidden" name="success_action_status" value="200">'+
        '<div class="progress">' +
            '<div class="ui loader" style="width: 40px;height: 40px;position: absolute;top: 50%;left: 50%;display: block;"></div>'+
        '</div>' +
        '<input class="file" type="file" name="file">'+
        '</form>';
}

function saveProjectToServer(callback) {
    if(project == null) {
        return;
    }

    var params = JSON.stringify(project);

    $.ajax({
        type: 'POST',
        url: base_url + '/ichProject/saveIchProject',
        data: {'params': params},
        xhrFields:{
            withCredentials:true
        },
        success: function (data) {
            if(data.code == 0) {
                var refresh = callback();
                if(!refresh) return;
            }
            displayReadMode();
        },
        error: function () {
            alert('error');
        }
    });
}

function deleteImageUi($ui) {
    var _this;
    $ui.find('.image-container div').hover(function () {
        _this = $(this);
        _this.addClass('mask');
        var $del_i = $('<i></i>');
        _this.append($del_i);

        $del_i.on('click', function () {
            $(this).parent().remove();

            var $file = $(this).parent().find('.file-tag');
            var file_name = $file.attr('file-name');
            var contentFragmentList = project.contentFragmentList;
            for(var i = 0; i < contentFragmentList.length; i++) {
                var contentFragment = contentFragmentList[i];
                var resList = contentFragment.resourceList;
                for(var j = 0; resList != null && j < resList.length; j++) {
                    var res = resList[j];
                    if(file_name == res.uri) {
                        resList.splice(j, 1);
                        break;
                    }
                }
            }

            var resource_id = $file.attr('resource-id');
            if(resource_id != null) {
                $.ajax({
                    type: "POST",
                    url: base_url + '/resource/deleteResource?params=' + resource_id,
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function(data) {

                    }
                });
            }
        });
    }, function () {
        _this.removeClass('mask');
        _this.find('i').remove();
    });
}

function adjustImageText($section, item_arr) {
    if(item_arr == null || item_arr.length == null || item_arr.length == 0) {
        return;
    }

    var item = item_arr[0];
    var attr_id = $(item).attr('data-id');

    if(attr_id == null) return;

    var contentFragmentList = project.contentFragmentList;
    for(var i = 0; i < contentFragmentList.length; i++) {
        var contentFragment = contentFragmentList[i];
        if(contentFragment.attributeId == attr_id) {
            var resourceList = contentFragment.resourceList;
            if(resourceList.length == 0) {
                $section.find('.read-piece .media').hide();
                $section.find('.read-piece .side').css({'width': '1126px'});
            } else if(resourceList.length > 0){
                $section.find('.read-piece').remove();
                var $show_image_text_ui = $(show_image_text_template);
                $show_image_text_ui.find('.item-content').attr('data-id', attr_id);
                $show_image_text_ui.find('.item-content').html(contentFragment.content);
                for(var j = 0; j < resourceList.length; j++) {
                    var $li = $('<li></li>');

                    if(resourceList[j].type == 0) {
                        var $img = $('<img />');
                        $img.attr('src', 'http://resource.efeiyi.com/image/project/' + resourceList[j].uri);
                        $li.append($img);
                    } else if(resourceList[j].type == 1) {
                        var $video = $('<video></video>');
                        $video.attr('controls', 'controls');
                        $video.attr('width', '325px');
                        $video.attr('src', 'http://resource.efeiyi.com/video/project/' + resourceList[j].uri);
                        $li.append($video);
                    }

                    $show_image_text_ui.find('.media ul').append($li);
                }

                $section.find('.card').append($show_image_text_ui);
            }
        }
    }
}