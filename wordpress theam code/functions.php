<?PHP
include_once 'inc/post-type-shortcode.php';
include_once 'inc/ajax-calls.php';
include_once 'inc/hooks.php';
add_theme_support( 'title-tag' );
if (!function_exists('cwb_theme_setup')) {
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     *
     
     *
     * @return void
     */
    function cwb_theme_setup()
    {
        /*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         * If you're building a theme based on Twenty Twenty-One, use a find and replace
         * to change 'cwb' to the name of your theme in all the template files.
         */
        load_theme_textdomain('cwb', get_template_directory() . '/languages');

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * This theme does not use a hard-coded <title> tag in the document head,
         * WordPress will provide it for us.
         */
        add_theme_support('title-tag');

        /**
         * Add post-formats support.
         */
        add_theme_support(
            'post-formats',
            array(
                'link',
                'aside',
                'gallery',
                'image',
                'quote',
                'status',
                'video',
                'audio',
                'chat',
            )
        );

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');
        set_post_thumbnail_size(1568, 9999);

        register_nav_menus(
            array(
                'primary' => esc_html__('header menu', 'cwb'),
                'footer' => esc_html__('footer bottom menu', 'cwb'),
                'footer_inner' => esc_html__('footer inner menu', 'cwb'),
                'language_switcher' => esc_html__('Language Switcher', 'cwb'),
                'page_sidebar_menu'  => esc_html__('page sidebar menu', 'cwb')
            )
        );
        // ini_set('date.timezone', 'Europe/Warsaw');
        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'style',
                'script',
                'navigation-widgets',
            )
        );

        /*
         * Add support for core custom logo.
         *
         * @link https://codex.wordpress.org/Theme_Logo
         */
        add_theme_support(
            'custom-logo',
            array(
                'flex-width' => true,
                'flex-height' => true,
                'unlink-homepage-logo' => true,
            )
        );

        // Add theme support for selective refresh for widgets.
        add_theme_support('customize-selective-refresh-widgets');

        // Add support for Block Styles.
        add_theme_support('wp-block-styles');

        // Add support for full and wide align images.
        add_theme_support('align-wide');

        // Add support for editor styles.
        add_theme_support('editor-styles');

        // Add support for responsive embedded content.
        add_theme_support('responsive-embeds');

        // Add support for custom line height controls.
        add_theme_support('custom-line-height');

        // Add support for experimental link color control.
        add_theme_support('experimental-link-color');

        // Add support for experimental cover block spacing.
        add_theme_support('custom-spacing');

        // Add support for custom units.
        // This was removed in WordPress 5.6 but is still required to properly support WP 5.5.
        add_theme_support('custom-units');

        // Remove feed icon link from legacy RSS widget.
        add_filter('rss_widget_feed_link', '__return_empty_string');
    }
}
add_action('after_setup_theme', 'cwb_theme_setup');

// Register custom theme options for a second logo
function cwb_theme_customize_register($wp_customize)
{
    // Top Header Section
    $wp_customize->add_section(
        'top_min_header_section',
        array(
            'title'         => __('Min header Logos', 'CWB'),
            'priority'      => 30,
        )
    );

    // Define settings and controls for the top header section
    $settings_and_controls = array(
        'first_logo'            => __('English logo first', 'CWB'),
        'polish_first_logo'     => __('Mobile logo', 'CWB'),
        'first_link_control'    => __('Custom link', 'CWB'),
        'second_logo'           => __('English logo second', 'CWB'),
        'polish_second_logo'    => __('Mobile logo', 'CWB'),
        'second_link_control'   => __('Custom link', 'CWB'),
        'Third_logo'            => __('English logo second', 'CWB'),
        'polish_Third_logo'     => __('Mobile logo', 'CWB'),
        'Third_link_control'    => __('Custom link', 'CWB'),
        'Four_logo'             => __('English logo second', 'CWB'),
        'polish_Four_logo'      => __('Mobile logo', 'CWB'),
        'Four_link_control'     => __('Custom link', 'CWB')
    );

    foreach ($settings_and_controls as $setting_name => $control_label) {
        $sanitize_callback = (strpos($setting_name, '_logo') !== false) ? 'esc_url_raw' : 'esc_attr';

        $wp_customize->add_setting(
            $setting_name,
            array(
                'default' => '',
                'sanitize_callback' => $sanitize_callback,
            )
        );

        if (strpos($setting_name, '_logo') !== false) {
            $wp_customize->add_control(
                new WP_Customize_Image_Control(
                    $wp_customize,
                    $setting_name,
                    array(
                        'label'         =>      __($control_label, 'CWB'),
                        'section'       =>      'top_min_header_section',
                        'settings'      =>      $setting_name,
                    )
                )
            );
        } else {
            $wp_customize->add_control(
                $setting_name,
                array(
                    'label'             => $control_label,
                    'section'           => 'top_min_header_section',
                    'type'              => (strpos($setting_name, '_logo') !== false) ? 'image' : 'text',
                    'settings'          => $setting_name,
                    'input_attrs'       => array(
                        'placeholder'   => __('Enter link', 'CWB'),
                    ),
                )
            );
        }
    }

    // Footer Section (Define outside of the loop)
    $wp_customize->add_section(
        'footer_min_section',
        array(
            'title'             => __('Footer Logos', 'CWB'),
            'priority'          => 30,
        )
    );

    // Define settings and controls for the footer section with unique names
    $settings_footer_controls = array(
        'footer_first_logo'                 => __('Footer English logo first', 'CWB'),
        'footer_polish_first_logo'          => __('Footer Polish logo', 'CWB'),
        'footer_first_link_control'         => __('Footer Custom link', 'CWB'),
        'footer_second_logo'                => __('Footer English logo second', 'CWB'),
        'footer_polish_second_logo'         => __('Footer Polish logo', 'CWB'),
        'footer_second_link_control'        => __('Footer Custom link', 'CWB'),
        'footer_Third_logo'                 => __('Footer English logo second', 'CWB'),
        'footer_polish_Third_logo'          => __('Footer Polish logo', 'CWB'),
        'footer_Third_link_control'         => __('Footer Custom link', 'CWB'),
        'footer_Four_logo'                  => __('Footer English logo second', 'CWB'),
        'footer_polish_Four_logo'           => __('Footer Polish logo', 'CWB'),
        'footer_Four_link_control'          => __('Footer Custom link', 'CWB')
    );

    foreach ($settings_footer_controls as $setting_name => $control_label) {
        $sanitize_callback = (strpos($setting_name, '_logo') !== false) ? 'esc_url_raw' : 'esc_attr';

        $wp_customize->add_setting(
            $setting_name,
            array(
                'default' => '',
                'sanitize_callback' => $sanitize_callback,
            )
        );

        if (strpos($setting_name, '_logo') !== false) {
            $wp_customize->add_control(
                new WP_Customize_Image_Control(
                    $wp_customize,
                    $setting_name,
                    array(
                        'label'         => __($control_label, 'CWB'),
                        'section'       => 'footer_min_section',
                        'settings'      => $setting_name,
                    )
                )
            );
        } else {
            $wp_customize->add_control(
                $setting_name,
                array(
                    'label' => $control_label,
                    'section' => 'footer_min_section',
                    'type' => (strpos($setting_name, '_logo') !== false) ? 'image' : 'text',
                    'settings' => $setting_name,
                    'input_attrs' => array(
                        'placeholder' => __('Enter link', 'CWB'),
                    ),
                )
            );
        }
    }
}

