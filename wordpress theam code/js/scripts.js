var $ = jQuery;
jQuery(document).ready(function($) {
	$('.parentnone').closest('.block-row').css('display', 'none');
    jQuery('.toggle-button').click(function(){
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('body').removeClass('menu-open');
			jQuery('.mobile-menu-wrap').css({ 'height': 'unset' });
		}
		else{
			jQuery(this).addClass('active');
			jQuery('body').addClass('menu-open');
			SetHeight();
		}
		$('.mobile-menu-wrap').slideToggle();
	});
	
	$('.sidebar-widget li.menu-item-858').addClass('current-menu-item');

	$(".search-form-wrap a").click(function (e) {
		e.preventDefault();
        $(".search-form-sec").slideToggle();
    });

	$('.owl-carousel.nabory-carousel').owlCarousel({
	    loop:false,
	    margin:20,
	    nav:true,
	    dots:false,
	    navText:[
	    	'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7071 5.12749C21.0976 5.50581 21.0976 6.11919 20.7071 6.49751L11.4142 15.5L20.7071 24.5025C21.0976 24.8808 21.0976 25.4942 20.7071 25.8725C20.3166 26.2508 19.6834 26.2508 19.2929 25.8725L9.29289 16.185C8.90237 15.8067 8.90237 15.1933 9.29289 14.815L19.2929 5.12749C19.6834 4.74917 20.3166 4.74917 20.7071 5.12749Z" fill="#003399"/>\
				</svg>','<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 5.12749C11.6834 4.74917 12.3166 4.74917 12.7071 5.12749L22.7071 14.815C23.0976 15.1933 23.0976 15.8067 22.7071 16.185L12.7071 25.8725C12.3166 26.2508 11.6834 26.2508 11.2929 25.8725C10.9024 25.4942 10.9024 24.8808 11.2929 24.5025L20.5858 15.5L11.2929 6.49751C10.9024 6.11919 10.9024 5.50581 11.2929 5.12749Z" fill="#003399"/>\
			</svg>'],
	    responsive:{
	        0:{
	            items:1,
	        },
	        768:{
	            items:2,
	        },
	        992:{
	            items:3
	        }
	    }
	});

	$('.owl-carousel.szkolenia-carousel').owlCarousel({
	    loop:false,
	    margin:40,
	    nav:true,
	    dots:false,
	    navText:[
	    	'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7071 5.12749C21.0976 5.50581 21.0976 6.11919 20.7071 6.49751L11.4142 15.5L20.7071 24.5025C21.0976 24.8808 21.0976 25.4942 20.7071 25.8725C20.3166 26.2508 19.6834 26.2508 19.2929 25.8725L9.29289 16.185C8.90237 15.8067 8.90237 15.1933 9.29289 14.815L19.2929 5.12749C19.6834 4.74917 20.3166 4.74917 20.7071 5.12749Z" fill="#003399"/>\
				</svg>','<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 5.12749C11.6834 4.74917 12.3166 4.74917 12.7071 5.12749L22.7071 14.815C23.0976 15.1933 23.0976 15.8067 22.7071 16.185L12.7071 25.8725C12.3166 26.2508 11.6834 26.2508 11.2929 25.8725C10.9024 25.4942 10.9024 24.8808 11.2929 24.5025L20.5858 15.5L11.2929 6.49751C10.9024 6.11919 10.9024 5.50581 11.2929 5.12749Z" fill="#003399"/>\
			</svg>'],
	    responsive:{
	        0:{
	            items:1,
	        },
	        768:{
	            items:2,
	        },
	        992:{
	            items:2
	        }
	    }
	});

	$('.owl-carousel.aktualnosci-carousel').owlCarousel({
	    loop:false,
	    margin:20,
	    nav:true,
	    dots:false,
	    navText:[
	    	'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7071 5.12749C21.0976 5.50581 21.0976 6.11919 20.7071 6.49751L11.4142 15.5L20.7071 24.5025C21.0976 24.8808 21.0976 25.4942 20.7071 25.8725C20.3166 26.2508 19.6834 26.2508 19.2929 25.8725L9.29289 16.185C8.90237 15.8067 8.90237 15.1933 9.29289 14.815L19.2929 5.12749C19.6834 4.74917 20.3166 4.74917 20.7071 5.12749Z" fill="#003399"/>\
				</svg>','<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 5.12749C11.6834 4.74917 12.3166 4.74917 12.7071 5.12749L22.7071 14.815C23.0976 15.1933 23.0976 15.8067 22.7071 16.185L12.7071 25.8725C12.3166 26.2508 11.6834 26.2508 11.2929 25.8725C10.9024 25.4942 10.9024 24.8808 11.2929 24.5025L20.5858 15.5L11.2929 6.49751C10.9024 6.11919 10.9024 5.50581 11.2929 5.12749Z" fill="#003399"/>\
			</svg>'],
	    responsive:{
	        0:{
	            items:1,
	        },
	        768:{
	            items:2,
	        },
	        992:{
	            items:3
	        }
	    }
	});
	$('.owl-carousel.gallery-carousel').owlCarousel({
	    loop:false,
	    margin:24,
	    nav:true,
	    dots:true,
	    navText:[
	    	'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7071 5.12749C21.0976 5.50581 21.0976 6.11919 20.7071 6.49751L11.4142 15.5L20.7071 24.5025C21.0976 24.8808 21.0976 25.4942 20.7071 25.8725C20.3166 26.2508 19.6834 26.2508 19.2929 25.8725L9.29289 16.185C8.90237 15.8067 8.90237 15.1933 9.29289 14.815L19.2929 5.12749C19.6834 4.74917 20.3166 4.74917 20.7071 5.12749Z" fill="#fff"/>\
				</svg>','<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 5.12749C11.6834 4.74917 12.3166 4.74917 12.7071 5.12749L22.7071 14.815C23.0976 15.1933 23.0976 15.8067 22.7071 16.185L12.7071 25.8725C12.3166 26.2508 11.6834 26.2508 11.2929 25.8725C10.9024 25.4942 10.9024 24.8808 11.2929 24.5025L20.5858 15.5L11.2929 6.49751C10.9024 6.11919 10.9024 5.50581 11.2929 5.12749Z" fill="#fff"/>\
			</svg>'],
	    responsive:{
	        0:{
	            items:1,
	        },
	        768:{
	            items:2,
	        },
	        992:{
	            items:3
	        }
	    }
	});
	
	$('.wpml-ls-item-pl > a').append("<span class='visually-hidden'>polska wersja strony</span>");
    $('.wpml-ls-item-en > a').append("<span class='visually-hidden'>page english version</span>");
	
	$('.select2').select2( {
		theme: "bootstrap-5",
		minimumResultsForSearch: Infinity,
	} );

	$(document).ready(function() {
		var shouldProgress = true;
	  var carousel = $('#slider-block').carousel();
	  $('#btnPause').click(function() {
		  shouldProgress = false;
		  carousel.carousel('pause');

		  carousel.find('.carousel-control-pause').hide();
		  carousel.find('.carousel-control-play').show();
	  });

	  $('#btnPlay').click(function() {
		  shouldProgress = true;
		  carousel.carousel('cycle');
		  carousel.find('.carousel-control-pause').show();
		  carousel.find('.carousel-control-play').hide();
	  });

	  // Custom event listener to handle carousel slide event
	  carousel.on('slide.bs.carousel', function() {
		  return shouldProgress; // Allow or prevent carousel slide based on the flag
	  });
		$( ".ordered-list" ).each(function() {
	  	var   val=1;
	    if ( $(this).attr("start")){
	  		val =  $(this).attr("start");
	    }
	  	val=val-1;
	 	val= 'li '+ val;
		$(this ).css('counter-increment',val );
	});
  });

	// Common DataTable configuration
	var commonConfig = {
		orderCellsTop: true,
		bLengthChange: false,
		bInfo: false,
		bAutoWidth: false,
		responsive: true,
		pageLength: 10,
		fnDrawCallback: function(){
			var wrapper = this.parent();
			var rowsPerPage = this.fnSettings()._iDisplayLength;
			var rowsToShow = this.fnSettings().fnRecordsDisplay();
			var minRowsPerPage = this.fnSettings().aLengthMenu[0][0];
			if ( rowsToShow <= rowsPerPage || rowsPerPage == -1 ) {
				$('.dataTables_paginate', wrapper).css('display', 'none');
			}
			else {
				$('.dataTables_paginate', wrapper).css('display', 'flex');
			}
			if ( rowsToShow <= minRowsPerPage ) {
				$('.dataTables_length', wrapper).css('display', 'none');
			}
			else {
				$('.dataTables_length', wrapper).css('display', 'flex');
			}
		},
	  	language: {
	      	paginate: {
	        	next: '&#129122;',
	        	previous: '&#129120;'
	      	}
	  	},
	  // paging: ($(".data-table tbody tr").length > 2),
	};
	$('.data-table').each(function() {
	  	var $table 	= $(this);
	  	var tableId = $table.attr('id');
	  	var config 	= {
	      	...commonConfig,
	      	columnDefs: [
		      	// 250
		        { width: '250px', targets: 0 },
		        { width: '130px', targets: '_all' }
		    ]
	  	};
	  	if (tableId === 'map-table-posts') {
	  		config.pageLength = 7;
	  		config.columnDefs = [
				{ width: '38%', targets: 0 },
				{ width: '38%', targets: 1 },
				{ width: 'auto', targets: 2 },
				{ orderable: false, targets: -1 },
			];
			config.language = {
	            paginate: {
	                next: '&#x276F;',
	                previous: '&#x276E;',
	            }
	        };
	  	}
	  	if (tableId === 'schedule-posts') {
	      	config.columnDefs = [
				{ width: '360px', targets: 0 },
				{ width: '240px', targets: 1 },
				{ width: '110px', targets: 2 },
				{ width: '230px', targets: 3 }
			];
	      	config.initComplete = function () {
	          	var api = this.api();
		        api.columns().every(function () {
		            var column = this;
		            var header = $(".data-table thead tr:eq(1) th").eq(column.index());
		            if (header.text() === 'Rok') {
		                var fromDate = $(' <input id="startDate" autocomplete="off" type="text" class="form-control" placeholder="Wybierz"></input> ')     
							      .appendTo( header.empty() )
								  .on( 'keyup change clear', function () {
								    if ( column.search() !== this.value ) {
							          column
									    .search( this.value )
									    .draw();
								    }
								  });
						        $('#startDate').datepicker({
						          dateFormat: 'dd.mm.yy',
						        });
		            } else {
		                $('<input type="text" placeholder="Wpisz"/>')
		                    .appendTo(header.empty())
		                    .on('keyup change', function () {
		                        if (column.search() !== this.value) {
		                            column
		                                .search(this.value)
		                                .draw();
		                        }
		                    });
		            }
		        });
		    };
	  	}
	  	// Initialize DataTable for each table
	  	var dataTable = $table.DataTable(config);
	});

	$('.mobile-menu .menu-item-has-children > a').append('<span class="nav-toggle-icon"></span>');
	$('.nav-toggle-icon').click(function(e) {
		e.preventDefault();
	    var clickedMenuItem 			= $(this).closest('.menu-item-has-children');
    	var subMenu 					= clickedMenuItem.find('.sub-menu');
    	$('.sub-menu').not(subMenu).slideUp();
    	subMenu.slideToggle();
	});


	// set equal height of card-style-1 h3
	var maxH3Height = 0;
	$('.card-style-1 .article-content h3').each(function() {
		var h3Height 		= $(this).height();
		maxH3Height 		= Math.max(maxH3Height, h3Height);
	});
	$('.card-style-1 .article-content h3').height(maxH3Height);

	$('.vselect-container.multi-select').on('keydown', function(e) {
	    if (e.which === 13) {
	      $(this).find('.vselect-tray-container .vselect-tray').toggle();
	    }
  	});

  	// Forms validations
  	$('.needs-validation').submit(function(event) {
	    if (!this.checkValidity()) {
	      event.preventDefault();
	      event.stopPropagation();
	    }
	    $(this).addClass('was-validated');
  	});
	// Attach an input event handler to all textareas with the class "char-limit"
	$('.char-limit').on('input', function() {
		var textArea = $(this);
		var charCount = textArea.closest('.form-group').find('.charCount');
		var maxLength = parseInt(textArea.attr('maxlength'));
		var currentLength = textArea.val().length;
		var remaining = maxLength - currentLength;

		charCount.text(currentLength + '/' + maxLength);

		if (remaining < 0) {
			textArea.addClass('char-limit-reached');
		} else {
			textArea.removeClass('char-limit-reached');
		}

		if (currentLength > maxLength) {
			textArea.val(textArea.val().substr(0, maxLength));
			charCount.text(maxLength + '/' + maxLength);
		}
	});

	// custom toggle for checkbox expand 
	$(document).ready(function() {
		$(".extra-content").hide();
		$(".checkbox-toggle a").click(function(e) {
			e.preventDefault();
			const toggleButton 	= $(this);
			const toggleContent = toggleButton.closest('.form-group').find(".extra-content");
			toggleContent.slideToggle(function() {
				// Toggle the text of the link when the content is shown/hidden
				if (toggleContent.is(":visible")) {
					toggleButton.text("Zwiń");
					toggleButton.closest('.checkbox-toggle').addClass("active");
				} else {
					toggleButton.text("Rozwiń");
					toggleButton.closest('.checkbox-toggle').removeClass("active");
				}
			});
			toggleButton.closest('.form-group').find(".required").toggle();
			$(".extra-content .required").show();
		});
	});	

	$('.form-check-input[type=radio]').change(function () {
	    var formCheck 			= $(this).closest('.form-check');
    	var hasShowFieldClass 	= formCheck.hasClass('show-field');
	    var formGroup 			= $(this).closest('.form-group');
	    var additionalField 	= formGroup.next('.additional-field');

	    // console.log(hasShowFieldClass);

	    if (hasShowFieldClass) {
	        additionalField.removeClass('d-none');
	    } else {
	        additionalField.addClass('d-none');
	    }
	});


	$('body:not(.wp-admin) .date-picker').datepicker({
		dateFormat: 'dd.mm.yy',
  });

	// step form
	var current_fs, next_fs, previous_fs;
	var opacity;
	$(".steps").validate({
        errorClass: 'invalid',
        errorElement: 'span',
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },
        highlight: function(element, errorClass) {
            $( element ).parents( ".form-group" ).addClass(errorClass);
        },
        unhighlight: function(element, errorClass) {
            $( element ).parents( ".form-group" ).removeClass(errorClass);
        }
    });
	$(".next").click(function() {
		$(".steps").validate({
            errorClass: 'invalid',
            validClass: 'validClass',
            errorElement: 'span',
            errorPlacement: function(error, element) {
                error.insertAfter(element);
            },
            highlight: function(element, errorClass) {
	            $( element ).parents( ".form-group" ).addClass(errorClass);
	        },
	        unhighlight: function(element, errorClass) {
	            $( element ).parents( ".form-group" ).removeClass(errorClass);
	        }
        });
        if ((!$('.steps').valid())) {
            return true;
        }

		current_fs 	= $(this).parent();
		next_fs 	= $(this).parent().next();

		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

		//show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });
	});
	$(".previous").click(function() {
		current_fs 	= $(this).parent();
		previous_fs = $(this).parent().prev();

		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

		//show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });

	});

	if ($('#web-step-form textarea[aria-required="true"]').length > 0) {
		$('#web-step-form textarea[aria-required="true"]').attr('required', 'required');
	}


	// Expert List
	$(".list-expert-wrap .list-expert-col").addClass("active").fadeIn();
	$(".list-expert-top ul li a").click(function(e) {
		e.preventDefault();
		const filter = $(this).parent().data("filter");
		$(this).parent().toggleClass("active");
		if ($(".list-expert-top ul li.active").length === 0) {
		  	$(".list-expert-wrap .list-expert-col").addClass("active").fadeIn();
		}else {
		  	$(".list-expert-wrap .list-expert-col").each(function() {
			    const expert = $(this);
			    const expertFilter = expert.attr("class").split(" ").find(c => c.startsWith("category-"));
			    if ($(".list-expert-top ul li[data-filter='" + expertFilter + "']").hasClass("active")) {
			      	expert.addClass("active").fadeIn(); 
			    } else {
			      	expert.removeClass("active").fadeOut();
			    }
		  	});
		}
	});

	// show form for comments 
	$(".add-answer-btn a").click(function(e){
        e.preventDefault();
        $(".web-form-wrap.comment-reply").not($(this).closest('.reply-form').find('.web-form-wrap.comment-reply')).slideUp();
        $(".web-btn.add-answer-btn").not($(this).closest('.add-answer-btn')).show();
        var formWrap 	= $(this).closest('.reply-form').find('.web-form-wrap.comment-reply');
        var addButton 	= $(this).closest('.add-answer-btn');
        formWrap.slideToggle();
        addButton.toggle();
    });


            var cf7Form = document.querySelector('#wpcf7-f2333-p2298-o1 form');
            if (cf7Form) {
                cf7Form.classList.add('steps');
         }

	// SVG map posts
	// $('.svg-map-sec svg > g > g').on('click', function (event) {
	// 	event.stopPropagation();
	// 	var t = $(this);
	// 	$('.svg-map-sec svg > g > g').removeClass('active');
	// 	t.addClass('active');
	// 	var svgMapSec = $('.svg-map-sec');
	// 	var mapArticlesWrap = $('.map-articles-wrap');
	// 	var positions = t.attr('data-position').split(' ');
	// 	var clickedPath = t.find(".fil1");
	// 	var svgMapSecOffset = svgMapSec.offset();
	// 	var pathOffset = clickedPath.offset();
	// 	var relativeX = pathOffset.left - svgMapSecOffset.left;
	// 	var relativeY = pathOffset.top - svgMapSecOffset.top;
	
	// 	if (positions.includes('right')) {
	// 		relativeX += clickedPath.width() + 60;
	// 	} else if (positions.includes('left')) {
	// 		relativeX -= mapArticlesWrap.width() + 60;
	// 	}
	// 	if (positions.includes('bottom')) {
	// 		relativeY += clickedPath.height() + 60;
	// 	} else if (positions.includes('top')) {
	// 		relativeY -= mapArticlesWrap.height() + 60;
	// 	}
	// 	mapArticlesWrap.css({
	// 		left: relativeX + 'px',
	// 		top: relativeY + 'px'
	// 	});
	// 	mapArticlesWrap.show();
	// });

	// $('.svg-map-sec svg > g > g').on('click', function (event) {
	// 	handleMapClick($(this), event);
	// });

	// $('.svg-map-sec svg > g > g').on('keydown', function (event) {
	// 	handleMapClick($(this), event);
	// 	if (event.which === 13) {
    //         handleMapClick($(this), event);
	// 	}
	// });

	// function handleMapClick(t, event) {
	// 	event.stopPropagation();
	// 	$('.svg-map-sec svg > g > g').removeClass('active');
	// 	t.addClass('active');
	// 	var svgMapSec = $('.svg-map-sec');
	// 	var mapArticlesWrap = $('.map-articles-wrap');
	// 	var positions = t.attr('data-position').split(' ');
	// 	var clickedPath = t.find(".fil1");
	// 	var svgMapSecOffset = svgMapSec.offset();
	// 	var pathOffset = clickedPath.offset();
	// 	var relativeX = pathOffset.left - svgMapSecOffset.left;
	// 	var relativeY = pathOffset.top - svgMapSecOffset.top;

	// 	if (positions.includes('right')) {
	// 		relativeX += clickedPath.width() + 60;
	// 	} else if (positions.includes('left')) {
	// 		relativeX -= mapArticlesWrap.width() + 60;
	// 	}
	// 	if (positions.includes('bottom')) {
	// 		relativeY += clickedPath.height() + 60;
	// 	} else if (positions.includes('top')) {
	// 		relativeY -= mapArticlesWrap.height() + 60;
	// 	}
	// 	mapArticlesWrap.css({
	// 		left: relativeX + 'px',
	// 		top: relativeY + 'px'
	// 	});
	// 	mapArticlesWrap.show();
	// }
	
	$(document).on('click', function(event) {
		if ($(window).width() > 991) {
			if (!$(event.target).closest('.svg-map-sec svg > g').length && !$(event.target).closest('.map-articles-wrap').length) {
				$('.map-articles-wrap').hide();
				$('.svg-map-sec svg > g > g').removeClass('active');
			}
		}
	});
	

	// showing select fields data 
	var visibleDivs = {}; // Object to store visible divs for each select field
    $(".form-select-data").change(function() {
        var selectId 		= $(this).attr('id');
        var selectedOption 	= $(this).find(":selected").data("select");
        if (selectedOption) {
            $(this).next("p").hide();
            if (visibleDivs[selectId]) {
                $("#" + visibleDivs[selectId]).hide();
            }
            $("#" + selectedOption).show();
            visibleDivs[selectId] = selectedOption;
        } else {
            $(this).next("p").show();
            if (visibleDivs[selectId]) {
                $("#" + visibleDivs[selectId]).hide();
                visibleDivs[selectId] = null;
            }
        }
    });

	   function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const postId = getParameterByName('post_id');

    if (postId) {
        var postIdField = $('#postIdField');
        if (postIdField.length) {
            postIdField.val(postId);
        }
    }


		
		
	

	// $(window).on('load' , function(){
	// 	$('.right-map-section svg > g >g.active, .the-map-inner svg > g >g.active').click();
	// });
	$('.svg-map-sec svg > g > g,.the-map-inner svg > g > g').on('click' , function(){
		var t 	=	$(this);
		$('.svg-map-sec svg > g > g').removeClass('active');
		t.addClass('active');
		var mapArticlesWrap = $('.map-articles-wrap');
		
		var svg 				=	t.closest('svg');
		var categoryID 			=	svg.data('category');
		var parentID 			=	svg.data('parentid');
		mapArticlesWrap.hide();
		var locationSlug 		=	t.attr('id');
		get_map_location(locationSlug , categoryID , parentID );

		var positions = t.attr('data-position').split(' ');
		var clickedPath = t.find(".fil1");
		var svgMapSecOffset = svg.offset();
		var pathOffset = clickedPath.offset();
		var relativeX = pathOffset.left - svgMapSecOffset.left;
		var relativeY = pathOffset.top - svgMapSecOffset.top;
	
		if (positions.includes('right')) {
			relativeX += clickedPath.width() + 60;
		} else if (positions.includes('left')) {
			relativeX -= mapArticlesWrap.width() + 60;
		}
		if (positions.includes('bottom')) {
			relativeY += clickedPath.height() + 60;
		} else if (positions.includes('top')) {
			relativeY -= mapArticlesWrap.height() + 60;
		}
		mapArticlesWrap.css({
			left: relativeX + 'px',
			top: relativeY + 'px'
		});
		
	});
    $('.svg-map-sec svg > g > g,.the-map-inner svg > g > g').on('keypress' , function(){
        if (event.which === 13) {
            var t 	=	$(this);
			$('.svg-map-sec svg > g > g').removeClass('active');
			t.addClass('active');
			var mapArticlesWrap = $('.map-articles-wrap');
			
			var svg 				=	t.closest('svg');
			var categoryID 			=	svg.data('category');
			var parentID 			=	svg.data('parentid');
			mapArticlesWrap.hide();
			var locationSlug 		=	t.attr('id');
			get_map_location(locationSlug , categoryID , parentID );

			var positions = t.attr('data-position').split(' ');
			var clickedPath = t.find(".fil1");
			var svgMapSecOffset = svg.offset();
			var pathOffset = clickedPath.offset();
			var relativeX = pathOffset.left - svgMapSecOffset.left;
			var relativeY = pathOffset.top - svgMapSecOffset.top;
		
			if (positions.includes('right')) {
				relativeX += clickedPath.width() + 60;
			} else if (positions.includes('left')) {
				relativeX -= mapArticlesWrap.width() + 60;
			}
			if (positions.includes('bottom')) {
				relativeY += clickedPath.height() + 60;
			} else if (positions.includes('top')) {
				relativeY -= mapArticlesWrap.height() + 60;
			}
			mapArticlesWrap.css({
				left: relativeX + 'px',
				top: relativeY + 'px'
			});
        }
		
	});
	$(document).on('keydown', function(event) {
        if (event.keyCode == 27) {
            $('.map-articles-wrap').hide();
			$('.svg-map-sec svg > g > g.active').focus().attr('tabindex' , 0);
			$('.svg-map-sec svg > g > g').removeClass('active');
        }
    });
	$(window).on('load' , function(){
		$('#formgroup-455-512 .vselect-global input[type="checkbox"]:checked,  #formgroup-455-512 .vselect-option input[type="checkbox"]').trigger('change');
	});
	
	$('#formgroup-455-512 .vselect-global input[type="checkbox"], #formgroup-455-512 .vselect-option input[type="checkbox"]').on('change', function () {
		var t = $(this);

if (t.prop("checked")) {
	var value;
	var existingSlugs = $('#filter-option-5 input').map(function() {
		return $(this).data('slug');
	}).get();

	if (t.parent().hasClass('vselect-global')) {
		var $fiveCheckboxes = t.closest('.vselect-tray').find('.vselect-option input[type="checkbox"]');
		value = $fiveCheckboxes.map(function() {
			return $(this).val();
		}).get().filter(function(val) {
			return !existingSlugs.includes(val);
		});
	} else if (t.parent().hasClass('vselect-option')) {
		var singleValue = t.val();
		if (!existingSlugs.includes(singleValue)) {
			value = [singleValue];
		}
	}

	if (value && value.length > 0) {
		get_program_slug(value);
	}
}
		
		
		
		
		
		
		else{
		  if (t.parent().hasClass('vselect-global')) {
			var setvaribalelocation = $('#filter-option-5');
			var $fiveCheckboxes = t.closest('.vselect-tray').find('.vselect-option input[type="checkbox"]');
			
			// Get the selected values based on the data-slug attribute
			var selectedValues = $fiveCheckboxes.map(function () {
			  return $(this).val();
			}).get();
			
			// Remove options based on the selected values
			setvaribalelocation.find('input').filter(function () {
			  return selectedValues.includes($(this).data('slug'));
			}).parent().remove();
		  }  else if (t.parent().hasClass('vselect-option')) {
			var values = t.val();
			var value = [values];
			var setvaribalelocation = $('#filter-option-5');
			// Remove options based on the value
			setvaribalelocation.find('input').filter(function () {
			  return value.includes($(this).data('slug'));
			}).parent().remove();
		  }
		}
	  });



  

	  var currentSectIds = [];

	  // Function to show the corresponding section based on the checked radio button
	  function showCorrespondingSection(btn) {
		  var currentSection = btn.closest('.quiz-container');
		  var checkedRadioParent = currentSection.find('input[type="radio"]:checked').closest('label').parent();
		  var checkedInputId = checkedRadioParent.attr('id');
		  const totalSections = $('.quiz-container.questio').length; // Calculate the total number of sections
		  currentSectIds.push(currentSection.attr('id'));
		  if (checkedInputId) {
			  $('.quiz-container').hide(); // Hide all sections
	  
			  if (checkedRadioParent.hasClass('Anstype')) {
				  var rejectioncontainer = $('.rejectallquestion');
				  rejectioncontainer.show();
				  var targetIndex = checkedInputId.replace(/[^\d]/g, ''); // Extract only digits from the id
				  var onlycheck = rejectioncontainer.find('.childindex' + targetIndex);
				  rejectioncontainer.find('.quiz-container').show();
				  onlycheck.show();
				  console.log(onlycheck);
			  } else {
				  $('#code' + checkedInputId).show(); // Show the matching section
			  }
		  }else {
			// Hide all quiz containers
			$('.quiz-container').hide();
		
			// Select the last quiz container based on totalSections
			var lastQuizContainer = $('#code' + totalSections);
		
			// Show the last quiz container
			lastQuizContainer.show();
		
			// Find and show all nested quiz containers within the last quiz container
			var nestedQuizContainers = lastQuizContainer.find('.quiz-container');
			nestedQuizContainers.show();
		}
	  }
	  

	// 
	//   Next button click handler
	$('.next-btn').click(function(e) {
		e.preventDefault();
		var currentSection = $(this).closest('.quiz-container');
		var checkedRadio = currentSection.find('input[type="radio"]:checked');
	
		// Check if a radio button is checked in the current section
		if (checkedRadio.length > 0) {
			showCorrespondingSection($(this));
		} else {
			// Optionally, handle the case where no radio button is checked
			console.log('No radio button is selected in the current section.');
			// You can add any user notification or logic here
		}
	});
	
	  
	  $('.prev-btn').click(function(e) {
		e.preventDefault();
	
		// Check if there is any previous section in the history
		if (currentSectIds.length > 0) {
			// Get the ID of the last visited section
			var prevSectionId = currentSectIds[currentSectIds.length - 1];
	
			// Hide all sections
			$('.quiz-container').hide();
	
			// Show the last visited section
			$('#' + prevSectionId).show();
	
			// Remove the last element from the array after showing the section
			currentSectIds.pop();
		} else {
			console.error('No previous section to go back to');
		}
	});
	


	

});


