<?php
/*
Plugin Name: Frontend Loader
Description: A minimal loading spinner for WordPress that just works from initial click to page load to ajax requests.
Version: 1.3
Author: Billy Wilcosky
Author URI: https://wilcosky.com/skywolf
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: frontend-loader
Domain Path: /languages
*/

// If accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Secure plugin by checking for WP environment
if ( ! function_exists( 'add_action' ) ) {
    die( 'No script kiddies please!' );
}

// Enqueue scripts and styles
function feload_custom_enqueue_scripts_and_styles() {
    wp_enqueue_script( 'load-script', plugin_dir_url( __FILE__ ) . 'js/script.js', array( 'jquery' ), '1.4', true );
    wp_enqueue_style( 'load-style', plugin_dir_url( __FILE__ ) . 'css/style.css', array(), '1.3' );

    // Retrieve settings or set default values
    $ignore_click_selectors = get_option('feload_ignore_click_selectors', '.cld-like-trigger, .wp_ulike_btn');
    $ignore_ajax_selectors = get_option('feload_ignore_ajax_selectors', '#distractionFreeCheckbox, .bod-block-popup-overlay.active, .cld-like-trigger, .wp_ulike_btn');

    // Localize the script with your array of settings
    wp_localize_script( 'load-script', 'feloadSettings', array(
        'ignoreClickSelectors' => $ignore_click_selectors,
        'ignoreAjaxSelectors' => $ignore_ajax_selectors,
    ));
}
add_action( 'wp_enqueue_scripts', 'feload_custom_enqueue_scripts_and_styles' );

// Add custom div for the loader
function feload_add_custom_div() {
    // Note: Since the output here is static and safe, escaping is not required.
    // Always use functions like esc_html() for dynamic content.
    echo '<div class="fe-loader-overlay"><div class="fe-loader"></div></div>';
}
add_action( 'wp_footer', 'feload_add_custom_div' );

// Load plugin textdomain for internationalization
function feload_load_textdomain() {
    load_plugin_textdomain( 'frontend-loader', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}
add_action( 'plugins_loaded', 'feload_load_textdomain' );

// Rest of file is for the Admin Settings page
// Register settings, section, and fields
add_action('admin_init', 'feload_register_settings');
function feload_register_settings() {
    // Register a new setting for "feload_settings" page
    register_setting('feload_settings', 'feload_ignore_click_selectors');
    register_setting('feload_settings', 'feload_ignore_ajax_selectors');

    // Register a new section in the "feload_settings" page
    add_settings_section(
        'feload_settings_section',
        'Frontend Loader Settings',
        'feload_settings_section_cb',
        'feload_settings'
    );

    // Register a new field in the "feload_settings_section" section, inside the "feload_settings" page
    add_settings_field(
        'feload_field_ignore_click_selectors',
        'Ignore Click Selectors',
        'feload_field_ignore_click_selectors_cb',
        'feload_settings',
        'feload_settings_section'
    );

    add_settings_field(
        'feload_field_ignore_ajax_selectors',
        'Ignore AJAX Selectors',
        'feload_field_ignore_ajax_selectors_cb',
        'feload_settings',
        'feload_settings_section'
    );
}

// Section callback function
function feload_settings_section_cb() {
    echo '<p>Customize the selectors to ignore for link clicks and AJAX requests.</p>';
}

// Field callback functions
function feload_field_ignore_click_selectors_cb() {
    // Get the value of the setting we've registered with register_setting()
    $setting = get_option('feload_ignore_click_selectors');
    // Output the field
    echo "<input type='text' name='feload_ignore_click_selectors' value='" . esc_attr($setting) . "' style='width: 100%;'>";
}

function feload_field_ignore_ajax_selectors_cb() {
    $setting = get_option('feload_ignore_ajax_selectors');
    echo "<input type='text' name='feload_ignore_ajax_selectors' value='" . esc_attr($setting) . "' style='width: 100%;'>";
}

// Add the top level menu page
add_action('admin_menu', 'feload_settings_page');
function feload_settings_page() {
    add_options_page(
        'Frontend Loader Settings',
        'Frontend Loader',
        'manage_options',
        'feload_settings',
        'feload_settings_page_html'
    );
}

// Top level menu callback function
function feload_settings_page_html() {
    // check user capabilities
    if (!current_user_can('manage_options')) {
        return;
    }

    // add error/update messages

    // check if the user have submitted the settings
    // WordPress will add the "settings-updated" $_GET parameter to the url
    if (isset($_GET['settings-updated'])) {
        // add settings saved message with the class of "updated"
        add_settings_error('feload_messages', 'feload_message', 'Settings Saved', 'updated');
    }

    // show error/update messages
    settings_errors('feload_messages');
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form action="options.php" method="post">
            <?php
            // output security fields for the registered setting "feload_settings"
            settings_fields('feload_settings');
            // output setting sections and their fields
            // (sections are registered for "feload_settings", each field is registered to a specific section)
            do_settings_sections('feload_settings');
            // output save settings button
            submit_button('Save Settings');
            ?>
        </form>
    </div>
    <?php
}
