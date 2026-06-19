'use client';

import { useParams } from 'next/navigation';
import { Armchair, Bus, Sofa, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge/badge';
import { getViajeById, getBusById, getAsientosByBusId, getBoletosByViajeId } from '@/infrastructure/mock/data';
import type { Asiento } from '@/infrastructure/domain/types';

const tipoServicioIcon: Record<string, typeof Armchair> = {
  normal: Sofa,
  vip: Crown,
};

const tipoServicioLabel: Record<string, string> = {
  normal: 'Normal',
  vip: 'VIP',
};

const estadoStyle: Record<string, string> = {
  disponible: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
  ocupado: 'bg-neutral-100 border-neutral-300 text-neutral-400 cursor-not-allowed',
  mantenimiento: 'bg-yellow-50 border-yellow-200 text-yellow-600',
};

const estadoLabel: Record<string, string> = {
  disponible: 'Disponible',
  ocupado: 'Ocupado',
  mantenimiento: 'Mantenimiento',
};

function getAsientoEstado(asiento: Asiento, asientosOcupados: Set<string>): string {
  if (asiento.bloqueadoManual) return 'mantenimiento';
  if (asientosOcupados.has(asiento.id)) return 'ocupado';
  return 'disponible';
}

function SeatCard({ asiento, row, col, asientosOcupados }: { asiento: Asiento; row: number; col: number; asientosOcupados: Set<string> }) {
  const estado = getAsientoEstado(asiento, asientosOcupados);
  const Icon = tipoServicioIcon[asiento.tipoServicio] ?? Armchair;
  return (
    <div
      data-seat-id={asiento.id}
      data-row={row}
      data-col={col}
      data-piso={asiento.piso}
      data-tipo-servicio={asiento.tipoServicio}
      data-estado={estado}
      className={`flex flex-col items-center justify-center gap-1 size-14 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${estadoStyle[estado]}`}
      title={`${asiento.numeroAsiento} — ${tipoServicioLabel[asiento.tipoServicio]} — ${estadoLabel[estado]}`}
    >
      <Icon className="size-5" />
      <span className="leading-none">{asiento.numeroAsiento}</span>
    </div>
  );
}

export default function AsientosViajePage() {
  const params = useParams<{ id: string }>();
  const viaje = getViajeById(params.id);
  const bus = viaje ? getBusById(viaje.idBus) : undefined;
  const asientos = bus ? getAsientosByBusId(bus.id) : [];

  const boletos = viaje ? getBoletosByViajeId(viaje.id) : [];
  const asientosOcupados = new Set(boletos.map(b => b.idAsiento));

  const piso1 = asientos.filter((a) => a.piso === 1);
  const piso2 = asientos.filter((a) => a.piso === 2);

  const totalDisponibles = asientos.filter((a) => getAsientoEstado(a, asientosOcupados) === 'disponible').length;
  const totalOcupados = asientos.filter((a) => getAsientoEstado(a, asientosOcupados) === 'ocupado').length;
  const totalMantenimiento = asientos.filter((a) => getAsientoEstado(a, asientosOcupados) === 'mantenimiento').length;

  return (
    <div className="space-y-6">
      {bus && (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 flex items-start gap-4">
          <div className="flex items-center justify-center size-12 rounded-lg bg-amber-50 text-amber-600 shrink-0">
            <Bus className="size-6" />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold text-neutral-900">{bus.placa}</p>
            <p className="text-sm text-neutral-500">
              {bus.cantidadPisos} piso{bus.cantidadPisos > 1 ? 's' : ''} &middot; {asientos.length} asientos
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded bg-green-100 border border-green-300" />
              {totalDisponibles} libres
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded bg-neutral-200 border border-neutral-300" />
              {totalOcupados} ocupados
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded bg-yellow-100 border border-yellow-300" />
              {totalMantenimiento} mantenimiento
            </span>
          </div>
        </div>
      )}

      {[{ piso: 1, data: piso1 }, { piso: 2, data: piso2 }].map(({ piso, data }) => {
        if (data.length === 0) return null;
        return (
          <div key={piso} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-neutral-900">
                Piso {piso}
                <span className="ml-2 text-sm font-normal text-neutral-400">({data.length} asientos)</span>
              </h2>
              <div className="flex items-center gap-3">
                {(['normal', 'vip'] as const).map((tipo) => {
                  const Icon = tipoServicioIcon[tipo];
                  const count = data.filter((a) => a.tipoServicio === tipo).length;
                  if (count === 0) return null;
                  return (
                    <span key={tipo} className="flex items-center gap-1 text-xs text-neutral-500">
                      <Icon className="size-3.5" />
                      {count}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 max-w-3xl mx-auto">
              {data.map((asiento, idx) => {
                const col = idx % 4;
                const row = Math.floor(idx / 4);
                return (
                  <SeatCard key={asiento.id} asiento={asiento} row={row} col={col} asientosOcupados={asientosOcupados} />
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <Sofa className="size-4 text-neutral-400" />
            <span className="text-neutral-500">Normal</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Crown className="size-4 text-neutral-400" />
            <span className="text-neutral-500">VIP</span>
          </span>
        </div>
        <Badge variant="info">preparado para API — data-row/data-col para coordx/coordy</Badge>
      </div>
    </div>
  );
}