function get_program_slug(slug) {
	var ajax_url = ajax_object.ajax_url;
	var ajax_nonce = ajax_object.ajax_nonce;

	$.ajax({
		url: ajax_url,
		type: 'POST',
		data: {
			action: 'list_slug_from_selected_program',
			programslug: slug,
			nonce: ajax_nonce // Corrected nonce here
		},
		success: function (response) {
			var responseslug = JSON.parse(response);
			var setvaribalelocation = $('#filter-option-5');
			 var  filteroption = setvaribalelocation.find('input')
	
			 $.each(responseslug.options, function (index, value) {
				// Check if an option with the same data-slug exists
				if (!filteroption.filter('[data-slug="' + $(value).data('slug') + '"]').length) {
					setvaribalelocation.append(value);
				}
			});
			
		}
	});
}
$('#partnersubmit').on('click' , function(e) {
	e.preventDefault();
	var t 	=	$(this);
	// console.log(alert);
	var formData = $('#partnersubmit').serialize();
	var ajax_url 		= ajax_object.ajax_url;
	var ajax_nonce 		= ajax_object.ajax_nonce;
	if(this.checkValidity()){
		// t.find('.loading-icon-container').show();
		// var submitBTN = t.find('input[type="submit"],button[type="submit"]');
		// submitBTN.prop('disabled' , true);
		$.ajax({
			url: ajax_url,
			type: 'POST',
			data: formData + '&action=submit_partnerzye_form',
			success: function(response) {
				$('#partnersubmit').fadeOut(200);
				console.log(response);
				// t.find('.loading-icon-container').hide();
			}
		});
	}
});

