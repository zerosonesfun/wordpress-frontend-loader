document.addEventListener('DOMContentLoaded', function() {
    var feloader = document.querySelector('.fe-loader-overlay');

    // Use localized settings from WordPress
    var ignoreClickSelectors = feloadSettings.ignoreClickSelectors.split(', ');
    var ignoreAjaxSelectors = feloadSettings.ignoreAjaxSelectors.split(', ');

    // Function to determine if AJAX should be ignored based on specific selectors, heartbeat, or type of data
    function shouldIgnoreAjax(options) {
        // Directly show spinner for FormData instances
        if (options.data instanceof FormData) {
            return false; // Do not ignore this AJAX request; show the spinner
        }

        // Convert options.data to a string if possible, for safe use of indexOf
        let dataAsString = '';
        if (typeof options.data === 'string') {
            dataAsString = options.data;
        } else if (options.data && typeof options.data === 'object') {
            // Attempt to convert object to query string if not FormData
            try {
                dataAsString = Object.keys(options.data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`).join('&');
            } catch (e) {
                console.log('Could not convert AJAX data to string. Ignoring spinner for this request.');
                return true; // Ignore this AJAX request due to conversion failure
            }
        }

        // Check if the AJAX request is for the WordPress heartbeat API
        if (options.url.includes('admin-ajax.php') && dataAsString.includes('heartbeat')) {
            return true; // Ignore heartbeat requests
        }

        return ignoreAjaxSelectors.some(selector => {
            let elem = document.querySelector(selector);
            if (selector === '#distractionFreeCheckbox') {
                return elem !== null && elem.checked; // For checkbox, also check if it's checked
            }
            return elem !== null; // For other selectors, just check for presence
        });
    }

    // Function to check if the event target matches any of the ignore selectors
    function eventTargetMatchesSelector(event, selectors) {
        return selectors.some(selector => event.target.matches(selector) || event.target.closest(selector));
    }

    // Adjusting link click behavior
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event) {
            if (!eventTargetMatchesSelector(event, ignoreClickSelectors)) {
                console.log('Loader shown for link click.');
                feloader.style.display = 'flex';
                setTimeout(() => { feloader.style.display = 'none'; }, 3000); // Hide loader after delay
            } else {
                console.log('Loader ignored for link click due to matching ignore selector.');
            }
        });
    });

    // Adjusting AJAX behavior if jQuery is available
    if (window.jQuery) {
        jQuery(document).ajaxSend((e, xhr, options) => {
            if (!shouldIgnoreAjax(options)) {
                console.log('Loader shown for AJAX request.');
                feloader.style.display = 'flex';
            } else {
                console.log('Loader ignored for AJAX request due to matching ignore selector, heartbeat check, or non-standard data.');
            }
        }).ajaxComplete((e, xhr, options) => {
            feloader.style.display = 'none';
        });
    } else {
        console.warn("jQuery is not loaded, AJAX request handling for loader display is disabled.");
    }
});
