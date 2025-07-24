export function obtenerFechaDesdeAPI(dt, timezone) {
    const fechaLocal = new Date((dt + timezone) * 1000); 
    return fechaLocal.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
  