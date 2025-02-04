<?php 
// Template Name: Question Answer
?>
<?php get_header();
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
                <div class="row sub-page-row">
                    <div class="col-xl-9">
                        <?php
                        the_content()
                        ?>
                        <div class="web-form-wrap">
                            <div class="web-form">
                                <form class="needs-validation" novalidate="" id="question-answer-for-qa">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="name"><?php _e('Imię' , 'cwb'); ?> <span class="required">*</span></label>
                                                <input type="text" class="form-control" name="name" id="name" placeholder="<?php _e('Wpisz' , 'cwb'); ?>" required="">
                                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="email"><?php _e('E-mail' , 'cwb'); ?> <span class="required">*</span></label>
                                                <input type="email" class="form-control" id="email" name="email" placeholder="<?php _e('Wpisz' , 'cwb'); ?>" required="">
                                                <div class="invalid-feedback"><?php _e('Proszę o prawidłowy adres e-mail!' , 'cwb'); ?></div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="temat"><?php _e('Temat' , 'cwb'); ?></label>
                                                <?php
                                                $terms = get_terms(array(
                                                    'taxonomy'   => 'cwb_question_categories',
                                                    'hide_empty' => false,
                                                ));

                                                if (!empty($terms) && !is_wp_error($terms)) : ?>
                                                    <select name="temat" id="temat" class="form-select">
                                                        <option value=""><?php _e('Wybierz' , 'cwb'); ?></option>
                                                        <?php foreach ($terms as $term) : ?>
                                                            <option value="<?php echo esc_attr($term->term_id); ?>"><?php echo esc_html($term->name); ?></option>
                                                        <?php endforeach; ?>
                                                    </select>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="message"><?php _e('Pytanie' , 'cwb'); ?> <span class="required">*</span></label>
                                                <textarea class="form-control char-limit" id="message" name="message" placeholder="<?php _e('Opisz' , 'cwb'); ?> " maxlength="500" required=""></textarea>
                                                <div class="charCount text-end">0/500</div>
                                                <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="web-btn form-btn text-end">
                                                <button type="submit" name="submit_question" class="btn btn-primary"><?php _e('DODAJ' , 'cwb'); ?></button>
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
                                        <?php _e('Gratulacje!<br> Twoje pytanie zostało pomyślnie przesłane i oczekuje na recenzję. Jeden z naszych administratorów zatwierdzi je wkrótce.', 'cwb'); ?>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="comments-sec-wrap">
                            <div class="comments-heading-sort d-flex justify-content-between align-items-center">
                                <div class="web-heading heading-divider">
                                    <h2><?php _e('Odpowiedzi' , 'cwb'); ?></h2>
                                </div>
                                <div class="col-md-5 comments-sort">
                                    <div class="web-form">
                                        <form>
                                            <div class="form-group d-flex align-items-center">
                                                <label for="sortuj"><?php _e('Sortuj' , 'cwb'); ?>:</label>
                                                <select class="form-select" id="sortuj">
                                                    <option selected value=""><?php _e('Wybierz' , 'cwb'); ?></option>
                                                    <option value="asc"><?php _e('od najnowszych' , 'cwb'); ?></option>
                                                    <option value="desc"><?php _e('od najstarszych' , 'cwb'); ?></option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-block">                        
                                <div class="accordion" id="accordion-block">
                                    <?php 
                                    $terms = get_terms(array(
                                        'taxonomy'   => 'cwb_question_categories',
                                        'hide_empty' => true,
                                    ));

                                    if (!empty($terms) && !is_wp_error($terms)) {
                                        foreach ($terms as $term) { ?>
                                            <div class="accordion-item">
                                                <h3 class="accordion-header">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-<?php echo $term->term_id; ?>" aria-expanded="false" aria-controls="collapse-<?php echo $term->term_id; ?>"><?php echo esc_html($term->name); ?></button>
                                                </h3>
                                                <div id="collapse-<?php echo $term->term_id; ?>" class="accordion-collapse collapse" data-bs-parent="#accordion-block">
                                                    <div class="accordion-body">
                                                        <div class="comments-row">
                                                            <?php 
                                                            $posts = get_posts(array(
                                                                'post_type'      => 'questions',
                                                                'posts_per_page' => -1,
                                                                'tax_query'      => array(
                                                                    array(
                                                                        'taxonomy' => 'cwb_question_categories',
                                                                        'field'    => 'term_id',
                                                                        'terms'    => $term->term_id,
                                                                    ),
                                                                ),
                                                            ));
                                                            if (!empty($posts)) { 

                                                                foreach ($posts as $post) {
                                                                    setup_postdata($post);
                                                                    $post_id = get_the_ID(); 
                                                                    ?>
                                                                    <div class="comment-item d-flex align-items-start">
                                                                        <?php 
                                                                        $email      =  get_post_meta(get_the_ID(), 'email', true); 
                                                                        $user       =   get_user_by('email', $email);

                                                                        if ($user) {
                                                                            $user_image = get_user_meta($user->ID, 'user_image_field', true); 

                                                                            if (!empty($user_image)) {
                                                                                ?>
                                                                                <div class="user-icon d-flex align-items-center justify-content-center">
                                                                                    <?php echo '<img src="' . esc_url($user_image) . '" alt="User Image">'; ?>
                                                                                </div>
                                                                                <?php
                                                                            } else {
                                                                                $post_title = get_the_title();
                                                                                $first_letter = $post_title ? $post_title[0] : '';
                                                                                echo ' <div class="user-icon d-flex align-items-center justify-content-center">' . esc_html($first_letter) . '</div>';
                                                                            }
                                                                        } else { ?>
                                                                            <div class="user-icon d-flex align-items-center justify-content-center">
                                                                                <span>
                                                                                    <?php 
                                                                                    $post_title = get_the_title();
                                                                                    $first_letter = $post_title ? $post_title[0] : ''; 
                                                                                    echo esc_html($first_letter);
                                                                                    ?>
                                                                                </span>
                                                                            </div>
                                                                        <?php }
                                                                        ?>
                                                                        <div class="comment-content w-100">
                                                                            <h3><?php the_title(); ?></h3>
                                                                            <p><?php the_content(); ?></p>
                                                                            <div class="comment-date">
                                                                                <span><?php echo get_the_date('d.m.Y', $post); ?></span>
                                                                            </div>
                                                                            <?php get_template_part('content', 'comments'); ?>
                                                                        </div>
                                                                    </div>
                                                                <?php }
                                                            } else {
                                                                echo '<p>No posts found for this category.</p>';
                                                            }
                                                            wp_reset_postdata();
                                                            ?>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        <?php

                                    }
                                } else {
                                    echo 'No categories found.';
                                }
                                ?>
                                </div>
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
}
}

get_footer(); ?>