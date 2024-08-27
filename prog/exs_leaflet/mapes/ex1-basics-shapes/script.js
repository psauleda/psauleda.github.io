'use strict';

// Opcions del mapa
const mapOptions = {
  minZoom: 7,
  maxZoom: 18,
  zoomControl: false,
};

// Coordenades inicials
const initCoords = [41.60281747649918, 2.6245074122928997];
// Zoom inicial
const initZoom = 11;

// Creem un mapa centrat a initCoords amb un initZoom
const map = L.map('map', mapOptions).setView(initCoords, initZoom);

// Canviem l'aspecte del mapa
// https://leaflet-extras.github.io/leaflet-providers/preview/
const tiles = L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

//////////////////////////////////////////////////////////
// Paràmetres del cercle
const circCenter = [41.60281747649918, 2.6245074122928997];
const circOptions = {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 1000,
  weight: 5, // gruix del perímetre
};
// Creem un cercle centrat circCenter amb circOptions
const circle = L.circle(circCenter, circOptions)
  .addTo(map)
  .bindPopup('I am a circle.'); // hi afegim un popup

//////////////////////////////////////////////////////////
const polygonCoords = [
  [41.65281747649918, 2.55074122928997],
  [41.70281747649918, 2.7245074122928997],
  [41.62281747649918, 2.6245074122928997],
];
// Creem un polígon, (en aquest cas sense opcions)
const polygon = L.polygon(polygonCoords)
  .addTo(map)
  .bindPopup('I am a polygon.');

//////////////////////////////////////////////////////////

// Funció associada al clic en el mapa
// 1- Si estem desplaçats del centre centrem de nou
// 2- Mostra un popup amb les coordenades
// No poden funcionar tots dos alhora
function onMapClick(e) {
  // Reiniciem centrat i zoom
  // map.setView(initCoords, initZoom);

  // Creem popup al punt del mapa clicat
  const popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at:<br>${e.latlng.toString()}`)
    .openOn(map);
}
// Afegim event 'click' al mapa, (callback: onMapClick, la funció anterior)
map.on('click', onMapClick);
