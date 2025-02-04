<footer>
		<div class="footer-top">
			<div class="container">
				<div class="row">
					<div class="col-lg-12 footer-row d-flex align-items-center justify-content-between">
						<div class="footer-title">
							<a href="<?php echo home_url(); ?> "><?php  bloginfo('name') ?></a>
						</div> 
						<div class="social-icons">
                        <?php
                            if (is_active_sidebar('footer-sidebar')) {
                                dynamic_sidebar('footer-sidebar');
                            }
                        ?>
							
						</div>
					</div>
					<div class="col-lg-12 col-md-6 footer-row">
						<div class="footer-menu text-end">
                        <?php
                            wp_nav_menu(
                                array(
                                    'theme_location'  => 'footer_inner',
                                    'container'         =>  false,
                                )
                            );
                            ?>
						</div>
					</div>
					<div class="col-lg-12 col-md-6 footer-row border-top d-flex align-items-center justify-content-between">
						<div class="footer-menu">
                        <?php
                            if (is_active_sidebar('footer-sidebar-2')) {
                                dynamic_sidebar('footer-sidebar-2');
                            }
                        ?>
						</div>
						<div class="footer-menu">
                        <?php
                            wp_nav_menu(
                                array(
                                    'theme_location'  => 'footer',
                                    'container'         =>  false,
                                )
                            );
                            ?>
						</div>
					</div>
				</div>	
			</div>
		</div>
		<div class="footer-bottom">
			<div class="container">
				<div class="d-flex align-items-center justify-content-between">
					<div class="footer-logo">
					<?php
					$current_language = 'en';
				if ($current_language === 'en') {
                $english_first_logo_url = get_theme_mod('footer_first_logo'); 
				$first_logo_link = get_theme_mod('footer_first_link_control');
				if (!empty($english_first_logo_url)) {
                echo '<a href="' . esc_url($first_logo_link) . '"> <img src="' . esc_url($english_first_logo_url) . '" alt="Pomoc Techniczna dla Funduszy Europejskich - logo"></a>';
				}
				}
				else{

				}
				if ($current_language === 'en') {
                $english_second_logo = get_theme_mod('footer_second_logo'); 
				$second_logo_link = get_theme_mod('footer_second_link_control');
				if (!empty($english_second_logo)) {
                echo '<a href="' . esc_url($second_logo_link) . '"><img src="' . esc_url($english_second_logo) . '" alt="Rzeczpospolita Polska - logo"> </a>';
				}
				}
				else{

				}
				if ($current_language === 'en') {
					$english_Third_logo = get_theme_mod('footer_Third_logo'); 
					$Third_logo_link = get_theme_mod('footer_Third_link_control');
					if (!empty($english_Third_logo)) {
					echo '<a href="' . esc_url($Third_logo_link) . '"> <img src="' . esc_url($english_Third_logo) . '" alt="Dofinansowane Przez Unię Europejską - logo"> </a>';
					}
					}
					else{
	
					}
                ?>
					</div>
					<div class="footer-logo">
					<?php
				
				if ($current_language === 'en') {
                $english_Four_logo = get_theme_mod('footer_Four_logo'); 
				$fourth_logo_link = get_theme_mod('footer_Four_link_control');
				if (!empty($english_Four_logo)) {
                echo '<a href="' . esc_url($fourth_logo_link) . '"><img src="' . esc_url($english_Four_logo) . '" alt="centrum koordynacji projektów środowiskowych - logo"></a>';
				}
				}
				else{

				}
                ?>	
						
					</div>
				</div>
			</div>
		</div>
	</footer>
    <?php wp_footer(); ?>
</body>

</html>