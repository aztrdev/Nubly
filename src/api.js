import { mostrarClima } from './ui.js'

export function consultarClima(ciudad) {
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
  