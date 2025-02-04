<?php
/**
 **  
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
				
				<div class="col-xl-<?php echo !empty($featureimage) ? '7' : '12'; ?>">
					<div class="header-content">
					<?php custom_breadcrumbs(); ?>
						<div class="page-title d-flex">
							<?php
							// Get the ACF field value for 'page_icons'
							$page_icons = get_field('min_header_icon', get_the_ID());

							// Check if it's an array and if it has the 'url' key
							if (!empty($page_icons)) {
								echo '<img src="' . esc_url($page_icons) . '" alt="' . esc_attr__('page icon', 'cwb') . '" />';
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
				<div class="col-xl-3">
					<div class="sidebar">
						<div class="web-heading">
							<h2><?php echo  __('Informacje o naborze' , 'cwb')?></h2>
						</div>
                        
						<div class="sidebar-list">
                            <ul>
                            <?php
                                $program =  get_field_object('program');
                                $roke   =   get_field_object('rok');
                                $instytuccja  = get_field_object('instytucja_oglaszajaca');
                                ?>
                               <li>
                                
                                    <span><?php echo $program['label'] ; ?></span>
                                    <span><b><?php echo get_field('program'); ?></b></span>
                                 </li>
                                 <li>
                                    
                                    <span><?php echo $roke['label']; ?></span>
                                    <span><b><?php echo get_field('rok'); ?></b></span>
                                 </li>
                                 <li>
                                    <span><?php echo $instytuccja['label']; ?></span>
                                    <span><b><?php echo get_field('instytucja_oglaszajaca'); ?></b></span>
                                 </li>
                               
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