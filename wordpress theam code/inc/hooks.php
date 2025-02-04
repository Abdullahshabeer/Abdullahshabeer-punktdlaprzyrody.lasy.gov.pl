<?php

// Add the dropdown filters for trainings and status
add_action('restrict_manage_posts', 'filter_bookings_by_status_and_training');

function filter_bookings_by_status_and_training() {
    global $typenow, $wpdb;
    if ($typenow == 'training_bookings') {
        // Status Dropdown
        $current_selected_status = isset($_GET['booking_status']) ? $_GET['booking_status'] : '';
        $statuses = array(
            'publish' => __('Lista podstawowa' , 'cwb'),
            'pending' => __('Lista rezerwowa' , 'cwb'),
            'draft'   => __('Oczekujący ' , 'cwb'),
            'canceled'=> __('Zrezygnował' , 'cwb') // Include your custom status
        );

        echo '<select name="booking_status">';
        echo '<option value="">'.__('Wszystkie Statusy' , 'cwb').'</option>';
        foreach ($statuses as $value => $label) {
            $selected = ($current_selected_status == $value) ? ' selected="selected"' : '';
            echo '<option value="' . esc_attr($value) . '"' . $selected . '>' . esc_html($label) . '</option>';
        }
        echo '</select>';

        // Training Dropdown
        $current_selected_training_id = isset($_GET['training_id']) ? $_GET['training_id'] : '';
        $query = "SELECT ID, post_title FROM {$wpdb->posts} WHERE post_type = 'newpost' AND post_status = 'publish'";
        $trainings = $wpdb->get_results($query);

        echo '<select name="training_id">';
        echo '<option value="">'.__('Wszystkie Treningi' , 'cwb').'</option>';

        foreach ($trainings as $training) {
            $selected = ($training->ID == $current_selected_training_id) ? ' selected="selected"' : '';
            echo '<option value="' . esc_attr($training->ID) . '"' . $selected . '>' . esc_html($training->post_title) . '</option>';
        }
        echo '</select>';
    }
}

// Modify the query based on the selected filters
add_action('pre_get_posts', 'filter_bookings_query');

function filter_bookings_query($query) {
    global $pagenow;
    if(isset($_GET['post_type'] )){
        if (is_admin() && $pagenow == 'edit.php' && $_GET['post_type'] == 'training_bookings') {
            // Filter by Status
            if (isset($_GET['booking_status']) && !empty($_GET['booking_status'])) {
                $query->set('post_status', $_GET['booking_status']);
            }

            // Filter by Training
            if (isset($_GET['training_id']) && !empty($_GET['training_id'])) {
                $query->set('meta_key', 'training_id');
                $query->set('meta_value', $_GET['training_id']);
            }
        }
    }
}



add_action('init', 'register_canceled_post_status');
$status_title   =   __('Zrezygnował' , 'cwb');
function register_canceled_post_status() {
    register_post_status('canceled', array(
        'label'                     => _x('Zrezygnował', 'post'),
        'public'                    => true,
        'exclude_from_search'       => false,
        'show_in_admin_all_list'    => true,
        'show_in_admin_status_list' => true,
        'label_count'               => _n_noop('Zrezygnował (%s)', 'Zrezygnował (%s)'),
    ));
}

add_action('admin_footer-post.php', 'add_custom_status_to_dropdown');

add_action('admin_print_footer_scripts', 'add_custom_status_quick_edit_javascript');
function add_custom_status_quick_edit_javascript() {
    // Only for our custom post type 'training_bookings'
    global $post_type;
    if ($post_type !== 'training_bookings') {
        return;
    }
    ?>
    <script>
    jQuery(function($){
        $(document).on('click', '.editinline', function(){
            var postId = $(this).closest('tr').attr('id');

            postId = postId.replace("post-", "");

            var $inlineEditor = $('.inline-editor');
            var $postStatusSelect = $inlineEditor.find('select[name="_status"]');
            var customStatus = 'canceled';
            var customStatusText = '<?php _e('Zrezygnował', 'cwb'); ?>';

            // Add the custom status to the select dropdown if it's not already present
            if ($postStatusSelect.find('option[value="' + customStatus + '"]').length == 0) {
                $postStatusSelect.append('<option value="' + customStatus + '">' + customStatusText + '</option>');
            }

            // Set the correct value on the dropdown if it's the status of the post
            var $wpInlineData = $('#inline_' + postId);
            var $currentStatus = $wpInlineData.find('.post_status').text();

            if ($currentStatus == customStatus) {
                $postStatusSelect.val(customStatus);
            }
        });
    });
    </script>
    <?php
}


function add_custom_status_to_dropdown() {
    global $post;

    if ($post->post_type == 'training_bookings') { ?>
        <script>
            jQuery(document).ready(function($) {
                // Add the custom status to the select dropdown
                $("select#post_status").append('<option value="canceled" <?php selected('canceled', $post->post_status); ?>><?php _e('Zrezygnował' , 'cwb') ?></option>');

                // Update the status text next to the "Update" button
                <?php if ('canceled' == $post->post_status) { ?>
                    $('#post-status-display').text('<?php _e('Zrezygnował' , 'cwb') ?>');
                <?php } ?>

                // Update status text when status is changed
                $('#post_status').change(function() {
                    if ($(this).val() == 'canceled') {
                        $('#post-status-display').text('<?php _e('Zrezygnował' , 'cwb') ?>');
                    }
                });
            });
        </script>
    <?php }
}

