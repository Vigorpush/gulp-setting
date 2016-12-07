//smartFloat 定位
//2016/5/22
//auther: vigor
/*
	使用方法
	$(function(){
		$("element").smartFloat();
	});
*/

$.fn.smartFloat = function() {
	var position = function(element) {
		var top = element.position().top, pos = element.css("position");
		$(window).scroll(function() {
			var scrolls = $(this).scrollTop();
			if (scrolls > top) { //如果滚动到页面超出了当前元素element的相对页面顶部的高度
				if (window.XMLHttpRequest) {			
					element.css({
						visibility:"visible",
						position: "fixed",
						top: 0
					}).addClass("shadow");	
					
				} else { 
					element.css({
						visibility:"hidden",
						top: scrolls
					});	

				}
			}else {
				element.css({
					visibility:"hidden",
					position: pos,
					top: top
				}).removeClass("shadow");	
			}
		});
	};
	return $(this).each(function() {
		position($(this));						 
	});
};