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

function convert2ppm(values){
 /*
  * |      Air Pollutant     	|  Conversion Factor  	| Molecular Weight 	|
  * |:----------------------:	|:-------------------:	|:----------------:	|
  * | Ozone (O3)             	| 1 ppb = 1.96 µg/m3  	| 48 g/mol         	|
  * | Carbon monoxide (CO)   	| 1 ppb = 1.15 µg/m3  	| 28.01 g/mol      	|
  * | Sulphur dioxide (SO2)  	| 1 ppb = 2.62 µg/m3  	| 64.07 g/mol      	|
  * | Nitrogen dioxide (NO2) 	| 1 ppb = 1.88 µg/m3  	| 46.01 g/mol      	|
  */

  const constConversion = {
    O3  : 1.96,
    CO  : 1.15,
    SO2 : 2.62,
    NO2 : 1.88
  };

  const result = {
    O3 : (values.O3 / constConversion.O3),
    PM2_5 : 10.5,
    PM10 : 12.9,
    CO : (values.CO / constConversion.CO),
    SO2 : (values.SO2 / constConversion.SO2),
    NO2 : (values.NO2 / constConversion.NO2)
  };

  return result;
}

function calculateAQI(aqiData) {
  /* Using formula from:
   * https://en.wikipedia.org/wiki/Air_quality_index#Computing_the_AQI
   * */
  const values = {
    O3 : 72.2,
    PM2_5 : 10.5,
    PM10 : 12.9,
    CO : 327.1,
    SO2 : 12.8,
    NO2 : 8.7
  };

  /* Data for low and high indexes */
  /*
   *
   *
| Clow – Chigh (avg) | Clow – Chigh (avg) | Clow – Chigh (avg)  | Clow – Chigh (avg) | Clow – Chigh (avg) | Clow – Chigh (avg) | Clow – Chigh (avg) | Ilow – Ihigh | Category                       |
| O3 (ppb)           | O3 (ppb)           | PM2.5 (μg/m3)       | PM10 (μg/m3)       | CO (ppm)           | SO2 (ppb)          | NO2 (ppb)          | AQI          | AQI                            |
|:------------------:|:------------------:|:-------------------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------:|:------------------------------:|
| 0–54 (8-hr)        | —                  | 0.0–12.0 (24-hr)    | 0–54 (24-hr)       | 0.0–4.4 (8-hr)     | 0–35 (1-hr)        | 0–53 (1-hr)        | 0–50         | Good                           |
| 55–70 (8-hr)       | —                  | 12.1–35.4 (24-hr)   | 55–154 (24-hr)     | 4.5–9.4 (8-hr)     | 36–75 (1-hr)       | 54–100 (1-hr)      | 51–100       | Moderate                       |
| 71–85 (8-hr)       | 125–164 (1-hr)     | 35.5–55.4 (24-hr)   | 155–254 (24-hr)    | 9.5–12.4 (8-hr)    | 76–185 (1-hr)      | 101–360 (1-hr)     | 101–150      | Unhealthy for Sensitive Groups |
| 86–105 (8-hr)      | 165–204 (1-hr)     | 55.5–150.4 (24-hr)  | 255–354 (24-hr)    | 12.5–15.4 (8-hr)   | 186–304 (1-hr)     | 361–649 (1-hr)     | 151–200      | Unhealthy                      |
| 106–200 (8-hr)     | 205–404 (1-hr)     | 150.5–250.4 (24-hr) | 355–424 (24-hr)    | 15.5–30.4 (8-hr)   | 305–604 (24-hr)    | 650–1249 (1-hr)    | 201–300      | Very Unhealthy                 |
| —                  | 405–504 (1-hr)     | 250.5–350.4 (24-hr) | 425–504 (24-hr)    | 30.5–40.4 (8-hr)   | 605–804 (24-hr)    | 1250–1649 (1-hr)   | 301–400      | Hazardous                      |
| —                  | 505–604 (1-hr)     | 350.5–500.4 (24-hr) | 505–604 (24-hr)    | 40.5–50.4 (8-hr)   | 805–1004 (24-hr)   | 1650–2049 (1-hr)   | 401–500      |                                |
   * */

  const constRanges = {
    O3 : {
      low :  [0,  55, 71,  86, 106, 201, 301],
      high : [54, 70, 85, 105, 200, 300, 400]
    },
    PM2_5 : {
      low :  [ 0.0, 12.1, 35.5,  55.5, 150.5, 250.5, 350.5],
      high : [12.0, 35.4, 55.4, 150.4, 250.4, 350.4, 500.4]
    },
    PM10 : {
      low :  [ 0,  55, 155, 255, 355, 425, 505],
      high : [54, 154, 254, 354, 424, 504, 604]
    },
    CO : {
      low :  [0.0, 4.5,  9.5, 12.5, 15.5, 30.5, 40.5],
      high : [4.4, 9.4, 12.4, 15.4, 30.4, 40.4, 50.4]
    },
    SO2 : {
      low :  [ 0, 36,  76, 186, 305, 605,  805],
      high : [35, 75, 185, 304, 604, 804, 1004]
    },
    NO2 : {
      low :  [ 0,  54, 101, 361,  650, 1250, 1650],
      high : [53, 100, 360, 649, 1249, 1649, 2049]
    },
    AQI : {
      low :  [ 0,  51, 101, 151, 201, 301, 401],
      high : [50, 100, 150, 200, 300, 400, 500]
    },
    status : ["Good", "Moderate", "Unhealthy for Sensitive Groups", "Unhealthy", "Very Unhealthy", "Hazardous", "Beyong Hazardous"]
  };

  const pickedLowAndHigh = {
    O3 : {
      low :  null,
      high : null
    },
    PM2_5 : {
      low :  null,
      high : null
    },
    PM10 : {
      low :  null,
      high : null
    },
    CO : {
      low :  null,
      high : null
    },
    SO2 : {
      low :  null,
      high : null
    },
    NO2 : {
      low :  null,
      high : null
    }
  };

  // Convert to ppm
  const converted = convert2ppm(values);

  // Set values and indexes

  let index;
  let topCategory;

  for (let i=0; i<7; i++) {
    if ( constRanges.O3.low[i] < values.O3 && values.O3 < constRanges.O3.high[i] ) {
      pickedLowAndHigh.O3.low  = constRanges.O3.low[i];
      pickedLowAndHigh.O3.high = constRanges.O3.high[i];
      index = i;
    }

    if ( constRanges.PM2_5.low[i] < values.PM2_5 && values.PM2_5 < constRanges.PM2_5.high[i] ) {
      pickedLowAndHigh.PM2_5.low  = constRanges.PM2_5.low[i];
      pickedLowAndHigh.PM2_5.high = constRanges.PM2_5.high[i];
      index = i;
    }

    if ( constRanges.PM10.low[i] < values.PM10 && values.PM10 < constRanges.PM10.high[i] ) {
      pickedLowAndHigh.PM10.low  = constRanges.PM10.low[i];
      pickedLowAndHigh.PM10.high = constRanges.PM10.high[i];
      index = i;
    }

    if ( constRanges.CO.low[i] < values.CO && values.CO < constRanges.CO.high[i] ) {
      pickedLowAndHigh.CO.low  = constRanges.CO.low[i];
      pickedLowAndHigh.CO.high = constRanges.CO.high[i];
      index = i;
    }

    if ( constRanges.SO2.low[i] < values.SO2 && values.SO2 < constRanges.SO2.high[i] ) {
      pickedLowAndHigh.SO2.low  = constRanges.SO2.low[i];
      pickedLowAndHigh.SO2.high = constRanges.SO2.high[i];
      index = i;
    }

    if ( constRanges.NO2.low[i] < values.NO2 && values.NO2 < constRanges.NO2.high[i] ) {
      pickedLowAndHigh.NO2.low  = constRanges.NO2.low[i];
      pickedLowAndHigh.NO2.high = constRanges.NO2.high[i];
      index = i;
    }
  }


  /* Formula
   * I = ((I_high - I_low) * (C - C_low) / (C_high - C_low)) + I_low
   * where:

    I = the (Air Quality) index,
    C = the pollutant concentration,
    C_low = the concentration breakpoint that is ≤ C,
    C_high = the concentration breakpoint that is ≥ C,
    I_low = the index breakpoint corresponding to C_low,
    I_high = the index breakpoint corresponding C_high.
   * */
  const resultIndexes= [];
  const diffAQI = (constRanges.AQI.high[index] - constRanges.AQI.low[index]);

  resultIndexes[0] = (diffAQI * (values.O3 - pickedLowAndHigh.O3.low) / (pickedLowAndHigh.O3.high - pickedLowAndHigh.O3.low)) + constRanges.AQI.low[index];
  resultIndexes[1] = (diffAQI * (values.PM2_5 - pickedLowAndHigh.PM2_5.low) / (pickedLowAndHigh.PM2_5.high - pickedLowAndHigh.PM2_5.low)) + constRanges.AQI.low[index];
  resultIndexes[2] = (diffAQI * (values.PM10 - pickedLowAndHigh.PM10.low) / (pickedLowAndHigh.PM10.high - pickedLowAndHigh.PM10.low)) + constRanges.AQI.low[index];
  resultIndexes[3] = (diffAQI * (values.CO  - pickedLowAndHigh.CO.low) / (pickedLowAndHigh.CO.high - pickedLowAndHigh.CO.low)) + constRanges.AQI.low[index];
  resultIndexes[4] = (diffAQI * (values.SO2 - pickedLowAndHigh.SO2.low) / (pickedLowAndHigh.SO2.high - pickedLowAndHigh.SO2.low)) + constRanges.AQI.low[index];
  resultIndexes[5] = (diffAQI * (values.NO2 - pickedLowAndHigh.NO2.low) / (pickedLowAndHigh.NO2.high - pickedLowAndHigh.NO2.low)) + constRanges.AQI.low[index];

  const pickedAQI = Math.max(resultIndexes);

  console.table(pickedLowAndHigh);
  console.table(values);
  console.log(resultIndexes);
  console.log(pickedAQI);
}

function changeAQI(aqiData){
  const aqiDiv = document.getElementById("aqiValue");

  if ( aqiDiv == null ){
    /* Issue of loading script before HTML is fixed by using "defer" */
    console.log("no AQI block");
    return;
  }

  let aqi = calculateAQI(aqiData);

  aqiDiv.innerText = `${aqi}`;

  /* Change color */
  for (let i=0; i<aqiColors.length; i++) {
    if ( aqiColors[i][0] <= aqi ) {
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
