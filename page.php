<?php get_header(); ?>

<?php if( have_posts() ) : ?>
    <?php while( have_posts() ) : the_post(); ?>
        <article <?php post_class(); ?>>
            <h2>
                <?php the_title(); ?>
            </h2>
            <?php the_content(); ?>
        </article>
    <?php endwhile ; ?>
<?php else : ?>
    アクセスしたページにコンテンツが見つかりませんでした。
<?php endif ; ?>

<?php get_footer(); ?>