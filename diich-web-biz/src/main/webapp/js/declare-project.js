/**
 * Created by Administrator on 2017/8/25.
 */

var GET_ATTRIBUTE_LIST_URI = '/attribute/getList';
var GET_ALL_CATEGORY_URI = '/ichCategory/getAllIchCategory';
var UPLOAD_URL = 'http://47.95.32.236/file/getPolicy';
var ICH_PROJECT_URL = '/ichProject/getIchProject?params=';
var GET_DICTIONARY_URL = '../dictionary/getDictionaryByTypeAndParentId';
var SAVE_ICH_PROJECT_URL = '/ichProject/saveIchProject';
var SAVE_ICH_MASTER_URL = '/ichMaster/saveIchMaster';
var SAVE_ORGNIZATION_URL = '/organization/saveOrganization';
var SAVE_WORKS_URL = '/works/saveWorks';

var SUBMIT_ICH_PROJECT_URL = '/ichProject/submitIchProject';
var SUBMIT_ICH_MASTER_URL = '/ichMaster/submitIchMaster';
var SUBMIT_ORGNIZATION_URL = '/organization/submitOrganization';
var SUBMIT_WORKS_URL = '/works/submitWorks';

var GET_ORGNIZATION_URL = '/organization/getCurrent';

var SITE_NAME = 'http://resource.efeiyi.com/'
var IMAGE_DICTIONARY = 'image/project/';
var RESOURCE_HOME_PATH = SITE_NAME + IMAGE_DICTIONARY;
var IMAGE_STYLE_FIGURE = "?x-oss-process=style/figure";
var IMAGE_STYLE_TOPIC = "?x-oss-process=style/topic";
var ADD_FILE_DESC_PROMPT = '点击以添加描述';
var type = 0;

var attr_sub_list_tmp =
    '<div class="attr-sub-list disabled">' +
        '<div class="sub-title"><i class="radio circle icon"></i></div>' +
        '<ul></ul>' +
        '<i class="lock icon"></i>' +
        '</div>';

var attribute_list = null;
var attribute_obj = null;
var ich_object = {};
ich_object.contentFragmentList = [];
var category_list = null;
var attribute_obj = {};

$(function init() {

    type = $.getUrlParam('type');
    initTitle();
    focusBaseFieldForm();

    $('.save.button').on('click', function () {
        save();
    });
    $('.submit.button').on('click', function () {
        submit();
    })


});

function initTitle() {
    switch(type) {
        case "0":
            $('h1.title, head title').text('非遗大数据平台 - 申报新项目');
            break;
        case "1":
            $('h1.title, head title').text('非遗大数据平台 - 申报传承人');
            break;
        case "2":
            $('h1.title, head title').text('非遗大数据平台 - 申报作品');
            break;
        case "3":
            $('h1.title, head title').text('非遗大数据平台 - 申报组织');
            break;
        default:
            $('h1.title, head title').text('非遗大数据平台 - 申报新项目');
            break;
    }
}

function focusBaseFieldForm() {
    var attribute_obj = {};
    var topic;
    if(type == 0) {
        topic = '所属非遗分类';
    } else if(type == 1) {
        topic = '所属非遗项目';
    } else if(type == 2) {
        topic = '所属传承人';
    } else if(type == 3) {
        loadOrgnization(function () {
            loadAttributeList(0, function () {
                $('.attr-list .base-field.attr-sub-list').remove();
                var topic = getNextTopic();
                focusAttrSubList(topic);
            });
        });
    }

    attribute_obj[topic] = [{id: 0, cnName: topic}];
    $('.attr-list').removeClass('loading');
    enableSubList(topic);
    renderBaseAttributeSubListBar(topic);
    renderBaseFieldForm(topic);
}

function loadOrgnization(callback) {
    $.ajax({url:GET_ORGNIZATION_URL, success:function (result) {
        if(result.code == 0) {
            ich_object = result.data;
        } else {
            ich_object = {};
        }
        if(ich_object == null) {
            ich_object = {};
        }

        callback();
    }})
}

function submit() {
    saveForm();
    if(!checkForm()) {
        alert('填写有误，请核对以后再保存!');
        return;
    }

    var url = "";
    if(type == 0) {
        url = SUBMIT_ICH_PROJECT_URL;
    } else if(type == 1) {
        url = SUBMIT_ICH_MASTER_URL;
    } else if(type == 2) {
        url = SUBMIT_WORKS_URL;
    }
    else if (type == 3) {
        url = SUBMIT_ORGNIZATION_URL;
    }

    for(var i = 0; i <ich_object.contentFragmentList.length; i++) {
        var contentFragment = ich_object.contentFragmentList[i];

        if((typeof contentFragment.content == 'undefined' || contentFragment.content == '')
            && contentFragment.resourceList.length == 0) {
            ich_object.contentFragmentList.splice(i,1);
            i--;
        }
        if(typeof contentFragment.resourceList != 'undefined' &&
            contentFragment.resourceList.length == 0) {
            delete contentFragment.resourceList;
            continue;
        }

        for(var j = 0;(typeof contentFragment.resourceList != 'undefined' && j < contentFragment.resourceList.length); j++) {
            var resource = contentFragment.resourceList[j];
            if(resource.dataStatus == 'a') {
                resource.id = null;
            }
        }
    }

    $.ajax({
        url:url,
        data:{params:JSON.stringify(ich_object)},
        type:'POST',
        success:function (result) {
            if(result.code == 0) {
                ich_object = result.data;
                alert('保存成功!');
            } else {
                if(result.detailMsg != null) {
                    alert(result.detailMsg);
                } else {
                    alert(result.msg);
                }
            }
        }
    })
}


