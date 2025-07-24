import { cambiarBackground } from './background.js'
import { obtenerFechaDesdeAPI } from './utils.js';
import { consultarClima } from './api.js';

const listaCiudades = document.querySelector('.city-list');
let historialCiudades = [];

export function mostrarClima(data) {
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

export function agregarCiudadReciente(ciudad) {
    // Evitar duplicados
    if (historialCiudades.includes(ciudad)) return;
    historialCiudades.unshift(ciudad); 
    if (historialCiudades.length > 3) historialCiudades.pop(); 
    renderizarCiudades();
    }
    

export function renderizarCiudades() {
        listaCiudades.innerHTML = ''; 
        
        historialCiudades.forEach(ciudad => {
          const li = document.createElement('li');
          li.textContent = ciudad;
          li.style.cursor = 'pointer';
          li.addEventListener('click', () => consultarClima(ciudad));
          listaCiudades.appendChild(li);
        });
        
        }