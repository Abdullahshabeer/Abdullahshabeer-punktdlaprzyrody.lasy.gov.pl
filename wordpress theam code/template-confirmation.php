<?php 
// Template Name: Confirm Booking
?>
<?php get_header(); ?>
<div id="site-wrapper">
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
            <?php
            $token          =   sanitize_text_field($_GET['token']);
            $booking_id     =   get_booking_id_by_token($token);
            if ($booking_id) {
                $current_status     = get_post_meta($booking_id, 'booking_status', true);
                $expiration_time    = get_post_meta($booking_id, 'confirmation_token_expiration', true);
                if ($expiration_time && time() <= $expiration_time) {
                    if ($current_status !== 'confirmed') {
                        update_post_meta($booking_id, 'booking_status', 'confirmed');
                        wp_update_post(array('ID' => $booking_id, 'post_status' => 'publish'));
                        send_confirmation_email($booking_id);
                        echo 'Twoje zgłoszenie na szkolenie zostało potwierdzone. Do zobaczenia!';
                    }
                    else {
                        echo '' . esc_attr__('Booking is already confirmed.', 'cwb') . '';
                    }
                }
                else{
                    echo '' . esc_attr__('Confirmation token has expired.', 'cwb') . '';
                }
            } else {
                echo '' . esc_attr__('Invalid confirmation token.', 'cwb') . '';
            }

    ?>
                <?php
                    the_content()
                    ?>
            </div>
        </section>
    
</div>
<?php get_footer(); ?>