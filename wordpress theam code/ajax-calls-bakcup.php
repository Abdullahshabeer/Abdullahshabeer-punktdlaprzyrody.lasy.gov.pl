
<?php 
function list_location_from_selected_map() {
    $category_id    = $_POST['category'];
    $location       = $_POST['location'];
    $parentid       = $_POST['parentid'];
    $query_args = array(
        'post_type' => 'mapa',
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'location',
                'field' => 'slug',
                'terms' => $location,
            ),
            array(
                'taxonomy' => 'mapaes',
                'field' => 'id',
                'terms' => $category_id,
            ),
        ),
    );
    // $post_type = $atts['post_type'];
   
    $location_query = new WP_Query($query_args);
    

    $location_title = get_term_by('slug', $location, 'location')->name;
    $total_posts = $location_query->found_posts;
    $posts_list = array();

    if ($location_query->have_posts()) {
        while ($location_query->have_posts()) {
            $location_query->the_post();
            $posts_list[] = '<li><a href="' . get_the_permalink() . '?parent_id=' . $parentid . '">' . get_the_title() . '</a></li>';


        }
    }

    wp_reset_postdata();

    $response = array(
        'location_title'    => $location_title,
        'total_posts'       => $total_posts,
        'posts_list'        => $posts_list,
    );

    echo json_encode($response);
    wp_die();

}

add_action('wp_ajax_list_location_from_selected_map', 'list_location_from_selected_map'); 
add_action('wp_ajax_nopriv_list_location_from_selected_map', 'list_location_from_selected_map');

function list_slug_from_selected_program() {
    $programslugs           = $_POST['programslug'];
    $program_taxonomy       = 'programa-categories';
    $schedule_taxonomy      = 'Schedulesa-categories';
    $options                = array();

    foreach ($programslugs as $slug) {
        $terms      = get_terms(array(
            'taxonomy'      => $program_taxonomy,
            'hide_empty'    => false,
            'slug'          => $slug,
        ));

        if (!empty($terms)) {
            foreach ($terms as $term) {
                $program_slug = $term->slug;
                $field_object = get_field_object('call_schedule', $term);
                if ($field_object && !empty($field_object['value'])) {
                    $custom_field_values = $field_object['value'];
                    foreach ($custom_field_values as $term_id) {
                        $term = get_term_by('id', $term_id, $schedule_taxonomy);

                        if ($term) {
                            $term_name = $term->name;
                            $term_slug = $term->slug;
                            $options[] = '<div class="checkbox-container">
                            <input type="checkbox" data-slug="' . esc_attr($program_slug) . '" id="action3"  value="' . esc_attr($term_slug) . '" class="action">
                            <label for="action3">'
                            . esc_html($term_name) . '</label>
                        </div>';
                        }
                    }
                   
                }
            }
        }
    }
    echo json_encode(array('options' => $options));
    wp_die(); 
}

add_action('wp_ajax_list_slug_from_selected_program', 'list_slug_from_selected_program');
add_action('wp_ajax_nopriv_list_slug_from_selected_program', 'list_slug_from_selected_program');


