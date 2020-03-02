$(document).ready(function() {
    $('.mb_nav_button').click(function(e) {
        e.preventDefault();
        $('.menu').toggleClass('active');
    });

    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if (height > 100) {
            $('.to_top').fadeIn();
        } else {
            $('.to_top').fadeOut();
        }
    });

    $('.to_top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0,
        }, 800)
    });

    $('#bt_secrete').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#secrete").offset().top
        }, 800);
    });

    $('#bt_chef').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#chef").offset().top
        }, 800);
    });

    $('#bt_map').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#map").offset().top
        }, 800);
    });
})