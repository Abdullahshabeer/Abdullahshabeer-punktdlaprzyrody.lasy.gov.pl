<?php
/**
 **  Template Name: Wyszukiwarka partnerów
 */
get_header();
?>
<?php
// Start the Loop.
if (have_posts()) {
    while (have_posts()) {
        the_post(); $featureimage = get_the_post_thumbnail();
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
                                    echo '<img src="' . esc_url($page_icon) . '" alt="page icon" />';
                                    }
                                } else {
                                    echo '<img src="' . esc_url($page_icons) . '" alt="parent icon" />';
                                }
                        }else{
                            if (!empty($default_page_icon)) {
                                echo '<img src="' . esc_url($default_page_icon) . '" alt="default icon" />';
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
                <div class="web-form-wrap light-bg">
						<div class="web-heading collapse-heading" data-bs-toggle="collapse" href="#filter-collapse" role="button" aria-expanded="true" aria-controls="filter-collapse">
							<h3>Filtry</h3>
						</div>
                        <?php 

                            
                            $selected_project_implement          =   isset($_GET['project-implement']) ? sanitize_text_field($_GET['project-implement']) : '';
                            $selected_org_legal          =   isset($_GET['org-legal']) ? sanitize_text_field($_GET['org-legal']) : '';
                            $selected_activities_planned         =   isset($_GET['activities-planned']) ? sanitize_text_field($_GET['activities-planned']) : '';
                            $selected_planned_implemented         =   isset($_GET['planned-implemented']) ? sanitize_text_field($_GET['planned-implemented']) : '';
                            $selected_contribution         =   isset($_GET['contribution']) ? sanitize_text_field($_GET['contribution']) : '';
                            $selected_assumed_value        =   isset($_GET['assumed-value']) ? sanitize_text_field($_GET['assumed-value']) : '';
                            $selected_have_experience        =   isset($_GET['have-experience']) ? sanitize_text_field($_GET['have-experience']) : '';
                        ?>
						<div class="web-form collapse show" id="filter-collapse">
							<form>
								<div class="row">
                                <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="project-implement">Poszukujesz do realizacji projektu</label>
                                            <select class="form-select" id="project-implement" name="project-implement">
                                                <option value="" selected>Wybierz</option>
                                                <option value="Partner"<?php echo (isset($_GET['project-implement']) && $_GET['project-implement'] === 'Partner') ? ' selected' : ''; ?>>Partner</option>
                                                <option value="podmiot upoważniony"<?php echo (isset($_GET['project-implement']) && $_GET['project-implement'] === 'podmiot upoważniony') ? ' selected' : ''; ?>>podmiot upoważniony</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="org-legal">Forma organizacyjno - prawna</label>
                                            <select class="form-select" id="org-legal" name="org-legal">
                                                <option value="" selected>Wybierz</option>
                                                <option value="Generalna Dyrekcja Ochrony Środowiska"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Generalna Dyrekcja Ochrony Środowiska') ? ' selected' : ''; ?>>Generalna Dyrekcja Ochrony Środowiska</option>
                                                <option value="Regionalna Dyrekcja Ochrony Środowiska"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Regionalna Dyrekcja Ochrony Środowiska') ? ' selected' : ''; ?>>Regionalna Dyrekcja Ochrony Środowiska</option>
                                                <option value="Państwowe Gospodarstwo Leśne Lasy Państwowe"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Państwowe Gospodarstwo Leśne Lasy Państwowe') ? ' selected' : ''; ?>>Państwowe Gospodarstwo Leśne Lasy Państwowe</option>
                                                <option value="Park Narodowy"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Park Narodowy') ? ' selected' : ''; ?>>Park Narodowy</option>
                                                <option value="Jednostka Administracji Rządowej"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Jednostka Administracji Rządowej') ? ' selected' : ''; ?>>Jednostka Administracji Rządowej</option>
                                                <option value="Jednostka Samorządu Terytorialnego i jej związki oraz jednostki organizacyjne działające w ich imieniu"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Jednostka Samorządu Terytorialnego i jej związki oraz jednostki organizacyjne działające w ich imieniu') ? ' selected' : ''; ?>>Jednostka Samorządu Terytorialnego i jej związki oraz jednostki organizacyjne działające w ich imieniu</option>
                                                <option value="Jednostka Naukowo - Badawcza"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Jednostka Naukowo - Badawcza') ? ' selected' : ''; ?>>Jednostka Naukowo - Badawcza</option>
                                                <option value="Uczelnia Wyższa"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Uczelnia Wyższa') ? ' selected' : ''; ?>>Uczelnia Wyższa</option>
                                                <option value="Pozarządowa Organizacja Ekologiczna"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Pozarządowa Organizacja Ekologiczna') ? ' selected' : ''; ?>>Pozarządowa Organizacja Ekologiczna</option>
                                                <option value="Urząd Morski"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Urząd Morski') ? ' selected' : ''; ?>>Urząd Morski</option>
                                                <option value="Biuro Urządzania Lasu i Geodezji Leśnej"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Biuro Urządzania Lasu i Geodezji Leśnej') ? ' selected' : ''; ?>>Biuro Urządzania Lasu i Geodezji Leśnej</option>
                                                <option value="Główny Inspektorat Rybołówstwa Morskiego"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Główny Inspektorat Rybołówstwa Morskiego') ? ' selected' : ''; ?>>Główny Inspektorat Rybołówstwa Morskiego</option>
                                                <option value="Zarządca nieruchomości będących własnością Skarbu Państwa"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Zarządca nieruchomości będących własnością Skarbu Państwa') ? ' selected' : ''; ?>>Zarządca nieruchomości będących własnością Skarbu Państwa</option>
                                                <option value="Polski Związek Łowiecki"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Polski Związek Łowiecki') ? ' selected' : ''; ?>>Polski Związek Łowiecki</option>
                                                <option value="Polski Związek Wędkarski"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Polski Związek Wędkarski') ? ' selected' : ''; ?>>Polski Związek Wędkarski</option>
                                                <option value="Państwowa Inspekcja Ochrony Roślin"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Państwowa Inspekcja Ochrony Roślin') ? ' selected' : ''; ?>>Państwowa Inspekcja Ochrony Roślin</option>
                                                <option value="Stowarzyszenie ogrodowe"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Stowarzyszenie ogrodowe') ? ' selected' : ''; ?>>Stowarzyszenie ogrodowe</option>
                                                <option value="Główny Inspektorat Ochrony Środowiska"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Główny Inspektorat Ochrony Środowiska') ? ' selected' : ''; ?>>Główny Inspektorat Ochrony Środowiska</option>
                                                <option value="Ministerstwo Klimatu i Środowiska i jednostki podległe"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Ministerstwo Klimatu i Środowiska i jednostki podległe') ? ' selected' : ''; ?>>Ministerstwo Klimatu i Środowiska i jednostki podległe</option>
                                                <option value="Inny"<?php echo (isset($_GET['org-legal']) && $_GET['org-legal'] === 'Inny') ? ' selected' : ''; ?>>Inny</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="activities-planned">Obszar, na którym planowane są działania</label>
                                            <select class="form-select" id="activities-planned" name="activities-planned">
                                                <option value="" selected>Wybierz</option>
                                                <option value="Cała polska"<?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Cała polska') ? ' selected' : ''; ?>>Cała polska</option>
                                                <option value="Województwo dolnośląskie"<?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo dolnośląskie') ? ' selected' : ''; ?>>Województwo dolnośląskie</option>
												<option value="Województwo   kujawsko-pomorskie"<?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo   kujawsko-pomorskie') ? ' selected' : ''; ?>>Województwo   kujawsko-pomorskie</option>
                                               
												<option value="Województwo   lubelskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo   lubelskie') ? ' selected' : ''; ?>>Województwo   lubelskie</option>
												<option value="Województwo   lubuskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo   lubuskie') ? ' selected' : ''; ?>>Województwo   lubuskie</option>
												<option value="Województwo   łódzkie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo   łódzkie') ? ' selected' : ''; ?>>Województwo   łódzkie</option>
												<option value="Województwo małopolskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo małopolskie') ? ' selected' : ''; ?>>Województwo małopolskie</option>
												<option value="Województwo  mazowieckie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo  mazowieckie') ? ' selected' : ''; ?>>Województwo  mazowieckie</option>
												<option value="Województwo  opolskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo  opolskie') ? ' selected' : ''; ?>>Województwo  opolskie</option>
												<option value="Województwo podkarpackie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo podkarpackie') ? ' selected' : ''; ?>>Województwo podkarpackie</option>
												<option value="Województwo podlaskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo podlaskie') ? ' selected' : ''; ?>>Województwo podlaskie</option>
												<option value="Województwo pomorskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo pomorskie') ? ' selected' : ''; ?>>Województwo pomorskie</option>
												<option value="Województwo śląskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo śląskie') ? ' selected' : ''; ?>>Województwo śląskie</option>
												<option value="Województwo  świętokrzyskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo  świętokrzyskie') ? ' selected' : ''; ?>>Województwo  świętokrzyskie</option>
												<option value="Województwo warmińsko-mazurskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo warmińsko-mazurskie') ? ' selected' : ''; ?>>Województwo warmińsko-mazurskie</option>
												<option value="Województwo  wielkopolskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo  wielkopolskie') ? ' selected' : ''; ?>>Województwo  wielkopolskie</option>
												<option value="Województwo zachodniopomorskie" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo zachodniopomorskie') ? ' selected' : ''; ?>>Województwo zachodniopomorskie</option>
												<option value="Województwo: lubelskie, podlaskie, podkarpackie, świętokrzyskie, warmińsko-mazurskie, mazowieckie bez Warszawy i otaczających powiatów" <?php echo (isset($_GET['activities-planned']) && $_GET['activities-planned'] === 'Województwo: lubelskie, podlaskie, podkarpackie, świętokrzyskie, warmińsko-mazurskie, mazowieckie bez Warszawy i otaczających powiatów') ? ' selected' : ''; ?>>Województwo: lubelskie, podlaskie, podkarpackie, świętokrzyskie, warmińsko-mazurskie, mazowieckie bez Warszawy i otaczających powiatów</option>
												
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label for="activities-planned-implemented">Działania planowane do realizacji</label>
											<select class="form-select" id="activities-planned-implemented" name="planned-implemented">
											  	<option value="" selected>Wybierz</option>
											  	<option value="Ochrona in‐situ lub ex‐situ zagrożonych gatunków i siedlisk przyrodniczych" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Ochrona in‐situ lub ex‐situ zagrożonych gatunków i siedlisk przyrodniczych') ? ' selected' : ''; ?>>Ochrona in‐situ lub ex‐situ zagrożonych gatunków i siedlisk przyrodniczych</option>
											  	<option value="Opracowanie dokumentów planistycznych dla obszarów chronionych" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Opracowanie dokumentów planistycznych dla obszarów chronionych') ? ' selected' : ''; ?>>Opracowanie dokumentów planistycznych dla obszarów chronionych</option>
											  	
												  <option value="Rozwój zdolności i usprawnienie zarządzania obszarami chronionymi" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Rozwój zdolności i usprawnienie zarządzania obszarami chronionymi') ? ' selected' : ''; ?>>Rozwój zdolności i usprawnienie zarządzania obszarami chronionymi</option>
												  <option value="Zielona i niebieska infrastruktura wraz ze stosownym zapleczem" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Zielona i niebieska infrastruktura wraz ze stosownym zapleczem') ? ' selected' : ''; ?> >Zielona i niebieska infrastruktura wraz ze stosownym zapleczem</option>
												  <option value="Zielona i niebieska infrastruktura wraz ze stosownym zapleczem ‐„odbetonowanie” terenów miejskich" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Zielona i niebieska infrastruktura wraz ze stosownym zapleczem ‐„odbetonowanie” terenów miejskich') ? ' selected' : ''; ?>>Zielona i niebieska infrastruktura wraz ze stosownym zapleczem ‐„odbetonowanie” terenów miejskich</option>
												  <option value="Rekultywacja i remediacja terenów zdegradowanych działalnością gospodarczą" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Rekultywacja i remediacja terenów zdegradowanych działalnością gospodarczą') ? ' selected' : ''; ?>>Rekultywacja i remediacja terenów zdegradowanych działalnością gospodarczą</option>
												  <option value="Edukacja w zakresie ochrony przyrody" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Edukacja w zakresie ochrony przyrody') ? ' selected' : ''; ?>>Edukacja w zakresie ochrony przyrody</option>
												  <option value="Czynna ochrona przyrody" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Czynna ochrona przyrody') ? ' selected' : ''; ?>>Czynna ochrona przyrody</option>
												  <option value="Infrastruktura turystyczna ukierunkowująca ruch turystyczny, w celu zmniejszenia antropopresji na obszary chronione" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Infrastruktura turystyczna ukierunkowująca ruch turystyczny, w celu zmniejszenia antropopresji na obszary chronione') ? ' selected' : ''; ?>>Infrastruktura turystyczna ukierunkowująca ruch turystyczny, w celu zmniejszenia antropopresji na obszary chronione</option>
												  <option value="Infrastruktura bezpośrednio służąca edukacji: budowa lub rozbudowa bazy edukacyjnej, wraz z wyposażeniem, w celu prowadzenia działalności dydaktycznej w parkach narodowych w makroregionie" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Infrastruktura bezpośrednio służąca edukacji: budowa lub rozbudowa bazy edukacyjnej, wraz z wyposażeniem, w celu prowadzenia działalności dydaktycznej w parkach narodowych w makroregionie') ? ' selected' : ''; ?>>Infrastruktura bezpośrednio służąca edukacji: budowa lub rozbudowa bazy edukacyjnej, wraz z wyposażeniem, w celu prowadzenia działalności dydaktycznej w parkach narodowych w makroregionie</option>
												  <option value="Podnoszenie świadomości ekologicznej i promowania postaw proekologicznych lokalnych społeczności" <?php echo (isset($_GET['planned-implemented']) && $_GET['planned-implemented'] === 'Podnoszenie świadomości ekologicznej i promowania postaw proekologicznych lokalnych społeczności') ? ' selected' : ''; ?>>Podnoszenie świadomości ekologicznej i promowania postaw proekologicznych lokalnych społeczności</option>


											</select>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label for="contribution">Wkład do projektu</label>
											<select class="form-select" id="contribution" name="contribution">
											  	<option value="" selected>Wybierz</option>
											  	<option value="Finansowy" <?php echo (isset($_GET['contribution']) && $_GET['contribution'] === 'Finansowy') ? ' selected' : ''; ?> >Finansowy</option>
											  	<option value="Merytoryczny" <?php echo (isset($_GET['contribution']) && $_GET['contribution'] === 'Merytoryczny') ? ' selected' : ''; ?>>Merytoryczny</option>
											  	<option value="Finansowo - merytoryczny" <?php echo (isset($_GET['contribution']) && $_GET['contribution'] === 'Finansowo - merytoryczny') ? ' selected' : ''; ?>>Finansowo - merytoryczny</option>
                                                <option value="Osobowy" <?php echo (isset($_GET['contribution']) && $_GET['contribution'] === 'Osobowy') ? ' selected' : ''; ?>>Osobowy</option>
                                                <option value="Finansowo - merytoryczny" <?php echo (isset($_GET['contribution']) && $_GET['contribution'] === 'CRzeczowy') ? ' selected' : ''; ?>>Rzeczowy</option>
                                                <option value="Inny" <?php echo (isset($_GET['contribution']) && $_GET['contribution'] === 'Inny') ? ' selected' : ''; ?>>Inny</option>
											</select>
										</div>
									</div>
                                    <div class="col-md-6">
										<div class="form-group">
											<label for="have-experience">Czy partner ma doświadczenie w realizacji projektów z innymi podmiotami?</label>
											<select class="form-select" id="have-experience" name="have-experience">
											  	<option value="" selected>Wybierz</option>
											  	<option value="Tak, POIiŚ" <?php echo (isset($_GET['have-experience']) && $_GET['have-experience'] === 'Tak, POIiŚ') ? ' selected' : ''; ?>>Tak, POIiŚ</option>
											  	<option value="Tak, dotacje krajowe (NFOŚiGW, WFOŚiGW)" <?php echo (isset($_GET['have-experience']) && $_GET['have-experience'] === 'Tak, dotacje krajowe (NFOŚiGW, WFOŚiGW)') ? ' selected' : ''; ?> >Tak, dotacje krajowe (NFOŚiGW, WFOŚiGW)</option>
											  	<option value="Tak, LIFE" <?php echo (isset($_GET['have-experience']) && $_GET['have-experience'] === 'Tak, LIFE') ? ' selected' : ''; ?> >Tak, LIFE</option>
                                                  <option value="Tak, inne środki krajowe" <?php echo (isset($_GET['have-experience']) && $_GET['have-experience'] === 'Tak, inne środki krajowe') ? ' selected' : ''; ?>>Tak, inne środki krajowe</option>
                                                  <option value="Nie" <?php echo (isset($_GET['have-experience']) && $_GET['have-experience'] === 'Nie') ? ' selected' : ''; ?>>Nie</option>
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label for="assumed-value">Zakładana wartość projektu</label>
											<select  class="form-select" id="assumed-value" name="assumed-value">
											  	<option value="" selected>Wybierz</option>
											  	<option value="do 1 mln PLN" <?php echo (isset($_GET['assumed-value']) && $_GET['assumed-value'] === 'do 1 mln PLN') ? ' selected' : ''; ?>>do 1 mln PLN</option>
											  	<option value="do 10 mln PLN" <?php echo (isset($_GET['assumed-value']) && $_GET['assumed-value'] === 'do 10 mln PLN') ? ' selected' : ''; ?>>do 10 mln PLN</option>
											  	<option value="powyżej 10 mln PLN" <?php echo (isset($_GET['assumed-value']) && $_GET['assumed-value'] === 'powyżej 10 mln PLN') ? ' selected' : ''; ?>>powyżej 10 mln PLN</option>
											</select>
										</div>
									</div>
                                    
                                    
									<div class="col-md-12">
										<div class="web-btn form-btn">
						    				<button type="submit" class="btn btn-primary">Wyszukaj</button>
						    			</div>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div class="search-result-wrap">
						<div class="web-heading heading-divider">
							<h2>Wyniki wyszukiwania</h2>
						</div>
						<div class="data-table-block">
                        <table class="table data-table">
						        <thead>
						            <tr class="d-none d-lg-table-row">
						                <th>Nazwa</th>
						                <th>Forma</th>
						                <th>Obszar</th>
						                <th>Planowane Działania</th>
						            </tr>
						        </thead>
						        <tbody>
                                
                            <?php
                                      $parent_id = wp_get_post_parent_id(get_the_ID());
                                    // Set up query args for the specific month
                                    $current_page = get_query_var('paged') ? get_query_var('paged') : 1;
                                    $args = array(
                                        
                                        'post_type' => 'partnerzye',
                                        'tax_query'      => array(
                                            'relation'     => 'AND', // Add this relation parameter
                                        ),
                                    );

                                    if (!empty($selected_project_implement)) {
                                        $args['meta_query'][] = array(
                                            'key' => 'app-character', // Replace with the correct custom field name
                                            'value' => $selected_project_implement,
                                            'compare' => '=', // You can change the comparison method (e.g., 'LIKE', '==', etc.)
                                        );
                                    }
                                    if(!empty($selected_org_legal)){
                                        $args['meta_query'][] = array(
                                            'key' => 'form_consultation' ,
                                            'value' =>   $selected_org_legal,
                                            'compare' => '=',
                                        );

                                    }
                                    if(!empty($selected_activities_planned)){
                                        $args['meta_query'][] = array(
                                            'key' => 'activities' ,
                                            'value' =>   $selected_activities_planned,
                                            'compare' => '=',
                                        );

                                    }
                                    if(!empty($selected_planned_implemented)){
                                        $args['meta_query'][] = array(
                                            'key' => 'activi_planned' ,
                                            'value' =>   $selected_planned_implemented,
                                            'compare' => '=',
                                        );

                                    }
                                    if(!empty($selected_contribution)){
                                        $args['meta_query'][] = array(
                                            'key' => 'Contribution' ,
                                            'value' =>   $selected_contribution,
                                            'compare' => '=',
                                        );

                                    }
                                    if(!empty($selected_assumed_value)){
                                        $args['meta_query'][] = array(
                                            'key' => 'project-value' ,
                                            'value' =>   $selected_assumed_value,
                                            'compare' => '=',
                                        );

                                    }
                                    if(!empty($selected_have_experience)){
                                        $args['meta_query'][] = array(
                                            'key' => 'experience_implementing' ,
                                            'value' =>   $selected_have_experience,
                                            'compare' => '=',
                                        );

                                    }
                                  
                                    $custom_query = new WP_Query($args);
                                    
                                    // Check if there are posts for this month
                                    if ($custom_query->have_posts()) {
                                        while ($custom_query->have_posts()) {
                                            $custom_query->the_post();
                                            $post_id = get_the_ID(); // Get the current post ID
                                            ?>
                                            <tr>
                                            <td aria-label="Nazwa"><a href="<?php the_permalink(); echo '?parent_id=' . $parent_id; ?>"><?php echo get_post_meta($post_id, 'fname', true); ?></a></td>
                                                <td aria-label="Forma"><?php echo get_post_meta($post_id, 'form_consultation', true); ?></td>
                                                <td aria-label="Obszar"><?php echo get_post_meta($post_id, 'activities', true); ?></td>
                                                <td aria-label="Planowane Działania"><?php echo get_post_meta($post_id, 'activi_planned', true); ?></td>
                                            </tr>
                                            <?php
                                        }
                                        wp_reset_postdata(); 
                                    }

                                

                                ?>   
						        </tbody>
						    </table>
						</div>
					</div>       
                </div>
				<div class="col-xl-3 d-none d-xl-block">
					<div class="sidebar">
						<div class="web-heading">
							<h2><?php _e('Menu' , 'cwb') ?></h2>
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
<script type="text/javascript">
  		$('.vSelect').vSelect({
			placeholder: 'Wybierz',
			checkAll: true,
			checkAllLabel: 'Zaznacz wszystkie',
			selectedLabel: 'Wybrano',
			display: 'sum',
			trayHeight: '304px',
			dropdown: true,
		});
  	</script>