
$(document).on("click", ".vid-summary", function(e) { 
	e.preventDefault();
    //console.log('video click!');
    NProgress.start();

    console.log($(this).find(".vid-title").text());
    var title = $(this).find(".vid-title").text();

    var baseurl = 'http://www.reddit.com/r/';
	var input = $('#search-field').val(); 

	var embed1 = '<iframe width="930" height="470" src="//www.youtube.com/embed/';
	var embed2 = '?rel=0&modestbranding=1&hd=1&showinfo=0&controls=1&iv_load_policy=3&wmode=transparent&autohide=1&autoplay=0" frameborder="1" allowfullscreen></iframe>';

	var finalembed;

	var $frame = $('.video-embed');

	if(input === ''){
  		var url = 'http://www.reddit.com/' + input + '.json';
	}
	else {
  		var url = baseurl + input + '/.json';
	}


	$.ajax({
        	type: 'GET',
        	url: url,
        	success: function(data){
        	$frame.empty();

        	$.each(data.data.children, function(i, child){

        			//variables needed
                	var url = child.data.url; 
                	var suburl; 
                	var index;
                	var thumbnailurl; 
                	var index2; //used for second round to filter out extraneous stuff after the video ID
                

                	if(title === child.data.title)
        			{

	                	if(child.data.domain === 'youtube.com'){
	                    index = url.indexOf('=');
	                    index++; 
	                    suburl = url.substring(index); 
	                    //console.log(suburl); 

	                    
	                    if(suburl.indexOf('?') >= 0) {
	                      index2 = suburl.indexOf('?');
	                      suburl = suburl.substring(0, index2);
	                    }
	                    else if(suburl.indexOf('&') >= 0){
	                      index2 = suburl.indexOf('&')
	                      suburl = suburl.substring(0, index2);
	                    }
	                    else if(suburl.indexOf('#') >= 0){
	                      index2 = suburl.indexOf('#')
	                      suburl = suburl.substring(0, index2);
	                    }

	                	}

	                  	else if(child.data.domain === 'youtu.be'){
	                  
	                  	index = url.indexOf('be/');
	                  	index+=3; 
	                  	suburl = url.substring(index); 
	                  	//console.log(suburl); 

	                  	if(suburl.indexOf('?') >= 0) {
	                      index2 = suburl.indexOf('?');
	                      suburl = suburl.substring(0, index2);
	                    }
	                    else if(suburl.indexOf('&') >= 0){
	                      index2 = suburl.indexOf('&')
	                      suburl = suburl.substring(0, index2);
	                    }
	                    else if(suburl.indexOf('#') >= 0){
	                      index2 = suburl.indexOf('#')
	                      suburl = suburl.substring(0, index2);
	                    }

	                	}
          
        			
        				console.log('got em');
        				finalembed = embed1 + suburl + embed2;

        				console.log(finalembed);
        				$frame.append(finalembed);

        				NProgress.inc();
        			}

        		NProgress.done();
        	});

 		}
 	});
	
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