function save() {
    saveForm();
    if(!checkForm()) {
        alert('填写有误，请核对以后再保存!');
        return;
    }

    var url = "";
    if(type == 0) {
        url = SAVE_ICH_PROJECT_URL;
    } else if(type == 1) {
        url = SAVE_ICH_MASTER_URL;
    } else if(type == 2) {
        url = SAVE_WORKS_URL;
    }
    else if (type == 3) {
        url = SAVE_ORGNIZATION_URL;
    }

    for(var i = 0; i <ich_object.contentFragmentList.length; i++) {
        var contentFragment = ich_object.contentFragmentList[i];

        if((typeof contentFragment.content == 'undefined' || contentFragment.content == '')
            && contentFragment.resourceList.length == 0) {
            ich_object.contentFragmentList.splice(i,1);
            i--;
        }
        if(typeof contentFragment.resourceList != 'undefined' &&
            contentFragment.resourceList.length == 0) {
            delete contentFragment.resourceList;
            continue;
        }

        for(var j = 0;(typeof contentFragment.resourceList != 'undefined' && j < contentFragment.resourceList.length); j++) {
            var resource = contentFragment.resourceList[j];
            if(resource.dataStatus == 'a') {
                resource.id = null;
            }
        }
    }

    $.ajax({
        url:url,
        data:{params:JSON.stringify(ich_object)},
        type:'POST',
        success:function (result) {
            if(result.code == 0) {
                ich_object = result.data;
                alert('保存成功!');
                var topic = $('.form').data('topic');
                renderForm(topic);
            } else {
                if(result.detailMsg != null) {
                    alert(result.detailMsg);
                } else {
                    alert(result.msg);
                }
            }
        }
    })
}

function loadIchProject() {
    var req_id = $.getUrlParam("id");
    if(req_id == null) {
        return;
    }

    ICH_PROJECT_URL = ICH_PROJECT_URL + req_id;

    $.ajax({
        url:ICH_PROJECT_URL,
        success:function (result) {
            ich_object = result.data;
        }
    })
}

function loadAttributeList(categoryId, callback) {
    var params = {};
    params.categoryId = categoryId;
    params.targetType = type;
    $.ajax({
        url:GET_ATTRIBUTE_LIST_URI,
        data:params,
        success:function (result) {
            $('.attr-list').removeClass('loading');
            attribute_list = result.data;
            groupingAttributeList(result.data);
            refreshAttributeListBar();
            callback();
        }
    })
}

function refreshAttributeListBar(attributeObj) {
    if(typeof attributeObj == 'undefined') {
        attributeObj = window.attribute_obj;
    }

    for (var key in  attributeObj) {
        var array = attributeObj[key];
        renderAttributeSubListBar(array, key);
    }
}

function renderBaseAttributeSubListBar(topic) {
    var $sub_list = '<div class="attr-sub-list base-field topic-' + topic + ' single">' +
        '<div class="sub-title"><i class="circle radio icon selected"></i><span>' + topic + '</span></div>' +
        '<ul>' +
        '<li class="attr-0">' + '<i class="radio selected circle icon"></i>' + topic + '</li>' +
        '</ul>'
        '</div>';

    $('.attr-list').append($sub_list);
}

function groupingAttributeList(data) {
    attribute_obj = {};

    for(var i = 0; i < data.length; i++) {
        if(data[i].lable == "" || data[i].lable == null) {
            data[i].lable = "基础信息";
        }
    }
    var detail_info = [];
    for(var i = 0; i < data.length; i++) {
        var dataType = data[i].dataType;
        if(dataType == "0" ||  dataType == "1" || dataType == "2" || dataType == "3"
            || dataType == "7" ||dataType == "8"||dataType == "9" || Number(dataType) > 100) {
            //测试用
            if(data[i].id == 33) {
                data[i].maxLength = 3;
            }

            var lable = data[i].lable;
            if(attribute_obj[lable] == null) {
                attribute_obj[lable] = [];
            }
            attribute_obj[lable].push(data[i]);
        } else {
            detail_info.push(data[i]);
        }
    }

    var masterAttribute = {};
    masterAttribute.cnName = '相关传承人';
    masterAttribute.id = -1;
    masterAttribute.type = -1;
    masterAttribute.minLength = 0;
    masterAttribute.maxLength = 9999;
    masterAttribute.description = '选择项目的相关传承人'

    attribute_obj['详细信息'] = detail_info;

    return attribute_obj;
}

function getMasterName(ichMaster) {
    for(var i = 0; i < ichMaster.contentFragmentList.length; i++) {
        if(ichMaster.contentFragmentList[i].attributeId == 13) {
            return ichMaster.contentFragmentList[i].content;
        }
    }
}

function renderAttributeSubListBar(array, topic) {
    var $attr_sub_list = $(attr_sub_list_tmp);
    $attr_sub_list.data('lable',topic);
    $attr_sub_list.addClass('topic-' + topic);

    $attr_sub_list.find('.sub-title').append('<span>' + topic + '</span>');

    var $attr_sub_list = $(attr_sub_list_tmp);
    $attr_sub_list.data('lable', topic);
    $attr_sub_list.addClass('topic-' + topic);
    $attr_sub_list.find('.sub-title').append('<span>' + topic + '</span>');
    $attr_sub_list.data('topic', topic);
    if(array.length == 1) {
        $attr_sub_list.addClass('single');
    }

    $('.attr-list').append($attr_sub_list);

    var $ul = $attr_sub_list.find('ul');
    var evalText = doT.template($('#attr-navi-tmpl').text());
    var $list = evalText(array);
    $ul.append($list);
    $attr_sub_list.data('topic', topic);
    $ul.find('li').on('click', function () {
        if($(this).parent().parent().is('.disabled')) {
            alert('此项目前不可用。');
            return;
        }
        var id = $(this).data('id');
        focusAttr(id);
    })

    $attr_sub_list.children('.sub-title, .icon').on('click', function () {

        var topic = $(this).parent().data('topic');
        if($(this).parent().is('.hidden')){
            switchSubList(topic, false);
        } else {
            switchSubList(topic, true);
        }
    });
}

