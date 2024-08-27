'use strict';

// Opcions del mapa
const mapOptions = {
  minZoom: 2,
  maxZoom: 18,
  zoomControl: false,
};

// Coordenades inicials
const initCoords = [41.60281747649918, 2.6245074122928997];
// Zoom inicial
const initZoom = 10;

// Mapa centrat
const map = L.map('map', mapOptions).setView(initCoords, initZoom);

const tiles = L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',
  {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

// Icones
const treeIcon = L.icon({
  iconUrl: './images/treeIcon.png',
  iconSize: [32, 37], // size of the icon
  iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
  // cal modificar els valors: over 16, down 37 (middle bottom),
  // ja que si no al fer zoom varia la seva posició
  popupAnchor: [-3, -37], // point from which the popup should open relative to the iconAnchor
  // També cal modificar-lo ja que surt desajustat
  // la posició compta des de la punta inferior de l'icona: 37px amunt
});

const blackIcon = L.icon({
  iconUrl: './images/blackIcon.svg',
  iconSize: [48, 56],
  iconAnchor: [24, 56],
  popupAnchor: [0, -32],
});

// Afegim 2 Markers amb les diferents icones
const markCoords1 = [41.68281747649918, 2.7945074122928997];
const markOptions1 = {
  icon: blackIcon,
};
const marker1 = L.marker(markCoords1, markOptions1)
  .addTo(map)
  .bindPopup('Black Icon');

const markCoords2 = [41.60281747649918, 2.6245074122928997];
const markOptions2 = {
  icon: treeIcon,
};
const marker2 = L.marker(markCoords2, markOptions2)
  .addTo(map)
  .bindPopup('Tree Icon');

// event sobre el mapa, restaurem posició al clicar
map.on('click', function () {
  map.setView(initCoords, initZoom);
});
