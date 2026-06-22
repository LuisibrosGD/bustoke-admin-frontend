import type {
  Agencia, Asiento, Boleto, Bus, Distrito, Liquidacion, ManifiestoSutran,
  Pasajero, Plan, Reclamo, Ruta, Suscripcion, Terminal, TicketSoporte,
  ApiKey, Viaje, AgenciaTerminal,
} from '../../domain/types';

// ============================================================
// DISTRITOS
// ============================================================

const MOCK_DISTRITOS: Distrito[] = [
  { id: '1', idProvincia: '1', nombre: 'La Victoria' },
  { id: '2', idProvincia: '1', nombre: 'Independencia' },
  { id: '3', idProvincia: '1', nombre: 'San Borja' },
  { id: '4', idProvincia: '1', nombre: 'Santiago de Surco' },
  { id: '5', idProvincia: '2', nombre: 'Trujillo' },
  { id: '6', idProvincia: '2', nombre: 'Moche' },
  { id: '7', idProvincia: '3', nombre: 'Jacobo Hunter' },
  { id: '8', idProvincia: '3', nombre: 'Cercado de Arequipa' },
  { id: '9', idProvincia: '4', nombre: 'Chiclayo' },
  { id: '10', idProvincia: '4', nombre: 'La Victoria (Chiclayo)' },
  { id: '11', idProvincia: '5', nombre: 'Santiago' },
  { id: '12', idProvincia: '5', nombre: 'Wanchaq' },
  { id: '13', idProvincia: '6', nombre: 'Huancayo' },
  { id: '14', idProvincia: '6', nombre: 'El Tambo' },
  { id: '15', idProvincia: '7', nombre: 'Piura' },
  { id: '16', idProvincia: '7', nombre: 'Castilla' },
  { id: '17', idProvincia: '8', nombre: 'Chimbote' },
  { id: '18', idProvincia: '9', nombre: 'Ica' },
  { id: '19', idProvincia: '10', nombre: 'Juliaca' },
];

// ============================================================
// PLANES
// ============================================================

const MOCK_PLANES: Plan[] = [
  { id: '1', nombre: 'Plan Regular', precio: 299.00, limiteBuses: 50 },
  { id: '2', nombre: 'Plan Business', precio: 499.00, limiteBuses: 999 },
];

// ============================================================
// EXPORTED: TERMINALES
// ============================================================

export const MOCK_TERMINALES: Terminal[] = [
  { id: '1', idDistrito: '2', nombre: 'Terminal Terrestre Plaza Norte', direccion: 'Av. Tomás Valle 1530, Independencia - Lima' },
  { id: '2', idDistrito: '3', nombre: 'Terminal Javier Prado - Cruz del Sur', direccion: 'Av. Javier Prado Este 1109, San Borja - Lima' },
  { id: '3', idDistrito: '1', nombre: 'Terminal Civa La Victoria', direccion: 'Av. Paseo de la República 569, La Victoria - Lima' },
  { id: '4', idDistrito: '5', nombre: 'Terminal Terrestre de Trujillo', direccion: 'Panamericana Norte Km. 558, Trujillo' },
  { id: '5', idDistrito: '7', nombre: 'Terrapuerto Arequipa', direccion: 'Av. Arturo Ibáñez s/n, Jacobo Hunter - Arequipa' },
  { id: '6', idDistrito: '9', nombre: 'Terminal Terrestre de Chiclayo', direccion: 'Av. Augusto B. Leguía 1910, Chiclayo' },
  { id: '7', idDistrito: '11', nombre: 'Terminal Terrestre de Cusco', direccion: 'Av. Valle Sagrado de los Incas, Santiago - Cusco' },
  { id: '8', idDistrito: '13', nombre: 'Terminal Terrestre de Huancayo', direccion: 'Av. Evitamiento s/n, El Tambo - Huancayo' },
];

