let sistema = new Sistema();

// ===== MODAL =====
const modal = document.getElementById('modal-reserva');
const btnReserva = document.getElementById('btn-reserva');
const btnHero = document.querySelector('.btn-orange');
const cerrarBtn = document.querySelector('.cerrar');
const fechaInput = document.getElementById('fecha-hora');

// navegación smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// abrir / cerrar modal
if (btnReserva) btnReserva.addEventListener('click', abrirModal);
if (btnHero) btnHero.addEventListener('click', abrirModal);
if (cerrarBtn) cerrarBtn.addEventListener('click', cerrarModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) cerrarModal();
});

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
    alert('Solo lunes a viernes.');
    fechaInput.value = '';
    return false;
  }
  if (fecha.getHours() < 9 || fecha.getHours() > 18) {
    alert('Solo de 9 a 18 hs.');
    fechaInput.value = '';
    return false;
  }
  return true;
}

// ===== SUBMIT =====
let form = document.getElementById("reserva-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarFecha()) return;

    let duenio = document.getElementById("nombre-duenio").value;
    let celular = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let mascota = document.getElementById("nombre-mascota").value;
    let servicio = document.getElementById("servicio").value;
    let profesional = document.getElementById("profesional").value;

    let fechaHora = document.getElementById("fecha-hora").value;
    let [fecha, hora] = fechaHora.split("T");

    try {
      let reserva = sistema.agregarNuevaReserva(
        duenio,
        celular,
        email,
        mascota,
        servicio,
        profesional,
        fecha,
        hora
      );

      alert(`Reserva registrada. ID: ${reserva.idReserva}`);
      form.reset();
      cerrarModal();
    } catch (err) {
      alert(err.message);
    }
  });
}
// ELEMENTOS
const btnMostrarLogin = document.getElementById("btn-mostrar-login");
const adminSection = document.getElementById("admin-login-section");
const reservaForm = document.getElementById("reserva-form");
const btnVolver = document.getElementById("btn-volver-reserva");
const btnLoginAdmin = document.getElementById("btn-login-admin");

// MOSTRAR LOGIN
btnMostrarLogin.addEventListener("click", () => {
  reservaForm.classList.add("hidden");
  btnMostrarLogin.classList.add("hidden");
  adminSection.classList.remove("hidden");
});

// VOLVER A RESERVA
btnVolver.addEventListener("click", () => {
  adminSection.classList.add("hidden");
  reservaForm.classList.remove("hidden");
  btnMostrarLogin.classList.remove("hidden");
});

// LOGIN ADMIN
btnLoginAdmin.addEventListener("click", () => {
  const usuario = document.getElementById("admin-usuario").value;
  const password = document.getElementById("admin-password").value;

  if (usuario === "admin" && password === "1234") {

    // Guardar sesión admin
    localStorage.setItem("adminLogueado", "true");

    window.location.href = "index.html";

  } else {
    alert("Usuario o contraseña incorrectos");
  }
});