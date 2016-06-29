/*!
 * App
 * [Date here]
 */





function changeView(evt) {
    var btns = document.getElementsByClassName('view-icon');
    for (var i = 0; i < btns.length; i++) {
        btns[i].className = btns[i].className.replace(' selected', '');
    }
    var elem = evt.target;
    while (elem.className.indexOf('view-icon') == -1) {
        elem = elem.parentNode;
    }
    elem.className += ' selected';
}

// Note: Use 'search & replace' to rename 'App' to current project name an delete this note
var App = new (function App() {

    this.dom = {
        $window: $(window),
        $document: $(document)
    };

    this.env = {
        mobileMode: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    };

    this.modules = {};
    this.utils = {};

    // Base inits here:
    CSSPlugin.defaultTransformPerspective = 300;

    // DOM-Ready inits:
    var self = this;
    $(function() {
        self.dom.$body = $('body');
        self.dom.$html = $('html');

        // Modules init here
        self.modules.SVGSprites.init();

        $('.main-menu').on('click', function (event) {
            event.stopPropagation();
            $('.sidebar').addClass('show');
            $(document).one('click', function closeMenu (e){
                if(!$(e.target).closest('.sidebar').length && !$(e.target).is('.sidebar')) {
                    $('.sidebar').removeClass('show');
                } else {
                    $(document).one('click', closeMenu);
                }
            });
        });
        try {
            document.getElementsByClassName('view-icon')[0].click();
        } catch (e) {
            console.log('error while click on view btn', e);
        }
        $('.repost-btn').on('click', function (event) {
            //$(document).ready(function(){
            event.stopPropagation();
            $('.repost-popup').css('left',event.target.x-150);      // <<< use pageX and pageY
            $('.repost-popup').css('top',event.target.y+30);
            $('.repost-popup').css('display','inline');
            $(".repost-popup").css("position", "absolute");  // <<< also make it absolute!
            $(document).one('click', function closeMenu (e){
                $('.repost-popup').css('display','none');
            });
            $(window).one('resize', function closeMenu (e){
                $('.repost-popup').css('display','none');
                $(document).off('click');
            });
        });
        //});

    });
})();

App.modules.SVGSprites = {
    init: function() {
        var self = this;
        $.get('media/svg/sprite.svg', function(data) {
            $('<div style="width:0; height:0; overflow:hidden"></div>').prependTo(App.dom.$body).html(self.serializeXml(data.documentElement));
        });
    },
    serializeXml: function(xmldom) {
        if (typeof XMLSerializer != 'undefined') {
            return (new XMLSerializer()).serializeToString(xmldom);
        } else {
            return $(xmldom).html();
        }
    }
};

jQuery(document).ready(function($) {

  if($('.logo-slider').length) {

    setInterval(function () {
      moveRight();
    }, 3000);

    var slideCount = $('.logo-slider li').length;
    var slideWidth = $('.logo-slider li').outerWidth();
    var slideHeight = $('.logo-sliderl li').height();
    var sliderUlWidth = slideCount * slideWidth;

    // $('.logo-slider-').css({ width: slideWidth, height: slideHeight });
    $('.logo-slider').css({ width: sliderUlWidth, marginLeft: '-136px' });
    $('.logo-slider li:last-child').prependTo('.logo-slider');

    function moveLeft() {
      $('.logo-slider').animate({
          left: + slideWidth
      }, 200, function () {
          $('.logo-slider li:last-child').prependTo('.logo-slider');
          $('.logo-slider').css('left', '');
      });
    };

    function moveRight() {
        $('.logo-slider').animate({
            left: - slideWidth
        }, 200, function () {
            $('.logo-slider li:first-child').appendTo('.logo-slider');
            $('.logo-slider').css('left', '');
        });
    };

  }

});
