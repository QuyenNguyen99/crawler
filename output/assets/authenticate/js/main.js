$(document).ready(function(e){
	var withbody=$( window ).width();
    if(withbody>=900){
       $('#fullpage').fullpage({
                navigation: true,
                responsiveWidth: 1025,
                scrollingSpeed: 500,
                scrollOverflow: true,
                scrollOverflowOptions: {
                    scrollbars: true,
                    mouseWheel: true,
                    hideScrollbars: false,
                    fadeScrollbars: false,
                    disableMouse: true
                },
                beforeLoad: function () {
                    var i = $('#fp-nav li a').index($('#fp-nav li a.active'));
                    if (i == 0) {
                        $('#register').removeClass('active');
                         $('#logo').removeClass('active');
                          $('#header').removeClass('active');
                    }

                },
                afterLoad: function () {
                    var i = $('#fp-nav li a').index($('#fp-nav li a.active'));
                    if (i == 0) {
                        $('#register').addClass('active');
                        $('#logo').addClass('active');
                         $('#header').addClass('active');
                    }

                },
            }); 
    } else {
        
    }
    /*============================================
    =            Config Siwper Plugin            =
    ============================================*/
    /**
     *
     * Our Project Section
     *
     */
    var swiper_project = new Swiper('#swiper-projects', {
        pagination: '.swiper-pagination',
        loop: true,
        //autoplay: 5000,
        slidesPerView: 1,
        spaceBetween: 0,
        paginationHide: true,
        paginationClickable: true,
        autoplayDisableOnInteraction: false,

        // Navigation arrows
        nextButton: '.next-project',
        prevButton: '.prev-project',
        // RESPONSIVE
        breakpoints: {
            991: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            }
        }

    });

});