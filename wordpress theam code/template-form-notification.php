<?php
/**
 **  Template Name: fom notification
 */
get_header();
?>
<?php
// Start the Loop.
if (have_posts()) {
    while (have_posts()) {
        the_post();
?>


<form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="post">
    <input type="hidden" name="action" value="subscribe_to_categories">
    <label for="email"><?php _e('Email:', 'cwb') ?></label>
    <input type="email" name="email" required>
    
    <label for="categories"><?php _e('Select Categories:', 'cwb') ?></label>
    <select name="categories[]"  >
    
    <option selected  value=""><?php _e('Wybierz' , 'cwb') ?></option>
    <?php
$taxonomy = 'programa-categories';
$tax_terms = get_terms($taxonomy, array('hide_empty' => false));

$selectedPrograms = isset($_POST['program']) ? (array)$_POST['program'] : array(); // Change $_POST for your form method

foreach ($tax_terms as $term) {
    $term_id = $term->term_id; // Get the term ID
    echo '<option value="' . esc_attr($term_id) . '"'; // Use term ID as the value

    if (in_array($term_id, $selectedPrograms)) { // Check if the term ID is in the selected programs
        echo '' . __('selected:', 'cwb') . '  ';
    }

    echo '>' . esc_html($term->name) . '</option>';
}
?>
    </select>
    
    
    <input type="submit" value="Subscribe">
</form>



<?php
    }
}
get_footer( )

?>