// ============================================================
// AGENCIAS (internal)
// ============================================================

const MOCK_AGENCIAS: Agencia[] = [
  { id: '1', ruc: '20100234561', razonSocial: 'PRESTACIONES DE SERVICIOS CRUZ DEL SUR S.A.C.', estado: 'activa', bancoNombre: 'Banco de Crédito del Perú', numeroCuenta: '191-2245678-0-12', cuentaCci: '002-191-002245678012-54' },
  { id: '2', ruc: '20155432109', razonSocial: 'TRANSPORTES OLTURSA S.A.C.', estado: 'activa', bancoNombre: 'BBVA Continental', numeroCuenta: '0011-0123-45-01002345', cuentaCci: '0011-123-0001002345-45' },
  { id: '3', ruc: '20100876543', razonSocial: 'TURISMO CIVA S.A.C.', estado: 'activa', bancoNombre: 'Interbank', numeroCuenta: '200-3001234567', cuentaCci: '003-200-003001234567-22' },
  { id: '4', ruc: '20300456789', razonSocial: 'MOVIL BUS S.A.C.', estado: 'activa', bancoNombre: 'Banco de la Nación', numeroCuenta: '04-015-234561', cuentaCci: '018-015-0004015234561-18' },
];

// ============================================================
// AGENCIAS TERMINALES (internal pivot)
// ============================================================

const MOCK_AGENCIAS_TERMINALES: AgenciaTerminal[] = [
  { id: '1', idAgencia: '1', idTerminal: '1', nroCounterOficina: 'Counter 15 - Zona Norte' },
  { id: '2', idAgencia: '1', idTerminal: '2', nroCounterOficina: 'Counter Principal 01-10' },
  { id: '3', idAgencia: '1', idTerminal: '4', nroCounterOficina: 'Counter 02 - Nivel 1' },
  { id: '4', idAgencia: '1', idTerminal: '5', nroCounterOficina: 'Counter A-5 Terrapuerto' },
  { id: '5', idAgencia: '2', idTerminal: '1', nroCounterOficina: 'Counter 18 - Zona Norte' },
  { id: '6', idAgencia: '2', idTerminal: '4', nroCounterOficina: 'Counter 06 - Nivel 1' },
  { id: '7', idAgencia: '2', idTerminal: '5', nroCounterOficina: 'Counter B-2 Terrapuerto' },
  { id: '8', idAgencia: '3', idTerminal: '1', nroCounterOficina: 'Counter 05 - Zona Norte' },
  { id: '9', idAgencia: '3', idTerminal: '3', nroCounterOficina: 'Counter Principal Ejecutivo' },
  { id: '10', idAgencia: '3', idTerminal: '6', nroCounterOficina: 'Counter 03 - Chiclayo' },
  { id: '11', idAgencia: '3', idTerminal: '7', nroCounterOficina: 'Counter 12 - Cusco' },
  { id: '12', idAgencia: '4', idTerminal: '1', nroCounterOficina: 'Counter 22 - Zona Norte' },
  { id: '13', idAgencia: '4', idTerminal: '8', nroCounterOficina: 'Counter 01 - Huancayo' },
];

// ============================================================
// BUSES (generated, 10 per agency = 40)
// ============================================================

const MOCK_BUSES: Bus[] = (() => {
  const prefijos = ['CGS', 'OLT', 'CIV', 'MVB'];
  const buses: Bus[] = [];
  let id = 1;
  for (let a = 0; a < 4; a++) {
    for (let i = 0; i < 10; i++) {
      buses.push({
        id: String(id++),
        idAgencia: String(a + 1),
        placa: `${prefijos[a]}-${100 + i}`,
        cantidadPisos: i % 2 === 0 ? 2 : 1,
      });
    }
  }
  return buses;
})();

// ============================================================
// ASIENTOS (generated, 2400 total)
// ============================================================

