var master = null;
var attributes = null;

$(function () {
    init();
});

function init() {
    $('#btn_edit').on('click', function() {
        var masterId = $(this).attr('master-id');
        if(masterId == null) {
            alert('获取项目信息失败');
            return;
        }
        loadMasterFromServer(masterId);
    });
}

function loadMasterFromServer(masterId) {
    $.ajax({
        type: 'POST',
        url: base_url + '/ichMaster/getIchMasterById?params=' + masterId,
        dataType:'JSON',
        xhrFields:{
            withCredentials:true
        },
        success: function (data) {
            if(data == null || data.code == 3) {
                alert('您还没有登录，请登录后操作！');
                return;
            }

            if(master != null) {
                return;
            }

            master = data.data;
            loadAttributesFromServer();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

function loadAttributesFromServer() {
    var url = base_url + '/ichCategory/getAttributeList?targetType=1';

    $.ajax({
        type: 'POST',
        url: url,
        dataType:'JSON',
        success: function (data) {
            if(data == null || data.code == 3) {
                return;
            }
            attributes = data.data;

            var attrMap = {};
            for(var i = 0; attributes != null && i < attributes.length; i++) {
                if(attributes[i] != null) {
                    attrMap[attributes[i].id] = attributes[i];
                }
            }

            var contentFragmentList = [];
            if(master != null) {
                contentFragmentList = master.contentFragmentList;
            }

            for(var i = 0; i < contentFragmentList.length; i++) {
                var contentFragment = contentFragmentList[i];
                if(contentFragment == null) continue;

                if(attrMap[contentFragment.attributeId] == null) {
                    attributes.push(contentFragment.attribute);
                }
            }

            displayEditMode();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}

function displayEditMode() {
    var $edit_project_tool_bar = $(edit_project_tmp);
    $('.header.header_detail').after($edit_project_tool_bar);

    $('.header.header_detail').hide();
    $('.edit.link').hide();
    $('a.albums').hide();
    $('a.share').hide();
    $('a.praise').hide();

    var $edit_link = $('<span class="edit link">编辑</span>');
    $('.handle-button').append($edit_link);

    $('.abandon.button').on('click', function () {
        displayReadMode();
    });

    var has_edit = false;
    $('.save.button').on('click', function () {
        if(has_edit == true) {
            alert('您还有未保存的栏目，请保存后再进行此操作。');
            return;
        }
        saveProjectToServer(function () {
            alert('数据保存成功！');
            return false;
        });
    });

    $('.submit.button').on('click', function () {
        if(has_edit == true) {
            alert('您还有未保存的栏目，请保存后再进行此操作。');
            return;
        }
        saveMasterToServer(function () {
            alert('提交成功！通过审核后，会及时通知你呦！');
            return true;
        });
    });

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
            saveMasterToClient($section);
            var item_arr;

            if(data_type == 'main-text') {
                $(this).hide();
                $save_link.parent().find('.edit').show();
                $section.find('form').remove();

                var $show_main_ui = $(show_main_info_template);
                item_arr = $show_main_ui.find('.data-item');
                $section.append($show_main_ui);
                showMasterUi(item_arr);
            }  else if(data_type == 'short-text') {
                $section.find('.read-piece ul li').remove();

                var short_item_arr = $section.find('form .data-item');
                for(var i = 0; i < short_item_arr.length; i++) {
                    var item = short_item_arr[i];
                    var contentFragmentList = master.contentFragmentList;
                    for(var j = 0; j < contentFragmentList.length; j++) {
                        var contentFragment = contentFragmentList[j];
                        var attr = contentFragment.attribute != null ? contentFragment.attribute : {};
                        if($(item).attr('data-id') == contentFragment.attributeId) {
                            var $show_short_text_ui = $(show_short_text_template);
                            $show_short_text_ui.find('.key').text(attr.cnName + ': ');
                            if($(item).is('select')) {
                                $show_short_text_ui.find('.value').text(getTextByTypeAndCode(attr.dataType,contentFragment.content,'chi'));
                            } else {
                                $show_short_text_ui.find('.value').text(contentFragment.content);
                            }
                            if(contentFragment.content != null && contentFragment.content != '') {
                                $section.find('.read-piece ul').append($show_short_text_ui);
                            }
                            break;
                        }
                    }
                }

                var main_item_arr = $('.mainbg .content_img .data-item');
                showMasterUi(main_item_arr);

                $section.find('.read-piece').show();
                $(this).hide();
                $save_link.parent().find('.edit').show();
                $section.find('form').remove();
            } else if(data_type == 'image-text') {
                item_arr = $section.find('.read-piece .data-item');
                showMasterUi(item_arr);

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
            var content = editor.getContent();

            var title = $('#custom .ui.dropdown input.search').val().trim();
            var select_title = $('#custom .ui.dropdown').dropdown('get text');

            title = title == '' ? select_title : title;

            if(title == '' || content == '') {
                alert('标题或内容不能为空');
                return;
            }

            var attribute = null;
            for(var i = 0; i < attributes.length; i++) {
                if(attributes[i] == null) continue;
                if(attributes[i].dataType != '5' && attributes[i].dataType != '1') {
                    continue;
                }
                if(attributes[i].cnName == title) {
                    attribute = attributes[i];
                }
            }

            var is_has = false;
            var contentFragment;
            var contentFragmentList = master.contentFragmentList;
            for(var i = 0; attribute != null && i < contentFragmentList.length; i++) {
                contentFragment = contentFragmentList[i];
                if(contentFragment.attributeId == attribute.id) {
                    is_has = true;
                    contentFragment.content = content;
                    if(resourceList_tmp.length > 0 && contentFragment.attribute.dataType == '5') {
                        contentFragment.resourceList = resourceList_tmp;
                    }
                    break;
                }
            }

            if(!is_has) {
                contentFragment = {};
                if(attribute != null) {
                    contentFragment.attributeId = attribute.id;
                } else {
                    attribute = {};
                    attribute.cnName = title;
                    attribute.dataType = 5;
                    contentFragment.attributeId = 0;
                    contentFragment.attribute = attribute;
                }

                contentFragment.content = content;
                contentFragment.targetType = 1;
                if(resourceList_tmp.length > 0 && attribute.dataType == '5') {
                    contentFragment.resourceList = resourceList_tmp;
                }
                contentFragmentList.push(contentFragment);
            }

            $ui.find('.title .ui.dropdown').hide();
            $ui.find('h4').text(title);

            var $custom_ui = $(custom_show_tmp);
            var $file_con = $custom_ui.find('.media ul');
            for(var i = 0; i < resourceList_tmp.length; i++) {
                var resource_tmp = resourceList_tmp[i];

                var $li = $('<li></li>');
                if(resource_tmp.type == 0) {
                    var $img = $('<img />');
                    $img.attr('src', MASTER_RESOURCE_URL + resource_tmp.uri);
                    $li.append($img);
                } else if(resource_tmp.type == 1) {
                    var $video = $('<video></video>');
                    $video.attr('controls', 'controls');
                    $video.attr('width', '325px');
                    $video.css({'max-height':'357px'});
                    $video.css({'background-color':'#000'});
                    $video.attr('src', MASTER_RESOURCE_URL + resource_tmp.uri);
                    $li.append($video);
                }

                $file_con.append($li);
            }

            $ui.find('.image-text').hide();
            $ui.find('.card').append($custom_ui);
            $ui.find('.item-content').html(content);

            $ui.find('.save.link').hide();
            $ui.find('.cancel.link').hide();
            $ui.find('.edit.link').show();

            $ui.removeClass('custom');
            $ui.removeAttr('id');
            has_edit = false;
        });

        $ui.find('.edit.link').on('click', function(){
            if(has_edit == true) {
                alert('已经有模块处于编辑状态，请保存后再进行此操作。');
                return;
            }

            has_edit = true;

            var $section = getSection(this);

            editImageTextUi($section);

            var title = $ui.find('h4').text();
            var contentFragment;
            var contentFragmentList = master.contentFragmentList;
            for(var i = 0; title != '' && i < contentFragmentList.length; i++) {
                contentFragment = contentFragmentList[i];
                var attr = contentFragment.attribute;

                if(attr == null || attr.cnName == '') {
                    continue;
                }

                if(title == attr.cnName) {

                    break;
                }
            }


        });

        $ui.find('.cancel.link').on('click', function(){
            $ui.remove();
            has_edit = false;
        });

        fillCustomSelect();

        $ui.find('.add.file_up').append($(upload_form_template));
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

            deleteImageUi($ui, function () {
                for(var j = 0; resourceList_tmp != null && j < resourceList_tmp.length; j++) {
                    var res = resourceList_tmp[j];
                    if(file_name == res.uri) {
                        resourceList_tmp.splice(j, 1);
                        break;
                    }
                }
            });

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

    if(master == null) {
        return;
    }
    var contentFragmentList = master.contentFragmentList;

    var aim_arr = $edit_main_info_tmp.find('.data-item');

    for(var i = 0; i < aim_arr.length; i++) {
        var $a_item = $(aim_arr[i]);
        for(var j = 0; j < contentFragmentList.length; j++) {
            var contentFragment = contentFragmentList[j];

            if($(aim_arr[i]).hasClass('category')) {
                var category_id = master.ichCategoryId != null ? master.ichCategoryId : '';
                $a_item.attr('data-value', category_id);
                $a_item.text(getCategoryTextById(category_id));
                break;
            } else if(contentFragment.attributeId == $a_item.attr('data-id')) {
                var value = contentFragment.content;

                value = value != null ? value.trim() : '';

                if($a_item.is('input[type="text"]') || $a_item.is('select')) {
                    $a_item.val(value);
                } else if($a_item.attr('data-id') == '23') {
                    var value_arr = value.split(',');
                    if(value_arr.length > 0) {
                        value = value_arr[0];
                    }

                    $a_item.attr('data-value', value);
                    $a_item.text(getTextByTypeAndCode($a_item.attr('dic-type'), value, 'chi'));
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
        if(contentFragment.attributeId == 10) {
            resourceList = contentFragment.resourceList;
            break;
        }
    }
    if(resourceList != null && resourceList.length > 0) {
        $section.find('.file_up').find('img') != null ?
            $section.find('.file_up').find('img').remove() : null;

        var resource = resourceList[0];
        var $img = $('<img class="preview" style="display: inline;z-index: 0;">');
        $img.attr('src', MASTER_RESOURCE_URL + resource.uri);
        $section.find('.file_up').append($img);
    }
}

function addMainInfoCompListener($section) {
    $('#category_temp').on('click', function () {
        var _this = $(this);
        var $comb = _this.parent().parent().find('.item');
        $comb.css('left', parseInt(_this.position().left) + 'px');
        $comb.animate({height:'toggle'}, 150);
        $comb.siblings('.item').animate({height:'hide'},50);

        var opts = {};
        opts.data = ich_category;
        opts.callback = function (data_code, name) {
            _this.attr('data-value', data_code);
            _this.text(name);
        };

        buildComboUi($comb, opts);
    });

    $('#area_temp').on('click', function () {
        var _this = $(this);
        var $comb = _this.parent().parent().find('.item');
        $comb.css('left', parseInt(_this.position().left) + 'px');
        $comb.animate({height:'toggle'}, 150);
        $comb.siblings('.item').animate({height:'hide'},50);

        var opts = {};
        //opts.data = area_all;
        opts.type=101;
        opts.data = getDictionaryArrayByTypeAndParentID(101, '', 'chi');
        opts.callback = function (data_code, name) {
            _this.attr('data-value', data_code);
            _this.text(name);
        };

        buildComboUi($comb, opts);
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

    var selectList = getDictionaryArrayByType(106,'chi');
    for(var i=0;i<selectList.length;i++) {
        $("#certselect").append("<option value='"+selectList[i].code+"'>"+selectList[i].name+"</option>");
    }

    var $file_up = $section.find('.file_up');
    $file_up.append($(upload_form_template));
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

        $('.bg-image').attr('src', uri);

        var contentFragmentList = master.contentFragmentList;
        var has_head_img = false;
        for(var i = 0; i < contentFragmentList.length; i++) {
            var contentFragment = contentFragmentList[i];
            if(contentFragment.attributeId == 10) {
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
            contentFragment.attributeId = 10;
            contentFragment.targetId = master.id;
            contentFragment.targetType = 1;
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

function saveMasterToClient($section) {
    if(master == null) {
        master = {};
    }

    if(master.contentFragmentList == null) {
        master.contentFragmentList = [];
    }

    var contentFragmentList = master.contentFragmentList;

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
        if((data_type == 'short-text' || data_type == 'main-text') && is_new_attr) {
            for(var j = 0; j < attributes.length; j++) {
                var attribute = attributes[j];
                if(attribute.id == data_id) {
                    var contentFragment = {};
                    contentFragment.attribute = attribute;
                    contentFragment.attributeId = attribute.id;
                    contentFragment.content = data_value;
                    contentFragment.targetId = master.id;
                    contentFragment.targetType = 1;
                    contentFragmentList.push(contentFragment);
                    break;
                }
            }
        }

    }
}

function showMasterUi(item_arr) {
    var contentFragmentList = [];
    if(master != null && master.contentFragmentList != null) {
        contentFragmentList = master.contentFragmentList;
    }

    for(var i = 0; i < item_arr.length; i++) {
        var $item = $(item_arr[i]);

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

function editShortTextUi($section) {
    $section.find('.read-piece').hide();

    var short_text_attrs = [];

    var no_include_ids = [12, 13, 11, 23, 111, 10, 113];

    for(var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];

        if(attr == null || attr.dataType == 1 || attr.dataType == 5
            || attr.dataType == 6 || attr.dataType == 7) {
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
    if(master != null) {
        contentFragmentList = master.contentFragmentList;
    }

    var $form = $(edit_main_info_tmp);
    $section.append($form);

    addMainInfoCompListener($section);

    var aim_arr = $form.find('.data-item');

    for(var i = 0; i < aim_arr.length; i++) {
        var $a_item = $(aim_arr[i]);
        for(var j = 0; j < contentFragmentList.length; j++) {
            var contentFragment = contentFragmentList[j];

            if($(aim_arr[i]).hasClass('category')) {
                var category_id = master.ichCategoryId != null ? master.ichCategoryId : '';
                $a_item.attr('data-value', category_id);
                $a_item.text(getCategoryTextById(category_id));
                break;
            } else if(contentFragment.attributeId == $a_item.attr('data-id')) {
                var value = contentFragment.content;

                value = value != null ? value.trim() : '';

                if($a_item.is('input[type="text"]') || $a_item.is('select')) {
                    $a_item.val(value);
                } else if($a_item.attr('data-id') == '23') {
                    var value_arr = value.split(',');
                    if(value_arr.length > 0) {
                        value = value_arr[0];
                    }

                    $a_item.attr('data-value', value);
                    $a_item.text(getTextByTypeAndCode($a_item.attr('dic-type'), value, 'chi'));
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
        if(contentFragment.attributeId == 10) {
            resourceList = contentFragment.resourceList;
            break;
        }
    }
    if(resourceList != null && resourceList.length > 0) {
        $section.find('.file_up').find('img') != null ?
            $section.find('.file_up').find('img').remove() : null;

        var resource = resourceList[0];
        var $img = $('<img class="preview" style="display: inline;z-index: 0;">');
        $img.attr('src', MASTER_RESOURCE_URL + resource.uri);
        $section.find('.file_up').append($img);
    }

    for(var i = 0; i < short_text_attrs.length; i++) {
        var $ui = $(edit_short_text_tmp);
        $form.append($ui);
        var attr = short_text_attrs[i];

        if(attr.dataType == 3) {
            var rand = generateMathRand(8);
            $ui.find('input').attr('id', rand);
            $('#' + rand).jHsDate({
                inputIsRead: true
            });
        }

        $ui.find('.label').append(attr.cnName);

        if(attr.dataType > 101) {
            var $select = $('<select></select>');
            $select.addClass('ipt').addClass('w310').addClass('data-item');
            var dicArr = [];
            if(attr.dataType == 101){
                dicArr = getDictionaryArrayByTypeAndParentID(101, '', 'chi');
            }else{
                dicArr = getDictionaryArrayByType(attr.dataType, 'chi');
            }

            for(var t = 0; t < dicArr.length; t++) {
                var $option = $('<option></option>');
                $option.attr('value', dicArr[t].code);
                $option.text(dicArr[t].name);

                $select.append($option);
            }

            $ui.find('input').replaceWith($select);
            $ui.find('select').attr('data-id', attr.id);
        } else {
            $ui.find('input').attr('data-id', attr.id);
        }

        for(var j = 0; j < contentFragmentList.length; j++) {
            var contentFragment = contentFragmentList[j];
            if(attr.id == contentFragment.attributeId) {
                $ui.find('.data-item').val(contentFragment.content);
            }
        }
    }
}

function editImageTextUi($section) {
    $section.find('.read-piece').hide();

    var content = '';
    var contentFragmentList = [];
    if(master != null) {
        contentFragmentList = master.contentFragmentList;
    }

    var $item = $section.find('.card');
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

    if(content != null) {
        content = content.replace(/<[^a-zA-Z/]/g,'&lt;');

        content = content.replace(/\n/g,"<br/>");
        if(content.indexOf('<p>') != 0) {
            content = '<p>' + content + '</p>';
        }
    }

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
                $img.attr('src', MASTER_RESOURCE_URL + resource.uri + '?x-oss-process=style/temporary-preview');
            }
            $img.attr('file-name', resource.uri);
            $img.attr('resource-id', resource.id);
            $img.addClass('file-tag');
            $div.append($img);
            $ui.find('.image-container').append($div);
        } else if(resource.type == 1) {
            var $video = $('<video></video>');
            $video.attr('controls', 'controls');
            $video.attr('src', MASTER_RESOURCE_URL + resource.uri);
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

    $ui.find('.add.file_up').append($(upload_form_template));
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

        var contentFragmentList = master.contentFragmentList;
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

function fillCustomSelect() {
    var cMap = {};
    for(var i = 0; i < master.contentFragmentList.length; i++) {
        var contentFragment = master.contentFragmentList[i];
        if(contentFragment == null) continue;
        var attribute = contentFragment.attribute;
        if(attribute == null || attribute.id == null) continue;
        cMap[attribute.id] = contentFragment;
    }

    var values = [];
    for(var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];

        if(attr == null) {
            continue;
        }

        if(attr.dataType != '5' && attr.dataType != '1') {
            continue;
        }

        var value = {};
        if(cMap[attr.id] == null) {
            value.name = attr.cnName;
            value.value = attr.id;
            values.push(value);
        } else {
            var contentFragment = cMap[attr.id];
            if((contentFragment.content == null || contentFragment.content == '')
                && contentFragment.resourceList.length == 0) {
                value.name = attr.cnName;
                value.value = attr.id;
                values.push(value);
            }
        }
    }

    $('#custom .ui.dropdown').dropdown({
        allowAdditions: true,
        forceSelection: false,
        values: values
    });
}

function saveMasterToServer(callback) {
    if(master == null) {
        return;
    }

    var params = JSON.stringify(master);

    $.ajax({
        type: 'POST',
        url: base_url + '/ichMaster/saveIchMaster',
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
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
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
    var key = 'image/master/' + serverInfo["filename"] + "." + suffix;//生成文件路径

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

function deleteImageUi($ui, callback) {
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

            var contentFragmentList = master.contentFragmentList;
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

            if(callback != null) {
                callback();
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

    var contentFragmentList = master.contentFragmentList;
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
                        $img.attr('src', MASTER_RESOURCE_URL + resourceList[j].uri);
                        $li.append($img);
                    } else if(resourceList[j].type == 1) {
                        var $video = $('<video></video>');
                        $video.attr('controls', 'controls');
                        $video.attr('width', '325px');
                        $video.css({'max-height':'357px'});
                        $video.css({'background-color':'#000'});
                        $video.attr('src', MASTER_RESOURCE_URL + resourceList[j].uri);
                        $li.append($video);
                    }

                    $show_image_text_ui.find('.media ul').append($li);
                }

                $section.find('.card').append($show_image_text_ui);
            }
        }
    }
}

function buildComboUi($comb, opts) {
    var $ul = $comb.find('.level ul');
    $comb.children().not('.level').remove();

    for(var i = 0; i < opts.data.length; i++) {
        if(opts.data[i].parent_id == 0 || opts.data[i].parent_id == null) {
            var $li = buildCombLiUi(opts.data[i], opts);
            $ul.append($li);
        }
    }
}

function buildCombLiUi(area, opts) {
    var $li = $('<li></li>');
    $li.attr('data-code', area.code != null ? area.code : area.id);
    $li.attr('data-id', area.id);
    $li.text(area.name);

    $li.hover(function () {
        var _this = $(this);

        if(opts.type != null && opts.type == 101) {
            opts.data = getDictionaryArrayByTypeAndParentID(opts.type, _this.attr('data-id'), 'chi');
        }

        if(opts.type == 101){
            buildNextCombLiUi_(_this, opts);
        }else{
            buildNextCombLiUi(_this, opts);
        }

    });

    $li.on('click', function () {
        var data_code = $(this).attr('data-code');
        var name = $(this).text();

        opts.callback(data_code, name);

        $(this).parent().parent().parent().parent().animate({height:'hide'},50);
    });

    return $li;
}


function buildNextCombLiUi(_this, opts) {
    var next = _this.parent().parent().parent().next('dl');
    removeNextLevel(next);

    var $ul = $('<ul></ul>');

    for(var i = 0; opts.data != null && i < opts.data.length; i++) {
        var area = opts.data[i];

        if(area.parent_id == _this.attr('data-id')) {
            var $li = buildCombLiUi(area, opts);
            $ul.append($li);
        }
    }

    if($ul.find('li').length > 0) {
        var $dl = $('<dl></dl>');
        var $dd = $('<dd></dd>');

        $dd.append($ul);
        $dl.append($dd);
        $(_this).parent().parent().parent().parent().append($dl);
    }
}

function buildNextCombLiUi_(_this, opts) {
    var next = _this.parent().parent().parent().next('dl');
    removeNextLevel(next);

    var $ul = $('<ul></ul>');

    for(var i = 0; opts.data != null && i < opts.data.length; i++) {
        var v_data = opts.data[i];

        var v_id = null;

        if(v_data.parent_id != null) {
            v_id = v_data.parent_id;
        } else if(v_data.parentId != null) {
            v_id = v_data.parentId;
        }

        if(v_id == _this.attr('data-id')) {
            var $li = buildCombLiUi(v_data, opts);
            $ul.append($li);
        }
    }

    if($ul.find('li').length > 0) {
        var $dl = $('<dl></dl>');
        var $dd = $('<dd></dd>');

        $dd.append($ul);
        $dl.append($dd);
        $(_this).parent().parent().parent().parent().append($dl);
    }
}

function removeNextLevel(curr) {
    if(curr.length > 0) {
        var next = curr.next('dl');
        removeNextLevel(next);
        curr.remove();
    } else {
        return;
    }
}