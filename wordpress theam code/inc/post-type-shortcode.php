<?php
function welcome_user_shortcode($atts)
{
    $atts = shortcode_atts(
        array(
            'post_type' => 'post',
            'posts_per_page' => 6,
            'category' => '', // Default to no category filter
        ),
        $atts
    );

    $html_to_return = ''; // Initialize the variable

    ob_start();
    ?>
            <?php
            $post_type = sanitize_text_field($atts['post_type']);
            $posts_per_page = intval($atts['posts_per_page']);
            $posts_categories = intval($atts['category']);

            $args = array(
                'post_type' => $post_type,
                'posts_per_page' => $posts_per_page,
                'post_categories' =>  $posts_categories,
            );

            $custom_query = new WP_Query($args);

            if ($custom_query->have_posts()) {
                while ($custom_query->have_posts()) {
                    $custom_query->the_post();
                   
                    ?>

                    
                    <div class="item">
                        <div class="article-card card-style-1">
                            <div class="article-featured-img">
                                <?php the_post_thumbnail('full', array('alt' => get_the_title())); ?>
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
                               
                                <div class="status-recruitment d-flex align-items-center">
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
                                    <a href="<?php the_permalink(); ?>" class="btn btn-primary"><span class="visually-hidden"><?php the_title(); ?></span><?php _e('szczegóły' , 'cwb') ?></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                }
                $total_pages = $custom_query->max_num_pages;
            } else {
                echo '<div class="parentnone">';
                    _e('No posts found.', 'cwb');
                    echo '</div>';
            }
            wp_reset_postdata();
            ?>

    <?php
    $html_to_return = ob_get_clean();

    return $html_to_return;
}

add_shortcode('display_publications_list', 'welcome_user_shortcode');



/**
 * 
 * API endpoint for get_news_shortcode
 */
function publications_list_custom_post_type_handler($request) {
    $params = $request->get_params();
    $content = do_shortcode("[display_publications_list post_type='{$params['postType']}' posts_per_page='{$params['postperpage']}' category='{$params['selectedCategory']}']");
    

    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/publications_list-custom-post-type', array(
        'methods' => 'POST',
        'callback' => 'publications_list_custom_post_type_handler',
    ));
});
// end api endpoint


function welcome_user_shortcodestyletwo($atts)
{
    $atts = shortcode_atts(
        array(
            'post_type' => 'post',
            'posts_per_page' => 6,
            'category' => '', // Default to no category filter
        ),
        $atts
    );

    $html_to_return = ''; // Initialize the variable

    ob_start();
    ?>
            <?php
            $post_type = sanitize_text_field($atts['post_type']);
            $posts_per_page = intval($atts['posts_per_page']);
            $posts_categories = intval($atts['category']);

            $today = date('Y-m-d H:i:s');

            $args = array(
                'post_type' => $post_type,
                'posts_per_page' => $posts_per_page,
                'post_categories' =>  $posts_categories,
            );

            
            $args['meta_query'] = array(
                array(
                    'key' => 'start_date',
                    'compare' => '>=', // Corrected: Compare value should be a string
                    'value' => $today,
                    'type' => 'DATETIME', // Add this line if 'start_date' is a DATETIME field
                ),
            );

            $custom_query = new WP_Query($args);

            if ($custom_query->have_posts()) {
                while ($custom_query->have_posts()) {
                    $custom_query->the_post();
                    $start_date = get_field('start_date');


					

                    setlocale(LC_TIME, 'pl_PL.utf8', 'pl_PL', 'pl');

                        $date_time_object = new DateTime($start_date);

                        // Format the date and time in Polish
                        $date = strftime('%d.%m %a', $date_time_object->getTimestamp()); // %a for abbreviated weekday name

                        // Capitalize the first letter of the weekday
                        $date = ucfirst(mb_strtolower($date, 'UTF-8'));

                        $time = $date_time_object->format('H:i');

                        $current_date = date('d.m.Y');
                   
                    ?>
                    <div class="item">
				    	<div class="article-card card-style-2">
				    		<div class="article-featured-img">
                            <?php the_post_thumbnail('full', array('alt' => get_the_title())); ?>
				    		</div>
				    		<div class="article-content">
				    			<h3><?php the_title(); ?></h3>
				    			<?php the_excerpt(); ?>
				    			<div class="article-meta d-flex align-items-center justify-content-between">
				    				<div class="date-location d-flex align-items-center">
                                    <div class="date-sec"><b> <?php echo $date; ?></b><span>|</span><?php echo $time; ?></div>
				    					<div class="location-sec d-flex">
                                            <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 9C18 15.9706 10 23 9 23C8 23 0 15.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#43516F"/><circle cx="9" cy="9" r="4" fill="#EEF3FF"/></svg>
                                            <?php echo esc_html( get_field('set_location') ); ?>
                                            
                                       </div>
				    				</div>
				    				<div class="web-btn text-end">
					    				<a href="<?php the_permalink(); ?>" class="btn btn-primary"><span class="visually-hidden"><?php the_title(); ?></span><?php _e('szczegóły' , 'cwb') ?></a>
					    			</div>
				    			</div>
				    		</div>
				    	</div>
				    </div>
                    
                    <?php
                }
                $total_pages = $custom_query->max_num_pages;
            } else {
                echo '<div class="parentnone">';
                    _e('No posts found.', 'cwb');
                    echo '</div>';
            }
            wp_reset_postdata();
            ?>

    <?php
    $html_to_return = ob_get_clean();

    return $html_to_return;
}

add_shortcode('display_publications_styletwo', 'welcome_user_shortcodestyletwo');


function welcome_user_shortcodethree($atts)
{
    $atts = shortcode_atts(
        array(
            'post_type' => 'post',
            'posts_per_page' => 6,
            'category' => '', // Default to no category filter
        ),
        $atts
    );

    $html_to_return = ''; // Initialize the variable

    ob_start();
    ?>
            <?php
            $post_type = sanitize_text_field($atts['post_type']);
            $posts_per_page = intval($atts['posts_per_page']);
            $posts_categories = intval($atts['category']);

            $args = array(
                'post_type' => $post_type,
                'posts_per_page' => $posts_per_page,
                'post_categories' =>  $posts_categories,
            );

            $custom_query = new WP_Query($args);

            if ($custom_query->have_posts()) {
                while ($custom_query->have_posts()) {
                    $custom_query->the_post();
                   
                    ?>

                    <div class="item">
				    	<div class="article-card card-style-3">
				    		<div class="article-featured-img">
                            <?php the_post_thumbnail('large', array('alt' => get_the_title())); ?>
				    		</div>
				    		<div class="article-content">
				    			<div class="date-sec"><span><?php echo get_the_time('d.m.Y'); ?></span></div>
				    			<h3><?php the_title(); ?></h3>
				    			<div class="web-btn">
				    				<a href="<?php the_permalink(); ?>" class="btn btn-primary"><span class="visually-hidden"><?php the_title(); ?></span><?php _e('czytaj' , 'cwb') ?></a>
				    			</div>
				    		</div>
				    	</div>
				    </div>
                    <?php
                }
                $total_pages = $custom_query->max_num_pages;
            } else {
                echo '<div class="parentnone">';
                    _e('No posts found.', 'cwb');
                    echo '</div>';
            }
            wp_reset_postdata();
            ?>

    <?php
    $html_to_return = ob_get_clean();

    return $html_to_return;
}

add_shortcode('display_publications_stylethree', 'welcome_user_shortcodethree');




function get_posts_from_custom_post_type($atts){
    $atts = shortcode_atts(
		array(
			'post_type' => 'post',
			'posts_per_page' => 6,
            'categories'   => '',
            'upcoming_post'  => '',
            
		),
		$atts
	);
    $search_location = isset($_GET['title']) ? sanitize_text_field($_GET['title']) : '';
    $selected_applies_date = isset($_GET['date']) ? sanitize_text_field($_GET['date']) : '';
    $selected_search = isset($_GET['search']) ? sanitize_text_field($_GET['search']) : '';
    $selected_inputhidden = isset($_GET['inputhidden']) ? sanitize_text_field($_GET['inputhidden']) : '';

    ob_start(); ?>
    <div class="web-form-wrap filter-form-sec light-bg">
        <div class="web-form">
            <form>
                <div class="row">
                    <div class="col-lg-7">
                        <div class="row">
                        <input type="hidden" class="" name="inputhidden" value="<?php echo  $atts['upcoming_post'] ?>" > 
                            <div class="col-lg-6">
    <div class="form-group" id="datepicker">
        <label for="date"><?php _e('Data szkolenia', 'cwb') ?></label>
        <select name="date" id="date" class="form-select date-picker">
			<option value="">Wybierz datę</option>
            <?php
            $post_type = $atts['post_type'];
            $categories = $atts['categories'];
            $ucouming = $atts['upcoming_post'];

            $args = array(
                'post_type' => $post_type,
            );

            $today = date('Y-m-d H:i:s');
            if (!empty($categories)) {
                $args['tax_query'] = array(
                    array(
                        'taxonomy' => 'newcategory', // Replace with your actual custom taxonomy name
                        'field' => 'slug', // You can use 'id', 'slug', or 'name' here
                        'terms' => $categories,
                    ),
                );
            }

            if ($ucouming == 'upcoming' || $ucouming == 'completed') {
                $meta_compare = ($ucouming == 'upcoming') ? '>=' : '<=';
                $args['meta_query'] = array(
                    array(
                        'key' => 'start_date', // Check if 'newcategories' is the correct custom field key
                        'compare' => $meta_compare,
                        'value' => $today,
                    ),
                );
            }

            $custom_query = new WP_Query($args);

            $date_locations = array();
	$added_locations = array();// Initialize the array before the loop
if ($custom_query->have_posts()) {
    while ($custom_query->have_posts()) {
        $custom_query->the_post();

        $start_date = get_field('start_date');

        // Convert start_date to DateTime object
        $date_time_object = new DateTime($start_date);

        // Format the date
        $date = $date_time_object->format('d.m.Y');
          $location = get_field('set_location');
        // Check if date is not empty and not already added
        if (!empty($date) && !in_array($date, $date_locations)) {
            $date_locations[] = $date;
        }
		 if (!empty($location) && !in_array($location, $added_locations)) {
                        $added_locations[] = $location;
		 }
    }
}

// Output option tags outside of the loop
foreach ($date_locations as $date) {
    printf('<option value="%s" %s>%s</option>',
        esc_attr($date),
        isset($_GET['date']) && $_GET['date'] === $date ? 'selected="selected"' : '',
        esc_html($date)
    );
}
            wp_reset_postdata();
            ?>
        </select>
    </div>
</div>

                            <div class="col-lg-6">
    <div class="form-group">
        <label for="name"><?php _e('Miejsce', 'cwb') ?></label>
        <select id="name" name="title" class="form-select">
            <option value=""><?php _e('Wpisz nazwę', 'cwb') ?></option>
            <?php 
				$added_locations = array();
            if ($custom_query->have_posts()) {
                while ($custom_query->have_posts()) {
                    $custom_query->the_post();
                    $location = get_field('set_location');
                   if (!empty($location) && !in_array($location, $added_locations)) {
                        $added_locations[] = $location;
                        printf('<option value="%s" %s>%s</option>',
                            esc_attr($location),
                            isset($_GET['title']) && $_GET['title'] === $location ? 'selected="selected"' : '',
                            esc_html($location)
                        );
                    }
                }
            }
            
            ?>
        </select>
    </div>
</div>

                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="form-group">
                                    <label for="search-input"><?php _e('Wyszukiwarka' , 'cwb') ?></label>
                                    <input type="text" class="form-control" id="search-input" name="search" value="<?php echo (isset($_GET['search']) ? $_GET['search'] : ''); ?>" placeholder="<?php _e('Wpisz szukaną frazę...' , 'cwb') ?>">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="web-btn form-btn">
                                    <button type="submit" class="btn btn-primary"><?php _e('szukaj' , 'cwb') ?></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="traning-articles-wrap articles-wrap ">
									<div class="row">
                                    <?php
            $post_type = $atts['post_type'];
            $categories = $atts['categories'];
            $ucouming   = $atts['upcoming_post'];
            $posts_per_page = $atts['posts_per_page'];
            
            $current_page = get_query_var('paged') ? get_query_var('paged') : 1;
            $sort_order             = isset($_GET['sort']) ? $_GET['sort'] : 'desc';
             
            $today = date('Y-m-d H:i:s');
           
            $args = array(
                'post_type' => $post_type,
                'nopaging' => true,
                'order' => $sort_order,
            );
           
            if ($ucouming == 'upcoming' || $ucouming == 'completed') {
                $meta_compare = ($ucouming == 'upcoming') ? '>=' : '<=';
                $args['meta_query'] = array(
                    array(
                        'key' => 'start_date',
                        'compare' => $meta_compare,
                        'value' => $today,
                    ),
                );
                
            }
            $meta_query = array();
            if (!empty( $selected_search) ) {
                $args['s'] = $selected_search;
            }
            if (!empty($selected_applies_date)) {
                $date_time_object = DateTime::createFromFormat('d.m.Y', $selected_applies_date);
                if ($date_time_object) {
                    $formatted_date = $date_time_object->format('Y-m-d');
                    $meta_query[] = array(
                        'key' => 'start_date',
                        'value' => $formatted_date,
                       
                        'type' => 'DATE',
                    );
                }
            }
            
            
            if (!empty($search_location)) {
                $meta_query[] = array(
                    'key' => 'set_location',
                    'value' => $search_location,
                    'type' => 'TEXT',
                    'compare' => 'LIKE',
                );
            }

            if (!empty($meta_query)) {
                $args['meta_query'] = $meta_query;
            }
            
            if (!empty($categories)) {
                $args['tax_query'] = array(
                    array(
                        'taxonomy' => 'newcategory', // Replace with your actual custom taxonomy name
                        'field' => 'newcategories', // You can use 'id', 'slug', or 'name' here
                        'terms' => $categories,
                    ),
                );
            }

            $custom_query = new WP_Query($args);
            // print_r($custom_query);
            if ($custom_query->have_posts()) {
                while ($custom_query->have_posts()) {
                    $custom_query->the_post(); 

                    $start_date = get_field('start_date');


					setlocale(LC_TIME, 'pl_PL.utf8', 'pl_PL', 'pl');

                        $date_time_object = new DateTime($start_date);

                        // Format the date and time in Polish
                        $date = strftime('%d.%m %a', $date_time_object->getTimestamp()); // %a for abbreviated weekday name

                        // Capitalize the first letter of the weekday
                        $date = ucfirst(mb_strtolower($date, 'UTF-8'));

                        $time = $date_time_object->format('H:i');

                        $current_date = date('d.m.Y');
                    
                    ?>
                    <div class="col-lg-6 col-md-6">
                        <div class="article-card card-style-2">
                            <div class="article-featured-img">
                            <?php the_post_thumbnail('full', array('alt' => get_the_title())); ?>
                            </div>
                            <div class="article-content">
				    			<h3><?php the_title(); ?></h3>
				    			<?php the_excerpt(); ?>
				    			<div class="article-meta d-flex align-items-center justify-content-between">
				    				<div class="date-location d-flex align-items-center">
                                    <div class="date-sec"><b> <?php echo $date; ?></b><span>|</span><?php echo $time; ?></div>

				    					<div class="location-sec d-flex">
                                            <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 9C18 15.9706 10 23 9 23C8 23 0 15.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#43516F"/><circle cx="9" cy="9" r="4" fill="#EEF3FF"/></svg>
                                            <?php echo get_field('set_location') ?>
                                       </div>
				    				</div>
				    				<div class="web-btn text-end">
					    				<a href="<?php the_permalink(); ?>" class="btn btn-primary"><?php _e('szczegóły' , 'cwb') ?></a>
					    			</div>
				    			</div>
				    		</div>
                        </div>
                    </div>
                <?php }
                $total_pages = $custom_query->max_num_pages;
            } else {
                $total_pages ='';
                ?>
                <div class="nopost">
               <?php _e('Niczego nie znaleziono.', 'cwb'); ?>
            </div>
             <?php
            }
            wp_reset_postdata();
            ?>
            <!-- <div class="pagination-wrap">
                <div class="pagination-inner" role="navigation">
                    <div class="page-item">
                        <a href="#" class="page-link" data-page="1">🡠</a>
                    </div>
                    <div class="page-item">
                        <span class="page-link current">1</span>
                    </div>
                    <div class="page-item ">
                        <a href="#" class="page-link" data-page="2">2</a>
                    </div>
                    <div class="page-item">
                        <a href="#" class="page-link" data-page="3">3</a>
                    </div>
                    <div class="page-item">
                        ...
                    </div>
                    <div class="page-item">
                        <a href="#" class="page-link" data-page="4">4</a>
                    </div>
                    <div class="page-item">
                        <a href="#" class="page-link" data-page="5">🡢</a>
                    </div>
                </div>
            </div> -->
             <?php 
                    if ($total_pages > 1) {
                        echo ' <div class="pagination-wrap">';
                        echo ' <div class="pagination-inner" role="navigation">';
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
    </div>
	
    <?php $html_to_return = ob_get_clean();
    return $html_to_return;
}
add_shortcode('get_posts_from_custom_post_type', 'get_posts_from_custom_post_type');




/**
 * 
 * API endpoint for get_news_shortcode
 */
function get_posts_from_custom_handler($request) {
    $params = $request->get_params();
    
    $content = do_shortcode("[get_posts_from_custom_post_type post_type='{$params['postType']}' posts_per_page='{$params['postsPerPage']}' upcoming_post='{$params['upcomingchecbox']}' categories='{$params['categories']}']");

    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/posts-from-custom-post-type', array(
        'methods' => 'POST',
        'callback' => 'get_posts_from_custom_handler',
    ));
});
// end api endpoint


