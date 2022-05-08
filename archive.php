<?php get_header();?>

<section class="archive-posts content">
    <?php if (have_posts()): ?>
        <div class="archive-post-list">
            <?php while (have_posts()): the_post();?>
	                <article <?php post_class();?>>
	                    <a href="<?php echo get_the_permalink(); ?>">
	                        <div class="thumbnail-wrap">
	                            <?php if (has_post_thumbnail()) {
                                    the_post_thumbnail();
                                } else {?>
	                                <img src="<?php echo get_theme_file_uri('assets/img/default_thumbnail.png'); ?>" alt="<?php echo the_title(); ?>" class="wp-post-image" width="305" height="200">
	                            <?php }?>
	                        </div>
	                    </a>
	                    <div class="post-meta">
	                        <date><?php the_time('Y年m月d日');?></date>
	                        <?php
                            $cat_data = get_the_category(get_the_ID())[0];
                            $cat_output = '<a href="' . get_category_link($cat_data->term_id) . '" class="post-category-tag">' . $cat_data->name . '</a>';
                            echo $cat_output;
                            ?>
	                        <h3 class="posts-list-title">
	                            <a href="<?php echo get_the_permalink(); ?>">
	                                <?php the_title();?>
	                            </a>
	                        </h3>
	                    </div>
	                </article>
	            <?php endwhile;?>
        </div>
        <div class="pagination">
            <?php
            $args = [
                'prev_text' => '<<',
                'next_text' => '>>',
            ];
            echo paginate_links($args);
            ?>
        </div>
    <?php else: ?>
        <p>アクセスしたページにコンテンツが見つかりませんでした。</p>
    <?php endif;?>
</section>

<?php get_footer();?>
