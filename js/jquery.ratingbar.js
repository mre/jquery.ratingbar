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
 * @version     0.1
 * @since       09.10.2010
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
			maxRating: 		100,
			wrapperWidth:	100,// pixels
			showText: 		true,
			ratingClass: 	"", // Custom selector
			wrapperClass:	"ratingbar_wrapper",
			innerClass:		"ratingbar_inner",
			textClass: 		"ratingbar_text",
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
		$(config.ratingClass).wrapInner(config.textMarkup)
			.wrapInner(config.innerMarkup)
			.wrapInner(config.wrapperMarkup);
			
		// Set width of wrapper bar
		$("." + config.wrapperClass).width(config.wrapperWidth);
		
		// Set the proper rating for each bar
		$("." + config.innerClass).each(
			function() {
				var rating = parseInt($('.' + config.textClass, this).text());
				var innerWidth = rating/config.maxRating * config.wrapperWidth;
				$(this).width(innerWidth);
			}
		);
		
		// Check if rating text should be displayed
		if (!config.showText) {
			// Remove original rating text
			$('.' + config.textClass).text("");
		}
	};
		
})(jQuery);