function get_posts_from_custom_post_type_second($atts){
    $atts = shortcode_atts(
		array(
			'post_type' => 'post',
			'posts_per_page' => 6,
            'categories'   => '',
            // 'upcoming_post'  => '',
            
		),
		$atts
	);
    $search_query           =   isset($_GET['titles']) ? sanitize_text_field($_GET['titles']) : '';
    $selected_applies_year  =   isset($_GET['dates']) ? sanitize_text_field($_GET['dates']) : '';
    $selected_year          =   isset($_GET['searchs']) ? sanitize_text_field($_GET['searchs']) : '';
    ob_start(); ?>
    <div class="web-form-wrap filter-form-sec light-bg">
        <div class="web-form">
            <form>
                <div class="row">
                    <div class="col-lg-7">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group" id="datepicker">
                                    <label for="date"><?php _e('Data szkolenia' , 'cwb') ?></label>
                                    <input type="text" class="form-control date-picker" name="date" id="date" value="<?php echo (isset($_GET['dates']) ? $_GET['dates'] : ''); ?>" placeholder="<?php _e('Wybierz zakres dat' , 'cwb') ?>">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="name"><?php _e('Miejsce' , 'cwb') ?></label>
                                    <input type="text" class="form-control" id="name" name="titles"  value="<?php echo (isset($_GET['titles']) ? $_GET['titles'] : ''); ?>" placeholder="<?php _e('Wpisz nazwę' , 'cwb') ?>">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="form-group">
                                    <label for="search-input"><?php _e('Wyszukiwarka' , 'cwb') ?></label>
                                    <input type="text" class="form-control" id="search-input" name="searchs"  value="<?php echo (isset($_GET['searchs']) ? $_GET['searchs'] : ''); ?>"  placeholder="<?php _e('Wpisz szukaną frazę...' , 'cwb') ?>">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="web-btn form-btn">
                                    <button type="submit" class="btn btn-primary"><?php _e('szukaj' , 'cwb') ?></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="traning-articles-wrap articles-wrap">
									<div class="row">
                                    <?php
            $post_type = $atts['post_type'];
            $categories = $atts['categories'];
            // $ucouming   = $atts['upcoming_post'];
            $posts_per_page = $atts['posts_per_page'];
            
            $current_page = get_query_var('paged') ? get_query_var('paged') : 1;
            $sort_order             = isset($_GET['sort']) ? $_GET['sort'] : 'desc';
             
            // $today = date('Y-m-d H:i:s');
           
            $args = array(
                'post_type' => $post_type,
                'nopaging' => true,
                'order' => $sort_order,
            );
           
            // if ($ucouming == 'upcoming' || $ucouming == 'completed') {
            //     $meta_compare = ($ucouming == 'upcoming') ? '>=' : '<=';
            //     $args['meta_query'] = array(
            //         array(
            //             'key' => 'start_date',
            //             'compare' => $meta_compare,
            //             'value' => $today,
            //         ),
            //     );
                
            // }
            
           
            if (!empty( $selected_year)) {
                $args['s'] = $selected_year;
            }
            if (!empty( $selected_applies_year )) {
                $args['tax_query'][] = array(
                    'key' => 'start_date',
                    'value' =>  $selected_applies_year ,
                    'type' => 'DATE',
                    'compare' => 'LIKE',
                );
            }
            if (!empty($categories)) {
                $args['tax_query'] = array(
                    array(
                        'taxonomy' => 'newcategory', // Replace with your actual custom taxonomy name
                        'field' => 'newcategories', // You can use 'id', 'slug', or 'name' here
                        'terms' => $categories,
                    ),
                );
            }
            
            if (!empty($search_query)) {
                $args['s'] = $search_query;
            }

            $custom_query = new WP_Query($args);
            // print_r($custom_query);
            if ($custom_query->have_posts()) {
                while ($custom_query->have_posts()) {
                    $custom_query->the_post();
                    $start_date = get_field('start_date');


					setlocale(LC_TIME, 'pl_PL.utf8', 'pl_PL', 'pl');

                        $date_time_object = new DateTime($start_date);

                        // Format the date and time in Polish
                        $date = strftime('%d.%m %a', $date_time_object->getTimestamp()); // %a for abbreviated weekday name

                        // Capitalize the first letter of the weekday
                        $date = ucfirst(mb_strtolower($date, 'UTF-8'));

                        $time = $date_time_object->format('H:i');

                        $current_date = date('d.m.Y');
                    
                    ?>
                    <div class="col-lg-6 col-md-6">
                        <div class="article-card card-style-2">
                            <div class="article-featured-img">
                            <?php the_post_thumbnail('full', array('alt' => get_the_title())); ?>
                            </div>
                            <div class="article-content">
				    			<h3><?php the_title(); ?></h3>
				    			<?php the_excerpt(); ?>
				    			<div class="article-meta d-flex align-items-center justify-content-between">
				    				<div class="date-location d-flex align-items-center">
                                    <div class="date-sec"><b> <?php echo $date; ?></b><span>|</span><?php echo $time; ?></div>
				    					<div class="location-sec d-flex">
                                            <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 9C18 15.9706 10 23 9 23C8 23 0 15.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#43516F"/><circle cx="9" cy="9" r="4" fill="#EEF3FF"/></svg>
                                            <?php echo get_field('set_location') ?>
                                       </div>
				    				</div>
				    				<div class="web-btn text-end">
					    				<a href="<?php the_permalink(); ?>" class="btn btn-primary"><?php _e('szczegóły' , 'cwb') ?></a>
					    			</div>
				    			</div>
				    		</div>
                        </div>
                    </div>
                <?php }
                $total_pages = $custom_query->max_num_pages;
            } else {
                echo '<div class="parentnone">';
                    _e('No posts found.', 'cwb');
                    echo '</div>';
            }
            wp_reset_postdata();
            ?>
            <!-- <div class="pagination-wrap">
                <div class="pagination-inner" role="navigation">
                    <div class="page-item">
                        <a href="#" class="page-link" data-page="1">🡠</a>
                    </div>
                    <div class="page-item">
                        <span class="page-link current">1</span>
                    </div>
                    <div class="page-item ">
                        <a href="#" class="page-link" data-page="2">2</a>
                    </div>
                    <div class="page-item">
                        <a href="#" class="page-link" data-page="3">3</a>
                    </div>
                    <div class="page-item">
                        ...
                    </div>
                    <div class="page-item">
                        <a href="#" class="page-link" data-page="4">4</a>
                    </div>
                    <div class="page-item">
                        <a href="#" class="page-link" data-page="5">🡢</a>
                    </div>
                </div>
            </div> -->
             <?php 
                    if ($total_pages > 1) {
                        echo ' <div class="pagination-wrap">';
                        echo ' <div class="pagination-inner" role="navigation">';
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
    </div>
	
    <?php $html_to_return = ob_get_clean();
    return $html_to_return;
}
add_shortcode('get_posts_from_custom_post_type_second', 'get_posts_from_custom_post_type_second');




/**
 * 
 * API endpoint for get_news_shortcode
 */
function get_posts_from_custom_handlerw($request) {
    $params = $request->get_params();
    
    $content = do_shortcode("[get_posts_from_custom_post_type_second post_type='{$params['postType']}' posts_per_page='{$params['postsPerPage']}' upcoming_post='{$params['upcomingchecbox']}' categories='{$params['categories']}']");

    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/posts-from-custom-post-type-second', array(
        'methods' => 'POST',
        'callback' => 'get_posts_from_custom_handlerw',
    ));
});
// end api endpoint








function montyley_kalandarz_function($atts) {
    ob_start(); // Start output buffering

    $atts = shortcode_atts(
        array(
            'post_type' => 'post',
            'categories' => '',
        ),
        $atts
    );

    $post_type = $atts['post_type'];
    $categories = $atts['categories'];

    // Define an array of month names starting from January to December
    $months = array(
        __('Styczeń', 'cwb'),
        __('Luty', 'cwb'),
        __('Marzec', 'cwb'),
        __('Kwiecień', 'cwb'),
        __('Maj', 'cwb'),
        __('Czerwiec', 'cwb'),
        __('Lipiec', 'cwb'),
        __('Sierpień', 'cwb'),
        __('Wrzesień', 'cwb'),
        __('Październik', 'cwb'),
        __('Listopad', 'cwb'),
        __('Grudzień', 'cwb')
    );

    ?>
    <div class="traning-post-listview">
        <div class="year-list">
            <ul>
            <?php
                // Loop through the months
                foreach ($months as $monthName) {
                    $yearMonthFormatted = date('Ym', strtotime($monthName)); // Convert month name to 'YYYYMM' format
                    ?>
                    <li><a href="#year-<?php echo $yearMonthFormatted; ?>"><?php echo $monthName; ?></a></li>
                    <?php
                }
            ?>
            </ul>
        </div>
    <?php
    // Loop through the months
    foreach ($months as $monthName) {
        // Convert month name to 'YYYYMM' format
        $yearMonthFormatted = date('Ym', strtotime($monthName));

        // Set up query args for the specific month
        $args = array(
            'post_type' => $post_type,
            'category_name' => $categories, // Replace with the correct taxonomy term if needed
            'nopaging' => true,
            'meta_query' => array(
                'relation' => 'AND',
                array(
                    'key' => 'selected_post_time',
                    'compare' => 'LIKE', // Use LIKE for partial matching
                    'value' => $yearMonthFormatted,
                ),
            ),
        );

        // Create a WP_Query for the specific month
        $custom_query = new WP_Query($args);

        // Check if there are posts for this month
        if ($custom_query->have_posts()) {
            ?>
            <div class="yearly-posts" id="year-<?php echo $yearMonthFormatted; ?>">
                <div class="web-heading heading-divider">
                    <h2><?php echo $monthName; ?></h2>
                </div>
                <div class="data-table-block">
                    <table class="table data-table">
                        <thead>
                            <tr>
                                <th>Tytuł szkolenia</th>
                                <th>Limit miejsc</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            // Loop through posts for this month
                            while ($custom_query->have_posts()) {
                                $custom_query->the_post();
                                ?>
                                <tr>
                                    <td aria-label="Tytuł szkolenia">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </td>
                                    <?php if(get_field('limit')){ ?>
								
                                    
                                    
                                <?php
                                $current_post_id = get_the_ID();
                                $training_bookings_count = new WP_Query(array(
                                    'post_type' => 'training_bookings',
                                    'post_status' 	=> 'publish',
                                    'meta_query' => array(
                                        array(
                                            'key' 		=> 'training_id',
                                            'value' 	=> $current_post_id,
                                            'compare' 	=> '=',
                                        ),
                                    ),
                                    'posts_per_page' 	=> -1,  // Retrieve all matching posts
                                ));

                                // Display the count
                                echo '<td aria-label="Limit miejsc"><b>' . $training_bookings_count->found_posts . '/' . get_field('limit') . '</b></td>';

                                
                                ?>
                            
                         
                         <?php } ?>
                                </tr>
                                <?php
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <?php
        }
        // Reset post data for the next month
        wp_reset_postdata();
    }
    ?>
    </div>
    <?php

    $html_to_return = ob_get_clean(); // Get the buffered content and clean the buffer
    return $html_to_return;
}


add_shortcode('montyley_kalandarz_shortcode', 'montyley_kalandarz_function');


/**
 * 
 * API endpoint for get_news_shortcode
 */
function get_kalandarz_from_custom_post_type_handler($request) {
    $params = $request->get_params();
    $content = do_shortcode("[montyley_kalandarz_shortcode post_type='{$params['postType']}' posts_per_page='{$params['selectedCategory']}' ]");

    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/get-kalandarz-from-custom-post-type', array(
        'methods' => 'POST',
        'callback' => 'get_kalandarz_from_custom_post_type_handler',
    ));
});
// end api endpoint



















function Kalendarz_konsultacji_function($atts){
    ob_start(); // Start output buffering
    
    $atts = shortcode_atts(
        array(
            'post_type' => 'post',
            'categories' => '',
        ),
        $atts
    );
    
    $post_type = $atts['post_type'];
    $categories = $atts['categories'];

    // Define the JavaScript code for FullCalendar initialization and event data
    ?>
    <div id="fullcalendar"></div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var calendarEl = document.getElementById('fullcalendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                locale: 'pl',
				firstDay: 1,
				eventDisplay: 'block',
				navLinks: true, // can click day/week names to navigate views
				selectMirror: true,
				dayMaxEvents: true, // allow "more" link when too many events
				headerToolbar: {
					left: 'prev,next',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				buttonText: {
					month:    'miesiąc',
					week:     'tydzień',
					day:      'dzień',
				},
				eventTimeFormat: { // like '14:30:00'
			    hour: '2-digit',
			    minute: '2-digit',
                second: '2-digit', // Include seconds
			    meridiem: false
				},
				slotLabelFormat: {
					hour: '2-digit',
			    minute: '2-digit',
			  	meridiem: 'short'
				},
                events: <?php echo json_encode(get_event_data($post_type, $categories)); ?>,
            });
            calendar.render();
        });
    </script>
    <?php

    $html_to_return = ob_get_clean(); // Get the buffered content and clean the buffer
    return $html_to_return;
}

function get_event_data($post_type, $categories) {
    $event_data = array();

    if($post_type=='training_bookings'){
        $args = array(
            'post_type' => $post_type,
            'posts_per_page' => -1,
			'meta_query' => array(
            'relation' => 'AND',
            array(
                'key'     => '_is_booking_booked',
                'compare' => 'NOT EXISTS',
            ),   
          ),
        );
        $query = new WP_Query($args);
    
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $event_title                =   get_the_title();
                $post_id                    =   get_the_ID();
                // $date                       =   DateTime::createFromFormat('d.m.Y' , get_post_meta($post_id, 'termin_konsultacji', true));
                // $date = strtotime($date);
                
                $postid = get_post_meta($post_id, 'training_id', true);
                $categoriesname = get_post_meta($postid, 'dziedzina', true);
                $datepost = get_post_meta($postid, 'termin_konsultacji', true);
                $timepost = get_post_meta($postid, 'godzina_konsultacji', true);
                $start_date = get_field('start_date', $postid);
                $end_date = get_field('end_date', $postid);
                $color = get_field('color_', $postid);
                $textcolor = get_field('textcolor', $postid);
              
          // Combine datepost and timepost into a single DateTime object
        $event_datetime_str = $datepost . ' ' . $timepost;
        $event_datetime = DateTime::createFromFormat('Y-m-d H:i:s', $event_datetime_str);

        // Get current date and time
        $current_datetime = new DateTime('now', new DateTimeZone(wp_timezone_string()));

        // Initialize URL
        $url = 'https://punktdlaprzyrody.lasy.gov.pl/skorzystaj-z-konsultacji/umow-sie-na-konsultacje/';

        // Append parameters if event date and time is in the future
        if ($event_datetime > $current_datetime) {
            $url .= '?categoriesnem=' . urlencode($categoriesname) . '&datepost=' . urlencode($datepost) . '&timepost=' . urlencode($timepost);
        }

        $event = array(
            'title' => $event_title,
            'start' => $start_date,
            'end' => $end_date,
            'color' => $color,
            'textColor' => $textcolor,
            'url' => $url,
        );
                $event_data[] = $event;
            }
        }
    }
    else if($post_type=='bookings_timings'){
        $args = array(
            'post_type' => $post_type,
            'posts_per_page' => -1,
			'meta_query' => array(
            'relation' => 'AND',
            array(
                'key'     => '_is_booking_booked',
                'compare' => 'NOT EXISTS',
            ),   
          ),
        );
        $query = new WP_Query($args);
    
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $event_title                =   get_the_title();
                $post_id                    =   get_the_ID();
                $postlink                   = get_the_permalink();


                $custom_taxonomiesp = get_the_terms(get_the_ID(), 'listexperts-categories');

                if (!empty($custom_taxonomiesp)) {
                    $term_namesp = array();
                    foreach ($custom_taxonomiesp as $term) {
                        $term_namesp[] = $term->name;
                    }
                    $term_listp = implode(', ', $term_namesp);

                    
                }

                $postid = get_post_meta($post_id, 'training_id', true);
                $startdate  = get_field('data', $post_id);
                $starttimer = get_field('godzina_startu', $post_id);
                $starttime = date('H:i:s', strtotime($starttimer));
                $endtime = get_field('godzina_zakonczenia', $post_id);
                $timestamp  = strtotime($startdate . ' ' . $starttime);
                $end_timestamp  = strtotime($startdate . ' ' . $endtime);
                $start_date = date('Y-m-d H:i:s', $timestamp);
                $end_date = date('Y-m-d H:i:s', $end_timestamp);
                $color = get_field('background_color', $post_id);
                $textcolor = get_field('text_color', $post_id);

                $event_datetime_str = $startdate . ' ' . $starttime;
        $event_datetime = DateTime::createFromFormat('Y-m-d H:i:s', $event_datetime_str);

        // Get current date and time
        $current_datetime = new DateTime('now', new DateTimeZone(wp_timezone_string()));

        // Initialize URL
        $url = 'https://punktdlaprzyrody.lasy.gov.pl/skorzystaj-z-konsultacji/umow-sie-na-konsultacje/';
        
        // Append parameters if event date and time is in the future
        if ($event_datetime > $current_datetime) {
            $url .= '?categoriesnem=' . urlencode($term_listp) . '&datepost=' . urlencode($startdate) . '&timepost=' . urlencode($starttime);
        }
        
        
                $event = array(
                    'title' => $event_title,
                    'start' => $start_date,
                    'end' => $end_date,
                    'color' => $color,
                    'textColor' => $textcolor,
                    'url' => $url,
                );
              
                // $event = array(
                //     'title'         => $event_title,
                //     'start'         => $start_date,
                //     'end'           => $end_date,
                //     'color'         => $color,
                //     'textColor'     => $textcolor,
                //     'url'           => 'https://punktdlaprzyrody.lasy.gov.pl/skorzystaj-z-konsultacji/umow-sie-na-konsultacje/?categoriesnem='.$term_listp.'&datepost='.$startdate.'&timepost='.$starttime.'',
                // );
                $event_data[] = $event;
            }
        }
    }
    else{
        $args = array(
            'post_type' => $post_type,
            'posts_per_page' => -1,
			'meta_query' => array(
            'relation' => 'AND',
            array(
                'key'     => '_is_booking_booked',
                'compare' => 'NOT EXISTS',
            ),   
          ),
        );
        $query = new WP_Query($args);
    
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $event_title                =   get_the_title();
                $post_id                    =   get_the_ID();
                $permalink                  =   get_the_permalink();
                // $date                       =   DateTime::createFromFormat('d.m.Y' , get_post_meta($post_id, 'termin_konsultacji', true));
                // $date = strtotime($date);
                $time                       =   get_post_meta($post_id, 'godzina_konsultacji', true);
                $topic                      =   get_post_meta($post_id, 'topic', true);
                $expert_id                  =   get_post_meta($post_id, 'ekspert' , true);
                // $event_title                  =   get_post_meta($post_id, 'dziedzina' , true);
                // $dateTime                   =   DateTime::createFromFormat('d.m.Y ga', $date . ' ' . $time);
                // Assuming $date is already a DateTime object
                // $date = DateTime::createFromFormat('d.m.Y', get_post_meta($post_id, 'termin_konsultacji', true));
    
                // $dateString = $date->format('d.m.Y');
                $termin_konsultacji     = get_post_meta($post_id, 'termin_konsultacji', true);
                $time                   = get_post_meta($post_id, 'godzina_konsultacji', true);
                
                // // Create a DateTime object from the retrieved date and time
                $timestamp                  = strtotime($termin_konsultacji . ' ' . $time);
                $end_timestamp              = $timestamp + 3600;
                // $datetime_object        = DateTime::createFromFormat('d.m.Y H:i:s', $datetime_string);;
                $startdate  = get_field('start_date', $post_id);
                $colore  = get_field('color_', $post_id);
                $textcolo  = get_field('textcolor', $post_id);
                // // Add 1 hour to calculate the end time
                // $end_datetime_object    = clone $datetime_object;
                // $end_datetime_object->modify('+1 hour');
                
                // // Format the start and end dates for use in JavaScript (e.g., 'YYYY-MM-DD\TH:i')
                // $formatted_start_date       = $datetime_object->format('Y-m-d\TH:i');
                // $formatted_end_date         = $end_datetime_object->format('Y-m-d\TH:i');
                $formatted_start_date       =   date('Y-m-d\TH:i', $timestamp);
                $formatted_end_date         =   date('Y-m-d\TH:i', $end_timestamp);
                $dot_color                  =   '#000';
                $event_color                =   '#fff';
                $terms                      =   wp_get_post_terms($post_id, 'listexperts-categories');
                $category_title             =   $event_title;
    
                if (!empty($terms) && !is_wp_error($terms)) {
                    $term_id        = $terms[0]->term_id;
                    $category_title = $terms[0]->name;
                    $dot_color      = get_field('dot_dolor', 'listexperts-categories_' . $term_id);
                }
                $event = array(
                    'title'         => $category_title,
                    'start'         => $startdate,
                    'end'           => $time,
                    'color'         => $colore,
                    'textColor'     => $textcolo,
                    'url'           => $permalink,
                    
                );
                $event_data[] = $event;
                // print_r($event);
            }
        }
    }
   
    wp_reset_postdata();
    return $event_data;
}

