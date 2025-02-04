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
                                <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
                            </div>
                            <div class="article-content">
                                <h3><?php the_title(); ?></h3>
                                <div class="author"><span><?php the_author() ?></span></div>
                                <div class="status-recruitment d-flex align-items-center">
                                    <?php
                                $categories = get_the_category();

                                if (!empty($categories)) {
                                    foreach ($categories as $category) {
                                        echo '<div class="status-sec"><span>' . esc_html($category->name) . '</span></div>';
                                    }
                                }
                                    ?>
                                    
                                    <span><?php the_excerpt()?></span>
                                </div>
                                <div class="web-btn text-end">
                                    <a href="<?php the_permalink(); ?>" class="btn btn-primary">szczegóły</a>
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

    <?php
    $html_to_return = ob_get_clean();

    return $html_to_return;
}

add_shortcode('display_publications_list', 'welcome_user_shortcode');


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
				    	<div class="article-card card-style-2">
				    		<div class="article-featured-img">
                            <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
				    		</div>
				    		<div class="article-content">
				    			<h3><?php the_title(); ?></h3>
				    			<p><?php the_excerpt()?> </p>
				    			<div class="article-meta d-flex align-items-center justify-content-between">
				    				<div class="date-location d-flex align-items-center">
				    					<div class="date-sec"><b> <?php echo get_the_time('d.m D'); ?></b><span>|</span><?php echo get_the_time('H:i'); ?></div>
				    					<div class="location-sec d-flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none"><g id="Group 42612"><path id="Ellipse 208" d="M18 9C18 15.9706 10 23 9 23C8 23 0 15.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#43516F"></path><circle id="Ellipse 209" cx="9" cy="9" r="4" fill="#EEF3FF"></circle></g></svg> 
                                            Warszawa
                                       </div>
				    				</div>
				    				<div class="web-btn text-end">
					    				<a href="<?php the_permalink(); ?>" class="btn btn-primary">szczegóły</a>
					    			</div>
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
                            <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
				    		</div>
				    		<div class="article-content">
				    			<div class="date-sec"><span><?php echo get_the_time('d.m.Y'); ?></span></div>
				    			<h3><?php the_title(); ?></h3>
				    			<div class="web-btn">
				    				<a href="<?php the_permalink(); ?>" class="btn btn-primary">czytaj</a>
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
    $search_query           =   isset($_GET['title']) ? sanitize_text_field($_GET['title']) : '';
    $selected_applies_year  =   isset($_GET['date']) ? sanitize_text_field($_GET['date']) : '';
    $selected_year          =   isset($_GET['search']) ? sanitize_text_field($_GET['search']) : '';
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
                                    <input type="text" class="form-control date-picker" name="date" id="date" placeholder="<?php _e('Wybierz zakres dat' , 'cwb') ?>">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="name"><?php _e('Miejsce' , 'cwb') ?></label>
                                    <input type="text" class="form-control" id="name" name="title" placeholder="<?php _e('Wpisz nazwę' , 'cwb') ?>">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="form-group">
                                    <label for="search-input"><?php _e('Wyszukiwarka' , 'cwb') ?></label>
                                    <input type="text" class="form-control" id="search-input" name="search" placeholder="<?php _e('Wpisz szukaną frazę...' , 'cwb') ?>">
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
            $ucouming   = $atts['upcoming_post'];
            $posts_per_page = $atts['posts_per_page'];
            
            $current_page = get_query_var('paged') ? get_query_var('paged') : 1;

             
            $today = date( 'Ymd' );
            // $args = array(
            //     'post_type' => $post_type,
            //     'terms' => $categories,
            //     'nopaging' => true,
            //     'order' => $sort_order,
            // );
            
            // if ($ucouming == 'upcoming' || $ucouming == 'completed') {
            //     $meta_compare = ($ucouming == 'upcoming') ? '>=' : '<=';
            //     $args['meta_query'] = array(
            //         array(
            //             'key' => 'selected_post_time',
            //             'compare' => $meta_compare,
            //             'value' => $today,
            //         ),
            //     );
            // }
            $args = array(
                'post_type' => $post_type,
                'nopaging' => true,
                'order' => $sort_order,
            );
            
            if ($ucouming == 'upcoming' || $ucouming == 'completed') {
                $meta_compare = ($ucouming == 'upcoming') ? '>=' : '<=';
                $args['meta_query'] = array(
                    array(
                        'key' => 'selected_post_time',
                        'compare' => $meta_compare,
                        'value' => $today,
                    ),
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
                    $custom_query->the_post(); ?>
                    <div class="col-lg-6 col-md-6">
                        <div class="article-card card-style-2">
                            <div class="article-featured-img">
                            <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
                            </div>
                            <div class="article-content">
				    			<h3><?php the_title(); ?></h3>
				    			<p><?php the_excerpt()?> </p>
				    			<div class="article-meta d-flex align-items-center justify-content-between">
				    				<div class="date-location d-flex align-items-center">
				    					<div class="date-sec"><b> <?php echo get_the_time('d.m D'); ?></b><span>|</span><?php echo get_the_time('H:i'); ?></div>
				    					<div class="location-sec d-flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none"><g id="Group 42612"><path id="Ellipse 208" d="M18 9C18 15.9706 10 23 9 23C8 23 0 15.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#43516F"></path><circle id="Ellipse 209" cx="9" cy="9" r="4" fill="#EEF3FF"></circle></g></svg> 
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
                _e('No posts found.', 'cwb');
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
                                <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
                            </div>
                            <div class="article-content">
                                <h3><?php the_title(); ?></h3>
                                <div class="author"><span><?php the_author() ?></span></div>
                                <div class="status-recruitment d-flex align-items-center">
                                    <?php
                                $categories = get_the_category();

                                if (!empty($categories)) {
                                    foreach ($categories as $category) {
                                        echo '<div class="status-sec"><span>' . esc_html($category->name) . '</span></div>';
                                    }
                                }
                                    ?>
                                    
                                    <span><?php the_excerpt()?></span>
                                </div>
                                <div class="web-btn text-end">
                                    <a href="<?php the_permalink(); ?>" class="btn btn-primary">szczegóły</a>
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

    <?php
    $html_to_return = ob_get_clean();

    return $html_to_return;
}

add_shortcode('display_publications_list', 'welcome_user_shortcode');


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
				    	<div class="article-card card-style-2">
				    		<div class="article-featured-img">
                            <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
				    		</div>
				    		<div class="article-content">
				    			<h3><?php the_title(); ?></h3>
				    			<p><?php the_excerpt()?> </p>
				    			<div class="article-meta d-flex align-items-center justify-content-between">
				    				<div class="date-location d-flex align-items-center">
				    					<div class="date-sec"><b> <?php echo get_the_time('d.m D'); ?></b><span>|</span><?php echo get_the_time('H:i'); ?></div>
				    					<div class="location-sec d-flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none"><g id="Group 42612"><path id="Ellipse 208" d="M18 9C18 15.9706 10 23 9 23C8 23 0 15.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9Z" fill="#43516F"></path><circle id="Ellipse 209" cx="9" cy="9" r="4" fill="#EEF3FF"></circle></g></svg> 
                                            Warszawa
                                       </div>
				    				</div>
				    				<div class="web-btn text-end">
					    				<a href="<?php the_permalink(); ?>" class="btn btn-primary">szczegóły</a>
					    			</div>
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
                            <?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?>
				    		</div>
				    		<div class="article-content">
				    			<div class="date-sec"><span><?php echo get_the_time('d.m.Y'); ?></span></div>
				    			<h3><?php the_title(); ?></h3>
				    			<div class="web-btn">
				    				<a href="<?php the_permalink(); ?>" class="btn btn-primary">czytaj</a>
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
    $search_query           =   isset($_GET['title']) ? sanitize_text_field($_GET['title']) : '';
    $selected_applies_year  =   isset($_GET['date']) ? sanitize_text_field($_GET['date']) : '';
    $selected_year          =   isset($_GET['search']) ? sanitize_text_field($_GET['search']) : '';
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
                                    <input type="text" class="form-control date-picker" name="date" id="date" placeholder="<?php _e('Wybierz zakres dat' , 'cwb') ?>">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="name"><?php _e('Miejsce' , 'cwb') ?></label>
                                    <input type="text" class="form-control" id="name" name="title" placeholder="<?php _e('Wpisz nazwę' , 'cwb') ?>">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="form-group">
                                    <label for="search-input"><?php _e('Wyszukiwarka' , 'cwb') ?></label>
                                    <input type="text" class="form-control" id="search-input" name="search" placeholder="<?php _e('Wpisz szukaną frazę...' , 'cwb') ?>">
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
            $ucouming   = $atts['upcoming_post'];
            $posts_per_page = $atts['posts_per_page'];
            
            $current_page = get_query_var('paged') ? get_query_var('paged') : 1;

             
            
// Define the months
$months = array(
    '01' => 'January',
    '02' => 'February',
    '03' => 'March',
    '04' => 'April',
    '05' => 'May',
    '06' => 'June',
    '07' => 'July',
    '08' => 'August',
    '09' => 'September',
    '10' => 'October',
    '11' => 'November',
    '12' => 'December'
);

// Loop through the months
foreach ($months as $monthNum => $monthName) {
    // Define the year-month format (e.g., '202301' for January 2023)
    $yearMonth = date('Y') . $monthNum;
// print_r($yearMonth);
    // Set up query args for the specific month
    $args = array(
        'post_type' => $post_type,
        'terms' => $categories,
        'nopaging' => true,
        'order' => $sort_order,
        'meta_query' => array(
            'relation' => 'AND',
            array(
                'key' => 'selected_post_time',
                'compare' => '>=',
                'value' => $yearMonth . '01',
                'type' => 'DATE',
            ),
            array(
                'key' => 'selected_post_time',
                'compare' => '<=',
                'value' => $yearMonth . '31',
                'type' => 'DATE',
            ),
        ),
    );
// print_r($args);
    // Create a WP_Query for the specific month
    $custom_query = new WP_Query($args);

    // Check if there are posts for this month
    if ($custom_query->have_posts()) {
        ?>
        <div class="traning-post-listview">
            <div class="year-list">
                <ul>
                    <li> <a href="#year-<?php echo $monthName; ?>"> <?php echo $monthName; ?> </a></li>
                </ul>
            </div>
            <div class="yearly-posts" id="year-<?php echo $monthName; ?>">
                <div class="web-heading heading-divider">
                    <h2> <?php echo $monthName; ?></h2>
                </div>
                <div class="data-table-block">
                    <table class="table data-table">
                        <thead>
                            <tr class="d-none d-lg-table-row">
                                
                                
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
                                <?php echo  get_field('selected_post_time') ?>
                                    <td aria-label="Tytuł szkolenia"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></td>
                                    <td aria-label="Limit miejsc">12/78</td>
                                </tr>
                                <?php
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php
    }

    // Reset post data for the next month
    wp_reset_postdata();
}
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
    $search_query           =   isset($_GET['title']) ? sanitize_text_field($_GET['title']) : '';
    $selected_applies_year  =   isset($_GET['date']) ? sanitize_text_field($_GET['date']) : '';
    $selected_year          =   isset($_GET['search']) ? sanitize_text_field($_GET['search']) : '';
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
                                    <input type="text" class="form-control date-picker" name="date" id="date" placeholder="<?php _e('Wybierz zakres dat' , 'cwb') ?>">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="name"><?php _e('Miejsce' , 'cwb') ?></label>
                                    <input type="text" class="form-control" id="name" name="title" placeholder="<?php _e('Wpisz nazwę' , 'cwb') ?>">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="form-group">
                                    <label for="search-input"><?php _e('Wyszukiwarka' , 'cwb') ?></label>
                                    <input type="text" class="form-control" id="search-input" name="search" placeholder="<?php _e('Wpisz szukaną frazę...' , 'cwb') ?>">
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
            $ucouming   = $atts['upcoming_post'];
            $posts_per_page = $atts['posts_per_page'];
            
            $current_page = get_query_var('paged') ? get_query_var('paged') : 1;

            $today = date('Ym'); // Current year and month, e.g., '202301' for January 2023

            // Define the months
            $months = array(
                '0' => 'Current Month',
                '1' => 'Next Month',
                '2' => '2 Months Ahead',
                '3' => '3 Months Ahead',
                '4' => '4 Months Ahead',
                '5' => '5 Months Ahead',
                '6' => '6 Months Ahead',
                '7' => '7 Months Ahead',
                '8' => '8 Months Ahead',
                '9' => '9 Months Ahead',
                '10' => '10 Months Ahead',
                '11' => '11 Months Ahead',
            );
           

        // Loop through the months
        foreach ($months as $monthOffset => $monthName) {
            // Calculate the year and month for the current iteration
        // Calculate the year and month for the current iteration
        $year = date('Y', strtotime("+$monthOffset months", strtotime($today)));
        $month = date('m', strtotime("+$monthOffset months", strtotime($today)));

        // Define the year-month format for the specific month
        $yearMonth = $year . $month;
        // Set up query args for the specific month
        print_r( $yearMonth);
        $args = array(
            'post_type' => $post_type,
            'terms' => $categories,
            'nopaging' => true,
            'order' => $sort_order,
            'meta_query' => array(
                'relation' => 'AND',
                array(
                    'key' => 'selected_post_time',
                    'compare' => '>=',
                    'value' => $yearMonth . '01', // Start from the current month
                    'type' => 'DATE',
                ),
                array(
                    'key' => 'selected_post_time',
                    'compare' => '<=',
                    'value' => $yearMonth . '31', // End of the specific month
                    'type' => 'DATE',
                ),
            ),
        );


  // print_r($args);
    // Create a WP_Query for the specific month
    $custom_query = new WP_Query($args);

    // Check if there are posts for this month
    if ($custom_query->have_posts()) {
        ?>
        <div class="traning-post-listview">
            <div class="year-list">
                <ul>
                    <li> <a href="#year-<?php echo $monthName; ?>"> <?php echo $monthName; ?> </a></li>
                </ul>
            </div>
            <div class="yearly-posts" id="year-<?php echo $monthName; ?>">
                <div class="web-heading heading-divider">
                    <h2> <?php echo $monthName; ?></h2>
                </div>
                <div class="data-table-block">
                    <table class="table data-table">
                        <thead>
                            <tr class="d-none d-lg-table-row">
                                
                                
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
                                <?php echo  get_field('selected_post_time') ?>
                                    <td aria-label="Tytuł szkolenia"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></td>
                                    <td aria-label="Limit miejsc">12/78</td>
                                </tr>
                                <?php
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php
    }

    // Reset post data for the next month
    wp_reset_postdata();
  }


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
    ?>
}
add_shortcode('get_posts_from_custom_post_type', 'get_posts_from_custom_post_type');



































