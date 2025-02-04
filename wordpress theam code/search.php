<?php
/**
 **  Template Name: Search Page
 */
get_header();


?>
<section class="sub-page-header light-bg">
		<div class="container">
		   <div class="row">
				<?php $featureimage = get_the_post_thumbnail(); ?>
				<div class="col-xl-12">
					<div class="header-content">
					<?php custom_breadcrumbs(); ?>
						<div class="page-title d-flex">
							
							<h1><?php echo __('Wyniki wyszukiwania' ,'cwb').' “' . get_search_query() . '”'; ?></h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="block-row sub-page-wrap">
		<div class="container">
			<div class="row sub-page-row">
				<div class="col-xl-9">
					<div class="web-form-wrap filter-form-sec light-bg">
						<div class="web-form">
							<form class="form-inline" action="<?php echo home_url(); ?>">
								<div class="row">
									<div class="col-lg-10">
										<div class="row">
											<?php 
                                        if(isset($_GET['s'])){
                                            $value = $_GET['s'];
                                        }
                                        else{
                                            $value = '';
                                        }
                                        ?>
											<div class="col-lg-8">
												<div class="form-group">
												<label for="name"><?php _e('Wyszukiwarka', 'cwb') ?></label>
												<input type="text" name ='s' class="form-control" id="name" value ="<?php echo $value ?>" placeholder="<?php _e('Wpisz nazwę', 'cwb') ?>">
												</div>
											</div>
											<div class="col-lg-4">
												<div class="form-group">
													<label for="custom-js-filter"><?php _e('Sortuj', 'cwb') ?></label>
													<select class="form-select" id="custom-js-filter" name="sort">
														<option value="desc" <?php if (isset($_GET['sort']) && $_GET['sort'] === 'desc')
															echo 'selected'; ?>><?php _e('Od najnowszych', 'cwb') ?></option>
														<option value="asc" <?php if (isset($_GET['sort']) && $_GET['sort'] === 'asc')
															echo 'selected'; ?>><?php _e('Od najstarszych', 'cwb') ?></option>
													</select>
												</div>
												
											</div>
										</div>
									</div>
									<div class="col-lg-2">
										<div class="row">
											<div class="col-lg-12">
												<div class="web-btn form-btn">
													<button type="submit" class="btn btn-primary"><?php _e('szukaj', 'cwb') ?></button>
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
						if (have_posts()) {
							while (have_posts()) {
								the_post(); ?>
								<div class="col-lg-6 col-md-6">
									<div class="article-card card-style-2">
										
										<?php if (has_post_thumbnail()) { ?>
											<div class="article-featured-img">
												<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('medium', array('alt' => get_the_title())); ?></a>
											</div>
										<?php } ?>
										
										<div class="article-content">
											<h3><?php the_title(); ?></h3>
											<p><?php echo get_the_excerpt(); ?></p>
											<div class="article-metasearch d-flex align-items-center justify-content-between">
												<div class="web-btn text-end">
													<a href="<?php the_permalink(); ?>" class="btn btn-primary"><?php _e('Czytaj dalej' , 'cwb'); ?></a>
												</div>
											</div>
										</div>
									</div>
								</div>
						<?php 
						
					}

					echo ' <div class="pagination-wrap search-pagination">';
					echo ' <div class="pagination-inner" role="navigation">';
					the_posts_pagination(array(
						'mid_size'  => 2,
						'prev_text' => __('&#129120;', 'cwb'),
						'next_text' => __('&#129122;', 'cwb'),
					));
					echo '</div></div>';
						}
						else { ?>
								<p class="h5">
									<strong><?php _e('Brak wyników wyszukiwania.' , 'cwb'); ?></strong>
								</p>
								<p class="h5">
									<strong><?php _e('Spróbuj ponownie.' , 'cwb'); ?></strong>
								</p>
							
						<?php } ?>
							
						</div>
					</div>

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
get_footer();
?>
