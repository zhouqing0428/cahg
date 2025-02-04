/*
 * jQuery图片轮播(焦点图)插件
 * ADD.JENA.201206291027
 * EDIT.JENA.201206300904
 * EDIT.JENA.201207051027
 * EDIT.JENA.201208090849
 * EDIT.JENA.201501231440
 * Version: 2.2.1440
 * Author: jena
 * Demo: http://ishere.cn/demo/jquery.slidebox/
 */
(function($) {
	$.fn.slideBox = function(options) {
		//默认参数
		var defaults = {
			direction : 'left',//left,top
			duration : 0.6,//unit:seconds
			easing : 'swing',//swing,linear
			delay : 3,//unit:seconds
			startIndex : 0,
			hideClickBar : true,
			clickBarRadius : 5,//unit:px
			hideBottomBar : false
		};
		var settings = $.extend(defaults, options || {});
		//计算相关数据
		var wrapper = $(this), ul = wrapper.children('ul.items'), lis = ul.find('li'), firstPic = lis.first().find('img');
		var li_num = lis.size(), li_height = 0, li_width = 0;
		//初始化
		var init = function(){
			if(!wrapper.size()) return false;
			wrapper.data('over', 0);
			
			li_height = lis.first().height();
			li_width = lis.first().width();
			
			wrapper.css({width: li_width+'px', height:li_height+'px'});
			lis.css({width: li_width+'px', height:li_height+'px'});//ADD.JENA.201207051027
			
			ul.append(ul.find('li:first').clone());
			li_num += 1;
			
			if (settings.direction == 'left') {
				ul.css('width', li_num * li_width + 'px');
			} else {
				ul.css('height', li_num * li_height + 'px');
			}			
			ul.find('li:eq('+settings.startIndex+')').addClass('active');
			
			if(!settings.hideBottomBar){//ADD.JENA.201208090859
				var tips = $('<div class="tips"></div>').css('opacity', 0.5).appendTo(wrapper);
				var title = $('<div class="title"></div>').html(function(){
					var active = ul.find('li.active').find('a'), text = active.attr('title'), href = active.attr('href');
					return $('<a>').attr('href', href).text(text);
				}).appendTo(tips);
				var nums = $('<div class="nums"></div>').hide().appendTo(tips);
				lis.each(function(i, n) {
					var a = $(n).find('a'), text = a.attr('title'), href = a.attr('href'), css = '';
					i == settings.startIndex && (css = 'active');
					$('<a>').attr('href', href).text(text).addClass(css).css('borderRadius', settings.clickBarRadius+'px').mouseover(function(){
						wrapper.data('over', 1);
						$(this).addClass('active').siblings().removeClass('active');
						ul.find('li:eq('+$(this).index()+')').addClass('active').siblings().removeClass('active');
						start();
					}).appendTo(nums);
				});
			
				if(settings.hideClickBar){//ADD.JENA.201206300847
					tips.hover(function(){
						nums.animate({top: '0px'}, 'fast');
					}, function(){
						nums.animate({top: tips.height()+'px'}, 'fast');
					});
					nums.show().delay(2000).animate({top: tips.height()+'px'}, 'fast');
				}else{
					nums.show();
				}
			}
			
			lis.size()>1 && start();
		};
		//开始轮播
		var start = function() {
			var active = ul.find('li.active'), active_a = active.find('a');
			var index = active.index();
			if(settings.direction == 'left'){
				offset = index * li_width * -1;
				param = {'left':offset + 'px' };
			}else{
				offset = index * li_height * -1;
				param = {'top':offset + 'px' };
			}
			
			wrapper.find('.nums').find('a:eq('+index+')').addClass('active').siblings().removeClass('active');
			wrapper.find('.title').find('a').attr('href', active_a.attr('href')).text(active_a.attr('title'));

			// EDIT.JENA.20150123
			ul.stop().animate(param, settings.duration*1000, settings.easing, function() {
				active.removeClass('active');
				if(active.next().size()==0){
					ul.css({top:0, left:0}).find('li:eq(1)').addClass('active');
					wrapper.find('.nums').find('a:first').addClass('active').siblings().removeClass('active');
				}else{
					active.next().addClass('active');
				}
				wrapper.data('over')==0 && wrapper.data('timeid', window.setTimeout(start, settings.delay*1000));
			});
		};
		//停止轮播
		var stop = function() {
			window.clearTimeout(wrapper.data('timeid'));
		};
		//鼠标经过事件
		wrapper.hover(function(){
			wrapper.data('over', 1);
			stop();
		}, function(){
			wrapper.data('over', 0);
			start();
		});	
		//首张图片加载完毕后执行初始化
		var imgLoader = new Image();
		imgLoader.onload = function(){
			imgLoader.onload = null;
			init();
		};
		imgLoader.src = firstPic.attr('src');
	};
})(jQuery);