function renderCategorySelectionForm(topic) {

    $('.form .fieldset').children('.field').remove();
    $('.form').addClass('single');
    $('.form').data('topic', topic);
    if(category_list != null) {
        showCategoryList(category_list);
        return;
    }

    $('.form .segment .dimmer').addClass('active');
    $.getJSON(GET_ALL_CATEGORY_URI, function (result) {
        $('.form .segment .dimmer').removeClass('active');
        if(result.data == 0) {
            return;
        }
        category_list = result.data;
        showCategoryList(category_list);
    });

    function showCategoryList(category_list) {
        var evalText = doT.template($('#base-object-tmpl').text());
        $('.form .fieldset').append(evalText(category_list));
        $('.form .field li').on('click', function () {
            var $li = $(this);
            var $icon = $li.children('i');
            var $ul = $li.parent();
            var $field = $ul.parent();
            var $input = $field.children('input');
            if($li.hasClass('selected')) {
                $li.removeClass('selected');
                $icon.removeClass('selected');
                $input.val('');
            } else {
                $ul.children('li').removeClass('selected');
                $ul.children('li').children('i').removeClass('selected');
                $li.addClass('selected');
                $icon.addClass('selected');
                $input.val($li.val());
            }
        });

        $('.form .next.button').on('click', function () {
            if(!checkForm()) {
                return;
            }
            saveForm();
            if(attribute_list == null) {
                loadAttributeList(ich_object.ichCategoryId, function () {
                    focusAttrSubList(getNextTopic());
                });
            } else {
                focusAttrSubList(getNextTopic());
            }
        })

        if(typeof ich_object != 'undefined' && ich_object.ichCategoryId != null) {
            fillField($('.form .fieldset>.field'), ich_object.ichCategoryId);
        }
        $('.content.card').data('id', '选择分类');
    }
}

function clearForm() {
    var el = $('.ui.form').find('.type-101.field a');
    if(el.length != 0) {
        el.popupCitySelector('destory');
    }

    $('.form .fieldset').children('.field').remove();

}

function renderBaseFieldForm(topic) {
    if(type == 0) {
        renderCategorySelectionForm(topic);
    } else if(type == 1) {
        renderProjectSelectionForm(topic);
    } else if(type == 2) {
        renderMasterSelectionForm(topic);
    }
}

function renderMasterSelectionForm(topic) {
    var evalText = doT.template($('#select-master-tmpl').text());
    var html = evalText({});
    $('.form .fieldset').append(html);
    $('.form').addClass('single');
    $('.form').data('topic', topic);
    $('.selection').dropdown();
    $('.selection').children('input.search').on('keyup', function () {
        var name = $(this).val();
        console.log(name);
        $.ajax({
            type: 'post',
            url: '../searchMasterByName',
            data: {'name':name},
            dataType: 'json',
            success: function(data) {
                var array = data.data;
                var $menu = $('.form .selection .menu');
                $menu.children().remove();
                for(var i = 0;i < array.length; i++) {
                    var $item = $('<div class="item" data-value="' + array[i].targetId +'">' + array[i].content + '</div>');
                    $menu.append($item);
                }
            }
        });
    });
    $('.card .group .next.button').off('click').on('click', function () {
        var currentTopic = $('.form').data('topic');
        if (checkForm()) {
            saveForm();
            if(attribute_list == null) {
                loadAttributeList(ich_object.ichProjectId, function () {
                    focusAttrSubList(getNextTopic());
                });
            } else {
                focusAttrSubList(getNextTopic());
            }
        }
    });
}

function renderProjectSelectionForm(topic) {
    var evalText = doT.template($('#select-project-tmpl').text());
    var html = evalText({});
    $('.form .fieldset').append(html);
    $('.form').addClass('single');
    $('.form').data('topic', topic);
    $('.selection').dropdown();
    $('.selection').children('input.search').on('keyup', function () {
        var name = $(this).val();
        console.log(name);
        $.ajax({
            type: 'post',
            url: '../searchByName',
            data: {'name':name},
            dataType: 'json',
            success: function(data) {
                var array = data.data;
                var $menu = $('.form .selection .menu');
                $menu.children().remove();
                for(var i = 0;i < array.length; i++) {
                    var $item = $('<div class="item" data-value="' + array[i].targetId +'">' + array[i].content + '</div>');
                    $menu.append($item);
                }
            }
        });
    });
    $('.card .group .next.button').off('click').on('click', function () {
        var currentTopic = $('.form').data('topic');
        if (checkForm('非遗项目')) {
            saveForm();
            if(attribute_list == null) {
                loadAttributeList(ich_object.ichProjectId, function () {
                    focusAttrSubList(getNextTopic());
                });
            } else {
                focusAttrSubList(getNextTopic());
            }        }
    });
}

function renderForm(topic) {
    $('.form header h2').text(topic);
    $('.form').data('topic', topic);

    var evalText = doT.template($('#content-form-tmpl').text());
    sub_attribute_array = attribute_obj[topic];
    clearForm();
    var html = evalText(sub_attribute_array);
    $('.form .fieldset').append(html);
    if (sub_attribute_array.length == 1) {
        $('.form').addClass('single');
    } else {
        $('.form').removeClass('single');
    }

    renderSelections();

    var $uploader_fields = $('.type-7.field,.type-8.field,.type-9.field, .type-5.field');
    for (var i = 0; i < $uploader_fields.length; i++) {
        var $field = $uploader_fields.eq(i);
        renderUploader($field.data('id'));
    }

    $('.form .focusable').on('focus', function () {
        var $field = $(this);
        while (true) {
            if ($field.is('.field')) {
                break;
            }
            $field = $field.parent();
        }
        var attr_id = $field.data('id');
        focusAttr(attr_id, $(this));
    });

    $('.form .focusable').on('blur', function () {
        var $field = $(this);
        while (true) {
            if ($field.is('.field')) {
                break;
            }
            $field = $field.parent();
        }
        var attr_id = $field.data('id');
        checkField(attr_id)
        blurAttr(attr_id);
    });

    $('.form textarea + .expand').on('click', function () {
        var $textarea = $(this).prev();
        var height = $textarea.height();

        height = Number(height) * 1.5;
        $textarea.css({'height': height + 'px'});
    });

    $('.attr-list .base-info li').on('click', function () {
        var attr_id = $(this).attr('data-id');
        focusAttr(attr_id);
    });

    $('.card .group .next.button').off('click').on('click', function () {
        var currentTopic = $('.form').data('topic');
        if (checkForm(topic)) {
            saveForm();
            switchSubList(topic, true);
            var nextTopic = getNextTopic(currentTopic);
            focusAttrSubList(nextTopic);
            focusFirstAttr(nextTopic);
        }
    });

    $('.type-5.field>.next.button').on('click', function () {
        var current_field_id = $(this).parent().data('id');
        var next_field_id = $('.field.attr-' + current_field_id).next().data('id');
        focusAttr(next_field_id);
    });

    //setGlobalHotKey();
    fillForm();
    //checkForm(topic);
    $(window).scrollTop(1);
    var $fields = $('.form .field');
    var first_id = $fields.eq(0).data('id');
    focusAttr(first_id);
}

