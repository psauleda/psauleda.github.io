'strict mode';

// Coordenades i zoom inicials
const initCoords = [41.702, 1.9];
const initZoom = 8;

// Opcions del mapa
const mapOptions = {
  minZoom: 8,
  zoomControl: false,
};

// Creem mapa
const map = L.map('map', mapOptions).setView(initCoords, initZoom);

const tiles = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }
).addTo(map);

// Variable que ens guarda la capa (comarca) quan cliquem una comarca
// La fem global
let prevLayer = null;

// Carreguem dades de l'arxiu geoJSON de les comarques
async function getGeoJson() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/psauleda/Comarques-de-Catalunya/main/comarques_prov.json');
    const dades = await response.json();
    // Afegim geojeson al mapa
    const comarquesGJ = L.geoJson(dades, {
      // estil dels polígons
      style: function (feature) {
        const colors = {
          Lleida: 'red',
          Tarragona: 'blue',
          Barcelona: 'green',
          Girona: 'orange',
        };
        return {
          color: '#333', // frontera
          fillColor: colors[feature.properties.PROV], // emplenat
          fillOpacity: 0.2,
          weight: 0.5, // gruix frontera
        };
      },
      // Per cada feature(comarca = poligon)
      onEachFeature: function (feature, layer) {
        // Popup amb info de la comarca
        let popupContent = `<p><b>COMARCA:</b> ${feature.properties.NOMCOMAR}</p>`;
        popupContent += `<p><b>CAPITAL:</b> ${feature.properties.CAPCOMAR}</p>`;
        layer.bindPopup(popupContent);

        // events mouse over/out
        layer.on('mouseover', function () {
          console.log(prevLayer);
          // Si no és la capa seleccionada canviem l'opacitat
          if (prevLayer !== layer) {
            layer.setStyle({ fillOpacity: 0.4 });
          }
        });
        layer.on('mouseout', function () {
          console.log(prevLayer);
          if (prevLayer !== layer) {
            layer.setStyle({ fillOpacity: 0.2 });
          }
        });
        // Click sobre la comarca
        layer.on('click', function () {
          if (prevLayer !== null) {
            // Reset style
            prevLayer.setStyle({ fillOpacity: 0.2 });
          }

          // Centrat
          //map.fitBounds(e.target.getBounds());
          //var layer = e.target;

          // Salvem el valor de la layer clicada
          prevLayer = layer;
          // Seleccionem més fosc la layer clicada
          layer.setStyle({ fillOpacity: 0.8 });
          console.log(prevLayer);
        });
      },
    }).addTo(map);
  } catch (err) {
    console.log(err);
  }
}
getGeoJson();

// resetegem opacitat si cliquem fora de Catalunya
map.on('click', function (e) {
  console.log(prevLayer);
  prevLayer.setStyle({ fillOpacity: 0.2 });
});
