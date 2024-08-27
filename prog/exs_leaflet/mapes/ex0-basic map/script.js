"use strict";

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
const map = L.map("map", mapOptions).setView(initCoords, initZoom);

// Canviem l'aspecte del mapa
// https://leaflet-extras.github.io/leaflet-providers/preview/
const tiles = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
}).addTo(map);

// Funció associada al clic en el mapa
// Si estem desplaçats del centre centrem de nou
map.on("click", function () {
  // centrem a initCoords amb initZoom
  map.setView(initCoords, initZoom);
});
