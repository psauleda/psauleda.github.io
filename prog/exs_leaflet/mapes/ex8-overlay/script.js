'use strict';
// https://stackoverflow.com/questions/17720202/set-div-height-to-window-innerheight-in-javascript

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

// Definim icones
const treeIcon = L.icon({
  iconUrl: './images/treeIcon.png',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [-3, -37],
});

const blackIcon = L.icon({
  iconUrl: './images/blackIcon.svg',
  iconSize: [48, 56],
  iconAnchor: [24, 56],
  popupAnchor: [0, -32],
});

// Array dels markers
const markers = [];
const coordinates = [
  [41.67290208452616, 2.653398092871811],
  [41.60281747649918, 2.6245074122928997],
  [41.661948893411534, 2.5588822471796107],
];

// Associem a cada marker una icona i un mouse event
coordinates.forEach(function (coords) {
  const marker = L.marker(coords, {
    icon: blackIcon,
  });
  markers.push(marker);
});

// Creem un featureGrup (layer) i afegim els markers al mapa
const featureGroup = L.featureGroup(markers).addTo(map);
// Ajustem el mapa als markers
map.fitBounds(featureGroup.getBounds(), {
  padding: [20, 20],
});

// opcions per turfjs
const options = { units: 'kilometers' };
// Event DISTÀNCIA quan ens movem per sobre el mapa
map.on('mousemove', function (e) {
  // https://turfjs.org/docs/api/distance
  // Punt on es troba el cursor
  const from = turf.point([e.latlng.lat, e.latlng.lng]);
  // Per cada marker
  markers.forEach(function (marker) {
    // Punt on es troba el marker
    const to = turf.point([marker.getLatLng().lat, marker.getLatLng().lng]);
    // Distància del cursor al marker
    const distance = turf.distance(from, to, options);

    // canviem l'icona segons la distància (10 km)
    distance <= 10 ? marker.setIcon(treeIcon) : marker.setIcon(blackIcon);
  });
});

//-------------------------------------------------------
// Event INPUT CENTER quan canviem el centre del mapa
// Input DOM element
const inputCenter = document.querySelector('#current-center');
map.on('moveend', function () {
  // Actualitzem les coordenades en el <input> (retallem decimals)
  inputCenter.textContent =
    map.getCenter().lat.toFixed(4) + ', ' + map.getCenter().lng.toFixed(4);
});

//-------------------------------------------------------
// Event MOSTRAR/AMAGAR markers
// button DOM element
const buttonToggle = document.querySelector('#toggleLayer');
// Event sobre el button
buttonToggle.addEventListener('click', function () {
  // comprovem si existeix la capa 'featureGroup' i l'eliminem o afegim
  if (map.hasLayer(featureGroup)) {
    map.removeLayer(featureGroup);
  } else {
    featureGroup.addTo(map);
  }
});

//-------------------------------------------------------
// Event MOSTRAR/AMAGAR slider
// DOM elements
const advancedBtn = document.querySelector('#advanced');

const slideIn = document.querySelector('#slide-in');
advancedBtn.addEventListener('click', function () {
  slideIn.classList.toggle('in');
});

// event sobre el mapa, restaurem posició al clicar
map.on('click', function () {
  map.fitBounds(featureGroup.getBounds(), {
    padding: [20, 20],
  });
});
