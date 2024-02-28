document.addEventListener('DOMContentLoaded', function() {
  var loader = document.querySelector('.fe-loader-overlay');

  function showLoader() {
    loader.style.display = 'flex';
    setTimeout(hideLoader, 3000); // Fallback to hide loader after 3 seconds just to ensure that no visitor ever has too poor of an experience due to an outlying/odd situation.
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

  // Check AJAX requests using jQuery because WordPress loads jQuery by default so why not utilize it?
  jQuery(document).on('ajaxSend', function(e, xhr, options) {
    // Ignore WP hearbeat - that would cause the spinner to show every so many seconds/minutes.
    if (!options.data || (options.data && !options.data.includes('heartbeat'))) {
      showLoader();
    }
  }).on('ajaxComplete', function(e, xhr, options) {
    hideLoader();
  });
});