function submit_booking_form() {
    $name                   = sanitize_text_field($_POST['u-name']);
    $nazwisko               = sanitize_text_field($_POST['nazwisko']);
    $email                  = sanitize_email($_POST['u-email']);
    $telefon                = sanitize_text_field($_POST['telefon']);
    $form_consultation      = sanitize_text_field($_POST['form-consultation']);
    $topic                  = sanitize_text_field($_POST['topic']);
    $dziedzina              = sanitize_text_field($_POST['dziedzina']);
    $ekspert                = sanitize_text_field($_POST['ekspert']);
    $termin_konsultacji     = sanitize_text_field($_POST['termin-konsultacji']);
    $godzina_konsultacji    = sanitize_text_field($_POST['godzina-konsultacji']);
    $informacje_inne        = sanitize_text_field($_POST['informacje-inne']);
    $nazwa_wnioskodawcy     = sanitize_text_field($_POST['nazwa-wnioskodawcy']);
    // $ekspert_id             = intval($_POST['expert_id']);
    
    $booking_post = array(
        'post_title'        => $name . ' ' . $nazwisko . ' Booking',
        'post_type'         => 'bookings',
        'post_status'       => 'publish',
    );

    $post_id            = wp_insert_post($booking_post);
    
    update_post_meta($post_id, 'name',  $name);
    update_post_meta($post_id, 'nazwisko', $nazwisko);
    update_post_meta($post_id, 'email', $email);
    update_post_meta($post_id, 'telefon', $telefon);
    update_post_meta($post_id, 'form_consultation', $form_consultation);
    update_post_meta($post_id, 'topic', $topic);
    update_post_meta($post_id, 'dziedzina', $dziedzina);
    update_post_meta($post_id, 'ekspert', $ekspert);
    update_post_meta($post_id, 'termin_konsultacji', $termin_konsultacji);
    update_post_meta($post_id, 'godzina_konsultacji', $godzina_konsultacji);
    update_post_meta($post_id, 'informacje_inne', $informacje_inne);
    update_post_meta($post_id, 'nazwa_wnioskodawcy', $nazwa_wnioskodawcy);
    $ekspert_title  = get_the_title($ekspert);
    $title          =   '';
    $content        =   '';
    $admincontent   =   '';
    $admintitle     =   '';
    if($form_consultation == 'w biurze PdP'){
        $title      = 'Dziękujemy za zapisanie się na konsultacje!';
        $content    = '';
        $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            Szanowny Użytkowniku, <br>
                            dziękujemy za zapisanie się na konsultacje stacjonarne w biurze Punktu dla Przyrody.
                        </p>';
        $content    .= '<p>Termin i godzina konsultacji: '.$termin_konsultacji.' '.$godzina_konsultacji.'</p>';
        $content    .= '<p>Prosimy o punktualne przybycie. <br> Do zobaczenia!</p>';

        $admintitle      = ' Zapis na konsultacje stacjonarne';
        $admincontent    = '';
        $admincontent    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            W systemie Punktu dla Przyrody zostało odebrane zgłoszenie na konsultacje stacjonarne.
                        </p>';
        $admincontent    .= '<p>Imię i nazwisko: '.$name.' '.$nazwisko.'<br>
                        E-mail uczestnika: '.$email.' <br>
                        Telefon uczestnika: '.$telefon.' <br>
                        Termin i godzina konsultacji:  '.$termin_konsultacji.' '.$godzina_konsultacji.' <br>
                        Nazwa wnioskodawcy lub beneficjenta: '.$name.' '.$nazwisko.' <br>
                        Temat/zakres konsultacji: '.$topic.' <br>
                        Dziedzina: '.$dziedzina.' <br>
                        </p>';
        $admincontent    .= '<p>W przypadku pytań skontaktuj się ze zgłoszoną osobą. </p>';
    }
    else if($form_consultation == 'telefoniczna'){
        $title      = 'Dziękujemy za zapisanie się na konsultacje!';
        $content    = '';
        $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            Szanowny Użytkowniku, <br>
                            ddziękujemy za zapisanie się na konsultacje telefoniczne.
                        </p>';
        $content    .= '<p>Termin i godzina konsultacji: '.$termin_konsultacji.' '.$godzina_konsultacji.' <br>
                            Dziedzina: '.$dziedzina.'<br>
                            Ekspert: '.$ekspert_title.'<br>
                        </p>';
        $content    .= '<p>Nasz ekspert zadzwoni do Państwa w wybranym terminie.  <br>
                        Do usłyszenia! <br>
                        Zespół Punktu dla Przyrody
                        </p>';

        $admintitle      = ' Zapis na konsultacje telefoniczne';
        $admincontent    = '';
        $admincontent    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            W systemie Punktu dla Przyrody zostało odebrane zgłoszenie na konsultacje telefoniczne.
                        </p>';
        $admincontent    .= '<p>Imię i nazwisko: '.$name.' '.$nazwisko.'<br>
                        E-mail uczestnika: '.$email.' <br>
                        Telefon uczestnika: '.$telefon.' <br>
                        Termin i godzina konsultacji:  '.$termin_konsultacji.' '.$godzina_konsultacji.' <br>
                        Nazwa wnioskodawcy lub beneficjenta: '.$name.' '.$nazwisko.' <br>
                        Temat/zakres konsultacji: '.$topic.' <br>
                        Dziedzina: '.$dziedzina.' <br>
                        Ekspert: '.$ekspert_title.'<br>
                        </p>';
        $admincontent    .= '<p>W przypadku pytań skontaktuj się ze zgłoszoną osobą.</p>';  
    }
    else if($form_consultation == 'e-mail'){
        $title      = 'Dziękujemy za zapisanie się na konsultacje!';
        $content    = '';
        $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            Szanowny Użytkowniku, <br>
                            dziękujemy za zapisanie się na konsultacje e-mailowe.
                        </p>';
        $content    .= '<p>
                            Dziedzina: '.$dziedzina.'<br>
                            Ekspert: '.$ekspert_title.'<br>
                        </p>';
        $content    .= '<p>Nasz ekspert skontaktuje się w wybranym terminie.   <br>
                        Do usłyszenia!<br>
                        Zespół Punktu dla Przyrody
                        </p>';

        $admintitle      = 'Zapis na konsultacje e-mailowe';
        $admincontent    = '';
        $admincontent    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            W systemie Punktu dla Przyrody zostało odebrane zgłoszenie na konsultacje e-mailowe.
                        </p>';
        $admincontent    .= '<p>Imię i nazwisko: '.$name.' '.$nazwisko.'<br>
                        E-mail uczestnika: '.$email.' <br>
                        Telefon uczestnika: '.$telefon.' <br>
                        Termin i godzina konsultacji:  '.$termin_konsultacji.' '.$godzina_konsultacji.' <br>
                        Nazwa wnioskodawcy lub beneficjenta: '.$name.' '.$nazwisko.' <br>
                        Temat/zakres konsultacji: '.$topic.' <br>
                        Dziedzina: '.$dziedzina.' <br>
                        Ekspert: '.$ekspert_title.'<br>
                        </p>';
        $admincontent    .= '<p>W przypadku pytań skontaktuj się ze zgłoszoną osobą.</p>'; 
    }
    else if($form_consultation == 'on-line (videoczat)'){
        $title      = 'Dziękujemy za zapisanie się na konsultacje!';
        $content    = '';
        $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            Szanowny Użytkowniku, <br>
                            dziękujemy za zapisanie się na konsultacje e-mailowe.
                        </p>';
        $content    .= '<p>
                            Termin i godzina konsultacji: '.$termin_konsultacji.' '.$godzina_konsultacji.' <br>
                            Dziedzina: '.$dziedzina.'<br>
                            Ekspert: '.$ekspert_title.'<br>
                        </p>';
        $content    .= '<p>W najbliższym czasie zostanie przesłany link do video rozmowy.<br>
                        Do zobaczenia!<br>
                        Zespół Punktu dla Przyrody
                        </p>';

        $admintitle      = 'Zapis na konsultacje online';
        $admincontent    = '';
        $admincontent    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            W systemie CWB zostało odebrane zgłoszenie na konsultacje online.
                        </p>';
        $admincontent    .= '<p>Imię i nazwisko: '.$name.' '.$nazwisko.'<br>
                        E-mail uczestnika: '.$email.' <br>
                        Telefon uczestnika: '.$telefon.' <br>
                        Termin i godzina konsultacji:  '.$termin_konsultacji.' '.$godzina_konsultacji.' <br>
                        Nazwa wnioskodawcy lub beneficjenta: '.$name.' '.$nazwisko.' <br>
                        Temat/zakres konsultacji: '.$topic.' <br>
                        Dziedzina: '.$dziedzina.' <br>
                        Ekspert: '.$ekspert_title.'<br>
                        </p>';
        $admincontent    .= '<p>
                                Na podany adres e-mail uczestnika/eksperta/ewentualnie pracownika CKPŚ należy wysłać link do video rozmowy.<br>
                                W przypadku pytań skontaktuj się ze zgłoszoną osobą.
                            </p>'; 
    }
    if($form_consultation){
        $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
        $user_email_template    =   str_replace('{title}', $title, $email_template);
        $user_email_template    =   str_replace('{content}', $content, $user_email_template);
        $admin_email_template   =   str_replace('{title}', $admintitle, $email_template);
        $admin_email_template   =   str_replace('{content}', $admincontent, $admin_email_template);
        $expert_email           =   get_field('email',$ekspert);
        $headers_admin = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: CWB <cwb@nfinity.pl>' 
        );
        wp_mail($email, $title, $user_email_template , $headers_admin);
        wp_mail(get_option('admin_email'), $admintitle, $admin_email_template , $headers_admin);
        if($expert_email){
            wp_mail($expert_email, $admintitle, $admin_email_template , $headers_admin);
        }
    }
    echo 'success';
    wp_die();
}

add_action('wp_ajax_submit_booking_form', 'submit_booking_form');
add_action('wp_ajax_nopriv_submit_booking_form', 'submit_booking_form');


