'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { ArrowLeft, Route, CalendarCheck, ArrowRight, Building2 } from 'lucide-react';
import { getRutaById, getTerminalById, getAgenciaById, getViajesByRutaId } from '@/infrastructure/mock/data';

function InfoRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <span className="text-sm font-medium text-neutral-500 min-w-[140px]">{label}</span>
      <div className="text-sm text-neutral-900">{value}</div>
    </div>
  );
}

export default function RutaDetailPage() {
  const params = useParams<{ id: string }>();
  const ruta = getRutaById(params.id);

  if (!ruta) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Ruta no encontrada
      </div>
    );
  }

  const agencia = getAgenciaById(ruta.idAgencia);
  const terminalOrigen = getTerminalById(ruta.idTerminalOrigen);
  const terminalDestino = getTerminalById(ruta.idTerminalDestino);
  const viajesCount = getViajesByRutaId(params.id).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon-sm" asChild>
            <Link href="/rutas">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
              {terminalOrigen?.nombre ?? '?'} → {terminalDestino?.nombre ?? '?'}
            </h1>
            <p className="text-sm text-muted-foreground">Detalle de ruta</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
            <Route className="size-5 text-neutral-500" />
            <h2 className="text-base font-semibold text-neutral-900">Información</h2>
          </div>
          <InfoRow
            label="Agencia"
            value={
              <span className="flex items-center gap-1.5">
                <Building2 className="size-3.5 text-neutral-400" />
                {agencia?.razonSocial ?? '—'}
              </span>
            }
          />
          <InfoRow label="Origen" value={terminalOrigen?.nombre ?? ruta.idTerminalOrigen} />
          <InfoRow label="Destino" value={terminalDestino?.nombre ?? ruta.idTerminalDestino} />
          <InfoRow label="Tarifa Base" value={`S/ ${ruta.tarifaBase.toFixed(2)}`} />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 flex items-center gap-4">
            <div className="flex items-center justify-center size-12 rounded-lg bg-blue-50 text-blue-600">
              <CalendarCheck className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{viajesCount}</p>
              <p className="text-sm text-neutral-500">Viajes registrados</p>
            </div>
          </div>
          <Button variant="outline" className="h-auto p-5 flex items-center gap-4" asChild>
            <Link href={`/rutas/${params.id}/viajes`}>
              <div className="flex items-center justify-center size-12 rounded-lg bg-emerald-50 text-emerald-600">
                <CalendarCheck className="size-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-2xl font-bold text-neutral-900">Ver Viajes</p>
                <p className="text-sm text-neutral-500">Programación de viajes de esta ruta</p>
              </div>
              <ArrowRight className="size-5 text-neutral-400" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
