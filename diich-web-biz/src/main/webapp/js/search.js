var aliyun_resource_uri = 'http://resource.efeiyi.com/image/';
var global_keyword = null;
var pageNum = 1;
var pageSize = 6;

$(function() {
    initPage();
});

function initPage() {
    var _header = $('.header');
    var search = _header.find('li.search'); //搜索图标
    var filter = $('.filter_search'); //下拉搜索
    var filterFixed = $('.filter_search_fixed');
    var filterAll = filter.find('.attr span'); //筛选项
    var filterItem = filter.find('.item'); //筛选下来框
    var suggest = filter.find('.suggest');
    var body = $('body');

    //2.点击筛选
    filterAll.on('click', function () {
        var _this = $(this);
        var _index = _this.index();
        var $comb = filterItem.eq(_index);
        $comb.css('left', parseInt(_this.position().left) + 'px');
        $comb.animate({height:'toggle'}, 150);
        $comb.siblings('.item').animate({height:'hide'},50);
    });

    //3.阻止点击自身关闭
    filter.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    //4.点击自身之外的地方关闭下拉框
    $(document).on("click", function () {
        filterItem.animate({height:'hide'}, 50);
        filterFixed.slideUp('fast');
    });

    //自动提示
    /*if (suggest.is(':visible')) {
        body.css('overflow', 'hidden');
        body.append('<div class="overbg"></div>');
    } else {
        body.css('overflow', '');
    }*/

    $('.header .content .nav li').eq(1).addClass('active').siblings('li').removeClass('active');
    $("#ahover").hover(function(){
        $(".drop_menu").show();
    },function(){
        $(".drop_menu").hide();
    });

    $(document).keyup(function(event){
        if(event.keyCode ==13){
            searchDataFromServer();
        }
    });

    buildOneComboUi(category_all, $('#item_1'));

    buildOneComboUi(dic_arr_city, $('#item_2'));

    $('.target-type').on('click', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        pageNum = 1;
        searchDataFromServer();
    });

    $('#searchBtn').on('click', function () {
        var location = 'search.html?';

        if($('#keyword').val() != '' && $('#keyword').val() != null) {
            location += 'keyword=' + $('#keyword').val() + '&';
        }
        if($('#attr_text').attr('data-id') != null && $('#attr_text').attr('data-id') != '0') {
            location += 'gb_category_code=' + $('#attr_text').attr('data-id') + '&';
        }
        if($('#area_text').attr('data-id') != null && $('#area_text').attr('data-id') != '') {
            location += 'area=' + $('#area_text').attr('data-id') + '&';
        }

        location = location.substr(0, location.length - 1);

        window.location = location;
    });
    
    $('#loadmore').on('click', function () {
        $('#loadmore').text('Loading...');
        pageNum += 1;
        searchDataFromServer();
    });

    initParams();
}

function initParams() {
    global_keyword = getQueryString('keyword');
    var category = getQueryString('gb_category_code');
    var area = getQueryString('area');

    if(global_keyword != null && global_keyword != '' && global_keyword != 'undefined') {
        $('#keyword').val(global_keyword);
    }
    if(category != null && category != '' && category != 'undefined' && category != '0') {
        var _text = getSingleCategoryText(category, category_all);
        $('#attr_text').text(_text);
        $('#attr_text').attr('data-id', category);
    }
    if(area != null && area != '' && area != 'undefined') {
        var _text = getSingleCityText(area, dic_arr_city);
        $('#area_text').text(_text);
        $('#area_text').attr('data-id', area);
    }

    searchDataFromServer();
}

function searchDataFromServer() {
    var condition = buildCondition();

    $.ajax({
        type: 'post',
        url: '../search',
        data: {'condition':JSON.stringify(condition)},
        dataType: 'json',
        beforeSend:function() {
            progress.start();
        },
        success: function(data) {
            buildSearchResultUi(data);
        },
        error: function () {

        },
        complete: function () {
            progress.stop();
        }
    });
}

