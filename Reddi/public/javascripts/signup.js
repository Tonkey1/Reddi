
// Copyright (c) 2019 by Brendan Sparrow (https://codepen.io/brendansparrow/pen/QjRmKv)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

//jQuery
var current_page, next_page, previous_page;
var left, opacity, scale;
var animating;

//click the next button
$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_page = $(this).parent();
	next_page = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_page
	$(".progressbar li").eq($("fieldset").index(next_page)).addClass("active");
	
	//show the next fieldset
	next_page.show();
	//hide the current fieldset with style
	current_page.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_page reduces to 0 - stored in "now"
			//1. scale current_page down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_page from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_page to 1 as it moves in
			opacity = 1 - now;
			current_page.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_page.css({'left': left, 'opacity': opacity});
		}, 
		duration: 400,
		complete: function(){
			current_page.hide();
			animating = false;
		},
		easing: 'easeInOutCubic'
	});
});

//click the previous button
$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_page = $(this).parent();
	previous_page = $(this).parent().prev();
	
	//progressbar
	$(".progressbar li").eq($("fieldset").index(current_page)).removeClass("active");

	previous_page.show();

	current_page.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_page reduces to 0 - stored in "now"
			//1. scale previous_page from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_page to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_page to 1 as it moves in
			opacity = 1 - now;
			current_page.css({'left': left});
			previous_page.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 400,
		complete: function(){
			current_page.hide();
			animating = false;
		},
		easing: 'easeInOutCubic'
	});
});

$(".submit").click(function(){
	return false;
})




$(window).resize(function() {
	if ($(window).width() <= 600) {
		$('#prop-type-group').removeClass('btn-group');
		$('#prop-type-group').addClass('btn-group-vertical');
	} else {
		$('#prop-type-group').addClass('btn-group');
		$('#prop-type-group').removeClass('btn-group-vertical');
	}
});


