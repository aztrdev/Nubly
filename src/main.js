import './style.css'
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.search-bar input');
  const video = document.getElementById("video-fondo");
const source = document.getElementById("video-source");
source.src = "./videos/default.mp4"; 
video.load();   
video.play();   

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const ciudad = input.value.trim();
      if (ciudad) {
        consultarClima(ciudad);
        input.value = '';
      }
    }
  });
});

function consultarClima(ciudad) {
  const apiKey = import.meta.env.VITE_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;

   //Hacemos la peticion a la API
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === '404') {
        alert('Ciudad no encontrada');
        return;
      }
      mostrarClima(data);
    })
    .catch(err => {
      console.error('Error al consultar la API:', err);
    });
}


function mostrarClima(data) {
  const { name, main, weather, wind, clouds, timezone} = data;

  
  // Temperatura
  document.querySelector('.temperature').textContent = `${Math.round(main.temp - 273.15)}°`;

  // Ciudad
  document.querySelector('.location-info p').textContent = name;

  // Fecha
  document.querySelector('.date').textContent = obtenerFechaDesdeAPI(data.dt, data.timezone);

  // Clima (estado general)
  document.querySelectorAll('.info')[0].textContent = weather[0].main;

  // Cloud %
  document.querySelector('.cloud').textContent = `${clouds.all}%`;

  // Humedad
  document.querySelector('.humidity').textContent = `${main.humidity}%`;

  // Viento
  document.querySelector('.wind').textContent = `${wind.speed} km/h`;

  // Lluvia
  const rainValue = data.rain?.['1h'] || 0;
  document.querySelector('.rain').textContent = `${rainValue} mm`;

  //Descripcion
  document.querySelector('.description').textContent = `${weather[0].description}`;

  //Id
  const climaID = data.weather[0].id 

  cambiarBackground(climaID)
  agregarCiudadReciente(name);
}

function obtenerFechaDesdeAPI(dt, timezone) {
  const fechaLocal = new Date((dt + timezone) * 1000); 
  
  return fechaLocal.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}


const listaCiudades = document.querySelector('.city-list');
let historialCiudades = [];

function agregarCiudadReciente(ciudad) {
// Evitar duplicados
if (historialCiudades.includes(ciudad)) return;

historialCiudades.unshift(ciudad); 
if (historialCiudades.length > 3) historialCiudades.pop(); 

renderizarCiudades();
}

function renderizarCiudades() {
listaCiudades.innerHTML = ''; 

historialCiudades.forEach(ciudad => {
  const li = document.createElement('li');
  li.textContent = ciudad;
  li.style.cursor = 'pointer';
  li.addEventListener('click', () => consultarClima(ciudad));
  listaCiudades.appendChild(li);
});

}

function cambiarBackground(codigo) {
const video = document.getElementById("video-fondo");
const source = document.getElementById("video-source");

const obtenerVideo = (codigo) => {
  if (codigo >= 801 && codigo <= 804) 
    return "./videos/cloudy.mp4";
  if (codigo === 800) 
    return "./videos/sunny.mp4";
  if (codigo >= 500 && codigo < 531) 
    return "./videos/rain.mp4";
  if (codigo >= 200 && codigo < 300) 
    return "./videos/storm.mp4";
  if (codigo >= 600 && codigo <= 622) 
    return "./videos/snow.mp4";
  if (codigo >= 701 && codigo <= 781) 
    return "./videos/foggy.mp4";

  return "./videos/default.mp4";
};

const nuevoSrc = obtenerVideo(codigo);

video.style.opacity = 0;

setTimeout(() => {
source.src = nuevoSrc;
video.pause();
video.load();
video.play().catch((e) => {
  console.warn('No se pudo reproducir el video:', e);
});
video.style.opacity = 1;
}, 1000);

}