function get_map_location(location, category, parentID) {
    var ajax_url = ajax_object.ajax_url;
    $('#ajax-loader-form').show();
    var ajax_nonce = ajax_object.ajax_nonce;
    $.ajax({
        url: ajax_url,
        type: 'POST',
        data: {
            action: 'list_location_from_selected_map',
            location: location,
            category: category,
            parentid: parentID,
            nonce: ajax_nonce
        },
        success: function (response) {
            var responseData = JSON.parse(response);
            $('#ajax-loader-form').hide();
            $('.map-articles-wrap .web-heading h2').text(responseData.location_title);
            $('.map-articles-wrapt .web-heading h2').text(responseData.location_title);

            var postsPerPage = 5;
            var totalPages = Math.ceil(responseData.posts_list.length / postsPerPage);
            var currentPage = 1;

            function showPage(page)
 {
                var start = (page - 1) * postsPerPage;
                var end = start + postsPerPage;
                var slicedPosts = responseData.posts_list.slice(start, end);

                var postsList = $('.map-article-list ul');
                postsList.empty(); // Remove old posts

                $.each(slicedPosts, function (index, post) {
                    postsList.append(post);
                });
            }

            $('.map-articles-wrap').attr('tabindex', '-1').focus();
            $('.map-articles-wrapt').attr('tabindex', '-1').focus();

            // Initialize pagination
            var pagination = $('.pagination-wrap .pagination-inner');
            pagination.empty(); // Remove old pagination items

            // Previous button
            var prevButton = $('<div class="page-item"><a href="#" class="page-link" id="prev-page">‹</a></div>');
            prevButton.click(function (e) {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage -= 1;
                    showPage(currentPage);
                    updateCurrentPage();
                }
            });
            pagination.append(prevButton);

            // Page numbers
            for (var i = 1; i <= totalPages; i++) {
                var buttonClass = i === 1 ? 'page-link current' : 'page-link';
                var button = $('<div class="page-item"><a href="#" class="' + buttonClass + '" data-page="' + i + '">' + i + '</a></div>');

                button.click(function (e) {
                    e.preventDefault();
                    currentPage = parseInt($(this).find('.page-link').data('page'));
                    showPage(currentPage);
                    updateCurrentPage();
                });

                pagination.append(button);
            }

            // Next button
            var nextButton = $('<div class="page-item"><a href="#" class="page-link" id="next-page">›</a></div>');
            nextButton.click(function (e) {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage += 1;
                    showPage(currentPage);
                    updateCurrentPage();
                }
            });
            pagination.append(nextButton);
             viewbuttont = $('.view-all');
           viewbuttont.hide();
            if (responseData.posts_list.length > postsPerPage) {
			    
                // "View All" button
                var viewAllButton = $('<div class="page-item view-all"><a href="#" class="page-link" id="view-all">POKAŻ WSZYSTKIE</a></div>');
                viewAllButton.click(function (e) {
                    e.preventDefault();
                    showAllPosts(responseData.posts_list); // Pass updated posts list
                    $('.pagination-inner').hide();
                    $(this).hide(); // Hide "View All" button
                    $('.view-less').show(); // Show "View Less" button
                });
				if(viewbuttont.length === 0){
                pagination.after(viewAllButton);
				}
                viewbuttont.show();
            }
			

            $('.pagination-inner').show();

			lessbutton = $('.view-less');
			var viewLessButton = $('<div class="page-item view-less" style="display: none;"><a href="#" class="page-link" id="view-less">Pokaż mniej ❯</a></div>');
			viewLessButton.click(function (e) {
				e.preventDefault();
				$('.map-article-list ul').empty(); // Remove all posts
				showPage(currentPage); // Show paginated posts
				$('.pagination-inner').show();
				$(this).hide(); // Hide "View Less" button
				$('.view-all').show(); // Show "View All" button
			});
			if(lessbutton.length === 0){
               pagination.after(viewLessButton);
			};
			lessbutton.hide();
            
			if(responseData.posts_list.length < 5) {
				$('#view-all').hide();
				
			};

            function updateCurrentPage() {
                pagination.find('.page-link').removeClass('current');
                pagination.find('.page-link[data-page="' + currentPage + '"]').addClass('current');
            }

            // Show the first page initially
            showPage(currentPage);

            $('.map-articles-wrap').show().focus();
            $('.map-articles-wrapt').show().focus();

            function showAllPosts(posts) {
                var postsList = $('.map-article-list ul');
                postsList.html(''); // Remove old posts
                console.log(posts);
                $.each(posts, function (index, post) {
                    postsList.append(post);
                });
            }
        }
    });
}



