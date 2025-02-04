<?php
/**
 **  Template Name: parent child
 */
get_header();
?>
<?php
// Start the Loop.
if (have_posts()) {
    while (have_posts()) {
        the_post(); ?>
<section class="sub-page-header light-bg">
	<div class="container">
		<div class="row">
			<?php $featureimage = get_the_post_thumbnail(); ?>
			<div class="col-xl-<?php echo !empty($featureimage) ? '7' : '12'; ?>">
				<div class="header-content">
				    <?php custom_breadcrumbs(); ?>
					<div class="page-title d-flex">
							<?php
							$parent_id = wp_get_post_parent_id(get_the_ID());
							// Get the ACF field value for 'page_icons'
							$page_icons = get_field('min_header_icon', $parent_id);

							// Check if it's an array and if it has the 'url' key
							if (!empty($page_icons)) {
                                $alt_text = __('page icon', 'cwb');
								echo '<img src="' . esc_url($page_icons) . '" alt="' . esc_attr($alt_text) . '" />';
							}
							?>
							<h1><?php the_title() ?></h1>
					</div>
				</div>
			</div>
				<?php
				if (!empty($featureimage)) {
				?>
			<div class="col-xl-5">
				<div class="banner-img">
							<?php the_post_thumbnail(); ?>
				</div>
			</div>
				<?php
				}
				?>
		</div>
	</div>
</section>
<section class="block-row sub-page-wrap">
	<div class="container">
		<div class="row sub-page-row">
			<div class="col-xl-9">
                <div class="podstrony-block">
				    <div class="row">
                        <?php
                        // Get the child pages of the current page
                        $child_pages_query = new WP_Query(array(
                            'post_type' => 'page',
                            'post_parent' => get_the_ID(),
                            'posts_per_page' => -1, // Show all child pages
                            'orderby' => 'menu_order', // Order by menu order
                            'order' => 'ASC', // Ascending order
                        ));

                        if ($child_pages_query->have_posts()) {
                            // Loop through the child pages
                            while ($child_pages_query->have_posts()) {
                                $child_pages_query->the_post();
                                ?>
                        <div class="col-xl-6 col-md-6">
                             <div class="podstrony-card">
                                <a href="<?php the_permalink(); ?>" class="podstrony-card-inner d-flex align-items-center flex-column">
                                   <div class="card-icon">
                                            <?php
                                                // Get the ACF field value for 'page_icons'
                                                $page_icons = get_field('page_icons', get_the_ID(  ));
                                                    
                                                // Check if it's an array and if it has the 'url' key
                                                if (isset($page_icons)) {
                                                    $alt_text = __('page icon', 'cwb'); // Localize the alt text
                                                    echo '<img src="' . esc_url($page_icons) . '" alt="' . esc_attr($alt_text) . '" />';
                                                }
                                            ?>
                                    </div>
                                            <h3><?php the_title(); ?></h3>
                                </a>
                            </div>
                        </div>
                                <?php
                            }
                            wp_reset_postdata(); // Reset post data to the main query
                        } else {
                            // If there are no child pages, display the current page's title
                            echo '<h1>' . get_the_title() . '</h1>';
                        }
                        ?>
                    </div>
                </div>
            </div>
		
		
            <div class="col-xl-3 d-none d-xl-block">
                <div class="sidebar">
                    <div class="web-heading">
                                <h2><?php _e('Menu' , 'cwb') ?></h2>
                    </div>
                    <div class="sidebar-menu">
                            <ul>
                                <?php
                                // Check if the current page has a parent
                                $parent_id = wp_get_post_parent_id(get_the_ID());
                                $active_class = '';
                                // print_r($parent_id);
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
                                        $active_class = ($current_page_id == get_the_ID()) ? 'current-menu-item' : ''; // Check if it's the current page
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
        }
    }
?>

<?php
get_footer()
?>