function focusFirstAttr(topic) {
    var first_id = $('.attr-sub-list.topic-' + topic).find('ul li').eq(0).data('id');
    focusAttr(first_id);
}

function fillForm() {
    var $field_list = $('.form .field');
    for(var i = 0; i < $field_list.length; i++) {
        var $field = $field_list.eq(i);
        var attr_id = $field.data('id');
        var content_object = getContentFragmentByAttrId(attr_id);
        if(typeof content_object != 'undefined') {
            fillField($field, content_object);
        }
    }
}

function fillField($field, object) {
    var content = object.content;
    var attr_id = $field.data('id');
    var data_type = $field.data('type');

    if(attr_id == 0) {
        $field.find('input').val(ich_object.ichCategoryId);
        var  $li = $field.find('ul li[value=' + ich_object.ichCategoryId + ']');
        $li.addClass('selected');
        setAttrStatus($li, 'selected');
        return;
    }

    if(data_type == 0 || data_type == 1 || data_type == 3 ) {
        $field.find('input, textarea').val(content);
    } else if(data_type == 5) {
        $field.find('input, textarea').val(content);
        renderResourceList($field, object);
    } else if(data_type == 7 || data_type == 8 || data_type == 9) {
        renderResourceList($field, object);
    } else if(data_type > 100) {
        var content_object = getContentFragmentByAttrId(attr_id);
        content = content_object.content;
        if(typeof content == 'undefined' || content == "") {
            return;
        }
        var $selection = $field.children('.selection');
        var array = (content + "").split(',');
        for(var i = 0; i < array.length; i++) {
            if(typeof selection_cathe == 'undefined') {
                continue;
            }
            var object = selection_cathe[array[i]];
            fillSelection($selection, object);
        }

        //$field.find('.dropdown').dropdown('set selected', content);
    }
}

function renderResourceList($field, object) {
    var field_type = $field.data('type');
    for(var i = 0; i < object.resourceList.length; i++) {
        $field.find('.images').removeClass('empty');
        if(object.resourceList[i].dataStatus != 'd') {
            var $container = renderResourceContainer(object.resourceList[i],$field);
            renderResource(object.resourceList[i], $container);
            $field.find('.ui.images').append($container);
        }
    }

    var $images = $field.find('.images');

    if(field_type == 7 || field_type == 8 || field_type == 9 ) {
        initImageNumListBar($field, object.resourceList);
    } else if(field_type == 5) {
        initImageScrollBar($images);
        updateImagesScrollBarStatus($images);
    }
}

function initImageNumListBar($field, resourceList) {
    var $images = $field.find('.ui.images');
    var $numListBar = $images.children('.num');
    for(var i = 0; i < resourceList.length; i++) {
        newImageNum($numListBar, resourceList[i]);
    }
}

function newImageNum($numListBar, resource) {
    var count = $numListBar.children('li').length + 1;
    var text;
    if(count < 10) {
        text = '0' + count ;
    } else {
        text = '' + count;
    }
    var $li = $('<li>' + text + '</li>');
    $li.data('id', resource.id);
    $numListBar.append($li);

    $li.on('click', function () {
        var id = $(this).data('id');

        alert(id);
    })
}



function initImageScrollBar($images) {
    var $prev_icon = $images.find('.up.icon');
    var $next_icon = $images.find('.down.icon');
    $prev_icon.off('click').on('click', function () {
        scrollImages($images, -1);
    });
    $next_icon.off('click').on('click', function () {
        scrollImages($images, 1);
    });
    updateImagesScrollBarStatus($images);
}

function updateImagesScrollBarStatus($images) {
    var $prev_icon = $images.find('.up.icon');
    var $next_icon = $images.find('.down.icon');

    var image_count = $images.children('.image').length;
    var top_blocked_count = $images.data('blocked-count');

    if(top_blocked_count > 0) {
        $prev_icon.show();
    } else {
        $prev_icon.hide();
    }
    if(image_count - top_blocked_count > 3) {
        $next_icon.show();
    } else {
        $next_icon.hide();
    }

    if(image_count == 0) {
        $images.addClass('empty');
    } else {
        $images.removeClass('empty');
    }
}

function scrollImages($images, next_count, callback) {
    var $IMAGE_CONTAINER_HEIGHT = 245;
    var $top_image = $images.children('.ui.image').eq(0);
    var init_blocked_count = $images.data('blocked-count');
    var new_blocked_count = init_blocked_count + next_count;
    $top_image.animate({marginTop:-new_blocked_count * $IMAGE_CONTAINER_HEIGHT}, 200, function () {
        if(typeof callback != 'undefined') {
            callback();
        }
    });
    $images.data('blocked-count', new_blocked_count);
    updateImagesScrollBarStatus($images);
}

function renderResource(resource, $container) {
    var resource_uri;
    var $resource;
    if(resource.type == 0) {
        $resource = $container.children('img');
        resource_uri = RESOURCE_HOME_PATH + resource.uri + $container.data('image-style');
        toast($container, '正在加载资源...');
        $resource.on('load',function () {
            toast($container, '');
        });
    } else if(resource.type == 1) {
        $resource = $container.children('video');
        resource_uri = RESOURCE_HOME_PATH + resource.uri;
        $container.children('.play').show();
        toast($container, '');
    }
    $container.data('type', resource.type);

    if(resource.dataStatus == 'a') {
        $container.data('is-new', true);
    }

    $resource.attr('src', resource_uri);

    if(typeof resource.description != 'undefined' && resource.description != null && resource.description != '') {
        $container.find('.description>span').text(resource.description);
    }

    if(typeof resource.id != 'undefined') {
        var init_id = $container.data('id');
        $container.removeClass('id-' + init_id);
        $container.data('id', resource.id);
        $container.addClass('id-' + resource.id);
    }
}

