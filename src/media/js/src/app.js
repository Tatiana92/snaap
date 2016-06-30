/*!
 * App
 * [Date here]
 * Sborka Project
 */


function onLinkClicked(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  var className = evt.target.className.replace(' selected', '');
  $('.' + className).removeClass('selected');
  evt.target.className += ' selected';
  if ($('#' + evt.target.href.split('#')[1]).length > 0)
    $('html, body').animate({
        scrollTop: $('#' + evt.target.href.split('#')[1]).offset().top - $('.header-pane').outerHeight(true)
    }, 200);
}

function onPopupBtnClick(event) {
  event.stopPropagation();
  $('.popup-panel').css('display', 'none');
  var className = event.target.className.split('-')[0];
  if ($('.' + className + '-popup').length == 0) {
    console.log('No popup for button ',event.target.className);
    return;
  }
  var elem = $('.' + className + '-popup');
  var popupW, popupH;
  elem.css("position", "absolute");
  elem.css('display', 'inline');
  popupW = elem[0].clientWidth;
  popupH = elem[0].clientHeight - 20;
  elem.css('top', event.target.y + popupH);
  var leftpos = event.target.x - popupW/2;
  var rightPos = event.target.x + popupW/2;
  if (leftpos <= 0) {
    leftpos =  event.target.x - 20;
    elem.addClass('popup-left-arrow');
  } else {
    elem.removeClass('popup-left-arrow');
    if ($(document).width() <= rightPos) {
      leftpos = event.target.x - popupW + 40;
      elem.addClass('popup-right-arrow');
    } else {
      elem.removeClass('popup-right-arrow');
    }
  }
  elem.css('left', leftpos);
  $(document).one('click', function closeMenu(e) {
    $('.popup-panel').css('display', 'none');
  });
  $(window).one('resize', function closeMenu(e) {
    $('.popup-panel').css('display', 'none');
    $(document).off('click');
  });
}

function onTagBtnClick(event) {
  var elem = event.target;
  if ($(document).find('.product-tags').length == 0)
    return;
  while ($(elem).find('.product-tags').length == 0) {
    elem = elem.parentNode;
  }
  var tagPaneHeight = elem.clientHeight - $(elem).find('.product-tags').prevAll().height() - 50;

  $(elem).find('.product-tags').height(tagPaneHeight);
  $(elem).find('.product-tags').slideToggle();
}

function onFollowingBrandsClick(event) {
  $('#following-brands-block').slideToggle();
  var arrowClass = $('#following-brands-title .title-arrow')[0].className;
  if (arrowClass.indexOf('left') != -1) {
    $('#following-brands-title .title-arrow').removeClass('arrow-left');
    $('#following-brands-title .title-arrow').addClass('arrow-down');
  } else {
    $('#following-brands-title .title-arrow').addClass('arrow-left');
    $('#following-brands-title .title-arrow').removeClass('arrow-down');
  }
}

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


function initCarousel(carousel) { 
    $('.carousel li img').click(function(evt) {
      if (evt.target.tagName != 'IMG')
        return;
      try {
        document.getElementById('selected-image').src = evt.target.src;
      } catch (e) {
        console.log('error while selecting image in carousel:', e);
      }
      
    })
    $('.carousel .arrow').on('mouseover', function(evt) {
      this.src = "media/img/icons/arrow-bright.png";
    });
    $('.carousel .arrow').on('mouseout', function(evt) {
      this.src = "media/img/icons/arrow-light.png";
    });

    var count = 2;
    var gallery = document.getElementsByClassName('gallery')[0];
    var list = carousel.querySelector('ul');
    var listElems = carousel.querySelectorAll('li');
    var width = listElems[0].clientWidth + 20;
    var position = 0;

    carousel.querySelector('.prev').onclick = function() {
      var wid = Math.min(width * count, document.getElementById('carousel').clientWidth/2);
      position = Math.min(position + wid, 0)
      list.style.marginLeft = position + 'px';
      $('.carousel .next').css('opacity', '1');
      if (position == 0) {
        $('.carousel .prev').css('opacity', '0.3');
      }
    };

    carousel.querySelector('.next').onclick = function() {
      var wid = Math.min(width * count, document.getElementById('carousel').clientWidth/2);
      //if it will be ent of list, and there are last images at screen. we don't need scroll white area
      if (-gallery.clientWidth + position > -width * (listElems.length - count)) {
        position = Math.max(position - wid, -width * (listElems.length - count));
        list.style.marginLeft = position + 'px';
      } else {
         $('.carousel .next').css('opacity', '0.3');
      }
      $('.carousel .prev').css('opacity', '1');
    };

}

// Note: Use 'search & replace' to rename 'App' to current project name an delete this note
var App = new(function App() {

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

    $(window).on('resize', function closeMenu(e) {
      $('.title-pane').css('marginTop', $('.header-pane').outerHeight(true));
    });

    $(window).resize();

    $('.main-menu').on('click', function(event) {
      event.stopPropagation();
      $('.sidebar').addClass('show');
      $(document).one('click', function closeMenu(e) {
        if (!$(e.target).closest('.sidebar').length && !$(e.target).is('.sidebar')) {
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



    var carousel = document.getElementById('carousel');
    if (carousel != undefined)
      initCarousel(carousel);

    $('.repost-btn').on('click', onPopupBtnClick);
    $('.actions-btn').on('click', onPopupBtnClick);
    $('.tag-btn').on('click', onTagBtnClick);
    $('#following-brands-title').on('click', onFollowingBrandsClick);

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
