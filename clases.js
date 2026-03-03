class Sistema {
  constructor() {
    this.reservas = this.cargarReservas();
    this.proximoIdReserva = this.calcularProximoId();
  }

  // Persistencia
  cargarReservas() {
    let data = localStorage.getItem("reservas");
    return data ? JSON.parse(data) : [];
  }

  guardarReservas() {
    localStorage.setItem("reservas", JSON.stringify(this.reservas));
  }

  calcularProximoId() {
    if (this.reservas.length === 0) return 1;

    let maxId = 0;
    for (let r of this.reservas) {
      if (typeof r.idReserva === "number" && r.idReserva > maxId) {
        maxId = r.idReserva;
      }
    }
    return maxId + 1;
  }

  obtenerIdReserva() {
    let idActual = this.proximoIdReserva;
    this.proximoIdReserva++;
    return idActual;
  }

  // Helpers de validación (según relevamiento)
  esFinDeSemana(fecha) {
    const d = new Date(fecha + "T00:00:00");
    const day = d.getDay(); // 0 dom, 6 sáb
    return day === 0 || day === 6;
  }

  validarHorario(hora) {
    // hora "HH:MM"
    const [hh, mm] = hora.split(":").map(Number);
    if (Number.isNaN(hh) || Number.isNaN(mm)) return false;

    // 09:00 a 18:00
    if (hh < 9) return false;
    if (hh > 18) return false;
    if (hh === 18 && mm > 0) return false;
    return true;
  }

    //Helpers para evitar solapes de consultas
    // Convierte fecha "YYYY-MM-DD" y hora "HH:MM" a Date
  fechaHoraAdate(fecha, hora) {
    return new Date(`${fecha}T${hora}:00`);
  }

  // Devuelve inicio y fin (Date) segun duracion
  obtenerRangoReserva(fecha, hora, duracionMin) {
    const inicio = this.fechaHoraAdate(fecha, hora);
    const fin = new Date(inicio.getTime() + duracionMin * 60 * 1000);
    return { inicio, fin };
  }

  // Solape de rangos: [aInicio, aFin) con [bInicio, bFin)
  seSolapan(aInicio, aFin, bInicio, bFin) {
    return aInicio < bFin && bInicio < aFin;
  }

  existeSolape(servicio, fecha, hora, duracionMinNueva) {
  const { inicio: inicioNueva, fin: finNueva } =
    this.obtenerRangoReserva(fecha, hora, duracionMinNueva);

  return this.reservas.some((r) => {
    // misma fecha y mismo servicio
    if (r.fecha !== fecha) return false;
    if (r.servicio !== servicio) return false;

    const duracionExistente =
      r.duracionMin ?? this.obtenerDuracionPorServicio(r.servicio);

    const { inicio: inicioExistente, fin: finExistente } =
      this.obtenerRangoReserva(r.fecha, r.hora, duracionExistente);

    return this.seSolapan(inicioNueva, finNueva, inicioExistente, finExistente);
  });
}

  agregarNuevaReserva(
    duenio,
    celular,
    email,
    mascota,
    servicio,
    profesional,
    fecha,
    hora
  ) {
    // Reglas mínimas
    if (this.esFinDeSemana(fecha)) {
      throw new Error("No se permiten reservas los fines de semana.");
    }
    if (!this.validarHorario(hora)) {
      throw new Error("Horario inválido. Permitido entre 09:00 y 18:00.");
    }
    //calcular duracion segun servicio
    let duracionMin = this.obtenerDuracionPorServicio(servicio);

    if (this.existeSolape(servicio, fecha, hora, duracionMin)) {
      throw new Error(
        "Ya existe una reserva para ese servicio en ese horario."
      );
    }

    const nuevaReserva = new Reserva(
      duenio,
      celular,
      email,
      mascota,
      servicio,
      profesional,
      fecha,
      hora,
      duracionMin
    );
    nuevaReserva.idReserva = this.obtenerIdReserva();

    this.reservas.push(nuevaReserva);
    this.guardarReservas();

    return nuevaReserva;
  }

  obtenerDuracionPorServicio(servicio)
  {
  const s = servicio.toLowerCase();

  if (s.includes("consulta")) return 30;
  if (s.includes("baño") || s.includes("banio")) return 60;
  if (s.includes("peluquer")) return 60;

  // fallback si agregan servicios nuevos
  return 30;
  }
}

class Reserva {
  constructor(
    duenio,
    celular,
    email,
    mascota,
    servicio,
    profesional,
    fecha,
    hora,
    duracionMin
  ) {
    this.idReserva = 0; // se setea desde Sistema
    this.duenio = duenio;
    this.celular = celular;
    this.email = email;
    this.mascota = mascota;
    this.servicio = servicio;
    this.profesional = profesional;
    this.fecha = fecha; // YYYY-MM-DD
    this.hora = hora; // HH:MM
    this.duracionMin = duracionMin;
    this.fechaCreacion = new Date().toISOString();
  }
}

if (typeof module !== "undefined") {
  module.exports = { Sistema, Reserva };
}