function renderResourceContainer(object,$field) {
    var field_type = $field.data('type');
    var $container = $('<div class="ui image">' +
        '<span class="toast"></span>' +
        '<a class="ui red right delete corner label" title="移除该项"> <i class="trash outline icon"></i> </a>' +
        '<div class="mask"></div>' +
        '<div class="description"><span>' + object.name + '</span><i class="edit icon"></i></div>' +
        '</div>');
    
    if(field_type == 5) {
        $container.data('image-style', IMAGE_STYLE_FIGURE);
    } else if(field_type == 7 || field_type == 8 || field_type == 9 ) {
        $container.data('image-style', IMAGE_STYLE_TOPIC);
    }

    if(object.type == 0 || object.type.toString().indexOf('image') >= 0) {
        var $object = $('<img>');
        $container.data('type', 0);

    } else if(object.type == 1 || object.type.toString().indexOf('video') >= 0) {
        var $object = $('<video width="100%" height="100%"></video>');
        var $play = $('<span class="play"><i class="play icon"></i></span>')
        $container.append($play);
        $play.hide();

        $play.on('click', function () {
            $object[0].play();
            $play.hide();
        });
        $object.on('click', function () {
            $object[0].pause();
            $play.show();
        })

        $object.on('ended', function () {
            $play.show();
        });
        $container.data('type', 1);
    }

    $container.append($object);

    var $description = $container.children('.description');
    $description.on('click', function () {
        var desc = $(this).children('span').text();
        if(desc == ADD_FILE_DESC_PROMPT) {
            desc = '';
        }
        desc = prompt('请输入描述信息', desc);
        if(desc != null && desc != '') {
            $(this).children('span').text(desc);
        }
    })
    var desc = '点击输入描述信息';
    if(typeof object.name != 'undefined') {
        desc = object.name;
    } else if(typeof object.description != 'undefined' && object.description != '') {
        desc = object.description;
    }
    $description.children('span').text(desc);

    if(typeof object.id != 'undefined') {
        $container.data('id', object.id);
        $container.addClass('id-' + object.id);
    }

    var $delete_label = $container.children('.delete.label');
    $delete_label.on('click', function () {
        var $image = $(this).parent();
        var $images = $image.parent();
        var $field = $images.parent();
        while(!$field.is('.field')) {
            $field = $field.parent();
        }
        removeImage($field, $image);
    });

    return $container;
}

function removeImage($field, $image) {
    var $images = $field.find('.images');
    var image_count = $images.children('.image').length;
    var top_blocked_count = $images.data('blocked-count');
    var bottom_blocked_count = image_count - top_blocked_count - 3;
    var field_id = $field.data('id');
    var resource_id = $image.data('id');

    var contentFragment = getContentFragmentByAttrId(field_id);
    for(var i = 0; i < contentFragment.resourceList.length; i++) {
        resource = contentFragment.resourceList[i];
        if(resource.id = resource_id) {
            resource.dataStatus = 'd';
        }
    }

    if(bottom_blocked_count > 0) {
        $image.animate({height:0}, 200, function () {
            $image.remove();
            updateImagesScrollBarStatus($images);
        });
    } else if(top_blocked_count > 0) {
        scrollImages($images, -1, function () {
            $image.animate({height:0}, 200, function () {
                $image.remove();
                updateImagesScrollBarStatus($images);
            });
        });
    } else {
        $image.animate({height:0}, 200, function () {
            $image.remove();
            updateImagesScrollBarStatus($images);
        });
    }

}

function saveForm() {
    var $field_list = $('.form .field');
    var all_checked = true;
    for(var i = 0; i < $field_list.length; i++) {
        var $field = $field_list.eq(i);
        var attr_id = $field.data('id');
        if(attr_id != 0) {
            var object = getContentFragmentByAttrId(attr_id);
        }
        saveField($field, object);
    }
}

function saveField($field, object) {
    var attr_id = $field.data('id');
    var data_type = $field.data('type');

    if(attr_id == 0 && type == 0) {
        ich_object.ichCategoryId = $field.find('input').val();
        return;
    } else if(attr_id == 0 && type == 1) {
        ich_object.ichProjectId = $field.find('input').val();
        return;
    }  else if(attr_id == 0 && type == 2) {
        ich_object.ichMasterId = $field.find('input').val();
        return;
    }

    var content = $field.find('input, textarea').val();
    switch (data_type) {
        case 0:
        case 1:
        case 3:
            if(content != "") {
                object.content = content;
            } else {
                object = null;
            }
            break;
        case 5:
        case 7:
        case 8:
        case 9:
            if(content != "") {
                object.content = content;
            }

            var resourceList = [];

            //保存已删除的图片数据，以跟服务端同步
            for(var i = 0; typeof  object.resourceList != 'undefined' && i < object.resourceList.length;i++) {
                if(object.resourceList[i].dataStatus == 'd') {
                    resourceList.push(object.resourceList[i]);
                }
            }

            var $resource_container_list = $field.find('.ui.images>.ui.image');
            for(var i = 0; i < $resource_container_list.length; i++) {
                var $resource_container = $resource_container_list.eq(i);
                var $resource = $resource_container.children('img,video');
                var resource = {};
                if($resource_container.data('is-new') == true) {
                    resource.dataStatus = 'a';
                }
                resource.id = $resource_container.data('id');

                var src = $resource.attr('src');
                resource.uri = src.replace(RESOURCE_HOME_PATH, '').replace($resource_container.data('image-style'), '');
                resource.type = $resource_container.data('type') + '';
                resource.description = $resource_container.children('.description').children('span').text();
                resourceList.push(resource);
            }
            object.resourceList = resourceList;
            break;
        case 7:
        default:
            var $labels = $field.children('.selection').children('.label');
            object.content = '';
            for(var i = 0; i < $labels.length; i++) {
                if(typeof object.content == 'undefined' || object.content == "") {
                    object.content = $labels.eq(i).data('code');
                } else {
                    object.content += ',' + $labels.eq(i).data('code');
                }
            }
            break;
    }
    if(object != null && (typeof object.content == 'undefined' || object.content == '') && object.resourceList.length == 0) {
        object = null;
    }
    return object;
}

