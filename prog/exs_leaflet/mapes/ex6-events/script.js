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

// Volem 3 markers amb les següents coordenades
const markers = [];
const coordinates = [
  [41.67290208452616, 2.653398092871811],
  [41.60281747649918, 2.6245074122928997],
  [41.661948893411534, 2.5588822471796107],
];
// Creem els markers amb una icona associada
coordinates.forEach(function (coords) {
  const marker = L.marker(coords, {
    icon: blackIcon,
  })
    // Afegim event quan passem el mouse per sobre el marker
    .on('mouseover', function (e) {
      // console.log(e);
      // Indiquem l'icona que volem i obrim popup amb info
      e.target
        .setIcon(treeIcon)
        .bindPopup(
          `Hello from:<br>Lat: ${e.latlng.lat.toFixed(4)}, 
        Lon: ${e.latlng.lng.toFixed(4)}`
        )
        .openPopup();
    })
    // Afegim event quan sortim del marker
    .on('mouseout', function (e) {
      // Indiquem l'icona que volem i tanquem popup
      e.target.setIcon(blackIcon).closePopup();
    });
  // Afegim el marker creat a l'array de markers
  markers.push(marker);
});

// Creem un featureGrup i afegim els markers al mapa (layer)
const featureGroup = L.featureGroup(markers).addTo(map);

// Centrem el grup de punts al mapa
map.fitBounds(featureGroup.getBounds(), {
  padding: [20, 20],
});

// event sobre el mapa, restaurem posició al clicar
map.on('click', function () {
  map.fitBounds(featureGroup.getBounds(), {
    padding: [20, 20],
  });
});