function SetHeight() {
	var HeaderTopHeight 	= jQuery('.header-top').is(':visible') ? jQuery('.header-top').outerHeight() : 0;
	var HeaderHeight 			= jQuery('.main-header').outerHeight();
	var TotalHeight 			= HeaderTopHeight + HeaderHeight; 
	jQuery('.mobile-menu-wrap').css({ 'height': 'calc(100vh - ' + TotalHeight+ 'px)' });
}



// function get_map_location(location , category){
// 	console.log(category);
// 	var ajax_url 	= ajax_object.ajax_url;
// 	var ajax_nonce = ajax_object.ajax_nonce;
// 	$.ajax({
// 		url: ajax_url, 
// 		type: 'POST',
// 		nonce: ajax_nonce,
// 		data: {
// 			action: 'list_location_from_selected_map',
// 			location: location,
// 			category: category
// 		},
// 		success: function (response) {
// 			console.log(response);
// 			var responseData = JSON.parse(response);
		
// 			$('.map-articles-wrap .web-heading h2').text(responseData.location_title);
		
// 			var postsList = $('.map-article-list ul');
// 			postsList.empty(); // Remove old posts
		
// 			$.each(responseData.posts_list, function (index, post) {
// 				postsList.append(post);
// 			});
		
// 			var postsPerPage = 5;
// 			var totalPages = Math.ceil(responseData.posts_list.length / postsPerPage);
// 			var currentPage = 1;
		
