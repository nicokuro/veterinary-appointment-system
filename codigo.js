// Elementos DOM (NUEVO - lo AGREGAS arriba)
const modal = document.getElementById('modal-reserva');
const btnReserva = document.getElementById('btn-reserva');
const btnHero = document.querySelector('.btn-orange');
const cerrarBtn = document.querySelector('.cerrar');
const fechaInput = document.getElementById('fecha-hora');
const formReserva = document.getElementById('reserva-form');

// Navegación smooth a secciones (NUEVO - lo AGREGAS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Conectar botones al modal (NUEVO - lo AGREGAS)  
[btnReserva, btnHero].forEach(btn => {
    btn.addEventListener('click', abrirModal);
});

// Cerrar modal con X y click fuera (NUEVO - lo AGREGAS)
cerrarBtn.addEventListener('click', cerrarModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
});

// TUS FUNCIONES EXISTENTES (NO TOCAS NADA)
function abrirModal() {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (fechaInput) fechaInput.focus();
    }
}

function cerrarModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function validarFecha() {
    const fecha = new Date(fechaInput.value);
    if (fecha.getDay() === 0 || fecha.getDay() === 6) {
        alert('Solo lunes a viernes. Elija otra fecha.');
        fechaInput.value = '';
        return;
    }
    if (fecha.getHours() < 9 || fecha.getHours() > 18) {
        alert('Solo de 9 a 18 hs.');
        fechaInput.value = '';
    }
}

// Submit form (NUEVO - lo AGREGAS al final)
formReserva.addEventListener('submit', (e) => {
    e.preventDefault();
    validarFecha();
    // Acá tus compañeros pondrán la lógica del submit
    console.log('Reserva enviada!'); // Temporal
});
