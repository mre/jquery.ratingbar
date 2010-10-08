/**
 * jQuery ratingbar
 * --------------------------------------------------------------------------
 *
 * jQuery ratingbar creates a customizable bar rating automatically.
 * 
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 * 
 * @version     0.2
 * @since       09.09.2010
 * @author      Matthias Endler
 * @link        http://matthias-endler.de
 * @twitter     http://twitter.com/matthiasendler
 * @license     http://www.opensource.org/licenses/mit-license.php MIT 
 * @license		http://www.gnu.org/licenses/gpl.html GPL
 * @package     jQuery Plugins
 * 
 */

(function($) {

	// Define rating object with some default config settings
	$.ratingbar = {
		defaults: {
			animate:		false, // Bar gets expanded on page load
			duration:		1000, // Animation time
			ease:			"linear", // Animation easing effect
			maxRating: 		100, // Highest rating that can be achieved
			wrapperWidth:	100,// Width of container for rating
			showText: 		true, // Show original rating text
			ratingClass: 	"", // CSS class that contains the rating
			wrapperClass:	"ratingbar_wrapper", // Custom class for rating container
			innerClass:		"ratingbar_inner", // Custom class for actual rating
			textClass: 		"ratingbar_text", // Custom class for rating text
			wrapperMarkup:	'', // Custom markup for bar
			innerMarkup: 	'',
			textMarkup:		''
		}
	};
	
	// Extend jquery with the plugin
	$.fn.extend({
		ratingbar:function(config) {
			// Use defaults or properties supplied by user
			var config = $.extend({}, $.ratingbar.defaults, config);
			config.ratingClass = this
			// Check for custom markup or create own
			if (!config.wrapperMarkup) {
				 config.wrapperMarkup = "<div class='" + config.wrapperClass + "' />";
			}
			if (!config.innerMarkup) {
				 config.innerMarkup   = "<div class='" + config.innerClass   + "' />";
			}
			if (!config.textMarkup) {
				 config.textMarkup    = "<div class='" + config.textClass    + "' />";
			}
			
			// Call function to create rating bar
			ratingbar(config);
				
			// Return the jquery object for chaining
			return this;
		}
	});
	
  	// Create rating bar
	function ratingbar(config) {
		// Create all bars at once
		$(config.ratingClass)
			.wrapInner(config.textMarkup)
			.wrapInner(config.innerMarkup)
			.wrapInner(config.wrapperMarkup);
			
		// Set width of wrapper bar
		$("." + config.wrapperClass).width(config.wrapperWidth);
		
		// Set the proper rating for each bar
		$("." + config.innerClass).each(
			function() {
				// Get rating (and possibly rating scale)
				var ratingValues = $('.' + config.textClass, this).text().match(/[0-9.]+/g);
				
				// Do we have a valid rating?
				if($.isArray(ratingValues)) {					
					var rating = parseFloat(ratingValues.shift());
					
					// Always take second value as rating scale (ratings like 3 out of 5).
					var scale = parseFloat(ratingValues.shift());
					
					// Check if valid scale
					if (isNaN(scale)) 
						scale = config.maxRating;
					
					// Set rating bar width
					var innerWidth = rating/scale * config.wrapperWidth;
					
					if(config.animate) {
						$(this).animate({ 
							width: innerWidth
						}, config.duration, config.ease );
					} else {
						$(this).width(innerWidth);
					}
				}
			}
		);
		
		// Check if rating text should be displayed
		if (!config.showText) {
			// Remove original rating text
			$('.' + config.textClass).text("");
		}
	};
		
})(jQuery);