add_action('customize_register', 'cwb_theme_customize_register');



function custom_theme_customizer($wp_customize) {
    // Add a custom section
    $wp_customize->add_section('site_mode_section', array(
        'title'    => __('Site Mode', 'CWB'),
        'priority' => 30,
    ));

    // Add radio buttons control
    $wp_customize->add_setting('site_mode_setting', array(
        'default'   => 'normal',
        'transport' => 'refresh', // or 'postMessage' for live preview without refreshing the page
    ));

    $wp_customize->add_control('site_mode_control', array(
        'type'     => 'radio',
        'label'    => __('Select Site Mode', 'CWB'),
        'section'  => 'site_mode_section',
        'settings' => 'site_mode_setting',
        'choices'  => array(
            'normal'  => __('Normalna', 'CWB'),
            'funeral' => __('wersja żałobna', 'CWB'),
            'xmas1'   => __('wersja bożonarodzeniowa - 1', 'CWB'),
            'xmas2'   => __('wersja bożonarodzeniowa - 2', 'CWB'),
            'easter1' => __('wersja wielkanocna - 1', 'CWB'),
            'easter2' => __('wersja wielkanocna - 2', 'CWB'),
        ),
    ));
}

add_action('customize_register', 'custom_theme_customizer');




function mytheme_enqueue_scripts()
{
    wp_enqueue_script('jquery');
    wp_enqueue_script('jquery-ui', get_stylesheet_directory_uri() . '/jquery-ui/jquery-ui.min.js',  array(), '1.0', true);
    wp_enqueue_script('clandered', "https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.8/locales-all.global.min.js", array(), '1.0', true);
    wp_enqueue_script('leafmapclender', "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", array(), '1.0', false);
    wp_enqueue_style('owl-carousel-css', get_stylesheet_directory_uri() . '/owl-carousel/assets/owl.carousel.min.css');
    wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/css/bootstrap.min.css', array(), '1.0', 'all');
    wp_enqueue_style('adminstyle-css', get_stylesheet_directory_uri() . '/css/admin-style.css', array(), '1.0', 'all');
    wp_enqueue_style('main-css', get_stylesheet_directory_uri() . '/style.css', array(), '1.0', 'all');
    wp_enqueue_style('main-vselect', get_stylesheet_directory_uri() . '/vselect/vselect.min.css', array(), '1.0', 'all');
    wp_enqueue_style('jquery-ui-css', get_stylesheet_directory_uri() . '/jquery-ui/jquery-ui.min.css', array(), '1.0', 'all');
    wp_enqueue_style('fancybox-css', get_stylesheet_directory_uri() . '/fancybox/jquery.fancybox.min.css', array(), '1.0', 'all');
	wp_enqueue_style('select2', get_stylesheet_directory_uri() . '/select2/select2.min.css', array(), '1.0', 'all');
    wp_enqueue_style('mapleaf','https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', array(), '1.0', 'all',);
    wp_enqueue_script('popper-script', get_stylesheet_directory_uri() . '/js/popper.min.js',);
	wp_enqueue_style('select2-bootstrap', get_stylesheet_directory_uri() . '/select2/select2-bootstrap-5-theme.min.css', array(), '1.0', 'all');
    wp_enqueue_script('bootstrap-script', get_stylesheet_directory_uri() . '/js/bootstrap.bundle.min.js', '1.0', true);
    wp_enqueue_script('owl-carousel-script', get_stylesheet_directory_uri() . '/owl-carousel/owl.carousel.min.js',  '1.0', true);
    wp_enqueue_script('fancybox-script', get_stylesheet_directory_uri() . '/fancybox/jquery.fancybox.min.js',  '1.0', true);
    wp_enqueue_script('custom-vselect', get_stylesheet_directory_uri() . '/vselect/vselect.js', array('jquery'), '1.0', true);
    wp_enqueue_script('dataTables-function', get_stylesheet_directory_uri() . '/data-table/jquery.dataTables.min.js', array('jquery'), '1.0', true);
    wp_enqueue_script('validate-function', get_stylesheet_directory_uri() . '/jquery-validate/jquery.validate.min.js', array('jquery'), '1.0', true);
    wp_enqueue_script('claenderjs', get_stylesheet_directory_uri() . '/js/index.global.min.js',);
	
	wp_enqueue_script('select2-js', get_stylesheet_directory_uri() . '/select2/select2.full.min.js', array(), '1.0', true);
	wp_enqueue_script('us-states-script', get_stylesheet_directory_uri() . '/js/us-states.js', array('jquery'), '1.0', false);
    wp_enqueue_script('custom-script', get_stylesheet_directory_uri() . '/js/scripts.js',);

    $localized_strings = array(
        'requiredFieldMessage' => __('Wpisz co najmniej jedną literę dla pola ', 'cwb'),
        'invalidEmailMessage' => __('Wpisz poprawny adres e-mail.', 'cwb'),
        // Add more localized strings as needed
    );

    // Localize the script with the defined strings
    wp_localize_script('custom-script', 'customScriptLocalized', $localized_strings);
    
    // $json_data_path = '/posts-data.json';
    // // echo trailingslashit(site_url());
    // wp_localize_script('custom-script', 'customData', array('jsonPath' => $json_data_path));<script type="text/javascript" src="vselect/vselect.js"></script>
}

