<?php
/*
Plugin Name: Frontend Loader
Description: A minimal loading spinner for WordPress that just works from initial click to page load to ajax requests.
Version: 1.2.3
Author: Billy Wilcosky
Author URI: https://wilcosky.com/skywolf
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

// If accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Secure plugin by checking for WP environment
if ( ! function_exists( 'add_action' ) ) {
    die;
}

// Prefix functions with "feload"
function feload_custom_enqueue_scripts_and_styles() {
    wp_enqueue_script( 'load-script', plugin_dir_url( __FILE__ ) . 'js/script.js', array( 'jquery' ), '1.6', true );
    wp_enqueue_style( 'load-style', plugin_dir_url( __FILE__ ) . 'css/style.css', array(), '1.6' );
}
add_action( 'wp_enqueue_scripts', 'feload_custom_enqueue_scripts_and_styles' );

function feload_add_custom_div() {
    echo '<div class="fe-loader-overlay"><div class="fe-loader"></div></div>';
}
add_action( 'wp_footer', 'feload_add_custom_div' );
?>
