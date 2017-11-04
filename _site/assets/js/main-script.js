(function($){

	'use strict';

	/* Add class header
	-------------------------------------------------------------- */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1){  
	    	$('.header-nav').addClass('sticky');
	  	}
	  	else{
	    	$('.header-nav').removeClass('sticky');
	  	}
	});


	/* Scroll menu
	-------------------------------------------------------------- */
	$('.site-nav a, .site-title, .btn').on('click', function(event) {
        var $anchor = $(this);
        
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 51)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });


	/* Altura do banner
	-------------------------------------------------------------- */
	function resizeWindow() {
		var window_height  = $(window).height(),
			content_home   = $('.content-home').height() / 2,
			padding_home   = (window_height / 2) - content_home;

		$('.home').css('min-height', window_height);
		$('.content-home').css('padding-top', padding_home - 50);
	};
	resizeWindow();

	$(window).resize(function() {
		resizeWindow();
	});

})(jQuery);