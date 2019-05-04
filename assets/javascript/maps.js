$(document).ready(function () {
    //Following two function get users location and center the map on these coordinates
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    function showPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        map.setCenter([longitude, latitude])

    };
    // Shows the map
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aWxveDg5IiwiYSI6ImNqdjF4NXVsYjBzOW40NHFvbXlhM2s0YzIifQ.mz9OQ4ZD9PjBxmxdkBCRGw';
    var location = [-121.1495, 38.6711];
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/navigation-preview-night-v2', // stylesheet location
        center: location, // starting position [lng, lat]
        zoom: 11 // starting zoom
    });

    getLocation();

    $('#carousel').on('slide.bs.carousel', function (event) {
        var index = event.to;
        var latitude = latitudes[index];
        var long = longitudes[index];
        console.log("slide");
        var coord = [long, latitude];

        if (map.getSource("point")) {
            map.removeLayer("point");
            map.removeSource("point");
        }

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

        geojson.features[0].geometry.coordinates = coord;

        map.addSource("point", {
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

        map.setCenter(coord);
    });

});




