function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

$(document).ready(function() {
  // Check if element is scrolled into view
  console.log(`------------- Animations --------------`);

  const animatedImages = $('.scroll-animations.animated');

  // If element is scrolled into view, fade it in
  $(window).scroll(function() {
    $(animatedImages).each(function() {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass('fadeInUpBig');
        $(this).css('visibility', 'visible');
      }
    });
  });
}); // Document Ready