function getContentFragmentByAttrId(attrId) {
    var object = null;
    if(typeof ich_object.contentFragmentList == 'undefined' || ich_object.contentFragmentList == null) {
        ich_object.contentFragmentList = [];
    }

    for(var i = 0; i < ich_object.contentFragmentList.length; i++) {
        if(ich_object.contentFragmentList[i].attributeId == attrId) {
            object =  ich_object.contentFragmentList[i];
        }
    }

    if(object == null) {
        object = {};
        object.attributeId = attrId;
        object.targetType = type;
        object.resourceList = [];
        ich_object.contentFragmentList.push(object);
    }

    return object;
}

function getNextTopic(currentTopic) {
    var hasFound = false;
    if(typeof currentTopic == 'undefined') {
        hasFound = true;
    }
    for(var topic in attribute_obj) {
        if(hasFound) {
            return topic;
        }
        if(currentTopic == topic) {
            hasFound = true;
        }
    }
    return null;
}


function setGlobalHotKey() {
    $(document).on('keydown', function() {
        var key = $('.content.card').data('id');
        var attr_array = attribute_obj[key];
        var id = $(':focus').parent().data('id');
        var type = $(':focus').parent().data('type');
        if(type == 1 || type == 5) {
            return;
        }
        if(typeof id == 'undefined') {
            $('.attr-' + attr_array[0].id + '.field ').children('input,a, textarea').focus();
        }
        var index;
        if(event.keyCode == 40 || event.keyCode == 38) {
            for(var i = 0; i < attr_array.length; i++) {
                if(attr_array[i].id == id){
                    index = i;
                    break;
                }
            }
            if(event.keyCode == 40) {
                $('.attr-' + attr_array[index + 1].id + ' input, ' + '.attr-' + attr_array[index + 1].id + ' a').eq(0).focus();
            } else {
                $('.attr-' + attr_array[index - 1].id + ' input, ' + '.attr-' + attr_array[index - 1].id + ' a').eq(0).focus();
            }
        }
    })
}

function blurAttr(id) {

}

function focusAttr(id, srcElement/*事件源*/) {
    var $currentAttr = $('.attr-list .attr-sub-list li .selected');
    if(typeof $currentAttr != 'undefined') {
        var currentId = $currentAttr.parent().data('id');
        if(currentId != id) {
            checkField(currentId);
        }
    }
    var $li = $('.attr-sub-list li.attr-' + id);
    var $attr_sub_list = $li.parent().parent();
    var topic = $('.form').data('topic');
    var new_topic = $attr_sub_list.data('topic');
    if($('.ui.form').data('topic') != new_topic) {
        if(checkForm(topic)) {
            saveForm();
            if(id == 0) {
                renderBaseFieldForm();
            } else {
                renderForm(new_topic);
            }
            focusAttrSubList(new_topic);
        } else {
            alert('当前表单未填写完毕！');
            return false;
        }
    }

    $(".attr-list li i").removeClass('selected');
    setAttrStatus($li, 'selected');
    setAttrStatus($attr_sub_list, 'selected');

    if($('.field.attr-' + id).is('.type-5')) {
        $('.field.type-5.active').removeClass('active');
        $('.field.attr-' + id).addClass('active');
        $('.form .card').addClass('complex');
    } else {
        $('.form .card').removeClass('complex');

    }

    var $input = $('.field.attr-' + id + ' .focusable').eq(0);
    if(!$input.is(srcElement)) {
        $input.focus();
    }
    return true;
}

function setAttrStatus($el, status) {
    if($el.is('.attr-sub-list')) {
        setSubListStatus($el, status);
        return;
    }

    $el.children('i').attr('style','');
    if(status == 'selected') {
        $el.children('i').attr('class', 'circle radio icon selected');
    } else if(status == 'checked'){
        $el.children('i').attr('class', 'green circle check icon outline');
    } else if(status == 'finished') {
        $el.children('i').attr('class', 'green circle check icon');
    } else if(status == 'error') {
        $el.children('i').attr('class', 'red plus circle icon');
        $el.children('i').attr('style','transform:rotate(45deg);');
    }
}

function setSubListStatus($subList, status) {
    if(status == 'selected') {
        $subList.find('.sub-title i').attr('class', 'circle radio icon selected');
    } else if(status == 'checked'){
        $subList.find('.sub-title i').attr('class', 'green circle check icon outline');
    } else if(status == 'finished') {
        $subList.find('.sub-title i').attr('class', 'green circle check icon');
    }
}

function checkForm() {
    var finished = true;

    var $form = $('.form');
    var topic = $form.data('topic');
    var $fields = $('.form .field');
    for(var i = 0; i < $fields.length; i++) {
        var field_id = $fields.eq(i).data('id');
        if(!checkField(field_id)) {
            finished = false;
        }
    }
    if(finished) {
        var $attrSublist = $('.attr-sub-list.topic-' + topic);
        setAttrStatus($attrSublist, 'finished');
        $attrSublist.data('status', 'finished');
    }

    return finished;
}

function getAttrbuteById(id) {
    for(var i = 0; i < attribute_list.length; i++) {
        if(id == attribute_list[i].id) {
            return attribute_list[i];
        }
    }
    return null;
}

