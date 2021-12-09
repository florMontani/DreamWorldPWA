// chequeo si el browser soporta Service Worker

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../service-worker.js").then((message) => {
        console.log("Service Worker activado");
    });
} else {
    console.log("Service Worker desactivado");
}