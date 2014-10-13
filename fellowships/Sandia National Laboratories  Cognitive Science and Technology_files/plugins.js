// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

/** 
 *  @fileoverview TextResizeDetector
 * 
 *  Detects changes to font sizes when user changes browser settings
 *  <br>Fires a custom event with the following data:<br><br>
 *  iBase  : base font size     
 *  iDelta : difference in pixels from previous setting<br>
 *      iSize  : size in pixel of text<br>
 *  
 *  * @author Lawrence Carvalho carvalho@uk.yahoo-inc.com
 * @version 1.0
 */

/**
 * @constructor
 */
TextResizeDetector = function() { 
    var el  = null;
    var iIntervalDelay  = 200;
    var iInterval = null;
    var iCurrSize = -1;
    var iBase = -1;
    var aListeners = [];
    var createControlElement = function() {
        el = document.createElement('span');
        el.id='textResizeControl';
        el.innerHTML='&nbsp;';
        el.style.position="absolute";
        el.style.left="-9999px";
        var elC = document.getElementById(TextResizeDetector.TARGET_ELEMENT_ID);
        // insert before firstChild
        if (elC)
            elC.insertBefore(el,elC.firstChild);
        iBase = iCurrSize = TextResizeDetector.getSize();
    };

    function _stopDetector() {
        window.clearInterval(iInterval);
        iInterval=null;
    };
    function _startDetector() {
        if (!iInterval) {
            iInterval = window.setInterval('TextResizeDetector.detect()',iIntervalDelay);
        }
    };
    
     function _detect() {
        var iNewSize = TextResizeDetector.getSize();
        
        if(iNewSize!== iCurrSize) {
            for (var    i=0;i <aListeners.length;i++) {
                aListnr = aListeners[i];
                var oArgs = {  iBase: iBase,iDelta:((iCurrSize!=-1) ? iNewSize - iCurrSize + 'px' : "0px"),iSize:iCurrSize = iNewSize};
                if (!aListnr.obj) {
                    aListnr.fn('textSizeChanged',[oArgs]);
                }
                else  {
                    aListnr.fn.apply(aListnr.obj,['textSizeChanged',[oArgs]]);
                }
            }

        }
        return iCurrSize;
    };
    var onAvailable = function() {
        
        if (!TextResizeDetector.onAvailableCount_i ) {
            TextResizeDetector.onAvailableCount_i =0;
        }

        if (document.getElementById(TextResizeDetector.TARGET_ELEMENT_ID)) {
            TextResizeDetector.init();
            if (TextResizeDetector.USER_INIT_FUNC){
                TextResizeDetector.USER_INIT_FUNC();
            }
            TextResizeDetector.onAvailableCount_i = null;
        }
        else {
            if (TextResizeDetector.onAvailableCount_i<600) {
                TextResizeDetector.onAvailableCount_i++;
                setTimeout(onAvailable,200)
            }
        }
    };
    setTimeout(onAvailable,500);

    return {
            /*
             * Initializes the detector
             * 
             * @param {String} sId The id of the element in which to create the control element
             */
            init: function() {
                
                createControlElement();     
                _startDetector();
            },
            /**
             * Adds listeners to the ontextsizechange event. 
             * Returns the base font size
             * 
             */
            addEventListener:function(fn,obj,bScope) {
                aListeners[aListeners.length] = {
                    fn: fn,
                    obj: obj
                }
                return iBase;
            },
            /**
             * performs the detection and fires textSizeChanged event
             * @return the current font size
             * @type {integer}
             */
            detect:function() {
                return _detect();
            },
            /**
             * Returns the height of the control element
             * 
             * @return the current height of control element
             * @type {integer}
             */
            getSize:function() {
                    var iSize;
                    return el.offsetHeight;
                
                
            },
            /**
             * Stops the detector
             */
            stopDetector:function() {
                return _stopDetector();
            },
            /*
             * Starts the detector
             */
            startDetector:function() {
                return _startDetector();
            }
    }
 }();