const MOCK_ASIENTOS: Asiento[] = (() => {
  const asientos: Asiento[] = [];
  let id = 1;
  for (const bus of MOCK_BUSES) {
    for (let piso = 1; piso <= bus.cantidadPisos; piso++) {
      const servicio = bus.cantidadPisos === 2 && piso === 1 ? 'vip' : 'normal';
      for (let f = 1; f <= 10; f++) {
        const fila = String.fromCharCode(64 + f);
        for (let c = 1; c <= 4; c++) {
          asientos.push({
            id: String(id++),
            idBus: bus.id,
            numeroAsiento: `${fila}${c}-${piso}`,
            fila,
            piso,
            tipoServicio: servicio as 'vip' | 'normal',
            coordX: c <= 2 ? c * 20 : c * 20 + 5,
            coordY: 10 + (f - 1) * 9,
            bloqueadoManual: false,
          });
        }
      }
    }
  }
  return asientos;
})();

// ============================================================
// RUTAS (internal, 13 from SQL)
// ============================================================

const MOCK_RUTAS: Ruta[] = [
  { id: '1', idAgencia: '1', idTerminalOrigen: '2', idTerminalDestino: '4', tarifaBase: 70.00 },
  { id: '2', idAgencia: '1', idTerminalOrigen: '4', idTerminalDestino: '2', tarifaBase: 70.00 },
  { id: '3', idAgencia: '1', idTerminalOrigen: '2', idTerminalDestino: '5', tarifaBase: 110.00 },
  { id: '4', idAgencia: '1', idTerminalOrigen: '5', idTerminalDestino: '2', tarifaBase: 110.00 },
  { id: '5', idAgencia: '2', idTerminalOrigen: '1', idTerminalDestino: '4', tarifaBase: 65.00 },
  { id: '6', idAgencia: '2', idTerminalOrigen: '4', idTerminalDestino: '1', tarifaBase: 65.00 },
  { id: '7', idAgencia: '2', idTerminalOrigen: '1', idTerminalDestino: '5', tarifaBase: 100.00 },
  { id: '8', idAgencia: '3', idTerminalOrigen: '3', idTerminalDestino: '6', tarifaBase: 60.00 },
  { id: '9', idAgencia: '3', idTerminalOrigen: '6', idTerminalDestino: '3', tarifaBase: 60.00 },
  { id: '10', idAgencia: '3', idTerminalOrigen: '3', idTerminalDestino: '7', tarifaBase: 120.00 },
  { id: '11', idAgencia: '3', idTerminalOrigen: '7', idTerminalDestino: '3', tarifaBase: 120.00 },
  { id: '12', idAgencia: '4', idTerminalOrigen: '1', idTerminalDestino: '8', tarifaBase: 50.00 },
  { id: '13', idAgencia: '4', idTerminalOrigen: '8', idTerminalDestino: '1', tarifaBase: 50.00 },
];

// ============================================================
// PASAJEROS
// ============================================================

