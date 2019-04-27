$(document).ready(function () {

    var searchUrl = "https://www.eventbriteapi.com/v3/events/search/";
    var token;

    function getAuth() {
        var authUrl = "https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=UZRTAU3LXXH7HZRSM2&redirect_uri=https://medricr.github.io/group-project";
        var accessKey = "access_token=";

        if (window.location.href.indexOf(accessKey) != -1) {
            var href = window.location.href;
            var index = href.indexOf(accessKey);
            var tok = href.substr(index + accessKey.length);
            token = tok;
        }
        else {
            window.location.replace(authUrl);
        }

    }

    function getEvents() {
        var city = "Sacramento";
        var search = "party";
        var url = searchUrl + "?location.address=" + city + "&sort_by=date&q=" + search;
        $.ajax({
            url: url,
            headers: {
                Authorization: "Bearer " + token
            },
            method: "GET"
        }).then(function (res) {
            $("#event-list").empty();
            console.log(res);
            for (var i = 0; i < 10; i++) {
                console.log(i);
                createEventCard(res.events[i]);
            }
        });
    }

    function createEventCard(event) {
        var card = $("<div>");
        card.addClass("card mb-3");
        card.attr("style", "max-width: 540px;");

        var row = $("<div>");
        row.addClass("row no-gutters");

        var imgCol = $("<div>");
        imgCol.addClass("col-12");

        var logoUrl;

        if (event.logo) {
            logoUrl = event.logo.url;
        }
        else {
            logoUrl = "/assets/images/No-Image.png";
        }

        var img = "<img src='" + logoUrl + "' class='card-img'>";
        imgCol.html(img);


        var cardText = $("<div>");

        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        cardBody.append("<h5 class='card-title'>" + event.name.text + "</h5>");

        var cardLink = $("<a>")
            .attr("href", event.url)
            .attr("target", "_blank");
        cardLink.addClass("card-link");
        cardLink.text("Read more");


        var time = $("<p>");
        time.addClass("card-text");

        var date = event.start.local

        var d = moment(date, "YYYY-MM-DD");

        var short = d.format("LL");

        time.text(short);

        cardBody.append(time);
        cardBody.append(cardLink);

        cardText.append(cardBody);

        row.append(imgCol);
        row.append(cardText);

        card.append(row);

        $("#event-list").append(card);
    }


    getAuth();
    getEvents();
});