function get_existing_bookings() {
    $expert_id      = intval($_POST['expert_id']);
    $selected_date  = $_POST['selected_date'];

    $bookings = get_posts(array(
        'post_type'      => 'bookings',
        'meta_query'     => array(
            'relation' => 'AND',
            array(
                'key'     => 'ekspert',
                'value'   => $expert_id,
                'compare' => '=',
            ),
            array(
                'key'     => 'termin_konsultacji',
                'value'   => $selected_date,
                'compare' => '=',
            ),
        ),
        'posts_per_page' => -1,
    ));

    $reserved_time_slots = array();

    foreach ($bookings as $booking) {
        $booking_date = get_post_meta($booking->ID, 'termin_konsultacji', true);
        $booking_time = get_post_meta($booking->ID, 'godzina_konsultacji');
        $reserved_time_slots[] = array(
            'date' => $booking_date ,
            'time' => $booking_time
        );
    }
    $bookings = get_posts(array(
        'post_type'      => 'bookings',
        'meta_query'     => array(
            'relation' => 'AND',
            array(
                'key'     => 'ekspert',
                'value'   => '',
                'compare' => '=',
            ),
            array(
                'key'     => 'termin_konsultacji',
                'value'   => $selected_date,
                'compare' => '=',
            ),
        ),
        'posts_per_page' => -1,
    ));

    foreach ($bookings as $booking) {
        $booking_date = get_post_meta($booking->ID, 'termin_konsultacji', true);
        $booking_time = get_post_meta($booking->ID, 'godzina_konsultacji');
        $reserved_time_slots[] = array(
            'date' => $booking_date ,
            'time' => $booking_time
        );
    }
    wp_send_json($reserved_time_slots);
}

add_action('wp_ajax_get_existing_bookings', 'get_existing_bookings');
add_action('wp_ajax_nopriv_get_existing_bookings', 'get_existing_bookings');



add_action('wpcf7_before_send_mail', 'create_custom_post_from_form');

// function create_custom_post_from_form($form) {
    

//     if ($form->id() == 1815) {
//         $app_character                = sanitize_text_field($_POST['app-character']);
//         $name                         = sanitize_text_field($_POST['fname']);
//         $Headquartersaddres           = sanitize_text_field($_POST['Headquartersaddres']);
//         $email                        = sanitize_email($_POST['email-add']);
//         $telefon                      = sanitize_text_field($_POST['tel-551']);
//         $organizational               = sanitize_text_field($_POST['organizational']);
//         $activities                   = sanitize_text_field($_POST['activities']);
//         $textarea_Profil              = sanitize_text_field($_POST['textarea-Profil']);
//         $activi_planned               = sanitize_text_field($_POST['activi-planned']);
//         $Contribution                  = sanitize_text_field($_POST['Contribution']);
//         $experience_implementing       = sanitize_text_field($_POST['experience-implementing']);
//         $textarea_experience           = sanitize_text_field($_POST['textarea-experience']);
//         $textarea                     = sanitize_text_field($_POST['textarea-746']);
//         $project_value                     = sanitize_text_field($_POST['project-value']);
//         $acceptance                   = sanitize_text_field($_POST['acceptance']);
        
        
//         $partner_post = array(
//             'post_title'        => $name ,
//             'post_type'         => 'partnerzye',
//             'post_status'       => 'draft',
//         );
    
//         $post_id            = wp_insert_post($partner_post);

//         update_post_meta($post_id, 'app-character',  $app_character);
//         update_post_meta($post_id, 'fname',  $name);
//         update_post_meta($post_id, 'Headquartersaddres', $Headquartersaddres);
//         update_post_meta($post_id, 'email', $email);
//         update_post_meta($post_id, 'telefon', $telefon);
//         update_post_meta($post_id, 'form_consultation', $organizational);
//         update_post_meta($post_id, 'activities',  $activities );
//         update_post_meta($post_id, 'textarea_Profil', $textarea_Profil);
//         update_post_meta($post_id, 'activi_planned', $activi_planned);
//         update_post_meta($post_id, 'Contribution', $Contribution);
//         update_post_meta($post_id, 'experience_implementing', $experience_implementing);
//         update_post_meta($post_id, 'textare', $textarea);
//         update_post_meta($post_id, 'project-value', $project_value );
//         update_post_meta($post_id, 'textarea_experience', $textarea_experience);
//         update_post_meta($post_id, 'acceptance', $acceptance);
       
//     }
// }

function create_custom_post_from_form($form) {
    if ($form->id() == 1815) {
        // Gather form data
        $app_character                = sanitize_text_field($_POST['app-character']);
        $name                         = sanitize_text_field($_POST['fname']);
        $Headquartersaddres           = sanitize_text_field($_POST['Headquartersaddres']);
        $email                        = sanitize_email($_POST['email-add']);
        $telefon                      = sanitize_text_field($_POST['tel-551']);
        $organizational               = sanitize_text_field($_POST['organizational']);
        $activities                   = sanitize_text_field($_POST['activities']);
        $textarea_Profil              = sanitize_text_field($_POST['textarea-Profil']);
        $activi_planned               = sanitize_text_field($_POST['activi-planned']);
        $Contribution                 = sanitize_text_field($_POST['Contribution']);
        $experience_implementing      = sanitize_text_field($_POST['experience-implementing']);
        $textarea_experience          = sanitize_text_field($_POST['textarea-experience']);
        $textarea                     = sanitize_text_field($_POST['textarea-746']);
        $project_value                = sanitize_text_field($_POST['project-value']);
        $acceptance                   = sanitize_text_field($_POST['acceptance']);

        // Create the post with 'pending' status
        $partner_post = array(
            'post_title' => $name,
            'post_type' => 'partnerzye',
            'post_status' => 'pending',
        );
        $post_id = wp_insert_post($partner_post);
        update_post_meta($post_id, 'app-character',  $app_character);
        update_post_meta($post_id, 'fname',  $name);
        update_post_meta($post_id, 'Headquartersaddres', $Headquartersaddres);
        update_post_meta($post_id, 'email', $email);
        update_post_meta($post_id, 'telefon', $telefon);
        update_post_meta($post_id, 'form_consultation', $organizational);
        update_post_meta($post_id, 'activities',  $activities );
        update_post_meta($post_id, 'textarea_Profil', $textarea_Profil);
        update_post_meta($post_id, 'activi_planned', $activi_planned);
        update_post_meta($post_id, 'Contribution', $Contribution);
        update_post_meta($post_id, 'experience_implementing', $experience_implementing);
        update_post_meta($post_id, 'textare', $textarea);
        update_post_meta($post_id, 'project-value', $project_value );
        update_post_meta($post_id, 'textarea_experience', $textarea_experience);
        update_post_meta($post_id, 'acceptance', $acceptance);

        

        $token = wp_generate_password(20, false);

        // Store the post ID with the token
        add_option('email_confirmation_' . $token, $post_id);

        // Send a confirmation email with the token
        $confirm_link = add_query_arg(['confirm_token' => $token], get_home_url());
        $email_template = file_get_contents(get_template_directory() . '/inc/email-template.html');
        if ($email_template === false) {
            // Handle error (e.g., template file not found)
            return;
        }
        // Concatenate the content parts into a single string
            $full_content = 
            'Szanowny użytkowniku! Dziękujemy za zgłoszenie partnera lub podmiotu upoważnionego. Aby potwierdzić swoje zgłoszenie, kliknij na poniższy link: ' .
            $confirm_link .
            '<p>Sprawdzimy Twoje zgłoszenie i skontaktujemy się z Tobą..<br>Do zobaczenia!<br>Zespół Punktu dla Przyrody</p>';

            // Replace the placeholders in the template
            $user_email_template = str_replace(
            ['{title}', '{content}'],
            [
                'Zgłoszenie partnera lub podmiotu upoważnionego - Punkt dla Przyrody',
                $full_content
            ],
            $email_template
            );

        $headers_admin = ['Content-Type: text/html; charset=UTF-8', 'From: CWB <cwb@nfinity.pl>'];
        wp_mail($email, 'Zgłoszenie partnera lub podmiotu upoważnionego - Punkt dla Przyrody', $user_email_template, $headers_admin);



       

        return;
    }
}









