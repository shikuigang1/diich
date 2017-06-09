
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

            //分类
			$('#legend').text($.i18n.prop('legend'));
			$('#language').text($.i18n.prop('language'));
			$('#text').text($.i18n.prop('text'));
			$('#oral').text($.i18n.prop('oral'));
			$('#other_oral').text($.i18n.prop('other_oral'));
			$('#perform').text($.i18n.prop('perform'));
			$('#music').text($.i18n.prop('music'));
			$('#dance').text($.i18n.prop('dance'));
			$('#folk_song').text($.i18n.prop('folk_song'));
			$('#traditional_drama').text($.i18n.prop('traditional_drama'));
			$('#quyi').text($.i18n.prop('quyi'));
			$('#sport').text($.i18n.prop('sport'));
			$('#other_perform').text($.i18n.prop('other_perform'));
			$('#custom_etiquette').text($.i18n.prop('custom_etiquette'));
			$('#business_custom').text($.i18n.prop('business_custom'));
			$('#life_customs').text($.i18n.prop('life_customs'));
			$('#life_ritual').text($.i18n.prop('life_ritual'));
			$('#festival_celebration').text($.i18n.prop('festival_celebration'));
			$('#other_celebration').text($.i18n.prop('other_celebration'));
			$('#practice_nature').text($.i18n.prop('practice_nature'));
			$('#df_fishery').text($.i18n.prop('df_fishery'));
			$('#clothing').text($.i18n.prop('clothing'));
			$('#food').text($.i18n.prop('food'));
			$('#h_construction').text($.i18n.prop('h_construction'));
			$('#traffic').text($.i18n.prop('traffic'));
			$('#medicine').text($.i18n.prop('medicine'));
			$('#military').text($.i18n.prop('military'));
			$('#business').text($.i18n.prop('business'));
			$('#project').text($.i18n.prop('project'));
			$('#ag_irrigation').text($.i18n.prop('ag_irrigation'));
			$('#on_knowledge').text($.i18n.prop('on_knowledge'));
			$('#tt_handmade').text($.i18n.prop('tt_handmade'));
			$('#tm_manufacture').text($.i18n.prop('tm_manufacture'));
			$('#p_techniques').text($.i18n.prop('p_techniques'));
			$('#daa_products').text($.i18n.prop('daa_products'));
			$('#d_process').text($.i18n.prop('d_process'));
			$('#p_paperhanging').text($.i18n.prop('p_paperhanging'));
			$('#k_techniques').text($.i18n.prop('k_techniques'));
			$('#cp_craft').text($.i18n.prop('cp_craft'));
			$('#s_techniques').text($.i18n.prop('s_techniques'));
			$('#pc_technics').text($.i18n.prop('pc_technics'));
			$('#sc_techniques').text($.i18n.prop('sc_techniques'));
			$('#b_technics').text($.i18n.prop('b_technics'));
			$('#w_techniques').text($.i18n.prop('w_techniques'));
			$('#o_kind').text($.i18n.prop('o_kind'));
			$('#b_opera').text($.i18n.prop('b_opera'));
			$('#k_opera').text($.i18n.prop('k_opera'));
			$('#c_embroidery').text($.i18n.prop('c_embroidery'));
			$('#j_medicine').text($.i18n.prop('j_medicine'));

			$('#carousel_01').attr('src', $.i18n.prop('carousel_01'));
			$('#carousel_02').attr('src', $.i18n.prop('carousel_02'));
			$('#carousel_03').attr('src', $.i18n.prop('carousel_03'));
			$('#carousel_04').attr('src', $.i18n.prop('carousel_04'));

            //非遗在全球
			$('#t_total').text($.i18n.prop('t_total'));
			$('#ic_pro').text($.i18n.prop('ic_pro'));
			$('#ic_world').text($.i18n.prop('ic_world'));
			$('#s_world').text($.i18n.prop('s_world'));
			$('#r_pro').text($.i18n.prop('r_pro'));

			$('#src_id').text($.i18n.prop('src_id'));
			$('#tg_id').text($.i18n.prop('tg_id'));
			$('#china_id').text($.i18n.prop('china_id'));
			$('#k_id').text($.i18n.prop('k_id'));
			$('#ko_id').text($.i18n.prop('ko_id'));
			$('#zhou_id').text($.i18n.prop('zhou_id'));
			$('#zsrc_id').text($.i18n.prop('zsrc_id'));
			$('#In_id').text($.i18n.prop('In_id'));
			$('#india_id').text($.i18n.prop('india_id'));
			$('#su_id').text($.i18n.prop('su_id'));
			$('#suxiu_id').text($.i18n.prop('suxiu_id'));
			$('#yao_id').text($.i18n.prop('yao_id'));
			$('#ya_id').text($.i18n.prop('ya_id'));
			$('#ysrc_id').text($.i18n.prop('ysrc_id'));



            //非遗资讯
            $('#info_1').text($.i18n.prop('info_1'));
            $('#info_1_time').text($.i18n.prop('info_1_time'));
            $('#info_2').text($.i18n.prop('info_2'));
            $('#info_2_time').text($.i18n.prop('info_2_time'));
            $('#info_3').text($.i18n.prop('info_3'));
            $('#info_3_time').text($.i18n.prop('info_1_time'));


            //渲染地图

            homePage.map(lang);


        }
	});
}

