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

// Creem mapa
const map = L.map("map", mapOptions).setView(initCoords, initZoom);

// Canviem l'aspecte del mapa
// https://leaflet-extras.github.io/leaflet-providers/preview/
const tiles = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
}).addTo(map);

// Definim icones
const treeIcon = L.icon({
  iconUrl: "./images/treeIcon.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [-3, -37],
});

const blackIcon = L.icon({
  iconUrl: "./images/blackIcon.svg",
  iconSize: [48, 56],
  iconAnchor: [24, 56],
  popupAnchor: [0, -32],
});

// Definim un popup per una de les icones
// Hi ha altres maneres de definir popups, (https://leafletjs.com/reference.html#popup)
const popup = L.popup()
  .setLatLng([41.68281747649918, 2.7945074122928997])
  .setContent(
    '<img src="./images/st_pau_mati.JPG"><br><p>Vista de Sant Pau.</p>'
  );
//.openOn(map);

// Afegim dos markers
L.marker([41.60281747649918, 2.6245074122928997], { icon: blackIcon })
  .addTo(map)
  .bindPopup(popup);

L.marker([41.68281747649918, 2.7945074122928997], { icon: treeIcon })
  .addTo(map)
  .bindPopup("Tree Icon");

// event sobre el mapa, restaurem posició al clicar
map.on("click", function () {
  map.setView(initCoords, initZoom);
});
