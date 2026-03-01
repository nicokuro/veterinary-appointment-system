// Verificar si está logueado
if (localStorage.getItem("adminLogueado") !== "true") {
  window.location.href = "indexCliente.html";
}

// Logout
const btnLogout = document.getElementById("btn-logout");
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("adminLogueado");
    window.location.href = "indexCliente.html";
  });
}

let sistema = new Sistema();

let tabla = document.getElementById("tablaReservas");
let reservas = sistema.reservas;

if (reservas.length === 0) {
  tabla.innerHTML = `
    <tr>
      <td colspan="6">No hay reservas registradas.</td>
    </tr>
  `;
} else {
  tabla.innerHTML = "";

  reservas.forEach((reserva) => {
    let fila = `
      <tr>
        <td>${reserva.duenio}</td>
        <td>${reserva.mascota}</td>
        <td>${reserva.servicio}</td>
        <td>${reserva.profesional}</td>
        <td>${reserva.fecha}</td>
        <td>${reserva.hora}</td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}