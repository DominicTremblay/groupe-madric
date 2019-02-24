$(document).ready(function() {
  let didScroll;
  let lastScrollTop = 0;
  const delta = 1;
  const navbarHeight = $('.ui.top.fixed.menu').outerHeight();
  const headerHeight = $('header.ui.segment').outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
    hasScrolled();
  });

  // setInterval(function() {
  //   if (didScroll) {
  //     hasScrolled();
  //     didScroll = false;
  //   }
  // }, 4000);

  function hasScrolled() {
    let scrollTop = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.

    if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
      // if (scrollTop > lastScrollTop) {
      // Scroll Down
      console.log('scroll-down');

      $('.ui.top.fixed.menu')
        .removeClass('nav-down')
        .addClass('nav-up');
    } else {
      // Scroll Up
      if (scrollTop + $(window).height() < $(document).height()) {
        console.log('scroll up');
        console.log({ scrollTop }, { lastScrollTop }, { navbarHeight });

        $('.ui.top.fixed.menu')
          .removeClass('nav-up')
          .addClass('nav-down');

        if (scrollTop > headerHeight) {
          $('.ui.top.fixed.menu').addClass('undocked');
        } else {
          $('.ui.top.fixed.menu').removeClass('undocked');
        }
      }
    }

    lastScrollTop = scrollTop;
  }
}); // document.ready
