<?php get_header(); 

 $current_language = ICL_LANGUAGE_CODE;
if (!is_front_page()) {
   
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
								$alt_text = __('page icon', 'cwb'); // Localize the alt text
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
					<?php
					the_content()
					?>
				</div>
		
				<div class="col-xl-3 d-none d-xl-block">
					<div class="sidebar">
						<div class="web-heading">
							<h2><?php _e('Menu' , 'cwb'); ?></h2>
						</div>
						<div class="sidebar-menu">
						<?php
                            if (is_active_sidebar('menu-sidebar')) {
                                dynamic_sidebar('menu-sidebar');
                            }
                        ?>
						</div>
						

					</div>
				</div>
			</div>
		</div>
	</section>

   
        <?php
        }
    }

} else if(($current_language === 'en')) {
?>

    <div id="site-wrapper">
		<div class="block-row sub-page-wrap"> 
			<div class="container">
			<?php
				if(have_posts(  )){
					while(have_posts()){
						the_post();
						the_content();
					}
				}

			?>
			</div>
		</div>   
   </div>

  <?php  
} else {
?>
	<div id="site-wrapper">
			<?php
				if(have_posts(  )){
					while(have_posts()){
						the_post();
						the_content();
					}
				}

			?>
	</div>
<?php
}
?>

<?php
get_footer()
?>