export const MOCK_PASAJEROS: Pasajero[] = [
  { id: '1', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '72145639', nombres: 'Carlos', apellidoPaterno: 'Mendoza', apellidoMaterno: 'Quispe', fechaNacimiento: '1992-05-14' },
  { id: '2', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '45896321', nombres: 'Ana', apellidoPaterno: 'García', apellidoMaterno: 'Flores', fechaNacimiento: '1988-11-23' },
  { id: '3', idUsuario: null, idTipoDocumento: '3', numeroDocumento: 'CE9876543', nombres: 'John', apellidoPaterno: 'Smith', apellidoMaterno: 'Doe', fechaNacimiento: '1995-02-10' },
  { id: '4', idUsuario: null, idTipoDocumento: '2', numeroDocumento: 'PAS887766', nombres: 'Marie', apellidoPaterno: 'Dubois', apellidoMaterno: 'Leroy', fechaNacimiento: '1999-08-19' },
  { id: '5', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '12345678', nombres: 'Juan', apellidoPaterno: 'Cruz', apellidoMaterno: 'Gómez', fechaNacimiento: '1990-03-12' },
  { id: '6', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '23456789', nombres: 'Luis', apellidoPaterno: 'Soto', apellidoMaterno: 'Quispe', fechaNacimiento: '1985-07-25' },
  { id: '7', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '34567890', nombres: 'María', apellidoPaterno: 'Torres', apellidoMaterno: 'Ramírez', fechaNacimiento: '1993-11-02' },
  { id: '8', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '45678901', nombres: 'Pedro', apellidoPaterno: 'Ramos', apellidoMaterno: 'Flores', fechaNacimiento: '1987-09-18' },
  { id: '9', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '56789012', nombres: 'Rosa', apellidoPaterno: 'Reyes', apellidoMaterno: 'Sánchez', fechaNacimiento: '1991-04-30' },
  { id: '10', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '67890123', nombres: 'Jorge', apellidoPaterno: 'Pérez', apellidoMaterno: 'Díaz', fechaNacimiento: '1984-12-05' },
  { id: '11', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '78901234', nombres: 'Elena', apellidoPaterno: 'Castro', apellidoMaterno: 'Espinoza', fechaNacimiento: '1996-06-21' },
  { id: '12', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '89012345', nombres: 'Miguel', apellidoPaterno: 'Chávez', apellidoMaterno: 'Rojas', fechaNacimiento: '1982-08-14' },
  { id: '13', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '90123456', nombres: 'Sofia', apellidoPaterno: 'Luna', apellidoMaterno: 'Benitez', fechaNacimiento: '1994-01-28' },
  { id: '14', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '01234567', nombres: 'David', apellidoPaterno: 'Vargas', apellidoMaterno: 'Campos', fechaNacimiento: '1989-10-09' },
  { id: '15', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '11223344', nombres: 'Lucía', apellidoPaterno: 'Mendoza', apellidoMaterno: 'Salazar', fechaNacimiento: '1997-05-22' },
  { id: '16', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '22334455', nombres: 'Diego', apellidoPaterno: 'Torres', apellidoMaterno: 'Huamán', fechaNacimiento: '1986-03-15' },
  { id: '17', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '33445566', nombres: 'Valentina', apellidoPaterno: 'Reyes', apellidoMaterno: 'Ramírez', fechaNacimiento: '1998-12-01' },
  { id: '18', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '44556677', nombres: 'Andrés', apellidoPaterno: 'Quispe', apellidoMaterno: 'Flores', fechaNacimiento: '1983-07-20' },
  { id: '19', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '55667788', nombres: 'Camila', apellidoPaterno: 'Pérez', apellidoMaterno: 'Díaz', fechaNacimiento: '1995-09-10' },
  { id: '20', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '66778899', nombres: 'Fernando', apellidoPaterno: 'Cruz', apellidoMaterno: 'Gómez', fechaNacimiento: '1981-02-28' },
];

// ============================================================
// VIAJES (generated: 13 rutas × 3 días × ~4.5 turnos)
// ============================================================

