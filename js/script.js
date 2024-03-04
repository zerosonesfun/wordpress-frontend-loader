document.addEventListener('DOMContentLoaded', function() {
    var feloader = document.querySelector('.fe-loader-overlay');

    // Ensure settings are defined and split the string into arrays, filtering out any empty values
    var ignoreClickSelectors = feloadSettings.ignoreClickSelectors ? feloadSettings.ignoreClickSelectors.split(',').filter(Boolean) : [];
    var ignoreAjaxSelectors = feloadSettings.ignoreAjaxSelectors ? feloadSettings.ignoreAjaxSelectors.split(',').filter(Boolean) : [];

    function shouldIgnoreAjax(options) {
        if (options.data instanceof FormData) {
            return false;
        }

        let dataAsString = '';
        if (typeof options.data === 'string') {
            dataAsString = options.data;
        } else if (options.data && typeof options.data === 'object') {
            try {
                dataAsString = Object.keys(options.data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(options.data[key])}`).join('&');
            } catch (e) {
                console.log('Could not convert AJAX data to string. Ignoring spinner for this request.');
                return true;
            }
        }

        if (options.url.includes('admin-ajax.php') && dataAsString.includes('heartbeat')) {
            return true;
        }

        return ignoreAjaxSelectors.some(selector => {
            let elem = document.querySelector(selector);
            if (selector === '#distractionFreeCheckbox') {
                return elem !== null && elem.checked;
            }
            return elem !== null;
        });
    }

    function eventTargetMatchesSelector(event, selectors) {
        return selectors.some(selector => event.target.matches(selector) || event.target.closest(selector));
    }

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event) {
            if (!eventTargetMatchesSelector(event, ignoreClickSelectors)) {
                console.log('Loader shown for link click.');
                feloader.style.display = 'flex';
                setTimeout(() => { feloader.style.display = 'none'; }, 3000);
            } else {
                console.log('Loader ignored for link click due to matching ignore selector.');
            }
        });
    });

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
