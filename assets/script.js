var apiKey = "f0646b580390d9e017c02504b4ede918"  

function getUvIndex(lat, lon){
    var getUvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(getUvIndex).then(function (response){
        return response.json()
    }).then(function (data){
        //$("#uvIndex").text("UV Index: " + data.current.uvi);
        $("#uvIndex").html("UV Index: <span class='bg-danger border rounded text-white'>" + data.current.uvi + "</span>");
        //$("#uvIndex").addClass("uvRed")
    })
}

function weather(city){
    var getCurrentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
    fetch(getCurrentWeatherApi).then(function (response){
        return response.json()
    }).then(function (data){
        var time = moment.unix(data.dt).format(" (MMM Do, YYYY, hh:mm:ss)");
        var iconcode = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $("#city-title").html(data.name + time);
        $("#weatherIcon").attr('src', iconurl);
        $("#temp").text("Temperature:" + data.main.temp);
        $("#humidity").text("Humidity: " + data.main.humidity);
        $("#windSpeed").text("Wind Speed: " + data.wind.speed);  
        getUvIndex(data.coord.lat, data.coord.lon);
})
}

function fiveDayForeCast(city){
    var getFiveDayForeCastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&appid=" + apiKey;
    fetch(getFiveDayForeCastApi).then(function (response){
        return response.json()
    }).then(function (data){
        // var iconcode = data.weather[0].icon; // needs work
        // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"; //needs work
        $(".weekday1Date").text(moment(data.list[5].dt_txt).format("l"))
        $(".weekday1Temp").text("Temperature: " + data.list[1].main.temp); 
        $(".weekday1Humidity").text("Humidity: " + data.list[1].main.humidity+"%");
        // $("#weatherIcon1").attr('src', iconurl); // needs work
        $(".weekday2Date").text(moment(data.list[13].dt_txt).format("l"))
        $(".weekday2Temp").text("Temperature: " + data.list[2].main.temp); 
        $(".weekday2Humidity").text("Humidity: " + data.list[2].main.humidity+"%"); 
        // $("#weatherIcon2").attr('src', iconurl); // needs work 
        $(".weekday3Date").text(moment(data.list[21].dt_txt).format("l"))
        $(".weekday3Temp").text("Temperature: " + data.list[3].main.temp); 
        $(".weekday3Humidity").text("Humidity: " + data.list[3].main.humidity+"%"); 
        // $("#weatherIcon3").attr('src', iconurl); // needs work
        $(".weekday4Date").text(moment(data.list[29].dt_txt).format("l"))
        $(".weekday4Temp").text("Temperature: " + data.list[4].main.temp); 
        $(".weekday4Humidity").text("Humidity: " + data.list[4].main.humidity+"%"); 
        // $("#weatherIcon4").attr('src', iconurl); // needs work
        $(".weekday5Date").text(moment(data.list[37].dt_txt).format("l"))
        $(".weekday5Temp").text("Temperature: " + data.list[5].main.temp); 
        $(".weekday5Humidity").text("Humidity: " + data.list[5].main.humidity+"%");
        // $("#weatherIcon5").attr('src', iconurl); // needs work
})
}

// function startUp() {
//     $('#text-9').text(localStorage.getItem("9"))
//     $('#text-10').text(localStorage.getItem("10"))
//     $('#text-11').text(localStorage.getItem("11"))
//     $('#text-12').text(localStorage.getItem("12"))
//     $('#text-13').text(localStorage.getItem("13"))
//     $('#text-14').text(localStorage.getItem("14"))
//     $('#text-15').text(localStorage.getItem("15"))
//     $('#text-16').text(localStorage.getItem("16"))
//     $('#text-17').text(localStorage.getItem("17"))

// $('.saveBtn').on('click', function() {
//     var value = $(this).siblings(".description").val();
//     var time = $(this).parent().attr("id").split("hour-")[1];
//     localStorage.setItem(time, value);
//     $("#saved").text("💾Entry saved💾").show(1).delay(500).hide(1);

$(document).ready(function(){
$("#btn-search").on('click', function(event){
    event.preventDefault();
    var city = $("#searchBtn").val();
    weather(city)
    fiveDayForeCast(city)
})
})