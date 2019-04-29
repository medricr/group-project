$(document).ready(function () {

    var searchUrl = "https://www.eventbriteapi.com/v3/events/search/";
    var token;
    var categories = {};

    function getAuth() {
        var authUrl = "https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=UZRTAU3LXXH7HZRSM2&redirect_uri=http://127.0.0.1:5500/index.html";
        var accessKey = "access_token=";

        var href = window.location.href;

        if (href.indexOf(accessKey) != -1) {
            var index = href.indexOf(accessKey);
            var tok = href.substr(index + accessKey.length);
            token = tok;
        }
        else {
            window.location.replace(authUrl);
        }

    }

    function getEvents() {
        var city = $("#city")
            .val()
            .trim();

        if (!city) {
            return;
        }

        var search = $("#search")
            .val()
            .trim();

        var category = $("#categories")
            .val()
            .trim();

        var catId = categories[category];

        var url = searchUrl + "?location.address=" + city + "&sort_by=date&q=" + search + "&categories=" + catId + "&expand=venue,ticket_availability";
        $.ajax({
            url: url,
            headers: {
                Authorization: "Bearer " + token
            },
            method: "GET"
        }).then(function (res) {

            for (var i = 0; i < res.events.length; i++) {
                createEventCard(res.events[i]);
            }

            if (res.events.length === 0) {
                var noEvents = "<h2>No Events Found</h2>";
                $("#event-list").append(noEvents);
            }

            $(document).scrollTop($("#event-list").offset().top - 20);
        });
    }

    function getCategories() {
        var url = "https://www.eventbriteapi.com/v3/categories/";
        $.ajax({
            url: url,
            headers: {
                Authorization: "Bearer " + token
            },
            method: "GET"
        }).then(function (res) {
            res.categories.forEach((cat) => {
                categories[cat.name] = cat.id;
                $("#categories").append("<option>" + cat.name + "</option>");
            });
        });
    }

    function createEventCard(event) {
        var card = $("<div>")
            .addClass("card mb-3");

        var logoUrl = event.logo ? event.logo.url : "/assets/images/No-Image.png";


        var img = $("<img>")
            .attr("src", logoUrl)
            .addClass("card-img");

        var cardBody = $("<div>")
            .addClass("card-body")
            .append("<h5 class='card-title'>" + event.name.text + "</h5>");

        var cardLink = $("<a>")
            .attr("href", event.url)
            .attr("target", "_blank")
            .addClass("card-text")
            .html("Read more<br>");


        var short = moment(event.start.local, "YYYY-MM-DD")
            .format("LL");

        var time = $("<p>")
            .addClass("card-text")
            .html("<strong>When: </strong>" + short);


        var cost = event.ticket_availability.maximum_ticket_price.major_value;
        if (cost == 0) {
            cost = "Free";
        }
        else {
            cost = "$" + cost;
        }

        var price = $("<p>")
            .addClass("card-text")
            .html("<strong>Price: </strong>" + cost);

        var venue = event.venue;

        var map = $("<button>")
            .addClass("btn btn-primary mx-3 my-3")
            .attr("id", "mapBtn")
            .attr("data-latitude", venue.latitude)
            .attr("data-longitude", venue.longitude)
            .text("Show map");


        var hotel = $("<button>")
            .addClass("btn btn-success")
            .attr("id", "hotelBtn")
            .text("Show hotels");

        cardBody.append(time, price, cardLink, map, hotel);

        card.append(img, cardBody);

        $("#event-list").append(card);
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();

        $("#event-list").empty();

        $("form").addClass("was-validated");

        getEvents();
    });

    getAuth();
    getCategories();
});