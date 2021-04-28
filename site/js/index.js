var ccbLocations = new ol.source.Vector({
  url: 'data/ccb_locations_geoJSON.json',
  format: new ol.format.GeoJSON()
});

var vectorLayer = new ol.layer.Vector({
  source: ccbLocations
});

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    vectorLayer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-96.46, 34.58]),
    zoom: 5
  })
});