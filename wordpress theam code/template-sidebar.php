<?php
/**
 **  Template Name: siderbar Page
 */
get_header();
?>
<?php
// Start the Loop.
if (have_posts()) {
    while (have_posts()) {
        the_post(); 
         $featureimage = get_the_post_thumbnail();
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
										$alt_text = __('page icon', 'cwb'); // Localize the alt text
										echo '<img src="' . esc_url($page_icons) . '" alt="' . esc_attr($alt_text) . '" />';
									}
								} else {
									echo '<img src="' . esc_url($page_icons) . '" alt="parent icon" />';
								}
						}else{
							if (!empty($default_page_icon)) {
								$alt_text = __('default icon', 'cwb'); // Localize the alt text
								echo '<img src="' . esc_url($default_page_icon) . '" alt="' . esc_attr($alt_text) . '" />';
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
				</div>
		
				<div class="col-xl-3 d-none d-xl-block">
					<div class="sidebar">
						<div class="web-heading">
							<h2><?php _e('Menu' , 'cwb' ); ?></h2>
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