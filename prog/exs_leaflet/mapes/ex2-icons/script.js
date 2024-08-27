"use strict";

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
const map = L.map("map", mapOptions).setView(initCoords, initZoom);

// Canviem l'aspecte del mapa
// https://leaflet-extras.github.io/leaflet-providers/preview/
const tiles = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
}).addTo(map);

// Icones
const treeIcon = L.icon({
  iconUrl: "./images/treeIcon.png",
  iconSize: [32, 37], // size of the icon
  iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
  // cal modificar els valors: over 16, down 37 (middle bottom),
  // ja que si no al fer zoom varia la seva posició
  popupAnchor: [-3, -37], // point from which the popup should open relative to the iconAnchor
  // També cal modificar-lo ja que surt desajustat
  // la posició compta des de la punta inferior de l'icona: 37px amunt
});

const blackIcon = L.icon({
  iconUrl: "./images/blackIcon.svg",
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
  .bindPopup("Black Icon");

const markCoords2 = [41.60281747649918, 2.6245074122928997];
const markOptions2 = {
  icon: treeIcon,
};
const marker2 = L.marker(markCoords2, markOptions2)
  .addTo(map)
  .bindPopup("Tree Icon");

// event sobre el mapa, restaurem posició al clicar
map.on("click", function () {
  map.setView(initCoords, initZoom);
});