add_shortcode('Kalendarz_konsultacji_shortcode', 'Kalendarz_konsultacji_function');


/**
 * 
 * API endpoint for get_konsultacji_shortcode
 */
function get_konsultacji_from_custom_post_type_handler($request) {
    $params = $request->get_params();
    $content = do_shortcode("[Kalendarz_konsultacji_shortcode post_type='{$params['postType']}' posts_per_page='{$params['selectedCategory']}' ]");

    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/get-konsultacji-from-custom-post-type', array(
        'methods' => 'POST',
        'callback' => 'get_konsultacji_from_custom_post_type_handler',
    ));
});
// end api endpoint





function Lista_Ekspertw_function($atts){
    ob_start(); // Start output buffering
    
    $atts = shortcode_atts(
        array(
            'post_type' => 'naborye',
        ),
        $atts
    );
    
    $post_type = $atts['post_type'];
    $parent_id = wp_get_post_parent_id(get_the_ID());
    // print_r($parent_id);

$taxonomies = get_object_taxonomies($post_type);

if (!empty($taxonomies)) {
    $filtered_taxonomies = array_filter($taxonomies, function($taxonomy) {
        return $taxonomy === 'listexperts-categories';
    });
    
    // echo '<div class="list-expert-top">';
    // echo '<p>Wyświetl ekspertów z dziedziny:</p>';
    // echo '<ul>';

    // // Loop through taxonomies and create list items
    // foreach ($filtered_taxonomies as $taxonomy) {
    //     $terms = get_terms(array(
    //         'taxonomy' => $taxonomy,
    //         'hide_empty' => false,
    //     ));

    //     if (!empty($terms)) {
    //         foreach ($terms as $term) {
    //             echo '<li data-filter="' . esc_attr('category-' . $term->term_id) . '">';
    //             echo '<a href="#">' . esc_html($term->name) . '</a>';
    //             echo '</li>';
    //         }
    //     }
    // }

    // echo '</ul>';
    // echo '</div>';

    echo '<div class="list-expert-wrap articles-wrap">';
    echo '<div class="row">';
    $current_page           = get_query_var('paged') ? get_query_var('paged') : 1;
    // Loop through taxonomies and their terms
    foreach ($filtered_taxonomies as $taxonomy) {
        $terms = get_terms($taxonomy);
        
        if (!empty($terms)) {
            foreach ($terms as $term) {
                $args = array(
                    'post_type' => $post_type,
                    'posts_per_page'    => 3,
                    'paged' => $current_page,
                    'tax_query' => array(
                        array(
                            'taxonomy' => $taxonomy,
                            'field' => 'slug',
                            
                            'terms' => $term->slug,
                            
                        ),
                    ),
                );

                $query = new WP_Query($args);

                // Loop through posts and create list items
                while ($query->have_posts()) {
                    $query->the_post(); 
                    echo '<div class="col-lg-4 col-md-6 list-expert-col ' . esc_attr('category-'. $term->term_id) . '">';
                    echo '<a href="' . get_the_permalink() . '?parent_id=' . $parent_id . '">';
                    echo '<div class="article-card card-style-3">';
                    echo '<div class="article-featured-img">';
                    // Replace the image source with your actual image source
                    echo '' . get_the_post_thumbnail() . '';
                    echo '</div>';
                    echo '<div class="article-content">';
                    echo '<div class="expert-category"><span <? style="background-color: ' . get_field('dot_dolor', $term->taxonomy . '_' . $term->term_id) . '"></span>' . esc_html($term->name) . '</div>';
                    echo '<h3>' . get_the_title() . '</h3>';
                    echo '</div>';
                    echo '</div>';
                    echo '</a>';
                    echo '</div>';
                }
               
                wp_reset_postdata(); // Reset the query for the next term
            }
        }
    }



        echo '</div>';
        // $total_pages = $query->max_num_pages;
         
        //             if ($total_pages > 1) {
        //                 echo ' <div class="pagination-wrap">
        //                 <div class="pagination-inner justify-content-center" role="navigation">';
                        
        //                 $paginate_links = paginate_links(
        //                     array(
        //                         'base' => get_pagenum_link(1) . '%_%',
        //                         'format' => '?paged=%#%',
        //                         'current' => $current_page,
        //                         'total' => $total_pages,
        //                         'prev_text' => '&#129120;',
        //                         'next_text' => '&#129122;',
        //                     )
        //                 );
                    
        //                 // Wrap each anchor tag in a <div class="page-item">
        //                 $paginate_links = preg_replace('/<a/', '<div class="page-item"><a', $paginate_links);
        //                 $paginate_links = preg_replace('/<\/a>/', '</a></div>', $paginate_links);
                    
        //                 echo $paginate_links;
        //                 echo '</div></div>';
        //             }
                
        
        echo '</div>';
    }

    $html_to_return = ob_get_clean(); // Get the buffered content and clean the buffer
    return $html_to_return;
}
add_shortcode('Lista_Ekspertw_shortcode', 'Lista_Ekspertw_function');








/**
 * 
 * API endpoint for get_news_shortcode
 */
function Lista_Ekspertw_from_custom_post_type_handler($request) {
    $params = $request->get_params();
    $content = do_shortcode("[Lista_Ekspertw_shortcode post_type='{$params['postType']}']");

    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/Lista-Ekspertw-from-custom-post-type', array(
        'methods' => 'POST',
        'callback' => 'Lista_Ekspertw_from_custom_post_type_handler',
    ));
});
// end api endpoint




function welcome_user_Zespo($atts) {
    $atts = shortcode_atts(
        array(
            'post_type' => 'post',
            'posts_per_page' => 6,
            'category' => '', // Default to no category filter
        ),
        $atts
    );

    $post_type = sanitize_text_field($atts['post_type']);
    $posts_per_page = intval($atts['posts_per_page']);
    $category = intval($atts['category']);

    $args = array(
        'post_type' => $post_type,
        'posts_per_page' => $posts_per_page,
        'cat' => $category,
    );
   
    $parent_id = wp_get_post_parent_id(get_the_ID());
    $current_page = get_query_var('paged') ? get_query_var('paged') : 1;

    $custom_query = new WP_Query($args);

    ob_start();
    ?>

    <div class="list-expert-wrap articles-wrap">
        <div class="row">

    <?php
    if ($custom_query->have_posts()) {
        while ($custom_query->have_posts()) {
            $custom_query->the_post();
            ?>
            <div class="col-lg-4 col-md-6 list-expert-col category-1">
                <a href="<?php echo get_the_permalink() . '?parent_id=' . $parent_id; ?>">
                    <div class="article-card card-style-3">
                        <div class="article-featured-img">
                            <?php the_post_thumbnail('large', array('alt' => get_the_title())); ?>
                        </div>
                        <div class="article-content">
                        <?php
                        //  $taxonomies = get_object_taxonomies($post_type);
                        // foreach ($taxonomies as $taxonomy) {
                        //     $terms = get_terms(array(
                        //         'taxonomy' => $taxonomy,
                        //         'hide_empty' => false,
                        //     ));
                    
                        //     if (!empty($terms)) {
                        //         foreach ($terms as $term) {
                        //             echo '<div class="expert-category">' . esc_html($term->name) . '</div>';
                        //         }
                        //     }
                        // }
                        ?>
                        <h3><?php the_title(); ?></h3>
                    </div>

                    </div>
                </a>
            </div>
            <?php
        }
    } else {
        echo __('No posts found.', 'cwb');
    }
    ?>

        </div>

    <?php
    $total_pages = $custom_query->max_num_pages;

    if ($total_pages > 1) {
        echo '<div class="pagination-wrap">';
        echo '<div class="pagination-inner justify-content-center" role="navigation>';

        
        
        echo paginate_links(
            array(
                'base' => get_pagenum_link(1) . '%_%',
                'format' => '?paged=%#%',
                'current' => $current_page,
                'total' => $total_pages,
                'prev_text' => '&#129120;',
                'next_text' => '&#129122;',
                'before_page_number' => '<span class="paginationstyle" >',
		        'after_page_number'  => '</span>',
            ));
        echo '</div></div>';
    }

    wp_reset_postdata();
    ?>

    </div>

    <?php
    $html_to_return = ob_get_clean();

    return $html_to_return;
}

add_shortcode('display_publications_Team', 'welcome_user_Zespo');





/**
 * 
 * API endpoint for get_news_shortcode
  */
function publications_Team_type_handler($request) {
    $params = $request->get_params();
    $content = do_shortcode("[display_publications_Team post_type='{$params['postType']}' posts_per_page='{$params['postperpage']}' category='{$params['selectedCategory']}']");
    

    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/publications-Team-post-type', array(
        'methods' => 'POST',
        'callback' => 'publications_Team_type_handler',
    ));
});
// end api endpoint









function get_news_from_custom_post_type($atts){
    $atts = shortcode_atts(
		array(
			'post_type' => 'post',
			'posts_per_page' => 6,
		),
		$atts
	);
    $search_query           =   isset($_GET['title']) ? sanitize_text_field($_GET['title']) : '';
    // $sort_query             = isset($_GET['sort'])? sanitize_text_field($_GET['sort']): '';
    $selected_year          =   isset($_GET['publication-year']) ? sanitize_text_field($_GET['publication-year']) : '';
    ob_start(); ?>
    <div class="web-form-wrap filter-form-sec light-bg">
        <div class="web-form">
            <form class="form-inline">
                <div class="row">
                    <div class="col-xl-8 col-lg-7">
                        <div class="row">
                            <div class="col-xl-8 col-lg-7">
                                <div class="form-group">
                                    <label for="search-input"><?php _e('Wyszukiwarka' , 'cwb') ?></label>
                                    <input type="text" name="title" class="form-control" id="search-input" placeholder="<?php _e('Wpisz szukaną frazę...' , 'cwb') ?>">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-5">
                                <div class="form-group" id="datepicker">
                                    <label for="date"><?php _e('Data szkolenia' , 'cwb') ?></label>
                                    <input type="text" name="publication-year" class="form-control date-picker" id="date" placeholder="<?php _e('Wybierz zakres dat' , 'cwb') ?>">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-5">
                        <div class="row">
                            <div class="col-xl-7 col-lg-7">
                                <div class="form-group">
                                    <label for="sorting"><?php _e('Sortowanie' , 'cwb') ?></label>
                                    <select class="form-control" id="custom-js-filter" name="sort">
                                        <option value="desc" <?php if (isset($_GET['sort']) && $_GET['sort'] === 'desc')
                                            echo 'selected'; ?>><?php _e('Od najnowszych', 'cwb') ?></option>
                                        <option value="asc" <?php if (isset($_GET['sort']) && $_GET['sort'] === 'asc')
                                            echo 'selected'; ?>><?php _e('Od najstarszych', 'cwb') ?></option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-5 col-lg-5">
                                <div class="web-btn form-btn">
                                    <button type="submit" class="btn btn-primary"><?php _e('szukaj' , 'cwb') ?></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
	<div class="news-articles-wrap articles-wrap">
			<div class="row">
                <?php $post_type        = $atts['post_type'];
				$posts_per_page         = $atts['posts_per_page'];
				$sort_order             = isset($_GET['sort']) ? $_GET['sort'] : 'desc';
				$current_page           = get_query_var('paged') ? get_query_var('paged') : 1;
				$args = array(
					'post_type'         => $post_type,
					'posts_per_page'    => $posts_per_page,
					'order'             => $sort_order,
					'paged'             => $current_page,
				);
				if (!empty($search_query)) {
					$args['s'] = $search_query;
				}
                if ($selected_year != '') {
					$args['meta_query'] = array(
						array(
							'key' => 'data_od',
							'value' => $selected_year,
							'compare' => 'LIKE',
						),
					);
				}
               
				
				// var_dump($args);
				$custom_query = new WP_Query($args);
				if ($custom_query->have_posts()) {
					while ($custom_query->have_posts()) {
						$custom_query->the_post(); ?>
                    <div class="col-lg-4 col-md-6">
						<div class="article-card card-style-3">
				    		<div class="article-featured-img">
                            <?php the_post_thumbnail('large', array('alt' => get_the_title())); ?>
				    		</div>
				    		<div class="article-content">
                            <div class="date-sec"><span><?php echo get_the_time('d.m.Y'); ?></span></div>
                                <h3><?php the_title(); ?></h3>
				    			<div class="web-btn">
                                <a href="<?php the_permalink(); ?>" class="btn btn-primary"><span class="visually-hidden"><?php the_title(); ?></span>czytaj</a>
				    			</div>
				    		</div>
				    	</div>
					</div>  
                <?php }
                $total_pages = $custom_query->max_num_pages;
                }
                else {
					_e('No posts found.' , 'cwb');
				}
				wp_reset_postdata();
                ?>
                <?php 
                    if ($total_pages > 1) {
                        echo '<div class="pagination-wrap"><div class="pagination-inner justify-content-center" role="navigation">';
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
		</div>
	
    <?php $html_to_return = ob_get_clean();
    return $html_to_return;
}
add_shortcode('get_news_from_custom_post_type', 'get_news_from_custom_post_type');
/**
 * 
 * API endpoint for get_news_shortcode
 */
function get_news_from_custom_post_type_handler($request) {
    $params = $request->get_params();
    $content = do_shortcode("[get_news_from_custom_post_type post_type='{$params['postType']}' posts_per_page='{$params['postperpage']}' category='{$params['selectedCategory']}' ]");
    
    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/get-news-from-custom-post-type', array(
        'methods' => 'POST',
        'callback' => 'get_news_from_custom_post_type_handler',
    ));
});


