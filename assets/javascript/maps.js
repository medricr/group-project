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

    // when the user clicks on a hotel....
    $(document.body).on("click", ".hotel", function () {
        // get that hotels lang/lot coordinates...
        var hotel_lat = $(this).attr("data_lat");
        var hotel_lon = $(this).attr("data_lon");
        // store them in a hotel coords variable
        var hotel_coords = [hotel_lon, hotel_lat];

        var el = document.createElement("div");
        el.className = "marker";
        new mapboxgl.Marker(el)
            .setLngLat(hotel_coords)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML('<h3>' + $(this).attr("data_name") + '</h3><p>' + "<a href=" + $(this).attr("data_link") + '">Book Now!</a>' + '</p>'))
            .addTo(map);
    });
    $('#carousel').on('slide.bs.carousel', function (event) {

        if ($(".marker")) {
            $(".marker").remove();
        }

        var index = event.to;
        var latitude = latitudes[index];
        var long = longitudes[index];
        console.log("Latitudes: " + latitudes);

        var coord = [long, latitude];
        console.log("Coordinate: " + coord);

        map.setCenter(coord);

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        if (!(latitude && long)) {
            return;
        }

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(coord)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h3>' + "test" + '</h3><p>' + "marker.properties.description" + '</p>'))
            .addTo(map)


    })
    // map.addControl(geocoder);

});




