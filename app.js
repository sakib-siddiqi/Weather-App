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
const successCallback = (position) => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    weather(lat, lon);
}
const errorCallback = (err) => {
    alert('Turn On / allow location for live update');
}
function geo() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
geo();
/*byPromise*/

// function weather(lat, lon) {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dce9158f4a08d67da67c19b0a95c02c7`)
//         .then(res => res.json())
//         .then(res => {
//             // temp
//             tempBox(res);
//             timer(res)
//         })
//         .catch(reject => console.log(reject))
// }

/*async Await*/
async function weather(lat, lon) {
    let fetching = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dce9158f4a08d67da67c19b0a95c02c7`);
    let convertingToJson = fetching.json();
    let response = await convertingToJson;
    tempBox(response);
    timer(response);

}
// temp bow function
function tempBox(res) {
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
function imgShow(res, day) {
    let imgLoad = document.querySelector(".imgLoading");
    imgLoad.style.display = 'none';
    let id = res.weather[0].id;
    if (day) {
        if (id === 800) {
            conditionalImg.src = "./images/conditional/d-clear.png";
        } else if (id >= 200 && id <= 232) {
            conditionalImg.src = "./images/conditional/thander.png";
        } else if (id >= 300 && id <= 321) {
            conditionalImg.src = "./images/conditional/rain.png";
        } else if (id >= 500 && id <= 531) {
            conditionalImg.src = "./images/conditional/rain.png";
        } else if (id >= 600 && id <= 622) {
            conditionalImg.src = "./images/conditional/d-cloud.png";
        } else if (id >= 701 && id <= 781) {
            conditionalImg.src = "./images/conditional/d-msti.png";
        } else if (id >= 801 && id <= 804) {
            conditionalImg.src = "./images/conditional/could.png";
        } else {
            imgLoad.style.display = 'block';
            imgLoad.style.color = 'red';
            imgLoad.innerText = "Failed to load Image";
        }
    } else {
        if (id === 800) {
            conditionalImg.src = "./images/conditional/n-clear.png";
        } else if (id >= 200 && id <= 232) {
            conditionalImg.src = "./images/conditional/thander.png";
        } else if (id >= 300 && id <= 321) {
            conditionalImg.src = "./images/conditional/rain.png";
        } else if (id >= 500 && id <= 531) {
            conditionalImg.src = "./images/conditional/rain.png";
        } else if (id >= 600 && id <= 622) {
            conditionalImg.src = "./images/conditional/n-cloud.png";
        } else if (id >= 701 && id <= 781) {
            conditionalImg.src = "./images/conditional/n-msti.png";
        } else if (id >= 801 && id <= 804) {
            conditionalImg.src = "./images/conditional/could.png";
        } else {
            imgLoad.style.display = 'block';
            imgLoad.style.color = 'red';
            imgLoad.innerText = "Failed to load Image";
        }
    }

}
function timer(res) {
    let date = new Date(res.dt * 1000 + (res.timezone));
    setInterval(() => {
        let h = date.getHours();
        let m = date.getMinutes();
        hour.innerText = h;
        if (m < 10) {
            mnt.innerText = "0" + m;
        } else {
            mnt.innerText = m;
        }
    }, (1000));
    let sunRiseTime = new Date((res.sys.sunrise) * 1000);
    let sunSetTime = new Date((res.sys.sunset) * 1000);
    sunRise.innerText = `${sunRiseTime.getHours()} : ${sunRiseTime.getMinutes()}`;
    sunSet.innerText = `${sunSetTime.getHours()} : ${sunSetTime.getMinutes()}`;
    if ((sunRiseTime.getTime() < date.getTime()) && (sunSetTime.getTime() > date.getTime())) {
        imgShow(res, true);
        darkTheme(false);
        console.log(sunRiseTime.getTime() - date.getTime())
    } else {
        imgShow(res, false);
        darkTheme(true);
    }
}
// dark theme
function darkTheme(check) {
    if (check) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
}