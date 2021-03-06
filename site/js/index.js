let rvh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--rvh', `${rvh}px`);

window.addEventListener('resize', () => {
  rvh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--rvh', `${rvh}px`);
});

function toggleAboutModal() {
  $('#aboutModal').modal('toggle');
}

var ccbMarker = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 1],
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    src: 'media/pin.png',
    scale: 0.015,
  }),
});

var ccbLocations = new ol.source.Vector({
  url: 'data/ccb_locations_geoJSON.json',
  format: new ol.format.GeoJSON()
});

var vectorLayer = new ol.layer.Vector({
  source: ccbLocations,
  style: ccbMarker
});

var interactions = ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false});
var controls = ol.control.defaults({rotate: false});

var map = new ol.Map({
  controls: controls,
  interactions: interactions,
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

    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();


    var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coord));


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
