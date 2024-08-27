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
const initZoom = 11;

// Creem mapa
const map = L.map('map', mapOptions).setView(initCoords, initZoom);

const tiles = L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

// Definim icona
const blackIcon = L.icon({
  iconUrl: './images/blackIcon.svg',
  iconSize: [48, 56],
  iconAnchor: [24, 56],
  popupAnchor: [0, -32],
});

// Definim 3 markers amb una icona a opcions
const marker1 = L.marker([41.67290208452616, 2.653398092871811], {
  icon: blackIcon,
});
const marker2 = L.marker([41.60281747649918, 2.6245074122928997], {
  icon: blackIcon,
});
const marker3 = L.marker([41.661948893411534, 2.5588822471796107], {
  icon: blackIcon,
});

// Afegim els markers al mapa amb un popup
const markers = [marker1, marker2, marker3];
const featureGroup = L.featureGroup(markers)
  .bindPopup('Hello from a Point!!!')
  .addTo(map);

// console.log(marker1.getLatLng());

// Limitem el mapa als punts definits, afegim padding a opcions
map.fitBounds(featureGroup.getBounds(), {
  padding: [20, 20],
});

// event sobre el mapa, restaurem posició al clicar
map.on('click', function () {
  map.fitBounds(featureGroup.getBounds(), {
    padding: [20, 20],
  });
});
