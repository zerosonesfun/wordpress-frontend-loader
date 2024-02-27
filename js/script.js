document.addEventListener('DOMContentLoaded', function() {
  var loader = document.querySelector('.loader-overlay');

  function showLoader() {
    loader.style.display = 'flex';
    setTimeout(hideLoader, 5000); // Fallback to hide loader after 5 seconds
  }

  function hideLoader() {
    loader.style.display = 'none';
  }

  document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(event) {
      showLoader();
    });
  });

  window.addEventListener('load', hideLoader);

  // Check AJAX requests
  jQuery(document).on('ajaxSend', function(e, xhr, options) {
    // Assuming heartbeat data is sent as part of the URL or body, adjust as necessary
    if (!options.data || (options.data && !options.data.includes('heartbeat') && !options.data.includes('pg-messaging'))) {
      showLoader();
    }
  }).on('ajaxComplete', function(e, xhr, options) {
    hideLoader();
  });
});