function handle_email_confirmation() {
    if (isset($_GET['confirm_token'])) {
        $token = sanitize_text_field($_GET['confirm_token']);
        $post_id = get_option('email_confirmation_' . $token);

        if ($post_id) {
            // Update the post status to 'draft'
            wp_update_post(array(
                'ID' => $post_id,
                'post_status' => 'draft'
            ));

            delete_option('email_confirmation_' . $token);

            // Redirect to a specific post with ID 2660
            $redirect_url = get_permalink(2660);
            if($redirect_url) {
                wp_redirect($redirect_url);
            } 
            exit;
        }
    }
}
add_action('init', 'handle_email_confirmation');


function modify_page_title_on_confirmation($title, $id = null) {
    if (is_single() && get_query_var('confirmed') == '1') {
        return 'Confirmation Partner';
    }

    return $title;
}
add_filter('the_title', 'modify_page_title_on_confirmation', 10, 2);


function notify_user_on_publish($new_status, $old_status, $post) {
    if ($post->post_type == 'partnerzye' && $old_status == 'draft' && $new_status == 'publish') {
        $user_email = get_post_meta($post->ID, 'email', true);

        // Send email to the user
        $message = "Your post titled '{$post->post_title}' has been published.";
        wp_mail($user_email, 'Your Post is Live', $message);
    }
}
add_action('transition_post_status', 'notify_user_on_publish', 10, 3);



function process_subscription_form() {
    if (isset($_POST['email']) && isset($_POST['categories'])) {
        $user_email = sanitize_email($_POST['email']);
        $selected_categories = array_map('intval', $_POST['categories']);

        // Save the user's email and selected categories in user-specific options.
         $subscriptions = get_option('category_subscriptions', array());
        $subscriptions[$user_email] = $selected_categories;
        update_option('category_subscriptions', $subscriptions);

        // Format a more informative confirmation message.
        $category_names = array();
        foreach ($selected_categories as $category_id) {
            $category = get_term($category_id, 'programa-categories');
            if ($category && !is_wp_error($category)) {
                $category_names[] = $category->name;
            }
        }
        $message = 'You have successfully subscribed to the following categories: ' . implode(', ', $category_names);

        // Send a confirmation email to the user.
        $subject = 'Subscription Confirmation';
        wp_mail($user_email, $subject, $message);
    }

    // Redirect back to the page where the form was submitted.
    wp_redirect(wp_get_referer());
    exit;
}

add_action('admin_post_subscribe_to_categories', 'process_subscription_form');
add_action('admin_post_nopriv_subscribe_to_categories', 'process_subscription_form');


// function send_post_notifications_to_admin($ID, $post) {
    




//     if (empty($post)) {

//         return;
//     }

//     $custom_taxonomies = get_object_taxonomies($post);
    
//     if (empty($custom_taxonomies)) {
        
//         return;
//     }

//     $subscriptions = get_option('category_subscriptions', array());
      
//      $custom_post_types = array('naborye');
// if (in_array($post->post_type, $custom_post_types) && $post->post_status === 'publish') {
//     $admin_email = get_option('admin_email'); // Get the admin's email address
//     $subject = 'New ' . $post->post_type . ' Published';
//     // $message = 'A new ' . $post->post_type . ' has been published on your website.' . PHP_EOL . PHP_EOL;
//     // $message .= 'Title: ' . $post->post_title . PHP_EOL;
//     // $message .= 'Author: ' . get_the_author_meta('display_name', $post->post_author) . PHP_EOL;
//     // $message .= 'Published Date: ' . $post->post_date . PHP_EOL;

//     // Get the taxonomy terms associated with the post
//     // $taxonomy_names = get_object_taxonomies($post);
//     // foreach ($taxonomy_names as $taxonomy_name) {
//     //     $terms = wp_get_post_terms($post->ID, $taxonomy_name);
//     //     if (!empty($terms) && !is_wp_error($terms)) {
//     //         $message .= 'Taxonomy (' . $taxonomy_name . ') Terms: ';
//     //         $term_names = array();
//     //         foreach ($terms as $term) {
//     //             $term_names[] = $term->name;
//     //         }
//     //         $message .= implode(', ', $term_names) . PHP_EOL;
//     //     }
//     // }

//     $message .= 'Subscriptions: ' . json_encode($subscriptions) . PHP_EOL;
//     // $message .= 'View ' . print_r($subscriptions)  . ': ' . get_permalink($post->ID);

//     wp_mail($admin_email, $subject, $message);
// }
//     foreach ($custom_taxonomies as $taxonomy) {

//         $terms = wp_get_post_terms($post->ID, $taxonomy);
         

//         if (!empty($terms)) {
            
//             foreach ($terms as $term) {
//                 $term_slug = $term->slug;
                 
                
//                 foreach ($subscriptions as $user_email => $subscribed_terms) {


                     



//                     if (in_array($term_slug, $subscribed_terms)) {
//                         $subject = 'New Post in Subscribed Category';
//                         $message = 'A new post has been published in a category you subscribed to: ' . $term->name;
//                         wp_mail($user_email, $subject, $message);
//                     }
//                 }
//             }
//         }
//     }

// }

// // 
// add_action('save_post', 'send_post_notifications_to_admin', 10, 2);