function montyley_kalandarz_function($atts){
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
    
    $today = date('Ym'); // Current year and month, e.g., '202301' for January 2023

        $currentMonthName = date('F');

        // Define an array of month names for the next 11 months
        $months = array(
            $currentMonthName, // Current Month
            date('F', strtotime('+1 month')), // Next Month
            date('F', strtotime('+2 months')), // 2 Months Ahead
            date('F', strtotime('+3 months')), // 3 Months Ahead
            date('F', strtotime('+4 months')), // 4 Months Ahead
            date('F', strtotime('+5 months')), // 5 Months Ahead
            date('F', strtotime('+6 months')), // 6 Months Ahead
            date('F', strtotime('+7 months')), // 7 Months Ahead
            date('F', strtotime('+8 months')), // 8 Months Ahead
            date('F', strtotime('+9 months')), // 9 Months Ahead
            date('F', strtotime('+10 months')), // 10 Months Ahead
            date('F', strtotime('+11 months')), // 11 Months Ahead
        );
        ?>
        <div class="traning-post-listview">
                <div class="year-list">
                    <ul>
                    <?php
                        // Loop through the months
                        foreach ($months as $monthOffset => $monthName) {
                            $yearMonthFormatted = (str_replace(' ', '-', $monthName));
                            ?>
                            <li><a href="#year-<?php echo $yearMonthFormatted; ?>"><?php echo $monthName; ?></a></li>
                            <?php
                        }
                        ?>
                    </ul>
                </div>
<?php
    // Loop through the months
    foreach ($months as $monthOffset => $monthName) {
        // Calculate the year and month for the current iteration
        $year = date('Y', strtotime("+$monthOffset months", strtotime($today)));
        $month = date('m', strtotime("+$monthOffset months", strtotime($today)));

        // Define the year-month format for the specific month
        $yearMonth = $year . $month;

        // Set up query args for the specific month
        $args = array(
            'post_type' => $post_type,
            'terms' => $categories,
            'nopaging' => true,
            'meta_query' => array(
                'relation' => 'AND',
                array(
                    'key' => 'selected_post_time',
                    'compare' => '>=',
                    'value' => $yearMonth . '01', // Start from the current month
                    'type' => 'DATE',
                ),
                array(
                    'key' => 'selected_post_time',
                    'compare' => '<=',
                    'value' => $yearMonth . '31', // End of the specific month
                    'type' => 'DATE',
                ),
            ),
        );

        // Create a WP_Query for the specific month
        $custom_query = new WP_Query($args);

        // Check if there are posts for this month
        if ($custom_query->have_posts()) {
            ?>
            <div class="yearly-posts" id="year-<?php echo $monthName; ?>">
                <div class="web-heading heading-divider">
                    <h2><?php echo $monthName; ?></h2>
                </div>
                <div class="data-table-block">
                    <table class="table data-table">
                        <thead>
                            <tr class="d-none d-lg-table-row">
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
                                    <td aria-label="Tytuł szkolenia"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></td>
                                    <td aria-label="Limit miejsc">12/78</td>
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

    // Define your WP_Query args to fetch posts based on your criteria
    $args = array(
        'post_type' => $post_type,
        // 'terms' => $categories,
    );
// print_r($args);
// wp_die();
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();

            // Get custom field values (adjust field names as needed)
            $event_title = get_the_title();
            $event_start_date = get_post_meta(get_the_ID(), 'selected_post_time', true); // Adjust field name
            $event_end_date = ''; // Adjust as needed
            $event_color = ''; // Adjust as needed
            $event_text_color = ''; // Adjust as needed
            $event_url = get_permalink();

            // Create an event object
            $event = array(
                'title' => $event_title,
                'start' => $event_start_date,
                'end' => $event_end_date,
                'color' => $event_color,
                'textColor' => $event_text_color,
                'url' => $event_url,
            );
            // Add the event to the data array
            $event_data[] = $event;
        }
    }

    wp_reset_postdata();
//   print_r($event_data);
//   wp_die( );
    return $event_data;
}

