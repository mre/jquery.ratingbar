/**
 * jQuery ratingbar
 * --------------------------------------------------------------------------
 *
 * jQuery ratingbar creates a customizable bar rating automatically.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * @version     0.3
 * @since       09.09.2010
 * @author      Matthias Endler
 * @link        http://matthias-endler.de
 * @twitter     http://twitter.com/matthiasendler
 * @license     http://www.opensource.org/licenses/mit-license.php MIT 
 * @license     http://www.gnu.org/licenses/gpl.html GPL
 * @package     jQuery Plugins
 *
 */

(function($) {

  // Ratingbar methods
  var methods = {
    init : function( options ) {
      // Define rating object with some default config settings
      var config = $.extend({
        animate: false, // Bar gets expanded on page load
        duration: 1000, // Animation time
        ease: "linear", // Animation easing effect
        maxRating: 100, // Highest rating that can be achieved
        wrapperWidth: 100,// Width of container for rating
        showText: true, // Show original rating text
        ratingClass: "", // CSS class that contains the rating
        wrapperClass: "ratingbar_wrapper", // Custom class for rating container
        innerClass: "ratingbar_inner", // Custom class for actual rating
        textClass: "ratingbar_text", // Custom class for rating text
        wrapperMarkup: '', // Custom markup for bar
        innerMarkup: '',
        textMarkup: ''
      }, options);

      // Use defaults or properties supplied by user
      config.ratingClass = this;
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

      // Create rating bar
      $(config.ratingClass)
        .wrapInner(config.textMarkup)
        .wrapInner(config.innerMarkup)
        .wrapInner(config.wrapperMarkup);

      // Set width of wrapper bar
      $("." + config.wrapperClass).width(config.wrapperWidth);

      // Show rating
      methods.update(config);

      // Check if rating text should be displayed
      if (!config.showText) {
        // Remove original rating text
        $('.' + config.textClass).css("display", "none");
      }
      // Return the jquery object for chaining
      return this;
    },
    update : function( config ) {
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
            if (isNaN(scale)) {
              scale = config.maxRating;
            }

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
      return this;
    }
  };

  $.fn.ratingbar = function( method ) {
    // Method calling logic
    if ( methods[method] ) {
      // Call internal methods
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      // Call default init method
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.ratingbar' );
    }
  };
})(jQuery);
