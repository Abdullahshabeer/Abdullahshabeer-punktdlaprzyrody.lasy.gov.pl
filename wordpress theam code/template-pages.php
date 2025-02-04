<?php
/**
 **  Template Name: pages
 */
get_header();
?>
<?php
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
                    <?php
                        the_content()
                        ?>
                </div>
            </section>

   
        <?php
        }
    }
?>

<?php
get_footer()
?>


