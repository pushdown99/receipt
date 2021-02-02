var map;
var coordinates = [];
var latlng;
var marker;

function mapBounds () {
  var bounds = new google.maps.LatLngBounds();
  console.log(coordinates.length);
  for (var i=0; i < coordinates.length; i++) {
    bounds.extend(coordinates[i]);
  }
  map.fitBounds(bounds);

  var zoom = map.getZoom();
  map.setZoom(zoom > 17 ? 17 : zoom);
}

function drawMarker (lat, lng) {
   if (marker && marker.setMap) {
     marker.setMap(null);
   }
   console.log("Marker: " + lat + ", " + lng);
   latlng = new google.maps.LatLng({lat: lat, lng: lng});
   marker = new google.maps.Marker({
     position: latlng,
     map: map,
     icon: {
       path: google.maps.SymbolPath.CIRCLE,
       scale: 8.5,
       fillColor: "#F00",
       fillOpacity: 0.4,
       strokeWeight: 2.0
     }
   });
   //coordinates.push(latlng);
   //mapBounds ();
   map.setCenter(marker.getPosition());
}

function initMap() {
  var obj = document.getElementById('map-canvas');
  if(obj != null)
  map = new google.maps.Map(document.getElementById('map-canvas'), {
   zoom: 17,
   center: new google.maps.LatLng(35.820471, 127.108721)
  });
}
