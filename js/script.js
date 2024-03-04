document.addEventListener('DOMContentLoaded', function() {
    var feloader = document.querySelector('.fe-loader-overlay');

    // Use localized settings from WordPress
    var ignoreClickSelectors = feloadSettings.ignoreClickSelectors.split(', ');
    var ignoreAjaxSelectors = feloadSettings.ignoreAjaxSelectors.split(', ');

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
            return elem !== null && (selector === '#distractionFreeCheckbox' ? elem.checked : true);
        });
    }

    function eventTargetMatchesSelector(event, selectors) {
        return selectors.some(selector => event.target.matches(selector) || event.target.closest(selector));
    }

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event) {
            if (!eventTargetMatchesSelector(event, ignoreClickSelectors)) {
                feloader.style.display = 'flex';
                setTimeout(() => { feloader.style.display = 'none'; }, 3000);
            }
        });
    });

    if (window.jQuery) {
        jQuery(document).ajaxSend((e, xhr, options) => {
            if (!shouldIgnoreAjax(options)) {
                feloader.style.display = 'flex';
            }
        }).ajaxComplete(() => {
            feloader.style.display = 'none';
        });
    }
});
