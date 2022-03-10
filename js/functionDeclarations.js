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

function changePressure(newPressure){
  const pressDiv = document.getElementById("pressureValue");

  if ( pressDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no pressure block");
    return;
  }

  pressDiv.innerHTML = `${newPressure}`;
}

function updateWeatherImage(code){
  for (let i=0; i < weatherStates.length; i++) {
    if ( weatherStates[i].code === code ) {
      console.log(weatherStates[i]);
      loadImg(weatherStates[i].icon);
    }
  }
}
