$(document).ready(function() {
  $('.ui.inverted.button').on('click', function(e) {
    console.log('data: ', this.dataset.projet);
    const modal = document.getElementById('project-modal');

    // modal.innerHTML = 'lorem';
  });
});