// create new booking for events
function create_new_booking_for_event() {
    $name                       = sanitize_text_field($_POST['name']);
    $nazwisko                   = sanitize_text_field($_POST['nazwisko']);
    $email                      = sanitize_email($_POST['email']);
    $telefon                    = sanitize_text_field($_POST['telefon']);
    $nazwa_instytucji           = sanitize_text_field($_POST['nazwa-instytucji']);
    $applicant_beneficiary      = sanitize_text_field($_POST['applicant-beneficiary']);
    $preferencje                = sanitize_text_field($_POST['Preferencje']);
    $training_id                = sanitize_text_field($_POST['training_id']);
    $training_title             = get_the_title($training_id);
    $training_date              = get_field('start_date' ,$training_id);
    $totalseats                 = get_field('limit' ,$training_id);

    $training_bookings_count_published = new WP_Query(array(
        'post_type' => 'training_bookings',
        'post_status' 	=> 'publish',
        'meta_query' => array(
            array(
                'key' 		=> 'training_id',
                'value' 	=> $training_id,
                'compare' 	=> '=',
            ),
        ),
        'posts_per_page' 	=> -1,
    ));
    $published_bookings     =    $training_bookings_count_published->found_posts;

    wp_reset_postdata();
    $all_training_bookings = new WP_Query(array(
        'post_type' => 'training_bookings',
        'status' 	=> 'any',
        'meta_query' => array(
            array(
                'key' 		=> 'training_id',
                'value' 	=> $training_id,
                'compare' 	=> '=',
            ),
        ),
        'posts_per_page' 	=> -1,  // Retrieve all matching posts
    ));
    $all_posts_bookings      =    $all_training_bookings->found_posts;
    
    wp_reset_postdata();
    // echo $all_posts_bookings;
    if($totalseats <= $published_bookings){
        echo 'closed';
        wp_die();
    }
    else if($totalseats <= $all_posts_bookings){
        $booking_post       = array(
            'post_title'        => 'Zapis na szkolenie: ' . $training_title .' przez: ' . $name .' ' .$nazwisko,
            'post_type'         => 'training_bookings',
            'post_status'       => 'pending',
        );
        $post_id            = wp_insert_post($booking_post);
        update_post_meta($post_id, 'name',  $name);
        update_post_meta($post_id, 'nazwisko', $nazwisko);
        update_post_meta($post_id, 'email', $email);
        update_post_meta($post_id, 'telefon', $telefon);
        update_post_meta($post_id, 'nazwa_instytucji', $nazwa_instytucji);
        update_post_meta($post_id, 'applicant_beneficiary', $applicant_beneficiary);
        update_post_meta($post_id, 'preferencje', $preferencje);
        update_post_meta($post_id, 'training_id', $training_id);
        $confirmation_token =       wp_generate_uuid4(); // Use any method to generate a unique token
        update_post_meta($post_id, 'confirmation_token', $confirmation_token);
        $title          =   '';
        $content        =   '';
        $admincontent   =   '';
        $admintitle     =   '';
        $title      = ' Zapis na listę rezerwową szkolenia - Punkt dla Przyrody';
        $content    = '';
        $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                        Szanowny uczestniku! <br>
                        Właśnie zgłosiłeś chęć udziału w szkoleniu “'.$training_title.'” w dniu '.$training_date.'.<br>
                        Niestety, na wybrane szkolenie nie ma już miejsc i zostałeś dodany na listę rezerwową.</p>
                        <p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                        Poinformujemy Cię, jeśli zwolnią się miejsca
                        </p>
                        <p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                        Pozdrawiamy! <br>
                        Zespół Punktu dla Przyrody
                        </p>';
        $confirmation_link = home_url('/confirm-booking/') . '?token=' . $confirmation_token;
        $button_text        =   __('Potwierdź udział' , 'cwb');
        $content            = str_replace('[LINK]', '<a href="' . esc_url($confirmation_link) . '">'.$button_text.'</a>', $content);
        $admintitle      = ' Zapis na listę rezerwową szkolenia - Punkt dla Przyrody';
        $admincontent    = '';
        $admincontent    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            W systemie Punktu dla Przyrody zostało odebrane zgłoszenie na konsultacje stacjonarne.
                        </p>';
        $admincontent    .= '<p>Imię i nazwisko: '.$name.' '.$nazwisko.'<br>
                        E-mail uczestnika: '.$email.' <br>
                        Telefon uczestnika: '.$telefon.' <br>
                        Nazwa instytucji: '.$nazwa_instytucji.' <br>
                        Nazwa wnioskodawcy lub beneficjenta: '.$applicant_beneficiary.' <br>
                        Preferencje: '.$preferencje.' <br>
                        Training ID: '.$training_id.' <br>
                        </p>';
        $admincontent    .= '<p>W przypadku pytań skontaktuj się ze zgłoszoną osobą. </p>';
        $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
        $user_email_template    =   str_replace('{title}', $title, $email_template);
        $user_email_template    =   str_replace('{content}', $content, $user_email_template);
        $admin_email_template   =   str_replace('{title}', $admintitle, $email_template);
        $admin_email_template   =   str_replace('{content}', $admincontent, $admin_email_template);
        $expert_email           =   get_field('email',$training_id);
        // $expert_email           =   get_field('email',$ekspert);
        $headers_admin = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: CWB <cwb@nfinity.pl>' 
        );
        wp_mail($email, $title, $user_email_template , $headers_admin);
        wp_mail(get_option('admin_email'), $admintitle, $admin_email_template , $headers_admin);
        if($expert_email){
            wp_mail($expert_email, $admintitle, $admin_email_template , $headers_admin);
        }
        echo 'reserved';
        wp_die();
    }
    else{
        $booking_post       = array(
            'post_title'        => 'Zapis na szkolenie : ' . $training_title .' przez: ' . $name .' ' .$nazwisko,
            'post_type'         => 'training_bookings',
            'post_status'       => 'draft',
        );
        $post_id            = wp_insert_post($booking_post);
        update_post_meta($post_id, 'name',  $name);
        update_post_meta($post_id, 'nazwisko', $nazwisko);
        update_post_meta($post_id, 'email', $email);
        update_post_meta($post_id, 'telefon', $telefon);
        update_post_meta($post_id, 'nazwa_instytucji', $nazwa_instytucji);
        update_post_meta($post_id, 'applicant_beneficiary', $applicant_beneficiary);
        update_post_meta($post_id, 'preferencje', $preferencje);
        update_post_meta($post_id, 'training_id', $training_id);
        $confirmation_token =       wp_generate_uuid4();
        update_post_meta($post_id, 'confirmation_token', $confirmation_token);
        $expiration_time = time() + 86400;
        update_post_meta($post_id, 'confirmation_token_expiration', $expiration_time);
        $title          =   '';
        $content        =   '';
        $admincontent   =   '';
        $admintitle     =   '';
        $title      = 'Zapis na szkolenie - Punkt dla Przyrody';
        $content    = '';
        $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            Szanowny uczestniku! <br>
                            Właśnie zgłosiłeś chęć udziału w szkoleniu “'.$training_title.'” w dniu '.$training_date.'. <br>
                            Aby potwierdzić swój udział kliknij na link: <br>
                            [LINK]

                        </p>';
        $content    .= '<p>Pozdrawiamy! <br> Zespół Punktu dla Przyrody</p>';
        $confirmation_link = home_url('/confirm-booking/') . '?token=' . $confirmation_token;
        $button_text        =   __('Potwierdź udział' , 'cwb');
        $content            = str_replace('[LINK]', '<a href="' . esc_url($confirmation_link) . '">'.$button_text.'</a>', $content);
        $admintitle      = 'Zapis na szkolenie - Punkt dla Przyrody';
        $admincontent    = '';
        $admincontent    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                            W systemie Punktu dla Przyrody zostało odebrane zgłoszenie na konsultacje stacjonarne.
                        </p>';
        $admincontent    .= '<p>Imię i nazwisko: '.$name.' '.$nazwisko.'<br>
                        E-mail uczestnika: '.$email.' <br>
                        Telefon uczestnika: '.$telefon.' <br>
                        Nazwa instytucji: '.$nazwa_instytucji.' <br>
                        Nazwa wnioskodawcy lub beneficjenta: '.$applicant_beneficiary.' <br>
                        Preferencje: '.$preferencje.' <br>
                        Training ID: '.$training_id.' <br>
                        </p>';
        $admincontent    .= '<p>W przypadku pytań skontaktuj się ze zgłoszoną osobą. </p>';
        $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
        $user_email_template    =   str_replace('{title}', $title, $email_template);
        $user_email_template    =   str_replace('{content}', $content, $user_email_template);
        $admin_email_template   =   str_replace('{title}', $admintitle, $email_template);
        $admin_email_template   =   str_replace('{content}', $admincontent, $admin_email_template);
        $expert_email           =   get_field('email',$training_id);
        $headers_admin = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: CWB <cwb@nfinity.pl>' 
        );
        wp_mail($email, $title, $user_email_template , $headers_admin);
        wp_mail(get_option('admin_email'), $admintitle, $admin_email_template , $headers_admin);
        if($expert_email){
            wp_mail($expert_email, $admintitle, $admin_email_template , $headers_admin);
        }
        echo 'success';
        wp_die();
    }
}

