/* Author: sawenri */

var pageWidth;
var HOME = false;

var DESKTOP = 960;
var DESKTOPWITHSCROLL = 940;
var TABLET = 768;
var TABLETWITHSCROLL = 748;
var MOBILE = 480;

var sectionHeading;
var mainHeading;

$(document).ready(function(e) {
    
    sectionHeading = $('#sectionHeading').html();
    mainHeading = $('#mainHeading').text();
    
    if (($('#contextNav').length == 0) && ($('#subNav').length == 0)){
        $('.navLinkMobile').hide();
    }
    
    
    if($('#sideBar').length != 0){
        $('#content').addClass('hasSideBar');   
    }
    
    if(($('#feature').length != 0) || ($('#featureAnimated').length != 0) || ($('#featureStatic').length != 0)){
        $('#content').addClass('hasFeature');   
    }
    
    if($('#contextNav').length != 0){
        $('#contentWrapper').addClass('hasContextNav'); 
        $('#headingsWrapper').addClass('hasContextNav');    
        $('#featureAnimated').addClass('hasContextNav'); 
        $('#featureAnimated article').css('top', "115px"); 
        $('#featureStatic').addClass('hasContextNav');  
        //$('#featureStatic article').css('top', "115px"); 
        $('#feature').addClass('hasContextNav');  
        
        if ($.browser.msie && parseInt($.browser.version, 10) === 8) {      
            if($('#content').hasClass('hasFeature')){
                window.setTimeout(function() { window.scroll(0, 1); }, 500); 
            }
        }    
    }
    
    $('body').ActivePage();
    
    $('.featuretteHover .openClose').click(function(){
        $(this).closest('.featuretteHover').toggleClass('open');
        $(this).closest('.featuretteHover').toggleClass('closed');  
    });
    
   if($.browser.msie && $.browser.version <= 9.0){
        $('.featuretteHover').each(function(){
            $(this).find('article>div').each(function(){
                $caption = $(this).find('div');
                $caption.css('display', 'none');
                $caption.css('max-height', '200px');
                $(this).parent().parent().hover(
                    function(){
                        $(this).find('div div:first').stop(true, true).slideDown(500, function() {
                        });
                    },
                    function(){
                        $(this).find('div div:first').stop(true, true).slideUp(500, function() {
                        });
                    }
                );
            });
        });
    }
    
     $(window).resize(function() {
        checkPageWidth($(window).width());
    });
    
    // RESPONSIVENESS!!!
    checkPageWidth($(window).width()); 
    
});

function configureContextNav(){ 
    switch (pageWidth) {
        case DESKTOP:
            $('#contextNav ul.active').remove();
            break;
        case TABLET:
        default:
            if($('#contextNav ul.active').length == 0){
                $context = $('#contextNav ul.current');
                $clone = $context.clone();
                $clone.addClass('active')
                $clone.appendTo('#contextNav');

            }
    }
}

function checkPageWidth(width) {
    
    //console.log(width);
    
    var target; 
    
    switch(true){
        case  (width >= DESKTOP):
        case ((width >= DESKTOPWITHSCROLL) && (width > TABLET)):
            target = DESKTOP;
            break;
        case (width >= TABLET):
        case ((width >= TABLETWITHSCROLL) && (width < TABLET)):
            target = TABLET;
            break;
        case (width <= MOBILE):
            target = MOBILE;
            break;  
        default:
            target = MOBILE;                
    }

    if(target!=pageWidth){
        pageWidth = target;
        
        $('#subNavHeader').remove();
        
        switch (pageWidth) {
            case DESKTOP:
                $("header").after($('#subNav'));
                $("#headingsWrapper").after($('#contextNav'));
                $("#mainHeading").before($('#social'));
                $("#banner").append($('#search'));
                $("#banner").append($('#tools'));               
                $("header").append($('#mainNav'));  
                $("#colophonLinks").prepend($('#colophonCopyright'));
                $('.navLinkMobile').hide();   
                 $('.navLink').hide();     
                break;
            case TABLET:
                if($('#contextNav').length != 0){
                    $("footer").before($('#contextNav'));
                    $('.navLink').show();
                     $('.navLinkMobile').hide();
                }else{
                     $('.navLink').hide();
                    $('.navLinkMobile').hide();
                }
                $("header").after($('#subNav'));    
                $("#mainHeading").before($('#social'));
                $("#banner").append($('#search'));
                $("#banner").append($('#tools'));
                $("#colophonLinks").before($('#colophonCopyright'));
                break;
            default:  
                if($('#contextNav').length != 0){       
                    $("footer").before($('#contextNav'));
                    $('.navLinkMobile').show();
                }       
                if($('#subNav').length != 0){
                    if(sectionHeading){
                        $("footer").before($('<h4 id="subNavHeader">'+sectionHeading+'</h4><a name="navigation"/>'));
                    }
                    $("footer").before($('#subNav'));
                    $('.navLinkMobile').show();
                }   
                 $('.navLink').hide();            
                $("footer").before($('#social'));
                $("footer").before($('#search'));
                $("header").after($('#tools'));
                $("#colophonLinks").before($('#colophonCopyright'));
        }

        if($('#contextNav').length != 0){
            configureContextNav();
        }

        if($.browser.msie && $.browser.version <= 9.0){
            $('.fourFeaturetteRow .fourCol .featuretteHover').each(function(){
                $(this).find('article>div').each(function(){
                    $caption = $(this).find('div');
                    $caption.css('display', 'block');
                    $caption.css('max-height', '200px');
                    $(this).parent().parent().unbind('mouseenter').unbind('mouseleave');
                });
            });
            if(pageWidth != TABLET){
                $('.fourFeaturetteRow .fourCol .featuretteHover').each(function(){
                    $(this).find('article>div').each(function(){
                        $caption = $(this).find('div');
                        $caption.css('display', 'none');
                        $caption.css('max-height', '200px');
                        $(this).parent().parent().hover(
                            function(){
                                $(this).find('div div:first').stop(true, true).slideDown(500, function() {
                                });
                            },
                            function(){
                                $(this).find('div div:first').stop(true, true).slideUp(500, function() {
                                });
                            }
                        );
                    });
                });
            }
        }
        
        function triggerPageWithChangedEvent(){
            window.clearTimeout(resizeTimeout);
            $("body").trigger("pageWidth.changed",[pageWidth]);
         }         
         
         resizeTimeout = window.setTimeout(triggerPageWithChangedEvent, 250);
         
         // For IE7 not linking entire <a> in features
        $('.ie7 #featureAnimated #strip a').click(function(e){
           ie7FeatureRedirect($(this));
         });
  
        $('.ie7 #featureStatic a').click(function(e){
           ie7FeatureRedirect($(this));
        });  
  
        function ie7FeatureRedirect(el){
      
           var base = window.location.href;
           var host = window.location.hostname;
           var path = window.location.pathname;
           var proto = window.location.protocol;

           var href = el.attr('href');
      
           if(href !== "#"){
               var newLoc;         
               var str = href.substr(0,4);
               if(str === 'http'){
                   newLoc = href;
               }else{
                   str = str.substr(0,1); 
                   if(str === '/'){
                       newLoc = proto+'//'+host+href;
                   }else{
                       if(str === '#'){
                           newLoc = proto+'//'+host+path+href;
                       }else{      
                           base = base.substring(0, base.lastIndexOf("/")+1);
                           newLoc = base+href;
                       }
                   }
               }          
               window.location = newLoc;
           }       
       }

    }
}