TextResizeDetector.TARGET_ELEMENT_ID = 'doc';
TextResizeDetector.USER_INIT_FUNC = null;

// place any jQuery/helper plugins in here, instead of separate, slower script files.

//ActivePage v0.2
//jQuery Plug-in used to add .selected class to the li parent of every <a>'s href which matches window.location
// Steve Wenrich (sawenri@sandia.gov) 1/16/2011

(function( $ ){
  $.fn.ActivePage = function() {
  
  $("a[href='" + window.location.href+ "']").parent('li').addClass("current");
    
    var protocol = window.location.protocol;
    var hostName = window.location.hostname;
    var pathName = window.location.pathname;

    var rootAddress = protocol+"//"+hostName+"/";
    
    $("a[href='" +pathName+ "']").parent('li').addClass("current");
    
    var ancestry = pathName.split('/');
    
    var ancestorPath = "";
    
    for(i=0; i<ancestry.length; i++){
        //console.log(ancestry[i]);
        $("a[href='" +ancestry[i]+ "']").parent('li').addClass("current");
        $("a[href='" +ancestry[i]+ "/']").parent('li').addClass("current");
        $("a[href='" +ancestry[i]+ "/index.html']").parent('li').addClass("current");
        $("a[href='" +ancestry[i]+ "/index.htm']").parent('li').addClass("current");
        $("a[href='" +ancestry[i]+ "/index.php']").parent('li').addClass("current");
        $("a[href='" +ancestry[i]+ "/default.html']").parent('li').addClass("current");
        $("a[href='" +ancestry[i]+ "/default.htm']").parent('li').addClass("current");
        $("a[href='" +ancestry[i]+ "/default.asp']").parent('li').addClass("current");
        $("a[href='" +ancestry[i]+ "/default.aspx']").parent('li').addClass("current");

        $("a[href='" +rootAddress+ancestry[i]+ "']").parent('li').addClass("current");
        $("a[href='" +rootAddress+ancestry[i]+ "/index.html']").parent('li').addClass("current");
        $("a[href='" +rootAddress+ancestry[i]+ "/index.htm']").parent('li').addClass("current");
        $("a[href='" +rootAddress+ancestry[i]+ "/index.php']").parent('li').addClass("current");
        $("a[href='" +rootAddress+ancestry[i]+ "/default.html']").parent('li').addClass("current");
        $("a[href='" +rootAddress+ancestry[i]+ "/default.htm']").parent('li').addClass("current");
        $("a[href='" +rootAddress+ancestry[i]+ "/default.asp']").parent('li').addClass("current");
        $("a[href='" +rootAddress+ancestry[i]+ "/default.aspx']").parent('li').addClass("current");
        
        $("a[href='/" +ancestry[i]+ "']").parent('li').addClass("current");
        $("a[href='/" +ancestry[i]+ "/']").parent('li').addClass("current");
        $("a[href='/" +ancestry[i]+ "/index.html']").parent('li').addClass("current");
        $("a[href='/" +ancestry[i]+ "/index.htm']").parent('li').addClass("current");
        $("a[href='/" +ancestry[i]+ "/index.php']").parent('li').addClass("current");
        $("a[href='/" +ancestry[i]+ "/default.html']").parent('li').addClass("current");
        $("a[href='/" +ancestry[i]+ "/default.htm']").parent('li').addClass("current");
        $("a[href='/" +ancestry[i]+ "/default.asp']").parent('li').addClass("current");
        $("a[href='/" +ancestry[i]+ "/default.aspx']").parent('li').addClass("current");
        
        $("a[href='../" +ancestry[i]+ "']").parent('li').addClass("current");
        $("a[href='../" +ancestry[i]+ "/']").parent('li').addClass("current");
        $("a[href='../" +ancestry[i]+ "/index.html']").parent('li').addClass("current");
        $("a[href='../" +ancestry[i]+ "/index.htm']").parent('li').addClass("current");
        $("a[href='../" +ancestry[i]+ "/index.php']").parent('li').addClass("current");
        $("a[href='../" +ancestry[i]+ "/default.html']").parent('li').addClass("current");
        $("a[href='../" +ancestry[i]+ "/default.htm']").parent('li').addClass("current");
        $("a[href='../" +ancestry[i]+ "/default.asp']").parent('li').addClass("current");
        $("a[href='../" +ancestry[i]+ "/default.aspx']").parent('li').addClass("current");
        
        ancestorPath += ancestry[i];
    
        $("a[href='" +ancestorPath+ "']").parent('li').addClass("current");
        $("a[href='" +ancestorPath+ "/']").parent('li').addClass("current");
        $("a[href='" +ancestorPath+ "/index.html']").parent('li').addClass("current");
        $("a[href='" +ancestorPath+ "/index.htm']").parent('li').addClass("current");
        $("a[href='" +ancestorPath+ "/index.php']").parent('li').addClass("current");
        $("a[href='" +ancestorPath+ "/default.html']").parent('li').addClass("current");
        $("a[href='" +ancestorPath+ "/default.htm']").parent('li').addClass("current");
        $("a[href='" +ancestorPath+ "/default.asp']").parent('li').addClass("current");
        $("a[href='" +ancestorPath+ "/default.aspx']").parent('li').addClass("current");
        
        ancestorPath += "/";
    }
    

  };
})( jQuery );

