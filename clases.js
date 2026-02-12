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

    existeSolape(servicio, fecha, hora) {
        return this.reservas.some(r =>
            r.servicio === servicio &&
            r.fecha === fecha &&
            r.hora === hora
        );
    }

    agregarNuevaReserva(duenio, celular, email, mascota, servicio, profesional, fecha, hora) {
        // Reglas mínimas
        if (this.esFinDeSemana(fecha)) {
            throw new Error("No se permiten reservas los fines de semana.");
        }
        if (!this.validarHorario(hora)) {
            throw new Error("Horario inválido. Permitido entre 09:00 y 18:00.");
        }
        if (this.existeSolape(servicio, fecha, hora)) {
            throw new Error("Ya existe una reserva para ese servicio en ese horario.");
        }

        const nuevaReserva = new Reserva(duenio, celular, email, mascota, servicio, profesional, fecha, hora);
        nuevaReserva.idReserva = this.obtenerIdReserva();

        this.reservas.push(nuevaReserva);
        this.guardarReservas();

        return nuevaReserva;
    }
}

class Reserva {
    constructor(duenio, celular, email, mascota, servicio, profesional, fecha, hora) {
        this.idReserva = 0; // se setea desde Sistema
        this.duenio = duenio;
        this.celular = celular;
        this.email = email;
        this.mascota = mascota;
        this.servicio = servicio;
        this.profesional = profesional;
        this.fecha = fecha; // YYYY-MM-DD
        this.hora = hora;   // HH:MM
        this.fechaCreacion = new Date().toISOString();
    }
}
