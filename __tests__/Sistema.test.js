const { Sistema } = require("../clases");

beforeEach(() => {
  global.localStorage = {
    data: {},
    getItem(key) {
      return this.data[key] || null;
    },
    setItem(key, value) {
      this.data[key] = value;
    },
    clear() {
      this.data = {};
    },
  };
});

test("Crea una reserva válida correctamente", () => {
  const sistema = new Sistema();

  const reserva = sistema.agregarNuevaReserva(
    "Juan",
    "099123123",
    "juan@mail.com",
    "Firulais",
    "Baño",
    "Dr. Pérez",
    "2026-02-24",
    "10:00"
  );

  expect(reserva.idReserva).toBe(1);
  expect(sistema.reservas.length).toBe(1);
});

test("No permite reservas en fin de semana", () => {
  const sistema = new Sistema();

  expect(() => {
    sistema.agregarNuevaReserva(
      "Juan",
      "099123123",
      "juan@mail.com",
      "Firulais",
      "Baño",
      "Dr. Pérez",
      "2026-02-22", // Domingo
      "10:00"
    );
  }).toThrow("No se permiten reservas los fines de semana.");
});

test("No permite horario antes de las 09:00", () => {
  const sistema = new Sistema();

  expect(() => {
    sistema.agregarNuevaReserva(
      "Juan",
      "099123123",
      "juan@mail.com",
      "Firulais",
      "Baño",
      "Dr. Pérez",
      "2026-02-24",
      "08:00"
    );
  }).toThrow("Horario inválido");
});

test("No permite dos reservas del mismo servicio en mismo horario", () => {
  const sistema = new Sistema();

  sistema.agregarNuevaReserva(
    "Juan",
    "099123123",
    "juan@mail.com",
    "Firulais",
    "Baño",
    "Dr. Pérez",
    "2026-02-24",
    "10:00"
  );

  expect(() => {
    sistema.agregarNuevaReserva(
      "Ana",
      "099555555",
      "ana@mail.com",
      "Luna",
      "Baño", // mismo servicio
      "Dr. Pérez",
      "2026-02-24",
      "10:00"
    );
  }).toThrow("Ya existe una reserva");
});

test("El ID de reserva se incrementa automáticamente", () => {
  const sistema = new Sistema();

  const r1 = sistema.agregarNuevaReserva(
    "Juan",
    "099123123",
    "juan@mail.com",
    "Firulais",
    "Baño",
    "Dr. Pérez",
    "2026-02-24",
    "10:00"
  );

  const r2 = sistema.agregarNuevaReserva(
    "Ana",
    "099555555",
    "ana@mail.com",
    "Luna",
    "Consulta",
    "Dr. López",
    "2026-02-24",
    "11:00"
  );

  expect(r1.idReserva).toBe(1);
  expect(r2.idReserva).toBe(2);
});
