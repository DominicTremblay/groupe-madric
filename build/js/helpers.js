  // Read the data of the projects from the json file
  function readJsonFile(url, cb) {
    $.ajax(url)
    .done(function(data) {
      cb(data)
    })
    .fail(function(err) {
      console.log("Error: ", err)
    });
  }

    // create a closure to get the next index in the array of projects
    function nextIndex(projectsArr) {
      var index = 0;
      return function(direction) {

        if (direction === 'backward') {
          if (index < 0) {
            index = projectsArr.length - 1;
          }
          return index--;
        }

        if (index >= projectsArr.length - 1) {
          index = 0;
        }
        return index++;
      }
    }

    function previousProjectIndex(projectsArr, client) {
      console.log("client: ", client);
      var currentIndex = projectsArr.findIndex(function(project) {
        return project.client === client
      });
      console.log("Current index:", currentIndex);
      return currentIndex <= 0 ? projectsArr.length - 1 : --currentIndex;
    }

    function nextProjectIndex(projectsArr, client) {
      console.log("client: ", client);
      var currentIndex = projectsArr.findIndex(function(project) {
        return project.client === client
      });
      console.log("Current index:", currentIndex, projectsArr.length);
      return currentIndex >= projectsArr.length - 1 ? 0 : ++currentIndex;
    }

    // create a card
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

  function normalizeStr(str) {
    return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  function createProjectUrl(baseUrl, client) {
    return baseUrl + 'projet-renovation-' + normalizeStr(client)
    .split(' ')
    .join('-') + '.html';
  }

      // create a list of random cards from projects data
  function createCards(nbCards, projectsData, nextIndex, baseUrl='',direction, cb) {
    for (var i=0; i < nbCards; i++ ) {
      // var randomIndex = Math.floor(Math.random() * projectsData.length);
      var currentIndex = nextIndex(direction);
      console.log("Current index: ", currentIndex);
      var projectData = projectsData[currentIndex];

      var url = createProjectUrl(baseUrl, projectData.client);

      var image = projectData.images.apres[0] ? projectData.images.apres[0] : projectData.images.avant[0]
      var projet = 'Projet: ' + projectData.client + projectData.ville;

      var cardData = {
        url: url,
        src: image.src,
        alt: projet,
        titre: projectData.titre,
        localisation: projectData.ville ? projectData.client + ', ' + projectData.ville : projectData.client
      }
      cb(cardData);
    }
  }