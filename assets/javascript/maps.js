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

    // $(document.body).on("click", "#mapBtn", function () {
        // var eventLong = $(this).attr("data-longitude");
        // var eventLat = $(this).attr("data-latitude");
        // var eventCoordinates = [eventLong, eventLat];
        // console.log(eventCoordinates);

        // var canvas = map.getCanvasContainer();

        // var geojson = {
        //     "type": "FeatureCollection",
        //     "features": [{
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": eventCoordinates
        //         }
        //     }]
        // };

        // // Add a single point to the map
        // map.addSource('point', {
        //     "type": "geojson",
        //     "data": geojson
        // });

    //     map.addLayer({
    //         "id": "point",
    //         "type": "circle",
    //         "source": "point",
    //         "paint": {
    //             "circle-radius": 10,
    //             "circle-color": "orange"
    //         }
    //     });

    //     // var geocoder = new MapboxGeocoder({
    //     //     accessToken: mapboxgl.accessToken,
    //     //     marker: {
    //     //         color: 'orange',
    //     //         geography: location
    //     //     },
    //     //     mapboxgl: mapboxgl
    // });

    // $(document.body).on("slide.bs.carousel",function(event){
    //     var index = event.to;
    //     var event_lat = latitudes[index];
    //     var event_lon = longitues[index];
    //     var event_coords = [event_lon,event_lat];

    //     var geo_json = {
    //         "type": "FeatureCollection",
    //         "features": [{
    //             "type": "Feature",
    //             "geometry": {
    //                 "type": "Point",
    //                 "coordinates": event_coords
    //             }
    //         }]
    //     };

    //     // and add it to the map
    //     map.addSource('point', {
    //         "type": "geojson",
    //         "data": geo_json
    //     });

    //     map.addLayer({
    //         "id": "point",
    //         "type": "circle",
    //         "source": "point",
    //         "paint": {
    //             "circle-radius": 10,
    //             "circle-color": "orange"
    //         }
    //     });  


    // });

    // when the user clicks on a hotel....
    $(document.body).on("click",".hotel", function(){
        // get that hotels lang/lot coordinates...
        var hotel_lat = $(this).attr("data_lat");
        var hotel_lon = $(this).attry("data_lon");
        // store them in a hotel coords variable
        var hotel_coords = [hotel_lon,hotel_lat];

        var canvas = map.getCanvasContainer();

        // store it in a json variable...
        var geo_json = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": hotel_coords
                }
            }]
        };

        // and add it to the map
        map.addSource('point', {
            "type": "geojson",
            "data": geo_json
        });

        map.addLayer({
            "id": "point",
            "type": "circle",
            "source": "point",
            "paint": {
                "circle-radius": 10,
                "circle-color": "blue"
            }
        });

    })
    // map.addControl(geocoder);

});




