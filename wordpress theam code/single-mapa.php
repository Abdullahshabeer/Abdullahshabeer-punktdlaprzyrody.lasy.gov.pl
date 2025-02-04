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
               
                   
                    <?php the_content(); ?>
                
            </div>
            <div class="col-xl-3 d-none d-xl-block">
                <div class="sidebar">
                    <div class="web-heading">
                        <h2><?php _e('Menu', 'cwb') ?></h2>
                    </div>
                    <div class="sidebar-menu">
                    <ul class="sidebar-widget">
                        <?php
                        // Check if the current page has a parent
                        $parent_id = 724;
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
       <?php
            if (is_active_sidebar('menu-sidebar')) {
                dynamic_sidebar('menu-sidebar');
            }
        ?>
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
