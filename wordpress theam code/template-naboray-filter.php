<?php
/**
 **  Template Name: filter
 */
get_header();
?>
<?php
// Start the Loop.
if (have_posts()) {
    while (have_posts()) {
        the_post(); $featureimage = get_the_post_thumbnail();
$headerClass = !empty($featureimage) ? 'banner-header' : '';
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
                    <?php
                    the_content()
                    ?>
                        <div class="web-form-wrap light-bg filter-form-sec ">
                            <?php
                          function sanitize_if_array($value) {
                            return is_array($value) ? array_map('sanitize_text_field', $value) : sanitize_text_field($value);
                        }
                        
                        $selected_location = isset($_GET['location']) ? sanitize_if_array($_GET['location']) : [];
                        $selected_action = isset($_GET['action']) ? sanitize_if_array($_GET['action']) : [];
                        $selected_time = isset($_GET['selectedActions']) ? sanitize_if_array($_GET['selectedActions']) : [];
                        
                           

                            ?>

                            <div class="web-heading collapse-heading" data-bs-toggle="collapse" href="#filter-collapse" role="button" aria-expanded="true" aria-controls="filter-collapse">
                                <h3><?php _e('Filtry' , 'cwb') ?></h3>
                                
                            </div>
                            <div class="web-form collapse show" id="filter-collapse">
                                <form id="selctvaluenot " class= "form-inline">
                                    <div class="row">
                                        
                                        <div class="col-md-9">
                                            <div class="form-group">
                                                <label for="filter-option-2"><?php _e('Województwo' , 'cwb') ?></label>
                                                
                                                <select   id="filter-option-2" class="form-select vSelect " name="location[]" multiple >
                                               
                                                <?php
                                                    $taxonomy  = 'location-categories';
                                                    $tax_terms = get_terms($taxonomy, array('hide_empty' => false));

                                                    $selectedlocation = isset($_GET['location']) ? (is_array($_GET['location']) ? $_GET['location'] : array($_GET['location'])) : array();
                                                    foreach ($tax_terms as $term) {
                                                        echo '<option value="' . esc_attr($term->slug) . '"';
                                                        
                                                        if (in_array(esc_attr($term->slug),  $selectedlocation)) {
                                                            echo '' . __('selected', 'cwb') . '  ';
                                                        }
                                                        echo '>' . esc_html($term->name) . '</option>';  
                                                    }

                                                ?>
                                                </select>
                                            </div>
                                        </div>
                                        <!-- <div class="col-md-6">
                                            <div class="form-group" id="formgroup-455-512">
                                                <label for="filter-option-3"><?php
                                                //  _e('Program, z którego może być dofinansowany projekt' , 'cwb') 
                                                 ?></label>
                                                <select id="filter-option-3" class="vSelect" name="program[]" multiple>
                                                    <?php
                                                    // $taxonomy = 'programa-categories';
                                                    // $tax_terms = get_terms($taxonomy, array('hide_empty' => false));
                                                    
                                                    // $selectedPrograms = isset($_GET['program']) ? (is_array($_GET['program']) ? $_GET['program'] : array($_GET['program'])) : array();
                                                    
                                                    // foreach ($tax_terms as $term) {
                                                    //     echo '<option value="' . esc_attr($term->slug) . '"';
                                                        
                                                    //     if (in_array(esc_attr($term->slug), $selectedPrograms)) {
                                                    //         echo '' . __('selected:', 'cwb') . '  ';
                                                    //     }
                                                        
                                                    //     echo '>' . esc_html($term->name) . '</option>';
                                                    // }
                                                    ?>
                                                </select>


                                            </div>
                                        </div> -->
                                        <!-- <div class="col-md-6">
                                            <div class="form-group" >
                                                <label for="filter-option-4"><?php 
                                                // _e('Działanie' , 'cwb')
                                                 ?></label>
                                                <select class="form-select vSelect " id="filter-option-4" name="action[]" multiple>
                                                
                                               
                                                <?php
                                                    // $taxonomy  = 'action-categories';
                                                    // $tax_terms = get_terms($taxonomy, array('hide_empty' => false));
                                                    // $selectedaction = isset($_GET['action']) ? (is_array($_GET['action']) ? $_GET['action'] : array($_GET['action'])) : array();
                                                    // foreach ($tax_terms as $term) {
                                                    //     echo '<option value="' . esc_attr($term->slug) . '"';
                                                    //     if (isset($_GET['action']) && $_GET['action'] === esc_attr($term->slug)) {
                                                    //         echo '' . __('selected:', 'cwb') . '  ';
                                                    //     }
                                                    //     if (in_array(esc_attr($term->slug), $selectedaction)) {
                                                    //         echo '' . __('selected:', 'cwb') . '  ';
                                                    //     }
                                                    //     echo '>' . esc_html($term->name) . '</option>'; 
                                                    
                                                        
                                                    // }

                                                ?>
                                                </select>
                                            </div>
                                        </div> -->
                                    <!-- <div class="col-md-6">
                                        <div class="form-group" >
                                                <label for="filter-option-5"><?php 
                                                // _e('Harmonogram naborów wniosków' , 'cwb')
                                                 ?></label>
                                                   
                                        <div class="dropdown cwb-select-dropdown">
                                                <input type="text" id="selectedCount" readonly value="Wybierz" />
                                                <div id="hiddenInputsContainer"></div>
                                            <div class="dropdown-content" id="filter-option-5" >
                                                <div class="checkbox-container">
                                                    <input type="checkbox" id="selectAll" value="" class="action">
                                                    <label for="selectAll"><?php
                                                    //  _e('Zaznacz wszystkie' , 'cwb') 
                                                     ?></label>
                                                </div>  
                                             </div>
                                        </div>
                                    </div> -->

                                            
                                        <!-- </div> -->
                                        
                                        <div class="col-md-3">
                                            <div class="web-btn form-btn">
                                                <button type="submit" class="btn btn-primary"><?php _e('Zastosuj filtry' , 'cwb') ?></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="nabory-articles articles-wrap">
                            <div class="row">
                            <?php
                                $current_page = get_query_var('paged') ? get_query_var('paged') : 1;
                                $args = array(
                                    'post_type'      => 'naborye',
                                    'posts_per_page' => 9,
                                    'paged'          => $current_page,
                                    'tax_query'      => array(
                                        'relation'     => 'AND', // Add this relation parameter
                                    ),
                                );

                                if (!empty($selected_location)) {
                                    $args['tax_query'][] = array(
                                        'taxonomy' => 'location-categories',
                                        'field'    => 'slug',
                                        'terms'    => $selected_location,
                                    );
                                }

                                if (!empty($selected_action)) {
                                    $args['tax_query'][] = array(
                                        'taxonomy' => 'action-categories',
                                        'field'    => 'slug',
                                        'terms'    => $selected_action,
                                    );
                                }

                                if (!empty($selected_time)) {
                                    $args['tax_query'][] = array(
                                        'taxonomy' => 'Schedulesa-categories',
                                        'field'    => 'slug',
                                        'terms'    => $selected_time,
                                    );
                                    
                                }
                               
                                $custom_query = new WP_Query($args);

                                if ($custom_query->have_posts()) {
                                    while ($custom_query->have_posts()) {
                                        $custom_query->the_post();
                                        
                                        ?>
                                <div class="col-lg-4 col-md-6">
                                    
                                <div class="article-card card-style-1">
						    		<div class="article-featured-img">
                                    <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
						    		</div>
						    		<div class="article-content">
                                    <h3><?php the_title(); ?></h3>
                                    <?php
                                    $custom_taxonomiesp = get_the_terms(get_the_ID(), 'programa-categories');

                                    if (!empty($custom_taxonomiesp)) {
                                        $term_namesp = array();
                                        foreach ($custom_taxonomiesp as $term) {
                                            $term_namesp[] = $term->name;
                                        }
                                        $term_listp = implode(', ', $term_namesp);

                                        echo ' <div class="author"><span>' . esc_html($term_listp) . '</span></div>';
                                    }
                                    ?>
						    			<div class="status-recruitment d-flex align-items-start flex-column">
                                        <?php
                                                $custom_taxonomies = get_the_terms(get_the_ID(), 'nabora-categories');

                                                if (!empty($custom_taxonomies)) {
                                                    $term_names = array();
                                                    foreach ($custom_taxonomies as $term) {
                                                        $term_names[] = $term->name;
                                                    }
                                                    $term_list = implode(', ', $term_names);

                                                    echo '<div class="status-sec"><span>' . esc_html($term_list) . '</span></div>';
                                                }
                                             ?>
                                             <?php the_excerpt() ?>
						    			</div>
						    			<div class="web-btn text-end">
                                            <a href="<?php the_permalink(); ?>" class="btn btn-primary"><?php _e('szczegóły' , 'cwb') ?></a>
						    			</div>
						    		</div>
						    	</div>
                                </div>

                            
                            <?php
                                        }
                                        $total_pages = $custom_query->max_num_pages;
                                    } else {
                                        _e('No posts found.', 'cwb');
                                    }
                                    wp_reset_postdata();
                                ?>
                            </div>
                        </div>    
                    <?php 
                        if ($total_pages > 1) {
                            echo '<div class="pagination-wrap"><div class="pagination-inner " role="navigation">';
                            echo paginate_links(
                                array(
                                    'base' => get_pagenum_link(1) . '%_%',
                                    'format' => '?paged=%#%',
                                    'current' => $current_page,
                                    'total' => $total_pages,
                                    'prev_text' => '&#129120;',
                                    'next_text' => '&#129122;',
                                    
                                ));
                            echo '</div></div>';
                        }
                    ?>
        
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
<script type="text/javascript">
  		$('.vSelect').vSelect({
			placeholder: 'Wybierz',
			checkAll: true,
			checkAllLabel: 'Zaznacz wszystkie',
			selectedLabel: 'Wybrano',
			display: 'sum',
			trayHeight: '304px',
			dropdown: true,
		});
  	</script>