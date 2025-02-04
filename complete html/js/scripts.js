var $ = jQuery;
jQuery(document).ready(function($) {
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

	// $("#btnPause").click(function(){
	// 	$("#slider-block").carousel("pause");
	// 	$('#slider-block').find('.carousel-control-pause').hide();
	// 	$('#slider-block').find('.carousel-control-play').show();
	// });
	// $("#btnPlay").click(function(){
	// 	$("#slider-block").carousel("cycle");
	// 	$('#slider-block').find('.carousel-control-pause').show();
	// 	$('#slider-block').find('.carousel-control-play').hide();
	// });

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
	$('.char-limit').on('input', function () {
		var textArea 		= $(this);
		var charCount 		= textArea.closest('.form-group').find('.charCount');
		var maxLength 		= parseInt(textArea.data('maxlength'));
		var currentLength 	= textArea.val().length;
		var remaining 		= maxLength - currentLength;

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

	$('.form-check-input[type=radio]').change(function () {
	    var formCheck 			= $(this).closest('.form-check');
    	var hasShowFieldClass 	= formCheck.hasClass('show-field');
	    var formGroup 			= $(this).closest('.form-group');
	    var additionalField 	= formGroup.next('.additional-field');

	    console.log(hasShowFieldClass);

	    if (hasShowFieldClass) {
	        additionalField.removeClass('d-none');
	    } else {
	        additionalField.addClass('d-none');
	    }
	});


  	$('.date-picker').datepicker({
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
        $(".web-form-wrap").not($(this).closest('.reply-form').find('.web-form-wrap')).slideUp();
        $(".web-btn.add-answer-btn").not($(this).closest('.add-answer-btn')).show();
        var formWrap 	= $(this).closest('.reply-form').find('.web-form-wrap');
        var addButton 	= $(this).closest('.add-answer-btn');
        formWrap.slideToggle();
        addButton.toggle();
    });


	// SVG map posts
	$('.svg-map-sec svg > g > g').on('click', function(event) {
	    event.stopPropagation();
	    var t 	= $(this);
	    $('.svg-map-sec svg > g > g').removeClass('active');
	    t.addClass('active');
	    var svgMapSec 			= $('.svg-map-sec');
	    var mapArticlesWrap 	= $('.map-articles-wrap');
	    var positions 			= t.attr('data-position').split(' ');
	    var clickedPath 		= t.find(".fil1");
	    var svgMapSecOffset 	= svgMapSec.offset();
	    var pathOffset 			= clickedPath.offset();
	    var relativeX 			= pathOffset.left - svgMapSecOffset.left;
	    var relativeY 			= pathOffset.top - svgMapSecOffset.top;

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
	    mapArticlesWrap.show();
	});
	$(document).on('click', function(event) {
	    if ($(window).width() > 991) {
	        if (!$(event.target).closest('.svg-map-sec svg > g').length) {
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
});
function SetHeight() {
	var HeaderTopHeight 	= jQuery('.header-top').is(':visible') ? jQuery('.header-top').outerHeight() : 0;
	var HeaderHeight 			= jQuery('.main-header').outerHeight();
	var TotalHeight 			= HeaderTopHeight + HeaderHeight; 
	jQuery('.mobile-menu-wrap').css({ 'height': 'calc(100vh - ' + TotalHeight+ 'px)' });
}