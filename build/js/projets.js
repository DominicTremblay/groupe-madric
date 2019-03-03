$(document).ready(function(){

  // create a slide for the project page
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

  // produce the description div of a project
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

  // create slides from project images and add it to the selector
  function createSlides(images, selector) {
    $.each(images, function(index, image) {
      selector.append(createSlide(image));
    })
  }

  function createProject(data) {

    var client = $('div.active.section').text().split('Projet: ').join('');
    var projectData = data.find(project => project.client === client);

    
    $('.next-project').on('click', function(e) {
      var nextProject = data[nextProjectIndex(data, client)];
      window.location.href = createProjectUrl('', nextProject.client);
    });

    $('.previous-project').on('click', function(e) {
      var previousProject = data[previousProjectIndex(data, client)];
      window.location.href = createProjectUrl('', previousProject.client);
    });


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
    
    createCards(4, data, next,'','forward', function(cardData){
      $('.ui.raised.special.cards').prepend(createCard(cardData));
    });
  
    $('.right.chevron.icon').on('click', function(e) {
      $cards = $('.ui.raised.special.cards .card');
      $cards.remove();
      createCards(4, data, next,'', 'forward', function(cardData){
        $('.ui.raised.special.cards').prepend(createCard(cardData));
      });
    })

    $('.left.chevron.icon').on('click', function(e) {
      $cards = $('.ui.raised.special.cards .card');
      $cards.remove();
      createCards(4, data, next,'', 'backward', function(cardData){
        $('.ui.raised.special.cards').prepend(createCard(cardData));
      });
    })

  }

  function createExteriorProjects(data) {
    var extProjectsData = data.filter(project => project.type === 'Projets exterieurs')
    var nextProjectIndex = nextIndex(extProjectsData);
    var baseUrl = '/projets/'

    createCards(6, extProjectsData, nextProjectIndex, baseUrl, 'forward',function(cardData){
      $('.ui.raised.special.cards').prepend(createCard(cardData));
    })
  }

  function createInteriorProjects(data) {
    var intProjectsData = data.filter(project => project.type === 'Projets interieurs')
    var nextProjectIndex = nextIndex(intProjectsData);
    var baseUrl = '/projets/'
    createCards(6, intProjectsData, nextProjectIndex, baseUrl, 'forward', function(cardData){
      $('.ui.raised.special.cards').append(createCard(cardData));
    })
  }

  function createAllProjects(data) {
    var extProjectsData = data.filter(project => project.type === 'Projets exterieurs')
    var intProjectsData = data.filter(project => project.type === 'Projets interieurs')
    var allProjectsData = []
      .concat(extProjectsData.slice(0,3))
      .concat(intProjectsData.slice(0,3))
    
      var nextProjectIndex = nextIndex(allProjectsData);
    var baseUrl = '/projets/'
    createCards(6, allProjectsData, nextProjectIndex, baseUrl, 'forward', function(cardData){
      $('.ui.raised.special.cards').append(createCard(cardData));
    })

  }

  $('.ui.raised.special.cards').on('mouseenter', '.card', function(e) {
    var dimImage = $(this).find('.blurring.dimmable.image');
    dimImage.addClass('dimmed')
    var dimmer = $(this).find('.ui.dimmer')
    dimmer
      .removeClass('hidden')
      .addClass('transition')
      .addClass('active')
      .addClass('visible');
  })

  $('.ui.raised.special.cards').on('mouseleave', '.card', function(e) {
    var dimImage = $(this).find('.blurring.dimmable.image');
    dimImage.removeClass('dimmed');
    var dimmer = $(this).find('.ui.dimmer')
    dimmer.removeClass('active').removeClass('visible').addClass('hidden');
  })

  function selectPageView() {

    switch($('main').data('view')) {
      case 'projet':
        return createProject;
      break;
      case 'projets-exterieurs':
        return createExteriorProjects;
      break;
      case 'projets-interieurs':
        return createInteriorProjects;
      break;
      case 'tous-projets':
        return createAllProjects;
      break;
    }
  }


  readJsonFile('../data/projets.json', selectPageView());
  // readJsonFile('https://dominictremblay.github.io/groupe-madric/data/projets.json', selectPageView());


}); // document ready