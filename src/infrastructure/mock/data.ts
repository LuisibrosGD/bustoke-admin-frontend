// ============================================================
// MOCK DATA - BUSTOKE ADMIN PANEL
// Alineado con la BD (nuevadb/scriptbd.sql) y los tipos canónicos
// ============================================================

import type {
  Departamento, Provincia, Distrito, TipoDocumento, Plan,
  Terminal, Agencia, AgenciaTerminal, Bus, Asiento,
  Ruta, TarifaRuta, Viaje, Usuario, Pasajero,
  Boleto, Pago, Reembolso, Reclamo, MensajeReclamo,
  ConfiguracionComision, Suscripcion, Liquidacion,
  ApiKey, TicketSoporte, ManifiestoSutran, HistorialEstadoViaje,
} from '@/infrastructure/domain/types';

// ============================================================
// CATÁLOGOS
// ============================================================

export const MOCK_DEPARTAMENTOS: Departamento[] = [
  { id: '1', nombre: 'Lima' },
  { id: '2', nombre: 'La Libertad' },
  { id: '3', nombre: 'Arequipa' },
  { id: '4', nombre: 'Lambayeque' },
  { id: '5', nombre: 'Cusco' },
  { id: '6', nombre: 'Junín' },
  { id: '7', nombre: 'Piura' },
  { id: '8', nombre: 'Ancash' },
  { id: '9', nombre: 'Ica' },
  { id: '10', nombre: 'Puno' },
];

export const MOCK_PROVINCIAS: Provincia[] = [
  { id: '1', idDepartamento: '1', nombre: 'Lima' },
  { id: '2', idDepartamento: '2', nombre: 'Trujillo' },
  { id: '3', idDepartamento: '3', nombre: 'Arequipa' },
  { id: '4', idDepartamento: '4', nombre: 'Chiclayo' },
  { id: '5', idDepartamento: '5', nombre: 'Cusco' },
  { id: '6', idDepartamento: '6', nombre: 'Huancayo' },
  { id: '7', idDepartamento: '7', nombre: 'Piura' },
  { id: '8', idDepartamento: '8', nombre: 'Santa' },
  { id: '9', idDepartamento: '9', nombre: 'Ica' },
  { id: '10', idDepartamento: '10', nombre: 'San Román' },
];

