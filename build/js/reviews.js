$(document).ready(function(){

  var allReviews = [];

  function reviewsList(url, cb) {
    $.getJSON(url)
    .done(function(data) {
      cb(data)
    })
    .fail(function(err) {
      console.log("Error: ", err)
    });
  }

  function createReview(review) {

    var $containerDiv = $('<div>').addClass("ui icon message review");
    $('<i>')
      .addClass("smile outline orange icon")
      .appendTo($containerDiv);
  
    var $contentDiv = $('<div>').addClass('content');
    $('<div>')
      .addClass('header')
      .text([review.nom, review.ville, review.region]
        .filter(el => !!(el))
        .join(', '))
      .appendTo($contentDiv);
    $('<blockquote>')
      .append('<p>')
      .text(review.contenu)
      .appendTo($contentDiv);

    $containerDiv.append($contentDiv);
  
    return $containerDiv;
  }


  const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size))
      .fill().map((_, index) => index * chunk_size)
      .map(begin => array.slice(begin, begin + chunk_size));


  function createReviews(reviewsArr) {
    if (!reviewsArr) {
      console.log("Array over!")
      return false;
    }
    reviewsArr.forEach(function(review) {
      $('.temoignages-clients').append(createReview(review))
      removeLoader();
    })
  }

  function addLoader() {
    $containerDiv = $('<div>')
      .addClass('ui')
      .addClass('segment')
      .addClass('loader-el');

    $dimmerDiv = $('<div>')
      .addClass('ui')
      .addClass('active')
      .addClass('inverted')
      .addClass('dimmer');

    $('<div>')
      .addClass('ui')
      .addClass('text')
      .addClass('loader')
      .text('Chargement...')
      .appendTo($dimmerDiv);

    $containerDiv.append($dimmerDiv);

    $('<p>')
      .css('height','6em')
      .appendTo($containerDiv);

    return $containerDiv;
  }

  function removeLoader() {
      $('.ui.segment.loader-el').remove();
  }

  function addReviews(data) {
    allReviews = array_chunks(data, 3);
    window.readReviews = getReviewSlice(allReviews);
  }

  function getReviewSlice(reviews) {
    index = -1;
    return function() {
      index += 1;
      console.log(index, reviews.length)
      return index >= reviews.length ? false : reviews[index]
    }
  }

  reviewsList('./build/js/reviews.json', addReviews);


  
  $('.temoignages-clients')
  .visibility({
    once: false,
    // update size when new content loads
    observeChanges: true,
    // load content on bottom edge visible
    onBottomVisible: function() {
      // loads a max of 5 times
      // window.loadFakeContent();
      console.log("bottom visible")
      setTimeout(function(){
        $('.temoignages-clients').append(addLoader());
        setTimeout(function(){
          createReviews(window.readReviews());    
          removeLoader();
        }, 1000)
      }, 300)
    }
  });

}); // document.ready