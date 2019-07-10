<?php get_header(); ?>

<?php if( have_posts() ) : ?>
    <?php while( have_posts() ) : the_post(); ?>
        <article <?php post_class(); ?>>
            <a href="<?php echo get_the_permalink(); ?>">
                <?php the_title(); ?>
                <?php the_content(); ?>
            </a>
        </article>
    <?php endwhile ; ?>
<?php else : ?>
    コンテンツがありません
<?php endif ; ?>

<?php get_footer(); ?>