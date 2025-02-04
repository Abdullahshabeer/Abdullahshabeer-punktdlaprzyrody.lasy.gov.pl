<?php
/**
 * Template Name: Password Field
 */

get_header();

$post_id = isset($_GET['post_id']) ? intval($_GET['post_id']) : 0;
$post = get_post($post_id);

// Check if the post exists
if ($post) {
    // Access post data
    $post_title = $post->post_title;
    $post_content = $post->post_content;
    $post_excerpt = $post->post_excerpt;
    $post_feature_image = get_the_post_thumbnail($post_id, 'full'); // Use get_the_post_thumbnail to get the featured image
   
    $headerClass = !empty($post_feature_image) ? 'banner-header' : '';
   ?>
   <section class="sub-page-header light-bg <?php echo esc_attr($headerClass); ?>">
		<div class="container">
		   <div class="row">
				<div class="col-xl-<?php echo !empty($post_feature_image) ? '7' : '12'; ?>">
					<div class="header-content">
					<?php custom_breadcrumbs(); ?>
						<div class="page-title d-flex">
						<?php
						$default_page_icon = get_field('min_header_icon', $post_id);
						if (empty($default_page_icon)) {
							$parent_id = wp_get_post_parent_id($post_id);
							$page_icons = get_field('min_header_icon', $parent_id);
							
							if (empty($page_icons)) {
								$grandparent_id = wp_get_post_parent_id($parent_id);
								$page_icon = get_field('min_header_icon', $grandparent_id);
								if (!empty($page_icon)) {
									 $alt_text = __('page icon', 'cwb'); // Localize the alt text
                                                    echo '<img src="' . esc_url($page_icons) . '" alt="' . esc_attr($alt_text) . '" />';
								}
							} else {
								echo '<img src="' . esc_url($page_icons) . '" alt="parent icon" />';
							}
						} else {
							if (!empty($default_page_icon)) {
								$alt_text = __('default icon', 'cwb'); // Localize the alt text
								echo '<img src="' . esc_url($default_page_icon) . '" alt="' . esc_attr($alt_text) . '" />';
							}
						}

						$start_date = get_field('start_date', $post_id);
						
						$variable = ''; // Initialize the variable

						if (isset($start_date)) {
							$date_time_object = new DateTime($start_date);
							$date = $date_time_object->format('d.m.Y');
							$time = $date_time_object->format('h:i A');

							$current_date = date('d.m.Y');
							if (strtotime($date) < strtotime($current_date)) { 
								$translated_text = __('zrealizowane', 'cwb'); // Retrieve the translated string
								$variable = ' - <span class="changecolor">' . $translated_text . '</span>';
							}
							
						}
						?>
						
						<h1><?php echo esc_html($post_title) . ' '. $variable ; ?></h1>

						</div>
					</div>
				</div>
				<?php
				if (!empty($post_feature_image)) {
				?>
					<div class="col-xl-5">
						<div class="banner-img">
							<?php echo $post_feature_image; ?>
						</div>
					</div>
				<?php
				}
				?>
			</div>
		</div>
	</section>
	
    <?php
// Start the Loop.
if (have_posts()) {
    while (have_posts()) {
        the_post(); ?>
		<section class="block-row sub-page-wrap">
  <div class ="container">
    <div class =" passwordfield">
        <div class="web-heading heading-divider">
            <h2><?php the_title() ?></h2>
        </div>

		<?php if (post_password_required()) : ?>
<div class="displaynone">
    <?php 
       echo get_field('textareafield') ;
    ?>
</div>

<?php endif; ?>
       
        <div class="row sub-page-row">
            <div class="col-xl-9">
                <div class="training-rate-sec">
                <?php
                  the_content()
                ?>
                    

                </div>
            </div>
        </div>
		</div>
   </div>
</section>        
<?php
    }
	?>
	
<?php	

}
} else {
    // Handle the case when the post is not found
       _e('Post not found.' , 'cwb'); 
}


get_footer();
?>




