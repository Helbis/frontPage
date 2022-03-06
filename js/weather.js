const aqiColors = [
  [50, "green"],
  [100, "yellow"],
  [150, "orange"],
  [200, "red"],
  [300, "purple"],
  [500, "maroon"]
]

let request = new XMLHttpRequest();

// request.open("GET", "https://api.weatherapi.com/v1/current.json?key=4f683ab8a0994e838c4150136220503&q=Lodz&aqi=yes", true);
// request.responseType = "json";
// request.send();

request.onload = () => {
  console.log(request.response)

};


function changeTemp(newTemp){
  const tempDiv = document.getElementById("temperature");

  if ( tempDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no temperature block");
    return;
  }

  tempDiv.innerHTML = `${newTemp} <span id="tempDegree" class="symbol">&#8451;</span>`;
}

function changeHumidity(newHum){
  const humDiv = document.getElementById("humidity");

  if ( humDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no humidity block");
    return;
  }

  humDiv.innerHTML = `${newHum} <span id="humidityPercentage" class=
                "symbol">%</span>`;
}

function changeAQIColor(newAQI){
  const aqiColorDiv = document.getElementById("aqiColor");

  if ( aqiColorDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no AQI Color block");
    return;
  }

  for (let i=0; i<aqiColors.length; i++) {
    if ( aqiColors[i][0] <= newAQI ) {
      aqiColorDiv.style.backgroundColor = aqiColors[i][1];
    }
  }
}

function changeAQI(newAQI){
  const aqiDiv = document.getElementById("aqiValue");

  if ( aqiDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no AQI block");
    return;
  }

  aqiDiv.innerText = `${newAQI}`;

  changeAQIColor(newAQI);
}

// changeTemp(20);

console.log(aqiColors);

function testAQI(){
  const input = document.getElementById("slider");
  console.log(input.getAttribute("value"));
}
