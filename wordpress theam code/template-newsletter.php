<?php
/**
 **  Template Name: Newsletter subcription
 */
get_header();

// Start the Loop.
if (have_posts()) {
    while (have_posts()) {
        the_post(); ?>

<section class="sub-page-header light-bg">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="header-content">
                    <?php custom_breadcrumbs(); ?>
						<div class="page-title d-flex">
                        <h1><?php the_title() ?></h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="block-row sub-page-wrap">
		<div class="container">
			<div class="newsletter-wrap">
				<div class="web-form-wrap light-bg">
					<div class="row align-items-center justify-content-between">
						<div class="col-lg-7">

                        <?php
                            if (is_active_sidebar('footer-sidebar-3')) {
                                dynamic_sidebar('footer-sidebar-3');
                            }
                        ?>
							
						</div>
						<div class="col-lg-5">
							<div class="block-img">
                            <?php the_post_thumbnail(); ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>


<?php
        }
    }

get_footer()
?>