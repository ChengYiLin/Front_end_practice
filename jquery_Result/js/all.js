$(document).ready(function() {
    $('.to_top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0,
        }, 800)
    });

    $('.drop_down_menu').hover(function(e) {
        e.preventDefault();
        $(this).find('.drop_down').slideToggle();
    });

    //initialize swiper when document ready
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
});