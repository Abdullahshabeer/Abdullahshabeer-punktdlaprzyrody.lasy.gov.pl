<?php
get_header();

if (have_posts()) :
    while (have_posts()) : the_post();
?>

<section class="sub-page-header light-bg">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="header-content">
                    <?php custom_breadcrumbs(); ?>
                    <div class="expert-category-wrap d-flex">
                        <?php
                        $taxonomies = get_post_taxonomies();
                        foreach ($taxonomies as $taxonomy) {
                            $terms = get_the_terms(get_the_ID(), $taxonomy);
                            if (!empty($terms)) {
                                $term = reset($terms); // Get the first term
                                echo '<div class="expert-category"><span style="background-color:'. get_field('dot_dolor').'"></span>' . esc_html($term->name) . '</div>';
                            }
                        }
                        ?>
                    </div>
                    <div class="page-title d-flex">
                        <h1><?php the_title(); ?></h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="block-row sub-page-wrap">
    <div class="container">
        <div class="row sub-page-row">
            <div class="col-xl-9">
                <div class="expert-single">
                    <div class="expert-img">
                        <?php the_post_thumbnail(); ?>
                    </div>
                    
                    <?php the_content(); ?>
                    <?php echo do_shortcode('[expert_booking_form]'); ?>

                    <?php
						$permalink = get_field('rate_the_training_link');
						if (!empty($permalink)) {
							echo '<a href="' . esc_url($permalink . '?post_id=' . get_the_ID()) . '">' . esc_html(get_field('text')) . '</a>';
						} else {
							echo '<p>' . esc_html(get_field('text')) . '</p>';
						}
						?>
                </div>
            </div>
            <div class="col-xl-3 d-none d-xl-block">
                <div class="sidebar">
                    <div class="web-heading">
                        <h2><?php _e('Menu', 'cwb'); ?></h2>
                    </div>
                    <div class="sidebar-menu">
                    <ul>
                        <?php
                        // Check if the current page has a parent
                        $parent_id = isset($_GET['parent_id']) ? intval($_GET['parent_id']) : 0;
                        $active_class = '';
                        if ($parent_id) {
                            // Get the current page's ID
                            $current_page_id = get_the_ID();

                            // Get the child pages of the same parent
                            $sibling_pages_query = new WP_Query(array(
                                'post_type' => 'page',
                                'post_parent' => $parent_id,
                                'posts_per_page' => -1, // Show all sibling pages
                                'orderby' => 'menu_order', // Order by menu order
                                'order' => 'ASC', // Ascending order
                            ));

                            while ($sibling_pages_query->have_posts()) {
                                $sibling_pages_query->the_post();
                                $active_class = ($current_page_id == get_the_ID()) ? 'active' : ''; // Check if it's the current page
                        ?>
                                <li class="<?php echo $active_class; ?>">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </li>
                        <?php
                            }
                            wp_reset_postdata(); // Reset post data to the main query
                        } else {
                            // If there is no parent page, display the current page's title with a link
                        ?>
                            <li>
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </li>
                        <?php
                        }
                        ?>
                    </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php
    endwhile;
endif;

get_footer();
?>
