// FUNCIONES GLOBALES - PRIMERO
let sistema; // ← Declarar global
let hamburgerBtn, mobileMenu, modal, fechaInput; // ← Declaraciones globales

function abrirModal() {
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (fechaInput) fechaInput.focus();

    // Cerrar menú hamburguesa si está abierto
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
}

function cerrarModal() {
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function validarFecha() {
  if (!fechaInput || !fechaInput.value) return true;
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

// ESPERAR DOM + clases.js
document.addEventListener('DOMContentLoaded', function () {
  sistema = new Sistema();

  // ===== ELEMENTOS =====
  // ===== ELEMENTOS =====
  hamburgerBtn = document.getElementById('hamburger-btn');
  mobileMenu = document.getElementById('mobile-menu');
  const btnReservaMobile = document.getElementById('btn-reserva-mobile');
  modal = document.getElementById('modal-reserva');
  const btnReserva = document.getElementById('btn-reserva');
  const btnHero = document.querySelector('.btn-orange');
  const cerrarBtn = document.querySelector('.cerrar');
  fechaInput = document.getElementById('fecha-hora');

  // ===== HAMBURGUESA =====
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Cerrar menú links
  document.querySelectorAll('.mobile-menu a, #btn-reserva-mobile').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburgerBtn) hamburgerBtn.classList.remove('active');
      if (mobileMenu) mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      if (link.id === 'btn-reserva-mobile') abrirModal();
    });
  });

  // Resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (hamburgerBtn) hamburgerBtn.classList.remove('active');
      if (mobileMenu) mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Navegación smooth
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Event listeners modales
  if (btnReserva) btnReserva.addEventListener('click', abrirModal);
  if (btnHero) btnHero.addEventListener('click', abrirModal);
  if (btnReservaMobile) btnReservaMobile.addEventListener('click', abrirModal);
  if (cerrarBtn) cerrarBtn.addEventListener('click', cerrarModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
  });

  // ===== FORM SUBMIT =====
  const form = document.getElementById("reserva-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validarFecha()) return;

      const duenio = document.getElementById("nombre-duenio").value;
      const celular = document.getElementById("telefono").value;
      const email = document.getElementById("email").value;
      const mascota = document.getElementById("nombre-mascota").value;
      const servicio = document.getElementById("servicio").value;
      const profesional = document.getElementById("profesional").value;
      const fechaHora = document.getElementById("fecha-hora").value;
      const [fecha, hora] = fechaHora.split("T");

      try {
        const reserva = sistema.agregarNuevaReserva(duenio, celular, email, mascota, servicio, profesional, fecha, hora);
        alert(`Reserva registrada. ID: ${reserva.idReserva}`);
        form.reset();
        cerrarModal();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // ===== ADMIN =====
  const btnMostrarLogin = document.getElementById("btn-mostrar-login");
  const adminSection = document.getElementById("admin-login-section");
  const reservaFormEl = document.getElementById("reserva-form");
  const btnVolver = document.getElementById("btn-volver-reserva");
  const btnLoginAdmin = document.getElementById("btn-login-admin");

  if (btnMostrarLogin) {
    btnMostrarLogin.addEventListener("click", () => {
      if (reservaFormEl) reservaFormEl.classList.add("hidden");
      btnMostrarLogin.classList.add("hidden");
      if (adminSection) adminSection.classList.remove("hidden");
    });
  }

  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      if (adminSection) adminSection.classList.add("hidden");
      if (reservaFormEl) reservaFormEl.classList.remove("hidden");
      if (btnMostrarLogin) btnMostrarLogin.classList.remove("hidden");
    });
  }

  if (btnLoginAdmin) {
    btnLoginAdmin.addEventListener("click", () => {
      const usuario = document.getElementById("admin-usuario").value;
      const password = document.getElementById("admin-password").value;
      if (usuario === "admin" && password === "1234") {
        localStorage.setItem("adminLogueado", "true");
        window.location.href = "index.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
});