// 			function showPage(page) {
// 				var start = (page - 1) * postsPerPage;
// 				var end = start + postsPerPage;
// 				var slicedPosts = responseData.posts_list.slice(start, end);
		
// 				$('#map-article-list ul').empty(); // Remove old posts
		
// 				var ul = $('<ul>');
// 				$.each(slicedPosts, function (index, post) {
// 					ul.append(post);
// 				});
		
// 				$('#map-article-list').prepend(ul);
// 			}
		
// 			showPage(currentPage);
		
// 			var pagination = $('.pagination-wrap');
// 			pagination.find('.pagination-inner').empty(); // Remove old pagination items
		
// 			for (var i = 1; i <= totalPages; i++) {
// 				var button = $('<div class="page-item"><a href="#" class="page-link" data-page="' + i + '">' + i + '</a></div>');
		
// 				if (i === currentPage) {
// 					button.find('a').addClass('current');
// 				}
		
// 				button.click(function () {
// 					currentPage = parseInt($(this).data('page'));
// 					showPage(currentPage);
// 					pagination.find('.page-link').removeClass('current');
// 					$(this).find('a').addClass('current');
// 					return false;
// 				});
		
// 				pagination.find('.pagination-inner').append(button);
// 			}
		
// 			// Append the pagination to the container
// 			// $('#related-map-posts').append(pagination);
// 		}
		
		
// 	});
// }