function checkField(id) {
    if(typeof id == 'undefined') {
        return false;
    }

    if(id == 0 && type == 0) {
        return checkCategoryField();
    } else if(id == 0 && type == 1) {
        return checkProjectSelectField();
    } else if(id == 0 && type == 2) {
        return checkMasterSelectField();
    }
    var $field = $('.field.attr-' + id);
    var field_type = $field.data('type');
    var $input = $field.find('input.focusable, textarea');
    var $image_list = $field.find('.images');
    var $selection = $field.children('.selection');

    var attr = getAttrbuteById(id);

    if(attr.minLength == null) {
        attr.minLength = 0;
    }
    if(attr.maxLength == null) {
        attr.maxLength = Number.MAX_VALUE;
    }


    var content_length = 0;
    if(attr.dataType > 100) {
        content_length = $field.children('.selection').children('.label').length;
    } else if($input.length > 0){
        content_length = $input.val().length;
    }

    var image_length = 0;
    if($image_list.length > 0) {
        image_length = $image_list.children('.image').length;
    }


    $field.children('.message').remove();

    var finished = true;
    var desc = '';
    if($input.length > 0) {
        if (content_length >= attr.minLength && content_length <= attr.maxLength) {
            setAttrStatus($('li.attr-' + id), 'checked')
            if (content_length > 0 || image_length > 0) {
                setAttrStatus($('li.attr-' + id), 'finished');
            }
        } else if (content_length == 0) {
            desc = '请输入' + attr.cnName;
        } else if (content_length < attr.minLength) {
            desc = attr.cnName + '至少填写' + attr.minLength + (attr.dataType > 100 ? '项' : '个字');
        } else if (content_length > attr.maxLength) {
            desc = attr.cnName + '最多填写' + attr.maxLength + (attr.dataType > 100 ? '项' : '个字');
        }
    } else if($selection.length > 0) {
        if (content_length >= attr.minLength && content_length <= attr.maxLength) {
            setAttrStatus($('li.attr-' + id), 'checked')
            if (content_length > 0) {
                setAttrStatus($('li.attr-' + id), 'finished');
            }
        } else if (content_length == 0) {
            desc = '请选择' + attr.cnName;
        } else if (content_length < attr.minLength) {
            desc = attr.cnName + '至少选择' + attr.minLength + '项';
        } else if (content_length > attr.maxLength) {
            desc = attr.cnName + '最多选择' + attr.maxLength + '项';
        }
    } else if($image_list.length > 0) {
        var image_length;
        if (image_length >= attr.minLength && image_length <= attr.maxLength) {
            setAttrStatus($('li.attr-' + id), 'checked')
            if (image_length > 0) {
                setAttrStatus($('li.attr-' + id), 'finished');
            }
        } else if (image_length == 0) {
            desc = '请上传' + attr.cnName;
        } else if (image_length < attr.minLength) {
            desc = attr.cnName + '至少上传' + attr.minLength + '项';
        } else if (image_length > attr.maxLength) {
            desc = attr.cnName + '最多上传' + attr.maxLength + '项';
        }
    }

    if(desc != '') {
        $field.append($('<div class="ui tiny red message">'+ desc+'</div>'));
        setAttrStatus($('.attr-list .attr-' + id), 'error');
        return false;
    } else {
        return true;
    }
}

function checkProjectSelectField() {
    var $field = $('.field.attr-0');
    $field.find('.message').remove();

    var $input = $field.find('input.value');
    if($input.val() == "") {
        var $message = '<div class="ui red tiny message">请选择一个项目!</div>'
        $field.append($message);
        return false;
    } else {
        setAttrStatus($('.attr-sub-list li.attr-0'), 'finished');
        return true;

    }
}

function checkMasterSelectField() {
    var $field = $('.field.attr-0');
    $field.find('.message').remove();

    var $input = $field.find('input.value');
    if($input.val() == "") {
        var $message = '<div class="ui red tiny message">请选择一个传承人!</div>'
        $field.append($message);
        return false;
    } else {
        setAttrStatus($('.attr-sub-list li.attr-0'), 'finished');
        return true;
    }

}

function checkCategoryField() {
    var $field = $('.field.attr-0');
    $field.find('.message').remove();

    var $selected_item = $('.attr-0.field li.selected');
    if($selected_item.length == 0) {
        var $message = '<div class="ui red tiny message">请选择一个分类!</div>'
        $field.append($message);
        return false;
    } else {
        setAttrStatus($('.attr-sub-list li.attr-0'), 'finished');
        return true;
    }
}

function focusAttrSubList(topic) {
    var current_topic = $('.ui.form').data('topic');
    var $sub_list = $('.topic-' + topic + '.' + 'attr-sub-list');
    enableSubList(topic);
    if($('.ui.form').data('topic') != topic) {
        renderForm(topic);
    }
    setAttrStatus($sub_list, 'selected');
    focusFirstAttr(topic);
}

function enableSubList(topic) {
    var $sub_list = $('.topic-' + topic + '.' + 'attr-sub-list');
    $sub_list.removeClass('disabled');
    $sub_list.children('i').attr('class', 'up angle icon');
    
}

function renderSelections() {
    var $selections = $('.form .field .selection.dropdown');
    for(var i = 0; i < $selections.length; i++) {

        var $selection = $selections.eq(i);
        var type = $selection.parent().attr('data-type');
        var data_id = $selection.parent().attr('data-id');
        $selection.addClass('attr-' + data_id);
        var level = type.substr(3,1);
        type = type.substr(0, 3);
        var title = $selection.parent().children('label').text();
        $selection.popupCitySelector({
            on: 'click',
            onVisible:function() {
                $selection.trigger('focus')
            },
            onHidden:function() {
                $selection.trigger('blur')
            },
            result_text: $selection,
            result_value:$selection.children('input'),
            max_level:level,
            title:title,
            data_url:GET_DICTIONARY_URL + '?type=' + type,
            callback: function (object) {

                //保存字典cache
                if(typeof selection_cathe == 'undefined') {
                    selection_cathe = {};
                }
                selection_cathe[object.code] = object;
                fillSelection($(this),object);
            }
        });
    }
}

function fillSelection($selection, object) {
    var $field = $selection.parent();
    var id = $field.data('id');
    var attr = getAttrbuteById(id);
    var maxLength = attr.maxLength;
    var array = [];
    if(object instanceof Array) {
        array = object;
    } else {
        array.push(object);
    }

    $selection.children('.default.text').hide();
    var $label_array = $selection.children('.label');

    for(var i = 0; i < array.length; i++) {
        var exists = false;
        for(var j = 0; j < $label_array.length; j++) {
            if(array[i].code == $label_array.eq(j).data('code')) {
                exists = true;
                break;
            }
        }
        if(!exists) {
            if(maxLength == 1) {
                $selection.children('.label').remove();
            }
            var $label = newSelectionLabel(array[i]);
            $selection.append($label);
        }
    }
    $selection.trigger('blur');

    function newSelectionLabel(object) {
        var text = object.name;
        if(object.parent != null) {
            text = object.parent.name + text;
        }
        var $label = $('<a class="ui basic label" data-code="' + object.code + '" >' + text + '<i class="delete icon"></i></a>')
        $label.on('click', function () {
            return false;
        }) ;

        $label.find('i.delete').on('click', function() {
            var $label = $(this).parent();
            var $selection = $label.parent();
            var $field = $selection.parent();

            $label.remove();

            if($selection.children('.label').length == 0) {
                $selection.children('.default.text').show();
            }
            $selection.trigger('blur');
            return false;
        });

        return $label;
    }
}

