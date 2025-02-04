<?php
get_header();

if (have_posts()) :
    while (have_posts()) : the_post();
    $featureimage = get_the_post_thumbnail();
    $headerClass = !empty($featureimage) ? 'banner-header' : '';
    $post_id    = get_the_ID();
            ?>
    <section class="sub-page-header light-bg <?php echo esc_attr($headerClass); ?>">
            <div class="container">
               <div class="row">
                    <?php $featureimage = get_the_post_thumbnail(); ?>
                    <div class="col-xl-<?php echo !empty($featureimage) ? '7' : '12'; ?>">
                        <div class="header-content">
                        <?php custom_breadcrumbs(); ?>
                            <div class="page-title d-flex">
                            <?php
                            
                            $default_page_icon = get_field('min_header_icon'); // Set the value for $default_page_icon
                              
                            if (empty($default_page_icon)) {
                                $parent_id = wp_get_post_parent_id(get_the_ID());
                                    $page_icons = get_field('min_header_icon', $parent_id);
                                  
                                   if (empty($page_icons)) {
                                        // If the parent post doesn't have a page icon, check the grandparent (parent's parent)
                                        $grandparent_id = wp_get_post_parent_id($parent_id);
                                        $page_icon = get_field('min_header_icon', $grandparent_id);
                                        if (!empty($page_icons)) {
                                        echo '<img src="' . esc_url($page_icon) . '" alt="page icon" />';
                                        }
                                    } else {
                                        echo '<img src="' . esc_url($page_icons) . '" alt="parent icon" />';
                                    }
                            }else{
                                if (!empty($default_page_icon)) {
                                    echo '<img src="' . esc_url($default_page_icon) . '" alt="default icon" />';
                                }
                                
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
                <div class="web-heading heading-divider">
                    <h2><?php _e('Informacje ogólne', 'cwb') ?></h2>
                </div>
					<div class="information-list">
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Nazwa', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'fname' , true); ?></b></div>
						</div>
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Adres siedziby', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'Headquartersaddres' , true); ?></b></div>
						</div>
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Adres e-mail', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'email' , true); ?></b></div>
						</div>
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Numer telefonu', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'telefon' , true); ?></b></div>
						</div>
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Forma organizacyjno - prawna', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'form_consultation' , true); ?></b></div>
						</div>
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Obszar, na którym planowane są działania', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'activities' , true); ?></b></div>
						</div>
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Profil działalności', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'textarea_Profil' , true); ?></b></div>
						</div>
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Działania planowane do realizacji', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'activi_planned' , true); ?></b></div>
						</div>
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Wkład do projektu', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'Contribution' , true); ?></b></div>
						</div>
						<div class="d-flex info-list-row">
							<div class="info-list-left"><?php _e('Zakładana wartość projektu', 'cwb') ?></div>
							<div class="info-list-right"><b><?php echo get_post_meta($post_id, 'project-value' , true); ?></b></div>
						</div>
					</div>
					<div class="web-heading heading-divider">
						<h2><?php _e('Czy podmiot ma doświadczenie w realizacji projektów ze środków zewnętrznych', 'cwb') ?></h2>
					</div>
					<?php echo get_post_meta($post_id, 'textarea_experience' , true); ?>
					<div class="web-heading heading-divider">
						<h2><?php _e('Opis planowanego projektu', 'cwb') ?></h2>
					</div>
					<p><?php echo get_post_meta($post_id, 'textare' , true); ?> </p>
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
