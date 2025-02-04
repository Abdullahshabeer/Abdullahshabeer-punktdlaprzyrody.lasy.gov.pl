<?php get_header(); ?>
<section class="block-row sub-page-wrap">
		<div class="container">
			<div class="error-page-wrap">
				<div class="image-404 text-center">
					<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/404.svg" alt="<?php _e('error-404', 'cwb') ?>">
					
				</div>
				<div class="error-page-content text-center">
					<div class="web-heading">
						<h1><?php _e('Strona nie została znaleziona', 'cwb') ?></h1>
					</div>
					<p> <?php _e('Wróć na stronę główną lub skorzystaj z wyszukiwarki na górze ekranu.', 'cwb') ?></p>
					<div class="web-btn">
	                    <a href="<?php  echo home_url()  ?>" class="btn btn-primary"><?php _e('Strona główna', 'cwb') ?></a>
	                </div>
				</div>
			</div>	
		</div>
	</section>
<?php get_footer(); ?>