export const MOCK_VIAJES: Viaje[] = (() => {
  const viajes: Viaje[] = [];
  let id = 1;
  const horarios = ['07:00:00', '11:00:00', '15:30:00', '20:00:00', '22:30:00'];
  const duracionHoras: Record<string, number> = {
    '1': 8, '2': 8, '3': 16, '4': 16, '5': 8, '6': 8, '7': 16,
    '8': 12, '9': 12, '10': 20, '11': 20, '12': 7, '13': 7,
  };

  for (const ruta of MOCK_RUTAS) {
    const duracion = duracionHoras[ruta.id];
    const agencyBuses = MOCK_BUSES.filter(b => b.idAgencia === ruta.idAgencia);
    for (let dia = 0; dia < 3; dia++) {
      const turnos = dia % 2 === 0 ? 5 : 4;
      for (let t = 0; t < turnos; t++) {
        const busIdx = (dia + t) % agencyBuses.length;
        const bus = agencyBuses[busIdx];
        const salidaStr = `2026-06-${String(23 + dia).padStart(2, '0')}T${horarios[t]}.000Z`;
        const salida = new Date(salidaStr);
        const llegada = new Date(salida.getTime() + duracion * 3600000);
        viajes.push({
          id: String(id++),
          idRuta: ruta.id,
          idBus: bus.id,
          fechaHoraSalida: salida.toISOString(),
          fechaHoraLlegada: llegada.toISOString(),
          estado: 'programado',
          rampaEmbarque: `Andén ${(t % 4) + 1} - Rampa ${(Number(ruta.id) + t + dia) % 15 + 1}`,
        });
      }
    }
  }
  return viajes;
})();

// ============================================================
// BOLETOS (30 boletos for first ~15 viajes)
// ============================================================

export const MOCK_BOLETOS: Boleto[] = (() => {
  const boletos: Boleto[] = [];
  let id = 1;
  for (let viajeIdx = 1; viajeIdx <= 15 && id <= 30; viajeIdx++) {
    const viaje = MOCK_VIAJES.find(v => v.id === String(viajeIdx));
    if (!viaje) continue;
    const busAsientos = MOCK_ASIENTOS.filter(a => a.idBus === viaje.idBus);
    const numBoletos = viajeIdx <= 5 ? 3 : 2;
    for (let b = 0; b < numBoletos && b < busAsientos.length && id <= 30; b++) {
      const asiento = busAsientos[b];
      const pasajero = MOCK_PASAJEROS[(id - 1) % MOCK_PASAJEROS.length];
      boletos.push({
        id: String(id),
        idViaje: viaje.id,
        idUsuario: null,
        idPasajero: pasajero.id,
        idAsiento: asiento.id,
        emailContacto: `pasajero.contacto${id}@mail.com`,
        canal: id % 4 === 0 ? 'ventanilla_fisica' : 'app_bustoke',
        codigoQr: `BKT-QR-2026-${String(50000 + id)}`,
        usado: viajeIdx <= 3,
        fechaValidacion: viajeIdx <= 3 ? '2026-06-23T12:00:00.000Z' : null,
        precioFinal: asiento.tipoServicio === 'vip' ? (viajeIdx <= 4 ? 110 : 150) : (viajeIdx <= 4 ? 75 : 115),
        fechaEmision: '2026-06-22T10:00:00.000Z',
        estado: 'activo',
      });
      id++;
    }
  }
  return boletos;
})();

// ============================================================
// SUSCRIPCIONES
// ============================================================

export const MOCK_SUSCRIPCIONES: Suscripcion[] = [
  { id: '1', idAgencia: '1', idPlan: '1', montoMensual: 299.00, fechaFacturacion: '2026-06-01', estadoCobro: 'completado' },
  { id: '2', idAgencia: '2', idPlan: '1', montoMensual: 299.00, fechaFacturacion: '2026-06-01', estadoCobro: 'completado' },
  { id: '3', idAgencia: '3', idPlan: '1', montoMensual: 299.00, fechaFacturacion: '2026-06-01', estadoCobro: 'completado' },
  { id: '4', idAgencia: '4', idPlan: '1', montoMensual: 299.00, fechaFacturacion: '2026-06-01', estadoCobro: 'pendiente' },
];

// ============================================================
// RECLAMOS
// ============================================================

