<!DOCTYPE html>
<?php 
$site_color_mode = get_theme_mod('site_mode_setting', 'normal');
?>
<html <?php language_attributes(); ?> class="<?php echo $site_color_mode; ?>">

<head>
     <meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
   
</head>
<body <?php body_class(); ?>>

<div class="header-top">
		<a class="skip-link screen-reader-text" href="#content-full"><?php _e('przejdź do treści' , 'cwb') ?></a>
		<div class="container">
			<div class="d-block">
			<div class="header-logo d-flex align-items-center">
				<div class="logo-left">
                    <?php
					$current_language = 'en';
				if ($current_language === 'en') {
                $english_first_logo_url = get_theme_mod('first_logo'); 
				$first_logo_link = get_theme_mod('first_link_control');
				if (!empty($english_first_logo_url)) {
                echo '<a href="' . esc_url($first_logo_link) . '"> <img src="' . esc_url($english_first_logo_url) . '" alt="Pomoc Techniczna dla Funduszy Europejskich - logo"></a>';
				}
				}
				else{

				}
				if ($current_language === 'en') {
                $english_second_logo_url = get_theme_mod('second_logo'); 
				$second_logo_link = get_theme_mod('second_link_control');
				if (!empty($english_second_logo_url)) {
                echo '<a href="' . esc_url($second_logo_link) . '"><img src="' . esc_url($english_second_logo_url) . '" alt="Rzeczpospolita Polska - logo"> </a>';
				}
				}
				else{

				}?>
				</div>
               	<div class="logo-right">
				<?php if ($current_language === 'en') {
                $english_Third_logo_url = get_theme_mod('Third_logo'); 
				$Third_logo_link = get_theme_mod('Third_link_control');
				if (!empty($english_Third_logo_url)) {
                echo '<a href="' . esc_url($Third_logo_link) . '"> <img src="' . esc_url($english_Third_logo_url) . '" alt="Dofinansowane Przez Unię Europejską - logo"> </a>';
				}
				}
				else{

				}
				if ($current_language === 'en') {
                $english_Four_logo_url = get_theme_mod('Four_logo'); 
				$fourth_logo_link = get_theme_mod('Four_link_control');
				if (!empty($english_Four_logo_url)) {
                echo '<a href="' . esc_url($fourth_logo_link) . '"><img src="' . esc_url($english_Four_logo_url) . '" alt="centrum koordynacji projektów środowiskowych - logo"></a>';
				}
				}
				else{

				}
                ?>
				
					</div>
					<div class="mobilelogo">
					<?php
					$current_language = 'en';
				if ($current_language === 'en') {
                $english_polish_first_logo_url = get_theme_mod('polish_first_logo'); 
				$first_logo_link = get_theme_mod('first_link_control');
				if (!empty($english_polish_first_logo_url)) {
                echo '<a href="' . esc_url($first_logo_link) . '"> <img src="' . esc_url($english_polish_first_logo_url) . '" alt="Pomoc Techniczna dla Funduszy Europejskich - logo"></a>';
				}
				}
				else{

				}
				if ($current_language === 'en') {
                $english_polish_second_logo_url = get_theme_mod('polish_second_logo'); 
				$second_logo_link = get_theme_mod('second_link_control');
				if (!empty($english_polish_second_logo_url)) {
                echo '<a href="' . esc_url($second_logo_link) . '"><img src="' . esc_url($english_polish_second_logo_url) . '" alt="Rzeczpospolita Polska - logo"> </a>';
				}
				}
				else{

				}?>
				
				<?php if ($current_language === 'en') {
                $english_polish_Third_logo_url = get_theme_mod('polish_Third_logo'); 
				$Third_logo_link = get_theme_mod('Third_link_control');
				if (!empty($english_polish_Third_logo_url)) {
                echo '<a href="' . esc_url($Third_logo_link) . '"> <img src="' . esc_url($english_polish_Third_logo_url) . '" alt="Dofinansowane Przez Unię Europejską - logo"> </a>';
				}
				}
				else{

				}
				if ($current_language === 'en') {
                $english_polish_Four_logo_url = get_theme_mod('polish_Four_logo'); 
				$fourth_logo_link = get_theme_mod('Four_link_control');
				if (!empty($english_polish_Four_logo_url)) {
                echo '<a href="' . esc_url($fourth_logo_link) . '"><img src="' . esc_url($english_polish_Four_logo_url) . '" alt="centrum koordynacji projektów środowiskowych - logo"></a>';
				}
				}
				else{

				}
                ?>

					</div>	
				</div>
			</div>
		</div>	
	</div>
	<header class="main-header">
		<div class="container">
			<div class="main-header-inner d-flex align-items-center justify-content-between">
	            <div class="logo-sec white <?php echo $site_color_mode; ?>">
					<?php if($site_color_mode == 'xmas1'){ ?>
						<div class="xmas1 animation-container">
							<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 
							<dotlottie-player src="https://lottie.host/ee8a1646-02ff-44f8-ae94-f780859082e7/Fl5E66vJ8O.json" background="transparent" speed="1" style="width: 100px; height: 100px;" loop autoplay></dotlottie-player>
						</div>
					<?php } ?>
					<?php if($site_color_mode == 'xmas2'){ ?>
						<div class="xmas2 animation-container">
							<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
							<dotlottie-player src="https://lottie.host/4e84cd5e-4ab7-46b5-a7c1-1b50ae109a60/1Jv7C8aAX5.json" background="transparent" speed="1" style="width: 100px; height: 100px;" loop autoplay></dotlottie-player>
						</div>
					<?php } ?>
					<?php if($site_color_mode == 'easter1'){ ?>
						<div class="easter1 animation-container">
							<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
							<dotlottie-player src="https://lottie.host/875a78cb-64d2-41af-8c52-106fc4830873/fAMR7feVVm.json" background="transparent" speed="1" style="width: 100px; height: 100px;" loop autoplay></dotlottie-player>
						</div>
					<?php } ?>
					<?php if($site_color_mode == 'easter2'){ ?>
						<div class="easter2 animation-container">
							<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
							<dotlottie-player src="https://lottie.host/f712f100-d02c-4615-afa2-6c1fd90b82f6/xoMkhFtj4K.json" background="transparent" speed="1" style="width: 100px; height: 100px;" loop autoplay></dotlottie-player>
						</div>
					<?php } ?>
					<a href="<?php echo home_url(); ?>"><span class="h1"><?php  bloginfo('name') ?></span></a>
	            </div>
	            <div class="site-navigation justify-content-center align-items-center">
	            	<div class="main-menu-wrap">
					<?php 	
					wp_nav_menu(
						array(
							'theme_location' => 'primary',
							'container' => '',
							'menu_class' => 'd-flex align-items-center',
						)
                        );
						?>
		              	
					</div>
					<div class="header-right-sec d-flex align-items-center">
						<div class="header-btns d-flex">
							<div class="search-form-wrap">
								<a href="#"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/search-icon.svg" alt="<?php _e('szukaj', 'cwb') ?>"></a>
								<div class="search-form-sec">
									<form action="<?php  echo home_url()  ?>" >
									<?php 
                                        if(isset($_GET['s'])){
                                            $value = $_GET['s'];
                                        }
                                        else{
                                            $value = '';
                                        }
                                    ?>
								        <input class="form-control" type="search" name ='s' placeholder="Wpisz" aria-label="Wpisz szukaną frazę" value ="<?php echo $value ?>">
								        <button class="btn-search" type="submit"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/search-icon.svg" alt="<?php _e('szukaj', 'cwb') ?>"></button>
								    </form>
							    </div>
							</div>
							<a href="#"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/hand-group.svg" alt="<?php _e('search icon logo', 'cwb') ?>"></a>
						</div>		
						<div class="language-btn">
							<?php 	

							wp_nav_menu(
								array(
									'theme_location' => 'language_switcher',
									'container' => '',
									'menu_class' => '',
								)
								);
								?>
					    </div>
					</div>
				    
	            </div>
	            <div class="toggle-button">
	                <span class="line one"></span>
	                <span class="line two"></span>
	                <span class="line three"></span>
              	</div>
	            <div class="mobile-menu-wrap">
	            	<div class="mobile-menu-wrap-inner">
		            	<div class="search-form-wrap">
							<form class="search-form">
						        <input class="form-control" type="search" placeholder="Wpisz" aria-label="Wpisz szukaną frazę">
						        <button class="btn-search" type="submit"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/search-icon.svg" alt="<?php _e('szukaj', 'cwb') ?>"></button>
						    </form>
					    </div>
					    <div class="language-header-btn d-flex align-items-center justify-content-center">
					    	<div class="header-btns">
								<a href="#"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/hand-group-2.svg" alt="<?php _e('logo', 'cwb') ?>"></a>
							</div>
							<div class="language-btn">
							<?php 	

							wp_nav_menu(
								array(
									'theme_location' => 'language_switcher',
									'container' => '',
									'menu_class' => '',
								)
								);
								?>
						    </div>
					    </div>
					    <div class="mobile-menu">
						<?php 	

							wp_nav_menu(
								array(
									'theme_location' => 'primary',
									'container' => '',
									'menu_class' => '',
								)
								);
								?>
			              	
						</div>
					</div>	
	            </div>
	        </div>
		</div>
	</header>
	<div id="content-full"></div>