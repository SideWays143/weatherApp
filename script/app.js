"use strict";

$(document).ready(function () {

    //endpoint
    const endpoint = "https://791m0txmhe.execute-api.us-east-1.amazonaws.com/default/weatherApp";

    let unit = "f";
    let weatherData = null;

    //weather codes to set custom icons
    const weatherIcons = {

        // Clear
        1000: { day: "clear-day.svg", night: "clear-night.svg" },

        // Partly cloudy
        1003: { day: "partly-cloudy-day.svg", night: "partly-cloudy-night.svg" },

        // Cloudy / Overcast
        1006: { day: "cloudy-day-1.svg", night: "cloudy-night-1.svg" },
        1009: { day: "cloudy-day-2.svg", night: "cloudy-night-2.svg" },

        // Fog / Mist / Haze
        1030: "fog.svg",
        1135: "fog.svg",
        1147: "haze.svg",

        // Light rain / drizzle
        1063: { day: "rainy-1-day.svg", night: "rainy-1-night.svg" },
        1150: "rainy-1.svg",
        1153: "rainy-1.svg",

        // Rain
        1180: "rainy-2.svg",
        1183: "rainy-3.svg",
        1186: "rainy-4.svg",
        1189: "rainy-5.svg",
        1192: "rainy-6.svg",
        1195: "rainy-7.svg",

        // Thunderstorms
        1087: "thunder.svg",
        1273: "isolated-thunderstorms.svg",
        1276: "severe-thunderstorm.svg",
        1279: "scattered-thunderstorms.svg",
        1282: "severe-thunderstorm.svg",

        // Snow
        1066: "snowy-1.svg",
        1210: "snowy-2.svg",
        1213: "snowy-3.svg",
        1216: "snowy-4.svg",
        1219: "snowy-5.svg",
        1222: "snowy-6.svg",
        1225: "snow.svg",

        // Ice / Sleet
        1072: "sleet.svg",
        1168: "rain-and-sleet-mix.svg",
        1171: "snow-and-sleet-mix.svg",

        // Hail
        1237: "sleet.svg",
        1261: "rain-and-snow-mix.svg",
        1264: "rain-and-snow-mix.svg",

        // Wind
        1114: "wind.svg",
        1117: "wind.svg",

        // Extreme
        1001: "hurricane.svg",
        1002: "tropical-storm.svg",
        1004: "tornado.svg"
    };

    const stateAbbr = {
        "Alabama":"AL","Alaska":"AK","Arizona":"AZ","Arkansas":"AR",
        "California":"CA","Colorado":"CO","Connecticut":"CT","Delaware":"DE",
        "Florida":"FL","Georgia":"GA","Hawaii":"HI","Idaho":"ID",
        "Illinois":"IL","Indiana":"IN","Iowa":"IA","Kansas":"KS",
        "Kentucky":"KY","Louisiana":"LA","Maine":"ME","Maryland":"MD",
        "Massachusetts":"MA","Michigan":"MI","Minnesota":"MN","Mississippi":"MS",
        "Missouri":"MO","Montana":"MT","Nebraska":"NE","Nevada":"NV",
        "New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY",
        "North Carolina":"NC","North Dakota":"ND","Ohio":"OH","Oklahoma":"OK",
        "Oregon":"OR","Pennsylvania":"PA","Rhode Island":"RI","South Carolina":"SC",
        "South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT",
        "Vermont":"VT","Virginia":"VA","Washington":"WA","West Virginia":"WV",
        "Wisconsin":"WI","Wyoming":"WY"
    };

    let renderWeather = () => {

        if(!weatherData){
            return;
        }

        //variables
        let data = weatherData;
        let code = data.current.condition.code;
        let isDay = data.current.is_day;
        let icon;
        let weatherIcon = weatherIcons[code];
        let forecast = data.forecast.forecastday;
        let currentTemp;
        let cityText;

        //checking if I have the image and using it
        if(typeof weatherIcon === "object"){
            if(isDay == 1){
                icon = weatherIcon.day;
            }else{
                icon = weatherIcon.night;
            }
        }else{
            icon = weatherIcon;
        }
        $(".weatherlogo").css("background-image", "url(icon/" + icon + ")");

        //getting date time and day
        const localtime = data.location.localtime;
        const dateObj = new Date(localtime.replace(" ", "T"));
        const day = dateObj.toLocaleDateString("en-US", { weekday: "long" });
        const time = dateObj.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hourCycle: "h12"
        }).slice(0, -3);

        const ampm = dateObj.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true
        }).slice(-2);

        const date = dateObj.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        $(".display5Days").empty();

        //getting 7 days of forcast
        for(let i = 1; i < forecast.length; i++){
            let date = forecast[i].date;
            let temp;
            let code = forecast[i].day.condition.code;

            if(unit == "f"){
                temp = forecast[i].day.maxtemp_f + "°F";
            }
            else{
                temp = forecast[i].day.maxtemp_c + "°C";
            }

            let weatherIcon = weatherIcons[code];
            let icon;

            if(typeof weatherIcon === "object"){
                icon = weatherIcon.day;
            }else{
                icon = weatherIcon;
            }

            let dateObj = new Date(date + "T00:00:00");
            let dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

            let html = `
                <div class="day">
                    <div>${dayName}</div>
                    <div class="icon mon" style="background-image:url(icon/${icon})"></div>
                    <div>${temp}</div>
                </div>
            `;

            $(".display5Days").append(html);
        }

        if(unit == "f"){
            currentTemp = data.current.temp_f + "°F";
        }
        else{
            currentTemp = data.current.temp_c + "°C";
        }

        //checking if country is USA so, i can use stateabbr
        if(data.location.country === "United States of America"){

            let state = stateAbbr[data.location.region];

            if(state){
                cityText = data.location.name + ", " + state;
            }else{
                cityText = data.location.name + ", " + data.location.region;
            }

        }else{
            cityText = data.location.name + ", " + data.location.country;
        }

        //printing data on screen
        $(".temp").text(currentTemp);
        $(".condition").text(data.current.condition.text);
        $("#city").text(cityText);
        $("#time").text(time);
        $("#ampm").text(ampm);
        $(".dayName").text(day + ", ");
        $("#date").text(date);

    };

    let getWeather = () => {
        let city = $("#search").val().trim();

        if(!city){
            alert("City is required");
            return;
        }

        $(".condition").text("Loading weather...");
        $(".temp").text("--");
        $("#city").text("");
        $(".display5Days").empty();

        $.get(endpoint + "?city=" + city,function(data){

            if(data.error){
                $(".condition").text("City not found");
                $("#city").text("");
                $(".temp").text("--°");
                $(".display5Days").empty();
                return;
            }

            //placing data in weather data variable
            weatherData = data;
            renderWeather();
        }).fail(function(){
            $(".condition").text("Something went wrong. Please try again.");
            $(".temp").text("--");
            $("#city").text("");
        });

    };

    let getLocationWeather = () => {

        if(!navigator.geolocation){
            alert("Geolocation not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(function(position){

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            $(".condition").text("Loading weather...");
            $(".temp").text("--");
            $("#city").text("");
            $(".display5Days").empty();

            $.get(endpoint + "?city=" + lat + "," + lon, function(data){

                if(data.error){
                    alert("Unable to detect location weather.");
                    return;
                }
                weatherData = data;
                renderWeather();
            }).fail(function(){
                $(".condition").text("Something went wrong. Please try again.");
                $(".temp").text("--");
                $("#city").text("");
            });
        });
    }

    let clearSearch = () => {
    setTimeout(() => {
        $("#search").val("");
    }, 5000);
    };

    //click handler
    $("#searchBtn").click(() => {
		getWeather();
        clearSearch();
	})

    $("#search").keypress(function(e){
        if(e.which === 13){
            getWeather();
            clearSearch();
        }
    });

    $("#home").click(() => {
        $("#search").val("");
		getLocationWeather();
	})

    $("#toggle").click(() => {
		if(unit == "f"){
            unit = "c";
        }
        else{
            unit = "f";
        }

        $("#f,#c").removeClass("activeUnit");

        if(unit == "f"){
            $("#f").addClass("activeUnit");
        }
        else{
            $("#c").addClass("activeUnit");
        }
        renderWeather();
	})

    getLocationWeather();

});