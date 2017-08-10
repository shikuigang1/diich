/**
 * Created by Administrator on 2017/8/3.
 */

$(function() {
    init();
})

var edit_project_tmp = '<div class="edit-project-tool-bar">' +
    '<div class="inner">' +
    '<button class="ui save button">暂存</button>' +
    '<button class="ui add button">新增项</button>' +
    '<button class="ui submit primary button">提交</button>' +
    '<button class="ui abandon red button">放弃</button>' +
    '</div>' +
    '<div>';

var header_edit_html = '<div class="group">' +
    '<label class="label" for=""><em>*</em>分类</label>' +
    '<div class="control">' +
    '<div class="ipt w310" data-type="selectCate" value="28" data-index="2">传统手工艺技能</div>' +
    '<div class="errors" style="display: none"><i></i>请选择分类</div>' +
    '</div>' +
    '</div>';



function init() {
    $('.edit.link').on('click', function() {
        displayEditMode();
    })
}

function displayEditMode() {
    var $edit_project_tool_bar = $(edit_project_tmp);
    $('.header.header_detail').after($edit_project_tool_bar);
    $('.header.header_detail').hide();
    $('.edit.link').hide();
    var $edit_link = $('<span class="edit link">编辑</span>');
    $('.title').append($edit_link);

    $('.abandon.button').on('click', function () {
        displayReadMode();
    })

    $('.edit.link').on('click', function () {
        var $section = getSection(this);
        //var $inner = $('<div class="inner"></div>');
        //$section.find('.edit.link').hide();
        //$inner.append($section.children());
        //$section.append($inner);
        //var $header_edit_html = $(header_edit_html);
        //$inner.hide();
        /*$.ajax({
            url:"../page/header_edit_html.html",
            success:function (data) {
                var $edit_panel = $(data);
                $section.append($edit_panel);

            }
        })*/

        var $article = $section.find('article');
        var p_text = $article.find('p').text();
        $article.hide();

        var $text_area = $('<textarea id="input" style="width:400px; height:200px"></textarea>');
        $section.find('.card').append($text_area);
        var editor = buildNewEditor();

        $(this).hide();
        var $save_link = $('<span class="save link">保存</span>');
        $(this).parent().append($save_link);

        $save_link.on('click', function () {
            editor.post();

            $article.show();
            $article.find('p').text('');
            $article.find('p').append($('#input').val())

            $('.te').remove();

            $(this).hide();
            $save_link.parent().find('.edit').show();
        });

        editor.e.body.append(p_text);

        //$section.append($header_edit_html);
    })
}

function displayReadMode() {
    $('.edit-project-tool-bar').remove();
    $('.header.header_detail').show();
    $('.primary.edit.link').show();
    $('.title>.edit.link').remove();
}

function getSection(edit_link) {
    var parent = $(edit_link).parent();
    while(!parent.is('section') && !parent.is('.section')) {
        parent = parent.parent();
    }
    return parent;
}

function buildNewEditor() {
    var instance = new TINY.editor.edit('editor',{
        id:'input',
        width:1168,
        height:175,
        cssclass:'te',
        controlclass:'tecontrol',
        rowclass:'teheader',
        dividerclass:'tedivider',
        controls:['bold','italic','underline','strikethrough','|','subscript','superscript','|',
            'orderedlist','unorderedlist','|','outdent','indent','|','leftalign',
            'centeralign','rightalign','blockjustify','|','unformat','|','undo','redo'],
        footer:true,
        fonts:['Verdana','Arial','Georgia','Trebuchet MS'],
        xhtml:true,
        cssfile:'style.css',
        bodyid:'editor',
        footerclass:'tefooter',
        //toggle:{text:'source',activetext:'wysiwyg',cssclass:'toggle'},
        resize:{cssclass:'resize'}
    });

    return instance;
}



