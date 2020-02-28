$(document).ready(function() {
    $('.mb_nav_button').click(function(e) {
        e.preventDefault();
        $('.menu').toggleClass('active');
    });
})