export const MOCK_DISTRITOS: Distrito[] = [
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

export const MOCK_TIPOS_DOCUMENTO: TipoDocumento[] = [
  { id: '1', nombre: 'DNI', longitudExacta: 8 },
  { id: '2', nombre: 'Pasaporte', longitudExacta: null },
  { id: '3', nombre: 'Carnet de Extranjería', longitudExacta: 9 },
];

export const MOCK_PLANES: Plan[] = [
  { id: '1', nombre: 'Plan Regular', precio: 299.00, limiteBuses: 50 },
  { id: '2', nombre: 'Plan Business', precio: 499.00, limiteBuses: 999 },
];

// ============================================================
// TERMINALES (id_terminal: 1-8 en BD)
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
// AGENCIAS (id_agencia: 1-4 en BD)
// ============================================================

export const MOCK_AGENCIAS: Agencia[] = [
  { id: '1', ruc: '20100234561', razonSocial: 'CRUZ DEL SUR S.A.C.', estado: 'activa', bancoNombre: 'Banco de Crédito del Perú', numeroCuenta: '191-2245678-0-12', cuentaCci: '002-191-002245678012-54' },
  { id: '2', ruc: '20155432109', razonSocial: 'TRANSPORTES OLTURSA S.A.C.', estado: 'activa', bancoNombre: 'BBVA Continental', numeroCuenta: '0011-0123-45-01002345', cuentaCci: '0011-123-0001002345-45' },
  { id: '3', ruc: '20100876543', razonSocial: 'TURISMO CIVA S.A.C.', estado: 'activa', bancoNombre: 'Interbank', numeroCuenta: '200-3001234567', cuentaCci: '003-200-003001234567-22' },
  { id: '4', ruc: '20300456789', razonSocial: 'MOVIL BUS S.A.C.', estado: 'activa', bancoNombre: 'Banco de la Nación', numeroCuenta: '04-015-234561', cuentaCci: '018-015-0004015234561-18' },
];

// ============================================================
// AGENCIA-TERMINAL (pivot)
// ============================================================

export const MOCK_AGENCIA_TERMINALES: AgenciaTerminal[] = [
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
// BUSES (40 en BD - 10 por agencia; seleccionamos 8 representativos)
// ============================================================

export const MOCK_BUSES: Bus[] = [
  { id: '1', idAgencia: '1', placa: 'CGS-100', cantidadPisos: 1 },
  { id: '2', idAgencia: '1', placa: 'CGS-101', cantidadPisos: 2 },
  { id: '3', idAgencia: '1', placa: 'CGS-102', cantidadPisos: 1 },
  { id: '4', idAgencia: '2', placa: 'OLT-100', cantidadPisos: 2 },
  { id: '5', idAgencia: '2', placa: 'OLT-101', cantidadPisos: 1 },
  { id: '6', idAgencia: '3', placa: 'CIV-100', cantidadPisos: 2 },
  { id: '7', idAgencia: '3', placa: 'CIV-101', cantidadPisos: 1 },
  { id: '8', idAgencia: '4', placa: 'MVB-100', cantidadPisos: 2 },
  { id: '9', idAgencia: '4', placa: 'MVB-101', cantidadPisos: 1 },
  { id: '10', idAgencia: '4', placa: 'MVB-102', cantidadPisos: 1 },
];

// ============================================================
// ASIENTOS
// ============================================================

// Generamos asientos para los buses mock con el formato A4-1 (Fila A, Asiento 4, Piso 1)
function generarAsientosMock(): Asiento[] {
  const asientos: Asiento[] = [];
  let id = 1;
  for (const bus of MOCK_BUSES) {
    for (let piso = 1; piso <= bus.cantidadPisos; piso++) {
      for (let f = 1; f <= 10; f++) {
        const fila = String.fromCharCode(64 + f);
        for (let c = 1; c <= 4; c++) {
          asientos.push({
            id: String(id++),
            idBus: bus.id,
            numeroAsiento: `${fila}${c}-${piso}`,
            fila,
            piso,
            tipoServicio: bus.cantidadPisos === 2 && piso === 1 ? 'vip' : 'normal',
            coordX: c <= 2 ? c * 20 : (c * 20) + 5,
            coordY: 10 + ((f - 1) * 9),
            bloqueadoManual: false,
          });
        }
      }
    }
  }
  return asientos;
}

export const MOCK_ASIENTOS: Asiento[] = generarAsientosMock();

// ============================================================
// RUTAS
// ============================================================

export const MOCK_RUTAS: Ruta[] = [
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
// TARIFAS POR RUTA
// ============================================================

export const MOCK_TARIFAS_RUTA: TarifaRuta[] = [
  { id: '1', idRuta: '1', tipoServicio: 'normal', precio: 75.00 },
  { id: '2', idRuta: '1', tipoServicio: 'vip', precio: 110.00 },
  { id: '3', idRuta: '2', tipoServicio: 'normal', precio: 75.00 },
  { id: '4', idRuta: '2', tipoServicio: 'vip', precio: 110.00 },
  { id: '5', idRuta: '3', tipoServicio: 'normal', precio: 115.00 },
  { id: '6', idRuta: '3', tipoServicio: 'vip', precio: 150.00 },
  { id: '7', idRuta: '5', tipoServicio: 'normal', precio: 70.00 },
  { id: '8', idRuta: '5', tipoServicio: 'vip', precio: 105.00 },
  { id: '9', idRuta: '7', tipoServicio: 'normal', precio: 105.00 },
  { id: '10', idRuta: '7', tipoServicio: 'vip', precio: 140.00 },
  { id: '11', idRuta: '8', tipoServicio: 'normal', precio: 65.00 },
  { id: '12', idRuta: '8', tipoServicio: 'vip', precio: 95.00 },
  { id: '13', idRuta: '10', tipoServicio: 'normal', precio: 125.00 },
  { id: '14', idRuta: '10', tipoServicio: 'vip', precio: 165.00 },
  { id: '15', idRuta: '12', tipoServicio: 'normal', precio: 55.00 },
  { id: '16', idRuta: '12', tipoServicio: 'vip', precio: 85.00 },
];

// ============================================================
// VIAJES
// ============================================================

export const MOCK_VIAJES: Viaje[] = [
  { id: '1', idRuta: '1', idBus: '2', fechaHoraSalida: '2026-06-20T22:00:00', fechaHoraLlegada: '2026-06-21T06:00:00', estado: 'programado', rampaEmbarque: 'Andén Norte - Rampa 1' },
  { id: '2', idRuta: '1', idBus: '3', fechaHoraSalida: '2026-06-20T08:00:00', fechaHoraLlegada: '2026-06-20T16:00:00', estado: 'programado', rampaEmbarque: 'Andén Central - Rampa 5' },
  { id: '3', idRuta: '3', idBus: '1', fechaHoraSalida: '2026-06-19T14:30:00', fechaHoraLlegada: '2026-06-20T06:30:00', estado: 'en_curso', rampaEmbarque: 'Andén Central - Rampa 6' },
  { id: '4', idRuta: '5', idBus: '4', fechaHoraSalida: '2026-06-18T08:00:00', fechaHoraLlegada: '2026-06-18T16:00:00', estado: 'finalizado', rampaEmbarque: 'Zona de Embarque - Rampa 10' },
  { id: '5', idRuta: '8', idBus: '6', fechaHoraSalida: '2026-06-21T21:45:00', fechaHoraLlegada: '2026-06-22T09:45:00', estado: 'programado', rampaEmbarque: 'Andén Norte - Rampa 3' },
  { id: '6', idRuta: '12', idBus: '8', fechaHoraSalida: '2026-06-22T08:00:00', fechaHoraLlegada: '2026-06-22T15:00:00', estado: 'programado', rampaEmbarque: 'Andén Central - Rampa 7' },
  { id: '7', idRuta: '10', idBus: '7', fechaHoraSalida: '2026-06-15T14:30:00', fechaHoraLlegada: '2026-06-16T10:30:00', estado: 'cancelado', rampaEmbarque: 'Zona de Embarque - Rampa 12' },
  { id: '8', idRuta: '7', idBus: '4', fechaHoraSalida: '2026-06-25T21:45:00', fechaHoraLlegada: '2026-06-26T13:45:00', estado: 'programado', rampaEmbarque: 'Andén Norte - Rampa 2' },
];

// ============================================================
// USUARIOS (admin/operador)
// ============================================================

export const MOCK_USUARIOS: Usuario[] = [
  { id: '1', email: 'admin.cruz@cruzdelsur.com.pe', telefono: '998765432', rol: 'admin_agencia', idAgencia: '1', activo: true, fechaCreacion: '2026-01-01T00:00:00Z' },
  { id: '2', email: 'admin.oltursa@oltursa.com.pe', telefono: '991234567', rol: 'admin_agencia', idAgencia: '2', activo: true, fechaCreacion: '2026-01-01T00:00:00Z' },
  { id: '3', email: 'admin.civa@civa.com.pe', telefono: '981112233', rol: 'admin_agencia', idAgencia: '3', activo: true, fechaCreacion: '2026-01-01T00:00:00Z' },
  { id: '4', email: 'admin.movil@movilbus.com.pe', telefono: '974556677', rol: 'admin_agencia', idAgencia: '4', activo: true, fechaCreacion: '2026-01-01T00:00:00Z' },
  { id: '5', email: 'sebastian.admin@bustoke.pe', telefono: '987654321', rol: 'superadmin', idAgencia: null, activo: true, fechaCreacion: '2026-01-01T00:00:00Z' },
];

// ============================================================
// PASAJEROS
// ============================================================

export const MOCK_PASAJEROS: Pasajero[] = [
  { id: '1', idUsuario: '1', idTipoDocumento: '1', numeroDocumento: '72145639', nombres: 'Carlos', apellidoPaterno: 'Mendoza', apellidoMaterno: 'Quispe', fechaNacimiento: '1992-05-14' },
  { id: '2', idUsuario: '2', idTipoDocumento: '1', numeroDocumento: '45896321', nombres: 'Ana', apellidoPaterno: 'García', apellidoMaterno: 'Flores', fechaNacimiento: '1988-11-23' },
  { id: '3', idUsuario: null, idTipoDocumento: '3', numeroDocumento: 'CE9876543', nombres: 'John', apellidoPaterno: 'Smith', apellidoMaterno: 'Doe', fechaNacimiento: '1995-02-10' },
  { id: '4', idUsuario: null, idTipoDocumento: '2', numeroDocumento: 'PAS887766', nombres: 'Marie', apellidoPaterno: 'Dubois', apellidoMaterno: 'Leroy', fechaNacimiento: '1999-08-19' },
  { id: '5', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '12345678', nombres: 'Juan', apellidoPaterno: 'Cruz', apellidoMaterno: 'Gómez', fechaNacimiento: '1990-03-15' },
  { id: '6', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '23456789', nombres: 'María', apellidoPaterno: 'Soto', apellidoMaterno: 'Quispe', fechaNacimiento: '1995-07-22' },
  { id: '7', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '34567890', nombres: 'Pedro', apellidoPaterno: 'Torres', apellidoMaterno: 'Ramírez', fechaNacimiento: '1985-11-30' },
  { id: '8', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '45678901', nombres: 'Rosa', apellidoPaterno: 'Ramos', apellidoMaterno: 'Flores', fechaNacimiento: '2000-01-10' },
  { id: '9', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '56789012', nombres: 'Luis', apellidoPaterno: 'Reyes', apellidoMaterno: 'Sánchez', fechaNacimiento: '1993-09-05' },
  { id: '10', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '67890123', nombres: 'Sofía', apellidoPaterno: 'Pérez', apellidoMaterno: 'Díaz', fechaNacimiento: '1997-12-25' },
  { id: '11', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '78901234', nombres: 'Miguel', apellidoPaterno: 'Castro', apellidoMaterno: 'Espinoza', fechaNacimiento: '1991-06-18' },
  { id: '12', idUsuario: null, idTipoDocumento: '1', numeroDocumento: '89012345', nombres: 'Elena', apellidoPaterno: 'Chávez', apellidoMaterno: 'Rojas', fechaNacimiento: '1987-04-14' },
];

// ============================================================
// BOLETOS
// ============================================================

export const MOCK_BOLETOS: Boleto[] = [
  { id: '1', idViaje: '1', idUsuario: '5', idPasajero: '1', idAsiento: getAsientoId('1', 'A4-1'), emailContacto: 'carlos.mendoza@mail.com', canal: 'app_bustoke', codigoQr: 'BKT-QR-2026-50001', usado: false, fechaValidacion: null, precioFinal: 75.00, fechaEmision: '2026-06-18T10:00:00Z', estado: 'activo' },
  { id: '2', idViaje: '1', idUsuario: '5', idPasajero: '2', idAsiento: getAsientoId('1', 'B4-1'), emailContacto: 'ana.garcia@mail.com', canal: 'app_bustoke', codigoQr: 'BKT-QR-2026-50002', usado: false, fechaValidacion: null, precioFinal: 75.00, fechaEmision: '2026-06-18T11:00:00Z', estado: 'activo' },
  { id: '3', idViaje: '3', idUsuario: '5', idPasajero: '3', idAsiento: getAsientoId('1', 'A1-2'), emailContacto: 'john.smith@mail.com', canal: 'app_bustoke', codigoQr: 'BKT-QR-2026-50003', usado: true, fechaValidacion: '2026-06-19T14:00:00Z', precioFinal: 110.00, fechaEmision: '2026-06-18T09:00:00Z', estado: 'activo' },
  { id: '4', idViaje: '3', idUsuario: null, idPasajero: '4', idAsiento: getAsientoId('1', 'B1-2'), emailContacto: 'marie.dubois@mail.com', canal: 'ventanilla_fisica', codigoQr: 'BKT-QR-2026-50004', usado: true, fechaValidacion: '2026-06-19T14:15:00Z', precioFinal: 110.00, fechaEmision: '2026-06-19T08:00:00Z', estado: 'activo' },
  { id: '5', idViaje: '4', idUsuario: '5', idPasajero: '5', idAsiento: getAsientoId('4', 'A1-1'), emailContacto: 'juan.cruz@mail.com', canal: 'app_bustoke', codigoQr: 'BKT-QR-2026-50005', usado: true, fechaValidacion: '2026-06-18T07:45:00Z', precioFinal: 70.00, fechaEmision: '2026-06-17T15:00:00Z', estado: 'activo' },
  { id: '6', idViaje: '4', idUsuario: null, idPasajero: '6', idAsiento: getAsientoId('4', 'A2-1'), emailContacto: 'maria.soto@mail.com', canal: 'app_bustoke', codigoQr: 'BKT-QR-2026-50006', usado: true, fechaValidacion: '2026-06-18T07:50:00Z', precioFinal: 70.00, fechaEmision: '2026-06-17T16:00:00Z', estado: 'activo' },
  { id: '7', idViaje: '7', idUsuario: '5', idPasajero: '7', idAsiento: getAsientoId('7', 'A1-1'), emailContacto: 'pedro.torres@mail.com', canal: 'app_bustoke', codigoQr: 'BKT-QR-2026-50007', usado: false, fechaValidacion: null, precioFinal: 125.00, fechaEmision: '2026-06-14T12:00:00Z', estado: 'cancelado' },
  { id: '8', idViaje: '2', idUsuario: null, idPasajero: '8', idAsiento: getAsientoId('3', 'A1-1'), emailContacto: 'rosa.ramos@mail.com', canal: 'ventanilla_fisica', codigoQr: 'BKT-QR-2026-50008', usado: false, fechaValidacion: null, precioFinal: 75.00, fechaEmision: '2026-06-19T14:00:00Z', estado: 'activo' },
];

// Helper auxiliar para getAsientoId (definido después de MOCK_ASIENTOS)
function getAsientoId(idBus: string, numeroAsiento: string): string {
  const a = MOCK_ASIENTOS.find((as) => as.idBus === idBus && as.numeroAsiento === numeroAsiento);
  return a ? a.id : '1';
}

// ============================================================
// PAGOS
// ============================================================

export const MOCK_PAGOS: Pago[] = [
  { id: '1', idBoleto: '1', metodo: 'yape', montoTotal: 75.00, referenciaTransaccion: 'WALL-TRANS-10001', estado: 'completado' },
  { id: '2', idBoleto: '2', metodo: 'plin', montoTotal: 75.00, referenciaTransaccion: 'WALL-TRANS-10002', estado: 'completado' },
  { id: '3', idBoleto: '3', metodo: 'tarjeta', montoTotal: 110.00, referenciaTransaccion: 'VISA-TOK-10003', estado: 'completado' },
  { id: '4', idBoleto: '4', metodo: 'yape', montoTotal: 110.00, referenciaTransaccion: 'WALL-TRANS-10004', estado: 'completado' },
  { id: '5', idBoleto: '5', metodo: 'plin', montoTotal: 70.00, referenciaTransaccion: 'WALL-TRANS-10005', estado: 'completado' },
  { id: '6', idBoleto: '6', metodo: 'tarjeta', montoTotal: 70.00, referenciaTransaccion: 'VISA-TOK-10006', estado: 'completado' },
  { id: '7', idBoleto: '7', metodo: 'yape', montoTotal: 125.00, referenciaTransaccion: 'WALL-TRANS-10007', estado: 'reembolsado' },
  { id: '8', idBoleto: '8', metodo: 'plin', montoTotal: 75.00, referenciaTransaccion: 'WALL-TRANS-10008', estado: 'completado' },
];

// ============================================================
// REEMBOLSOS
// ============================================================

export const MOCK_REEMBOLSOS: Reembolso[] = [
  { id: '1', idPago: '7', idUsuarioResponsable: '5', montoReembolsado: 62.50, motivo: 'Cancelación por el pasajero - aplica 50% de penalidad según políticas', fechaReembolso: '2026-06-15T10:00:00Z' },
];

// ============================================================
// RECLAMOS Y MENSAJES
// ============================================================

export const MOCK_RECLAMOS: Reclamo[] = [
  { id: '1', idUsuario: '5', idAgencia: '1', motivo: 'Pérdida de Equipaje en Bodega', detalle: 'Al llegar al terminal de Trujillo, mi maleta con ticket Nro 0045 no apareció.', estado: 'en_proceso', fechaCreacion: '2026-06-10T18:00:00Z' },
  { id: '2', idUsuario: '5', idAgencia: '3', motivo: 'Retraso de salida en Terminal', detalle: 'El bus con destino a Cusco programado para las 09:45 PM salió a las 11:30 PM.', estado: 'resuelto', fechaCreacion: '2026-06-12T08:00:00Z' },
  { id: '3', idUsuario: '5', idAgencia: '2', motivo: 'Doble Cobro por Yape', detalle: 'El sistema arrojó error pero el monto de S/. 70.00 fue descontado dos veces.', estado: 'abierto', fechaCreacion: '2026-06-15T14:00:00Z' },
];

export const MOCK_MENSAJES_RECLAMO: MensajeReclamo[] = [
  { id: '1', idReclamo: '1', idUsuario: '5', textMensaje: 'Estimado pasajero, estamos validando el registro de entrega de equipajes.', fecha: '2026-06-11T09:00:00Z' },
  { id: '2', idReclamo: '1', idUsuario: '1', textMensaje: 'Por favor requiero celeridad, tengo pertenencias de trabajo urgentes.', fecha: '2026-06-11T10:30:00Z' },
  { id: '3', idReclamo: '2', idUsuario: '5', textMensaje: 'Pedimos disculpas. El retraso se debió a un control extraordinario de SUTRAN.', fecha: '2026-06-13T09:00:00Z' },
];

// ============================================================
// CONFIGURACIÓN DE COMISIONES
// ============================================================

export const MOCK_COMISIONES: ConfiguracionComision[] = [
  { id: '1', idAgencia: null, porcentajeComision: 10.00, montoFijoComision: 0.00, fechaInicio: '2026-01-01', fechaFin: null },
  { id: '2', idAgencia: '1', porcentajeComision: 8.00, montoFijoComision: 0.00, fechaInicio: '2026-03-01', fechaFin: null },
];

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
// LIQUIDACIONES
// ============================================================

export const MOCK_LIQUIDACIONES: Liquidacion[] = [
  { id: '1', idAgencia: '1', periodo: '2026-05', montoVentas: 15200.00, comisionPlataforma: 1216.00, montoATransferir: 13984.00, estadoPago: 'completado' },
  { id: '2', idAgencia: '2', periodo: '2026-05', montoVentas: 9800.00, comisionPlataforma: 980.00, montoATransferir: 8820.00, estadoPago: 'pendiente' },
  { id: '3', idAgencia: '3', periodo: '2026-05', montoVentas: 7500.00, comisionPlataforma: 750.00, montoATransferir: 6750.00, estadoPago: 'completado' },
  { id: '4', idAgencia: '4', periodo: '2026-05', montoVentas: 3200.00, comisionPlataforma: 320.00, montoATransferir: 2880.00, estadoPago: 'pendiente' },
];

// ============================================================
// API KEYS
// ============================================================

export const MOCK_API_KEYS: ApiKey[] = [
  { id: '1', idAgencia: '1', token: 'bkt_live_cgs_abc123def456', fechaCreacion: '2026-01-15T08:00:00Z', fechaExpiracion: '2027-01-15T08:00:00Z', ultimoUso: '2026-06-18T10:00:00Z', activo: true },
  { id: '2', idAgencia: '2', token: 'bkt_live_olt_ghi789jkl012', fechaCreacion: '2026-02-01T10:00:00Z', fechaExpiracion: '2027-02-01T10:00:00Z', ultimoUso: '2026-06-17T15:00:00Z', activo: true },
  { id: '3', idAgencia: '3', token: 'bkt_test_civ_mno345pqr678', fechaCreacion: '2026-03-10T12:00:00Z', fechaExpiracion: '2027-03-10T12:00:00Z', ultimoUso: null, activo: false },
];

// ============================================================
// TICKETS DE SOPORTE
// ============================================================

export const MOCK_TICKETS_SOPORTE: TicketSoporte[] = [
  { id: '1', idAgencia: '1', asunto: 'Error al generar manifiesto SUTRAN', descripcion: 'Al intentar generar el manifiesto del viaje a Trujillo, el sistema muestra un error de validación.', estado: 'abierto', fechaCreacion: '2026-06-17T10:00:00Z' },
  { id: '2', idAgencia: '2', asunto: 'No puedo iniciar sesión en el panel', descripcion: 'El usuario admin de Oltursa reporta que no puede acceder al panel desde esta mañana.', estado: 'en_revision', fechaCreacion: '2026-06-16T08:30:00Z' },
  { id: '3', idAgencia: '3', asunto: 'Consulta sobre facturación del plan', descripcion: 'Solicitan detalle de los cargos del plan Regular para el periodo mayo.', estado: 'resuelto', fechaCreacion: '2026-06-14T15:00:00Z' },
  { id: '4', idAgencia: '4', asunto: 'Reportes no cargan datos de junio', descripcion: 'Los reportes de ventas del mes de junio muestran datos incorrectos.', estado: 'abierto', fechaCreacion: '2026-06-18T12:00:00Z' },
];

// ============================================================
// MANIFIESTOS SUTRAN
// ============================================================

export const MOCK_MANIFIESTOS_SUTRAN: ManifiestoSutran[] = [
  { id: '1', idViaje: '4', fechaGeneracion: '2026-06-18T07:00:00Z', estadoEnvio: 'enviado', respuestaApi: 'OK' },
  { id: '2', idViaje: '3', fechaGeneracion: '2026-06-19T13:00:00Z', estadoEnvio: 'pendiente', respuestaApi: '' },
  { id: '3', idViaje: '1', fechaGeneracion: '2026-06-19T08:00:00Z', estadoEnvio: 'pendiente', respuestaApi: '' },
];

// ============================================================
// HISTORIAL DE ESTADOS DE VIAJE
// ============================================================

export const MOCK_HISTORIAL_ESTADOS_VIAJE: HistorialEstadoViaje[] = [
  { id: '1', idViaje: '4', estadoAnterior: 'programado', estadoNuevo: 'en_curso', motivo: 'Inicio de viaje programado', idUsuarioResponsable: '1', fechaCambio: '2026-06-18T07:00:00Z' },
  { id: '2', idViaje: '4', estadoAnterior: 'en_curso', estadoNuevo: 'finalizado', motivo: 'Viaje completado según itinerario', idUsuarioResponsable: '1', fechaCambio: '2026-06-18T15:00:00Z' },
  { id: '3', idViaje: '7', estadoAnterior: 'programado', estadoNuevo: 'cancelado', motivo: 'Cancelación por falla mecánica de la unidad', idUsuarioResponsable: '3', fechaCambio: '2026-06-14T10:00:00Z' },
];

// ============================================================
// HELPERS - GET BY ID
// ============================================================

export function getTerminalById(id: string): Terminal | undefined {
  return MOCK_TERMINALES.find((t) => t.id === id);
}

export function getDistritoById(id: string): Distrito | undefined {
  return MOCK_DISTRITOS.find((d) => d.id === id);
}

export function getAgenciaById(id: string): Agencia | undefined {
  return MOCK_AGENCIAS.find((a) => a.id === id);
}

export function getBusById(id: string): Bus | undefined {
  return MOCK_BUSES.find((b) => b.id === id);
}

export function getAsientoById(id: string): Asiento | undefined {
  return MOCK_ASIENTOS.find((a) => a.id === id);
}

export function getRutaById(id: string): Ruta | undefined {
  return MOCK_RUTAS.find((r) => r.id === id);
}

export function getTarifaRutaById(id: string): TarifaRuta | undefined {
  return MOCK_TARIFAS_RUTA.find((t) => t.id === id);
}

export function getViajeById(id: string): Viaje | undefined {
  return MOCK_VIAJES.find((v) => v.id === id);
}

export function getPasajeroById(id: string): Pasajero | undefined {
  return MOCK_PASAJEROS.find((p) => p.id === id);
}

export function getBoletoById(id: string): Boleto | undefined {
  return MOCK_BOLETOS.find((b) => b.id === id);
}

export function getPagoById(id: string): Pago | undefined {
  return MOCK_PAGOS.find((p) => p.id === id);
}

export function getReembolsoById(id: string): Reembolso | undefined {
  return MOCK_REEMBOLSOS.find((r) => r.id === id);
}

export function getPlanById(id: string): Plan | undefined {
  return MOCK_PLANES.find((p) => p.id === id);
}

export function getReclamoById(id: string): Reclamo | undefined {
  return MOCK_RECLAMOS.find((r) => r.id === id);
}

export function getUsuarioById(id: string): Usuario | undefined {
  return MOCK_USUARIOS.find((u) => u.id === id);
}

// ============================================================
// HELPERS - CROSS-REFERENCE
// ============================================================

export function getTerminalesByAgenciaId(idAgencia: string): Terminal[] {
  const ids = MOCK_AGENCIA_TERMINALES
    .filter((at) => at.idAgencia === idAgencia)
    .map((at) => at.idTerminal);
  return MOCK_TERMINALES.filter((t) => ids.includes(t.id));
}

export function getBusesByAgenciaId(idAgencia: string): Bus[] {
  return MOCK_BUSES.filter((b) => b.idAgencia === idAgencia);
}

export function getAsientosByBusId(idBus: string): Asiento[] {
  return MOCK_ASIENTOS.filter((a) => a.idBus === idBus);
}

export function getRutasByAgenciaId(idAgencia: string): Ruta[] {
  return MOCK_RUTAS.filter((r) => r.idAgencia === idAgencia);
}

export function getTarifasByRutaId(idRuta: string): TarifaRuta[] {
  return MOCK_TARIFAS_RUTA.filter((t) => t.idRuta === idRuta);
}

export function getViajesByRutaId(idRuta: string): Viaje[] {
  return MOCK_VIAJES.filter((v) => v.idRuta === idRuta);
}

export function getViajesByAgenciaId(idAgencia: string): Viaje[] {
  const rutaIds = MOCK_RUTAS.filter((r) => r.idAgencia === idAgencia).map((r) => r.id);
  return MOCK_VIAJES.filter((v) => rutaIds.includes(v.idRuta));
}

export function getBoletosByViajeId(idViaje: string): Boleto[] {
  return MOCK_BOLETOS.filter((b) => b.idViaje === idViaje);
}

export function getPagoByBoletoId(idBoleto: string): Pago | undefined {
  return MOCK_PAGOS.find((p) => p.idBoleto === idBoleto);
}

export function getReembolsoByPagoId(idPago: string): Reembolso | undefined {
  return MOCK_REEMBOLSOS.find((r) => r.idPago === idPago);
}

export function getReclamosByAgenciaId(idAgencia: string): Reclamo[] {
  return MOCK_RECLAMOS.filter((r) => r.idAgencia === idAgencia);
}

export function getMensajesByReclamoId(idReclamo: string): MensajeReclamo[] {
  return MOCK_MENSAJES_RECLAMO.filter((m) => m.idReclamo === idReclamo);
}

export function getLiquidacionesByAgenciaId(idAgencia: string): Liquidacion[] {
  return MOCK_LIQUIDACIONES.filter((l) => l.idAgencia === idAgencia);
}

export function getSuscripcionByAgenciaId(idAgencia: string): Suscripcion | undefined {
  return MOCK_SUSCRIPCIONES.find((s) => s.idAgencia === idAgencia);
}

export function getApiKeysByAgenciaId(idAgencia: string): ApiKey[] {
  return MOCK_API_KEYS.filter((k) => k.idAgencia === idAgencia);
}

export function getTicketsByAgenciaId(idAgencia: string): TicketSoporte[] {
  return MOCK_TICKETS_SOPORTE.filter((t) => t.idAgencia === idAgencia);
}

export function getManifiestoByViajeId(idViaje: string): ManifiestoSutran | undefined {
  return MOCK_MANIFIESTOS_SUTRAN.find((m) => m.idViaje === idViaje);
}
