// const city="pokhara";
const Api_key=`fcfec918525d9b98ca314e826ac269d5`;
async function getWeather(city){
    try {
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_key}`);
        if(!response.ok){
            throw new Error("unable to fetch");
        }
        
        const data= await response.json();
        console.log(data);
        setWeather(data);
        
    } catch (error) {
        console.error(error);
        
    }

    
}

const city_name=document.querySelector(".city-name");
const temperature=document.querySelector(".temp");
const windspeed=document.querySelector(".windspeed");
const humidity_detail=document.querySelector(".humidity");
const visibility_details=document.querySelector(".visibility_details");
const city_date=document.querySelector(".date");
const weather_description=document.querySelector(".Weather-description");
const search_form=document.querySelector(".search_form");
const input_text=document.querySelector(".Search_City");
const description=document.querySelector(".description .material-icons");


function setWeather(data){
    city_name.textContent=data.name;
    temperature.textContent=Math.round(data.main.temp)+"°C";
    windspeed.textContent=data.wind.speed+"km/hr";
    humidity_detail.textContent=`${data.main.humidity}%`;
    visibility_details.textContent=`${data.visibility/1000}km`;
    weather_description.textContent=data.weather[0].description;
    const current_date=new Date();
    city_date.textContent=current_date.toDateString();
    const weather=getWeathericon(data.weather[0].main);
    description.innerHTML=`<i class="material-icons">${weather}</i>`;

}
function getWeathericon(weathercondition){
    const iconMap={
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
   return iconMap[weathercondition]|| "help";
    }

search_form.addEventListener("submit", function(e){
    e.preventDefault();
    const city=input_text.value;
    if(!city==''){
    getWeather(city);
    input_text.value='';
    }

});

