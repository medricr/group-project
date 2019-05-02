/* 
HOTEL_APP.JS PSEUDOCODE

    begin
        prompt user for input on location / get location/date data from another part of app
            with that information...
                store the date data in a variable called date(s)_of_visit
                make a call to the location API to return the citycode of the city that the event is in
            using that citycode...
                make a call to the hotel API to return a list of hotels in the area
        display the hotel information in the appropriate div

HOTEL_APP.JS VARIABLE PROTOTYPES

    location (string) - A variable holding either the name of the airport in the destination city, or the airport code of the destination city 

    dates_of_visit (array of strings) - an array which will hold the date of arrival in the first position, and the date of departure in the second position. The date of departure is optional, and will be set to null if the user does not input one

    hotel_locations (array of strings) - an array which will hold the long/lat coordinates of all the hotels returned by the hotel api

    long_lat (object) - an object which will hold the long/lat coordinates of a hotel
    
HOTEL_APP.JS FUNCTION PROTOTYPES
*/
var dates_of_visit = [];
var hotel_index = 0;
var hotle_coords = [];
$(document).ready(()=>{
    $("#submit_btn").on("click",()=>{
        var location = $("#city_entry").val().trim();
        var dates_of_visit=[];
        dates_of_visit[0] = ($("#arrival_date_entry").val().trim());
        dates_of_visit[1] = ($("#departure_date_entry").val().trim());
        // if the user hasn't entered an initial date...
        if(dates_of_visit[0] == ""){
            // get the current date...
            var current_date = new Date();
            // and set it as the date of departure
            dates_of_visit[0] = current_date.toISOString().slice(0,10);
        }
        // if the user hasn't entered a date of departure...
        if(dates_of_visit[1] == ""){
            // set the date of departure to the date of arrival
            dates_of_visit[1] = dates_of_visit[0];
        }
        console.log(dates_of_visit);
        // Nested API calls which allow the user to see hotels in the destination city
        // $.ajax({
        //     beforeSend: function(request){
        //         request.setRequestHeader("X-RapidAPI-Host","apidojo-kayak-v1.p.rapidapi.com");
        //         request.setRequestHeader("X-RapidAPI-Key","da97cf968cmsha16cf672fa90a65p1735a7jsnc510610589d5");
        //     },
        //     url: "https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=" + location,
        //     method: "GET"
        // }).then(function(response){
        //     // retrieve city code 
        //     var city_code = response[1].ctid;
        //     $.ajax({
        //         beforeSend: function(request){
        //             request.setRequestHeader("X-RapidAPI-Host","apidojo-kayak-v1.p.rapidapi.com");
        //             request.setRequestHeader("X-RapidAPI-Key","da97cf968cmsha16cf672fa90a65p1735a7jsnc510610589d5");
        //         },
        //         url: "https://apidojo-kayak-v1.p.rapidapi.com/hotels/create-session?&rooms=1&citycode=" + city_code + "&checkin="+ dates_of_visit[0] + "&checkout="+ dates_of_visit[1] + "&adults=1",
        //         method: "GET"
        //     }).then(function(response){
        //         // console.log(response);
        //         // console.log(response.hotelset)
                
        //         if(response.hotelset.length == 0){
        //             alert("no results found!");
        //         }
        //         for(let i=0; i<response.hotelset.length; i++){
        //             $(".hotel_display").append(
        //                 // add hotel class and unique identifier attributes
        //                 '<tr class="hotel hotel_'+i
        //                 // add hotel latitude attribute
        //                 +'" data_lat="'+response.hotelset[i].lat
        //                 // add hotel longitude attribute
        //                 +'" data_lon="'+response.hotelset[i].lon
        //                 // add hotel number in list
        //                 +'" ><td>' + (i+1) 
        //                 // add hotel name
        //                 + "</td>" + "<td>" + response.hotelset[i].name 
        //                 // add hotel room price
        //                 + "</td>"+ "<td>" + response.hotelset[i].pricehistory 
        //                 // add hotel address
        //                 + "</td>" + "<td>" + response.hotelset[i].address 
        //                 // add hotel neighborhood
        //                 + "</td>" + "<td>" +  response.hotelset[i].neighborhood
        //                 // add url to booking website 
        //                 + "</td>" + "<td>" + "<a href=" + response.baseUrl + response.hotelset[i].shareURL 
        //                 + " target='blank'>Book Now!</a>"
        //                 + "</td></tr>"
        //             );
        //             hotel_index++;
        //         } 
        //     })
        // })
    })
    
    var d = new Date();
    console.log(d.toISOString().slice(0,10));
})