/**
 * utils 工具类 提供公有方法
 * @author xiaojinglong
 */
(function ($) {
  //常量池
  var toString = Object.prototype.toString,
      uploads = [], deluploads = {},
      ACCESSURL = "http://192.168.1.176:83/",
      VIDEO_ACCESSURL = "http://192.168.1.176:83/",
      _thisScript = "";


  // 获取项目前缀
  (function (script, i, me) {
    for (i in script) {
      // 如果通过第三方脚本加载器加载本文件，请保证文件名含有"artDialog"字符
      if (script[i].src && script[i].src.indexOf('utils') !== -1) me = script[i];
    };

    _thisScript = me || script[script.length - 1];
    me = _thisScript.src.replace(/\\/g, '/');
    return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
  }(document.getElementsByTagName('script')));
  ACCESSURL = VIDEO_ACCESSURL = _thisScript.src.split('prefix=')[1];
  /**
   * 常用utils类
   * @class commonUtils
   */
  var commonUtils = {
    /**
     * 只提供绑定class
     *
     * 支持区间选择/单向选择, 支持链式操作
     *
     * 想为 endDate|beginDate 做预先限定  设置为空 因为取得的为 服务器时间需自定义 curDate 属性(在DOM上直接写入);
     *		dateInit.init(null, "endDate");
     *
     * @author xiaojinglong
     * @module dateinit
     * @property init
     * @param beginDate, endDate / beginDate
     * @example
     *		dateInit.init("beginDate", "endDate");
     *		dateInit.init("beginDate");
     *		dateInit.init("beginDate", "endDate").init("beginDate2", "endDate2");
     */
    datainit: function () {
      var arg = arguments,
          _id,
          _minDate = null,
          _maxDate = null,
          extParams = {};

      var len = arg.length;

      //解决IE null 为 [object Object] 问题
      if (arg[1] != null && Object.prototype.toString.call(arg[1]) === "[object Object]") {
        len = 1;
      }

      switch (len) {
        case 1:
          _id = "#" + arg[0];
          extParams = arg[1];
          $.datepicker["getCurDateExt"] = function () {
            //return $(this).attr("curDate") ? new Date($(this).attr("curDate")) : '';
            return extParams && extParams["curDate"] ? extParams["curDate"] : '';
          };
          break;
        case 2:
          extParams = arg[2];
          $.datepicker["getCurDateExt"] = function () {
            //return $(this).attr("curDate") ? new Date($(this).attr("curDate")) : '';
            return extParams && extParams["curDate"] ? extParams["curDate"] : '';
          };
          _id = (function (arg) {
            var ids = ["#" + arg[0], ",", "#" + arg[1]];
            if (arg[0] == null) {
              _minDate = $.datepicker.getCurDateExt();
              Array.prototype.splice.call(ids, 0, 2);
            } else if (arg[1] == null) {
              _maxDate = $.datepicker.getCurDateExt();
              Array.prototype.splice.call(ids, 1, 2);
            }
            return ids.join("");
          })(arg);
          break;
        case 3:
          extParams = arg[2];
          $.datepicker["getCurDateExt"] = function () {
            //return $(this).attr("curDate") ? new Date($(this).attr("curDate")) : '';
            return extParams && extParams["curDate"] ? extParams["curDate"] : '';
          };
          _id = (function (arg) {
            var ids = ["#" + arg[0], ",", "#" + arg[1]];
            if (arg[0] == null) {
              _minDate = $.datepicker.getCurDateExt();
              Array.prototype.splice.call(ids, 0, 2);
            } else if (arg[1] == null) {
              _maxDate = $.datepicker.getCurDateExt();
              Array.prototype.splice.call(ids, 1, 2);
            }
            return ids.join("");
          })(arg);
          break;
        default:
          _id = "#beginDate,#endDate";
      }

      var params = {
        beforeShow: function (input) {
          $(input).css({
            "position": "relative",
            "z-index": 999999
          });
          var obj = {};
          _clear(input);
          if (len !== 1) {
            if (extParams && !$.isEmptyObject(extParams["closeMin"]) && extParams["closeMin"]["flag"]) {
              extParams["closeMin"].hasOwnProperty("curDate") && (obj["minDate"] = extParams["closeMin"]["curDate"]());
            } else {
              obj["minDate"] = $(input).attr("id") === arg[1] && arg[0] != null && $("#" + arg[0]).val() ? $("#" + arg[0]).datepicker("getDate") : (_minDate ? _minDate : $.datepicker.getCurDateExt());
            }
            obj["maxDate"] = ($(input).attr("id") === arg[0] && arg[1] != null ? $("#" + arg[1]).datepicker("getDate") : _maxDate);
          }
          return obj;
        },
        //showOn: "both",
        //buttonImage: "./static/images/pana_15.jpg",
        buttonImageOnly: false,
        dateFormat: "yy-mm-dd",
        showButtonPanel: true,
        autoSize: true
      };

      params = $.EU.clone(params, extParams);

      function _clear(input) {
        //清除按钮绑定事件  today改为clear
        $(".selector").datepicker( "option", "gotoCurrent", false);
        /* $(".ui-datepicker-close").die().live("click", function () {
         $(input).val('');
         });*/
      }

      $(_id).datepicker(params).attr("readonly", "readonly");
      return this;
    },
    /**
     *
     * 首字母大写转换
     * @method initcap
     * @params
     * @example
     * 只限于 urlwriter 后 "./flight/policy/ajaxList"
     */
    initcap: function (url) {
      return url.replace(/\w+$/, function (regex) {
        return regex.replace(/\^w{1}/, function (m) {return m.toUpperCase(); });
      });
    },
    /**
     * form 表单序列化
     * @author xiaojinglong
     * @method formSerialize
     * @param 表单id
     * @param flag 不去除空格
     */
    formSerialize: function (form_id, flag) {
      var params_seria = $("#" + form_id).serializeArray(), params = {}, filter;

      if (toString.call(flag) == "[object Array]") {
        filter = flag;
        flag = arguments[2] || "";
      }

      //参数组合
      $.each(params_seria, function (key, value) {
        var defaultVal = $("[name='" + value.name + "']").attr("placeholder");

        if (value.value == defaultVal) {
          return true;
        }

        //过滤属性
        var filter_boolean = false;
        if (filter) {
          $.each(filter || [], function (index, pattern) {
            if (new RegExp("^" + pattern, "g").test(value.name)) {
              filter_boolean = true;
              return true;
            }
          });
          if (filter_boolean) {
            return true;
          }
        }

        if (params.hasOwnProperty(value.name)) {
          var na = [];
          na.push(params[value.name]);
          na.push(value.value);
          params[value.name] = na.join(",");
        } else {
          value.value || flag ? (params[value.name] = $.trim(value.value)) : "";
        }

      });

      return params;
    },
    /**
     * 打印日志
     * @method log
     */
    log: function () {
      if(window.console){
        console.log( Array.prototype.slice.call(arguments) );
      }
    },
    /**
     * 取出所有的keys 如果 Object.keys 支持则使用
     */
    keys : Object.keys || function(obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object');
      var keys = [];
      for (var key in obj) if (obj.hasOwnProperty(key)) keys[keys.length] = key;
      return keys;
    },
    /**
     *
     * 第一个参数 要添加的属性对象
     * 第二个参数 要合并的对象
     * 不合并重复值
     * @method clone
     * @param {Object} 被克隆的对象
     * @param {Object} 如果存在表示 要合并的对象
     * @return {Object} 返回结果
     */
    clone: function () {
      var obj = arguments[1] || {}, arg = arguments[0] || [], exclude = arguments[2] || false;
      if (toString.call(arg) === "[object Array]") {
        obj = commonUtils.cloneArray(arg, obj);
      } else {
        $.each(arg, function (key, value) {
          if (!commonUtils.has(obj, key)) {
            if (value && toString.call(value) === "[object Array]") {
              obj[key] = commonUtils.cloneArray(value);
            } else if (value && toString.call(value) === "[object Object]"){
              obj[key] = commonUtils.clone(value);
            } else {
              obj[key] = value;
            }
          } else {
            if (obj === true || exclude === true) {
              !obj[value] && delete obj[key];
            }
          }
        });
      }
      return obj;
    },
    /**
     * 复制数组并返回新数组
     *
     * @param arr
     * @param {Array} 如果存在表示 要合并的对象
     * @return {Array}
     * @deprecatede
     */
    cloneArray: function (arr) {
      var newArray = commonUtils.isEmpty(arguments[1]) || $.isEmptyObject(arguments[1]) ? [] : arguments[1];

      $.each(arr, function (key, value) {
        newArray.push(toString.call(value) === "[object Object]" ? commonUtils.clone(value) : value);
      });
      return newArray;
    },
    /**
     * 对象是否存在此属性
     *
     * @method has
     * @return {Boolean}
     */
    has: function (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    },
    /**
     * 是滞为空
     * @param obj
     * @returns {Boolean}
     */
    isEmpty: function (obj) {
      if (obj == null) {
        return true;
      }
      if (toString.call(obj) === "[object Array]" || toString.call(obj) === "[object String]") {
        return obj.length === 0;
      }
      for (var key in obj) {
        if (commonUtils.has(obj, key)) {
          return false;
        }
      }
      return true;
    },
    /**
     * 初始化上传控件
     * @param id 绑定上传ID
     * @param params 上传请求参数
     * @param success 成功回调地址
     * @param error 错误回调地址
     * @param ext 参数多的
     */
    uploader: function (id, params, success, error, before, ext) {
      var retParams = {};
      //回值
      if (toString.call(success) != "[object Function]") {
        retParams = success;
        success = error;
        error = before;
        before = ext;
        ext = arguments[6];
      }
      if (!params) params = {};
      //$("#" + id).append(commonUtils.template("<div id=\"{{id}}_uper\">{{title}}</div><div id=\"{{id}}_list\"></div><div style=\"clear:both;\"></div>")({"title": params["title"] || "请选择文件", "id": id}));
      //$("#" + id).append('<div id="' + id + '_uper">' + title + '</div><div id="' + id + '_list"></div><div style="clear:both;"></div>');
      commonUtils._webuploader(id, params, retParams, success, error, before, imageHtml);
    },
    /**
     * 上传私有方法
     * @param id 上传绑定ID
     * @param params 上传请求参数
     * @param retParams 回值参数
     * @param success 成功回调
     * @param error 错误回调
     * @param imageslisttpl 模板事件绑定
     * @private
     */
    _webuploader: function (id, params, retParams, success, err, before, imageslisttpl) {

      var webuploadparams = {
        pick: {
          id: "#" + id,
          classes: params["classes"] || "",
          multiple: params["multiple"] // 是否开启同时选择多个文件
        },
        accept: {
          extensions: params["ext"] || 'gif,jpg,jpeg,bmp,png', // 只允许上传的图片格式
          mimeTypes: params["mimeTypes"] || 'image/jpg,image/jpeg,image/png'
        },
        compress: false,
        server: (params["server"] || server) + "?v=" + new Date().getTime() // 文件接收服务端
      };
      $.EU.clone(defauloptions, webuploadparams);
      $.EU.clone(params, webuploadparams);
      //清空数据集
      uploads[id] = [];
      deluploads = {};
      //设置
      $("#" + id).css("width", (params["wicon"] || params["width"])).css("height", params["hicon"] || params["height"]);
      WebUploader.create(webuploadparams).on("beforeFileQueued", before || function () {}).on( 'fileQueued', function( file ) {
        //file["id"] = id + "_" + file["id"].split("_").pop();
        var $this = this;
        /*if (params["single"] && this.getFiles().length > 0) {
         file.id = this.getFiles()[0].id;
         }*/
        file["opt"] = params["opt"] == false ? false : true;
        params["make"] && (file["make"] = params["make"]);
        var $img = $("#" + file.id).find("img");
        file["width"] = params["width"] || "150px";
        file["height"] = params["height"] || "150px";
        if (!params["single"] || $img.length == 0) {
          var $li = $(commonUtils.template(imageslisttpl, {"file": file})),
              $img = $li.find('img');
          //单个页面删除原有上传按钮
          if (params["single"]) {
            $("#" + (params["renderId"] || id) + "-list").html( $li );
            deluploads = {};
            // $("#" + id).remove();
          } else {
            // $list为容器jQuery实例
            $("#" + (params["renderId"] || id) + "-list").prepend( $li );

            // zhangtianci update 多图时添加描述
            var decId = $li.attr("id") + "_dec";
            $img.after('<br><input id="' + decId + '" style="width: 100px;" type="text" placeholder="添加描述">');
          }
        }

        if (!params["nothumb"]) {
          // 创建缩略图
          // 如果为非图片文件，可以不用调用此方法。
          // thumbnailWidth x thumbnailHeight 为 100 x 100
          this.makeThumb( file, function( error, src ) {
            if ( error ) {
              $img.replaceWith('<span>不能预览</span>');
              return;
            }
            $img.attr( 'src', src );
            $img.attr( 'id',  id + "_img");
          }, file.width.replace("px", ""), file.height.replace("px", ""));
        }
        if (!params["noopt"]) {
          // 进度条
          if(params.progress) {
            var $li = $("#" + file.id);
            if($li.attr("uploaded")) return;
            var $percent = $li.find('.progress-bar');
            // 避免重复创建
            if (!$percent.length) {
              $percent = $('<div class="progress-container"><div class="progress-bar-shadow"></div><div class="progress-bar-bg"></div><div class="progress-bar"></div></div>').appendTo($li).find('.progress-bar');
            }
          } else {
            _onImageOpt(id, file, params, err);
          }
        }
      }).on( 'uploadProgress', function(file, percentage) {
        // 进度条
        //if(params.progress) {
        //  $($img).after('<div class="progress-container"><div class="progress-bar-shadow"></div><div class="progress-bar-bg"></div><div class="progress-bar"></div></div>');
        //}
        if(params.progress) {
          var $li = $("#" + file.id);
          if($li.attr("uploaded")) return;
          var $percent = $li.find('.progress-bar');
          // 避免重复创建
          if (!$percent.length) {
            $percent = $('<div class="progress-container"><div class="progress-bar-shadow"></div><div class="progress-bar-bg"></div><div class="progress-bar"></div></div>').appendTo($li).find('.progress-bar');
          }
          $percent.css('width', percentage * 100 + '%');
          if(percentage == 1) {
            $li.attr("uploaded", "uploaded");
            $li.find('.progress-container').remove();
            if (!params["noopt"]) {
              _onImageOpt(id, file, params, err);
            }
          }
        }
      }).on('uploadSuccess', function( file , responseJSON) {
        //$( '#'+file.id ).find('p.state').text('已上传');
        _setImageQueue(id, {"renderId": retParams["renderId"], "path": responseJSON.basePath, "name": file["name"], "id": file["id"], "embed": responseJSON["embed"], "type": responseJSON["type"] || 1});

        success && success(responseJSON, file);
        // 删除
        if(params.progress) {
          _onImageOpt(id, file, params, err);
        }
      }).on('uploadError', function( file ) {
        // 删除
        if(params.progress) {
          _onImageOpt(id, file, params, err);
        }
      }).on('uploadComplete', function( file) {});

      !$.isEmptyObject(retParams) && (toString.call(retParams) == "[object Function]" || __showImage(id, retParams, params, success));

      if (params["single"] && !commonUtils.isEmpty(retParams)) $("#" + id).remove();
      /**
       * 回显图片 - artmall-admin
       * @param preid
       * @param attaInfo
       * @private
       */
      function __showImage(preid, attaInfo, params, success) {

        if (params.hasOwnProperty("renderId")) {
          preid = params["renderId"];
        }

        var htmlattr = [],
            preidn = preid.lastIndexOf("_") != -1 ? preid+"_" : preid, i = 0,
        params = params || {}, filearr = [];
        if(attaInfo && typeof attaInfo === 'object') {
          if (attaInfo instanceof Array) {
            for(var j = attaInfo.length; i<j; i++) {
              var file = {};
              file["id"] = preidn + i;
              file["name"] = attaInfo[i]["attaName"];

              if (attaInfo[i]["type"] == 1) {
                file["accessUrl"] = ACCESSURL + attaInfo[i]["attaAddr"];
              } else {
                file["accessUrl"] = VIDEO_ACCESSURL + attaInfo[i]["attaAddr"];
              }

              file["attaAddr"] = attaInfo[i]["attaAddr"];
              file["opt"] = params["opt"] == false ? false : true;
              file["width"] = params["width"] || "150px";
              file["height"] = params["height"] || "150px";
              file["type"] = attaInfo[i]["type"] || 1;
              file["embed"] = attaInfo[i]["embed"] || '';
              var $li = $(commonUtils.template(imageslisttpl, {"file": file}));
              var $img = $li.find("img");
              // zhangtianci update 多图时添加描述
              var decId = $li.attr("id") + "_dec";
              $img.after('<br><input id="' + decId + '" style="width: 100px;" type="text" value="' + attaInfo[i]["desc"] + '" placeholder="添加描述">');

              htmlattr.push($li.prop("outerHTML"));
              _setImageQueue(preid, {"path": file["attaAddr"], "name": file["name"], "id": file["id"], "type": file["type"], "embed": file["embed"]});
              filearr.push(file);
            }
          } else {
            var file = {};
            file["id"] = preidn + 0;
            file["name"] = attaInfo["attaName"];

            if (attaInfo["type"] == 1) {
              file["accessUrl"] = ACCESSURL + attaInfo["attaAddr"];
            } else {
              file["accessUrl"] = VIDEO_ACCESSURL + attaInfo["attaAddr"];
            }

            file["attaAddr"] = attaInfo["attaAddr"];
            file["opt"] = params["opt"] == false ? false : true;
            file["width"] = params["width"] || "";
            file["height"] = params["height"] || "";
            file["type"] = attaInfo["type"] || 1;
            file["embed"] = attaInfo["embed"] || '';
            htmlattr.push(commonUtils.template(imageHtml)({"file": file}));
            _setImageQueue(preid, {"path": file["attaAddr"], "name": file["name"], "id": file["id"], "type": file["type"], "embed": file["embed"]});
            filearr.push(file);
          }
        }
        console.log("====", preidn);
        $("#" + preidn + "-list").prepend(htmlattr.join(""));

        if (!params["noopt"]) {
          $.each(filearr || [], function (index, value) {
            _onImageOpt(preid, value, params, err);
          });
        }
      }
    },
    /**
     * 取出所有上传参数
     * @param id
     * @returns {*}
     */
    getUploadParams: function (id) {
      var newUpload = [];
      $.each(uploads[id] || [], function (index, obj) {
        if (!deluploads.hasOwnProperty(obj.fid)) {
          var exsist = true;
          $.each(deluploads, function (i, v) {
            if (v) {
              exsist = false;
              return false;
            }
          });
          if (exsist) {
            newUpload.push(uploads[id][index]);
          }
        }
      });
      uploads[id] = newUpload;
      return uploads[id];
    },
    /**
     * 删除 id 上传参数
     * @param id
     */
    delUploadParams: function (id) {
      uploads[id] = [];
    },
    /**
     * 模板
     * @param text
     * @param data
     * @param settings
     * @returns {*}
     */
    template: function(text, data, settings) {
      var render;
      settings = templateSettings;

      // Combine delimiters into one regular expression via alternation.
      var matcher = new RegExp([
        (settings.escape || /(.)^/).source,
        (settings.interpolate || /(.)^/).source,
        (settings.evaluate || /(.)^/).source
      ].join('|') + '|$', 'g');

      // Compile the template source, escaping string literals appropriately.
      var index = 0;
      var source = "__p+='";
      text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset)
            .replace(/\\|'|\r|\n|\t|\u2028|\u2029/g, function(match) { return '\\' + escapes[match]; });

        if (escape) {
          source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        }
        if (interpolate) {
          source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        }
        if (evaluate) {
          source += "';\n" + evaluate + "\n__p+='";
        }
        index = offset + match.length;
        return match;
      });
      source += "';\n";

      // If a variable is not specified, place data values in local scope.
      if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

      source = "var __t,__p='',__j=Array.prototype.join," +
          "print=function(){__p+=__j.call(arguments,'');};\n" +
          source + "return __p;\n";

      try {
        render = new Function(settings.variable || 'obj', 'commonUtils', source);
      } catch (e) {
        e.source = source;
        throw e;
      }

      if (data) return render(data, commonUtils);
      var template = function(data) {
        return render.call(this, data, commonUtils);
      };

      // Provide the compiled function source as a convenience for precompilation.
      template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

      return template;
    }
  };
  var templateSettings = {
        evaluate    : /<%([\s\S]+?)%>/g,
        interpolate : /\{\{(.+?)\}\}/g,
        escape      : /<%-([\s\S]+?)%>/g
      }, escapes = {
        "'":      "'",
        '\\':     '\\',
        '\r':     'r',
        '\n':     'n',
        '\t':     't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      },
      imageHtml = '<li id="{{file.id}}" class="file-item thumbnail" style="float: left;"><div id="{{file.id}}_opt" style="position: relative;display:none;"><div class="btn-group-vertical" style="position: absolute;width: {{file.width}};  z-index:9; display: block;  margin-top: -15px;"><div id="{{file.id}}_del" style="color: #fff; width: 33px; height: 30px; background: url(../../images/img_del.png); background-repeat: no-repeat; padding-top: 40px;  cursor: pointer;  margin: 0 auto;margin-top: 37%;">删除</div></div><div style="width: {{file.width}};height: {{file.height}};background-color: black;opacity: 0.6;position: absolute;"></div></div><img style="width:{{file.width}};height:{{file.height}};" src="{{file.accessUrl}}"></li>',
      defauloptions = {
        server: "upload/upload",
        swf: '/js/public/webuploader/Uploader.swf',
        runtimeOrder: "html5,flash",
        mimeTypes: 'image/*',
        extensions: 'jpg,jpeg,bmp,png',
        thumb: {
          width: 200,
          height: 200
        },
        //自动上传
        auto: true,
        duplicate: true
      },
      server = "/upload/upload";
  function _setImageQueue(id, file) {
    if (uploads.hasOwnProperty(id)) {
      var flag = true, ind = "";
      $.each(uploads[id], function (index, value) {
        if (value.fid == file.id) {
          flag = false;
          ind = index;
          return false;
        }
      });
      if (flag) {
        uploads[id].push({
          "basePath": file.path,
          "realName": file["name"],
          "type": file["type"],
          "fid": file.id,
          "index": file.id.split("_").pop(),
          "embed": file["embed"]
        });
      } else {
        uploads[id].splice(ind, 1, {
          "basePath": file.path,
          "realName": file["name"],
          "type": file["type"],
          "fid": file.id,
          "index": file.id.split("_").pop(),
          "embed": file["embed"]
        });
      }
    } else {
      uploads[id] = [{
        "basePath": file.path,
        "type": file["type"],
        "realName": file["name"],
        "fid": file.id,
        "index": file.id.split("_").pop(),
        "embed": file["embed"]
      }];
    };
  }

  /**
   * 编译图片模板
   * @param id 与上传图片绑定ID相同
   * @param file
   * @returns {*}
   * @private
   */
  function _addVideo(id, file, callback, delCallback) {
    uploads[id].push({
      "embed": file["embed"],
      "realName": file["name"],
      "type": file["type"],
      "fid": file["id"]
    });

    file["width"] = file["width"] || "100px";
    file["height"] = file["height"] || "100px";

    var $li = $(commonUtils.template(imageHtml)({"file": file})),
        $img = $li.find('img');
    $("#" + id + "-list").prepend( $li );
    $img.attr("src", "/images/video.png");

    $img.width(file.width.replace("px", ""));
    $img.height(file.height.replace("px", ""));

    //绑定视频删除功能
    _onImageOpt(id, file, {}, delCallback);

    callback();
  }

  /**
   * 绑定图片功能
   * @param id 初始化主键ID
   * @param file 上传文件
   * @param params 上传配置
   * @private
   */
  function _onImageOpt(id, file, params, callback) {
    $("#" + (params["renderId"] || id) + "-list").undelegate("[id='" + file.id + "']", "mouseover mouseout").delegate("[id='" + file.id + "']", "mouseover mouseout" ,function (e) {
      if(e.type=='mouseover') {
        if ($("#" + file.id + "_opt").css("display") == "none") {
          $("#" + file.id + "_opt").show();
          //绑定删除
          $("#" + file.id + "_del").off().on("click", function () {
            $("#" + file.id).remove();
            if (params["single"] && $("#" + id + "-list").find("li").length == 0) {
              $("#" + id + "-list").html('<li style="float: left;"><img src="' + (params["defaultImg"] || "/images/person07.jpg") + '" style="width: ' + (params["width"] || "150px") + '; height:' + (params["height"] || "150px") + ';"></li>');
            }

            if (params["single"]) {
              deluploads[file.id] = file.id.split("_").pop();
            } else {
              deluploads[file.id] = "";
            }

            callback && callback();
          });
        } else {
          $("#" + file.id + "_opt").hide();
        }
      } else if(e.type=='mouseout') {
        $("#" + file.id + "_opt").hide();
      }
    });
  }

  /**
   * 反转对象
   * @method invert
   * @params 反转对象
   * @private
   */
  function _invert(obj) {
    var result = {};
    for (var key in obj) if (obj.hasOwnProperty(key)) result[obj[key]] = key;
    return result;
  };

  /**
   * 取出key2Value的值
   * @method getMenuKey
   * @params key key2Value 的 key
   * @private
   */
  function _getMenuValue(key) {
    return key2Value.hasOwnProperty(key) && key2Value[key];
  }

  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value == null ? _.identity : value);
    $.each(obj, function(index, value) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  var lookupIterator = function(value) {
    return typeof value === 'function' ? value : function(obj){ return obj[value]; };
  };

  function _groupBy(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (Object.prototype.hasOwnProperty.call(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  /**
   * 设置占位符
   *
   * HTML5 支持属性
   * @example
   * 	 <input type="text" placeholder="出发城市"/>
   */
  function placeholder() {
    if ($.browser.hasOwnProperty("msie") && $.browser.msie) {
      $("input, textarea").each(function () {
        var $this = $(this),
            placeholder = '';

        var ua = navigator.userAgent.toLowerCase(),
            ua1 = ua.match(/safari\/([\d.]+)/);

        if (ua1 && ua1[1]) {
          placeholder = $this.attr("placeholder");
        }

        if ((ua1 && ua1[1]) || $this[0] && !("placeholder" in document.createElement("input")) && (placeholder = $this.attr("placeholder"))) {
          // $this.removeAttr("placeholder");
          if ($(this).attr("type") == "password") {
            var _this = this;
            $(this).hide();
            if (!$(this).parent().find("#" + $(this).attr("id") + '_tmp').length) {
              $(this).after('<input id="' + $(this).attr("id") + '_tmp" type="text" style="color: grey;" value=' + placeholder + ' autocomplete="off" />');
            }
            $("#" + $(this).attr("id") + "_tmp").blur(function () {
              if (!$(this).val()) {
                $(this).hide();
                $(_this).show().focus();
              }
            }).focus(function () {
              if ($(this).val() == placeholder) {
                $(_this).show().focus();
                $(this).hide();
              }
            });

            $(_this).off().blur(function () {
              if (!$(this).val()) {
                $("#" + $(this).attr("id") + "_tmp").show();
                $(this).hide();
              }
            }).focus(function () {
              if ($(this).val() == placeholder) {
                $("#" + $(this).attr("id") + "_tmp").hide();
                $(this).show();
              }
            });
          } else {
            //默认值
            if (!$.trim($this.val())) {
              $this.val(placeholder);
              $(this).attr("style", "color:grey;");
            }

            $this.blur(function () {
              if (!$(this).val()) {
                $(this).val(placeholder);
                $(this).attr("style", "color:grey;");
              }
            }).focus(function () {
              if ($(this).val() == placeholder) {
                $(this).val('');
                $(this).removeAttr("style");
              }
            });
          }
        }
      });
    }
  }

  /**
   * 求对象的长度
   */
  function _getObjSize(obj) {
    var count = 0;
    $.each(obj, function () {
      count++;
    })
    return count;
  }

  /**
   * 百分比 保留小数后2位
   */
  function formatFloat(src, pos) {
    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
  }

  /**
   * 减法
   */
  function _accSub(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
  }

  function _imageDeal(img, w, h, opts){
    var t=$(img);
    var src=$(img).attr("src");
    var img=new Image();
    img.src=src;
    var width = w || 200;//预先设置的所期望的宽的值
    var height = h || 200;//预先设置的所期望的高的值
    if(img.width > 0 && img.height > 0){
      if(img.width/img.height >= width/height){
        if(img.width>width){
          t.width(width);
          t.height((img.height*width)/img.width);
          (opts && opts["nopadding"]) || ((opts && opts.parent) ? t.parent().css("margin-top", (height-t.height())/2) : t.css("padding-top", (height-t.height())/2));
        }else{
          t.width(img.width);
          t.height(img.height);
          (opts && opts["nopadding"]) || ((opts && opts.parent) ? t.parent().css("margin-top", (height-t.height())/2) : t.css("padding-top", (height-t.height())/2));
        }
      }else{
        if(img.height > height){
          t.height(height);
          t.width((img.width*height)/img.height);
          (opts && opts["nopadding"]) || ((opts && opts.parent) ? t.parent().css("margin-top", (height-t.height())/2) : t.css("padding-top", (height-t.height())/2));
        }else{
          t.width(img.width);
          t.height(img.height);
          (opts && opts["nopadding"]) || ((opts && opts.parent) ? t.parent().css("margin-top", (height-t.height())/2) : t.css("padding-top", (height-t.height())/2));
        }
      }
    }
  };
  function _showError(id, msg) {
    setTimeout(function () {
      $("#" + id).fadeOut('slow').html('');
    }, 1000);
    $("#" + id).html(msg).show();
  }

  /**
   * 之前要先继承jQuery
   */
  var cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
      options = $.extend({}, options);

      if (value === null || value === undefined) {
        options.expires = -1;
      }

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }

      value = String(value);

      return (document.cookie = [
        encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var decode = options.raw ? function (s) { return s; } : decodeURIComponent;

    var pairs = document.cookie.split('; ');
    for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
      if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
    }
    return null;
  };
  /**
   * 取得指定 key - value http://www.tudou.com/programs/view/html5embed.action?type=2&code=rVak6ejGHKI&lcode=b7W8qX1ejfM&resourceId
   * @param name
   * @param value
   * @returns {*|number}
   * @private
   */
  function _urlParam(url){
    var vars = {}, hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars[hash[0]]=hash[1];
    }
    return vars;
  }
  var url = ACCESSURL + "/face/";
  var faces = {
    /*"bzmh": 69,
     "gnl": 45,
     "lxh": 82,
     "mr": 84,*/
    "y": {
      "ext": "png",
      "childrens": [
        "大笑",
        "调皮",
        "高兴",
        "微笑",
        "害羞",
        "我哭",
        "大哭",
        "委屈",
        "闭嘴",
        "拜拜",
        "我汗",
        "我哼",
        "惊讶",
        "我囧",
        "我酷",
        "牛逼",
        "亲亲",
        "我色",
        "生病",
        "睡觉",
        "偷笑",
        "我晕",
        "我衰",
        "发怒",
        "心碎",
        "爱心",
        "鸡蛋",
        "欧克",
        "客气",
        "我顶",
        "我踩",
        "握手"
      ]
    }
  };
  /**
   * 表情初始化
   * @param pageNo 页数
   * @private
   */
  function _face(pageNo, pageSize) {
    //存储表情
    var tpl = ["<ul class='eu_face'>"],
        stores = [];
    $.each(faces || [], function (key, obj) {
      //(pageNo - 1) * 50).limit(50)
      var arr = obj["childrens"];
      for (var i = 0; i < arr.length; i++) {
        stores.push('<li title="' + arr[i] + '"><img src="' + url + key + "/" + arr[i] + "." + obj["ext"] + '"/></li>');
      }
      /* for (var i = 0; i < count; i++) {
       stores.push('<li><img src="' + url + key + "/" + i + ".gif" + '"/></li>');
       }*/
    });

    var pageSize = pageSize || 50;
    //总页数
    var totalPage = Math.floor((280 + pageSize - 1) / pageSize);

    //超过总页数
    if (pageNo > totalPage) {
      return "";
    }
    tpl = tpl.concat(stores.slice((pageNo - 1) * pageSize, pageNo * pageSize));
    tpl.push("</ul>");
    return tpl.join("");
  }

  /**
   * 表情初始化
   * @param pageNo 页数
   * @private
   */
  function _getTotalPage(pageSize) {
    var pageSize = pageSize || 50;
    //总页数
    return Math.floor((280 + pageSize - 1) / pageSize);
  }

  /**
   * 表情绑定事件
   * @param fn
   * @private
   */
  function _onFace(container, fn) {
    $(container).undelegate(".eu_face li", "click").delegate(".eu_face li", "click", function () {
      var url = $(this).find("img").attr("src"),
          urlRex = url.split("\/"),
          index = urlRex.pop().split(".")[0],
          name = urlRex.pop();

      fn([name + index]);
    });
  }

  var againEvent = {};
  $.extend({EU:{
    serialize: commonUtils.formSerialize,
    clone: commonUtils.clone,
    keys: commonUtils.keys,
    imageDeal: _imageDeal,
    uploader: commonUtils.uploader,
    getUParams: commonUtils.getUploadParams,
    delUParams: commonUtils.delUploadParams,
    dateInit: commonUtils.datainit,
    //ajaxLogin: _ajaxLogin,
    urlParam: _urlParam,
    addVideo: _addVideo,
    face: _face,
    getFacePage: _getTotalPage,
    onFace: _onFace,
    cookie: cookie,
    //解绑事件 - 为统一拦截后 403 解绑事件没法绑定
    pullTrigger: function (callback, args) {
      againEvent["callback"] = callback;
      againEvent["args"] = args;
      callback.apply(args);
    },
    pushTrigger: function () {
      againEvent["callback"] && againEvent["callback"].apply(againEvent["args"]);
    },
    validateext: {
      //只大长度
      maxLength: function (r, args) {
        var value = r.val();

        //中文的长度
        var cnum = value.replace(/[^\u4e00-\u9fa5]/g, '').length;

        var othernum = value.length - cnum;
        // @modify fanmengqi * 改为 /
        if (cnum + othernum / 2 > args) {
          return "字数不能超过" + args + "个字符";
        }
      },
      //验证URL地址
      isUrl: function(r) {
        var url = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;

        if (!url.test(r.val())) {
          return "请输入正确的连接地址";
        }
        return true;
      },
      //必添项
      required: function (r) {
        if (!$.trim(r.val())) {
          return "此字段不能为空";
        }
      },
      // 数字
      number: function (r) {
        if (!/^\d+$/.test(r.val())) {
          return "只能为数字";
        }
      },
      // 金额
      money: function (r) {
        if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(r.val())) {
          return "请填写正确的金额";
        }
      },
      //验证手机号
      mobile: function (r) {
        if (!r.val()) {
          return "请输入手机号";
        }
        if (!/^[1][3|8|4|5|7][0-9]{9}$/.test(r.val())) {
          return "请输入正确的手机号";
        }
      },
      //验证固定电话
      tel: function (r) {
        if (r.val() && !/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(r.val())) {
          return "请输入正确的电话号码";
        }
      },
      //验证身份证
      identity: function (r) {
        if (!r.val()) {
          return "请输入身份证号";
        }
        function isDate6(sDate) {
          if (!/^[0-9]{6}$/.test(sDate)) {
            return false;
          }
          var year, month, day;
          year = sDate.substring(0, 4);
          month = sDate.substring(4, 6);
          if (year < 1700 || year > 2500) return false;
          if (month < 1 || month > 12) return false;
          return true;
        }
        function isDate8(sDate) {
          if (!/^[0-9]{8}$/.test(sDate)) {
            return false;
          }
          var year, month, day;
          year = sDate.substring(0, 4);
          month = sDate.substring(4, 6);
          day = sDate.substring(6, 8);
          var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if (year < 1700 || year > 2500) return false;
          if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
          if (month < 1 || month > 12) return false;
          if (day < 1 || day > iaMonthDays[month - 1]) return false;
          return true;
        }
        var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1),
            parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"),
            varArray = new Array(),
            lngProduct = 0,
            intCheckDigit,
            intStrLen = r.val().length,
            idNumber = r.val();
        // initialize
        if ((intStrLen != 15) && (intStrLen != 18)) {
          return "请输入正确的身份证号码";
        }
        // check and set value
        for (var i = 0; i < intStrLen; i++) {
          varArray[i] = idNumber.charAt(i);
          if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            return "请输入正确的身份证号码";
          } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
          }
        }
        if (intStrLen == 18) {
          //check date
          var date8 = idNumber.substring(6, 14);
          if (!isDate8(date8)) {
            return "请输入正确的身份证号码";
          }
          // calculate the sum of the products
          for (i = 0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
          }
          // calculate the check digit
          intCheckDigit = parityBit[lngProduct % 11];
          // check last digit
          if (varArray[17] != intCheckDigit) {
            return "请输入正确的身份证号码";
          }
        } else {        //length is 15
          //check date
          var date6 = idNumber.substring(6, 12);
          if (!isDate6(date6)) {
            return "请输入正确的身份证号码";
          }
        }
      },
      //双验证
      group: {
        againPass: function(r) {
          var start = r["start"],
              end = r["end"];
          if(start.val() != end.val()) {
            return "两次密码输入不一致！";
          }
        }
      },
      //验证youku地址
      youku: function (r) {
        //"http://player.youku.com/player.php/Type/Folder/Fid/25942173/Ob/1/sid/XMTI5MjA5OTgzMg==/v.swf".lastIndexOf(".swf") != -1;
        if (r.val()) {
          if (r.val().lastIndexOf(".swf") != -1 && r.val().indexOf('youku') != -1) {
          } else {
            return "请输入优酷地址";
          }
        }
      },

      // 昵称
      nickname: function (r) {
        if(!r.val()) {
          return "请输入昵称";
        } else if(!/^[A-Za-z0-9\\-_\u4E00-\u9FA5]{0,}$/.test(r.val())) {
          return "昵称支持：4-20位字符，汉字、字母、数字及“-”、“_”";
        } else {
          var length = r.val().replace(/[^\x00-\xff]/g,"**").length;
          if(length < 4 || length > 20) {
            return "昵称支持：4-20位字符，汉字、字母、数字及“-”、“_”";
          }
        }
      },
      // 邮编
      zipcode: function (r) {
        if(!r.val()) {
          return "请输入邮编";
        }
        if(!/^[1-9][0-9]{5}$/.test(r.val())) {
          return "邮编格式错误";
        }
      },
      // 判断钱
      isMoney: function(r) {
        var regu = /^\d+(\.\d+)?$/;
        var re = new RegExp(regu);
        if (!re.test(r.val())) {
          return "请输入正确金额";
        }
      },
      // 正整数
      wholeNumber: function(r) {
        var regu = /^[1-9]\d*$/;
        var re = new RegExp(regu);
        if (!re.test(r.val())) {
          return "请输入正整数";
        }
      }
    },
    validate: function (formId, fn, $this) {
      var errs = [];
      $("#" + formId + " :visible").find("[data-validate]").css("border", "1px solid #e6e6e6");

      if ($this) {
        ret = __validate($this);
      } else {
        $("#" + formId + " :visible").find("[data-validate]").each(function () {
          __validate($(this));
        });
      }

      function __validate($$this) {
        var text = $$this.attr("data-validate");

        $.each((text && text.split(",")) || {}, function (k, value) {
          if (value.indexOf("#") != -1) {
            var groups = {},
                keys = value.split("#");
            $("#" + formId + " :visible").find("[data-validate^='" + keys[0] + "']").each(function () {
              groups[$(this).attr("data-validate").split("#")[1]] = $(this);
            });
            var errmsg = $.EU.validateext["group"][keys[0]](groups);
            if (errmsg) {
              $("#" + formId + " :visible").find("[data-validate^='" + keys[0] + "']").css("border", "1px solid red");
              errs.push({
                "name": value,
                "msg": errmsg
              });
            }
            return false;
          } else if (value.indexOf("@") != -1) {
            var keys = value.split("@");
            if ($.EU.validateext.hasOwnProperty(keys[0]) && $.EU.validateext[keys[0]]($$this, keys[1])) {
              $$this.css("border", "1px solid red");
              errs.push({
                "name": value,
                "msg": $.EU.validateext[keys[0]]($$this, keys[1])
              });
            }
          }
          if ($.EU.validateext.hasOwnProperty(value) && $.EU.validateext[value]($$this)) {
            $$this.css("border", "1px solid red");
            errs.push({
              "name": value,
              "msg": $.EU.validateext[value]($$this)
            });
          }
        });
      }
      fn(errs.length <= 0, errs);
    },

    /**
     * 项目 地区选择
     */
    projecti_address : function(event, ctype) {
      event.stopPropagation();
      ctype = ctype ? ctype : 0; // 默认为0 单选
      var manyStr = ""; // 多选记录中文
      var addStr = ""; // 记录中文
      var codes = ""; // 记录code值

      // 获取数据
      //_getData("/address/getWorld", {}, 0).then(function(countryId) {
      //  return _getData("/address/getCity", {countryId: countryId}, 1);
      //}).then(function(cityId) {
      //  return _getData("/address/getArea", {cityId: cityId}, 2);
      //});

      _getData("/address/getWorld", {}, 0).then(function(countryId) {
        return _getData("/address/getPartials", {countryId: countryId}, 1)
      }).then(function(cityId) {
        return _getData("/address/getCity", {cityId: cityId}, 2);
      }).then(function(areaId) {
        return _getData("/address/getArea", {areaId: areaId}, 3);
      })

      // 关闭隐藏
      $("body").click(function(){
        $("#form_region").css('display','none');
        // qingkong
        $("#form_region p span").each(function(){
          $(this).remove()
        })
      })

      // 获取数据
      function _getData(url, params, code, type) {
        return new Promise(function (resolve, reject) {
          $.post(url, params, function (data) {
            if(data.status == 0) {
              // 如果省市查询没有数据模板则终止选择
              if(code > 0) {
                if(data.html == null){
                  showArea(ctype);
                  return;
                }
              }
              $("#address").html(data.html); // 显示页面
              $("#form_region").show();

              // 点击内容监听
              _clickLi();
              function _clickLi() {
                $("#address li").on("click", function(event) {
                  event.stopPropagation();
                  _getTmp($(this))
                })
              }

              function _getTmp($this) {
                $this.off("click");
                var id = $this.attr("data-id");
                $("#address li").off("click");
                $("#address li").each(function () {
                  $(this).removeClass("active");
                })
                $(this).addClass("active");
                var strHtml = "<span>" + $this.text() + "</span>";
                $("#address").prev("p").append(strHtml);
                //记录用户点击
                addStr += $this.text();
                codes += code < 3 ? $this.attr("data-id") + "," : $this.attr("data-id");
                if(code == 3) {
                  console.log("ctype --- >", ctype);
                  showArea(ctype);
                } else {
                  // 根据国家查询省
                  resolve(id);
                }
              }
            } else {
              reject(null)
            }
          })
        })
      };

      // 回显示
      function showArea(ctype) {
        var lastStr = codes.charAt(codes.length - 1);
        if(lastStr == ",") {
          codes = codes.substring(0, codes.length - 1)
        }
        // 回显用户选择
        var echoHtml = "<p data-ids='" + codes + "' name='area_data' class='echo_address'>" + addStr + "<b></b></p>";

        if(ctype == 0) {
          // 有则删除后新增，没有则新增
          $("#regin").val(addStr);
          if($("#area_choice").next("p").length == 0) {
            $("#area_choice").after(echoHtml);
          } else {
            $("#area_choice").next("p").remove();
            $("#area_choice").after(echoHtml);
          }
          //deleteArea(); // 删除
          $("#form_region").hide();
          $("#form_region p span").each(function(){
            $(this).remove()
          })
        } else {
          // 判断是否有重复选择
          var flag = true;
          $("p[name='area_data']").each(function(i, v) {
            var ids = $(this).attr("data-ids");
            if(codes == ids) {
              flag = false;
              return false;
            }
          })

          // 不重复追加用户的选择
          if(flag) {
            $("#area_choice").after(echoHtml);
          }
          $("#form_region").hide();
          $("#form_region p span").each(function(){
            $(this).remove()
          })
        }
      }
    },

    delete_address: function() {
      $("body").delegate(".echo_address b", "click", function(){
        $("#regin").val("");
        $(this).parent().remove();
      });
    },

    /**
     * 获取浏览器url参数
     * @returns {*}
     */
    getUrlParam: function(name) {
      //获取url中的参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    },

    /**
     * 弹窗
     * @param paramObj
     */
    dialog_create : function (paramsObj) {
      // 构建弹窗参数
      //var dialogParams = {
      //  id: wid,
      //  width: width,
      //  height: height,
      //  fixed: true,
      //  hide:true,
      //  title: title,
      //  content: html,
      //  modal:true,
      //  closeOnEscape: false
      //}
      var d = dialog(paramsObj);
      d.show();
    }
  }});
  window.$E = function () {
    return new EU(arguments[0]);
  };
})(jQuery);




