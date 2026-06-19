'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { ArrowLeft, Ticket } from 'lucide-react';
import {
  getViajeById,
  getBoletosByViajeId,
  getPasajeroById,
  getAsientoById,
} from '@/infrastructure/mock/data';
import { DataTable, DataTableEmpty, Badge } from '@/components/ui';
import type { Boleto } from '@/infrastructure/domain/types';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function getPasajeroNombre(idPasajero: string): string {
  const pasajero = getPasajeroById(idPasajero);
  return pasajero ? `${pasajero.nombres} ${pasajero.apellidoPaterno} ${pasajero.apellidoMaterno}` : '—';
}

function getAsientoNumero(idAsiento: string): string {
  const asiento = getAsientoById(idAsiento);
  return asiento ? asiento.numeroAsiento : '—';
}

const estadoVariant: Record<string, 'success' | 'danger'> = {
  activo: 'success',
  cancelado: 'danger',
};

export default function BoletosViajePage() {
  const params = useParams<{ id: string }>();
  const viaje = getViajeById(params.id);
  const boletos = useMemo(() => getBoletosByViajeId(params.id), [params.id]);

  const fechaViaje = viaje
    ? format(new Date(viaje.fechaHoraSalida), 'dd/MM/yyyy HH:mm', { locale: es })
    : '...';

  const columns = useMemo<ColumnDef<Boleto>[]>(
    () => [
      {
        id: 'codigoQr',
        header: 'Código QR',
        cell: ({ row }) => (
          <span className="font-medium flex items-center gap-2">
            <Ticket className="size-4 text-muted-foreground shrink-0" />
            {row.original.codigoQr}
          </span>
        ),
      },
      {
        id: 'pasajero',
        header: 'Pasajero',
        cell: ({ row }) => getPasajeroNombre(row.original.idPasajero),
      },
      {
        id: 'asiento',
        header: 'Asiento',
        cell: ({ row }) => getAsientoNumero(row.original.idAsiento),
      },
      {
        accessorKey: 'precioFinal',
        header: 'Monto',
        cell: ({ row }) => {
          const monto = row.getValue<number>('precioFinal');
          return `S/ ${monto.toFixed(2)}`;
        },
      },
      {
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ row }) => (
          <Badge variant={estadoVariant[row.getValue('estado') as string] ?? 'neutral'}>
            {row.getValue('estado')}
          </Badge>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="outline" size="icon-sm" asChild>
            <Link href="/viajes">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Boletos — Viaje {fechaViaje}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              Boletos emitidos para el viaje del {fechaViaje}.
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <DataTable
          columns={columns}
          data={boletos}
          emptyElement={
            <DataTableEmpty
              title="Sin boletos"
              description="Este viaje no tiene boletos emitidos."
            />
          }
        />
      </div>
    </div>
  );
}