add_shortcode('Kalendarz_konsultacji_shortcode', 'Kalendarz_konsultacji_function');


















































function Kalendarz_konsultacji_function($atts){
    ob_start(); // Start output buffering
    
    $atts = shortcode_atts(
        array(
            'post_type' => 'post',
            
        ),
        $atts
    );
    
    $post_type = $atts['post_type'];
    $categories = $atts['categories'];

    $args = array(
        'post_type' => $post_type,
        // 'terms' => $categories,
    );
    // Define the JavaScript code for FullCalendar initialization and event data
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();

           
           
        }
    }

    wp_reset_postdata();
    ?>
   
    <?php

    $html_to_return = ob_get_clean(); // Get the buffered content and clean the buffer
    return $html_to_return;
}

function get_event_data($post_type, $categories) {
    $event_data = array();

    // Define your WP_Query args to fetch posts based on your criteria
    $args = array(
        'post_type' => $post_type,
        // 'terms' => $categories,
    );
// print_r($args);
// wp_die();
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();

            // Get custom field values (adjust field names as needed)
            $event_title = get_the_title();
            $event_start_date = get_post_meta(get_the_ID(), 'selected_post_time', true); // Adjust field name
            $event_end_date = ''; // Adjust as needed
            $event_color = ''; // Adjust as needed
            $event_text_color = ''; // Adjust as needed
            $event_url = get_permalink();

            // Create an event object
            $event = array(
                'title' => $event_title,
                'start' => $event_start_date,
                'end' => $event_end_date,
                'color' => $event_color,
                'textColor' => $event_text_color,
                'url' => $event_url,
            );
            // Add the event to the data array
            $event_data[] = $event;
        }
    }

    wp_reset_postdata();
