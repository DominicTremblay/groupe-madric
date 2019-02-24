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
