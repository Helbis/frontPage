function loadImg( icon ){
  const imgDiv = document.getElementById("weatherImg");

  let currentDate = new Date();
  let time;
  let currentTime = currentDate.getUTCHours() + 1;

  if (currentTime > 18 && currentTime < 5) {
    time = "night";
    console.log(currentTime);
  } else {
    time = "day";
  }

  let loadStr = `images/weather/64x64/${time}/${icon}.png`;
  console.log("try to load");
  console.log(loadStr);

  imgDiv.src = loadStr;
}