add_action('wp_ajax_create_new_booking_for_event', 'create_new_booking_for_event');
add_action('wp_ajax_nopriv_create_new_booking_for_event', 'create_new_booking_for_event');


function create_new_entry_for_nabory() {
    if ( isset( $_POST['name'], $_POST['email'], $_POST['program'] , $_POST['action'] ) ) {
        $name           =   $_POST['name'] ;
        $email          =   $_POST['email'];
        $programs       =   $_POST['program'] ;
        $actions        =   $_POST['action_post'];

        $existing_post_id = get_posts( array(
            'post_type'  => 'subscriber',
            'meta_query'     => array(
                // 'relation' => 'AND',
                array(
                    'key'     => 'emails',
                    'value'   => $email,
                    'compare' => '=',
                ),
                // array(
                //     'key' => 'programs',
                //     'value' => $programs,
                //     'compare' => 'IN', // or 'LIKE', etc., depending on your requirements
                // ),
                // array(
                //     'key' => 'actions',
                //     'value' => $actions,
                //     'compare' => '=', // or 'LIKE', etc., depending on your requirements
                // ),
            ),
            'posts_per_page' => 1,
        ) );

        if ( !empty( $existing_post_id ) ) {
            
            echo 'email is repete';
        } else {
            $postarr = array(
                'post_title'   => $name,
                'post_content' => '',
                'post_status'  => 'publish',
                'post_type'    => 'subscriber',
            );
            $post_id = wp_insert_post( $postarr );
        }

        if ( $post_id ) {
            update_post_meta( $post_id, 'emails', $email );
            update_post_meta( $post_id, 'email', $email );
            update_post_meta( $post_id, 'name', $name );
            update_post_meta( $post_id, 'programs', $programs );
            update_post_meta( $post_id, 'actions', $actions );
            echo 'success';
        } 
    } else {
       echo 'error';
    }

    wp_die();
}

add_action('wp_ajax_create_new_entry_for_nabory', 'create_new_entry_for_nabory');
add_action('wp_ajax_nopriv_create_new_entry_for_nabory', 'create_new_entry_for_nabory');




function create_new_entry_for_szkolenia() {


    if ( isset( $_POST['emails'], $_POST['szkolen'], $_POST['post_type'] ) ) {
        $email = sanitize_email( $_POST['emails'] );
        $szkolen = $_POST['szkolen'];
        $post_type = sanitize_text_field( $_POST['post_type'] );

        $existing_post_id = get_posts( array(
            'post_type'      => 'subscriber',
            'meta_query'     => array(
                array(
                    'key'     => 'emails',
                    'value'   => $email,
                    'compare' => '=',
                ),
            ),
            'posts_per_page' => 1,
        ) );

        if ( !empty( $existing_post_id ) ) {
            
            echo 'email is repete';
        } else {
            $postarr = array(
                'post_title'   => $szkolen,
                'post_content' => '',
                'post_status'  => 'publish',
                'post_type'    => 'subscriber',
            );
            $post_id = wp_insert_post( $postarr );
        }

        if ( $post_id  ) {
            update_post_meta( $post_id, 'emails', $email );
            update_post_meta( $post_id, 'name', $szkolen );
            update_post_meta( $post_id, 'subscribed_post_type', $post_type );

            echo 'success';
        } else {
            print_r( $postarr );
        }
    } else {
        echo 'noterror';
    }

    wp_die();
}

add_action('wp_ajax_create_new_entry_for_szkolenia', 'create_new_entry_for_szkolenia');
add_action('wp_ajax_nopriv_create_new_entry_for_szkolenia', 'create_new_entry_for_szkolenia');


