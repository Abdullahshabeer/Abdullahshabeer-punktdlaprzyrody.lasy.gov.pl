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
                            $post_id    = get_the_ID();
							$page_icons = get_field('min_header_icon', $post_id);
							if (!empty($page_icons)) {
								echo '<img src="' . esc_url($page_icons) . '" alt="page icon" />';
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
                    <?php the_content(); ?>
                    <table>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('Name' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'name' , true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('nazwisko' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'nazwisko' ,true ); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('email' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'email' ,true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('telefon' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'telefon' , true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('form consultation' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'form_consultation' , true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('topic' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'topic' , true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('dziedzina' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'dziedzina' , true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('expert id' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'expert_id' , true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('ekspert' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'ekspert' , true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('termin konsultacji' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'termin_konsultacji' , true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('godzina konsultacji' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'godzina_konsultacji' , true); ?></td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 10px;"><?php _e('informacje inne' , 'cwb'); ?></td>
                            <td style="padding: 5px 10px;"><?php echo get_post_meta($post_id, 'informacje_inne' , true); ?></td>
                        </tr>
                    </table>
                </div>
				<div class="col-xl-3">
					<div class="sidebar">
						<div class="web-heading">
							<h2><?php  echo get_field('enter_title')?></h2>
						</div>
                        
						<div class="sidebar-list">
                            <ul>
                            <?php
                                // Get the repeater field data
                                $repeater_field = get_field('information_about_recruitment');

                                // Check if there is data in the repeater field
                                if ($repeater_field) {
                                    foreach ($repeater_field as $row) {
                                        // Access subfields for each row
                                        $subfield_1 = $row['title'];
                                        $subfield_2 = $row['content'];

                                        // Output the data in your HTML
                                        ?>
                                        
                                        <li>
                                            <span><?php echo esc_html($subfield_1); ?></span>
                                            <span><b><?php echo esc_html($subfield_2); ?></b></span>
                                        </li>
                                            
                                        <?php
                                    }
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