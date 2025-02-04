<?php
/*
  Plugin Name: gautan Blocks
  Version: 0.1
  Author: umer(UM)
  Author URI: 
  Text Domain:  gautanBlocks
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class gautanbarg_block {
  function __construct() {
    $this->gautan_Blocks_define_constants();
    add_action('init', array($this, 'gautanb'));
    add_filter( 'block_categories', array( $this, 'custom_block_category' ), 10, 2 );
    
  }
   // /**
		//  * Define constant if not already set.
		//  *
		//  * @param  string $name
		//  * @param  string|bool $value
		//  */
		private function define( $name, $value ) {
			if ( ! defined( $name ) ) {
				define( $name, $value );
			}
		}
         /**
		 * Define gautan Blocks Constants.
		 */

        private function gautan_Blocks_define_constants() {
            $this->define( 'gautan_Blocks_PLUGIN_FILE', plugin_dir_path(__FILE__));	
            $this->define( 'gautan_Blocks_BASE_URL', plugin_dir_url(__FILE__) );
        }

  function gautanb(){
    $strings = array(
 

      // add new text

        // block name
       'Home_page_banner_slider'  => __('Slider (strona główna)' ,  'cwb'),
       'Select_a_post_type'              => __('Wybierz typ postu' , 'cwb'),
       'shortcuts_block'               => __('Na skróty' , 'cwb'), 
       'Kontakt_home_block'               => __('Kontakt (strona główna)' , 'cwb'), 
       'Section_heading'                 => __('Section_heading' ,'cwb'),
       'image_section_block'         =>__('Informacja+obrazek' , 'cwb' ),
       'Accordion'                       => __('Accordion' , 'cwb'),
       'Accordion_inner_section'                       => __('Akordeon - bloki' , 'cwb'),
       'text_title'                 => __('Informacje o szkoleniu' , 'cwb'),
       'sliderallerty'             => __('Galeria (slider) ' , 'cwb'),
       'add_images_gallery'        => __('Zdjęcia w galerii' , 'cwb'),
       'icon_heading_block'                => __('Ikona+nazwa sekcji ' , 'cwb'),
       'download_file_block'                => __('Pliki do pobrania' , 'cwb'),
       'order_list_block'                => __('Lista numerowana ' , 'cwb'),
       'point_of_nature'                => __('Schemat ' , 'cwb'),
       'team'                            => __('Zespół (lista)' , 'cwb'),
       'Lista_Ekspertw'                => __('Lista Ekspertów ' , 'cwb'),
       'contact_block'                => __('Kontakt ' , 'cwb'),
       'News'                         => __('News' , 'cwb'),
       'program_schedule_list'                => __('Program (lista)' , 'cwb'),
       'website_link'              =>__('Linki zewnętrzne',  'cwb'),
       'map_block'              =>__('Blok mapy',  'cwb'),
       'map_blockt'              =>__('Blok mapyt',  'cwb'),
       'harmonogram_block'              =>__('Harmonogram block',  'cwb'),
       'file_Tab'                => __('Lista szkoleń ' , 'cwb'),
       'newgallerty'                => __('Galeria (siatka) ' , 'cwb'),
       'columnvalue'                => __('Ilość kolumn' , 'cwb'),
       'podstrony_block'              =>__('Podstrony lub linki',  'cwb'),
       'icon_heading_blocktitl'                => __('Ustawienia repeatera ' , 'cwb'),
       'kalendarz_konsultacji'      => __('Kalendarz szkoleń i konsultacji ' , 'cwb'),
       'go_to_question'             => __('Enter the question number ' , 'cwb'),
       'go_to_ansnumber'             => __('Enter the ans number ' , 'cwb'),
       'questionnumber'             => __('Question number ' , 'cwb'),
       'ansnumber'             => __('Ans number ' , 'cwb'),


        // block title

        'Repeater_slider'  => __('Ustawienia slidera' ,  'cwb'),
        'Repeater_slidtyr'  => __('Ustawienia bloku' ,  'cwb'),
        'side_block'                      => __('Ustawienia linków' , 'cwb'),
        'shortcuts_Repeater'  => __('Ustawienia repeatera' ,  'cwb'),
        'image_block'                 => __('Ustawienia bloku' ,'cwb'),
        'Accordion_File_Block'                 => __('Ustawienia bloku' ,'cwb'),
        'Training_File_Block'                 => __('Ustawienia repeatera' ,'cwb'),
        'Tab_Block'                 => __('Ustawienia bloku' ,'cwb'),
        'File_Block_Settings'                 => __('Ustawienia bloku' ,'cwb'),
        'nature'                => __('Ustawienia bloku ' , 'cwb'),
        'Repeater_slidertyui'  => __('Ustawienia repeatera' ,  'cwb'),
        'shortcuts_blockty'  => __('Element' ,  'cwb'),
        'Repeattyu_slider'  => __('Ustawienia bloku' ,  'cwb'),
        

        // text
        'inner_button'                        => __('Tekst na wewnętrznym przycisku' ,'cwb'),
        'Button_URLextrenal'                        => __('link (zewnętrzny przycisk)' ,'cwb'),
        'Text_on_the_button'                        => __('Tekst na zewnętrznym przycisku' ,'cwb'),
        'Button_URLrt'                        => __('Link (wewnętrzny przycisk)' ,'cwb'),
        'side_blocky'                      => __('Kafelek' , 'cwb'),
        'slider'                          => __('Punkt' ,  'cwb'),
        'sliderdy'                          => __('Kafelek' ,  'cwb'),
        'filename'                          => __('File name' ,  'cwb'),
        'Select_an_image'                 => __('Wybierz obrazek' , 'cwb'),
        'Title'                           => __('Tytuł' ,'cwb'),
        'rejection'                           => __('rejection' ,'cwb'),
        'Enter_a_title'                   => __('Wpisz tytuł' , 'cwb'),
        'Question_block'                   => __('Ustawienia bloku' , 'cwb'),
        'Question'                   => __('Pytanie' , 'cwb'),
        'start'                   => __('start' , 'cwb'),
        'End'                   => __('End' , 'cwb'),
        'hint'                   => __('Podpowiedź' , 'cwb'),
        'project_idea_block'                   => __('Ocena - pytanie' , 'cwb'),
        'project_idea_rejection_block'                   => __('Ocena - odrzucona' , 'cwb'),
        'project_idea'                      => __('project idea' , 'cwb'),
        'Button_URL'                      => __('URL przycisku' , 'cwb'),
        'button'                          => __('Przyciski' , 'cwb'),
        'Enter_date'                      => __('Wprowadź datę' , 'cwb'),
        'remove'                          => __('Usuń' , 'cwb'),
        'Add_a_item'                      => __('Dodaj kafelek' , 'cwb'),
        'Add_itemyu'                      => __('Dodaj kafelek' , 'cwb'),
        'enter_url'                       => __('Wpisz URL' , 'cwb'),
        'enter_urlrt'                       => __('Wpisz ' , 'cwb'),
        'Section_heading'                 => __('Nagłówek sekcji' ,'cwb'),
        'selec'                            => __('select' ,'cwb'),
        'selected_style'                 => __('select style' ,'cwb'),
        'style'                           => __('Styl'  , 'cwb') ,
        'Section_title'                   => __('Tytuł sekcji' ,'cwb'),
        'Select_a_post_style'                   => __('Wybierz styl wpisu'  , 'cwb') ,
        'Selectapost_type'              => __('Wybierz typ postu' , 'cwb'),
        'post_type_title'              => __('post section title' , 'cwb'),
        'wyszukiwarki_title'              => __('wyszukiwarki Tytuł ' , 'cwb'),
        'wyszukiwarki_titlet'              => __('tekst na zewnętrznym przycisku ' , 'cwb'),
        'Select_a_category'               => __('Wybierz kategorię' , 'cwb'), 
        'shortcuts_blocker'               => __('Kafelek' , 'cwb'), 
        'description'                     => __('Opis' , 'cwb'), 
        'description_project'                     => __('Opis' , 'cwb'), 
        'Enter_a_discriptio'             => __('Wpisz opis' , 'cwb'),
        'Enter_a_description'             => __('Wpisz opis' , 'cwb'),
        'Enter_a_label'             => __('Enter a label' , 'cwb'),
        'Enter_a_value'             => __('Enter a value' , 'cwb'),
        'Enter_a_description_project'             => __('Wpisz opis' , 'cwb'),
        'question_description'          =>__('Pytanie' , 'cwb'),
        'add_itemy'                  => __('Dodaj kafelek' , 'cwb'),
        'add_item'                  => __('Dodaj' , 'cwb'),
        'inputlabel'                  => __('Tekst na przycisku' , 'cwb'),
        'inputvalue'                  => __('input value' , 'cwb'),
        'add_itemfanc'                  => __('Dodaj obrazek' , 'cwb'),
        'add_iteme'                  => __('Dodaj element' , 'cwb'),
        'Kontakt_list'                    => __('Kontakt ' , 'cwb'),
        'Map_shortcode'                   => __('Shortcode mapy' , 'cwb'),
        'enter_heading'                   => __('Enter your heading here' , 'cwb'),
        'enter_headingg'                   => __('Wpisz' , 'cwb'),
        'heading_style'                   => __('Wielkość nagłówka' , 'cwb'),
        'select_design'                => __('Wielkość nagłówka' , 'cwb'),
        'Heading'                       =>__('Heading' , 'cwb'),
        'sectiont'                => __('Nagłówek' , 'cwb'),
        'headerdivider'                => __('Podkreślenie nagłówka' , 'cwb'),
        'Change_file'                     => __('Zmień plik' , 'cwb'),
        'Rignt'                         => __('Prawo' , 'cwb'),
        'Left'                          => __('Lewo' , 'cwb'),
        'selected_image_side'                          => __('Wybierz' , 'cwb'),
        'Background_color'                => __('Kolor tła' ,'cwb'),
        'Delete_Image'                => __('Usuń obrazek' ,'cwb'),
        'image_side'                        => __('Pozycja obrazka' ,'cwb'),
        
        'choose_a_file'                   => __('Wybierz plik' , 'cwb'),
        'Select_Post_Type'              => __('Select Post Type' , 'cwb'),
        'File_title'                      => __('Tytuł pliku' , 'cwb'),
        'add_file'                        => __('Dodaj plik' , 'cwb'),
        'add_section'                        => __('add section' , 'cwb'),
        'add_sectiont'                        => __('Dodaj zakładkę' , 'cwb'),
        'Delete_a_section'                     => __('Usuń sekcję' , 'cwb'),
        'add_a_section'                     => __('Add a section' , 'cwb'),
        'repeter'                     => __('repeter' , 'cwb'),
        'Select_Category'               => __('Select Category' , 'cwb'),
        'Tab'                => __('Tab ' , 'cwb'),
        'Zakdka'                => __('Zakłądka ' , 'cwb'),
        'posts_per_page'            => __('Ilość postów na stronie' , 'cwb'),
        'categoriese'                 => __('Wybierz kategorię' , 'cwb'),
        'select_post_type'          => __('Wybierz typ postów' ,'cwb'),
        'Select_product'          => __('Wybierz posty ' ,'cwb'),
        'upcoming'          => __('Nadchodzące' ,'cwb'),
        'completed'          => __('Zakończone' ,'cwb'),
        'add_tab'            => __('Dodaj zakładkę', 'cwb'),
        'Wyświetlaj'            => __('Wyświetlaj szkolenia:', 'cwb'),
       'image'            => __('Obrazek', 'cwb'),
       'slider_gallery_Settings'            => __('slider gallery Settings', 'cwb'),
       'remove_image_hover'              =>__('Usuń efekt po najechaniu',  'cwb'),    
       
       

       'delete_file'         =>__('Usuń plik' , 'cwb'),
       'file_new_file'   =>__('Dodaj nowy plik'),
       'post_per_page'                   => __('Ilość postów na stronie'  , 'cwb') ,
       
       'Column_size'                     => __('Rozmiar kolumny'  , 'cwb') ,
       'Nested_rowr'                => __('Lista' ,'cwb'),
       'select_icon'               => __('Wybierz ikonę' , 'cwb'),
       'delete_point'              => __('Usuń punkt' , 'cwb'),
       'point'                      => __('Dodaj punkt' , 'cwb'),
       'usun_sekcje'               => __('Usuń sekcję' , 'cwb'),
       'add_sectit'        => __('Dodaj sekcję'  , 'cwb') ,
       'addlink'        => __('Link'  , 'cwb') ,
       'mapshortcode'        => __('Shortcode mapy'  , 'cwb') ,
       'button_text'                => __('Tekst na przycisku' , 'cwb'),
       'button_url'                => __('Button URL' , 'cwb'),
         'start_date'              =>__('Rozpoczęcie',  'cwb'),
         'end_date'              =>__('Zakończenie',  'cwb'),
        
         'nature_style'              =>__('Styl bloku',  'cwb'),
         'border_color'              =>__('Kolor obramowania',  'cwb'),
         'kalendarz'                => __('Kalendarz (lista) ' , 'cwb'),
         'delete_image'              =>__('Usuń ikonę',  'cwb'),
         'slider_pause'             =>__('zatrzymaj slajder',  'cwb'),
         'slider_play'              =>__('zagraj na sliderze',  'cwb'),
         'slider_Previous'          =>__('poprzedni',  'cwb'),
         'slider_Next'              =>__('następny',  'cwb'),
        

// change the text
      
      
      
     
      
      // 'sliderallerty'             => __('Slider gallery ' , 'cwb'),
      'file_block'                => __('File Block' , 'cwb'),
      'add_file'                  => __('Add File' , 'cwb'),
      'remove'                    => __('Remove' , 'cwb'),
      'usun_slajd'                => __('Usuń slajd' , 'cwb'),
      'usun_sekcje'               => __('Usuń sekcję' , 'cwb'),
      'usun_przycisk'             => __('Usuń przycisk' , 'cwb'),
      'change_file'               => __('Change File' , 'cwb'),
      'select_file'               => __('Select File' , 'cwb'),
      'add'                       => __('add it' , 'cwb'),
      'delete'                    => __('delete' , 'cwb'),
      'enter_heading'             => __('Enter your heading here' , 'cwb'),
      'gios_page_heading'         => __('GIOS Page heading' , 'cwb'),
      'text_with_2_image'         => __('Text Block with 2 images' , 'cwb'),
      'change_image_1'            => __('Change Image 1' , 'cwb'),
      'select_image_1'            => __('select Image 1' , 'cwb'),
      'change_image'              => __('Change Image' , 'cwb'),
      // 'select_image'              => __('select Image' , 'cwb'),
      'change_image_2'            => __('Change Image 2' , 'cwb'),
      'select_image_2'            => __('select Image 2' , 'cwb'),
      'enter_content'             => __('Enter content...' , 'cwb'),
      'gio_block_with_1_'         => __('GIOS block with 1 image' , 'cwb'),
      'left'                      => __('left' , 'cwb'),
      'right'                     => __('right' , 'cwb'),
      'enter_title'               => __('Enter title...' , 'cwb'),
      'read_more_btn_con'         => __('Czytaj więcej' , 'cwb'),
      'button_url'                => __('Button URL' , 'cwb'),
      'block_settings'            => __('Block Settings' , 'cwb'),
      'fancy_slider'              => __('fancybox Slider' , 'cwb'),
      'add_images_gallery'        => __('Zdjęcia w galerii' , 'cwb'),
      'gios_links'                => __('GIOS Linki' , 'cwb'),
      'title'                     => __('Title' , 'cwb'),
      'link'                      => __('link' , 'cwb'),
      'add_link'                  => __('Add Linki' , 'cwb'),
      'gios_post_slider'          => __('GIOS Posts slider' , 'cwb'),
      'enter_image_url'           => __('Enter image URL...' , 'cwb'),
      'enter_url'                 => __('Wpisz URL...' , 'cwb'),
     
      'post_list_block'           => __('Post List Block' , 'cwb'),
      'gios_slider'               => __('GIOS slider' , 'cwb'),
      'gios_wyniki_blocks'        => __('GIOS Wyniki Blocks' , 'cwb'),
      'custom_shortcode_block'    => __('GIOS Posts List' , 'cwb'),
      'post_type'                 => __('Post Type' , 'cwb'),
      'file_type'                 => __('plik' , 'cwb'),
      'categories'                 => __('category' , 'cwb'),
     
     
























      // old text 

'Add_a_section'                   => __('Dodaj sekcję'  , 'cwb') ,
      'Column_size'                     => __('Rozmiar kolumny'  , 'cwb') ,
      'Foot_block'                      => __('Blok stopki'  , 'cwb') ,
      'Video_block'                     => __('Wideo block '  , 'cwb') ,
      'Partners_map'                    => __('Mapa partnerów'  , 'cwb') ,
      'Tabs'                            => __('Zakładki taby'  , 'cwb') ,
      'Tile'                            => __('Kafelek'  , 'cwb') ,
      'Contact_with_the_map'            => __('Kontakt z mapą'  , 'cwb') ,
      'Selecting_a_media_category'      => __('Wybór kategorii multimediów ' , 'cwb'),
      'Photo_gallery'                   => __('Galeria zdjęć (siatka)' , 'cwb'),
      'read_on'                         => __('Czytaj dalej' , 'cwb'),
      'Accordion'                       => __('Akordeon' , 'cwb'),
      'Section_heading'                 => __('Nagłówek sekcji' ,'cwb'),
      'Select_an_icon'                  => __('Wybierz ikonę' , 'cwb'),
      'Nested_row'                      => __('Nested list row' ,'cwb'),
      'Title'                           => __('Tytuł' ,'cwb'),
      'Benefits'                        => __('Korzyści' , 'cwb'),
      'Project_goal'                    => __('Cel projektu' , 'cwb'),
      'Information_picture'             => __('Informacje+obrazek' , 'cwb'),
      'O-project_inner_Genesis'         =>  __('O-project inner Genesis' , 'cwb'),
      'Button_color'                    => __('Button color' , 'cwb'),
      'description'                     => __(' opis' , 'cwb'),  
      'Enter_a_description'             => __('Wpisz opis' , 'cwb'),  
      'Button_URL'                      => __('URL przycisku' , 'cwb'),
     
      'Select_a_category'               => __('Wybierz kategorię' , 'cwb'), 
      // 'Select_a_post_type'              => __('Wybierz typ postów' , 'cwb'),  
      'Number_of_posts_on_the_page'     => __('Ilość postów na stronie' , 'cwb'),
      'Section_title'                   => __('Tytuł sekcji' ,'cwb'),
      'Background_color'                => __('Kolor tła' ,'cwb'),
      'selected_design'                 => __('selected design' ,'cwb'),
      'Project_in_numbers'              => __('Projekt w liczbach' ,'cwb'),
      'Files_to_download'               => __('Pliki do pobrania' , 'cwb'),
      'add_file'                        => __('Dodaj plik' , 'cwb'),
      'remove'                          => __('Usuń' , 'cwb'),
      'Delete_slide'                      => __('Usuń slajd' , 'cwb'),
      'Delete_a_section'                     => __('Usuń sekcję' , 'cwb'),
      'Delete_button'                   => __('Usuń przycisk' , 'cwb'),
      'Change_file'                     => __('Zmień plik' , 'cwb'),
      'About_project'                   => __('About project' , 'cwb'),
      'choose_a_file'                   => __('Wybierz plik' , 'cwb'),
      'add_it'                          => __('add it' , 'cwb'),
      'delete'                          => __('delete' , 'cwb'),
      'enter_heading'                   => __('Enter your heading here' , 'cwb'),
      'Heading'                         => __(' Nagłówek ' , 'cwb'),
      'text_with_2_image'               => __('Text Block with 2 images' , 'cwb'),
      'change_image_1'                  => __('Change Image 1' , 'cwb'),
      'Select_an_image'                 => __('Wybierz obrazek' , 'cwb'),
      'Change_the_picture'              => __(' Zmień obrazek' , 'cwb'),
      'Delete_point'                    => __('Usuń punkt' , 'cwb'),
      'change_image_2'                  => __('Change Image 2' , 'cwb'),
      'select_image_2'                  => __('select Image 2' , 'cwb'),
      'left'                            => __('Lewo' , 'cwb'),
      'right'                           => __('Prawo' , 'cwb'),
      'Enter_a_title'                   => __('Wpisz tytuł' , 'cwb'),
      'read_more'                       => __('Czytaj więcej' , 'cwb'),
      'block_settings'                  => __('Block Settings' , 'cwb'),
      'fancy_slider'                    => __('fancybox Slider' , 'cwb'),
      
      'File_title'                      => __('Tytuł pliku' , 'cwb'),
      'link'                            => __('Link' , 'cwb'),
      'Links'                           => __('Linki' , 'cwb'),
      'Add_Links'                       => __('Add Linki' , 'cwb'),
      'enter_image_url'                 => __('Enter image URL...' , 'cwb'),
      'enter_url'                       => __('Wpisz URL...' , 'cwb'),
      'Add_a_item'                      => __('Dodaj kafelek' , 'cwb'),
      'Add_an_image'                    => __('Dodaj obraz' , 'cwb'),
      'Map_shortcode'                   => __('Shortcode mapy' , 'cwb'),
      'Add_a_tab'                       => __('Dodaj zakładkę' , 'cwb'),
      'post_list_block'                 => __('Post List Block' , 'cwb'),
      'gios_slider'                     => __('GIOS slider' , 'cwb'),
      'List'                            => __('Lista' , 'cwb'),
      'Add_a_point'                     => __('Dodaj punkt' , 'cwb'),
      'Add_a_title'                     => __('Dodaj tytuł' , 'cwb'),
      'post_type'                       => __('Typ posta' , 'cwb'),
      'Select_a_category'               => __('Wybierz kategorię' , 'cwb'),
      'file_type'                       => __('file' , 'cwb'),
      'custom_shortcode_block'          => __('Lista postów' , 'cwb'),
      'News'                            => __('Aktualności' , 'cwb'),
      'Video_posts'                     => __('Posty wideo' , 'cwb'),
      'Gallery_posts'                   => __('Posty galerii' , 'cwb'),
      'Category_ID'                     => __('ID kategorii'  , 'cwb') ,
      'style'                           => __('Styl'  , 'cwb') ,
      'featured_psots'                  => __('Posty na stronie głownej'  , 'cwb') ,
      'post_per_page'                   => __('Ilość postów na stronie'  , 'cwb') ,
      'plik_pobierze'                   => __('Plik pobierze się po naciśnięciu'  , 'cwb') ,
      'Custom_Posts_Shortcode'          => __('Custom Posts Shortcode Block'  , 'cwb') ,
      'filter'                          => __('Display Filters'  , 'cwb') ,
      'Select_a_block_style'                   => __('Wybierz styl bloku'  , 'cwb') ,




    );
    $site_url   = site_url();

    wp_register_script('gautanbscript', gautan_Blocks_BASE_URL . 'build/index.js', 
    array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-api' , 'wp-editor' , 'wp-i18n' ),
      );
      // wp_register_style('gautanbStyle', gautan_Blocks_BASE_URL . 'build/editer.css');
      // wp_enqueue_style('gautanbFrontendStyles', gautan_Blocks_BASE_URL . 'build/style.css');
      $svg_url  = gautan_Blocks_BASE_URL. '/images/images.jpeg ';
      $kelendarz_url  = gautan_Blocks_BASE_URL. '/images/Group42641.png ';
      $screentshotmap  = gautan_Blocks_BASE_URL. '/images/Screenshotmap_2.png '; 
      $linksvg       =   gautan_Blocks_BASE_URL. '/images/link.svg ';

    wp_localize_script( 'gautanbscript', 'myBlockData', array( 
      'strings' => $strings ,
      'defaultimge' => $svg_url,
      'kelendarz_url' => $kelendarz_url,
      'screentshotmap' => $screentshotmap,
      'siteUrl'     =>  $site_url,
      'linksvg'     =>  $linksvg 

      ) );

      register_block_type('myguten-block/block-name', array(
        'editor_script' => 'gautanbscript',
        'editor_style' => 'gautanbStyle',
        'style'        =>  'gautanbFrontendStyles'
      ));
      
  }
  function custom_block_category($categories, $post) {
    return array_merge(
      $categories,
      array(
        array(
          'slug'  => 'my-custom-category',
          'title' => __('CWB block', 'eprojekty'),
          'icon'  => 'wordpress', // You can change this to your preferred icon
      ),
      )
  );
}


}
 new gautanbarg_block();
  ?>