add_action('wp_enqueue_scripts', 'mytheme_enqueue_scripts');

function localize_ajax_object() {
    wp_localize_script('custom-script', 'ajax_object', array(
        'ajax_url'      => admin_url('admin-ajax.php'),
        'ajax_nonce'    => wp_create_nonce('my_ajax_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'localize_ajax_object');

function enqueue_admin_bootstrap()
{
    $current_screen = get_current_screen();

    // Check if we are on the Gutenberg editor screen
    if ($current_screen && 'post' === $current_screen->base && post_type_supports($current_screen->post_type, 'editor')) {
        wp_enqueue_script('jquery');
        wp_enqueue_script('calendarjs', get_stylesheet_directory_uri() . '/js/index.global.min.js', array('jquery'), '1.0', true);
       
        wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/css/bootstrap.min.css', array(), '1.0', 'all');
        wp_enqueue_script('bootstrap-script', get_stylesheet_directory_uri() . '/js/bootstrap.bundle.min.js', array('jquery'), '1.0', true);
        wp_enqueue_style('owl-carousel-css', get_stylesheet_directory_uri() . '/owl-carousel/assets/owl.carousel.min.css');
        wp_enqueue_script('owl-carousel-script', get_stylesheet_directory_uri() . '/owl-carousel/owl.carousel.min.js', array('jquery'), '1.0', true);
        wp_enqueue_script('clandered', "https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.8/locales-all.global.min.js", array('jquery'), '1.0', true);
        wp_enqueue_style('fancybox-css', get_stylesheet_directory_uri() . '/fancybox/jquery.fancybox.min.css', array(), '1.0', 'all');
        wp_enqueue_style('main-css', get_stylesheet_directory_uri() . '/style.css', array(), '1.0', 'all');
        wp_enqueue_style('adminstyle-css', get_stylesheet_directory_uri() . '/css/admin-style.css', array(), '1.0', 'all');
        
        // wp_enqueue_script('jquery-ui', get_stylesheet_directory_uri() . '/jquery-ui/jquery-ui.min.js', array('jquery'), '1.0', true);
        // wp_enqueue_script('dataTables-function', get_stylesheet_directory_uri() . '/data-table/jquery.dataTables.min.js', array('jquery'), '1.0', true);
        // wp_enqueue_script('validate-function', get_stylesheet_directory_uri() . '/jquery-validate/jquery.validate.min.js', array('jquery'), '1.0', true);
        // wp_enqueue_script('fancybox-script', get_stylesheet_directory_uri() . '/fancybox/jquery.fancybox.min.js', array('jquery'), '1.0', true);
       
        wp_enqueue_script('custom-script', get_stylesheet_directory_uri() . '/js/scripts.js', array('jquery'), '1.0', true);
        $localized_strings = array(
            'requiredFieldMessage' => __('Wpisz co najmniej jedną literę dla pola.', 'cwb'),
            'invalidEmailMessage' => __('Wpisz poprawny adres e-mail.', 'cwb'),
            // Add more localized strings as needed
        );
    
        // Localize the script with the defined strings
        wp_localize_script('custom-script', 'customScriptLocalized', $localized_strings);
    }
}
add_action('admin_enqueue_scripts', 'enqueue_admin_bootstrap');
// Disable auto <p> tags in Contact Form 7
add_filter( 'wpcf7_autop_or_not', '__return_false' );



function theme_footer_widgets_init()
{
    register_sidebar(
        array(
            'name' => __(' Footer social icon', 'cwb'),
            'id' => 'footer-sidebar',
            'description' => __('Widgets added here will appear in the footer.', 'cwb'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
    register_sidebar(
        array(
            'name' => __('Footer bottom link', 'cwb'),
            'id' => 'footer-sidebar-2',
            'description' => __('Widgets added here will appear in the footer.', 'cwb'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
    register_sidebar(
        array(
            'name' => __('Footer 3', 'cwb'),
            'id' => 'footer-sidebar-3',
            'description' => __('Widgets added here will appear in the footer.', 'cwb'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
    register_sidebar(
        array(
            'name' => __('Menu sidebar', 'cwb'),
            'id' => 'menu-sidebar',
            'description' => __('Widgets added here will appear in the footer.', 'cwb'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '',
            'after_title' => '',
        )
    );
}

add_action('widgets_init', 'theme_footer_widgets_init');

include_once 'inc/custom-post-types.php';

// function custom_breadcrumbs() {
   
//     $separator = ' <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><g opacity="0.4"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.8691 5.47962C7.06436 5.28436 7.38095 5.28436 7.57621 5.47962L10.2429 8.14628C10.4381 8.34155 10.4381 8.65813 10.2429 8.85339L7.57621 11.5201C7.38095 11.7153 7.06437 11.7153 6.8691 11.5201C6.67384 11.3248 6.67384 11.0082 6.8691 10.813L9.18222 8.49984L6.8691 6.18672C6.67384 5.99146 6.67384 5.67488 6.8691 5.47962Z" fill="#003399"/>
//     </g>
//     </svg>'; // Define the separator between breadcrumbs
//     $home_text = 'Home'; // Define the text for the home link
//     global $post;
//     echo '<div class="bread-crumbs">
//             <ul>
//                 <li>
//                     <a href="' . get_home_url() . '"><img src="' . get_stylesheet_directory_uri() . '/images/home.svg" alt="home-icon"></a>' . $separator;

//     if (is_category() || is_single()) {
//         $category = get_the_category();
//         if (!empty($category)) {
//             echo '<a href="' . get_category_link($category[0]->term_id) . '">' . $category[0]->cat_name . '</a>' . $separator;
//         }
//         if (is_single()) {
//             echo the_title();
//         }
//     } elseif (is_page()) {
//         echo the_title();
//     } elseif (is_search()) {
//         echo 'Search Results';
//     }

//     echo '</li></ul>
//         </div>';
// }


function custom_breadcrumbs() {
    global $post;
    echo '<div class="bread-crumbs"><ul>';
    echo '<li><a href="' . get_home_url() . '"><span class="visually-hidden">Home</span><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12931 0.185839C5.30287 0.0122725 5.58428 0.0122725 5.75785 0.185839L10.2023 4.63028C10.2856 4.71363 10.3325 4.82668 10.3325 4.94455V10.5001C10.3325 10.7456 10.1335 10.9446 9.88802 10.9446H0.999132C0.753672 10.9446 0.554688 10.7456 0.554688 10.5001V4.94455C0.554688 4.82668 0.601513 4.71363 0.684862 4.63028L5.12931 0.185839ZM1.44358 5.12865V10.0557H9.44358V5.12865L5.44358 1.12865L1.44358 5.12865Z" fill="#003399"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.77756 6.50022V10.5002C4.77756 10.7457 4.57858 10.9447 4.33312 10.9447C4.08766 10.9447 3.88867 10.7457 3.88867 10.5002V6.50022C3.88867 6.32561 3.91658 6.13948 3.9967 5.97923C4.07649 5.81966 4.25518 5.61133 4.55534 5.61133H6.33312C6.63327 5.61133 6.81196 5.81966 6.89175 5.97923C6.97188 6.13948 6.99978 6.32561 6.99978 6.50022V10.5002C6.99978 10.7457 6.8008 10.9447 6.55534 10.9447C6.30988 10.9447 6.11089 10.7457 6.11089 10.5002V6.50022H4.77756Z" fill="#003399"/>
    </svg></a></li>';
    if (is_single()) {
       
        $referer_url = wp_get_referer();
        $referer_parts = parse_url($referer_url);
       
       
          
        function get_title_from_url($url) {
            $response = wp_remote_get($url);
        
            if (is_wp_error($response) || wp_remote_retrieve_response_code($response) != 200) {
                // Error handling here
                return 'Error in fetching URL';
            }
        
            $html = wp_remote_retrieve_body($response);
            $dom = new DOMDocument();
        
            // Load the HTML and suppress warnings/errors
            @$dom->loadHTML($html);
        
            // Extract the title
            $titles = $dom->getElementsByTagName('title');
            if ($titles->length > 0) {
                $fullTitle = $titles[0]->nodeValue;
                // Remove site title and trim the result
                $specificTitle = str_replace('| Punkt dla Przyrody', '', $fullTitle);
                return trim($specificTitle);
            }
        
            return 'Title not found';
        }
        
           
            if (isset($referer_parts['path'])) {
                $path_parts = explode('/', $referer_parts['path']);
                $parent_page_title = '';
                
                // Check if there is a parent page title in the URL
              $parent_page_title_second_last ='';
                if (count($path_parts) > 3) {
                    $parent_page_title_second_last = $path_parts[count($path_parts) - 3];
                  
                    $third_last_url = home_url('/' . $parent_page_title_second_last . '/');
                    $page_title = get_title_from_url($third_last_url);
                }
                 
                   if (count($path_parts) > 2) {
                    $parent_page_title_last = $path_parts[count($path_parts) - 2]; 
                  
                    $parent_page_title_last_url = home_url('/' . $parent_page_title_second_last . '/' . $parent_page_title_last . '/');
                    $page_titlee = get_title_from_url($parent_page_title_last_url);
                }
               
                if(!empty( $parent_page_title_second_last)) {
                    echo '<li><a href="'.$third_last_url.'">' . ucfirst($page_title) . '</a></li>';
                }
                
                if (!empty($parent_page_title_last)) {
                    echo '<li><a href="' . esc_url($referer_url) . '">' . ucfirst($page_titlee) . '</a></li>';
                }
            }
            // print_r( $referer_url);
            echo '<li>' . get_the_title() . '</li>';
        }  
    
           
    
    
    
    elseif (is_category()) {
        $category = get_queried_object();

        echo $category->name;
    }
    elseif (is_tag()) {
        $tag = get_queried_object();
        echo '<li>Tag: ' . $tag->name . '</li>';
    }
    elseif (is_post_type_archive()) {
        echo post_type_archive_title();
    }
    elseif (is_page()) {
        $ancestors = get_post_ancestors($post);
        if ($ancestors) {
            $ancestors = array_reverse($ancestors);
            foreach ($ancestors as $ancestor) {
                echo '<li><a href="' . get_permalink($ancestor) . '">' . get_the_title($ancestor) . '</a></li>';
            }
        }
        echo '<li><span>'.get_the_title() .'</span></li>';
    }
    elseif (is_search()) {
        echo '<li>Search Results for "' . get_search_query() . '" </li>';
    }
    elseif (is_404()) {
        echo '<li>404 Not Found</li>';
    }
    echo '</ul></div>';
}



function custom_published_status_label($translated_text, $untranslated_text, $domain) {
    global $typenow;

    // Check if we are on the 'edit.php' page for the specific post type
    if ($typenow == 'training_bookings' && $untranslated_text == 'Published') {
        // Replace 'Published' with your custom label
        $translated_text = 'Lista podstawowa';
    }

    if ($typenow == 'training_bookings' && $untranslated_text == 'Draft') {
        // Replace 'Published' with your custom label
        $translated_text = 'Oczekujący';
    }
    if ($typenow == 'training_bookings' && $untranslated_text == 'Pending Review') {
        // Replace 'Published' with your custom label
        $translated_text = 'Lista rezerwowa';
    }
    return $translated_text;
}

add_filter('gettext', 'custom_published_status_label', 20, 3);

function custom_published_status_label_admin($views) {
    global $typenow;

    // Check if we are on the 'edit.php' page for the specific post type
    if ($typenow == 'training_bookings') {
        // Replace 'Published' with your custom label
        $views['publish']       = str_replace('Published', 'Lista podstawowa', $views['publish']);
        $views['draft']         = str_replace('Draft', 'Oczekujący', $views['draft']);
        $views['pending']       = str_replace('Pending', 'Lista rezerwowa', $views['pending']);
    }

    return $views;
}

add_filter('views_edit-training_bookings', 'custom_published_status_label_admin', 10, 1);




function remove_protected_text($format) {
    return '%s';
}
add_filter('protected_title_format', 'remove_protected_text');
// function add_excerpt_to_pages() {
//     add_post_type_support( 'page', 'excerpt' );
// }
// add_action( 'init', 'add_excerpt_to_pages' );


add_filter('the_password_form', 'custom_password_form');

function custom_password_form() {
    global $post;
    $label = 'pwbox-' . ( empty( $post->ID ) ? rand() : $post->ID );

    $form = '
    <div class="web-form-wrap">
        <div class="web-form">
            <form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post" class="needs-validation form-inline" novalidate>
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="' . $label . '">Hasło <span class="required">*</span></label>
                            <input type="password" class="form-control" name="post_password" id="' . $label . '" required>
                            <div class="invalid-feedback">Proszę wypełnić to pole!</div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="web-btn form-btn">
                            <button type="submit" name="Submit" class="btn btn-primary">Otwórz ankietę</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>';

    return $form;
}

                      
 add_action('wpcf7_mail_sent', 'custom_cf7_mail_sent', 10, 1);
function custom_cf7_mail_sent($contact_form)
{
      // Get the form ID
    $form_id = $contact_form->id();

    if ($form_id == 2333) { // Replace 2333 with your actual Contact Form 7 form ID
        // Get the submitted data
        $meeting_expectations               = sanitize_text_field($_POST['meeting-expectations']);
        $meeting_expectations_detail           = sanitize_text_field($_POST['meeting-expectations-detail']);
        $acquired_information              = sanitize_text_field($_POST['acquired-information']);
        $acquired_information_detail            = sanitize_text_field($_POST['acquired-information-detail']);
        $acquired_knowledge  = sanitize_text_field($_POST['acquired-knowledge']);
        $acquired_knowledge_detail              = sanitize_text_field($_POST['acquired-knowledge-detail']);
        $meeting_agenda          = sanitize_text_field($_POST['meeting-agenda']);
        $meeting_agenda_detail            = sanitize_text_field($_POST['meeting-agenda-detail']);
        $substantive_preparation = sanitize_text_field($_POST['substantive-preparation']);
        $substantive_preparation_detail    = sanitize_text_field($_POST['substantive-preparation-detail']);
        $comprehensibility        = sanitize_text_field($_POST['comprehensibility']);
        $comprehensibility_detail        = sanitize_text_field($_POST['comprehensibility-detail']);
        $reliability        = sanitize_text_field($_POST['reliability']);
        $reliability_detail        = sanitize_text_field($_POST['reliability-detail']);
        $interest_participants        = sanitize_text_field($_POST['interest-participants']);
        $interest_participants_detail        = sanitize_text_field($_POST['interest-participants-detail']);
        $training_program        = sanitize_text_field($_POST['training-program']);
        $training_program_detail        = sanitize_text_field($_POST['training-program-detail']);
        $training_materials        = sanitize_text_field($_POST['training-materials']);
        $training_materials_detail        = sanitize_text_field($_POST['training-materials-detail']);
        $usefulness_training_materials        = sanitize_text_field($_POST['usefulness-training-materials']);
        $usefulness_training_materials_detail        = sanitize_text_field($_POST['usefulness-training-materials-detail']);
        $location_training        = sanitize_text_field($_POST['location-training']);
        $location_training_detail        = sanitize_text_field($_POST['location-training-detail']);
        $room_details        = sanitize_text_field($_POST['room-details']);
        $room_details_detail        = sanitize_text_field($_POST['room-details-detail']);
        $accommodation        = sanitize_text_field($_POST['accommodation']);
        $accommodation_detail        = sanitize_text_field($_POST['accommodation-detail']);
        $food_quality        = sanitize_text_field($_POST['food-quality']);
        $food_quality_detail        = sanitize_text_field($_POST['food-quality-detail']);
        $application        = sanitize_text_field($_POST['application']);
        $application_detail        = sanitize_text_field($_POST['application-detail']);
        $training_topics        = sanitize_text_field($_POST['training-topics']);
        $training_topics_detail        = sanitize_text_field($_POST['training-topics-detail']);
        $nature_point        = sanitize_text_field($_POST['nature-point']);
        $knowledge        = sanitize_text_field($_POST['knowledge']);
        // ... (repeat for other form fields)

        $submission = WPCF7_Submission::get_instance();
        if ($submission) {
            $posted_data = $submission->get_posted_data();

            // Get the hidden_post_id value
            $hidden_post_id = isset($posted_data['hiddenfield']) ? intval($posted_data['hiddenfield']) : 0;

            // Get the post title based on the hidden_post_id
            $post = get_post($hidden_post_id);
            $page_title = $post ? $post->post_title : '';

            $title = $page_title;
            $content = '';

            $content .= '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                               <b> 1. Jak oceniasz spotkanie? </b>
                            </p>';
                            $content .= '<p>1.1 Spełnienie oczekiwań:: ' . (!empty($meeting_expectations_detail) ? $meeting_expectations_detail : $meeting_expectations) . ' </p>';
            $content    .= '<p>1.2 Przydatność zdobytych informacji pod względem podnoszenia umiejętności i wiedzy: '.(!empty($acquired_information_detail) ? $acquired_information_detail : $acquired_information) .' </p>';
            $content    .= '<p>1.3 Ocena prawdopodobieństwa wykorzystania zdobytej wiedzy i umiejętności w codziennej pracy: '.(!empty($acquired_knowledge_detail) ? $acquired_knowledge_detail : $acquired_knowledge) .' </p>';
            $content    .= '<p> 1.4 Jak oceniasz program spotkania: '.(!empty($meeting_agenda_detail) ? $meeting_agenda_detail : $meeting_agenda) .' </p>';
            $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                <b> 2. Jak oceniasz trenera/szkoleniowca prowadzącego/prowadzących szkolenie? </b>
                            </p>';
            $content    .= '<p>2.1 Przygotowanie merytoryczne  : '.(!empty($substantive_preparation_detail) ? $substantive_preparation_detail : $substantive_preparation) .' </p>';
            $content    .= '<p>2.2 Jasność/ zrozumiałość przekazu: '.(!empty($comprehensibility_detail) ? $comprehensibility_detail : $comprehensibility) .' </p>';
            $content    .= '<p>2.3 Rzetelność, profesjonalizm, zaangażowanie w udzielaniu odpowiedzi na pytania: '.(!empty($reliability_detail) ? $reliability_detail : $reliability) .' </p>';
            $content    .= '<p>2.4 Umiejętność zainteresowania uczestników tematem i zaangażowania ich szkoleniem: '.(!empty($interest_participants_detail) ? $interest_participants_detail : $interest_participants) .' </p>';
            $content    .= '<p>2.5 Stopień zrealizowania programu szkolenia: '.(!empty($training_program_detail) ? $training_program_detail : $training_program) .' </p>';
            $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                <b>3. Jak oceniasz materiały szkoleniowe? </b>
                            </p>';
            $content    .= '<p>3.1 Jakość materiałów szkoleniowych (tj. czytelność, forma): '.(!empty($training_materials_detail) ? $training_materials_detail : $training_materials) .' </p>';
            $content    .= '<p>3.2 Przydatność materiałów szkoleniowych w pracy zawodowej: '.(!empty($usefulness_training_materials_detail) ? $usefulness_training_materials_detail : $usefulness_training_materials) .' </p>';
            $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                <b> 4. Jak oceniasz stronę organizacyjną spotkania? </b>
                            </p>';
            $content    .= '<p>4.1 Lokalizacja szkolenia/spotkania/dnia otwartego (jeśli dotyczy): '.(!empty($location_training_detail) ? $location_training_detail : $location_training) .' </p>';
            $content    .= '<p> 4.2 Sala, w której odbyło się szkolenie/spotkanie/dzień otwarty np. czystość, oświetlenie, klimatyzacja (o ile dotyczy): '.(!empty( $room_details_detail) ?  $room_details_detail : $room_details) .' </p>';
            $content    .= '<p>4.3 Jakość zakwaterowania (dotyczy osób korzystających z noclegu): '.(!empty( $accommodation_detail) ?  $accommodation_detail :  $accommodation) .' </p>';
            $content    .= '<p> 4.4 Jakość wyżywienia (jeśli dotyczy): '.(!empty($food_quality_detail) ? $food_quality_detail : $food_quality) .' </p>';
            $content    .= '<p>4.5 Łatwość logowania się i obsługi aplikacji do udziału w webinarium (jeśli dotyczy): '.(!empty( $application_detail) ?  $application_detail :  $application) .' </p>';
            $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                <b>5. Wskaż tematy szkoleń, które Cię interesują (jeśli dotyczy) </b>
                            </p>';
            $content    .= '<p> '.(!empty($training_topics_detail) ? $training_topics_detail : $training_topics) .' </p>';
            $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                <b> 6. Skąd dowiedziałeś/aś się o Punkcie dla Przyrody? (w przypadku medium proszę o podanie nazwy/tytułu) </b>
                            </p>';
            $content    .= '<p> '.$nature_point.' </p>';
            $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                <b> 7. Skąd czerpiesz wiedzę nt. funduszy europejskich ? </b>
                            </p>';
            $content    .= '<p> '.$knowledge.' </p>';
            // Email template
            $email_template = file_get_contents(get_template_directory() . '/inc/email-template.html');
            $user_email_template = str_replace('{title}', $title, $email_template);
            $user_email_template = str_replace('{content}', $content, $user_email_template);

            // Prepare email content

            // Send email to admin
            $to = get_option('admin_email');
            $subject = 'Contact Form Submission from ' . $page_title;
            $headers_admin = array(
                'Content-Type: text/html; charset=UTF-8',
                'From: CWB <cwb@nfinity.pl>'
            );

            wp_mail($to, $title, $user_email_template, $headers_admin);
        }
    }
}
add_action('wp_footer', function () {
    wp_dequeue_style('core-block-supports');
});






function my_custom_settings_init() {
    // Register the first email setting
    register_setting('general', 'my_custom_emailli', array(
        'type'              => 'string',
        'description'       => 'Q&A Admin Email Address',
        'sanitize_callback' => 'sanitize_text_field',
        'show_in_rest' => false,
    ));

    // Add the first email field to the "General" settings page
    add_settings_field(
        'my_first_custom_email_field', 
        __('Add Q&A Admin email ', 'cwb'), 
        'my_first_custom_email_field_render', 
        'general'
    );
     register_setting('general', 'my_custom_email-new', array(
        'type' => 'string',
        'description' => 'Form Admin Email Address',
        'sanitize_callback' => 'sanitize_text_field',
        'show_in_rest' => false,
    ));
    add_settings_field(
        'my_four_custom_email_field', 
        __('Admin Audyt', 'cwb'), 
        'my_four_custom_email_field_render', 
        'general'
    );

    // Register the second email setting
    register_setting('general', 'my_newpartner_emailli', array(
        'type' => 'string',
        'description' => 'partner Email Address',
        'sanitize_callback' => 'sanitize_text_field',
        'show_in_rest' => false,
    ));
    // Add the second email field to the "General" settings page
    add_settings_field(
        'my_second_custom_email_field', 
        __('Add new partner email', 'cwb'), 
        'my_second_custom_email_field_render', 
        'general'
    );
    // Register the second email setting
    register_setting('general', 'my_nametraining_emailli', array(
        'type' => 'string',
        'description' => 'traning Email Address',
        'sanitize_callback' => 'sanitize_text_field',
        'show_in_rest' => false,
    ));

    // Add the second email field to the "General" settings page
    add_settings_field(
        'my_third_custom_email_field', 
        __('Add new traning email', 'cwb'), 
        'my_third_custom_email_field_render', 
        'general'
    );

    
    register_setting('general', '_cwb_audyt_admin_email', array(
        'type'              => 'string',
        'description'       => 'Audyt admin Email Address',
        'sanitize_callback' => 'sanitize_text_field',
        'show_in_rest' => false,
    ));
    add_settings_field(
        '_cwb_audyt_admin_email', 
        __('w biurze PdP ', 'cwb'), 
        '_cwb_audyt_admin_email_render', 
        'general'
    );
    register_setting('general', 'submit_booking_form', array(
        'type'              => 'string',
        'description'       => 'submit booking form',
        'sanitize_callback' => 'sanitize_text_field',
        'show_in_rest' => false,
    ));
    add_settings_field(
        'submit_booking_form', 
        __(' Admin Konsultacje ', 'cwb'), 
        'submit_booking_form_render', 
        'general'
    );
}
function _cwb_audyt_admin_email_render() {
    $value = get_option('_cwb_audyt_admin_email');
    echo '<input type="email" id="my_first_custom_email" name="_cwb_audyt_admin_email" value="' . esc_attr($value) . '" class="regular-text ltr" />';
}
function sanitize_email_array($emails) {
    if (!is_array($emails)) {
        return '';
    }
    return array_map('sanitize_email', $emails);
}
function submit_booking_form_render() {
    $value = get_option('submit_booking_form');
    echo '<input type="text" id="my_four_custom_email_field" name="submit_booking_form" value="' . esc_attr($value) . '" class="regular-text ltr" />';
}

function my_four_custom_email_field_render() {
    $value = get_option('my_custom_email-new');
    echo '<input type="text" id="my_four_custom_email_field" name="my_custom_email-new" value="' . esc_attr($value) . '" class="regular-text ltr" />';
}
function my_first_custom_email_field_render() {
    $value = get_option('my_custom_emailli');
    echo '<input type="text" id="my_first_custom_email" name="my_custom_emailli" value="' . esc_attr($value) . '" class="regular-text ltr" />';
}

function my_second_custom_email_field_render() {
    $value = get_option('my_newpartner_emailli');
    echo '<input type="text" id="my_second_custom_email" name="my_newpartner_emailli" value="' . esc_attr($value) . '" class="regular-text ltr" />';
}
function my_third_custom_email_field_render() {
    $value = get_option('my_nametraining_emailli');
    echo '<input type="text" id="my_second_custom_email" name="my_nametraining_emailli" value="' . esc_attr($value) . '" class="regular-text ltr" />';
}

add_action('admin_init', 'my_custom_settings_init');

// add_action('wp', 'my_schedule_daily_event');

// function my_schedule_daily_event() {
//     // Use wp_next_scheduled to check if the event is already scheduled
//     if (!wp_next_scheduled('my_daily_event_hook')) {
//         // Schedule the event to run once daily
//         wp_schedule_event(time(), 'daily', 'my_daily_event_hook');
//     }
// }

// // Hook your custom function to the custom action
// add_action('my_daily_event_hook', 'send_email_to_user_dateend');

add_action('init', 'send_email_to_user_dateend');
function send_email_to_user_dateend() {
    $today = new DateTime();
    $today_formatted = $today->format('Y-m-d');

    // First Query: Fetch all training_bookings posts
    $training_bookings_query = new WP_Query(array(
        'post_type' => 'training_bookings',
        'post_status' => 'publish',
        'posts_per_page' => -1,
    ));

    if ($training_bookings_query->have_posts()) {
        while ($training_bookings_query->have_posts()) {
            $training_bookings_query->the_post();
            $post_id = get_the_ID();

            // Get training_id for each booking
            $training_id = get_post_meta($post_id, 'training_id', true);

            if (!empty($training_id)) {
                // Fetch the training post by training_id
                $training_post = get_post($training_id);

                if ($training_post && 'publish' === $training_post->post_status) {

                    $end_dater = get_post_meta($training_id, 'end_date', true);
                    $date_time = new DateTime($end_dater);
                    $end_date = $date_time->format('Y-m-d');
                    $start_dater = get_post_meta($training_id, 'start_date', true);
                    $address = get_post_meta($training_id, 'set_location', true);
                    $zomm_link = get_post_meta($training_id, 'zoom_link', true);
                    $training_namee = $training_post->post_title;
                    if (!empty($start_dater)) {
                        $start_date_obj = new DateTime($start_dater);
                        $start_date_time = new DateTime($start_dater);
                      
                        $start_datee = $start_date_obj->format('d-m-Y');
                        // Format the DateTime object to get just the time
                        $start_time = $start_date_time->format('H:i');
                        $start_date_obj->modify('-2 days');
                        $two_days_after_start = $start_date_obj->format('Y-m-d');

                        if ($two_days_after_start == $today_formatted) {
                            $email_sent = get_post_meta($post_id, 'email_already_sent_user', true);
                                if ($email_sent) {
                                    return; // Email has already been sent for this post
                                }
                            $email =  get_post_meta($post_id, 'email', true);
                            update_post_meta($post_id, 'email_already_sent_user', 'email is already sent user');
                                $title          =   '';
                                $content        =   '';
                                $admincontent   =   '';
                                $admintitle     =   '';
                                $title      = 'Przypomnienie o szkoleniu - Punkt dla Przyrody';
                                $content    = '';
                                $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                                    
                                Przypominamy o szkoleniu “'.$training_namee.'” w dniu  '.$start_datee.'  o godzinie  '.$start_time.'.<br>

                                Miejsce szkolenia:  '.$address.' 
                                
                                 </p>';
                                if(!empty($zomm_link)) {
                                    $content            .= '<a href="'.$zomm_link.'">Link do szkolenia</a><br><br>';
                                }                
                               
                                $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">                   
                                                    Prosimy o punktualne przybycie.<br>

                                                    Do zobaczenia! <br>
                                                    
                                                    Pracownicy Punktu dla Przyrody
                                                </p>';
                               
                                $headers_admin = array(
                                    'Content-Type: text/html; charset=UTF-8',
                                    'From: CWB <cwb@nfinity.pl>' 
                                );
                                $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
                                $user_email_template    =   str_replace('{title}', $title, $email_template);
                                $user_email_template    =   str_replace('{content}', $content, $user_email_template);
                                wp_mail($email, $title, $user_email_template , $headers_admin);
                        }
                    }
                    if (!empty($end_date) && $end_date == $today_formatted) {
                            // If the end_date is today or earlier, add to matching bookings
                            $email_sent = get_post_meta($post_id, 'email_already_sent_user_fianldays', true);
                            if ($email_sent) {
                                return; // Email has already been sent for this post
                            }
                            $start_date_obj = new DateTime($start_dater);
                            
                            // Format the DateTime object to get just the time
                            
                            $start_datee = $start_date_obj->format('d-m-Y');
                            $email =  get_post_meta($post_id, 'email', true);
                            update_post_meta($post_id, 'email_already_sent_user_fianldays', 'email is already sent user final');
                            $title          =   '';
                            $content        =   '';
                            $admincontent   =   '';
                            $admintitle     =   '';
                            $title      = 'Dziękujemy za udział w szkoleniu!';
                            $content    = '';
                            $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">
                                                Serdecznie dziękujemy za udział w szkoleniu “'.$training_namee.'” w dniu  '.$start_datee.'. <br>

                                                Przypominamy, że na naszej stronie możesz zapisać się na inne szkolenia: <br> </p>';
                                                
                            $content            .= '<a href="https://punktdlaprzyrody.lasy.gov.pl/wez-udzial-w-szkoleniu/wyszukiwarka-szkolen-i-innych-spotkan/">LISTA SZKOLEŃ</a><br><br>';
                            $content    .=  '<p style="-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;margin-top:0;margin-bottom:15px;line-height:1.6;">                   
                                                Pozdrawiamy i do zobaczenia! <br>
                                                
                                                Pracownicy Punktu dla Przyrody 
                        
                                            </p>';
                        
                            $headers_admin = array(
                                'Content-Type: text/html; charset=UTF-8',
                                'From: CWB <cwb@nfinity.pl>' 
                            );
                            $email_template         =   file_get_contents(get_template_directory() . '/inc/email-template.html');
                            $user_email_template    =   str_replace('{title}', $title, $email_template);
                            $user_email_template    =   str_replace('{content}', $content, $user_email_template);
                            wp_mail($email, $title, $user_email_template , $headers_admin);
                        }

                }
            }
        }
        wp_reset_postdata(); // Reset the post data after the loop
    }
}


// function modify_search_query( $query ) {
//     if ( !is_admin() && $query->is_main_query() && $query->is_search() ) {
//         $sort_order = isset($_GET['sort']) ? $_GET['sort'] : 'd