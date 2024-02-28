// Target the fe-loader-overlay div which the php file injects
document.addEventListener('DOMContentLoaded', function() {
  var feloader = document.querySelector('.fe-loader-overlay');
// Show loader when needed, but just in case get it outta here after 3 seconds
  function showLoader() {
    feloader.style.display = 'flex';
    setTimeout(hideLoader, 3000);
  }
// Hide loader when needed
  function hideLoader() {
    feloader.style.display = 'none';
  }
// For an app experience, show loader on link clicks
  document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(event) {
      showLoader();
    });
  });
// Actually do the hiding
  window.addEventListener('load', hideLoader);

// Check if jQuery is available before setting up AJAX handlers
  if (window.jQuery) {
// Using jQuery for AJAX request handling for an app-like experience - remove this part if it's too bothersome for you
    jQuery(document).on('ajaxSend', function(e, xhr, options) {
      if (!options.data || (options.data && !options.data.includes('heartbeat'))) {
        showLoader();
      }
    }).on('ajaxComplete', function(e, xhr, options) {
      hideLoader();
    });
  } else {
// jQuery is not available - let the dev know in the console
    console.warn("jQuery is not loaded, AJAX request handling for loader display is disabled.");
  }
});
