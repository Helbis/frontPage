const aqiColors = [
  [50, "green"],
  [100, "yellow"],
  [150, "orange"],
  [200, "red"],
  [300, "purple"],
  [500, "maroon"]
]

let request = new XMLHttpRequest();

request.open("GET", "https://api.weatherapi.com/v1/current.json?key=4f683ab8a0994e838c4150136220503&q=Lodz&aqi=yes", true);
request.responseType = "json";
request.send();

request.onload = () => {
  console.log(request.response)

};


function changeTemp(newTemp){
  const tempDiv = document.getElementById("tempValue");

  if ( tempDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no temperature block");
    return;
  }

  tempDiv.innerHTML = `${newTemp}`;
}

function changeHumidity(newHum){
  const humDiv = document.getElementById("humidityValue");
  const humidity = document.getElementById("progressHumidity");

  if ( humDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no humidity block");
    return;
  }

  humidity.value = newHum;
  humDiv.innerHTML = `${newHum}`;
}

function changeAQI(newAQI){
  const aqiDiv = document.getElementById("aqiValue");

  if ( aqiDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no AQI block");
    return;
  }

  aqiDiv.innerText = `${newAQI}`;

  /* Change color */
  for (let i=0; i<aqiColors.length; i++) {
    if ( aqiColors[i][0] <= newAQI ) {
      aqiDiv.style.color = aqiColors[i][1];
    }
  }
}


/* Slider for changing the color manually
 *  later it will be automatic, based on current weather data */
const input = document.getElementById("slider");

input.oninput = function() {
  changeAQI(this.value);
};
