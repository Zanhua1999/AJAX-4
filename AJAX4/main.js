"use strict";
const debug = true;

let weerButton = document.getElementById('weatherButton'),
    weerButton2 = document.getElementById('weatherButton2');
let weatherTickerTape = document.getElementById('weatherTickerTape'),
    weatherHere = document.getElementById('weatherHere'),
    completeWeatherHere = document.getElementById('completeWeatherhere');

weerButton.addEventListener('click', ()=>{getWeather(showWeather1)});
weerButton2.addEventListener('click', ()=>{getWeather(showWeather2)});

let apiAdress = "http://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam";
let key = "b18f2b811d";
let locatie = "&locatie=";
let geolocatie = "Amsterdam";
let url = apiAdress + key + locatie + geolocatie;

function getWeather(showWeather1) {
    makeAjaxCall(url, "GET").then(showWeather1, errorHandler);
}

function getWeather2(showWeather2) {
    makeAjaxCall(url, "GET").then(showWeather2, errorHandler);
}

function makeAjaxCall(url, methodType) {
	let promiseObj = new Promise(function(resolve, reject){
		debug ? console.log(url) : "";
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.open(methodType, url, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					debug ? console.log("xmlhttp done succesfully") : "";
					let serverResponse = xmlhttp.responseText;
					debug ? console.log(serverResponse) : "";
					resolve(serverResponse);
				} else {
					reject(xmlhttp.status);
					console.log("xmlhttp failed");
				}
			} else {
				debug ? console.log("xmlhttp processing going on") : "";
			}
		}
		debug ? console.log("request sent succesfully") : "";
    });
    return promiseObj;
}

function errorHandler(statusCode){
    console.log("failed with status", status);
}

function showWeather1(weatherString) {
    weatherHere.innerHTML = '';
    let weatherObject = JSON.parse(weatherString);
    console.log(weatherString);
    let ditweer =
        weatherObject.liveweer[0].plaats +
        "<br> Tempratuur: " +
        weatherObject.liveweer[0].temp + " &#176;C" +
        "<br> Verwachting: " +
        weatherObject.liveweer[0].verw +
        "<br> Wolken: " +
        weatherObject.liveweer[0].samenv +
        "<br> d0tmax: " +
        weatherObject.liveweer[0].d0tmax +
        "<br> d0tmin: " +
        weatherObject.liveweer[0].d0tmin +
        "<br> d0neerslag: " +
        weatherObject.liveweer[0].d0neerslag +
        "<br> alarm: " +
        weatherObject.liveweer[0].alarm +
        "<br> image: " +
        weatherObject.liveweer[0].image +
        '<img src="iconen-weerlive/' + weatherObject.liveweer[0].image + '.png">'
        ;
    weatherHere.innerHTML = ditweer;
}

function showWeather2(weatherString){
    let weatherObject = JSON.parse(weatherString);
    let completeData = "";

    for (const [key, value] of Object.entries(weatherObject.liveweer[0])){
        debug ? console.log('$[key] : $[value]') : "";
        completeData += key + " : " + value + "<br>";
        weatherHere.innerHTML = completeData;
    }
}
