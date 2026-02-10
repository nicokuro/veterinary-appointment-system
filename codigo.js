// PRUEBAS
let reservas = [
    {
        duenio: "Rodrigo Rodriguez",
        mascota: "Roma",
        servicio: "Veterinaria",
        profesional: "Dr. García",
        fecha: "2026-02-10",
        hora: "10:30"
    },
    {
        duenio: "Martin Martinez",
        mascota: "Rocky",
        servicio: "Baño",
        profesional: "Ana",
        fecha: "2026-02-11",
        hora: "11:00"
    }
];

// traugo la table
let tabla = document.getElementById("tablaReservas");

// Recorro y agrego  las reservasa la tabla
reservas.forEach(reserva => {

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