let map;
initMap = () => {
  const location = { lat: 45.4439523, lng: -73.3343511 };
  map = new google.maps.Map(document.getElementById('contact-map'), {
    center: location,
    zoom: 13,
    disableDefaultUI: true
  });

  // var marker = new google.maps.Marker({ position: location, map: map });
};

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

$(document).ready(function() {
  $('.ui.inverted.button').on('click', function(e) {
    console.log('data: ', this.dataset.projet);
    const modal = document.getElementById('project-modal');

    // modal.innerHTML = 'lorem';
  });
});

window.onload = function() {
  function adjustSwiperHeight() {
    const swiperContainer = document.querySelector('.swiper-container');
    const swiperContainerHeight = getHeaderHeight() - getNavHeight();
    swiperContainer.style.height = swiperContainerHeight + 'px';
  }

  function getHeaderHeight() {
    return document.querySelector('header').clientHeight;
  }

  function getNavHeight() {
    return document.querySelector('nav').offsetHeight;
  }

  const options = {
    initialSlide: 0,
    direction: 'vertical',
    speed: 500,
    spaceBetween: 100,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false
    }
  };
  adjustSwiperHeight();
  const mySwiper = new Swiper('.swiper-container', options);
};

const IPHONE_5 = 320;
const IPHONE_6 = 375;
const IPHONE_6_PLUS = 414;
const IPAD = 768;
const IPAD_PRO = 1024;

window.onload = function() {
  const rowContainer = document.querySelector('.project-slider');
  const swiperContainer = document.querySelector(
    'div.swiper-container.project-item'
  );

  function adjustSwiperProjectsHeight() {
    console.log('window with: ', window.innerWidth);
    const swiperContainerHeight = rowContainer.clientHeight;
    if (window.innerWidth <= IPHONE_5) {
      swiperContainer.style.height = '20em';
      console.log('iphone 5: ', swiperContainer.style.height);
    } else if (window.innerWidth > IPHONE_5 && window.innerWidth <= IPHONE_6) {
      swiperContainer.style.height = '24em';
      console.log('iphone 6: ', swiperContainer.style.height);
    } else if (
      window.innerWidth > IPHONE_6 &&
      window.innerWidth <= IPHONE_6_PLUS
    ) {
      swiperContainer.style.height = '26em';
      console.log('iphone 6 plus: ', swiperContainer.style.height);
    } else if (window.innerWidth > IPHONE_6_PLUS && window.innerWidth <= IPAD) {
      swiperContainer.style.height = '44em';
      console.log('iPad: ', swiperContainer.style.height);
    } else if (window.innerWidth > IPAD && window.innerWidth <= IPAD_PRO) {
      swiperContainer.style.height = '40em';
      console.log('iPad Pro: ', swiperContainer.style.height);
    } else {
      swiperContainer.style.height = swiperContainerHeight - 40 + 'px';
    }
  }

  window.addEventListener('resize', function(event) {
    console.log('============== Change SIZE');
    adjustSwiperProjectsHeight();
  });

  const options = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 5000,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false
    }
  };

  adjustSwiperProjectsHeight();

  const mySwiper = new Swiper('.swiper-container', options);
};
