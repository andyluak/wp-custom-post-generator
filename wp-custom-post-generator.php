<?php
/**
 * Main file for our plugin.
 *
 * @package wp-cpg
 */

/**
 * Plugin Name:              WP Custom Post Generator
 * Description:              Generate post and custom post types
 * Author:                   God
 * Version:                  1.0.0
 * License:                  GPLv3 or later
 * License URI:              http://www.gnu.org/licenses/gpl-3.0.html
 * Requires PHP:             5.6
 * Text Domain:              wp-cpg
 * Domain Path:              /languages
 * Copyright 2021            God
 */

/**
 * Define Constants
 *
 * @since 1.0.0
 */

define( 'WP_CPG_VERSION', '1.0.0' );
define( 'WP_CPG_PATH', plugin_dir_path( __FILE__ ) );
define( 'WP_CPG_URL', plugin_dir_url( __FILE__ ) );
define( 'WP_CPG_FILE', plugin_basename( __FILE__ ) );


require WP_CPG_PATH . 'includes/class-wp-cpg.php';
