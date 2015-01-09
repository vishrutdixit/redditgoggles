$(".vid-summary").on('click', function(e) {
    e.preventDefault();
    alert($(this).parent().attr('id'));
});

$("#sidebar-toggle").click(function(){
  toggleSidebar();
});

$( "#sidebar-toggle" ).hover(function() {
  $("#toggle-glyph").toggleClass("hover");
  
});



function toggleSidebar() {
	$(".sidebar").toggleClass("hide");

  
  	$("#main-container").toggleClass("col-md-12");
  	$("#main-container").toggleClass("col-md-9");

  	$("#toggle-glyph").toggleClass("active");

}