export const MOCK_RECLAMOS: Reclamo[] = [
  { id: '1', idUsuario: '10', idAgencia: '1', motivo: 'Pérdida de Equipaje en Bodega', detalle: 'Al llegar al terminal de Trujillo, mi maleta de equipaje con ticket Nro 0045 no apareció en la bodega del bus.', estado: 'en_proceso', fechaCreacion: '2026-06-15T14:30:00.000Z' },
  { id: '2', idUsuario: '15', idAgencia: '3', motivo: 'Retraso de salida en Terminal', detalle: 'El bus con destino a Cusco programado para las 09:45 PM terminó saliendo del terminal a las 11:30 PM sin previo aviso.', estado: 'resuelto', fechaCreacion: '2026-06-10T22:15:00.000Z' },
  { id: '3', idUsuario: '22', idAgencia: '2', motivo: 'Doble Cobro por Yape', detalle: 'El sistema arrojó error en el primer intento pero el monto de S/. 70.00 fue descontado dos veces de mi saldo.', estado: 'abierto', fechaCreacion: '2026-06-18T09:45:00.000Z' },
  { id: '4', idUsuario: '18', idAgencia: '4', motivo: 'Mal estado del bus durante el viaje', detalle: 'El aire acondicionado no funcionó durante todo el trayecto Lima - Huancayo. Muy mala experiencia.', estado: 'abierto', fechaCreacion: '2026-06-20T16:00:00.000Z' },
  { id: '5', idUsuario: '12', idAgencia: '1', motivo: 'Atención al cliente deficiente', detalle: 'El tripulante de cabina fue grosero al solicitar una manta adicional. Viaje 23:30 Lima - Trujillo.', estado: 'en_proceso', fechaCreacion: '2026-06-19T08:30:00.000Z' },
];

// ============================================================
// TICKETS DE SOPORTE
// ============================================================

export const MOCK_TICKETS_SOPORTE: TicketSoporte[] = [
  { id: '1', idAgencia: '1', asunto: 'Problema con impresión de boletos', descripcion: 'La impresora del counter 15 no imprime los códigos QR correctamente.', estado: 'resuelto', fechaCreacion: '2026-06-05T08:00:00.000Z' },
  { id: '2', idAgencia: '2', asunto: 'Error al asignar buses en el sistema', descripcion: 'No puedo asignar un bus de reemplazo cuando una unidad falla.', estado: 'en_revision', fechaCreacion: '2026-06-12T11:30:00.000Z' },
  { id: '3', idAgencia: '3', asunto: 'Solicitud de nuevo usuario administrador', descripcion: 'Necesito crear una cuenta de administrador adicional para mi jefe de operaciones.', estado: 'abierto', fechaCreacion: '2026-06-19T15:20:00.000Z' },
  { id: '4', idAgencia: '4', asunto: 'Reporte de liquidaciones no cuadra', descripcion: 'El monto a transferir del periodo Mayo 2026 no coincide con mis ventas reales.', estado: 'en_revision', fechaCreacion: '2026-06-17T10:00:00.000Z' },
  { id: '5', idAgencia: '1', asunto: 'Capacitación para nuevo personal', descripcion: 'Solicito una capacitación virtual para 3 nuevos colaboradores en el uso del panel admin.', estado: 'abierto', fechaCreacion: '2026-06-20T09:15:00.000Z' },
];

// ============================================================
// LIQUIDACIONES
// ============================================================