jQuery(function($) {
	var timeSlots 	=	[];
    $('#booking-form').on('submit' , function(e) {
		e.preventDefault();
		var t 	=	$(this);
		var categoriesname 	= $('#dziedzina option:selected').text();;
        var formData 		= $('#booking-form').serialize();
		var selectedDate 	=	$('#time-field option:selected').data('postid');
		var ajax_url 		= ajax_object.ajax_url;
		var ajax_nonce 		= ajax_object.ajax_nonce;
		if(this.checkValidity()){
			t.find('.loading-icon-container').show();
			var submitBTN = t.find('input[type="submit"],button[type="submit"]');
			submitBTN.prop('disabled' , true);
			$.ajax({
				url: ajax_url,
				type: 'POST',
				data: formData + '&action=submit_booking_form&selectedDate='+selectedDate+'&categories_name=' + encodeURIComponent(categoriesname),
				success: function(response) {
					if(response=='error'){
						t.find('.loading-icon-container').hide();
						t.find('.errorshow').show();
						submitBTN.prop('disabled' , false);
					}else{
						$('#booking-form').fadeOut(200);
						$('#success-message').fadeIn(200);
						submitBTN.prop('disabled' , false);
						t.find('.loading-icon-container').hide();
						console.log(response)
					}
					
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.error('AJAX Error:', textStatus, errorThrown);
				}
			});
		}
		
    });
	$('#booking-form-second').on('submit', function(e) {
		e.preventDefault();
		var t = $(this);
		var formData = new FormData(this);
		var ajax_url = ajax_object.ajax_url;
		var ajax_nonce = ajax_object.ajax_nonce;
		
		if (this.checkValidity()) {
			t.find('.loading-icon-container').show();
			var submitBTN = t.find('input[type="submit"],button[type="submit"]');
			submitBTN.prop('disabled', true);
			
			formData.append('action', 'submit_booking_form_second'); // Add action parameter
			
			$.ajax({
				url: ajax_url,
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function(response) {
					console.log(response);
					$('#booking-form-second').fadeOut(200);
					$('#success-message').fadeIn(200);
					submitBTN.prop('disabled', false);
					t.find('.loading-icon-container').hide();
				},
				error: function(xhr, status, error) {
					console.error(xhr.responseText);
					// Handle error (e.g., display error message)
					alert('Error occurred. Please try again.');
					submitBTN.prop('disabled', false);
					t.find('.loading-icon-container').hide();
				}
			});
		}
	});
	
	// time picker
    var dateInput = $('#date-picker');
	dateInput.datepicker({
		dateFormat: 'dd.mm.yy',
		minDate: 0, 
		onSelect: function(dateText, inst){
			var selectedDate = dateText;
			updateDateAndTimeFields();
		}
	});
	$('#ekspert').on('change' , function(){
		updateDateAndTimeFields();
	});
	$('.svg-map-sec-four svg > g > path').on('mousedown', function(event) {
		
		var t = $(this);
		console.log(t);
		var svg = t.closest('svg');
		var svgMapSecOffset = svg.offset();
	
		var isDragging = false;
		var startX = event.pageX - svgMapSecOffset.left;
		var startY = event.pageY - svgMapSecOffset.top;
	
		$(document).on('mousemove.mapClick', function(event) {
			var currentX = event.pageX - svgMapSecOffset.left;
			var currentY = event.pageY - svgMapSecOffset.top;
	
			if (Math.abs(currentX - startX) > 5 || Math.abs(currentY - startY) > 5) {
				isDragging = true;
				$(document).off('mousemove.mapClick');
			}
		});
	
		$(document).one('mouseup.mapClick', function(event) {
			$(document).off('mousemove.mapClick');
			if (!isDragging) {
				// Click event
				$('.svg-map-sec-four svg > g > path').removeClass('active');
				t.addClass('active');
				var mapArticlesWrap = $('.map-articles-wrapt');
				var mapid = t.closest('#map');
				var categoryID = mapid.data('category');
				var parentID = mapid.data('parentid');
				mapArticlesWrap.hide();
				var locationSlug = t.attr('id');
				get_map_location(locationSlug, categoryID, parentID);
	
				var classList = t.prop('classList');
				var positions = Array.from(classList)[1];
				var clickedPath = t;
				var pathOffset = clickedPath.offset();
				var relativeX = pathOffset.left - svgMapSecOffset.left;
				var relativeY = pathOffset.top - svgMapSecOffset.top;
	
				if (positions.includes('right')) {
					relativeX += clickedPath.width() + 60;
				} else if (positions.includes('left')) {
					relativeX -= mapArticlesWrap.width() + 60;
				}
				if (positions.includes('bottom')) {
					relativeY += clickedPath.height() + 60;
				} else if (positions.includes('top')) {
					relativeY -= mapArticlesWrap.height() + 60;
				}
				mapArticlesWrap.css({
					left: relativeX + 'px',
					top: relativeY + 'px'
				});
			}
		});
	});

	var values = [44,45,46,57,145,49,50,47,52,51,53,55,54,56,48,58];
			var datapositonvalue = ['bottom','bottom', 'left', 'right', 'left top' , 'left', 'left top', 'left' , 'top', 'right top', 'right bottom','top','top','top','top'];
		
			$( "#map path" ).each(function( index ) {
				// Check the stroke color of the current path
				var strokeColor = $(this).attr('stroke');
				// If the stroke color is not red, assign the id and data-position
				if (strokeColor !== 'rgba(143, 166, 214, 1)') {
					var valueIndex = index % values.length; // Get the index for values array
					var value = values[valueIndex]; // Get the value corresponding to the current index
					var position = datapositonvalue[valueIndex]; // Get the position corresponding to the current index
					
					$(this).prop('id', value);
					$(this).addClass(position);
					 // Set data-position attribute
				}
				else{
					$(this).addClass('clickchange');
				}
			});
			var firstPath = document.querySelector('.leaflet-marker-icon path'); // Selecting the first path element

    // Trigger click event on the first path element
    if (firstPath) {
        firstPath.click();
		console.log(firstPath); // Programmatically trigger the click event
    }
	var pathElements = document.querySelectorAll('.leaflet-marker-icon');
			// console.log(pathElements);
        pathElements.forEach(function(path) {
			
            path.addEventListener('click', function(event) {
                var clickX = event.clientX;
                var clickY = event.clientY;
                // console.log(event);
                var elementsUnderClick = document.elementsFromPoint(clickX, clickY);

                elementsUnderClick.forEach(function(element) {
                    if (element.tagName.toLowerCase() === 'path' && !element.classList.contains('clickchange')) {
						// console.log(element);
						// $(this).trigger('click');
						element.classList.add('buttonclicked');
                        var event = new MouseEvent('click', {
							bubbles: true,
							cancelable: true,
							view: window
						});
						// Check if the element is clickable
						if (element.dispatchEvent(event)) {
							console.log("Click event dispatched successfully");
						} else {
							console.log("Failed to dispatch click event");
						}
						
                    }
                });
				
				
            });
        });
		$(document).on('click', '.svg-map-sec-four svg > g > path', function(event) {
			var targetPath = $(event.target);
			// Check if the clicked element is a path and meets other conditions
			if (targetPath.is('path') && targetPath.hasClass('buttonclicked')) {
				// Your existing click event handler code here
				var t = $(this);
				
				var svg = t.closest('svg');
				var svgMapSecOffset = svg.offset();
				
				var isDragging = false;
				var startX = event.pageX - svgMapSecOffset.left;
				var startY = event.pageY - svgMapSecOffset.top;
		
				$(document).on('mousemove.mapClick', function(event) {
					var currentX = event.pageX - svgMapSecOffset.left;
					var currentY = event.pageY - svgMapSecOffset.top;
		
					if (Math.abs(currentX - startX) > 5 || Math.abs(currentY - startY) > 5) {
						isDragging = true;
						$(document).off('mousemove.mapClick');
					}
				});
		
				$(document).off('mousemove.mapClick');
				if (!isDragging) {
					// Click event
					$('.svg-map-sec-four svg > g > path').removeClass('active');
					$('.svg-map-sec-four svg > g > path').removeClass('buttonclicked');
					t.addClass('active');
					var mapArticlesWrap = $('.map-articles-wrapt');
					var mapid = t.closest('#map');
					var categoryID = mapid.data('category');
					var parentID = mapid.data('parentid');
					mapArticlesWrap.hide();
					var locationSlug = t.attr('id');
					get_map_location(locationSlug, categoryID, parentID);
		
					var classList = t.prop('classList');
					var positions = Array.from(classList)[1];
					var clickedPath = t;
					var pathOffset = clickedPath.offset();
					var relativeX = pathOffset.left - svgMapSecOffset.left;
					var relativeY = pathOffset.top - svgMapSecOffset.top;
		
					if (positions.includes('right')) {
						relativeX += clickedPath.width() + 60;
					} else if (positions.includes('left')) {
						relativeX -= mapArticlesWrap.width() + 60;
					}
					if (positions.includes('bottom')) {
						relativeY += clickedPath.height() + 60;
					} else if (positions.includes('top')) {
						relativeY -= mapArticlesWrap.height() + 60;
					}
					mapArticlesWrap.css({
						left: relativeX + 'px',
						top: relativeY + 'px'
					});
				}
			}
		});
		






	
	$(document).on('click', function(event) {
		if ($(window).width() > 991) {
			if (!$(event.target).closest('.svg-map-sec svg > g').length && !$(event.target).closest('.map-articles-wrapt').length) {
				$('.map-articles-wrapt').hide();
				$('.svg-map-sec svg > g > g').removeClass('active');
			}
			
		}
	});
	// $('#date-picker').on('change' , function(){
		
	// 	var expertId 		=	$('#ekspert').val();
	// 	updateDateAndTimeFields(expertId);
	// 	// $.ajax({
	// 	// 	url: ajax_url, // Provided by WordPress
	// 	// 	type: 'POST',
	// 	// 	data: {
	// 	// 		action: 'get_existing_bookings',
	// 	// 		expert_id: expertId,
	// 	// 	},
	// 	// 	success: function(reservedTimeSlots) {
	// 	// 		// updateDateAndTimeFields(reservedTimeSlots);
	// 	// 		// Parse the reservedTimeSlots data and disable the corresponding time slots in your form
	// 	// 		// You'll need to customize this part based on how your form is structured
	// 	// 		timeSlots = reservedTimeSlots;
	// 	// 		console.log(timeSlots);
	// 	// 	}
	// 	// });
	// })
	$('#event-booking-form').submit(function(e) {
		e.preventDefault();
		var t 	=	$(this);
		var formData = $('#event-booking-form').serialize();
		var ajax_url 		= ajax_object.ajax_url;
		var ajax_nonce 		= ajax_object.ajax_nonce;
		if(this.checkValidity()){
			t.find('.loading-icon-container').show();
			var submitBTN = t.find('input[type="submit"],button[type="submit"]');
			submitBTN.prop('disabled' , true);
			$.ajax({
				url: ajax_url,
				type: 'POST',
				data: formData + '&action=create_new_booking_for_event',
				success: function(response) {
					response = response.trim();
					console.log('response: ' + response);
					if(response == 'success'){
						$('#event-booking-form').fadeOut(200);
						$('#success-message').fadeIn(200);
					}
					else if(response == 'reserved'){
						$('#event-booking-form').fadeOut(200);
						$('#warning-message').fadeIn(200);
					}
					else{
						$('#error-message').fadeIn(200);
					}
					submitBTN.prop('disabled' , false);
					t.find('.loading-icon-container').hide();
				}
			});
		}
		$(this).addClass('was-validated');
	  });
	//   submit-comments-reply-form
	$('.submit-comments-reply-form').submit(function(e) {
		e.preventDefault();
		var t 				=	$(this);
		var formData 		= t.serialize();
		var ajax_url 		= ajax_object.ajax_url;
		var ajax_nonce 		= ajax_object.ajax_nonce;
		if(this.checkValidity()){
			t.find('.loading-icon-container').show();
			var submitBTN = t.find('input[type="submit"],button[type="submit"]');
			submitBTN.prop('disabled' , true);
			$.ajax({
				url: ajax_url,
				type: 'POST',
				data: formData + '&action=submit_comment_form_ajax',
				success: function(response) {
					response = response.trim();
					console.log('response: ' + response);
					if(response == 'success'){

						t.fadeOut(200);
						t.siblings('.comment-success-message').fadeIn(200);
					}
					else{
						alert('something went wrong, please try again later.')
					}
					submitBTN.prop('disabled' , false);
					t.find('.loading-icon-container').hide();
				}
			});
		}
		$(this).addClass('was-validated');
	  });
	  $('#question-answer-for-qa').submit(function(e) {
		e.preventDefault();
		var t 				=	$(this);
		var formData 		= t.serialize();
		var ajax_url 		= ajax_object.ajax_url;
		var ajax_nonce 		= ajax_object.ajax_nonce;
		if(this.checkValidity()){
			t.find('.loading-icon-container').show();
			var submitBTN = t.find('input[type="submit"],button[type="submit"]');
			submitBTN.prop('disabled' , true);
			$.ajax({
				url: ajax_url,
				type: 'POST',
				data: formData + '&action=create_new_post_for_qa',
				success: function(response) {
					response = response.trim();
					console.log('response: ' + response);
					if(response == 'success'){

						t.fadeOut(200);
						$('#success-message').fadeIn(200);
					}
					else{
						$('#error-message').fadeIn(200);
					}
					submitBTN.prop('disabled' , false);
					t.find('.loading-icon-container').hide();
				}
			});
		}
		$(this).addClass('was-validated');
	  });
	  $('#submit-subscription-for-nabory').submit(function(e) {
		e.preventDefault();
		var t 	=	$(this);
		var formData = $('#submit-subscription-for-nabory').serialize();
		var ajax_url 		= ajax_object.ajax_url;
		var ajax_nonce 		= ajax_object.ajax_nonce;
		$('#error-message').hide();
		$('#success-message').hide();
		$('#email-repetemessege').hide()
		if(this.checkValidity()){
			t.find('.loading-icon-container').show();
			var submitBTN = t.find('input[type="submit"],button[type="submit"]');
			submitBTN.prop('disabled' , true);
			$.ajax({
				url: ajax_url,
				type: 'POST',
				data: formData + '&action=create_new_entry_for_nabory',
				success: function(response) {
					response = response.trim();
					console.log('response: ' + response);
					if(response == 'success'){

						$('#submit-subscription-for-nabory').fadeOut(200);
						$('#success-message').fadeIn(200);
					}else if(response == 'email is repete'){
						$('#email-repetemessege').fadeIn(200);
					}
					else{
						$('#error-message').fadeIn(200);
					}
					submitBTN.prop('disabled' , false);
					t.find('.loading-icon-container').hide();
				}
			});
		}
		$(this).addClass('was-validated');
	  });
	 $('.un-form-group-inputs').append('<div class="select-loader"><div class=" displayloder loader"></div></div>');
	  $('.vSelect2').vSelect({
			placeholder: 'Wybierz',
			checkAll: true,
			required: true,
			checkAllLabel: 'Zaznacz wszystkie',
			selectedLabel: 'Wybrano',
			display: 'sum',
			trayHeight: '304px',
			dropdown: true,
		});
		$('.secondvselect').vSelect({
			placeholder: 'Wybierz',
			checkAll: true,
			checkAllLabel: 'Zaznacz wszystkie',
			selectedLabel: 'Wybrano',
			display: 'sum',
			trayHeight: '304px',
			dropdown: true,
		});
		
      var vselect = $('.newSelect').vSelect({
			placeholder: 'Wybierz',
			checkAll: true,
			checkAllLabel: 'Zaznacz wszystkie',
			selectedLabel: 'Wybrano',
			display: 'sum',
			trayHeight: '304px',
			dropdown: true,
		  
		   onChange: function(values, options) {
            updateOnChangeVal();
           }
		  
		});
        $('body').on('change' , 'select#program_select + .vselect-container .vselect-global input' , function(){
           updateOnChangeVal();
        })
	function updateOnChangeVal(){
        $('.newSelect').trigger('change');
		var values = $('.newSelect').val();
			console.log(values)
			   slug = values;
			   var ajax_url = ajax_object.ajax_url;
	var ajax_nonce = ajax_object.ajax_nonce;
     $('.select-loader').addClass('active');
	$.ajax({
		url: ajax_url,
		type: 'POST',
		data: {
			action: 'list_slug_from_selected_news',
			programslug: slug,
			nonce: ajax_nonce // Corrected nonce here
		},
		success: function (response) {
			
			console.log(response);
			// Parse the response object
    var responseData = JSON.parse(response);
		
		$('#dzial_select').attr('style', 'display: block !important; position: absolute; opacity: 0; z-index: -2;');
     $('.select-loader').removeClass('active');
    var dzialSelectHTML = responseData.dzialSelect;
       	console.log(responseData);
  $('#dzial_select').empty();
$('#dzial_select').next('div.vselect-container').remove();
$('#dzial_select').html(dzialSelectHTML);

	$('.secondvselect').vSelect({
		placeholder: 'Wybierz',
		checkAll: true,
		checkAllLabel: 'Zaznacz wszystkie',
		selectedLabel: 'Wybrano',
		display: 'sum',
		trayHeight: '304px',
		dropdown: true,
		onChange: function(values, options) {
			       updatesecondvalaue()
                    }
                });
                    }
                });
    }
	    $('#submit-subscription-for-szkolenia').submit(function(e) {
			e.preventDefault();
			var t 	=	$(this);
			var formData = $('#submit-subscription-for-szkolenia').serialize();
			var ajax_url 		= ajax_object.ajax_url;
			var ajax_nonce 		= ajax_object.ajax_nonce;
			$('#error-message').hide();
			$('#success-message').hide();
			$('#email-repetemessege').hide()
			if(this.checkValidity()){
				t.find('.loading-icon-container').show();
				var submitBTN = t.find('input[type="submit"],button[type="submit"]');
				submitBTN.prop('disabled' , true);
				var actionName = 'create_new_entry_for_szkolenia';
				$.ajax({
					url: ajax_url,
					type: 'POST',
					data: formData + '&action=' + actionName,
					success: function(response) {
						response = response.trim();
						console.log('response: ' + response);
						if(response == 'success'){
	
							$('#submit-subscription-for-szkolenia').fadeOut(200);
							$('#success-message').fadeIn(200);
						}
						else if(response == 'email is repete'){
							$('#email-repetemessege').fadeIn(200);
						}
						else{
							$('#error-message').fadeIn(200);
						}
						submitBTN.prop('disabled' , false);
						t.find('.loading-icon-container').hide();
					}
				});
			}
			$(this).addClass('was-validated');
		  });
	
	 $('body').on('change' , 'select#dzial_select + .vselect-container .vselect-global input' , function(){
           updatesecondvalaue()
        })
	
	function updatesecondvalaue(){
		
		 var selectedDzialValues = $('#dzial_select').val(); // Get all selected values from #dzial_select
            var selectedProgramValues = $('#program_select').val(); // Get all selected values from #program_select
            var combinedTextArray = []; // Initialize an array to store combined texts
            $('#dzial_select').trigger('change')
            if (selectedDzialValues && selectedProgramValues) {
            selectedDzialValues.forEach(function(dzialText) {
            selectedProgramValues.forEach(function(programText) {
            var combinedText = programText + '+' + dzialText;
            combinedTextArray.push(combinedText); // Push each combined text to the array
            });
            });
            }


                        // Loop through combinedTextArray and select corresponding options
                       $('#email_groups_nfinity-newsletter-widget-subscription-form-3-wrapper option').prop('selected', false);

    // Loop through combinedTextArray and select corresponding options
    combinedTextArray.forEach(function(text) {
        $('#email_groups_nfinity-newsletter-widget-subscription-form-3-wrapper option').each(function() {
            if ($(this).text() === text) {
                $(this).prop('selected', true);
            }
        });
    });
	}
	
var form = document.querySelector('.newsletter_form');



form.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
	var vselectDisplay = document.querySelector('.vselect-selected-display');
var responseAction = 'un_add_subscriber';
    // Perform your form submission logic here

    // Check if the response action is 'un_add_subscriber'
    if (responseAction === 'un_add_subscriber') {
        // Reset the selected value in the vselect component
        vselectDisplay.innerHTML = '<span class="vselect-display-text">Wybierz</span>';
    }
});

               
		  $('.vSelect34').vSelect({
				placeholder: 'Wybierz',
				checkAll: true,
				required: true,
				checkAllLabel: 'Zaznacz wszystkie',
				selectedLabel: 'Wybrano',
				display: 'sum',
				trayHeight: '304px',
				dropdown: true,
			});
		
});

