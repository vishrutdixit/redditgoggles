var isSearch = false; 

$(document).ready(function () {
    $('.svg-container').hide().fadeIn(1500);
    //	$('.welcome-text').hide().fadeIn(3000);
    
});

$(".redirect-focus").click(function(e){
	e.preventDefault();
	
	$("#search-field").focus();
});




$(document).on("click", ".vid-summary", function(e) { 
	e.preventDefault();
    //console.log('video click!');
    NProgress.start();

    console.log($(this).find(".vid-title").text());
    var title = $(this).find(".vid-title").text();

    var baseurl = 'http://www.reddit.com/r/';
	var input = $('#search-field').val(); 

	var embed1 = '<iframe width="930" height="470" src="//www.youtube.com/embed/';
	var embed2 = '?rel=0&modestbranding=1&hd=1&showinfo=0&controls=1&iv_load_policy=3&wmode=transparent&autohide=1&autoplay=0" frameborder="0" allowfullscreen></iframe>';

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
        			$(".main-cont").css("background-color", "#1b1b1b");
        			NProgress.done();
        		
        	});
			
 		}

 	});
	
});


$("#sidebar-toggle").click(function(){
  if(isSearch) toggleSidebar();
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



$("#search-form").submit(function(){

NProgress.start();

var $sidebar = $('.sidebar');
var $urls = $('#urls');
//var $counter = $('#counter');

var baseurl = 'http://www.reddit.com/r/';
var input = $('#search-field').val(); 

var thumbnailbase1 = 'http://img.youtube.com/vi/';
var thumbnailbase2 = '/hqdefault.jpg';

if(input === ''){
  var url = 'http://www.reddit.com/' + input + '.json';
}
else {
  var url = baseurl + input + '/.json' ;
}

console.log(url);


$.ajax({
        type: 'GET',
        // url: url,
        url: baseURL + subredditURL + './json',

        

        success: function(data){
          console.log(data);
          $sidebar.empty();
          
          var next = data.data.after; 
         
          //console.log(next);

          $.each(data.data.children, function(i, child){
              
                //variables needed
                var url = child.data.url; 
                var suburl; 
                var index;
                var thumbnailurl; 
                var index2; //used for second round to filter out extraneous stuff after the video ID
                


                
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

                    
                    
                    
                    thumbnailurl = thumbnailbase1 + suburl + thumbnailbase2;
                    //console.log(thumbnailurl);
                    //console.log("-------")
                    
                    $sidebar.append('<div class="row video-item"> <div class="col-xs-12"> <a class="video-link" href="#"> <div class="vid-summary row"><div class="preview-holder col-md-4"><span class="helper"> </span> <img class="preview" src="' + thumbnailurl + '" height="75" width="100"/></div><div class="title-holder col-md-8"><p class="vid-title">' + child.data.title +'</p></div></div></a> </div> </div>');
                    
                    
                    
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
                  
                  thumbnailurl = thumbnailbase1 + suburl + thumbnailbase2;
                  console.log(thumbnailurl);
                  //console.log("-------")
                    
                    $sidebar.append('<div class="row video-item"> <div class="col-xs-12"> <a class="video-link" href="#"> <div class="vid-summary row"><div class="preview-holder col-md-4"><span class="helper"> </span> <img class="preview" src="' + thumbnailurl + '" height="75" width="100"/></div><div class="title-holder col-md-8"><p class="vid-title">' + child.data.title +'</p></div></div></a> </div> </div>');
                  
                    
                } 

                NProgress.inc();
                
            });
            
            $sidebar.append('<a href="#"><div class="load-more row"> Load More </div></a>');
            
            if ($( ".sidebar" ).is( ".hide" ) ) {
            
            toggleSidebar();
            }
            $('.landing-content').hide();
            $('.row.video-embed').removeClass('hide');

            NProgress.done();
            isSearch = true; 

              //counter+=25;
              //if(data.data.after === null) isMore = false; 
            
        }
      
      });
      return false;

});




  