export const MOCK_LIQUIDACIONES: Liquidacion[] = [
  { id: '1', idAgencia: '1', periodo: '2026-05', montoVentas: 45800.00, comisionPlataforma: 4580.00, montoATransferir: 41220.00, estadoPago: 'completado' },
  { id: '2', idAgencia: '2', periodo: '2026-05', montoVentas: 38500.00, comisionPlataforma: 3850.00, montoATransferir: 34650.00, estadoPago: 'completado' },
  { id: '3', idAgencia: '3', periodo: '2026-05', montoVentas: 31200.00, comisionPlataforma: 3120.00, montoATransferir: 28080.00, estadoPago: 'completado' },
  { id: '4', idAgencia: '4', periodo: '2026-05', montoVentas: 18900.00, comisionPlataforma: 1890.00, montoATransferir: 17010.00, estadoPago: 'pendiente' },
  { id: '5', idAgencia: '1', periodo: '2026-06', montoVentas: 52300.00, comisionPlataforma: 5230.00, montoATransferir: 47070.00, estadoPago: 'pendiente' },
  { id: '6', idAgencia: '2', periodo: '2026-06', montoVentas: 44100.00, comisionPlataforma: 4410.00, montoATransferir: 39690.00, estadoPago: 'pendiente' },
  { id: '7', idAgencia: '3', periodo: '2026-06', montoVentas: 36700.00, comisionPlataforma: 3670.00, montoATransferir: 33030.00, estadoPago: 'pendiente' },
  { id: '8', idAgencia: '4', periodo: '2026-06', montoVentas: 21500.00, comisionPlataforma: 2150.00, montoATransferir: 19350.00, estadoPago: 'pendiente' },
];

// ============================================================
// MANIFIESTOS SUTRAN
// ============================================================

export const MOCK_MANIFIESTOS_SUTRAN: ManifiestoSutran[] = [
  { id: '1', idViaje: '1', fechaGeneracion: '2026-06-22T06:00:00.000Z', estadoEnvio: 'enviado', respuestaApi: 'OK - Manifiesto registrado con código SUTRAN-2026-001234' },
  { id: '2', idViaje: '5', fechaGeneracion: '2026-06-22T06:00:00.000Z', estadoEnvio: 'enviado', respuestaApi: 'OK - Manifiesto registrado con código SUTRAN-2026-001235' },
  { id: '3', idViaje: '8', fechaGeneracion: '2026-06-22T06:00:00.000Z', estadoEnvio: 'pendiente', respuestaApi: 'Pendiente de envío por mantenimiento de API SUTRAN' },
  { id: '4', idViaje: '12', fechaGeneracion: '2026-06-22T06:00:00.000Z', estadoEnvio: 'enviado', respuestaApi: 'OK - Manifiesto registrado con código SUTRAN-2026-001236' },
  { id: '5', idViaje: '16', fechaGeneracion: '2026-06-22T06:00:00.000Z', estadoEnvio: 'rechazado', respuestaApi: 'ERROR: Datos del chofer no coinciden con registro SUTRAN. Revisar licencia.' },
  { id: '6', idViaje: '22', fechaGeneracion: '2026-06-22T06:00:00.000Z', estadoEnvio: 'enviado', respuestaApi: 'OK - Manifiesto registrado con código SUTRAN-2026-001237' },
  { id: '7', idViaje: '30', fechaGeneracion: '2026-06-22T06:00:00.000Z', estadoEnvio: 'enviado', respuestaApi: 'OK - Manifiesto registrado con código SUTRAN-2026-001238' },
  { id: '8', idViaje: '45', fechaGeneracion: '2026-06-22T06:00:00.000Z', estadoEnvio: 'pendiente', respuestaApi: 'En cola de procesamiento - Sistema SUTRAN con alta demanda' },
];

// ============================================================
// API KEYS
// ============================================================

export const MOCK_API_KEYS: ApiKey[] = [
  { id: '1', idAgencia: '1', token: 'bkt_api_live_cruz_2f8a1b3c7d9e4f5g6h7i8j9k0l1m2n3o', fechaCreacion: '2026-01-01T00:00:00.000Z', fechaExpiracion: '2027-01-01T00:00:00.000Z', ultimoUso: '2026-06-20T18:30:00.000Z', activo: true },
  { id: '2', idAgencia: '2', token: 'bkt_api_live_olt_3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r', fechaCreacion: '2026-01-01T00:00:00.000Z', fechaExpiracion: '2027-01-01T00:00:00.000Z', ultimoUso: '2026-06-19T14:20:00.000Z', activo: true },
  { id: '3', idAgencia: '3', token: 'bkt_api_live_civa_5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t', fechaCreacion: '2026-01-01T00:00:00.000Z', fechaExpiracion: '2027-01-01T00:00:00.000Z', ultimoUso: null, activo: true },
  { id: '4', idAgencia: '4', token: 'bkt_api_live_mvb_6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u', fechaCreacion: '2026-01-01T00:00:00.000Z', fechaExpiracion: '2027-01-01T00:00:00.000Z', ultimoUso: '2026-06-15T09:45:00.000Z', activo: true },
];

