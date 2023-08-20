<?php
defined('ABSPATH') || die();

add_action(
    'wp_enqueue_scripts', function () {
        wp_enqueue_style('sanitize', get_theme_file_uri('assets/css/foundation/sanitize.min.css'), [], date('YmdGis', filemtime(dirname(__FILE__) . '/assets/css/foundation/sanitize.min.css')));
        wp_enqueue_style('main-style', get_theme_file_uri('/style.css'), ['sanitize'], date('YmdGis', filemtime(dirname(__FILE__) . '/style.css')));
    }
);

add_action(
    'after_setup_theme', function () {
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        $defaults = [
        'height' => 185,
        'width' => 600,
        'flex-height' => true,
        'flex-width' => true,
        'header-text' => array( 'site-title', 'site-description' ),
        ];
        add_theme_support('custom-logo', $defaults);
        register_nav_menus(
            [
            'header-menu' => 'Header Menu',
            'footer-menu' => 'Footer Menu',
            ]
        );
    }
);

?>
