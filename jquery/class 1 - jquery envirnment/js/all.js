$(document).ready(function(){
	$('.Button1').click(function(){
		$('h1,p').toggle("slow");
	});

	$('h2').hover(function() {
		$('h2').hide('fast')
	});
});



