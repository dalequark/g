/* Author: sawenri */

$(document).ready(function(e) {    
    
    $stage = $('#stage');
    var stageWidth = $stage.innerWidth();   
    var stageHeight = $stage.innerHeight();
    $strip = $('#strip');
    $featureItems = $('#featureAnimated #strip li');
    var numItems = $featureItems.length;
    var singleWidth;
    setSingleWidth();
    var totalWidth = singleWidth*numItems;  
    var selectedIndex = 0;
    var previousIndex = -1;
    var wrapAround = true;
    var timed = true;
    var intervalID = 0;
    var switchDelay=8000;
    var duration=700;
    
    var itemDelayOut = 450;
    var itemDelayIn = 600;
    var boxDelayOut = 450;
    var boxDelayIn = 1100;
    var titleDelayOut = 0;
    var titleDelayIn = 1350;
    var subTitleDelayOut = 150;
    var subTitleDelayIn = 1500;
    var paragraphDelayOut = 300;
    var paragraphDelayIn = 1650;
    
    var itemOutDuration = 500;
    var itemInDuration = 500;
    var boxOutDuration = 150;
    var boxInDuration = 250;
    var titleOutDuration = 150;
    var titleInDuration = 150;
    var subTitleOutDuration = 150;
    var subTitleInDuration = 150;
    var paragraphOutDuration = 150;
    var paragraphInDuration = 150;
    
    var itemFadeIn = false;
    var itemFadeOut = false;
    var boxFadeIn = true;
    var boxFadeOut = true;
    var titleFadeIn = true;
    var titleFadeOut = true;
    var subTitleFadeIn = true;
    var subTitleFadeOut = true;
    var paragraphFadeIn = true;
    var paragraphFadeOut = true;
    
    var itemSlide = true;
    var boxSlideIn = true;
    var boxSlideOut = true;
    var titleSlideIn = true;
    var titleSlideOut = true;
    var subTitleSlideIn = true;
    var subTitleSlideOut = true;
    var paragraphSlideIn = true;
    var paragraphSlideOut = true;
    
    var preventAnim = false;
    
    if(numItems > 1){
        
        $insertText = '<div id="featureControls">';
        
        $insertText += '<ul class="dots">';
        
        $insertText += '<li><a href="#" class="leftArrowSmall"></a></li>';
    
        $featureItems.each(function(index) {
                if(index == 0){
                    $insertText += '<li><a href="#" class="selected"></a></li>';
                }else{
                    $insertText += '<li><a href="#"></a></li>';
                }
          });
          
          $insertText += '<li><a href="#" class="rightArrowSmall"></a></li>';

        $insertText += '</ul>';
        
        $insertText += '</div>';
    
        $('#stage').prepend($insertText);
        
        $dots = $('#stage .dots li');
         
        $dots.click(function () {
            if(!isAnimating())  {
                var index = $(this).index();
                
                switch(index)
                {
                case 0:
                  advance(false);
                  break;
                case ($dots.length-1):
                  advance(true);                  
                  break;
                default:
                     if(index-1 != selectedIndex){
                        previousIndex = selectedIndex;
                        selectedIndex = index-1;
                        animateFeature(selectedIndex);
                    }
                }
            }
            return false;
        });  
        
        $('#featureAnimated a.leftArrow').click(function () {
            advance(false);
            return false;
        });
        $('#featureAnimated a.rightArrow').click(function () {
            advance(true);
            return false;
        });  
        
        $featureItems.hover(
            function(){
                preventAnim = true;
                if(timed){
                    window.clearInterval(intervalID);
                    intervalID = null;
                }
            },
            function(){
                if (typeof pageWidth === "undefined"){
                    return;
                }
                if(pageWidth != MOBILE){
                    preventAnim = false;
                    if(timed){
                        intervalID = window.setTimeout(function() { advance(true); }, switchDelay); 
                    }   
                }
        });

        toggleButtons();    
        
    }
    
    function isAnimating(){
        return $stage.find(':animated').length;
    }
    
    function advance(left){
        if(!isAnimating() && !preventAnim)  {
            
            previousIndex = selectedIndex;
            
            if(left){           
                if(selectedIndex+1 < numItems){             
                    selectedIndex++;
                }else if(wrapAround){
                    selectedIndex = 0;              
                }           
            }else{
                if(selectedIndex > 0){      
                    selectedIndex--;
                 }else if(wrapAround){
                    selectedIndex = numItems-1;
                }
            }
            
            animateFeature();
        }
    }
    
    function animateFeature(){
        
        var newPos = (singleWidth*selectedIndex)*-1;
        
        if(!itemFadeOut && !itemSlide){
            $strip.css({ left: newPos });
        }       
        
        $('#featureAnimated #strip li article').css('left', 0);
        $('#featureAnimated #strip li article h1').css('left', 0);
        $('#featureAnimated #strip li article h1').css({ opacity: 1 });
        $('#featureAnimated #strip li article h2').css('left', 0);
        $('#featureAnimated #strip li article h2').css({ opacity: 1 });
        $('#featureAnimated #strip li article p').css('left', 0);
        $('#featureAnimated #strip li article p').css({ opacity: 1 });
        
        $previousHeader = $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+') article');
        var previousHeaderWidth = $previousHeader.outerWidth(true);
        
        $selectedHeader = $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article');
        var selectedHeaderWidth = $selectedHeader.outerWidth(true);
                
        if(itemFadeOut){
            $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+')').css({ opacity: 1 });
            $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+')').delay(itemDelayOut).animate({
                    opacity: 0
                  }, itemOutDuration, function() {
                    if(!itemSlide){
                        $strip.css({ left: newPos });                       
                    }                   
            });
        }
        
        if(itemFadeIn){
            $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+')').css({ opacity: 0 });
            $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+')').delay(itemDelayIn).animate({
                    opacity: 1
                  }, itemInDuration, function() {                       
            });
        }
        
        if(itemSlide){
            $strip.delay(itemDelayIn).animate({
                left: newPos
              }, itemInDuration, 'swing', function() {                  
            });         
        }
        
        
        
        //box out animation
        if(boxSlideOut || boxFadeOut){
            var boxAnimOutObj = new Object();
    
            if(boxSlideOut){
                $previousHeader.css('left', 0);
                boxAnimOutObj.left = previousHeaderWidth*-1;
            }
    
            $previousHeader.delay(boxDelayOut).animate(
                boxAnimOutObj
              , boxOutDuration, 'swing', function() {
            });
        }
        
        //box in animation
        if(boxSlideIn || boxFadeIn){
            var boxAnimInObj = new Object();

            if(boxSlideIn){
                $selectedHeader.css('left', selectedHeaderWidth*-1);
                boxAnimInObj.left = 0;
            }            

            $selectedHeader.delay(boxDelayIn).animate(
                boxAnimInObj
              , boxInDuration, 'swing', function() {
            });
            
        }
        
        //title out animation
        if(titleSlideOut || titleFadeOut){
            var titleAnimOutObj = new Object();
            
            if(titleSlideOut){
                $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+') article h1').css('left', 0);
                titleAnimOutObj.left = previousHeaderWidth*-1;
            }
            
            if(titleFadeOut){
                $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+') article h1').css({ opacity: 1 });
                titleAnimOutObj.opacity = 0;
            }
            
            $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+') article h1').delay(titleDelayOut).animate(
                    titleAnimOutObj
                  , titleOutDuration, 'swing', function() {                     
            });
            
        }
        
        
        //title in animation
        if(titleSlideIn || titleFadeIn){
            var titleAnimInObj = new Object();
            
            if(titleSlideIn){
                $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article h1').css('left', selectedHeaderWidth*-1);
                titleAnimInObj.left = 0;
            }
            
            if(titleFadeIn){
                $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article h1').css({ opacity: 0 });
                titleAnimInObj.opacity = 1;
            }
            
            $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article h1').delay(titleDelayIn).animate(
                    titleAnimInObj
                  , titleInDuration, 'swing', function() {                      
            });
        }
        
        //subtitle out animation
        if(subTitleSlideOut || subTitleFadeOut){
            var subTitleAnimOutObj = new Object();
            
            if(subTitleSlideOut){
                $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article h2').css('left', 0);
                subTitleAnimOutObj.left = previousHeaderWidth*-1;
            }
            
            if(subTitleFadeOut){
                $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+') article h2').css({ opacity: 1 });
                subTitleAnimOutObj.opacity = 0;
            }
            
            $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+') article h2').delay(subTitleDelayOut).animate(
                    subTitleAnimOutObj
                  , subTitleOutDuration, false, 'swing', function() {                       
            });         
        }
        
        //subtitle in animation
        if(subTitleSlideIn || subTitleFadeIn){
            var subTitleAnimInObj = new Object();

            if(subTitleSlideIn){
                $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article h2').css('left', selectedHeaderWidth*-1);
                subTitleAnimInObj.left = 0;
            }
            
            if(subTitleFadeIn){
                $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article h2').css({ opacity: 0 });
                subTitleAnimInObj.opacity = 1;
            }
            
            $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article h2').delay(subTitleDelayIn).animate(
                    subTitleAnimInObj
                  , subTitleInDuration, false, 'swing', function() {                        
            });
            
        }

        //paragraph out animation
        if(paragraphSlideOut || paragraphFadeOut){
            var paragraphAnimOutObj = new Object();
            if(paragraphSlideOut){
                $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article p').css('left', 0);
                paragraphAnimOutObj.left = previousHeaderWidth*-1;
            }
            if(paragraphFadeOut){
                $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+') article p').css({ opacity: 1 });
                paragraphAnimOutObj.opacity = 0;
            }
            $('#featureAnimated #strip li:nth-child('+(previousIndex+1)+') article p').delay(paragraphDelayOut).animate(
                paragraphAnimOutObj
                , paragraphOutDuration, false, 'swing', function() {
            });
        }
        
        //paragraph in animation
        if(paragraphSlideIn || paragraphFadeIn){
            var paragraphAnimInObj = new Object();
            if(paragraphSlideIn){
                $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article p').css('left', selectedHeaderWidth*-1);
                    paragraphAnimInObj.left = 0;
            }
            if(paragraphFadeIn){
                $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article p').css({ opacity: 0 });
                paragraphAnimInObj.opacity = 1;
            }
            $('#featureAnimated #strip li:nth-child('+(selectedIndex+1)+') article p').delay(paragraphDelayIn).animate(
                paragraphAnimInObj
                , paragraphInDuration, false, 'swing', function() {
            });
        }
        
        toggleButtons();    
    }
    
    function positionControls(){
        $('#featureControls').css('left', (singleWidth*0.5)-($('#featureControls').innerWidth()*0.5));
    }
        
    function toggleButtons(){
        if (typeof pageWidth === "undefined"){
            return;
        }
    
        if((timed) &&  (pageWidth != MOBILE)){
            window.clearInterval(intervalID);
            intervalID = null;
            intervalID = window.setTimeout(function() { advance(true); }, switchDelay); 
        }
        
        $('#stage .dots li a.selected').toggleClass('selected');
        $('#stage .dots li:nth-child('+(selectedIndex+2)+') a').toggleClass('selected');
        
        if(!wrapAround){
                    
            if(selectedIndex+1 < numItems){
                 $('a.rightArrow').fadeIn();
            }else{
                $('a.rightArrow').fadeOut();
            }

            if(selectedIndex > 0){
                 $('a.leftArrow').fadeIn();
            }else{
                $('a.leftArrow').fadeOut();
            }
        }
        
        positionControls();
      }
      
      function resizeFeature(){          
            setSingleWidth();
            totalWidth = singleWidth*numItems;
            positionControls();
            toggleButtons();
            animateFeature();        
    }

    function setSingleWidth(){       
        singleWidth = $featureItems.filter(':first').outerWidth();
    }
      
    function resetFeature(){
        selectedIndex = 0;
        previousIndex = -1;
        
        $('#stage .dots li a.selected').toggleClass('selected');
        $('#stage .dots li:nth-child('+(selectedIndex+2)+') a').toggleClass('selected');
    
        $('#strip').stop(true, true);
        $('#strip').css('left', 0);
        $('#featureAnimated #strip li').stop(true, true);
        $('#featureAnimated #strip li').css('left', 0);
        $('#featureAnimated #strip li').css({ opacity: 1 });
        $('#featureAnimated #strip li article').stop(true, true);
        $('#featureAnimated #strip li article').css('left', 0);
        $('#featureAnimated #strip li article').css({ opacity: 1 });
        $('#featureAnimated #strip li article h1').stop(true, true);
        $('#featureAnimated #strip li article h1').css('left', 0);
        $('#featureAnimated #strip li article h1').css({ opacity: 1 });
        $('#featureAnimated #strip li article h2').stop(true, true);
        $('#featureAnimated #strip li article h2').css('left', 0);
        $('#featureAnimated #strip li article h2').css({ opacity: 1 });
        $('#featureAnimated #strip li article p').stop(true, true);
        $('#featureAnimated #strip li article p').css('left', 0);
        $('#featureAnimated #strip li article p').css({ opacity: 1 });
    }
    
    $('body').bind("fontresize", function (event, data) {
        if (typeof pageWidth === "undefined"){
            return;
        }
        if(pageWidth != MOBILE){
            resizeFeature();
        }else{
            resetFeature();
        }
    });

   $('body').bind("pageWidth.changed", function(event, w) {
         if(timed){
            window.clearInterval(intervalID);
            intervalID = null;
         } 
 
        if(w != MOBILE){
            resizeFeature();
        }else{
            resetFeature();
        }
    });
      
    function init() {
        var iBase = TextResizeDetector.addEventListener(onFontResize,null);
    }      
     
    function onFontResize(e,args) {
        if (typeof pageWidth === "undefined"){
            return;
        }
        if(pageWidth != MOBILE){
            resizeFeature();
        }else{
            resetFeature();
        }
    }
    
    //id of element to check for and insert control
    TextResizeDetector.TARGET_ELEMENT_ID = 'featureAnimated';
    //function to call once TextResizeDetector has init'd
    TextResizeDetector.USER_INIT_FUNC = init; 
    

    
});