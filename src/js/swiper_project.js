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
