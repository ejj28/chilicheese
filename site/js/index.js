let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


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

var storePopup = new ol.Overlay({
  element: document.getElementById('storePopup'),
});
map.addOverlay(storePopup);

var popupElement = storePopup.getElement();



map.on('click', function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
    function (feature, layer) {
      return feature;
    });
  if (feature) {
    console.log("hello")
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();


    var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coord));

    console.log(feature.getProperties());
    console.log(hdms);

    $(popupElement).popover('dispose');
    storePopup.setPosition(coord);
    $(popupElement).popover({
      container: popupElement,
      placement: 'top',
      trigger: 'manual',
      animation: false,
      html: true,
      title: 'Taco Bell #' + feature.getProperties().store + ' <i class="fas fa-times popupClose"></i>',
      content: '<p>' + feature.getProperties().address + '</p>',
    });

    $(popupElement).popover('show');
    $(popupElement).find("h3").addClass("d-flex justify-content-between align-items-center")
  }
});


$(document).on('click','.popupClose',function(){
  $(popupElement).popover('dispose');
});
