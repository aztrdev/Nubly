
export function cambiarBackground(codigo) {
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
    