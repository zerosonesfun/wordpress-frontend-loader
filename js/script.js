document.addEventListener('DOMContentLoaded', function() {
    var feloader = document.querySelector('.fe-loader-overlay');

    // Lists of selectors to ignore for link clicks
    var ignoreClickSelectors = [
        '.wp_ulike_btn',
        // Add more selectors here as needed
    ];

    // Specific elements to check for ignoring AJAX calls
    var ignoreAjaxSelectors = [
        '.wp_ulike_btn',
        // Add more selectors here as needed
    ];

    // Function to determine if AJAX should be ignored based on specific selectors
    function shouldIgnoreAjax() {
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
            if (!shouldIgnoreAjax()) {
                console.log('Loader shown for AJAX request.');
                feloader.style.display = 'flex';
            } else {
                console.log('Loader ignored for AJAX request due to matching ignore selector.');
            }
        }).ajaxComplete((e, xhr, options) => {
            feloader.style.display = 'none';
        });
    } else {
        console.warn("jQuery is not loaded, AJAX request handling for loader display is disabled.");
    }
});


//──╔═══╗────────────╔═══╗
//─╔╣╔═╗║────────────║╔══╝
//─╚╣║─║╠╗╔╦══╦═╦╗─╔╗║╚══╦══╦═╦══╦╗╔╦══╦═╗
//─╔╣║─║║║║║║═╣╔╣║─║║║╔══╣╔╗║╔╣║═╣╚╝║║═╣╔╝
//─║║╚═╝║╚╝║║═╣║║╚═╝║║║──║╚╝║║║║═╬╗╔╣║═╣║
//─║╠══╗╠══╩══╩╝╚═╗╔╝╚╝──╚══╩╝╚══╝╚╝╚══╩╝
//╔╝║──╚╝───────╔═╝║
//╚═╝───────────╚══╝
// Join jQrew: https://discord.com/invite/UuMRRFtqvB