function buildCondition() {
    var condition = {};

    var keyword = global_keyword;
    if(keyword != null && keyword != '') {
        condition.keyword = filterStr(keyword);
        $('#keyword').val(keyword);
    }

    var target_type = $('.links .active').attr('data-id');
    if(target_type != 'all' && target_type != null) {
        condition.type = target_type;
    }

    var category = $('#attr_text').attr('data-id');
    if(category != null && category != '' && category != 0) {
        condition.category = category;
    }

    var area = $('#area_text').attr('data-id');
    if(area != null && area != '') {
        condition.area = area;
    }

    condition.offset = (pageNum - 1) * pageSize;
    condition.pageSize = pageSize;

    return condition;
}

function buildSearchResultUi(data) {
    $('.load_more').hide();

    if(pageNum == 1) {
        $('#content').children().remove();
        $("#totalCount").text('0');
    }

    if(data == null || data.data == null || data.data.length == 0) {
        return;
    }

    $("#totalCount").text(data.total);

    var template = $('.template')[0].outerHTML;
    var array = data.data;
    for(var i = 0; i < array.length; i ++) {
        var $ui = null;
        if(typeof array[i].project != 'undefined') {
            $ui = fillProjectData(array[i].project, template);
        } else if(typeof array[i].master != 'undefined') {
            $ui = fillMasterData(array[i].master, template);
        }
        $('#content').append($ui);
    }

    if(data.total > (pageNum - 1) * pageSize + pageSize) {
        $('#loadmore').text('Load More');
        $('.load_more').show();
    }
}

function fillProjectData(project, template) {
    var attrMap = {};
    attrMap.headImage = 112;
    attrMap.title = 4;
    attrMap.doi = 2;
    attrMap.summary = 9;

    var $ui = $(template);
    fillCommonByContentList(project, 'project', attrMap, $ui);

    if(project.ichCategoryId != null) {
        $ui.find('#category').parent().show();
        $ui.find('#category').text(getCategoryTextById(project.ichCategoryId));
    }

    $ui.find('#icon').removeClass('icon_list_user').addClass('icon_list_cate');
    return $ui;
}

function fillMasterData(master, template) {
    var attrMap = {};
    attrMap.headImage = 113;
    attrMap.title = 13;
    attrMap.doi = 11;
    attrMap.summary = 24;

    var $ui = $(template);
    fillCommonByContentList(master, 'master', attrMap, $ui);

    if(master != null && master.ichProject != null) {
        var $ich_project = $ui.find('#ich_project');
        $ich_project.parent().parent().show();

        var contentList = master.ichProject.contentFragmentList;
        for(var i = 0; i < contentList.length; i ++) {
            if(contentList[i].attributeId == 4) {
                $ich_project.text(contentList[i].content);
                $ich_project.parent().attr('href', 'http://resource.efeiyi.com/html/project/'+
                    master.ichProject.id +'.html?lang=' + getCurrentLanguage());
            }
        }
    }

    return $ui;
}

function fillCommonByContentList(object, type, attrMap, $ui) {
    var map = {};

    if(object == null) {
        return;
    }

    var contentList = object.contentFragmentList;
    for(var i = 0; i < contentList.length; i ++) {
        if(contentList[i].attributeId == attrMap.headImage) {
            var head_image = getHeadImage(contentList[i], type);
            if(head_image != null) map['headImage'] = head_image;
        } else if(contentList[i].attributeId == attrMap.title) {
            map['title'] = contentList[i].content;
        } else if(contentList[i].attributeId == attrMap.doi) {
            map['doi'] = contentList[i].content;
        } else if(contentList[i].attributeId == attrMap.summary) {
            map['summary'] = contentList[i].content;
            if(map['summary'] != null && map['summary'].length > 108) {
                map['summary'] = map['summary'].substr(0, 108) + '...';
            }
        }
    }

    $ui.removeClass('template');
    var attr_arr = $ui.find('.attr');
    for(var i = 0; i < attr_arr.length; i ++) {
        var _attr = attr_arr[i];
        var attr_name = $(_attr).attr('attrName');
        if(typeof map[attr_name] != 'undefined') {
            if($(_attr).hasClass('head-image')) {
                $ui.find('#' + attr_name).attr('src', map[attr_name]);
                $ui.find('#' + attr_name).parent().attr('href', 'http://resource.efeiyi.com/html/'+ type +'/'+
                    object.id +'.html?lang=' + getCurrentLanguage());
            } else if($(_attr).is('a')) {
                $ui.find('#' + attr_name).text(map[attr_name]);
                $ui.find('#' + attr_name).attr('href', 'http://resource.efeiyi.com/html/'+ type +'/'+
                    object.id +'.html?lang=' + getCurrentLanguage());
            } else {
                $ui.find('#' + attr_name).text(map[attr_name]);
            }
        }
    }
}

