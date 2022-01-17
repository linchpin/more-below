<?php
/**
 * Plugin Name:       More Below Block
 * Description:       This plugin displays more text along with a supporting icon&amp;#x2F;svg. It is not a replacement for read more
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Linchpin
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       more-below
 *
 * @package           linchpin
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function linchpin_more_below_block_init() {
	register_block_type( __DIR__ );
}

add_action( 'init', 'linchpin_more_below_block_init' );