function mapshortcode($atts)
{
    $atts = shortcode_atts(
        array(
           
            'categoriesslug' => '',
        ),
        $atts
    );
    ob_start();
    $category_id    = $atts['categoriesslug'];

    $locations = get_terms(array(
        'taxonomy' => 'location',
        'hide_empty' => false,
    ));

    $search_query           =   isset($_GET['title']) ? sanitize_text_field($_GET['title']) : '';
    
    $selected_location          =   isset($_GET['locati']) ? sanitize_text_field($_GET['locati']) : '';
    ob_start(); ?>
    <div class="web-form-wrap filter-form-sec light-bg">
        <div class="web-form">
            <form class="form-inline">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label for="Województwo"><?php _e('Województwo' , 'cwb') ?></label>
                            <select class="form-select" id="Województwo" name="locati">
                                <option selected  value=""><?php _e('Wybierz' , 'cwb') ?></option>
                                <?php
                                foreach ($locations as $location) {
                                    $getname = $location->name;
                                    $getslug = $location->slug;
                                    echo '<option value="' . htmlspecialchars($getslug) . '"';
                                    if (isset($_GET['locati']) && $_GET['locati'] === $getslug) {
                                        echo ' selected';
                                    }
                                    echo '>' . htmlspecialchars($getname) . '</option>';
                                }
                                ?>
                            </select>

                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="wyszukiwarka"> <?php _e('Wyszukiwarka' , 'cwb') ?></label>
                            <input type="text" class="form-control" name="title" id="wyszukiwarka" value="<?php echo  (isset($_GET['title']) ? $_GET['title'] : '');?>" placeholder="<?php _e('Wpisz szukaną frazę...' , 'cwb') ?>">
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="web-btn form-btn">
                            <button type="submit" class="btn btn-primary"><?php _e('szukaj' , 'cwb') ?></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  <?php  
    $taxonomy_counts = array();
    $parent_id = wp_get_post_parent_id(get_the_ID());
   
    foreach ($locations as $location) {
        
        $query_args = array(
            'post_type' => 'mapa',
            'tax_query' => array(
                'relation' => 'AND',
                array(
                    'taxonomy' => 'location',
                    'field' => 'slug',
                    'terms' => $location->slug,
                ),
                array(
                    'taxonomy' => 'mapaes',
                    'field' => 'id',
                    'terms' => $category_id,
                ),
            ),
        );

        $location_query = new WP_Query($query_args);
        
        $taxonomy_counts[$location->term_id] = $location_query->found_posts;
    }

    if (!empty($search_query) || !empty($selected_location)) {
        ?>
        <div class="data-table-block">
                <?php 
				$args = array(
                    'post_type' => 'mapa',
                     'tax_query' => array(
                        array(
                            'taxonomy' => 'mapaes',
                            'field' => 'id',
                            'terms' => $category_id,
                        ),
                    ),
                );
               
                if (!empty($search_query)) {
                    $args['s'] = $search_query;
                }
            
                if (!empty($selected_location)) {
                    $args['tax_query'] = array(
                        array(
                            'taxonomy' => 'location',
                            'field' => 'slug',
                            'terms' => $selected_location,
                        ),
                    );
                }
                $parent_id = wp_get_post_parent_id(get_the_ID());
                $location_query = new WP_Query($query_args);
				// var_dump($args);
				$custom_query = new WP_Query($args);
                // var_dump($custom_query);
				if ($custom_query->have_posts()) {
                    ?>
                    <table class="table data-table" id="map-table-posts">
                    <thead>
                        <tr class="d-none d-lg-table-row">
                            <th><?php _e('Nazwa projektu' , 'cwb') ?></th>
                            <th><?php _e('Województwo' , 'cwb') ?></th>
                           
                            <th><span class="screen-reader-text">empty</span></th>
                        </tr>
                    </thead>
                    <tbody> 
                        <?php
					while ($custom_query->have_posts()) {
						$custom_query->the_post(); 
                        $terms = get_the_terms(get_the_ID(), 'location');

                            // Check if terms are retrieved and not a WP_Error
                            if ($terms && !is_wp_error($terms)) {
                                // Extract and join term names with a comma
                                $term_names = join(', ', wp_list_pluck($terms, 'name'));
                            } else {
                                $term_names = '';
                            }
                        ?>
                           
                        <tr>
                           <td aria-label="Nazwa projektu"><?php the_title(); ?></td>
                            <td aria-label="Województwo"><?php echo $term_names; ?></td>
                            
                            <td aria-label=""><a href="<?php the_permalink(); ?>" class="text-uppercase"><?php _e('CZYTAJ WIĘCEJ' , 'cwb') ?></a></td>
                        </tr>
                    
                <?php }
                ?>
                       </tbody>
                   </table>
                
            <?php
                }
                else {
					_e('Niczego nie znaleziono.' , 'cwb');
				}
				wp_reset_postdata();
                ?>
    </div>  
    <?php  
    } else {
        ?>
        <div class="tab-block-sec"> 
    
    <div class="svg-map-sec">
    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-category="<?php echo $atts['categoriesslug']; ?>" data-parentid="<?php echo $parent_id ?>" width="12in" height="11in" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 12000 11000" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
            <font id="FontID0" horiz-adv-x="722" font-variant="normal" style="fill-rule:nonzero" font-style="normal" font-weight="700">
                    <font-face 
                    font-family="Arial">
                    <font-face-src>
                        <font-face-name name="Arial Bold"/>
                    </font-face-src>
                </font-face>
                <missing-glyph><path d="M0 0z"/></missing-glyph>
                <glyph unicode="1" horiz-adv-x="556" d="M392.997 0l-136.989 0 0 518.338c-50.0026,-47.0048 -109.016,-81.8302 -177.005,-104.339l0 124.998c35.836,11.6656 74.6698,33.8318 116.501,66.6701 42.0028,32.667 70.6614,70.8327 86.3354,114.326l111.157 0 0 -719.992z"/>
                <glyph unicode="2" horiz-adv-x="556" d="M506.004 127.002l0 -127.002 -481.011 0c5.17327,48.341 20.8473,93.9925 46.8335,137.16 26.0034,43.1677 77.5134,100.502 154.17,172.003 61.8394,57.6768 99.6625,96.8361 113.675,117.341 18.8259,28.3331 28.3331,56.3236 28.3331,84.1599 0,30.6628 -8.17103,54.1652 -24.6672,70.6614 -16.3421,16.5134 -39.0051,24.6672 -67.8349,24.6672 -28.6757,0 -51.3387,-8.65067 -68.3317,-25.9863 -16.8388,-17.1643 -26.5002,-45.84 -29.1724,-86.0099l-137.006 13.6698c8.17103,75.6634 33.6776,130 76.674,163.009 42.9964,32.8211 96.6648,49.3174 161.159,49.3174 70.6785,0 126.18,-19.1514 166.675,-57.3342 40.3241,-38.1657 60.5033,-85.6502 60.5033,-142.488 0,-32.3415 -5.84134,-63.0043 -17.3356,-92.3309 -11.4943,-29.1724 -29.8405,-59.681 -55.0045,-91.6799 -16.4962,-21.3269 -46.6622,-51.8184 -90.0012,-91.6628 -43.4932,-39.8273 -71.004,-66.1562 -82.4982,-79.3292 -11.6656,-13.0017 -21.0014,-25.8321 -28.1618,-38.1657l273.001 0z"/>
            </font>
            <!-- <style type="text/css">
                <![CDATA[
                    @font-face { font-family:"Arial";font-variant:normal;font-style:normal;font-weight:bold;src:url("#FontID0") format(svg)}
                    .str0 {stroke:white;stroke-width:10.42;stroke-linejoin:round;stroke-miterlimit:2.61313}
                    .fil3 {fill:#FEFEFE}
                    .fil0 {fill:#EEF3FF;fill-rule:nonzero}
                    .fil1 {fill:#003399;fill-rule:nonzero;fill-opacity:0.400000}
                    .fil2 {fill:#003399;fill-rule:nonzero;fill-opacity:0.800000}
                    .fnt0 {font-weight:bold;font-size:229.83px;font-family:'Arial'}
                    ]]>
            </style> -->
            <style type="text/css">
                    @font-face {
                    font-family: 'CustomFont';
                    src: url('path-to-your-font.woff') format('woff');
                    }
                    .str0 { stroke: white; stroke-width: 10.42; stroke-linejoin: round; stroke-miterlimit: 2.61313; }
                    .fil3 { fill: #FEFEFE; }
                    .fil0 { fill: #EEF3FF; fill-rule: nonzero; }
                    .fil1 { fill: #003399; fill-rule: nonzero; fill-opacity: 0.4; }
                    .fil2 { fill: #003399; fill-rule: nonzero; fill-opacity: 0.8; }
                    .fnt0 {font-weight:bold;font-size:229.83px;font-family:'Arial'}
            </style>
            </defs>
            <g id="Layer_x0020_1">
                
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="bottom" id="44">
                    <polygon class="fil0 str0" points="4888.61,446.21 3743.08,868.76 3905.56,2558.94 4352.41,2782.17 4961.74,2351.65 6147.89,2630.69 6480.98,2152.33 6229.13,1849.38 6757.21,1107.93 5717.3,1251.44 5441.07,781.06 5952.9,677.41 "/>
                    <path class="fil1" d="M5101.85 1612.88c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M5049.77 1612.88c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['44']){ ?>
                    <text x="4840" y="1680" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['44']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="bottom" id="45">
                    <polygon class="fil0 str0" points="9772.15,1299.79 6758,1123.29 6230.54,1839.15 6475.43,2140.56 6153.93,2624.45 6719.88,3232.64 7472.87,3160.99 8795.96,2759.87 9538.19,2126.09 9304.22,1548.48 "/>
                    <path class="fil1" d="M7893.52 2185.79c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M7841.43 2185.79c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['45']){ ?>
                    <text x="7630" y="2250" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['45']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="left" id="46">
                    <path class="fil0 str0" d="M10016.57 1162.07c-88.51,43.39 -226.37,131.87 -264.05,150.7l-452.13 244.9 233.41 556.16 -724.16 650.78 -262.78 74.07 226.06 565.15 511.44 296.28 249.44 756.53 603.47 284.72 764.39 -667.05 -434.49 -2171.98 -450.59 -740.26z"/>
                    <path class="fil1" d="M9893.52 2977.46c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M9841.43 2977.46c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['46']){ ?>
                    <text x="9630" y="3040" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['46']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="left" id="47">
                    <polygon class="fil0 str0" points="6267.4,4598.21 6713.93,3242.57 7485.2,3170.39 8548.74,2857.54 8776.07,3403.01 9303.78,3707.82 9545.28,4458.81 10129.28,4741.39 8865.37,5223.88 8776.07,6587.54 8061.62,6587.54 7387.78,6282.73 7647.57,5641.01 7249.76,5023.35 "/>
                    <path class="fil1" d="M7976.85 4550.38c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M7924.76 4550.38c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['47']){ ?>
                    <text x="7710" y="4610" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['47']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="left top" id="48">
                    <path class="fil0 str0" d="M10129.26 4722.53c-402.43,159.46 -1201.41,500.43 -1240.3,513.4l-97.23 1378.3 48.61 664.83 510.46 105.39 413.23 486.46 542.87 -113.5 316 186.47 324.09 -186.47 105.33 -640.51 -429.43 -770.23 48.61 -1248.57 -542.26 -375.58z"/>
                    <path class="fil1" d="M10133.1 6373.29c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M10081.02 6373.29c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['48']){ ?>
                    <text x="9870" y="6440" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['48']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="left top" id="145">
                    <polygon class="fil0 str0" points="8977.89,9464.35 8484.83,9303.69 8245.4,8678.62 8245.4,7812.06 8829.4,7265.75 9356.87,7378.78 9771.31,7868.57 10317.63,7755.54 10619.05,7943.93 9653.85,9159.09 9828.81,9978.48 9033.56,9673.22 "/>
                    <path class="fil1" d="M9445.6 8383.7c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M9393.52 8383.7c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['145']){ ?>
                    <text x="9180" y="8460" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['145']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="top" id="49">
                    <polygon class="fil0 str0" points="6775.7,9627.89 6403.06,9046.84 6079,8555.81 6322.04,8040.23 6964.41,7661.29 7265.83,7830.84 7610.12,8122.06 8250.12,7794.7 8250.12,8686.75 8452.64,9300.54 7950.37,9496.96 7666.83,9357.83 7067.35,9677 "/>
                    <path class="fil1" d="M7445.6 8623.29c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M7393.52 8623.29c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['49']){ ?>
                    <text x="7180" y="8690" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['49']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="left top" id="50">
                    <polygon class="fil0 str0" points="8074.76,6591 7409.33,6286.05 6719.55,7101.99 6963,7670.67 7271.37,7827.27 7628.43,8132.22 8253.28,7819.03 8829.45,7283.31 8764.52,6591 "/>
                    <path class="fil1" d="M8028.93 7269.12c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M7976.85 7269.12c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['50']){ ?>
                    <text x="7760" y="7330" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['50']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="right top" id="51">
                    <polygon class="fil0 str0" points="6286.22,4609.5 6022.48,4741.37 5099.41,6633.24 6040.96,6842 6706.54,7115 7380.24,6320.08 7642.59,5645.61 7246.97,5023.94 "/>
                    <path class="fil1" d="M6653.93 5925.37c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M6601.85 5925.37c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['51']){ ?>
                    <text x="6380" y="5990" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['51']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="top" id="52">
                    <polygon class="fil0 str0" points="6022.48,6832.48 5645.72,6757.12 5436.49,7435.41 5346.46,8140.65 4986.37,8375.74 5223.7,8505.43 5698.37,8910.75 6050.28,9413.33 6418.09,9055.41 6091.19,8562.17 6323.9,8038.13 6964.4,7661.36 6719.5,7115.05 "/>
                    <path class="fil1" d="M6331.02 7623.29c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M6278.93 7623.29c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['52']){ ?>
                    <text x="6060" y="7690" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['52']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="right bottom" id="53">
                    <polygon class="fil0" points="4962.07,2355.23 4362.33,2783.88 4501.02,4100.9 6043.28,4720.39 6254.46,4610.57 6710.6,3233.72 6153.1,2633.98 "/>
                    <path class="fil1" d="M5747.69 3435.79c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M5695.6 3435.79c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['53']){ ?>
                    <text x="5480" y="3500" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['53']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="right top" id="54">
                    <polygon class="fil0 str0" points="4490.24,4115.59 4345.85,2782.18 3912.57,2574.95 3012.25,3560.02 2801.1,4783.91 3337.08,5564.93 3938.02,5959.48 4458.88,5928.19 4647.27,6625.2 5099.38,6625.2 6041.31,4727.54 "/>
                    <path class="fil1" d="M4341.43 4717.04c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M4289.35 4717.04c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['54']){ ?>
                    <text x="4070" y="4790" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['54']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="top" id="55">
                    <polygon class="fil0 str0" points="5099.39,6625.25 4628.44,6625.25 3837.23,7755.55 4261.13,7934.63 4536.8,7934.63 4536.8,8227.41 4854.24,8471.41 5355.46,8154.23 5438.49,7435.29 5645.7,6757.11 "/>
                    <path class="fil1" d="M5008.1 7300.37c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M4956.02 7300.37c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['55']){ ?>
                    <text x="4730" y="7360" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['55']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="top" id="56">
                    <polygon class="fil0 str0" points="1783.87,7036.61 1929.06,6181.25 2646.93,5928.7 2921.17,5611 3332.55,5570.27 3913.3,5969.44 4461.79,5928.7 4647.31,6596.7 3840.7,7753.49 3961.7,8079.34 3582.59,8283 3227.69,7834.94 3332.55,7435.78 3026.04,7435.78 2396.89,7166.96 2211.37,6889.98 "/>
                    <path class="fil1" d="M3633.1 6675.37c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M3581.02 6675.37c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['56']){ ?>
                    <text x="3370" y="6750" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['56']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" aria-label="Clickable Element" data-position="right" id="57">
                    <polygon class="fil0 str0" points="1664.8,5144.39 1520.13,4267.19 2991.03,3573.41 2790.08,4777.56 3328.61,5559.06 2910.65,5598.93 2637.37,5917.91 1913.97,6173.1 1616.58,5957.79 "/>
                    <path class="fil1" d="M2581.02 4623.29c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <path class="fil2" d="M2528.94 4623.29c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <?php if($taxonomy_counts['57']){ ?>
                    <text x="2320" y="4690" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['57']; ?></text>
                    <?php } ?>
                </g>
                <g tabindex="0" role="button" data-position="right" aria-label="Clickable Element" id="58">
                    <polygon class="fil0 str0" points="3081.76,1386.76 1206.04,2050.38 1441.52,3086.26 1068,3636.57 1520.12,4270.47 2992.43,3563.74 3893.76,2600.69 3723.24,860.72 "/>
                    <path class="fil2" d="M2872.69 2529.54c0,-109.31 -88.61,-197.92 -197.92,-197.92 -109.31,0 -197.92,88.61 -197.92,197.92 0,109.31 88.61,197.92 197.92,197.92 109.31,0 197.92,-88.61 197.92,-197.92z"/>
                    <path class="fil1" d="M2924.77 2529.54c0,-138.07 -111.93,-250 -250,-250 -138.07,0 -250,111.93 -250,250 0,138.07 111.93,250 250,250 138.07,0 250,-111.93 250,-250z"/>
                    <?php if($taxonomy_counts['58']){ ?>
                    <text x="2670" y="2580" text-anchor="middle" class="fil3 fnt0"><?php echo $taxonomy_counts['58']; ?></text>
                    <?php } ?>
                </g>
            </g>
        </svg>
        <div class="map-articles-wrap" tabindex="0">
            <div class="web-heading heading-divider" id="heading-title">
                <h2>Heading</h2>
            </div>
            <div class="map-article-list" id="arcticals">
                
                <ul>

                </ul>
            </div>
            <div class="pagination-wrap">
                <div class="pagination-inner" role="navigation">
                    
                </div>
            </div>
        </div>
    </div>
</div>
<div class="data-table-block">
                <?php 
				$args = array(
                    'post_type' => 'mapa',
                    'posts_per_page' => -1,
                     'tax_query' => array(
                        array(
                            'taxonomy' => 'mapaes',
                            'field' => 'id',
                            'terms' => $category_id,
                        ),
                    ),
                );
               
                $parent_id = wp_get_post_parent_id(get_the_ID());
                
				// var_dump($args);
				$custom_query = new WP_Query($args);
                // var_dump($custom_query);
				if ($custom_query->have_posts()) {
                   
                    ?>
                    
                    <table class="table data-table" id="map-table-posts">
                    <thead>
                        <tr class="d-none d-lg-table-row">
                            <th><?php _e('Nazwa projektu' , 'cwb') ?></th>
                            <th><?php _e('Województwo' , 'cwb') ?></th>
                            
                            <th><span class="screen-reader-text">empty</span></th>
                        </tr>
                    </thead>
                    <tbody> 
                        <?php
					while ($custom_query->have_posts()) {
						$custom_query->the_post(); 
                        $terms = get_the_terms(get_the_ID(), 'location');

                        // Check if terms are retrieved and not a WP_Error
                        if ($terms && !is_wp_error($terms)) {
                            // Extract and join term names with a comma
                            $term_names = join(', ', wp_list_pluck($terms, 'name'));
                        } else {
                            $term_names = '';
                        }
                        ?>
                           
                        <tr>
                            <td data-label="Nazwa projektu"><?php the_title(); ?></td>
                            <td data-label="Województwo"><?php echo $term_names; ?></td>
                            
                            <td data-label=""><a href="<?php the_permalink(); ?>" class="text-uppercase"><?php _e('CZYTAJ WIĘCEJ' , 'cwb') ?></a></td>
                        </tr>
                    
                <?php }
                ?>
                       </tbody>
                   </table>
                
            <?php
                }
                else {
					_e('Niczego nie znaleziono.' , 'cwb');
				}
				wp_reset_postdata();
                ?>
    </div>  
<?php
                    }  
    
    ?>
           
    <?php
    $html_to_return = ob_get_clean();
    return $html_to_return;
}

add_shortcode('mapashort_stylethree', 'mapshortcode');
				

/**
 * 
 * API endpoint for get_news_shortcode
 */
function mapashort_stylethree_post_type_handler($request) {
    $params = $request->get_params();
    $content = do_shortcode("[mapashort_stylethree categoriesslug='{$params['selectedCategory']}' ]");
    
    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/mapashort_stylethree-post-type', array(
        'methods' => 'POST',
        'callback' => 'mapashort_stylethree_post_type_handler',
    ));
});
function harmongram_function($atts){
    ob_start(); // Start output buffering
    
    $atts = shortcode_atts(
        array(
            'post_type' => 'post',
            'categories' => '',
        ),
        $atts
    );
    
    $post_type = $atts['post_type'];
    $categories = $atts['categories'];

    // $search_query           =   isset($_GET['title']) ? sanitize_text_field($_GET['title']) : '';
        ?>
       <div class="data-table-block">
            <table class="table data-table" id="schedule-posts">
                <thead>
                    <tr class="d-none d-lg-table-row">
                        <th>Priorytet</th>
                        <th>Działanie</th>
                        <th>Typy projektów</th>
                        <th>Instytucja przyjmująca wnioski o dofinansowanie</th>
                    </tr>
                    <tr class="custom-filter-fields">
                        <th data-label="Priorytet">Priorytet</th>
                        <th data-label="Działanie">Działanie</th>
                        <th data-label="Typy projektów">Typy projektów</th>
                        <th data-label="Instytucja przyjmująca wnioski o dofinansowanie">Instytucja przyjmująca wnioski o dofinansowanie</th>
                    </tr>
                </thead>
                <tbody>
                                
<?php
  
        // Set up query args for the specific month
        $current_page = get_query_var('paged') ? get_query_var('paged') : 1;
        $args = array(
            
            'post_type' => $post_type,
            // 'terms' => $categories,
            'tax_query'      => array(
                'relation'     => 'AND', // Add this relation parameter
            ),
        );
         if(!empty($categories)){
            $args['tax_query'][] = array(
                'taxonomy' => 'harmonogramec',
                'field' => 'id',
                'terms' => $categories,
            );
         }

        
       if (!empty($search_query)) {
            $args['s'] = $search_query;
        }

        if (!empty($program)) {
            $args['tax_query'][] = array(
                'key' => 'selected_post_time',
                'value' => $program,
                'type' => 'TEXT',
            );
        }
        if (!empty($date)) {
            $args['tax_query'][] = array(
                'key' => 'selected_post_time',
                'value' => $date,
                'type' => 'DATE',
                'compare' => 'LIKE',
            );
        }

        if (!empty($recruitment)) {
            $args['tax_query'][] = array(
                'key' => 'selected_post_time',
                'value' => $recruitment,
                'type' => 'TEXT',
            );
        }

        // Create a WP_Query for the specific month
        $custom_query = new WP_Query($args);

        // Check if there are posts for this month
        if ($custom_query->have_posts()) {
            while ($custom_query->have_posts()) {
                $custom_query->the_post();
                ?>
                <tr>
                    <td data-label="Cel polityki lub cel szczegółowy"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></td>
                    <td data-label="Program"><?php echo esc_html( get_field('program') ); ?></td>
                    <td data-label="Rok"><?php echo esc_html( get_field('rok') ); ?></td>
                    <td data-label="Instytucja ogłaszająca nabór"><?php echo esc_html( get_field('instytucja_oglaszajaca') ); ?></td>
                </tr>
                <?php
            }
        }
        // Reset post data for the next month
        wp_reset_postdata();
    

    ?>
    </tbody>
  </table>
</div>
    <?php

    $html_to_return = ob_get_clean(); // Get the buffered content and clean the buffer
    return $html_to_return;
}

add_shortcode('harmongram_shortcode', 'harmongram_function');


/**
 * 
 * API endpoint for get_news_shortcode
 */
function get_harmongram_custom_post_type_handler($request) {
    $params = $request->get_params();
    $content = do_shortcode("[harmongram_shortcode post_type='{$params['postType']}' posts_per_page='{$params['selectedCategory']}' ]");

    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/get-harmongram-custom-post-type', array(
        'methods' => 'POST',
        'callback' => 'get_harmongram_custom_post_type_handler',
    ));
});
// end api endpoint


function shortcode_for_subscribe_to_nabory() {
    ob_start();
    ?>
    <div class="web-form-wrap">
        <div class="web-form">
            <form class="needs-validation" novalidate id="submit-subscription-for-nabory">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="institution"><?php _e('Nazwa instytucji' , 'cwb'); ?> <span class="required">*</span></label>
                            <input type="text" name="name" class="form-control" id="institution" placeholder="Wpisz" required>
                            <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group">
                        <label for="email"><?php _e( 'E-mail', 'cwb' ); ?> <span class="required">*</span></label>
                        <input type="email" name="email" class="form-control" id="email" placeholder="<?php esc_attr_e( 'Wpisz', 'cwb' ); ?>" required>
                        <div class="invalid-feedback"><?php _e( 'Please provide a valid email address!', 'cwb' ); ?></div>
                    </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="filter-option-3"><?php _e('Program' , 'cwb') ?> <span>*</span></label>
                            <select id="filter-option-3" class="vSelect2" name="program[]" multiple>
                                <?php
                                $taxonomy = 'programa-categories';
                                $tax_terms = get_terms($taxonomy, array('hide_empty' => false));
                                
                                $selectedPrograms = isset($_GET['program']) ? (is_array($_GET['program']) ? $_GET['program'] : array($_GET['program'])) : array();
                                
                                foreach ($tax_terms as $term) {
                                    echo '<option value="' . esc_attr($term->term_id) . '"';
                                    
                                    echo '>' . esc_html($term->name) . '</option>';
                                }
                                ?>
                            </select>


                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="filter-option-4"><?php _e('Działanie ' , 'cwb') ?> <span>*</span></label>
                            <select class="form-select vSelect2" id="filter-option-4" name="action_post[]" multiple>
                                <?php
                                    $taxonomy  = 'action-categories';
                                    $tax_terms = get_terms($taxonomy, array('hide_empty' => false));
                                    foreach ($tax_terms as $term) {
                                        echo '<option value="' . esc_attr($term->term_id) . '"';
                                        echo '>' . esc_html($term->name) . '</option>'; 
                                    
                                        
                                    }

                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="checkbox-1" required="">
                            <label class="form-check-label" for="checkbox-1">Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie podanym w niniejszym
                                formularzu oraz danych osobowych gromadzonych w związku z i w celu przesyłania treści, wymiany
                                informacji oraz obsługi korespondencji. <span class="required" style="">*</span>
                                <div class="extra-content" style="display: none;">
                                    <p>Zgodnie z art. 13 ust. 1 i ust. 2 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia
                                    27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
                                    osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE
                                    (ogólne rozporządzenie o ochronie danych) (Dz. Urz. UE L 119 z 04.05.2016), dalej zwanym
                                    Rozporządzeniem, informujemy, że:</p>
                                                                        <p>· Administratorem danych jest Centrum Koordynacji Projektów Środowiskowych, z siedzibą
                                    w Warszawie (01-217) przy ul. Kolejowej 5/7.</p>
                                                                        <p>· Administrator wyznaczył inspektora ochrony danych, z którym można skontaktować się
                                    poprzez e-mail: <a href="mailto:centrum@ckps.lasy.gov.pl">centrum@ckps.lasy.gov.pl</a></p>
                                                                        <p>· Dane osobowe będą przetwarzane w celu realizacji zadania zgłoszonego przez Panią/Pana w
                                    formularzu.</p>
                                                                        <p>· Dane osobowe nie będą udostępniane innym podmiotom. Dane osobowe mogą zostać
                                    ujawnione właściwym organom, upoważnionym zgodnie z obowiązującym prawem.</p>
                                                                        <p>· Dane osobowe będą przetwarzane przez okres niezbędny do realizacji celu oraz zgodnie z
                                    przepisami o narodowym zasobie archiwalnym i archiwach, w tym przez okres co najmniej 5
                                    lat od 31 grudnia roku, w którym dokonano ostatniej płatności na rzecz beneficjenta Programu
                                    z zastrzeżeniem przepisów, które mogą przewidywać dłuższy termin przeprowadzania kontroli,
                                    a ponadto przepisów dotyczących pomocy publicznej i pomocy de minimis oraz przepisów
                                    dotyczących podatku od towarów i usług.</p>
                                                                        <p>· Podanie danych osobowych jest dobrowolne, a osobie, która wyraża zgodę na przetwarzanie
                                    danych osobowych przysługuje prawo do ich dostępu, sprostowania, usunięcia, ograniczenia
                                    przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia
                                    zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego
                                    dokonano na podstawie zgody przed jej cofnięciem.</p>
                                    <p>· Wyrażenie zgody może zostać cofnięte w każdym czasie, lecz bez wpływu na zgodność
                                    z prawem przetwarzania przed ich cofnięciem; cofnięcie zgody uniemożliwi dalsze
                                    przetwarzanie danych zgodnie ze złożonym wcześniej formularzem.</p>
                                    <p>· Osobie, która wyraża zgodę na przetwarzanie danych osobowych przysługuje prawo wniesienia
                                    skargi do organu nadzorczego tj. Prezesa Urzędu Ochrony Danych Osobowych (na adres: ul.
                                    Stawki 2, 00-193 Warszawa) w sytuacji, gdy przetwarzanie danych osobowych narusza
                                    przepisy Rozporządzenia.</p>
                                    <p>· Dane osobowe nie będą podlegały zautomatyzowanemu podejmowaniu decyzji, w tym
                                    profilowaniu.</p>
                                    <p>Ponadto oświadczam, że zapoznałem/łam się z Polityką Prywatności<a href="https://www.ckps.lasy.gov.pl/polityka-prywatnosci" target="_blank" rel="noopener">(http://www.punktdlaprzyrody.lasy.gov.pl/polityka-prywatnosci)</a> i akceptuję ją. Moje dane osobowe
                                    przekazywane są przeze mnie dobrowolnie. Zostałem/łam poinformowany/na o przysługującym mi
                                    prawie dostępu do treści moich danych oraz ich poprawiania. <span class="required" style="">*</span> </p>
                                    
                                </div>
                            </label>
                        </div>
                        <div class="checkbox-toggle text-end"><a href="#">Rozwiń</a></div>
                    </div>  
                    </div>
                    <div class="col-md-12">
                        <div class="web-btn form-btn">
                            <button type="submit" class="btn btn-primary"><?php _e( 'ZAPISZ SIĘ', 'cwb' ); ?></button>
							<div class="loading-icon-container"><span class="css-loader"></span></div>
                        </div>
                    </div>
                </div>
            </form>
            <div id="success-message" style="display: none;">
                <div class="form-message d-flex align-items-center success-message">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <rect width="26" height="26" rx="13" fill="#005023"></rect>
                            <path d="M6.5 12.7L11.375 17.5L19.5 9.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <?php _e('Gratulacje!<br> zostałeś dodany do listy subskrypcji', 'cwb'); ?>
                </div>
            </div>
            <div  id="error-message" style="display: none">
                <div class="form-message d-flex align-items-center error-message">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <rect width="26" height="26" rx="13" fill="#D40000"></rect>
                            <path d="M8 18L18 8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8 8L18 18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <?php _e('Wystąpił błąd. Proszę spróbować ponownie.', 'cwb'); ?>
                </div>
            </div>
            <div  id="email-repetemessege" style="display: none">
                <div class="form-message d-flex align-items-center email-repetemessege">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <rect width="26" height="26" rx="13" fill="#D40000"></rect>
                            <path d="M8 18L18 8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8 8L18 18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <?php _e('Podany adres e-mail już występuje w bazie powiadomień', 'cwb'); ?>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}


add_shortcode('subscribe_to_nabory', 'shortcode_for_subscribe_to_nabory');

function shortcode_for_subscribe_to_szkolenia() {
    ob_start();
    ?>
    <div class="web-form-wrap">
        <div class="web-form">
            <form class="needs-validation" novalidate id="submit-subscription-for-szkolenia">
                <div class="row">
                <div class="col-md-6">
                        <div class="form-group">
                            <label for="filter-option-3"><?php _e('Nazwa instytucji' , 'cwb') ?> <span class="required">*</span></label>
                            <input type="hidden" name="post_type" value="newpost">
                           <input type="text" name="szkolen" class="form-control" id="filter-option-3" placeholder="<?php esc_attr_e( 'Wpisz', 'cwb' ); ?>" required>
                          
                        </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group">
                        <label for="email"><?php _e( 'Adres e-mail', 'cwb' ); ?> <span class="required">*</span></label>
                        <input type="email" name="emails" class="form-control" id="email" placeholder="<?php esc_attr_e( 'Wpisz', 'cwb' ); ?>" required>
                        <div class="invalid-feedback"><?php _e( 'Please provide a valid email address!', 'cwb' ); ?></div>
                    </div>
                    </div>
                    <div class="col-md-12">
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="checkbox-1" required="">
                                    <label class="form-check-label" for="checkbox-1">Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie podanym w niniejszym
                                        formularzu oraz danych osobowych gromadzonych w związku z i w celu przesyłania treści, wymiany
                                        informacji oraz obsługi korespondencji. <span class="required" style="">*</span>
                                        <div class="extra-content" style="display: none;">
                                            <p>Zgodnie z art. 13 ust. 1 i ust. 2 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia
                                            27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
                                            osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE
                                            (ogólne rozporządzenie o ochronie danych) (Dz. Urz. UE L 119 z 04.05.2016), dalej zwanym
                                            Rozporządzeniem, informujemy, że:</p>
                                                                                <p>· Administratorem danych jest Centrum Koordynacji Projektów Środowiskowych, z siedzibą
                                            w Warszawie (01-217) przy ul. Kolejowej 5/7.</p>
                                                                                <p>· Administrator wyznaczył inspektora ochrony danych, z którym można skontaktować się
                                            poprzez e-mail: <a href="mailto:centrum@ckps.lasy.gov.pl">centrum@ckps.lasy.gov.pl</a></p>
                                                                                <p>· Dane osobowe będą przetwarzane w celu realizacji zadania zgłoszonego przez Panią/Pana w
                                            formularzu.</p>
                                                                                <p>· Dane osobowe nie będą udostępniane innym podmiotom. Dane osobowe mogą zostać
                                            ujawnione właściwym organom, upoważnionym zgodnie z obowiązującym prawem.</p>
                                                                                <p>· Dane osobowe będą przetwarzane przez okres niezbędny do realizacji celu oraz zgodnie z
                                            przepisami o narodowym zasobie archiwalnym i archiwach, w tym przez okres co najmniej 5
                                            lat od 31 grudnia roku, w którym dokonano ostatniej płatności na rzecz beneficjenta Programu
                                            z zastrzeżeniem przepisów, które mogą przewidywać dłuższy termin przeprowadzania kontroli,
                                            a ponadto przepisów dotyczących pomocy publicznej i pomocy de minimis oraz przepisów
                                            dotyczących podatku od towarów i usług.</p>
                                                                                <p>· Podanie danych osobowych jest dobrowolne, a osobie, która wyraża zgodę na przetwarzanie
                                            danych osobowych przysługuje prawo do ich dostępu, sprostowania, usunięcia, ograniczenia
                                            przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia
                                            zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego
                                            dokonano na podstawie zgody przed jej cofnięciem.</p>
                                            <p>· Wyrażenie zgody może zostać cofnięte w każdym czasie, lecz bez wpływu na zgodność
                                            z prawem przetwarzania przed ich cofnięciem; cofnięcie zgody uniemożliwi dalsze
                                            przetwarzanie danych zgodnie ze złożonym wcześniej formularzem.</p>
                                            <p>· Osobie, która wyraża zgodę na przetwarzanie danych osobowych przysługuje prawo wniesienia
                                            skargi do organu nadzorczego tj. Prezesa Urzędu Ochrony Danych Osobowych (na adres: ul.
                                            Stawki 2, 00-193 Warszawa) w sytuacji, gdy przetwarzanie danych osobowych narusza
                                            przepisy Rozporządzenia.</p>
                                            <p>· Dane osobowe nie będą podlegały zautomatyzowanemu podejmowaniu decyzji, w tym
                                            profilowaniu.</p>
                                            <p>Ponadto oświadczam, że zapoznałem/łam się z Polityką Prywatności<a href="https://www.ckps.lasy.gov.pl/polityka-prywatnosci" target="_blank" rel="noopener">(http://www.punktdlaprzyrody.lasy.gov.pl/polityka-prywatnosci)</a> i akceptuję ją. Moje dane osobowe
                                            przekazywane są przeze mnie dobrowolnie. Zostałem/łam poinformowany/na o przysługującym mi
                                            prawie dostępu do treści moich danych oraz ich poprawiania. <span class="required" style="">*</span> </p>
                                            
                                        </div>
                                    </label>
                                </div>
                                <div class="checkbox-toggle text-end"><a href="#">Rozwiń</a></div>
                            </div> 
                    </div>
                    <div class="col-md-12">
                        <div class="web-btn form-btn">
                            <button type="submit" class="btn btn-primary"><?php _e( 'ZAPISZ SIĘ', 'cwb' ); ?></button>
							<div class="loading-icon-container"><span class="css-loader"></span></div>
                        </div>
                    </div>
                </div>
            </form>
            <div id="success-message" style="display: none;">
                <div class="form-message d-flex align-items-center success-message">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <rect width="26" height="26" rx="13" fill="#005023"></rect>
                            <path d="M6.5 12.7L11.375 17.5L19.5 9.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <?php _e('Dziękujemy za zapisanie się do naszego newslettera', 'cwb'); ?>
                </div>
            </div>
            <div  id="error-message" style="display: none">
                <div class="form-message d-flex align-items-center error-message">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <rect width="26" height="26" rx="13" fill="#D40000"></rect>
                            <path d="M8 18L18 8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8 8L18 18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <?php _e('Wystąpił błąd. Proszę spróbować ponownie.', 'cwb'); ?>
                </div>
            </div>
            <div  id="email-repetemessege" style="display: none">
                <div class="form-message d-flex align-items-center email-repetemessege">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <rect width="26" height="26" rx="13" fill="#D40000"></rect>
                            <path d="M8 18L18 8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8 8L18 18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <?php _e('Podany adres e-mail już występuje w bazie powiadomień', 'cwb'); ?>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}


add_shortcode('subscribe_to_szkolenia', 'shortcode_for_subscribe_to_szkolenia');



/**
 * function create_expert_booking_form( $atts){
    $atts = shortcode_atts(array(
        'show_time_fields' => 'true',
    ), $atts);
    ob_start();
    ?>
    <div class="web-form">
        <form class="needs-validation" novalidate="" id="booking-form">
            <input type="hidden" name="expert_id" value="<?php echo get_the_ID(); ?>">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name"><?php _e('Imię' , 'cwb'); ?> <span class="required">*</span></label>
                        <input type="text" class="form-control" name="u-name" id="name" placeholder="<?php _e('Wpisz swoje imię' , 'cwb'); ?>" required="">
                        <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="nazwisko"><?php _e('Nazwisko' , 'cwb'); ?> <span class="required">*</span></label>
                        <input type="text" name="nazwisko" class="form-control" id="nazwisko" placeholder="<?php _e('Wpisz swoje nazwisko' , 'cwb'); ?>" required="">
                        <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="email"><?php _e('Adres e-mail ' , 'cwb'); ?><span class="required">*</span></label>
                        <input type="email" name="u-email" class="form-control" id="email" placeholder="<?php _e('Wpisz adres e-mail' , 'cwb'); ?>" required="">
                        <div class="invalid-feedback"><?php _e('Proszę o prawidłowy adres e-mail!' , 'cwb'); ?></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="telefon"><?php _e('Telefon ' , 'cwb'); ?><span class="required">*</span></label>
                        <input type="text" name="telefon" class="form-control" id="telefon" placeholder="<?php _e('Wpisz telefon ' , 'cwb'); ?>" required="">
                        <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="telefon"><?php _e('Nazwa wnioskodawcy lub beneficjenta ' , 'cwb'); ?><span class="required">*</span></label>
                        <input type="text" name="nazwa-wnioskodawcy" class="form-control" id="nazwa-wnioskodawcy" placeholder="<?php _e('Wpisz nazwę' , 'cwb'); ?>" required="">
                        <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="form-consultation"><?php _e('Forma konsultacji' , 'cwb'); ?> <span class="required">*</span></label>
                        <select class="form-select" name="form-consultation" id="form-consultation" required="">
                            <option selected="" disabled="" value=""><?php _e('Wybierz rodzaj' , 'cwb'); ?></option>
                            <option value="<?php _e('w biurze PdP' , 'cwb'); ?>"><?php _e('w biurze PdP' , 'cwb'); ?></option>
                            <option value="<?php _e('telefoniczna' , 'cwb'); ?>"><?php _e('telefoniczna' , 'cwb'); ?></option>
                            <option value="<?php _e('e-mail' , 'cwb'); ?>"><?php _e('e-mail' , 'cwb'); ?></option>
                            <option value="<?php _e('on-line (videoczat)' , 'cwb'); ?>"><?php _e('on-line (videoczat)' , 'cwb'); ?></option>
                        </select>
                        <div class="invalid-feedback"><?php _e('Proszę wybrać Temat naboru!', 'cwb'); ?></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="topic"><?php _e('Temat / Zakres konsultacji' , 'cwb'); ?> <span class="required">*</span></label>
                        <input type="text" name="topic" class="form-control" id="topic" placeholder="<?php _e('Wpisz temat' , 'cwb'); ?>" required="">
                        <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                    <label for="dziedzina"><?php _e('Dziedzina', 'cwb'); ?> <span class="required">*</span></label>
                    <select class="form-select" name="dziedzina" id="form-consultation" required="">
                        <option selected="" disabled="" value=""><?php _e('Wybierz dziedzinę', 'cwb'); ?></option>
                        <option value="<?php _e('ochrona przyrody - ochrona in-situ lub ex-situ zagrożonych gatunków i siedlisk przyrodniczych', 'cwb'); ?>"><?php _e('ochrona przyrody - ochrona in-situ lub ex-situ zagrożonych gatunków i siedlisk przyrodniczych', 'cwb'); ?></option>
                        <option value="<?php _e('zwalczanie inwazyjnych gatunków obcych', 'cwb'); ?>"><?php _e('zwalczanie inwazyjnych gatunków obcych', 'cwb'); ?></option>
                        <option value="<?php _e('korytarze ekologiczne', 'cwb'); ?>"><?php _e('korytarze ekologiczne', 'cwb'); ?></option>
                        <option value="<?php _e('zielona i niebieska infrastruktura (miasta, tereny niezurbanizowane)', 'cwb'); ?>"><?php _e('zielona i niebieska infrastruktura (miasta, tereny niezurbanizowane)', 'cwb'); ?></option>
                        <option value="<?php _e('edukacja ekologiczna', 'cwb'); ?>"><?php _e('edukacja ekologiczna', 'cwb'); ?></option>
                        <option value="<?php _e('infrastruktura turystyczna/ukierunkowanie ruchu turystycznego', 'cwb'); ?>"><?php _e('infrastruktura turystyczna/ukierunkowanie ruchu turystycznego', 'cwb'); ?></option>
                        <option value="<?php _e('procedury obowiązujące przy realizacji inwestycji, m.in. ocena oddziaływania na środowisko', 'cwb'); ?>"><?php _e('procedury obowiązujące przy realizacji inwestycji, m.in. ocena oddziaływania na środowisko', 'cwb'); ?></option>
                        <option value="<?php _e('techniczna obsługa systemu informatycznego WOD, aplikacji SL2021, baza konkurencyjności', 'cwb'); ?>"><?php _e('techniczna obsługa systemu informatycznego WOD, aplikacji SL2021, baza konkurencyjności', 'cwb'); ?></option>
                        <option value="<?php _e('zamówienia publiczne', 'cwb'); ?>"><?php _e('zamówienia publiczne', 'cwb'); ?></option>
                        <option value="<?php _e('zasady horyzontalne Funduszy Europejskich (m.in. zasady równościowe, dostępność, zasada DSNH)', 'cwb'); ?>"><?php _e('zasady horyzontalne Funduszy Europejskich (m.in. zasady równościowe, dostępność, zasada DSNH)', 'cwb'); ?></option>
                        <option value="<?php _e('analiza finansowa projektu', 'cwb'); ?>"><?php _e('analiza finansowa projektu', 'cwb'); ?></option>
                        <option value="<?php _e('wnioskowanie i rozliczanie projektów z FE', 'cwb'); ?>"><?php _e('wnioskowanie i rozliczanie projektów z FE', 'cwb'); ?></option>
                        <option value="<?php _e('pomoc publiczna', 'cwb'); ?>"><?php _e('pomoc publiczna', 'cwb'); ?></option>
                        <option value="<?php _e('RODO', 'cwb'); ?>"><?php _e('RODO', 'cwb'); ?></option>
                        <option value="<?php _e('informacja i promocja', 'cwb'); ?>"><?php _e('informacja i promocja', 'cwb'); ?></option>
                        <option value="<?php _e('Inna', 'cwb'); ?>"><?php _e('Inna', 'cwb'); ?></option>
                    </select>
                    <div class="invalid-feedback"><?php _e('Proszę wybrać Temat naboru!', 'cwb'); ?></div>

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="ekspert"><?php _e('Ekspert', 'cwb'); ?></label>
                        <select class="form-select" name="ekspert" id="ekspert">
                            <option selected="" value=""><?php _e('Wybierz eksperta', 'cwb'); ?></option>
                            <?php
                                $posts = get_posts( 
                                    array(
                                        'post_type'=> 'listexperts',
                                        'posts_per_page'=> -1 
                                        ) 
                                    );
                                foreach ( $posts as $post ) {
                                    setup_postdata($post);
                                    echo '<option value="'.get_the_ID().'">'.get_the_title().'</option>';
                                }
                                wp_reset_postdata();
                            ?>
                        </select>
                        <div class="invalid-feedback"><?php _e('Proszę wybrać Temat naboru!', 'cwb'); ?></div>
                    </div>
                </div>
                <?php if($atts['show_time_fields'] == 'true'){ ?>
                    <div class="col-md-4">
                        <div class="form-group" id="datepicker">
                            <label for="date-picker"><?php _e('Termin konsultacji', 'cwb'); ?> <span class="required">*</span></label>
                            <input type="text" name="termin-konsultacji" class="form-control" id="date-picker" placeholder="<?php _e('Wybierz datę', 'cwb'); ?>" required="">
                            <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="time"><?php _e('Godzina Konsultacji', 'cwb'); ?> <span class="required">*</span></label>
                            <!-- <input type="time"  class="form-control" required="" id="time-field"> -->
                            <select name="godzina-konsultacji" id="time-field" class="form-select">
                                <?php
                                for ($hour = 1; $hour <= 12; $hour++) {
                                    for ($minute = 0; $minute < 60; $minute += 60) { 
                                        $time = sprintf('%02d:%02d', $hour, $minute);
                                        echo "<option value='$time AM'>$time AM</option>";
                                    }
                                }
                                for ($hour = 1; $hour <= 12; $hour++) {
                                    for ($minute = 0; $minute < 60; $minute += 60) {
                                        $time = sprintf('%02d:%02d', $hour, $minute);
                                        echo "<option value='$time PM'>$time PM</option>";
                                    }
                                }
                                ?>
                            </select>
                            <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>
                        </div>
                    </div>
                <?php } ?>

                <div class="col-md-8">
                    <div class="form-group">
                        <label for="informacje-inne"><?php _e('Informacje inne', 'cwb'); ?> <span class="required">*</span></label>
                        <input type="text" name="informacje-inne" class="form-control" id="informacje-inne" placeholder="<?php _e('Opisz', 'cwb'); ?>" required="">
                        <p><?php _e('Jeśli wymagane jest zapewnienie odpowiednich warunków osobom ze szczególnymi potrzebami, prosimy o wpisanie w pole', 'cwb'); ?> <b><?php _e('Informacje inne', 'cwb'); ?></b>.</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="checkbox-1" required="">
                            <label class="form-check-label" for="checkbox-1"><?php _e('Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie podanym w niniejszym formularzu oraz danych osobowych gromadzonych w związku z i w celu przesyłania treści, wymiany informacji oraz obsługi korespondencji.', 'cwb'); ?> <span class="required" style="">*</span>
                                <div class="extra-content" style="display: none;">
                                    <p><?php _e('Zgodnie z art. 13 ust. 1 i ust. 2 ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r. informujemy, że:', 'cwb'); ?></p>
                                    <p>· <?php _e('Administratorem danych jest Centrum Koordynacji Projektów Środowiskowych, z siedzibą w Warszawie (01-217) przy ul. Kolejowej.', 'cwb'); ?></p>
                                    <p>· <?php _e('Administrator wyznaczył inspektora ochrony danych, z którym można skontaktować się poprzez e-mail:', 'cwb'); ?> <a href="mailto:centrum@ckps.lasy.gov.pl">centrum@ckps.lasy.gov.pl</a></p>
                                    <p>· <?php _e('Dane osobowe nie będą udostępniane innym podmiotom. Dane osobowe mogą zostać ujawnione właściwym organom, upoważnionym zgodnie z obowiązującym prawem.', 'cwb'); ?></p>
                                    <p>· <?php _e('Podanie danych osobowych jest dobrowolne, a osobie, która wyraża zgodę na przetwarzanie danych osobowych przysługuje prawo do ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem.', 'cwb'); ?></p>
                                    <p>· <?php _e('Wyrażenie zgody może zostać cofnięte w każdym czasie, lecz bez wpływu na zgodność z prawem przetwarzania przed ich cofnięciem; cofnięcie zgody uniemożliwi dalsze przetwarzanie danych zgodnie ze złożonym wcześniej formularzem.', 'cwb'); ?></p>
                                    <p>· <?php _e('Osobie, która wyraża zgodę na przetwarzanie danych osobowych przysługuje prawo wniesienia skargi do organu nadzorczego w sytuacji, gdy przetwarzanie danych osobowych narusza przepisy ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r.', 'cwb'); ?></p>
                                    <p><?php _e('Zapoznałem/łam się z Polityką Prywatności', 'cwb'); ?> <a href="https://www.ckps.lasy.gov.pl/polityka-prywatnosci">(http://www.punktdlaprzyrody.lasy.gov.pl/polityka-prywatnosci)</a> <?php _e('i akceptuję ją. Moje dane osobowe przekazywane są przeze mnie dobrowolnie. Zostałem/łam poinformowany/na o przysługującym mi prawie dostępu do treści moich danych oraz ich poprawiania.', 'cwb'); ?> <span class="required" style="">*</span></p>
                                </div>
                            </label>
                        </div>
                        <div class="checkbox-toggle text-end"><a href="#"><?php _e('Rozwiń', 'cwb'); ?></a></div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="web-btn form-btn">
                        <button type="submit" class="btn btn-primary"><?php _e('ZAPISZ SIĘ', 'cwb'); ?></button>
                        <div class="loading-icon-container"><span class="css-loader"></span></div>
                    </div>
                </div>
                <div class="form-bottom-info">
                    <p><?php _e('Po odbytej konsultacji prosimy o wypełnienie ankiety.', 'cwb'); ?></p>
                </div>

            </div>
        </form>
        <div id="success-message" style="display: none;">
            <div class="form-message d-flex align-items-center success-message">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <rect width="26" height="26" rx="13" fill="#005023"></rect>
                        <path d="M6.5 12.7L11.375 17.5L19.5 9.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
                <?php _e('Gratulacje!<br> Jesteś na liście szkolenia “Wsparcie przedsiębiorstw z woj. lubelskiego w zakresie edukacji przyrodniczej', 'cwb'); ?>
            </div>
        </div>

    </div>
    <?php
    $content = ob_get_clean();
    return $content;
}
add_shortcode('expert_booking_form', 'create_expert_booking_form');
*/

function booking_form_shortcode($atts){
    $atts = shortcode_atts(array(
        'show_time_fields' => 'true',
    ), $atts);
    $returnhtml = '';
    ob_start()?>
    <div class="signup-form-wrap">
        <div class="web-form-wrap">
            <div class="web-form">
                <form class="needs-validation" novalidate="" id="booking-form">
                    <div id="ajax-loader-form">
                    <span class="css-loader" ></span>
                    </div>
                    <input type="hidden" name="expert_id" value="<?php echo get_the_ID(); ?>">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="name"><?php _e('Imię' , 'cwb'); ?> <span class="required">*</span></label>
                                <input type="text" class="form-control" name="u-name" id="name" placeholder="<?php _e('Wpisz swoje imię' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="nazwisko"><?php _e('Nazwisko' , 'cwb'); ?> <span class="required">*</span></label>
                                <input type="text" name="nazwisko" class="form-control" id="nazwisko" placeholder="<?php _e('Wpisz swoje nazwisko' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="email"><?php _e('Adres e-mail ' , 'cwb'); ?><span class="required">*</span></label>
                                <input type="email" name="u-email" class="form-control" id="email" placeholder="<?php _e('Wpisz adres e-mail' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę o prawidłowy adres e-mail!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="telefon"><?php _e('Telefon ' , 'cwb'); ?><span class="required">*</span></label>
                                <input type="number" pattern="[0-9\+\-]*" name="telefon" class="form-control" id="telefon" placeholder="<?php _e('Wpisz telefon ' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="form-consultation"><?php _e('Forma konsultacji' , 'cwb'); ?> <span class="required">*</span></label>
                                <select class="form-select" name="form-consultation" id="form-consultation" required="">
                                    <option selected="" disabled="" value=""><?php _e('Wybierz rodzaj' , 'cwb'); ?></option>
                                    
                                    <option value="<?php _e('telefoniczna' , 'cwb'); ?>"><?php _e('telefoniczna' , 'cwb'); ?></option>
                                    <option value="<?php _e('e-mail' , 'cwb'); ?>"><?php _e('e-mail' , 'cwb'); ?></option>
                                    <option value="<?php _e('on-line (videoczat)' , 'cwb'); ?>"><?php _e('on-line (videoczat)' , 'cwb'); ?></option>
                                </select>
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="topic"><?php _e('Temat / Zakres konsultacji' , 'cwb'); ?> <span class="required">*</span></label>
                                <input type="text" name="topic" class="form-control" id="topic" placeholder="<?php _e('Wpisz temat' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                            <label for="dziedzina"><?php _e('Dziedzina', 'cwb'); ?> <span class="required">*</span></label>
                            <?php
                                $terms = get_terms(array(
                                    'taxonomy'   => 'listexperts-categories',
                                    'hide_empty' => false, 
                                    'post_type'  => 'bookings_timings'
                                ));
                                $event_datetime_str = isset($_GET['datepost']) && isset($_GET['timepost']) ? $_GET['datepost'] . ' ' . $_GET['timepost'] : '';
                                $event_datetime = DateTime::createFromFormat('Y-m-d H:i:s', $event_datetime_str);
                        
                                // Get current date and time
                                $current_datetime = new DateTime('now', new DateTimeZone(wp_timezone_string()));
                        
                                if ($event_datetime && $event_datetime > $current_datetime) {
                                    $url_param_value = isset($_GET['categoriesnem']) ? sanitize_text_field($_GET['categoriesnem']) : '';
                                } else {
                                    $url_param_value = '';
                                }
                               
                                if (!empty($terms) && !is_wp_error($terms)) {
                                    echo '<select class="form-select" name="dziedzina" id="dziedzina" required="" >'; ?>
                                    <option selected=''  disabled="" value=""><?php _e('Wybierz dziedzinę' , 'cwb'); ?></option>
                                    <?php
                                    foreach ($terms as $term) {
                                        $selected = selected($url_param_value, $term->name, false); // Check if this term is selected
                                        echo '<option value="' . esc_attr($term->slug) . '" ' . $selected . '>' . esc_html($term->name) . '</option>';
                                    }

                                    echo '</select>';
                                } else {
                                }
                            ?>
                            <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>

                            </div>
                        </div>
                        <!-- <div class="col-md-6">
                            <div class="form-group">
                                <label for="ekspert"><?php _e('Ekspert', 'cwb'); ?></label>
                                <select class="form-select" name="ekspert" id="ekspert">
                                    <option selected="" value=""><?php _e('Wybierz dziedzinę, aby wybrać eksperta', 'cwb'); ?></option>
                                    <?php
                                    // $query = new WP_Query(array(
                                    //     'post_type' => 'listexperts',
                                    //     'posts_per_page' => -1,
                                    // ));
                                    // echo '<option value="' . get_the_ID() . '">' . get_the_title() . '</option>';
                                    // if ($query->have_posts()) {
                                    //     while ($query->have_posts()) {
                                    //         $query->the_post(); // You need to use the_post() to set up the post data in the loop
                                    //         echo '<option value="' . get_the_ID() . '">' . get_the_title() . '</option>';
                                    //     }
                                    //     wp_reset_postdata();
                                    // }
                                    ?>
                                </select>

                                <div class="invalid-feedback"><?php _e('Proszę wybrać Temat naboru!', 'cwb'); ?></div>
                            </div>
                        </div> -->
                        <?php if($atts['show_time_fields'] == 'true'){ ?>
                            <div class="col-md-4">
                                <div class="form-group" id="datepicker">
                                    <label for="date-picker"><?php _e('Termin konsultacji', 'cwb'); ?> <span class="required">*</span></label>
                                    <div id="input-select-consulationdate">
                                        <?php 
                                            $event_datetime_str = isset($_GET['datepost']) && isset($_GET['timepost']) ? $_GET['datepost'] . ' ' . $_GET['timepost'] : '';
                                            $event_datetime = DateTime::createFromFormat('Y-m-d H:i:s', $event_datetime_str);
                                    
                                            // Get current date and time
                                            $current_datetime = new DateTime('now', new DateTimeZone(wp_timezone_string()));
                                    
                                            if ($event_datetime && $event_datetime > $current_datetime) {
                                                $getdate = isset($_GET['datepost']) ? sanitize_text_field($_GET['datepost']) : '';
                                            } else {
                                                $getdate = '';
                                            }
                                        ?>
                                        <select name="termin-konsultacji" id="consultation-dates" class="form-select" required>
                                            <option value=""><?php _e('Termin konsultacji', 'cwb'); ?></option>
                                            <?php 
                                                // Check if $getdate is not empty
                                                if (!empty($getdate)) {
                                                    // If it's not empty, set the selected attribute for the corresponding option
                                                    echo '<option value="' . esc_attr($getdate) . '" selected>' . esc_html($getdate) . '</option>';
                                                }
                                            ?>
                                        </select>
                                    </div>
                                    <div id="input-select-date">
                                        <input type="text" name="termin-konsultacji" class="form-control" id="date-picker" placeholder="<?php _e('Wybierz datę', 'cwb'); ?>" disabled>
                                    </div>
                                    
                                    <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>
                                </div>
                            </div>


                            <div class="col-md-4">
                                <div class="form-group timeinput">
                                    <label for="time"><?php _e('Godzina Konsultacji', 'cwb'); ?> <span class="required">*</span></label>
                                    <div id='input_select_timepicker'>
                                    <?php 
                                     $event_datetime_str = isset($_GET['datepost']) && isset($_GET['timepost']) ? $_GET['datepost'] . ' ' . $_GET['timepost'] : '';
                                     $event_datetime = DateTime::createFromFormat('Y-m-d H:i:s', $event_datetime_str);
                             
                                     // Get current date and time
                                     $current_datetime = new DateTime('now', new DateTimeZone(wp_timezone_string()));
                             
                                     if ($event_datetime && $event_datetime > $current_datetime) {
                                        $gettime = isset($_GET['timepost']) ? sanitize_text_field($_GET['timepost']) : '';
                                     } else {
                                        $gettime = '';
                                     }
                                       
                                    ?>
                                    <select name="godzina-konsultacji" id="time-field" class="form-select" required=""> <?php echo '<option value="">'.__("Godzina Konsultacji", "cwb").'</option>';?>
                                       <?php 
                                            // Check if $getdate is not empty
                                            if (!empty($gettime)) {
                                                // If it's not empty, set the selected attribute for the corresponding option
                                                echo '<option value="' . esc_attr($gettime) . '" selected>' . esc_html($gettime) . '</option>';
                                            }
                                        ?>
                                    </select>
                                    </div>
                                    <div id='input_timepicker'>
                                    <input type="time" name="godzina-konsultacji"  class="form-control" disabled id="time-field"> 
                                    </div>
                                    
                                    <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>
                                </div>
                            </div>
                        <?php } ?>

                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="informacje-inne"><?php _e('Informacje inne', 'cwb'); ?> </label>
                                <input type="textarea" name="informacje-inne" class="form-control" id="informacje-inne" placeholder="<?php _e('Opisz', 'cwb'); ?>" >
                                <p><?php _e('Jeśli wymagane jest zapewnienie odpowiednich warunków osobom ze szczególnymi potrzebami, prosimy o wpisanie w pole', 'cwb'); ?> <b><?php _e('Informacje inne', 'cwb'); ?></b>.</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="checkbox-1" required="">
                                    <label class="form-check-label" for="checkbox-1"><?php _e('Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie podanym w niniejszym formularzu oraz danych osobowych gromadzonych w związku z i w celu przesyłania treści, wymiany informacji oraz obsługi korespondencji.', 'cwb'); ?> <span class="required" style="">*</span>
                                        <div class="extra-content">
                                            <p><?php _e('Zgodnie z art. 13 ust. 1 i ust. 2 ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r. informujemy, że:', 'cwb'); ?></p>
                                            <p>· <?php _e('Administratorem danych jest Centrum Koordynacji Projektów Środowiskowych, z siedzibą w Warszawie (01-217) przy ul. Kolejowej.', 'cwb'); ?></p>
                                            <p>· <?php _e('Administrator wyznaczył inspektora ochrony danych, z którym można skontaktować się poprzez e-mail:', 'cwb'); ?> <a href="mailto:centrum@ckps.lasy.gov.pl">centrum@ckps.lasy.gov.pl</a></p>
                                            <p>· <?php _e('Dane osobowe nie będą udostępniane innym podmiotom. Dane osobowe mogą zostać ujawnione właściwym organom, upoważnionym zgodnie z obowiązującym prawem.', 'cwb'); ?></p>
                                            <p>· <?php _e('Podanie danych osobowych jest dobrowolne, a osobie, która wyraża zgodę na przetwarzanie danych osobowych przysługuje prawo do ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem.', 'cwb'); ?></p>
                                            <p>· <?php _e('Wyrażenie zgody może zostać cofnięte w każdym czasie, lecz bez wpływu na zgodność z prawem przetwarzania przed ich cofnięciem; cofnięcie zgody uniemożliwi dalsze przetwarzanie danych zgodnie ze złożonym wcześniej formularzem.', 'cwb'); ?></p>
                                            <p>· <?php _e('Osobie, która wyraża zgodę na przetwarzanie danych osobowych przysługuje prawo wniesienia skargi do organu nadzorczego w sytuacji, gdy przetwarzanie danych osobowych narusza przepisy ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r.', 'cwb'); ?></p>
                                            <p><?php _e('Zapoznałem/łam się z Polityką Prywatności', 'cwb'); ?> <a href="https://www.ckps.lasy.gov.pl/polityka-prywatnosci">(http://www.punktdlaprzyrody.lasy.gov.pl/polityka-prywatnosci)</a> <?php _e('i akceptuję ją. Moje dane osobowe przekazywane są przeze mnie dobrowolnie. Zostałem/łam poinformowany/na o przysługującym mi prawie dostępu do treści moich danych oraz ich poprawiania.', 'cwb'); ?> <span class="required" style="">*</span></p>
                                        </div>
                                    </label>
                                </div>
                                <div class="checkbox-toggle text-end"><a href="#"><?php _e('Rozwiń', 'cwb'); ?></a></div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="web-btn form-btn">
                                <button type="submit" class="btn btn-primary"><?php _e('ZAPISZ SIĘ', 'cwb'); ?></button>
                                <div class="errorshow" style="display: none;"><p><?php _e('Nie można zapisać się na konsultacje w przeszłości. Wybierz przyszły termin.', 'cwb'); ?> </p> </div>
                                <div class="loading-icon-container"><span class="css-loader"></span></div>
                            </div>
                        </div>
                        <div class="form-bottom-info">
                            <p><?php _e('Po odbytej konsultacji prosimy o wypełnienie ankiety.', 'cwb'); ?></p>
                        </div>

                    </div>
                </form>
                <div id="success-message" style="display: none;">
                    <div class="form-message d-flex align-items-center success-message">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <rect width="26" height="26" rx="13" fill="#005023"></rect>
                                <path d="M6.5 12.7L11.375 17.5L19.5 9.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <?php _e('Gratulacje!<br> Zostałeś zapisany na konsultacje. Potwierdzenie zostało wysłane na Twój adres e-mail.', 'cwb'); ?>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <?php
    $returnhtml     =   ob_get_contents();
    ob_end_clean();
    return  $returnhtml;
}

add_shortcode('expert_booking_form', 'booking_form_shortcode');


function booking_form_shortcode_second($atts){
    $atts = shortcode_atts(array(
        'show_time_fields' => 'true',
    ), $atts);
    $returnhtml = '';
    ob_start()?>
    <div class="signup-form-wrap">
        <div class="web-form-wrap">
            <div class="web-form">
            
                <form  class="needs-validation" novalidate="" id="booking-form-second" enctype="multipart/form-data" >
                    <input type="hidden" name="expert_id_second" value="<?php echo get_the_ID(); ?>">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="name"><?php _e('Imię' , 'cwb'); ?> <span class="required">*</span></label>
                                <input type="text" class="form-control" name="u-name-second" id="name" placeholder="<?php _e('Wpisz swoje imię' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="nazwisko"><?php _e('Nazwisko' , 'cwb'); ?> <span class="required">*</span></label>
                                <input type="text" name="nazwisko-second" class="form-control" id="nazwisko" placeholder="<?php _e('Wpisz swoje nazwisko' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="email"><?php _e('Adres e-mail ' , 'cwb'); ?><span class="required">*</span></label>
                                <input type="email" name="u-email-second" class="form-control" id="email" placeholder="<?php _e('Wpisz adres e-mail' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę o prawidłowy adres e-mail!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="telefon"><?php _e('Telefon ' , 'cwb'); ?><span class="required">*</span></label>
                                <input type="number"  name="telefon-second" class="form-control" id="telefon" placeholder="<?php _e('Wpisz telefon ' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="wnioskodawcy"><?php _e('Nazwa wnioskodawcy lub beneficjenta  ' , 'cwb'); ?><span class="required">*</span></label>
                                <input type="text" name="wnioskodawcy-second" class="form-control" id="wnioskodawcy" placeholder="<?php _e('Wpisz nazwę ' , 'cwb'); ?>" required="">
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                            </div>
                        </div>
                        
                        <div class="col-md-12">
                            <div class="form-group">
                            <label for="topic"><?php _e('Temat/zakres wsparcia' , 'cwb'); ?> <span class="required">*</span></label>
                                <select class="form-select" name="topic-second" id="form-consultation topic" required="">
                                    <option selected="" disabled="" value=""><?php _e('Wybierz rodzaj' , 'cwb'); ?></option>
                                    <option value="<?php _e('ocena/analiza wniosku o dofinansowanie wraz z załącznikami' , 'cwb'); ?>"><?php _e('ocena/analiza wniosku o dofinansowanie wraz z załącznikami' , 'cwb'); ?></option>
                                    <option value="<?php _e('audyt przedrealizacyjny' , 'cwb'); ?>"><?php _e('audyt przedrealizacyjny' , 'cwb'); ?></option>
                                    <option value="<?php _e('audyt w trakcie realizacji projektu' , 'cwb'); ?>"><?php _e('audyt w trakcie realizacji projektu' , 'cwb'); ?></option>
                                    <option value="<?php _e('audyt na zakończenie realizacji projektu' , 'cwb'); ?>"><?php _e('audyt na zakończenie realizacji projektu' , 'cwb'); ?></option>
                                    <option value="<?php _e('wizyta doradcza w miejscu realizacji projektu/ w siedzibie beneficjenta' , 'cwb'); ?>"><?php _e('wizyta doradcza w miejscu realizacji projektu/ w siedzibie beneficjenta' , 'cwb'); ?></option>
                                    <option value="<?php _e('ocena pomysłu na projekt' , 'cwb'); ?>"><?php _e('ocena pomysłu na projekt' , 'cwb'); ?></option>
                                </select>
                                
    
                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                                <div class="formdisplay">Jeśli wybrałeś zakres wsparcia dotyczący oceny pomysłu na projekt, wypełnij  <a href="https://punktdlaprzyrody.lasy.gov.pl/znajdz-dofinsowanie/ankieta-potrzeb/" target="blank">ankietę potrzeb</a> (link otworzy się w nowym oknie)</div>
                            </div>
                        </div>
                      
                        <?php if($atts['show_time_fields'] == 'true'){ ?>
                            <div class="col-md-4">
                                <div class="form-group" id="datepicker">
                                    <label for="date-picker"><?php _e('Proponowany termin', 'cwb'); ?> <span class="required">*</span></label>
                                    <input type="text" name="termin-konsultacji-second" class="form-control" id="date-picker" placeholder="<?php _e('Wybierz datę', 'cwb'); ?>" required="">
                                    <!-- <select name="termin-konsultacji" id="consultation-dates" class="form-select">
                                        <option selected="" value="">
                                           
                                        </option>
                                    </select> -->
                                    <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>
                                </div>
                            </div>
                            
                        <?php } ?>

                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="informacje-inne"><?php _e('Inne informacje', 'cwb'); ?></label>
                                <textarea name="informacje-inne-second" class="form-control" id="informacje-inne" placeholder="<?php _e('Opisz', 'cwb'); ?>" ></textarea>
                                
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="web-btn form-btn newbutton">
                            <label for="fileInput" id="fileInputLabel">W tym miejscu możesz dodać dokumenty związane z Twoim projektem, które chcesz nam przekazać (ZIP, DOC, XLS, PDF)</label>
                                
                                <button class="btn btn-primary" type="button" style="display:block;" onclick="document.getElementById('fileInput').click()">Dodaj załączniki</button>
                                <input type='file' name="filedatat" id="fileInput" style="display:none" accept=".zip,.doc,.docx,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.pdf,application/pdf" >

                                <div id="fileInfo"></div>

                                <script>
                                document.getElementById('fileInput').addEventListener('change', function() {
                                    
                                var file = this.files[0];
                                var fileInfo = document.getElementById('fileInfo');
                                console.log(file);
                                if (file) {
                                    fileInfo.innerHTML = '<p>Nazwa pliku: ' + file.name + '</p>' 
                                    // +'<p>Rozmiar pliku: ' + formatBytes(file.size) + '</p>'
                                    ;
                                } else {
                                    fileInfo.innerHTML = ''; // Clear fileInfo if no file selected
                                }
                                });

                                // Function to format file size in human-readable format
                                function formatBytes(bytes, decimals = 2) {
                                if (bytes === 0) return '0 Bytes';
                                const k = 1024;
                                const dm = decimals < 0 ? 0 : decimals;
                                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                                const i = Math.floor(Math.log(bytes) / Math.log(k));
                                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
                                }
                                </script>
                            </div>
                        </div> 
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="checkbox-1" required="">
                                    <label class="form-check-label" for="checkbox-1">Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie podanym w niniejszym
                                        formularzu oraz danych osobowych gromadzonych w związku z i w celu przesyłania treści, wymiany
                                        informacji oraz obsługi korespondencji. <span class="required" style="">*</span>
                                        <div class="extra-content">
                                            <p>Zgodnie z art. 13 ust. 1 i ust. 2 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia
                                            27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
                                            osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE
                                            (ogólne rozporządzenie o ochronie danych) (Dz. Urz. UE L 119 z 04.05.2016), dalej zwanym
                                            Rozporządzeniem, informujemy, że:</p>
                                                                                <p>· Administratorem danych jest Centrum Koordynacji Projektów Środowiskowych, z siedzibą
                                            w Warszawie (01-217) przy ul. Kolejowej 5/7.</p>
                                                                                <p>· Administrator wyznaczył inspektora ochrony danych, z którym można skontaktować się
                                            poprzez e-mail: <a href="mailto:centrum@ckps.lasy.gov.pl">centrum@ckps.lasy.gov.pl</a></p>
                                                                                <p>· Dane osobowe będą przetwarzane w celu realizacji zadania zgłoszonego przez Panią/Pana w
                                            formularzu.</p>
                                                                                <p>· Dane osobowe nie będą udostępniane innym podmiotom. Dane osobowe mogą zostać
                                            ujawnione właściwym organom, upoważnionym zgodnie z obowiązującym prawem.</p>
                                                                                <p>· Dane osobowe będą przetwarzane przez okres niezbędny do realizacji celu oraz zgodnie z
                                            przepisami o narodowym zasobie archiwalnym i archiwach, w tym przez okres co najmniej 5
                                            lat od 31 grudnia roku, w którym dokonano ostatniej płatności na rzecz beneficjenta Programu
                                            z zastrzeżeniem przepisów, które mogą przewidywać dłuższy termin przeprowadzania kontroli,
                                            a ponadto przepisów dotyczących pomocy publicznej i pomocy de minimis oraz przepisów
                                            dotyczących podatku od towarów i usług.</p>
                                                                                <p>· Podanie danych osobowych jest dobrowolne, a osobie, która wyraża zgodę na przetwarzanie
                                            danych osobowych przysługuje prawo do ich dostępu, sprostowania, usunięcia, ograniczenia
                                            przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia
                                            zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego
                                            dokonano na podstawie zgody przed jej cofnięciem.</p>
                                            <p>· Wyrażenie zgody może zostać cofnięte w każdym czasie, lecz bez wpływu na zgodność
                                            z prawem przetwarzania przed ich cofnięciem; cofnięcie zgody uniemożliwi dalsze
                                            przetwarzanie danych zgodnie ze złożonym wcześniej formularzem.</p>
                                            <p>· Osobie, która wyraża zgodę na przetwarzanie danych osobowych przysługuje prawo wniesienia
                                            skargi do organu nadzorczego tj. Prezesa Urzędu Ochrony Danych Osobowych (na adres: ul.
                                            Stawki 2, 00-193 Warszawa) w sytuacji, gdy przetwarzanie danych osobowych narusza
                                            przepisy Rozporządzenia.</p>
                                            <p>· Dane osobowe nie będą podlegały zautomatyzowanemu podejmowaniu decyzji, w tym
                                            profilowaniu.</p>
                                            <p>Ponadto oświadczam, że zapoznałem/łam się z Polityką Prywatności<a href="https://www.ckps.lasy.gov.pl/polityka-prywatnosci" target="_blank" rel="noopener">(http://www.punktdlaprzyrody.lasy.gov.pl/polityka-prywatnosci)</a> i akceptuję ją. Moje dane osobowe
                                            przekazywane są przeze mnie dobrowolnie. Zostałem/łam poinformowany/na o przysługującym mi
                                            prawie dostępu do treści moich danych oraz ich poprawiania. <span class="required" style="">*</span> </p>
                                            
                                        </div>
                                    </label>
                                </div>
                                <div class="checkbox-toggle text-end"><a href="#">Rozwiń</a></div>
                            </div>
                        </div>
                        
                        <div class="col-md-12">
                            <div class="web-btn form-btn">
                                <button type="submit" class="btn btn-primary"><?php _e('ZAPISZ SIĘ', 'cwb'); ?></button>
                               
                                <div class="loading-icon-container"><span class="css-loader"></span></div>
                            </div>
                        </div>
                    </div>
                </form>
                <div id="success-message" style="display: none;">
                    <div class="form-message d-flex align-items-center success-message">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <rect width="26" height="26" rx="13" fill="#005023"></rect>
                                <path d="M6.5 12.7L11.375 17.5L19.5 9.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <?php _e('Gratulacje!<br> Audyt został zamówiony. Potwierdzenie zostało wysłane na Twój adres e-mail.', 'cwb'); ?>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <?php
    $returnhtml     =   ob_get_contents();
    ob_end_clean();
    return  $returnhtml;
}

add_shortcode('expert_booking_form_second', 'booking_form_shortcode_second');














































































function second_mapshortcode($atts)
{
    $atts = shortcode_atts(
        array(
            'categoriesslug' => '',
            'mapicon' => '', // Define the 'mapicon' attribute
			'upcomingcheckbox' => '',
        ),
        $atts
    );
    
    $category_id = $atts['categoriesslug'];
    // $mapicon = $atts['mapicon'];
    //  var_dump($mapicon);
    $locations = get_terms(array(
        'taxonomy' => 'location',
        'hide_empty' => false,
    ));
  
    $search_query           =   isset($_GET['title']) ? sanitize_text_field($_GET['title']) : '';
    
    $selected_location          =   isset($_GET['locati']) ? sanitize_text_field($_GET['locati']) : '';
    ob_start(); ?>
    <div class="web-form-wrap filter-form-sec light-bg">
        <?php 
        
            $mapiconsarray = explode('^', $atts['mapicon']);
            
        ?>
        <div class="web-form">
            <form class="form-inline">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label for="Województwo"><?php _e('Województwo' , 'cwb') ?></label>
                            <select class="form-select" id="Województwo" name="locati">
                                <option selected  value=""><?php _e('Wybierz' , 'cwb') ?></option>
                                <?php
                                foreach ($locations as $location) {
                                    $getname = $location->name;
                                    $getslug = $location->slug;
                                    echo '<option value="' . htmlspecialchars($getslug) . '"';
                                    if (isset($_GET['locati']) && $_GET['locati'] === $getslug) {
                                        echo ' selected';
                                    }
                                    echo '>' . htmlspecialchars($getname) . '</option>';
                                }
                                ?>
                            </select>

                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="wyszukiwarka"> <?php _e('Wyszukiwarka' , 'cwb') ?></label>
                            <input type="text" class="form-control" name="title" id="wyszukiwarka" value="<?php echo  (isset($_GET['title']) ? $_GET['title'] : '');?>" placeholder="<?php _e('Wpisz szukaną frazę...' , 'cwb') ?>">
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="web-btn form-btn">
                            <button type="submit" class="btn btn-primary"><?php _e('szukaj' , 'cwb') ?></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  <?php  
    $taxonomy_counts = array();
    $parent_id = wp_get_post_parent_id(get_the_ID());
   
    foreach ($locations as $location) {
        
        $query_args = array(
            'post_type' => 'mapa',
            'posts_per_page' => -1,
            'tax_query' => array(
                'relation' => 'AND',
                array(
                    'taxonomy' => 'location',
                    'field' => 'slug',
                    'terms' => $location->slug,
                ),
                array(
                    'taxonomy' => 'mapaes',
                    'field' => 'id',
                    'terms' => $category_id,
                ),
            ),
        );

        $location_query = new WP_Query($query_args);
        
        $taxonomy_counts[$location->term_id] = $location_query->found_posts;
    }

    if (!empty($search_query) || !empty($selected_location)) {
        ?>
        <div class="data-table-block">
                <?php 
				$args = array(
                    'post_type' => 'mapa',
                     'tax_query' => array(
                        array(
                            'taxonomy' => 'mapaes',
                            'field' => 'id',
                            'terms' => $category_id,
                        ),
                    ),
                );
               
                if (!empty($search_query)) {
                    $args['s'] = $search_query;
                }
            
                if (!empty($selected_location)) {
                    $args['tax_query'] = array(
                        array(
                            'taxonomy' => 'location',
                            'field' => 'slug',
                            'terms' => $selected_location,
                        ),
                    );
                }
                $parent_id = wp_get_post_parent_id(get_the_ID());
                $location_query = new WP_Query($query_args);
				// var_dump($args);
				$custom_query = new WP_Query($args);
                // var_dump($custom_query);
				if ($custom_query->have_posts()) {
                    ?>
                    <table class="table data-table" id="map-table-posts">
                    <thead>
                        <tr class="d-none d-lg-table-row">
                            <th><?php _e('Nazwa projektu' , 'cwb') ?></th>
                            <th><?php _e('Województwo' , 'cwb') ?></th>
                           
                            <th><span class="screen-reader-text">empty</span></th>
                        </tr>
                    </thead>
                    <tbody> 
                        <?php
					while ($custom_query->have_posts()) {
						$custom_query->the_post(); 
                        $terms = get_the_terms(get_the_ID(), 'location');

                            // Check if terms are retrieved and not a WP_Error
                            if ($terms && !is_wp_error($terms)) {
                                // Extract and join term names with a comma
                                $term_names = join(', ', wp_list_pluck($terms, 'name'));
                            } else {
                                $term_names = '';
                            }
                        ?>
                           
                        <tr>
                           <td aria-label="Nazwa projektu"><?php the_title(); ?></td>
                            <td aria-label="Województwo"><?php echo $term_names; ?></td>
                            
                            <td aria-label=""><a href="<?php the_permalink(); ?>" class="text-uppercase"><?php _e('CZYTAJ WIĘCEJ' , 'cwb') ?></a></td>
                        </tr>
                    
                <?php }
                ?>
                       </tbody>
                   </table>
                
            <?php
                }
                else {
					_e('Niczego nie znaleziono.' , 'cwb');
				}
				wp_reset_postdata();
                ?>
    </div>  
    <?php  
    } else {
        
        ?>
              <div class ="svg-map-sec-four">
                <div id="ajax-loader-form">
                     <span class="css-loader" ></span>
                 </div>
              <div id='map' class="mapstroke " data-category="<?php echo $atts['categoriesslug']; ?>" data-parentid="<?php echo $parent_id ?>"></div>
                <div class="map-articles-wrapt" tabindex="-1">
                    <div class="web-heading heading-divider" id="heading-title">
                        <h2>Heading</h2>
                    </div>
                    <div class="map-article-list" id="arcticals">
                        
                        <ul>
                
                        </ul>
                    </div>
                    <div class="pagination-wrap">
                        <div class="pagination-inner" role="navigation">
                            
                        </div>
                    </div>
               </div>
              </div>
               
           
            <script>
               var $ = jQuery;
               var map = L.map('map').setView([52.13728266955934, 19.30723419451104], 7);

                const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 10,
                    minZoom: 7,
                    maxNativeZoom: 10, // Set the maximum zoom level at which tiles are available
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

	
	function getColor(d) {
		return d > 1000 ? '#800026' :
			d > 500  ? '#BD0026' :
			d > 200  ? '#E31A1C' :
			d > 100  ? '#FC4E2A' :
			d > 50   ? '#FD8D3C' :
			d > 20   ? '#FEB24C' :
			d > 10   ? '#FED976' : '#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: '#003399',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: '#EEF3FF'
		};
	}

	function highlightFeature(e) {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#003399',
			dashArray: ''
			
            
		});

		// layer.bringToFront();

		// info.update(layer.feature.properties);
	}

	/* global statesData */
	const geojson = L.geoJson(statesData, {
		style,
		onEachFeature
	}).addTo(map);

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		// info.update();
	}

	function zoomToFeature(e) {
		// map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	
	}
    
    
   <?php
$taxonomy_circles = array(
    '47' => [52.2297, 21.0122],
    '44' => [54.24245280783771, 17.87040609602508],
    '45' => [53.8136079806913, 20.55513439876478],
    '46' => [53.11853643054141, 23.152208867045545],
    '48' => [51.253817066939604, 22.64862260668201],
    '145' => [50.00526138119159, 22.187368618145],
    '49' => [49.88792780695559, 20.186861012103293],
    '50' => [50.792612248766204, 20.751493193097616],
    '52' => [50.346273319695655, 18.940029553820523],
    '51' => [51.60470087525795, 19.300570211175426],
    '53' => [53.11207945886511, 18.369550456524905],
    '55' => [50.68209012490473, 17.882592482905352],
    '54' => [52.39164445796021, 16.953467536337484],
    '56' => [51.13151565316684, 16.306065998542266],
    '57' => [52.19155441561949, 15.247183974862878],
    '58' => [53.699838478135945, 15.448660473208378]
);

foreach ($taxonomy_circles as $taxonomy_id => $coordinates) {
    if ($taxonomy_counts[$taxonomy_id] > 0) {
        ?>
        var circle = L.circle(<?php echo json_encode($coordinates); ?>, {
            color: 'rgba(143, 166, 214, 1)',
            fillColor: 'rgba(29, 74, 165, 1)',
            fillOpacity: 1,
            radius: 15000 // Radius in meters
        }).addTo(map);
        var center = circle.getLatLng();
        var value = <?php echo json_encode($taxonomy_counts[$taxonomy_id]); ?>;
        var valueIcon = L.divIcon({
            className: 'value-icon',
            html: '<div>' + value + '</div>'
        });
        L.marker(center, { icon: valueIcon }).addTo(map);
        <?php
    }
}
?>

const LeafIcon = L.Icon.extend({
        options: {
            iconSize: [10, 20],
            iconAnchor: [20, 50], // Adjusted iconAnchor to center the icon vertically
        }
	});
   <?php
  
    foreach( $mapiconsarray as $index => $mapiconsingle){ 
                $innerarray     =   explode('|' ,  $mapiconsingle);
                ?>
                const greenIcon<?php echo $index; ?> = new LeafIcon({iconUrl: '<?php echo $innerarray[1];?>'});
	            const mGreen<?php echo $index; ?> = L.marker([<?php echo  $innerarray[0]; ?>], {icon:greenIcon<?php echo $index; ?>}).addTo(map);
                
          <?php  } ?>

	
// var marker = L.marker([52.2297, 21.0122],{
// 	// Use any Font Awesome icon here
//     markerColor: 'red', // Marker color
//     prefix: 'fa', // Font Awesome prefix
//     iconColor: 'white', // Text color
//     number: '1234'
// }).addTo(map);

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);


// function onEachFeature(feature, layer) {
//     let popupContent = `<div class="map-articles-wrap" tabindex="-1">
// 	<div class="web-heading heading-divider" id="heading-title">
// 		<h2>Heading</h2>
// 	</div>
// 	<div class="map-article-list" id="arcticals">
		
// 		<ul>

// 		</ul>
// 	</div>
// 	<div class="pagination-wrap">
// 		<div class="pagination-inner" role="navigation">
			
// 		</div>
// 	</div>
// </div>`;

    
//     layer.bindPopup(popupContent);
// }

// const geojsont = L.geoJson(geojsont,campus, {
// 		style,
// 		onEachFeature
// 	}).addTo(map);

        </script>
       
<div>
    <div class="lengend">
		<?php
		
		if($atts['upcomingcheckbox']== 'false' ){ ?>
		 <h2>Legenda</h2>
	
       
        <div class="obszary"> 
            <p>
            <span><img src="<?php echo get_stylesheet_directory_uri() . '/images/icontree.png'; ?>" alt="home-icon"></span> Wybrane obszary chronione
            </p>
            <div class = "obszaryul" >
                <ul> 
                    <?php
                        $legenda = get_terms(array(
                            'taxonomy' => 'legenda',
                            'hide_empty' => false,
                        ));

                        // Check if any terms were returned
                        if (!empty($legenda) && !is_wp_error($legenda)) {
                            foreach ($legenda as $index => $term) {
                                $count = $index+1 ;
                                ?>
                                 
                                <li><span style = "background-image: url(<?php echo get_stylesheet_directory_uri() . '/images/leaendicon.png'; ?>);"><?php echo $count ?>. </span> <?php echo $term->name ?> </li>
                                
                        <?php
                            }
                        } else {
                            echo 'No terms found.';
                        }
                    ?>
                </ul>
            </div> 
        </div>
        <div class="obszary obszarynew"> 
            <p>
            <span><img src="<?php echo get_stylesheet_directory_uri() . '/images/mainicon.png'; ?>" alt="home-icon"></span> Wybrane kompleksy leśne
            </p>
            <div class = "obszaryul" >
            <ul> 
                    <?php
                        $legenda = get_terms(array(
                            'taxonomy' => 'kompleksy',
                            'hide_empty' => false,
                        ));

                        // Check if any terms were returned
                        if (!empty($legenda) && !is_wp_error($legenda)) {
                            foreach ($legenda as $index => $term) {
                                $count = $index+1 ;
                                ?>
                                 
                                <li><span style = "background-image: url(<?php echo get_stylesheet_directory_uri() . '/images/treeliicon.png'; ?>);"><?php echo  $count ?>. </span> <?php echo $term->name ?> </li>
                                
                        <?php
                            }
                        } else {
                            echo 'No terms found.';
                        }
                    ?>
                </ul>
               
            </div> 
        </div>
		<?php } 
		else{
			
		}?>
    </div>
	
</div>
    

<?php
                    }  
    
    ?>
           
    <?php
    $html_to_return = ob_get_clean();
    return $html_to_return;
}

add_shortcode('second_stylethree', 'second_mapshortcode');
				

/**
 * 
 * API endpoint for get_news_shortcode
 */
function second_stylethree_post_type_handler($request) {
    $params = $request->get_params();
    $content = do_shortcode("[second_stylethree categoriesslug='{$params['selectedCategory']}' ]");
    
    return rest_ensure_response(array('content' => $content));
}
   add_action('rest_api_init', function () {
    register_rest_route('blocks-preview-shortvode/v1', '/second_stylethree-post-type', array(
        'methods' => 'POST',
        'callback' => 'second_stylethree_post_type_handler',
    ));
});