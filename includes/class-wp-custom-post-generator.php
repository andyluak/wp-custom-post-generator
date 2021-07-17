<?php
/**
 * Main class for our plugin
 *
 * @package wp-cpg
 */

/**
 * Class WP_CPG
 */
class WP_CPG {

	/**
	 * Construct function of our class
	 */
	function __construct() {//@phpcs:ignore
		add_action( 'init', array( $this, 'init' ) );
	}

	/**
	 * Init function that fires on admin_init
	 */
	public function init() {
		add_action( 'admin_menu', array( $this, 'add_option_menu' ) );
	}

	/**
	 * Function to add settings page
	 */
	public function add_option_menu() {
		$page_hook_suffix = add_options_page(
			esc_html__( 'WP CPG Settings', 'wp-cpg' ),
			esc_html__( 'WP CPG Settings', 'wp-cpg' ),
			'manage_options',
			'wp_cpg_settings',
			array( $this, 'menu_callback' )
		);

		add_action( "admin_print_scripts-{$page_hook_suffix}", array( $this, 'options_assets' ) );
	}

	/**
	 * Menu callback.
	 * We don't need to worry about this as we will be rendering this in react.
	 */
	public function menu_callback() {
		echo '<div id="wp-cpg-settings"></div>';
	}

	/**
	 * Enqueue our assets
	 */
	public function options_assets() {

		wp_enqueue_script( 'wp-cpg-script', WP_CPG_URL . 'assets/js/wp-cpg-settings.js', array( 'wp-api', 'wp-i18n', 'wp-components', 'wp-element' ), WP_CPG_VERSION, true );
		wp_enqueue_style( 'wp-cpg-style', WP_CPG_URL . 'assets/css/wp-cpg-settings.css', array( 'wp-components' ), WP_CPG_VERSION );
	}
}
new WP_CPG();
