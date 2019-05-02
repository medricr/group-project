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

    $(document.body).on("click", "#mapBtn", function () {
        var eventLong = $(this).attr("data-longitude");
        var eventLat = $(this).attr("data-latitude");
        var eventCoordinates = [eventLong, eventLat];
        console.log(eventCoordinates);

        var canvas = map.getCanvasContainer();

        var geojson = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": eventCoordinates
                }
            }]
        };

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

        // var geocoder = new MapboxGeocoder({
        //     accessToken: mapboxgl.accessToken,
        //     marker: {
        //         color: 'orange',
        //         geography: location
        //     },
        //     mapboxgl: mapboxgl
    });

    // map.addControl(geocoder);

});




