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
