
//("#btn-search").click
$("#search-form").submit(function(){

//console.log('success');

//$(function(){
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
  var url = baseurl + input + '/.json';
}

console.log(url);



$.ajax({
        type: 'GET',
        url: url,
        success: function(data){
          //console.log(data);
          $sidebar.empty();
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
                  //console.log(thumbnailurl);
                  //console.log("-------")
                    
                    $sidebar.append('<div class="row video-item"> <div class="col-xs-12"> <a class="video-link" href="#"> <div class="vid-summary row"><div class="preview-holder col-md-4"><span class="helper"> </span> <img class="preview" src="' + thumbnailurl + '" height="75" width="100"/></div><div class="title-holder col-md-8"><p class="vid-title">' + child.data.title +'</p></div></div></a> </div> </div>');
                  
                    
                } 

                NProgress.inc();
                
            });
            
            
            if ($( ".sidebar" ).is( ".hide" ) ) {
            
            toggleSidebar();
            }


            NProgress.done();

            
              
              //counter+=25;
              //if(data.data.after === null) isMore = false; 
            
        }
      
      });
      return false;

});




  


