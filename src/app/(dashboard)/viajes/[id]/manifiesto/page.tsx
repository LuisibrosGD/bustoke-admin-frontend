'use client';

import { useParams } from 'next/navigation';
import { FileSpreadsheet, Download, Printer } from 'lucide-react';
import { Badge } from '@/components/ui/badge/badge';
import { Button } from '@/components/ui/button/button';
import {
  getViajeById,
  getRutaById,
  getBusById,
  getTerminalById,
  getBoletosByViajeId,
  getPasajeroById,
  getAsientoById,
} from '@/infrastructure/mock/data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const estadoViajeVariant: Record<string, 'info' | 'warning' | 'success' | 'danger'> = {
  programado: 'info',
  en_curso: 'warning',
  finalizado: 'success',
  cancelado: 'danger',
};

const estadoViajeLabel: Record<string, string> = {
  programado: 'Programado',
  en_curso: 'En curso',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
};

export default function ManifiestoViajePage() {
  const params = useParams<{ id: string }>();
  const viaje = getViajeById(params.id);
  const ruta = viaje ? getRutaById(viaje.idRuta) : undefined;
  const bus = viaje ? getBusById(viaje.idBus) : undefined;
  const terminalOrigen = ruta ? getTerminalById(ruta.idTerminalOrigen) : undefined;
  const terminalDestino = ruta ? getTerminalById(ruta.idTerminalDestino) : undefined;
  const boletos = viaje ? getBoletosByViajeId(viaje.id) : [];

  const fechaHoraSalida = viaje ? format(new Date(viaje.fechaHoraSalida), 'dd/MM/yyyy HH:mm', { locale: es }) : '';
  const fechaHoraLlegada = viaje ? format(new Date(viaje.fechaHoraLlegada), 'dd/MM/yyyy HH:mm', { locale: es }) : '';

  const pasajerosManifiesto = boletos.map((b, idx) => {
    const pasajero = getPasajeroById(b.idPasajero);
    const asiento = getAsientoById(b.idAsiento);
    return {
      item: idx + 1,
      nombres: pasajero ? `${pasajero.nombres} ${pasajero.apellidoPaterno} ${pasajero.apellidoMaterno}` : '—',
      documento: pasajero?.numeroDocumento ?? '—',
      asiento: asiento?.numeroAsiento ?? '—',
      tipoAsiento: asiento?.tipoServicio ?? '—',
      boleto: b.codigoQr,
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="size-5 text-red-600" />
            <h2 className="text-base font-semibold text-neutral-900">Manifiesto de Pasajeros</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <Printer className="size-4 mr-1.5" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Download className="size-4 mr-1.5" />
              Exportar PDF
            </Button>
          </div>
        </div>

        <div className="border-2 border-neutral-200 rounded-lg">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 p-5 bg-neutral-50/50 border-b border-neutral-200 text-sm">
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Empresa</p>
              <p className="font-semibold text-neutral-900">Bustoke S.A.C. (*)</p>
              <p className="text-xs text-neutral-500">RUC: 20609876543 (*)</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Ruta</p>
              <p className="font-semibold text-neutral-900">
                {terminalOrigen?.nombre ?? '—'} → {terminalDestino?.nombre ?? '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Bus</p>
              <p className="font-semibold text-neutral-900">{bus?.placa ?? '—'}</p>
              <p className="text-xs text-neutral-500">{bus?.cantidadPisos} piso(s)</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Fecha / Hora</p>
              <p className="font-semibold text-neutral-900">{fechaHoraSalida}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Terminal Origen</p>
              <p className="font-semibold text-neutral-900">{terminalOrigen?.nombre ?? '—'}</p>
              <p className="text-xs text-neutral-500">{terminalOrigen?.direccion}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Terminal Destino</p>
              <p className="font-semibold text-neutral-900">{terminalDestino?.nombre ?? '—'}</p>
              <p className="text-xs text-neutral-500">{terminalDestino?.direccion}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Rampa</p>
              <p className="font-semibold text-neutral-900">{viaje?.rampaEmbarque ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">Estado</p>
              <div className="mt-0.5">
                <Badge variant={estadoViajeVariant[viaje?.estado ?? '']}>
                  {estadoViajeLabel[viaje?.estado ?? ''] ?? '—'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="text-left px-5 py-3 font-medium text-neutral-500 w-10">N°</th>
                  <th className="text-left px-5 py-3 font-medium text-neutral-500">Pasajero</th>
                  <th className="text-left px-5 py-3 font-medium text-neutral-500">Documento</th>
                  <th className="text-left px-5 py-3 font-medium text-neutral-500">Asiento</th>
                  <th className="text-left px-5 py-3 font-medium text-neutral-500">Tipo</th>
                  <th className="text-left px-5 py-3 font-medium text-neutral-500">Boleto</th>
                </tr>
              </thead>
              <tbody>
                {pasajerosManifiesto.map((p) => (
                  <tr key={p.item} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-3 text-neutral-500">{p.item}</td>
                    <td className="px-5 py-3 font-medium text-neutral-900">{p.nombres}</td>
                    <td className="px-5 py-3 text-neutral-600 font-mono">{p.documento}</td>
                    <td className="px-5 py-3 text-neutral-900">{p.asiento}</td>
                    <td className="px-5 py-3">
                      <Badge variant="neutral">{p.tipoAsiento}</Badge>
                    </td>
                    <td className="px-5 py-3 text-neutral-600 font-mono text-xs">{p.boleto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-neutral-200 px-5 py-4 flex items-center justify-between bg-neutral-50/50">
            <div className="text-sm text-neutral-600">
              Total pasajeros: <span className="font-bold text-neutral-900">{pasajerosManifiesto.length}</span>
              <span className="mx-2 text-neutral-300">|</span>
              Hora salida: <span className="font-medium text-neutral-900">{fechaHoraSalida}</span>
              <span className="mx-2 text-neutral-300">|</span>
              Llegada estimada: <span className="font-medium text-neutral-900">{fechaHoraLlegada}</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="info">preparado para API</Badge>
              <span className="text-[10px] text-neutral-300">(*) datos mock — serán reemplazados por datos de la empresa desde DB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
