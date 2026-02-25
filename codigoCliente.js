let sistema = new Sistema();

let form = document.getElementById("reserva-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let duenio = document.getElementById("nombre-duenio").value;
  let celular = document.getElementById("telefono").value;
  let email = document.getElementById("email").value;
  let mascota = document.getElementById("nombre-mascota").value;
  let servicio = document.getElementById("servicio").value;
  let profesional = document.getElementById("profesional").value;

  // datetime-local => "YYYY-MM-DDTHH:MM"
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
  } catch (err) {
    alert(err.message);
  }
});

if (typeof module !== "undefined") {
  module.exports = {
    funcion_1,
    funcion_2,
  };
}
