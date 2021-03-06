<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="canonical" href="<?php bloginfo('url'); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="wrapper">
    <header id="header">
        <?php
            if ( function_exists( 'the_custom_logo' ) &&  has_custom_logo() ) {
                the_custom_logo();
            } else {
                echo '<h1><a href="' . esc_url( home_url() ) . '">' . get_bloginfo( 'name' ) . '</a></h1>';
            }
            $menu_args = [
                'menu_class' => 'global-menu',
                'container' => 'nav',
                'container_class' => 'global-menu-wrap',
                'link_before' => '<span class="link-text">',
                'link_after' => '</span>',
                'theme_location' => 'header-menu',
            ];
            wp_nav_menu( $menu_args );
        ?>
    </header>
    <main id="main">