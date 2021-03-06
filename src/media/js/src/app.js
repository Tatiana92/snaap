function onLinkClicked(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  var className = evt.target.className.replace(' selected', '').split(' ')[0];
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
    console.log('No popup for button ',event.target.className);
    return;
  }
  var elem = $('.' + className + '-popup');
  var popupW, popupH;
  elem.css({'position': 'absolute', 'display': 'inline'});
  w = $(window);
  clientWidth = w.width()+w.scrollLeft();
  clientHeight = w.height()+w.scrollTop();
  button = $(this);
  buttonTop = button.offset().top;
  buttonLeft = button.offset().left;
  buttonWidth = button.width();
  buttonHeight = button.height();
  popupWidth = elem.innerWidth();
  popupHeight = elem.innerHeight();
  popupLeft = buttonLeft + (buttonWidth/2) - (popupWidth / 2) ;
  popupTop = buttonTop + buttonHeight + 10;
  elem.removeClass('popup-right-arrow');
  elem.removeClass('popup-left-arrow');
  elem.removeClass('popup-bottom-arrow');
  if( clientHeight > popupTop + popupHeight ) {
    elem.css('top', popupTop + 'px');
  } else {
    popupTop = buttonTop - popupHeight - 10;
    elem.css('top', popupTop + 'px');
    elem.addClass('popup-bottom-arrow');
  }
  if( popupLeft < 0 ){
    popupLeft = buttonLeft - buttonWidth / 2;
    elem.css('left', popupLeft);
    elem.addClass('popup-left-arrow');
  } else if( popupLeft + popupWidth > clientWidth ){
    popupLeft = buttonLeft - popupWidth + buttonWidth;
    elem.css('left', popupLeft);
    elem.addClass('popup-right-arrow');
  } else {
    elem.css('left', popupLeft);
  }
  
  
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

function onLabelItemClick(event) {
  var el = event.target;
  //var parent = $(el).parents('.app-page__label-group')[0];
  //$(parent).find('.app-page__label-item').removeClass('selected');
  $(el).parents('.app-page__label-item').addClass('selected');
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
 /* $('.logo-in-circle').each(function() {
    var pheight = this.parentNode.clientHeight;
    var pwidth = this.parentNode.clientWidth;
    var margin = pheight - $(this).height();
    $(this).css('marginTop', margin/2);
    $(this).css('marginleft', (pwidth - $(this).width())/2);

  })*/
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





function onExpandAnswerClick(event) {
  var btn = event.target;
  var parent = btn;
  if ($(document).find('.faq-answer').length == 0)
    return;
  while ($(parent).find('.faq-answer').length == 0) {
    parent = parent.parentNode;
  }
  var answerpane = $(parent).find('.faq-answer');
  answerpane.slideToggle();
  if ($(btn).hasClass('hide-answer')) {
    $(btn).removeClass('hide-answer');
  } else {
    $(btn).addClass('hide-answer');
  }
  /*var answerPaneHeight = elem.clientHeight - answerpane.prevAll().height() - 50;
  if (answerpane.parents().find('.little-block'))
    answerPaneHeight += 20;
  answerpane.height(answerPaneHeight);
  answerpane.slideToggle(function() {
    if (answerpane.is(':visible')) {
      $(elem).find('.product-view-reviews').removeClass('white');
    } else {
      $(elem).find('.product-view-reviews').addClass('white');
    }
  });*/
}



function onSearchKeyup(value) {
  if (value.length == 0) {
    $('.contenteditable-search-input span').remove();
  }
  $('.contenteditable-search-input span').css('fontWeight', '300');
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

function onUserTypeChanged(evt) {
  $('.registration-form').hide();
  $('.registration-type').removeClass('grey-btn');
  $(evt.target).addClass('grey-btn');
  if (evt.target.id.indexOf('vendor') != -1)
    $('.vendor-registration-form').show();
  else
    $('.user-registration-form').show();
}

function openMenu(event) {
  event.stopPropagation();
  $('.sidebar').addClass('show');
  $('.all-page-content').addClass('moved');
  $('.all-page-content').css('left', $('.sidebar').width());
  $(document).one('click', closeMenu);
  $('.main-menu').one('click', closeMenu);
}

function closeMenu(e) {
  if (!$(e.target).closest('.sidebar').length && !$(e.target).is('.sidebar') || $(e.target).closest('.main-menu').length) {
    e.preventDefault();
    $('.sidebar').removeClass('show');
    $('.all-page-content').removeClass('moved');
    $(document).off('click', closeMenu);
    $('.main-menu').off('click', closeMenu);
  } else {
    $(document).one('click', closeMenu);
  }
}


function onProfilePageSelectorClick(event) {
  var link = event.target;
  var blockId = link.id + '-block';
  $('.page-info-block').hide();
  $('#' + blockId).show();
}


function onProfilePageAccountBtnClick(event) {
  var link = event.target;
  var blockId = link.id + '-block';
  $('.profile-page-account-block').hide();
  $('#' + blockId).show();
  $('.profile-page-account-btn').removeClass('selected');
  event.target.className += ' selected';
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
      //$('.title-pane').css('marginTop', $('.header-pane').height());
      // $('.app-page-block-footer').parent().css('paddingBottom', $('.app-page-block-footer').height());
      centerLogoInCircles();
    });

    $(window).resize();

    $('.main-menu').on('click', function(event) {
      event.stopPropagation();
      $('.sidebar').addClass('show');
      $('.all-page-content').addClass('moved');
      $('.all-page-content').css('left', $('.sidebar').width());
      $(document).one('click', closeMenu);
      $('.main-menu').one('click', closeMenu);
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
    $('.expand-answer-btn').on('click', onExpandAnswerClick);
    
    $('.title-with-arrow').on('click', onTitleClick);
    $('.registration-type').on('click', onUserTypeChanged);
    try {
      $('.registration-type')[0].click();
    } catch(e) {
      
    }

    $('.app-page__label-item').on('click', onLabelItemClick);

    try {
      $('.profile-page-selector-js').on('click', onProfilePageSelectorClick);
      $('.profile-page-selector-js')[0].click();
    } catch(e) {
      
    }
    try {
      $('.profile-page-account-btn').on('click', onProfilePageAccountBtnClick);
      $('.profile-page-account-btn')[0].click();
    } catch(e) {
      
    }

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
