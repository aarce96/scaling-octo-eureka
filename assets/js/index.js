var cityList = $("#city-list");
var cities = [];
var apiKey = "fc8bffadcdca6a94d021c093eac22797";

function formatDay(date) {
  var date = new Date();
  console.log(date);
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var dayOutput =
    date.getFullYear() +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (day < 10 ? "0" : "") +
    day;
  return dayOutput;
}

start();
function start() {
  var storeCity = JSON.parse(localStorage.getItem("cities"));

  if (storeCity !== null) {
    cities = storeCity;
  }
  showCity();
}

function storedCity() {
  localStorage.setItem("city", JSON.stringify(city));
}

function showCity() {
  cityList.empty();
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var li = $("<li>").text(city);
    li.attr("id", "listC");
    li.attr("data-city", city);
    li.attr("class", "list-group-item");
    console.log(li);
    cityList.prepend(li);
  }
  if (!city) {
    return;
  } else {
    getWeather(city);
  }
}

function getWeather(cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;

  $("#today-weather").empty();
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    cityTitle = $("<h3>").text(response.name + " " + formatDay());
    $("#today-weather").append(cityTitle);
    var TempetureToNum = parseInt((response.main.temp * 9) / 5 - 459);
    var cityTemperature = $("<p>").text("Tempeture: " + TempetureToNum + " °F");
    $("#today-weather").append(cityTemperature);
    var cityWindSpeed = $("<p>").text(
      "Wind Speed: " + response.wind.speed + " MPH"
    );
    $("#today-weather").append(cityWindSpeed);

    var queryURL1 =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      apiKey;
    $.ajax({
      url: queryURL1,
      method: "GET",
    }).then(function (resFiveDay) {
      $("#boxes").empty();
      console.log(resFiveDay);
      for (var i = 0, j = 0; j <= 5; i = i + 6) {
        var read_date = resFiveDay.list[i].dt;
        if (resFiveDay.list[i].dt != resFiveDay.list[i + 1].dt) {
          var fiveDay = $("<div>");
          fiveDay.attr("class", "col-3 m-2 bg-primary");
          var d = new Date(0);
          d.setUTCSeconds(read_date);
          var date = d;
          console.log(date);
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var dayOutput =
            date.getFullYear() +
            "/" +
            (month < 10 ? "0" : "") +
            month +
            "/" +
            (day < 10 ? "0" : "") +
            day;

          var fiveDayH4 = $("<h6>").text(dayOutput);
          var imgElTag = $("<img>");
          var conditions = resFiveDay.list[i].weather[0].main;
          if (conditions === "cloudy") {
            imgElTag.attr(
              "src",
              "https://img.icons8.com/color/48/000000/cloud.png"
            );
          } else if (conditions === "sunny") {
            imgElTag.attr(
              "src",
              "https://img.icons8.com/color/48/000000/summer.png"
            );
          } else if (conditions === "rainy") {
            imgElTag.attr(
              "src",
              "https://img.icons8.com/color/48/000000/rain.png"
            );
          }

          var pTemperatureK = resFiveDay.list[i].main.temp;
          console.log(conditions);
          var TempetureToNum = parseInt((pTemperatureK * 9) / 5 - 459);
          var pTemperature = $("<p>").text(
            "Tempeture: " + TempetureToNum + " °F"
          );
          fiveDay.append(fiveDayH4);
          fiveDay.append(imgElTag);
          fiveDay.append(pTemperature);
          $("#boxes").append(fiveDay);
          console.log(resFiveDay);
          j++;
        }
      }
    });
  });
}

$("#add-city").on("click", function (event) {
    event.preventDefault();
  
    var city = $("#city-input").val().trim();
  
    if (city === "") {
      return;
    }
    cities.push(city);
    storedCity();
    showCity();
  });
  
  $(document).on("click", "#listC", function () {
    var thisCity = $(this).attr("data-city");
    getWeather(thisCity);
  });