// create_new_post_for_qa
function create_new_post_for_qa() {
    if ( isset( $_POST['name'], $_POST['email'], $_POST['temat'] , $_POST['message'] ) ) {
        $name       = $_POST['name'];
        $email      = $_POST['email'];
        $temat      = $_POST['temat'];
        $message    = $_POST['message'];
    
        // Create a new post with the submitted data
        $postarr = array(
            'post_title'   => $name,
            'post_content' => $message,
            'post_status'  => 'draft',
            'post_type'    => 'questions',
        );
        $post_id = wp_insert_post($postarr);
    
        // Update post meta with additional information
        update_post_meta($post_id, 'email', $email);
        update_post_meta($post_id, 'temat', $temat);
        update_post_meta($post_id, 'name', $name);
    
        
        
    } else {
       echo 'error';
    }

    wp_die();
}

add_action('wp_ajax_create_new_post_for_qa', 'create_new_post_for_qa');
add_action('wp_ajax_nopriv_create_new_post_for_qa', 'create_new_post_for_qa');


function register_confirm_booking_endpoint() {
    register_rest_route('my_namespace/v1', '/confirm-booking/', array(
        'methods' => 'GET',
        'callback' => 'confirm_booking_callback',
    ));
}
add_action('rest_api_init', 'register_confirm_booking_endpoint');

function confirm_booking_callback($data) {
    $token          =   sanitize_text_field($data['token']);
    $booking_id     =   get_booking_id_by_token($token);

    if ($booking_id) {
        $current_status = get_post_meta($booking_id, 'booking_status', true);
        if ($current_status !== 'confirmed') {
            update_post_meta($booking_id, 'booking_status', 'confirmed');
            wp_update_post(array('ID' => $booking_id, 'post_status' => 'publish'));
            send_confirmation_email($booking_id);
            return 'Booking confirmed successfully!';
        }
        else {
            return 'Booking is already confirmed.';
        }
    } else {
        return 'Invalid confirmation token.';
    }
}
function send_confirmation_email($booking_id) {
    $email      = get_post_meta($booking_id, 'email', true);
    $title      = 'Potwierdzenie zapisu na szkolenie - Punkt dla Przyrody';
    $content    = '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
    Szanowny uczestniku! <br>
    Dziękujemy za potwierdzenie udziału na szkoleniu. Do zobaczenia! 
    </p>
    <p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
    Pozdrawiamy! <br>
    Zespół Punktu dla Przyrody
    </p>
    <p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
    W przypadku zrezygnowania ze szkolenia, prosimy o kontakt telefoniczny.
    </p>';
    $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
    $user_email_template    =   str_replace('{title}', $title, $email_template);
    $user_email_template    =   str_replace('{content}', $content, $user_email_template);
    $headers_admin          =   array(
        'Content-Type: text/html; charset=UTF-8',
        'From: CWB <cwb@nfinity.pl>' 
    );
    wp_mail($email, $title, $user_email_template , $headers_admin);
}
function get_booking_id_by_token($token) {
    $args = array(
        'post_type' => 'training_bookings',
        'post_status' => 'any',
        'meta_query' => array(
            array(
                'key' => 'confirmation_token',
                'value' => $token,
            ),
        ),
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        $query->the_post();
        return get_the_ID();
    } else {
        return false;
    }
}
function send_email_when_status_change($booking_id){
    $email                      =   get_post_meta($booking_id, 'email', true);
    $training_id                =   get_post_meta($booking_id, 'training_id', true);
    $training_date              =   get_field('start_date' ,$training_id);
    $totalseats                 =   get_field('limit' ,$training_id);
    $training_title             =   get_the_title($training_id);
    $confirmation_token         =   get_post_meta($booking_id, 'confirmation_token', true);
    $expiration_time = time() + 86400;
    update_post_meta($booking_id, 'confirmation_token_expiration', $expiration_time);
    $title          =   '';
    $content        =   '';
    $admincontent   =   '';
    $admintitle     =   '';
    $title      = 'Zapis na szkolenie - Punkt dla Przyrody';
    $content    = '';
    $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                        Szanowny uczestniku! <br>
                        Właśnie zgłosiłeś chęć udziału w szkoleniu “'.$training_title.'” w dniu '.$training_date.'. <br>
                        Aby potwierdzić swój udział kliknij na link: <br>
                        [LINK]

                    </p>';
    $content    .= '<p>Pozdrawiamy! <br> Zespół Punktu dla Przyrody</p>';
    $confirmation_link = home_url('/confirm-booking/') . '?token=' . $confirmation_token;
    $button_text        =   __('Potwierdź udział' , 'cwb');
    $content            = str_replace('[LINK]', '<a href="' . esc_url($confirmation_link) . '">'.$button_text.'</a>', $content);
    $headers_admin = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: CWB <cwb@nfinity.pl>' 
    );
    $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
    $user_email_template    =   str_replace('{title}', $title, $email_template);
    $user_email_template    =   str_replace('{content}', $content, $user_email_template);
    wp_mail($email, $title, $user_email_template , $headers_admin);

}
function on_training_booking_status_transition($new_status, $old_status, $post) {
    if ($post->post_type === 'training_bookings' && $old_status === 'pending' && $new_status === 'draft') {
        send_email_when_status_change($post->ID);
        // Perform your action here
        // For example, you can add your custom logic or call a function
        // do_something_on_status_transition($post->ID);
    }
}

add_action('transition_post_status', 'on_training_booking_status_transition', 10, 3);


function send_email_to_subscribers_on_new_naborye_post( $post_id, $post ) {
    if ( 'naborye' !== get_post_type( $post ) || get_post_status( $post_id ) !== 'publish' ) {
        return;
    }

    $post_actions_terms = wp_get_post_terms( $post_id, 'action-categories', array( 'fields' => 'ids' ) );
    $post_programs_terms = wp_get_post_terms( $post_id, 'programa-categories', array( 'fields' => 'ids' ) );
    
    $subscribers = get_posts( array(
        'post_type'      => 'subscriber',
        'posts_per_page' => -1
    ) );
    if ( ! empty( $subscribers ) ) {
        foreach ( $subscribers as $subscriber_id ) {
            $subscriber_actions     =  maybe_unserialize(get_post_meta( $subscriber_id->ID, 'actions'  , true)) ;
            $subscriber_programs    =  maybe_unserialize(get_post_meta( $subscriber_id->ID, 'programs' , true)) ;
            $post_actions_terms     = (array) $post_actions_terms;
            $post_programs_terms    = (array) $post_programs_terms;
            $subscriber_actions     = (array) $subscriber_actions;
            $subscriber_programs    = (array) $subscriber_programs;
            if ( array_intersect( $post_actions_terms, $subscriber_actions ) || array_intersect( $post_programs_terms, $subscriber_programs ) ) {
                $subscriber_email = get_post_meta( $subscriber_id->ID, 'email', true );
                $title      = 'Powiadomienie o naborach - Punkt dla Przyrody';
                $content    = '';
                $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                    Szanowny użytkowniku!
                                    Pragniemy poinformować, że w portalu Punkt dla Przyrody pojawił się nowy nabór: <a href="'.get_permalink( $post_id ).'">'.get_the_title( $post_id ).'</a>.
                                    </p>';
                $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                Pozdrawiamy! <br>
                                Pracownicy Punktu dla Przydory
                                </p>';
                $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
                $user_email_template    =   str_replace('{title}', $title, $email_template);
                $user_email_template    =   str_replace('{content}', $content, $user_email_template);
                $headers_admin = array(
                    'Content-Type: text/html; charset=UTF-8',
                    'From: CWB <cwb@nfinity.pl>' 
                );
                wp_mail( $subscriber_email, $title, $user_email_template , $headers_admin);
            }
        }
    }
}

