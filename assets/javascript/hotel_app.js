// dates of visit (array) - required for calling the Kajak hotel APO
var dates_of_visit = [];
var hotel_index = 0;
// hotel coordinates (array) - holds the latitude and longitude of the retrieved hotels
var hotle_coords = [];
$(document).ready(()=>{
    $("#submit").on("click",()=>{
        var location = $("#city").val().trim();
        var dates_of_visit=[];
        // if the user hasn't entered an initial date...
        if(dates_of_visit[0] == null){
            // get the current date...
            var current_date = new Date();
            // and set it as the date of departure
            dates_of_visit[0] = current_date.toISOString().slice(0,10);
        }
        // if the user hasn't entered a date of departure...
        if(dates_of_visit[1] == null){
            // set the date of departure to the date of arrival
            dates_of_visit[1] = dates_of_visit[0];
        }
        console.log(dates_of_visit);
        // Nested API calls which allow the user to see hotels in the destination city
        $.ajax({
            beforeSend: function(request){
                request.setRequestHeader("X-RapidAPI-Host","apidojo-kayak-v1.p.rapidapi.com");
                request.setRequestHeader("X-RapidAPI-Key","da97cf968cmsha16cf672fa90a65p1735a7jsnc510610589d5");
            },
            url: "https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=" + location,
            method: "GET"
        }).then(function(response){
            // retrieve city code 
            var city_code = response[1].ctid;
            $.ajax({
                beforeSend: function(request){
                    request.setRequestHeader("X-RapidAPI-Host","apidojo-kayak-v1.p.rapidapi.com");
                    request.setRequestHeader("X-RapidAPI-Key","da97cf968cmsha16cf672fa90a65p1735a7jsnc510610589d5");
                },
                url: "https://apidojo-kayak-v1.p.rapidapi.com/hotels/create-session?&rooms=1&citycode=" + city_code + "&checkin="+ dates_of_visit[0] + "&checkout="+ dates_of_visit[1] + "&adults=1",
                method: "GET"
            }).then(function(response){
                if(response.hotelset.length == 0){
                    alert("no results found!");
                }
                for(let i=0; i<10; i++){
                    console.log("init add fire");
                    $(".hotel_display").append(
                        // open table & give each table entry its appropriate lat/lon data attribute, name attribute, and link attribute...
                        '<tr class="hotel" data_lat="'+response.hotelset[i].lat+'" data_lon="'+response.hotelset[i].lon+'" data_name="' + response.hotelset[i].name + '" data_link="'+response.baseUrl + response.hotelset[i].shareURL +'" >'
                        // populate table name field...
                        + "<td>" + response.hotelset[i].name + "</td>"
                        // populate table avg price field...
                        + "<td>" + "$" + ((parseFloat(response.hotelset[i].pricehistoryhi,10) + parseFloat(response.hotelset[i].pricehistorylo,10))/2) + "</td>" 
                        // populate table address field...
                        + "<td>" + response.hotelset[i].address + "</td>" 
                        // populate table neighborhood field...
                        + "<td>" +  response.hotelset[i].neighborhood
                        // close table...
                        + "</td></tr>"
                    );
                    // and update the current position in the hotelset array
                    hotel_index++;
                    console.log(hotel_index);
                } 
                // when the user clicks the "show more" button...
                $(document.body).on("click",".more_btn",function(){
                    var index = hotel_index;
                    // get the current position in the hotelset array....
                    for(let i=index; i<(index+10); i++){
                        $(".hotel_display").append(
                            // open table & give each table entry its appropriate lat/lon data attribute, name attribute, and link attribute...
                            '<tr class="hotel" data_lat="'+response.hotelset[i].lat+'" data_lon="'+response.hotelset[i].lon+'" data_name="' + response.hotelset[i].name + '" data_link="'+response.baseUrl + response.hotelset[i].shareURL +'" >'
                            // populate table name field...
                            + "<td>" + response.hotelset[i].name + "</td>"
                            // populate table avg price field...
                            + "<td>" + "$" + ((parseFloat(response.hotelset[i].pricehistoryhi,10) + parseFloat(response.hotelset[i].pricehistorylo,10))/2) + "</td>" 
                            // populate table address field...
                            + "<td>" + response.hotelset[i].address + "</td>" 
                            // populate table neighborhood field...
                            + "<td>" +  response.hotelset[i].neighborhood
                            // close table...
                            + "</td></tr>"
                        );
                        // and update the current position in the hotelset array
                        hotel_index++;
                    }
                });
            });
        });
    });
});