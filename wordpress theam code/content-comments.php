<?php 
$post_id = get_the_ID();
?>
<div class="inner-comment-sec">
    <div class="collapse" id="comment-collapse-<?php echo $post_id; ?>">
        <div class="comments-row">
            <div>
                <?php 
                    $args = array(
                        'post_id'   => $post_id,
                        'order'     => 'ASC',
                        'orderby' => 'date',
                    );
        
                    $top_level_comments = get_comments($args);
                    if (!empty($top_level_comments)) {
                    foreach ($top_level_comments as $comment) { 
                        $comment_id = $comment->comment_ID;

                        ?>
                            <div class="comment-item d-flex align-items-start">
                            <?php 
                                $email      =  get_comment_author_email(); 
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
                                        echo ' <div class="user-icon d-flex align-items-center justify-content-center">' . strtoupper(substr(get_comment_author(), 0, 1)) . '</div>';
                                    }
                                } else { ?>
                                    <div class="user-icon d-flex align-items-center justify-content-center">
                                        <span><?php echo strtoupper(substr(get_comment_author(), 0, 1)); ?></span>
                                    </div>
                                <?php }
                                ?>
                                <div class="comment-content">
                                    <h3><?php echo get_comment_author(); ?></h3>
                                    <p><?php echo get_comment_text(); ?></p>
                                    <div class="comment-date">
                                        <span><?php echo get_comment_date('d.m.Y'); ?></span>
                                    </div>
                                </div>
                            </div>
                    <?php }
                    }
                    else{
                        echo '<p>'.__("Brak odpowiedzi" , "cwb").'</p>';
                    }
                ?>
            </div>
            <div class="reply-form">
            <div class="web-btn add-answer-btn text-end">
                <a href="#" class="btn btn-primary"><?php _e('Odpowiedz' , 'cwb'); ?></a>
            </div>
            <div class="web-form-wrap comment-reply" id="respond">
                <div class="web-form">
                    <form method="post" class="needs-validation submit-comments-reply-form">
                        <input type="hidden" name="comment_parent" value="<?php echo $comment_id; ?>">
                        <input type="hidden" name="comment_post_ID" value="<?php echo $post_id; ?>" />
                        <?php wp_nonce_field('comment_form_nonce_' . $comment_id, 'comment_form_nonce_field'); ?>
                        <div class="row">
                            <?php if (!is_user_logged_in()) { ?>
                                <div class="col-md-6 <?php echo $dnone;?>">
                                    <div class="form-group">
                                        <label for="author-<?php echo $comment_id; ?>"><?php _e('Imię' , 'cwb'); ?> <span class="required">*</span></label>
                                        <input type="text" name="author" class="form-control" id="author-<?php echo $comment_id; ?>" placeholder="<?php _e('Wpisz' , 'cwb'); ?>" required>
                                        <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                                    </div>
                                </div>
                                <div class="col-md-6 <?php echo $dnone;?>">
                                    <div class="form-group">
                                        <label for="email-<?php echo $comment_id; ?>">E-mail <span class="required">*</span></label>
                                        <input type="email"  name="email" class="form-control" id="email-<?php echo $comment_id; ?>" placeholder="<?php _e('Wpisz' , 'cwb'); ?>" required>
                                        <div class="invalid-feedback"><?php _e('Proszę o prawidłowy adres e-mail!' , 'cwb'); ?></div>
                                    </div>
                                </div>
                            <?php }?>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="comment-<?php echo $comment_id; ?>"><?php _e('Pytanie' , 'cwb'); ?> <span class="required">*</span></label>
                                    <textarea class="form-control char-limit" name="comment" id="comment-<?php echo $comment_id; ?>" placeholder="<?php _e('Opisz' , 'cwb'); ?>" maxlength="500" required></textarea>
                                    <div class="charCount text-end">0/500</div>
                                    <div class="invalid-feedback"><?php _e('Proszę wypełnić to pole!' , 'cwb'); ?></div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="web-btn form-btn text-end">
                                    <button type="submit" class="btn btn-primary" value="submit"><?php _e('DODAJ' , 'cwb'); ?></button>
                                    <div class="loading-icon-container"><span class="css-loader"></span></div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="comment-success-message" style="display:none">
                        <div class="reply-success-info light-bg d-flex align-items-center justify-content-between">
                            <h3><?php _e('Dziękujemy za dodanie odpowiedzi.' , 'cwb'); ?> </h3>
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/girl-vector.svg" alt="icon">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div class="web-heading collapse-heading collapsed" data-bs-toggle="collapse" href="#comment-collapse-<?php echo $post_id; ?>" role="button" aria-expanded="false" aria-controls="comment-collapse-<?php echo $post_id; ?>">
            <h4 class="hide-replies"><?php _e('Ukryj odpowiedzi' , 'cwb'); ?></h4>
            <h4 class="show-replies"><?php _e('Pokaż odpowiedzi' , 'cwb'); ?></h4>
    </div>
</div>