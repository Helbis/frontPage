const weatherStates = JSON.parse(data);
// console.log(weatherStates);

const aqiColors = [
  [50, "green"],
  [100, "yellow"],
  [150, "orange"],
  [200, "red"],
  [300, "purple"],
  [500, "maroon"]
];

let request = new XMLHttpRequest();
let response;

request.open("GET", "https:api.weatherapi.com/v1/current.json?key=4f683ab8a0994e838c4150136220503&q=Lodz&aqi=yes", true);
request.responseType = "json";
request.send();

request.onload = () => {
  // console.log(request.response.current);

  changeAQI();
  changeTemp(request.response.current.temp_c);
  changePressure(request.response.current.pressure_mb);
  changeHumidity(request.response.current.humidity);

  updateWeatherImage(request.response.current.condition.code);

  request.response;
};


/* Slider for changing the color manually
 *  later it will be automatic, based on current weather data */
const input = document.getElementById("slider");

input.oninput = function() {
  changeAQI(this.value);
};
