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
    $plugin_version = '1.3'; // Updated version number
    wp_enqueue_script( 'load-script', plugin_dir_url( __FILE__ ) . 'js/script.js', array( 'jquery' ), $plugin_version, true );
    wp_enqueue_style( 'load-style', plugin_dir_url( __FILE__ ) . 'css/style.css', array(), $plugin_version );
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
