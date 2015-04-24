/*
Actuate.js - http://lukejacksonn.com/actuate
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2015 Luke Jackson
*/

(function($){
	'use strict';

	$.fn.actuate = function(animation, callback, delay) {
		delay = delay || 0;
		return this.each(function() {
			var $elem = $(this);
			var events = 'animationend webkitAnimationEnd oAnimationEnd mozAnimationEnd MSAnimationEnd';
			var animate = function () { $elem.addClass(animation); };
			var stop = function () { $elem.removeClass(animation); };

			if($elem.hasClass('animated')) return;

			$elem.one(events, function() {
				setTimeout(stop, delay);
				if (typeof(callback) === 'function') {
					setTimeout(function() { callback($elem); }, delay);
				}
			});

			animate();
		});
	};
})(jQuery);
