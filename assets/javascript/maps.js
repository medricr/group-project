$(document).ready(function () {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    function showPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        map.setCenter([longitude, latitude])
        console.log(longitude + ", " + latitude);
    };




    // navigator.geolocation.getCurrentPosition(showPosition);
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aWxveDg5IiwiYSI6ImNqdjF4NXVsYjBzOW40NHFvbXlhM2s0YzIifQ.mz9OQ4ZD9PjBxmxdkBCRGw';
    var location = [-121.1495, 38.6711];
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: location, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

    getLocation();
    // navigator.geolocation.getCurrentPosition(getPosition);
    // function getPosition(position) {
    //     var latitude = position.coords.latitude;
    //     var longitude = position.coords.longitude;
    //     var locations = [longitude, latitude];
    //     map.setenter(locations)

})

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: {
        color: 'orange'
    },
    mapboxgl: mapboxgl
});

var canvas = map.getCanvasContainer();

var geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": location
        }
    }]
};

map.on('load', function () {

    // Add a single point to the map
    map.addSource('point', {
        "type": "geojson",
        "data": geojson
    });

    map.addLayer({
        "id": "point",
        "type": "circle",
        "source": "point",
        "paint": {
            "circle-radius": 10,
            "circle-color": "orange"
        }
    });
});