add_action( 'publish_naborye', 'send_email_to_subscribers_on_new_naborye_post', 10, 2 );




// function send_email_to_subscribers_on_new_szkolenia_post( $post_id, $post ) {
//     if ( 'newpost' !== get_post_type( $post ) || get_post_status( $post_id ) !== 'publish' ) {
//         return;
//     }

//     $post_actions_terms = wp_get_post_terms( $post_id, 'newcategory', array( 'fields' => 'ids' ) );
   
    
//     $subscribers = get_posts( array(
//         'post_type'      => 'subscriber',
//         'posts_per_page' => -1
//     ) );
//     if ( ! empty( $subscribers ) ) {
//         foreach ( $subscribers as $subscriber_id ) {
//             $subscriber_szkolens     =  maybe_unserialize(get_post_meta( $subscriber_id->ID, 'szkolens'  , true)) ;
           
//             $post_actions_terms     = (array) $post_actions_terms;
           
//            $subscriber_szkolens     = (array)$subscriber_szkolens;
           
//             if ( array_intersect( $post_actions_terms,$subscriber_szkolens )  ) {
//                 $subscriber_email = get_post_meta( $subscriber_id->ID, 'emails', true );
//                 $title      = 'Powiadomienie o szkoleniach - Punkt dla Przyrody';
//                 $content    = '';
//                 $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
//                                     Szanowny użytkowniku! 
//                                     Pragniemy poinformować, że w portalu Punkt dla Przyrody pojawiło się nowe szkolenie: <a href="'.get_permalink( $post_id ).'">'.get_the_title( $post_id ).'</a>.
//                                     </p>';
//                 $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
//                                 Pozdrawiamy! <br>
//                                 Pracownicy Punktu dla Przydory
//                                 </p>';
//                 $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
//                 $user_email_template    =   str_replace('{title}', $title, $email_template);
//                 $user_email_template    =   str_replace('{content}', $content, $user_email_template);
//                 $headers_admin = array(
//                     'Content-Type: text/html; charset=UTF-8',
//                     'From: CWB <cwb@nfinity.pl>' 
//                 );
//                 wp_mail( $subscriber_email, $title, $user_email_template , $headers_admin);
//             }
//         }
//     }
// }

// add_action( 'publish_newpost', 'send_email_to_subscribers_on_new_szkolenia_post', 10, 2 );
function send_email_to_subscribers_on_new_post_type( $post_id, $post ) {
    
$desired_post_type = 'newpost'; 

    if ( get_post_type( $post ) !== $desired_post_type || get_post_status( $post_id ) !== 'publish' ) {
        return;
    }
    $subscribers = get_posts( array(
        'post_type'      => 'subscriber',
        'posts_per_page' => -1
    ) );

    foreach ( $subscribers as $subscriber ) {
        $subscribed_post_type = get_post_meta( $subscriber->ID, 'subscribed_post_type', true );

        if ( get_post_type( $post ) === $subscribed_post_type ) {
            $subscriber_email = get_post_meta( $subscriber->ID, 'emails', true );
            $title      = 'Powiadomienie o szkoleniach - Punkt dla Przyrody';
                $content    = '';
                $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                    Szanowny użytkowniku! 
                                    Pragniemy poinformować, że w portalu Punkt dla Przyrody pojawiło się nowe szkolenie: <a href="'.get_permalink( $post_id ).'">'.get_the_title( $post_id ).'</a>.
                                    </p>';
                $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                Pozdrawiamy! <br>
                                Pracownicy Punktu dla Przydory
                                </p>';
                $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
                $user_email_template    =   str_replace('{title}', $title, $email_template);
                $user_email_template    =   str_replace('{content}', $content, $user_email_template);
                $headers_admin = array(
                    'Content-Type: text/html; charset=UTF-8',
                    'From: CWB <cwb@nfinity.pl>' 
                );
            wp_mail( $subscriber_email, $title, $user_email_template, $headers_admin );
        }
    }
}

add_action( 'publish_newpost', 'send_email_to_subscribers_on_new_post_type', 10, 2 );



function my_ajax_comment_submission_handler() {
    // Check for nonce security
    $nonce = $_POST['comment_form_nonce_field'];
    if (!wp_verify_nonce($nonce, 'comment_form_nonce_' . $_POST['comment_parent'])) {
        wp_die('Nonce verification failed!');
    }

    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
    
        $comment_data = array(
            'comment_post_ID'      => intval($_POST['comment_post_ID']),
            'comment_author'       => $current_user->display_name,
            'comment_author_email' => $current_user->user_email,
            'comment_content'      => sanitize_text_field($_POST['comment']),
            'comment_parent'       => intval($_POST['comment_parent']),
            'comment_approved'     => 0,
            'user_id'              => $current_user->ID
        );
    } else {
        $comment_data = array(
            'comment_post_ID'      => intval($_POST['comment_post_ID']),
            'comment_author'       => sanitize_text_field($_POST['author']),
            'comment_author_email' => sanitize_email($_POST['email']),
            'comment_content'      => sanitize_text_field($_POST['comment']),
            'comment_parent'       => intval($_POST['comment_parent']),
            'comment_approved'     => 0
        );
    }

    $comment_id = wp_new_comment($comment_data);
    if ($comment_id) {
        $admin_email = get_option('admin_email');
        $subject = 'Nowy komentarz oczekuje na moderację';
        $message = 'Nowy komentarz został przesłany i oczekuje na Twoją zgodę. Proszę sprawdź panel administracyjny WordPress.';
        wp_mail($admin_email, $subject, $message);
    }
    if ($comment_id) {
        echo 'success';
    } else {
        echo 'error';
    }

    die();
}
add_action('wp_ajax_nopriv_submit_comment_form_ajax', 'my_ajax_comment_submission_handler');
add_action('wp_ajax_submit_comment_form_ajax', 'my_ajax_comment_submission_handler');