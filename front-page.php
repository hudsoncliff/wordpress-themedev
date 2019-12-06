<?php get_header(); ?>

<section class="news">

    <h2 class="section-title">お知らせ</h2>

    <?php if( have_posts() ) : ?>
        <ul class="new-posts-list">
            <?php while( have_posts() ) : the_post(); ?>
                <li <?php post_class(); ?>>
                    <a href="<?php echo get_the_permalink(); ?>">
                        <date>2019年</date>
                        <h3 class="new-posts-list-title">
                            <?php the_title(); ?>
                        </h3>
                    </a>
                </li>
            <?php endwhile ; ?>
        </ul>
    <?php else : ?>
        コンテンツがありません
    <?php endif ; ?>

</section>

<?php get_footer(); ?>