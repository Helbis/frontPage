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

  tempDiv.innerText = `${newTemp} deg`;
}

function changeHumidity(newHum){
  const humDiv = document.getElementById("humidity");

  if ( humDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no humidity block");
    return;
  }

  humDiv.innerText = `${newHum} %`;
}

function changeAQI(newAQI){
  const aqiDiv = document.getElementById("aqi");

  if ( aqiDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no AQI block");
    return;
  }

  aqiDiv.innerText = `${newAQI}`;
}