//Tabs v0.1
//jQuery Plug-in used to create tabbed interaction
// Steve Wenrich (sawenri@sandia.gov)
(function( $ ){
    $.fn.Tabs = function() {        
        this.click(function(event){
            $('.selectedTab').removeClass('selectedTab');
            $(this).toggleClass('selectedTab');
            $($(this).find('a').attr('href')).toggleClass('selectedTab');
            event.preventDefault();
        }); 
    };
})( jQuery );

//ExpandingItem v0.1
// Steve Wenrich (sawenri@sandia.gov) 9/7/2011

(function( $ ){
  $.fn.ExpandingItem = function() {
  
    var oldie = $('html').hasClass('oldie');
    var ie8 = $('html').hasClass('ie8');
    
    this.addClass('expandingItem');
    if(oldie && !ie8){
        this.prepend('<span class="expandingPrefix">+ </span>');
    }
    
    $(this.attr('href')).hide();

    this.parent().css('cursor', 'pointer');
    
    this.parent().click(function(event){
        $(this).find('a.expandingItem').toggleClass('expanded');
        changePrefix($(this).find('a.expandingItem'));
        $($(this).find('a.expandingItem').attr('href')).slideToggle('slow');
        event.preventDefault();  
    }); 
    
     function changePrefix($item){
        if(oldie && !ie8){
            if($item.hasClass('expanded')){
                    $item.find('.expandingPrefix').html('– ');
                }else{
                     $item.find('.expandingPrefix').html('+ ');
             }
        }
    }

  };
})( jQuery );

//ExpandingList v0.1
// Steve Wenrich (sawenri@sandia.gov) 8/30/2011

(function( $ ){
  $.fn.ExpandingList = function() {
  
   var oldie = $('html').hasClass('oldie');
   var ie8 = $('html').hasClass('ie8');
    
    this.addClass('expandingList');
    addPrefix();
    
    $('.expandingList>li>div').hide();
    
    $('.expandingList>li>*:first-child').click(function(){
        $(this).parent().toggleClass('expanded');
        changePrefix($(this).parent())
        $(this).parent().find('div:first').slideToggle('slow');
    });
    
    function addPrefix(){
        if(oldie && !ie8){
            $('.expandingList>li>*:first-child').prepend('<span class="expandingPrefix">+ </span>');
        }
    }
    
    function changePrefix($item){
        if(oldie && !ie8){
            if($item.hasClass('expanded')){
                    $item.find('.expandingPrefix').html('– ');
                }else{
                     $item.find('.expandingPrefix').html('+ ');
             }
        }
    }
    

  };
})( jQuery );


