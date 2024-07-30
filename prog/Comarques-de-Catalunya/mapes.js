const map = L.map('map', {
    minZoom: 8,
}).setView([41.702, 1.9], 8);

const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

const geojson = L.geoJson(comarques, {
    style: function(feature) {
        switch (feature.properties.PROV) {
            case 'Lleida': return {color: "red",fillOpacity: 0.2};
            case 'Tarragona':   return {color: "blue"};
            case 'Barcelona':   return {color: "green"};
            case 'Girona':   return {color: "orange"};
        }
    },
    onEachFeature
}).addTo(map);

const cityIcon = L.icon({
    iconUrl: 'city.png',
    iconSize:     [32, 32], // Mida de la icona
    // IMPORTANT: anchor s'ha de modificar perquè el punt no variï
    iconAnchor:   [20, 16], // point of the icon which will correspond to marker's location
    //popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
  });


//let popup = L.popup();
let prevLayer = null;
let comar = "Maresme";
function onMapClick(e) {
    /* popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.target.feature.properties.NOMCOMAR)
        .openOn(map); */
        /* console.log(e.target.feature.properties.NOMCOMAR);
        console.log(comar)
        if (e.target.feature.properties.NOMCOMAR === comar) {
        console.log(`Well done ! ${e.target.feature.properties.NOMCOMAR}`);
        } else {
            console.log('Try again');
        } */
        if (prevLayer !== null) {
            // Reset style
            prevLayer.setStyle({fillOpacity: 0.2});
        }
}



function onEachFeature(feature, layer) {
    //let popupContent = `<p><b>PROVÍNCIA:</b> ${feature.properties.PROV}</p>`;
    let popupContent = `<p><b>COMARCA:</b> ${feature.properties.NOMCOMAR}</p>`;
    popupContent += `<p><b>CAPITAL:</b> ${feature.properties.CAPCOMAR}</p>`;

    layer.bindPopup(popupContent);
    
    layer.on({
        click: function(e) {
            if (prevLayer !== null) {
                // Reset style
                prevLayer.setStyle({fillOpacity: 0.2});
                console.log(prevLayer)
            }

            // Centrat
            //map.fitBounds(e.target.getBounds());
            //var layer = e.target;
          

            // Store clicked layer into this variable
            prevLayer = layer;
            layer.setStyle({fillOpacity: 0.8})
            //console.log(layer)
        }
        
    });
}
map.on('click', function(e){
    console.log(prevLayer);
    prevLayer.setStyle({fillOpacity: 0.2});

});
/* global comarques */


