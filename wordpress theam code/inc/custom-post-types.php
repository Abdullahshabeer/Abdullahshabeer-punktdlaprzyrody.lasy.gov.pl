<?PHP
function custom_post_type_naborye()
{

    $labels = array(
        'name' => _x('Nabory', 'Post Type General Name', 'cwb'),
        'singular_name' => _x('Nabory', 'Post Type Singular Name', 'cwb'),
        'menu_name' => __('Nabory', 'cwb'),
        'name_admin_bar' => __('Nabory', 'cwb'),
        'archives' => __('Archiwum Nabory', 'cwb'),
        
        'parent_item_colon' => __('Rodzic naboryi:', 'cwb'),
        'all_items' => __('Wszystkie Nabory', 'cwb'),
        'add_new_item' => __('Dodaj nowy naboryę', 'cwb'),
        'add_new' => __('Dodaj nowy', 'cwb'),
        'new_item' => __('Nowa Nabory', 'cwb'),
        'edit_item' => __('Edytuj Nabory', 'cwb'),
        'update_item' => __('Aktualizuj Nabory', 'cwb'),
        'view_item' => __('Zobacz Nabory', 'cwb'),
        'view_items' => __('Zobacz Nabory', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'not_found' => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash' => __('Nic nie znaleziono w koszu', 'cwb'),
        'featured_image' => __('Obrazek wyróżniający', 'cwb'),
        'set_featured_image' => __('Ustaw obrazek wyróżniający', 'cwb'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'cwb'),
        'use_featured_image' => __('Użyj jako obrazek wyróżniający', 'cwb'),
        'insert_into_item' => __('Wstaw do naboryi', 'cwb'),
        'uploaded_to_this_item' => __('Dodano do naboryi', 'cwb'),
        'items_list' => __('Lista naboryi', 'cwb'),
        'items_list_navigation' => __('Nawigacja po liście naboryi', 'cwb'),
        'filter_items_list' => __('Filtruj listę naboryi', 'cwb'),
    );
    $args = array(
        'label' => __('Nabory', 'cwb'),
        'description' => __('naborye', 'cwb'),
        'labels' => $labels,
        'supports' => array('title', 'author','editor', 'thumbnail', 'custom-fields', 'excerpt', 'page-attributes','comments'),
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-editor-table',
        'show_in_admin_bar' => true,
		'rewrite'       => array('slug' => 'naborye'),
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        
    );
    register_post_type('naborye', $args);


    $labels = array(
        'name' => _x('Lista subskrybentów Naborów', 'Post Type General Name', 'cwb'),
        'singular_name' => _x('subskrybentów Naborów', 'Post Type Singular Name', 'cwb'),
        'menu_name' => __('Lista subskrybentów Naborów', 'cwb'),
        'name_admin_bar' => __('Nabory', 'cwb'),
        'archives' => __('Archiwum Nabory', 'cwb'),
        
        'parent_item_colon' => __('Rodzic naboryi:', 'cwb'),
        'all_items' => __('Wszystkie Nabory', 'cwb'),
        'add_new_item' => __('Dodaj nowy naboryę', 'cwb'),
        'add_new' => __('Dodaj nowy', 'cwb'),
        'new_item' => __('Nowa Nabory', 'cwb'),
        'edit_item' => __('Edytuj Nabory', 'cwb'),
        'update_item' => __('Aktualizuj Nabory', 'cwb'),
        'view_item' => __('Zobacz Nabory', 'cwb'),
        'view_items' => __('Zobacz Nabory', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'not_found' => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash' => __('Nic nie znaleziono w koszu', 'cwb'),
        'featured_image' => __('Obrazek wyróżniający', 'cwb'),
        'set_featured_image' => __('Ustaw obrazek wyróżniający', 'cwb'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'cwb'),
        'use_featured_image' => __('Użyj jako obrazek wyróżniający', 'cwb'),
        'insert_into_item' => __('Wstaw do naboryi', 'cwb'),
        'uploaded_to_this_item' => __('Dodano do naboryi', 'cwb'),
        'items_list' => __('Lista naboryi', 'cwb'),
        'items_list_navigation' => __('Nawigacja po liście naboryi', 'cwb'),
        'filter_items_list' => __('Filtruj listę naboryi', 'cwb'),
    );
    $args = array(
        'label' => __('subscribers of posts Nabory', 'cwb'),
        'description' => __('naborye', 'cwb'),
        'labels' => $labels,
        'supports' => array('title', 'author','editor', 'thumbnail', 'custom-fields', 'excerpt', 'page-attributes','comments'),
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-editor-table',
        'show_in_admin_bar' => true,
		'rewrite'       => array('slug' => 'subscribers-nabory'),
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        
    );
    register_post_type('naborye-subscribers', $args);

    $labels = array(
        'name'                  => __('Audyt', 'cwb'),
        'singular_name'         => __('Audyt', 'cwb'),
        'add_new'               => __('Add New Audyt', 'cwb'),
        'add_new_item'          => __('Add New Audyt', 'cwb'),
        'edit_item'             => __('Edit Audyt', 'cwb'),
        'new_item'              => __('New Audyt', 'cwb'),
        'view_item'             => __('View Audyt', 'cwb'),
        'search_items'          => __('Szukaj', 'cwb'),
        'not_found'             => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash'    => __('Nic nie znaleziono in trash', 'cwb'),
    );

    $args = array(
        'labels'            => $labels,
        'public'            => true,
        'has_archive'       => true,
        'menu_icon'         => 'dashicons-calendar',
        'menu_position'     => 20,
        'supports'          => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields' ),
        
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public'            => true,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'menu_position'     => 5,
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export'        => true,
        'has_archive'       => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
    );

    register_post_type('audyt', $args);

}
add_action('init', 'custom_post_type_naborye', 0);

// Register custom taxonomy for your custom post type
function custom_taxonomy() {

    $labels = array(
        'name' => _x('Kategorie', 'taxonomy general name', 'cwb'),
        'singular_name' => _x('Audyt Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All Audyt Categories', 'cwb'),
        'parent_item' => __('Parent Audyt Category', 'cwb'),
        'parent_item_colon' => __('Parent Audyt Category:', 'cwb'),
        'edit_item' => __('Edit Audyt Category', 'cwb'),
        'update_item' => __('Update Audyt Category', 'cwb'),
        'add_new_item' => __('Add New Audyt Category', 'cwb'),
        'new_item_name' => __('New Audyt Category Name', 'cwb'),
        'menu_name' => __('Kategorie', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        'rest_base' => 'audyt-categories', // Set your custom REST base
        'rewrite' => array('slug' => 'audyt'),
    );

    register_taxonomy('audyt-categories', 'audyt', $args);
      


    $labels = array(
        'name' => _x('Kategorie', 'taxonomy general name', 'cwb'),
        'singular_name' => _x('Nabory Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All Nabory Categories', 'cwb'),
        'parent_item' => __('Parent Nabory Category', 'cwb'),
        'parent_item_colon' => __('Parent Nabory Category:', 'cwb'),
        'edit_item' => __('Edit Nabory Category', 'cwb'),
        'update_item' => __('Update Nabory Category', 'cwb'),
        'add_new_item' => __('Add New Nabory Category', 'cwb'),
        'new_item_name' => __('New Nabory Category Name', 'cwb'),
        'menu_name' => __('Kategorie', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        'rest_base' => 'nabora-categories', // Set your custom REST base
        'rewrite' => array('slug' => 'nabora'),
    );

    register_taxonomy('nabora-categories', 'naborye', $args);

    $labels = array(
        'name' => _x('subscribers Kategorie', 'taxonomy general name', 'cwb'),
        'singular_name' => _x('Nabory Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All Nabory Categories', 'cwb'),
        'parent_item' => __('Parent Nabory Category', 'cwb'),
        'parent_item_colon' => __('Parent Nabory Category:', 'cwb'),
        'edit_item' => __('Edit Nabory Category', 'cwb'),
        'update_item' => __('Update Nabory Category', 'cwb'),
        'add_new_item' => __('Add New Nabory Category', 'cwb'),
        'new_item_name' => __('New Nabory Category Name', 'cwb'),
        'menu_name' => __('Kategorie', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        'rest_base' => 'nabora-subscribers', // Set your custom REST base
        'rewrite' => array('slug' => 'subscribers-nabora'),
    );

    register_taxonomy('nabora-subscribers', 'naborye-subscribers', $args);

    $labels = array(
        'name' => _x('Programy', 'taxonomy general name', 'cwb'),
        'singular_name' => _x('Program', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Wyszukaj: Programy', 'cwb'),
        'all_items' => __('All program Categories', 'cwb'),
        'parent_item' => __('Parent program Category', 'cwb'),
        'parent_item_colon' => __('Parent program Category:', 'cwb'),
        'edit_item' => __('Edit program Category', 'cwb'),
        'update_item' => __('Update program Category', 'cwb'),
        'add_new_item' => __('Add New program Category', 'cwb'),
        'new_item_name' => __('New program Category Name', 'cwb'),
        'menu_name' => __('Programy', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        
        'rewrite' => array('slug' => 'program'),
    );

    register_taxonomy('programa-categories', 'naborye', $args);


    $labels = array(
        'name' => _x('calls Schedule', 'taxonomy general name', 'cwb'),
        'singular_name' => _x('calls Schedule', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All calls Schedule Categories', 'cwb'),
        'parent_item' => __('Parent calls Schedule Category', 'cwb'),
        'parent_item_colon' => __('Parent calls Schedule Category:', 'cwb'),
        'edit_item' => __('Edit calls Schedule Category', 'cwb'),
        'update_item' => __('Update calls Schedule Category', 'cwb'),
        'add_new_item' => __('Add New calls Schedule Category', 'cwb'),
        'new_item_name' => __('New calls Schedule Category Name', 'cwb'),
        'menu_name' => __('Harmonogramy', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        
        'rewrite' => array('slug' => 'schedule'),
    );

    register_taxonomy('Schedulesa-categories', 'naborye', $args);

    $labels = array(
        'name' => _x('location', 'taxonomy general name', 'cwb'),
        'singular_name' => _x('location', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All location Categories', 'cwb'),
        'parent_item' => __('Parent location Category', 'cwb'),
        'parent_item_colon' => __('Parent location Category:', 'cwb'),
        'edit_item' => __('Edit location Category', 'cwb'),
        'update_item' => __('Update location Category', 'cwb'),
        'add_new_item' => __('Add New location Category', 'cwb'),
        'new_item_name' => __('New location Category Name', 'cwb'),
        'menu_name' => __('Lokalizacja', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        
        'rewrite' => array('slug' => 'locatio'),
    );

    register_taxonomy('location-categories', 'naborye', $args);

    $labels = array(
        'name' => _x('action', 'taxonomy general name', 'cwb'),
        'singular_name' => _x('action', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All action Categories', 'cwb'),
        'parent_item' => __('Parent action Category', 'cwb'),
        'parent_item_colon' => __('Parent action Category:', 'cwb'),
        'edit_item' => __('Edit action Category', 'cwb'),
        'update_item' => __('Update action Category', 'cwb'),
        'add_new_item' => __('Add New action Category', 'cwb'),
        'new_item_name' => __('New action Category Name', 'cwb'),
        'menu_name' => __('Działania', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        
        'rewrite' => array('slug' => 'actio'),
    );

    register_taxonomy('action-categories', 'naborye', $args);

   


    
}

// Hook into the init action and register the taxonomy
add_action('init', 'custom_taxonomy');



// Default Post Type (Post)
function create_custom_post_type() {
   
    $labels = array(
        'name'                  => _x('Szkolenia', 'Post Type General Name', 'cwb'),
        'singular_name'         => _x('Szkolenia', 'Post Type Singular Name', 'cwb'),
        'menu_name'             => __('Szkolenia', 'cwb'),
        'name_admin_bar'        => __('Szkolenia', 'cwb'),
        'archives'              => __('Archiwum Szkolenia', 'cwb'),
        'parent_item_colon'     => __('Rodzic Szkoleniai:', 'cwb'),
        'all_items'             => __('Wszystkie Szkolenia', 'cwb'),
        'add_new_item'          => __('Dodaj nowy Szkoleniaę', 'cwb'),
        'add_new'               => __('Dodaj nowy', 'cwb'),
        'new_item'              => __('Nowa Szkolenia', 'cwb'),
        'edit_item'             => __('Edytuj Szkolenia', 'cwb'),
        'update_item'           => __('Aktualizuj Szkolenia', 'cwb'),
        'view_item'             => __('Zobacz Szkolenia', 'cwb'),
        'view_items'            => __('Zobacz Szkolenia', 'cwb'),
        'search_items'          => __('Szukaj', 'cwb'),
        'not_found'             => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash'    => __('Nic nie znaleziono w koszu', 'cwb'),
        'featured_image'        => __('Obrazek wyróżniający', 'cwb'),
        'set_featured_image'    => __('Ustaw obrazek wyróżniający', 'cwb'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'cwb'),
        'use_featured_image'    => __('Użyj jako obrazek wyróżniający', 'cwb'),
        'insert_into_item'      => __('Wstaw do Szkoleniai', 'cwb'),
        'uploaded_to_this_item' => __('Dodano do Szkoleniai', 'cwb'),
        'items_list'            => __('Lista Szkoleniai', 'cwb'),
        'items_list_navigation' => __('Nawigacja po liście Szkoleniai', 'cwb'),
        'filter_items_list'     => __('Filtruj listę Szkoleniai', 'cwb'),
    );
    $args = array(
        'label'                 => __('Szkolenia', 'cwb'),
        'description'           => __('Szkoleniae', 'cwb'),
        'labels' => $labels,
        'supports' => array('title', 'author','editor', 'thumbnail', 'custom-fields', 'excerpt', 'page-attributes','comments'),
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-editor-table',
        'show_in_admin_bar' => true,
		'rewrite'       => array('slug' => 'szkolenia'),
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        
    );
    register_post_type('newpost', $args);
   
}
add_action('init', 'create_custom_post_type');

function create_custom_taxonomy() {
    register_taxonomy('newcategory', 'newpost', array(
        'labels' => array(
            'name' => __('Kategorie'),
            'singular_name' => __('newCategory'),
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'newcategories'),
    ));
    register_meta('post', 'custom_text_field', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
        'sanitize_callback' => 'sanitize_text_field', // You can choose a sanitization function
        'auth_callback' => function () {
            return current_user_can('edit_posts'); // Modify the capability as needed
        },
    ));
    
    
    
   
}
add_action('init', 'create_custom_taxonomy');



function custom_post_type_Aktualnoci()
{

    $labels = array(
        'name' => _x('Aktualności', 'Post Type General Name', 'cwb'),
        'singular_name' => _x('Aktualności', 'Post Type Singular Name', 'cwb'),
        'menu_name' => __('Aktualności', 'cwb'),
        'name_admin_bar' => __('Aktualności', 'cwb'),
        'archives' => __('Archiwum Aktualności', 'cwb'),
        
        'parent_item_colon' => __('Rodzic Aktualnościi:', 'cwb'),
        'all_items' => __('Wszystkie Aktualności', 'cwb'),
        'add_new_item' => __('Dodaj nowy Aktualnościę', 'cwb'),
        'add_new' => __('Dodaj nowy', 'cwb'),
        'new_item' => __('Nowa Aktualności', 'cwb'),
        'edit_item' => __('Edytuj Aktualności', 'cwb'),
        'update_item' => __('Aktualizuj Aktualności', 'cwb'),
        'view_item' => __('Zobacz Aktualności', 'cwb'),
        'view_items' => __('Zobacz Aktualności', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'not_found' => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash' => __('Nic nie znaleziono w koszu', 'cwb'),
        'featured_image' => __('Obrazek wyróżniający', 'cwb'),
        'set_featured_image' => __('Ustaw obrazek wyróżniający', 'cwb'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'cwb'),
        'use_featured_image' => __('Użyj jako obrazek wyróżniający', 'cwb'),
        'insert_into_item' => __('Wstaw do Aktualnościi', 'cwb'),
        'uploaded_to_this_item' => __('Dodano do Aktualnościi', 'cwb'),
        'items_list' => __('Lista Aktualnościi', 'cwb'),
        'items_list_navigation' => __('Nawigacja po liście Aktualnościi', 'cwb'),
        'filter_items_list' => __('Filtruj listę Aktualnościi', 'cwb'),
    );
    $args = array(
        'label' => __('Aktualności', 'cwb'),
        'description' => __('Aktualnoście', 'cwb'),
        'labels' => $labels,
        'supports' => array('title', 'author','editor', 'thumbnail', 'custom-fields', 'excerpt', 'page-attributes','comments'),
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-editor-table',
        'show_in_admin_bar' => true,
		'rewrite'       => array('slug' => 'aktualnoci'),
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        
    );
    register_post_type('aktualnoci', $args);


    $labels = array(
        'name' => _x(' Categories', 'taxonomy general name', 'cwb'),
        'singular_name' => _x(' Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All Aktualności Categories', 'cwb'),
        'parent_item' => __('Parent Aktualności Category', 'cwb'),
        'parent_item_colon' => __('Parent Aktualności Category:', 'cwb'),
        'edit_item' => __('Edit Aktualności Category', 'cwb'),
        'update_item' => __('Update Aktualności Category', 'cwb'),
        'add_new_item' => __('Add New Aktualności Category', 'cwb'),
        'new_item_name' => __('New Aktualności Category Name', 'cwb'),
        'menu_name' => __('Categories', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        'rest_base' => 'Aktualności-categories', // Set your custom REST base
        'rewrite' => array('slug' => 'cataktualnoci'),
    );

    register_taxonomy('aktualnoci-categories', 'aktualnoci', $args);

    $labels = array(
        'name' => _x('Eksperci', 'Post Type General Name', 'cwb'),
        'singular_name' => _x('Eksperci', 'Post Type Singular Name', 'cwb'),
        'menu_name' => __('Eksperci', 'cwb'),
        'name_admin_bar' => __('Eksperci', 'cwb'),
        'archives' => __('Archiwum Eksperci', 'cwb'),
        
        'parent_item_colon' => __('Rodzic Ekspercii:', 'cwb'),
        'all_items' => __('Wszystkie Eksperci', 'cwb'),
        'add_new_item' => __('Dodaj nowy Ekspercię', 'cwb'),
        'add_new' => __('Dodaj nowy', 'cwb'),
        'new_item' => __('Nowa Eksperci', 'cwb'),
        'edit_item' => __('Edytuj Eksperci', 'cwb'),
        'update_item' => __('Aktualizuj Eksperci', 'cwb'),
        'view_item' => __('Zobacz Eksperci', 'cwb'),
        'view_items' => __('Zobacz Eksperci', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'not_found' => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash' => __('Nic nie znaleziono w koszu', 'cwb'),
        'featured_image' => __('Obrazek wyróżniający', 'cwb'),
        'set_featured_image' => __('Ustaw obrazek wyróżniający', 'cwb'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'cwb'),
        'use_featured_image' => __('Użyj jako obrazek wyróżniający', 'cwb'),
        'insert_into_item' => __('Wstaw do Ekspercii', 'cwb'),
        'uploaded_to_this_item' => __('Dodano do Ekspercii', 'cwb'),
        'items_list' => __('Lista Ekspercii', 'cwb'),
        'items_list_navigation' => __('Nawigacja po liście Ekspercii', 'cwb'),
        'filter_items_list' => __('Filtruj listę Ekspercii', 'cwb'),
    );
    $args = array(
        'label' => __('Eksperci', 'cwb'),
        'description' => __('Ekspercie', 'cwb'),
        'labels' => $labels,
        'supports' => array('title', 'author','editor', 'thumbnail', 'custom-fields', 'excerpt', 'page-attributes','comments'),
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-editor-table',
        'show_in_admin_bar' => true,
		'rewrite'       => array('slug' => 'listexperts'),
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        
    );
    register_post_type('listexperts', $args);


    $labels = array(
        'name' => _x(' Kategorie', 'taxonomy general name', 'cwb'),
        'singular_name' => _x(' Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All List Experts Categories', 'cwb'),
        'parent_item' => __('Parent Experts Category', 'cwb'),
        'parent_item_colon' => __('Parent Experts Category:', 'cwb'),
        'edit_item' => __('Edit Experts Category', 'cwb'),
        'update_item' => __('Update Experts Category', 'cwb'),
        'add_new_item' => __('Add New Experts Category', 'cwb'),
        'new_item_name' => __('New Experts Category Name', 'cwb'),
        'menu_name' => __('Kategorie', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        // 'rest_base' => 'Aktualności-categories', // Set your custom REST base
        'rewrite' => array('slug' => 'listofexperts'),
    );

    register_taxonomy('listexperts-categories', array('listexperts', 'bookings_timings') , $args);

    $labels = array(
        'name' => _x('Mapa', 'Post Type General Name', 'cwb'),
        'singular_name' => _x('Mapa', 'Post Type Singular Name', 'cwb'),
        'menu_name' => __('Mapa', 'cwb'),
        'name_admin_bar' => __('Mapa', 'cwb'),
        'archives' => __('Archiwum Mapa', 'cwb'),
        
        'parent_item_colon' => __('Rodzic Mapai:', 'cwb'),
        'all_items' => __('Wszystkie Mapa', 'cwb'),
        'add_new_item' => __('Dodaj nowy Mapaę', 'cwb'),
        'add_new' => __('Dodaj nowy', 'cwb'),
        'new_item' => __('Nowa Mapa', 'cwb'),
        'edit_item' => __('Edytuj Mapa', 'cwb'),
        'update_item' => __('Aktualizuj Mapa', 'cwb'),
        'view_item' => __('Zobacz Mapa', 'cwb'),
        'view_items' => __('Zobacz Mapa', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'not_found' => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash' => __('Nic nie znaleziono', 'cwb'),
        'featured_image' => __('Obrazek wyróżniający', 'cwb'),
        'set_featured_image' => __('Ustaw obrazek wyróżniający', 'cwb'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'cwb'),
        'use_featured_image' => __('Użyj jako obrazek wyróżniający', 'cwb'),
        'insert_into_item' => __('Wstaw do Mapai', 'cwb'),
        'uploaded_to_this_item' => __('Dodano do Mapai', 'cwb'),
        'items_list' => __('Lista Mapai', 'cwb'),
        'items_list_navigation' => __('Nawigacja po liście Mapai', 'cwb'),
        'filter_items_list' => __('Filtruj listę Mapai', 'cwb'),
    );
    $args = array(
        'label' => __('Mapa', 'cwb'),
        'description' => __('Mapae', 'cwb'),
        'labels' => $labels,
        'supports' => array('title', 'author','editor', 'thumbnail', 'custom-fields', 'excerpt', 'page-attributes','comments'),
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-star-filled',
        'show_in_admin_bar' => true,
		'rewrite'       => array('slug' => 'mapa'),
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        
    );
    register_post_type('mapa', $args);

    $labels = array(
        'name' => _x(' Kategorie', 'taxonomy general name', 'cwb'),
        'singular_name' => _x(' Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All List Experts Categories', 'cwb'),
        'parent_item' => __('Parent Mapa Category', 'cwb'),
        'parent_item_colon' => __('Parent Mapa Category:', 'cwb'),
        'edit_item' => __('Edit Mapa Category', 'cwb'),
        'update_item' => __('Update Mapa Category', 'cwb'),
        'add_new_item' => __('Add New Mapa Category', 'cwb'),
        'new_item_name' => __('New Mapa Category Name', 'cwb'),
        'menu_name' => __('Kategorie', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        // 'rest_base' => 'Aktualności-categories', // Set your custom REST base
        'rewrite' => array('slug' => 'mapaexperts'),
    );

    register_taxonomy('mapaes', 'mapa', $args);

    $labels = array(
        'name' => _x(' Lokalizacja', 'taxonomy general name', 'cwb'),
        'singular_name' => _x(' Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All List Experts Locations', 'cwb'),
        'parent_item' => __('Parent Mapa Category', 'cwb'),
        'parent_item_colon' => __('Parent Mapa Category:', 'cwb'),
        'edit_item' => __('Edit Mapa Category', 'cwb'),
        'update_item' => __('Update Mapa Category', 'cwb'),
        'add_new_item' => __('Add New Mapa Category', 'cwb'),
        'new_item_name' => __('New Mapa Category Name', 'cwb'),
        'menu_name' => __('Lokalizacja', 'cwb'),


    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        // 'rest_base' => 'Aktualności-Locations', // Set your custom REST base
        'rewrite' => array('slug' => 'locations'),
    );

    register_taxonomy('location', 'mapa', $args);

    $labels = array(
        'name' => _x(' Legenda', 'taxonomy general name', 'cwb'),
        'singular_name' => _x(' Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All List Experts Locations', 'cwb'),
        'parent_item' => __('Parent Mapa Category', 'cwb'),
        'parent_item_colon' => __('Parent Mapa Category:', 'cwb'),
        'edit_item' => __('Edit Mapa Category', 'cwb'),
        'update_item' => __('Update Mapa Category', 'cwb'),
        'add_new_item' => __('Add New Mapa Category', 'cwb'),
        'new_item_name' => __('New Mapa Category Name', 'cwb'),
        'menu_name' => __('Legenda', 'cwb'),


    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        // 'rest_base' => 'Aktualności-Locations', // Set your custom REST base
        'rewrite' => array('slug' => 'legenda'),
    );

    register_taxonomy('legenda', 'mapa', $args);

    $labels = array(
        'name' => _x(' Wybrane kompleksy leśne', 'taxonomy general name', 'cwb'),
        'singular_name' => _x(' Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All List Experts Locations', 'cwb'),
        'parent_item' => __('Parent Mapa Category', 'cwb'),
        'parent_item_colon' => __('Parent Mapa Category:', 'cwb'),
        'edit_item' => __('Edit Mapa Category', 'cwb'),
        'update_item' => __('Update Mapa Category', 'cwb'),
        'add_new_item' => __('Add New Mapa Category', 'cwb'),
        'new_item_name' => __('New Mapa Category Name', 'cwb'),
        'menu_name' => __('Wybrane kompleksy leśne', 'cwb'),


    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        // 'rest_base' => 'Aktualności-Locations', // Set your custom REST base
        'rewrite' => array('slug' => 'kompleksy'),
    );

    register_taxonomy('kompleksy', 'mapa', $args);

    $labels = array(
        'name' => _x('Harmonogram', 'Post Type General Name', 'cwb'),
        'singular_name' => _x('Harmonogram', 'Post Type Singular Name', 'cwb'),
        'menu_name' => __('Harmonogram', 'cwb'),
        'name_admin_bar' => __('Harmonogram', 'cwb'),
        'archives' => __('Archiwum Harmonogram', 'cwb'),
        
        'parent_item_colon' => __('Rodzic Harmonogrami:', 'cwb'),
        'all_items' => __('Wszystkie Harmonogram', 'cwb'),
        'add_new_item' => __('Dodaj nowy Harmonogramę', 'cwb'),
        'add_new' => __('Dodaj nowy', 'cwb'),
        'new_item' => __('Nowa Harmonogram', 'cwb'),
        'edit_item' => __('Edytuj Harmonogram', 'cwb'),
        'update_item' => __('Aktualizuj Harmonogram', 'cwb'),
        'view_item' => __('Zobacz Harmonogram', 'cwb'),
        'view_items' => __('Zobacz Harmonogram', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'not_found' => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash' => __('Nic nie znaleziono w koszu', 'cwb'),
        'featured_image' => __('Obrazek wyróżniający', 'cwb'),
        'set_featured_image' => __('Ustaw obrazek wyróżniający', 'cwb'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'cwb'),
        'use_featured_image' => __('Użyj jako obrazek wyróżniający', 'cwb'),
        'insert_into_item' => __('Wstaw do Harmonogrami', 'cwb'),
        'uploaded_to_this_item' => __('Dodano do Harmonogrami', 'cwb'),
        'items_list' => __('Lista Harmonogrami', 'cwb'),
        'items_list_navigation' => __('Nawigacja po liście Harmonogrami', 'cwb'),
        'filter_items_list' => __('Filtruj listę Harmonogrami', 'cwb'),
    );
    $args = array(
        'label' => __('Harmonogram', 'cwb'),
        'description' => __('Harmonograme', 'cwb'),
        'labels' => $labels,
        'supports' => array('title', 'author','editor', 'thumbnail', 'custom-fields', 'excerpt', 'page-attributes','comments'),
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-star-filled',
        'show_in_admin_bar' => true,
		'rewrite'       => array('slug' => 'harmonograme'),
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        
    );
    register_post_type('harmonograme', $args);

    $labels = array(
        'name' => _x(' Harmonogram', 'taxonomy general name', 'cwb'),
        'singular_name' => _x(' Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All List Experts Harmonogram', 'cwb'),
        'parent_item' => __('Parent  Category', 'cwb'),
        'parent_item_colon' => __('Parent  Category:', 'cwb'),
        'edit_item' => __('Edit  Category', 'cwb'),
        'update_item' => __('Update  Category', 'cwb'),
        'add_new_item' => __('Add New  Category', 'cwb'),
        'new_item_name' => __('New  Category Name', 'cwb'),
        'menu_name' => __('Kategoria', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        // 'rest_base' => 'Aktualności-Locations', // Set your custom REST base
        'rewrite' => array('slug' => 'harmonogramecate'),
    );

    register_taxonomy('harmonogramec', 'harmonograme', $args);



    $labels = array(
        'name' => _x('Partnerzy', 'Post Type General Name', 'cwb'),
        'singular_name' => _x('Partnerzy', 'Post Type Singular Name', 'cwb'),
        'menu_name' => __('Partnerzy', 'cwb'),
        'name_admin_bar' => __('Partnerzy', 'cwb'),
        'archives' => __('Archiwum Partnerzy', 'cwb'),
        
        'parent_item_colon' => __('Rodzic Partnerzyi:', 'cwb'),
        'all_items' => __('Wszystkie Partnerzy', 'cwb'),
        'add_new_item' => __('Dodaj nowy Partnerzyę', 'cwb'),
        'add_new' => __('Dodaj nowy', 'cwb'),
        'new_item' => __('Nowa Partnerzy', 'cwb'),
        'edit_item' => __('Edytuj Partnerzy', 'cwb'),
        'update_item' => __('Aktualizuj Partnerzy', 'cwb'),
        'view_item' => __('Zobacz Partnerzy', 'cwb'),
        'view_items' => __('Zobacz Partnerzy', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'not_found' => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash' => __('Nic nie znaleziono w koszu', 'cwb'),
        'featured_image' => __('Obrazek wyróżniający', 'cwb'),
        'set_featured_image' => __('Ustaw obrazek wyróżniający', 'cwb'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'cwb'),
        'use_featured_image' => __('Użyj jako obrazek wyróżniający', 'cwb'),
        'insert_into_item' => __('Wstaw do Partnerzyi', 'cwb'),
        'uploaded_to_this_item' => __('Dodano do Partnerzyi', 'cwb'),
        'items_list' => __('Lista Partnerzyi', 'cwb'),
        'items_list_navigation' => __('Nawigacja po liście Partnerzyi', 'cwb'),
        'filter_items_list' => __('Filtruj listę Partnerzyi', 'cwb'),
    );
    $args = array(
        'label' => __('Partnerzy', 'cwb'),
        'description' => __('Partnerzye', 'cwb'),
        'labels' => $labels,
        'supports' => array('title', 'author','editor', 'thumbnail', 'custom-fields', 'excerpt', 'page-attributes','comments'),
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-star-filled',
        'show_in_admin_bar' => true,
		'rewrite'       => array('slug' => 'partnerzy'),
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
        'capability_type' => 'post',
        
    );
    register_post_type('partnerzye', $args);

    $labels = array(
        'name' => _x(' Partnerzy', 'taxonomy general name', 'cwb'),
        'singular_name' => _x(' Category', 'taxonomy singular name', 'cwb'),
        'search_items' => __('Szukaj', 'cwb'),
        'all_items' => __('All List Experts Partnerzy', 'cwb'),
        'parent_item' => __('Parent  Category', 'cwb'),
        'parent_item_colon' => __('Parent  Category:', 'cwb'),
        'edit_item' => __('Edit  Category', 'cwb'),
        'update_item' => __('Update  Category', 'cwb'),
        'add_new_item' => __('Add New  Category', 'cwb'),
        'new_item_name' => __('New  Category Name', 'cwb'),
        'menu_name' => __('category', 'cwb'),
    );

    $args = array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_in_rest' => true, // Enable Gutenberg support
        // 'rest_base' => 'Aktualności-Locations', // Set your custom REST base
        'rewrite' => array('slug' => 'partnerzyeate'),
    );

    register_taxonomy('partnerzyeat', 'partnerzye', $args);

}

add_action('init', 'custom_post_type_Aktualnoci', 0);

function add_partnerzy_metabox_to_show() {
    add_meta_box(
        'partnerzy-data-metabox',
        __('Partner Details' , 'cwb'),
        'display_partnerzy_metabox_custom',
        'partnerzye', // Your custom post type
        'normal', // Context
        'high' // Priority
    );
}
 function display_partnerzy_metabox_custom($post){

    $app_character                = get_post_meta( $post->ID, 'app-character' , true );
    $name                = get_post_meta( $post->ID, 'fname' , true );
    $Headquartersaddres  = get_post_meta( $post->ID, 'Headquartersaddres' , true );
    $email               = get_post_meta( $post->ID, 'email' , true );
    $telefon             = get_post_meta( $post->ID, 'telefon' , true );
    $form_consultation   = get_post_meta( $post->ID, 'form_consultation' , true );
    $activities          = get_post_meta( $post->ID, 'activities' , true );
    $textarea_Profil     = get_post_meta( $post->ID, 'textarea_Profil' , true );
    $activi_planned      = get_post_meta( $post->ID, 'activi_planned' , true );
    $Contribution        = get_post_meta( $post->ID, 'Contribution' , true );
    $experience_implementing = get_post_meta( $post->ID, 'experience_implementing' , true );
    $textare             = get_post_meta( $post->ID, 'textare' , true );
    $project_value             = get_post_meta( $post->ID, 'project-value' , true );
    $textarea_experience = get_post_meta( $post->ID, 'textarea_experience' , true );
    $acceptance          = get_post_meta( $post->ID, 'acceptance' , true );
?>


    <div class="custom-meta-box">
        <div class="user-data-meat-box" ><label for="app_character"><?php _e('Zgłoszenie w charakterze:', 'cwb'); ?></label>
        <input type="text" id="app_character" name="app_character" value="<?php echo esc_attr($app_character); ?>"></div>
        
        <div class="user-data-meat-box"> <label for="name"><?php _e('Nazwa:', 'cwb'); ?></label>
        <input type="text" id="name" name="namer" value="<?php echo esc_attr($name); ?>"></div>
       
        <div class="user-data-meat-box"><label for="Headquartersaddres"><?php _e('Adres siedzib', 'cwb'); ?></label>
        <input type="text" id="Headquartersaddres" name="Headquartersaddres" value="<?php echo esc_attr($Headquartersaddres); ?>"></div>
        
        <div class="user-data-meat-box"> <label for="email"><?php _e('Adres e-mail:', 'cwb'); ?></label>
        <input type="text" id="email" name="email" value="<?php echo esc_attr($email); ?>"></div>
       
        <div class="user-data-meat-box"><label for="telefon"><?php _e('Numer telefonu:', 'cwb'); ?></label>
        <input type="text" id="telefon" name="telefon" value="<?php echo esc_attr($telefon); ?>"></div>
        
        <div class="user-data-meat-box"> <label for="form_consultation"><?php _e('Forma organizacyjno - prawna:', 'cwb'); ?></label>
        <input type="text" id="form_consultation" name="form_consultation" value="<?php echo esc_attr($form_consultation); ?>"></div>
       
        <div class="user-data-meat-box"><label for="activities"><?php _e('Obszar, na którym planowane są działania:', 'cwb'); ?></label>
        <input type="text" id="activities" name="activities" value="<?php echo esc_attr($activities); ?>"></div>
        
        <div class="user-data-meat-box"><label for="textarea_Profil"><?php _e('Profil działalności - opis :', 'cwb'); ?></label>
        <textarea id="textarea_Profil" name="textarea_Profil"><?php echo esc_attr($textarea_Profil); ?></textarea></div>
        
        <div class="user-data-meat-box"><label for="activi_planned"><?php _e('Działania planowane do realizacji:', 'cwb'); ?></label>
        <input type="text" id="activi_planned" name="activi_planned" value="<?php echo esc_attr($activi_planned); ?>"></div>
        
        <div class="user-data-meat-box"><label for="Contribution"><?php _e('Wkład do projektu:', 'cwb'); ?></label>
        <input type="text" id="Contribution" name="Contribution" value="<?php echo esc_attr($Contribution); ?>"></div>
        
        <div class="user-data-meat-box"><label for="experience_implementing"><?php _e('Czy podmiot ma doświadczenie w realizacji projektów ze środków zewnętrznych:', 'cwb'); ?></label>
        <input type="text" id="experience_implementing" name="experience_implementing" value="<?php echo esc_attr($experience_implementing); ?>"></div>
        
        <div class="user-data-meat-box"><label for="textare"><?php _e('Opisz doświadczenie - informacje o realizowanych projektach i ich wartosci :', 'cwb'); ?></label>
        <textarea id="textare" name="textare"><?php echo esc_attr($textare); ?></textarea></div>
        
        <div class="user-data-meat-box"><label for="project_value"><?php _e('Zakładana wartość projektu :', 'cwb'); ?></label>
        <input type="text" id="project_value" name="project_value" value="<?php echo esc_attr($project_value); ?>"></div>
        
        <div class="user-data-meat-box"><label for="textarea_experience"><?php _e('Opis planowanego projektu :', 'cwb'); ?></label>
        <textarea id="textarea_experience" name="textarea_experience"><?php echo esc_attr($textarea_experience); ?></textarea></div>
        
        <div class="user-data-meat-box"> <label for="acceptance"><?php _e('check box:', 'cwb'); ?></label>
        <input type="text" id="acceptance" name="acceptance" value="<?php echo (esc_attr($acceptance)==1 ? 'checked': 'uncheck'); ?>"></div>
       
       
    </div>
<?php
 }

add_action('add_meta_boxes', 'add_partnerzy_metabox_to_show');


function save_partnerzy_metabox_data($post_id) {
    // if (!isset($_POST['partnerzy_metabox_nonce']) || !wp_verify_nonce($_POST['partnerzy_metabox_nonce'], 'partnerzy_metabox_nonce')) {
    //     return;
    // }
   

   
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    

    // Define an array of field names
    $fields = array(
        'app-character',
        'fname',
        'Headquartersaddres',
        'email',
        'telefon',
        'form_consultation',
        'activities',
        'textarea_Profil',
        'activi_planned',
        'Contribution',
        'experience_implementing',
        'textare',
        'project-value',
        'textarea_experience',
        'acceptance'
    );

    // Loop through the fields and update post meta
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
        }
    }
}

add_action('save_post', 'save_partnerzy_metabox_data');


// Register custom taxonomy for your custom post type

function create_bookings_post_type() {
    $labels = array(
        'name'                  => __('Konsultacje zapisy', 'cwb'),
        'singular_name'         => __('Konsultacje zapisy', 'cwb'),
        'add_new'               => __('Add New Konsultacje zapisy', 'cwb'),
        'add_new_item'          => __('Add New Konsultacje zapisy', 'cwb'),
        'edit_item'             => __('Edit Konsultacje zapisy', 'cwb'),
        'new_item'              => __('New Konsultacje zapisy', 'cwb'),
        'view_item'             => __('View Konsultacje zapisy', 'cwb'),
        'search_items'          => __('Szukaj', 'cwb'),
        'not_found'             => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash'    => __('Nic nie znaleziono in trash', 'cwb'),
    );

    $args = array(
        'labels'            => $labels,
        'public'            => true,
        'has_archive'       => true,
        'menu_icon'         => 'dashicons-calendar',
        'menu_position'     => 20,
        'supports'          => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields' ),
        
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'public'            => true,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'menu_position'     => 5,
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export'        => true,
        'has_archive'       => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
    );

    register_post_type('bookings', $args);
    
    

    $labels = array(
        'name'                  => __('Konsultacje Terminy', 'cwb'),
        'singular_name'         => __('Konsultacje Terminy', 'cwb'),
        'add_new'               => __('Add New Konsultacje Terminy', 'cwb'),
        'add_new_item'          => __('Add New Konsultacje Terminy', 'cwb'),
        'edit_item'             => __('Edit Konsultacje Terminy', 'cwb'),
        'new_item'              => __('New Konsultacje Terminy', 'cwb'),
        'view_item'             => __('View Konsultacje Terminy', 'cwb'),
        'search_items'          => __('Szukaj', 'cwb'),
        'not_found'             => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash'    => __('Nic nie znaleziono in trash', 'cwb'),
    );

    $args = array(
        'labels'            => $labels,
        'public'            => true,
        'has_archive'       => true,
        'menu_icon'         => 'dashicons-calendar',
        'menu_position'     => 20,
        'supports'          => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields' ),
        'show_in_rest' => true,
        'hierarchical' => false,
        'public'            => true,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'menu_position'     => 5,
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export'        => true,
        'has_archive'       => true,
        'exclude_from_search' => false,
        'publicly_queryable' => true,
    );

    register_post_type('bookings_timings', $args);
    $labels = array(
        'name'                  => __('Zapisy na szkolenia', 'cwb'),
        'singular_name'         => __('Zapisy na szkolenia', 'cwb'),
        'add_new'               => __('Dodaj nowy zapis', 'cwb'),
        'add_new_item'          => __('Dodaj nowy zapis', 'cwb'),
        
        'edit_item'             => __('Edit Booking', 'cwb'),
        'new_item'              => __('New Booking', 'cwb'),
        'view_item'             => __('View Booking', 'cwb'),
        'search_items'          => __('Szukaj', 'cwb'),
        'not_found'             => __('Nic nie znaleziono', 'cwb'),
        'not_found_in_trash'    => __('Nic nie znaleziono in trash', 'cwb'),
    );
    

    $args = array(
        'labels'            => $labels,
        'public'            => true,
        'has_archive'       => true,
        'show_in_rest' => true,
        // Enable Gutenberg editor support
        'hierarchical' => false,
        'menu_icon'         => 'dashicons-calendar',
        'menu_position'     => 20,
        'supports'          => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields'),
    );

    register_post_type('training_bookings', $args);
}
// Add a new column for the booking status in the post list table for the 'bookings_timings' post type
function add_booking_status_column($columns) {
    $columns['booking_status'] = 'Booking Status';
    return $columns;
}
add_filter('manage_bookings_timings_posts_columns', 'add_booking_status_column');

// Populate the booking status column with the custom post meta value for 'bookings_timings' post type
function display_booking_status_column($column, $post_id) {
    if ($column === 'booking_status') {
        $booking_status = get_post_meta($post_id, '_booking_status', true);
        echo esc_html($booking_status);
    }
}
add_action('manage_bookings_timings_posts_custom_column', 'display_booking_status_column', 10, 2);

// Hook into the init action and call the create_bookings_post_type function
add_action('init', 'create_bookings_post_type');





function add_booking_metabox() {
    add_meta_box(
        'booking-expert-metabox-expert',
        __('Expert Information' , 'cwb'),
        'display_booking_metabox',
        'bookings', 
        'normal', 
        'high'
    );
}
add_action('add_meta_boxes', 'add_booking_metabox');

function display_booking_metabox($post) {
    $current_ekspert = get_post_meta($post->ID, 'ekspert', true);

    $all_experts = get_all_experts();
    echo '<label for="ekspert">'._e('Select Expert', 'cwb').'</label> <br>';
    echo '<select style="mt-1" name="ekspert">';
    
    foreach ($all_experts as $expert) {
        echo '<option value="' . esc_attr($expert['id']) . '" ' . selected($current_ekspert, $expert['id'], false) . '>' . esc_html($expert['name']) . '</option>';
    }
    
    echo '</select>';
}

function save_booking_metabox($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    if (isset($_POST['ekspert'])) {
        $ekspert = sanitize_text_field($_POST['ekspert']);
        update_post_meta($post_id, 'ekspert', $ekspert);
    }
}

add_action('save_post', 'save_booking_metabox');
function get_all_experts() {
    $experts = array();

    $args = array(
        'post_type'         => 'listexperts', 
        'posts_per_page'    => -1,
    );

    $expert_query = new WP_Query($args);

    if ($expert_query->have_posts()) {
        while ($expert_query->have_posts()) {
            $expert_query->the_post();
            $expert_id      = get_the_ID();
            $expert_name    = get_the_title();
            $experts[]      = array(
                'id'        => $expert_id,
                'name'      => $expert_name,
            );
        }
    }

    wp_reset_postdata();

    return $experts;
}

function display_booking_metabox_custom($post) {
    // Retrieve the post meta values
    $name               = get_post_meta($post->ID, 'name', true);
    $nazwisko           = get_post_meta($post->ID, 'nazwisko', true);
    $email              = get_post_meta($post->ID, 'email', true);
    $telefon            = get_post_meta($post->ID, 'telefon', true);
    $form_consultation  = get_post_meta($post->ID, 'form_consultation', true);
    $nazwa_wnioskodawcy  = get_post_meta($post->ID, 'nazwa_wnioskodawcy', true);
    $topic              = get_post_meta($post->ID, 'topic', true);
    $dziedzina          = get_post_meta($post->ID, 'dziedzina', true);
    $ekspert            = get_post_meta($post->ID, 'ekspert', true);
    $termin_konsultacji = get_post_meta($post->ID, 'termin_konsultacji', true);
    $godzina_konsultacji = get_post_meta($post->ID, 'godzina_konsultacji', true);
    $informacje_inne    = get_post_meta($post->ID, 'informacje_inne', true);
    ?>
    <div class="custom-meta-box">
        <p><strong><?php _e('Name:', 'cwb'); ?></strong> <?php echo esc_html($name); ?></p>
        <p><strong><?php _e('Nazwisko:', 'cwb'); ?></strong> <?php echo esc_html($nazwisko); ?></p>
        <p><strong><?php _e('Email:', 'cwb'); ?></strong> <?php echo esc_html($email); ?></p>
        <p><strong><?php _e('Telefon:', 'cwb'); ?></strong> <?php echo esc_html($telefon); ?></p>
        <p><strong><?php _e('Nazwa wnioskodawcy lub beneficjenta:', 'cwb'); ?></strong> <?php echo esc_html($nazwa_wnioskodawcy); ?></p>
        <p><strong><?php _e('Form Consultation:', 'cwb'); ?></strong> <?php echo esc_html($form_consultation); ?></p>
        <p><strong><?php _e('Topic:', 'cwb'); ?></strong> <?php echo esc_html($topic); ?></p>
        <?php if (isset($dziedzina) && !empty($dziedzina)) : ?>
            <p><strong><?php _e('Dziedzina:', 'cwb'); ?></strong> <?php echo esc_html($dziedzina); ?></p>
        <?php endif; ?>
        <!-- <p><strong><?php _e('Ekspert:', 'cwb'); ?></strong> <?php echo esc_html($ekspert); ?></p> -->
        <p>
            <strong><?php _e('Termin Konsultacji:', 'cwb'); ?></strong>
            <input type="text" name="termin_konsultacji"  id="date-picker" value="<?php echo esc_attr($termin_konsultacji); ?>" />
        </p>
        <p>
            <strong><?php _e('Godzina Konsultacji:', 'cwb'); ?></strong>
            <input type="text" name="godzina_konsultacji" id="time-field" value="<?php echo esc_attr($godzina_konsultacji); ?>">
           
        </p>
        <p><strong><?php _e('Informacje Inne:', 'cwb'); ?></strong> <?php echo esc_html($informacje_inne); ?></p>
    </div>
    <?php
}

add_action('save_post', 'save_booking_metabox_custom_data');
function save_booking_metabox_custom_data($post_id) {
    // Check the user's permissions
    if (!current_user_can('edit_post', $post_id)) {
        return $post_id;
    }

    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check if the fields are set and if so, save the data
    if (isset($_POST['termin_konsultacji'])) {
        update_post_meta($post_id, 'termin_konsultacji', sanitize_text_field($_POST['termin_konsultacji']));
    }
    if (isset($_POST['godzina_konsultacji'])) {
        update_post_meta($post_id, 'godzina_konsultacji', sanitize_text_field($_POST['godzina_konsultacji']));
    }
}
function add_export_buttons() {
    global $current_screen;

    // Check if we are on the specific post type list page
    if ('edit-bookings' === $current_screen->id || 'edit-training_bookings' === $current_screen->id) {
        $training_id = '';
        if(isset($_GET['training_id'])){
            $training_id = '&training_id='.$_GET['training_id'];
        }
        $booking_status = '';
        if(isset($_GET['booking_status'])){
            $booking_status = '&booking_status='.$_GET['booking_status'];
        }
        $m = '';
        if(isset($_GET['m'])){
            $m = '&m='.$_GET['m'];
        }
        ?>
        <script type="text/javascript">
            jQuery(document).ready(function($) {
                var exportBtnHtml = '<a href="<?php echo admin_url('admin-post.php?action=export_data&type=' . $current_screen->post_type . $training_id.$booking_status .$m); ?>" class="page-title-action"><?php _e("Eksportuj do CSV" , "cwb") ?></a>';
                $(".wrap .page-title-action:first").after(exportBtnHtml);
            });
        </script>
        <?php
    }
}
add_action('admin_footer', 'add_export_buttons');


// function export_custom_post_type_to_csv() {
//     if (isset($_GET['type']) && in_array($_GET['type'], ['bookings'])) {
//         $post_type = sanitize_text_field($_GET['type']);

//         header('Content-Type: text/csv; charset=utf-8');
//         header('Content-Disposition: attachment; filename=' . $post_type . '_data.csv');
//         $output = fopen('php://output', 'w');
       
//         // Column headers
//         fputcsv($output, array('Name', 'Nazwisko', 'Email', 'Telefon', 'Form Consultation', 'Nazwa Wnioskodawcy', 'Topic', 'Dziedzina', 'Ekspert', 'Termin Konsultacji', 'Godzina Konsultacji', 'Informacje Inne'));

//         // Fetch posts
//         $args = array(
//             'post_type' => $post_type,
//             'posts_per_page' => -1,
           
//         );
//         $posts = get_posts($args);

//         // Loop through each post and output the data
//         foreach ($posts as $post) {
//             fputcsv($output, array(
//                 get_post_meta($post->ID, 'name', true),
//                 get_post_meta($post->ID, 'nazwisko', true),
//                 get_post_meta($post->ID, 'email', true),
//                 get_post_meta($post->ID, 'telefon', true),
//                 get_post_meta($post->ID, 'form_consultation', true),
//                 get_post_meta($post->ID, 'nazwa_wnioskodawcy', true),
//                 get_post_meta($post->ID, 'topic', true),
//                 get_post_meta($post->ID, 'dziedzina', true),
//                 get_post_meta($post->ID, 'ekspert', true),
//                 get_post_meta($post->ID, 'termin_konsultacji', true),
//                 get_post_meta($post->ID, 'godzina_konsultacji', true),
//                 get_post_meta($post->ID, 'informacje_inne', true),
//             ));
//         }
//         fclose($output);
//         exit;
//     }
//     if (isset($_GET['type']) && in_array($_GET['type'], ['training_bookings'])) {
//         $post_type = sanitize_text_field($_GET['type']);
//         $training_id = '';

//         // Check if 'training_id' is set and not empty in the $_GET array
//         $training_id = isset($_GET['training_id']) ? sanitize_text_field($_GET['training_id']) : '';

//         header('Content-Type: text/csv; charset=utf-8');
//         header('Content-Disposition: attachment; filename=' . $post_type . '_data.csv');
//         $output = fopen('php://output', 'w');

//         // Column headers
//         fputcsv($output, array( 'Imię', 'Nazwisko', 'Email', 'Telefon', 'Nazwa Instytucji', 'Typ', 'Preferencje', 'ID szkolenia','Nazwa szkolenia'));

//         // Fetch posts
//         $args = array(
//             'post_type' => $post_type,
//             'posts_per_page' => -1,
            
//         );
//         file_put_contents('debug.txt', print_r($_GET, true));
       
//         $posts = get_posts($args);
//         // print_r($posts);
//         // Loop through each post and output the data
//         foreach ($posts as $post) {
//             fputcsv($output, array(
               
//                 get_post_meta($post->ID, 'name', true),
//                 get_post_meta($post->ID, 'nazwisko', true),
//                 get_post_meta($post->ID, 'email', true),
//                 get_post_meta($post->ID, 'telefon', true),
//                 get_post_meta($post->ID, 'nazwa_instytucji', true),
//                 get_post_meta($post->ID, 'applicant_beneficiary', true),
//                 get_post_meta($post->ID, 'preferencje', true),
//                 get_post_meta($post->ID, 'training_id', true),
//                 $traningoid = get_post_meta($post->ID, 'training_id', true),

//                 get_the_title($traningoid),
//             ));
//         }
//         fclose($output);
//         exit;
//     }
// }
// add_action('admin_post_export_data', 'export_custom_post_type_to_csv');
function export_custom_post_type_to_csv() {
    // Check permissions and nonces to secure your export action
    // ...

    // Verify that the 'type' GET parameter is set and has a valid value
    if (isset($_GET['type']) && in_array($_GET['type'], ['bookings', 'training_bookings'])) {
        $post_type = sanitize_text_field($_GET['type']);
        
        // Initialize an array to store the meta_query conditions
        $meta_query = array();
        
        // Check if 'training_id' is set and not empty in the $_GET array
        // and add it to the meta_query array
        if (!empty($_GET['training_id'])) {
            $training_id = sanitize_text_field($_GET['training_id']);
            $meta_query[] = array(
                'key'     => 'training_id',
                'value'   => $training_id,
                'compare' => '='
            );
        }
        
        if (!empty($_GET['seo-filter'])) {
            $seo_filter = sanitize_text_field($_GET['seo_filter']);
            $meta_query[] = array(
                'key'     => 'seo-filter',
                'value'   => $seo_filter,
                'compare' => '='
            );
        }
       

        // Prepare the WP_Query arguments
        $args = array(
            'post_type'      => $post_type,
            'posts_per_page' => -1,
            'post_status'    => 'any', // Or specify other statuses

            'meta_query'     => $meta_query
        );

        if (!empty($_GET['booking_status'])) {
            $args['post_status'] = sanitize_text_field($_GET['booking_status']);
        }
        if (!empty($_GET['m'])) {
            $m = sanitize_text_field($_GET['m']);
            $year  = substr($m, 0, 4);
            $month = substr($m, 4, 2);
        
            $args['date_query'] = array(
                array(
                    'year'  => $year,
                    'month' => $month
                ),
            );
        }
        // Fetch the posts using WP_Query
        $query = new WP_Query($args);
        
        // If posts are found
        if($post_type == 'training_bookings' ){
            if ($query->have_posts()) {
                // Set the CSV headers
                if (ob_get_level()) {
                    ob_end_clean();
                }
                header('Content-Type: text/csv; charset=utf-8');
                header('Content-Disposition: attachment; filename=' . $post_type . '_data.csv');
                
                // Open the file handle
                $output = fopen('php://output', 'w');
                fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
                // Output the column headers
                fputcsv($output, array('Imię', 'Nazwisko', 'Post Status', 'Email', 'Telefon', 'Nazwa Instytucji', 'Typ', 'Preferencje', 'ID szkolenia','Nazwa szkolenia', 'Data i godzina zapisów'));
                
                // Loop through each post and output the data
                while ($query->have_posts()) {
                    $query->the_post();
                    $post_id = get_the_ID();

                    // Get training ID and title
                    $training_id = get_post_meta($post_id, 'training_id', true);
                    $training_title = get_the_title($training_id);

                    // Get the start date from the training post (if available)
                    // $start_date = get_field('start_date', $training_id);

                    // // Format the start date if it exists
                    // if ($start_date) {
                    //     $date_time_object = new DateTime($start_date);
                    //     $formatted_start_date = $date_time_object->format('d.m.Y');
                    // } else {
                    //     $formatted_start_date = 'Brak daty';
                    // }
                    $post_date = get_the_date('d.m.Y H:i', $post_id);  
                    // Write to the CSV
                    fputcsv($output, array(
                        get_post_meta($post_id, 'name', true),               // Imię
                        get_post_meta($post_id, 'nazwisko', true),           // Nazwisko
                        get_post_status($post_id),                           // Post Status
                        get_post_meta($post_id, 'email', true),              // Email
                        get_post_meta($post_id, 'telefon', true),            // Telefon
                        get_post_meta($post_id, 'nazwa_instytucji', true),   // Nazwa Instytucji
                        get_post_meta($post_id, 'applicant_beneficiary', true), // Typ
                        get_post_meta($post_id, 'preferencje', true),        // Preferencje
                        $training_id,                                        // ID szkolenia
                        $training_title,                                     // Nazwa szkolenia
                        $post_date,
                        // get_post_meta($post_id, 'booking_date', true)
                       
                    ));
                }
                
                // Close the file handle
                fclose($output);
                exit;
            } else {
                // Handle case when no posts are found
                // ...
            }  
        }
        else {
            if ($query->have_posts()) {
                // Set the CSV headers
                if (ob_get_level()) {
                    ob_end_clean();
                }
                header('Content-Type: text/csv; charset=utf-8');
                header('Content-Disposition: attachment; filename=' . $post_type . '_data.csv');
                
                // Open the file handle
                $output = fopen('php://output', 'w');
                fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
                // Output the column headers
                
                fputcsv($output, array(
                    'Name', 'Nazwisko', 'Post Status', 'Email', 'Telefon', 'Form Consultation', 
                    'Nazwa Wnioskodawcy', 'Topic', 'Dziedzina', 'Ekspert', 
                    'Termin Konsultacji', 'Godzina Konsultacji', 'Informacje Inne', 'Data i godzina zapisów'
                ));
                // Loop through each post and output the data
                while ($query->have_posts()) {
                    $query->the_post();
                    $post_id = get_the_ID(); // Get the current post ID
                    $post_date = get_the_date('d.m.Y H:i', $post_id);
                    fputcsv($output, array(
                        get_post_meta($post_id, 'name', true),
                        get_post_meta($post_id, 'nazwisko', true),
                        get_post_status($post_id),
                        get_post_meta($post_id, 'email', true),
                        get_post_meta($post_id, 'telefon', true),
                        get_post_meta($post_id, 'form_consultation', true),
                        get_post_meta($post_id, 'nazwa_wnioskodawcy', true),
                        get_post_meta($post_id, 'topic', true),
                        get_post_meta($post_id, 'dziedzina', true),
                        get_post_meta($post_id, 'ekspert', true),
                        get_post_meta($post_id, 'termin_konsultacji', true),
                        get_post_meta($post_id, 'godzina_konsultacji', true),
                        get_post_meta($post_id, 'informacje_inne', true),
                        get_post_status($post_id), // Add the post status
                        $post_date,
                    ));
                }
                
                // Close the file handle
                fclose($output);
                exit;
            } else {
                // Handle case when no posts are found
                // ...
            }
        }
        
    }
}

// Hook your function to the appropriate action
add_action('admin_post_export_data', 'export_custom_post_type_to_csv');


function add_booking_metabox_to_show() {
    add_meta_box(
        'booking-expert-metabox',
        __('Booking Information' , 'cwb'),
        'display_booking_metabox_custom',
        'bookings',
        'normal',
        'high'
    );
}

add_action('add_meta_boxes', 'add_booking_metabox_to_show');

function add_booking_metabox_to_show_second() {
    add_meta_box(
        'booking-audyt-metabox',
        __('Audyt Information' , 'cwb'),
        'display_booking_metabox_custom_second',
        'audyt',
        'normal',
        'high'
    );
}

add_action('add_meta_boxes', 'add_booking_metabox_to_show_second');

function display_booking_metabox_custom_second($post) {
    // Retrieve the post meta values
    $name               = get_post_meta($post->ID, 'name', true);
    $nazwisko           = get_post_meta($post->ID, 'nazwisko', true);
    $email              = get_post_meta($post->ID, 'email', true);
    $telefon            = get_post_meta($post->ID, 'telefon', true);
    $wnioskodawcy  = get_post_meta($post->ID, 'wnioskodawcy', true);
    $topic              = get_post_meta($post->ID, 'topic', true);
    $termin_konsultacji = get_post_meta($post->ID, 'termin_konsultacji', true);
    $filedata    = get_post_meta($post->ID, 'filedata', true);
    $informacje_inne    = get_post_meta($post->ID, 'informacje_inne', true);
    ?>

    <div class="custom-meta-box">
        <div class="user-data-meat-box" ><label for="name"><?php _e('Imię:', 'cwb'); ?></label>
        <input type="text" id="name" name="name" value="<?php echo esc_attr($name); ?>"></div>
        
        <div class="user-data-meat-box"> <label for="nazwisko"><?php _e('Nazwisko:', 'cwb'); ?></label>
        <input type="text" id="nazwisko" name="nazwisko" value="<?php echo esc_attr($nazwisko); ?>"></div>
       
        <div class="user-data-meat-box"><label for="Headquartersaddres"><?php _e('Adres e-mail', 'cwb'); ?></label>
        <input type="text" id="Headquartersaddres" name="Headquartersaddres" value="<?php echo esc_attr($email); ?>"></div>
        
        <div class="user-data-meat-box"> <label for="telefon"><?php _e('Telefon :', 'cwb'); ?></label>
        <input type="text" id="telefon" name="telefon" value="<?php echo esc_attr($telefon); ?>"></div>
       
        <div class="user-data-meat-box"><label for="wnioskodawcy"><?php _e('Nazwa wnioskodawcy lub beneficjenta:', 'cwb'); ?></label>
        <input type="text" id="wnioskodawcy" name="wnioskodawcy" value="<?php echo esc_attr($wnioskodawcy); ?>"></div>

        <div class="user-data-meat-box"><label for="topic"><?php _e('PTemat / Zakres konsultacji :', 'cwb'); ?></label>
        <textarea id="topic" name="topic"><?php echo esc_attr($topic); ?></textarea></div>
        
        <div class="user-data-meat-box"><label for="termin_konsultacji"><?php _e('Termin konsultacji:', 'cwb'); ?></label>
        <input type="text" id="date-picker" name="termin_konsultacji" value="<?php echo esc_attr($termin_konsultacji); ?>"></div>
        
        <div class="user-data-meat-box"><label for="informacje_inne"><?php _e('Informacje inne :', 'cwb'); ?></label>
        <textarea id="informacje_inne" name="informacje_inne"><?php echo esc_attr($informacje_inne); ?></textarea></div>
         <!-- print_r() -->
        <a href="<?php echo esc_attr($filedata); ?>" download class="btn btn-primary">dodać</a>
      
    </div>
    <?php
}

function save_partnerzy_metabox_data_second($post_id) {
    // if (!isset($_POST['partnerzy_metabox_nonce']) || !wp_verify_nonce($_POST['partnerzy_metabox_nonce'], 'partnerzy_metabox_nonce')) {
    //     return;
    // }
   

   
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    

    // Define an array of field names
    $fields = array(
        
        'name',
        'nazwisko',
        'email',
        'telefon',
        'wnioskodawcy',
        'filedata',
        'topic',
        'termin_konsultacji',
        'informacje_inne',
    );

    // Loop through the fields and update post meta
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
        }
    }
}

add_action('save_post', 'save_partnerzy_metabox_data_second');






function display_booking_metabox_custom_training_booking($post) {
    // Retrieve the post meta values
    $name               = get_post_meta($post->ID, 'name', true);
    $nazwisko           = get_post_meta($post->ID, 'nazwisko', true);
    $email              = get_post_meta($post->ID, 'email', true);
    $telefon            = get_post_meta($post->ID, 'telefon', true);
    $nazwa_instytucji   = get_post_meta($post->ID, 'nazwa_instytucji', true);
    $applicant_beneficiary              = get_post_meta($post->ID, 'applicant_beneficiary', true);
    $preferencje        = get_post_meta($post->ID, 'preferencje', true);
    $training_id        = get_post_meta($post->ID, 'training_id', true);
    ?>
    <div class="custom-meta-box">
        <p><strong><?php _e('Name:', 'cwb'); ?></strong> <?php echo esc_html($name); ?></p>
        <p><strong><?php _e('Nazwisko:', 'cwb'); ?></strong> <?php echo esc_html($nazwisko); ?></p>
        <p><strong><?php _e('Email:', 'cwb'); ?></strong> <?php echo esc_html($email); ?></p>
        <p><strong><?php _e('Telefon:', 'cwb'); ?></strong> <?php echo esc_html($telefon); ?></p>
        <p><strong><?php _e('Nazwa Instytucji:', 'cwb'); ?></strong> <?php echo esc_html($nazwa_instytucji); ?></p>
        <p><strong><?php _e('Nazwa wnioskodawcy lub beneficjenta:', 'cwb'); ?></strong> <?php echo esc_html($applicant_beneficiary); ?></p>
        <p><strong><?php _e('Preferencje:', 'cwb'); ?></strong> <?php echo esc_html($preferencje); ?></p>
        <p><strong><?php _e('ID szkolenia:', 'cwb'); ?></strong> <?php echo esc_html($training_id); ?></p>
    </div>
    <?php
}

function add_booking_metabox_to_show_training_booking() {
    add_meta_box(
        'booking-expert-metabox',
        __('Booking Information' , 'cwb'),
        'display_booking_metabox_custom_training_booking',
        'training_bookings', // Your custom post type
        'normal', // Context
        'high' // Priority
    );
}

add_action('add_meta_boxes', 'add_booking_metabox_to_show_training_booking');


function cwb_register_subscribers_post_type() {
    $labels = array(
        'name'                  => _x( 'Lista subskrybentów szkoleń', 'Post type general name', 'cwb' ),
        'singular_name'         => _x( 'Subscriber', 'Post type singular name', 'cwb' ),
        'menu_name'             => _x( 'Lista subskrybentów szkoleń', 'Admin Menu text', 'cwb' ),
        'name_admin_bar'        => _x( 'Subscriber', 'Add New on Toolbar', 'cwb' ),
        'add_new'               => __( 'Add New', 'cwb' ),
        'add_new_item'          => __( 'Add New Subscriber', 'cwb' ),
        'new_item'              => __( 'New Subscriber', 'cwb' ),
        'edit_item'             => __( 'Edit Subscriber', 'cwb' ),
        'view_item'             => __( 'View Subscriber', 'cwb' ),
        'all_items'             => __( 'All Lista subskrybentów szkoleń', 'cwb' ),
    );     
    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'subscriber' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
    );
      
    register_post_type( 'subscriber', $args );
    
    $labels = array(
        'name'                  => _x( 'Questions', 'Post type general name', 'cwb' ),
        'singular_name'         => _x( 'Questions', 'Post type singular name', 'cwb' ),
        'menu_name'             => _x( 'Questions', 'Admin Menu text', 'cwb' ),
        'name_admin_bar'        => _x( 'Questions', 'Add New on Toolbar', 'cwb' ),
        'add_new'               => __( 'Dodaj nowe pytanie', 'cwb' ),
        'add_new_item'          => __( 'Dodaj nowe pytanie Questions', 'cwb' ),
        'new_item'              => __( 'New Questions', 'cwb' ),
        'edit_item'             => __( 'Edit Questions', 'cwb' ),
        'view_item'             => __( 'View Questions', 'cwb' ),
        'all_items'             => __( 'All Questions', 'cwb' ),
    );     
    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
    );
      
    register_post_type( 'questions', $args );

    $labels = array(
        'name'                  => _x(' subscriber', 'taxonomy general name', 'cwb'),
        'singular_name'         => _x(' Category', 'taxonomy singular name', 'cwb'),
        'search_items'          => __('Szukaj', 'cwb'),
        'all_items'             => __('All List Experts subscriber', 'cwb'),
        'parent_item'           => __('Parent  Category', 'cwb'),
        'parent_item_colon'     => __('Parent  Category:', 'cwb'),
        'edit_item'             => __('Edit  Category', 'cwb'),
        'update_item'           => __('Update  Category', 'cwb'),
        'add_new_item'          => __('Add New  Category', 'cwb'),
        'new_item_name'         => __('New  Category Name', 'cwb'),
        'menu_name'             => __('category', 'cwb'),
    );

    $args = array(
        'hierarchical'  => true,
        'labels'        => $labels,
        'show_ui'       => true,
        'show_in_rest'  => true, // Enable Gutenberg support
        // 'rest_base' => 'Aktualności-Locations', // Set your custom REST base
        'rewrite'       => array('slug' => 'subscriberc'),
    );

    register_taxonomy('subscribercateg', 'subscriber', $args);

    

}

add_action( 'init', 'cwb_register_subscribers_post_type' );

// Add the emails column
add_filter('manage_subscriber_posts_columns', 'add_emails_column_to_subscriber');

function add_emails_column_to_subscriber($columns) {
    $columns['emails'] = __('Emails', 'cwb'); // Column for Emails
   
    return $columns;
}

// Populate the column with the emails post meta
add_action('manage_subscriber_posts_custom_column', 'subscriber_emails_column_content', 10, 2);
function subscriber_emails_column_content($column, $post_id) {
    if ($column == 'emails') {
        $email = get_post_meta($post_id, 'emails', true);
        echo esc_html($email);
    }   
}
add_filter('manage_naborye-subscribers_posts_columns', 'add_emails_column_to_naborye_subscribers');

function add_emails_column_to_naborye_subscribers($columns) {
    $columns['emails'] = __('Emails', 'cwb'); // Column for Emails
    $columns['program'] = __('Program', 'cwb');
    $columns['actions'] = __('Działanie', 'cwb'); 
    return $columns;
}

// Populate the column with the emails post meta
add_action('manage_naborye-subscribers_posts_custom_column', 'naborye_subscribers_emails_column_content', 10, 2);
function naborye_subscribers_emails_column_content($column, $post_id) {
    if ($column == 'emails') {
        $email = get_post_meta($post_id, 'emails', true);
        echo esc_html($email);
    }

    if ($column == 'program') {
        $programs = get_post_meta($post_id, 'programs', true);
    
        if (is_array($programs)) {
            $names = []; // Array to hold category names
            foreach ($programs as $program_id) {
                $term = get_term_by('id', $program_id, 'programa-categories');
                if ($term) {
                    $names[] = esc_html($term->name);
                }
            }
            $names_string = implode(', ', $names);
            echo $names_string;
        }
    }

    if ($column == 'actions') {
        $actions = get_post_meta($post_id, 'actions', true);

        if (is_array($actions)) { // Check if $actions is an array
            $names = []; // Array to hold category names
            foreach ($actions as $program_id) {
                $term = get_term_by('id', $program_id, 'action-categories');
                if ($term) {
                    // Add the term's name to the names array
                    $names[] = esc_html($term->name);
                }
            }
            // Join the names array into a single string
            $names_string = implode(', ', $names);
            echo $names_string;
        }
    }
}

// Add a meta box
add_action('add_meta_boxes', 'add_subscriber_meta_box');
function add_subscriber_meta_box() {
    add_meta_box(
        'subscriber_meta_box', // ID of the meta box
        __('Subscriber Details', 'cwb'), // Title of the meta box
        'display_subscriber_meta_box', // Callback function
        'subscriber', // Post type
        'normal', // Context
        'high' // Priority
    );
}

// Display the meta box content
function display_subscriber_meta_box($post) {
    // Retrieve current meta values
    $emails = get_post_meta($post->ID, 'emails', true);
    $szkolens = get_post_meta($post->ID, 'name', true);
    

    $subscribed_post_type = get_post_meta($post->ID, 'subscribed_post_type', true);

    // Nonce field for security
    wp_nonce_field('subscriber_meta_box_nonce', 'subscriber_meta_box_nonce_field');

    ?>
    <p>
        <label for="emails"><?php _e('E-mail', 'cwb'); ?></label>
        <input type="text" name="emails" id="emails" value="<?php echo esc_attr($emails); ?>" class="widefat" />
    </p>
    <p>
        <label for="szkolens"><?php _e('Nazwa instytucji', 'cwb'); ?></label>
        <input type="text" name="szkolens" id="szkolens" value="<?php echo esc_attr($szkolens); ?>" class="widefat" />
    </p>
    
    
    <input type="hidden" name="program" id="program" value="<?php echo esc_attr(implode(',', $programs)); ?>" />
    <?php
}

// Add a meta box
add_action('add_meta_boxes', 'add_naboray_subscriber_meta_box');
function add_naboray_subscriber_meta_box() {
    add_meta_box(
        'subscriber_meta_box', // ID of the meta box
        __('Subscriber Details', 'cwb'), // Title of the meta box
        'display_naboray_subscriber_meta_box', // Callback function
        'naborye-subscribers', // Post type
        'normal', // Context
        'high' // Priority
    );
}

// Display the meta box content
function display_naboray_subscriber_meta_box($post) {
    // Retrieve current meta values
    $emails = get_post_meta($post->ID, 'emails', true);
    $szkolens = get_post_meta($post->ID, 'name', true);
    $programs = get_post_meta($post->ID, 'programs', true);
    $actions = get_post_meta($post->ID, 'actions', true);

    $subscribed_post_type = get_post_meta($post->ID, 'subscribed_post_type', true);

    // Nonce field for security
    wp_nonce_field('subscriber_meta_box_nonce', 'subscriber_meta_box_nonce_field');

    ?>
    <p>
        <label for="emails"><?php _e('E-mail', 'cwb'); ?></label>
        <input type="text" name="emails" id="emails" value="<?php echo esc_attr($emails); ?>" class="widefat" />
    </p>
    <p>
        <label for="szkolens"><?php _e('Nazwa instytucji', 'cwb'); ?></label>
        <input type="text" name="szkolens" id="szkolens" value="<?php echo esc_attr($szkolens); ?>" class="widefat" />
    </p>
    
    <label for="program"><?php _e('Program', 'cwb'); ?></label>
    <table class="widefat">
    <thead>
        <tr>
            <th><?php _e('Program Name', 'cwb'); ?></th>
            <th><?php _e('Action Name', 'cwb'); ?></th>
        </tr>
    </thead>
    <tbody>
        <?php
        // Assuming $programs and $actions are arrays of the same length
        $max_length = max(count($programs), count($actions));

        for ($i = 0; $i < $max_length; $i++) {
            $program_name = $action_name = '';

            if (isset($programs[$i])) {
                $program_term = get_term_by('id', $programs[$i], 'programa-categories');
                if ($program_term) {
                    $program_name = esc_html($program_term->name);
                }
            }

            if (isset($actions[$i])) {
                $action_term = get_term_by('id', $actions[$i], 'action-categories');
                if ($action_term) {
                    $action_name = esc_html($action_term->name);
                }
            }

            echo '<tr><td>' . $program_name . '</td><td>' . $action_name . '</td></tr>';
        }
        ?>
    </tbody>
</table>
    <input type="hidden" name="program" id="program" value="<?php echo esc_attr(implode(',', $programs)); ?>" />
    <?php
}


// Save meta box data
add_action('save_post', 'save_subscriber_meta_box_data');
function save_subscriber_meta_box_data($post_id) {
    // Verify nonce
    if (!isset($_POST['subscriber_meta_box_nonce_field']) || !wp_verify_nonce($_POST['subscriber_meta_box_nonce_field'], 'subscriber_meta_box_nonce')) {
        return;
    }

    // Check if the user has permissions to save data.
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Check if not an autosave.
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Save or update meta
    if (isset($_POST['emails'])) {
        update_post_meta($post_id, 'emails', sanitize_text_field($_POST['emails']));
    }
    if (isset($_POST['szkolens'])) {
        update_post_meta($post_id, 'szkolens', sanitize_text_field($_POST['szkolens']));
    }
    if (isset($_POST['subscribed_post_type'])) {
        update_post_meta($post_id, 'subscribed_post_type', sanitize_text_field($_POST['subscribed_post_type']));
    }
}

function import_bookings_timings_from_csv() {
    $import_success = false; // Flag to track if the import was successful

    if (isset($_FILES['csv_file']) && file_exists($_FILES['csv_file']['tmp_name'])) {
        // Read the CSV file
        $file = fopen($_FILES['csv_file']['tmp_name'], 'r');

        // Skip the header row
        fgetcsv($file);

        // Loop through the CSV rows
        while (($row = fgetcsv($file)) !== FALSE) {
            // Create post if title, date, start time, end time, and category are present
            if (!empty($row[0]) && !empty($row[1]) && !empty($row[2]) && !empty($row[3]) && !empty($row[4])) {
                $post_id = wp_insert_post(array(
                    'post_title' => sanitize_text_field($row[0]),
                    'post_type' => 'bookings_timings',
                    'post_status' => 'publish',
                ));

                // Update ACF fields
                if ($post_id) {
                    update_field('data', sanitize_text_field($row[1]), $post_id);
                    update_field('godzina_startu', sanitize_text_field($row[2]), $post_id);
                    update_field('godzina_zakonczenia', sanitize_text_field($row[3]), $post_id);

                    // Check if the term exists and get its term ID
                    $term_name = sanitize_text_field($row[4]);
                    $term = term_exists($term_name, 'listexperts-categories');

                    // If the term doesn't exist, create it
                    if (!$term) {
                        $term = wp_insert_term($term_name, 'listexperts-categories');
                    }

                    // Get the term ID and set it for the post
                    if (!is_wp_error($term)) {
                        $term_id = $term['term_id'];
                        wp_set_post_terms($post_id, array($term_id), 'listexperts-categories');
                    }
                }
            }
        }

        fclose($file);
        $import_success = true; // Set the flag to true after successful import
    }

    return $import_success;
}

function render_import_bookings_timings_form() {
    ?>
    <div class="wrap">
        <h1>Import Bookings Timings from CSV</h1>
        <form method="post" enctype="multipart/form-data">
            <input type="file" name="csv_file" accept=".csv" />
            <input type="submit" value="Import" class="button button-primary" />
        </form>
    </div>
    <?php

    // Handle the form submission and display success message
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $imported = import_bookings_timings_from_csv();
        if ($imported) {
            echo '<div class="notice notice-success is-dismissible"><p>Import completed successfully.</p></div>';
        }
    }
}


// Function to add the file upload form to the admin menu
function add_import_bookings_timings_menu() {
    add_submenu_page(
        'edit.php?post_type=bookings_timings', 
        'Import Bookings Timings', 
        'Import', 
        'manage_options', 
        'import-bookings-timings', 
        'render_import_bookings_timings_form'
    );
}
add_action('admin_menu', 'add_import_bookings_timings_menu');

add_filter('manage_listexperts_posts_columns', 'add_listexperts_categories_column_after_title');
function add_listexperts_categories_column_after_title($columns) {
    $new_columns = array();
    foreach ($columns as $key => $value) {
        $new_columns[$key] = $value;
        if ($key == 'title') {
            // Inserting the custom taxonomy column after the title column
            $new_columns['listexperts_categories'] = __('List Experts Categories', 'cwb');
        }
    }
    return $new_columns;
}

add_action('manage_listexperts_posts_custom_column', 'listexperts_categories_column_content', 10, 2);
function listexperts_categories_column_content($column, $post_id) {
    if ($column == 'listexperts_categories') {
        echo get_the_term_list($post_id, 'listexperts-categories', '', ', ');
    }
}

add_filter('manage_bookings_timings_posts_columns', 'add_bookings_timings_categories_column_after_title');
function add_bookings_timings_categories_column_after_title($columns) {
    $new_columns = array();
    foreach ($columns as $key => $value) {
        $new_columns[$key] = $value;
        if ($key == 'title') {
            // Inserting the custom taxonomy column after the title column
            $new_columns['bookings_timings_categories'] = __('List Experts Categories', 'cwb');
        }
    }
    return $new_columns;
}

add_action('manage_bookings_timings_posts_custom_column', 'bookings_timings_categories_column_content', 10, 2);
function bookings_timings_categories_column_content($column, $post_id) {
    if ($column == 'bookings_timings_categories') {
        echo get_the_term_list($post_id, 'listexperts-categories', '', ', ');
    }
}

function cwb_register_question_category_taxonomy() {
    $labels = array(
        'name'              => _x('Categories', 'taxonomy general name', 'cwb'),
        'singular_name'     => _x('Kategorie', 'taxonomy singular name', 'cwb'),
        'search_items'      => __('Szukaj', 'cwb'),
        'all_items'         => __('All Categories', 'cwb'),
        'parent_item'       => __('Parent Category', 'cwb'),
        'parent_item_colon' => __('Kategoria rodzica:', 'cwb'),
        'edit_item'         => __('Edit Category', 'cwb'),
        'update_item'       => __('Update Category', 'cwb'),
        'add_new_item'      => __('Dodaj nową kategorię', 'cwb'),
        'new_item_name'     => __('New Category Name', 'cwb'),
        'menu_name'         => __('Categories', 'cwb'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'category'),
    );

    register_taxonomy('cwb_question_categories', array('questions'), $args);
}

add_action('init', 'cwb_register_question_category_taxonomy');
function add_bookings_columns($columns) {
    $columns['Dziedzina_dziedzina'] = 'Dziedzina - dziedzina';
    $columns['Datagodzina_konsultacji'] = 'Data i godzina konsultacji';
    return $columns;
}
add_filter('manage_bookings_posts_columns', 'add_bookings_columns');

function display_bookings_columns($column, $post_id) {
    switch ($column) {
        case 'Dziedzina_dziedzina':
            echo esc_html(get_post_meta($post_id, 'dziedzina', true));
            break;
        case 'Datagodzina_konsultacji':
            $termin_konsultacji = get_post_meta($post_id, 'termin_konsultacji', true);
            $godzina_konsultacji = get_post_meta($post_id, 'godzina_konsultacji', true);
            $booking_status = $termin_konsultacji . ' ' . $godzina_konsultacji;
            echo esc_html($booking_status);
            break;
    }
}
add_action('manage_bookings_posts_custom_column', 'display_bookings_columns', 10, 2);
add_filter('manage_posts_columns', 'remove_author_column');

function remove_author_column($columns) {
    // Unset the 'Author' column
    unset($columns['author']);
    return $columns;
}