add_filter('display_post_states', 'display_custom_post_state_in_list', 10, 2);

function display_custom_post_state_in_list($post_states, $post) {
    if ('canceled' == get_post_status($post->ID)) {
        $post_states[] = __('Zrezygnował' , 'cwb');
    }

    return $post_states;
}

function theme_enqueue_comments_reply() {
    if (get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'theme_enqueue_comments_reply');

function my_custom_comment_callback($comment, $args, $depth) {
    $GLOBALS['comment'] = $comment;
    $comment_id = get_comment_ID();
    $post_id    = get_the_ID();
    ?>
    <div class="inner-comment-sec">
        <div class="collapse" id="comment-collapse-<?php echo $comment_id; ?>">
            <div class="comments-row">
                <div class="comment-item d-flex align-items-start">
                    <div class="user-icon d-flex align-items-center justify-content-center">
                        <span><?php echo strtoupper(substr(get_comment_author(), 0, 1)); ?></span>
                    </div>
                    <div class="comment-content">
                        <h3><?php echo get_comment_author(); ?></h3>
                        <p><?php echo get_comment_text(); ?></p>
                        <div class="comment-date">
                            <span><?php echo get_comment_date('d.m.Y'); ?></span>
                        </div>
                        <div class="reply-form">
                            <div class="web-btn add-answer-btn text-end">
                                <a href="#" class="btn btn-primary">Odpowiedz</a>
                            </div>
                            <div class="web-form-wrap" id="respond">
                                <div class="web-form">
                                    <form action="<?php echo site_url('/wp-comments-post.php'); ?>" method="post" class="needs-validation">
                                        <input type="hidden" name="comment_parent" value="<?php echo $comment_id; ?>">
                                        <input type="hidden" name="comment_post_ID" value="<?php echo $post_id; ?>" />
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="author-<?php echo $comment_id; ?>"><?php __('Imię' , 'cwb'); ?> <span class="required">*</span></label>
                                                    <input type="text" name="author" class="form-control" id="author-<?php echo $comment_id; ?>" placeholder="<?php __('Wpisz' , 'cwb'); ?>" required>
                                                    <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="email-<?php echo $comment_id; ?>">E-mail <span class="required">*</span></label>
                                                    <input type="email"  name="email" class="form-control" id="email-<?php echo $comment_id; ?>" placeholder="<?php _e('Wpisz' , 'cwb'); ?>" required>
                                                    <div class="invalid-feedback"><?php _e('Proszę o prawidłowy adres e-mail!' , 'cwb'); ?></div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label for="comment-<?php echo $comment_id; ?>"><?php _e('Pytanie' , 'cwb'); ?> <span class="required">*</span></label>
                                                    <textarea class="form-control char-limit" name="comment" id="comment-<?php echo $comment_id; ?>" placeholder="<?php _e('Opisz' , 'cwb'); ?>" data-maxlength="500" required></textarea>
                                                    <div class="charCount text-end">0/500</div>
                                                    <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="web-btn form-btn text-end">
                                                    <button type="submit" class="btn btn-primary" value="submit"><?php _e('DODAJ' , 'cwb'); ?></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="web-heading collapse-heading collapsed" data-bs-toggle="collapse" href="#comment-collapse-<?php echo $comment_id; ?>" role="button" aria-expanded="false" aria-controls="comment-collapse-<?php echo $comment_id; ?>">
            <h4 class="hide-replies"><?php _e('Ukryj odpowiedzi' , 'cwb'); ?></h4>
            <h4 class="show-replies"><?php _e('Pokaż odpowiedzi' , 'cwb'); ?></h4>
        </div>
    </div>
    <?php
}


add_filter('manage_training_bookings_posts_columns', 'add_training_name_column_next_to_name');
function add_training_name_column_next_to_name($columns) {
    $new_columns = [];
    foreach ($columns as $key => $title) {
        // Insert right after the 'Name' column
        if ($key === 'title') { // 'title' is usually the key for the 'Name' column
            $new_columns[$key] = $title;
            $new_columns['training_name'] = __('Szkolenia', 'cwb'); // Add your custom column
        } else {
            $new_columns[$key] = $title;
        }
    }
    return $new_columns;
}

add_action('manage_training_bookings_posts_custom_column', 'populate_training_name_column', 10, 2);
function populate_training_name_column($column, $post_id) {
    if ('training_name' === $column) {
        $training_id = get_post_meta($post_id, 'training_id', true);
        if ($training_id) {
            $training_post = get_post($training_id);
            if ($training_post) {
                echo esc_html($training_post->post_title);
            } else {
                _e('Unknown', 'cwb');
            }
        } else {
            _e('Not Set', 'cwb');
        }
    }
}

add_filter('manage_edit-training_bookings_sortable_columns', 'make_training_name_column_sortable');
function make_training_name_column_sortable($columns) {
    $columns['training_name'] = 'training_name'; 
    return $columns;
}