//   print_r($event_data);
//   wp_die( );
    return $event_data;
}

add_shortcode('Kalendarz_konsultacji_shortcode', 'Kalendarz_konsultacji_function');


/**
 * 
 * API endpoint for get_news_shortcode
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

    // Define your WP_Query args to fetch posts based on your criteria
    $args = array(
        'post_type' => $post_type,
        // 'terms' => $categories,
    );
// print_r($args);
// wp_die();
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();

            // Get custom field values (adjust field names as needed)
            $event_title = get_the_title();
            $event_start_date = get_post_meta(get_the_ID(), 'selected_post_time', true); // Adjust field name
            $event_end_date = ''; // Adjust as needed
            $event_color = ''; // Adjust as needed
            $event_text_color = ''; // Adjust as needed
            $event_url = get_permalink();

            // Create an event object
            $event = array(
                'title' => $event_title,
                'start' => $event_start_date,
                'end' => $event_end_date,
                'color' => $event_color,
                'textColor' => $event_text_color,
                'url' => $event_url,
            );
            // Add the event to the data array
            $event_data[] = $event;
        }
    }

    wp_reset_postdata();
//   print_r($event_data);
//   wp_die( );
    return $event_data;
}

add_shortcode('Kalendarz_konsultacji_shortcode', 'Kalendarz_konsultacji_function');





































function Kalendarz_konsultacji_function($atts){
    ob_start(); // Start output buffering
    
    $atts = shortcode_atts(
        array(
            'post_type' => 'post',
        ),
        $atts
    );
    
    $post_type = $atts['post_type'];

    // Get all categories for the specified post type
    $categories = get_categories(array(
        'type' => $post_type,
    ));
    
    if (!empty($categories)) {
        echo '<div class="list-expert-top">';
        echo '<p>Wyświetl ekspertów z dziedziny:</p>';
        echo '<ul>';

        // Loop through categories and create list items
        foreach ($categories as $category) {
            echo '<li data-filter="' . esc_attr('category-' . $category->term_id) . '">';
            echo '<a href="#">' . esc_html($category->name) . '</a>';
            echo '</li>';
        }

        echo '</ul>';
        echo '</div>';

        echo '<div class="list-expert-wrap articles-wrap">';
        echo '<div class="row">';
        
        // Loop through categories and their posts
        foreach ($categories as $category) {
            // Get posts for the current category
            $args = array(
                'post_type' => $post_type,
                'term' => $category->slug,
            );
            $query = new WP_Query($args);

            // Loop through posts and create list items
            while ($query->have_posts()) {
                $query->the_post();
                echo '<div class="col-lg-4 col-md-6 list-expert-col ' . esc_attr('category-' . $category->term_id) . '">';
                echo '<a href="#">';
                echo '<div class="article-card card-style-3">';
                echo '<div class="article-featured-img">';
                // Replace the image source with your actual image source
                echo '<img src="your-image-source-here" alt="img">';
                echo '</div>';
                echo '<div class="article-content">';
                echo '<div class="expert-category"><span style="background-color: #00745F"></span>' . esc_html($category->name) . '</div>';
                echo '<h3>' . get_the_title() . '</h3>';
                echo '</div>';
                echo '</div>';
                echo '</a>';
                echo '</div>';
            }

            wp_reset_postdata(); // Reset the query for the next category
        }

        echo '</div>';
        
        // Add pagination here if needed
        
        echo '</div>';
    }

    $html_to_return = ob_get_clean(); // Get the buffered content and clean the buffer
    return $html_to_return;
}
add_shortcode('Kalendarz_konsultacji_shortcode', 'Kalendarz_konsultacji_function');