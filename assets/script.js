var apiKey = "f0646b580390d9e017c02504b4ede918"  
var listOfSearches;
if (JSON.parse(localStorage.getItem("CityName"))!==null){
    listOfSearches = JSON.parse(localStorage.getItem("CityName"));
}
else {listOfSearches = [];}
console.log(listOfSearches)

function getUvIndex(lat, lon){
    var getUvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(getUvIndex).then(function (response){
        return response.json()
    }).then(function (data){
        $("#uvIndex").html("UV Index: <span class='bg-danger border rounded text-white'>" + data.current.uvi + "</span>");
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
        $(".weekday1Date").text(moment(data.list[5].dt_txt).format("l"))
        $(".weekday1Temp").text("Temperature: " + data.list[5].main.temp); 
        $(".weekday1Humidity").text("Humidity: " + data.list[5].main.humidity+"%");
        $("#weatherIcon1").attr('src',  "http://openweathermap.org/img/w/" + data.list[5].weather[0].icon + ".png"); 
        $(".weekday2Date").text(moment(data.list[13].dt_txt).format("l"))
        $(".weekday2Temp").text("Temperature: " + data.list[13].main.temp); 
        $(".weekday2Humidity").text("Humidity: " + data.list[13].main.humidity+"%"); 
        $("#weatherIcon2").attr('src', "http://openweathermap.org/img/w/" + data.list[13].weather[0].icon + ".png"); 
        $(".weekday3Date").text(moment(data.list[21].dt_txt).format("l"))
        $(".weekday3Temp").text("Temperature: " + data.list[21].main.temp); 
        $(".weekday3Humidity").text("Humidity: " + data.list[21].main.humidity+"%"); 
        $("#weatherIcon3").attr('src', "http://openweathermap.org/img/w/" + data.list[21].weather[0].icon + ".png"); 
        $(".weekday4Date").text(moment(data.list[29].dt_txt).format("l"))
        $(".weekday4Temp").text("Temperature: " + data.list[29].main.temp); 
        $(".weekday4Humidity").text("Humidity: " + data.list[29].main.humidity+"%"); 
        $("#weatherIcon4").attr('src', "http://openweathermap.org/img/w/" + data.list[29].weather[0].icon + ".png"); 
        $(".weekday5Date").text(moment(data.list[37].dt_txt).format("l"))
        $(".weekday5Temp").text("Temperature: " + data.list[37].main.temp); 
        $(".weekday5Humidity").text("Humidity: " + data.list[37].main.humidity+"%");
        $("#weatherIcon5").attr('src', "http://openweathermap.org/img/w/" + data.list[37].weather[0].icon + ".png");

})
}

function startUp() {
    console.log(listOfSearches)
    for (let i = 0; i<listOfSearches.length; i++){
        var button = $("<button></button>");
        button.text(listOfSearches[i]);
        button.attr("id", listOfSearches[i])
        button.on('click', function(event){
            $(".rightSideOfPage").css("display","block");
            event.preventDefault();
            weather(event.target.innerHTML);
            fiveDayForeCast(event.target.innerHTML);
        })
        $(".cityTabs").append(button);
    }
    

}
// $(document).ready(function(){
$("#btn-search").on('click', function(event){
    event.preventDefault();
    $(".rightSideOfPage").css("display","block");
    var city = $("#searchBtn").val();
    listOfSearches.push(city);
    localStorage.setItem("CityName", JSON.stringify(listOfSearches));
    var button = $("<button></button>");
        button.text(city);
        button.attr("id", city)
        button.on('click', function(event){
            event.preventDefault();
            weather(event.target.innerHTML);
            fiveDayForeCast(event.target.innerHTML);
        })
        $(".cityTabs").append(button);
    weather(city);
    fiveDayForeCast(city);
})
// })
startUp();