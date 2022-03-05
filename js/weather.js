let request = new XMLHttpRequest();

request.open("GET", "https://api.weatherapi.com/v1/current.json?key=4f683ab8a0994e838c4150136220503&q=Lodz&aqi=yes", true);
request.responseType = "json";
request.send();

request.onload = () => {
  console.log(request.response)

};
