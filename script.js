let relogio = document.querySelector('#relogio')
let h = document.querySelector('#h')
let m = document.querySelector('#m')
let s = document.querySelector('#s')

let hSmart = document.querySelector('#hSmart');
let mSmart = document.querySelector('#mSmart');
let sSmart = document.querySelector('#sSmart');

let date = document.querySelector('#date');
let week = document.querySelector('#week');

let displayInfo = new Date();

function moveWatch() {
  let realTime = new Date()

  let hour = realTime.getHours()
  let minutes = realTime.getMinutes()
  let seconds = realTime.getSeconds()

  let strHour = new String(hour)
  let strMinutes = new String(minutes)
  let strSeconds = new String(seconds)

  if(strSeconds.length === 1) seconds = "0" + seconds
  if(strMinutes.length === 1) minutes = "0" + minutes
  if(strHour.length === 1) hour = "0" + hour

  h.textContent = hour
  m.textContent = minutes
  s.textContent = seconds

  hSmart.textContent = hour
  mSmart.textContent = minutes
  sSmart.textContent = seconds

  setTimeout("moveWatch()", 1000)
}

function getDate() {
  let weekday = displayInfo.getDay()
  let day = displayInfo.getDate()
  let month = displayInfo.getMonth()+1 
  let year = displayInfo.getFullYear()

  let strDay = new String(day)
  let strMonth = new String(month)

  if(strDay.length === 1) day = '0' + day
  if(strMonth.length === 1) month = '0' + month 

  switch(weekday) {
    case 0:
      weekday = 'Sun'
      break;
    case 1: 
      weekday = 'Mon'
      break;
    case 2: 
      weekday = 'Tue'
      break; 
    case 3: 
      weekday = 'Wed'
      break;
    case 4: 
      weekday = 'Thu'
      break;
    case 5: 
      weekday = 'Fri'
      break;   
  } 

  let currentDate = day + '/' + month + '/' + year 
  week.textContent = weekday
  date.textContent = currentDate
  
}

getDate(); 

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

function getUserPosition() {
  let url = ''
  navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude
    let long = pos.coords.longitude
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=ef496d1f6b1b96cf697f3cca86e4f6b6`
    fetchApi(url)
    console.log(url)
  })
} 

function fetchApi(url) {
  let city = document.querySelector('.city')
  let temperature = document.querySelector('#temp')
  let humidity = document.querySelector('#humidity') 

  fetch(url)
  .then((data) => {
    return data.json()
  })
  .then((data) => {
    let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1);
    
    city.textContent = data.name
    temperature.innerHTML = tempInCelsius
    humidity.innerHTML = data.main.humidity
  })
  .catch((err) => {
    city.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`;
    temperature.innerHTML = `-`;
  })

}

getUserPosition();



