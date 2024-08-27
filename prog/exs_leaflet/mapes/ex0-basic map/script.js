'use strict';

// Opcions del mapa
// Full screen: https://github.com/Leaflet/Leaflet.fullscreen
const mapOptions = {
  minZoom: 7,
  maxZoom: 18,
  fullscreenControl: true,
};

// Coordenades inicials
const initCoords = [41.60281747649918, 2.6245074122928997];
// Zoom inicial
const initZoom = 11;

// Creem un mapa centrat a initCoords
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

// Funció associada al clic en el mapa
// Si estem desplaçats del centre centrem de nou
map.on('click', function () {
  // centrem a initCoords amb initZoom
  map.setView(initCoords, initZoom);
});