$(window).on('load' , function(){
	$(".owl-prev").attr("aria-label", "Poprzednie");
	$(".owl-next").attr("aria-label", "następne");
});

function updateDateAndTimeFields() {
	var expertId 		=	$('#ekspert').val();
    var timeInput 		= $('#time-field');
	var ajax_url 		= ajax_object.ajax_url;
	var ajax_nonce 		= ajax_object.ajax_nonce;

    // dateInput.on('change', function () {
        var selectedDate = $('#date-picker').val();
        $.ajax({
            type: 'POST',
            url: ajax_url, 
            data: {
                action: 'get_existing_bookings',
                expert_id: expertId,
				selected_date: selectedDate
            },
            success: function (response) {
                var selectedDateSlots = response.find(function (slot) {
                    return slot.date === selectedDate;
                });

                if (selectedDateSlots) {
                    var disabledTimes = selectedDateSlots.time;

                    timeInput.find('option').prop('disabled', false);
                    timeInput.find('option').each(function () {
                        var timePart = $(this).val();
                        if (disabledTimes.includes(timePart)) {
                            $(this).prop('disabled', true);
                        }
                    });
                }
            },
        });
    // });
}


//ajax call for form-booking


$(document).ready(function() {
    var countInput = $('#selectedCount');
    var dropdownContent = $('.dropdown-content');
    var selectAllCheckbox = $('#selectAll');
    var hiddenInputsContainer = $('#hiddenInputsContainer');

    function updateCountAndValues() {
        var checkedCheckboxes = $('.action:checked');
        var checkedCount = checkedCheckboxes.length - (selectAllCheckbox.is(':checked') ? 1 : 0);
        countInput.val(checkedCount > 0 ? ' Wybrano:' + checkedCount : 'Wybierz');

        // Clear previous hidden inputs
        hiddenInputsContainer.empty();

        // Create hidden input for each selected checkbox
        checkedCheckboxes.each(function() {
            $('<input>', {
                type: 'hidden',
                name: 'selectedActions[]',
                value: $(this).val()
            }).appendTo(hiddenInputsContainer);
        });
    }

    // Event delegation for dynamically added checkboxes
    $(document).on('change', '.action', function() {
        if (selectAllCheckbox && !$(this).is(':checked')) {
            selectAllCheckbox.prop('checked', false);
        }
        updateCountAndValues();
    });

    if (countInput.length) {
        countInput.on('click', function() {
            dropdownContent.toggle();
            // Toggle active class based on the dropdown's visibility
            if (dropdownContent.is(':visible')) {
                $(countInput).parent().addClass("active");
            } else {
                $(countInput).parent().removeClass("active");
            }
        });
    }

    if (selectAllCheckbox.length) {
        selectAllCheckbox.on('change', function() {
            $('.action').prop('checked', $(this).is(':checked'));
            updateCountAndValues();
        });
    }

    // Close the dropdown if clicked outside
    $(window).on('click', function(e) {
        if (!countInput.is(e.target) && !dropdownContent.is(e.target) && dropdownContent.has(e.target).length === 0) {
            dropdownContent.hide();
            $(countInput).parent().removeClass("active");
        }
    });

    // Initialize the count and values
    updateCountAndValues();
});

