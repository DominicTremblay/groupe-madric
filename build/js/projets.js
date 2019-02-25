$(document).ready(function(){

  function readJsonFile(url, cb) {
    $.getJSON(url)
    .done(function(data) {
      cb(data)
    })
    .fail(function(err) {
      console.log("Error: ", err)
    });
  }

  function createSlide(slideData) {

    var $slideDiv = $('<div>').addClass('swiper-slide');
    var $aside = $('<aside>').addClass('images-avant')
    $('<h3>')
      .text(slideData.titre)
      .appendTo($aside);
    $slideDiv.append($aside);
    $('<img>')
      .addClass('ui bordered big image')
      .attr('src',slideData.src)
      .attr('alt',slideData.titre)
      .appendTo($slideDiv);
      return $slideDiv;
  }

  function createDescription(projectData) {

    var $containerDiv = $('<div>');
    $('<h1>')
      .text(projectData.titre)
      .appendTo($containerDiv)
    $('<h2>')
      .text(projectData.sousTitre)
      .appendTo($containerDiv);
    $('<p>')
      .text(projectData.description)
      .appendTo($containerDiv);

    return $containerDiv;

  }

  function createSlides(images, selector) {
    $.each(images, function(index, image) {
      selector.append(createSlide(image));
    })
  }

  
  function createCard(cardData) {

    var $cardDiv = $('<div>').addClass('card');
    var $dimImageDiv = $('<div>').addClass('blurring dimmable image');
    var $uiDimmerDiv = $('<div>').addClass('ui dimmer');
    var $contentDiv = $('<div>').addClass('content');
    var $centerDiv = $('<div>').addClass('center');

    $('<a>')
      .addClass('ui inverted button')
      .attr('href',cardData.url)
      .attr('data-projet','1')
      .text('Voir le projet')
      .appendTo($centerDiv);

      var $img = $('<img>')
        .attr('src',cardData.src)
        .attr('alt',cardData.alt)

     $contentDiv.append($centerDiv);
     $uiDimmerDiv.append($contentDiv);
     $dimImageDiv
      .append($uiDimmerDiv)
      .append($img);

      $bodyContentDiv = $('<div>').addClass('content');
      $headerDiv = $('<div>')
        .addClass('header')
        .text(cardData.titre);
      $metaDiv = $('<div>')
        .addClass('meta');

      $('<span>')
        .addClass('location')
        .text(cardData.localisation)
        .appendTo($metaDiv);
      
      $headerDiv.append($metaDiv);
      $bodyContentDiv.append($headerDiv);

      $cardDiv.append($dimImageDiv);
      $cardDiv.append($bodyContentDiv);
      return $cardDiv;
  }

  function nextIndex(projectsArr) {
    var index = 0;
    return function() {
      if (index >= projectsArr.length) {
        index = 0;
      }
      return index++;
    }
  }

  function createCards(nbCards, projectsData, nextIndex) {
    for (var i=0; i < nbCards; i++ ) {
      var randomIndex = Math.floor(Math.random() * projectsData.length);
      var projectData = projectsData[nextIndex()];

      var url = 'projet-renovation-' + projectData.client
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        .split(' ')
        .join('-') + '.html';

      var image = projectData.images.apres[0] ? projectData.images.apres[0] : projectData.images.avant[0]
      var projet = 'Projet: ' + projectData.client + projectData.ville;


      var cardData = {
        url: url,
        src: image.src,
        alt: projet,
        titre: projectData.titre,
        localisation: projectData.ville ? projectData.client + ', ' + projectData.ville : projectData.client
      }


      $('.ui.raised.special.cards').prepend(createCard(cardData));
    }

  }

  function createProject(data) {



    var client = $('div.active.section').text().split('Projet: ').join('');
    var projectData = data.find(project => project.client === client);

    var imagesAvant = projectData.images.avant;
    var imagesPendant = projectData.images.pendant;
    var imagesApres = projectData.images.apres;
 
    createSlides(imagesAvant, $('.swiper-wrapper'));
    createSlides(imagesPendant, $('.swiper-wrapper'));
    createSlides(imagesApres, $('.swiper-wrapper'));
    $('div.description-projet').append(
    createDescription(
          {
            titre: projectData.titre, 
            sousTitre: projectData.sousTitre, 
            description: projectData.description
          })
    );

    var next = nextIndex(data);
    
    createCards(4, data, next);
  
  }

  $('.ui.raised.special.cards').on('mouseenter', '.card', function(e) {
    var dimImage = $(this).find('.blurring.dimmable.image');
    dimImage.addClass('dimmed')
    var dimmer = $(this).find('.ui.dimmer')
    dimmer
      .removeClass('hidden')
      .addClass('transition')
      .addClass('active')
      .addClass(visible);
  })

  $('.ui.raised.special.cards').on('mouseleave', '.card', function(e) {
    var dimImage = $(this).find('.blurring.dimmable.image');
    dimImage.removeClass('dimmed');
    var dimmer = $(this).find('.ui.dimmer')
    dimmer.removeClass('active').removeClass('visible').addClass('hidden');
  })



  readJsonFile('../../data/projets.json', createProject);


}); // document ready