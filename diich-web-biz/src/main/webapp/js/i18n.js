
$(function(){
	if(!window.localStorage.language) {
		window.localStorage.language = 'zh-CN';
	}

	switchLanguage(window.localStorage.language);//中文->zh-CN   英文->en
});

function switchLanguage(lang){
	window.localStorage.language = lang;

	$('.language .active').removeClass('active');
	if(window.localStorage.language == 'zh-CN') {
		$('.zh').addClass('active');
	} else if(window.localStorage.language == 'en') {
		$('.en').addClass('active');
	}

	jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
		name:'strings', //资源文件名称
		path:'/i18n/', //资源文件路径
		mode:'map', //用Map的方式使用资源文件中的值
		language:window.localStorage.language,//中文->zh-CN   英文->en
		callback: function() {//加载成功后设置显示内容
			$('#home').text($.i18n.prop('home'));
			$('#ich_directory').text($.i18n.prop('ich_directory'));
			$('#ich_master').text($.i18n.prop('ich_master'));
			$('#selected_content').text($.i18n.prop('selected_content'));
			$('#information').text($.i18n.prop('information'));
			$('#official_service').text($.i18n.prop('official_service'));
			$('#project_declare').text($.i18n.prop('project_declare'));
			$('#sign_in').text($.i18n.prop('sign_in'));
		}
	});
}

