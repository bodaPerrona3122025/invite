// ---------- CONFIGURACIÓN (edítala) ----------
const CONFIG = {
  title: 'Nuestra Boda',
  names: 'Julio y Esperanza',
  eventDateISO: '2026-05-09T16:00:00', // fecha y hora de la ceremonia en formato ISO (UTC o local según prefieras)

  ceremony: {
    displayDate: '09-May-2026 • 16:00',
    // iframe src para el mapa embebido (usa Google Maps > compartir > insertar mapa > copiar src)
    iframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1067.1754971337812!2d-102.34084992399177!3d22.174830287840347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8682098b864d22cf%3A0x55d55376b30a6fd1!2sParroquia%20de%20San%20Blas%20Obispo%20y%20Martir!5e0!3m2!1ses-419!2smx!4v1758027225224!5m2!1ses-419!2smx'
  },
  party: {
    displayDate: '09-May-2026 • 19:30',
    iframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14781.05887696304!2d-102.31897725649245!3d22.153993264186212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868209dec171850b%3A0x2c5ef8ee758d54c6!2sHacienda%20la%20San%20Marque%C3%B1a!5e0!3m2!1ses-419!2smx!4v1758027045125!5m2!1ses-419!2smx'
  },
  // Enlace a la mesa de regalos (Liverpool)
  giftsLink: 'https://www.amazon.com.mx/wedding/registry/1YLGV2UBSCJDL'
};

// Aplicar configuración al DOM
document.getElementById('iframeCeremony').src = CONFIG.ceremony.iframeSrc;
document.getElementById('iframeParty').src = CONFIG.party.iframeSrc;
document.getElementById('liverpoolLink').href = CONFIG.giftsLink;

// ---------- CONTADOR ----------
const targetDate = new Date(CONFIG.eventDateISO);
const elDays = document.getElementById('days');
const elHours = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');

function updateCountdown() {
  const now = new Date();
  let diff = Math.max(0, targetDate - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);

  elDays.textContent = String(days);
  elHours.textContent = String(hours).padStart(2, '0');
  elMinutes.textContent = String(minutes).padStart(2, '0');
  elSeconds.textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- GALERIA: carga dinámica si quieres añadir más ----------
// Puedes añadir elementos al array con rutas a tus imágenes para poblar la galería.
const galleryImages = ['img/Gallery1.jpg', 'img/Gallery2.jpg', 'img/Gallery3.jpg', 'img/Gallery4.jpg', 'img/Gallery5.jpg', 'img/Gallery6.jpg', 'img/Gallery7.jpg', 'img/Gallery8.jpg'];
const carousel = document.getElementById('carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

// Insertar imágenes en el carrusel
function populateCarousel() {
  galleryImages.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Foto ${i + 1}`;
    carousel.appendChild(img);
  });
}

function showSlide(i) {
  if (i < 0) index = galleryImages.length - 1;
  else if (i >= galleryImages.length) index = 0;
  else index = i;

  const offset = -index * 100;
  carousel.style.transform = `translateX(${offset}%)`;
}

// Botones
prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// Auto play
setInterval(() => {
  showSlide(index + 1);
}, 4000);

populateCarousel();
showSlide(0);



/* --- RSVP / Envío por WhatsApp (sin servidor) --- */
document.getElementById("rsvpSend").addEventListener("click", function () {
  const name = document.getElementById("rsvpName").value.trim();
  const answer = document.getElementById("rsvpAnswer").value;
  const guests = document.getElementById("rsvpGuests").value;
  const note = document.getElementById("rsvpNote").value.trim();

  if (!name || !answer || !guests) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  // Número de WhatsApp donde llegará el mensaje (cámbialo por el tuyo)
  const phoneNumber = "524651224100"; // ejemplo: 52155XXXXXXXX (incluye LADA sin + ni espacios)

  // Construir mensaje
  let message = `Hola, soy ${name}.%0A`;
  message += `Por este medio confirmo que ${answer}.%0A a este día tan especial para ustedes.`;
  message += `Asistiremos un total de ${guests}.%0A`;
  if (note) {
    message += `Mensaje: ${note}.`;
  }

  // Abrir WhatsApp con el mensaje
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
});




