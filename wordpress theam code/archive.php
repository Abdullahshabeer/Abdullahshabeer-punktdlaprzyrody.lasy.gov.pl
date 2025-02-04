<?php
/*
Template Name: Archives
*/
?>

<?php get_header(); ?>

                    <?php
if (have_posts()) :
    while (have_posts()) : the_post();
    ?>
       <div class="item">
				    	<div class="article-card card-style-1">
				    		<div class="article-featured-img">
                            <?php the_post_thumbnail(); ?>
				    			<img src="images/image4.png" alt="<?php _e('img', 'cwb') ?>">
				    		</div>
				    		<div class="article-content">
				    			<h3><?php the_title(); ?></h3>
				    			<div class="author"><span><?php the_author() ?></span></div>
				    			<div class="status-recruitment d-flex align-items-center">
				    				<div class="status-sec"><span><?php _e('Trwa nabór', 'cwb') ?></span></div>
				    				<span><?php the_excerpt(); ?></span>
				    			</div>
				    			<div class="web-btn text-end">
				    				<a href="<?php the_permalink(); ?>" class="btn btn-primary"><?php _e('szczegóły', 'cwb') ?></a>
				    			</div>
				    		</div>
				    	</div>
				    </div>
        <?php
    endwhile;
else :
    echo 'No posts found.';
endif;
?>


<?php
if (have_posts()) :
    while (have_posts()) : the_post();
        // Your post content display code here
    endwhile;
else :
    echo 'No posts found.';
endif;
?>