$(function (){

var $videos = $('#links');
var $urls = $('#urls');
//var $counter = $('#counter');
var embed1 = '<iframe width="280" height="157.5" src="//www.youtube.com/embed/';
var embed2 = '?rel=0&modestbranding=1&hd=1&showinfo=0&controls=1&iv_load_policy=3&wmode=transparent&autohide=1&autoplay=0" frameborder="100" allowfullscreen></iframe>';
var counter=25; 
var rurl = 'http://www.reddit.com/r/leagueoflegends/.json';
var newurl;

var isMore = true; 

    
      $.ajax({
        type: 'GET',
        url: rurl,
        success: function(data){
          console.log(data);
          $.each(data.data.children, function(i, child){
              
                //variables needed
                var url = child.data.url; 
                var suburl; 
                var index;
                var finalembed; 
                

                
                if(child.data.domain === 'youtube.com'){
                    index = url.indexOf('=');
                    index++; 
                    suburl = url.substring(index); 
                    
                    finalembed = embed1 + suburl + embed2;
                    
                    $videos.append(finalembed);
                     $urls.append('<li>' + suburl + '</li>');
                    
                }

                else if(child.data.domain === 'youtu.be'){
                  
                  index = url.indexOf('be/');
                  index+=3; 
                  suburl = url.substring(index);  
                  finalembed = embed1 + suburl + embed2;
                  $videos.append(finalembed);
                  $urls.append('<li>' + suburl + '</li>');
                  
                  
                    
                } 


                
            });
            
              newurl = rurl + '?count=' + counter + '&after=' + data.data.after; 
              console.log(newurl);
              //counter+=25;
              //if(data.data.after === null) isMore = false; 
            
        }
      
      });

  
});
