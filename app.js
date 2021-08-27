let city = document.querySelector("#city");
let country = document.querySelector("#country");
let conditionalImg = document.querySelector("#conditonal-img");
let temp = document.querySelector(".degTemp");
let maxTemp = document.querySelector(".degMaxTemp");
let minTemp = document.querySelector(".degMinTemp");
let feelTemp = document.querySelector(".degFellTemp");
let windSpeed = document.querySelector(".windSpeed");
let humidity = document.querySelector(".humidity");
let hour = document.querySelector(".h");
let mnt = document.querySelector(".m");
let sunRise = document.querySelector(".sun-rise-time");
let sunSet = document.querySelector(".sun-set-time");
// =====================
// dark theme
const darkTheme = check => {
    if (check) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
}
// img not found 
const imgNotFount = () => {
    imgLoad.style.display = 'block';
    imgLoad.style.color = 'red';
    imgLoad.innerText = "Failed to load Image";
}
// displya this img
const displayThisImg = nameOfImg => {
    conditionalImg.src = `./images/conditional/${nameOfImg}.png`;
}
const conditionOfImg = (id, dayOrNight) => {
    (id === 800) ? displayThisImg(`${dayOrNight}-clear`)
    : (id >= 200 && id <= 232) ? displayThisImg('thander')
    : (id >= 300 && id <= 321) ? displayThisImg('rain')
    : (id >= 500 && id <= 531) ? displayThisImg('rain')
    : (id >= 600 && id <= 622) ? displayThisImg(`${dayOrNight}-cloud`)
    : (id >= 701 && id <= 781) ? displayThisImg(`${dayOrNight}-msty`)
    : (id >= 801 && id <= 804) ? displayThisImg('cloud')
    : imgNotFount();
}
// hide alerts
const hideAlarts = () =>{
    let imgLoad = document.querySelectorAll(".imgLoading");
    let lalart = document.querySelector(".lalart");
    lalart.style.display = 'none';
    imgLoad.forEach(ele => ele.style.display = 'none');
}
// geo location
const successCallback = (position) => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    weather(lat, lon);
}
const errorCallback = (err) => {
    alert('Turn On / allow location for live update');
}
const geo = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
geo();
// temp bow function
const tempBox = res => {
    city.innerText = res.name;
    country.innerText = res.sys.country;
    temp.innerText = Math.round((res.main.temp) - 273.16);
    maxTemp.innerText = Math.round((res.main.temp_max) - 273.16);
    minTemp.innerText = Math.round((res.main.temp_min) - 273.16);
    feelTemp.innerText = Math.round((res.main.feels_like) - 273.16);
    windSpeed.innerText = (res.wind.speed);
    humidity.innerText = (res.main.humidity);
}
// img show function
const imgShow = (res, day) => {
    hideAlarts();
    let id = res.weather[0].id;
    day ? conditionOfImg(id, 'd')
    : conditionOfImg(id, 'n');
}
const timer = res => {
    let date = new Date(res.dt * 1000 + (res.timezone));
    setInterval(() => {
        let h = date.getHours();
        let m = date.getMinutes();
        hour.innerText = h;
        (m < 10) ? mnt.innerText = "0" + m
        : mnt.innerText = m;
    }, (1000));
    let sunRiseTime = new Date((res.sys.sunrise) * 1000);
    let sunSetTime = new Date((res.sys.sunset) * 1000);
    sunRise.innerText = `${sunRiseTime.getHours()} : ${sunRiseTime.getMinutes()}`;
    sunSet.innerText = `${sunSetTime.getHours()} : ${sunSetTime.getMinutes()}`;
    const dayNightResult = (res , dorN , dark ) => {imgShow(res, dorN);darkTheme(dark)};
    ((sunRiseTime.getTime() < date.getTime()) && (sunSetTime.getTime() > date.getTime())) ? dayNightResult(res,true,false)
    :dayNightResult(res,false,true);
}
/*async Await*/
async function weather(lat, lon) {
    let fetching = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dce9158f4a08d67da67c19b0a95c02c7`);
    let convertingToJson = fetching.json();
    let response = await convertingToJson;
    tempBox(response);
    timer(response);
    console.log(response)
}