function renderUploader2(id) {

}

function renderUploader(id) {
    var g_obj_path='';
    var g_dirname = '';
    var g_object_name_type = '';
    var g_object_name = '';
    var $field = $('.field.attr-' + id);
    var $browse_button = $field.find('.uploader');
    var browse_button_id = $browse_button.attr('id');
    var field_type = $field.data('type');
    var min_types = [];
    if(field_type == 5 || field_type == 8) {
        min_types = [
            { title : "图片文件", extensions : "jpg,gif,png,bmp" },
            { title : "视频文件", extensions : "mp4,avi,mpg" }
        ]
    } else if(field_type == 7) {
        min_types = [ //只允许上传图片和视频文件
            { title : "图片文件", extensions : "jpg,gif,png,bmp" }
        ]
    } else if(field_type == 9) {
        min_types = [ //只允许上传图片和视频文件
            { title : "视频文件", extensions : "mp4,avi,mpg" }
        ]
    }

    var uploader = new plupload.Uploader({
        browse_button : browse_button_id, //触发文件选择对话框的按钮，为那个元素id
        multi_selection:true,
        url: UPLOAD_URL,
        filters: {
        mime_types : min_types}
    });

    if(typeof window.uploader_map == 'undefined') {
        window.uploader_map = {};
    }
    window.uploader_map[browse_button_id] = uploader;

    uploader.init();
    uploader.settings.id = browse_button_id;
    uploader.bind('UploadProgress', function(up, file) {
        var $image_container = $('.image.id-' + file.id);
        toast($image_container, file.percent + '% 完成');
    });

    uploader.bind('FileUploaded', function (up,file,responseObject) {
        var file_name = up.settings.multipart_params.key.replace(IMAGE_DICTIONARY, '');
        var attr_id = $(up.settings.browse_button).attr('id').replace('upload-', '');
        $field = $('.ui.form .field.attr-' + id);
        //var object = getContentFragmentByAttrId(id);
        var resource = {};
        resource.uri = file_name;
        if(typeof file.type != 'undefined' && file.type.indexOf('image') >= 0) {
            resource.type = 0;
        } else if(typeof file.type != 'undefined' && file.type.indexOf('video') >= 0){
            resource.type = 1
        } else {
            resource.type = 4;
        }
        resource.dataStatus = 'a';
        resource.id = $.getRandomId();
        //object.resourceList.push(resource);
        var $image_container = $('.image.id-' + file.id);
        renderResource(resource, $image_container);
        var $browse_button = $(up.settings.browse_button);
        var $images = $browse_button.parent().children('.images');
        $images.removeClass('empty');
        $images.append($image_container);

        if($images.children('.image').length > 3) {
            var scroll_count = $images.children('.image').length - $images.data('blocked-count') - 3;
            scrollImages($images, scroll_count);
        }
    })

    uploader.bind('UploadComplete', function(up, files) {
        //toast($(up.settings.browse_button), '<i class="upload icon"></i>点击上传图片')

    });

    uploader.bind('BeforeUpload', function (up, file) {
        g_dirname = 'image/project/';
        g_object_name_type = getExtName(file.name);
        var $image_container = $('.image.id-' + file.id);
        toast($image_container, '正在申请空间...');
        $.ajax({
            url:UPLOAD_URL,
            xhrFields:{withCredentials:true},
            async:false,
            success:function (data) {
                data = $.parseJSON(data);
                setOption(data);
            }
        });
    })

    uploader.bind('FilesAdded',function(up,files){

        var attr_id = $(up.settings.browse_button).data('id');
        var $field = $('.field.attr-' + attr_id);
        var $images = $field.find('.images');
        var init_image_count = $images.children('.image').length;
        var init_blocked_count = $images.data('blocked-count');
        var field_type = $field.data('type');
        for(var i = 0; i < files.length; i++) {
            
            var $image_container = renderResourceContainer(files[i], $field);
            $images.append($image_container);
            $images.removeClass('empty');
            if(field_type == 7 || field_type == 8 ||field_type == 7 ) {
                var $numListBar = $images.children('.num');
                newImageNum($numListBar, files[i]);
            }
            toast($image_container, '正在排队...');
        }
        var scroll_count = init_image_count + 1 - 3 - init_blocked_count;
        if(scroll_count > 0) {
            scrollImages($images, scroll_count);
        }
        up.start();
    });

    function setOption(data) {
        g_object_name =  data.filename;
        g_obj_path = g_dirname + g_object_name + g_object_name_type
        var new_multipart_params = {
            key : g_obj_path,
            policy: data.policy,
            OSSAccessKeyId: data.accessid,
            success_actiondataStatus : '200', //让服务端返回200,不然，默认会返回204
            signature: data.signature
        };

        uploader.setOption({
            url: data.host,
            multipart_params: new_multipart_params
        });
    }
}

function  toast($image_container, html) {
    $image_container.children('.toast')[0].innerHTML = html;
}

function switchSubList(topic, isHidden) {
    var $sub_list = $('.topic-' + topic );
    var $sub_title = $sub_list.children('.sub-title');
    if($sub_list.is('.disabled')) {
        alert('该项目前不可用');
        return;
    }
    else if($sub_list.is('.single')) {
        return;
    }
    var $ul = $sub_list.children('ul');
    var interval = $ul.children().length * 15;
    if(interval < 50 ) {
        interval = 50;
    } else if(interval > 150) {
        interval = 150;
    }

    if(isHidden) {
        $sub_list.addClass('hidden');
        $ul.hide(interval);
    } else if(!isHidden) {
        $sub_list.removeClass('hidden');
        $ul.show(interval);
    }
}