// ============================================================
// LOOKUP FUNCTIONS
// ============================================================

export function getAgenciaById(id: string): Agencia | undefined {
  return MOCK_AGENCIAS.find(a => a.id === id);
}

export function getBusById(id: string): Bus | undefined {
  return MOCK_BUSES.find(b => b.id === id);
}

export function getRutaById(id: string): Ruta | undefined {
  return MOCK_RUTAS.find(r => r.id === id);
}

export function getViajeById(id: string): Viaje | undefined {
  return MOCK_VIAJES.find(v => v.id === id);
}

export function getTerminalById(id: string): Terminal | undefined {
  return MOCK_TERMINALES.find(t => t.id === id);
}

export function getBoletosByViajeId(viajeId: string): Boleto[] {
  return MOCK_BOLETOS.filter(b => b.idViaje === viajeId);
}

export function getPasajeroById(id: string): Pasajero | undefined {
  return MOCK_PASAJEROS.find(p => p.id === id);
}

export function getAsientoById(id: string): Asiento | undefined {
  return MOCK_ASIENTOS.find(a => a.id === id);
}

export function getDistritoById(id: string): Distrito | undefined {
  return MOCK_DISTRITOS.find(d => d.id === id);
}

export function getPlanById(id: string): Plan | undefined {
  return MOCK_PLANES.find(p => p.id === id);
}

export function getBusesByAgenciaId(agenciaId: string): Bus[] {
  return MOCK_BUSES.filter(b => b.idAgencia === agenciaId);
}

export function getRutasByAgenciaId(agenciaId: string): Ruta[] {
  return MOCK_RUTAS.filter(r => r.idAgencia === agenciaId);
}

export function getViajesByAgenciaId(agenciaId: string): Viaje[] {
  const rutasDeAgencia = MOCK_RUTAS.filter(r => r.idAgencia === agenciaId).map(r => r.id);
  return MOCK_VIAJES.filter(v => rutasDeAgencia.includes(v.idRuta));
}

export function getViajesByRutaId(rutaId: string): Viaje[] {
  return MOCK_VIAJES.filter(v => v.idRuta === rutaId);
}

export function getTerminalesByAgenciaId(agenciaId: string): Terminal[] {
  const terminalIds = MOCK_AGENCIAS_TERMINALES
    .filter(at => at.idAgencia === agenciaId)
    .map(at => at.idTerminal);
  return MOCK_TERMINALES.filter(t => terminalIds.includes(t.id));
}

export function getAsientosByBusId(busId: string): Asiento[] {
  return MOCK_ASIENTOS.filter(a => a.idBus === busId);
}

// ============================================================
// MOCK REPOSITORY CLASS
// ============================================================

export class MockRepository<T> {
  private data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  async list(): Promise<T[]> {
    return this.data;
  }

  async getById(id: string): Promise<T | null> {
    return this.data.find((item: any) => item.id === id) || null;
  }

  async create(item: Partial<T>): Promise<T> {
    const newId = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const newItem = { ...item, id: newId } as unknown as T;
    this.data.push(newItem);
    return newItem;
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    const index = this.data.findIndex((i: any) => i.id === id);
    if (index === -1) throw new Error(`Item with id ${id} not found`);
    this.data[index] = { ...this.data[index], ...item };
    return this.data[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.data.findIndex((i: any) => i.id === id);
    if (index === -1) return false;
    this.data.splice(index, 1);
    return true;
  }
}
