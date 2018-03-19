
jQuery.fn.extend({
    popupCitySelector:function(option) {
        if(option == 'destory') {
            $(this).popup('destroy');
            return;
        }
        init.call(this);
        

        function init() {
            option.position = 'bottom left';
            option.variation = 'basic';

            var popui_tmpl = ' <div class="ui city popup">' +
                '<div class="header">国家、地区或城市</div>' +
            '</div>';

            var $popup = $(popui_tmpl);
            $popup.addClass('popup-' + $(this).data('id'));
            $('body').append($popup);
            $(this).popup = $popup;
            this.option = option;
            if(!$.isNumeric(this.option.max_level)) {
                this.option.max_level = 5;
            }

            option.popup = $('.ui.city.popup');
            option.onShow = function() {
                this.popup('get popup').find('.header').text(this.option.title);
                loadData.call(this, 0, 0);
            }.bind(this);

            option.onHide = function () {
                $(this.popup('get popup')).children('ul').remove();
            }.bind(this);

            $(this).popup(option);

        }

        function loadData(parentId, level) {
            initListContainer.call(this, parentId, level);
            //var data = getDictionaryById(parentId, 101);
            //showData.call(this, data, level, parentId);
            this.req = $.getJSON(this.option.data_url + '&parentId='+parentId, function (result) {
                var data = result.data;
                showData.call(this, data, level, parentId);
            }.bind(this));
            this.req.parentId = parentId;

        }

        function initListContainer(parentId, level) {
            var $ul_array = $(this.popup('get popup').children('ul'));
            for(var i = 0; i < $ul_array.length; i++) {
                if(typeof $ul_array.eq(i).data('level') != 'undefined' &&
                    $ul_array.eq(i).data('level') >= level) {
                    $ul_array.eq(i).remove();
                }
            }
            var $ul = $('<ul></ul>');
            $ul.data('level', level);
            $ul.addClass('ul-level-' + level);
            $ul.data('parent-id', parentId);
            $ul.addClass('parent-id-' + parentId);
            $ul.addClass('loading');
            $(this.popup('get popup')).append($ul);
            resize.call(this);
        }

        function showData(array, level, parentId) {
            var $ul = $(this.popup('get popup')).find('ul.parent-id-' + parentId);
            $ul.removeClass('loading');
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                var $li = $('<li></li>');
                $name = $('<span>' + item.name + '</span>');
                $li.append($name);
                $li.addClass('id-' + item.id);


                if(this.option.max_level > level && item.childCount > 0) {
                    var $child_count = $('<span></span>');
                    $child_count.text('(' + item.childCount + ')');
                    $li.append($child_count);
                    $li.data('has-child', true);
                    $li.addClass('has-child');
                    $li.append($('<i class="right angle icon"></i>'));
                }

                $li.data('id', item.id);
                $li.data('code',item.code);

                $ul.append($li);
            }

            bindEvent.call(this, $ul);
            resize.call(this);
        }

        function  resize() {
            var ul_count = $(this.popup('get popup')).find('ul').size();
            var $ul_list = $(this.popup('get popup')).find('ul');
            var width = 0;
            for(var i = 0; i < $ul_list.length; i++) {
                width += $ul_list.eq(i).outerWidth() +  48;
            }
            width = width - 43;

            $(this.popup('get popup')).find('.header')[0].style.width = width + 'px';
        }

        function getCity_Array(parentId, callback) {
            var $self = this;

            $.getJSON(DATA_URL + '&parentId=' + parentId, function (result) {
                var data = result.data;
                var array = [];
                for(var i = 0; i < data.length; i++) {
                    if((parentId == null && data[i].parent_id == null ) || (parentId != null && parentId == data[i].parent_id)) {
                        array.push(data[i]);
                    }
                }
                callback.call(this, array);
            }.bind(this));
            //callback(getDictionaryById(parentId, 101));
        }

        function bindEvent($ul) {
            var level = Number($ul.data('level')) + 1;
            $ul.children('li').on('mouseenter', function (e) {
                $ul.children('.selected').removeClass('selected').children('i.icon').removeClass('arrow').addClass('angle');
                $(e.currentTarget).addClass('selected').children('i.icon').addClass('arrow');
                var id = $(e.currentTarget).data('id');
                removeChildCity.call(this, level);
                if(level <= this.option.max_level -1 && $(e.currentTarget).find('.angle').length > 0 ) {
                    loadData.call(this, id, level);
                }
            }.bind(this));
            $ul.children('li').on('mouseleave', function (e) {
                if(this.req != null) {
                    this.req.abort();
                    console.log(this.req.parentId);
                    this.req = null;
                }
                var $ul = $(e.currentTarget).parent().next();
                if($ul.children().length == 0) {
                    $(e.currentTarget).parent().next().removeClass('loading');
                }
            }.bind(this));
            /*
            $ul.children('li').on('click', function (e) {
                this.popup.popup('hide all');
                if(typeof this.option.callback != 'undefined') {
                    var id = $(e.currentTarget).data('id');
                    var city = getCityById.call(this, id);
                    setResult.call(this, city);
                }
            }.bind(this))*/
            $ul.children('li').on('click', function (e) {
                if(typeof this.option.callback != 'undefined') {
                    var id = $(e.currentTarget).data('id');
                    var city = getCityById.call(this, id);
                    this.option.callback.call(this, city);
                }
                $(this).popup('hide');
            }.bind(this));
        }

        function setResult(city) {
            var $label = $('<a class="ui label" data-value="' + city.id + '" >' + city.name + '<i class="delete icon"></i></a>');
            this.option.result_text.append($label);
            var $default_text = this.option.result_text.children('.default.text');
            if($default_text.length != 0) {
                $default_text.remove();
                this.default_text = $default_text;
            }

            setValue.call(this);

            $label.find('i.delete').on('click', function() {
                $(event.currentTarget).parent().remove();
                if(this.option.result_text.children('.label').length == 0) {
                    this.append(this.default_text);
                }
                setValue.call(this);
                return false;
            }.bind(this));

            $label.on('click', function () {
                return false;
            });

            function setValue() {
                var value = '';
                for(var i = 0;  i < this.option.result_text.children('.label').length; i++) {
                    if(value != '') {
                        value += ',';
                    }
                    value += this.option.result_text.children('.label').eq(i).data('value');
                }
                this.option.result_value.val(value);
            }
        }

        function getCityById(id) {
            var $li = $('.id-' + id);
            var $ul = $li.parent();
            var city = {};
            city.id = id;
            city.code = $li.data('code');
            var parentId = $ul.data('parent-id');
            city.parentId = parentId;
            var name = $li.children().eq(0).text();
            while(parentId != 0) {
                var $li = $('.id-' + parentId);
                name = $li.children().eq(0).text() + name;
                var parentId = $li.parent().data('parent-id');
            }
            city.name = name;
            return city;
        }

        function removeChildCity(level) {
            var $uls = $(this.popup('get popup')).children('ul');
            for(var i = 0; i < $uls.length; i++) {
                if($uls.eq(i).data('level') >= level) {
                    $uls.eq(i).remove();
                }
            }
            resize.call(this);
        }
    }
})