$(document).ready(function () {
    const $body_ = $('body');
    const $vselectContainer = $body_.find('.vselect-container');
    const $vselectDisplayContainer = $vselectContainer.find('.vselect-display-container');
    const $vselectTray = $vselectContainer.find('.vselect-tray');
    
    function closeDropdown(container) {
        container.find('.vselect-tray').css('display', 'none');
        container.find('.vselect-display-container').removeClass('active');
    }

    // Open dropdown and add active class on Enter key
    $body_.on('keydown' ,'.vselect-container' ,function (e) {
        if (e.key === 'Enter') {
            const displayContainer = $(this).find('.vselect-display-container');
            const tray = $(this).find('.vselect-tray');

            displayContainer.addClass('active');
            tray.css('display', 'block');
        }
    });

    // Handle focusin and focusout to manage dropdown visibility
    $vselectContainer.on('focusin', function() {
        $(this).data('focused', true);
    }).on('focusout', function() {
        const container = $(this);
        setTimeout(function() {
            if (!container.find(':focus').length) {
                closeDropdown(container);
            }
        }, 0);
    });
	// Close dropdown on Escape key
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            jQuery(".vselect-container").each(function () {
                closeDropdown($(this));
            });
        }
    });
});


$(document).ready(function() {
	// Add <desc> tags to each SVG icon
	$('.wp-block-social-link-anchor svg').each(function() {
	var screenReaderText = $(this).siblings('.wp-block-social-link-label').text();
	var descText = screenReaderText + ' logo';

	// Check if <desc> tag already exists
	if ($(this).find('desc').length === 0) {
		// Add <desc> tag with the combined text
		$(this).prepend('<desc>' + descText + '</desc>');
	}
	});
	$('#dziedzina').change(function() {
		var ajax_url = ajax_object.ajax_url;
		var ajax_nonce = ajax_object.ajax_nonce;
        var selectedCategory = $(this).val();
		$('#ajax-loader-form').show();
		var currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false});
        $.ajax({
            url: ajax_url,
            type: 'POST',
            data: {
                action: 'get_dates_for_category',
                category: selectedCategory,
				current_time: currentTime
            },
            success: function(response) {
				var jsonResponse 	= JSON.parse(response);
				var datesData 		= jsonResponse.dates;
				var expertsData 	= jsonResponse.experts;
                $('#consultation-dates').html(datesData);
                $('#time-field option:not(:first-child)').remove();
				$('#ajax-loader-form').hide();
			}
        });
    });

    // When the date changes
    $('#consultation-dates').change(function() {
        var selectedDate = $(this).val();
		var ajax_url = ajax_object.ajax_url;
		var ajax_nonce = ajax_object.ajax_nonce;
		var selectedCategory =$('#dziedzina').val();
		$('#ajax-loader-form').show();
        $.ajax({
            url: ajax_url,
            type: 'POST',
            data: {
                action: 'get_times_for_date',
                date: selectedDate,
				selectedCategory: selectedCategory
            },
            success: function(response) {
                $('#time-field').html(response);
				$('#ajax-loader-form').hide();
            }
        });
    });
	if ($('select[name="topic-second"]').val() === 'ocena pomysłu na projekt') {
		// Show the corresponding div
		$('.formdisplay').css('display', 'block');
	}

	// Attach change event listener to the select element
	$('select[name="topic-second"]').change(function() {
		// Check if the selected option is "ocena pomysłu na projekt"
		if ($(this).val() === 'ocena pomysłu na projekt') {
			// Show the corresponding div
			$('.formdisplay').css('display', 'block');
		} else {
			// Hide the div if the selected option is different
			$('.formdisplay').css('display', 'none');
		}
	});
	if ($('select[name="form-consultation"]').val() === 'w biurze PdP') {
		// Show the corresponding div
		$('#dziedzina').closest('.form-group').css('display', 'none');
		$('#dziedzina').prop('disabled', true);
		$('#input_select_timepicker').css('display', 'none');
		$('#consultation-dates').prop('disabled', true);
		$('#input_timepicker').css('display', 'block');
		$('#date-picker').prop('disabled', false);

		$('#input-select-consulationdate ').css('display', 'none');
		$('#input-select-consulationdate select').prop('disabled', true);
		$('#input-select-date').css('display', 'block');
		$('#input-select-date input').prop('disabled', false);
	}

	// Attach change event listener to the select element
	$('select[name="form-consultation"]').change(function() {
		// Check if the selected option is "ocena pomysłu na projekt"
		if ($(this).val() === 'w biurze PdP') {
			// Show the corresponding div
			// Show the corresponding div
			$('#dziedzina').closest('.form-group').css('display', 'none');
			$('#dziedzina').val('');
			$('#dziedzina').prop('disabled', true);
			$('#input_select_timepicker').css('display', 'none');
		    $('#input_select_timepicker select').prop('disabled', true);
			$('#input_select_timepicker select').val('');
			$('#input_timepicker').css('display', 'block');
		    $('#input_timepicker input').prop('disabled', false);

			$('#input-select-consulationdate').css('display', 'none');
		$('#input-select-consulationdate select ').prop('disabled', true);
		$('#input-select-consulationdate select ').val('');
		$('#input-select-date').css('display', 'block');
		$('#input-select-date input').prop('disabled', false);
		
		} else {
			// Hide the div if the selected option is different
			$('#dziedzina').closest('.form-group').css('display', 'block');
			$('#dziedzina').prop('disabled', false);
			
			$('#input_select_timepicker').css('display', 'block');
		    $('#input_select_timepicker select').prop('disabled', false);
			$('#input_timepicker').css('display', 'none');
		    $('#input_timepicker input').prop('disabled', true);
			$('#input_timepicker input').val('');

		$('#input-select-consulationdate').css('display', 'block');
		$('#input-select-consulationdate select').prop('disabled', false);
		$('#input-select-date').css('display', 'none');
		$('#input-select-date input').prop('disabled', true);
		$('#input-select-date input').val('');
		}
	});
	
	var capture = $( ".map-articles-wrap" )
.attr( "tabindex", "-1" )
.focus()
.keydown(
	function handleKeydown( event ) {
		if ( event.which === 13 ) {
			return;
		}
		var tabbable = $()
			.add( capture.find( "button, input, select, textarea" ) )
			.add( capture.find( "[href]" ) )
			.add( capture.find( "[tabindex]:not([tabindex='-1'])" ) )
		;
		var target = $( event.target );
		if ( event.shiftKey ) {
			if ( target.is( capture ) || target.is( tabbable.first() ) ) {
				event.preventDefault();
				tabbable.last().focus();
			}
		} else {
			if ( target.is( tabbable.last() ) ) {
				event.preventDefault();
				tabbable.first().focus();
			}
		}
	}
); 
	
});



jQuery(document).ready(function ($) {
	var requiredFieldMessage = customScriptLocalized.requiredFieldMessage;
    var invalidEmailMessage = customScriptLocalized.invalidEmailMessage;
    // Attach a focusout event listener to the form fields
    $('.wpcf7-form-control').focusout(function () {
        var field = $(this);
        var fieldName = field.attr('name');
        var fieldValue = field.val();
        var label = field.closest('.form-group').find('label').text(); // Adjust the selector based on your HTML structure
        var isRequired = field.attr('aria-required') === 'true';
        var labelWithoutAsterisk = getLabelWithoutAsterisk(label);

        // Check if the field is required and empty
        if (isRequired && !fieldValue.trim()) {
            displayErrorMessage(fieldName, requiredFieldMessage, ': ' + labelWithoutAsterisk);
        } else if (fieldName === 'your-email' && !isValidEmail(fieldValue)) {
            // Check if the email is not valid
            displayErrorMessage(fieldName, invalidEmailMessage , '');
        } else {
            // Clear the error message if the field is not empty and the email is valid
            clearErrorMessage(fieldName);
        }
    });

    // Function to display error messages
    function displayErrorMessage(fieldName, message, label) {
        // Remove existing error message if any
        clearErrorMessage(fieldName);

        // Display the new error message with label
        $('[name="' + fieldName + '"]').after('<div class="wpcf7-not-valid-tip">' + message +  label + '</div>');
    }

    // Function to clear error messages
    function clearErrorMessage(fieldName) {
        $('[name="' + fieldName + '"]').next('.wpcf7-not-valid-tip').remove();
    }

    // Function to check if the email is valid
    function isValidEmail(email) {
        // Use a simple regex pattern for email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to get label text without asterisk
    function getLabelWithoutAsterisk(label) {
        var asteriskIndex = label.indexOf('*');
        return asteriskIndex !== -1 ? label.slice(0, asteriskIndex).trim() : label.trim();
    }
	
});

document.addEventListener("DOMContentLoaded", function () {
		    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
		    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		      return new bootstrap.Popover(popoverTriggerEl);
		    });
		  });


		  