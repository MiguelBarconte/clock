const provincia = document.getElementById("provincia");
const horaElemento = document.getElementById("hora");

function actualizarHora() {
    const ahora = new Date();

    horaElemento.textContent =
        ahora.toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
}

setInterval(actualizarHora, 1000);
actualizarHora();

function descripcionClima(codigo) {

    const estados = {
        0: "☀️ Despejado",
        1: "🌤️ Mayormente despejado",
        2: "⛅ Parcialmente nublado",
        3: "☁️ Nublado",
        45: "🌫️ Niebla",
        48: "🌫️ Niebla intensa",
        51: "🌦️ Llovizna ligera",
        61: "🌧️ Lluvia ligera",
        63: "🌧️ Lluvia moderada",
        65: "🌧️ Lluvia fuerte",
        71: "❄️ Nieve ligera",
        73: "❄️ Nieve",
        75: "❄️ Nevada intensa",
        80: "🌦️ Chubascos",
        81: "🌧️ Chubascos fuertes",
        95: "⛈️ Tormenta"
    };

    return estados[codigo] || "Clima desconocido";
}

async function obtenerClima() {

    const [lat, lon] = provincia.value.split(",");

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error en la API");
        }

        const datos = await respuesta.json();

        document.getElementById("temperatura").textContent =
            `${datos.current.temperature_2m}°C`;

        document.getElementById("estado").textContent =
            descripcionClima(datos.current.weather_code);

    } catch(error) {

        document.getElementById("temperatura").textContent = "--°C";

        document.getElementById("estado").textContent =
            "❌ No se pudo obtener el clima";

        console.error(error);
    }
}

provincia.addEventListener("change", obtenerClima);

obtenerClima();

setInterval(obtenerClima, 600000);