//进度条
var progress = {
    start:function () {//搜索进度条
        $('#totalCount').parent().hide();
        $('#search_count').parent().hide();
        $('.waiting').show();
    },
    stop:function () {//关闭
        $('#totalCount').parent().show();
        $('#search_count').parent().show();
        $('.waiting').hide();
    }
};

function switchResultMode() {
    if ($('.icon_tab').hasClass('active')) { //九宫格
        $('.icon_tab').removeClass('active');
        $('.pro_column3').removeClass('active');

        $("#content").find("img").each(function (){
            var aa = $(this).attr("src");
            if(aa.indexOf("..")==-1){
                var str = aa.substr(0,aa.indexOf("?"));
                $(this).attr("src",str+"?x-oss-process=style/search-result-grid-image");
            }
        });
    } else { //横排
        $('.icon_tab').addClass('active');
        $('.pro_column3').addClass('active');
    }
}

function filterStr(str) {
    var pattern = new RegExp("[_%]");
    var specialStr = '';
    for(var i=0;i<str.length;i++)
    {
        specialStr += str.substr(i, 1).replace(pattern, '\\' + str.substr(i, 1));
    }
    return specialStr != '' ? specialStr : null;
}

function getHeadImage(content, type) {
    var head_image = null;
    if(content.resourceList != null && content.resourceList.length > 0) {
        head_image = content.resourceList[0].uri;
        if(head_image.indexOf('http') > 0) {
            head_image += '?x-oss-process=style/search-result-list-image';
        } else {
            head_image = aliyun_resource_uri + type + '/' + head_image + '?x-oss-process=style/search-result-list-image';
        }
    }
    return head_image;
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
        $li.attr('data-id', data[i].gbCategory != null ?
            data[i].gbCategory : data[i].code);
        if(curr_lang == 'en') {
            $li.text(data[i].eNname);
        } else {
            $li.text(data[i].name);
        }

        $li.hover(function () {
            var li_data_id = $(this).attr('data-id');
            var oneComboChildre = null;

            for(var j = 0; j < data.length; j ++) {
                if(data[j].gbCategory == li_data_id || data[j].code == li_data_id) {
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
                $('#attr_text').attr('data-id', li_data_id);
                $('#attr_text').text(li_name);
            } else if(container_id == 'country') {
                $('#area_text').attr('data-id', li_data_id);
                $('#area_text').text(li_name);
            }

            $ui.animate({height:'hide'},50);

            pageNum = 1;
            searchDataFromServer();
        });

        $container.append($li);
    }

}

function buildTwoComboUi(data, data_id, $ui) {
    var $container = $ui.find('.level2 ul');
    $container.children().remove();
    var twoData = [];

    for(var i = 0; i < data.length; i ++) {
        var tmp = data[i].gbCategory != null ? data[i].gbCategory : data[i].code;

        if(tmp == data_id) {
            twoData = data[i].children;
            break;
        }
    }

    var curr_lang = getCurrentLanguage();

    for(var i = 0; i < twoData.length; i ++) {
        var $li = $('<li></li>');
        $li.attr('data-id', twoData[i].gbCategory != null ?
            twoData[i].gbCategory : twoData[i].code);

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
                $('#attr_text').attr('data-id', li_data_id);
                $('#attr_text').text(li_name);
            } else if(container_id == 'citycontent') {
                $('#area_text').attr('data-id', li_data_id);
                $('#area_text').text(li_name);
            }

            $ui.animate({height:'hide'},50);

            pageNum = 1;
            searchDataFromServer();
        });
        
        $container.append($li);
    }
}
