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
								echo '<img src="' . esc_url($page_icons) . '" alt="page icon" />';
							}

							$start_date = get_field('start_date');
						
						$variable = ''; // Initialize the variable

						if (isset($start_date)) {
							$date_time_object = new DateTime($start_date);
							$date = $date_time_object->format('d.m.Y');
							$time = $date_time_object->format('h:i A');

							$current_date = date('d.m.Y');
							if (strtotime($date) < strtotime($current_date)) { 
								$variable = ' - <span class="changecolor"> ' . esc_attr__('zrealizowane', 'cwb') . ' </span>';
							}
							
						}
							?>
							<h1><?php echo esc_html(get_the_title()) . ' ' . $variable ; ?></h1>
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
					the_content(); 
					
					$Data 			=  	get_field_object('start_date');
					$Godzina   		=   get_field_object('godzina');
					$Miejsce  		= 	get_field_object('set_location');
					$Adres  		= 	get_field_object('adres');
					$Limit_miejsc  	= 	get_field_object('limit');
					$start_date 	=  	get_field('start_date');

					$date_time_object = new DateTime($start_date);
					$date 			= $date_time_object->format('d.m.Y'); 
					$time 			= $date_time_object->format('h:i A');

					$show_booking_form 	=	get_field('show_booking_form');
					if($show_booking_form){
					$current_date = date('d.m.Y');
					if (strtotime($date) > strtotime($current_date)){ ?>
						<div class="signup-form-wrap">
							<div class="web-heading heading-divider">
								<h2><?php _e('Zapisz się na szkolenie!' , 'cwb'); ?></h2>
							</div>
							<div class="training-lists-detail">
								<ul>
									<?php if(get_field('temat_szkolenia')){ ?>
										<li>
											<span><?php _e('Temat szkolenia' , 'cwb'); ?></span>
											<span><b><?php the_field('temat_szkolenia'); ?></b></span>
										</li>
									<?php } ?>
									<?php if($date){ ?>
									<li>
										<span><?php _e('Data' , 'cwb'); ?></span>
										<span><b><?php echo $date ?></b></span>
									</li>
									<?php } ?>
									<?php if(get_field('set_location')){ ?>
										<li>
											<span><?php echo $Miejsce['label']; ?></span>
											<span><b><?php echo get_field('set_location'); ?></b></span>
										</li>
									<?php } ?>
								</ul>
							</div>
							<p><?php _e('Na podany e-mail/telefon zostanie przesłane potwierdzenie zapisu na szkolenie. ' , 'cwb') ?></p>
							<p><?php _e('W przypadku rezygnacji prosimy o niezwłoczne skontaktowanie się z PdP.' , 'cwb') ?></p>
							<div class="web-form-wrap">
								<div class="web-form">
									<form id="event-booking-form" novalidate="">
										<input type="hidden" name="training_id" value="<?php echo get_the_ID(); ?>">
										<div class="row">
											<div class="col-md-6">
												<div class="form-group">
													<label for="name"><?php _e('Imię' , 'cwb'); ?> <span class="required">*</span></label>
													<input type="text" class="form-control" id="name" name="name" placeholder="<?php _e('Wpisz' , 'cwb'); ?>" required="">
													<div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group">
													<label for="nazwisko"><?php _e('Nazwisko', 'cwb'); ?> <span class="required">*</span></label>
													<input type="text" class="form-control" name="nazwisko" id="nazwisko" placeholder="<?php _e('Wpisz', 'cwb'); ?>" required="">
													<div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>
												</div>
											</div>

											<div class="col-md-6">
												<div class="form-group">
													<label for="email"><?php _e('E-mail', 'cwb'); ?> <span class="required">*</span></label>
													<input type="email" class="form-control" id="email" name="email" placeholder="<?php _e('Wpisz', 'cwb'); ?>" required="">
													<div class="invalid-feedback"><?php _e('Proszę o prawidłowy adres e-mail!', 'cwb'); ?></div>
												</div>
											</div>

											<div class="col-md-6">
												<div class="form-group">
													<label for="telefon"><?php _e('Telefon', 'cwb'); ?> <span class="required">*</span></label>
													<input type="text" class="form-control" id="telefon" name="telefon" placeholder="<?php _e('Wpisz', 'cwb'); ?>" required="">
													<div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>
												</div>
											</div>

											<div class="col-md-12">
												<div class="form-group">
													<label for="nazwa-instytucji"><?php _e('Nazwa instytucji', 'cwb'); ?> <span class="required">*</span></label>
													<input type="text" class="form-control" name="nazwa-instytucji" id="nazwa-instytucji" placeholder="<?php _e('Wpisz', 'cwb'); ?>" required="">
													<div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!', 'cwb'); ?></div>
												</div>
											</div>

											<div class="col-md-12">
												<div class="form-group">
													<label for="applicant-beneficiary"><?php _e('Wnioskodawca czy Beneficjent', 'cwb'); ?> <span class="required">*</span></label>
													<select class="form-select" id="applicant-beneficiary" required="" name="applicant-beneficiary">
														<option selected disabled value=""><?php _e('Wybierz', 'cwb'); ?></option>
														<option value="Wnioskodawca"><?php _e('Wnioskodawca', 'cwb'); ?></option>
														<option value="Beneficjen"><?php _e('Beneficjent', 'cwb'); ?></option>
													</select>
													<div class="invalid-feedback"><?php _e('Proszę wybrać Temat naboru!', 'cwb'); ?></div>
												</div>
											</div>

											<div class="col-md-12">
												<div class="form-group">
													<label for="food-preferences"><?php _e('Dodatkowe informacje (np. preferencje żywieniowe, szczególne potrzeby)', 'cwb'); ?> <span class="required">*</span></label>
													<input type="text" class="form-control" placeholder="<?php _e('Wpisz', 'cwb'); ?>" name="Preferencje">
													<div class="invalid-feedback"><?php _e('Proszę wybrać Temat naboru!', 'cwb'); ?></div>
												</div>
											</div>

											<div class="col-md-12">
												<div class="form-group">
													<div class="form-list">
														<ul>
															<li><?php _e('Osoby ze szczególnymi potrzebami proszone są o wcześniejszy kontakt z pracownikiem PdP.', 'cwb'); ?></li>
															<li><?php _e('Budynki i sale, w których przeprowadzamy szkolenia są dostosowane do osób z niepełnosprawnościami.', 'cwb'); ?></li>
														</ul>
													</div>
												</div>
											</div>

											<div class="col-md-12">
												<div class="form-group">
													<div class="form-check">
														<input class="form-check-input" type="checkbox" value="" id="checkbox-1" required="">
														<label class="form-check-label" for="checkbox-1">
															<?php _e('Wyrażam zgodę na przetwarzanie moich danych osobowych...', 'cwb'); ?> <span class="required">*</span>
															<div class="extra-content" style="display: none;">
																<p><?php _e('Zgodnie z art. 13 ust. 1 i ust. 2 ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r. informujemy, że:', 'cwb'); ?></p>
																<p><?php _e('Zgodnie z art. 13 ust. 1 i ust. 2 ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r. informujemy, że:', 'cwb'); ?></p>
																<p><?php _e('· Administratorem danych jest Centrum Koordynacji Projektów Środowiskowych, z siedzibą w Warszawie (01-217) przy ul. Kolejowej.', 'cwb'); ?></p>
																<p><?php _e('· Administrator wyznaczył inspektora ochrony danych, z którym można skontaktować się poprzez e-mail: ', 'cwb'); ?><a href="mailto:centrum@ckps.lasy.gov.pl">centrum@ckps.lasy.gov.pl</a></p>
																<p><?php _e('· Dane osobowe nie będą udostępniane innym podmiotom. Dane osobowe mogą zostać ujawnione właściwym organom, upoważnionym zgodnie z obowiązującym prawem.', 'cwb'); ?></p>
																<p><?php _e('· Podanie danych osobowych jest dobrowolne, a osobie, która wyraża zgodę na przetwarzanie danych osobowych przysługuje prawo do ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem.', 'cwb'); ?></p>
																<p><?php _e('· Wyrażenie zgody może zostać cofnięte w każdym czasie, lecz bez wpływu na zgodność z prawem przetwarzania przed ich cofnięciem; cofnięcie zgody uniemożliwi dalsze przetwarzanie danych zgodnie ze złożonym wcześniej formularzem.', 'cwb'); ?></p>
																<p><?php _e('· Osobie, która wyraża zgodę na przetwarzanie danych osobowych przysługuje prawo wniesienia skargi do organu nadzorczego w sytuacji, gdy przetwarzanie danych osobowych narusza przepisy ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r.', 'cwb'); ?></p>
																<p><?php _e('Zapoznałem/łam się z Polityką Prywatności', 'cwb'); ?> 
																<a href="https://www.ckps.lasy.gov.pl/polityka-prywatnosci">
																	(http://www.punktdlaprzyrody.lasy.gov.pl/polityka-prywatnosci)
																</a>
																<?php _e('i akceptuję ją. Moje dane osobowe przekazywane są przeze mnie dobrowolnie. Zostałem/łam poinformowany/na o przysługującym mi prawie dostępu do treści moich danych oraz ich poprawiania.', 'cwb'); ?> 
																<span class="required">*</span></p>

															</div>
														</label>
													</div>
													<div class="checkbox-toggle text-end"><a href="#"><?php _e('Rozwiń', 'cwb'); ?></a></div>
												</div>
											</div>

											<div class="col-md-12">
												<div class="web-btn form-btn">
													<button type="submit" class="btn btn-primary"><?php _e('ZAPISZ SIĘ', 'cwb'); ?></button>
													<div class="loading-icon-container"><span class="css-loader"></span></div>
												</div>
											</div>

										</div>
									</form>
									<div  id="success-message" style="display: none">
										<div class="form-message d-flex align-items-center success-message">
											<div class="icon">
												<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
													<rect width="26" height="26" rx="13" fill="#005023"></rect>
													<path d="M6.5 12.7L11.375 17.5L19.5 9.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
												</svg>
											</div>
											<?php _e('Gratulacje!<br> Jesteś na liście szkolenia “' . get_field('temat_szkolenia') . '”. Sprawdź swoją pocztę e-mail, aby potwierdzić chęć udziału w szkoleniu.', 'cwb'); ?>

										</div>
									</div>
									<div id="warning-message" style="display: none">
										<div class="form-message d-flex align-items-center warning-message" >
											<div class="icon">
												<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
													<rect width="26" height="26" rx="13" fill="#C25100"></rect>
													<path d="M6.5 12.7L11.375 17.5L19.5 9.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
												</svg>
											</div>
											<?php _e('Jesteś na liście rezerwowej szkolenia “' . get_field('temat_szkolenia') . '”. Poinformujemy Cię, jeśli zwolni się miejsce.', 'cwb'); ?>
										</div>
									</div>
									<div  id="error-message" style="display: none">
										<div class="form-message d-flex align-items-center error-message">
											<div class="icon">
												<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
													<rect width="26" height="26" rx="13" fill="#D40000"></rect>
													<path d="M8 18L18 8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
													<path d="M8 8L18 18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
												</svg>
											</div>
											<?php _e('Na wybranym szkoleniu nie ma już miejsc.<br> Zapisz się na inne szkolenie lub spróbuj później.', 'cwb'); ?>
										</div>
									</div>

								</div>
							</div>
						</div>
					<?php } ?>
					<?php  } ?>
					<?php
						$permalink = get_field('rate_the_training_link');
						if (!empty($permalink)) {
							echo '<a href="' . esc_url($permalink . '?post_id=' . get_the_ID()) . '">' . esc_html(get_field('text')) . '</a>';
						} else {
							echo '<p>' . esc_html(get_field('text')) . '</p>';
						}
						?>
                </div>
		
				<div class="col-xl-3 d-none d-xl-block">
				    <div class="sidebar">
						<div class="web-heading">
							<h2><?php echo  __('Informacje o szkoleniu' , 'cwb')?></h2>
						</div>
                        
						<div class="sidebar-list">
                            <ul>
                            <?php
                                ?>
								<?php if($start_date){ ?>
									<li>
									
										<span><?php _e('Data' , 'cwb'); ?></span>
										<span><b><?php echo $date; ?></b></span>
									</li>
								 <?php } ?>
								 <?php if($start_date){ ?>
									<li>
										
										<span><?php _e('Godzina' , 'cwb'); ?></span>
										<span><b><?php echo $time; ?></b></span>
									</li>
								 <?php } ?>
								 <?php if(get_field('set_location')){ ?>
									<li>
										<span><?php echo $Miejsce['label']; ?></span>
										<span><b><?php echo get_field('set_location'); ?></b></span>
									</li>
								 <?php } ?>
								 <?php if(get_field('adres')){ ?>
								 <li>
                                    <span><?php echo $Adres['label']; ?></span>
                                    <span><b><?php echo get_field('adres'); ?></b></span>
                                 </li>
								 <?php } ?>
								 <?php if(get_field('limit')){ ?>
								 <li>
                                    <span><?php echo $Limit_miejsc['label']; ?></span>
                                    <span>
										<?php
										$current_post_id = get_the_ID();
										$training_bookings_count = new WP_Query(array(
											'post_type' => 'training_bookings',
											'post_status' 	=> 'publish',
											'meta_query' => array(
												array(
													'key' 		=> 'training_id',
													'value' 	=> $current_post_id,
													'compare' 	=> '=',
												),
											),
											'posts_per_page' 	=> -1,  // Retrieve all matching posts
										));

										// Display the count
										echo '<span><b>' . $training_bookings_count->found_posts . '/' . get_field('limit') . '</b></span>';

										// Reset post data
										wp_reset_postdata();
										?>
									</span>
                                 </li>
								 <?php } ?>
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