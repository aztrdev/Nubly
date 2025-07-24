import './style.css'
import { consultarClima } from './api.js';

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

