<?php
add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );

function enqueue_parent_styles() {
 wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
}

//----------------------CUSTOM PHP - MANTZIUS ------------------------------------------

// ADD COSTUM JS
/**
 * Enqueue a script with jQuery as a dependency.
 */
function wpdocs_scripts_method() {
    wp_enqueue_script( 'custom-script', get_stylesheet_directory_uri() . '/min-js.js', array(), true, true );
}
add_action( 'wp_enqueue_scripts', 'wpdocs_scripts_method' );

?>

