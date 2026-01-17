/**
 * CONFIGURACIÓN GLOBAL DE API
 * Detección automática de entorno
 */

// Detectar si estamos en producción (Render)
const isProduction = window.location.hostname.includes('onrender.com');
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// URL base según entorno
let API_BASE_URL;

if (isProduction) {
    // PRODUCCIÓN: Backend en Render
    API_BASE_URL = "https://lect-eva-backend.onrender.com";
    console.log("✅ Modo PRODUCCIÓN - Backend:", API_BASE_URL);
} else if (isLocalhost) {
    // DESARROLLO LOCAL
    API_BASE_URL = "http://localhost:8000";
    console.log("🛠️  Modo DESARROLLO - Backend local");
} else {
    // OTRO (tunnel, etc.)
    API_BASE_URL = "http://localhost:8000";
    console.log("⚠️  Modo desconocido, usando localhost");
}

// Hacer disponible globalmente
window.API_BASE_URL = API_BASE_URL;
console.log("API Base URL configurada:", API_BASE_URL);

// Exportar para módulos ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_BASE_URL };
}
