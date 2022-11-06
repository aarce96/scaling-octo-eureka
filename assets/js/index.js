let cityList = $("#city-list");
let cities = [];
let apiKey = "fc8bffadcdca6a94d021c093eac22797";

function formatDay(date) {
  let date = new Date();
  console.log(date);
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let dayOutput =
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
  let storeCities = JSON.parse(localStorage.getItem("cities"));
  if (storeCities !== null) {
    cities = storeCities;
  }
  renderCity();
}

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
  // console.log(localStorage);
}

function renderCity() {
  cityList.empty();

  for (let i = 0; i < cities.length; i++) {
    let city = cities[i];

    let li = $("<li>").text(city);
    li.attr("id", "listC");
    li.attr("data-city", city);
    li.attr("class", "list-group-item");
    // console.log(li);
    cityList.prepend(li);
  }
}
