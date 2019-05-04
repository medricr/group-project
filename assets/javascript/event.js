var latitudes = [];
var longitudes = [];

$(document).ready(function () {

    var searchUrl = "https://www.eventbriteapi.com/v3/events/search/";
    var token;
    var categories = {};

    $('#carousel').carousel({
        interval: false
    });

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

            latitudes = [];
            longitudes = [];

            for (var i = 0; i < res.events.length; i++) {
                var event = res.events[i];

                if (event.logo) {
                    latitudes.push(event.venue.latitude);
                    longitudes.push(event.venue.longitude);

                    createEventCard(event, i);
                }
            }

            if (res.events.length === 0) {

                var noEvents = "<h2>No Events Found</h2>";

                $(".carousel-inner").append(noEvents);
            }

            $(document).scrollTop($(".carousel").offset().top - 20);
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

    function createEventCard(event, index) {


        var li = $("<li>")
            .attr("data-target", "#carousel")
            .attr("data-slide-to", index);


        var inner = $(".carousel-inner");

        var item = $("<div>")
            .addClass("carousel-item");

        if (index === 0) {
            item.addClass("active");
            li.addClass("active");
        }

        $(".carousel-indicators").append(li);

        var logoUrl = event.logo.url;


        var img = $("<img>")
            .attr("src", logoUrl)
            .addClass("d-block w-100 h-50");

        item.append(img);

        var short = moment(event.start.local, "YYYY-MM-DD")
            .format("LL");

        var cost = event.ticket_availability.maximum_ticket_price.major_value;
        if (cost == 0) {
            cost = "Free";
        }
        else {
            cost = "$" + cost;
        }

        var link = $("<a>")
            .attr("href", event.url)
            .attr("target", "_blank")
            .html("Read more");


        var caption = $("<div>")
            .addClass("carousel-caption d-none d-md-block")
            .append("<h5>" + event.name.text + "</h5>")
            .append("<p><strong>When: </strong>" + short + "</p>")
            .append("<p><strong>Price: </strong>" + cost)
            .append(link);

        item.append(caption);

        inner.append(item);


    }

    $("#submit").on("click", function (event) {
        event.preventDefault();

        $(".carousel-inner").empty();
        $(".carousel-indicators").empty();

        $("form").addClass("was-validated");

        getEvents();
    });

    getAuth();
    getCategories();
});