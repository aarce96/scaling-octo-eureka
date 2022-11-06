let cityList = $("#city-list");
let cities = [];
let apiKey = "fc8bffadcdca6a94d021c093eac22797";

function formatDay(date) {
  let date = new Date();
  console.log(date);
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let dayOutput =
    date.getFullYear() + "/" +
    (month < 10 ? "0" : "") + month + "/" +
    (day < 10 ? "0" : "") + day;
  return dayOutput;
};
