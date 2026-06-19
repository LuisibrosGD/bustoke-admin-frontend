'use client';

import { useParams } from 'next/navigation';
import { Users } from 'lucide-react';
import { getViajeById, getBoletosByViajeId, getRutaById, getTerminalById } from '@/infrastructure/mock/data';
import { PasajerosTable } from '@/features/pasajeros/components/pasajeros-table';

export default function PasajerosViajePage() {
  const params = useParams<{ id: string }>();
  const viaje = getViajeById(params.id);
  const pasCount = viaje ? getBoletosByViajeId(viaje.id).length : 0;

  let rutaLabel = 'Ruta no disponible';
  if (viaje) {
    const ruta = getRutaById(viaje.idRuta);
    if (ruta) {
      const origen = getTerminalById(ruta.idTerminalOrigen);
      const destino = getTerminalById(ruta.idTerminalDestino);
      rutaLabel = `${origen?.nombre ?? '?'} → ${destino?.nombre ?? '?'}`;
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 flex items-center gap-4">
        <div className="flex items-center justify-center size-12 rounded-lg bg-emerald-50 text-emerald-600">
          <Users className="size-6" />
        </div>
        <div>
          <p className="text-lg font-semibold text-neutral-900">
            {pasCount} pasajeros
          </p>
          <p className="text-sm text-neutral-500">
            {rutaLabel} — {viaje?.fechaHoraSalida ? new Date(viaje.fechaHoraSalida).toLocaleDateString('es-PE') : ''}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900">Lista de Pasajeros</h2>
        </div>
        <PasajerosTable />
      </div>
    </div>
  );
}
