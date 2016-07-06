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

function isScrolledTo(elem) {
  var docViewTop = $(window).scrollTop(); //num of pixels hidden above current screen
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top; //num of pixels above the elem
  var elemBottom = elemTop + $(elem).height();

  return ((elemTop <= docViewTop));
}
function scrollfunc() {
  var catcher = $('.crumbs');
  var sticky = $('.tab-container');

  if (isScrolledTo(sticky)) {
      sticky.css('position','fixed');
      sticky.css('top',$('.header-pane').outerHeight(true));
  }
  var stopHeight = catcher.offset().top + catcher.height();
  if ( stopHeight > sticky.offset().top) {
      sticky.css('position','absolute');
      sticky.css('top',stopHeight);
  }
}

function setScrollForLinks() {
  var sticky = $('.tab-container');
  $(window).on('resize', function(e) {
    $(window).off('scroll');
    if ($(window).width() < 600) {
      sticky.css('position', 'static');
    } else {
      $(window).scroll(scrollfunc);
      $(window).scroll();
    }
  });
  $(window).resize();
}

function onPopupBtnClick(event) {
  event.stopPropagation();
  $('.popup-panel').css('display', 'none');
  var className = event.target.className.split('-')[0];
  if ($('.' + className + '-popup').length == 0) {
    //console.log('No popup for button ',event.target.className);
    return;
  }
  var elem = $('.' + className + '-popup');
  var popupW, popupH;
  elem.css("position", "absolute");
  elem.css('display', 'inline');
  popupW = elem[0].clientWidth;
  //popupH = elem[0].clientHeight - 30;
  elem.css('top', event.pageY + 20);//arrow(after element) width
  var leftpos = event.pageX - popupW/2 - 20;
  var rightPos = event.pageX + popupW/2;
  if (leftpos <= 0) {
    leftpos =  event.pageX - 20;
    elem.addClass('popup-left-arrow');
  } else {
    elem.removeClass('popup-left-arrow');
    if ($(document).width() <= rightPos) {
      leftpos = event.pageX - popupW + 40;
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
  var tagpane = $(elem).find('.product-tags');

  var tagPaneHeight = elem.clientHeight - tagpane.prevAll().height() - 50;
  if (tagpane.parents().find('.little-block'))
    tagPaneHeight += 20;
  tagpane.height(tagPaneHeight);
  tagpane.slideToggle(function() {
    if (tagpane.is(':visible')) {
      $(elem).find('.product-view-reviews').removeClass('white');
    } else {
      $(elem).find('.product-view-reviews').addClass('white');
    }
  });
}

function onTitleClick(event) {
  var el = event.target;
  var parent = $(el).parents('.title-with-arrow')[0];
  $(parent.nextElementSibling).slideToggle();
  var arrow = $(parent).find('.title-arrow')[0];
  if (arrow.className.indexOf('left') != -1) {
    $(arrow).removeClass('arrow-left');
    $(arrow).addClass('arrow-down');
  } else {
    $(arrow).addClass('arrow-left');
    $(arrow).removeClass('arrow-down');
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

function centerLogoInCircles() {
  $('.logo-in-circle').each(function() {
    var pheight = this.parentNode.clientHeight;
    var pwidth = this.parentNode.clientWidth;
    var margin = pheight - $(this).height();
    $(this).css('marginTop', margin/2);
    $(this).css('marginleft', (pwidth - $(this).width())/2);

  })
}

function initCarousel(carousel) {
    $('.carousel li img').click(function(evt) {
      if (evt.target.tagName != 'IMG')
        return;
      try {
        evt.preventDefault();
        $('.carousel li img').removeClass('selected');
        document.getElementById('selected-image').src = evt.target.src;
        $(evt.target).addClass('selected');
      } catch (e) {
        //console.log('error while selecting image in carousel:', e);
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

function onSearchKeyup(value) {
  var resultPane = document.getElementsByClassName('searchresult-pane')[0];
  $('.result-item').remove();
  if (value.length == 0) {
    resultPane.style.display = 'none';
    return;
  }

  var appList = [
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description.App Name 1 short description.App Name 1 short description.App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
    {'name': 'App Name1', 'description': 'App Name 1 short description'},
  ];
  value = value.toLowerCase();
  var counter = 0;
  for (var i = 0; i < appList.length; i++) {
    if (appList[i]['name'].toLowerCase().indexOf(value) != -1 ||
      appList[i]['description'].toLowerCase().indexOf(value) != -1) {
      counter++;
      var childElem = document.createElement('div');
      childElem.className = 'result-item flex-block';
      resultPane.appendChild(childElem);
      var infoElem = document.createElement('div');
      infoElem.className = 'result-item-info-block';
      childElem.appendChild(infoElem);
      var nameElem = document.createElement('span');
      nameElem.className = 'result-item-name';
      nameElem.innerText = appList[i]['name'];
      infoElem.appendChild(nameElem);
      var desc = document.createElement('p');
      desc.className = 'result-item-decription';
      desc.innerText = appList[i]['description'];
      infoElem.appendChild(desc);
      var btn = document.createElement('div');
      btn.className = 'claim-business-btn';
      btn.innerText = 'Claim Your Business';
      childElem.appendChild(btn);
    }
  }
  if (counter > 0){
    resultPane.style.display = 'block';
    $(window).on('resize', function(e) {
      $('.searchresult-pane').width($('.hero-search').width());
      $('.searchresult-pane').css('paddingTop', $('.hero-search').height());
      $('.result-item-info-block').width($('.searchresult-pane').width() - $('.claim-business-btn').width() - 20);
    });
    $(window).resize();
  } else {
    resultPane.style.display = 'none';
  }
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

    $(window).on('resize', function(e) {
      $('.app-page-block-footer').width($('.app-page-block-footer').parent().width());
      // $('.app-page-block-footer').parent().css('paddingBottom', $('.app-page-block-footer').height());
      centerLogoInCircles();
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
      //console.log('error while click on view btn', e);
    }


    if  ($('.tab-container').length > 0) {
      setScrollForLinks();
    }


    var carousel = document.getElementById('carousel');
    if (carousel != undefined)
      initCarousel(carousel);


    $('.repost-btn').on('click', onPopupBtnClick);
    $('.actions-btn').on('click', onPopupBtnClick);
    $('.tag-btn').on('click', onTagBtnClick);
    $('.title-with-arrow').on('click', onTitleClick);

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

  $('.js-show-tag').on('click', function(e) {
    e.preventDefault();
    $(this).parent().prev('.category-card__tags').slideToggle();
  });

  $('.js-delete-row').on('click', function() {
    $(this).parent().parent('tr').remove();
  });

  $('.js-show-popup').on('click', function() {
    $('body').addClass('popup-shown');
  });

  $('.cover').on('click', function() {
    $('body').removeClass('popup-shown');
  });

  $('.js-popup-close').on('click', function() {
    $('body').removeClass('popup-shown');
  });

});

$('.tagslider').bxSlider({
  pager: false
});


$('#option1,#option2,#option3,#option4,#option5').slider({
  orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127
});
